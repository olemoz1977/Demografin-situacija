# AM / Smart Continent būsto švieslentės šaltinio auditas

Data: 2026-10-02  
Statusas: **FAIL pagrindiniam butų kainų sluoksniui; palikti QA / diagnostikai.**

## Sprendimas

Aplinkos ministerijos / Smart Continent viešos „Power BI“ švieslentės 4 puslapis
„Pradiniai duomenys“ sėkmingai išgautas iki semantinio modelio ir tikslių skaitinių
reikšmių. Lentelė apima visas 60 savivaldybių ir 2024 m. pateikia vienodai pavadintus
rodiklius:

- `Būstų pirkimo-pardavimo sandorių skaičius`;
- `Vid. būsto sandorio kaina, Eur/kv.m`.

Tai yra **sandorio**, ne skelbimo / pasiūlos kainos rodiklis. Tačiau jis yra bendras
**būsto** rodiklis ir nėra butų daugiabučiuose kainos rodiklis. Todėl šaltinis
neatitinka A varianto reikalavimo pagrindiniam butų kainų vardikliui.

## Reproducibilus išgavimas

Viešos ataskaitos semantinis modelis pasiekiamas per `Power BI` viešą reportą.
Feature šakoje pridėti:

- `scripts/extract_smart_continent_powerbi.mjs` – viešo reporto tinklo užklausų,
  modelio ir 4 psl. duomenų išgavimas;
- `scripts/parse_smart_continent_powerbi_raw.mjs` – 60 savivaldybių lentelės
  dekodavimas ir QA;
- `.github/workflows/smart-continent-extract.yml` – feature-only reproducibilus
  paleidimas;
- `research/raw/smart-continent-powerbi/latest/` – žali `Power BI` atsakymai;
- `data/housing-sale-smart-continent-housing-2024-diagnostic.csv` – diagnostinis
  60 savivaldybių sluoksnis;
- `research/smart-continent-housing-page4-qa-2024.json` – automatinės kontrolės.

`main` / live nekeičiami.

## Kas tiksliai yra 4 puslapyje

Pagrindinė 4 psl. `pivotTable` naudoja savivaldybę kaip eilutę ir šiuos pradinius
rodiklius:

- būsto naudingas plotas gyventojui;
- būstų skaičius metų pabaigoje;
- būstai, kuriuose nėra deklaruotų gyventojų;
- pastatytų būstų skaičius;
- būstų pirkimo-pardavimo sandorių skaičius;
- investicinių sandorių skaičius;
- **vid. būsto sandorio kaina, Eur/kv. m**;
- socialinio būsto poreikis;
- savivaldybės nuosavybės būstų skaičius.

2024 m. užklausa grąžina 61 rezultatą: 60 savivaldybių + `Iš viso`.

## Kritinės kontrolės

### 1. Sandorių populiacija neatitinka butų populiacijos

4 psl. `Iš viso`:

- būstų pirkimo-pardavimo sandorių: **37 009**;
- vid. būsto sandorio kaina: **557.0073817 Eur/m²** (UI rodo 557).

Mūsų nepriklausomas 2024 m. kontrolinis taškas butams yra apie **27 330**
parduotų butų. Tarpinių vertinimo rezultatų pristatyme butai daugiabučiuose ir
individualūs namai taip pat rodomi kaip atskiros kategorijos.

Išvada: 37 009 eilutė yra platesnė būsto sandorių populiacija ir negali būti
naudojama kaip butų sandorių skaičius.

### 2. 557 Eur/m² neatitinka butų kainos kontrolės

Smart Continent tarpinių rezultatų pristatyme 2024 m. Lietuvos kontrolės:

- vidutinė **buto** kaina: **1 669 Eur/m²**;
- vidutinė **namo** kaina: **595 Eur/m²**.

Švieslentės 4 psl. bendras `Vid. būsto sandorio kaina` rodiklis yra 557 Eur/m².
Tai ne tas pats rodiklis kaip 1 669 Eur/m² butų kaina.

### 3. Nacionalinis 557 yra nesvertas savivaldybių vidurkis

Visų 60 savivaldybių 2024 m. kainų patikra:

- paprastas aritmetinis 60 savivaldybių kainų vidurkis:
  **557.0073817 Eur/m²**;
- `Power BI` `Iš viso`: **557.0073817 Eur/m²**;
- savivaldybių kainų vidurkis, svertas 37 009 sandorių skaičiumi:
  **962.3262419 Eur/m²**.

Taigi `Iš viso` kaina praktiškai tiksliai lygi **nesvertam 60 savivaldybių
aritmetiniam vidurkiui**, o ne sandorių skaičiumi svertam nacionaliniam agregatui.

Tai yra atskiras aukšto svarbumo QA signalas: net jei rodiklio objektų tipas būtų
tinkamas, nacionalinio `Iš viso` negalima naudoti kaip svorinio agregavimo
kontrolės be papildomos metodikos.

## Faktinės ar pasiūlos kainos?

**PASS tik šiam aspektui.**

Semantinio modelio lauko pavadinimas yra `Vid. būsto sandorio kaina, Eur/kv.m`,
o susijęs rodiklis – `Būstų pirkimo-pardavimo sandorių skaičius`. Todėl tai nėra
skelbimų / pasiūlos kainų sluoksnis.

Tačiau pirminis administracinis kainų šaltinis (pvz., konkretus Registrų centro
duomenų produktas / atranka) vien iš viešo `Power BI` modelio **nenustatytas**.
Modelyje nerastas šaltinio metaduomuo, leidžiantis sąžiningai teigti
„Registrų centras“.

## Vienoda metodika visoms savivaldybėms?

**Dalinis PASS.**

Ataskaitos semantiniame sluoksnyje visoms 60 savivaldybių taikomas tas pats
`_measures.Vid. būsto sandorio kaina, Eur/kv.m` matas, tas pats 2024 m. filtras
ir ta pati lentelė. Tai patvirtina vienodą **reportavimo** metodiką.

Neužtenka įrodyti vienodą pirminę sandorių atranką, kelių objektų sandorių
tvarkymą, outlier taisykles ir kainos paskirstymą. Tam reikalinga galutinė
metodika / duomenų šaltinio aprašas.

## Papildoma semantinio modelio patikra

Po 4 psl. FAIL papildomai patikrintas visas viešos `Power BI` ataskaitos
`conceptualschema` ir reporto aprašas, kad nebūtų praleistas paslėptas
butų-daugiabučiuose kainos matas.

Rezultatas:
- `FactBPI` turi tik bendrą lauką `Vid būsto sandorio kaina, Eur/kv.m.` ir jo ankstesnių metų variantą;
- `_measures` turi tik bendrą `Vid. būsto sandorio kaina, Eur/kv.m` matą;
- `FactNacionaliniai` turi `Bendras butų daugiabučiuose skaičius`, tačiau neturi
  butų sandorių kainos EUR/m² lauko;
- reporto apraše nerasta nei 1 669 reikšmės, nei atskiro `Vidutinė butų kaina` /
  `Vidutinė buto kaina` mato.

Todėl nemokamo Smart Continent švieslentės kelio negalima „išgelbėti“ tiesiogiai
užklausiant kitą paslėptą matą. 2024 m. 1 669 Eur/m² butų kontrolė yra pateikta
tarpinių rezultatų pristatyme, bet jos savivaldybių duomenys į šį viešą semantinį
modelį neįkelti.

Pirminis 1 669 Eur/m² rodiklio administracinis šaltinis kol kas paliekamas **OPEN**.
Viešame `Power BI` modelyje nėra šaltinio metaduomens, leidžiančio jį patikimai
priskirti Registrų centrui, todėl tokio teiginio nedarome be atskiro metodikos
dokumento / šaltinio patvirtinimo.

## BI_1 bandymas atkurti butų kainą — CLOSED / FAIL

2026-10-02 atlikta atskira tiesioginė viešo Power BI modelio užklausa visoms 60
savivaldybių, vienu metu ištraukiant:

- `FactBPI.BI_1`;
- `FactBPI.Vid būsto sandorio  kaina, Eur/kv.m.`;
- `FactBPI.Vidutinis darbo užmokestis (neto)`.

Rezultatas yra tiksli tapatybė visose 60 savivaldybių:

`BI_1 = bendro būsto sandorio kaina EUR/m² / mėnesio neto VDU`.

Didžiausias absoliutus skirtumas tarp BI_1 ir šio perskaičiavimo = **0**.

Todėl BI_1 nėra nepriklausomas ar paslėptas butų kainos signalas. Jis tik perreiškia
tą patį bendro būsto kainos lauką.

Kryžminė patikra su oficialiu VDA S7R280 2024 m. daugiabučių butų EUR/m² etalonu
parodė, kad Smart Continent bendro būsto kaina yra mažesnė visuose šešiuose miestuose:

- Alytus: 592.14 vs 889.79 (-33.5%);
- Kaunas: 995.01 vs 1771.62 (-43.8%);
- Klaipėda: 1015.64 vs 1559.14 (-34.9%);
- Panevėžys: 586.48 vs 1030.03 (-43.1%);
- Šiauliai: 722.46 vs 1098.12 (-34.2%);
- Vilnius: 1753.19 vs 2639.03 (-33.6%).

Skirtumas nėra vienodas koeficientas, todėl bendro būsto kainos negalima paprastai
„kalibruoti“ į butų kainą.

Papildoma pilno `conceptualschema` inventorizacija nerado jokio kito savivaldybių
lygio butų / daugiabučių butų EUR/m² lauko. `FactNacionaliniai` turi nacionalinių
butų kiekių informaciją, bet ne savivaldybių butų sandorio kainas.

Failai:
- `research/smart-continent-bi1-sale-qa-2024.json`;
- `data/housing-sale-smart-continent-bi1-2024-diagnostic.csv`;
- `scripts/extract_smart_continent_bi1_sale_probe.mjs`;
- `scripts/parse_smart_continent_bi1_sale_probe.mjs`.

Bendras verdiktas sustiprintas iki:
**FAIL pagrindiniam butų kainų sluoksniui; viešame modelyje nėra reprodukuojamo
60 savivaldybių apartment-only kainų kelio.**

## Oficialus VDA S7R280 kontrolinis sluoksnis

Atskiras oficialus VDA ArcGIS EVP56 sluoksnis patvirtino 2024 m. daugiabučių butų
(`1123`) kainas EUR/m²:

- Alytaus m. sav. 889.79;
- Kauno m. sav. 1771.62;
- Klaipėdos m. sav. 1559.14;
- Panevėžio m. sav. 1030.03;
- Šiaulių m. sav. 1098.12;
- Vilniaus m. sav. 2639.03;
- Lietuvos Respublika 1684.64.

Tai yra stiprus oficialus būsimo RC sluoksnio QA etalonas, bet ne 10 apskričių
pagrindinis sluoksnis, nes serija apima tik 6 miestų savivaldybes + Lietuvą.

Failas:
`research/raw/vda-sale-big-cities/vda-sale-big-cities-2024-qa.json`.

## Santykis su mūsų metodika

Smart Continent švieslentė išlieka naudinga:

- 60 savivaldybių pilnumo kontrolei;
- bendro būsto rinkos signalų diagnostikai;
- savivaldybių sandorių apimčių sanity-check;
- `Power BI` agregavimo metodikos audito pavyzdžiui;
- būsimų RC duomenų kryžminei validacijai.

Ji **nenaudojama**:

- pagrindiniam 2024 m. butų EUR/m² sluoksniui;
- 10 apskričių butų kainoms skaičiuoti;
- 1 669 Eur/m² butų nacionalinei kontrolei reprodukuoti.

## A varianto priėmimo kriterijų rezultatas

1. faktinės / sandorių kainos – **PASS**;
2. vienoda semantinė metodika 60 savivaldybių – **PASS**, pirminė atranka – **OPEN**;
3. tikslūs skaitiniai duomenys – **PASS**;
4. tinkamas apskrities agregavimo svoris – sandorių skaičius yra, bet objektų tipas
   netinkamas – **FAIL pagrindiniam sluoksniui**;
5. 1 669 Eur/m² butų kontrolės reprodukcija – **FAIL**.

Bendras sprendimas: **FAIL pagrindiniam butų kainų sluoksniui.**

## Tolimesnis kelias

Pagal iš anksto sutartą metodiką po šio FAIL prioritetas pereina į
**Registrų centro RSi / individualios rinkos sandorių užklausos** kelią.

RC viešai aprašytas RSi produktas leidžia gauti registruotų NT sandorių duomenis
pagal individualią užklausą. Sutarties priede nurodomi laukai apima savivaldybę,
sandorio tipą, kainos tipą, sandorio sumą, vieneto kainą (patalpoms – Eur/m²),
objekto plotą, objekto tipą, paskirtį ir kitus atrankai reikalingus požymius.
Tai techniškai atitinka mūsų poreikį suformuoti 2024 m. butų faktinių sandorių
sluoksnį ir kontroliuoti atranką.

Jau išsiųsta atskira užklausa `rinkos.duomenys@registrucentras.lt`; iki atsakymo
RSi vieša dokumentacija naudojama tik techniniam duomenų modelio ir QA plano
parengimui.

## Šaltiniai

- Aplinkos ministerijos švieslentė:
  https://am.lrv.lt/lt/veiklos-sritys-1/busto-prieinamumas/savivaldybiu-busto-prieinamumo-indeksas/
- Aplinkos ministerijos vertinimo puslapis:
  https://am.lrv.lt/lt/veiklos-sritys-1/busto-prieinamumas/busto-prieinamumo-lietuvoje-didinimo-galimybiu-vertinimas/
- Smart Continent tarpinių rezultatų pristatymas:
  https://lntpa.lt/wp-content/uploads/2026/04/Tarpiniu-vertinimo-rezultatu-pristatymas.pdf
- Registrų centro RSi prieiga:
  https://www.registrucentras.lt/p/prisijungimai-prie-informaciniu-sistemu-posistemiu-ir-irankiu
- Registrų centro rinkos sandorių duomenų teikimo sutarties / individualios
  užklausos sąlygų viešas dokumentas:
  https://www.registrucentras.lt/bylos/dokumentai/Rinkos%20sandoriu%20duomenu%20teikimas%20su%20asmens%20duomen%C5%B3%20teikimu.JA.pdf
