# 2024 faktinių butų sandorių gardelių auditas

Statusas: SNAPSHOT UŽBAIGTAS; RINKOS APRĖPTIS DAR NEPATVIRTINTA.

Šaltiniai:
- vartotojo pateiktas VDA / Registrų centro `ButuPirkimas.csv`;
- vartotojo pateiktas VDA `Grid1KmSq.csv`.

## Snapshot pilnumas
`ButuPirkimas.csv` turi 4 630 duomenų eilučių. Paskutinėje eilutėje pateiktas `_page.next` cursor.
Pakartotinai užklausus tęsinį su `page("cursor")`, serveris grąžino tik CSV antraštę ir 0 duomenų eilučių.
Todėl šis 4 630 eilučių failas laikomas pilnu to endpointo snapshot.

Spinta CSV formatui cursor paskutinėje netuščio puslapio eilutėje yra normalus elgesys; pats cursor nėra nepilnumo įrodymas.

## JOIN patikra
- ButuPirkimas 2024 m. eilučių: 146.
- 2024 m. `sq_grid_id._id` susieta su Grid1KmSq: 146/146.
- 2024 m. aprėpta 33 savivaldybės ir 8 apskritys.
- Telšių ir Tauragės apskritims 2024 m. eilučių nėra.

## Kritinis aprėpties signalas
2024 m. snapshot sumos:
- sandoriai: 516;
- objektai: 474.

Tai yra per maža apimtis, kad be papildomo paaiškinimo rinkinį laikytume visos Lietuvos butų rinkos reprezentatyviu sluoksniu.
Todėl A varianto kokybės taisyklė lieka galioti: kainų indeksas nepublikuojamas, kol duomenų teikėjas nepaaiškina rinkinio atrankos / aprėpties.

## 2024 diagnostika
Pagrindinis techninis pastebėjimas išlieka: `vid_buto_verte` gali būti smarkiai iškraipytas labai mažo įsigyto ploto / dalinio įsigijimo atvejų.
Utenos apskrityje vienos gardelės anomalija kelia svertą vidurkį iki ~3 085 EUR/m², kai robustesni p50 pagrindo rodikliai yra kelis kartus mažesni.

Todėl galutiniame metode būtina outlier apsauga ir p50 diagnostika.

`main` nekeisti.
