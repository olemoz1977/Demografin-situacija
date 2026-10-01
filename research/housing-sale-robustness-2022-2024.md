# 2022–2024 robusti faktinių butų sandorių bazė

Šaltiniai:
- vartotojo pateiktas VDA / Registrų centro `ButuPirkimas.csv`;
- vartotojo pateiktas VDA `Grid1KmSq.csv`.

## Kodėl nebeužtenka vien 2024 m.
2024 m. daliai apskričių imtis per maža arba jos visai nėra.
Todėl einamasis tyrimo etalonas skaičiuojamas iš 2022–2024 m. lango.

## Pagrindiniai diagnostiniai rodikliai
Kiekvienai apskričiai skaičiuojami trys kainos rodikliai:
1. objektų skaičiumi svertas gardelių `vid_buto_verte` vidurkis;
2. objektų skaičiumi svertas gardelių `buto_verte_p50` vidurkis;
3. objektų skaičiumi sverta gardelių `buto_verte_p50` mediana.

Trečiasis yra robustiškiausias kaip diagnostika nuo anomalinių gardelių,
bet jo dar nelaikome automatiškai galutine apskrities rinkos kaina.

## 2022–2024 aprėptis
- Vilniaus: 247 objektai / 117 gardelių — A.
- Kauno: 341 / 113 — A.
- Klaipėdos: 23 / 18 — B.
- Šiaulių: 421 / 74 — A.
- Panevėžio: 300 / 68 — A.
- Alytaus: 180 / 54 — A.
- Marijampolės: 86 / 13 — B.
- Utenos: 59 / 19 — B, tačiau būtina outlier apsauga.
- Telšių: 5 / 4, tik 2022–2023 — C-SPARSE.
- Tauragės: 2022–2024 tiesioginių įrašų nėra; paskutinis rastas laikotarpis — 2021.

## Utenos anomalija
Svertas gardelių vidurkis = ~1121 EUR/m², o svertas gardelių p50 vidurkis = ~366 EUR/m²
ir sverta p50 mediana = ~302 EUR/m². Tai patvirtina, kad dalinių įsigijimų / labai mažo
ploto sandoriai gali smarkiai iškraipyti `vid_buto_verte`.

## Dabartinis sprendimas
- 2022–2024 langas naudojamas kaip QA ir modelio bazė 8 apskritims.
- Telšių ir Tauragės nenaudojamos galutiniam 10 apskričių reitingui be papildomo sprendimo.
- Galutinei kainai reikia robustiško filtro arba patikimo išorinio kalibravimo, ypač mažų imčių regionams.
- `main` nekeisti.
