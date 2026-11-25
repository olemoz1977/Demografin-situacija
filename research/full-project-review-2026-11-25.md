# Viso projekto aiškumo ir naudojimo peržiūra · 2026-11-25

Bazė: `0fb96d6`. Peržiūrėti visi 8 moduliai, bendras tyrimo puslapis, turinio generavimo failai, duomenų rinkiniai ir 49 išvadų registras (38 paskelbtos). Tai redakcinė, loginė ir naudojimo peržiūra, ne naujas visų pirminių statistinių šaltinių auditas.

## 1. Rastos vietos ir numatyti pakeitimai

Šis sąrašas sudarytas prieš keičiant svetainės turinį. Įgyvendinimo ir patikrų rezultatai įrašomi atskirai.

| ID | Vieta | Problema | Numatyta korekcija |
|---|---|---|---|
| R01 | Apžvalga | Įžanga kartoja kortelių turinį ir darbų ribas; svarbiausios išvados nustumtos žemyn. | Sutrumpinti įžangą ir tyrimo klausimo paaiškinimą; palikti penkias išvadų korteles. |
| R02 | Gimstamumas ir Migracija | TFR, natūrali kaita ir neto migracija vartojami anksčiau nei paprastai paaiškinami. | Trumpus apibrėžimus pateikti prie pirmo pagrindinio grafiko ar lentelės. |
| R03 | Gimstamumas | 10 % / 90 % turi aiškų vardiklį, tačiau skaitytojas nemato paties 2019–2024 m. gimimų skaičiaus pokyčio. | Pridėti jau patikrintos 20–44 m. grupės skaičius: 24 307 → 18 758, sumažėjimas 5 549; susieti su esamu registro ID. |
| R04 | Gimstamumas | Apskričių antraštėje naudojama 1,30 riba nėra paaiškinta, nors tikrasis maksimumas 1,21. | Antraštėje rodyti faktinį 0,96–1,21 intervalą; ankstesnį faktą apie mažiau nei 1,30 išsaugoti paaiškinime. |
| R05 | Struktūra | Ilgame modulyje lyčių santykis, kartos ir trys skirtingi namų ūkių vardikliai sunkiai atskiriami. | Pridėti turinio nuorodas pagal klausimus ir trumpą skirtingų amžiaus pjūvių paaiškinimą. |
| R06 | Struktūra | Piramidės procentai gali būti perskaityti kaip visų gyventojų dalys. | Ties grafiku nurodyti, kad kiekvienos lyties pasiskirstymas skaičiuojamas atskirai; vyrų minusas tik grafinis. |
| R07 | Struktūra | Kartos balanse likutinis apskaitos skirtumas ir kalendorinių metų / sausio 1 d. santykis sunkiai suprantami. | Lentelėje pridėti bendro pokyčio eilutę, o likutį paprastai apibrėžti; išlaikyti visas ribas. |
| R08 | Migracija | Kintamo amžiaus intervalo srautai lengvai suplakami su tų pačių gimimo metų moterų kartomis. | Prie migracijos paaiškinti, kad kasmet 25–44 m. intervale gali būti kiti žmonės, o kartų balansas nagrinėjamas atskirai. |
| R09 | Šeimos aplinka | Gimimų eiliškumo grafikas turi pilną 2005–2012 m. seriją, bet nėra skaitinės išvados. | Iš esamo rinkinio parodyti antrų ir trečių gimimų dalių pokytį; pažymėti, kad tai dalys, ne vaikų skaičiaus ar reformos poveikio įvertis. |
| R10 | Šeimos aplinka | Nepavykus įkelti istorijos lieka žinutė „laukiama“; linijos konfigūracija jungia trūkstamas reikšmes. | Pateikti aiškią atsarginę būseną, atskirti turimų metų taškus ir nustatyti spanGaps:false. |
| R11 | Šeimos aplinka | Įrodymų stiprumo žodžiai atrodo kaip formalios sisteminės apžvalgos rezultatas. | Aiškiai įvardyti autoriaus kokybinį vertinimą ir skirtingą ketinimų, sąryšio bei priežastinio ryšio lygmenį. |
| R12 | Šeimos aplinka | Darželių skaičiai rodomi šalia skirtingų metų pavyzdžių, o antraštė per ilga. | Sutrumpinti antraštę ir Klaipėdos KPI aiškiai pažymėti 2024 m.; išlaikyti Kauno nesutampančių skaičių paaiškinimą. |
| R13 | Būstas | „Būsto kainų palyginimo dar nerodome“ ir „Nuoma bus pridedama“ prieštarauja jau pateiktiems miestų duomenims. | Patikslinti, kad trūksta standartizuoto visų 10 apskričių palyginimo, o miestų rinkos faktai jau pateikti. |
| R14 | Būstas | Pakartotinė projekto taisyklė ir dalis perspėjimų kartoja paaiškintas ribas. | Sutrumpinti pasikartojimus ir palikti konkrečią trūkstamų duomenų santrauką; visus paramos programų skaičius išsaugoti. |
| R15 | Ateitis | 50,3 % ir pensininkų / užimtųjų 0,8 santykiai gali būti laikomi tuo pačiu rodikliu; skirtingi teksto sluoksniai skirtingai aprašo mokesčius. | Paprastai paaiškinti abiejų santykių vardiklius ir suvienodinti atsargią automatizuotų įmonių mokesčių formuluotę. |
| R16 | Metodika ir šaltiniai | Trūksta greito terminų žodyno ir nuorodų į kiekvienos temos šaltinius. | Pridėti EU-SILC / EU-LFS, namų ūkio, procentinio punkto, projekcijos paaiškinimus ir temines šaltinių nuorodas. |
| R17 | Navigacija ir visas tyrimas | Dvi maršrutų lentelės neapima naujų fragmentų; bendros išvados atsiduria prieš Ateitį; statinė antraštės data sena. | Suderinti tiesioginius fragmentus ir aktyvų meniu, bendrą sintezę rodyti po visų turinio modulių, pataisyti statinę datą. |
| R18 | Grafikai ir prieinamumas | Tikslios grafikų reikšmės dažnai prieinamos tik užvedant pelę; canvas neturi teksto alternatyvos. | Prie kiekvieno užkrauto grafiko pridėti išskleidžiamą reikšmių lentelę su pavadinimu, klaviatūros prieiga ir horizontaliu slinkimu lentelės viduje. |
| R19 | Įkėlimo patikimumas | Nepavykus užkrauti papildomo scenarijaus turinys gali tyliai dingti. | Parodyti aiškų nepavykusio įkėlimo pranešimą ir puslapio atnaujinimo veiksmą; grafiko duomenų nebuvimo nepateikti kaip nulio. |
| R20 | Šeimos politika | Kalbama apie konkretų „2026 m. paketą“, nors jis šiame skyriuje nei apibrėžtas, nei nagrinėjamas. | Stebėsenos rekomendacijas formuluoti šeimos politikos priemonėms apskritai, nepriskiriant neaprašyto paketo. |
| R21 | Viešas tekstas | Liko darbo eigos sakinių apie pašalintą WHO grafiką ir techninį duomenų užkrovimą. | Palikti skaitytojui reikalingą dabartinio rodiklio aprėptį; vidinės darbo istorijos neperpasakoti. |

## 2. Išvadų išsaugojimo matrica

Visi registruoti ID ir statusai lieka. Tik esamų išvadų aiškesnė išraiška ir iš tų pačių duomenų rinkinių tiesiogiai patikrinami papildymai.

| Paskelbtas ID | Buvo | Lieka |
|---|---|---|
| EU-HH-2025-01 | population | Tas pats modulis ir statusas |
| HOUSING-CITY-SALES-2025-01 | housing | Tas pats modulis ir statusas |
| HOUSING-RENT-SALE-2025-12-01 | housing | Tas pats modulis ir statusas |
| HOUSING-LOAN-2025-01 | housing | Tas pats modulis ir statusas |
| HOUSING-SUBSIDY-2019-2025-01 | housing | Tas pats modulis ir statusas |
| HOUSING-QUEUE-2025-01 | housing | Tas pats modulis ir statusas |
| HOUSING-SUBSIDY-SCHEMES-2025-01 | housing | Tas pats modulis ir statusas |
| OVERVIEW-LATEST-2025-01 | overview | Tas pats modulis ir statusas |
| OVERVIEW-TFR-NOWCAST-2025-01 | overview | Tas pats modulis ir statusas |
| FERTILITY-TFR-EU-2024-01 | fertility | Tas pats modulis ir statusas |
| FERTILITY-COUNTIES-2024-01 | fertility | Tas pats modulis ir statusas |
| FERTILITY-FIRST-BIRTH-AGE-2024-01 | fertility | Tas pats modulis ir statusas |
| POPULATION-SEX-AGE-2025-01 | population | Tas pats modulis ir statusas |
| POPULATION-REPRO-SEX-2025-01 | population | Tas pats modulis ir statusas |
| POPULATION-BIRTH-COHORTS-2025-01 | population | Tas pats modulis ir statusas |
| MIGRATION-FLOW-2025-01 | migration | Tas pats modulis ir statusas |
| MIGRATION-FOREIGN-CITIZENS-2025-01 | migration | Tas pats modulis ir statusas |
| MIGRATION-SEX-AGE-01 | migration | Tas pats modulis ir statusas |
| FAMILY-MARRIAGES-2024-01 | family | Tas pats modulis ir statusas |
| FAMILY-LEAVE-POLICY-2007-2012-01 | family | Tas pats modulis ir statusas |
| FAMILY-LEAVE-FRE-01 | family | Tas pats modulis ir statusas |
| FAMILY-CHILDCARE-ACCESS-2025-01 | family | Tas pats modulis ir statusas |
| FAMILY-DIGITAL-HYPOTHESES-01 | family | Tas pats modulis ir statusas |
| FAMILY-IDEALIZED-ROMANCE-2025-01 | family | Tas pats modulis ir statusas |
| HOUSING-DEMAND-SCHEMES-2026-01 | housing | Tas pats modulis ir statusas |
| FUTURE-AGEING-REPORT-2040-01 | future | Tas pats modulis ir statusas |
| FUTURE-ADAPTATION-SCENARIOS-01 | future | Tas pats modulis ir statusas |
| METHODS-STATUSES-2025-01 | methods | Tas pats modulis ir statusas |
| METHODS-DENOMINATORS-01 | methods | Tas pats modulis ir statusas |
| EU-AROPE-2025-01 | population | Tas pats modulis ir statusas |
| FERTILITY-DEVELOPMENT-PARADOX-2026-01 | fertility | Tas pats modulis ir statusas |
| EU-HH-LFS-2025-01 | population | Tas pats modulis ir statusas |
| FAMILY-HOUSEHOLDS-LFS-2025-01 | family | Tas pats modulis ir statusas |
| EU-HH-SILC-AGE-2025-01 | population | Tas pats modulis ir statusas |
| EU-HH-LFS-AGE-SEX-2025-01 | population | Tas pats modulis ir statusas |
| EU-HH-LFS-TREND-QA-2025-01 | population | Tas pats modulis ir statusas |
| FERTILITY-COHORT-SIZE-2024-01 | fertility | Tas pats modulis ir statusas |
| POPULATION-COHORT-BALANCE-2025-01 | population | Tas pats modulis ir statusas |

## 3. Įgyvendinimas

Visi R01–R21 pakeitimai įgyvendinti ir paskelbti per PR #22. Patikros baigtos sėkmingai. Priežastinių išvadų ar naujo tyrimo statuso šia peržiūra nesuteikiame.

## 4. Patikra

Numatyta: registro ir istorinio turinio testai, tęstinumas, visi 38 paskelbti rezultatai naršyklėje kompiuteryje ir telefone, 320 px ekranas, fragmentų navigacija, grafikų lentelės ir klaidos būsena. Po publikavimo būtina pakartoti patikrą gyvoje svetainėje.

## Skaitinių paaiškinimų atsekamumas

- R03: `research/raw/cohort-size-20261125/validated-results.json`, eilutė base=2019: b0=24 307, b1=18 758. Skirtumas 5 549. Įrašyta esamame `FERTILITY-COHORT-SIZE-2024-01`; naujas tyrimo ID nekuriamas.
- R09: `data/family-policy-history.json`, 2005 ir 2012 m.: antrų gimimų dalis 34,1 ir 37,5; trečių 10,3 ir 11,0. Skirtumai +3,4 ir +0,7 procentinio punkto. Tai jau buvusio grafiko duomenų paaiškinimas esamame `FAMILY-LEAVE-POLICY-2007-2012-01`, ne naujas priežastinis tyrimas.
- Naujos grafikų lentelės skaito tas pačias Chart.js reikšmes kaip grafikai. Pirminių duomenų jos neperskaičiuoja; trūkstamas reikšmes žymi brūkšniu. Vyrų piramidės minusas tik braižymo kryptis, todėl lentelėje rodomas teigiamas procentas.
- ID ir publikavimo statusai nepakeisti. Nepublikuotų istorinių modelių ir užblokuotų klausimų skelbiamos išvados nepakeičia.

## Papildymas po pirmos naršyklės patikros

R17 patikra aptiko tikrą klaidą: vien `#` pakeitimas tame pačiame dokumente nepaleisdavo maršruto pasirinkimo iš naujo, todėl kito modulio fragmentas likdavo paslėptas. Pridėtas `hashchange` valdymas; nežinomas ar netaisyklingas fragmentas nesukelia JavaScript klaidos. „Viso tyrimo“ skyriai sudėlioti pagal temų eilę, ne pagal skirtingų scenarijų užkrovimo laiką.

## Įgyvendinimo žurnalas

| ID | Kur įgyvendinta | Rezultatas |
|---|---|---|
| R01 | research-nav.js | Įgyvendinta |
| R02 | index.html | Įgyvendinta |
| R03 | index.html ir esamas registro įrašas | Įgyvendinta |
| R04 | index.html | Įgyvendinta |
| R05 | research-nav.js | Įgyvendinta |
| R06 | app-base.js | Įgyvendinta |
| R07 | app-base.js | Įgyvendinta |
| R08 | migration-sex.js | Įgyvendinta |
| R09 | policy-history.js ir esamas registro įrašas | Įgyvendinta |
| R10 | policy-history.js | Įgyvendinta |
| R11 | family-hypothesis.js | Įgyvendinta |
| R12 | infrastructure.js | Įgyvendinta |
| R13 | housing-affordability.js | Įgyvendinta |
| R14 | housing-affordability.js | Įgyvendinta |
| R15 | future.js, editorial-copy.js | Įgyvendinta |
| R16 | index.html | Įgyvendinta |
| R17 | research-nav.js, nav-finalize.js, index.html | Įgyvendinta |
| R18 | reader-tools.js, research-nav.css | Įgyvendinta |
| R19 | app.js, sex-history.js, migration-sex.js | Įgyvendinta |
| R20 | policy-history.js, editorial-copy.js | Įgyvendinta |
| R21 | index.html, policy-history.js | Įgyvendinta |

## Galutinės patikros

- [PR #22](https://github.com/olemoz1977/Demografin-situacija/pull/22) sujungtas; visi 21 sąrašo punktai paskelbti.
- 20 registro, būsto ir istorinio turinio testų: PASS. Tęstinumo patikra: 49 išvados, 8 moduliai, neprarastas nė vienas ID ar publikavimo statusas.
- [Naršyklės patikra prieš sujungimą](https://github.com/olemoz1977/Demografin-situacija/actions/runs/45676240551): PASS.
- [Pages diegimas](https://github.com/olemoz1977/Demografin-situacija/actions/runs/45676726098): success.
- [Viešos svetainės patikra](https://github.com/olemoz1977/Demografin-situacija/actions/runs/45676727579): PASS, visos 38 paskelbtos išvados kompiuteryje ir telefone. Papildomai 320 px ekrane Gimstamumas, Struktūra ir Šeimos aplinka (22 paskelbti įrašai).
- Visuose patikrintuose moduliuose: 0 px horizontalaus puslapio perpildymo; duomenų lentelės prireikus slenkamos savo viduje.
- Papildomai patikrintos grafikų tekstinės alternatyvos, lentelės atvėrimas klaviatūra, tiesioginiai fragmentai, perėjimas tarp fragmentų, viso tyrimo temų tvarka ir kontroliuojamo įkėlimo sutrikimo pranešimas.
- Gyvoje naršyklėje vizualiai peržiūrėta Apžvalga, Struktūros temų nuorodos ir piramidės reikšmių lentelė; perskaityta nauja gimimų eiliškumo išvada.
- Du nauji skaitiniai paaiškinimai sutikrinti su esamais šaltinių failais. Visų išorinių pirminių statistinių šaltinių pakartotinis faktinis auditas nebuvo šios redakcijos dalis.

Registro patikros korekcija: „paskutinės naršyklės patikros“ laukui testas buvo pririštas prie 2026-10-10 vieno vykdymo ID. Leidžiama nauja patikros nuoroda ir tikrinama, kad ji sutaptų su baigtos peržiūros įrašu; istorinio inventoriaus `INVENTORIED_WITH_GAPS` reikalavimas išsaugotas.
