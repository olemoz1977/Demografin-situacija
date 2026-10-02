#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]

GENERIC_SALE = ROOT / "data" / "housing-sale-smart-continent-housing-2024-diagnostic.csv"
MAPPING = ROOT / "data" / "municipality-county-map.csv"
VDA_2025 = ROOT / "research" / "raw" / "vda-sale-big-cities" / "vda-sale-big-cities-2025.csv"
INCOME = ROOT / "data" / "housing-income-county-model-2025-11.csv"
RENT = ROOT / "data" / "housing-rent-county-search-index-sample-2025.csv"
OUT = ROOT / "data" / "housing-affordability-preliminary-v01.csv"
OUT_JSON = ROOT / "data" / "housing-affordability-preliminary-v01.json"
QA = ROOT / "research" / "housing-affordability-preliminary-v01-qa.json"

EXPECTED_COUNTIES = {
    "Alytaus","Kauno","Klaipėdos","Marijampolės","Panevėžio",
    "Šiaulių","Tauragės","Telšių","Utenos","Vilniaus",
}

def pct(a: float, b: float) -> float:
    return (a / b - 1.0) * 100.0

def loo_median_ratio_mape(x: np.ndarray, y: np.ndarray) -> float:
    errors = []
    for i in range(len(x)):
        keep = np.arange(len(x)) != i
        factor = float(np.median(y[keep] / x[keep]))
        pred = factor * x[i]
        errors.append(abs(pred - y[i]) / y[i])
    return float(np.mean(errors) * 100.0)

def main() -> None:
    generic = pd.read_csv(GENERIC_SALE)
    mapping = pd.read_csv(MAPPING)
    vda = pd.read_csv(VDA_2025)
    income = pd.read_csv(INCOME)
    rent = pd.read_csv(RENT)

    generic = generic.merge(
        mapping[["sav_pav","apskritis"]],
        left_on="municipality",
        right_on="sav_pav",
        how="left",
        validate="one_to_one",
    )
    if generic["apskritis"].isna().any():
        raise ValueError("Unmapped municipalities in Smart Continent layer")
    if len(generic) != 60:
        raise ValueError(f"Expected 60 municipality rows, got {len(generic)}")

    # Calibrate 2024 generic-housing transaction price to 2025 apartment transaction
    # price using the six municipalities where official VDA S7R280 is available.
    cal = generic[["municipality","avg_housing_transaction_eur_m2_raw"]].merge(
        vda[["municipality","price_eur_m2"]],
        on="municipality",
        how="inner",
        validate="one_to_one",
    )
    if len(cal) != 6:
        raise ValueError(f"Expected six calibration cities, got {len(cal)}")

    x = cal["avg_housing_transaction_eur_m2_raw"].to_numpy(float)
    y = cal["price_eur_m2"].to_numpy(float)
    ratios = y / x
    factor = float(np.median(ratios))
    loo_mape = loo_median_ratio_mape(x, y)

    cal = cal.assign(
        calibration_ratio=ratios,
        model_price_eur_m2=x * factor,
    )
    cal["model_error_pct"] = (
        (cal["model_price_eur_m2"] / cal["price_eur_m2"] - 1.0) * 100.0
    )

    # Aggregate the 2024 generic-housing transaction measure to county using its own
    # transaction count. This is explicitly a proxy, not an apartment transaction layer.
    county_rows = []
    for county, g in generic.groupby("apskritis", sort=True):
        w = pd.to_numeric(g["housing_transactions"], errors="raise").astype(float)
        p = pd.to_numeric(g["avg_housing_transaction_eur_m2_raw"], errors="raise").astype(float)
        if (w <= 0).any() or (p <= 0).any():
            raise ValueError(f"Non-positive sale proxy input in {county}")
        generic_county = float(np.average(p, weights=w))
        county_rows.append({
            "county": county,
            "generic_housing_2024_eur_m2_weighted": generic_county,
            "generic_housing_transactions_2024": int(w.sum()),
            "sale_price_proxy_2025_eur_m2": generic_county * factor,
        })
    sale = pd.DataFrame(county_rows)
    if set(sale["county"]) != EXPECTED_COUNTIES:
        raise ValueError("Sale proxy does not cover 10 counties")

    merged = (
        income.merge(sale, on="county", validate="one_to_one")
        .merge(
            rent[[
                "county","sample_n","localities_n","localities",
                "rent_month_median_eur","quality"
            ]],
            on="county",
            validate="one_to_one",
        )
    )
    if set(merged["county"]) != EXPECTED_COUNTIES:
        raise ValueError("Final preliminary layer does not cover 10 counties")

    merged["pair_net_income_eur_month"] = merged["model_net_25_30_eur_month"] * 2
    merged["pair_net_income_eur_year"] = merged["pair_net_income_eur_month"] * 12
    merged["annual_rent_eur"] = merged["rent_month_median_eur"] * 12
    merged["income_after_rent_eur_year"] = (
        merged["pair_net_income_eur_year"] - merged["annual_rent_eur"]
    )
    merged["m2_per_year_after_rent"] = (
        merged["income_after_rent_eur_year"] / merged["sale_price_proxy_2025_eur_m2"]
    )
    merged["m2_per_year_without_rent"] = (
        merged["pair_net_income_eur_year"] / merged["sale_price_proxy_2025_eur_m2"]
    )
    merged["rent_burden_pct_pair_net_income"] = (
        merged["annual_rent_eur"] / merged["pair_net_income_eur_year"] * 100.0
    )
    merged["pair_net_income_months_per_one_m2"] = (
        merged["sale_price_proxy_2025_eur_m2"] / merged["pair_net_income_eur_month"]
    )

    merged["income_status"] = "MODELLED_B"
    merged["sale_status"] = "PRELIMINARY_MODELLED_PROXY"
    merged["rent_status"] = merged["quality"].map(
        lambda q: "PRELIMINARY_LOW_N" if q == "insufficient" else "PRELIMINARY_SAMPLE"
    )
    merged["value_status"] = "PRELIMINARY_V0.1_TO_BE_REFINED"
    merged["needs_refinement"] = True

    # Rank is descriptive only and explicitly provisional.
    merged["preliminary_affordability_rank"] = (
        merged["m2_per_year_after_rent"].rank(method="min", ascending=False).astype(int)
    )

    cols = [
        "preliminary_affordability_rank","county",
        "model_net_25_30_eur_month","pair_net_income_eur_month",
        "rent_month_median_eur","sample_n","quality",
        "generic_housing_2024_eur_m2_weighted","generic_housing_transactions_2024",
        "sale_price_proxy_2025_eur_m2",
        "m2_per_year_after_rent","m2_per_year_without_rent",
        "rent_burden_pct_pair_net_income","pair_net_income_months_per_one_m2",
        "income_status","sale_status","rent_status","value_status","needs_refinement",
        "localities_n","localities",
    ]
    out = merged[cols].sort_values("preliminary_affordability_rank").copy()

    for c in [
        "model_net_25_30_eur_month","pair_net_income_eur_month",
        "rent_month_median_eur","generic_housing_2024_eur_m2_weighted",
        "sale_price_proxy_2025_eur_m2","m2_per_year_after_rent",
        "m2_per_year_without_rent","rent_burden_pct_pair_net_income",
        "pair_net_income_months_per_one_m2",
    ]:
        out[c] = out[c].astype(float).round(2)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(out.to_csv(index=False), encoding="utf-8")
    OUT_JSON.write_text(
        json.dumps({
            "version": "v0.1-preliminary",
            "status": "PRELIMINARY_V0.1_TO_BE_REFINED",
            "rows": out.to_dict("records"),
        }, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    qa = {
        "version": "v0.1-preliminary",
        "publication_mode": "PRELIMINARY_WITH_EXPLICIT_UNCERTAINTY",
        "validated_publication_ready": False,
        "preliminary_publication_ready": True,
        "target": "10 counties; working 25-30-year-old childless couple",
        "formula": "[(2 × monthly net income × 12) - annual rent] / apartment sale price proxy EUR/m²",
        "sale_proxy": {
            "source_base": "Smart Continent 2024 generic housing actual-transaction price by 60 municipalities",
            "county_aggregation": "transaction-count weighted generic-housing price",
            "calibration_target": "official VDA S7R280 2025 apartment EUR/m² in six city municipalities",
            "calibration_method": "median of six ratios: VDA 2025 apartment price / Smart Continent 2024 generic-housing price",
            "factor": factor,
            "six_city_ratio_min": float(ratios.min()),
            "six_city_ratio_max": float(ratios.max()),
            "six_city_ratio_median": factor,
            "leave_one_out_mape_pct": loo_mape,
            "warning": "Calibration is validated only in six city municipalities; transfer to rural municipalities/counties is unvalidated. This is not an official county apartment price.",
            "calibration_rows": cal.round(4).to_dict("records"),
        },
        "rent_proxy": {
            "source": "Skelbiu.lt 2025 historical search-index listing sample",
            "aggregation": "direct listing-level county median",
            "counties_n_ge_5": int((rent["sample_n"] >= 5).sum()),
            "counties_n_lt_5": rent.loc[rent["sample_n"] < 5, "county"].tolist(),
            "warning": "Search-index is not a complete portal export; Tauragė has N=2. Cross-portal QA showed a large Vilnius gap versus Aruodas.",
        },
        "income": {
            "source": "2025-11 county model based on Sodra",
            "status": "B-modelled",
        },
        "rules": [
            "Every v0.1 number is labelled preliminary and needs refinement.",
            "Do not describe sale_price_proxy_2025_eur_m2 as an official county apartment transaction price.",
            "Do not describe Skelbiu rent sample as a complete county market census.",
            "Replace the sale proxy when official 2025 60-municipality apartment data arrive.",
            "Replace/validate rent when a publication-grade 10-county provider layer arrives.",
        ],
        "rows": out.to_dict("records"),
    }
    QA.write_text(json.dumps(qa, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(out.to_string(index=False))
    print(json.dumps({
        "factor": round(factor, 6),
        "loo_mape_pct": round(loo_mape, 3),
        "preliminary_publication_ready": True,
        "validated_publication_ready": False,
    }, ensure_ascii=False))

if __name__ == "__main__":
    main()
