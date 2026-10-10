# T0 – atgalinė 8 temų tyrimo inventorizacija (2026-10-10)

**Apimtis:** `main`, `audit/population-standard-2024-2025`, `feature/housing-affordability`, PR #1–#5, `data/`, `research/`, JS modulių šaltinis. Ne naujas tyrimas ir ne siūlymas publikuoti nepatikrintą informaciją.

**Patikros riba:** paskutiniai `main` GitHub Pages ir research-continuity Actions – PASS (SHA `18bd4137`, 2026-10-10); PR #4 Eurostat publikavimo QA – PASS. Tiesioginio gyvos svetainės vizualaus patikrinimo šios sesijos įrankiai neatliko, todėl **render_live_qa=PENDING**, nors turinys įtrauktas į `main` ir Pages diegimas sėkmingas. `PUBLISHED_*` registro statusai reiškia praeitų publikacijų šaltinio bei sėkmingo deploy pėdsaką; tai nėra naujas vizualus auditas.

## 8 modulių auditas

| Tema | Rasta / išsaugota | Paskelbta šaltinio kode | Nepublikuota / ribota | Būsimas prasmingas veiksmas |
|---|---|---|---|---|
| Apžvalga | VDA 2025* 17 478 gimimų, −19 946 natūrali kaita, +16 165 neto migracija; EUROPOP2025 TFR 1,03 **projekcinis nowcast** | `index.html`, `research-nav.js`, `overview-nowcast.js` | Nėra pagrįstos suvestinės apie visus 8 registruotus krypčių duomenis | Publikavimo aprėpties matrica ir temų kortelių peržiūra, nekeisti KPI statuso |
| Gimstamumas | 2024 TFR 1,11, ES 1,34; 10 apskričių TFR 0,96–1,21; 2024 pirmojo vaiko gimdymo amžius 28,7 m. | `index.html`, skiltis `fertility` | 2025 pirmojo gimdymo amžiaus ir būsto poveikio nėra patikrinta | Kryžminė nuoroda su būstu, ne dubliuotas grafikas |
| Gyventojų struktūra | 2025 amžiaus piramidė / 65+ 20,9 %, 2025 25–44 m. 884 moterys / 1000 vyrų; 1985–1999 gimimo kohortos kontrastas | `app-base.js`, `sex-history.js`, `research-nav.js` | Eurostat 55,7 % dabar tik susijusiuose kontekstuose; ne čia pateiktas pagrindinis namų ūkių faktas | Pagrindinę 55,7 % interpretaciją ateityje perkelti / įdėti čia ir susieti nuorodomis |
| Migracija | 2025* 44 705 imigracija ir 28 540 emigracija; 2025* 217 067 užsienio piliečiai; lyčių migracija, Lietuvos piliečių grįžimo srautų atskyrimas | `index.html`, `app-base.js`, `migration-sex.js` | Namų ūkių rodiklio migracinis mechanizmas neįrodytas | Išlaikyti skirtumą tarp neto migracijos, srautų ir hipotezės |
| Šeimos aplinka | 2024 santuokos 12 890 / ištuokos 7 127; 2007–2012 išmokų istorija; FRE; vaikų infrastruktūra; partnerystės hipotezės | `index.html`, `policy-history.js`, `policy-fre.js`, `infrastructure.js`, `family-hypothesis.js` | Nėra patvirtinto priežastinio ryšio tarp išmokų, skaitmenizavimo, būsto ir TFR | Namų ūkių struktūrą palikti tik antrine kontekstine nuoroda |
| Būstas | 2024–25 VDA 6 miestų kainų vidurkiai; 2025-12 Ober-Haus segmentai; 2025 paskolos metodika; 2019–2025 SADM parama; eilė | `housing-affordability.js` | Audito šakoje: VDA miestų išvestinė kaita, 2024 m. 10 apskričių **visų namų ūkių** pajamos, jaunimo tėvų namų palikimo amžius, m²/metus / atvirkštinio biudžeto / kokybės / įmokos scenarijai. Tik dalis validuoti oficialūs faktai, dalis modeliai. **10 apskričių reitingas neįrodytas.** | Pirmiausia atskirti jau išgautus tikrus papildomus faktus ir scenarijus; jokios naujos viešos lentelės iki publikavimo sprendimo |
| Ateitis | EK 2024 Ageing Report senatvės priklausomybės rodiklio 2022–2040 projekcijos; 3 adaptacijos scenarijai | `future.js`, `editorial-copy.js` | Produktyvumo ir finansavimo hipotezės nėra prognozės su tikimybe | Išlaikyti oficialios projekcijos ir autoriaus prielaidų skyrimą |
| Metodika | 2024 galutinis / 2025* išankstinis / 2025P projekcinis; skirtingos populiacijos; namų ūkio ≠ nuosavybės aiškinimas | `index.html`, `overview-nowcast.js`; T0 failai | EU-SILC `p` ≠ projekcija; nėra automatizuotos apsaugos nuo **dar neįrašyto** atradimo | Tikrinti prieš kiekvieną publikaciją visų temų registrą ir nepublikuotų rezultatų vietą |

## Konkrečios atgalinės spragos

1. **EU-HH-2025-01 registro būsena vėlavo paskui PR #4:** `main` kode 55,7 % yra `housing-affordability.js`, `family-hypothesis.js`, `migration-sex.js`. PR #4 sujungtas 2026-10-10, po jo sėkmingai diegta GitHub Pages. Senas `VERIFIED_UNPUBLISHED` yra netikslus, jei kalbame apie GitHub-kodu patvirtintą publikaciją. Pagrindinė vieta `population` dar neįgyvendinta; šį trūkumą laikyti publikavimo struktūros skola.
2. **Tyrimų rezultatai tik audito šakoje:** `data/housing-city-market-changes-derived-2024-2025.json`, `data/young-adults-housing-path-eurostat-2024-2025.json`, `data/ldp-household-disposable-income-county-2024.json`, `data/housing-first-home-saving-scenarios-city3-2025.json`, `data/housing-first-home-reverse-budget-2025.json`, `data/housing-first-home-2025-12-per-m2-mortgage-burden.json`, `data/housing-first-home-quality-segment-sensitivity-2025.json`, `data/housing-first-home-2025-12-consistent-market-snapshot-scenarios.json`, `data/housing-state-support-demand-context-2025-2026.json`, taip pat metodiniai `research/housing-*.md`. Nekelti šių duomenų į `main` automatiškai, prieš tai neišsprendus metodinių ribų.
3. **Tik senoje `feature/housing-affordability` šakoje:** `research/housing-comparable-sale-basket-audit-2026-10-05.md`, `research/housing-target-couple-denominator-2025.md`, `data/housing-working-couples-model-2025.json` ir susiję tikslinės populiacijos modeliai. Tai **ne oficialus visų jaunų šeimų vardiklis**. Rekomendacija – išsaugoti registruotą tyrimo blokatorių, neimportuoti rodiklio kaip fakto.
4. **Neįrodyti vardikliai:** paramą gavusios šeimos nėra visos teisę turėjusios šeimos; 515 / 1700 neteisingas aprėpties procentas; vienos programos 2026 m. 10 minučių kvietimo negalima priskirti kitai 2025 m. paramos programai.
5. **Tikrinimas neveiks iš pokalbio:** CI tikrina išvardytus ID ir egzistuojančius žymeklius, bet neranda neįregistruotų istorinių atradimų. Todėl čia išvardytos ir registruotos anksčiau praleistos temos – pradinis atgalinis susiejimas, ne amžina garantija, kad viso pokalbio turinys atkurtas.

## Publikavimo apimties vartai (siūlymas, dar ne leidimas)

- **1:** `population` pateikti Eurostat 2025 55,7 % (p), 2024 50,5 % (p), ES 35,7 % ir namų ūkio apibrėžtį – vieną pirminį faktų bloką. `family` ir `housing` palikti tik nuorodas su vienu ribojimo sakiniu; migracijai – ne priežastingumo hipotezės saugiklį.
- **2:** `housing` papildomai parodyti 2024 m. 10 apskričių **visų** namų ūkių disponuojamas pajamas kaip atskirą kontekstą, ne jaunų šeimų m² reitingo apskaičiavimą, tik po šaltinio apibrėžimo pakartotinės kontrolės.
- **3:** `housing` (ar nuoroda į tyrimo eigą) atskirti 3 miestų aiškiai **modelinius** m²/metus ir pradinio įnašo jautrumo scenarijus nuo oficialios statistikos, tik po leidimo ir sprendimo dėl viešos metodikos.
- **4:** prieš UI PR – skelbiamų, neskelbiamų ir perkeliamų registro ID matrica; po – automatiniai bei realios naršyklės kompiuteriu ir telefonu testai. **Nekeičiama vieša svetainė šioje inventorizacijoje.**

## Patikimos šaltinių šakos

- https://github.com/olemoz1977/Demografin-situacija/tree/main
- https://github.com/olemoz1977/Demografin-situacija/tree/audit/population-standard-2024-2025
- https://github.com/olemoz1977/Demografin-situacija/tree/feature/housing-affordability
- PR #1 (draft), PR #2 (parama), PR #3 (būsto faktai), PR #4 (Eurostat), PR #5 (T0 registras).

**Statusas:** atgalinė **repositorijos** inventorizacija atlikta; visų buvusių pokalbių ir gyvos naršyklės pilno patikrinimo neatlikta. Nepatikrintų rodiklių nepakeliame iki faktų.
