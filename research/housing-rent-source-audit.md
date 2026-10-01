# 2025 m. 1 kambario privataus nuomos pasiūlos šaltinių auditas

Statusas: research / nepublikuota.

## Problema
Viešai prieinamas oficialus VDA nuomos rodiklis neapima visų 10 apskričių ar jų savivaldybių.
Todėl privataus būsto nuomos sluoksniui reikia rinkos pasiūlos šaltinio.

Socialinio / savivaldybių būsto nuomos duomenys šiam tikslui NETINKA:
jie aprašo kitą rinkos segmentą ir negali būti naudojami kaip privataus 1 kambario buto nuomos pakaitalas.

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
1. Plėsti Utenos, Tauragės ir Telšių 2025 m. istorinę imtį.
2. Rinkti tokį patį to paties portalo kontrolinį mėginį didiesiems miestams ir
   palyginti jo medianą su VDA/Aruodas etalonu.
3. Jei paieškos indeksu nepavyks pasiekti N>=5 visiems mažiesiems miestams,
   reikės pasirinkti kitą nuomos geografinę metodiką — tai jau bus strateginis sprendimas.
