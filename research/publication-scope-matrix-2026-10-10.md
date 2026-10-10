# T0: publikavimo aprėptis prieš demografinio pasakojimo taisymą

**Būsena:** siūlomas pakeitimas tik juodraščio šakoje `audit/demography-narrative-20261010`, kuri remiasi inventorizacijos PR #6. **Ne sujungta į `main`; nepatikrinta naršyklėje gyvai.**

**Vienintelis kanoninis sąrašas:** `data/research-findings-register.json` – ši matrica nėra atskiras išvadų registras. Ji atvaizduoja kiekvieną esamą `PUBLISHED_*` ID, numatytą vietą ir statusą pagal šio juodraščio kodą. Nerodo naršyklinio patvirtinimo.

## Buvę → siūlomi pakeitimai

- **EU-HH-2025-01:** pirminė ilgoji versija Būste; Šeimoje ir Migracijoje kartojamas aiškinimas → **pagrindinis blokas Gyventojų struktūroje** (`app-base.js`, `#populationHouseholdStructure`), trumpos nuorodos trijuose susijusiuose moduliuose. 2024/2025 preliminariosios žymos bei šaltiniai lieka; nepateikiama kaip gyventojų ar vienatvės dalis.
- **Likę 26 `PUBLISHED_*` ID:** išvadų šaltinio teiginiai ir paskelbimo vieta pagal šį pakeitimą nekeičiami. Būsto VDA kainos, nuomos/pirkimo intervalai, 2025 m. paskolos metodika ir abi paramos programos lieka. Būsena tikrinama pagal tikslius šaltinio kodo žymeklius, bet tai nėra vizualus svetainės QA.
- **Apžvalgos teksto redakcija:** šešios analizės kryptys ir Metodika išlaikomos; įvadinis pasakojimas praplėstas be naujo priežastinio teiginio.
- **Visos nepublikuotos išvados:** lieka registre ir atitinkamose tyrimo šakose, be publikavimo ir skaičių pervadinimo.

## Dabartinio juodraščio `PUBLISHED_*` matrica

| ID | Registruotas modulis | Būsena | Kodo failas | Tikrinamas žymeklis | Gyvas naršyklės QA |
|---|---|---|---|---|---|
| `EU-HH-2025-01` | `population` | `PUBLISHED_CONTEXT` | `app-base.js` | `id="populationHouseholdStructure"` | **PENDING** |
| `HOUSING-CITY-SALES-2025-01` | `housing` | `PUBLISHED_CONTEXT` | `housing-affordability.js` | `VDA: daugiabučių butų pardavimo kainos šešiuose miestuose` | **PENDING** |
| `HOUSING-RENT-SALE-2025-12-01` | `housing` | `PUBLISHED_CONTEXT` | `housing-affordability.js` | `2025 m. gruodžio nuomos ir pirkimo segmentai` | **PENDING** |
| `HOUSING-LOAN-2025-01` | `housing` | `PUBLISHED_METHOD_ONLY` | `housing-affordability.js` | `2025 m. istoriniame scenarijuje taikomas įprastas` | **PENDING** |
| `HOUSING-SUBSIDY-2019-2025-01` | `housing` | `PUBLISHED_FACT` | `housing-affordability.js` | `Kaip keitėsi jaunų šeimų regioninės paskatos mastas` | **PENDING** |
| `HOUSING-QUEUE-2025-01` | `housing` | `PUBLISHED_FACT` | `housing-affordability.js` | `1 700 ankstesnių metų prašymų` | **PENDING** |
| `HOUSING-SUBSIDY-SCHEMES-2025-01` | `housing` | `PUBLISHED_FACT` | `housing-affordability.js` | `1 039 pagrindinės paramos gavėjai` | **PENDING** |
| `OVERVIEW-LATEST-2025-01` | `overview` | `PUBLISHED_CONTEXT` | `index.html` | `17 478` | **PENDING** |
| `OVERVIEW-TFR-NOWCAST-2025-01` | `overview` | `PUBLISHED_CONTEXT` | `overview-nowcast.js` | `2025P TFR = 1,03` | **PENDING** |
| `FERTILITY-TFR-EU-2024-01` | `fertility` | `PUBLISHED_FACT` | `index.html` | `trečias žemiausias Europos Sąjungoje` | **PENDING** |
| `FERTILITY-COUNTIES-2024-01` | `fertility` | `PUBLISHED_FACT` | `index.html` | `2024 m. visose 10 Lietuvos apskričių TFR` | **PENDING** |
| `FERTILITY-FIRST-BIRTH-AGE-2024-01` | `fertility` | `PUBLISHED_FACT` | `index.html` | `pirmąjį vaiką gimdžiusių moterų vidutinis amžius Lietuvoje – 28,7` | **PENDING** |
| `POPULATION-SEX-AGE-2025-01` | `population` | `PUBLISHED_FACT` | `app-base.js` | `20,9 %` | **PENDING** |
| `POPULATION-REPRO-SEX-2025-01` | `population` | `PUBLISHED_CONTEXT` | `research-nav.js` | `884 moterys / 1 000 vyrų` | **PENDING** |
| `POPULATION-BIRTH-COHORTS-2025-01` | `population` | `PUBLISHED_CONTEXT` | `sex-history.js` | `942–950 mergaičių 1 000 berniukų` | **PENDING** |
| `MIGRATION-FLOW-2025-01` | `migration` | `PUBLISHED_FACT` | `index.html` | `44 705` | **PENDING** |
| `MIGRATION-FOREIGN-CITIZENS-2025-01` | `migration` | `PUBLISHED_FACT` | `index.html` | `217 067 užsienio piliečiai` | **PENDING** |
| `MIGRATION-SEX-AGE-01` | `migration` | `PUBLISHED_CONTEXT` | `migration-sex.js` | `25–44 m. neto tarptautinė migracija pagal lytį` | **PENDING** |
| `FAMILY-MARRIAGES-2024-01` | `family` | `PUBLISHED_FACT` | `index.html` | `12 890 santuokų ir 7 127 ištuokos` | **PENDING** |
| `FAMILY-LEAVE-POLICY-2007-2012-01` | `family` | `PUBLISHED_CONTEXT` | `policy-history.js` | `2007–2012: labai dosnios vaiko priežiūros išmokos` | **PENDING** |
| `FAMILY-LEAVE-FRE-01` | `family` | `PUBLISHED_CONTEXT` | `policy-fre.js` | `22,2 pilno tarifo mėnesio` | **PENDING** |
| `FAMILY-CHILDCARE-ACCESS-2025-01` | `family` | `PUBLISHED_CONTEXT` | `infrastructure.js` | `1 656` | **PENDING** |
| `FAMILY-DIGITAL-HYPOTHESES-01` | `family` | `PUBLISHED_CONTEXT` | `index.html` | `Skaitmeninio naudojimo kontekstas` | **PENDING** |
| `FUTURE-AGEING-REPORT-2040-01` | `future` | `PUBLISHED_CONTEXT` | `future.js` | `2022 m. Lietuvos senatvės priklausomybės rodiklis` | **PENDING** |
| `FUTURE-ADAPTATION-SCENARIOS-01` | `future` | `PUBLISHED_CONTEXT` | `future.js` | `Trys Lietuvos scenarijai` | **PENDING** |
| `METHODS-STATUSES-2025-01` | `methods` | `PUBLISHED_CONTEXT` | `overview-nowcast.js` | `2025P TFR = 1,03` | **PENDING** |
| `METHODS-DENOMINATORS-01` | `methods` | `PUBLISHED_CONTEXT` | `index.html` | `Koreliacija ≠ priežastis` | **PENDING** |

**Iš viso:** 27 kode žymėtų publikuotų išvadų, 12 nepublikuotų / modeliuotų / užblokuotų, 39 registre. 

## Publikavimo STOP kriterijai

1. Susietas PR #6 pirmiau turi būti peržiūrėtas ir įtrauktas be prarastų ID; `main` nekeičiamas vien iš šio juodraščio.
2. Visi registro `PUBLISHED_*` žymekliai turi atitikti realų lankytojui matomą turinį; reikalinga patikra **telefone ir kompiuteryje**, ne vien failo `substring` tikrinimas.
3. Kiekvieno modulio `?view=` navigacija ir trys nuorodos į `?view=population#populationHouseholdStructure` turi veikti; ilgasis rodiklio paaiškinimas turi būti matomas Struktūroje.
4. `EU-HH-2025-01` procentai turi reikšti **privataus namų ūkio, kuriame vienas suaugusysis be išlaikomų vaikų, dalį**, ne asmenų, susituokusių ar būsto savininkų dalį; 2024 ir 2025 m. Lietuvos reikšmės preliminarios.
5. Visų 8 temų ir Apžvalgos turinys neturi dingti; 10 apskričių modelio, kuriam nepakanka duomenų, nepublikuoti.

**Tik po šių patikrų** priimamas atskiras strateginis sprendimas dėl viešo `main` leidimo.
