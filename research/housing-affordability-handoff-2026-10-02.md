# Housing affordability handoff

Date: 2026-10-02
Branch: `feature/housing-affordability`
Main/live: **DO NOT MODIFY**. STRICT v1.0 data gates are not passed; PRELIMINARY v0.1 is allowed only in feature/preview.

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
- **STRICT / v1.0:** keep all 10 counties and the high quality threshold; final validated version remains blocked.
- **PRELIMINARY / v0.1:** show the best currently supportable 10-county estimate in feature/preview with explicit uncertainty and refinement labels.
- Do not substitute county centres for counties.
- Do not present proxy/modelled layers as official county statistics.

Formula:

`m²/year = [(2 × monthly net income × 12) – annual rent] / apartment sale price EUR/m²`

Interpretation:
theoretical income–price comparison index, NOT bank mortgage affordability and NOT actual annual savings. It excludes other living costs, down payment, interest, loan term, DSTI/LTV constraints and household-specific obligations. Row order in v0.1 is display-only and must not be presented as a final county ranking.

## Current publication status

Machine-readable gate:
`research/housing-affordability-readiness.json`

Current dual decision:
- `ready_for_publication = false` / `validated_publication_ready = false` — STRICT v1.0 blocked;
- `preliminary_v0_1.ready = true` — feature/preview allowed with explicit uncertainty;
- main/live remains locked.

PASS:
- income model 10/10 counties;
- explicit no-county-centre-substitution rule.

BLOCKED:
1. official RC/VDA 2025 actual-apartment transaction layer for 60 municipalities / 10 counties (2024 only fallback);
2. 2025 private long-term 1-room asking-rent layer for 10 counties.

Readiness generator:
- `scripts/housing_affordability_readiness.py`
- tests: `tests/test_housing_affordability_readiness.py`
- workflow: `.github/workflows/housing-publication-readiness.yml`
- feature render QA: `.github/workflows/housing-preview-visual-qa.yml` (desktop 1440 px + mobile 390 px; screenshots retained as CI artifact)

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

Preferred target is now **2025** to align sale + rent + income periods.

Official ArcGIS EVP56, 2025, housing type `1123 = Butas daugiabučiuose namuose`, EUR/m²:
- Alytaus m. sav. 1038.74
- Kauno m. sav. 1987.66
- Klaipėdos m. sav. 1740.84
- Panevėžio m. sav. 1170.36
- Šiaulių m. sav. 1262.33
- Vilniaus m. sav. 2846.01
- Lietuvos Respublika 1880.13

2024 benchmark remains available for historical/fallback QA.

This is a strong official control for any future RC/VDA 60-municipality layer, but it covers only six city municipalities plus Lithuania, not 10 counties.

Files:
- `research/raw/vda-sale-big-cities/vda-sale-big-cities-2025.csv`
- `research/raw/vda-sale-big-cities/vda-sale-big-cities-2025-qa.json`
- `research/raw/vda-sale-big-cities/vda-sale-big-cities-2024-2025-comparison.json`

### Main sale target — Registrų centras / VDA 2025 aggregate

Needed:
- **2025 actual apartment transactions**; 2024 accepted only as explicitly labelled fallback;
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

Default target year is 2025; explicit 2024 replay remains tested for fallback QA.

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


### Aruodas 2025 full city benchmark — PASS / VALIDATION ONLY

A robust extractor now recovers a full 12-month 2025 1-room asking-rent benchmark
for the three cities supported by Aruodas Tendencies.

Method:
- 2025-01…09: hidden previous-year comparison cells in the same-month 2026 report HTML;
- 2025-10…12: current cells in direct 2025 archived reports.

2025 summaries:
- Vilnius: mean of monthly averages 468.75 EUR/month; median 467;
- Kaunas: 383.75; median 382;
- Klaipėda: 371.67; median 368.

Cross-portal diagnostic comparison against the partial Skelbiu search-index listing medians:
- Vilnius: 350 vs 468.75 (-25.33%);
- Kaunas: 350 vs 383.75 (-8.79%);
- Klaipėda: 345 vs 371.67 (-7.18%).

These are not calibration factors because portals, sampling frames and aggregation
statistics differ. The Vilnius gap is a strong additional warning against treating
the Skelbiu search-index sample as a publication-grade market estimate.

Files:
- `research/raw/aruodas-rent-benchmark-2025/aruodas-1room-rent-monthly-2025.csv`;
- `research/raw/aruodas-rent-benchmark-2025/aruodas-1room-rent-2025-qa.json`;
- `research/housing-rent-cross-portal-validation-2025.json`.

### Historical Skelbiu city sample — RESEARCH ONLY

The sample is now also aggregated directly at county level from accepted listing-level
observations. 9/10 counties reach N>=5; Tauragės remains N=2. This route is CLOSED for
publication because the search index is not a complete portal export and one county
still fails the minimum N gate.

Current county-level direct listing pool:
- Alytaus N=6, median 285 — C
- Kauno N=13, median 350 — B
- Klaipėdos N=6, median 345 — C
- Marijampolės N=7, median 300 — C
- Panevėžio N=5, median 250 — C
- Šiaulių N=13, median 250 — B
- Telšių N=8, median 275 — C
- Utenos N=6, median 255 — C
- Vilniaus N=10, median 350 — B
- Tauragės N=2, median 300 — insufficient

This is research / cross-validation only, not a complete portal export.

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

### Period alignment gate — PASS

The final calculator now requires sale.year = 2025 and rent.year = 2025.
A 2024 sale layer cannot silently mix with 2025 rent even in `--allow-candidate` mode.

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
- 50 m² sale-price proxy / pair annual net-income years;
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
