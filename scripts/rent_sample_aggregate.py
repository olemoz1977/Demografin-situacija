#!/usr/bin/env python3
from __future__ import annotations

import argparse
from pathlib import Path
import pandas as pd


def quality(n: int) -> str:
    if n >= 10:
        return "B"
    if n >= 5:
        return "C"
    return "insufficient"


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--input", required=True, type=Path)
    p.add_argument("--out", required=True, type=Path)
    args = p.parse_args()

    df = pd.read_csv(args.input)
    usable = df[df["status"].eq("usable")].copy()
    usable["monthly_rent_eur"] = pd.to_numeric(usable["monthly_rent_eur"], errors="coerce")
    usable["area_m2"] = pd.to_numeric(usable["area_m2"], errors="coerce")
    usable["eur_m2"] = pd.to_numeric(usable["eur_m2"], errors="coerce")
    usable = usable.dropna(subset=["city", "monthly_rent_eur", "area_m2"])

    rows = []
    for (city, county), g in usable.groupby(["city", "county"]):
        n = len(g)
        rows.append({
            "city": city,
            "county": county,
            "sample_n": n,
            "rent_month_median_eur": float(g["monthly_rent_eur"].median()),
            "rent_month_mean_eur": float(g["monthly_rent_eur"].mean()),
            "area_median_m2": float(g["area_m2"].median()),
            "rent_eur_m2_median": float(g["eur_m2"].median()),
            "price_q25": float(g["monthly_rent_eur"].quantile(0.25)),
            "price_q75": float(g["monthly_rent_eur"].quantile(0.75)),
            "first_observation": str(g["updated_date"].min()),
            "last_observation": str(g["updated_date"].max()),
            "quality": quality(n),
        })

    out = pd.DataFrame(rows).sort_values(["quality", "city"])
    args.out.parent.mkdir(parents=True, exist_ok=True)
    out.to_csv(args.out, index=False)
    print(out.to_string(index=False))


if __name__ == "__main__":
    main()
