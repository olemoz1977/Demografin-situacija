#!/usr/bin/env python3
"""
Download a complete Spinta model snapshot.

Acquisition order:
1. Official DCAT full-dataset JSONL distribution:
   <namespace>/:all/:format/jsonl
2. Model JSON API with _page.next cursor.
3. Model CSV formatter with _page.next cursor.

The :all JSONL route is preferred because data.gov.lt publishes it as the
dataset downloadURL in DCAT metadata. Rows are filtered to the requested model.
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
HEADERS_JSONL = {
    "Accept": "application/x-ndjson, application/jsonl, application/json",
    "User-Agent": "Mozilla/5.0 (compatible; DemografineSituacijaResearch/1.0)",
    "Referer": "https://data.gov.lt/",
}


def split_model_url(base: str) -> tuple[str, str]:
    clean = base.rstrip("/")
    namespace, model = clean.rsplit("/", 1)
    return namespace, model


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


def row_matches_model(row: dict, model: str) -> bool:
    t = str(row.get("_type", ""))
    return t == model or t.endswith("/" + model)


def fetch_full_jsonl(base: str, timeout_s: int):
    namespace, model = split_model_url(base)
    url = namespace + "/:all/:format/jsonl"
    print(f"trying official full JSONL distribution: {url}", flush=True)
    r = requests.get(url, headers=HEADERS_JSONL, timeout=timeout_s, stream=True)
    r.raise_for_status()

    rows = []
    parsed_lines = 0
    other_models = set()
    for raw in r.iter_lines(decode_unicode=True):
        if not raw or not raw.strip():
            continue
        parsed_lines += 1
        obj = json.loads(raw)
        if not isinstance(obj, dict):
            continue
        if row_matches_model(obj, model):
            rows.append(flatten_record(obj))
        else:
            t = obj.get("_type")
            if t:
                other_models.add(str(t))

    if not rows:
        raise ValueError(
            f"Full JSONL distribution returned {parsed_lines} JSON lines but no rows for model {model}."
        )
    print(
        f"jsonl_full lines={parsed_lines} model_rows={len(rows)} other_models={len(other_models)}",
        flush=True,
    )
    return pd.DataFrame(rows), 1, "jsonl_all"


def fetch_json(base: str, limit: int | None, sleep_s: float, timeout_s: int):
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
            return pd.DataFrame(rows), page_no, "json_cursor"
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
            return pd.concat(pages, ignore_index=True), page_no, "csv_cursor"
        if next_cursor in seen:
            raise RuntimeError("Repeated CSV pagination cursor detected.")
        seen.add(next_cursor)
        cursor = next_cursor
        if sleep_s:
            time.sleep(sleep_s)


def fetch_all(base: str, limit: int, sleep_s: float, timeout_s: int):
    errors = []
    try:
        return fetch_full_jsonl(base, timeout_s)
    except Exception as exc:
        errors.append(f"jsonl_all={exc}")
        print(f"Full JSONL unavailable ({exc}); trying model API.", flush=True)

    try:
        return fetch_json(base, (limit or None), sleep_s, timeout_s)
    except Exception as exc:
        errors.append(f"json_cursor={exc}")
        print(f"JSON pagination unavailable ({exc}); switching to CSV pagination.", flush=True)

    try:
        return fetch_csv(base, sleep_s, timeout_s)
    except Exception as exc:
        errors.append(f"csv_cursor={exc}")
        raise RuntimeError("All Spinta acquisition methods failed: " + " | ".join(errors)) from exc


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--url", default=DEFAULT_URL)
    p.add_argument("--limit", type=int, default=0, help="0 = server default page size")
    p.add_argument("--sleep", type=float, default=0.25)
    p.add_argument("--timeout", type=int, default=180)
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
