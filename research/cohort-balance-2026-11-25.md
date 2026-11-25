# Gimimo kartų dydis, mirtys ir gyventojų balansas, 2026-11-25

Būsena: MODELLED_UNPUBLISHED. Papildomas aprašomasis tyrimas; svetainė nekeičiama. Ankstesnis paskelbtas FERTILITY-COHORT-SIZE-2024-01 (43/22/10 %) išlieka.

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
Visi ankstesni 45 ID ir jų publikavimo vietos palikti. Naujas įrašas POPULATION-COHORT-BALANCE-2025-01 lieka nepublikuotas.

Šaltiniai:
https://ec.europa.eu/eurostat/databrowser/view/demo_pjan/default/table
https://ec.europa.eu/eurostat/databrowser/view/demo_mager/default/table
https://ec.europa.eu/eurostat/cache/metadata/en/demo_pop_esms.htm
https://ec.europa.eu/eurostat/cache/metadata/en/demo_mor_esms.htm
https://unstats.un.org/unsd/demographic/products/dyb/DYBNat/NatStatTab01.pdf
