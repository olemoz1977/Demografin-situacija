# Jaunos poros būsto įperkamumas — preliminarus v0.1

Data: 2026-10-02  
Statusas: **PRELIMINARY / TO BE REFINED**  
Validated publication status: **NOT READY**  
Preliminary publication status: **READY WITH EXPLICIT UNCERTAINTY**

## Kodėl atsirado v0.1

Ankstesnė taisyklė „nieko nerodyti, kol visi 10 apskričių sluoksniai bus publication-grade“
stabdė analizės progresą. Naujas principas:

- rodyti geriausią šiuo metu pagrįstą įvertį;
- aiškiai atskirti oficialius, modeliuotus ir preliminarius sluoksnius;
- nerodyti netinkamo konstrukto kaip tinkamo vien dėl to, kad trūksta duomenų;
- gavus geresnius duomenis pakeisti įvestį, o ne perrašyti visą analizės architektūrą.

## v0.1 formulė

m²/metus = [(2 × modelinė 25–30 m. neto pajamų reikšmė × 12) − 12 mėn. nuoma] / 2025 buto kainos proxy EUR/m²

Tai santykinis įperkamumo indikatorius, ne realiai sutaupoma suma.

## Duomenų sluoksniai

### Pajamos
- 2025-11;
- 10/10 apskričių;
- modeliuota iš oficialių „Sodros“ duomenų;
- statusas: MODELLED_B.

### Nuoma
- 2025 m. Skelbiu.lt istorinė search-index 1 kambario ilgalaikės nuomos imtis;
- apskrities mediana skaičiuojama tiesiogiai iš listing-level stebinių;
- 9/10 apskričių N>=5;
- Tauragės N=2;
- statusas: PRELIMINARY_SAMPLE / PRELIMINARY_LOW_N.

### Pardavimo kaina
Pagrindinio 2025 m. faktinių butų sandorių sluoksnio visoms 60 savivaldybių kol kas nėra.

v0.1 proxy:
1. Smart Continent 2024 m. bendro būsto faktinių sandorių EUR/m² visoms 60 savivaldybių;
2. savivaldybės agreguojamos į apskritis sveriant to paties šaltinio sandorių skaičiumi;
3. bendro būsto kainos lygis kalibruojamas į 2025 m. butų kainos lygį pagal oficialų
   VDA S7R280 šešių miestų etaloną;
4. naudojamas šešių santykių medianinis koeficientas = **1.750739**.

Kalibravimo leave-one-out MAPE šešiuose miestuose = **6.03%**.

Svarbi riba: tai nereiškia, kad modelis 6% tikslumu veikia kaimiškose savivaldybėse.
Perkėlimas už šešių miestų ribų lieka nevaliduotas.

## Preliminarus rezultatas

| Apskritis | Centrinis m²/metus po nuomos | Jautrumo diapazonas |
|---|---:|---:|
| Tauragės | 54.8 | 47.4–59.8 |
| Marijampolės | 46.1 | 39.6–50.7 |
| Utenos | 44.0 | 38.2–48.3 |
| Panevėžio | 41.0 | 34.7–44.6 |
| Telšių | 39.8 | 34.5–43.5 |
| Šiaulių | 34.1 | 29.6–37.3 |
| Alytaus | 33.7 | 29.4–36.5 |
| Kauno | 21.8 | 18.7–23.5 |
| Klaipėdos | 17.6 | 15.4–19.3 |
| Vilniaus | 12.2 | 10.6–13.2 |

Jautrumo diapazonas nėra statistinis pasikliautinasis intervalas. Jis kombinuoja:
- mažiausią / didžiausią šešių miestų kalibravimo santykį;
- nuomos imties Q25 / Q75.

## Interpretavimo taisyklė

v0.1 skirtas **krypčiai ir mastui**, ne dešimtainių tikslumui.

Ypač atsargiai:
- Tauragė: nuomos N=2;
- Vilnius: Skelbiu search-index nuomos mediana reikšmingai žemesnė už Aruodas 2025
  trijų miestų benchmarką;
- visų apskričių pardavimo kaina yra modelinis proxy, o ne oficiali apskrities butų kaina.

## Kas pakeis v0.1

1. Oficialus 2025 m. RC/VDA 60 savivaldybių butų sandorių sluoksnis pakeis pardavimo proxy.
2. Pilnesnis privataus 1 kambario nuomos sluoksnis pakeis / validuos search-index imtį.
3. Gavus abu sluoksnius, bus perskaičiuota v1.0 ir aktyvuotas strict publication gate.

## Failai

- data/housing-affordability-preliminary-v01.csv
- data/housing-affordability-preliminary-v01.json
- research/housing-affordability-preliminary-v01-qa.json
- scripts/build_housing_affordability_preliminary_v01.py
- housing-affordability.js
- .github/workflows/build-housing-affordability-preliminary-v01.yml
- .github/workflows/test-housing-preliminary-view.yml

Feature branch turi atskirą teminį vaizdą **Būstas**. Main/live kol kas nekeistas.
