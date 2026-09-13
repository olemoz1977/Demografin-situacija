#!/usr/bin/env python3
import json
import os
import re
import urllib.parse
import urllib.request
from functools import reduce
from operator import mul

DATASET = "proj_25naasfr"
BASE = f"https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/{DATASET}"
PARAMS = {"lang": "EN", "geo": "LT", "time": "2025"}
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


def labels(dataset, dim):
    return dataset["dimension"][dim]["category"].get("label", {})


def main():
    req = urllib.request.Request(URL, headers={"User-Agent": "Demografin-situacija/1.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        ds = json.load(r)

    dims = ds["id"]
    projection_dim = next((d for d in dims if d.lower() in {"projection", "proj", "scenario"}), None)
    if not projection_dim:
        extras = [d for d in dims if d not in {"freq", "age", "geo", "time", "unit"}]
        if len(extras) != 1:
            raise ValueError(f"Cannot identify projection dimension. id={dims}, extras={extras}")
        projection_dim = extras[0]

    age_codes = []
    for code in ordered_codes(ds, "age"):
        m = re.fullmatch(r"Y(\d+)", code)
        if m and 15 <= int(m.group(1)) <= 49:
            age_codes.append(code)
    if len(age_codes) < 30:
        raise ValueError(f"Unexpected fertility age codes: {age_codes}")

    projection_codes = ordered_codes(ds, projection_dim)
    projection_labels = labels(ds, projection_dim)
    rows = []
    for proj in projection_codes:
        vals = []
        for age in age_codes:
            selectors = {projection_dim: proj, "age": age, "geo": "LT", "time": "2025"}
            if "freq" in dims:
                selectors["freq"] = "A"
            if "unit" in dims:
                unit_codes = ordered_codes(ds, "unit")
                selectors["unit"] = "NR" if "NR" in unit_codes else unit_codes[0]
            v = get_value(ds, selectors)
            if v is None:
                raise ValueError(f"Missing value for projection={proj}, age={age}")
            vals.append(float(v))
        total = sum(vals)
        tfr = total / 1000.0 if total > 10 else total
        rows.append({
            "projection_code": proj,
            "projection_label": projection_labels.get(proj, proj),
            "tfr_2025": round(tfr, 4),
            "age_specific_sum_raw": round(total, 6),
        })

    baseline = next((r for r in rows if "baseline" in r["projection_label"].lower()), None)
    if baseline is None:
        baseline = next((r for r in rows if r["projection_code"].upper() in {"BSL", "BASE"}), None)
    if baseline is None:
        raise ValueError(f"Baseline projection not identified: {rows}")

    out = {
        "source": {
            "organisation": "Eurostat",
            "dataset": DATASET,
            "title": ds.get("label"),
            "url": "https://ec.europa.eu/eurostat/databrowser/view/proj_25naasfr/default/table?lang=en",
            "api_url": URL,
            "updated": ds.get("updated"),
        },
        "status": "EUROPOP2025 baseline nowcast / projection assumption, not observed final TFR",
        "year": 2025,
        "country": "LT",
        "baseline": baseline,
        "all_projection_variants": rows,
    }

    os.makedirs("data", exist_ok=True)
    with open("data/tfr-nowcast-2025.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(json.dumps(out, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
