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
SCRIPT = ROOT / "scripts" / "validate_housing_rent_provider.py"

COUNTIES = [
    "Alytaus",
    "Kauno",
    "Klaipėdos",
    "Marijampolės",
    "Panevėžio",
    "Šiaulių",
    "Tauragės",
    "Telšių",
    "Utenos",
    "Vilniaus",
]


class RentProviderValidatorTest(unittest.TestCase):
    def make_input(self, path: Path, n: int = 20) -> pd.DataFrame:
        rows = []
        for i, county in enumerate(COUNTIES):
            rows.append(
                {
                    "county": county,
                    "year": 2025,
                    "property_type": "apartment",
                    "rooms": 1,
                    "rental_term": "long_term",
                    "price_basis": "asking_offer",
                    "unique_listing_count": n + i,
                    "median_asking_rent_eur_month": 250 + 25 * i,
                }
            )
        df = pd.DataFrame(rows)
        df.to_csv(path, index=False)
        return df

    def run_validator(self, src: Path, out: Path):
        return subprocess.run(
            [
                sys.executable,
                str(SCRIPT),
                "--input",
                str(src),
                "--out-dir",
                str(out),
            ],
            cwd=ROOT,
            capture_output=True,
            text=True,
        )

    def test_accepts_complete_b_quality_county_layer(self):
        with tempfile.TemporaryDirectory() as td:
            td = Path(td)
            src = td / "rent.csv"
            self.make_input(src, n=20)
            out = td / "out"
            proc = self.run_validator(src, out)
            self.assertEqual(proc.returncode, 0, proc.stderr)

            county = pd.read_csv(out / "housing-rent-county-2025-provider-candidate.csv")
            self.assertEqual(len(county), 10)
            self.assertEqual(set(county["quality"]), {"B"})
            self.assertEqual(
                set(county["layer_status"]),
                {"candidate_not_publication_approved"},
            )

            qa = json.loads((out / "housing-rent-provider-qa-2025.json").read_text())
            self.assertEqual(
                qa["output_status"],
                "STRUCTURAL_PASS_B_OR_BETTER_CANDIDATE",
            )
            self.assertEqual(
                qa["methodology_gate"]["status"],
                "PENDING_MANUAL_SOURCE_METHOD_CONFIRMATION",
            )

    def test_accepts_c_but_marks_review_required(self):
        with tempfile.TemporaryDirectory() as td:
            td = Path(td)
            src = td / "rent-c.csv"
            df = self.make_input(src, n=20)
            df.loc[df["county"].eq("Tauragės"), "unique_listing_count"] = 7
            df.to_csv(src, index=False)
            out = td / "out"
            proc = self.run_validator(src, out)
            self.assertEqual(proc.returncode, 0, proc.stderr)
            qa = json.loads((out / "housing-rent-provider-qa-2025.json").read_text())
            self.assertEqual(
                qa["output_status"],
                "STRUCTURAL_PASS_WITH_C_REVIEW_REQUIRED",
            )

    def test_rejects_missing_county(self):
        with tempfile.TemporaryDirectory() as td:
            td = Path(td)
            src = td / "rent-missing.csv"
            df = self.make_input(src)
            df.iloc[:-1].to_csv(src, index=False)
            proc = self.run_validator(src, td / "out")
            self.assertNotEqual(proc.returncode, 0)
            self.assertIn("Expected exactly 10 county rows", proc.stderr)

    def test_rejects_wrong_basket(self):
        with tempfile.TemporaryDirectory() as td:
            td = Path(td)
            src = td / "rent-wrong-basket.csv"
            df = self.make_input(src)
            df.loc[df["county"].eq("Kauno"), "rooms"] = 2
            df.to_csv(src, index=False)
            proc = self.run_validator(src, td / "out")
            self.assertNotEqual(proc.returncode, 0)
            self.assertIn("Wrong room count", proc.stderr)

    def test_rejects_insufficient_county(self):
        with tempfile.TemporaryDirectory() as td:
            td = Path(td)
            src = td / "rent-insufficient.csv"
            df = self.make_input(src)
            df.loc[df["county"].eq("Telšių"), "unique_listing_count"] = 4
            df.to_csv(src, index=False)
            proc = self.run_validator(src, td / "out")
            self.assertNotEqual(proc.returncode, 0)
            self.assertIn("insufficient rent sample", proc.stderr)


if __name__ == "__main__":
    unittest.main()
