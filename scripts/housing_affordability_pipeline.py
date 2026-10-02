#!/usr/bin/env python3
"""
OMESG360 / Demografinė situacija
Housing affordability research pipeline.

LEGACY DIAGNOSTIC PIPELINE — NOT PUBLICATION READY.

Purpose:
- reproduce the earlier VDA/RC 1 km grid + municipal rent-sample experiment;
- support QA and method comparison only.

Do NOT use its sale or rent outputs as the main 10-county housing-affordability layer.
Current source gates are:
- sale: official RC actual-apartment-transaction layer, 60 municipalities / 10 counties;
- rent: publication-grade private long-term 1-room layer covering all 10 counties.

The VDA/RC 1 km transaction grid (dataset 2559) and Smart Continent BI_3 are QA-only.
This script does not scrape websites. It consumes source exports saved locally.
Expected current source decisions are documented under research/.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import pandas as pd

COUNTY_BY_MUNICIPALITY_PREFIX = {
    "11": "Alytaus",
    "12": "Kauno",
    "13": "Klaipėdos",
    "14": "Marijampolės",
    "15": "Panevėžio",
    "16": "Šiaulių",
    "17": "Tauragės",
    "18": "Telšių",
    "19": "Utenos",
    "10": "Vilniaus",
}

def clean_code(v):
    if pd.isna(v):
        return None
    s = str(v).strip().replace(".0", "")
    return s.zfill(2)

def load_grid(path: Path) -> pd.DataFrame:
    df = pd.read_csv(path)
    # As above, _page.next on the last CSV row is normal Spinta behavior and
    # cannot be used by itself as an incompleteness test.
    required = {"_id", "sav_pav", "sav_kodas"}
    missing = required - set(df.columns)
    if missing:
        raise ValueError(f"Grid file missing columns: {sorted(missing)}")
    df = df.rename(columns={"_id": "grid_ref_id"})
    df["sav_kodas"] = df["sav_kodas"].map(clean_code)
    return df[["grid_ref_id", "sav_pav", "sav_kodas"]]

def load_transactions(path: Path, year: int | None = None, start_year: int | None = None, end_year: int | None = None) -> pd.DataFrame:
    df = pd.read_csv(path)
    # Spinta CSV exports place _page.next on the last row even when that row
    # belongs to the final data page. Presence of a cursor alone therefore
    # does NOT prove that another non-empty page exists.
    grid_col = "sq_grid_id._id" if "sq_grid_id._id" in df.columns else "sq_grid_id"
    required = {grid_col, "data_nuo", "objektu_sk", "vid_buto_verte", "buto_verte_p50"}
    missing = required - set(df.columns)
    if missing:
        raise ValueError(f"Transaction file missing columns: {sorted(missing)}")
    df["data_nuo"] = pd.to_datetime(df["data_nuo"], errors="coerce")
    df["year"] = df["data_nuo"].dt.year
    if year is not None:
        df = df[df["year"].eq(year)].copy()
    else:
        if start_year is not None:
            df = df[df["year"].ge(start_year)].copy()
        if end_year is not None:
            df = df[df["year"].le(end_year)].copy()
    df = df.rename(columns={grid_col: "grid_ref_id"})
    df["objektu_sk"] = pd.to_numeric(df["objektu_sk"], errors="coerce")
    df["vid_buto_verte"] = pd.to_numeric(df["vid_buto_verte"], errors="coerce")
    df["buto_verte_p50"] = pd.to_numeric(df["buto_verte_p50"], errors="coerce")
    return df

def add_county(df: pd.DataFrame) -> pd.DataFrame:
    # Lithuanian municipality codes are preserved for QA.
    # County mapping should preferably be replaced with an authoritative municipality->county lookup
    # if sav_kodas semantics differ in a source export.
    if "apskritis" in df.columns:
        return df
    raise ValueError("Authoritative municipality->county mapping is required before aggregation.")

def weighted_mean(values, weights):
    mask = values.notna() & weights.notna() & weights.gt(0)
    if not mask.any():
        return float("nan")
    return (values[mask] * weights[mask]).sum() / weights[mask].sum()


def weighted_median(values, weights):
    mask = values.notna() & weights.notna() & weights.gt(0)
    if not mask.any():
        return float("nan")
    x = pd.DataFrame({"v": values[mask].astype(float), "w": weights[mask].astype(float)}).sort_values("v")
    cutoff = x["w"].sum() / 2
    return float(x.loc[x["w"].cumsum().ge(cutoff), "v"].iloc[0])


def aggregate_transactions(transactions: pd.DataFrame, grid: pd.DataFrame, municipality_county: pd.DataFrame):
    tx = transactions.copy()
    tx["grid_ref_id"] = tx["grid_ref_id"].astype(str)
    tx = tx.merge(grid, on="grid_ref_id", how="left", validate="many_to_one")
    tx = tx.merge(
        municipality_county[["sav_kodas", "apskritis"]].drop_duplicates(),
        on="sav_kodas", how="left", validate="many_to_one"
    )

    qa_unmapped = tx["apskritis"].isna().sum()
    if qa_unmapped:
        raise ValueError(f"{qa_unmapped} transaction rows could not be mapped to a county.")

    rows = []
    for county, g in tx.groupby("apskritis", dropna=False):
        rows.append({
            "apskritis": county,
            "sale_eur_m2_mean_weighted": weighted_mean(g["vid_buto_verte"], g["objektu_sk"]),
            "sale_eur_m2_p50_weighted": weighted_mean(g["buto_verte_p50"], g["objektu_sk"]),
            "sale_eur_m2_p50_weighted_median": weighted_median(g["buto_verte_p50"], g["objektu_sk"]),
            "transaction_objects_n": g["objektu_sk"].sum(min_count=1),
            "grid_rows_n": len(g),
        })
    return pd.DataFrame(rows)

def npd_2025(gross: float) -> float:
    if gross <= 1038:
        return 747.0
    if gross <= 2387.29:
        return max(0.0, 747.0 - 0.49 * (gross - 1038.0))
    return max(0.0, 400.0 - 0.18 * (gross - 642.0))


def net_salary_2025(gross: float, pension_extra_rate: float = 0.0) -> float:
    """Approximate monthly net salary under 2025 LT payroll rules.
    Base employee social rate = 19.5%; optional pension_extra_rate is 0.03 for II-pillar contribution.
    """
    social = 0.195 + pension_extra_rate
    npd = npd_2025(gross)
    gpm = 0.20 * max(0.0, gross - npd)
    return gross - social * gross - gpm


def build_youth_income_model(
    municipality: pd.DataFrame,
    national_youth_gross: float = 2516.0,
    national_all_full_month_gross: float = 2407.0,
    pension_extra_rate: float = 0.0,
) -> pd.DataFrame:
    required = {"apskritis", "gross_all_eur_2025_11", "insured_thousand_2025_11"}
    missing = required - set(municipality.columns)
    if missing:
        raise ValueError(f"Municipality income file missing columns: {sorted(missing)}")
    out = municipality.copy()
    factor = national_youth_gross / national_all_full_month_gross
    out["income_gross_model_25_30"] = out["gross_all_eur_2025_11"] * factor
    out["income_net_model_25_30"] = out["income_gross_model_25_30"].map(
        lambda x: net_salary_2025(float(x), pension_extra_rate=pension_extra_rate)
    )
    out["weight_young_workers"] = out["insured_thousand_2025_11"]
    return out


def aggregate_income(income: pd.DataFrame) -> pd.DataFrame:
    required = {"apskritis", "income_net_model_25_30", "weight_young_workers"}
    missing = required - set(income.columns)
    if missing:
        raise ValueError(f"Income file missing columns: {sorted(missing)}")
    rows = []
    for county, g in income.groupby("apskritis"):
        rows.append({
            "apskritis": county,
            "income_net_25_30_month": weighted_mean(g["income_net_model_25_30"], g["weight_young_workers"]),
            "young_worker_weight_n": g["weight_young_workers"].sum(min_count=1),
        })
    return pd.DataFrame(rows)

def aggregate_rent(rent: pd.DataFrame) -> pd.DataFrame:
    required = {"sav_kodas", "apskritis", "rent_1room_month_median", "rent_sample_n", "weight_young_workers"}
    missing = required - set(rent.columns)
    if missing:
        raise ValueError(f"Rent file missing columns: {sorted(missing)}")

    rent = rent.copy()
    rent["rent_quality"] = pd.cut(
        rent["rent_sample_n"],
        bins=[-1, 4, 9, float("inf")],
        labels=["insufficient", "C", "B"]
    )

    usable = rent[rent["rent_sample_n"].ge(5)].copy()
    rows = []
    for county, g in usable.groupby("apskritis"):
        rows.append({
            "apskritis": county,
            "rent_1room_month": weighted_mean(g["rent_1room_month_median"], g["weight_young_workers"]),
            "rent_sample_n": g["rent_sample_n"].sum(min_count=1),
            "rent_municipalities_n": len(g),
            "rent_quality_min": "B" if (g["rent_sample_n"] >= 10).all() else "C",
        })
    return pd.DataFrame(rows)

def calculate(sale, income, rent):
    out = sale.merge(income, on="apskritis", how="outer").merge(rent, on="apskritis", how="outer")
    out["annual_net_pair"] = out["income_net_25_30_month"] * 2 * 12
    out["annual_rent"] = out["rent_1room_month"] * 12
    out["m2_without_rent"] = out["annual_net_pair"] / out["sale_eur_m2_mean_weighted"]
    out["m2_after_rent"] = (out["annual_net_pair"] - out["annual_rent"]) / out["sale_eur_m2_mean_weighted"]
    out["rent_burden_pct"] = out["annual_rent"] / out["annual_net_pair"] * 100
    out["sale_robustness_gap_pct"] = (
        (out["sale_eur_m2_mean_weighted"] - out["sale_eur_m2_p50_weighted"]).abs()
        / out["sale_eur_m2_mean_weighted"] * 100
    )
    return out.sort_values("m2_after_rent", ascending=False)

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--transactions", required=True, type=Path)
    p.add_argument("--grid", required=True, type=Path)
    p.add_argument("--municipality-county", required=True, type=Path)
    p.add_argument("--income", required=True, type=Path)
    p.add_argument("--rent", required=True, type=Path)
    p.add_argument("--year", type=int, default=None)
    p.add_argument("--start-year", type=int, default=None)
    p.add_argument("--end-year", type=int, default=None)
    p.add_argument("--out", required=True, type=Path)
    p.add_argument(
        "--allow-diagnostic-grid",
        action="store_true",
        help="Acknowledge that this legacy pipeline uses QA-only sale/rent inputs and is not publication-ready.",
    )
    args = p.parse_args()

    if not args.allow_diagnostic_grid:
        raise SystemExit(
            "REFUSED: housing_affordability_pipeline.py is a legacy QA pipeline. "
            "Use --allow-diagnostic-grid only for diagnostic reproduction; "
            "do not use its outputs for publication."
        )

    grid = load_grid(args.grid)
    tx = load_transactions(args.transactions, year=args.year, start_year=args.start_year, end_year=args.end_year)
    muni = pd.read_csv(args.municipality_county, dtype={"sav_kodas": str})
    muni["sav_kodas"] = muni["sav_kodas"].map(clean_code)
    sale = aggregate_transactions(tx, grid, muni)

    income = pd.read_csv(args.income)
    # Two accepted income contracts:
    # A) already-modelled: apskritis,income_net_model_25_30,weight_young_workers
    # B) raw verified Sodra municipality table:
    #    apskritis,gross_all_eur_2025_11,insured_thousand_2025_11
    if "income_net_model_25_30" not in income.columns:
        income = build_youth_income_model(income)

    rent = pd.read_csv(args.rent)
    if "sav_kodas" in rent.columns:
        rent["sav_kodas"] = rent["sav_kodas"].map(clean_code)

    result = calculate(sale, aggregate_income(income), aggregate_rent(rent))
    args.out.parent.mkdir(parents=True, exist_ok=True)
    result.to_csv(args.out, index=False)
    print(result.to_string(index=False))

if __name__ == "__main__":
    main()
