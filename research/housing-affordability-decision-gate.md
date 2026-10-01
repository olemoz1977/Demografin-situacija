# Būsto įperkamumo duomenų sprendimo vartai — 2026-10-01

Statusas: STRATEGINIS SPRENDIMAS REIKALINGAS prieš keičiant analizės geografiją ar kokybės kartelę.

## Kas jau uždaryta

### Pajamos
- Turime 60 savivaldybių 2025-11 „Sodros“ vidutines apdraustųjų bruto pajamas ir apdraustųjų skaičių.
- Turime nacionalinį 25–30 m. visą mėnesį dirbusių orientyrą: 2 516 EUR bruto / 1 535 EUR neto.
- Parengtas skaidrus 25–30 m. teritorinis pajamų modelis.
- Statusas: tinkamas analizei kaip B-modelled, bet ne kaip tiesioginis amžius × savivaldybė matavimas.

### Pardavimo kaina
- Optimalus šaltinis nustatytas: VDA / Registrų centro faktinių butų sandorių 1 km gardelės.
- JOIN su Grid1KmSq techniškai validuotas.
- Pipeline turi pagination saugiklius ir outlier / robustumo diagnostiką.
- Vartotojo eksportai pasirodė esantys tik pirmi Spinta puslapiai (_page.next).
- Automatizuotas gavimas iš get.data.gov.lt ir test.data.gov.lt GitHub Actions aplinkoje kartotinai baigėsi HTTP 500.
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
