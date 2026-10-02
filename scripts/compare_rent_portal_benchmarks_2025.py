#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path
import pandas as pd

ROOT=Path(__file__).resolve().parents[1]
skelbiu_path=ROOT/"data"/"housing-rent-city-sample-2025-summary.csv"
aruodas_path=ROOT/"research"/"raw"/"aruodas-rent-benchmark-2025"/"aruodas-1room-rent-2025-qa.json"
out_path=ROOT/"research"/"housing-rent-cross-portal-validation-2025.json"

sk=pd.read_csv(skelbiu_path).set_index("city")
ar=json.loads(aruodas_path.read_text(encoding="utf-8"))["summary"]

cities=["Vilnius","Kaunas","Klaipėda"]
rows=[]
for city in cities:
    if city not in sk.index:
        raise SystemExit(f"Missing Skelbiu city summary for {city}")
    s=float(sk.loc[city,"rent_month_median_eur"])
    n=int(sk.loc[city,"sample_n"])
    a_mean=float(ar[city]["mean_eur_month"])
    a_med=float(ar[city]["median_eur_month"])
    rows.append({
        "city":city,
        "skelbiu_search_index_listing_median_eur_month":s,
        "skelbiu_sample_n":n,
        "aruodas_mean_of_12_monthly_offer_averages_eur_month":a_mean,
        "aruodas_median_of_12_monthly_offer_averages_eur_month":a_med,
        "difference_vs_aruodas_annual_mean_eur":round(s-a_mean,2),
        "difference_vs_aruodas_annual_mean_pct":round((s/a_mean-1)*100,2),
        "difference_vs_aruodas_monthly_average_median_pct":round((s/a_med-1)*100,2),
    })

out={
    "year":2025,
    "comparison_scope":"diagnostic cross-portal comparison only",
    "important_non_equivalence":[
        "Skelbiu value is the median of a partial historical search-index listing sample.",
        "Aruodas annual benchmark is summarized from 12 portal monthly active-listing offer averages.",
        "Different portals, sampling frames and aggregation statistics mean the percentage gaps are not calibration factors."
    ],
    "comparisons":rows,
    "interpretation":{
        "vilnius":"Large negative gap is a strong warning that the current Skelbiu search-index sample is not representative enough to estimate the full Vilnius market.",
        "kaunas_klaipeda":"Smaller gaps are encouraging as cross-checks but still do not establish completeness or representativeness.",
        "method_rule":"Do not rescale county values using these gaps and do not mix Aruodas city values into county estimates."
    },
    "verdict":"SUPPORTS_SEARCH_INDEX_AS_QA_ONLY_NOT_PUBLICATION_LAYER"
}
out_path.write_text(json.dumps(out,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print(json.dumps(out,ensure_ascii=False,indent=2))
