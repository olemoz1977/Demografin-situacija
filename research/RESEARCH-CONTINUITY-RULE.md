# T0 – neprarasti jau išnagrinėtos informacijos (privaloma visam projektui)

**Galioja visoms tyrimo kryptims ir publikacijoms, nuo 2026-10-10.** Tai metodikos ir darbų tęstinumo taisyklė, ne atskiras turinio modulis.

> **JOKS patikrintas tyrimo atradimas negali likti tik pokalbyje. JOKS publikavimas negali tyliai pašalinti, pervadinti ar nustelbti ankstesnio darbo.**

## Būsto tyrimo tikslinės populiacijos taisyklė

**„Jauna šeima“ = teisinė, o ne savavališka amžiaus kohorta.** Regioninės pirmojo būsto paskatos analizėje remiamės SADM ir taikomo įstatymo apibrėžtimi: sutuoktiniai ar registruoti partneriai, kurių kiekvienas yra iki 36 metų, arba vienas iki 36 metų vaiką (-us) auginantis tėvas ar motina. Šaltinis: https://socmin.lrv.lt/lt/veiklos-sritys/seima-ir-vaikai/finansine-paskata-pirmaji-busta-isigyjancioms-jaunoms-seimoms/. Ankstesnėms 2019–2025 m. išmokoms taikoma konkrečių metų teisės redakcija, o ne automatiškai 2026 m. sąlygos.

**Atsisakytas senasis modelis:** du dirbantys asmenys iki 30 metų, nuomojantys vieno kambario butą, nėra teisiškai apibrėžtų jaunų šeimų populiacija. Šio modelio išvados ir iš jo išvesti pajamų / m² rodikliai gali likti istoriniame mokslinių bandymų archyve, bet **negali būti minimi viešame Būsto pasakojime kaip veikianti metodika ar jaunos šeimos įperkamumo rodiklis**. Vien pakeisti „30“ į „36“ draudžiama: reikia iš naujo pagrįsti šeimos tipą, pajamų ir išlaidų populiaciją, laikotarpį, teritoriją ir palyginamą būsto krepšelį. Jei neįmanoma – rodiklio nepublikuojame. T0 registre paliekami nepublikuoti istoriniai ID su `legacy_scope_guard`.

## Kanoninis registras

- **Vienintelis visų išvadų sąrašas:** `data/research-findings-register.json`; kiekviena išvada turi nekeičiamą `id`, tikslų teiginį / rodiklį, laikotarpį, statistinę populiaciją, šaltinį, įrodymų failus, analizės būseną, numatytą svetainės modulį, publikavimo vietą ir ribojimus.
- **Eurostat `ilc_lvph02` kanoninė išvada `EU-HH-2025-01`:** `data/households-single-adult-eurostat-2024-2025.json` fiksuoja **55,7 % 2025 m. (p)** ir **50,5 % 2024 m. (p)** Lietuvos vieno suaugusiojo be išlaikomų vaikų **privačių namų ūkių**, 2025 m. didžiausią tokią dalį ES. Tai **ne gyventojų, vienišų žmonių, nesusituokusių asmenų, būsto savininkų ar jaunų šeimų procentas**. Po sujungto **PR #4** teiginys įtrauktas į `main` svetainės kodą (`housing-affordability.js`, kontekstas `family-hypothesis.js`, `migration-sex.js`), todėl būsena yra `PUBLISHED_CONTEXT`, o ne `VERIFIED_UNPUBLISHED`. **PR #7 sujungtas ir paskelbtas 2026-10-10:** pagrindinis paaiškinimas dabar yra `population`, o `housing`, `family`, `migration` turi trumpą kontekstą ir nuorodas. Anksčiau po PR #4 pirminis blokas buvo Būste. GitHub Pages po PR #7: https://github.com/olemoz1977/Demografin-situacija/actions/runs/38026170535. Nepriklausomas tiesioginės viešos svetainės Chromium naršyklės auditas (kompiuteris + telefonas, visos 27 paskelbtos išvados, visi 8 moduliai ir „Visas tyrimas“) – **PASS**: https://github.com/olemoz1977/Demografin-situacija/actions/runs/38026170701. Ši patikra patvirtina matomumą ir navigaciją, bet nėra visų pirminių statistinių šaltinių pakartotinis metodologinis auditas.
- **8 moduliai:** `overview`, `fertility`, `population`, `migration`, `family`, `housing`, `future`, `methods`. PR #6 atgalinė inventorizacija suteikia visiems moduliams būseną `INVENTORIED_WITH_GAPS` ir išsaugo 39 užregistruotas išvadas; **tai nereiškia, kad visas istorinis tyrimas jau atkurtas; gyvai patikrintos tik 27 registre pažymėtos skelbiamos išvados**. Naujo patikrinto atradimo registruoti iš anksto negali vien automatizuoti testai.

## Keturi privalomi vartai po kiekvienos sesijos ir prieš kiekvieną leidimą

1. **ATRADIMAS → REGISTRAS.** Kai tyrime patikrinamas naujas skaičius, apibrėžimas, metodinė išvada ar kliūtis, prieš kitą užduotį ją išsaugoti GitHub registre ir šaltinio faile. Nepasikliauti ChatGPT pokalbiu / atmintimi kaip ilgalaike duomenų saugykla. Jei tai tik hipotezė, `RESEARCH_BLOCKED` ar `MODELLED_UNPUBLISHED`, **ne** `PUBLISHED_FACT`.
2. **INVENTORIUS → KRYPTIES APRĖPTIS.** Prieš bet kokį UI keitimą įvardyti, kurie registruoti įrašai turi būti matomi konkrečiame modulyje, kurie lieka tyrime ir **kodėl**. Jeigu naujai publikuojama tik paramos dalis, svetainėje negalima sukurti įspūdžio, kad tai visa būsto analizė; pagrindinės kortelės ir modulių aprašai atnaujinami vienu pakeitimu.
3. **PUBLISH DIFF → JOKIO TYLIOJO PRARADIMO.** Įtraukimo/išbraukimo matrica: **buvo → lieka / perkelta į kitą modulį / pažymėta kaip nepatvirtinta / pakeista naujais duomenimis**. Naikinti registruotą ID draudžiama; paneigtą išvadą palikti kaip `SUPERSEDED` su aiškiu šaltiniu, pakeitimo priežastimi ir naujos išvados ID. Neatsekami įrašai yra **STOP**, kol sutvarkyta.
4. **QA → GYVA SVETAINĖ.** Tikrinti ne vien testų skaičių, bet ir **visas registruotas `PUBLISHED_*` išvadas**, jų fragmento buvimą tinkamame modulyje ir pradžios („Apžvalgos“) navigaciją; telefone ir kompiuteryje. Jei kas dingsta – **nepublikuoti**. Pabaigus darbą patikrinti actual GitHub Pages deploy ir pateikti tikslias „kur rasti“ nuorodas.

## Techninė kontrolė

- `tests/test_research_registry.py` tikrina struktūrą, `PUBLISHED_*` rodymo žymes, šaltinių / įrodymų buvimą, žymių unikalumą ir modulių inventorių.
- `scripts/check_registry_continuity.py` palygina ankstesnį `main` registrą su siūlomu; **prarastas ID = FAIL**. Netaisyklingi `PUBLISHED` statusai = FAIL. Pirmam diegimui istorinis pagrindas neegzistavo, todėl neapsimetama, kad senos išvados buvo automatiškai apsaugotos.
- `.github/workflows/research-continuity.yml` paleidžia šiuos patikrinimus PR ir publikuojant į `main`.
- Neautomatizuojami dalykai, kuriems **būtina žmogaus atsakomybė**: naujos įžvalgos įregistravimas iš pokalbio ir jos metodinis palyginamumas; CI pats iš pokalbio neatras užmiršto fakto.

## Projekto ribos išlieka

- Tik nemokami duomenys, **biudžetas 0 EUR**. Jokių mokamų RC duomenų, prenumeratų ar užsakymų.
- Be aiškaus patvirtinimo nesiųsti išorinių laiškų / užklausų.
- Oficialūs duomenys, modeliuoti rezultatai, hipotezės ir dar nepatikrinti duomenys turi skirtingas žymas.
- 2025 m. faktams nepritaikyti 2026 m. įsigaliojusių paskolos / paramos taisyklių.
- Nevykdyti nei tariamo 10 apskričių vienodų butų reitingo, nei tariamai faktiško m² per metus skaičiavimo, kol trūksta validžių duomenų.

**Svarbiausia procedūrinė išvada:** publikuoti galima etapais, **prarasti jau patikrinto darbo – niekada**.
