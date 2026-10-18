"""2026-10-18 publication guards for PR #11 + #12 integration."""
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class Publication20261018Test(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.register = json.loads((ROOT / "data/research-findings-register.json").read_text(encoding="utf-8"))
        cls.findings = {row["id"]: row for row in cls.register["findings"]}

    def test_42_unique_findings_and_earlier_housing_household_findings_survive(self):
        self.assertEqual(42, len(self.register["findings"]))
        self.assertEqual(42, len(self.findings))
        for ident in (
            "EU-HH-2025-01",
            "HOUSING-CITY-SALES-2025-01",
            "HOUSING-SUBSIDY-2019-2025-01",
            "HOUSING-COUNTY-HH-INCOME-2024-01",
        ):
            self.assertIn(ident, self.findings)

    def test_new_publication_anchors_exist_and_statuses_are_explicit(self):
        expected = {
            "EU-AROPE-2025-01": ("PUBLISHED_FACT", "population", "social-risk-context.js"),
            "FERTILITY-DEVELOPMENT-PARADOX-2026-01": ("PUBLISHED_CONTEXT", "fertility", "social-risk-context.js"),
            "FAMILY-IDEALIZED-ROMANCE-2025-01": ("PUBLISHED_CONTEXT", "family", "family-hypothesis.js"),
        }
        for ident, (status, module, path) in expected.items():
            item = self.findings[ident]
            self.assertEqual(status, item["status"])
            self.assertEqual(module, item["publication"]["module"])
            self.assertEqual(path, item["publication"]["file"])
            source = (ROOT / path).read_text(encoding="utf-8")
            self.assertIn(item["publication"]["marker"], source)

    def test_site_routes_load_additional_context_and_preserve_other_sections(self):
        app = (ROOT / "app.js").read_text(encoding="utf-8")
        index = (ROOT / "index.html").read_text(encoding="utf-8")
        block = (ROOT / "social-risk-context.js").read_text(encoding="utf-8")
        self.assertIn("social-risk-context.js?v=20261018publish1", app)
        self.assertIn("app.js?v=20261019editorial1", index)
        self.assertIn("populationArope2025", block)
        self.assertIn("fertilityDevelopmentParadox2026", block)
        self.assertIn("2025 m. socialinės atskirties rizika Lietuvoje", block)
        self.assertIn("Šio priežastinio ryšio Lietuvos duomenimis nepatvirtinome.", block)
        self.assertIn("Boeckxstaens ir kt.", (ROOT / "family-hypothesis.js").read_text(encoding="utf-8"))
        for name in ("migration-sex.js", "housing-affordability.js", "research-nav.js"):
            self.assertTrue((ROOT / name).is_file())


if __name__ == "__main__":
    unittest.main()
