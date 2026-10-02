# Būsto įperkamumo duomenų sprendimo vartai — 2026-10-01

Statusas: SPRENDIMAS PRIIMTAS — pasirinktas A variantas.

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

A variantas lieka galioti: 10 apskričių + aukšta kokybės kartelė + nepublikuoti nepilno sluoksnio.

### Pardavimo kaina
- VDA/RC dataset 2559 gardelės galutinai perkeltos į QA-only.
- Pagrindinis tikslinis šaltinis — oficialus RC 2024 butų sandorių agregatas / anonimizuotas sluoksnis.
- Parengtas `scripts/build_housing_sale_county_from_rc.py`.
- Automatiniai testai PASS.
- RC užklausa išsiųsta 2026-10-01; atsakymo dar nėra.
- VDA ADS-1961 užregistruota; atsakymo dar nėra.

### Nuoma
- Smart Continent BI_3 patikrintas visoms 60 savivaldybių, bet FAIL pagrindiniam sluoksniui.
- 13 savivaldybių rekonstrukcija `BI_3 × VDU` davė <100 EUR/mėn. dydžius;
  savivaldybių metodo, N ir paklaidos viešame modelyje nėra.
- Parengtas `scripts/validate_housing_rent_provider.py`.
- Automatiniai testai PASS.
- Oficialus VDA 2025 kontrolinis sluoksnis tiesiogiai ištrauktas iš ArcGIS FeatureServer:
  Vilnius 155,09; Kaunas 124,35; Klaipėda 113,46; Šiauliai 95,15; Panevėžys 91,40
  EUR/m² per metus.
- Šis VDA sluoksnis lieka tik 5 miestų benchmarkas, ne apskričių pakaitalas.
- Aruodas / Skelbiu istorinių agregatų užklausa išsiųsta 2026-10-02; atsakymo dar nėra.
- Netikslus Aruodas 36 mėn. automatizavimo eksperimentas pašalintas iš repo.

### Repo apsaugos
- `housing_affordability_pipeline.py` pagal nutylėjimą atsisako veikti; diagnostiniam grid
  atkūrimui reikia aiškaus `--allow-diagnostic-grid`.
- `main` / live nepakeistas.

### Dabartiniai išoriniai blokatoriai
1. RC 2024 pilnas butų sandorių sluoksnis / metodikos patvirtinimas.
2. 2025 privataus 1 kambario nuomos sluoksnis visoms 10 apskričių.

Kol bent vienas iš šių blokatorių neišspręstas, galutinis `m²/year` 10 apskričių rodiklis
neskaičiuojamas publikavimui.
