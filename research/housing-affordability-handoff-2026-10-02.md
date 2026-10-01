# Housing affordability handoff

Date: 2026-10-02
Branch: feature/housing-affordability
Main branch: DO NOT MODIFY until dataset/method is complete and explicitly approved.

## Goal

Add to the public demographic-analysis site:
**„Jaunos poros būsto įperkamumas pagal apskritis“**

Core question:
**„Kiek būsto m² per metus atitinka dviejų jaunų dirbančių žmonių pajamos po nuomos?“**

Formula:
m²/year = [(2 × monthly net income × 12) – annual rent] / dwelling sale price EUR/m²

Interpretation:
relative housing affordability index, NOT actual annual savings.
Do not imply that food, transport, utilities, credit terms, taxes, etc. are included.

Target age: 25–30.
Geography: all 10 Lithuanian counties.
Strategic choice already made: **A – retain all 10 counties AND maintain high quality threshold. Do not publish incomplete / mixed-quality ranking.**

## Current status

### Income layer

Built modeled 2025-11 young-worker county income layer from Sodra.

National age 25–30:
- gross: 2516 EUR/month
- net: 1535 EUR/month

County modeled young net income EUR/month:
- Vilnius 1660.7
- Kaunas 1480.8
- Klaipėda 1402.5
- Telšiai 1292.2
- Utena 1277.4
- Panevėžys 1268.5
- Alytus 1264.1
- Šiauliai 1253.3
- Marijampolė 1234.8
- Tauragė 1210.2

Quality: B-modelled.
Do not call it official 25–30 county net income.
Do not fake a 2025 median if unavailable.

Relevant repo files:
- data/sodra-municipality-income-2025-11.csv
- data/housing-income-county-model-2025-11.csv
- data/housing-income-municipality-model-2025-11.csv
- research/housing-income-model-2025-11.md

### Sale-price layer

Primary attempted source:
VDA / Registrų centras dataset 2559:
https://data.gov.lt/datasets/2559/

User-provided ButuPirkimas snapshot:
- 4630 rows
- latest year = 2024
- continuation via page("cursor") returned header-only CSV
- therefore snapshot is technically complete for that endpoint

Important correction:
Presence of _page.next on the last non-empty Spinta CSV row does NOT prove another non-empty page exists.
Pipeline/fetcher were corrected accordingly.

But the dataset is NOT representative enough for our 10-county market layer:
- 2024: 146 grid rows
- 516 transactions
- 474 objects
- 33 municipalities
- only 8 counties
- no 2024 rows for Telšiai and Tauragė counties

Independent proof that sales DID occur:
- Tauragė district municipality: 186 apartment sales in 2024
- Telšiai district municipality: 222 apartment sales in 2024
- national RC benchmark: 27,330 apartments sold in Lithuania in 2024

Therefore dataset 2559 is a restricted subset, not a full 2024 apartment-market layer.
Keep it for QA/anomaly work only.

Relevant repo files:
- research/vda-butupirkimas-user-export-audit-2026-10-01.md
- research/housing-sale-grid-audit-2024.md
- research/housing-sale-coverage-contradiction-2024.md
- research/housing-sale-robustness-2022-2024.md
- scripts/housing_affordability_pipeline.py
- scripts/fetch_spinta_all.py
- scripts/build_housing_sale_layer.py

### Better sale-price candidate discovered

Highest-priority FREE candidate:
Aplinkos ministerija / Smart Continent
**Savivaldybių būsto prieinamumo indeksas**

Official page:
https://am.lrv.lt/lt/veiklos-sritys-1/busto-prieinamumas/savivaldybiu-busto-prieinamumo-indeksas/

Assessment page:
https://am.lrv.lt/lt/veiklos-sritys-1/busto-prieinamumas/busto-prieinamumo-lietuvoje-didinimo-galimybiu-vertinimas/

Public presentation:
https://lntpa.lt/wp-content/uploads/2026/04/Tarpiniu-vertinimo-rezultatu-pristatymas.pdf

Known:
- dashboard uses 2022–2024 data
- municipality filters exist
- page 4 reportedly contains source/input data
- presentation includes municipality maps of average apartment price EUR/m²
- 2024 Lithuania reference average apartment price = 1669 EUR/m²
- municipality housing-sale counts are also presented

Still MUST verify before use:
1. apartment price is actual/clearly defined transaction price, not asking price
2. same method for all 60 municipalities
3. exact numeric values can be extracted for all 60 municipalities
4. aggregation weight is known or defensible
5. reconstructed Lithuania aggregate approximately matches 1669 EUR/m²

Relevant repo files:
- research/smart-continent-housing-source-audit.md
- research/housing-sale-alternative-sources.md

### Registrų centras fallback

A query was sent from user Gmail to:
rinkos.duomenys@registrucentras.lt

Subject:
2024 m. butų sandorių duomenys pagal Lietuvos savivaldybes

Asked whether 2024 apartment-sale data for all 60 municipalities can be supplied, price, XLSX/CSV, free/open alternative, and publication restrictions.

This is fallback if the AM / Smart Continent public layer is insufficient.

Also sent earlier to:
- atverimas@stat.gov.lt
- CC atviriduomenys@vssa.lt

VDA ticket:
ADS-1961

Do not wait idly for replies; continue researching in parallel.

### Rent layer

Official VDA rent series covers only 5 large cities, insufficient for 10 counties.

Historical Skelbiu.lt research sample exists:
- Marijampolė N=7 median 300 EUR
- Alytus N=6 median 285 EUR
- Utena N=4 median 225 EUR
- Tauragė N=2 median 300 EUR
- Telšiai N=3 median 250 EUR

These are CITY offer samples, NOT county rents.
Quality:
- B market median if N>=10
- C if 5<=N<10
- N<5 insufficient

Relevant files:
- data/housing-rent-city-sample-2025.csv
- data/housing-rent-city-sample-2025-summary.csv
- research/housing-rent-source-audit.md
- scripts/rent_sample_aggregate.py

Do not use social/municipal housing rents as private-market substitutes.

## Immediate next actions

Continue autonomously until a genuine strategic decision is needed.

Priority 1:
Find/export the AM / Smart Continent dashboard page-4 source data or final report appendices.
Goal: obtain exact 2024 apartment-price EUR/m² values for all 60 municipalities plus sale-count or another defensible aggregation weight.

Priority 2:
Audit the methodology behind those prices.
Do not accept map colors/ranges as exact values.

Priority 3:
If PASS, build:
2024 municipality sale-price layer -> county aggregation -> validation against 1669 EUR/m² national control.

Priority 4:
Continue building the rent layer to an acceptable 10-county quality threshold.
Do not substitute county-centre rent directly for county average unless explicitly labeled/modelled.

Priority 5:
Only after sale + rent + income layers pass QA, calculate the young-couple affordability index and integrate it into the site.

## Non-negotiable rules

- Lithuanian language.
- Work autonomously; do not stop for small implementation choices.
- Do not modify main/live site yet.
- Work on feature/housing-affordability.
- Do not publish a 10-county ranking until all 10 have defensible inputs.
- Do not mix asking prices and transaction prices as if equivalent.
- Do not call modelled/market values “official statistics”.
- If a source is incomplete or method unclear, say so.
- Preserve the user’s high-quality A decision.
- No fake precision.
- When a real strategic choice is required, stop and ask the user.
