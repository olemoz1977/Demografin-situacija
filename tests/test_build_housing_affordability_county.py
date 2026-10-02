#!/usr/bin/env python3
from __future__ import annotations

import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "build_housing_affordability_county.py"
INCOME = ROOT / "data" / "housing-income-county-model-2025-11.csv"

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


class HousingAffordabilityCountyTest(unittest.TestCase):
    def make_sale(self, path: Path, status: str) -> None:
        rows = []
        for i, c in enumerate(COUNTIES):
            rows.append(
                {
                    "apskritis": c,
                    "year": 2024,
                    "municipalities_n": 6,
                    "apartment_transaction_count": 1000 + i,
                    "valid_price_observation_count": 900 + i,
                    "valid_price_coverage_pct": 90,
                    "avg_apartment_transaction_eur_m2_weighted": 1000 + 100 * i,
                    "aggregation_weight": "valid_price_observation_count",
                    "layer_status": status,
                }
            )
        pd.DataFrame(rows).to_csv(path, index=False)

    def make_rent(self, path: Path, status: str, quality: str = "B") -> None:
        rows = []
        for i, c in enumerate(COUNTIES):
            rows.append(
                {
                    "county": c,
                    "year": 2025,
                    "property_type": "apartment",
                    "rooms": 1,
                    "rental_term": "long_term",
                    "price_basis": "asking_offer",
                    "unique_listing_count": 20 + i,
                    "median_asking_rent_eur_month": 250 + 20 * i,
                    "quality": quality,
                    "layer_status": status,
                }
            )
        pd.DataFrame(rows).to_csv(path, index=False)

    def run_builder(self, sale: Path, rent: Path, out: Path, allow=False):
        cmd = [
            sys.executable,
            str(SCRIPT),
            "--income",
            str(INCOME),
            "--sale",
            str(sale),
            "--rent",
            str(rent),
            "--out",
            str(out),
        ]
        if allow:
            cmd.append("--allow-candidate")
        return subprocess.run(cmd, cwd=ROOT, text=True, capture_output=True)

    def test_publication_mode_rejects_candidates(self):
        with tempfile.TemporaryDirectory() as td:
            td = Path(td)
            sale, rent, out = td / "sale.csv", td / "rent.csv", td / "out.csv"
            self.make_sale(sale, "candidate_not_publication_approved")
            self.make_rent(rent, "candidate_not_publication_approved")
            proc = self.run_builder(sale, rent, out)
            self.assertNotEqual(proc.returncode, 0)
            self.assertIn("publication mode requires", proc.stderr)

    def test_candidate_mode_calculates_but_marks_nonpublication(self):
        with tempfile.TemporaryDirectory() as td:
            td = Path(td)
            sale, rent, out = td / "sale.csv", td / "rent.csv", td / "out.csv"
            self.make_sale(sale, "candidate_not_publication_approved")
            self.make_rent(rent, "candidate_not_publication_approved")
            proc = self.run_builder(sale, rent, out, allow=True)
            self.assertEqual(proc.returncode, 0, proc.stderr)
            df = pd.read_csv(out)
            self.assertEqual(len(df), 10)
            self.assertFalse(df["publication_ready"].all())
            self.assertEqual(set(df["overall_quality"]), {"candidate_only"})

            row = df.loc[df["county"].eq("Alytaus")].iloc[0]
            income = float(row["net_income_25_30_eur_month_person"])
            sale_price = float(row["sale_price_eur_m2"])
            rent_month = float(row["rent_eur_month"])
            expected = ((2 * income * 12) - rent_month * 12) / sale_price
            self.assertAlmostEqual(float(row["m2_per_year_after_rent"]), expected, places=2)

    def test_approved_layers_produce_publication_ready_output(self):
        with tempfile.TemporaryDirectory() as td:
            td = Path(td)
            sale, rent, out = td / "sale.csv", td / "rent.csv", td / "out.csv"
            self.make_sale(sale, "publication_approved")
            self.make_rent(rent, "publication_approved", quality="B")
            proc = self.run_builder(sale, rent, out)
            self.assertEqual(proc.returncode, 0, proc.stderr)
            df = pd.read_csv(out)
            self.assertTrue(df["publication_ready"].all())
            self.assertEqual(set(df["overall_quality"]), {"B"})
            self.assertEqual(set(df["sale_quality"]), {"A-official-actual-transactions"})

    def test_rent_c_quality_drives_overall_c(self):
        with tempfile.TemporaryDirectory() as td:
            td = Path(td)
            sale, rent, out = td / "sale.csv", td / "rent.csv", td / "out.csv"
            self.make_sale(sale, "publication_approved")
            self.make_rent(rent, "publication_approved", quality="B")
            rdf = pd.read_csv(rent)
            rdf.loc[rdf["county"].eq("Telšių"), "quality"] = "C"
            rdf.to_csv(rent, index=False)
            proc = self.run_builder(sale, rent, out)
            self.assertEqual(proc.returncode, 0, proc.stderr)
            df = pd.read_csv(out).set_index("county")
            self.assertEqual(df.loc["Telšių", "overall_quality"], "C")
            self.assertEqual(df.loc["Kauno", "overall_quality"], "B")


if __name__ == "__main__":
    unittest.main()
