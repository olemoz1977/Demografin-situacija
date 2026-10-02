#!/usr/bin/env python3
"""Build a direct county-level summary from accepted 2025 Skelbiu.lt listing observations.

Important: this is a search-index research sample, not a complete portal export.
The county median is calculated directly from listing-level observations pooled across
municipalities/cities in the county. City medians are never averaged.
"""

from __future__ import annotations

import argparse
from pathlib import Path
import pandas as pd

REQUIRED = {
    "city","county","updated_date","monthly_rent_eur","area_m2","eur_m2",
    "rooms","source","source_url","status","notes",
}

def quality(n: int) -> str:
    if n >= 10:
        return "B"
    if n >= 5:
        return "C"
    return "insufficient"

def main() -> None:
    p=argparse.ArgumentParser()
    p.add_argument("--input",required=True,type=Path)
    p.add_argument("--out",required=True,type=Path)
    p.add_argument("--year",type=int,default=2025)
    args=p.parse_args()

    df=pd.read_csv(args.input)
    missing=REQUIRED-set(df.columns)
    if missing:
        raise ValueError(f"Missing required columns: {sorted(missing)}")
    if df["source_url"].duplicated().any():
        raise ValueError("Duplicate source_url rows in accepted sample")

    df["updated_date"]=pd.to_datetime(df["updated_date"],errors="raise")
    if not df["updated_date"].dt.year.eq(args.year).all():
        raise ValueError(f"Rows outside {args.year}")
    df["rooms"]=pd.to_numeric(df["rooms"],errors="raise")
    if not df["rooms"].eq(1).all():
        raise ValueError("Non-1-room rows in accepted sample")
    if not df["status"].eq("usable").all():
        raise ValueError("Non-usable rows in accepted sample")
    if df["source"].nunique()!=1 or df["source"].iloc[0]!="Skelbiu.lt":
        raise ValueError("County research sample must remain a single-portal Skelbiu.lt layer")

    for c in ["monthly_rent_eur","area_m2","eur_m2"]:
        df[c]=pd.to_numeric(df[c],errors="raise")
        if (df[c]<=0).any():
            raise ValueError(f"{c} must be positive")

    rows=[]
    for county,g in df.groupby("county",sort=True):
        n=len(g)
        rows.append({
            "county":county,
            "sample_n":n,
            "localities_n":g["city"].nunique(),
            "localities":" | ".join(sorted(g["city"].unique())),
            "rent_month_median_eur":g["monthly_rent_eur"].median(),
            "rent_month_mean_eur":g["monthly_rent_eur"].mean(),
            "area_median_m2":g["area_m2"].median(),
            "rent_eur_m2_median":g["eur_m2"].median(),
            "price_q25":g["monthly_rent_eur"].quantile(.25),
            "price_q75":g["monthly_rent_eur"].quantile(.75),
            "first_observation":g["updated_date"].min().date().isoformat(),
            "last_observation":g["updated_date"].max().date().isoformat(),
            "quality":quality(n),
            "source_scope":"Skelbiu.lt search-index historical sample; direct listing-level county pool",
            "publication_status":"research_sample_not_publication_approved",
        })

    out=pd.DataFrame(rows)
    for c in ["rent_month_median_eur","rent_month_mean_eur","area_median_m2",
              "rent_eur_m2_median","price_q25","price_q75"]:
        out[c]=out[c].round(3)

    args.out.parent.mkdir(parents=True,exist_ok=True)
    out.to_csv(args.out,index=False)
    print(out.to_string(index=False))

if __name__=="__main__":
    main()
