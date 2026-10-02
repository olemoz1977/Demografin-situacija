#!/usr/bin/env python3
from __future__ import annotations

import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "summarize_housing_rent_county_sample.py"
INPUT = ROOT / "data" / "housing-rent-city-sample-2025.csv"


def quality(n: int) -> str:
    if n >= 10:
        return "B"
    if n >= 5:
        return "C"
    return "insufficient"


class RentCountySummaryTest(unittest.TestCase):
    def run_it(self, out: Path):
        return subprocess.run(
            [
                sys.executable,
                str(SCRIPT),
                "--input",
                str(INPUT),
                "--out",
                str(out),
            ],
            cwd=ROOT,
            text=True,
            capture_output=True,
        )

    def test_current_county_pool_matches_listing_level_source(self):
        with tempfile.TemporaryDirectory() as td:
            out = Path(td) / "county.csv"
            proc = self.run_it(out)
            self.assertEqual(proc.returncode, 0, proc.stderr)

            src = pd.read_csv(INPUT)
            got = pd.read_csv(out).set_index("county")

            self.assertEqual(set(got.index), set(src["county"].unique()))
            for county_name, g in src.groupby("county"):
                self.assertEqual(int(got.loc[county_name, "sample_n"]), len(g))
                self.assertEqual(
                    int(got.loc[county_name, "localities_n"]),
                    int(g["city"].nunique()),
                )
                self.assertEqual(got.loc[county_name, "quality"], quality(len(g)))
                self.assertAlmostEqual(
                    float(got.loc[county_name, "rent_month_median_eur"]),
                    float(g["monthly_rent_eur"].median()),
                    places=3,
                )
                self.assertAlmostEqual(
                    float(got.loc[county_name, "rent_eur_m2_median"]),
                    float(g["eur_m2"].median()),
                    places=3,
                )

    def test_county_median_is_direct_listing_pool_not_city_median_average(self):
        with tempfile.TemporaryDirectory() as td:
            out = Path(td) / "county.csv"
            proc = self.run_it(out)
            self.assertEqual(proc.returncode, 0, proc.stderr)

            src = pd.read_csv(INPUT)
            got = pd.read_csv(out).set_index("county")
            multi = [
                (county_name, g)
                for county_name, g in src.groupby("county")
                if g["city"].nunique() > 1
            ]
            self.assertTrue(multi, "Expected at least one multi-locality county sample")
            for county_name, g in multi:
                self.assertAlmostEqual(
                    float(got.loc[county_name, "rent_month_median_eur"]),
                    float(g["monthly_rent_eur"].median()),
                    places=3,
                )


if __name__ == "__main__":
    unittest.main()
