#!/usr/bin/env python3
from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "build_housing_sale_county_from_rc.py"
MAPPING = ROOT / "data" / "municipality-county-map.csv"


class RcCountyBuilderTest(unittest.TestCase):
    def make_input(self, path: Path, drop_last: bool = False) -> pd.DataFrame:
        mapping = pd.read_csv(MAPPING)
        rows = []
        for i, name in enumerate(mapping["sav_pav"].tolist()):
            rows.append(
                {
                    "municipality": name,
                    "year": 2025,
                    "apartment_transaction_count": 120 + i,
                    "valid_price_observation_count": 100 + i,
                    "avg_apartment_transaction_eur_m2": 700.0 + i * 25.0,
                }
            )
        if drop_last:
            rows = rows[:-1]
        df = pd.DataFrame(rows)
        df.to_csv(path, index=False)
        return df

    def run_builder(self, input_path: Path, out_dir: Path):
        return subprocess.run(
            [
                sys.executable,
                str(SCRIPT),
                "--input",
                str(input_path),
                "--mapping",
                str(MAPPING),
                "--out-dir",
                str(out_dir),
            ],
            cwd=ROOT,
            text=True,
            capture_output=True,
        )

    def test_builds_10_counties_with_valid_price_weights(self):
        with tempfile.TemporaryDirectory() as td:
            td = Path(td)
            input_path = td / "rc.csv"
            source = self.make_input(input_path)
            out_dir = td / "out"

            proc = self.run_builder(input_path, out_dir)
            self.assertEqual(proc.returncode, 0, proc.stderr)

            county = pd.read_csv(out_dir / "housing-sale-county-2025-rc-candidate.csv")
            self.assertEqual(len(county), 10)
            self.assertEqual(set(county["layer_status"]), {"candidate_not_publication_approved"})
            self.assertEqual(
                set(county["aggregation_weight"]),
                {"valid_price_observation_count"},
            )

            qa = json.loads((out_dir / "housing-sale-rc-qa-2025.json").read_text())
            self.assertEqual(qa["output_status"], "STRUCTURAL_PASS_CANDIDATE_ONLY")
            self.assertEqual(
                qa["methodology_gate"]["status"],
                "PENDING_MANUAL_SOURCE_METHOD_CONFIRMATION",
            )

            expected_n = int(source["valid_price_observation_count"].sum())
            self.assertEqual(
                sum(county["valid_price_observation_count"].astype(int)),
                expected_n,
            )

    def test_rejects_incomplete_municipality_coverage(self):
        with tempfile.TemporaryDirectory() as td:
            td = Path(td)
            input_path = td / "rc-incomplete.csv"
            self.make_input(input_path, drop_last=True)
            proc = self.run_builder(input_path, td / "out")
            self.assertNotEqual(proc.returncode, 0)
            self.assertIn("Expected exactly 60 municipality rows", proc.stderr)

    def test_explicit_2024_remains_reproducible(self):
        with tempfile.TemporaryDirectory() as td:
            td = Path(td)
            input_path = td / "rc-2024.csv"
            mapping = pd.read_csv(MAPPING)
            rows = []
            for i, name in enumerate(mapping["sav_pav"].tolist()):
                rows.append(
                    {
                        "municipality": name,
                        "year": 2024,
                        "apartment_transaction_count": 120 + i,
                        "valid_price_observation_count": 100 + i,
                        "avg_apartment_transaction_eur_m2": 700.0 + i * 25.0,
                    }
                )
            pd.DataFrame(rows).to_csv(input_path, index=False)
            out_dir = td / "out"

            proc = subprocess.run(
                [
                    sys.executable,
                    str(SCRIPT),
                    "--input",
                    str(input_path),
                    "--mapping",
                    str(MAPPING),
                    "--out-dir",
                    str(out_dir),
                    "--year",
                    "2024",
                ],
                cwd=ROOT,
                text=True,
                capture_output=True,
            )
            self.assertEqual(proc.returncode, 0, proc.stderr)
            self.assertTrue(
                (out_dir / "housing-sale-county-2024-rc-candidate.csv").exists()
            )
            qa = json.loads((out_dir / "housing-sale-rc-qa-2024.json").read_text())
            self.assertEqual(qa["year"], 2024)


if __name__ == "__main__":
    unittest.main()
