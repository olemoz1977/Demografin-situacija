# T0 – neprarasti jau išnagrinėtos informacijos (privaloma visam projektui)

**Galioja visoms tyrimo kryptims ir publikacijoms, nuo 2026-10-10.** Tai metodikos ir darbų tęstinumo taisyklė, ne atskiras turinio modulis.

> **JOKS patikrintas tyrimo atradimas negali likti tik pokalbyje. JOKS publikavimas negali tyliai pašalinti, pervadinti ar nustelbti ankstesnio darbo.**

## Kanoninis registras

- **Vienintelis visų išvadų sąrašas:** `data/research-findings-register.json`; kiekviena išvada turi nekeičiamą `id`, tikslų teiginį / rodiklį, laikotarpį, statistinę populiaciją, šaltinį, įrodymų failus, analizės būseną, numatytą svetainės modulį, publikavimo vietą ir ribojimus.
- Patikrintą Eurostat 2024–2025 m. faktą dėl Lietuvos **vieno suaugusiojo be išlaikomų vaikų namų ūkių** fiksuoti `data/households-single-adult-eurostat-2024-2025.json`; jis yra **55,7 % 2025 m. (p)** ir **50,5 % 2024 m. (p)**, 2025 m. aukščiausia ES dalis, **ne žmonių, vienišų piliečių ar jaunų šeimų procentas**. Šio fakto iki šiol nėra svetainėje: `VERIFIED_UNPUBLISHED`, būsimas kontekstinis įrašas `housing`, susietinas ir su `family`/`population` moduliais. Jokio faktinės publikacijos statuso, kol nėra naršyklėje patikrinto puslapio.
- **8 moduliai:** `overview`, `fertility`, `population`, `migration`, `family`, `housing`, `future`, `methods`. Visi turi inventorizacijos būseną. Pradinė atgalinė inventorizacija **dar nėra pilna** – įrašai `PENDING` to neslepia.

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
