# Housing affordability research data contract

## Required source files

### 1. vda_butu_pirkimas.csv
Source: VDA / Registrų centras apartment purchase transactions in 1 km cells.
Dataset: https://data.gov.lt/datasets/2559/
Required fields:
- sq_grid_id
- data_nuo
- objektu_sk
- vid_buto_verte
- buto_verte_p50

### 2. vda_grid1kmsq.csv
Source: VDA 1 km grid lookup.
Required fields:
- _id
- sav_pav
- sav_kodas

### 3. municipality_county.csv
Authoritative municipality-to-county lookup.
Required fields:
- sav_kodas
- sav_pav
- apskritis

### 4. sodra_income_municipality.csv
Derived research table.
Required fields:
- sav_kodas
- apskritis
- income_net_model_25_30
- weight_young_workers

The modelled 25–30 value must preserve the source value and the correction formula in provenance fields.

### 5. rent_1room_municipality.csv
Research sample of 1-room long-term rental offers.
Required fields:
- sav_kodas
- apskritis
- rent_1room_month_median
- rent_sample_n
- weight_young_workers

Recommended provenance fields:
- source
- collected_at
- window_days
- dedup_method
- min_price
- max_price
- median_eur_m2

## QA gates
- exactly 10 counties in final output;
- no unmapped transaction cells;
- report transaction object count by county;
- rent N < 5 excluded from direct municipality estimate;
- report rent N and municipality coverage per county;
- compare transaction weighted mean vs weighted p50 proxy;
- no publication if any county lacks sale price, income or rent estimate;
- main branch remains unchanged until QA passes.
