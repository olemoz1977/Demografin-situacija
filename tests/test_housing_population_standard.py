"""Contract checks for public 2024–2025 housing population labels.

Run from repository root:
    python -m unittest -v tests/test_housing_population_standard.py

This is a semantic/metadata smoke test, not a browser layout or legal eligibility test.
"""
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class HousingPopulationStandardTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.housing = (ROOT / "housing-affordability.js").read_text(encoding="utf-8")
        cls.nav = (ROOT / "research-nav.js").read_text(encoding="utf-8")
        cls.app = (ROOT / "app.js").read_text(encoding="utf-8")
        cls.data = json.loads(
            (ROOT / "data/housing-state-support-outcomes-2025.json").read_text(encoding="utf-8")
        )

    def test_public_headings_have_no_unofficial_young_couple_category(self):
        for view in (self.housing, self.nav):
            for phrase in ("jaunai dirbančiai porai", "jaunai porai", "jaunos poros pajamos"):
                self.assertNotIn(phrase, view.lower())
        self.assertIn("pirmojo būsto paramos faktai", self.nav.lower())

    def test_annualized_monthly_income_is_not_presented_as_eligibility(self):
        for token in ("housingIncomeScreen", "housingSupportIncomeChart", "renderIncomeScreen"):
            self.assertNotIn(token, self.housing)
        self.assertNotIn("housing-state-support-income-screen-2025.json", self.housing)
        self.assertIn("Paramos aprėptis tarp visų jaunų šeimų", self.housing)

    def test_sadm_schemes_have_distinct_population_definitions(self):
        schemes = self.data["schemes"]
        self.assertEqual(len(schemes), 2)
        self.assertNotEqual(schemes[0]["population_definition_id"],
                            schemes[1]["population_definition_id"])
        for scheme in schemes:
            for required in ("population", "population_definition_id", "territory",
                             "measure", "status", "recipients_2024", "recipients_2025"):
                self.assertTrue(scheme.get(required) is not None, (scheme["key"], required))
            self.assertEqual("OFFICIAL", scheme["status"])
        self.assertEqual([342, 688], [s["recipients_2024"] for s in schemes])
        self.assertEqual([515, 556], [s["recipients_2025"] for s in schemes])

    def test_unknown_denominator_is_explicitly_unknown(self):
        interpretation = self.data["interpretation"]
        self.assertTrue(interpretation["do_not_sum_as_young_families"])
        self.assertIsNone(interpretation["official_young_family_denominator_2025"])
        self.assertIsNone(interpretation["coverage_percentage_2025"])

    def test_navigation_uses_current_candidate_files(self):
        self.assertIn("research-nav.js?v=20261009standard", self.app)
        self.assertIn("housing-affordability.js?v=20261009population", self.app)
        self.assertIn("2024–2025", self.housing)
        self.assertIn("2024–2025", self.nav)

    def test_county_comparability_block_remains(self):
        self.assertIn("50 m²", self.housing)
        self.assertIn("N.", self.housing)
        self.assertIn("Būsto kainų palyginimo dar nerodome", self.housing)


if __name__ == "__main__":
    unittest.main()
