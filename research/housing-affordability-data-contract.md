# Housing affordability research data contract

Statusas: 2026-10-02 / feature/housing-affordability / nepublikuota.

## Pagrindinė taisyklė

Galutinis 10 apskričių rodiklis gali būti skaičiuojamas tik iš sluoksnių, kurie
praeina atskirus pajamų, pardavimo ir nuomos kokybės vartus.

QA / diagnostikos šaltinis nėra automatiškai tinkamas publikavimo sluoksniui.

## 1. Pajamų sluoksnis

Failas:
- `data/housing-income-county-model-2025-11.csv`

Šaltinis:
- Sodra 2025-11 savivaldybių pajamos;
- nacionalinis 25–30 m. visą mėnesį dirbusių orientyras.

Statusas:
- B-modelled;
- 10/10 apskričių užpildyta;
- modeliuota, ne tiesioginis amžius × apskritis matavimas.

## 2. Pardavimo kainos sluoksnis — PAGRINDINIS

Tikslinis šaltinis:
- Registrų centras;
- **2025 m.** faktiniai butų pirkimo-pardavimo sandoriai; 2024 m. tik aiškiai pažymėtas fallback;
- 60 savivaldybių arba tiesioginis 10 apskričių agregatas;
- faktinė sandorio kaina EUR/m²;
- žinomas kainos stebinių N ir agregavimo metodas.

Minimalus savivaldybių agregato kontraktas:
- municipality;
- year;
- apartment_transaction_count;
- valid_price_observation_count;
- avg_apartment_transaction_eur_m2.

Validatorius:
- `scripts/build_housing_sale_county_from_rc.py`

QA:
- 60/60 savivaldybių;
- 10/10 apskričių;
- `valid_price_observation_count <= apartment_transaction_count`;
- apskrities kaina sveriama tik `valid_price_observation_count`, jei RC patvirtina,
  kad savivaldybės vidurkis apskaičiuotas iš tų pačių stebinių;
- 2025 m. nacionaliniai kontroliniai dydžiai: apie 37,1 tūkst. butų pardavimų ir
  oficialus VDA S7R280 Lietuvos vidurkis 1880,13 EUR/m²; jie naudojami tik kaip
  diagnostinė kontrolė, ne automatinė tiesa;
- 2024 m. kontrolės paliekamos istoriniam / fallback QA.

Publikavimo metodikos gate:
- buto atrankos apibrėžimas;
- kelių objektų / dalinio įsigijimo traktavimas;
- EUR/m² skaičiavimo taisyklė;
- kainos stebinių N;
- viešo naudojimo / publikavimo sąlygos.

## 3. Pardavimo gardelių sluoksnis — QA TIK

VDA / RC 1×1 km `ButuPirkimas` rinkinys (dataset 2559):
- techninis snapshot pilnas;
- 2024 m. turi tik 516 sandorių, 474 objektus, 33 savivaldybes ir 8 apskritis;
- neatitinka visos 2024 m. butų rinkos aprėpties.

Todėl:
- NEGALIMA naudoti kaip pagrindinio 10 apskričių pardavimo kainos sluoksnio;
- galima naudoti tik gardelių, outlier, JOIN ir šaltinių kryžminei QA diagnostikai.

Legacy pipeline:
- `scripts/housing_affordability_pipeline.py`
- paleidžiamas tik su `--allow-diagnostic-grid`;
- jo rezultatai nėra publication-ready.

## 4. Nuomos sluoksnis — PAGRINDINIS

Tikslas:
- 2025 m.;
- privati ilgalaikė 1 kambario butų nuoma;
- pasiūlos, ne faktinių sutarčių kaina;
- visos 10 apskričių;
- vienodas krepšelis ir laikotarpis.

Pageidaujamas tiesioginio apskrities agregato kontraktas:
- county;
- year;
- property_type = apartment;
- rooms = 1;
- rental_term = long_term;
- price_basis = asking_offer;
- unique_listing_count;
- median_asking_rent_eur_month.

Validatorius:
- `scripts/validate_housing_rent_provider.py`

Kokybės klasė:
- N >= 10 → B;
- 5 <= N < 10 → C;
- N < 5 → insufficient ir galutiniam teritorijos rodikliui nenaudoti.

Metodikos gate:
- deduplikavimas;
- vienodas 10 apskričių langas;
- trumpalaikės / kambario nuomos atmetimas;
- mediana iš listing-level mėnesinių kainų;
- pakartotinai paskelbtų skelbimų traktavimas;
- išvestinių agregatų publikavimo teisės.

## 5. Oficialus nuomos kontrolinis benchmarkas

VDA rodiklis S7R281 `Butų nuomos vidutinės metinės kainos`, 2025:
- Vilniaus m. sav.;
- Kauno m. sav.;
- Klaipėdos m. sav.;
- Panevėžio m. sav.;
- Šiaulių m. sav.

Failai:
- `research/raw/vda-rent-big-cities/vda-rent-big-cities-2025.csv`;
- `research/raw/vda-rent-big-cities/vda-rent-big-cities-2025-qa.json`.

Naudojimas:
- oficiali kryžminė nuomos metodo validacija;
- NEGALIMA pervadinti 5 miestų į apskritis;
- tai nėra 1 kambario pjūvis ir nėra pagrindinis 10 apskričių sluoksnis.

## 5A. Aruodas 2025 1 kambario benchmarkas — QA / VALIDACIJA

Aruodas Tendencijos 2025 m. 1 kambario mėnesio pasiūlos benchmarkas atkurtas 12 mėn.
Vilniui, Kaunui ir Klaipėdai:
- Vilnius: mėnesinių vidurkių metinis vidurkis 468,75 EUR/mėn.;
- Kaunas: 383,75;
- Klaipėda: 371,67.

Tai nėra 10 apskričių sluoksnis. Naudojamas tik nuomos paieškos imčių kryžminei kontrolei.

## 6. Smart Continent BI_3 — QA TIK

`Vidutinė nuomos įmokų dalis nuo VDU, % (BI_3)`:
- techniškai yra 60 savivaldybių;
- rekonstrukcija `BI_3 × neto VDU` galima;
- tačiau savivaldybių metodas, krepšelis, N ir paklaida nepatvirtinti;
- keli rekonstruoti dydžiai rinkos prasme neįtikinami;
- Lietuvos BI_3 sutampa su paprastu 60 savivaldybių vidurkiu.

Verdiktas:
- `FAIL_FOR_MAIN_RENT_LAYER`;
- diagnostika / QA tik.

## 7. Galutinio rodiklio formulė

`m²/year = [(2 × monthly_net_income × 12) – annual_rent] / apartment_sale_price_eur_m²`

Papildomi rodikliai:
- m² be nuomos;
- nuomos našta;
- kainos / pajamų santykis;
- duomenų kokybės klasė.

Tai santykinis įperkamumo indeksas, ne realios metinės santaupos.

## 8. Publikavimo vartai

Yra du atskiri režimai. **STRICT / v1.0** taikomas galutinei patikrintai versijai; **PRELIMINARY / v0.1** leidžiamas tik feature/preview su aiškiomis `OFFICIAL / MODELLED / PRELIMINARY / TO_BE_REFINED` žymomis.

STRICT / v1.0: `main` / live nekeisti, kol:
- pajamos = 10/10 apskričių ir aiškiai B-modelled;
- pardavimo kaina = 10/10 apskričių ir praeina RC metodikos gate;
- nuoma = 10/10 apskričių ir nėra insufficient teritorijų;
- oficialūs ir modeliuoti rodikliai aiškiai atskirti;
- laikotarpių skirtumai paaiškinti;
- nėra apskrities centro duomenų, pervadintų apskrities rodikliu.


## 9. Galutinio skaičiavimo kontraktas

Strict calculator:
- `scripts/build_housing_affordability_county.py`;
- testai: `tests/test_build_housing_affordability_county.py`;
- CI: `.github/workflows/test-housing-affordability-calculator.yml`.

Pagal nutylėjimą priimami tik:
- **2025 m.** pardavimo ir nuomos sluoksniai; laikotarpių neatitikimas blokuojamas net QA candidate režime;
- pardavimo sluoksnis su `layer_status=publication_approved`;
- nuomos sluoksnis su `layer_status=publication_approved`;
- tiksliai tos pačios 10 apskričių visuose trijuose sluoksniuose;
- nuomos kokybė tik B arba C, be `insufficient`.

`--allow-candidate` leidžiamas tik QA / jautrumo skaičiavimams. Tokiu režimu:
- `publication_ready=false`;
- `overall_quality=candidate_only`;
- rezultatas negali būti naudojamas live / main.

Kalkuliatorius pateikia:
- `m2_per_year_after_rent`;
- `m2_per_year_without_rent`;
- `rent_burden_pct_pair_net_income`;
- `pair_net_income_months_per_one_m2`;
- bazinius pajamų, pardavimo, nuomos dydžius ir imčių N;
- sluoksnių bei bendrą kokybę.

Kadangi pajamų sluoksnis yra B-modelled, bendras rezultatas negali būti A net tada,
kai RC pardavimo sluoksnis yra oficialus faktinių sandorių A lygio šaltinis.

## 10. Machine-readable publication readiness

Failas:
- `research/housing-affordability-readiness.json`

Generatorius:
- `scripts/housing_affordability_readiness.py`

Dabartinė būsena:
- income 10/10 — PASS;
- no county-centre substitution — PASS;
- sale actual apartment transactions — BLOCKED;
- private 1-room rent 10 counties — BLOCKED;
- `ready_for_publication=false`;
- `decision=DO_NOT_PUBLISH` — tai backward-compatible STRICT v1.0 signalas;
- `strict_v1_0.ready=false`;
- `preliminary_v0_1.ready=true` ir `preliminary_v0_1.decision=READY_FOR_FEATURE_PREVIEW`;
- `preliminary_v0_1.main_live_allowed=false`.

PRELIMINARY v0.1 nėra strict vartų apeinimas: jo proxy ir rinkos imties skaičiai privalo būti pažymėti kaip preliminarūs / tikslinami, o gavus publication-grade 2025 sluoksnius — perskaičiuoti.

Readiness blockeriai yra tikėtina tyrimo būsena, todėl generatorius dėl jų negrąžina CI
klaidos. CI klaida rezervuota sugadintai konfigūracijai / kontrakto pažeidimui.


## 2A. Tarpapskritinio palyginamumo vartas — PRIVALOMAS

2026-10-02 po viešo v0.1 peržiūros nustatyta papildoma metodinė problema:
vienodas 50 m² plotas savaime nereiškia vienodo būsto. Statybos laikotarpis,
naujos / antrinės rinkos dalis, būklė ir kitas kokybės miksas tarp apskričių gali
stipriai skirtis.

Dabartinis Smart Continent 2024 sluoksnis šio vartų nepraeina:
- jo semantika yra `housing_all_types_dashboard_measure`;
- jis nėra apartment-specific;
- jis nekontroliuoja statybos laikotarpio ar naujos statybos dalies;
- kalibravimas į 6 miestų VDA butų vidurkius šios kompozicijos problemos nepašalina.

Todėl 10 apskričių kainos / pajamų palyginimui papildomai PRIVALOMA:
- property_type = apartment in multifamily building;
- vienodas tikslinis laikotarpis;
- kontroliuojamas ploto krepšelis (pirminis kandidatas 45–55 m²);
- aiški statybos laikotarpio / rinkos segmento taisyklė;
- nauja statyba ir antrinė rinka negali būti tyliai sumaišytos;
- kiekvienai publikuojamai teritorijai turi būti pateiktas stebinių N.

Statybos laikotarpis dar NEUŽRAKINTAS. Pirmas duomenų gavimo etapas turi pateikti
kainą ir N pagal statybos laikotarpio grupes visoms 10 apskričių. Tik po aprėpties
audito galima pasirinkti bendrą segmentą, kuriame visos apskritys turi pakankamą N.

Kol šis vartas nepraeitas:
- 50 m² proxy negalima interpretuoti kaip „to paties 50 m² būsto“ kainos;
- negalima skelbti kraštinių apskričių santykio kaip gryno įperkamumo skirtumo;
- PRELIMINARY v0.1 tarpapskritinis rezultatas = DIAGNOSTIC ONLY.
