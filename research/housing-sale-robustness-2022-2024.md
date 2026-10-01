# 2022–2024 robustumo analizė — atšaukta iki pilno snapshot

Statusas: metodinė idėja išlieka, skaitiniai rezultatai atšaukti.

Pirminis 2022–2024 skaičiavimas buvo atliktas iš nepilno `ButuPirkimas.csv` API puslapio.
Faile aptiktas `_page.next` cursor, todėl tai ne visas rinkinys.

Dėl to:
- jokie ankstesni 10 apskričių sandorių skaičiai ar €/m² įverčiai nenaudojami;
- Telšių / Tauragės tariamas duomenų trūkumas negali būti interpretuojamas kaip realus rinkos trūkumas;
- robustumo metodika (vidurkis, p50, sverta mediana, anomalijų apsauga) bus pakartota tik su pilnu snapshot.

Patvirtinta metodinė kryptis:
- pagrindiniam kainų sluoksniui naudoti faktinius VDA / Registrų centro sandorius;
- visada tikrinti pilną API puslapiavimą;
- saugoti source row count, page count, latest year ir cursor completion QA;
- nepublikuoti, jei snapshot nepilnas.
