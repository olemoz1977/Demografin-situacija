# get.data.gov.lt prieigos QA — 2026-10-01

Bandant automatizuoti pilną VDA / Registrų centro `ButuPirkimas` snapshot,
GitHub Actions runneris gavo HTTP 500 iš visų oficialių maršrutų:
- modelio JSON;
- modelio CSV;
- DCAT nurodyto pilno `:all/:format/jsonl` distribucijos kelio.

Buvo patikrinta:
- serverio numatytasis puslapio dydis;
- keli mažesni limitai;
- browser-like User-Agent / Referer;
- JSON ir CSV transportas;
- pilno DCAT JSONL distribucija.

Todėl šiuo metu klaida laikoma šaltinio / vartų prieinamumo problema, o ne
apskričių agregavimo algoritmo problema.

Papildomai atnaujinta užklausų sintaksė pagal dabartinę UDTS/Spinta dokumentaciją:
`_limit` ir `_page`.

Šaltiniai:
- https://docs.data.gov.lt/projects/spinta/lt/draft/agentas/udts-suderinamumas.html
- https://docs.data.gov.lt/projects/spinta/lt/draft/agentas/duomen%C5%B3-gavimo-testavimas.html

Taisyklė:
- nepilni vartotojo eksportai saugiai naudojami tik schemos / JOIN validacijai;
- statistiniai teritoriniai agregatai skaičiuojami tik gavus snapshot be tęsinio cursor;
- `main` nekeisti.
