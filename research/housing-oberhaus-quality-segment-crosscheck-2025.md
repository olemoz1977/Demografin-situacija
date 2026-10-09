# 2025 m. butų kainos: pirmasis palyginamesnio standarto šaltinis (6 miestai)

**Tyrimo statusas: SEGMENTUOTOS RINKOS KAINŲ RIBOS – DALINĖ STANDARTIZACIJA, 10 APSKRIČIŲ REITINGUI NEPAKANKA.** 2026-10-10. Ankstesnė VDA `S7R280` visų parduotų butų vidutinių kainų 3 miestų įperkamumo diagnostika **NEPASIKEITĖ** į pilnai validžią. Svarbus naujas faktas: rastas nepriklausomas **2025 m. rinkos kainų šaltinis su būsto segmento ir kambarių skaičiaus atskyrimu**.

## A. Kas patikrinta

UAB „OBER-HAUS“ 2025 m. sausio ir 2025 m. gruodžio `Nekilnojamojo turto kainos Lietuvoje` apžvalgos **pirmame puslapyje** skelbia skirtingas kainų **nuo–iki EUR/m² ribas** pagal:

- miestą bei miesto rajonų tipą;
- kambarių skaičių;
- naujos / senos statybos grupę;
- renovuotų / nerenovuotų senos statybos butų segmentą, kur toks skirtumas pateiktas;
- naujos statybos **dalinės apdailos** būstus.

Pirmasis tikrinamas bendras segmentas: **2 kambarių butai, nauja statyba, dalinė apdaila, gyvenamieji rajonai** (ne centras ar prestižiniai rajonai). Šį segmentą šaltinis atskirai pateikia šešiose miestų kategorijose. Kai kurios vietovės (pavyzdžiui, Druskininkai) nėra apskrities centrai; tai **vietovės**, ne apskričių atstovai.

| Miestas | 2025-01, €/m² nuo–iki | 2025-12, €/m² nuo–iki |
|---|---:|---:|
| Vilnius | 2 350–3 000 | 2 500–3 300 |
| Kaunas | 2 000–2 700 | 2 300–2 950 |
| Klaipėda | 2 050–2 750 | 2 250–2 950 |
| Šiauliai | 1 650–1 900 | 1 800–2 100 |
| Panevėžys | 1 650–1 850 | 1 800–2 100 |
| Druskininkai | 1 900–2 250 | 2 100–2 350 |

**Kilmė ir būtina šaltinio nuoroda:** UAB „OBER-HAUS“ nekilnojamasis turtas, *Nekilnojamojo turto kainos Lietuvoje*, **2025 m. sausis**: https://www.ober-haus.lt/wp-content/uploads/NT-kainos-2025-sausis.pdf ; **2025 m. gruodis**: https://www.ober-haus.lt/wp-content/uploads/NT-kainos-2025-gruodis.pdf . Originaliuose PDF nurodyta, kad naudojant apžvalgos duomenis nuoroda į bendrovę būtina. Patikrinta vizualiai iš pirmojo puslapio lentelių; skaitinis rinkinys: `data/housing-oberhaus-2025-two-room-new-partial-city-ranges.json`.

**Nepainioti:** `2025-01` ir `2025-12` yra **dviejų mėnesių momentinės kainų ribos**, o ne 2025 m. sandorių metų vidurkis ar indekso kitimas. Ribų vidurio taškas nėra kaina, kurią mokėjo „vidutinis pirkėjas“. Nežinome imties dydžio, sandorių N ir paskelbtų ribų formavimo metodikos. `OBER-HAUS` rinkos kainų rėžiai **nėra oficialūs RC sandorių kainų agregatai**.

## B. Ką galime palyginti su ankstesne klaida?

Ankstesnė skaičiavimo formulė padalijo modelines metines santaupas iš VDA **visų** parduotų skirtingų butų vidutinės €/m² kainos. Nors matematiškai teisinga, geografiškai klaidino dėl skirtingo būstų krepšelio.

Naujasis papildomas segmentas daug geriau kontroliuoja **tipą, kambarių skaičių ir apdailos kategoriją**, tačiau **dar nesukuria** visų regionų standartizuotos pirmojo būsto kainos, nes trūksta konkretaus ploto, mikrovietos, sandorių N, energinio naudingumo ir **įrengimo iki gyvenamojo būsto kainos**.

Kad parodytume jautrumą neišgalvodami tikslaus vidurkio, pritaikėme tik **intervalų aritmetiką** ankstesnio eksperimento 2025 m. modelinėms santaupoms: abu suaugusieji turi hipotetinius 2025-11 nacionalinio 25–30 m. atlyginimo ekvivalentus, nuomojasi 1 kambario butą, o **1 700 €/mėn. papildomos pragyvenimo išlaidos yra nepatikrinta prielaida**. Būsto vardiklyje – **2025 m. gruodžio** naujos statybos **2 kambarių dalinės apdailos** kainų ribos.

| Miestas | Hipotetinės metinės santaupos | 2025-12 kainų rėžiai €/m² | Galimas m² kainos ekvivalentas per metus (ribos) |
|---|---:|---:|---:|
| Vilnius | 10 815 € | 2 500–3 300 | **3,28–4,33** |
| Kaunas | 11 835 € | 2 300–2 950 | **4,01–5,15** |
| Klaipėda | 11 980 € | 2 250–2 950 | **4,06–5,32** |

**Šie intervalai persidengia** (trijų miestų bendras intervalas apytikriai 4,06–4,33 m²). Nėra pagrindo pasakyti „jaunos šeimos Klaipėdoje tikrai gali įsigyti X m² daugiau nei Vilniuje“: visų pirma **tai ne faktinės šeimų santaupos**, o kainų intervalai neatitinka tų pačių butų įsigijimo arba įrengimo kainų.

**Dar svarbiau:** naujos statybos **dalinė apdaila nėra tinkamas iškart gyventi būstas**. Įrengimas po pirkimo pareikalautų papildomų išlaidų, kurios čia **neišmatuotos**, todėl nė vieno iš šių kainų intervalų nevadinti bendra šeimai tinkamo būsto įsigijimo kaina. Antrinis jautrumo JSON: `data/housing-first-home-quality-segment-sensitivity-2025.json`.

## C. Kodėl neskaičiuojame 10 apskričių iš šio šaltinio?

- Nepateikiamas visų **10 apskričių** sandorių kainų pjūvis (apžvalga apima miestus ir Druskininkus).
- Tai **specialisto rinkos kainų intervalai**, ne tiksliai suderinti faktiniai 2025 m. RC butų sandoriai.
- Naujos statybos **dalinės apdailos** standartas atskiria vieną būsto segmentą, bet **neatspindi naudoto/pigaus įrengto pirmojo būsto**.
- Statybos periodas „nauja“ aprašytas kaip kategorija, o ne vienodi metai kiekvienoje vietoje.
- Kambarių skaičius 2 netapatinamas konkrečiam plotui – jaunos šeimos gali pirkti ir mažesnį ar didesnį būstą.
- Užbaigimo ir vietos kokybė lieka heterogeniška; be sandorių N negalime skaičiuoti nešališko vidurkio ar medianos.

**Sprendimas:** naudoti tik kaip **tarpinį skirtingos kokybės problemos patvirtinimą ir šaltinio diagnostiką**, ne galutinį apskričių įperkamumo reitingą. Nepakeisti seno VDA mišraus krepšelio „OBER-HAUS“ intervalo viduriu. Nėra statistinio pagrindo laikyti 2025 m. sausio–gruodžio ribų pokytį kokybės koreguotu kainų indeksu.

## D. Tikslus kitas duomenų sprendimas

Istorinėje `feature/housing-affordability` šakoje esantis `research/housing-comparable-sale-basket-audit-2026-10-05.md` jau patvirtino, kad **nemokamo gardelių sluoksnio prijungimas prie NTR pastatų fondo metų negali patikimai identifikuoti konkretaus parduoto buto statybos laikotarpio**.

Norint **faktinės 10 apskričių palyginamos rinkos kainos**, RC agregatas (jei teikėjas techniškai gali pateikti) turėtų bent:

1. Atskirus **butus daugiabučiuose**, 2025 m. faktiniai sandoriai, aiškus kelių objektų (pvz., parkavimo vietos) kainos traktavimas.
2. Atskirtą **2 kambarių** grupę (jei duomenyse kambarių skaičius patikimai žinomas). Plotas analizuojamas bent **35–44,9 / 45–54,9 / 55–64,9 m²** juostomis; mažų imčių atveju nevaidinti viso segmento buvimo.
3. Pastato statybos laikotarpį, pirmame audite keturios plačios grupės (**iki 1960, 1961–1990, 1991–2010, 2011–2025**), prieš detalesnę analizę tikrinti sandorių N.
4. Pagal **10 apskričių**, o ne po vieną jų centrą: **sandorių N / validžių €/m² N / €/m² mediana**; jei dalis trūksta, palikti „nepalyginama“. Privatumo rizikai mažinti prašyti tik agreguoto `XLSX`.
5. Jei RC registras neturi buto **būklės / įrengimo kokybės** atributų, aiškiai pripažinti, kad statybos metų grupei atskyrus lieka kokybės neišmatuotų skirtumų, ir **nevadinti rezultato idealiai standartizuotu**.

Didesnės imties pavojus: 10 apskričių × 3 ploto juostos × 4 statybos grupės = iki 120 gardelių; prieš užsakant pakanka įsitikinti, ar teikėjas gali įvertinti aprėptį bei mažų N slopinimą. Kitas tikslus darbas – parengti minimalų RC kainos pasiūlymo **juodraštį peržiūrai**, **nesiųsti** be projekto savininko „Siųsk“. Kitų ilgesnių viešų automatiškai generuojamų skelbimų sąrašų nekurti.

**Išorinių užklausų:** NE. **Publikacija į main:** NE.
