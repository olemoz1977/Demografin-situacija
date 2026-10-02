#!/usr/bin/env python3
"""Build the final 10-county housing-affordability table from validated layers.

Default mode is publication-strict:
- income must cover exactly 10 counties;
- sale and rent must both be marked publication_approved;
- rent cannot contain insufficient counties;
- county sets must match exactly.

Use --allow-candidate only for QA/sensitivity work. Candidate output is explicitly
marked non-publication-ready.
"""

from __future__ import annotations

import argparse
from pathlib import Path

import pandas as pd

TARGET_YEAR = 2025

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


def read_csv(path: Path) -> pd.DataFrame:
    if not path.exists():
        raise ValueError(f"Missing input file: {path}")
    return pd.read_csv(path)


def require_counties(df: pd.DataFrame, col: str, label: str) -> None:
    if col not in df.columns:
        raise ValueError(f"{label}: missing county column {col!r}")
    if df[col].duplicated().any():
        dup = df.loc[df[col].duplicated(False), col].tolist()
        raise ValueError(f"{label}: duplicate counties: {dup}")
    actual = set(df[col].astype(str))
    if actual != EXPECTED_COUNTIES:
        raise ValueError(
            f"{label}: county coverage mismatch: "
            f"missing={sorted(EXPECTED_COUNTIES - actual)}, "
            f"extra={sorted(actual - EXPECTED_COUNTIES)}"
        )



def require_target_year(df: pd.DataFrame, label: str) -> None:
    if "year" not in df.columns:
        raise ValueError(f"{label}: missing year column")
    years = pd.to_numeric(df["year"], errors="coerce")
    if years.isna().any():
        raise ValueError(f"{label}: invalid year values")
    unique = sorted(set(years.astype(int)))
    if unique != [TARGET_YEAR]:
        raise ValueError(
            f"{label}: publication architecture is period-aligned to {TARGET_YEAR}; "
            f"got years={unique}"
        )


def numeric_positive(df: pd.DataFrame, col: str, label: str) -> pd.Series:
    if col not in df.columns:
        raise ValueError(f"{label}: missing required column {col!r}")
    out = pd.to_numeric(df[col], errors="coerce")
    if out.isna().any() or (out <= 0).any():
        bad = df.loc[out.isna() | (out <= 0), [df.columns[0], col]].to_dict("records")
        raise ValueError(f"{label}: {col} must be positive and complete: {bad}")
    return out.astype(float)


def require_status(
    df: pd.DataFrame,
    label: str,
    allow_candidate: bool,
) -> None:
    if "layer_status" not in df.columns:
        raise ValueError(f"{label}: missing layer_status")
    statuses = set(df["layer_status"].astype(str))
    if allow_candidate:
        allowed = {
            "publication_approved",
            "candidate_not_publication_approved",
        }
        if not statuses <= allowed:
            raise ValueError(f"{label}: unsupported layer_status values: {sorted(statuses)}")
        return

    if statuses != {"publication_approved"}:
        raise ValueError(
            f"{label}: publication mode requires layer_status=publication_approved; "
            f"got {sorted(statuses)}"
        )


def final_quality(rent_quality: str, allow_candidate: bool, sale_status: str, rent_status: str) -> str:
    if allow_candidate and (
        sale_status != "publication_approved" or rent_status != "publication_approved"
    ):
        return "candidate_only"
    # Income is B-modelled, so even an A sale layer cannot make the composite A.
    return "C" if rent_quality == "C" else "B"


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--income", required=True, type=Path)
    p.add_argument("--sale", required=True, type=Path)
    p.add_argument("--rent", required=True, type=Path)
    p.add_argument("--out", required=True, type=Path)
    p.add_argument(
        "--allow-candidate",
        action="store_true",
        help="Allow candidate sale/rent inputs for QA only; output remains non-publication-ready.",
    )
    args = p.parse_args()

    income = read_csv(args.income).copy()
    sale = read_csv(args.sale).copy()
    rent = read_csv(args.rent).copy()

    require_counties(income, "county", "income")
    require_counties(sale, "apskritis", "sale")
    require_counties(rent, "county", "rent")

    require_target_year(sale, "sale")
    require_target_year(rent, "rent")

    require_status(sale, "sale", args.allow_candidate)
    require_status(rent, "rent", args.allow_candidate)

    income["model_net_25_30_eur_month"] = numeric_positive(
        income, "model_net_25_30_eur_month", "income"
    )
    sale["avg_apartment_transaction_eur_m2_weighted"] = numeric_positive(
        sale, "avg_apartment_transaction_eur_m2_weighted", "sale"
    )
    rent["median_asking_rent_eur_month"] = numeric_positive(
        rent, "median_asking_rent_eur_month", "rent"
    )

    if "quality" not in rent.columns:
        raise ValueError("rent: missing quality")
    bad_q = sorted(set(rent["quality"].astype(str)) - {"B", "C"})
    if bad_q:
        raise ValueError(f"rent: publication/QA county layer cannot contain quality {bad_q}")

    income2 = income[
        ["county", "model_net_25_30_eur_month"]
    ].rename(columns={"model_net_25_30_eur_month": "net_income_25_30_eur_month_person"})

    sale2 = sale[
        [
            "apskritis",
            "year",
            "avg_apartment_transaction_eur_m2_weighted",
            "apartment_transaction_count",
            "valid_price_observation_count",
            "layer_status",
        ]
    ].rename(
        columns={
            "apskritis": "county",
            "avg_apartment_transaction_eur_m2_weighted": "sale_price_eur_m2",
            "year": "sale_year",
            "layer_status": "sale_layer_status",
        }
    )

    rent2 = rent[
        [
            "county",
            "year",
            "median_asking_rent_eur_month",
            "unique_listing_count",
            "quality",
            "layer_status",
        ]
    ].rename(
        columns={
            "year": "rent_year",
            "median_asking_rent_eur_month": "rent_eur_month",
            "unique_listing_count": "rent_listing_n",
            "quality": "rent_quality",
            "layer_status": "rent_layer_status",
        }
    )

    out = (
        income2.merge(sale2, on="county", validate="one_to_one")
        .merge(rent2, on="county", validate="one_to_one")
        .sort_values("county")
        .reset_index(drop=True)
    )

    if len(out) != 10:
        raise ValueError(f"Expected 10 merged counties, got {len(out)}")

    out["pair_net_income_eur_month"] = (
        out["net_income_25_30_eur_month_person"] * 2
    )
    out["pair_net_income_eur_year"] = out["pair_net_income_eur_month"] * 12
    out["annual_rent_eur"] = out["rent_eur_month"] * 12
    out["income_after_rent_eur_year"] = (
        out["pair_net_income_eur_year"] - out["annual_rent_eur"]
    )

    if (out["income_after_rent_eur_year"] <= 0).any():
        bad = out.loc[
            out["income_after_rent_eur_year"] <= 0,
            ["county", "pair_net_income_eur_year", "annual_rent_eur"],
        ].to_dict("records")
        raise ValueError(f"Annual rent is not below pair net income: {bad}")

    out["m2_per_year_after_rent"] = (
        out["income_after_rent_eur_year"] / out["sale_price_eur_m2"]
    )
    out["m2_per_year_without_rent"] = (
        out["pair_net_income_eur_year"] / out["sale_price_eur_m2"]
    )
    out["rent_burden_pct_pair_net_income"] = (
        out["annual_rent_eur"] / out["pair_net_income_eur_year"] * 100
    )
    out["pair_net_income_months_per_one_m2"] = (
        out["sale_price_eur_m2"] / out["pair_net_income_eur_month"]
    )

    out["income_quality"] = "B-modelled"
    out["sale_quality"] = out["sale_layer_status"].map(
        lambda x: "A-official-actual-transactions"
        if x == "publication_approved"
        else "candidate-pending-method-gate"
    )
    out["overall_quality"] = out.apply(
        lambda r: final_quality(
            str(r["rent_quality"]),
            args.allow_candidate,
            str(r["sale_layer_status"]),
            str(r["rent_layer_status"]),
        ),
        axis=1,
    )
    out["publication_ready"] = (
        out["sale_layer_status"].eq("publication_approved")
        & out["rent_layer_status"].eq("publication_approved")
        & ~out["overall_quality"].eq("candidate_only")
    )

    # Presentation precision only; source values remain available in their source layers.
    for col in [
        "net_income_25_30_eur_month_person",
        "pair_net_income_eur_month",
        "sale_price_eur_m2",
        "rent_eur_month",
        "m2_per_year_after_rent",
        "m2_per_year_without_rent",
        "rent_burden_pct_pair_net_income",
        "pair_net_income_months_per_one_m2",
    ]:
        out[col] = out[col].round(2)

    args.out.parent.mkdir(parents=True, exist_ok=True)
    out.to_csv(args.out, index=False)

    mode = "QA_CANDIDATE" if args.allow_candidate else "PUBLICATION_STRICT"
    print(
        f"{mode}: wrote {len(out)} counties; "
        f"publication_ready={bool(out['publication_ready'].all())}"
    )


if __name__ == "__main__":
    main()
