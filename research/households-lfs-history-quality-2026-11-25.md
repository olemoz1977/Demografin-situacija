# Vieno asmens namų ūkių tyrimo tęsinys: laiko eilutė ir kokybė

## Aprėptis

2026-11-25 patikrinta Eurostat lfst_hhindws 2014–2025 m. eilutė: LT ir EU27_2020, abi lytys, POP, TOTAL ir A1_NCH, THS_PER. Pradiniai duomenys apima visus prieinamus metus, išvestinė – nuo 2014 m. Keturi nesikertantys amžiaus intervalai. Formulė ir originalūs statusai išsaugoti JSON; atkartojimas `python scripts/analyze_households_history.py`.

Šaltinis: https://ec.europa.eu/eurostat/databrowser/view/lfst_hhindws/default/table

## Nauja patikrinta išvada

| Metai | LT 25–54 m., % | ES 25–54 m., % | LT 65+, % | ES 65+, % |
| --- | ---: | ---: | ---: | ---: |
| 2019 | 17,1 | 14,0 | 30,2 | 31,0 |
| 2020 | 19,0 | 13,9 | 32,9 | 31,0 |
| 2021 (b) | 22,7 | 15,0 | 34,8 | 31,1 |
| 2022 | 25,1 | 15,3 | 37,1 | 31,9 |
| 2023 | 28,1 | 15,6 | 40,6 | 32,1 |
| 2024 | 32,2 | 16,1 | 54,3 | 32,1 |
| 2025 | 36,0 | 16,2 | 65,0 | 32,2 |

Vardiklis yra tos pačios amžiaus grupės gyventojai privačiuose namų ūkiuose, ne visi namų ūkiai. 2021 m. LT ir ES atrinkti skaitiklio ir vardiklio langeliai pažymėti b (break in time series); todėl neinterpretuojamas vienas vientisas 2019–2025 m. socialinio elgesio augimas. Tačiau ir atskirai po 2021 m. matomas stiprus LT įverčio augimas.

2023–2024 m. LT65+ gyvenančiųjų po vieną įvertis padidėjo nuo 236,1 iki 324,6 tūkst., 2025 m. iki 399,3 tūkst. Bendras LT65+ įvertis 2024–2025 m. padidėjo nuo 598,1 iki 614,3 tūkst. (+2,7 %), gyvenančių po vieną +23,0 %; dažnis +10,7 p. p. Todėl vien bendros senjorų grupės dydžio augimas šio dažnio šuolio nepaaiškina. Tai nepašalina vidinės 65+ amžiaus sudėties, atrankos ar kitų poveikių.

## Metaduomenų ir pirminio kokybės priedo patikra

1. Bendrieji namų ūkių metaduomenys https://ec.europa.eu/eurostat/cache/metadata/en/lfst_hh_esms.htm atnaujinti 2022-02-14. Juose nėra Lietuvos 2024/2025 paaiškinimo. Švedijos ar Estijos išlygos netaikomos Lietuvai kaip įrodyta priežastis.
2. Lietuvos nacionalinė ataskaita https://ec.europa.eu/eurostat/cache/metadata/en/employ_simslfs2_lt.htm atnaujinta 2025-06-09 ir pateikia 2024 m. duomenis. Jos negalima vadinti 2025 m. kokybės patvirtinimu.
3. Perskaitytas tikras Lietuvos 2024 m. XLSM priedas: https://ec.europa.eu/eurostat/cache/metadata/Annexes/employ_simslfs2_lt_an_1.xlsm . Makrokomandos nevykdytos, tik ląstelių reikšmės nuskaitytos. Originalo atitinkamų lapų reikšmės archyvuotos data/households-lfs-lt-quality-2024-extract.json.
4. P1522 (2024) deklaruoja N koncepcijų, aprėpties, teisės, klasifikacijų ir geografinių ribų pakeitimams. P1523: E7=N atrankos sąrašui, E8=N imties planui, E9=N rotacijai, E10=N anketai, E12=N apklausos būdui, E13=N svorių schemai, E14=N pagalbinei informacijai. Instrukcijoms E11=Y, aprašyta tik kaip nedideli papildymai; J11=N eilutės lūžiui. Tai deklaruoto pagrindinio 2024 m. metodikos pakeitimo nepatvirtina.
5. P133312: 2024 m. bendras neatsakymo įvertis D13=18,49 %. D9–D12: 18,70; 17,89; 18,46; 18,92 %. Tai bendras apklausos, ne konkrečių vieno asmens namų ūkių klaidos įvertis; negalima sakyti, kad 18,49 % paaiškina mūsų skaičius.
6. Nacionaliniai svoriai kalibruojami pagal lytį, 13 amžiaus grupių, savivaldybes ir urbanizaciją, nariams priskiriamas vienodas namų ūkio svoris. Tai metodikos aprašymas, ne įrodymas, kad svoriai sukėlė šuolį.

## Sprendimas ir tyrimo riba

Skaičiai atkartojami iš pirminio šaltinio. Nustatyta, kad ryškus Lietuvos įverčio paspartėjimas nėra vien 2021 m. lūžio ar bendro senjorų skaičiaus augimo aritmetinis rezultatas. Tačiau nepavyko nustatyti, kiek pokytis realus ir kiek galimai susijęs su apklausos ypatybėmis. 2024 priedas nenurodo stambaus metodikos pakeitimo; 2025 atitinkamas priedas šiame patikrintame šaltinyje neprieinamas. Nepatvirtintos klaidos, revizijos ar migracijos poveikio neteigiame.

Išorinių laiškų nesiųsta, mokami duomenys neužsakyti. Ankstesnės dvi PR #18 išvados nekeičia statuso: VERIFIED_UNPUBLISHED. Papildoma laiko ir kokybės išvada registruojama atskirai. Vieša svetainė šioje sesijoje nekeista. Toliau prasminga tikrinti būtent 2025 m. kokybės dokumentus arba nemokamą nepriklausomą nacionalinį šaltinį; kartoti tą patį LT/ES skaičiavimą nebėra prasmės.
