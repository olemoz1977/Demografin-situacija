# Kiek išlaidų gali sau leisti jauna šeima, kad sukauptų pradinį įnašą per 3 metus? (2025 m. diagnostika)

**Statusas: modeliuotas skaičiavimo testas, ne faktinė jaunų šeimų įperkamumo statistika.** 2025 m. palyginimas tik **3 miestų savivaldybėms**, ne 10 apskričių. Naudota mūsų jau patikrinta 2025 m. VDA butų pardavimų vidutinė €/m² kaina, „Aruodas“ vieno kambario 2025 m. nuomos pasiūlos kainų istorija ir **hipotetinės** dviejų dirbančių asmenų mėnesio neto pajamos (po 1 535 €, tai „Sodros“ nacionalinis 2025-11 25–30 m. darbuotojo orientyras).

## Atvirkštinis klausimas vietoj išgalvotų „faktinių gyvenimo išlaidų“

Skaičiuojame ne tariamą šeimos išlaidų vidurkį, o **kokią maksimalią kitų mėnesio išlaidų (be nuomos) sumą šeima galėtų turėti, jeigu nori per 3 metus sukaupti 15 % įnašą už hipotetinį 50 m² butą**:

| Miesto savivaldybė | Mėnesio nuomos pasiūlos orientyras (€) | Būtina sutaupyti per mėnesį (€) | Didžiausios kitos išlaidos (€ / mėn.) |
|---|---:|---:|---:|
| Vilnius | 469 | 593 | **2008** |
| Kaunas | 384 | 414 | **2272** |
| Klaipėda | 372 | 363 | **2336** |

Matematinė formulė: `leidžiamos kitos išlaidos per mėnesį = dviejų asmenų neto pajamos − mėnesio nuoma − (50 m² × būsto €/m² × 15 %) / (3 × 12)`.

**Pavyzdys:** Vilnius. 3 070 € hipotetinės dviejų dirbančių pajamos – 469 € 1 kambario pasiūlos nuoma – 593 € privalomas taupymas = **2 008 €** kitoms išlaidoms per mėnesį. Jei realios šeimos būtinos išlaidos didesnės, šių prielaidų sąlygomis įnašo per trejus metus ji nesukauptų. Jei mažesnės – galėtų, tačiau dar reikia atitikti banko kreditingumo kriterijus.

**Esminė priežastis taip skaičiuoti:** neturint faktinių dviejų dirbančių jaunų šeimų išlaidų, nėra pagrindo deklaruoti vieno „vidutinio“ m²/metus. **Atvirkštinio biudžeto riba leidžia aiškiai parodyti, kiek jautrus tikslas**, be teiginio, kad žinome tipinės šeimos išlaidų dydį. Tačiau vienas nacionalinis abiejų asmenų vidutinis atlyginimas nepritaiko skirtumų tarp miestų; visų amžių/plotų VDA būstų vidurkis taip pat neatitinka pirmojo būsto krepšelio. Lentelė **nėra miestų įperkamumo reitingas**.

## Pradinio įnašo sąlygos: 2025 m. atskirai nuo 2026 m.

**2025 m. minimalus tipinis pradinis įnašas – 15 %**. Lietuvos bankas vėlesnius pakeitimus patvirtino 2025-10-22, bet lengvesnis **10 %** pirmojo būsto sąlygas atitinkantiems pirkėjams įsigaliojo tik **2026-08-01**; negalima juo perskaičiuoti 2025 m. analizės. Net ir esant minimaliam 15 % reikalavimui bankas gali reikalauti didesnio įnašo. `data/housing-first-home-reverse-budget-2025.json` papildomai leidžia palyginti **20 %** prielaidą ir **2 / 3 / 5 metų** taupymo trukmę.

Šaltiniai:
- Lietuvos bankas apie 2025 m. taikytą 15 % ir vėlesnius pakeitimus: https://www.lb.lt/lt/naujienos/atsakingojo-skolinimo-nuostatu-perziura-daugiau-galimybiu-perkantiesiems-pirma-busta-grieztesni-investiciniu-sandoriu-reikalavimai
- Lietuvos bankas apie 2026-08-01 įsigaliojimą: https://www.lb.lt/lt/naujienos/nuo-rugpjucio-1-d-daugiau-galimybiu-pirma-busta-perkantiesiems-grieztesni-reikalavimai-imantiems-antra-ar-paskesne-busto-paskola
- Vietiniai duomenys: `data/housing-first-home-saving-scenarios-city3-2025.json`, `data/housing-verified-city-benchmarks-2024-2025.json`, `research/raw/aruodas-rent-benchmark-2025/aruodas-1room-rent-2025-qa.json`.

## Ar 2025 m. faktinių jaunų šeimų vartojimo išlaidų gali duoti VDA?

VDA oficialiame **„Namų ūkių biudžetų statistinio tyrimo“** aprašyme nurodyta, kad tyrimas matuoja namų ūkių išlaidas pagal gyvenamąją vietą, namų ūkio sudėtį, pajamas ir namų ūkio galvos amžių, t. y. **būtent naudingą būsto tyrimo pjūvį**. Tačiau nurodyta, kad naujojo tyrimo **vidutinių vartojimo išlaidų publikacija planuojama 2027 m. rugsėjį**. Todėl 2025 m. faktinių tokios sudėties šeimų išlaidų nedera imituoti dar nepaskelbtu oficialiu rodikliu. Ankstesnių tyrimų duomenys tiktų tik **ankstesnių metų kontekstui**, ne 2025 m. faktinėms išlaidoms.

VDA informacija: https://vda.lrv.lt/lt/veiklos-sritys/duomenu-rinkimas/duomenu-rinkimas-is-gyventoju/aprasymai/

**Sprendimas:** 2025 m. pirmojo būsto metinis įperkamumas lieka **MODELIUOTAS**, kol nėra šeimos konkretaus pogrupio faktinių mėnesio disponuojamųjų pajamų bei vartojimo išlaidų ir palyginamų pirmojo būsto sandorių 10 apskričių. Pirmųjų gimimų duomenys nėra šio skaičiavimo blokatorius.

