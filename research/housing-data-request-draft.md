# VDA / data.gov.lt užklausos istorija — SUPERSEDED

Statusas: **superseded / archyvinis dokumentas**.

Šis failas iš pradžių buvo parengtas darant prielaidą, kad `_page.next` paskutinėje
Spinta CSV eilutėje automatiškai reiškia nepilną eksportą. Vėlesnė techninė patikra šią
prielaidą paneigė.

## Kas patikslinta

- Vartotojo gautame `ButuPirkimas` eksporte buvo 4630 duomenų eilučių.
- Paskutinės eilutės `_page.next` cursor buvo patikrintas atskirai.
- Užklausa nuo to cursor grąžino CSV antraštę ir **0 papildomų duomenų eilučių**.
- Todėl `_page.next` buvimas paskutinėje eilutėje pats savaime nėra nepilnumo požymis.

Tikroji problema yra ne eksporto „nukirpimas“, o **rinkinio aprėptis**:
2024 m. jame yra tik 516 sandorių / 474 objektai, 33 savivaldybės ir 8 apskritys,
todėl jis yra siauresnis už visą butų sandorių rinką ir netinka pagrindiniam
10 apskričių kainų sluoksniui.

Žr.:
- `research/vda-butupirkimas-user-export-audit-2026-10-01.md`;
- `research/housing-sale-coverage-contradiction-2024.md`;
- `research/housing-sale-grid-audit-2024.md`.

## Išorinės užklausos būklė

VDA užklausa dėl pilno rinkinio eksporto buvo išsiųsta 2026-10-01 ir užregistruota
kaip **ADS-1961**. Kol kas gautas tik registracijos patvirtinimas, ne turinio atsakymas.

Registrų centrui atskirai išsiųsta užklausa dėl 2024 m. butų sandorių agregatų pagal
savivaldybes. Atsakymo kol kas nėra.

**Jokių naujų laiškų / užklausų / formų negalima siųsti nepateikus tikslaus teksto
projekto savininkui ir negavus aiškaus patvirtinimo.**
