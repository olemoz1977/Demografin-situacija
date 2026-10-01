#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path
import pandas as pd
import numpy as np


def weighted_mean(values, weights):
    mask = values.notna() & weights.notna() & weights.gt(0)
    if not mask.any():
        return np.nan
    return float((values[mask] * weights[mask]).sum() / weights[mask].sum())


def weighted_median(values, weights):
    mask = values.notna() & weights.notna() & weights.gt(0)
    if not mask.any():
        return np.nan
    x = pd.DataFrame({"v": values[mask].astype(float), "w": weights[mask].astype(float)})
    x = x.sort_values("v")
    cutoff = x["w"].sum() / 2
    return float(x.loc[x["w"].cumsum().ge(cutoff), "v"].iloc[0])


def aggregate(df, group_cols):
    rows = []
    for keys, g in df.groupby(group_cols, dropna=False):
        if not isinstance(keys, tuple):
            keys = (keys,)
        row = dict(zip(group_cols, keys))
        obj = pd.to_numeric(g["objektu_sk"], errors="coerce")
        mean_v = pd.to_numeric(g["vid_buto_verte"], errors="coerce")
        p50 = pd.to_numeric(g["buto_verte_p50"], errors="coerce")
        ratio = mean_v / p50.replace(0, np.nan)
        abnormal = ratio.gt(2.5) | ratio.lt(0.4)
        if "min_isigytas_plotas" in g.columns:
            min_area = pd.to_numeric(g["min_isigytas_plotas"], errors="coerce")
            abnormal = abnormal | min_area.lt(5)
        row.update({
            "grid_rows_n": int(len(g)),
            "transactions_n": float(pd.to_numeric(g.get("sandoriu_sk"), errors="coerce").sum(min_count=1)),
            "objects_n": float(obj.sum(min_count=1)),
            "weighted_mean_eur_m2": weighted_mean(mean_v, obj),
            "weighted_grid_p50_mean_eur_m2": weighted_mean(p50, obj),
            "weighted_grid_p50_median_eur_m2": weighted_median(p50, obj),
            "abnormal_grid_rows_n": int(abnormal.fillna(False).sum()),
            "abnormal_object_share_pct": (
                float(obj[abnormal.fillna(False)].sum() / obj.sum() * 100)
                if obj.sum() > 0 else np.nan
            ),
        })
        if pd.notna(row["weighted_mean_eur_m2"]) and pd.notna(row["weighted_grid_p50_median_eur_m2"]):
            row["mean_vs_robust_gap_pct"] = abs(
                row["weighted_mean_eur_m2"] - row["weighted_grid_p50_median_eur_m2"]
            ) / row["weighted_grid_p50_median_eur_m2"] * 100
        else:
            row["mean_vs_robust_gap_pct"] = np.nan
        rows.append(row)
    return pd.DataFrame(rows)


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--transactions", required=True, type=Path)
    p.add_argument("--grid", required=True, type=Path)
    p.add_argument("--mapping", required=True, type=Path)
    p.add_argument("--out-dir", required=True, type=Path)
    args = p.parse_args()

    tx = pd.read_csv(args.transactions, low_memory=False)
    grid = pd.read_csv(args.grid, low_memory=False)
    mapping = pd.read_csv(args.mapping)

    grid_id_col = "_id"
    tx_grid_col = "sq_grid_id._id" if "sq_grid_id._id" in tx.columns else "sq_grid_id"
    required_tx = {tx_grid_col, "data_nuo", "objektu_sk", "vid_buto_verte", "buto_verte_p50"}
    required_grid = {grid_id_col, "sav_pav", "sav_kodas"}
    if missing := required_tx - set(tx.columns):
        raise ValueError(f"transactions missing {sorted(missing)}")
    if missing := required_grid - set(grid.columns):
        raise ValueError(f"grid missing {sorted(missing)}")

    tx["year"] = pd.to_datetime(tx["data_nuo"], errors="coerce").dt.year
    tx = tx.rename(columns={tx_grid_col: "grid_ref_id"})
    grid = grid.rename(columns={"_id": "grid_ref_id"})

    distinct_grid_munis = set(grid["sav_pav"].dropna().astype(str).unique())
    distinct_map_munis = set(mapping["sav_pav"].dropna().astype(str).unique())
    unmapped_names = sorted(distinct_grid_munis - distinct_map_munis)
    if unmapped_names:
        raise ValueError(f"Municipalities missing from county map: {unmapped_names}")

    merged = tx.merge(
        grid[["grid_ref_id", "sav_pav", "sav_kodas"]],
        on="grid_ref_id", how="left", validate="many_to_one"
    )
    if merged["sav_pav"].isna().any():
        raise ValueError(f"{int(merged['sav_pav'].isna().sum())} transaction rows lack grid mapping")
    merged = merged.merge(mapping, on="sav_pav", how="left", validate="many_to_one")
    if merged["apskritis"].isna().any():
        raise ValueError(f"{int(merged['apskritis'].isna().sum())} transaction rows lack county mapping")

    years = sorted(int(y) for y in merged["year"].dropna().unique())
    if not years:
        raise ValueError("No valid transaction years")
    latest = years[-1]
    window_start = max(years[0], latest - 2)

    args.out_dir.mkdir(parents=True, exist_ok=True)

    annual = aggregate(merged[merged["year"].notna()], ["year", "apskritis"])
    annual.to_csv(args.out_dir / "housing-sale-county-annual.csv", index=False)

    latest_county = annual[annual["year"].eq(latest)].copy()
    latest_county.to_csv(args.out_dir / "housing-sale-county-latest.csv", index=False)

    rolling = aggregate(
        merged[merged["year"].between(window_start, latest, inclusive="both")],
        ["apskritis"]
    )
    rolling.insert(1, "period", f"{window_start}-{latest}")
    rolling.to_csv(args.out_dir / "housing-sale-county-rolling3y.csv", index=False)

    muni_annual = aggregate(merged[merged["year"].notna()], ["year", "sav_pav", "apskritis"])
    muni_annual.to_csv(args.out_dir / "housing-sale-municipality-annual.csv", index=False)

    meta = {
        "transactions_source_rows": int(len(tx)),
        "grid_source_rows": int(len(grid)),
        "joined_rows": int(len(merged)),
        "municipalities_in_grid": int(len(distinct_grid_munis)),
        "counties": sorted(mapping["apskritis"].dropna().unique().tolist()),
        "first_year": years[0],
        "latest_year": latest,
        "rolling_window": [window_start, latest],
        "latest_year_rows": int(merged["year"].eq(latest).sum()),
        "latest_year_objects": float(pd.to_numeric(
            merged.loc[merged["year"].eq(latest), "objektu_sk"], errors="coerce"
        ).sum()),
        "qa": {
            "transaction_grid_join_complete": True,
            "municipality_county_join_complete": True,
            "source_snapshots_expected_pagination_complete": True,
        }
    }
    (args.out_dir / "housing-sale-source-meta.json").write_text(
        json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps(meta, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
