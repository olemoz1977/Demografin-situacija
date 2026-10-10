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
        self.assertIn("ar pirmasis būstas prieinamas jaunoms šeimoms?", self.nav.lower())

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
        self.assertIn("research-nav.js?v=20261009fertility", self.app)
        self.assertIn("housing-affordability.js?v=20261010crosslink", self.app)
        self.assertIn("2024–2025", self.housing)
        self.assertIn("2024–2025", self.nav)

    def test_first_home_affordability_and_fertility_remain_main_question(self):
        self.assertIn("Ar pirmasis būstas prieinamas jaunoms šeimoms?", self.housing)
        self.assertIn("gimstamumu", self.housing)
        self.assertIn("tyrimo hipotezė, o ne įrodytas priežastinis poveikis", self.housing)
        self.assertIn("įperkamumo ar poveikio gimstamumui nustatyti negalima", self.nav)

    def test_household_context_is_not_misread_as_young_families(self):
        self.assertIn("55,7 % privačių namų ūkių", self.housing)
        self.assertIn("įvairaus amžiaus žmonės", self.housing)
        self.assertIn("neįrodo jaunų šeimų būsto neprieinamumo", self.housing)
        self.assertIn("namų ūkių, ne gyventojų", self.housing)

    def test_leaving_parental_home_is_not_mislabelled_first_purchase(self):
        self.assertIn("22,7 metų", self.housing)
        self.assertIn("26,3 metų", self.housing)
        self.assertIn("2024 m. – 22,4", self.housing)
        self.assertIn("Tai išsikėlimas iš tėvų namų, o ne pirmojo nuosavo būsto įsigijimas.", self.housing)
        self.assertNotIn("22,7 metų – pirmasis nuosavas būstas", self.housing)

    def test_city_benchmarks_not_mislabelled_as_young_family_county_rankings(self):
        self.assertIn("Butų kainų orientyrai šešiuose miestuose", self.housing)
        self.assertIn("Miestas nėra apskritis", self.housing)
        self.assertIn("housing-verified-city-benchmarks-2024-2025.json", self.housing)
        city = json.loads((ROOT / "data/housing-verified-city-benchmarks-2024-2025.json").read_text(encoding="utf-8"))
        self.assertEqual(6, len(city["sale"]["places"]))
        self.assertEqual(5, len(city["rent"]["places"]))
        self.assertTrue(city["use_rules"]["no_geography_swap"])
        self.assertTrue(city["use_rules"]["no_first_home_claim"])
        self.assertTrue(city["sale"]["no_quality_or_floor_area_control"])
        self.assertTrue(city["rent"]["not_one_room_basket"])
        self.assertEqual(2846.01, next(x["eur_m2_2025"] for x in city["sale"]["places"] if x["name"] == "Vilnius"))

    def test_city_change_and_rent_monthly_conversion_have_lineage(self):
        raw = json.loads((ROOT / "data/housing-verified-city-benchmarks-2024-2025.json").read_text(encoding="utf-8"))
        derived = json.loads((ROOT / "data/housing-city-market-changes-derived-2024-2025.json").read_text(encoding="utf-8"))
        self.assertEqual(6, len(derived["rows"]))
        self.assertTrue(derived["guards"]["reject_first_home_affordability_claim"])
        self.assertTrue(derived["guards"]["not_identical_properties_year_to_year"])
        self.assertTrue(derived["guards"]["Alytus_2025_rent_null"])
        rent = {p["municipality"]: p["annual_eur_m2"] for p in raw["rent"]["places"]}
        sale = {p["municipality"]: p for p in raw["sale"]["places"]}
        for row in derived["rows"]:
            key = row["city_municipality"]
            orig = sale[key]
            self.assertEqual(orig["eur_m2_2024"], row["sale_2024_eur_m2"])
            self.assertEqual(orig["eur_m2_2025"], row["sale_2025_eur_m2"])
            growth = round((orig["eur_m2_2025"] / orig["eur_m2_2024"] - 1) * 100, 1)
            self.assertAlmostEqual(growth, row["sale_2024_2025_change_pct"])
            if key in rent:
                self.assertEqual(rent[key], row["rent_2025_eur_m2_year"])
                self.assertAlmostEqual(round(rent[key] / 12, 1),
                                       row["rent_2025_eur_m2_month_equivalent"])
            else:
                self.assertIsNone(row["rent_2025_eur_m2_month_equivalent"])
        self.assertIn("Pardavimo kainų pokytis 2024–2025, %", self.housing)
        self.assertIn("metinė reikšmė / 12", self.housing)
        self.assertIn("tai nėra tų pačių butų kainų indeksas", self.housing.lower())

    def test_existing_first_birth_age_chart_is_linked_not_duplicated(self):
        self.assertIn('href="?view=fertility#amzius"', self.housing)
        self.assertIn("jau pateikti", self.housing)
        self.assertNotIn("28,7 metų", self.housing)
        self.assertIn("neįrodo būsto kainų įtakos gimstamumui", self.housing)

    def test_three_city_sensitivity_model_is_not_a_county_or_family_average(self):
        scenario = json.loads(
            (ROOT / "data/housing-first-home-saving-scenarios-city3-2025.json").read_text(encoding="utf-8")
        )
        housing = json.loads(
            (ROOT / "data/housing-verified-city-benchmarks-2024-2025.json").read_text(encoding="utf-8")
        )
        rental = json.loads(
            (ROOT / "research/raw/aruodas-rent-benchmark-2025/aruodas-1room-rent-2025-qa.json").read_text(encoding="utf-8")
        )
        original_income = json.loads(
            (ROOT / "data/housing-affordability-input.json").read_text(encoding="utf-8")
        )
        self.assertEqual("RESEARCH_ONLY_DO_NOT_USE_FOR_COUNTY_RANKING", scenario["publication_status"])
        self.assertTrue(scenario["guards"]["do_not_call_official_young_family_mean"])
        self.assertTrue(scenario["guards"]["do_not_call_10_county_ranking"])
        self.assertEqual(9, len(scenario["rows"]))
        inc = original_income["national_youth_25_30"]["net_eur_month"]
        prices = {r["name"]:r["eur_m2_2025"] for r in housing["sale"]["places"]}
        for row in scenario["rows"]:
            city = row["city"]
            annual = max(0, 12 * (
                2 * inc - rental["summary"][city]["mean_eur_month"] -
                row["monthly_other_expenses_eur_ASSUMED"]
            ))
            self.assertAlmostEqual(annual, row["annual_saving_eur_MODEL"], delta=0.01)
            self.assertAlmostEqual(
                annual / prices[city], row["m2_price_equivalent_year_MODEL"], delta=0.01
            )
            self.assertAlmostEqual(
                prices[city] * 50 * 0.15, row["deposit_50m2_15percent_eur_MODEL"], delta=0.01
            )

    def test_ldp_2024_household_county_income_is_not_young_family_2025_income(self):
        data = json.loads(
            (ROOT / "data/ldp-household-disposable-income-county-2024.json").read_text(encoding="utf-8")
        )
        self.assertEqual("2024", data["period"])
        self.assertEqual("EUR_PER_HOUSEHOLD_PER_MONTH", data["unit"])
        self.assertEqual(10, len(data["rows"]))
        self.assertTrue(data["not_first_home_income_proxy"])
        self.assertTrue(data["cannot_replace_2025_income"])
        self.assertEqual(0, data["actual_2025_rows_in_source"])
        amounts = {r["county"]: r["monthly_disposable_cash_income_eur_per_household"] for r in data["rows"]}
        self.assertEqual(2115, amounts["Vilniaus apskritis"])
        self.assertEqual(1242, amounts["Tauragės apskritis"])
        self.assertEqual(1241, amounts["Telšių apskritis"])
        self.assertEqual(10, len(set(amounts)))

    def test_reverse_budget_reproduces_source_and_preserves_2025_deposit_rule(self):
        model = json.loads(
            (ROOT / "data/housing-first-home-reverse-budget-2025.json").read_text(encoding="utf-8")
        )
        source = json.loads(
            (ROOT / "data/housing-first-home-saving-scenarios-city3-2025.json").read_text(encoding="utf-8")
        )
        self.assertEqual(18, len(model["rows"]))
        self.assertTrue(model["not_county_rankings"])
        self.assertTrue(model["not_young_family_income_statistic"])
        self.assertTrue(model["not_bank_approval"])
        self.assertIn("2026-08-01", model["regulator_2026_comparability_warning"] +
                      model["baseline_rules"])
        self.assertEqual({0.15, 0.2}, {x["deposit_share_ASSUMED"] for x in model["rows"]})
        base = {x["city"]: x for x in source["rows"] if x["monthly_other_expenses_eur_ASSUMED"] == 1700}
        for row in model["rows"]:
            start = base[row["city"]]
            dp = start["city_apartment_sale_average_2025_eur_m2"] * 50 * row["deposit_share_ASSUMED"]
            need = dp / 12 / row["years_target"]
            max_other = start["monthly_two_net_eur_MODEL"] - start["monthly_asking_rent_eur_MODEL"] - need
            self.assertAlmostEqual(dp, row["deposit_eur"], delta=0.01)
            self.assertAlmostEqual(need, row["required_saving_eur_month"], delta=0.01)
            self.assertAlmostEqual(max_other, row["max_nonrent_outgoings_eur_month"], delta=0.01)
        vilnius3 = next(x for x in model["rows"] if x["city"] == "Vilnius"
                        and x["deposit_share_ASSUMED"] == 0.15 and x["years_target"] == 3)
        self.assertAlmostEqual(2008.33, vilnius3["max_nonrent_outgoings_eur_month"], delta=0.01)

    def test_unmatched_apartment_quality_blocks_city_affordability_comparison(self):
        first = json.loads(
            (ROOT / "data/housing-first-home-saving-scenarios-city3-2025.json").read_text(encoding="utf-8")
        )
        reverse = json.loads(
            (ROOT / "data/housing-first-home-reverse-budget-2025.json").read_text(encoding="utf-8")
        )
        self.assertTrue(first["quality_comparability_gate"].startswith("FAIL_"))
        self.assertTrue(reverse["quality_comparability_gate"].startswith("FAIL_"))
        self.assertFalse(first["between_city_affordability_comparison_allowed"])
        self.assertFalse(reverse["between_city_affordability_comparison_allowed"])
        self.assertFalse(first["site_publication_allowed"])
        self.assertFalse(reverse["site_publication_allowed"])
        self.assertTrue(reverse["area_assumption_not_quality_control"])
        self.assertIn("construction_period_groups", first["next_price_basket_required"])
        self.assertIn("transactions_N", first["next_price_basket_required"]["metrics"])

    def test_two_room_partial_finish_market_range_keeps_uncertainty(self):
        original = json.loads((ROOT / "data/housing-oberhaus-2025-two-room-new-partial-city-ranges.json").read_text(encoding="utf-8"))
        derived = json.loads((ROOT / "data/housing-first-home-quality-segment-sensitivity-2025.json").read_text(encoding="utf-8"))
        self.assertEqual(12, len(original["rows"]))
        self.assertEqual(6, len({r["city"] for r in original["rows"]}))
        self.assertEqual({"2025-01", "2025-12"}, {r["month"] for r in original["rows"]})
        self.assertEqual({2}, {r["rooms"] for r in original["rows"]})
        self.assertEqual({"dalinė apdaila"}, {r["finish"] for r in original["rows"]})
        self.assertTrue(original["no_finish_cost_included"])
        self.assertTrue(original["do_not_relabel_as_10_counties"])
        self.assertTrue(derived["do_not_rank_cities"])
        self.assertEqual(3, len(derived["rows"]))
        prices = {r["city"]: r for r in original["rows"] if r["month"] == "2025-12"}
        for row in derived["rows"]:
            p = prices[row["city"]]
            self.assertEqual("BLOCKED", row["rankability"])
            self.assertFalse(row["first_home_cost_complete"])
            self.assertAlmostEqual(row["model_annual_savings_eur"] / p["price_max_eur_m2"],
                row["m2_price_equivalent_lower_at_high_price"], delta=0.01)
            self.assertAlmostEqual(row["model_annual_savings_eur"] / p["price_min_eur_m2"],
                row["m2_price_equivalent_upper_at_low_price"], delta=0.01)

    def test_civic_housing_research_is_zero_eur_with_paid_route_closed(self):
        readiness = json.loads(
            (ROOT / "research/housing-affordability-readiness.json").read_text(encoding="utf-8")
        )
        budget = readiness["funding_rule"]
        self.assertEqual(0, budget["total_budget_eur"])
        self.assertFalse(budget["paid_data_or_subscriptions_allowed"])
        self.assertEqual("CLOSED_NO_BUDGET", budget["RC_custom_aggregate_status"])
        self.assertEqual("CLOSED_DO_NOT_SEND", budget["RC_quote_request_status"])
        archived = (ROOT / "research/rc-2025-comparable-two-room-quote-request-UNSENT.md").read_text(encoding="utf-8")
        self.assertIn("NEBUS SIUNČIAMA", archived)
        self.assertIn("Biudžetas 0 EUR", archived)

    def test_free_december_rent_and_two_room_sale_are_same_source_time_and_area(self):
        base = ROOT / "data"
        rent = json.loads((base / "housing-oberhaus-2025-12-one-room-rent-city-ranges.json").read_text(encoding="utf-8"))
        price = json.loads((base / "housing-oberhaus-2025-12-two-room-new-vs-old-city-ranges.json").read_text(encoding="utf-8"))
        model = json.loads((base / "housing-first-home-2025-12-consistent-market-snapshot-scenarios.json").read_text(encoding="utf-8"))
        self.assertEqual("2025-12", rent["date"])
        self.assertEqual(rent["date"], price["date"])
        self.assertTrue(model["same_source_and_month"])
        self.assertTrue(model["matching_city_district_label"])
        self.assertTrue(model["do_not_rank_cities"])
        self.assertTrue(model["do_not_publish"])
        self.assertTrue(model["does_not_adjust_for_fitout_costs"])
        self.assertEqual(5, len(rent["rows"]))
        self.assertEqual(6, len(price["rows"]))
        self.assertEqual(6, len(model["rows"]))
        matched = {r["city"]: r for r in rent["rows"]
                   if r["city_old_new_sales_geography_alignment"] == "EXACT_DISTRICT_CLASS_LABEL"}
        self.assertEqual({"Vilnius", "Kaunas", "Klaipėda"}, set(matched))
        market = {r["city"]: r for r in price["rows"]}
        for row in model["rows"]:
            self.assertIn(row["city"], matched)
            self.assertFalse(row["publication_allowed"])
            self.assertFalse(row["housing_completion_costs_known"])
            self.assertEqual("BLOCKED", row["rankability"])
            self.assertEqual(matched[row["city"]]["low_eur_month"], row["monthly_2025_12_rent_low_eur"])
            self.assertEqual(matched[row["city"]]["high_eur_month"], row["monthly_2025_12_rent_high_eur"])
            src = market[row["city"]]
            key_low = "new_build_partial_finish_eur_m2_low" if row["sale_segment"] == "new_partial_finish" else "old_build_eur_m2_low"
            key_high = "new_build_partial_finish_eur_m2_high" if row["sale_segment"] == "new_partial_finish" else "old_build_eur_m2_high"
            self.assertEqual(src[key_low], row["price_2025_12_low_eur_m2"])
            self.assertEqual(src[key_high], row["price_2025_12_high_eur_m2"])
            cash = model["income_net_month_model_eur"] - model["other_nonrent_monthly_outgoings_assumption_eur"]
            min_cash = max(0, 12 * (cash - row["monthly_2025_12_rent_high_eur"]))
            max_cash = max(0, 12 * (cash - row["monthly_2025_12_rent_low_eur"]))
            self.assertEqual(min_cash, row["annualized_hypothetical_savings_eur_low"])
            self.assertEqual(max_cash, row["annualized_hypothetical_savings_eur_high"])
            self.assertAlmostEqual(min_cash / src[key_high], row["m2_price_equivalent_low"], delta=0.01)
            self.assertAlmostEqual(max_cash / src[key_low], row["m2_price_equivalent_high"], delta=0.01)

    def test_mortgage_per_m2_uses_2025_rate_without_50sqm_guess(self):
        model = json.loads(
            (ROOT / "data/housing-first-home-2025-12-per-m2-mortgage-burden.json").read_text(encoding="utf-8")
        )
        prices = json.loads(
            (ROOT / "data/housing-oberhaus-2025-12-two-room-new-vs-old-city-ranges.json").read_text(encoding="utf-8")
        )
        self.assertEqual("2025-12", model["period"])
        self.assertEqual(3.69, model["loan_rate_2025_dec_pct"])
        self.assertEqual(5, model["rules_2025"]["stress_interest_pct"])
        self.assertEqual(360, model["loan_term_months"])
        self.assertEqual(0.15, model["rules_2025"]["initial_deposit"])
        self.assertTrue(model["big_guardrails"]["no_apartment_area_assumed"])
        self.assertTrue(model["big_guardrails"]["not_a_territorial_ranking"])
        self.assertTrue(model["big_guardrails"]["paid_inputs_used"] is False)
        self.assertEqual(6, len(model["rows"]))
        by_city = {r["city"]: r for r in prices["rows"]}
        for row in model["rows"]:
            original = by_city[row["city"]]
            part = row["sale_quality_segment"]
            field = "new_build_partial_finish" if part == "new_build_partial_finish" else "old_build"
            for edge in ("low", "high"):
                price = original[field + "_eur_m2_" + edge]
                self.assertEqual(price, row["source_asking_or_expert_price_eur_m2_" + edge])
                self.assertAlmostEqual(price * 0.15, row["deposit_15pct_eur_per_m2_" + edge], delta=0.01)
                for annual, field_name in ((3.69, "monthly_loan_payment_eur_per_m2_"),
                                           (5, "monthly_5pct_stress_eur_per_m2_")):
                    rate = annual / 1200
                    monthly = price * 0.85 * rate / (1 - (1+rate)**(-360))
                    self.assertAlmostEqual(monthly, row[field_name + edge], delta=0.01)
            self.assertFalse(row["construction_completion_cost_known"])
            self.assertFalse(row["between_city_comparable"])

    def test_sadm_demand_2025_and_2026_support_scheme_not_confused(self):
        demand = json.loads(
            (ROOT / "data/housing-state-support-demand-context-2025-2026.json")
            .read_text(encoding="utf-8")
        )
        self.assertTrue(demand["rules"]["do_not_compute_515_divided_by_1700"])
        self.assertTrue(demand["rules"]["do_not_merge_A_and_B"])
        self.assertTrue(demand["rules"]["do_not_treat_2026_05_event_as_2025_or_A"])
        self.assertTrue(demand["rules"]["do_not_call_predicted_support_granted"])
        self.assertTrue(demand["rules"]["do_not_call_all_2026_09_applications_funded_until_outcome_verified"])
        cases = {(x["date"], x["scheme"], x["metric"]):x for x in demand["facts"]}
        self.assertEqual(1700, cases["2025-01-01","A","waiting_legacy_application_families"]["value_approx"])
        self.assertEqual(515, cases["2025","A","recipients_paid_families"]["value"])
        self.assertEqual(10, cases["2026-05-19","B","applications_acceptance_window"]["minutes"])
        self.assertEqual(1000, cases["2026-05-19","B","applications_submitted"]["value_approx"])
        self.assertEqual(800, cases["2026-09-29","A","applications_submitted_2026_sept"]["value_approx"])
        self.assertIn("515 šeimų – tai išmokų skaičius", self.housing)
        self.assertIn("Tai NE 2025 m. 515", self.housing)
        self.assertIn("neteisingas procentas", self.housing)

    def test_households_are_explicitly_not_owned_homes(self):
        self.assertIn("Ką reiškia „namų ūkis“?", self.housing)
        self.assertIn("Namų ūkis ≠ nuosavas būstas.", self.housing)
        self.assertIn("Viename būste gali būti keli atskiri namų ūkiai.", self.housing)

    def test_county_comparability_block_remains(self):
        self.assertIn("50 m²", self.housing)
        self.assertIn("N.", self.housing)
        self.assertIn("Būsto kainų palyginimo dar nerodome", self.housing)


if __name__ == "__main__":
    unittest.main()
