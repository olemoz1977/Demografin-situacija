# Gimimo kartų dydis, mirtys ir gyventojų balansas, 2026-11-25

Būsena: PUBLISHED_CONTEXT. Pirminė 2010–2025 m. apskaitos analizė palikta atsekamumui. Viešai rodoma papildomai sutikrinta 2012–2024 m. tiesioginių migracijos srautų versija, aprašyta failo pabaigoje. Ankstesnis paskelbtas FERTILITY-COHORT-SIZE-2024-01 (43/22/10 %) išlieka.

## Klausimas ir populiacija
Kiek mažesnės gimusių mergaičių kartos matomos dabartinėje Lietuvos moterų struktūroje, ir kiek jau susiformavusias kartas sumažino vėlesni gyventojų pokyčiai?
Sekamos 1985–1999 gimimo metų Lietuvoje gyvenančių moterų grupės. Tai nėra Lietuvos piliečių, Lietuvoje gimusių moterų ar tų pačių individualiai sekamų asmenų imtis. Gyventojų grupė apima ir užsienyje gimusias imigrantes.
Palyginami 2010-01-01 ir 2025-01-01 gyventojai; mirtys apima 2010–2024 kalendorinius metus. Nevadinti 2025-11-25 gyventojų skaičiumi.

## Metodas
Eurostat demo_pjan: F, LT, NR. Sausio 1 d. t metų populiacijoje gimimo metai c atitinka t−1−c pilnus metus (tai ankstesnių metų gruodžio 31 d. populiacija). Pavyzdžiui, 1990 m. gimimo grupė 2025-01-01 yra 34 m., o 1999 m. grupė yra 25 m.; per 2025 metus joms sukanka 35 ir 26 m.
Eurostat demo_mager: F, LT, NR; amžius PASIEKTAS per metus, todėl konkrečių metų t mirtys gimimo grupei c atitinka t−c. Nenaudoti šiam tikslui demo_magec pilnų metų amžiaus.
Visos 225 reikalingos mirčių reikšmės prieinamos. Trūkstamos reikšmės nulinėmis nekeičiamos; šaltinio populiacijos ir mirčių atsakymuose status žymų nėra.
Balansas: N2025 − N2010 = −D2010–2024 + R.
R yra likutinis neto migracijos ir statistinių patikslinimų balansas, ne tiesiogiai stebėta emigracija. Tai aprašomoji apskaitos tapatybė, ne priežastinis modelis.

## Rezultatai
Visos 15 gimimo metų grupių:
- 1985–1999 m. Lietuvoje gimė 358 872 mergaitės.
- 2010-01-01 Lietuvoje gyveno 312 517 šių gimimo metų moterų.
- 2025-01-01 Lietuvoje gyveno 272 080 šių gimimo metų moterų.
- Gyventojų pokytis 2010-01-01 → 2025-01-01: −40 437 (−12,94 %).
- Tų gimimo metų moterų mirtys 2010–2024 m.: 1 778.
- Likutinis neto migracijos ir statistinių patikslinimų balansas: −38 659.
- Mirtys sudaro 4,40 % grynojo gyventojų grupių sumažėjimo; likęs balansas 95,60 %. Tai ne emigracijos dalis ir ne tikimybė mirti.

| Gimimo metai | Gimė mergaičių | Gyveno 2010-01-01 | Gyveno 2025-01-01 | Mirtys 2010–2024 | Migracijos ir patikslinimų likutis |
|---|---:|---:|---:|---:|---:|
| 1985 | 28 676 | 22 445 | 20 781 | 212 | −1 452 |
| 1990 | 27 732 | 23 376 | 20 768 | 144 | −2 464 |
| 1995 | 20 024 | 18 662 | 15 689 | 69 | −2 904 |
| 1999 | 17 659 | 16 396 | 14 249 | 53 | −2 094 |

1990 → 1999 m. gimusių mergaičių skaičius sumažėjo 36,32 %. 2025-01-01 šių gimimo metų moterų grupių skirtumas yra −31,39 %. Tai skirtingo amžiaus grupių palyginimas, ne vienos grupės sumažėjimas ir ne gimimų kritimo indėlis.
2010–2025 m. tos pačios 1990 m. gimimo grupės gyventojų skaičius sumažėjo 11,16 %, 1999 m. grupės 13,09 %. Vadinasi, pradinis mažesnių kartų dydis ir vėlesnis jų gyventojų balansas yra atskiri sluoksniai.

## Ką galima teigti
Mažesnės gimusių mergaičių kartos šiandien atsispindi mažesnėse atitinkamo amžiaus moterų grupėse. Be to, 2010–2024 m. jau susiformavusias kartas mažino gyventojų pokyčiai, kurių vien mirtingumas nepaaiškina. Likutį pagrįstai vadinti migracijos ir statistinių patikslinimų balansu.
Tai papildo 43/22/10 % išskaidymą, bet jo nepakeičia ir negali būti su juo sumuojama.

## Ko šis skaičiavimas neįrodo
- Negalima 38 659 vadinti emigravusių moterų skaičiumi: neatskirta imigracija, grįžimai, statistiniai patikslinimai.
- Gimusių mergaičių ir dabartinių gyventojų skirtumas nėra išgyvenusių / Lietuvoje pasilikusių konkrečių moterų dalis.
- Neapskaičiuota, kiek papildomų vaikų būtų gimę be migracijos; tam reikėtų moterų metinės ekspozicijos be migracijos ir pagrįstų gimdymo rodiklių prielaidų.
- 1985–1999 m. duomenys neapima visos pokarinio baby boom istorijos. Amerikietiškos kartų datos Lietuvai nepriskiriamos.
- Prieš viešinant reikia patikrinti Lietuvos gyventojų ir migracijos revizijas bei palyginti likutį su tiesioginiais migracijos srautais pagal gimimo metus / per metus pasiektą amžių. Šiuo etapu skaičiai yra tyrimo rezultatas su aiškiai pažymėtu likučiu.

## Atsekamumas ir tikrinimas
Pirminiai gimimai: data/birth-sex-history.json (ankstesnis UN Demographic Yearbook šaltinis).
Populiacijos API atsakymas jau saugomas research/raw/cohort-size-20261125/demo_pjan.json.
Pridėtas naujas mirčių atsakymas demo_mager.json, rezultatai cohort-balance-results.json ir scripts/analyze_cohort_balance.py.
Atkūrimas: python scripts/analyze_cohort_balance.py. Tikrinamos kiekvienos grupės ir bendro balanso tapatybės; trūkstami duomenys sukelia klaidą.
Visi ankstesni 45 ID ir jų publikavimo vietos palikti. Naujas įrašas POPULATION-COHORT-BALANCE-2025-01 pirminėje versijoje buvo nepublikuotas; migracijos patikra ir publikacijos versija pateikta žemiau.

Šaltiniai:
https://ec.europa.eu/eurostat/databrowser/view/demo_pjan/default/table
https://ec.europa.eu/eurostat/databrowser/view/demo_mager/default/table
https://ec.europa.eu/eurostat/cache/metadata/en/demo_pop_esms.htm
https://ec.europa.eu/eurostat/cache/metadata/en/demo_mor_esms.htm
https://unstats.un.org/unsd/demographic/products/dyb/DYBNat/NatStatTab01.pdf


## Tiesioginių migracijos srautų patikra ir publikacijos versija

Patikrinta 2026-11-25. Eurostat migr_imm8 ir migr_emi2: LT, F, NR, agedef=REACH. 2010–2011 m. reikalingi REACH langeliai neprieinami (COMPLET reikšmės yra, bet jos nesutampa su gimimo metų grupėmis ir jų nenaudojame kaip pakaitalo). Todėl migracijos išskaidymas viešinamas TIK 2012-01-01–2025-01-01 gyventojų ir 2012–2024 m. įvykių intervalui. Visos 195 kiekvieno migracijos srauto reikšmės prieinamos, pasirinktose reikšmėse status žymų nėra.

| Suderinto laikotarpio rodiklis | Skaičius |
|---|---:|
| Gyveno 2012-01-01 | 291 401 |
| Gyveno 2025-01-01 | 272 080 |
| Gyventojų pokytis | −19 321 |
| Mirtys 2012–2024 | 1 611 |
| Atvykimai 2012–2024 | 85 630 |
| Išvykimai 2012–2024 | 103 604 |
| Tiesioginis neto migracijos balansas | −17 974 |
| Likutinis apskaitos skirtumas | +264 |

Patikra: −1 611 −17 974 +264 = −19 321. 264 yra paskelbtų populiacijos bei srautų duomenų nesutapimo likutis; be papildomų įrodymų jo nevadiname vien oficialia surašymo korekcija. Bendrame balanse teigiamas likutis reiškia, kad stebėtas gyventojų sumažėjimas yra 264 mažesnis už mirčių ir tiesioginės neto migracijos implikuotą sumažėjimą. Atskiros gimimo metų grupės nevienodos; neskelbiame, kad migracija sumažino kiekvieną iš jų.

Patikrinta Lietuvos nacionalinė Eurostat metaduomenų ataskaita: joje nurodyta, kad po 2021 m. surašymo 2012–2020 m. imigracijos duomenys perskaičiuoti įvertinant nedeklaruotą Lietuvos piliečių atvykimą. Bendroji Eurostat populiacijos metodika taip pat aprašo tarp surašymų revizuotas Lietuvos laiko eilutes. Naudojamos dabar prieinamos duomenų versijos, o likutis aiškiai atskirtas nuo tiesioginių migracijos srautų.

Gimimų, dabartinių gyventojų ir migracijos ryšys: 1990–1999 m. gimusių mergaičių skirtumas rodo pradinį kartų dydį; suderintas 2012–2024 m. migracijos balansas patvirtina atskirą vėlesnio tų kartų gyventojų skaičiaus mažėjimo sluoksnį. Iš to neišvedame papildomų ar prarastų gimimų skaičiaus. Visi šių gimimo metų rezidentai, įskaitant užsienyje gimusias moteris, lieka analizėje. Atvykimų / išvykimų skaičiai nėra unikalių visam laikui persikėlusių asmenų skaičiai.

Papildomi šaltiniai:
https://ec.europa.eu/eurostat/databrowser/view/migr_imm8/default/table
https://ec.europa.eu/eurostat/databrowser/view/migr_emi2/default/table
https://ec.europa.eu/eurostat/cache/metadata/en/migr_immi_esms.htm
https://ec.europa.eu/eurostat/cache/metadata/en/migr_ind_esmsip2.htm
https://ec.europa.eu/eurostat/cache/metadata/EN/demo_pop_esms_lt.htm

### Buvo → lieka / papildoma
- Visi ankstesni 45 registro ID ir jų viešas turinys lieka.
- POPULATION-COHORT-BALANCE-2025-01: MODELLED_UNPUBLISHED → PUBLISHED_CONTEXT; pirminiai 2010–2025 m. skaičiai išsaugoti, papildyta tiesioginiais 2012–2024 m. migracijos srautais.
- Naujas pagrindinis blokas Struktūros modulyje: #populationCohortBalance.
- Apžvalgos esamoje gyventojų struktūros kortelėje ir Gimstamumo kartų indėlio bloke pridedamos nuorodos. Migracijos ir kitų modulių ankstesni skaičiai neperrašomi.
- 2010–2011 m. tiesioginio migracijos indėlio nepublikuojame, nes nėra vienodai apibrėžtų reikšmių. 43/22/10 % gimimų išskaidymas nekeičiamas ir su šiais skaičiais nesumuojamas.


## Lygiagretaus darbo išsaugojimas
Prieš publikavimą įtraukta main versija 01737a9cc002c99933b654d0f3bce31b4b2254b6 su paskelbtais namų ūkių amžiaus ir lyties rezultatais. Visi 48 tos versijos registro įrašai, jų tekstai, lentelės, naršyklės patikros ir nuorodos išsaugoti. Su nauju kartų balansu registre yra 49 įrašai, iš jų 38 skelbiami. Ankstesnė šiame faile nurodyta 45 ID aprėptis aprašo pirminę šakos būseną.
