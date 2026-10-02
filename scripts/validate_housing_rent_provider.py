#!/usr/bin/env python3
"""Validate a provider-supplied 2025 county private-rent aggregate.

This validator is intentionally strict and publication-neutral.

Required canonical input columns:
- county
- year
- property_type
- rooms
- rental_term
- price_basis
- unique_listing_count
- median_asking_rent_eur_month

Expected basket:
- apartment
- 1 room
- long_term
- asking_offer

The validator never marks a source publication-ready on its own. It verifies
structural coverage and the declared basket, assigns the project B/C/insufficient
sample class, and leaves source methodology / deduplication / publication rights
as a manual gate.
"""

from __future__ import annotations

import argparse
import json
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

EXPECTED = {
    "property_type": "apartment",
    "rooms": 1,
    "rental_term": "long_term",
    "price_basis": "asking_offer",
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


def numeric(series: pd.Series, label: str) -> pd.Series:
    out = pd.to_numeric(series, errors="coerce")
    bad = out.isna() & series.notna()
    if bad.any():
        raise ValueError(
            f"{label}: non-numeric values found, e.g. "
            f"{series[bad].astype(str).head(5).tolist()}"
        )
    return out


def integerish(series: pd.Series, label: str) -> pd.Series:
    out = numeric(series, label)
    if out.isna().any():
        raise ValueError(f"{label}: missing values are not allowed")
    if (out < 0).any():
        raise ValueError(f"{label}: negative values are not allowed")
    if ((out - out.round()).abs() > 1e-9).any():
        raise ValueError(f"{label}: values must be integers")
    return out.astype("int64")


def quality(n: int) -> str:
    if n >= 10:
        return "B"
    if n >= 5:
        return "C"
    return "insufficient"


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--input", required=True, type=Path)
    p.add_argument("--out-dir", required=True, type=Path)
    p.add_argument("--sheet", default=None)
    p.add_argument("--year", type=int, default=2025)
    args = p.parse_args()

    df = load_table(args.input, args.sheet)

    required = {
        "county",
        "year",
        "property_type",
        "rooms",
        "rental_term",
        "price_basis",
        "unique_listing_count",
        "median_asking_rent_eur_month",
    }
    missing = required - set(df.columns)
    if missing:
        raise ValueError(f"Provider rent aggregate missing required columns: {sorted(missing)}")

    df = df[list(required)].copy()
    df["county"] = df["county"].map(norm_text)
    df["property_type"] = df["property_type"].map(norm_text).str.lower()
    df["rental_term"] = df["rental_term"].map(norm_text).str.lower()
    df["price_basis"] = df["price_basis"].map(norm_text).str.lower()

    df["year"] = integerish(df["year"], "year")
    df = df[df["year"].eq(args.year)].copy()
    if len(df) != 10:
        raise ValueError(f"Expected exactly 10 county rows for {args.year}, got {len(df)}")

    if df["county"].duplicated().any():
        dup = df.loc[df["county"].duplicated(False), "county"].tolist()
        raise ValueError(f"Duplicate county rows: {dup}")

    actual = set(df["county"])
    if actual != EXPECTED_COUNTIES:
        raise ValueError(
            "County coverage mismatch: "
            f"missing={sorted(EXPECTED_COUNTIES - actual)}, "
            f"extra={sorted(actual - EXPECTED_COUNTIES)}"
        )

    if not df["property_type"].eq(EXPECTED["property_type"]).all():
        bad = sorted(df.loc[~df["property_type"].eq(EXPECTED["property_type"]), "county"])
        raise ValueError(f"Wrong property_type outside apartment basket: {bad}")

    df["rooms"] = integerish(df["rooms"], "rooms")
    if not df["rooms"].eq(EXPECTED["rooms"]).all():
        bad = sorted(df.loc[~df["rooms"].eq(EXPECTED["rooms"]), "county"])
        raise ValueError(f"Wrong room count outside 1-room basket: {bad}")

    if not df["rental_term"].eq(EXPECTED["rental_term"]).all():
        bad = sorted(df.loc[~df["rental_term"].eq(EXPECTED["rental_term"]), "county"])
        raise ValueError(f"Wrong rental_term outside long_term basket: {bad}")

    if not df["price_basis"].eq(EXPECTED["price_basis"]).all():
        bad = sorted(df.loc[~df["price_basis"].eq(EXPECTED["price_basis"]), "county"])
        raise ValueError(f"Wrong price_basis; expected asking_offer: {bad}")

    df["unique_listing_count"] = integerish(
        df["unique_listing_count"], "unique_listing_count"
    )
    if (df["unique_listing_count"] <= 0).any():
        bad = df.loc[
            df["unique_listing_count"] <= 0, ["county", "unique_listing_count"]
        ].to_dict("records")
        raise ValueError(f"Every county needs at least one unique listing: {bad}")

    df["median_asking_rent_eur_month"] = numeric(
        df["median_asking_rent_eur_month"], "median_asking_rent_eur_month"
    )
    if df["median_asking_rent_eur_month"].isna().any():
        raise ValueError("Missing median asking rent is not allowed")
    if (df["median_asking_rent_eur_month"] <= 0).any():
        bad = df.loc[
            df["median_asking_rent_eur_month"] <= 0,
            ["county", "median_asking_rent_eur_month"],
        ].to_dict("records")
        raise ValueError(f"Median asking rent must be positive: {bad}")

    df["quality"] = df["unique_listing_count"].map(lambda x: quality(int(x)))
    if df["quality"].eq("insufficient").any():
        bad = df.loc[
            df["quality"].eq("insufficient"),
            ["county", "unique_listing_count", "quality"],
        ].to_dict("records")
        raise ValueError(
            "One or more counties have insufficient rent sample (N<5): "
            f"{bad}"
        )

    any_c = df["quality"].eq("C").any()
    structural_status = (
        "STRUCTURAL_PASS_WITH_C_REVIEW_REQUIRED"
        if any_c
        else "STRUCTURAL_PASS_B_OR_BETTER_CANDIDATE"
    )

    out = df.sort_values("county").copy()
    out["layer_status"] = "candidate_not_publication_approved"

    qa = {
        "year": args.year,
        "source_input": str(args.input),
        "basket": EXPECTED,
        "county_count": len(out),
        "total_unique_listings_sum": int(out["unique_listing_count"].sum()),
        "quality_counts": out["quality"].value_counts().sort_index().to_dict(),
        "hard_gates": {
            "counties_10_of_10": True,
            "county_names_unique": True,
            "one_room_apartment_basket": True,
            "long_term_only": True,
            "asking_offer_price_basis": True,
            "positive_median_rent": True,
            "no_insufficient_county_n_lt_5": True,
        },
        "output_status": structural_status,
        "methodology_gate": {
            "status": "PENDING_MANUAL_SOURCE_METHOD_CONFIRMATION",
            "must_confirm": [
                "unique_listing_count means deduplicated listings/units, not page views or repeated snapshots",
                "the same extraction window and basket were used in all 10 counties",
                "short-term and room-only offers were excluded",
                "median was calculated from listing-level monthly asking rents within each county",
                "treatment of duplicate/relisted ads is documented",
                "publication/reuse rights for derived county indicators are known",
            ],
        },
        "publication_status": "CANDIDATE_ONLY",
    }

    args.out_dir.mkdir(parents=True, exist_ok=True)
    out.to_csv(
        args.out_dir / "housing-rent-county-2025-provider-candidate.csv",
        index=False,
    )
    (
        args.out_dir / "housing-rent-provider-qa-2025.json"
    ).write_text(json.dumps(qa, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(json.dumps(qa, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
