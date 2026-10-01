# Pilno ButuPirkimas snapshot gavimas

2026-10-01 aptikta, kad tiesioginis vartotojo parsisiųstas CSV turėjo `_page.next`,
todėl buvo tik viena Spinta API puslapio dalis.

Spinta API puslapiuoja duomenis cursor principu:
`limit(N)&page("BASE64_CURSOR")`.

Tam pridėtas:
`scripts/fetch_spinta_all.py`

Jis:
1. siunčia JSON užklausą;
2. po kiekvieno puslapio paima `_page.next`;
3. kartoja iki `next == null`;
4. tik tada sujungia viską į vieną CSV;
5. sukuria `.meta.json` su puslapių ir eilučių skaičiumi bei metų aprėptimi;
6. turi apsaugą nuo pasikartojančio cursor.

Numatytoji komanda:
```
python scripts/fetch_spinta_all.py
```

Tik `pagination_complete: true` snapshot gali būti naudojamas apskričių NT kainų analizei.

Šaltinio dokumentacija:
- Spinta API / Lietuvos atvirų duomenų saugykla;
- vieši pavyzdžiai patvirtina `page("cursor")` cursor sintaksę.
