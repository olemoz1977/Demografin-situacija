# Namų ūkių struktūra Lietuvoje: oficialių 2024–2025 m. pjūvių atranka

**Parengta:** 2026-10-09. **Statusas:** `RESEARCH_ONLY_NOT_PUBLIC`. **Paskirtis:** pereiti nuo nesuderinamos „jaunos poros“ kategorijos prie oficialių namų ūkio statistinių vienetų. Tai **nėra** jaunų šeimų paramos gavėjų aprėpties vardiklis.

## Kaip šį terminą pristatome skaitytojui?

**Viešas skyriaus pavadinimas:** „Kaip gyvena Lietuvos žmonės?“

**Statistinio pjūvio pavadinimas:** „Namų ūkių sudėtis (ne būsto nuosavybė)“.

**Pirmo paminėjimo paaiškinimas:** „Namų ūkis – vienas gyvenantis žmogus arba žmonės, kurie kartu gyvena ir dalijasi bendromis būtinomis gyvenimo išlaidomis. Namų ūkis gali gyventi nuomojamame arba nuosavame būste. Vienas būstas gali talpinti kelis atskirus namų ūkius.“

**Nerekomenduojama:** naudoti „namų ūkis“ be paaiškinimo, pavadinti namų ūkius „namais“, aprašyti namų ūkių procentą kaip būstų arba gyventojų procentą. Viename būste gyvenančių asmenų skaičius savaime nenustato namų ūkių skaičiaus.

**Apibrėžties šaltinis:** Eurostat EU-SILC https://ec.europa.eu/eurostat/web/income-and-living-conditions/methodology

## A. Kokie tikri oficialūs duomenys egzistuoja?

| Šaltinis / rodiklio kodas | Populiacija ir matas | Galimi metai | Kas matuojama / apribojimas |
|---|---|---|---|
| **Eurostat EU-SILC `ilc_lvph02`** | Privačių **namų ūkių** dalis pagal suaugusiųjų ir išlaikomų vaikų sudėtį; % **namų ūkių** | 2024, 2025 | Duomenys Lietuvai yra **p (provisional)**. Oficialus statistinis namų ūkis, ne teisinė jauna šeima. |
| **Eurostat EU-LFS `lfst_hhnhtych`** | Privačių namų ūkių struktūra, vaikų skaičius ir jauniausio vaiko amžius | 2024, 2025 | Vaikai <18 m.; **kitokia vaikų / namų ūkio klasifikacija nei EU-SILC**. |
| **Eurostat EU-SILC `ilc_lvho02`** | Gyventojų dalis pagal būsto nuosavybės / nuomos statusą, namų ūkio tipą ir pajamų grupę | 2024, 2025 | **% gyventojų**, ne % namų ūkių! Neperkelti į namų ūkių skaičių. |
| **Eurostat EU-SILC `tesov190` (šaltinis `ilc_lvps02`)** | Gyventojų pasiskirstymas pagal namų ūkio tipą | 2024, 2025 | **% gyventojų**, todėl negali būti lyginama su `ilc_lvph02` kaip identiškas matas. |
| **VDA gyvenimo sąlygų statistika** | Pajamos, būsto sąlygos ir socialiniai rodikliai, pagal duomenų rinkinio apibrėžtį | 2024, 2025 | EU-SILC nacionalinis šaltinis; 2025 m. apklausos pajamų ataskaitinis laikotarpis gali būti ankstesni kalendoriniai metai – tikrinti metaduomenis konkrečiam rodikliui. |
| **Sodra 2025-11** | Apdraustųjų darbo pajamos; asmenų, ne šeimų matas | 2025-11 | Nenaudoti kaip abiejų vieno namų ūkio narių tiesioginės pajamų statistikos. |
| **SPIS / SADM paramos gavėjai** | Teisiniai paramos gavėjai | 2024, 2025 | Nėra visų Lietuvos namų ūkių ar jaunų šeimų registro. |

## B. Preliminarūs, bet oficialūs EU-SILC pjūvio faktai

Eurostat `ilc_lvph02` Lietuvai:

| Namų ūkio sudėtis | 2024 m. | 2025 m. | Statusas |
|---|---:|---:|---|
| Vienas suaugęs **be išlaikomų vaikų** | **50,5 %** | **55,7 %** | `p` / PRELIMINARY |
| Vienas suaugęs **su išlaikomais vaikais** | **7,9 %** | **7,8 %** | `p` / PRELIMINARY |
| Du suaugę **su išlaikomais vaikais** | netikrinta | **13,0 %** | `p` / PRELIMINARY |
| Du suaugę **be išlaikomų vaikų** | netikrinta | **18,0 %** | `p` / PRELIMINARY |

**Metodinė apsauga:** Eurostat (`ilc_lvph02`) 2024 m. 50,5 % ir 2025 m. 55,7 % skirtumas **nėra pagrindinė vieša demografinė išvada**, kol nepatikrinta 2024–2025 m. EU-SILC atrankos kaita, revizijos ir pilnos grupių sumos. Tai **procentinių dalių**, o ne absoliutus vienišų žmonių skaičius. „Vienas suaugęs“ nereiškia jaunas, nesusituokęs ar neturintis partnerio už namų ūkio ribų.

**Neprilygintini alternatyvūs faktai:** Eurostat EU-LFS `lfst_hhnhtych` pranešime pateikta, kad Lietuvoje 2025 m. **18,4 % namų ūkių turėjo vaikų iki 18 m.** EU-LFS grupės skiriasi nuo EU-SILC **išlaikomų** vaikų definicijos (į ją patenka ir nedirbantys 18–24 m., gyvenantys su tėvais). Todėl `18,4 %` negalima naudoti kaip patikros `7,8 % + 13,0 %` ar bendros `ilc_lvph02` vaikų dalies.

**Svarbi riba:** teisinės „jaunos šeimos“ programa neskaičiuoja visų vieno suaugusio namų ūkių, o Eurostat namų ūkiai netikrina sutuoktinių / partnerystės teisinių dokumentų ar teisės į subsidiją.

## C. Kaip integruosime į projektą

1. Duomenis saugoti atskirame `data/household-composition-eurostat-2024-2025.json` – ne būsto paramos parametruose.
2. Prie viešo rodiklio pateikti **populiaciją + definicijos ID + teritoriją + metus + matą + būseną + šaltinį**.
3. Eurostat `p` rodyti kaip „išankstinis / preliminarus“ net jeigu pirminis šaltinis oficialus.
4. **Nekurti 2024–2025 „namų ūkių skaičiaus“ iš procentų**, kol neturimas to paties tyrimo, teritorijos ir metų oficialus absoliutus namų ūkių vardiklis.
5. Atskirti rezultatą **% namų ūkių** nuo **% gyventojų**, ypač naudojant būsto nuosavybės statistiką.
6. Šį sluoksnį siūloma įterpti prie **„Gyventojų struktūra“ / „Šeimos aplinka“**, o **„Būstas“** gali rodyti nuorodą tik tada, kai sukuriamas turinio ryšys ir patikrinama metodika. Nesumaišyti su paramos aprėptimi.
7. Apskričių ir savivaldybių rezultatų nerodyti nacionalinių EU-SILC reikšmių priskyrimu visoms teritorijoms; pirmiausia patikrinti `NUTS` detalumą ir imties kokybę.

## D. Pirminiai šaltiniai

- Eurostat EU-SILC metodika: https://ec.europa.eu/eurostat/web/income-and-living-conditions/methodology
- EU-SILC namų ūkių struktūra: https://ec.europa.eu/eurostat/databrowser/view/ilc_lvph02/default/table
- Eurostat 2026 leidinys (2025 metų struktūra, 35 p.): https://ec.europa.eu/eurostat/documents/15216629/24279737/KS-01-26-036-EN-N.pdf
- Eurostat 2025 leidinys (2024 metų struktūra, 35 p.): https://ec.europa.eu/eurostat/documents/15216629/22200086/KS-01-25-032-EN-N.pdf
- EU-LFS 2025 metų namų ūkiai su vaikais (LT 18,4 %): https://ec.europa.eu/eurostat/en/web/products-eurostat-news/w/ddn-20260513-2
- EU-LFS namų ūkiai pagal sudėtį: https://ec.europa.eu/eurostat/databrowser/view/lfst_hhnhtych/default/table
- EU-SILC būsto nuosavybė, gyventojų dalis: https://ec.europa.eu/eurostat/databrowser/view/ilc_lvho02/default/table
- EU-SILC namų ūkio tipai, gyventojų dalis: https://ec.europa.eu/eurostat/databrowser/view/tesov190/default/table
- Lietuvos EU-SILC metodika: https://ec.europa.eu/eurostat/cache/metadata/EN/ilc_simsilc_lt.htm

**Sprendimas:** „Namų ūkių struktūra“ yra atskira oficialios statistikos tyrimo kryptis, tačiau iš jos negalima automatiškai skaičiuoti visų jaunų šeimų, pirmojo būsto paramos aprėpties ar pirmojo būsto perkamumo.
