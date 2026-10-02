#!/usr/bin/env python3
"""Rebuild and validate the 2025 city-level 1-room rent sample summary.

This is a research/QA utility. City samples are NOT county values.
"""

from __future__ import annotations

import argparse
from pathlib import Path

import pandas as pd

REQUIRED = {
    "city",
    "county",
    "updated_date",
    "monthly_rent_eur",
    "area_m2",
    "eur_m2",
    "rooms",
    "source",
    "source_url",
    "status",
    "notes",
}


def quality(n: int) -> str:
    if n >= 10:
        return "B"
    if n >= 5:
        return "C"
    return "insufficient"


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--input", required=True, type=Path)
    p.add_argument("--out", required=True, type=Path)
    p.add_argument("--year", type=int, default=2025)
    args = p.parse_args()

    df = pd.read_csv(args.input)
    missing = REQUIRED - set(df.columns)
    if missing:
        raise ValueError(f"Missing required sample columns: {sorted(missing)}")

    if df["source_url"].duplicated().any():
        dup = df.loc[df["source_url"].duplicated(False), "source_url"].tolist()
        raise ValueError(f"Duplicate source_url rows: {dup}")

    df["updated_date"] = pd.to_datetime(df["updated_date"], errors="raise")
    if not df["updated_date"].dt.year.eq(args.year).all():
        bad = df.loc[
            ~df["updated_date"].dt.year.eq(args.year),
            ["city", "updated_date", "source_url"],
        ].to_dict("records")
        raise ValueError(f"Rows outside {args.year}: {bad}")

    df["rooms"] = pd.to_numeric(df["rooms"], errors="raise")
    if not df["rooms"].eq(1).all():
        bad = df.loc[~df["rooms"].eq(1), ["city", "rooms", "source_url"]].to_dict(
            "records"
        )
        raise ValueError(f"Non-1-room rows in sample: {bad}")

    if not df["status"].eq("usable").all():
        bad = df.loc[
            ~df["status"].eq("usable"), ["city", "status", "source_url"]
        ].to_dict("records")
        raise ValueError(f"Non-usable rows in accepted sample: {bad}")

    for col in ["monthly_rent_eur", "area_m2", "eur_m2"]:
        df[col] = pd.to_numeric(df[col], errors="raise")
        if (df[col] <= 0).any():
            raise ValueError(f"{col} must be positive")

    county_counts = df.groupby("city")["county"].nunique()
    if (county_counts > 1).any():
        raise ValueError(
            "A city maps to multiple counties: "
            f"{county_counts[county_counts > 1].to_dict()}"
        )

    rows = []
    for city, g in df.groupby("city", sort=True):
        n = len(g)
        rows.append(
            {
                "city": city,
                "county": g["county"].iloc[0],
                "sample_n": n,
                "rent_month_median_eur": g["monthly_rent_eur"].median(),
                "rent_month_mean_eur": g["monthly_rent_eur"].mean(),
                "area_median_m2": g["area_m2"].median(),
                "rent_eur_m2_median": g["eur_m2"].median(),
                "price_q25": g["monthly_rent_eur"].quantile(0.25),
                "price_q75": g["monthly_rent_eur"].quantile(0.75),
                "first_observation": g["updated_date"].min().date().isoformat(),
                "last_observation": g["updated_date"].max().date().isoformat(),
                "quality": quality(n),
            }
        )

    out = pd.DataFrame(rows)

    numeric_cols = [
        "rent_month_median_eur",
        "rent_month_mean_eur",
        "area_median_m2",
        "rent_eur_m2_median",
        "price_q25",
        "price_q75",
    ]
    for col in numeric_cols:
        out[col] = out[col].round(3)

    args.out.parent.mkdir(parents=True, exist_ok=True)
    out.to_csv(args.out, index=False)
    print(out.to_string(index=False))


if __name__ == "__main__":
    main()
