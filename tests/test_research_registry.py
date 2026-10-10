"""Regression protection for the eight-module historical research inventory.

These tests protect recorded findings; they cannot discover an unrecorded
finding in a past conversation. Historical inventory remains human-reviewed.
"""
import json
import unittest
from pathlib import Path

from scripts.check_registry_continuity import validate

ROOT = Path(__file__).resolve().parents[1]
MODULES = {
    "overview", "fertility", "population", "migration",
    "family", "housing", "future", "methods",
}


class ResearchContinuityTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.register = json.loads(
            (ROOT / "data/research-findings-register.json").read_text(encoding="utf-8")
        )
        cls.households = json.loads(
            (ROOT / "data/households-single-adult-eurostat-2024-2025.json").read_text(encoding="utf-8")
        )
        cls.findings = {f["id"]: f for f in cls.register["findings"]}

    def test_sources_evidence_and_published_markers(self):
        self.assertEqual([], validate(self.register))

    def test_every_module_has_back_inventory_and_recorded_findings(self):
        inventory = {x["module"]: x for x in self.register["module_inventory"]}
        self.assertEqual(MODULES, set(inventory))
        self.assertGreaterEqual(len(self.findings), 39)
        for mod in MODULES:
            self.assertEqual("INVENTORIED_WITH_GAPS", inventory[mod]["audit"])
            self.assertTrue((ROOT / inventory[mod]["inventory_document"]).is_file())
            self.assertFalse(inventory[mod]["direct_live_browser_checked"])
            self.assertTrue(any(f["area"] == mod for f in self.findings.values()))

    def test_eurostat_household_finding_survives_pr4_publication(self):
        item = self.findings["EU-HH-2025-01"]
        self.assertEqual("PUBLISHED_CONTEXT", item["status"])
        self.assertEqual("population", item["area"])
        self.assertEqual("population", item["publication"]["module"])
        self.assertEqual("app-base.js", item["publication"]["file"])
        self.assertIn("housing", item["publication"]["secondary_modules"])
        self.assertIn("family", item["publication"]["secondary_modules"])
        self.assertIn("migration", item["publication"]["secondary_modules"])
        self.assertEqual("ilc_lvph02", self.households["metric_code"])
        self.assertEqual(50.5, self.households["figure_pct"]["LT_2024"])
        self.assertEqual(55.7, self.households["figure_pct"]["LT_2025"])
        self.assertEqual("p_provisional", self.households["figure_status"]["LT_2024"])
        self.assertEqual("p_provisional", self.households["figure_status"]["LT_2025"])
        self.assertTrue(self.households["do_not_call_people_percent"])
        self.assertTrue(self.households["do_not_call_young_adults_or_families"])
        self.assertTrue(self.households["do_not_call_marital_status_or_loneliness"])
        self.assertEqual("PENDING", item["publication_audit"]["current_browser_test"])

    def test_eurostat_publication_states_are_consistent_across_t0_data_and_registry(self):
        item = self.findings["EU-HH-2025-01"]
        source = self.households
        rule = (ROOT / "research/RESEARCH-CONTINUITY-RULE.md").read_text(encoding="utf-8")
        self.assertEqual(item["status"], source["public_site_status"])
        self.assertEqual(item["publication"]["module"], source["public_site_module"])
        self.assertEqual("population", source["published_primary_module"])
        self.assertEqual("PENDING", source["publication_evidence"]["independent_live_browser_qa"])
        self.assertTrue(source["publication_evidence"]["source_in_main"])
        self.assertTrue(source["publication_evidence"]["github_pages_deployment_success"])
        self.assertIn("PUBLISHED_CONTEXT", rule)
        self.assertIn("PR #4", rule)
        self.assertIn("INVENTORIED_WITH_GAPS", rule)
        self.assertNotIn("Šio fakto iki šiol nėra svetainėje", rule)


    def test_household_primary_location_and_crosslinks_preserve_meaning(self):
        primary = (ROOT / "app-base.js").read_text(encoding="utf-8")
        url = "?view=population#populationHouseholdStructure"
        self.assertIn('id="populationHouseholdStructure"', primary)
        self.assertIn("55,7 % Lietuvos privačių namų ūkių", primary)
        self.assertIn("50,5 %", primary)
        self.assertIn("35,7 %", primary)
        self.assertIn("namų ūkių, ne Lietuvos gyventojų procentas", primary)
        for name, context_id in (
            ("housing-affordability.js", "housingSingleAdultHouseholds"),
            ("family-hypothesis.js", "familySingleAdultHouseholds"),
            ("migration-sex.js", "migrationHouseholdContext"),
        ):
            text = (ROOT / name).read_text(encoding="utf-8")
            self.assertIn(context_id, text)
            self.assertIn(url, text)
        self.assertIn("research-nav.js?v=", (ROOT / "app.js").read_text(encoding="utf-8"))
        self.assertIn("housing-affordability.js?v=", (ROOT / "app.js").read_text(encoding="utf-8"))
        self.assertRegex(
            (ROOT / "index.html").read_text(encoding="utf-8"),
            r'app\\.js\\?v=20261010[A-Za-z0-9_-]+',
        )

    def test_housing_is_not_reduced_to_subsidies(self):
        for ident in (
            "HOUSING-CITY-SALES-2025-01", "HOUSING-RENT-SALE-2025-12-01",
            "HOUSING-LOAN-2025-01", "HOUSING-SUBSIDY-2019-2025-01",
            "HOUSING-COUNTY-HH-INCOME-2024-01",
            "HOUSING-YOUNG-LEAVING-HOME-2025-01",
            "HOUSING-SAVINGS-CITY3-2025-01",
            "HOUSING-PRICE-CHANGE-DERIVED-2025-01",
        ):
            self.assertIn(ident, self.findings)
        self.assertEqual("RESEARCH_BLOCKED", self.findings["HOUSING-SAVINGS-10-COUNTIES-01"]["status"])
        self.assertEqual("RESEARCH_BLOCKED", self.findings["HOUSING-YOUNG-COUPLES-DENOMINATOR-2025-01"]["status"])
        self.assertEqual("MODELLED_UNPUBLISHED", self.findings["HOUSING-SAVINGS-CITY3-2025-01"]["status"])
        self.assertEqual("VERIFIED_UNPUBLISHED", self.findings["HOUSING-COUNTY-HH-INCOME-2024-01"]["status"])
        self.assertEqual(0, self.register["budget_eur"])

    def test_unpublished_models_and_verified_items_must_stay_separate(self):
        valid = {"VERIFIED_UNPUBLISHED", "MODELLED_UNPUBLISHED", "RESEARCH_BLOCKED"}
        unpublished = [f for f in self.findings.values() if f["status"] in valid]
        self.assertGreaterEqual(len(unpublished), 12)
        for finding in unpublished:
            self.assertTrue(finding["blocker"])
            self.assertIsNone(finding["publication"]["file"])
            self.assertIsNone(finding["publication"]["marker"])
        for ident in (
            "HOUSING-PRICE-CHANGE-DERIVED-2025-01",
            "HOUSING-COUNTY-HH-INCOME-2024-01",
            "HOUSING-YOUNG-LEAVING-HOME-2025-01",
            "HOUSING-SAVINGS-CITY3-2025-01",
        ):
            paths = self.findings[ident]["external_research_paths"]
            self.assertTrue(any("/blob/audit/" in path for path in paths))

    def test_qa_is_not_equivalent_to_historical_completeness(self):
        governance = self.register["governance"]
        self.assertTrue(governance["direct_live_browser_qa_pending"])
        self.assertTrue(governance["publish_scope_matrix_required"])
        self.assertIn("inventory_document", governance)
        self.assertTrue((ROOT / governance["inventory_document"]).is_file())
        self.assertTrue(governance["remove_existing_finding_from_registry_forbidden"])


if __name__ == "__main__":
    unittest.main()
