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

    def test_housing_research_is_visible_and_source_bounded(self):
        city = json.loads(read('data/housing-verified-city-benchmarks-2024-2025.json'))
        sale = json.loads(read('data/housing-oberhaus-2025-12-two-room-new-vs-old-city-ranges.json'))
        rent = json.loads(read('data/housing-oberhaus-2025-12-one-room-rent-city-ranges.json'))
        self.assertEqual('OFFICIAL_CONTEXT_ONLY_NOT_AFFORDABILITY_RANKING',city['publication_state'])
        self.assertEqual(6,len(city['sale']['places']))
        self.assertEqual('2025-12',sale['date'])
        self.assertEqual('2025-12',rent['date'])
        self.assertEqual(3,sum(r['city_old_new_sales_geography_alignment']=='EXACT_DISTRICT_CLASS_LABEL'
                               for r in rent['rows']))
        self.assertTrue(sale['no_county_rank'])
        self.assertTrue(city['use_rules']['no_geography_swap'])
        for text in ('id="housingMarketResearch"','VDA S7R280','„Ober-Haus“',
                     '3,69 %','15 % pradinis įnašas',
                     '10 apskričių įperkamumo reitingas ir metinio taupymo m² rodiklis nepublikuojami',
                     '2025 m. gruodžio kainų apžvalga'):
            self.assertIn(text,self.js)
        self.assertIn('Ar pirmasis būstas prieinamas jaunoms šeimoms?',self.nav)
        self.assertIn('Atverti Būsto analizę',self.nav)
        self.assertNotIn('Ar jaunai porai prieinamas',self.nav)
        for price in (2846,1988,1741):
            self.assertTrue(any(round(r['eur_m2_2025'])==price for r in city['sale']['places']))

    def test_three_reader_conclusions_and_housing_first(self):
        self.assertIn('id="overviewThreeFindings"',self.nav)
        self.assertEqual(3,self.nav.count('<div class="card"><div class="eyebrow">0'))
        self.assertIn('Natūralus mažėjimas viršijo migracijos prieaugį',self.nav)
        self.assertIn('884 moterys / 1 000 vyrų',self.nav)
        self.assertIn('55,7 % Lietuvos privačių namų ūkių',self.nav)
        self.assertIn('Tai skirtingi rodikliai – ne gimstamumo priežasčių įrodymas',self.nav)
        self.assertIn('Tyrimai rodo sąsajas. Jų mastą Lietuvoje dar vertiname',self.nav)
        self.assertIn('Mūsų analizėje dar nenustatytas šių sąsajų dydis Lietuvoje',self.nav)
        self.assertIn('fertility-trends-across-the-oecd-underlying-drivers-and-the-role-for-policy',self.nav)
        self.assertNotIn('poveikio Lietuvos gimstamumui šis tyrimas neįrodė',self.nav)
        self.assertNotIn('Šeimos ir būsto aplinkos poveikis dar neišmatuotas',self.nav)
        self.assertNotIn('vien piniginės priemonės nepakaks',self.nav)
        self.assertIn('Ką jau galime pasakyti',self.js)
        self.assertIn('Ko dar negalime',self.js)
        market=self.js.index('id="housingMarketResearch"')
        support=self.js.index('id="housingSupportTitle"')
        payment=self.js.index('2025 m. regioninę paskatą gavo 515 jaunų šeimų.')
        self.assertLess(market,support)
        self.assertLess(support,payment)
        self.assertIn('1 700 ankstesnių metų prašymų',self.js)

    def test_eurostat_primary_in_population_with_three_context_links(self):
        d = json.loads(read('data/eurostat-household-composition-2024-2025.json'))
        self.assertEqual('Single adult without dependent children', d['category'])
        self.assertEqual(55.7, d['lithuania']['year_2025_pct'])
        self.assertEqual('p', d['lithuania']['year_2025_flag'])
        self.assertEqual(35.7, d['eu27']['year_2025_pct'])
        self.assertTrue(d['measuring_household_not_individual'])
        self.assertTrue(d['provisional_2025'])
        self.assertEqual(50.5, d['lithuania']['year_2024_pct'])
        primary = read('app-base.js')
        for fragment in ('id="populationHouseholdStructure"', '55,7 % Lietuvos privačių namų ūkių',
                         '35,7 %', '50,5 %', 'ilc_lvph02',
                         'namų ūkių, ne Lietuvos gyventojų procentas'):
            self.assertIn(fragment, primary)
        for path, anchor in [('housing-affordability.js', 'housingSingleAdultHouseholds'),
                             ('family-hypothesis.js', 'familySingleAdultHouseholds'),
                             ('migration-sex.js', 'migrationHouseholdContext')]:
            src = read(path)
            self.assertIn(anchor, src)
            self.assertIn('55,7 %', src)
            self.assertIn('?view=population#populationHouseholdStructure', src)
        for source in ('migration-sex.js', 'family-hypothesis.js', 'housing-affordability.js'):
            self.assertRegex(self.app, re.escape(source)+r'\?v=[A-Za-z0-9_-]+')

    def test_active_live_routing_and_cache(self):
        self.assertRegex(self.html, r'app\.js\?v=[A-Za-z0-9_-]+')
        self.assertRegex(self.app, r'housing-affordability\.js\?v=[A-Za-z0-9_-]+')
        self.assertRegex(self.app, r'research-nav\.js\?v=[A-Za-z0-9_-]+')
        self.assertIn('Visų 10 apskričių reitingas dar nepatvirtintas',self.nav)
        self.assertIn("housingAffordability:'housing'",self.nav)
        self.assertNotIn('jaunai dirbančiai porai',self.nav.lower())

if __name__=='__main__':
    unittest.main()
