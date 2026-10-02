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

    def test_current_sample_expected_quality_and_counts(self):
        with tempfile.TemporaryDirectory() as td:
            out = Path(td) / "summary.csv"
            proc = self.run_summary(INPUT, out)
            self.assertEqual(proc.returncode, 0, proc.stderr)
            df = pd.read_csv(out).set_index("city")

            self.assertEqual(int(df.loc["Alytus", "sample_n"]), 6)
            self.assertEqual(df.loc["Alytus", "quality"], "C")
            self.assertEqual(int(df.loc["Marijampolė", "sample_n"]), 7)
            self.assertEqual(df.loc["Marijampolė", "quality"], "C")
            self.assertEqual(int(df.loc["Utena", "sample_n"]), 4)
            self.assertEqual(df.loc["Utena", "quality"], "insufficient")
            self.assertEqual(int(df.loc["Tauragė", "sample_n"]), 2)
            self.assertEqual(df.loc["Tauragė", "quality"], "insufficient")
            self.assertEqual(int(df.loc["Telšiai", "sample_n"]), 4)
            self.assertEqual(df.loc["Telšiai", "quality"], "insufficient")
            self.assertAlmostEqual(float(df.loc["Telšiai", "rent_month_median_eur"]), 275.0)

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
