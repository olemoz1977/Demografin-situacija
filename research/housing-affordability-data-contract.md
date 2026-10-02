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
- 2024 m. faktiniai butų pirkimo-pardavimo sandoriai;
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
- nacionaliniai 27 330 sandorių ir 1 669 EUR/m² dydžiai naudojami tik kaip kontrolė,
  ne kaip automatinė tiesa.

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

`main` / live nekeisti, kol:
- pajamos = 10/10 apskričių ir aiškiai B-modelled;
- pardavimo kaina = 10/10 apskričių ir praeina RC metodikos gate;
- nuoma = 10/10 apskričių ir nėra insufficient teritorijų;
- oficialūs ir modeliuoti rodikliai aiškiai atskirti;
- laikotarpių skirtumai paaiškinti;
- nėra apskrities centro duomenų, pervadintų apskrities rodikliu.
