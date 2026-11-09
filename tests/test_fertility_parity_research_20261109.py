"""QA for first-stage Lithuanian parity / resources hypothesis research.

This verifies exact VDA archival numbers, not a claim that income causes fertility.
"""
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REGISTRY = ROOT / "data/research-findings-register.json"
DATA = ROOT / "data/lt-live-birth-order-vda-2013-2022.json"
NOTE = ROOT / "research/fertility-parity-resources-and-intentions-2026-11-09.md"


class ParityResourcesResearchTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.registry = json.loads(REGISTRY.read_text(encoding="utf-8"))
        cls.findings = {row["id"]: row for row in cls.registry["findings"]}
        cls.data = json.loads(DATA.read_text(encoding="utf-8"))
        cls.rows = cls.data["rows"]
        cls.note = NOTE.read_text(encoding="utf-8")

    def test_original_42_and_two_new_unpublished_entries_survive(self):
        self.assertEqual(44, len(self.registry["findings"]))
        self.assertEqual(44, len(self.findings))
        self.assertEqual(31, sum(1 for f in self.findings.values()
                                 if f["status"].startswith("PUBLISHED_")))
        for ident, state in (
            ("FERTILITY-BIRTH-ORDER-LT-2013-2022-01", "VERIFIED_UNPUBLISHED"),
            ("FERTILITY-RESOURCE-PARITY-HYPOTHESIS-2026-01", "MODELLED_UNPUBLISHED"),
        ):
            row = self.findings[ident]
            self.assertEqual(state, row["status"])
            self.assertEqual("fertility", row["area"])
            self.assertIsNone(row["publication"]["file"])
            self.assertIsNone(row["publication"]["marker"])
            self.assertTrue(row["blocker"])
            self.assertIn("research/fertility-parity-resources-and-intentions-2026-11-09.md",
                          row["evidence_files"])

    def test_archival_birth_order_rows_reconcile_and_do_not_double_count_sixth(self):
        self.assertEqual("OFFICIAL_HISTORICAL_SNAPSHOT_UNPUBLISHED", self.data["status"])
        self.assertEqual("https://osp.stat.gov.lt/lietuvos-gyventojai-2023/gimstamumas",
                         self.data["source_url"])
        self.assertEqual(list(range(2013, 2023)), [r["year"] for r in self.rows])
        fields = ("order_1", "order_2", "order_3", "order_4",
                  "order_5", "order_6_plus", "unknown_order")
        for row in self.rows:
            self.assertEqual(row["total_births"], sum(row[k] for k in fields))
            self.assertTrue(all(row[k] >= 0 for k in fields))
            self.assertGreater(row["total_births"], 0)
        self.assertIn("Do NOT add", self.data["birth_order_guard"])

    def test_2013_vs_2022_result_is_not_a_transition_rate(self):
        a, b = self.rows[0], self.rows[-1]
        self.assertEqual((2013, 29885, 14411, 11014, 3132, 738, 271, 306, 13),
                         tuple(a[k] for k in self.data["columns"]))
        self.assertEqual((2022, 22068, 10018, 8469, 2679, 583, 187, 132, 0),
                         tuple(b[k] for k in self.data["columns"]))
        third_plus = lambda x: sum(x[k] for k in
                                   ("order_3", "order_4", "order_5", "order_6_plus"))
        self.assertEqual(4447, third_plus(a))
        self.assertEqual(3581, third_plus(b))
        self.assertAlmostEqual(14.88, third_plus(a) / a["total_births"] * 100, places=2)
        self.assertAlmostEqual(16.23, third_plus(b) / b["total_births"] * 100, places=2)
        self.assertLess(third_plus(b), third_plus(a))
        self.assertGreater(third_plus(b) / b["total_births"],
                           third_plus(a) / a["total_births"])
        self.assertIn("NOT parity-specific transition probabilities",
                      self.data["quality_guards"][0])

    def test_lithuanian_microdata_and_intentions_gap_is_documented(self):
        for text in ("N=271", "N=146", "N=118", "GGP LT", "P2", "P3",
                     "jau turimų vaikų skaičius", "2020 m.", "25 144", "23 556",
                     "nėra suderintos lentelės", "NEPATVIRTINTA"):
            self.assertIn(text, self.note)
        self.assertNotIn("FERTILITY-RESOURCE-PARITY-HYPOTHESIS-2026-01",
                         (ROOT / "index.html").read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
