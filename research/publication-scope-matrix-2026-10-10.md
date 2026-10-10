# T0: publikavimo aprėptis prieš demografinio pasakojimo taisymą

**Būsena:** PR #6 ir PR #7 sujungti į `main` 2026-10-10; svetainė įdiegta per GitHub Pages. **Gyvos svetainės Chromium naršyklės QA – PASS 27/27 kompiuteryje ir 27/27 telefone.** Įrodymas: https://github.com/olemoz1977/Demografin-situacija/actions/runs/38026170701.

**Vienintelis kanoninis sąrašas:** `data/research-findings-register.json` – ši matrica nėra atskiras išvadų registras. Ji atvaizduoja kiekvieną esamą `PUBLISHED_*` ID, faktinę `main` vietą ir matomumo patvirtinimą po publikavimo.

## Buvę → įgyvendinti pakeitimai

- **EU-HH-2025-01:** pirminė ilgoji versija Būste; Šeimoje ir Migracijoje kartojamas aiškinimas → **pagrindinis blokas Gyventojų struktūroje** (`app-base.js`, `#populationHouseholdStructure`), trumpos nuorodos trijuose susijusiuose moduliuose. 2024/2025 preliminariosios žymos bei šaltiniai lieka; nepateikiama kaip gyventojų ar vienatvės dalis.
- **Likę 26 `PUBLISHED_*` ID:** išvadų šaltinio teiginiai ir paskelbimo vieta pagal šį pakeitimą nekeičiami. Būsto VDA kainos, nuomos/pirkimo intervalai, 2025 m. paskolos metodika ir abi paramos programos lieka. Būsena tikrinama pagal tikslius šaltinio kodo žymeklius, bet tai nėra vizualus svetainės QA.
- **Apžvalgos teksto redakcija:** šešios analizės kryptys ir Metodika išlaikomos; įvadinis pasakojimas praplėstas be naujo priežastinio teiginio.
- **Visos nepublikuotos išvados:** lieka registre ir atitinkamose tyrimo šakose, be publikavimo ir skaičių pervadinimo.

## Bandomosios naršyklės auditas · 2026-10-10

**PASS 27/27 kompiuteryje ir PASS 27/27 telefone.** Testas `tests/publication-visibility-qa.cjs` realiai atveria 8 teminius puslapius ir kiekvieno registruoto `PUBLISHED_*` ID atitinkamame modulyje tikrina DOM matomumą bei naudotojui skaitomą teiginį, ne tik failo žymeklį. Papildomai patikrinama navigacija, `?view=all` archyvas, horizontalus perpildymas ir netinkamai matomi svetimų temų skyriai.

- GitHub Actions naršyklės QA (vietinis PR peržiūros serveris, Chromium desktop/mobile): https://github.com/olemoz1977/Demografin-situacija/actions/runs/38024928386
- Tyrimo registro tęstinumo kontrolė: https://github.com/olemoz1977/Demografin-situacija/actions/runs/38024928432
- Audito metu pataisytos reikšmingos neatitiktys: `METHODS-STATUSES-2025-01` metodikos paaiškinimas, dinamiškai kuriamų svetimų temų rodymo momentas ir trijų registruotų išvadų nuorodos į tikrąjį rodomą turinį (`POPULATION-REPRO-SEX-2025-01`, `FAMILY-LEAVE-POLICY-2007-2012-01`, `FAMILY-DIGITAL-HYPOTHESES-01`).

**Riba:** tai patvirtina PR #7 bandomosios versijos matomumą, tačiau `main` nėra pakeistas, todėl toliau esančios **gyvos svetainės QA** žymos teisingai lieka `PENDING`. Matomumo patikra taip pat nėra naujas nepriklausomas kiekvieno pirminio statistinio šaltinio metodologinis auditas.

## Paskelbtų `PUBLISHED_*` išvadų matrica

| ID | Registruotas modulis | Būsena | Kodo failas | Tikrinamas žymeklis | Gyvas naršyklės QA |
|---|---|---|---|---|---|
| `EU-HH-2025-01` | `population` | `PUBLISHED_CONTEXT` | `app-base.js` | `id="populationHouseholdStructure"` | **PASS** |
| `HOUSING-CITY-SALES-2025-01` | `housing` | `PUBLISHED_CONTEXT` | `housing-affordability.js` | `VDA: daugiabučių butų pardavimo kainos šešiuose miestuose` | **PASS** |
| `HOUSING-RENT-SALE-2025-12-01` | `housing` | `PUBLISHED_CONTEXT` | `housing-affordability.js` | `2025 m. gruodžio nuomos ir pirkimo segmentai` | **PASS** |
| `HOUSING-LOAN-2025-01` | `housing` | `PUBLISHED_METHOD_ONLY` | `housing-affordability.js` | `2025 m. istoriniame scenarijuje taikomas įprastas` | **PASS** |
| `HOUSING-SUBSIDY-2019-2025-01` | `housing` | `PUBLISHED_FACT` | `housing-affordability.js` | `Kaip keitėsi jaunų šeimų regioninės paskatos mastas` | **PASS** |
| `HOUSING-QUEUE-2025-01` | `housing` | `PUBLISHED_FACT` | `housing-affordability.js` | `1 700 ankstesnių metų prašymų` | **PASS** |
| `HOUSING-SUBSIDY-SCHEMES-2025-01` | `housing` | `PUBLISHED_FACT` | `housing-affordability.js` | `1 039 pagrindinės paramos gavėjai` | **PASS** |
| `OVERVIEW-LATEST-2025-01` | `overview` | `PUBLISHED_CONTEXT` | `index.html` | `17 478` | **PASS** |
| `OVERVIEW-TFR-NOWCAST-2025-01` | `overview` | `PUBLISHED_CONTEXT` | `overview-nowcast.js` | `2025P TFR = 1,03` | **PASS** |
| `FERTILITY-TFR-EU-2024-01` | `fertility` | `PUBLISHED_FACT` | `index.html` | `trečias žemiausias Europos Sąjungoje` | **PASS** |
| `FERTILITY-COUNTIES-2024-01` | `fertility` | `PUBLISHED_FACT` | `index.html` | `2024 m. visose 10 Lietuvos apskričių TFR` | **PASS** |
| `FERTILITY-FIRST-BIRTH-AGE-2024-01` | `fertility` | `PUBLISHED_FACT` | `index.html` | `pirmąjį vaiką gimdžiusių moterų vidutinis amžius Lietuvoje – 28,7` | **PASS** |
| `POPULATION-SEX-AGE-2025-01` | `population` | `PUBLISHED_FACT` | `app-base.js` | `20,9 %` | **PASS** |
| `POPULATION-REPRO-SEX-2025-01` | `population` | `PUBLISHED_CONTEXT` | `research-nav.js` | `884 moterys / 1 000 vyrų` | **PASS** |
| `POPULATION-BIRTH-COHORTS-2025-01` | `population` | `PUBLISHED_CONTEXT` | `sex-history.js` | `942–950 mergaičių 1 000 berniukų` | **PASS** |
| `MIGRATION-FLOW-2025-01` | `migration` | `PUBLISHED_FACT` | `index.html` | `44 705` | **PASS** |
| `MIGRATION-FOREIGN-CITIZENS-2025-01` | `migration` | `PUBLISHED_FACT` | `index.html` | `217 067 užsienio piliečiai` | **PASS** |
| `MIGRATION-SEX-AGE-01` | `migration` | `PUBLISHED_CONTEXT` | `migration-sex.js` | `25–44 m. neto tarptautinė migracija pagal lytį` | **PASS** |
| `FAMILY-MARRIAGES-2024-01` | `family` | `PUBLISHED_FACT` | `index.html` | `12 890 santuokų ir 7 127 ištuokos` | **PASS** |
| `FAMILY-LEAVE-POLICY-2007-2012-01` | `family` | `PUBLISHED_CONTEXT` | `policy-history.js` | `2007–2012: labai dosnios vaiko priežiūros išmokos` | **PASS** |
| `FAMILY-LEAVE-FRE-01` | `family` | `PUBLISHED_CONTEXT` | `policy-fre.js` | `22,2 pilno tarifo mėnesio` | **PASS** |
| `FAMILY-CHILDCARE-ACCESS-2025-01` | `family` | `PUBLISHED_CONTEXT` | `infrastructure.js` | `1 656` | **PASS** |
| `FAMILY-DIGITAL-HYPOTHESES-01` | `family` | `PUBLISHED_CONTEXT` | `index.html` | `Skaitmeninio naudojimo kontekstas` | **PASS** |
| `FUTURE-AGEING-REPORT-2040-01` | `future` | `PUBLISHED_CONTEXT` | `future.js` | `2022 m. Lietuvos senatvės priklausomybės rodiklis` | **PASS** |
| `FUTURE-ADAPTATION-SCENARIOS-01` | `future` | `PUBLISHED_CONTEXT` | `future.js` | `Trys Lietuvos scenarijai` | **PASS** |
| `METHODS-STATUSES-2025-01` | `methods` | `PUBLISHED_CONTEXT` | `overview-nowcast.js` | `2025P TFR = 1,03` | **PASS** |
| `METHODS-DENOMINATORS-01` | `methods` | `PUBLISHED_CONTEXT` | `index.html` | `Koreliacija ≠ priežastis` | **PASS** |

**Iš viso:** 27 kode žymėtų publikuotų išvadų, 12 nepublikuotų / modeliuotų / užblokuotų, 39 registre. 

## Priešpublikaciniai STOP kriterijai (praeiti)

1. Susietas PR #6 pirmiau turi būti peržiūrėtas ir įtrauktas be prarastų ID; `main` nekeičiamas vien iš šio juodraščio.
2. Visi registro `PUBLISHED_*` žymekliai turi atitikti realų lankytojui matomą turinį; reikalinga patikra **telefone ir kompiuteryje**, ne vien failo `substring` tikrinimas.
3. Kiekvieno modulio `?view=` navigacija ir trys nuorodos į `?view=population#populationHouseholdStructure` turi veikti; ilgasis rodiklio paaiškinimas turi būti matomas Struktūroje.
4. `EU-HH-2025-01` procentai turi reikšti **privataus namų ūkio, kuriame vienas suaugusysis be išlaikomų vaikų, dalį**, ne asmenų, susituokusių ar būsto savininkų dalį; 2024 ir 2025 m. Lietuvos reikšmės preliminarios.
5. Visų 8 temų ir Apžvalgos turinys neturi dingti; 10 apskričių modelio, kuriam nepakanka duomenų, nepublikuoti.

**Tik po šių patikrų** priimamas atskiras strateginis sprendimas dėl viešo `main` leidimo.

## Paskelbto `main` gyvos svetainės audito rezultatas

- **GitHub Pages deploy – PASS:** https://github.com/olemoz1977/Demografin-situacija/actions/runs/38026170535
- **Gyva naršyklė – PASS:** https://github.com/olemoz1977/Demografin-situacija/actions/runs/38026170701
- Patikrintos 27/27 išvados kiekvienoje iš dviejų ekrano klasių, 8 temų maršrutai, `?view=all` ir jokio horizontalaus perpildymo.
- **12 nepublikuotų / blokuotų / modeliuotų išvadų** saugomos registre, jų mokslinis statusas nepakeltas iki paskelbto fakto.
- Riba: matomas turinys ir navigacija yra patikrinti; **visų istorinių pokalbių rekonstrukcija ir naujas kiekvieno duomenų šaltinio mokslinis auditas – neatlikti**.
