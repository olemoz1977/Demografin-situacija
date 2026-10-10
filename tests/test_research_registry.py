"""Regression contract for the Demografinė ir kitos Lietuvos analizės research register."""
import json
import unittest
from pathlib import Path
from scripts.check_registry_continuity import validate

ROOT=Path(__file__).resolve().parents[1]

class ResearchContinuityTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.register=json.loads((ROOT/"data/research-findings-register.json").read_text(encoding="utf-8"))
        cls.households=json.loads((ROOT/"data/households-single-adult-eurostat-2024-2025.json").read_text(encoding="utf-8"))

    def test_register_has_valid_sources_and_published_markers(self):
        self.assertEqual([], validate(self.register))

    def test_household_finding_cannot_disappear_again(self):
        findings={x["id"]:x for x in self.register["findings"]}
        item=findings["EU-HH-2025-01"]
        self.assertEqual("VERIFIED_UNPUBLISHED",item["status"])
        self.assertEqual("housing",item["publication"]["module"])
        self.assertIn("population",item["publication"]["secondary_modules"])
        self.assertEqual("ilc_lvph02",self.households["metric_code"])
        self.assertEqual(50.5,self.households["figure_pct"]["LT_2024"])
        self.assertEqual(55.7,self.households["figure_pct"]["LT_2025"])
        self.assertEqual("p_provisional",self.households["figure_status"]["LT_2025"])
        self.assertTrue(self.households["do_not_call_people_percent"])
        self.assertTrue(self.households["do_not_call_young_adults_or_families"])

    def test_housing_research_is_not_reduced_to_subsidies(self):
        findings={x["id"]:x for x in self.register["findings"]}
        self.assertIn("HOUSING-CITY-SALES-2025-01",findings)
        self.assertIn("HOUSING-RENT-SALE-2025-12-01",findings)
        self.assertIn("HOUSING-LOAN-2025-01",findings)
        self.assertIn("HOUSING-SUBSIDY-2019-2025-01",findings)
        self.assertEqual("RESEARCH_BLOCKED",findings["HOUSING-SAVINGS-10-COUNTIES-01"]["status"])
        self.assertEqual(0,self.register["budget_eur"])

    def test_other_modules_must_keep_pending_audit_labels(self):
        statuses={x["module"]:x["audit"] for x in self.register["module_inventory"]}
        self.assertEqual(8,len(statuses))
        for mod in ("overview","fertility","population","migration","family","future","methods"):
            self.assertEqual("PENDING",statuses[mod])
        self.assertEqual("PARTIAL",statuses["housing"])

if __name__=="__main__":
    unittest.main()
