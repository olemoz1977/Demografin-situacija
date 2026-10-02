#!/usr/bin/env python3
from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "housing_affordability_readiness.py"
INPUT = ROOT / "data" / "housing-affordability-input.json"


class HousingReadinessTest(unittest.TestCase):
    def run_gate(self, src: Path, out: Path):
        return subprocess.run(
            [
                sys.executable,
                str(SCRIPT),
                "--input",
                str(src),
                "--out",
                str(out),
            ],
            cwd=ROOT,
            text=True,
            capture_output=True,
        )

    def test_current_research_state_is_not_publishable(self):
        with tempfile.TemporaryDirectory() as td:
            out = Path(td) / "readiness.json"
            proc = self.run_gate(INPUT, out)
            self.assertEqual(proc.returncode, 0, proc.stderr)

            data = json.loads(out.read_text(encoding="utf-8"))
            self.assertFalse(data["ready_for_publication"])
            self.assertFalse(data["validated_publication_ready"])
            self.assertEqual(data["decision"], "DO_NOT_PUBLISH")
            self.assertFalse(data["strict_v1_0"]["ready"])
            self.assertEqual(data["strict_v1_0"]["decision"], "BLOCKED")
            self.assertFalse(data["preliminary_v0_1"]["ready"])
            self.assertEqual(
                data["preliminary_v0_1"]["decision"],
                "BLOCKED",
            )
            self.assertFalse(data["preliminary_v0_1"]["feature_preview_allowed"])
            self.assertFalse(data["preliminary_v0_1"]["main_live_allowed"])
            self.assertEqual(data["preliminary_v0_1"]["county_count"], 10)
            self.assertFalse(data["preliminary_v0_1"]["comparability_gate_passed"])
            self.assertEqual(
                data["preliminary_v0_1"]["comparability_verdict"],
                "FAIL_CROSS_COUNTY_COMPARABILITY",
            )

            status = {g["name"]: g["status"] for g in data["gates"]}
            self.assertEqual(status["income_10_counties"], "PASS")
            self.assertEqual(status["sale_actual_apartment_transactions"], "BLOCKED")
            self.assertEqual(status["rent_private_1room_10_counties"], "BLOCKED")
            self.assertEqual(status["no_county_center_substitution"], "PASS")

            blockers = {b["gate"] for b in data["blockers"]}
            self.assertIn("sale_actual_apartment_transactions", blockers)
            self.assertIn("rent_private_1room_10_counties", blockers)

            sale_blocker = next(
                b["reason"]
                for b in data["blockers"]
                if b["gate"] == "sale_actual_apartment_transactions"
            )
            self.assertIn("2025", sale_blocker)
            self.assertIn("2024", sale_blocker)
            self.assertIn("fallback", sale_blocker)

    def test_corrupt_config_fails(self):
        with tempfile.TemporaryDirectory() as td:
            td = Path(td)
            src = td / "bad.json"
            src.write_text('{"status":"research"}\n', encoding="utf-8")
            proc = self.run_gate(src, td / "out.json")
            self.assertNotEqual(proc.returncode, 0)
            self.assertIn("Missing readiness configuration sections", proc.stderr)


if __name__ == "__main__":
    unittest.main()
