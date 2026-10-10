"""Public housing state-support publication: immutable evidence and no draft models."""
import json
import re
import unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
read=lambda p: (ROOT/p).read_text(encoding='utf-8')

class HousingSupportPublication(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.js=read('housing-affordability.js')
        cls.app=read('app.js')
        cls.html=read('index.html')
        cls.nav=read('research-nav.js')
        cls.series=json.loads(read('data/housing-support-young-family-series-2019-2025.json'))
        cls.reconcile=json.loads(read('data/housing-support-2025-national-reconciliation-and-maxima.json'))

    def test_annual_series_single_regional_scheme(self):
        s=self.series
        self.assertEqual('OFFICIAL_SADM_2025_REPORT_FIG_32',s['status'])
        self.assertTrue(s['no_coverage_denominator'])
        self.assertTrue(s['no_percent_of_young_families'])
        self.assertEqual(list(range(2019,2026)),[r['year'] for r in s['rows']])
        self.assertEqual([820,1202,1580,1595,609,342,515],
            [r['young_families_main_subsidy_paid_n'] for r in s['rows']])
        self.assertIn('SADM',s['source'])

    def test_2025_reconciliation_and_rules(self):
        d=self.reconcile
        self.assertEqual(1039,d['both_schemes']['primary_support_count_official_report'])
        self.assertEqual(515+556-32,1039)
        self.assertEqual(76,44+32)
        self.assertEqual(18.56,d['both_schemes']['support_spend_m_eur_official_report'])
        self.assertEqual(560,d['2024_comparison']['scheme_A_additional'])
        self.assertEqual(44,d['scheme_A']['additional_subsidies_existing_families'])
        self.assertFalse(d['scheme_A']['assess_income_and_assets'])
        self.assertTrue(d['scheme_B']['assess_income_and_assets'])
        for row in d['scheme_A_2025_regulation']['maximum_subsidy_by_children']:
            self.assertEqual(87000*row['rate_pct']/100,row['max_eur'])
        self.assertTrue(d['guards']['not_support_coverage_percentage'])
        self.assertTrue(d['guards']['not_1039_young_families'])

    def test_visible_content_and_no_fake_eligibility_model(self):
        js=self.js
        for expected in ('Ar pirmasis būstas prieinamas jaunoms šeimoms?',
                         '1 700', '2019–2025','10 minučių',
                         '1 039 pagrindinės paramos gavėjai',
                         '560 šeimų','44 šeimos','8 700 €','10 875 €','13 050 €',
                         '515 / 1 700'):
            self.assertIn(expected,js)
        for unsafe in ('renderIncomeScreen','housingIncomeScreen',
                       'housingSupportIncomeChart','model_pair_annual_net_eur',
                       'housing-state-support-income-screen-2025.json'):
            self.assertNotIn(unsafe,js)
        self.assertIn('data/housing-support-young-family-series-2019-2025.json?v=20261010published',js)
        self.assertIn("data.rows.length!==7",js)
        self.assertNotIn('2026%20003%20006',js)

    def test_active_live_routing_and_cache(self):
        self.assertIn('app.js?v=20261010support',self.html)
        self.assertIn('housing-affordability.js?v=20261010support',self.app)
        self.assertIn('research-nav.js?v=20261010support',self.app)
        self.assertIn('Įperkamumas pagal apskritis dar tiriamas',self.nav)
        self.assertIn("housingAffordability:'housing'",self.nav)
        self.assertNotIn('jaunai dirbančiai porai',self.nav.lower())

if __name__=='__main__':
    unittest.main()
