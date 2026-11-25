# Gyvenimas po vieną pagal amžių ir lytį: LT ir ES

Patikrinta 2026-11-25. Šis darbas tęsia EU-HH-SILC-AGE-2025-01, tačiau naudoja atskirą EU-LFS, todėl EU-SILC procentai nekeičiami ir netaikomi EU-LFS rodikliui.

## Šaltinis ir tikslus rodiklis

Eurostat lfst_hhindws, Persons by household composition and labour status. Originalas data/households-lfs-age-sex-source-2024-2025.json; išvestinė data/households-lfs-age-sex-analysis.json; atkartojimas `python scripts/analyze_households_age_sex.py`.

https://ec.europa.eu/eurostat/databrowser/view/lfst_hhindws/default/table

API: https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/lfst_hhindws?geo=LT&geo=EU27_2020&time=2024&time=2025&wstatus=POP&phhcomp=TOTAL&phhcomp=A1_NCH&phhcomp=A1_CH&lang=EN

Skaitiklis A1_NCH, vardiklis TOTAL, visais kitais filtrais sutampantys langeliai (freq=A, unit=THS_PER, wstatus=POP, geo, sex, age, time). Vardiklis yra tos pačios amžiaus ir lyties grupės asmenys privačiuose namų ūkiuose; ne visi namų ūkiai ir ne sausio 1 d. gyventojų registras. Kolektyvinių namų ūkių gyventojai neįtraukti. Atrinkti A1_NCH ir TOTAL langeliai neturi statuso žymų; kai kurioms mažoms A1_CH grupėms yra u arba slopintos reikšmės, todėl jos nenaudojamos gyvenimo po vieną procentams.

## 2025 m.: tos pačios amžiaus ir lyties grupės dalis, gyvenanti po vieną

| Amžius | Lytis | LT, % | ES, % |
| --- | --- | ---: | ---: |
| 18–24 | Vyrai | 32,8 | 12,0 |
| 18–24 | Moterys | 32,2 | 12,3 |
| 25–54 | Vyrai | 45,0 | 20,2 |
| 25–54 | Moterys | 26,1 | 12,2 |
| 55–64 | Vyrai | 51,0 | 20,2 |
| 55–64 | Moterys | 52,7 | 20,4 |
| 65+ | Vyrai | 52,0 | 21,6 |
| 65+ | Moterys | 72,3 | 40,4 |

Apskaičiuota iš apvalintų tūkstančių. 25–54 m. LT: vyrai 275,5 / 612,2 tūkst., moterys 147,4 / 563,7 tūkst.; 65+ LT: vyrai 114,4 / 220,2 tūkst., moterys 284,9 / 394,1 tūkst. Visų 18+ LT 1 100,5 / 2 397,0 = 45,9 %; ES 76 157,4 / 366 361,4 = 20,8 %. Tai asmenų procentai, nepainioti su LT 62,5 % namų ūkių.

## Ką rodo palyginimas

1. 25–54 m. vyrų ir moterų skirtumas LT apie 18,9 p. p., ES apie 8,0 p. p. Tai vienas aiškus skirtumas pagal lytį, ne visų vyrų ir moterų partnerystės balansas.
2. 65+ moterų gyvenimas po vieną yra dažniausias iš šių aštuonių LT grupių. Tačiau 65+ sudaro 36,3 % LT gyvenančiųjų po vieną ir 41,0 % ES (399,3 / 1 100,5 ir 31 258,2 / 76 157,4). Senjorai svarbūs, bet nesudaro daugumos.
3. 25–54 m. grupė sudaro 38,4 % LT gyvenančiųjų po vieną, 55–64 m. dar 19,7 %. Didelė vienos grupės dalis taip pat priklauso nuo jos amžiaus intervalo pločio (25–54 apima 30 metų); to nevadiname gyvenimo po vieną rizikos reitingu.
4. LT gyvenimo po vieną dažnis didesnis už ES visose aštuoniose nagrinėtose amžiaus ir lyties grupėse. Vien teiginiu „Lietuvoje daugiau senjorų ar moterų“ šio skirtumo paaiškinti negalima.

## Aprašomasis amžiaus ir lyties sudėties patikrinimas

Naudojamos 8 nesikertančios grupės, svoriai normalizuojami iš jų pačių asmenų skaičiaus. Simetrinė Kitagawa tapatybė:

R_LT − R_ES = Σ(w_LT − w_ES)(r_LT + r_ES)/2 + Σ(r_LT − r_ES)(w_LT + w_ES)/2.

Iš apvalintų pirminių langelių gaunama 25,128 p. p. bendro skirtumo: sudėties dėmuo 0,408 p. p., gyvenimo po vieną dažnių grupėse dėmuo 24,720 p. p. Šie dėmenys yra matematinis suskaidymas, ne priežastinis poveikis. Rezultatas priklauso nuo pasirinktų plačių amžiaus intervalų; ypač 65+ grupės vidinė amžiaus sudėtis nekontroliuota. Neturint imties paklaidų nedaroma statistinio reikšmingumo išvada.

## Ankstesnių metų patikra

| Amžius, abi lytys | LT 2024, % | LT 2025, % | ES 2024, % | ES 2025, % |
| --- | ---: | ---: | ---: | ---: |
| 18–24 | 27,3 | 32,5 | 12,6 | 12,1 |
| 25–54 | 32,2 | 36,0 | 16,1 | 16,2 |
| 55–64 | 47,5 | 51,9 | 20,1 | 20,3 |
| 65+ | 54,3 | 65,0 | 32,1 | 32,2 |

Lietuvos skirtumas matomas ir 2024 m., todėl nėra vien 2025 m. palyginimo rezultatas. Tačiau 2024–2025 m. LT 65+ pokytis ypač didelis; nevadiname jo tiesiogiai socialinio elgesio, migracijos ar našlystės šuoliu. Reikia metaduomenų, svorių ir ilgesnės laiko eilutės patikros. Nepatvirtintos revizijos ar metodinio lūžio neteigiame vien iš šių skaičių.

## Kryžminė patikra ir ribos

EU-LFS namų ūkių lentelėje lfst_hhnhtych LT A1_NCH 2025 yra 1 100,5 tūkst., ES 76 157,4 tūkst. Asmenų lentelės 18+ skaitikliai sutampa. ES 25–54 m. vyrų 20,2 % ir moterų 12,2 % taip pat sutampa su Eurostat Household composition statistics straipsniu: https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Household_composition_statistics (ištraukta May 2026).

Gyvenimas po vieną nėra santuokinės padėties, neturimo partnerio, vienatvės, sąmoningo bevaikiškumo ar nenoro kurti šeimą matas. Vienas suaugęs su vaikais A1_CH yra atskiras reiškinys ir neįtrauktas į gyvenimą po vieną. Našlystė, skyrybos, vaikų išėjimas, būstas, migracija ir subjektyvi vienatvė čia priežastiškai netirti.

## Tęstinumas

Visi ankstesni PR #18 įrašai ir 44 paskelbto main registro įrašai išsaugoti. Naujas EU-HH-LFS-AGE-SEX-2025-01 – VERIFIED_UNPUBLISHED. Viešas turinys šio tyrimo sesijoje nekeičiamas. Šis rezultatas nedubliuoja SILC iki/nuo 65 m. namų ūkių palyginimo: kitas tyrimas, asmenų vardikliai, lytis ir keturios amžiaus grupės. Toliau prasminga tikrinti LT laiko eilutės ir apklausos svorių stabilumą bei, jei prieinama, smulkesnį amžių ir santuokinę padėtį.
