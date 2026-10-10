# Jaunų šeimų būsto įperkamumas: ar reikalingi duomenys iš tikrųjų neegzistuoja?

**Patikrinta: 2026-10-10.** Tyrimo laikotarpis: 2024–2025. **Būsena: DALIS DUOMENŲ EGZISTUOJA; JUNGTINIS PJŪVIS VIEŠAI NEPATVIRTINTAS.** Tai duomenų prieinamumo auditas, **ne teiginys, kad tokio rinkinio įstaigos negali turėti ar sudaryti**.

## Tyrimo populiacija

Būsto paramos analizei „jauna šeima“ – sutuoktinių ar registruotų partnerių šeima, kurioje kiekvienas asmuo iki 36 metų, arba vienas iki 36 m. vaiką (-us) auginantis tėvas, motina ar globėjas (rūpintojas), pagal konkrečių analizuojamų metų teisės aktų redakcijas. Nepainioti su atsitiktinai pasirinkta dviejų dirbančių 25–30 metų asmenų kohorta. Šaltiniai:
- https://e-seimas.lrs.lt/rs/legalact/TAD/f8644af1e40011efaaf7b71596f7c8a4/
- https://socmin.lrv.lt/lt/veiklos-sritys/seima-ir-vaikai/finansine-paskata-pirmaji-busta-isigyjancioms-jaunoms-seimoms/

## Kas įrodyta egzistuojant

1. **VDA oficiali šeimų ir namų ūkių pajamų statistika.** Oficialiosios statistikos portalas skelbia pinigines disponuojamąsias pajamas pagal namų ūkio tipą, taip pat regioninę namų ūkių pajamų statistiką; ankstesniame projekte registruotas VDA S3R908 2024 m. 10 apskričių visų namų ūkių disponuojamųjų pajamų pjūvis (`HOUSING-COUNTY-HH-INCOME-2024-01`). **Ne** teisinės jaunos šeimos pajamos pagal 10 apskričių. https://osp.stat.gov.lt/lietuvos-gyventoju-pajamos-ir-gyvenimo-salygos-2023/namu-ukiu-pajamos/bendrosios-ir-disponuojamosios-pajamos
2. **Lietuvoje vykdomi pajamų ir gyvenimo sąlygų (EU-SILC) ir namų ūkių biudžetų (HBS) statistiniai tyrimai** su asmenų / namų ūkių mikrolygmens informacija. Eurostat aprašo pajamas ir gyvenimo sąlygas namų ūkių ir asmenų lygiu. Lietuvai skirtos tikrųjų mikroduomenų prieigos sąlygos priklauso nuo tyrėjo statuso ir konfidencialumo. https://ec.europa.eu/eurostat/web/microdata/collections-research/european-union-statistics-on-income-and-living-conditions ; https://cros.ec.europa.eu/cimes-lithuania
3. **SADM / SPIS** kaupia administracinius paramos ir paraiškų duomenis, įskaitant finansinę paskatą pirmajam būstui. Tai nėra visų Lietuvoje gyvenančių jaunų šeimų pajamų statistika ir savaime negaunamas tinkamas subsidijos aprėpties vardiklis. https://socmin.lrv.lt/lt/asmens-duomenu-apsauga/asmens-duomenu-tvarkymas/ ; https://socmin.lrv.lt/lt/veiklos-sritys/seima-ir-vaikai/finansine-paskata-pirmaji-busta-isigyjancioms-jaunoms-seimoms/
4. **Būsto kainos ir nuomos segmentai egzistuoja** – VDA S7R280, Ober-Haus; 2025 m. šeši miestai nėra dešimt apskričių, o skirtingų būstų ir laikotarpių krepšeliai nėra tarpusavyje palyginami.

## Papildomai patvirtintas konkretus atviras rinkinys ir duomenų gavimo kelias

- **VDA S3R908 (SD003622): „Mėnesinių piniginių disponuojamųjų pajamų sudėtis | Apskritys | Pajamų šaltinis“.** Kasmet atnaujinamas **viešas** rinkinys su **CSV / JSON / Parquet** prieiga, apima 2024 m. ir visas apskritis. Tai didelis žingsnis – teritorinių namų ūkių pajamų skaičiai **tikrai egzistuoja**, bet rinkinys nėra teisinės jaunos šeimos pajamų lentelė. https://dataportal.gov.lt/lt/datasets/sd003622
- **VDA individualių užklausų paslauga** teikiama fiziniams / juridiniams asmenims, ir gali teikti parengtą agreguotą statistinę informaciją. Paskelbta kainodaros būsena **„nemokama / mokama“**: jau viešai paskelbta oficialioji statistika nemokama, o individualiai paruošti duomenys gali būti mokami. **Prieš užsakant nepatvirtintas 0 EUR rezultatas; iš pradžių klausti apie jau egzistuojančią nemokamą suvestinę, paslaugos įkainį bei duomenų kokybę.** https://osp.stat.gov.lt/duomenu-teikimas ; https://www.epaslaugos.lt/portal/providerServices/34820

## Ko šiame audite viešai nepatvirtinome

- Vienos 2024–2025 m. **10 apskričių** atviros lentelės, kurioje kartu būtų: būtent teisines jaunas šeimas atitinkančių namų ūkių skaičius, suaugusiųjų amžius, santuokos/registruotos partnerystės/vienų vaiką auginančių globėjų statusas, vaikų skaičius, disponuojamosios namų ūkio pajamos, pagrindinės išlaidos, nuomos / būsto nuosavybės situacija.
- Patvirtintos, reprezentatyvios **išlaidų pagal teisines jaunas šeimas × apskritis** lentelės.
- Vienodos palyginamos kokybės **parduodamų ir nuomojamų butų visose apskrityse** rinkinio, kuris būtų galimas sujungti su jaunos šeimos biudžetu.
- Eurostat **EU-SILC research microdata mokslinio naudojimo failuose regionas nurodytas NUTS 1**, o tai nesuteikia Lietuvos 10 apskričių detalumo. Vieši **sintetiniai** EU-SILC PUF skirti mokymuisi ir netinka faktiniams gyventojų grupių įverčiams. https://ec.europa.eu/eurostat/web/microdata/collections-research/european-union-statistics-on-income-and-living-conditions ; https://ec.europa.eu/eurostat/en/web/microdata/public-microdata/statistics-on-income-and-living-conditions

**Negalima teigti, kad tų duomenų „nėra Lietuvoje“.** Galima teigti tik tai, kad iki šio patikrinimo **nerasta patvirtinta vieša pakankamai smulki jungtinė 10 apskričių lentelė**. VDA gali turėti detalesnius konfidencialius duomenis ar galimybę parengti agregatą; galimybė, reprezentatyvumas, pateikimo teisė ir galimas mokestis **dar nepatikrinti**.

## Prasminga tolesnė patikra, prieš rašant, kad „nėra duomenų“

1. Patikrinti VDA OSP 2024/2025 m. aktualius rodiklius *namų ūkio tipas × amžius × apskritis*, nurodant tikslų kodą ir imties / konfidencialumo apribojimus.
2. Pasiteirauti VDA, ar per turimus EU-SILC/HBS ar saugią valstybės duomenų prieigą **galima gauti tik agreguotus anoniminius** teisinės jaunos šeimos, amžiaus, vaikų skaičiaus, pajamų, būsto išlaidų pagal teritoriją rodiklius, ir ar pakanka imties. Viešų ataskaitų nebuvimas nėra mikrolygmens duomenų nebuvimo įrodymas.
3. SADM klausti **apibendrintų** SPIS paraiškų ir gavėjų pagal apskritis bei šeimos sudėtį, atskiriant paraiškų tinkamumą nuo visų jaunų šeimų populiacijos.
4. Būsto sandorių / nuomos krepšelio palyginamumo auditą atlikti nepriklausomai nuo šeimų pajamų. Jei teritorinė imtis nepakankama, sąžiningai pateikti 2–3 regionus su ribomis, ne 10 apskričių tariamai tikslų reitingą.

**T0:** senojo 25–30 m. dviejų dirbančių asmenų modelio `HOUSING-SAVINGS-10-COUNTIES-01` ir susijusių ID archyvas neįrodo, kad duomenų nėra, ir negali būti naudojamas vietoj naujo teisines sąvokas atitinkančio tyrimo.

**Išorinių užklausų statusas:** nieko neišsiųsta; laiškų / užklausų tekstus prieš siuntimą būtina parodyti vartotojui.
