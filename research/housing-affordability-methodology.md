# Jaunos poros būsto įperkamumas pagal apskritis — metodika

Statusas: research / feature branch, nepublikuota.

## Tikslinis klausimas
Kiek būsto kvadratinių metrų per vienerius metus teoriškai atitinka dviejų 25–30 m. visą mėnesį dirbančių žmonių grynosios darbo pajamos, atėmus 12 mėn. 1 kambario buto nuomą?

Pirminis noras buvo rezultatą pateikti pagal 10 Lietuvos apskričių. 2026-10-01 atliktas šaltinių auditas parodė, kad oficialūs VDA būsto kainų ir nuomos rodikliai tokio geografinio detalumo nepateikia.

## Pagrindinė formulė
m²_per_year = ((2 × monthly_net_income_25_30 × 12) − annual_rent) / sale_price_eur_m2

Rodiklis yra santykinis būsto įperkamumo indeksas, o ne realiai per metus sutaupoma suma. Maistas, transportas, komunaliniai mokesčiai, kredito sąlygos ir kitos išlaidos neįtraukiamos.

## Pajamų sluoksnis
Patikrintas nacionalinis orientyras:
- Sodra, 2025 m. lapkritis: 25–30 m. visą mėnesį dirbusių apdraustųjų vidutinės darbo pajamos = 2 516 EUR bruto / 1 535 EUR neto.
- Šaltinis: https://sodra.lt/wp-content/uploads/2026/02/20260224_Sodra_2025-4-ketvircio-darbo-pajamu-apzvalga.pdf

Teritorinis orientyras:
- 2025 m. IV ketv. vidutinis neto darbo užmokestis pagal 10 apskričių saugomas faile data/housing-affordability-input.json.
- Tai visų darbuotojų, o ne tik 25–30 m. grupės rodiklis.
- Kol nėra tiesioginio amžius × apskritis pjūvio, jaunos poros pajamas galima tik modeliuoti ir tai turi būti aiškiai pažymėta.

## Oficialus būsto pirkimo kainų šaltinis — VDA
VDA rodiklis „Būsto pirkimo–pardavimo vidutinės kainos“:
- remiasi Registrų centro Nekilnojamojo turto registro ir Sandorių duomenų bazių duomenimis;
- yra faktinių pirkimo–pardavimo sandorių rodiklis;
- skelbiamas šalies mastu ir 6 miestų savivaldybėms: Vilniaus, Alytaus, Kauno, Klaipėdos, Panevėžio ir Šiaulių;
- apskričių duomenų nėra;
- laikotarpis nuo 2017 m., metinis.

Metaduomenys:
https://osp.stat.gov.lt/documents/10180/5118910/B%C5%ABsto%2Bpirkimo-pardavimo%2Bvidutin%C4%97s%2Bkainos%2B%5BLT%5D%2B155070000.html

Išvada: VDA pirkimo kainų serija labai patikima, bet 10 apskričių palyginimui neužtenka.

## Oficialus butų nuomos šaltinis — VDA
VDA rodiklis „Butų nuomos vidutinės metinės kainos“:
- skelbiamas tik 5 miestų savivaldybėms: Vilniaus, Kauno, Klaipėdos, Panevėžio ir Šiaulių;
- matavimo vienetas: EUR/m² per metus;
- apskaičiuojamas iš NT agentūrų ir internetinių portalų kainų, naudojamas 3 mėn. slenkantis vidurkis;
- apskričių ir kitų 5 apskričių centrų oficialios serijos nėra;
- laikotarpis nuo 2019 m., metinis.

Metaduomenys:
https://osp.stat.gov.lt/documents/10180/5118910/But%C5%B3%2Bnuomos%2Bvidutin%C4%97s%2Bmetin%C4%97s%2Bkainos%2B%5BLT%5D%2B163640000.html

GIS:
https://www.arcgis.com/apps/dashboards/3fba56c8042649aabbb5fc85329b2f70

## Geografinio palyginimo sprendimo taisyklė
Negalima vadinti 10 apskričių rodiklio „oficialiu apskrities vidurkiu“, jei NT sluoksnis paremtas tik apskrities centro miestu.

Tolimesni galimi variantai:
A. 5 didžiųjų miestų griežtai oficialus palyginimas — metodologiškai stipriausias, bet ne 10 apskričių.
B. 10 apskričių centrų rinkos modelis — Vilnius, Kaunas, Klaipėda, Šiauliai, Panevėžys, Alytus, Marijampolė, Utena, Telšiai, Tauragė; vienas rinkos šaltinis likusiems miestams ir aiški žyma „apskrities centro modelis“.
C. 10 apskričių tikras agregatas — reikia surinkti savivaldybių lygmens NT kainas bei nuomą ir agreguoti pagal iš anksto nustatytus svorius; tai didžiausios apimties, bet tiksliausiai atitinka pradinį klausimą.

Kol nėra pasirinktas B arba C ir užpildyti visi duomenys, live puslapio nekeisti.

## Publikavimo taisyklė
Į main / live puslapį nekelti m² rodiklio, kol nėra:
- pilnos pasirinktos geografijos pajamų įvesties;
- pilnos pardavimo kainos;
- pilnos nuomos kainos;
- vienodo laikotarpio arba aiškiai pažymėto laikotarpių skirtumo;
- metodikos ir šaltinių pastabų;
- aiškiai atskirta „oficialu“ nuo „modeliuota“.

## Vizualo planas
Pagrindinis blokas:
„Kiek būsto m² per metus atitinka dviejų jaunų dirbančių žmonių pajamos po nuomos?“

Elementai:
- horizontali diagrama;
- lentelė: teritorija, 25–30 m. modelinė neto pajamų reikšmė, nuoma, EUR/m², m²/metus;
- duomenų kokybės žyma;
- metodikos paaiškinimas;
- atskiras „be nuomos“ etaloninis rodiklis kaip papildomas palyginimas.
