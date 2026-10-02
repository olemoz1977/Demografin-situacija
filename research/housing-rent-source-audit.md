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

## Didžiųjų miestų etalonas
Aruodas.lt istorinių tendencijų puslapiai pateikia aktyvių skelbimų pasiūlos kainų vidurkius
Vilniui, Kaunui ir Klaipėdai. 2025-12 1 kambario etalonai:
- Vilnius: 484 EUR/mėn.;
- Kaunas: 379 EUR/mėn.;
- Klaipėda: 371 EUR/mėn.

Aruodas aiškiai nurodo, kad tai yra pasiūlos, o ne sudarytų nuomos sutarčių kainos.
Šie dydžiai naudojami metodo validacijai, o ne kaip faktinių nuomos sandorių statistika.

## Mažesni miestai — istorinių skelbimų mėginys
Paieškos indeksuose pavyko patikrinti 2025 m. istorinius Skelbiu.lt 1 kambario butų
skelbimus Marijampolėje, Alytuje, Utenoje, Tauragėje ir Telšiuose.

Įtraukiami tik:
- 1 kambario butai;
- savarankiški butai, ne kambario nuoma;
- ilgalaikė nuoma arba skelbimas, kuriame ilgalaikė nuoma aiškiai leidžiama;
- nurodyta mėnesio kaina ir plotas;
- atnaujinimo data patenka į 2025 m.

Neįtraukiami:
- bendrabučio tipo kambariai su bendro naudojimo virtuve / san. mazgu;
- trumpalaikė nuoma, jei ilgalaikė nesiūloma;
- ieškančių išsinuomoti skelbimai;
- 2026 m. skelbimai;
- dubliuoti skelbimai.

Žr. `data/housing-rent-city-sample-2025.csv`.

## Dabartinė mėginio aprėptis
- Marijampolė: N=7, mediana 300 EUR/mėn. — C kokybė.
- Alytus: N=6, mediana 285 EUR/mėn. — C kokybė.
- Utena: N=4, mediana 225 EUR/mėn. — nepakankama.
- Tauragė: N=2, mediana 300 EUR/mėn. — nepakankama.
- Telšiai: N=3, mediana 250 EUR/mėn. — nepakankama.

Šie skaičiai dar NEGALI būti naudojami galutiniam 10 apskričių indeksui:
paieškos indeksas nėra pilna skelbimų duomenų bazė, o trijų miestų imtis per maža.

## Kokybės taisyklė
- N >= 10: B rinkos mėginys;
- 5 <= N < 10: C rinkos mėginys;
- N < 5: insufficient — galutinei teritorijos reikšmei nenaudoti.

## Tolimesnis darbas
1. Pirmenybė — rasti 2024/2025 m. vienodo krepšelio privataus nuomos šaltinį,
   kuris leidžia pagrįstai aprėpti visas savivaldybes arba bent visas 10 apskričių.
2. Jei tokio šaltinio nėra, plėsti vienodo portalo istorinę 1 kambario butų imtį
   visoms reikalingoms teritorijoms, o ne naudoti apskrities centrą kaip apskritį.
3. Utenos, Tauragės ir Telšių mėginį būtina didinti; N<5 lieka `insufficient`.
4. Didžiųjų miestų mėginį naudoti kaip kontrolę prieš Aruodas/VDA, ne kaip
   automatinį apskrities pakaitalą.
5. Smart Continent BI_3 paliekamas tik QA diagnostikai.
