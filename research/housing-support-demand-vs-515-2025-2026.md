# Paramos pirmajam būstui mastas ir paklausa – SADM 2025 m. gavėjai, 2026 m. kvietimų signalai

**2026-10-10 · patikrinimas iš nemokamų oficialių SADM šaltinių.** Tyrimas visuomeninis, biudžetas 0 EUR. **Tikslas – patikrinti, ką iš tiesų reiškia 515 jaunų šeimų 2025 m., o ne sukurti „juokingai mažo %“ skaičių be vardiklio.**

## Esminis naujas kontekstas: 2019–2025 metų paramos gavėjų seka

**Ta pati viena regioninė jaunų šeimų pirmojo būsto subsidijų schema** (SADM 2025 m. veiklos ataskaita, 32 pav.):

| Metai | Išmoką gavusios jaunos šeimos | Panaudotos lėšos regioninei paskatai, mln. € |
|---|---:|---:|
| 2019 | **820** | 8,1 |
| 2020 | **1 202** | 13,8 |
| 2021 | **1 580** | 20,9 |
| 2022 | **1 595** | 23,6 |
| 2023 | **609** | 11,4 |
| 2024 | **342** | 7,2 |
| 2025 | **515** | 8,2 |

**515 yra neįprastai mažas mastas, palyginti su 2021–2022 m.:** 2025 m. išmokų gavusių jaunų šeimų skaičius tesudarė maždaug **trečdalį 2022 m. skaičiaus**. Vien 2024→2025 augimas **+50,6 %** be ilgesnės retrospektyvos gali sudaryti pernelyg optimistinį įspūdį. **Bet iš šios laiko eilutės negalime apskaičiuoti**, kokia visų paramos pageidavusių ir reikalavimus atitikusių jaunų šeimų dalis buvo paremta: galutinio vienodos programos prašymų, reikalavimus atitikusių pareiškėjų ir išmokų per tą patį laiką srauto skaičiaus nėra. 2025 m. keitėsi taisyklės; metų rezultatus veikia ir ankstesnės eilės nagrinėjimas bei laikas iki kredito suteikimo.

**Dar viena 2025 m. metinės ataskaitos detalė:** po 2025-03-17 pavasarinio kvietimo **mažiau kaip 100** iš anksčiau eilėje buvusių jaunų šeimų pasirinko kreiptis pagal **naująsias 2025 m. finansinės paskatos sąlygas**. Tada ministerija pradėjo formuoti pažymas pagal ankstesnius prašymus ir ankstesnes taisykles. **Tai nereiškia, kad regioninės paskatos poreikis sumažėjo iki 100 šeimų**: naujos tvarkos pasirinkimas neapima visos paklausos. SADM 2025 m. veiklos ataskaita, p. 48 ir skyriaus aiškinamasis tekstas.

**Skaitytojo apsauga nuo skirtingų skaičių painiavos:** 2025 m. minimos **44 papildomos subsidijos** regione yra esamų paramos gavėjų papildomos išmokos, o **515** yra pagrindinę paskatą gavusių jaunų šeimų skaičius; nei 44, nei 2026 m. pateikti kitų schemų prašymai **nėra papildomos 2025 m. naujos šeimos**. Taip pat **2025 m. panaudoti 8,2 mln. €** ne tas pats, kas metais pažymoms rezervuotas / paskirtas finansavimas (ministerija skelbė apie **~12,5 mln. €**). Vengti tariamo „lėšos / 515 = tipinė subsidija“ vertinimo: skirtų ir išmokėtų lėšų bei papildomų išmokų apskaita skiriasi.

Oficialūs šaltiniai:
- SADM, *2025 m. veiklos ataskaita*, **32 pav. ir komentarai**: https://socmin.lrv.lt/public/canonical/1773646445/6523/2026%2003%2006_SADM_Veiklos%20ataskaita%202025-03-10.pdf .
- SADM, **2025-03-17** kvietimo sąlygos senosios eilės šeimoms: https://socmin.lrv.lt/lt/naujienos-1/skelbiamas-kvietimas-jaunoms-seimoms-teikti-prasymus-del-finansines-paskatos-bustui/ .
- SADM, **2025-09-17** finansavimo ir senųjų prašymų apdorojimo statusas: https://socmin.lrv.lt/lt/naujienos/proverzis-paramos-jaunoms-seimoms-isigyjancioms-pirmaji-busta-sistemoje-C1v/ .

Mašininiu būdu atsekamas **7 metų oficialus duomenų rinkinys**: `data/housing-support-young-family-series-2019-2025.json`. Jis yra **tik vienos programos**, jo negalima agreguoti su platesnės subsidijos gavėjų eilute ar prilyginti 10 apskričių populiacijai. Metodinis vartas: `no_coverage_denominator=true`.

## Ką žinome oficialiai

| Laikotarpis | Programa | Oficialus rodiklis | Matavimo rūšis |
|---|---|---|---|
| 2025 metai | A: regioninė finansinė paskata **jaunoms šeimoms** pirmajam būstui | **515** jaunų šeimų išmokėta pagrindinė subsidija | **Išmokėjimas per metus** |
| 2025-01-01 | A | apie **1 700** jaunų šeimų laukė eilėje, dalis nuo **2023 m.** | **Ankstesnių paraiškų likutis**; ne visos Lietuvos jaunos šeimos |
| 2025-09-17 | A | SADM paskelbė, kad ankstesnė eilė **panaikinta**; išnagrinėta apie **1 700** laukiančiųjų prašymų | **Prašymų nagrinėjimas**, NE 1 700 išmokėtų subsidijų |
| 2026-05-19, 09:00–09:10 | **B:** valstybės iš dalies kompensuojamas kreditas ir (ar) subsidija, **platesnė asmenų/šeimų grupė** | beveik **1 000 pateiktų prašymų per 10 min.**; pradinis 5,6 mln. € biudžetas; preliminariai tikėtasi patenkinti **daugiau kaip 300** | **Prašymų padavimo procesas**, o ne galutiniai gavėjai, **ne programa A** |
| 2026-05-20 | B | skirta **papildomai 5 mln. €**, iš viso **10,6 mln. €** | Finansavimo korekcija; ankstesnė „>300“ buvo preliminari prognozė ir po papildymo negali reikšti galutinės paramos aprėpties |
| 2026-09-29 | A: regioninė paskata jaunoms šeimoms | registruota **beveik 800 prašymų** rugsėjo mėn. kvietime; SADM nurodė, kad visų **reikalavimus atitinkančių** prašymų subsidijoms lėšų pakaks | **Prašymai ir ministerijos pranešta finansavimo perspektyva**, dar ne faktinės išmokos |

### Oficialūs šaltiniai
- SADM 2025 m. veiklos ataskaita, 32 pav., **515**: https://socmin.lrv.lt/public/canonical/1773646445/6523/2026%2003%2006_SADM_Veiklos%20ataskaita%202025-03-10.pdf .
- SADM 2025-09-17, **apie 1 700 laukusių šeimų** ir užbaigtas nagrinėjimas: https://socmin.lrv.lt/lt/naujienos/proverzis-paramos-jaunoms-seimoms-isigyjancioms-pirmaji-busta-sistemoje-C1v/ .
- SADM 2026-05-19, **10 min. / beveik 1 000 / preliminariai daugiau kaip 300 / 5,6 mln. €**: https://socmin.lrv.lt/lt/naujienos-1/baigtas-paraisku-priemimas-valstybes-paramai-bustui-isigyti-gIR/ .
- SADM 2026-05-20, **papildomi 5 mln. €**: https://socmin.lrv.lt/lt/naujienos/j-zailskiene-paramai-bustui-isigyti-papildomai-skiriami-5-mln-euru-9TZ/ .
- SADM 2026-09-29, **beveik 800 paraiškų** kitai, regioninei jaunų šeimų paskatai ir paskelbtas visų reikalavimus atitinkančių prašymų finansavimas: https://socmin.lrv.lt/lt/naujienos-1/visos-prasymus-pateikusios-ir-reikalavimus-atitinkancios-jaunos-seimos-gaus-valstybes-subsidija-pirmajam-bustui-regionuose-isigyti-i1j/ .

## Klaidų, kurių nevalia kartoti, vartai

**515 nėra procentas.** Norint apskaičiuoti jaunų šeimų paramos aprėptį, reikia **vienos tos pačios programos, laikotarpio ir teisinio tinkamumo** gavėjų ir galinčių kreiptis ar norinčių gauti paskatą šeimų skaičiaus. Šiuo metu šio vardiklio nėra.

**Jokiu būdu neskaičiuoti `515 / 1700`.** 515 – **per 2025 m. išmokėtos subsidijos**, o 1 700 – **ankstesnių (nuo 2023 m.) prašymų likutis 2025 m. pradžioje** ir iki rugsėjo nagrinėtų prašymų kiekis. Dalies šeimų pagal teisines / kreditavimo / kitų metų taisykles kelias nuo paraiškos iki išmokos vėluoja. Tai nesutampantys srautai.

**2026 m. dešimties minučių atvejis – kita paramos schema!** 2026 m. gegužės 19 d. nutrūko **valstybės iš dalies kompensuojamo būsto kredito ir (ar) subsidijos (B) kvietimas**, kur galėjo dalyvauti ne vien jaunos šeimos; 2025 m. **515 priklauso specifinei regioninei jaunų šeimų schemai (A)**. 2026 m. gegužės 10 min. **nėra įrodymas, kad 2025 m. regioninei jaunų šeimų programai paraiškos baigėsi per 10 min.** 2026-09 regioninė A programa savo ruožtu turi beveik 800 prašymų (ne išmokų) ir ministerijos deklaruotą pakankamą biudžetą visiems tinkamiems.

**Nei prognozės, nei registruoti prašymai nėra išmokėjimas.** 2026 m. gegužės pradinė preliminari „daugiau kaip 300“ prognozė buvo pateikta **prieš** papildomai skiriant 5 mln. €; jokio galutinio sėkmės procento iš šių skaičių apskaičiuoti negalima. Gegužės kvietimas buvo nutrauktas prieš 9:10; dalis norinčiųjų fiziškai nespėjo pateikti, todėl **beveik 1 000 paraiškų nėra visas paklausos vardiklis**.

### Ką iš tiesų galima teigti viešai

> SADM 2025 m. duomenimis, regioninės finansinės paskatos pirmam būstui išmokėtos 515 jaunų šeimų. Tačiau vien šis skaičius neparodo, kiek šeimų paramos reikėjo. 2025 m. pradžioje ankstesnių prašymų eilėje laukė apie 1 700 šeimų, o 2026 m. atskirai administruojamos platesnės būsto paramos kvietimas buvo sustabdytas vos po 10 minučių, registravus beveik 1 000 prašymų. Tai rodo didelį susidomėjimą **būsto paramos priemonėmis**, tačiau **neleidžia apskaičiuoti**, kokią visų jaunų šeimų dalį parama pasiekė, ir neįrodo galutinio reikalavimus atitinkančių šeimų poreikio.

Pagrindinis publikuotinas skirtumas: **paramą gavusių šeimų skaičius, prašymų skaičius, realus finansavimo limitas ir reikalavimus atitinkančių šeimų skaičius – keturi skirtingi matavimo vienetai.** Jei sumaišome juos, nepamatuojame tikros politikos aprėpties.

**Tolesnė analizė nulinio biudžeto sąlygomis:** SADM viešų ataskaitų ir atvirų SPIS / LDP agregatų paieška dėl tos pačios A arba B schemos **pateiktų / atmestų / patenkintų / išmokėtų** prašymų skaičiaus pagal apskritį, laikotarpį, eilės likutį. Jei nemokamo pjūvio nėra, pažymėti `DUOMENŲ NĖRA`, o ne užsakyti mokamą informaciją ar kelti procentą iš skirtingų duomenų.

**2026 m. įvykiai pateikiami tik kaip atskiras 2025 m. retrospektyvos kontekstas, ne 2025 m. statistikos pakeitimas.**
