#!/usr/bin/env python3
import json
import os
import urllib.parse
import urllib.request
from functools import reduce
from operator import mul

DATASET = "demo_find"
BASE = f"https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/{DATASET}"
PARAMS = {
    "lang": "EN",
    "geo": "LT",
    "sinceTimePeriod": "2005",
    "untilTimePeriod": "2012",
}
URL = BASE + "?" + urllib.parse.urlencode(PARAMS)


def ordered_codes(dataset, dim):
    idx = dataset["dimension"][dim]["category"]["index"]
    if isinstance(idx, list):
        return idx
    return [code for code, pos in sorted(idx.items(), key=lambda kv: kv[1])]


def flat_index(coords, sizes):
    out = 0
    for i, coord in enumerate(coords):
        out += coord * reduce(mul, sizes[i + 1 :], 1)
    return out


def get_value(dataset, selectors):
    coords = []
    for dim in dataset["id"]:
        codes = ordered_codes(dataset, dim)
        code = selectors.get(dim, codes[0])
        coords.append(codes.index(code))
    idx = flat_index(coords, dataset["size"])
    values = dataset["value"]
    if isinstance(values, list):
        return values[idx] if idx < len(values) else None
    return values.get(str(idx), values.get(idx))


def norm(s):
    return " ".join((s or "").lower().replace("-", " ").split())


def pick_indicator(labels, *needles):
    for code, label in labels.items():
        text = norm(label)
        if all(n in text for n in needles):
            return code, label
    return None, None


def main():
    req = urllib.request.Request(URL, headers={"User-Agent": "Demografin-situacija/1.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        ds = json.load(r)

    dims = ds["id"]
    indic_dim = next((d for d in dims if d.lower() in {"indic_de", "indic", "indicator"}), None)
    if not indic_dim:
        extras = [d for d in dims if d not in {"freq", "geo", "time", "unit"}]
        if len(extras) != 1:
            raise ValueError(f"Cannot identify indicator dimension: {dims}")
        indic_dim = extras[0]

    labels = ds["dimension"][indic_dim]["category"].get("label", {})
    selected = {}

    tfr_code, tfr_label = pick_indicator(labels, "total fertility rate")
    if not tfr_code:
        raise ValueError(f"Total fertility rate indicator not found. Available: {labels}")
    selected["tfr"] = {"code": tfr_code, "label": tfr_label}

    patterns = {
        "first_birth_share": ("percentage", "first", "birth"),
        "second_birth_share": ("percentage", "second", "birth"),
        "third_birth_share": ("percentage", "third", "birth"),
        "fourth_plus_birth_share": ("percentage", "fourth", "birth"),
    }
    for key, needles in patterns.items():
        code, label = pick_indicator(labels, *needles)
        if code:
            selected[key] = {"code": code, "label": label}

    years = ordered_codes(ds, "time")
    unit_codes = ordered_codes(ds, "unit") if "unit" in dims else []
    rows = []
    for year in years:
        row = {"year": int(year)}
        for key, meta in selected.items():
            selectors = {indic_dim: meta["code"], "geo": "LT", "time": year}
            if "freq" in dims:
                fcodes = ordered_codes(ds, "freq")
                selectors["freq"] = "A" if "A" in fcodes else fcodes[0]
            if "unit" in dims:
                # Indicator-specific units are represented in the same dataset; use first
                # unit position only when the indicator dataset exposes a unit dimension.
                selectors["unit"] = unit_codes[0]
            val = get_value(ds, selectors)
            if val is not None:
                row[key] = float(val)
        rows.append(row)

    out = {
        "source": {
            "organisation": "Eurostat",
            "dataset": DATASET,
            "title": ds.get("label"),
            "url": "https://ec.europa.eu/eurostat/databrowser/view/demo_find/default/table?lang=en",
            "api_url": URL,
            "updated": ds.get("updated"),
        },
        "status": "Observed annual Eurostat fertility indicators",
        "country": "LT",
        "period": [2005, 2012],
        "indicators": selected,
        "data": rows,
    }

    os.makedirs("data", exist_ok=True)
    with open("data/family-policy-history.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(json.dumps(out, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
