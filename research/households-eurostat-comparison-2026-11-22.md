# Eurostato namų ūkių papildymas, 2026-11-22

## Palyginimas su paskelbtu projektu

Patikrinta main kopija ir viešas app-base.js: turinys sutampa. Esama kanoninė išvada EU-HH-2025-01 yra EU-SILC ilc_lvph02, ne naujosios EU-LFS lentelės rezultatas. Naujas šaltinis nekeičia senosios išvados ir jos preliminarių žymų.

| Buvo | Lieka / papildoma | Vieta |
| --- | --- | --- |
| EU-HH-2025-01: LT 55,7 % (p), ES 35,7 % | Išsaugota nepakeista. Pridėtas atskiras EU-HH-LFS-2025-01: LT 62,5 %, ES 37,5 % | population; tas pats pagrindinis blokas, naujas poskyris |
| Trumpi kontekstai family, housing, migration | Lieka su esamomis nuorodomis; naujas palyginimas nedubliuojamas | Esamos vietos |
| Šeimos hipotezės | Išsaugotos; prieš jas atskiras faktų blokas apie namų ūkius su vaikais | family |
| 42 registro įrašai | Visi išsaugoti, pridėti 2, iš viso 44 | Kanoninis registras |

## Šaltiniai ir atkartojimas

- Rinkinys: https://ec.europa.eu/eurostat/databrowser/view/lfst_hhnhtych/default/table
- Naudotų originalių langelių ištrauka su visomis dimensijomis (pilnas originalas išsaugotas Eurostat_namu_ukiai_lfst_hhnhtych.zip): data/sources/eurostat-lfst-hhnhtych-20261122.json, atnaujintas 2026-09-10.
- Išvestinė su kiekvienos reikšmės filtrais, skaitikliu, vardikliu ir statusu: data/households-lfs-2025.json.
- Atkartoti: `python scripts/summarize_eurostat_households.py`.
- Oficialus 2026-11-20 paaiškinimas: https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20261120-2; patvirtina LT 62,5 %, ES 37,5 %, EU-LFS kilmę ir jaunesnio nei 18 m. vaiko apibrėžtį.
- EU-SILC naudoja išlaikomų vaikų apibrėžtį. Tyrimai, imtys ir vaikų klasifikacija skiriasi; vien tuo negalima paaiškinti viso įverčių skirtumo. Jų nejungiame į vieną laiko eilutę.

Skaičiuojama 100 × skaitiklis / vardiklis iš THS_HH; originalūs statusai išsaugoti. Pasirinkti 2025 m. LT/ES langeliai neturi statuso žymų; tai savaime nėra visų metodinių ribų nebuvimo garantija.

Tarp namų ūkių su vaikais LT: 182,4 / 322,8 tūkst. su vienu vaiku; 117,8 / 322,8 su dviem; 22,7 / 322,8 su trimis ir daugiau. Vienas suaugęs su vaikais: 105,7 / 322,8. ES atitinkami skaitikliai 23 749,8; 17 860,2; 5 806,6; 6 133,3, vardiklis 47 416,6 tūkst.

## Publikacijų ir atsisiųsto rinkinio skirtumai

Oficialus 2026-05-13 straipsnis pateikia LT namų ūkių su vaikais 18,4 %, ES 23,4 %, vieno vaiko ES 50,2 %, dviejų 37,6 %. Šios atsisiųstos versijos tiksliai nurodytų langelių skaičiavimai atitinkamai duoda 18,3 %, 23,3 %, 50,1 %, 37,7 %. Oficialus 2026-11-20 straipsnis ES dalį pateikia 23,3 %. Ankstesnio leidinio procentų nekopijuojame kaip naujo atsisiuntimo rezultatų; skirtumo priežasties be versijų istorijos neteigiame. Svetainėje skelbiamos iš šios kopijos atkartojamos reikšmės ir atsisiuntimo data; bendrų namų ūkių su vaikais procento papildomai nekartojame.

## Interpretacijos ribos ir aprėptis

Momentinė namų ūkių struktūra neparodo vaikų per gyvenimą, antro ar trečio gimimo tikimybės, ketinimų ar ekonominių priežasčių. Vyresnis vaikas gali jau būti išėjęs arba sulaukęs 18 metų. Vienas suaugęs su vaikais nėra įrodymas, kad kitas tėvas neprisideda. Visos ankstesnės šeimos, migracijos ir būsto išvados lieka.

## Publikavimo būsena

Pakeitimai parengti atskiroje šakoje. Naujos PUBLISHED_CONTEXT žymos reiškia rodymo vietas siūlomame svetainės kode; jos nėra įrodymas, kad šaka jau paskelbta. Registro naujų įrašų publication_audit ir governance.households_20261122.live_deployment_pending tai aiškiai žymi. Prieš diegimą vykdomos registro ir desktop/mobile matomumo patikros; galutinis gyvos svetainės QA reikalingas po Pages diegimo.

Vietinis Chromium paleidimas blokuotas aplinkos socket teisių; desktop/mobile QA vietoje nepavyko atlikti. PR CI gali paleisti tests/publication-visibility-qa.cjs su HTTP serveriu. Gyva svetainė šioje sesijoje nekeista.

## Užbaigta 2026-11-24

Ankstesnė publikavimo būsena aukščiau yra istorinė. PR #17 sujungtas. Visos 44 išvados registre išsaugotos; 33 skelbiamos patikrintos visuose 8 moduliuose desktop/mobile; papildomai naujos lentelės ir nuorodos patikrintos 320 px ekrane. Horizontalus perteklius 0 px.

- PR: https://github.com/olemoz1977/Demografin-situacija/pull/17
- Gyva svetainė, Chromium PASS: https://github.com/olemoz1977/Demografin-situacija/actions/runs/45322311156
- Visos vietinės leidinio patikros PASS: https://github.com/olemoz1977/Demografin-situacija/actions/runs/45322311153
- Faktinis Pages diegimas SUCCESS: https://github.com/olemoz1977/Demografin-situacija/actions/runs/45322309198
- Tęstinumas PASS: https://github.com/olemoz1977/Demografin-situacija/actions/runs/45322311193

Patikrų infrastruktūros taisymai: Ubuntu 22.04, atnaujintas tikslus vietinių adresų skaičiaus saugiklis (3), serverio pasirengimo laukimas. Nei statistiniai duomenys, nei išvados per šiuos taisymus nekeisti.
