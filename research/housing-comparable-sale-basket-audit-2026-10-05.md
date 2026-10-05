# Palyginamo 2025 m. butų sandorių krepšelio auditas — 2026-10-05

Statusas: **PUBLIC FREE PATH CLOSED / RC AGGREGATE QUOTE NEEDED**

## Tikslas

Tarp apskričių lyginti ne abstraktų „50 m² būstą“, o palyginamą objektą:
- butas daugiabutyje;
- 2025 m. faktinis pirkimo–pardavimo sandoris;
- pradinis ploto krepšelis 45–55 m²;
- aiškiai kontroliuojamas pastato statybos laikotarpis;
- kiekvienai apskričiai žinomas sandorių N;
- kaina EUR/m², pageidautina mediana ir vidurkis.

## Viešo kelio auditas

### VDA / RC ButuPirkimas (dataset 2559)

Viešai skelbiamas sandorių sluoksnis:
- butų sandorių duomenis pateikia agreguotai 1×1 km gardelėmis;
- pateikia sandorio / buto ploto ir verčių agregatus;
- apima tik sandorius, kuriuose įsigytas vienas objektas;
- nepateikia sandorio lygio pastato statybos metų.

Todėl jis negali tiesiogiai pateikti:
`apskritis × 45–55 m² × statybos laikotarpis × 2025 EUR/m²`.

### NTR gyvenamųjų pastatų atviri duomenys

Viešai yra atskiras pastatų sluoksnis su:
- savivaldybe / teritorija;
- statybos metais;
- plotais ir kitais pastato atributais;
- kai kuriais energetiniais atributais.

Tačiau tai yra **pastatų fondo**, ne butų sandorių kainų sluoksnis.

### Kodėl geografinis sujungimas netinka publikacijai

Teoriškai sandorių gardelę būtų galima aprašyti pagal joje esančio pastatų fondo amžiaus
struktūrą. Tačiau toks sujungimas nepasako, kuriame konkrečiame pastate įvyko konkretus
sandoris. Todėl:
- negalima patikimai priskirti sandorio kainos statybos laikotarpiui;
- gardelės fondo amžiaus dalis ≠ parduotų butų amžiaus dalis;
- ypač naujos statybos koncentracijos vietose atsirastų sisteminė kompozicijos paklaida.

Verdiktas: **QA / diagnostikai galėtų būti įdomu, bet publication-grade palyginamam
krepšeliui NETINKA.**

## Minimalus RC mokamo agregato poreikis

Kad nereikėtų pirkti mikro duomenų, pakanka vieno agreguoto XLSX:

Filtras:
- metai = 2025;
- objektas = butas daugiabutyje;
- buto bendras plotas = 45–55 m²;
- faktiniai pirkimo–pardavimo sandoriai.

Grupavimas:
- apskritis (10);
- pastato statybos laikotarpio grupė.

Prašomos statybos laikotarpio grupės tik pirmajam N auditui:
- iki 1960;
- 1961–1990;
- 1991–2010;
- 2011–2025.

Laukai:
- apskritis;
- statybos laikotarpio grupė;
- sandorių skaičius N;
- validžių EUR/m² stebinių N;
- EUR/m² mediana;
- EUR/m² vidurkis.

Papildomas metodinis klausimas:
- kaip traktuojami sandoriai, kuriuose kartu perkami keli objektai;
- ar buto kainą galima atskirti nuo parkavimo / sandėliuko ir pan.;
- ar agregato publikavimas viešoje nekomercinėje analizėje leidžiamas.

## Kodėl pirmiausia prašome keturių amžiaus grupių

Nenustatome „1961–1990“ iš anksto. Pirmiausia reikia pamatyti N visose 10 apskričių.
Galutinis bendras statybos segmentas pasirenkamas tik po aprėpties audito.

## Strateginis vartas

RC jau patvirtino, kad individualiai parengtas agreguotas XLSX yra mokama paslauga,
pradedant maždaug nuo 60 EUR + PVM, o galutinė kaina priklauso nuo užklausos apimties.

Todėl toliau:
1. galima prašyti tik kainos pasiūlymo pagal aukščiau aprašytą minimalų scope;
2. pats užsakymas / apmokėjimas galimas tik po savininko sprendimo;
3. joks laiškas nesiunčiamas prieš tai parodžius tikslų tekstą ir gavus „siųsk“.
