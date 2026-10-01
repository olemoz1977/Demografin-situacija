# Faktinių butų sandorių duomenų prieinamumo žemėlapis

Data: 2026-10-02

## Esminė išvada

Techninė problema „ar faktiniai sandorių duomenys egzistuoja?“ išspręsta: egzistuoja.
Problema yra jų VIEŠO ir vienodai agreguojamo 60 savivaldybių sluoksnio prieinamumas.

## Įrodymai

### 1. Valstybės duomenų valdymo sluoksnyje yra detalūs NTR sandorių laukai

Oficialiame VDA teisės akte nurodoma, kad NTR pirkimo–pardavimo ir nuomos sandorių duomenys
apima sandorio datą, sumą, kainos tipą, objekto ID, įsigytą dalį, objekto / įsigytą plotą,
kitų objektų skaičių sandoryje, sandorio vieneto kainą ir masinio vertinimo vertę.

Šaltinis:
https://e-tar.lt/rs/actualedition/5fb1d40067c511eb9dc7b575f08e8bea/hbkRsOHnGP/

### 2. Registrų centro komercinė RSi paslauga teikia mums reikalingus laukus

RC Rinkos sandorių duomenų teikimo specifikacijoje yra vieneto kaina, objekto plotas,
įsigytas plotas, dalis, objektų skaičius sutartyje, objekto tipas, paskirtis ir kiti laukai.

Šaltinis:
https://www.registrucentras.lt/bylos/dokumentai/ntr/Rinkos%20sandoriu%20duomenu%20teikimas%20su%20asmens%20duomen%C5%B3%20teikimu%20%28juridiniams_asmenims%29.pdf

### 3. Atviras 1 km gardelių rinkinys yra labai siaura atranka

2024 m. pilname dataset 2559 snapshot turime 474 butų objektus, o Registrų centro
nacionalinėje 2024 m. statistikoje – 27 330 parduotų butų. Šių skaičių negalima interpretuoti
kaip tiesioginio formalaus aprėpties procento dėl skirtingų atrankų, bet dydžių skirtumas
patvirtina, kad 2559 nėra visos rinkos sluoksnis.

### 4. Tiksliai mūsų pageidauto atviro agregato jau buvo prašyta

2022 m. Registrų centrui pateikti poreikiai:
- vidutinė daugiabučio buto rinkos kaina Eur/m² visoms 60 savivaldybių;
- gyvenamojo būsto pirkimo–pardavimo sandorių skaičius 60 savivaldybių;
- butų pardavimo ir nuomos kainų vidurkiai Eur/m² 60 savivaldybių.

Visi trys pažymėti „Atmestas“.

Šaltinis:
https://data.gov.lt/requests/submitted/?date_from=2022-08-01&date_to=2022-08-31&selected_facets=organization_exact%3A9

2026 m. kovo 31 d. pateiktas naujas poreikis atverti faktines NTR butų sandorių kainas
Vilniaus miestui 2020–2025 m., vadinasi viešo mikrolygmens kainų trūkumas tebėra aktualus.

## Kandidatų matrica

| Šaltinis | Faktiniai sandoriai | 60 sav. | 2024 | Nemokamas | Struktūrinis eksportas | Statusas |
|---|---|---:|---:|---:|---:|---|
| VDA 2559 1 km gardelės | Taip, siaura atranka | Neadekvatu | Taip | Taip | Taip | QA |
| AM/Smart Continent švieslentė | Tikėtina; metodika dar tikrinama | Taip | Taip | Taip | Dar reikia išgauti | PRIORITETAS |
| RC RSi | Taip | Taip | Taip | Ne / sutartinė | Taip | Laukiam kainos |
| RC REGIA zonų pardavimai | Taip, filtruota | Galimai nacionalinis | Neaišku istorijai | Viešas žemėlapis | Neaišku | VALIDACIJA |
| RC masinis vertinimas | Modelis iš sandorių | Taip | Modelio laikotarpis | Taip | Dalinai | B planas |

## Artimiausias veiksmas

Nebebandyti „išspausti“ pilnos rinkos iš dataset 2559. Pirmiausia gauti AM/Smart Continent
švieslentės 4 psl. pradinių duomenų skaitinį eksportą ir patikrinti kainų šaltinį. Jei eksportas
PASS – tai tampa nemokamu A varianto kainų sluoksniu. Jei FAIL – RC RSi lieka tiesioginiu
atsarginiu keliu.
