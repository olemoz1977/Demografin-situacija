#!/usr/bin/env python3
from __future__ import annotations

import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "summarize_housing_rent_city_sample.py"
INPUT = ROOT / "data" / "housing-rent-city-sample-2025.csv"


def quality(n: int) -> str:
    if n >= 10:
        return "B"
    if n >= 5:
        return "C"
    return "insufficient"


class RentCitySummaryTest(unittest.TestCase):
    def run_summary(self, src: Path, out: Path):
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

    def test_current_sample_matches_listing_level_source(self):
        with tempfile.TemporaryDirectory() as td:
            out = Path(td) / "summary.csv"
            proc = self.run_summary(INPUT, out)
            self.assertEqual(proc.returncode, 0, proc.stderr)

            src = pd.read_csv(INPUT)
            got = pd.read_csv(out).set_index("city")

            self.assertEqual(set(got.index), set(src["city"].unique()))
            for city_name, g in src.groupby("city"):
                self.assertEqual(int(got.loc[city_name, "sample_n"]), len(g))
                self.assertEqual(got.loc[city_name, "quality"], quality(len(g)))
                self.assertAlmostEqual(
                    float(got.loc[city_name, "rent_month_median_eur"]),
                    float(g["monthly_rent_eur"].median()),
                    places=3,
                )
                self.assertAlmostEqual(
                    float(got.loc[city_name, "rent_eur_m2_median"]),
                    float(g["eur_m2"].median()),
                    places=3,
                )

    def test_rejects_duplicate_source_url(self):
        with tempfile.TemporaryDirectory() as td:
            td = Path(td)
            df = pd.read_csv(INPUT)
            df = pd.concat([df, df.iloc[[0]]], ignore_index=True)
            src = td / "dup.csv"
            out = td / "summary.csv"
            df.to_csv(src, index=False)
            proc = self.run_summary(src, out)
            self.assertNotEqual(proc.returncode, 0)
            self.assertIn("Duplicate source_url", proc.stderr)

    def test_rejects_wrong_year(self):
        with tempfile.TemporaryDirectory() as td:
            td = Path(td)
            df = pd.read_csv(INPUT)
            df.loc[0, "updated_date"] = "2026-01-01"
            src = td / "wrong-year.csv"
            out = td / "summary.csv"
            df.to_csv(src, index=False)
            proc = self.run_summary(src, out)
            self.assertNotEqual(proc.returncode, 0)
            self.assertIn("Rows outside 2025", proc.stderr)


if __name__ == "__main__":
    unittest.main()
