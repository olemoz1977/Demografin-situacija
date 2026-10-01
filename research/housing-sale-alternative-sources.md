# Alternatyvūs faktinių butų pardavimo kainų šaltiniai

Data: 2026-10-02

## Prioritetų tvarka po 2026-10-02 audito

1. **Registrų centro agreguotas / individualiai parengtas 2024 m. butų sandorių sluoksnis** –
   dabartinis pirmas pasirinkimas po Smart Continent 4 psl. FAIL. Laukiamas RC atsakymas į
   2026-10-01 užklausą dėl visų 60 savivaldybių, EUR/m², kainos ir publikavimo sąlygų.
2. **Aplinkos ministerijos / Smart Continent švieslentė** – naudoti QA / diagnostikai.
   4 psl. sėkmingai išgautas, bet jo 2024 m. rodiklis yra bendras būsto, ne butų sluoksnis:
   37 009 sandoriai ir 557 Eur/m²; todėl pagrindiniam vardikliui FAIL.
3. **Registrų centro masinio vertinimo dokumentai** – validacijai / B planui, bet ne
   tiesioginis faktinių 2024 m. sandorių kainų pakaitalas.
4. **Finansų ministerijos savivaldybių NT apžvalgos** – sandorių skaičiaus ir aprėpties QA.

## 1. Aplinkos ministerijos / Smart Continent savivaldybių būsto prieinamumo indeksas

2026-09-01 Aplinkos ministerija viešai paskelbė „Savivaldybių būsto prieinamumo indeksą“
ir duomenų švieslentę. Oficialus puslapis nurodo, kad:
- indeksas yra 2025–2026 m. Smart Continent atlikto Būsto prieinamumo vertinimo dalis;
- šiuo metu naudojami 2022–2024 m. duomenys;
- galima filtruoti metus, regioną, savivaldybių grupę ir konkrečią savivaldybę;
- 4 švieslentės puslapyje pateikiami indekso skaičiavimui naudoti pradiniai duomenys.

Tai buvo stipriausias NEMOKAMAS kandidatas, tačiau 2026-10-02 techninis auditas jį
atmetė kaip pagrindinį butų kainų sluoksnį. 4 psl. apima visas 60 savivaldybių, bet
naudoja bendrą `Vid. būsto sandorio kaina, Eur/kv.m` matą, kurio nacionalinė 2024 m.
reikšmė yra 557 Eur/m², o sandorių suma 37 009. Tai neatitinka butų kontrolės
(1 669 Eur/m² ir apie 27 330 sandorių).

Oficialus puslapis:
https://am.lrv.lt/lt/veiklos-sritys-1/busto-prieinamumas/savivaldybiu-busto-prieinamumo-indeksas/

Vertinimo puslapis:
https://am.lrv.lt/lt/veiklos-sritys-1/busto-prieinamumas/busto-prieinamumo-lietuvoje-didinimo-galimybiu-vertinimas/

Tarpinių rezultatų pristatyme:
- pateikiami būstų pirkimo–pardavimo sandorių skaičiai pagal savivaldybes;
- pateikiami atskiri 2024 m. butų daugiabučiuose ir individualių namų sandorių skaičiai;
- pateikiamas žemėlapis „Vidutinė butų kaina už 1 kv. m“ pagal savivaldybes;
- Lietuvos 2024 m. kontrolinė vidutinė buto kaina = 1 669 Eur/m².

Pristatymas:
https://lntpa.lt/wp-content/uploads/2026/04/Tarpiniu-vertinimo-rezultatu-pristatymas.pdf

Viešojo pirkimo aprašymas papildomai patvirtina, kad vertinimo paslaugų dalis buvo
„Integralaus aktualių duomenų modelis“, skirtas strateginiam dokumentui rengti ir vėliau
aktualizuoti. Tai svarbus argumentas švieslentę traktuoti kaip rimtą duomenų šaltinio
kandidatą, bet nepakanka kainų metodikai įrodyti.

Smart Continent taip pat oficialiai prašė 2024/2025 m. savivaldybių lygmens administracinių
pajamų duomenų būtent šiam vertinimui:
https://data.gov.lt/requests/14511/

Statusas: **FAIL pagrindiniam butų kainų sluoksniui; QA ONLY.**
Detalus auditas: `research/smart-continent-housing-source-audit.md`.

## 2. Registrų centro Rinkos sandorių duomenų teikimas (RSi)

Registrų centro dokumentuose nurodyta, kad galima:
- ieškoti pagal savivaldybę (-es);
- filtruoti pagal sandorio datą;
- pasirinkti sandorio objektą „butai“;
- gauti sandorio sumą, paskirstytą kainą, vieneto kainą EUR/m², plotą,
  įsigytą plotą, objektų skaičių sutartyje ir kitus laukus;
- sudėtingos individualios užklausos duomenis gauti Excel formatu.

Svarbus pranašumas: ši paslauga gali pateikti ir kelių objektų sandorių požymius bei
„paskirstytą kainą“, kai ji prieinama.

### Svarbi RSi apimties kliūtis

Vieša RC sutartis rodo, kad standartinė „nesudėtinga“ internetinė paieška pirmiausia
parodo kriterijus atitinkančių sandorių **kiekį**, tačiau mokamas eksportas pateikia tik
iki **25** arba **50 naujausių** sandorių. Jei atitikmenų daugiau, gaunamas ne visas
laikotarpis, o naujausi įrašai.

„Sudėtingos“ individualios užklausos priede taip pat nurodyta, kad jei kriterijus atitinka
daugiau nei 25 sandoriai, pateikiami naujausi sandoriai. Todėl standartinis RSi eksportas
nėra vieno žingsnio būdas gauti visus 2024 m. Lietuvos butų mikrolygmens sandorius.

Tai pakeičia praktinį prioritetą:
- **pirmenybė** – RC individualiai parengtas agreguotas / nuasmenintas 60 savivaldybių
  failas, kurio jau paprašyta el. paštu;
- standartinį RSi naudoti mikrolygmens QA / atrankos metodikai arba tik jei RC pasiūlys
  ekonomiškai ir teisiškai tinkamą pilnos imties gavimo būdą;
- neplanuoti brangaus visos rinkos atkūrimo daugybe 25/50 eilučių užklausų, kol nežinoma
  paslaugos kaina ir publikavimo teisės.

Šaltiniai:
- https://www.registrucentras.lt/bylos/dokumentai/ntr/Rinkos%20sandoriu%20duomenu%20teikimas%20su%20asmens%20duomenimis%20%28fiziniams_asmenims%29.pdf
- https://www.registrucentras.lt/sanduzk/jsp/login.jsp

Statusas: **PRIORITETINIS KELIAS, LAUKIAMA RC ATSAKYMO.** 2026-10-01 Registrų centrui
jau išsiųsta užklausa dėl 2024 m. duomenų visoms 60 savivaldybių, kainos, formato ir
viešo agreguotų rezultatų publikavimo sąlygų. Vieša RSi specifikacija patvirtina, kad
techniniame duomenų modelyje egzistuoja mums reikalingi laukai, bet standartinės
25/50 įrašų išdavimo ribos neleidžia laikyti RSi savitarnos pilnos imties eksportu.

## 3. Registrų centro masinio vertinimo dokumentai

Visoms savivaldybėms viešinamos nekilnojamojo turto masinio vertinimo ataskaitos ir
lyginamojo metodo modeliai. Tai oficialus, visą Lietuvą apimantis šaltinis, paremtas rinkos
sandoriais, tačiau jo rezultatas yra masinio vertinimo / vidutinės rinkos vertės modelis,
o ne faktinių metų sandorių kainų agregatas.

Naudojimas:
- validacijai ir jautrumo analizei — taip;
- pagrindiniam „faktinių pardavimo kainų“ sluoksniui — tik jei nepavyksta gauti aukščiau
  esančių šaltinių ir metodika aiškiai pervadinama.

## 4. Finansų ministerijos savivaldybių NT apžvalgos

2025 m. paskelbtose savivaldybių apžvalgose naudojami Registrų centro nekilnojamojo turto
rinkos sandorių duomenys. Jos pateikia metinius parduotų butų skaičius pagal savivaldybes
(2021–2025*), todėl yra labai geras nepriklausomas aprėpties QA.

Patvirtinta:
- Tauragės r. sav. 2024: 186 butai;
- Telšių r. sav. 2024: 222 butai.

Nacionalinis kontrolinis taškas iš Registrų centro masinio vertinimo ataskaitos:
- 2024 m. Lietuvoje parduota 27 330 butų.

Todėl atviro gardelių rinkinio 2559 2024 m. 474 objektai negali būti interpretuojami kaip
visa rinka. Paprastas 474 / 27 330 santykis yra apie 1,7 %, tačiau tai nėra formalus
„coverage rate“, nes šaltinių atrankos apibrėžimai skiriasi.

## Darbo seka

1. Smart Continent 4 psl. – **DONE / FAIL** pagrindiniam butų sluoksniui.
2. Registrų centro agreguota 60 savivaldybių užklausa – **WAITING RESPONSE**.
3. Iki atsakymo – parengti tikslią RC gavinių QA ir agregavimo metodiką, kad gautą XLSX/CSV
   būtų galima tikrinti automatiškai.
4. Jei RC pasiūlo tik standartinį RSi 25/50 sandorių režimą, pirmiausia įvertinti kainą,
   pilnos imties atkūrimo galimybę ir publikavimo apribojimus; nepirkti aklai.
5. Gardelių rinkinį 2559 naudoti tik kaip papildomą faktinių sandorių / anomalijų QA.


## Atvirų duomenų rinkos patikra – kodėl šaltinį rasti sunku

Lietuvos atvirų duomenų portale jau buvo pateikti beveik identiški poreikiai mūsų uždaviniui:
- 2022-08-12: „Vidutinė buto daugiabučiame name rinkos kaina savivaldybėse“ –
  60 savivaldybių, Eur/m², 2019–2021 ir kasmetinis atnaujinimas; būsena „Atmestas“;
- 2022-08-12: gyvenamojo būsto pirkimo–pardavimo sandorių skaičius visose 60 savivaldybių;
  būsena „Atmestas“;
- 2022-08-10: butų pardavimo ir nuomos kainų vidurkiai Eur/m² pagal 60 savivaldybių;
  būsena „Atmestas“.

Šaltinis:
https://data.gov.lt/requests/submitted/?date_from=2022-08-01&date_to=2022-08-31&selected_facets=organization_exact%3A9

2026-03-31 portale pateiktas naujas poreikis atverti faktines Registrų centro butų sandorių
kainas (Vilnius, 2020–2025) mašininio mokymosi / rinkos skaidrumo tikslams. Tai rodo, kad
faktinių sandorių kainų poreikis tebėra aktualus ir nėra paprastai išspręstas vienu viešu
atviru rinkiniu.

Šaltinis:
https://data.gov.lt/requests/submitted/?selected_facets=jurisdiction_exact%3A2

## Valstybės duomenų ežero faktas

Oficialiame VDA teisės akte nurodyta, kad į Valstybės duomenų valdysenos sistemą iš Registrų
centro NTR teikiama daug detalesnė pirkimo–pardavimo ir nuomos sandorių informacija, tarp jos:
sandorio identifikatorius, data, kainos tipas, sandorio suma, objekto identifikatorius,
įsigyta dalis, objekto ir įsigytas plotas, kitų objektų skaičius sandoryje, sandorio vieneto
kaina, masinio vertinimo vertė ir objektų paskirties požymiai.

Teisinis šaltinis:
https://e-tar.lt/rs/actualedition/5fb1d40067c511eb9dc7b575f08e8bea/hbkRsOHnGP/

Tai patvirtina, kad administraciniame valstybės duomenų sluoksnyje egzistuoja beveik visi
laukeliai, kurių reikia mūsų 2024 m. savivaldybių kainų agregacijai. Tačiau tai savaime
NEREIŠKIA, kad šie mikrolygmens duomenys yra viešai prieinami kaip atviri duomenys.

## REGIA – papildomas dabartinės rinkos kontrolinis šaltinis

Trečiosios šalies analizė, remdamasi Registrų centro REGIA sluoksniu, nurodo, kad REGIA
viešina verčių zonų butų pardavimų vidurkius slenkančiam 12 mėn. laikotarpiui. Nurodomi
RC atrankos filtrai (20–300 m², ne dalinis įsigijimas, baigti objektai, kainų ribos ir kt.)
ir reikšmė nerodoma, kai zonoje mažiau nei 5 pardavimai.

Šaltinis / metodikos aprašymas:
https://topvieta.lt/kaip-skaiciuojame

Statusas: VALIDACIJOS LEAD, ne pagrindinis 2024 m. šaltinis, nes:
- viešoje paieškoje patvirtintas slenkantis dabartinis 12 mėn. langas, ne 2024 m. istorinis;
- kol kas nerastas oficialus RC dokumentas su pilna REGIA sluoksnio eksporto / archyvo
  specifikacija;
- trečiosios šalies puslapis naudojamas tik kaip nuoroda į galimą RC sluoksnį, ne kaip
  mūsų galutinis duomenų šaltinis.
