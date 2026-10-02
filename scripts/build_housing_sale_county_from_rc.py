#!/usr/bin/env python3
"""Validate an RC municipality apartment-sale aggregate and build county candidates.

This tool is intentionally conservative:
- it accepts only a municipality-level apartment transaction price layer;
- it requires all 60 municipalities and all 10 counties;
- county prices are weighted by VALID PRICE OBSERVATION count, not population and
  not blindly by total transaction count;
- national control points are diagnostics, not automatic truth gates;
- output is a CANDIDATE layer and is never marked publication-ready by this script.

Canonical input columns can be overridden with CLI column-name arguments.
"""

from __future__ import annotations

import argparse
import json
import math
from pathlib import Path
from typing import Any

import pandas as pd

EXPECTED_COUNTIES = {
    "Alytaus",
    "Kauno",
    "Klaipėdos",
    "Marijampolės",
    "Panevėžio",
    "Šiaulių",
    "Tauragės",
    "Telšių",
    "Utenos",
    "Vilniaus",
}

APARTMENT_TX_CONTROLS = {
    2024: 27_330,
    2025: 37_100,
}
APARTMENT_PRICE_CONTROLS = {
    2024: 1684.64,
    2025: 1880.13,
}
CONTROL_SOURCES = {
    2024: {
        "transaction_count": "Registrų centras / 2025 mass-valuation report",
        "price": "VDA S7R280 / ArcGIS EVP56",
    },
    2025: {
        "transaction_count": "Registrų centras 2025 full-year market review (approx. 37.1k)",
        "price": "VDA S7R280 / ArcGIS EVP56",
    },
}
MUNICIPAL_TX_CONTROLS_BY_YEAR = {
    2024: {
        "Tauragės r. sav.": 186,
        "Telšių r. sav.": 222,
    },
    2025: {},
}


def norm_text(value: Any) -> str:
    if pd.isna(value):
        return ""
    return " ".join(
        str(value)
        .replace("\u00a0", " ")
        .replace("\u202f", " ")
        .strip()
        .split()
    )


def load_table(path: Path, sheet: str | int | None = None) -> pd.DataFrame:
    suffix = path.suffix.lower()
    if suffix in {".xlsx", ".xlsm", ".xls"}:
        return pd.read_excel(path, sheet_name=sheet if sheet is not None else 0)
    if suffix in {".csv", ".txt"}:
        return pd.read_csv(path)
    raise ValueError(f"Unsupported input format: {suffix}. Use CSV or XLSX.")


def require_numeric(series: pd.Series, label: str) -> pd.Series:
    out = pd.to_numeric(series, errors="coerce")
    bad = out.isna() & series.notna()
    if bad.any():
        sample = series[bad].astype(str).head(5).tolist()
        raise ValueError(f"{label}: non-numeric values found, e.g. {sample}")
    return out


def integerish(series: pd.Series, label: str) -> pd.Series:
    out = require_numeric(series, label)
    if out.isna().any():
        raise ValueError(f"{label}: missing values are not allowed")
    if (out < 0).any():
        raise ValueError(f"{label}: negative values are not allowed")
    fractional = (out - out.round()).abs().gt(1e-9)
    if fractional.any():
        raise ValueError(f"{label}: counts must be integers")
    return out.astype("int64")


def weighted_mean(values: pd.Series, weights: pd.Series) -> float:
    mask = values.notna() & weights.notna() & weights.gt(0)
    if not mask.any():
        return float("nan")
    return float((values[mask] * weights[mask]).sum() / weights[mask].sum())


def pct_diff(actual: float, control: float) -> float | None:
    if not math.isfinite(actual) or control == 0:
        return None
    return float((actual - control) / control * 100.0)


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--input", required=True, type=Path)
    p.add_argument("--mapping", required=True, type=Path)
    p.add_argument("--out-dir", required=True, type=Path)
    p.add_argument("--sheet", default=None)
    p.add_argument("--year", type=int, default=2025)

    p.add_argument("--municipality-col", default="municipality")
    p.add_argument("--year-col", default="year")
    p.add_argument("--transactions-col", default="apartment_transaction_count")
    p.add_argument("--valid-price-n-col", default="valid_price_observation_count")
    p.add_argument("--price-col", default="avg_apartment_transaction_eur_m2")
    args = p.parse_args()

    raw = load_table(args.input, args.sheet)
    mapping = pd.read_csv(args.mapping)

    required_map = {"sav_pav", "apskritis"}
    if missing := required_map - set(mapping.columns):
        raise ValueError(f"Mapping missing columns: {sorted(missing)}")

    mapping = mapping[["sav_pav", "apskritis"]].copy()
    mapping["sav_pav_norm"] = mapping["sav_pav"].map(norm_text)
    mapping["apskritis"] = mapping["apskritis"].map(norm_text)

    if mapping["sav_pav_norm"].duplicated().any():
        dup = mapping.loc[mapping["sav_pav_norm"].duplicated(False), "sav_pav"].tolist()
        raise ValueError(f"Duplicate municipalities in mapping: {dup}")
    if len(mapping) != 60:
        raise ValueError(f"Authoritative mapping must contain 60 municipalities, got {len(mapping)}")
    mapped_counties = set(mapping["apskritis"])
    if mapped_counties != EXPECTED_COUNTIES:
        raise ValueError(
            "County mapping mismatch: "
            f"missing={sorted(EXPECTED_COUNTIES - mapped_counties)}, "
            f"extra={sorted(mapped_counties - EXPECTED_COUNTIES)}"
        )

    column_contract = {
        "municipality": args.municipality_col,
        "year": args.year_col,
        "transactions": args.transactions_col,
        "valid_price_n": args.valid_price_n_col,
        "price": args.price_col,
    }
    missing_cols = [v for v in column_contract.values() if v not in raw.columns]
    if missing_cols:
        raise ValueError(
            "RC aggregate is missing required columns: "
            f"{missing_cols}. Use the --*-col arguments only when the source uses "
            "different headers but the concepts are the same."
        )

    df = raw[
        [
            args.municipality_col,
            args.year_col,
            args.transactions_col,
            args.valid_price_n_col,
            args.price_col,
        ]
    ].copy()
    df.columns = [
        "municipality",
        "year",
        "apartment_transaction_count",
        "valid_price_observation_count",
        "avg_apartment_transaction_eur_m2",
    ]

    df["municipality_norm"] = df["municipality"].map(norm_text)
    if (df["municipality_norm"] == "").any():
        raise ValueError("Missing municipality names are not allowed")

    df["year"] = integerish(df["year"], "year")
    df = df[df["year"].eq(args.year)].copy()
    if len(df) != 60:
        raise ValueError(
            f"Expected exactly 60 municipality rows for {args.year}, got {len(df)}"
        )
    if df["municipality_norm"].duplicated().any():
        dup = df.loc[df["municipality_norm"].duplicated(False), "municipality"].tolist()
        raise ValueError(f"Duplicate municipality rows: {dup}")

    expected_munis = set(mapping["sav_pav_norm"])
    actual_munis = set(df["municipality_norm"])
    missing_munis = sorted(expected_munis - actual_munis)
    extra_munis = sorted(actual_munis - expected_munis)
    if missing_munis or extra_munis:
        raise ValueError(
            "Municipality coverage mismatch: "
            f"missing={missing_munis}, extra={extra_munis}"
        )

    df["apartment_transaction_count"] = integerish(
        df["apartment_transaction_count"], "apartment_transaction_count"
    )
    df["valid_price_observation_count"] = integerish(
        df["valid_price_observation_count"], "valid_price_observation_count"
    )
    if (df["valid_price_observation_count"] <= 0).any():
        bad = df.loc[
            df["valid_price_observation_count"] <= 0,
            ["municipality", "valid_price_observation_count"],
        ].to_dict("records")
        raise ValueError(f"Every municipality needs at least one valid price observation: {bad}")
    if (
        df["valid_price_observation_count"] > df["apartment_transaction_count"]
    ).any():
        bad = df.loc[
            df["valid_price_observation_count"] > df["apartment_transaction_count"],
            [
                "municipality",
                "apartment_transaction_count",
                "valid_price_observation_count",
            ],
        ].to_dict("records")
        raise ValueError(f"Valid price observations exceed transactions: {bad}")

    df["avg_apartment_transaction_eur_m2"] = require_numeric(
        df["avg_apartment_transaction_eur_m2"],
        "avg_apartment_transaction_eur_m2",
    )
    if df["avg_apartment_transaction_eur_m2"].isna().any():
        raise ValueError("Apartment EUR/m² price is missing for one or more municipalities")
    if (df["avg_apartment_transaction_eur_m2"] <= 0).any():
        bad = df.loc[
            df["avg_apartment_transaction_eur_m2"] <= 0,
            ["municipality", "avg_apartment_transaction_eur_m2"],
        ].to_dict("records")
        raise ValueError(f"Apartment EUR/m² price must be positive: {bad}")

    df = df.merge(
        mapping[["sav_pav", "sav_pav_norm", "apskritis"]],
        left_on="municipality_norm",
        right_on="sav_pav_norm",
        how="left",
        validate="one_to_one",
    )
    if df["apskritis"].isna().any():
        raise ValueError("Internal error: some municipalities did not map to a county")

    county_rows = []
    for county, g in df.groupby("apskritis", sort=True):
        tx_n = int(g["apartment_transaction_count"].sum())
        valid_n = int(g["valid_price_observation_count"].sum())
        county_rows.append(
            {
                "apskritis": county,
                "year": args.year,
                "municipalities_n": int(len(g)),
                "apartment_transaction_count": tx_n,
                "valid_price_observation_count": valid_n,
                "valid_price_coverage_pct": valid_n / tx_n * 100.0 if tx_n else None,
                "avg_apartment_transaction_eur_m2_weighted": weighted_mean(
                    g["avg_apartment_transaction_eur_m2"],
                    g["valid_price_observation_count"],
                ),
                "aggregation_weight": "valid_price_observation_count",
                "layer_status": "candidate_not_publication_approved",
            }
        )

    county = pd.DataFrame(county_rows)
    if len(county) != 10 or set(county["apskritis"]) != EXPECTED_COUNTIES:
        raise ValueError("County aggregation did not produce all 10 counties")

    national_transactions = int(df["apartment_transaction_count"].sum())
    national_valid_price_n = int(df["valid_price_observation_count"].sum())
    national_price = weighted_mean(
        df["avg_apartment_transaction_eur_m2"],
        df["valid_price_observation_count"],
    )

    municipal_controls = {}
    by_name = df.set_index("municipality_norm")
    for name, control in MUNICIPAL_TX_CONTROLS_BY_YEAR.get(args.year, {}).items():
        key = norm_text(name)
        actual = int(by_name.loc[key, "apartment_transaction_count"])
        municipal_controls[name] = {
            "input_transaction_count": actual,
            "external_control_transaction_count": control,
            "difference": actual - control,
            "difference_pct": pct_diff(float(actual), float(control)),
            "interpretation": (
                "diagnostic_only_selection_may_differ"
            ),
        }

    qa = {
        "year": args.year,
        "source_input": str(args.input),
        "mapping": str(args.mapping),
        "hard_gates": {
            "municipalities_60_of_60": True,
            "counties_10_of_10": True,
            "municipality_names_unique": True,
            "all_prices_positive": True,
            "all_valid_price_counts_positive": True,
            "valid_price_count_not_above_transactions": True,
            "aggregation_weight_known": True,
        },
        "national_diagnostics": {
            "input_apartment_transaction_count": national_transactions,
            "external_transaction_control": APARTMENT_TX_CONTROLS.get(args.year),
            "transaction_difference": (
                national_transactions - APARTMENT_TX_CONTROLS[args.year]
                if args.year in APARTMENT_TX_CONTROLS else None
            ),
            "transaction_difference_pct": (
                pct_diff(
                    float(national_transactions),
                    float(APARTMENT_TX_CONTROLS[args.year]),
                )
                if args.year in APARTMENT_TX_CONTROLS else None
            ),
            "input_weighted_apartment_price_eur_m2": national_price,
            "external_price_control": APARTMENT_PRICE_CONTROLS.get(args.year),
            "price_difference_eur_m2": (
                national_price - APARTMENT_PRICE_CONTROLS[args.year]
                if args.year in APARTMENT_PRICE_CONTROLS else None
            ),
            "price_difference_pct": (
                pct_diff(
                    national_price,
                    APARTMENT_PRICE_CONTROLS[args.year],
                )
                if args.year in APARTMENT_PRICE_CONTROLS else None
            ),
            "control_sources": CONTROL_SOURCES.get(args.year),
            "control_interpretation": (
                "diagnostic_only; differences must be explained by source selection "
                "before publication"
            ),
        },
        "municipality_diagnostics": municipal_controls,
        "methodology_gate": {
            "status": "PENDING_MANUAL_SOURCE_METHOD_CONFIRMATION",
            "required_before_publication": [
                "actual transaction prices confirmed, not asking prices",
                "apartment population/selection definition confirmed",
                "uniform selection method across all 60 municipalities confirmed",
                "multi-object and partial-acquisition treatment confirmed",
                "meaning of valid_price_observation_count confirmed",
                "source licence/publication conditions confirmed",
                "national control differences reviewed and explained",
            ],
        },
        "output_status": "STRUCTURAL_PASS_CANDIDATE_ONLY",
    }

    args.out_dir.mkdir(parents=True, exist_ok=True)
    muni_out = df[
        [
            "sav_pav",
            "apskritis",
            "year",
            "apartment_transaction_count",
            "valid_price_observation_count",
            "avg_apartment_transaction_eur_m2",
        ]
    ].rename(columns={"sav_pav": "municipality"})
    muni_out.to_csv(
        args.out_dir / f"housing-sale-municipality-{args.year}-rc-candidate.csv", index=False
    )
    county.to_csv(
        args.out_dir / f"housing-sale-county-{args.year}-rc-candidate.csv", index=False
    )
    (args.out_dir / f"housing-sale-rc-qa-{args.year}.json").write_text(
        json.dumps(qa, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(json.dumps(qa, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
