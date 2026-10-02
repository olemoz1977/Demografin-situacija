# 2025 m. 1 kambario privataus nuomos pasiūlos šaltinių auditas

Statusas: research / nepublikuota.

## Problema
Viešai prieinamas oficialus VDA nuomos rodiklis neapima visų 10 apskričių ar jų savivaldybių.
Todėl privataus būsto nuomos sluoksniui reikia rinkos pasiūlos šaltinio.

Socialinio / savivaldybių būsto nuomos duomenys šiam tikslui NETINKA:
jie aprašo kitą rinkos segmentą ir negali būti naudojami kaip privataus 1 kambario buto nuomos pakaitalas.

## Smart Continent BI_3 patikra — FAIL pagrindiniam nuomos sluoksniui

2026-10-02 papildomai patikrintas Aplinkos ministerijos / Smart Continent viešos
Būsto prieinamumo indekso švieslentės rodiklis BI_3:
`Vidutinė nuomos įmokų dalis nuo VDU, %`.

Techniniu požiūriu sluoksnis atrodo patraukliai:
- Power BI modelis grąžina BI_3 ir neto VDU visoms 60 savivaldybių;
- todėl galima tiksliai rekonstruoti vidinį dydį
  `implied_rent = BI_3 × Smart Continent neto VDU`;
- visos 60 savivaldybių susiejamos su 10 apskričių.

Tačiau jis NETINKA kaip pagrindinė privataus rinkos nuomos bazė:

1. Tarpinių vertinimo rezultatų pristatyme nacionalinis rodiklis
   `Pajamų dalis skiriama nuomai` = 16,6 % aiškiai nurodytas kaip 2024 m.
   Pajamų ir gyvenimo sąlygų tyrimo (PGS) NŪ klausimyno duomuo.
2. VDA PGS metodikoje imtis sluoksniuojama ne pagal 60 savivaldybių, o į 25 sluoksnius:
   5 didžiuosius miestus ir kiekvienos apskrities kitus miestus bei kaimo vietoves.
   Todėl 60 savivaldybių BI_3 tikslumas / reprezentatyvumas nėra savaime įrodytas.
3. Viešame Power BI modelyje nėra savivaldybės nuomos stebinių skaičiaus,
   paklaidos, nuomos būsto krepšelio ar aiškaus pirminio savivaldybių nuomos šaltinio.
4. Rekonstruoti dydžiai turi ryškių rinkos prasme neįtikinamų reikšmių,
   pvz. apie 25 EUR/mėn. Kalvarijoje, 30 EUR Skuode, 46 EUR Biržuose.
5. Švieslentės `Lietuva` BI_3 reikšmė 17,2164 % sutampa su PAPRASTU 60 savivaldybių
   BI_3 aritmetiniu vidurkiu, o ne su pristatyme nurodytu nacionaliniu PGS 16,6 % dydžiu.
   Tai yra papildomas signalas, kad švieslentės agregatas nėra tinkamas rinkos nuomos
   nacionalinis kontrolinis rodiklis.

Verdiktas: **FAIL pagrindiniam nuomos sluoksniui / QA ir diagnostikai tik.**

Failai:
- `data/housing-rent-smart-continent-proxy-2024-diagnostic.csv`;
- `research/smart-continent-rent-proxy-qa-2024.json`;
- `scripts/extract_smart_continent_rent_proxy.mjs`;
- `scripts/parse_smart_continent_rent_proxy.mjs`.

BI_3 gali būti naudojamas tik kaip papildoma kryžminė diagnostika. Jo negalima traktuoti
kaip privataus 1 kambario buto rinkos nuomos kainos ar automatiškai agreguoti į apskritis.

## Didžiųjų miestų oficialus VDA etalonas

2026-10-02 iš VDA ArcGIS EVP32 FeatureServer tiesiogiai ištrauktas 2025 m. oficialus
rodiklis S7R281 `Butų nuomos vidutinės metinės kainos`.

2025 m. reikšmės:
- Vilniaus m. sav.: 155,09 EUR/m² per metus = 12,924 EUR/m²/mėn.;
- Kauno m. sav.: 124,35 = 10,363 EUR/m²/mėn.;
- Klaipėdos m. sav.: 113,46 = 9,455 EUR/m²/mėn.;
- Šiaulių m. sav.: 95,15 = 7,929 EUR/m²/mėn.;
- Panevėžio m. sav.: 91,40 = 7,617 EUR/m²/mėn.

Šis sluoksnis yra **oficialus kontrolinis benchmarkas**, bet ne 10 apskričių nuomos sluoksnis:
jis apima tik 5 didžiųjų miestų savivaldybes ir nėra 1 kambario butų pjūvis.

Failai:
- `research/raw/vda-rent-big-cities/vda-rent-big-cities-2025.csv`;
- `research/raw/vda-rent-big-cities/vda-rent-big-cities-2025-qa.json`;
- `scripts/extract_vda_rent_big_cities.mjs`.

## Aruodas 1 kambario etalonas

Aruodas.lt istorinių tendencijų puslapiai pateikia aktyvių skelbimų pasiūlos kainų vidurkius
Vilniui, Kaunui ir Klaipėdai. 2025-12 1 kambario etalonai:
- Vilnius: 484 EUR/mėn.;
- Kaunas: 379 EUR/mėn.;
- Klaipėda: 371 EUR/mėn.

Aruodas aiškiai nurodo, kad tai yra pasiūlos, o ne sudarytų nuomos sutarčių kainos.
Šie dydžiai naudojami metodo validacijai, o ne kaip faktinių nuomos sandorių statistika.

Bandymas automatizuoti visą 2025 m. istorinių Aruodas ataskaitų ciklą atmestas:
senesni tiesioginiai `month=YYYY-MM` URL gyvame puslapyje ne visada atkuria istorinį
nuomos bloką taip, kaip jį rodo paieškos indeksas. Todėl nepatikimi automatiniai rezultatai
nenaudojami ir neturi likti kaip duomenų sluoksnis.

## Mažesni miestai — istorinių Skelbiu.lt skelbimų mėginys
Paieškos indeksuose pavyko patikrinti 2025 m. istorinius Skelbiu.lt 1 kambario butų
skelbimus Marijampolėje, Alytuje, Utenoje, Tauragėje ir Telšiuose.

Įtraukiami tik:
- 1 kambario butai;
- savarankiški butai, ne kambario nuoma;
- ilgalaikė nuoma arba skelbimas, kuriame nėra tik trumpalaikės nuomos signalo;
- nurodyta mėnesio kaina ir plotas;
- atnaujinimo data patenka į 2025 m.

Neįtraukiami:
- bendrabučio tipo kambariai su bendro naudojimo virtuve / san. mazgu;
- trumpalaikė nuoma, jei ilgalaikė nesiūloma;
- ieškančių išsinuomoti skelbimai;
- 2026 m. skelbimai;
- dabartiniai skelbimai be įrodomos 2025 m. stebinio datos;
- dubliuoti skelbimai.

Žr.:
- `data/housing-rent-city-sample-2025.csv`;
- `research/housing-rent-search-index-audit-2025-10-02.md`;
- `scripts/summarize_housing_rent_city_sample.py`.

## Dabartinė mėginio aprėptis
- Marijampolė: N=7, mediana 300 EUR/mėn. — C kokybė.
- Alytus: N=6, mediana 285 EUR/mėn. — C kokybė.
- Utena: N=4, mediana 225 EUR/mėn. — insufficient.
- Tauragė: N=2, mediana 300 EUR/mėn. — insufficient.
- Telšiai: N=4, mediana 275 EUR/mėn. — insufficient.

2026-10-02 papildoma istorinė paieška rado vieną naują tinkamą Telšių stebinį:
2025-08-01, Žemaitės g., 37 m², 1 kamb., 360 EUR/mėn. Tačiau N pakilo tik iki 4,
todėl kokybės klasė nepasikeitė.

Suvestinė dabar generuojama automatiškai ir tikrinama CI:
- `scripts/summarize_housing_rent_city_sample.py`;
- `tests/test_summarize_housing_rent_city_sample.py`;
- `.github/workflows/test-rent-city-sample.yml`.

Šie miesto skaičiai NEGALI būti naudojami galutiniam 10 apskričių indeksui:
paieškos indeksas nėra pilna skelbimų duomenų bazė, o miestas nėra apskritis.


## 10 apskričių Skelbiu.lt search-index bandymas — CLOSED / FAIL publikacijai

2026-10-02 miesto lygmens istorinė imtis buvo išplėsta į tiesioginę apskrities
listing-level imtį. Tai reiškia, kad apskrities mediana skaičiuojama iš visų priimtų
tos apskrities 2025 m. vieno kambario skelbimų, o ne vidurkinant miestų medianas.

Dabartinė aprėptis:

- Alytaus: N=6, mediana 285 EUR/mėn. — C;
- Kauno: N=13, mediana 350 — B;
- Klaipėdos: N=6, mediana 345 — C;
- Marijampolės: N=7, mediana 300 — C;
- Panevėžio: N=5, mediana 250 — C;
- Šiaulių: N=13, mediana 250 — B;
- Telšių: N=8, mediana 275 — C;
- Utenos: N=6, mediana 255 — C;
- Vilniaus: N=10, mediana 350 — B;
- Tauragės: N=2, mediana 300 — **insufficient**.

Taigi minimalų N>=5 slenkstį pasiekia **9 iš 10 apskričių**.

Tauragės apskričiai papildomai tikrinti Tauragės, Jurbarko, Šilalės ir Pagėgių
istoriniai paieškos rezultatai. Nebuvo rasti trys papildomi unikalūs ir saugiai 2025 m.
datuojami ilgalaikės 1 kambario nuomos objektai. Dabartiniai 2026 m. skelbimai nebuvo
atgal datuojami pagal pardavėjo registracijos metus; trumpalaikė nuoma atmesta; to paties
fizinio objekto perpublikavimai nedubliuoti.

Svarbu: net jei Tauragė pasiektų N=5, paieškos indeksas vis tiek nėra įrodytas pilnas
Skelbiu.lt 2025 m. eksportas. Todėl N ribos yra tik minimalus mėginio QA kriterijus,
o ne reprezentatyvumo ar pilnos rinkos aprėpties įrodymas.

Verdiktas:
**FAIL pagrindiniam 10 apskričių nuomos sluoksniui; research / cross-validation only.**

Failai:
- `data/housing-rent-county-search-index-sample-2025.csv`;
- `research/housing-rent-county-search-index-qa-2025.json`;
- `scripts/summarize_housing_rent_county_sample.py`;
- `tests/test_summarize_housing_rent_county_sample.py`.

## Rinka.lt kaip alternatyvus vieno portalo archyvas — nepakankamas

2026-10-02 patikrintas Rinka.lt kaip galimas antras vienodo šaltinio 2025 m. archyvas.

Pliusai:
- paieškos puslapiuose išlaikoma skelbimo `Įkelta: YYYY MM DD` data;
- randama istorinių 2025 m. 1 kambario nuomos skelbimų;
- galima filtruoti miestą / rajoną.

Tačiau:
- aiškiai gausesni 2025 m. 1 kambario nuomos rezultatai rasti Šiauliuose;
- Utenos, Tauragės ir Telšių paieškose vienodo krepšelio istorinių rezultatų aprėptis
  išlieka reta ir nevienoda;
- todėl iš viešo indekso neįrodoma 10 apskričių / 60 savivaldybių pakankama aprėptis;
- Rinka.lt pavienių skelbimų negalima maišyti su Skelbiu.lt mediana be atskiro
  tarp-portalų kalibravimo ir deduplikavimo.

Verdiktas: **ne pagrindinis šaltinis; papildomam source-discovery tik.**

## Kiti vieši rinkos šaltiniai

Ober-Haus 2025 mėnesinės kainų lentelės pateikia 1 kambario nuomos intervalus keliems
didiesiems miestams (Vilnius, Kaunas, Klaipėda, Šiauliai, Panevėžys, taip pat Druskininkai),
bet ne visoms 10 apskričių. Todėl jos gali būti papildoma kontrolė, ne pagrindinis sluoksnis.

Socialinio / savivaldybių būsto atviri duomenys turi daug platesnę savivaldybių aprėptį
ir net nuomos kvantilius, tačiau aprašo kitą rinkos segmentą. Jų naudojimas kaip privataus
rinkos nuomos pakaitalo būtų metodinė klaida.

## Kokybės taisyklė
- N >= 10: B rinkos mėginys;
- 5 <= N < 10: C rinkos mėginys;
- N < 5: insufficient — galutinei teritorijos reikšmei nenaudoti.

## Tolimesnis darbas
1. Pagrindinis kelias — gauti vienodo tiekėjo 2025 m. privataus ilgalaikio 1 kambario
   nuomos tiesioginį 10 apskričių agregatą arba listing-level eksportą.
2. Gautą failą leisti per `scripts/validate_housing_rent_provider.py`.
3. VDA S7R281, Aruodas, Ober-Haus ir miesto search-index imtis naudoti kryžminei QA,
   ne kaip apskrities pakaitalus.
4. N ribų nemažinti ir skirtingų portalų pavienių skelbimų nemaišyti.
5. Smart Continent BI_3 palikti tik QA diagnostikai.
