# 2026-10-19 audito redakcinis pakeitimų žurnalas (T0)

Bazinė tikrinta `main` versija: `bc14c3fcc57250faf1e87d8c82b85d89735235d2`. Šaltinis: 2026-10-18 nepriklausomo redakcinio audito 42 įrašų matrica (vartotojui pateiktas dokumentas). Tai **redakcinio PR** perkėlimo matrica, **ne** pirminių šaltinių pakartotinis auditas.

## Ribos ir vartai

- Visi **42 istoriniai ID išsaugomi**. Vienintelis statuso pakeitimas — `HOUSING-DEMAND-SCHEMES-2026-01`, nes abu jo pavyzdžiai jau buvo viešai matomi `main`. Kitų nepublikuotų analizės modelių ir duomenų automatiškai neskelbiame.
- 2024–2025 m. demografinius rodiklius skiriame nuo 2026 m. paramos paklausos konteksto ir nuo EK scenarijų. Būsto įperkamumo 10 apskričių ir 25–30 metų poros modelis neatkuriamas.
- 2008 m. plataus fondo išlaidos neidentifikuoja vaiko priežiūros reformos kainos. Dabartinės išmokų schemos nepilna 9,0 FRE bazė nebevaizduojama kaip tiesiogiai palyginama su istorine visa schema.
- Kauno vietų `14 931 − 13 946 = 985` ir paskelbtų `783` laisvų vietų skirtumą reikia patikrinti pirminiame savivaldybės dokumente; be patikros duomenų nekeisti.
- Prieš sujungiant PR: visų PUBLISHED markeriai, JS sintaksė, 8 maršrutų navigacija, 320px ir desktop vaizdas, bendras 2025P ir 2025* statusų aiškumas, senų šaltinių/ID išlikimas. **Tik po PR peržiūros galima spręsti apie publikavimą.**

## 42 įrašų „buvo → lieka / tikslinama“ matrica

| ID | Būsena iki → po | Veiksmas |
|---|---|---|
| `EU-HH-2025-01` | PUBLISHED_CONTEXT → PUBLISHED_CONTEXT | Iškelta namų ūkių struktūros išvada, su aiškiu vardikliu; pagrindinė publikavimo vieta nekeista. |
| `HOUSING-CITY-SALES-2025-01` | PUBLISHED_CONTEXT → PUBLISHED_CONTEXT | Išryškinta, kad šešių miestų sandorių €/m² vidurkiai padidėjo; tai ne palyginamos kokybės būsto indeksas. |
| `HOUSING-RENT-SALE-2025-12-01` | PUBLISHED_CONTEXT → PUBLISHED_CONTEXT | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `HOUSING-LOAN-2025-01` | PUBLISHED_METHOD_ONLY → PUBLISHED_METHOD_ONLY | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `HOUSING-SUBSIDY-2019-2025-01` | PUBLISHED_FACT → PUBLISHED_FACT | 2019–2025 m. gavėjų istorijoje prioritetas 1 595 (2022) ir 515 (2025); neskaičiuojama aprėptis. |
| `HOUSING-QUEUE-2025-01` | PUBLISHED_FACT → PUBLISHED_FACT | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `HOUSING-SUBSIDY-SCHEMES-2025-01` | PUBLISHED_FACT → PUBLISHED_FACT | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `HOUSING-SAVINGS-10-COUNTIES-01` | RESEARCH_BLOCKED → RESEARCH_BLOCKED | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `OVERVIEW-LATEST-2025-01` | PUBLISHED_CONTEXT → PUBLISHED_CONTEXT | Apžvalgoje ir kanoninėje sintezėje išryškintas 2024–2025 m. balanso apskaitinis išskaidymas; šaltiniai ir ID lieka. |
| `OVERVIEW-TFR-NOWCAST-2025-01` | PUBLISHED_CONTEXT → PUBLISHED_CONTEXT | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `FERTILITY-TFR-EU-2024-01` | PUBLISHED_FACT → PUBLISHED_FACT | Iškelta į kanoninę 5 išvadų sintezę; senas turinys lieka. |
| `FERTILITY-COUNTIES-2024-01` | PUBLISHED_FACT → PUBLISHED_FACT | Iškelta dešimties apskričių žemo TFR aprašomoji išvada; lentelė lieka. |
| `FERTILITY-FIRST-BIRTH-AGE-2024-01` | PUBLISHED_FACT → PUBLISHED_FACT | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `POPULATION-SEX-AGE-2025-01` | PUBLISHED_FACT → PUBLISHED_FACT | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `POPULATION-REPRO-SEX-2025-01` | PUBLISHED_CONTEXT → PUBLISHED_CONTEXT | Lyčių santykis aiškiau iškeltas apžvalgoje; atskirta nuo kitų namų ūkių metrikų. |
| `POPULATION-BIRTH-COHORTS-2025-01` | PUBLISHED_CONTEXT → PUBLISHED_CONTEXT | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `MIGRATION-FLOW-2025-01` | PUBLISHED_FACT → PUBLISHED_FACT | 2025 migracijos prieaugio sumažėjimo indėlis aiškiau išryškintas, skaičiai nepakeisti. |
| `MIGRATION-FOREIGN-CITIZENS-2025-01` | PUBLISHED_FACT → PUBLISHED_FACT | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `MIGRATION-SEX-AGE-01` | PUBLISHED_CONTEXT → PUBLISHED_CONTEXT | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `FAMILY-MARRIAGES-2024-01` | PUBLISHED_FACT → PUBLISHED_FACT | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `FAMILY-LEAVE-POLICY-2007-2012-01` | PUBLISHED_CONTEXT → PUBLISHED_CONTEXT | 2008 m. plati ligos ir motinystės išlaidų suma nebevadinama vien vaiko priežiūros reformos kaina. |
| `FAMILY-LEAVE-FRE-01` | PUBLISHED_CONTEXT → PUBLISHED_CONTEXT | FRE 2008–2011 istorinės schemos atskirtos nuo nepilno dabartinės schemos 9,0 komponento; nebedaromas tarp laikotarpių dosnumo reitingas. |
| `FAMILY-CHILDCARE-ACCESS-2025-01` | PUBLISHED_CONTEXT → PUBLISHED_CONTEXT | Paaiškintas paslaugų pasiekiamumo kontrastas; Kauno 985 ir 783 skaičiai netaisomi be savivaldybės pirminio paaiškinimo. |
| `FAMILY-DIGITAL-HYPOTHESES-01` | PUBLISHED_CONTEXT → PUBLISHED_CONTEXT | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `FAMILY-IDEALIZED-ROMANCE-2025-01` | PUBLISHED_CONTEXT → PUBLISHED_CONTEXT | Sutraukiama hipotezės vizualinė dominuojanti dalis; N=605 ir ribotas empirinis ryšys išsaugoti. |
| `HOUSING-VDA-RENT-2025-01` | VERIFIED_UNPUBLISHED → VERIFIED_UNPUBLISHED | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `HOUSING-PRICE-CHANGE-DERIVED-2025-01` | VERIFIED_UNPUBLISHED → VERIFIED_UNPUBLISHED | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `HOUSING-COUNTY-HH-INCOME-2024-01` | VERIFIED_UNPUBLISHED → VERIFIED_UNPUBLISHED | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `HOUSING-YOUNG-LEAVING-HOME-2025-01` | VERIFIED_UNPUBLISHED → VERIFIED_UNPUBLISHED | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `HOUSING-SAVINGS-CITY3-2025-01` | MODELLED_UNPUBLISHED → MODELLED_UNPUBLISHED | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `HOUSING-REVERSE-BUDGET-2025-01` | MODELLED_UNPUBLISHED → MODELLED_UNPUBLISHED | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `HOUSING-QUALITY-COMPARABILITY-2025-01` | MODELLED_UNPUBLISHED → MODELLED_UNPUBLISHED | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `HOUSING-MORTGAGE-PER-M2-2025-01` | MODELLED_UNPUBLISHED → MODELLED_UNPUBLISHED | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `HOUSING-MATCHED-MARKET-2025-01` | MODELLED_UNPUBLISHED → MODELLED_UNPUBLISHED | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `HOUSING-DEMAND-SCHEMES-2026-01` | VERIFIED_UNPUBLISHED → PUBLISHED_CONTEXT | Būsena VERIFIED_UNPUBLISHED → PUBLISHED_CONTEXT; jau buvusi 2026 paklausa susieta su viešu housing-affordability.js bloku (ne naujas paskelbimas). |
| `HOUSING-YOUNG-COUPLES-DENOMINATOR-2025-01` | RESEARCH_BLOCKED → RESEARCH_BLOCKED | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `FUTURE-AGEING-REPORT-2040-01` | PUBLISHED_CONTEXT → PUBLISHED_CONTEXT | Iškelta EK sąlyginė projekcija; nėra kategorizuojama kaip jau įvykęs faktas. |
| `FUTURE-ADAPTATION-SCENARIOS-01` | PUBLISHED_CONTEXT → PUBLISHED_CONTEXT | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `METHODS-STATUSES-2025-01` | PUBLISHED_CONTEXT → PUBLISHED_CONTEXT | Sutrumpintos pasikartojančios perspėjimo formuluotės; statusų legenda lieka. |
| `METHODS-DENOMINATORS-01` | PUBLISHED_CONTEXT → PUBLISHED_CONTEXT | Šaltinių rodyklė papildyta, skaičių vardikliai palikti prie išvadų. |
| `EU-AROPE-2025-01` | PUBLISHED_FACT → PUBLISHED_FACT | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |
| `FERTILITY-DEVELOPMENT-PARADOX-2026-01` | PUBLISHED_CONTEXT → PUBLISHED_CONTEXT | Turinys / publikavimo būsena išsaugota, neperkeltas ir netaisytas. |

## Redakcijos pagrindimas

Pagrindinę apžvalgą ir seną ilgąją sintezę suvienodinti; vietoj skaitmeninės metodikos istorijos pateikti 5 išvadas: žemas TFR visose apskrityse; 2025 m. nekompensuotas natūralus mažėjimas; lyčių santykio amžiaus kontrastas; vieno suaugusiojo be išlaikomų vaikų privačių namų ūkių dalis; EK bazinis užimtųjų ir senėjimo scenarijus. Šeimos paslaugos ir būsto rinka / subsidijų gavėjai išlieka atskirose nuorodose.

**Nei vienas dar netikrintas atsakymas į jaunų šeimų faktinį įperkamumą šiuo PR neteikiamas.**
