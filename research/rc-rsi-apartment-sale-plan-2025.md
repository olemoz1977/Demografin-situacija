# Registrų centro / VDA agreguoto 2025 m. butų sluoksnio priėmimo planas

Data: 2026-10-02
Statusas: **ACTIVE — pagrindinis pardavimo kainos kelias.**
Fallback: 2024 m. tik jei 2025 m. sluoksnio gauti nepavyksta ir tai aiškiai pažymima.

## Kodėl 2025

Galutinis įperkamumo modelis periodiškai derinamas į:
- pardavimo kaina — 2025 m.;
- nuoma — 2025 m.;
- pajamos — 2025-11.

Tai sumažina laikotarpių mišinio riziką. Oficialus VDA S7R280 jau turi 2025 m.
daugiabučių butų EUR/m² etaloną Lietuvai ir 6 miestų savivaldybėms.

## Tikslas

Gauti faktinių daugiabučių butų pirkimo–pardavimo sandorių kainų sluoksnį, kurį galima
patikimai agreguoti: sandoris / objektas → savivaldybė → apskritis → Lietuva.

Galutinis publikavimo vienetas — visos 10 Lietuvos apskričių. Savivaldybė yra tarpinis
agregavimo sluoksnis, ne apskrities centro pakaitalas.

## Minimalus priimtinas savivaldybių agregatas

Kiekvienai iš 60 savivaldybių:
1. municipality;
2. year = 2025;
3. apartment_transaction_count;
4. valid_price_observation_count;
5. avg_apartment_transaction_eur_m2;
6. buto populiacijos / paskirties atrankos apibrėžimas;
7. kelių objektų ir dalinio įsigijimo traktavimas;
8. patvirtinimas, kad tai faktinė sandorio, ne pasiūlos kaina;
9. EUR/m² skaičiavimo metodika;
10. publikavimo / citavimo sąlygos.

Jei valid_price_observation_count nepateiktas, savivaldybės vidurkio negalima
automatiškai sverti bendru sandorių skaičiumi, kol nepatvirtinta, kad visi sandoriai
turėjo validžią EUR/m² reikšmę.

## Pageidaujamas anonimizuotas mikrolygmuo

Jei teikėjas gali pateikti mikrolygmenį, pakanka:
- stabilaus / pseudoniminio sandorio ID;
- metai / mėnuo;
- savivaldybė;
- sandorio tipas ir objekto tipas / paskirtis;
- kainos tipas;
- sandorio suma;
- paskirstyta objekto kaina;
- vieneto kaina EUR/m²;
- objekto ir įsigytas plotas;
- įsigyta dalis;
- objektų ir butų skaičius sandoryje;
- baigtumas.

Tikslaus adreso, buto numerio, savininko duomenų ar unikalaus objekto numerio analizei nereikia.

## Kelių objektų sandoriai

Kainos stebinio prioritetas:
1. butui atskirai paskirstyta kaina;
2. vieno buto sandorio suma, kai nėra kitų kainą iškreipiančių objektų;
3. RC apskaičiuota validi objekto vieneto kaina, jei metodika atitinka 1–2;
4. kitu atveju kainos stebinys iš EUR/m² vidurkio atmetamas, bet sandoris gali likti sandorių skaičiaus kontrolėje.

Nenaudoti bendros kelių objektų sandorio sumos kaip vieno buto kainos.

## Savivaldybė → apskritis

Jei turime tik savivaldybių vidurkius:

county_price = Σ(municipality_price × valid_price_observation_count) / Σ(valid_price_observation_count)

Tai leidžiama tik jei savivaldybės vidurkis yra aritmetinis tų pačių validžių kainos stebinių vidurkis.

Nenaudoti:
- paprasto nesverto savivaldybių vidurkio;
- gyventojų skaičiaus kaip pardavimo kainos svorio;
- visų sandorių N kaip svorio, jei valid-price N skiriasi.

## 2025 kontrolės

Oficialus VDA S7R280, daugiabučių butai, 2025:
- Lietuva: **1880.13 EUR/m²**;
- Alytaus m. sav.: 1038.74;
- Kauno m. sav.: 1987.66;
- Klaipėdos m. sav.: 1740.84;
- Panevėžio m. sav.: 1170.36;
- Šiaulių m. sav.: 1262.33;
- Vilniaus m. sav.: 2846.01.

Registrų centro 2025 m. nacionalinis sandorių kontrolinis dydis: apie **37.1 tūkst. butų pardavimų**.

Kontrolės yra diagnostinės: skirtumas nuo jų turi būti paaiškinamas atrankos apibrėžimu, o ne automatiškai laikomas klaida.

## Dataset 2559 santykis

VDA / RC 1×1 km ButuPirkimas dataset 2559 lieka QA-only:
- turimas snapshot baigiasi 2024 m.;
- 2024 m. apima tik 33 savivaldybes / 8 apskritis;
- oficialiame apraše nurodyta, kad įtraukiami tik vieno objekto įsigijimo sandoriai, o kelių objektų sandoriai nepatenka.

Todėl jis nėra 2025 m. pagrindinio sluoksnio kandidatas.

## Validatorius

scripts/build_housing_sale_county_from_rc.py

Default:
- --year 2025;
- reikalauja 60/60 savivaldybių ir 10/10 apskričių;
- sveria tik valid_price_observation_count;
- generuoja tik candidate_not_publication_approved;
- metodikos gate lieka rankinis.

2024 m. atkūrimas išlaikytas per aiškų --year 2024 ir testuojamas CI.

## Kokybės klasė

- **A** — oficialūs faktiniai sandoriai, aiškiai apibrėžta 2025 m. butų populiacija, 60 savivaldybių, žinomas valid-price N ir agregavimo metodas.
- **B** — oficialus agregatas, aprėptis pilna, bet dalis mikroatrankos / outlier taisyklių neatskleista.
- **C / nepublikuoti** — trūksta teritorijų, neaiški populiacija, pasiūlos kainos, neteisingas svoris arba nepaaiškinamos kontrolės.

## Išorinės užklausos

- RC 2026-10-01 laiškas prašė 2024 m. duomenų — atsakymo kol kas nėra.
- VDA ADS-1961 užregistruota — turinio atsakymo kol kas nėra.
- Parengtas, bet **NEIŠSIŲSTAS**, VDA ADS-1961 patikslinimas prašyti 2025 m. agregato, 2024 m. paliekant fallback.
- Bet koks naujas laiškas / forma siunčiami tik po to, kai savininkui parodytas tikslus tekstas ir gautas aiškus patvirtinimas.

## Veiksmas gavus failą

1. Patikrinti naudojimo / publikavimo sąlygas.
2. Patikrinti 60/60 savivaldybių, 10/10 apskričių, duplicate/null/range.
3. Paleisti nacionalines ir 6 miestų VDA S7R280 kontrolės.
4. Patikrinti valid-price N ir kelių objektų metodiką.
5. Tik po metodikos PASS žymėti sluoksnį publication_approved.
6. main / live nekeisti, kol ir nuomos sluoksnis nepraeina savo vartų.
