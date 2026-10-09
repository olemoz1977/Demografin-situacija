# Pirmojo būsto prieinamumo tyrimas: miestų kainų dinamika ir pirmojo vaiko gimimo laikas

**Parengta:** 2026-10-09. **Tyrimo tikslas:** vertinti pirmojo būsto prieinamumą jaunoms šeimoms ir jo galimą ryšį su gimstamumu. **Statusas:** OFFICIAL_CITY_CONTEXT + DERIVED_CHANGE + NATIONAL_BIRTH_CONTEXT; **NOT** demonstracija apie priežastinę įtaką. `main` / live nepakeisti.

## A. Ką galime skaičiuoti iš anksčiau surinktų VDA faktų?

VDA `S7R280`, **daugiabučio butas** (1123), didžiųjų miestų savivaldybės: oficialūs 2024 ir 2025 m. vidutinės pardavimo kainos **€/m²**. Pokytis % mūsų apskaičiuotas kaip `(2025 m. kaina / 2024 m. kaina − 1) × 100` ir suapvalintas iki **0,1 proc. punkto**.

VDA `S7R281`: oficialus **2025 m. vidutinės metinės** nuomos kainos rodiklis **€/m² per metus** penkiems miestams; mėnesio atitikmuo `€/m²/metus / 12` yra **mūsų aritmetinis perskaičiavimas**. Nėra to paties buto pardavimo ir nuomos porų ar 1 kambario nuomos populiacijos.

| Miestas (savivaldybė) | Butai 2024 €/m² | Butai 2025 €/m² | Skelbiamų metų vidurkių pokytis* | 2025 nuoma €/m²/mėn.† |
|---|---:|---:|---:|---:|
| Alytus | 890 | 1 039 | +16,7 % | neturima |
| Kaunas | 1 772 | 1 988 | +12,2 % | 10,4 |
| Klaipėda | 1 559 | 1 741 | +11,7 % | 9,5 |
| Panevėžys | 1 030 | 1 170 | +13,6 % | 7,6 |
| Šiauliai | 1 098 | 1 262 | +15,0 % | 7,9 |
| Vilnius | 2 639 | 2 846 | +7,8 % | 12,9 |

\* Kainų vidurkiai gali keistis ir dėl **parduotų butų tipo, ploto, būklės, amžiaus ir vietos** sudėties. Tai **ne** to paties buto indekso pokytis. Kainų pokyčiai rodo miestų statistinės pardavimų rinkos vidurkių judėjimą, bet **nėra 2024–2025 m. standartinio pirmojo būsto kainų pokytis**.

† Skaičiuotas **metinis €/m² rodiklis / 12**; ne oficialus mėnesio nuomos sandorių rodiklis, ne 1 kambario nuomos kaina; be Alytaus (šioje VDA ištraukoje nėra).

**Pirminės skaitinės reikšmės:** `data/housing-verified-city-benchmarks-2024-2025.json`; duomenų originalai `research/raw/vda-sale-big-cities/vda-sale-big-cities-2024-2025-comparison.json` ir `research/raw/vda-rent-big-cities/vda-rent-big-cities-2025-qa.json`. **Atkartojamas apskaičiavimas:** `data/housing-city-market-changes-derived-2024-2025.json`.

- Pirminis pardavimo šaltinis: https://osp-sdg.stat.gov.lt/arcgis/rest/services/EVP_DB_connection/evp56/FeatureServer/0
- Pirminis nuomos šaltinis: https://osp-sdg.stat.gov.lt/arcgis/rest/services/EVP_DB_connection/evp32/FeatureServer/0

## B. Oficiali gimstamumo grandis – laikyti atskirai nuo kainų!

Valstybės duomenų agentūra leidinyje **„Lietuva skaičiais 2025“** (faktiniai 2024 m. duomenys) nurodo:

- **2024 m. vidutinis pirmąjį vaiką gimdančių moterų amžius – 28,7 metų**;
- **2023 m. – 28,4 metų**;
- 2024 m. gimė **19,1 tūkst.** kūdikių; suminis gimstamumo rodiklis **1,11**.

Šie faktai **nėra** 2025 m. pirmojo vaiko amžius; nekurti jo iš 2024 m. reikšmės ar bendro 2025 m. gimstamumo. 2025 m. pirmagimių pagal amžių indikatorius lieka **NOT_YET_EXTRACTED**, nors VDA duomenų skelbimo struktūra ir gimimų eiliškumo lentelės egzistuoja.

Šaltinis: https://publikacijos.stat.gov.lt/lietuva-skaiciais-2025/lt/categories/3

**Lyginimas su savarankišku gyvenimu:** Eurostat 2024 m. tėvų namų palikimo vertinimas Lietuvoje **22,4 m.** ir VDA 2024 m. pirmo gimdymo **28,7 m.** apibūdina **skirtingus asmenis ir statistines populiacijas**. Jų skirtumas **nėra** jaunos poros laukimo laikas tarp išsikraustymo, būsto pirkimo ir vaiko gimimo. Nenurodyti „6,3 metų iki pirmojo vaiko“ kaip empirinių gyvenimo įvykių sekos.

## C. Ar būsto prieinamumas blogėjo?

**Dar nenustatyta.** 2024–2025 m. miestų pardavimo kainų vidurkių kilimas **vienas** neįrodo, kad konkrečiai jaunoms šeimoms sumažėjo įperkamumas. Palyginimui trūksta tuo pačiu laikotarpiu išmatuotų **jaunų šeimų disponuojamųjų pajamų** (ne 2025-11 25–30 m. vieno dirbančiojo atlyginimų proxy), bankinio įnašo ir palūkanų, panašaus buto kokybės, bei savivaldybių ir apskričių **naujai sudaromų šeimų / pirmųjų gimimų** skaitiklio ir atitinkamos amžiaus grupės vardiklio.

**Patvirtinti ribojimai:** `S7R280` yra **miestų**, ne 10 apskričių pirmųjų pirkimų krepšelis; `S7R281` **metinė** nuoma, ne 1 kambario pasiūlos mediana; „Sodros“ 2025-11 darbo pajamos yra **asmenų** rodiklis, o teisinė „jauna šeima“ nėra Eurostat statistinis namų ūkis. 2024–2025 m. pirmojo būsto 10 apskričių **reitingas BLOCKED**.

## D. Kitas tiesioginės vertės darbas

1. Atlikti **2025 m. VDA pirmojo vaiko gimimo amžiaus** ir pirmagimių gimimų pagal motinos amžių patikrą, pirmiausia nacionaliniu, paskui teritoriniu lygiu – be spėjimų.
2. Jei VDA turi tikrą **jaunų namų ūkių pajamų** amžiaus × sudėties × teritorijos pjūvį, naudoti jį vietoje vieno žmogaus atlyginimo modeliavimo. Net jei nėra, turime sąžiningą rinkos kontekstą.
3. Pirmojo būsto 45–55 m², statybos laikotarpio × apskrities × N duomenų reikia iš anksčiau parengto RC mokamo agregato pasiūlymo, **užklausų / užsakymų nesiųsti be patvirtinimo**.
4. Šeimos kūrimo ryšį analizuoti atskirai nuo **priežastingumo**; reikalingi laikotarpiai, kohortos ir kontroliniai veiksniai.

**Rezultato etiketės:**
- `OFFICIAL` – originali VDA publikuota €/m² ar gimdymo amžiaus reikšmė;
- `DERIVED` – mūsų apskaičiuotas vidurkių kainos % pokytis, metinės nuomos mėnesio atitikmuo;
- `UNKNOWN` – 2025 m. pirmojo gimdymo amžius (šiame rinkinyje), realios teisinės jaunų šeimų pajamos;
- `BLOCKED` – priežastinio poveikio išvada ir palyginamas 10 apskričių pirmojo būsto įperkamumo reitingas.
