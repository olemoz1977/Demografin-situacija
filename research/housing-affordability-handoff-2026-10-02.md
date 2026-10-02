# Housing affordability handoff

Date: 2026-10-02
Branch: `feature/housing-affordability`
Main/live: **DO NOT MODIFY** until publication-readiness gates pass.

## Goal

Public-analysis target:
**„Jaunos poros būsto įperkamumas pagal apskritis“**

Population:
- working couple;
- age 25–30;
- no children.

Geography:
- all 10 Lithuanian counties.

Strategic choice:
- **A — keep all 10 counties and high quality threshold.**
- Do not substitute county centres for counties.
- Do not publish incomplete / mixed-method ranking.

Formula:

`m²/year = [(2 × monthly net income × 12) – annual rent] / apartment sale price EUR/m²`

Interpretation:
relative affordability index, NOT actual annual savings.

## Current publication status

Machine-readable gate:
`research/housing-affordability-readiness.json`

Current decision:
- `ready_for_publication = false`
- `DO_NOT_PUBLISH`

PASS:
- income model 10/10 counties;
- explicit no-county-centre-substitution rule.

BLOCKED:
1. official RC 2024 actual-apartment transaction layer;
2. 2025 private long-term 1-room asking-rent layer for 10 counties.

Readiness generator:
- `scripts/housing_affordability_readiness.py`
- tests: `tests/test_housing_affordability_readiness.py`
- workflow: `.github/workflows/housing-publication-readiness.yml`

## Income layer — PASS / B-modelled

National Sodra 2025-11 age 25–30 full-month workers:
- gross 2516 EUR/month;
- net 1535 EUR/month.

County model net EUR/month/person:
- Vilniaus 1660.7
- Kauno 1480.8
- Klaipėdos 1402.5
- Telšių 1292.2
- Utenos 1277.4
- Panevėžio 1268.5
- Alytaus 1264.1
- Šiaulių 1253.3
- Marijampolės 1234.8
- Tauragės 1210.2

File:
- `data/housing-income-county-model-2025-11.csv`

Quality:
- B-modelled;
- do NOT call it direct official age×county measurement.

## Sale-price layer — BLOCKED EXTERNAL SOURCE

### VDA/RC dataset 2559 — QA ONLY

2024 full endpoint snapshot:
- 516 transactions;
- 474 objects;
- 33 municipalities;
- 8 counties;
- Telšių and Tauragės counties missing.

Independent controls show this is only a narrow subset of the full apartment market.

Therefore:
- `ButuPirkimas` 1×1 km grid = QA / anomaly / JOIN diagnostics only;
- NEVER use it as the main 10-county sale-price layer.

Legacy:
- `scripts/housing_affordability_pipeline.py`
- refuses to run unless `--allow-diagnostic-grid`.

### Smart Continent — QA ONLY / apartment reconstruction CLOSED FAIL

Public Power BI page 4:
- 60 municipalities;
- 2024 generic housing transactions = 37,009;
- generic housing average = 557.007 EUR/m²;
- national value equals unweighted mean of 60 municipality measures;
- full semantic model has no municipal apartment-only price series.

Additional BI_1 audit:
- queried raw `FactBPI.BI_1`, generic housing EUR/m² and net VDU for all 60 municipalities;
- exact identity across all 60: `BI_1 = generic housing EUR/m² / monthly net VDU`;
- therefore BI_1 is redundant with the same generic-housing price and contains no independent apartment-only signal;
- against official VDA apartment EUR/m², Smart Continent generic price is ~33–44% lower in all six benchmark cities.

Verdict:
**FAIL main apartment sale layer; no hidden BI_1 reconstruction path.**

Files:
- `research/smart-continent-housing-source-audit.md`
- `research/smart-continent-housing-page4-qa-2024.json`
- `research/smart-continent-bi1-sale-qa-2024.json`
- `data/housing-sale-smart-continent-housing-2024-diagnostic.csv`
- `data/housing-sale-smart-continent-bi1-2024-diagnostic.csv`

### Official VDA S7R280 sale benchmark — PASS / VALIDATION ONLY

Official ArcGIS EVP56, 2024, housing type `1123 = Butas daugiabučiuose namuose`, EUR/m²:
- Alytaus m. sav. 889.79
- Kauno m. sav. 1771.62
- Klaipėdos m. sav. 1559.14
- Panevėžio m. sav. 1030.03
- Šiaulių m. sav. 1098.12
- Vilniaus m. sav. 2639.03
- Lietuvos Respublika 1684.64

This is a strong official control for any future RC layer, but it covers only six city municipalities plus Lithuania, not 10 counties.

Files:
- `research/raw/vda-sale-big-cities/vda-sale-big-cities-2024.csv`
- `research/raw/vda-sale-big-cities/vda-sale-big-cities-2024-qa.json`

### Main sale target — Registrų centras

Needed:
- 2024 actual apartment transactions;
- all 60 municipalities or direct 10-county aggregate;
- actual EUR/m²;
- transaction count;
- valid price-observation count;
- documented apartment-selection / multi-object rules;
- publication rights.

RC request sent 2026-10-01:
- `rinkos.duomenys@registrucentras.lt`
- awaiting reply.

VDA request:
- ADS-1961 registered;
- awaiting substantive reply.

No further email/request/form may be sent without first showing exact text to the user
and receiving explicit approval.

### Free public path audit

Verdict:
**FREE PUBLIC PATH: NOT FOUND.**

RC public contract:
- search can use municipality/date/unit-price/etc.;
- paid output gives up to 25 or 50 newest transactions;
- complex individual query >25 also returns newest transactions.

RC broker:
- ActionType 197 — transaction search;
- ActionType 198 — full transaction info by sand_id;
- not an open full-market export.

A 2026-03-31 open-data demand for actual Vilnius apartment transaction prices remains
registered on data.gov.lt.

Detailed audit:
- `research/housing-sale-alternative-sources.md`

### RC validator — PASS

- `scripts/build_housing_sale_county_from_rc.py`
- `tests/test_build_housing_sale_county_from_rc.py`
- workflow: `.github/workflows/test-rc-apartment-sale-builder.yml`

Rules:
- exactly 60 municipalities;
- exactly 10 counties;
- positive actual apartment EUR/m²;
- valid-price N known and <= transactions;
- county aggregation weighted by valid-price observation count;
- output always candidate until manual methodology gate passes.

## Rent layer — BLOCKED EXTERNAL SOURCE

Target:
- 2025;
- private long-term;
- 1-room apartment;
- asking-offer price;
- all 10 counties;
- direct county median preferred, calculated from listing-level data.

### Official VDA benchmark — PASS / VALIDATION ONLY

Indicator S7R281, 2025:
- Vilnius 155.09 EUR/m²/year
- Kaunas 124.35
- Klaipėda 113.46
- Šiauliai 95.15
- Panevėžys 91.40

Source:
official VDA ArcGIS FeatureServer.

Files:
- `research/raw/vda-rent-big-cities/vda-rent-big-cities-2025.csv`
- `research/raw/vda-rent-big-cities/vda-rent-big-cities-2025-qa.json`

Role:
- official validation only;
- 5 cities != 10 counties;
- not 1-room-specific.

### Smart Continent BI_3 — QA ONLY

60-municipality BI_3 can be reconstructed as `BI_3 × net VDU`, but:
- municipal estimation method / N / uncertainty unknown;
- multiple implausibly low values;
- dashboard Lithuania value is simple mean of 60 municipality BI_3 values.

Verdict:
**FAIL main rent layer.**

### Historical Skelbiu city sample — RESEARCH ONLY

Current accepted 2025 city sample:
- Marijampolė N=7, median 300 — C
- Alytus N=6, median 285 — C
- Utena N=4, median 225 — insufficient
- Tauragė N=2, median 300 — insufficient
- Telšiai N=4, median 275 — insufficient

Latest added Telšiai observation:
- 2025-08-01;
- 37 m²;
- 360 EUR/month;
- 1 room.

Files:
- `data/housing-rent-city-sample-2025.csv`
- `data/housing-rent-city-sample-2025-summary.csv`
- `research/housing-rent-search-index-audit-2025-10-02.md`

Reproducible summary:
- `scripts/summarize_housing_rent_city_sample.py`
- tests PASS;
- workflow `.github/workflows/test-rent-city-sample.yml`.

Do NOT:
- lower N threshold;
- mix current 2026 ads into 2025 sample;
- average city values and call them county values;
- mix isolated different-portal listings without calibration.

### Rent provider route

Important correction after Gmail verification:
- **no Aruodas/Skelbiu aggregate-data request has been sent**;
- Gmail `Sent` contains only the RC request and the VDA request;
- any portal request remains optional and may be sent only after the exact text is shown to the owner and explicit approval is received.

Communication rule:
**show every outgoing email/request/form to the user first; send only after explicit approval.**

Provider contract:
- `research/housing-rent-provider-contract.md`

Validator:
- `scripts/validate_housing_rent_provider.py`
- tests PASS;
- workflow `.github/workflows/test-rent-provider-validator.yml`.

Hard gate:
- 10/10 counties;
- apartment / 1 room / long term / asking offer;
- N>=5 every county;
- deduplication and publication rights confirmed.

## Final calculator architecture

Strict calculator:
- `scripts/build_housing_affordability_county.py`
- tests: `tests/test_build_housing_affordability_county.py`
- workflow: `.github/workflows/test-housing-affordability-calculator.yml`

Default:
- refuses candidate sale/rent layers;
- requires `layer_status=publication_approved`.

QA only:
- `--allow-candidate`
- produces explicit `candidate_only` quality and `publication_ready=false`.

Outputs:
- m²/year after rent;
- m²/year without rent;
- rent burden % of pair net income;
- pair monthly net-income months needed per 1 m²;
- source/sample counts;
- income/sale/rent/overall quality.

Because income is B-modelled, final composite cannot be A even if sale is official A.

## Non-negotiable rules

- Lithuanian.
- Work autonomously; no tactical questions unless strategy/cost/legal approval is needed.
- Main/live untouched until readiness=READY.
- 10/10 counties required.
- Official facts separated from modelled / market measures.
- Actual transaction sale prices never mixed with asking sale prices as equivalent.
- City != county.
- No fake precision.
- If source method is unclear, keep it candidate/QA only.
- No paid purchase / contract without user approval.
- **Every outgoing email, external request or form text must be shown to the user before sending.**
