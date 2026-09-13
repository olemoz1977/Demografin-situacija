#!/usr/bin/env python3
import json
import math
import os
import urllib.parse
import urllib.request
from functools import reduce
from operator import mul

DATASET = "demo_pjangroup"
BASE = f"https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/{DATASET}"
PARAMS = {
    "lang": "EN",
    "geo": "LT",
    "unit": "NR",
    "sinceTimePeriod": "2015",
    "untilTimePeriod": "2025",
}
URL = BASE + "?" + urllib.parse.urlencode(PARAMS)

REPRODUCTIVE_15_49 = ["Y15-19", "Y20-24", "Y25-29", "Y30-34", "Y35-39", "Y40-44", "Y45-49"]
CORE_25_44 = ["Y25-29", "Y30-34", "Y35-39", "Y40-44"]


def ordered_codes(dataset, dim):
    idx = dataset["dimension"][dim]["category"]["index"]
    if isinstance(idx, list):
        return idx
    return [code for code, pos in sorted(idx.items(), key=lambda kv: kv[1])]


def flat_index(coords, sizes):
    out = 0
    for i, coord in enumerate(coords):
        stride = reduce(mul, sizes[i + 1 :], 1)
        out += coord * stride
    return out


def get_value(dataset, selectors):
    dims = dataset["id"]
    sizes = dataset["size"]
    coords = []
    for dim in dims:
        codes = ordered_codes(dataset, dim)
        code = selectors.get(dim, codes[0])
        coords.append(codes.index(code))
    idx = flat_index(coords, sizes)
    values = dataset["value"]
    if isinstance(values, list):
        return values[idx] if idx < len(values) else None
    return values.get(str(idx), values.get(idx))


def sex_code(dataset, preferred):
    codes = ordered_codes(dataset, "sex")
    if preferred in codes:
        return preferred
    aliases = {"F": ["W"], "M": []}
    for code in aliases.get(preferred, []):
        if code in codes:
            return code
    raise ValueError(f"Sex code {preferred} not found in {codes}")


def group_total(dataset, year, sex, ages):
    vals = []
    for age in ages:
        v = get_value(dataset, {"freq": "A", "unit": "NR", "geo": "LT", "sex": sex, "age": age, "time": str(year)})
        if v is None:
            raise ValueError(f"Missing value: year={year}, sex={sex}, age={age}")
        vals.append(float(v))
    return int(round(sum(vals)))


def ratio(women, men):
    return round(women / men * 1000, 1) if men else None


def main():
    req = urllib.request.Request(URL, headers={"User-Agent": "Demografin-situacija/1.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        dataset = json.load(r)

    female = sex_code(dataset, "F")
    male = sex_code(dataset, "M")
    years = [int(y) for y in ordered_codes(dataset, "time") if 2015 <= int(y) <= 2025]

    series_15_49 = []
    series_25_44 = []
    for year in years:
        f15 = group_total(dataset, year, female, REPRODUCTIVE_15_49)
        m15 = group_total(dataset, year, male, REPRODUCTIVE_15_49)
        f25 = group_total(dataset, year, female, CORE_25_44)
        m25 = group_total(dataset, year, male, CORE_25_44)
        series_15_49.append({"year": year, "women": f15, "men": m15, "women_per_1000_men": ratio(f15, m15)})
        series_25_44.append({"year": year, "women": f25, "men": m25, "women_per_1000_men": ratio(f25, m25)})

    latest = max(years)
    by_age = []
    for age in REPRODUCTIVE_15_49 + ["Y50-54", "Y55-59", "Y60-64", "Y65-69"]:
        f = group_total(dataset, latest, female, [age])
        m = group_total(dataset, latest, male, [age])
        by_age.append({"age": age.replace("Y", "").replace("-", "–"), "women": f, "men": m, "women_per_1000_men": ratio(f, m)})

    output = {
        "source": {
            "organisation": "Eurostat",
            "dataset": DATASET,
            "title": "Population on 1 January by age group and sex",
            "url": "https://ec.europa.eu/eurostat/databrowser/view/demo_pjangroup/default/table?lang=en",
            "api_url": URL,
            "dataset_updated": dataset.get("updated"),
            "generated_from_official_absolute_counts": True,
        },
        "definitions": {
            "reproductive_age": "15–49 m. (standartinis vaisingumo rodiklių amžiaus intervalas)",
            "additional_core_slice": "25–44 m. (papildomas pjūvis, ne standartinis reprodukcinio amžiaus apibrėžimas)",
            "ratio": "moterų skaičius 1 000 to paties amžiaus intervalo vyrų",
        },
        "series_15_49": series_15_49,
        "series_25_44": series_25_44,
        "latest_by_age": {"year": latest, "values": by_age},
    }

    os.makedirs("data", exist_ok=True)
    with open("data/sex-ratio-history.json", "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print(json.dumps(output["series_15_49"], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
