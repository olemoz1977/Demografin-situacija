#!/usr/bin/env python3
"""
Download a complete Spinta model snapshot by following _page.next cursors.

Default target:
VDA / Registrų centras apartment purchase transaction grid (ButuPirkimas).

The script intentionally uses JSON pagination first and writes one normalized CSV
only after the final page has been reached. This avoids accidentally treating a
single API page as a complete dataset.
"""

from __future__ import annotations

import argparse
import json
import time
from pathlib import Path
from urllib.parse import quote

import pandas as pd
import requests

DEFAULT_URL = "https://get.data.gov.lt/datasets/gov/lsd/butu_pirkimai_gardelese/ButuPirkimas"


def build_url(base: str, limit: int, cursor: str | None) -> str:
    expr = [f"limit({limit})"]
    if cursor:
        # Spinta accepts page("BASE64_CURSOR") as a query expression.
        expr.append(f'page("{cursor}")')
    return base + "?" + "&".join(expr)


def flatten_record(row: dict) -> dict:
    out = {}
    for key, value in row.items():
        if isinstance(value, dict):
            for subkey, subvalue in value.items():
                out[f"{key}.{subkey}"] = subvalue
        else:
            out[key] = value
    return out


def fetch_all(base: str, limit: int, sleep_s: float, timeout_s: int):
    cursor = None
    page_no = 0
    rows = []
    seen = set()

    current_limit = limit
    while True:
        url = build_url(base, current_limit, cursor)
        attempts = 0
        while True:
            attempts += 1
            r = requests.get(url, timeout=timeout_s)
            if r.status_code in {500, 502, 503, 504} and current_limit > 100:
                current_limit = max(100, current_limit // 2)
                url = build_url(base, current_limit, cursor)
                print(f"server={r.status_code}; retrying with limit={current_limit}")
                time.sleep(max(sleep_s, 1.0))
                continue
            if r.status_code == 429 and attempts <= 8:
                wait = min(30.0, max(1.0, sleep_s) * (2 ** (attempts - 1)))
                print(f"rate_limited; waiting {wait:.1f}s")
                time.sleep(wait)
                continue
            r.raise_for_status()
            break
        payload = r.json()

        page_rows = payload.get("_data", [])
        next_cursor = payload.get("_page", {}).get("next")

        page_no += 1
        print(f"page={page_no} rows={len(page_rows)} next={'yes' if next_cursor else 'no'}")
        rows.extend(flatten_record(x) for x in page_rows)

        if not next_cursor:
            break
        if next_cursor in seen:
            raise RuntimeError("Repeated pagination cursor detected; aborting.")
        seen.add(next_cursor)
        cursor = next_cursor

        if sleep_s:
            time.sleep(sleep_s)

    return rows, page_no


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--url", default=DEFAULT_URL)
    p.add_argument("--limit", type=int, default=1000)
    p.add_argument("--sleep", type=float, default=0.25)
    p.add_argument("--timeout", type=int, default=60)
    p.add_argument("--out", type=Path, default=Path("data/raw/ButuPirkimas-full.csv"))
    p.add_argument("--meta", type=Path, default=Path("data/raw/ButuPirkimas-full.meta.json"))
    args = p.parse_args()

    rows, page_count = fetch_all(args.url, args.limit, args.sleep, args.timeout)
    df = pd.DataFrame(rows)

    args.out.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(args.out, index=False)

    years = []
    if "data_nuo" in df.columns:
        parsed = pd.to_datetime(df["data_nuo"], errors="coerce")
        years = sorted(parsed.dt.year.dropna().astype(int).unique().tolist())

    meta = {
        "source": args.url,
        "page_count": page_count,
        "row_count": len(df),
        "first_year": years[0] if years else None,
        "last_year": years[-1] if years else None,
        "pagination_complete": True,
        "downloaded_fields": list(df.columns),
    }
    args.meta.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(meta, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
