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
