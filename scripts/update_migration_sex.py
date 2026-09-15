#!/usr/bin/env python3
import json
import os
import urllib.parse
import urllib.request
from functools import reduce
from operator import mul

BASE = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data"
START_YEAR = 2015
END_YEAR = 2024
SINGLE_25_44 = [f"Y{i}" for i in range(25, 45)]
GROUPS_25_44 = ["Y25-29", "Y30-34", "Y35-39", "Y40-44"]


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
        if code not in codes:
            return None
        coords.append(codes.index(code))
    idx = flat_index(coords, sizes)
    values = dataset["value"]
    if isinstance(values, list):
        return values[idx] if idx < len(values) else None
    return values.get(str(idx), values.get(idx))


def fetch_dataset(code, extra=None):
    params = {
        "lang": "EN",
        "freq": "A",
        "geo": "LT",
        "unit": "NR",
        "sinceTimePeriod": str(START_YEAR),
        "untilTimePeriod": str(END_YEAR),
    }
    if extra:
        params.update(extra)
    url = f"{BASE}/{code}?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "Demografin-situacija/1.0"})
    with urllib.request.urlopen(req, timeout=90) as r:
        data = json.load(r)
    return data, url


def choose_agedef(dataset, age_codes):
    if "agedef" not in dataset["id"]:
        return None
    options = ordered_codes(dataset, "agedef")
    years = [str(y) for y in range(START_YEAR, END_YEAR + 1)]
    ranked = []
    for agedef in options:
        count = 0
        for year in years:
            for sex in ("M", "F"):
                for age in age_codes:
                    selectors = {"freq": "A", "geo": "LT", "unit": "NR", "sex": sex, "age": age, "time": year, "agedef": agedef}
                    if get_value(dataset, selectors) is not None:
                        count += 1
        ranked.append((count, agedef == "COMPLET", agedef))
    ranked.sort(reverse=True)
    return ranked[0][2] if ranked else None


def sum_ages(dataset, year, sex, age_codes, agedef=None, citizen=None):
    vals = []
    for age in age_codes:
        selectors = {
            "freq": "A",
            "geo": "LT",
            "unit": "NR",
            "sex": sex,
            "age": age,
            "time": str(year),
        }
        if agedef is not None:
            selectors["agedef"] = agedef
        if citizen is not None:
            selectors["citizen"] = citizen
        v = get_value(dataset, selectors)
        if v is None:
            return None
        vals.append(float(v))
    return int(round(sum(vals)))


def year_codes(dataset):
    return [int(y) for y in ordered_codes(dataset, "time") if START_YEAR <= int(y) <= END_YEAR]


def main():
    imm, imm_url = fetch_dataset("migr_imm8")
    emi, emi_url = fetch_dataset("migr_emi2")
    imm_lt, imm_lt_url = fetch_dataset("migr_imm1ctz", {"citizen": "LT"})
    emi_lt, emi_lt_url = fetch_dataset("migr_emi1ctz", {"citizen": "LT"})

    imm_agedef = choose_agedef(imm, SINGLE_25_44)
    emi_agedef = choose_agedef(emi, SINGLE_25_44)
    imm_lt_agedef = choose_agedef(imm_lt, GROUPS_25_44)
    emi_lt_agedef = choose_agedef(emi_lt, GROUPS_25_44)

    years = sorted(set(year_codes(imm)) & set(year_codes(emi)))
    total_25_44 = []
    for year in years:
        mi = sum_ages(imm, year, "M", SINGLE_25_44, imm_agedef)
        fi = sum_ages(imm, year, "F", SINGLE_25_44, imm_agedef)
        me = sum_ages(emi, year, "M", SINGLE_25_44, emi_agedef)
        fe = sum_ages(emi, year, "F", SINGLE_25_44, emi_agedef)
        if None in (mi, fi, me, fe):
            continue
        total_25_44.append({
            "year": year,
            "immigration_men": mi,
            "immigration_women": fi,
            "emigration_men": me,
            "emigration_women": fe,
            "net_men": mi - me,
            "net_women": fi - fe,
        })

    years_lt = sorted(set(year_codes(imm_lt)) & set(year_codes(emi_lt)))
    lithuanian_citizens_25_44 = []
    for year in years_lt:
        r_m = sum_ages(imm_lt, year, "M", GROUPS_25_44, imm_lt_agedef, "LT")
        r_f = sum_ages(imm_lt, year, "F", GROUPS_25_44, imm_lt_agedef, "LT")
        e_m = sum_ages(emi_lt, year, "M", GROUPS_25_44, emi_lt_agedef, "LT")
        e_f = sum_ages(emi_lt, year, "F", GROUPS_25_44, emi_lt_agedef, "LT")
        if None in (r_m, r_f, e_m, e_f):
            continue
        lithuanian_citizens_25_44.append({
            "year": year,
            "return_men": r_m,
            "return_women": r_f,
            "emigration_men": e_m,
            "emigration_women": e_f,
            "net_men": r_m - e_m,
            "net_women": r_f - e_f,
        })

    output = {
        "source": {
            "organisation": "Eurostat",
            "datasets": {
                "immigration_total": "migr_imm8",
                "emigration_total": "migr_emi2",
                "immigration_by_citizenship": "migr_imm1ctz",
                "emigration_by_citizenship": "migr_emi1ctz",
            },
            "urls": {
                "migr_imm8": "https://ec.europa.eu/eurostat/databrowser/view/migr_imm8/default/table?lang=en",
                "migr_emi2": "https://ec.europa.eu/eurostat/databrowser/view/migr_emi2/default/table?lang=en",
                "migr_imm1ctz": "https://ec.europa.eu/eurostat/databrowser/view/migr_imm1ctz/default/table?lang=en",
                "migr_emi1ctz": "https://ec.europa.eu/eurostat/databrowser/view/migr_emi1ctz/default/table?lang=en",
            },
            "api_urls": [imm_url, emi_url, imm_lt_url, emi_lt_url],
            "updated": {
                "migr_imm8": imm.get("updated"),
                "migr_emi2": emi.get("updated"),
                "migr_imm1ctz": imm_lt.get("updated"),
                "migr_emi1ctz": emi_lt.get("updated"),
            },
        },
        "definitions": {
            "age": "25–44 m.",
            "return_migration": "Lietuvos piliečių imigracija į Lietuvą; agreguotas grįžtamosios migracijos rodiklis, ne individualus to paties asmens sekimas.",
            "net": "imigracija minus emigracija tais pačiais metais ir tai pačiai lyčiai.",
            "age_definition_total_immigration": imm_agedef,
            "age_definition_total_emigration": emi_agedef,
            "age_definition_lt_citizen_immigration": imm_lt_agedef,
            "age_definition_lt_citizen_emigration": emi_lt_agedef,
        },
        "total_25_44": total_25_44,
        "lithuanian_citizens_25_44": lithuanian_citizens_25_44,
    }

    os.makedirs("data", exist_ok=True)
    with open("data/migration-sex-history.json", "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print(json.dumps({
        "total_rows": len(total_25_44),
        "lt_citizen_rows": len(lithuanian_citizens_25_44),
        "latest_total": total_25_44[-1] if total_25_44 else None,
        "latest_lt": lithuanian_citizens_25_44[-1] if lithuanian_citizens_25_44 else None,
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
