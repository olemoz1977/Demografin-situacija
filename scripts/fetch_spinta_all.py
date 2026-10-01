#!/usr/bin/env python3
"""
Download a complete Spinta model snapshot by following _page.next cursors.

Strategy:
1. Try the JSON API with explicit Accept header.
2. If that backend rejects paginated JSON, fall back to Spinta's CSV formatter,
   which is the same export path used by data.gov.lt UI.
3. Never mark a snapshot complete until the last page has no next cursor.
"""

from __future__ import annotations

import argparse
import io
import json
import time
from pathlib import Path

import pandas as pd
import requests

DEFAULT_URL = "https://get.data.gov.lt/datasets/gov/lsd/butu_pirkimai_gardelese/ButuPirkimas"
HEADERS_JSON = {
    "Accept": "application/json",
    "User-Agent": "Mozilla/5.0 (compatible; DemografineSituacijaResearch/1.0)",
    "Referer": "https://data.gov.lt/",
}
HEADERS_CSV = {
    "Accept": "text/csv",
    "User-Agent": "Mozilla/5.0 (compatible; DemografineSituacijaResearch/1.0)",
    "Referer": "https://data.gov.lt/",
}


def build_query(limit: int | None, cursor: str | None) -> str:
    expr = []
    if limit:
        expr.append(f"limit({limit})")
    if cursor:
        expr.append(f'page("{cursor}")')
    return ("?" + "&".join(expr)) if expr else ""


def flatten_record(row: dict) -> dict:
    out = {}
    for key, value in row.items():
        if isinstance(value, dict):
            for subkey, subvalue in value.items():
                out[f"{key}.{subkey}"] = subvalue
        else:
            out[key] = value
    return out


def fetch_json(base: str, limit: int, sleep_s: float, timeout_s: int):
    cursor = None
    rows = []
    seen = set()
    page_no = 0
    while True:
        url = base + build_query(limit, cursor)
        r = requests.get(url, headers=HEADERS_JSON, timeout=timeout_s)
        r.raise_for_status()
        payload = r.json()
        page_rows = payload.get("_data", [])
        next_cursor = payload.get("_page", {}).get("next")
        page_no += 1
        print(f"json page={page_no} rows={len(page_rows)} next={'yes' if next_cursor else 'no'}", flush=True)
        rows.extend(flatten_record(x) for x in page_rows)
        if not next_cursor:
            return rows, page_no, "json"
        if next_cursor in seen:
            raise RuntimeError("Repeated JSON pagination cursor detected.")
        seen.add(next_cursor)
        cursor = next_cursor
        if sleep_s:
            time.sleep(sleep_s)


def fetch_csv(base: str, sleep_s: float, timeout_s: int):
    format_url = base.rstrip("/") + "/:format/csv"
    cursor = None
    pages = []
    seen = set()
    page_no = 0
    while True:
        url = format_url + build_query(None, cursor)
        r = requests.get(url, headers=HEADERS_CSV, timeout=timeout_s)
        r.raise_for_status()
        frame = pd.read_csv(io.StringIO(r.text), low_memory=False)
        next_cursor = None
        if "_page.next" in frame.columns:
            values = frame["_page.next"].dropna()
            if not values.empty:
                next_cursor = str(values.iloc[-1])
            frame = frame.drop(columns=["_page.next"])
        page_no += 1
        print(f"csv page={page_no} rows={len(frame)} next={'yes' if next_cursor else 'no'}", flush=True)
        pages.append(frame)
        if not next_cursor:
            return pd.concat(pages, ignore_index=True), page_no, "csv"
        if next_cursor in seen:
            raise RuntimeError("Repeated CSV pagination cursor detected.")
        seen.add(next_cursor)
        cursor = next_cursor
        if sleep_s:
            time.sleep(sleep_s)


def fetch_all(base: str, limit: int, sleep_s: float, timeout_s: int):
    try:
        rows, pages, mode = fetch_json(base, (limit or None), sleep_s, timeout_s)
        return pd.DataFrame(rows), pages, mode
    except (requests.HTTPError, requests.JSONDecodeError, ValueError) as exc:
        print(f"JSON pagination unavailable ({exc}); switching to CSV pagination.", flush=True)
        return fetch_csv(base, sleep_s, timeout_s)


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--url", default=DEFAULT_URL)
    p.add_argument("--limit", type=int, default=0, help="0 = server default page size")
    p.add_argument("--sleep", type=float, default=0.25)
    p.add_argument("--timeout", type=int, default=90)
    p.add_argument("--out", type=Path, default=Path("data/raw/ButuPirkimas-full.csv"))
    p.add_argument("--meta", type=Path, default=Path("data/raw/ButuPirkimas-full.meta.json"))
    args = p.parse_args()

    df, page_count, mode = fetch_all(args.url, args.limit, args.sleep, args.timeout)

    args.out.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(args.out, index=False)

    years = []
    if "data_nuo" in df.columns:
        parsed = pd.to_datetime(df["data_nuo"], errors="coerce")
        years = sorted(parsed.dt.year.dropna().astype(int).unique().tolist())

    meta = {
        "source": args.url,
        "transport": mode,
        "page_count": page_count,
        "row_count": len(df),
        "first_year": years[0] if years else None,
        "last_year": years[-1] if years else None,
        "pagination_complete": True,
        "downloaded_fields": list(df.columns),
    }
    args.meta.parent.mkdir(parents=True, exist_ok=True)
    args.meta.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(meta, ensure_ascii=False, indent=2), flush=True)


if __name__ == "__main__":
    main()
