# User-provided VDA ButuPirkimas export audit — 2026-10-01

Source supplied by user from VDA / Registrų centras ButuPirkimas endpoint.

Observed export characteristics:
- JSON object with `_data` array.
- 4,630 aggregate rows.
- 57 fields.
- Earliest `data_nuo`: 1998-01-01.
- Latest `data_nuo`: 2024-01-01.
- 2024 rows: 146.
- No 2025 rows are present in this export.

Key usable fields confirmed:
- `sq_grid_id._id`
- `data_nuo`, `data_iki`
- `sandoriu_sk`
- `objektu_sk`
- `vid_sandorio_verte`
- `vid_isigytas_plotas`
- `vid_buto_verte`
- `buto_verte_p10 ... p90`
- valuation fields

Interpretation:
- The source structure fully matches the planned transaction-grid pipeline.
- This export is sufficient to validate the transformation logic and to compute a 2024 county layer once Grid1KmSq mapping is supplied.
- It is NOT sufficient for a 2025 transaction layer, because the latest period in the received export is 2024.

Next required file:
Grid1KmSq export containing at minimum:
- _id
- grid_id
- sav_pav
- sav_kodas

Target page:
https://data.gov.lt/datasets/2047/data/Grid1KmSq/?select(_id,grid_id,x_centroid,y_centroid,sav_pav,sav_kodas,geometrija)

Decision rule:
- use 2025 transaction data if an updated source export can be obtained;
- otherwise do not silently label 2024 sales prices as 2025. A 2024 transaction baseline may be used only with an explicit period label or after a justified update factor is separately modelled and sensitivity-tested.


## Grid1KmSq eksporto patikra
Vartotojo pateiktame `Grid1KmSq.csv` taip pat aptiktas neužbaigtas `_page.next` cursor.
Todėl 66 251 eilučių failas negali būti laikomas formaliai pilnu Spinta snapshot, net jei jame matomos visos 60 savivaldybių.

Taisyklė suvienodinta abiem šaltiniams:
- `ButuPirkimas` ir `Grid1KmSq` turi būti parsisiųsti iki puslapio be `_page.next`;
- tik tada leidžiamas teritorinis agregavimas;
- pipeline dabar blokuoja abu nepilnus eksportus.


## Pakartotinis vartotojo eksportas — 2026-10-01 vakaras
Pakartotinai atsisiųstas failas patikrintas kaip tikras CSV:
- failo dydis: 2 469 147 baitai;
- 4 630 duomenų eilučių;
- 58 stulpeliai, įskaitant `_page.next`;
- `_page.next` turi vieną neužbaigtą cursor;
- naujausias `data_nuo`: 2024-01-01;
- 2024 m. eilučių šiame puslapyje: 146;
- `_id` unikalūs 4 630 / 4 630.

Išvada: pakartotinis atsisiuntimas vis tiek yra tik vienas Spinta puslapis, ne pilnas rinkinys.


## Svarbi korekcija po antro puslapio bandymo
2026-10-01 vartotojas atidarė `page("cursor")` tęsinį ir atsisiųstas CSV turėjo tik antraštes, be duomenų eilučių.

Tai pakeičia ankstesnę interpretaciją:
- `_page.next` buvimas paskutinėje CSV duomenų eilutėje NEREIŠKIA, kad egzistuoja dar vienas netuščias puslapis;
- Spinta CSV formate cursor gali būti pateikiamas ir paskutiniame netuščio puslapio įraše;
- tuščias sekantis puslapis yra end-of-data patvirtinimas.

Todėl 4 630 eilučių `ButuPirkimas.csv` šiuo metu laikomas pilnu šio endpointo snapshot (1998–2024), o ankstesnė pastaba „nepilnas vieno puslapio eksportas“ atšaukiama.

Tačiau lieka atskiras DUOMENŲ APRĖPTIES klausimas: 2024 m. snapshot sudaro tik 516 sandorių / 474 objektai ir neturi 2024 m. eilučių Telšių bei Tauragės apskritims. Tai reikia aiškintis su duomenų teikėju prieš naudojant kaip visos rinkos reprezentatyvų apskričių kainų sluoksnį.
