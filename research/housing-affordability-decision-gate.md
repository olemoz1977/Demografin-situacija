# Būsto įperkamumo duomenų sprendimo vartai — 2026-10-01

Statusas: SPRENDIMAS ATNAUJINTAS — A variantas išlieka STRICT v1.0, papildomai leidžiamas PRELIMINARY v0.1 feature/preview režimas.

## Kas jau uždaryta

### Pajamos
- Turime 60 savivaldybių 2025-11 „Sodros“ vidutines apdraustųjų bruto pajamas ir apdraustųjų skaičių.
- Turime nacionalinį 25–30 m. visą mėnesį dirbusių orientyrą: 2 516 EUR bruto / 1 535 EUR neto.
- Parengtas skaidrus 25–30 m. teritorinis pajamų modelis.
- Statusas: tinkamas analizei kaip B-modelled, bet ne kaip tiesioginis amžius × savivaldybė matavimas.

### Pardavimo kaina
- Optimalus šaltinis nustatytas: VDA / Registrų centro faktinių butų sandorių 1 km gardelės, tačiau jo rinkos aprėptis dar turi būti paaiškinta.
- JOIN su Grid1KmSq techniškai validuotas.
- Pipeline turi pagination saugiklius ir outlier / robustumo diagnostiką.
- Pakartotinis `page("cursor")` bandymas grąžino tik CSV antraštę ir 0 eilučių, todėl 4 630 eilučių `ButuPirkimas.csv` laikomas pilnu šio endpointo snapshot; `_page.next` paskutinėje netuščio puslapio eilutėje yra normalus Spinta elgesys.
- Automatizuotas gavimas iš get.data.gov.lt ir test.data.gov.lt GitHub Actions aplinkoje vis dar kartotinai baigėsi HTTP 500.
- Adresynas.lt 2026-08-21 sėkmingai buvo atsisiuntęs tą patį oficialų rinkinį ir viešai rodo 2024 m. gardelių statistiką; tai patvirtina šaltinio egzistavimą, bet nėra patogaus pilno apskrities eksporto.

### Nuoma
- Nacionalinio privataus 1 kambario nuomos faktinių sutarčių rinkinio nerasta.
- VDA oficialus nuomos rodiklis apima tik 5 didžiuosius miestus.
- Aruodas istorinių tendencijų serija viešai agreguoja tik Vilnių, Kauną ir Klaipėdą.
- 2025 m. Skelbiu istorinis mėginys: Alytus N=6 / mediana 285 EUR; Marijampolė N=7 / 300; Utena N=4 / 225; Telšiai N=3 / 250; Tauragė N=2 / 300.
- Utena, Telšiai ir Tauragė pagal nustatytą N>=5 taisyklę dar nepakankami.
- Socialinio/savivaldybių būsto nuomos duomenys atmesti kaip kitos rinkos segmentas.

## Kodėl tai strateginis, o ne techninis klausimas

Toliau nebegalima vien techniniu veiksmu vienu metu išlaikyti visų trijų pradinių reikalavimų:
1. 10 apskričių;
2. aukštas ir vienodas patikimumas;
3. artimas 2025 m. laikotarpis.

Bent vieną iš jų tektų susilpninti arba palaukti papildomų duomenų.

## Variantai

### A — išlaikyti 10 apskričių ir aukštą kokybės kartelę
- Nepublikuoti, kol gaunamas pilnas faktinių sandorių snapshot ir pakankamas nuomos mėginys.
- Dabartinis feature branch lieka research režime.
- Metodologiškai stipriausias variantas.
- Trūkumas: nėra garantuoto termino.

### B — 10 apskričių centrų rinkos modelis
- Geografiją aiškiai pervadinti iš „apskričių“ į „apskričių centrus“.
- Pardavimo ir nuomos kainas rinkti vienodu skelbimų rinkos metodu visiems 10 miestų.
- Galima gauti pilną palyginimą greičiau.
- Trūkumas: pasiūlos kainos ≠ faktiniai sandoriai; miesto centras ≠ apskritis.

### C — 5 didžiųjų miestų oficialiai stipresnis pjūvis
- Vilnius, Kaunas, Klaipėda, Šiauliai, Panevėžys.
- Pirkimo/nuomos sluoksniui maksimaliai naudoti oficialią VDA statistiką ir faktinių sandorių validaciją.
- Trūkumas: atsisakoma 10 apskričių užmojo.

### D — 10 apskričių mišrus modelis
- Faktiniai sandoriai ten, kur patikimai gaunami; rinkos pasiūla ten, kur trūksta.
- Nuomai naudoti centro miesto medianą / platesnį 2025–2026 langą, kai N maža.
- Visur rodyti A/B/C kokybės klasę.
- Trūkumas: metodas tarp teritorijų nebebūtų visiškai vienodas, todėl palyginimas silpnesnis.

## Techninė rekomendacija
Jei prioritetas yra patikimumas ir svetainės principas „jei patikimo rodiklio nėra — skaičius nepateikiamas“, rinktis A. Jei prioritetas yra greitai turėti pilną 10 teritorijų palyginimą, rinktis B, bet klausimą pervadinti į apskričių centrų įperkamumą.

Kol sprendimas nepriimtas, main nekeičiamas.


## 2026-10-01 savininko sprendimas
Pasirinktas A variantas: išlaikyti 10 apskričių ir aukštą kokybės kartelę.

Tai reiškia:
- nekeisti pradinio klausimo ir nepervadinti apskričių į apskričių centrus;
- nemaišyti faktinių sandorių ir pasiūlos kainų kaip lygiaverčių apskričių rodiklių;
- nepublikuoti 10 apskričių reitingo, kol nėra pilno faktinių sandorių snapshot ir pakankamo nuomos sluoksnio;
- `main` nekeisti;
- research šakoje tęsti šaltinių gavimą, validaciją ir QA.

Kitas išorinis blokatorius: `get.data.gov.lt` pilno rinkinio endpointai šiuo metu GitHub Actions aplinkoje grąžina HTTP 500. Oficialus rinkinio puslapis nurodo du kontaktus: atverimas@stat.gov.lt duomenų klausimams ir atviriduomenys@vssa.lt techniniams portalo sutrikimams.


### 2026-10-01 vakaro korekcija
ButuPirkimas snapshot techninis pilnumas patvirtintas tuščiu sekančiu puslapiu. Naujas blokatorius yra ne pagination, o aprėptis: 2024 m. faile tik 516 sandorių / 474 objektai, 33 savivaldybės ir 8 apskritys. Pasirinktas A variantas reiškia, kad prieš publikaciją reikia oficialaus paaiškinimo, kokia atranka lemia tokią apimtį.


## 2026-10-02 būsenos atnaujinimas

A variantas lieka galioti: **10 apskričių + aukšta kokybės kartelė + nepublikuoti nepilno sluoksnio.**

### Pardavimo kaina
- VDA/RC dataset 2559 galutinai perkeltas į QA-only.
- Oficialus dataset aprašas papildomai patvirtina, kad jis apima tik vieno objekto įsigijimo
  sandorius ir neapima visų butų pirkimų.
- Pagrindinis tikslinis laikotarpis dabar **2025 m.**, nes nuoma yra 2025 m., o pajamos 2025-11.
- 2024 m. paliktas tik aiškiai pažymėtas fallback / istorinis QA.
- Oficialus VDA S7R280 2025 benchmarkas PASS: Lietuva 1880,13 EUR/m², taip pat 6 miestų savivaldybės.
- Registrų centro 2025 nacionalinė kontrolė — apie 37,1 tūkst. butų pardavimų.
- `scripts/build_housing_sale_county_from_rc.py` default dabar 2025, bet 2024 replay išlaikytas ir testuojamas.
- RC užklausa, išsiųsta 2026-10-01, prašė 2024 m. duomenų; atsakymo dar nėra.
- VDA ADS-1961 užregistruota; turinio atsakymo dar nėra.
- 2025 m. VDA patikslinimo juodraštis parengtas, bet **NEIŠSIŲSTAS**.

### Nuoma
- Smart Continent BI_3 — FAIL pagrindiniam sluoksniui, QA tik.
- Skelbiu.lt 2025 istorinis search-index mėginys išplėstas iki tiesioginio listing-level
  apskrities pool:
  - 9/10 apskričių pasiekia N>=5;
  - Tauragės apskritis lieka N=2;
  - search-index nėra pilnas portalo eksportas, todėl net N>=5 savaime nesuteikia publication-grade statuso.
- Pilnas Aruodas 2025 1 kambario benchmarkas atkurtas 3 miestams × 12 mėn.:
  - Vilnius 468,75 EUR/mėn. metų mėnesinių vidurkių vidurkis;
  - Kaunas 383,75;
  - Klaipėda 371,67.
- Kryžminė patikra parodė, kad Skelbiu search-index mediana nuo Aruodas benchmarko skiriasi:
  Vilnius -25,33%, Kaunas -8,79%, Klaipėda -7,18%. Tai nėra kalibravimo koeficientai,
  bet stiprina QA-only sprendimą.
- Aruodas / Skelbiu laiškas **NEBUVO išsiųstas**. Parengtas vienas konsoliduotas
  UAB „Diginet LTU“ juodraštis; siuntimas galimas tik parodžius tikslų tekstą savininkui
  ir gavus aiškų patvirtinimą.

### Periodo apsauga
- Galutinis skaičiuotuvas dabar reikalauja 2025 m. pardavimo ir 2025 m. nuomos sluoksnių.
- 2024 pardavimas + 2025 nuoma negali tyliai praslysti net `--allow-candidate` režime.
- CI testas šiai apsaugai PASS.

### Repo apsaugos
- `housing_affordability_pipeline.py` pagal nutylėjimą atsisako veikti; grid diagnostikai reikia
  `--allow-diagnostic-grid`.
- `main` / live nepakeistas.
- Machine-readable readiness išlieka `DO_NOT_PUBLISH`.

### Dabartiniai išoriniai blokatoriai
1. 2025 m. faktinių butų sandorių sluoksnis 60 savivaldybių / 10 apskričių
   (2024 m. tik fallback).
2. 2025 m. privataus ilgalaikio 1 kambario nuomos publication-grade sluoksnis visoms 10 apskričių.

Kol bent vienas blokatorius neišspręstas, galutinis 10 apskričių `m²/year` rodiklis
nepublikuojamas.


## 2026-10-02 strategijos pakeitimas — viršesnis už ankstesnę „nepublikuoti jokio rezultato“ taisyklę

Nuo šiol yra du lygiagretūs režimai.

### STRICT / v1.0
- `validated_publication_ready=false`, kol nepraeina pilnas 2025 m. pardavimo ir nuomos sluoksnis;
- 10 apskričių metodika, faktinių butų sandorių ir publication-grade 1 kambario nuomos reikalavimai nesilpninami;
- tai vienintelis režimas, kuris gali tapti galutine patikrinta versija;
- main/live lieka užrakintas ir bet koks publikavimas į jį papildomai reikalauja savininko sprendimo.

### PRELIMINARY / v0.1
- leidžiamas tik `feature/housing-affordability` / preview;
- rodomas geriausias šiuo metu pagrįstas 10 apskričių įvertis;
- privalomos aiškios būsenos: `OFFICIAL`, `MODELLED`, `PRELIMINARY`, `TO_BE_REFINED`;
- Smart Continent 2024 bendro būsto sluoksnis čia naudojamas tik kaip aiškiai įvardytas pardavimo proxy, kalibruotas į VDA S7R280 2025 šešių miestų butų kainų lygį;
- Skelbiu 2025 search-index nuoma lieka nepilna rinkos imtis; Tauragė N=2 turi būti išskirtinai pažymėta;
- centriniai m² skaičiai nėra publication-grade ir negali būti pristatomi kaip oficialios apskričių reikšmės;
- gavus geresnius duomenis keičiamos įvestys, ne visa analizės architektūra.

Machine-readable būsena: `research/housing-affordability-readiness.json`.
Joje `ready_for_publication` / `validated_publication_ready` reiškia STRICT v1.0, o `preliminary_v0_1.ready` — tik feature/preview leidimą.


## 2026-10-02 palyginamumo korekcija — v0.1 tarpapskritinis rezultatas atšauktas

Vieša peržiūra atskleidė esminę problemą: 50 m² standartizuoja tik plotą, bet ne būsto
kokybę / amžių / rinkos segmentą.

Pakartotinis šaltinio auditas patvirtino, kad v0.1 Smart Continent pardavimo bazė yra
`housing_all_types_dashboard_measure`, o ne apartment-specific sluoksnis. Ji taip pat
nekontroliuoja statybos laikotarpio ar naujos statybos dalies.

Sprendimas:
- ankstesnis `preliminary_v0_1.ready=true` yra ATŠAUKTAS;
- v0.1 skaičiai gali būti laikomi tik diagnostiniais;
- tarpapskritinis 50 m² kainos / pajamų grafikas negali būti laikomas metodologiškai
  tinkamu rezultatu, kol nepraeina comparable-sale-basket gate;
- 45–55 m² paliekamas kaip pradinis ploto kandidatas;
- statybos laikotarpis pasirenkamas tik gavus 2025 m. apskričių N ir kainos pjūvį pagal
  statybos amžiaus grupes;
- nauja statyba ir antrinė rinka negali būti tyliai sumaišytos.

Kitas duomenų poreikis RC / kitam tiekėjui:
2025 m. butai daugiabučiuose, apskritis, ploto intervalas, statybos laikotarpio grupė,
sandorių N ir EUR/m² statistika. Joks išorinis prašymas nesiunčiamas be savininkui
parodyto tikslaus teksto ir aiškaus „siųsk“.
