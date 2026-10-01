# 2024 faktinių butų sandorių gardelių auditas

Šaltiniai:
- vartotojo pateiktas VDA / Registrų centro `ButuPirkimas.csv`;
- vartotojo pateiktas VDA `Grid1KmSq.csv`.

## Join patikra
- ButuPirkimas 2024 m. eilučių: 146.
- Grid1KmSq eilučių: 66 251.
- 2024 m. `sq_grid_id._id` susieta su gardelių lentele: 146/146.
- 2024 m. aprėpta 33 savivaldybės.
- 2024 m. tiesioginių įrašų nėra Telšių ir Tauragės apskritims.

## Svarbi metodinė korekcija
Pirminė idėja apskrities kainą skaičiuoti tik kaip objektų skaičiumi svertą
`vid_buto_verte` vidurkį nėra pakankamai robustiška.

Utenos apskrityje vienos gardelės 2024 m. duomenys turi:
- min įsigytą plotą 0,03 m²;
- gardelės `vid_buto_verte` = 14 591 EUR/m²;
- `buto_verte_p50` = 727 EUR/m²;
- `buto_verte_p90` = 56 667 EUR/m².

Dėl to Utenos apskrities svertas vidurkis pakyla iki 3 085 EUR/m²,
nors objektų skaičiumi svertas gardelių p50 proxy yra tik 370 EUR/m².

Išvada: `vid_buto_verte` negali būti vienintelis pagrindinis apskrities rodiklis.
Reikia robustiškos taisyklės prieš publikavimą.

## Preliminarūs 2024 rezultatai
Žr. `data/housing-sale-county-2024-preliminary.csv`.

Kokybės žymos:
- A: >=50 objektų ir >=10 gardelių;
- B: >=20 objektų;
- C: maža imtis;
- C-outlier: reikšmingas vidurkio iškraipymas anomalinių gardelių;
- no_2024_data: 2024 m. tiesioginių įrašų nėra.

## Tolimesnė robustiškumo kryptis
Prieš pasirenkant galutinį apskrities kainos rodiklį reikia palyginti bent:
1. svertą `vid_buto_verte` vidurkį;
2. svertą gardelių `buto_verte_p50` proxy;
3. trim/winsorized `vid_buto_verte`;
4. sandorių / įsigyto ploto santykio rekonstrukciją ten, kur ji prasminga;
5. 3–5 metų slenkantį langą mažos imties apskritims.

Negalima automatiškai užpildyti Telšių ir Tauragės 2024 m. reikšmių senesniais metais be aiškios laikotarpio žymos.
