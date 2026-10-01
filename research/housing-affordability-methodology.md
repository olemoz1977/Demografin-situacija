# Jaunos poros būsto įperkamumas pagal apskritis — metodika

Statusas: research / feature branch, nepublikuota.

## Tikslinis klausimas
Kiek būsto kvadratinių metrų per vienerius metus teoriškai atitinka dviejų 25–30 m. visą mėnesį dirbančių žmonių grynosios darbo pajamos, atėmus 12 mėn. 1 kambario buto nuomą, pagal Lietuvos apskritis?

## Pagrindinė formulė
m²_per_year = ((2 × monthly_net_income_25_30 × 12) − (monthly_rent_1_room × 12)) / sale_price_eur_m2

Rodiklis yra santykinis būsto įperkamumo indeksas, o ne realiai per metus sutaupoma suma. Maistas, transportas, komunaliniai mokesčiai, kredito sąlygos ir kitos išlaidos neįtraukiamos.

## Pajamų sluoksnis
Pirmenybė: tiesioginiai 25–30 m. darbo pajamų duomenys pagal apskritį, jei patikimas pjūvis bus gautas.

Patikrintas nacionalinis orientyras:
- Sodra, 2025 m. lapkritis: 25–30 m. visą mėnesį dirbusių apdraustųjų vidutinės darbo pajamos = 2 516 EUR bruto / 1 535 EUR neto.
- Šaltinis: https://sodra.lt/wp-content/uploads/2026/02/20260224_Sodra_2025-4-ketvircio-darbo-pajamu-apzvalga.pdf

Patikrintas teritorinis orientyras:
- VDA 2025 m. IV ketv. vidutinis neto darbo užmokestis pagal apskritis yra saugomas faile data/housing-affordability-input.json.
- Tai visų darbuotojų, o ne tik 25–30 m. grupės rodiklis.
- Kol nėra tiesioginio amžius × apskritis pjūvio, šio rodiklio negalima pateikti kaip jaunos poros pajamų be aiškios modelinės korekcijos.

## Būsto pardavimo kainos
Tikslas: viena metodika visoms 10 apskričių.
Pageidaujama:
1. faktinių sandorių kaina EUR/m², jei gaunama patikimai ir vienodai visoms apskritims;
2. jei ne — vieno pasirinkto portalo pasiūlos medianinė/vidutinė EUR/m² kaina, aiškiai pažymint „pasiūlos kaina“.

Lietuvos banko PSBKI yra patikimas kainų pokyčio indeksas, tačiau viešai nepateikia 10 apskričių absoliučios EUR/m² kainos, todėl vien jo galutiniam apskričių palyginimui nepakanka.

## Nuoma
Tikslas: 1 kambario buto mėnesio nuomos kaina kiekvienoje apskrityje.
Naudojamas vienas nuoseklus šaltinis visoms apskritims.
Jeigu imtis maža, rezultatas turi būti pažymėtas kaip žemo patikimumo arba nerodomas.

## Publikavimo taisyklė
Į main / live puslapį nekelti apskričių m² rodiklio, kol nėra:
- 10/10 apskričių pajamų įvesties;
- 10/10 apskričių pardavimo kainos;
- 10/10 apskričių 1 kamb. nuomos kainos arba aiškios taisyklės dėl trūkstamos imties;
- vienodo laikotarpio arba aiškiai pažymėto laikotarpių skirtumo;
- metodikos ir šaltinių pastabų.

## Vizualo planas
Pagrindinis blokas:
„Kiek būsto m² per metus atitinka dviejų jaunų dirbančių žmonių pajamos po 1 kamb. buto nuomos?“

Elementai:
- horizontali 10 apskričių diagrama;
- lentelė: apskritis, 25–30 m. neto pajamos, 1 k. nuoma, EUR/m², m²/metus;
- duomenų kokybės žyma;
- metodikos paaiškinimas;
- atskiras „be nuomos“ Deloitte tipo etaloninis rodiklis tik kaip papildomas palyginimas.
