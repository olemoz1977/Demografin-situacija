# Pajamų modelis 2025-11

Šaltinis: „Sodra“, Gyventojų darbo pajamų apžvalga, 2025 m. IV ketvirtis.
Savivaldybių lentelės: 2025 m. lapkričio apdraustųjų skaičius ir vidutinės apdraustųjų pajamos.
https://sodra.lt/wp-content/uploads/2026/02/20260224_Sodra_2025-4-ketvircio-darbo-pajamu-apzvalga.pdf

## Tiesiogiai patikrinti nacionaliniai dydžiai
- 25–30 m. visą mėnesį dirbusių vidutinės pajamos: 2 516 EUR bruto / 1 535 EUR neto.
- 2025 m. lapkričio visą mėnesį dirbusių vidurkis: 2 407 EUR bruto.
- Savivaldybių lentelė pateikia vidutines apdraustųjų pajamas ir apdraustųjų skaičių.

## Modeliavimas
Kadangi viešame PDF nėra tiesioginio 25–30 m. × savivaldybė pjūvio, savivaldybės jaunimo bruto pajamos aproksimuojamos išlaikant savivaldybių santykinį pajamų lygį:

youth_gross_municipality = municipality_gross_all × (2516 / 2407)

Koeficientas = 1.045284...

Neto apskaičiuojamas pagal 2025 m. darbuotojo mokesčius:
- darbuotojo socialinio draudimo įmokos 19,5 %;
- GPM 20 %;
- 2025 m. NPD formulė pagal VMI.

Tai atkuria „Sodros“ nacionalinį 25–30 m. orientyrą: 2 516 bruto ≈ 1 535 neto.

Apskrities modelinė reikšmė = savivaldybių modelinių neto pajamų svertinis vidurkis, svoris — 2025 m. lapkričio apdraustųjų skaičius.

## Ribos
- Savivaldybių atlyginimų lentelė nėra tiesioginis 25–30 m. pjūvis.
- Apdraustųjų skaičius naudojamas kaip svoris, nes viešame pjūvyje nėra 25–30 m. dirbančiųjų skaičiaus pagal savivaldybes.
- Dėl to rezultatas yra modelinis teritorinis 25–30 m. pajamų įvertis, ne oficiali tiesioginė statistika.
