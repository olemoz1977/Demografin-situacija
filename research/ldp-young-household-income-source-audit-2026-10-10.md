# LDP / VDA – pirminio būsto šeimos pajamų ir išlaidų naujų šaltinių patikra

**Patikra:** 2026-10-10. **Prioritetas:** pirminis jaunos šeimos m² kainos ekvivalentas per metus ir laikas pradiniam įnašui, ne pirmagimių statistika. **Statusas:** SOURCES_IDENTIFIED_ACCESS_BLOCKED. **Jokių išorinių prašymų, laiškų ar mokamų užsakymų nebuvo.**

## Atrasta nauja VDA prieigos kryptis

VDA nukreipia į naują **Lietuvos duomenų portalą (LDP)**: https://dataportal.gov.lt/lt. Oficialios statistikos ir duomenų kataloge yra viešų rinkinių, pritaikytų mūsų pirminiam klausimui. Dokumentacija: https://guides.dataportal.gov.lt/lt/docs/api

**1. Apskričių namų ūkių disponuojamųjų pajamų oficiali lentelė:**
- https://dataportal.gov.lt/lt/datasets/sd003622
- Dataset `S3R908_M3080109_lt`, VDA 188600177. Skelbia **mėnesinių piniginių disponuojamųjų pajamų sudėtį pagal apskritį, pajamų šaltinį ir laikotarpį**, `eur / vienam namų ūkiui` arba `eur / vienam namų ūkio nariui` ir `%` (tik **tiksliai atrinkus vienetus ir pajamų šaltinį**).
- Portale matomi 2024 m. apskričių įrašų pavyzdžiai; **2025 m. eilutės kol kas nepatvirtintos**, šaltinis atnaujintas 2026-04-23.
- Šis šaltinis gali būti **tikro namų ūkio pajamų kontekstas**, tačiau **neturi tiesioginio „dviejų dirbančių sutuoktinių iki 30 m.“ pogrupio**. Bendro apskrities vidurkio **negalima** paversti visų jaunų šeimų pajamomis. Vienetas ir pajamų šaltinio suma turi būti griežtai validuoti.
- Oficialus LDP API `https://api.dataportal.gov.lt/namespaces/188600177/tables/S3R908_M3080109_lt/query` (užklausa POST, skaitymo operacija). Schemos `/schema` GET patikra **200 / OK**. Duomenų užklausos `filter=laikotarpis=2024` ir `2025` – **HTTP 502**, negrąžinta eilučių; todėl **jokios 2024/25 apskričių pajamų reikšmės šio audito metu nepatvirtinome**. Negalima 502 laikyti įrodymu, kad nėra duomenų – tik neprieinama šios patikros metu.

**2. Individualūs gyvenimo sąlygų tyrimo duomenys – teoriškai labai naudingi, bet prieiga nepatvirtinta:**
- https://data.gov.lt/datasets/799/
- Vieši paskelbti schemų aprašai `Asmens` ir `NamuUkis`, tačiau modelių būsena **Kuriama (develop)**.
- **Namų ūkio modelio laukai:** `hh060` mėnesio nuoma, `hh070` būsto išlaikymo mėnesio išlaidos, `hy020` metinės disponuojamosios namų ūkio pajamos, `hh021` būsto valdos statusas, `db090` kalibruotasis svoris, `ap` apskritis, `metai` metai, `hb030` namų ūkio ID.
- **Asmens modelio laukai:** `age` amžius, `rb240` sutuoktinio / sugyventinio ID, `hb030` namų ūkio nuoroda ir kiti užimtumo laukai. Su tinkamai prieinamais anonimizuotais duomenimis būtų galima tirti siauresnius **faktinius namų ūkių** pjūvius, neinterpretuojant jų kaip teisinio paramos tinkamumo.
- Viešo API skaitymo bandymas: `https://get.data.gov.lt/datasets/gov/lsd/pajamu_ir_gyvenimo_salygos/NamuUkis/?_limit=5` ir analogiškas `Asmens` → **HTTP 500**. Jokie įrašai nepasiekti ir neįrašyti. **Nežinome, ar šioje publikacijoje tikrai yra 2024/2025 m. duomenų** – laukų aprašymas nereiškia veikiančio duomenų rinkinio.
- **Privatumo vartai:** jokių individualių mikroįrašų, asmenų ar namų ūkių ID nekelti į GitHub, neįrašyti į CI logus. Jei saugus prieigos būdas atsiras, analizuoti lokaliai / privačiai, tik agreguotus pogrupius su pakankama imtimi, svoriais ir atskleidimo kontrole.

**3. Papildomi šaltiniai:**
- https://dataportal.gov.lt/lt/datasets/sd000244 – kiek namų ūkių turi grąžinti paskolas pagal pajamų kvintilines grupes. Tai **paskolos turėjimo**, ne būsimos mėnesio įmokos ar šeimos kreditingumo rodiklis.
- https://dataportal.gov.lt/lt/datasets/sd005413 – būsto kainų indeksai pagal būsto tipą ir teritorinį lygmenį. Naudingi kainų **kitimo** fonui, tačiau ne faktinė pirmojo 45–55 m² buto €/m² kaina.
- Oficialus LDP API dokumentacijos pavyzdys yra viešas ir **nereikalauja API rakto**, tačiau šio tyrimo užklausos į faktines eilutes neužsikrovė.

## Palyginimas su ankstesniais šaltiniais

| Reikalinga pradinei analizei | Patvirtinta dabar | Trūkumas |
|---|---|---|
| 2025 m. iki 30 m. **dviejų asmenų** šeimos pajamos pagal apskritį | „Sodra“ nacionalinis 25–30 m. darbuotojo 2025-11 `1 535 € neto` + **modeliuoti** apskričių atlyginimai | **Nėra** faktinių dviejų žmonių šeimos bendrų metų pajamų pagal apskritį |
| Vieno kambario nuoma 2025 m. | „Aruodas“ rekonstruoti 12 mėnesių pasiūlos vidurkiai **3 miestuose**; VDA kitos sudėties nuoma **5 miestuose** | Nėra 10 apskričių pakankamos imties 1 kambario nuomos, nėra tikrų sutarčių |
| Būtinos **šeimos gyvenimo išlaidos**, be nuomos | LDP individualaus namų ūkio `hh070` ir `hs130` laukai teoriškai; `hh070` tik būsto mokesčiams | Nėra paskelbto tinkamo 2025 m. **visų vartojimo išlaidų** pjūvio šiam šeimos pogrupiui. `hs130` yra „subjektyviai mažiausia reikalinga suma“, ne iš tikrųjų išleista suma |
| Palyginama būsto pirkimo €/m² | VDA miestų **6** visų parduotų butų vidurkiai | Ne 45–55 m² / statybos grupių, ne visos 10 apskričių |
| Metinis sutaupymas ir m² metai | `data/housing-first-home-saving-scenarios-city3-2025.json` – **diagnostinis**, su 3 atvirai modeliuotais išlaidų lygiais | Negalima skelbti kaip oficialios jaunos šeimos vidurkio |

### Sprendimas dėl eigos

1. **Nepakartoti** to, ką jau žinome iš „Sodros“, VDA, „Aruodas“ ir RC; naujas atradimas yra LDP **tiesioginis faktinio namų ūkio pajamų ir nuomos duomenų maršrutas**, kuris būtų arčiau originalaus tyrimo vieneto.
2. **Kol API grąžina 502 / 500 – skaitinių duomenų nefabrikuoti**; vieną kartą pakartotinai tikrinti paprastą užklausą, nes klaida gali būti laikina, bet nesukurti beverčio nuolat besisukančio crawlerio.
3. Jei prieigos nepavyks atkurti, pradinio rodiklio rezultatai lieka **aiškiai pažymėtais scenarijais** tik trim miestams, o 10 apskričių faktinio įperkamumo palyginimas **BLOCKED** dėl trūkstamų kainos ir nuomos įvesčių. Nepainioti miestų su apskritimis.

**Techninė patikra:** https://github.com/olemoz1977/Demografin-situacija/actions/runs/37996496019 (schema 200, faktinių eilučių užklausos 502, individualios apklausos 500). Darbo kodas `scripts/probe_ldp_housing_sources.py`.
