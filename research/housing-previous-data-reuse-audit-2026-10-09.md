# Jau surinktų būsto duomenų panaudojimo auditas

**Atnaujinta:** 2026-10-09. **Tyrimo objektas:** pirmojo būsto prieinamumas jaunoms šeimoms ir galimas ryšys su gimstamumu. **Šaka:** `audit/population-standard-2024-2025`. **Publikacija į main/live:** NE. **Pakartotinių laiškų / užsakymų:** NE.

## Pagrindinis sprendimas

**Neieškoti iš naujo to, ką jau surinkome.** Ankstesni rezultatai dalijami į keturias grupes:

- **A – tiesiogiai panaudojami oficialūs faktai su tinkama populiacija / teritorija**;
- **B – naudingi oficialūs būsto rinkos orientyrai, tačiau ne palyginamas jaunų šeimų pirmasis būstas**;
- **C – tyrimo modeliavimo / kryžminės diagnostikos komponentai, ne viešas rezultatų reitingas**;
- **D – uždaryti netinkami bandymai arba trūkstami suderinami duomenys**.

### Jau turime ir panaudojame

| Įrodymas | Ką tiksliai turime | Naudojimo klasė | Kokios išvados negalima daryti |
|---|---|---|---|
| SADM 2024 ir 2025 m. paramos gavėjai | 2024: **342**; 2025: **515** teisiškai apibrėžtų jaunų šeimų regioninės paskatos gavėjų; atskira **688→556** platesnė subsidijos gavėjų grupė | **A**, teisinis paramos rodiklis | Paramos gavėjų negalima tapatinti su visomis jaunomis šeimomis ar pirmojo būsto pirkėjais; 515 + 556 nesudėti kaip jaunų šeimų |
| VDA `S7R280`, butai daugiabučiuose `1123` | **2024 ir 2025 m.** oficialios butų pardavimo **vidutinės kainos EUR/m²** šešiose **miestų savivaldybėse** (Alytus, Kaunas, Klaipėda, Panevėžys, Šiauliai, Vilnius), kartu LT orientyras | **B**, oficialus kainų lygio orientyras, tinkamas atskirai miesto rinkos kontekstui | Ne 10 apskričių, ne visų 45–55 m² to paties amžiaus butų krepšelis ir ne pirmojo būsto pirkimai |
| VDA `S7R281`, butų nuoma | **2025 m.** oficialus rodiklis **EUR/m² per metus** penkiose miestų savivaldybėse: Kaunas, Klaipėda, Panevėžys, Šiauliai, Vilnius | **B**, miesto nuomos kainų orientyras | Ne atskiro **1 kambario** buto kaina, ne nuomos sumos, kurią moka konkreti jauna šeima, ir ne 10 apskričių duomenys |
| „Sodra“ | 2025-11 60 savivaldybių dirbančių apdraustųjų vidutiniai atlyginimai ir visą mėnesį dirbusių **25–30 m.** Lietuvos orientyras **2 516 bruto / 1 535 neto** EUR/mėn. | Nacionalinis amžiaus pjūvis – **A** siaurai asmenų populiacijai; 10 apskričių pajamų modelis – **C** | Tai **ne** konkrečios poros ar teisinės jaunos šeimos disponuojamos namų ūkio pajamos. Vieno mėnesio x12 nenaudoti faktinėms šeimos metinėms pajamoms |
| Eurostat EU-LFS `yth_demo_030` | 2024 m. LT **22,4 m.** ir 2025 m. LT **22,7 m.**; 2025 ES **26,3 m.** gyvenimo ne su tėvais įvertintas amžius | **A** savarankiško gyvenimo kontekstui | Nei nuosavybės, nei pirmojo pirkimo amžius |
| Eurostat EU-SILC `ilc_lvph02` | 2025 LT **55,7 %** vieno suaugusio be išlaikomų vaikų namų ūkių (`p`), ES **35,7 %** | **A** / oficialus faktinis tyrimas su **preliminaria institucine žyma** | Tai ne 55,7 % žmonių, ne jaunimo ir ne būsto nuosavybės procentas |

### Diagnostika – paliekama, bet į viešą įperkamumo reitingą neįtraukiama

| Ankstesnis bandymas | Patikros rezultatas | Sprendimas |
|---|---|---|
| VDA / RC `ButuPirkimas.csv`, dataset 2559 | Technologiškai pilnas 4 630 eilučių CSV snapshot; **2024 m. 516 sandorių, 474 butų objektai, 33 savivaldybės ir 8 apskritys**, trūksta Telšių ir Tauragės. Rinkinys apima tik vieno objekto įsigijimo sandorius. | **C**, atrankos / gardelių sujungimo ir anomalijų kontrolė; **ne** 10 apskričių vidutinių kainų reprezentatyvus sluoksnis |
| `Smart Continent` pardavimo modelis | 2024 m. bendras gyvenamasis būstas, ne konkretaus daugiabučio buto krepšelis; palyginimas su VDA šešiuose miestuose nepatvirtina teritorijų / kokybės kompozicijos kitose apskrityse | **C**, tik diagnostika; **D** kaip pagrindinis pirmojo būsto kainų sluoksnis |
| `Smart Continent BI_3` nuomos rodiklio atstatymas | 60 savivaldybių techninė rekonstrukcija, tačiau trūksta nuomos imties, objekto tipo ir rinkos duomenų metodikos; atskiri savivaldybių dydžiai absurdiškai maži | **D** kaip nuomos rinkos kaina; daugiausia QA |
| `Aruodas` 2025 m. 1 kambario nuomos tendencijos | Atkurtos **36 mėnesinės eilutės** (Vilnius, Kaunas, Klaipėda × 12 mėn.): pasiūlos kainų metiniai mėnesių vidurkiai **469 / 384 / 372 EUR/mėn.** atitinkamai | **C** – 3 miestų pasiūlos kontroliniai orientyrai, ne nuomos sutarčių kainos |
| `Skelbiu` 2025 m. paieškos indekso imtys | 10 apskričių, bet tik **9/10** tenkina minimalią `N≥5`; Tauragė **N=2**. Vilniaus indekso mediana **350 EUR** vs `Aruodas` 2025 mėnesinių kainų vidurkis ~**469 EUR** (skiriasi imties metodas) | **C**, nepatvirtintas reprezentatyvumas; **D** kaip visų apskričių nuomos šaltinis |
| Skirtingi „25–30 m. abu dirbantys partneriai“ modeliai | Senesniuose šakos dokumentuose matomi nesuderinami modeliuoti skaičiai: **12–23 tūkst.**, **20–40 tūkst.**, **23–40 tūkst.**; visų jų vardikliai ir prielaidos neapibrėžia teisinės jaunos šeimos | **D** kaip oficiali populiacija arba paramos aprėpties vardiklis; **C** tik modelio istorijai |
| 10 apskričių `m²/metus` v0.1 indeksas | Neįtrauktos realios išlaidos, įnašas, palūkanos, paskolos ribojimai; naudotas nepalyginamas daugiabučio/bendro būsto pardavimo proxy ir menkos nuomos imtys | **D** kaip realaus įperkamumo reitingas ir vieša statistinė išvada |

### Anksčiau jau kreiptasi dėl duomenų – nekartoti aklai

1. **Registrų centras.** Atsakymas gautas **2026-10-02**. RC gali parengti agreguotus sandorius `XLSX` pagal individualų poreikį; tai **mokama** paslauga, ankstesniame atsakyme nurodyta preliminari kaina **nuo maždaug 60 EUR + PVM**, galutinė tik suderinus apimtį. Iki šiol jokio užsakymo neatlikome.
2. Parengtas, bet **NEIŠSIŲSTAS** 2025 m. RC patikslinimas – `research/rc-2025-sale-followup-draft.md`. Tačiau naujesnis `feature/housing-affordability` šakos `research/housing-comparable-sale-basket-audit-2026-10-05.md` aiškiai parodo, kad reikėtų **45–55 m² × statybos laikotarpis × 10 apskričių × N** agregato, o ne vien tik 60 savivaldybių bendro vidurkio.
3. **Nuoma.** `research/diginet-rent-data-request-draft-2026-10-02.md` yra Diginet („Aruodas“ / „Skelbiu“) duomenų juodraštis, **NEIŠSIŲSTAS**. Turimas tik paieškos indekso ribotos aprėpties mėginys.
4. Paslaugų užklausas **visada parodyti vartotojui prieš siuntimą** ir neišsiųsti, kol negaunamas aiškus **„Siųsk“**. Mokami užsakymai – tik atskirai nusprendus.

### Dabartinis naudotinas oficialių miestų skaičių rinkinys

**Pardavimo kainos** – VDA S7R280, 2025 m., vidutinė butų daugiabučiuose kaina **EUR/m²**:

| Miestas | EUR/m² |
|---|---:|
| Alytus | 1 038,74 |
| Kaunas | 1 987,66 |
| Klaipėda | 1 740,84 |
| Panevėžys | 1 170,36 |
| Šiauliai | 1 262,33 |
| Vilnius | 2 846,01 |

**Nuomos kainos** – VDA S7R281, 2025 m., vidutinė **metinė** butų nuomos kaina **EUR/m²/metus**, tik penki miestai: Kaunas **124,35**, Klaipėda **113,46**, Panevėžys **91,40**, Šiauliai **95,15**, Vilnius **155,09**. Alytui analogiškas tame rinkinyje viešai patikrintas rodiklis **neturimas**, todėl **neinterpoliuoti**.

Šie du oficialūs rodikliai naudingi atskirai charakterizuojant miesto būsto rinką. **Neskaičiuoti iš jų jaunų šeimų įperkamumo, nedaryti išvadų apie pirmojo būsto 45–55 m² savikainą, nes trūksta ploto/statybos metų ir realių šeimos pajamų**. Ypač nevadinti miesto skaičių apskrities skaičiais. JSON duomenų failas: `data/housing-verified-city-benchmarks-2024-2025.json`.

## Nauja darbo seka, neprašant to paties iš naujo

1. **Tiesiogiai pernaudoti** jau patikrintas VDA 2024/25 miestų kainas, 2025 m. nuomos orientyrus, `Sodra` ir SADM, bet rodyti kartu su populiacijos / geografijos / krepšelio žyma.
2. Viešoje tyrimo kandidato versijoje leidžiama atskira **„Oficialūs miestų kainų orientyrai“** lentelė, kuri aiškiai **nėra pirmojo būsto įperkamumo reitingas**. Viešų rezultatų be išskirtinių taisyklių neteikti kaip jaunų šeimų pirmojo būsto kainų.
3. Jaunimo savarankiško gyvenimo ir būsto tenūro rodiklius nagrinėti pagal **Eurostat 25–34** ir **VDA 2024/25** atskirai. Gyvenimas savininkui priklausančiame būste `owner-occupied` nėra jauno respondento asmeninė būsto nuosavybė.
4. **Neskirti išteklių** dar vienam `Smart Continent BI_3` rekonstrukcijos ar `ButuPirkimas` puslapiavimo bandymui – jie metodologiškai nesprendžia dabar trūkstamos informacijos.
5. Jei reikia tikro **10 apskričių 2025 m. 45–55 m²** palyginimo, konkretus naujas blokatorius – **RC agregatas su statybos laikotarpio grupėmis**, o ne dar vienas visos rinkos bendras vidurkis. Būtinas atskiras savininko sprendimas dėl kainos pasiūlymo užklausos, prieš tai parodžius tekstą.
6. Gimstamumo hipotezę tikrinti naudojant atitinkamo amžiaus pirmųjų gimimų, migracijos ir ekonominių sąlygų rodiklius, nes absoliutūs gimimai nėra tiesioginis būsto poveikio matas.

## Patikrintos repo nuorodos

- `research/raw/vda-sale-big-cities/vda-sale-big-cities-2024-2025-comparison.json`
- `research/raw/vda-rent-big-cities/vda-rent-big-cities-2025-qa.json`
- `research/housing-income-model-2025-11.md`
- `research/housing-affordability-readiness.json`
- `research/housing-rent-cross-portal-validation-2025.json`
- `research/raw/aruodas-rent-benchmark-2025/aruodas-1room-rent-2025-qa.json`
- `research/rc-market-data-response-2026-10-02.md`
- `research/housing-comparable-sale-basket-audit-2026-10-05.md` yra **tik feature šakoje**, dar ne audit šakoje.
- `research/housing-target-couple-denominator-2025.md` ir kiti vardiklių variantai – **tik feature šakoje**, visos publikacijos prielaidos reikalauja peržiūros.

**Publikavimo sprendimas:** `DO_NOT_PUBLISH` 10 apskričių įperkamumo reitingui, bet **VDA miesto lygmens patikrintus 2024–2025 m. rodiklius galima panaudoti kaip atskirus oficialius kontekstinius faktus**, neišvirstant į skirtingų vienetų „vieną indeksą“.
