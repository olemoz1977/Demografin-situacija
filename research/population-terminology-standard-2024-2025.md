# Lietuvos demografinių populiacijų ir terminų standartas (2024–2025)

**Statusas:** metodinis sprendimas 2026-10-09. **Taikymo laikotarpis:** 2024–2025 m. faktams. **Šaka:** `audit/population-standard-2024-2025` (main nepakeistas).

## Pagrindinio tyrimo tikslo apsauga

**Pagrindinis tyrimo klausimas yra ne „kiek yra vienišų namų ūkių“ ir ne „kiek išmokėta subsidijų“.** Nagrinėjame **pirmojo būsto prieinamumą jaunoms šeimoms ir galimą jo ryšį su vaikų susilaukimo laiku bei gimstamumu Lietuvoje**. Oficialios paramos gavėjų kategorijos yra viena pagalbinė šio tyrimo dalis; namų ūkių statistika – kontekstas ir, tinkamai apibrėžus, pajamų matavimo pagrindas. Vieno koreliacinio palyginimo nepakanka teigti priežastinei įtakai.

Atskiras tyrimo klausimų, matų, hipotezių, duomenų spragų ir publikavimo ribų dokumentas: [`research/housing-first-home-fertility-question-2024-2025.md`](housing-first-home-fertility-question-2024-2025.md).

## Būsto klausimo galutinė sąvoka: „jauna šeima“

**Visose naujose pagrindinio tyrimo antraštėse ir išvadose vietoje „jauna pora“ vartoti „jauna šeima“.** Tai nepakeičia metodikos savaime: kiekvieno rodiklio vardiklis turi tiksliai atitikti žmones, kuriuos jis skaičiuoja.

**Pirminis m² per metus scenarijus:** jauna šeima, kurioje **du dirbantys sutuoktiniai ar registruoti partneriai, kiekvienas jaunesnis nei 30 m.**, nuomojasi vieno kambario butą. Tai tik **vienas** teisinių jaunų šeimų pogrupis. SADM teisinė apibrėžtis apima iki 36 m. sutuoktinius / registruotus partnerius ir vienus vaikus auginančius tėvus ar globėjus pagal įstatymo kriterijus. Todėl **negalima šio scenarijaus duomenų ar rezultatų apibendrinti visoms jaunoms šeimoms**. Esant duomenims atskirti kitus modelius (vienas dirbantis, vienas vaiką auginantis asmuo, turintys vaikų), o nesant – aiškiai pažymėti, kad ši analizė jų dar neįvertina.

**Principas:** vienas oficialus skyriaus terminas, tačiau kelios aiškiai apibrėžtos šeimos situacijos. Vengtinas mechaninis senųjų dokumentų „jauna pora“ pakeitimas, jeigu taip būtų pakeista duomenų kilmės ar modelio reikšmė.

## Sprendimas B

1. Bendrasis **statistinis analizės vienetas – namų ūkis** (VDA / Eurostat), bet **tik su konkretaus duomenų rinkinio definicijos ID**: surašymo `household-dwelling` ir EU-SILC pajamų / vartojimo namų ūkio apibrėžimai nekeičiami vienas kitu.
2. **„Jauna šeima“ – oficiali teisės akto kategorija** paramos ir socialinės politikos faktams. Ji nėra visų jaunų namų ūkių sinonimas; jos teisinis statusas ir amžius turi būti tikrinami pagal taikytiną metų teisės akto redakciją.
3. **„Šeima“ – ne vienas universalus skaičiuojamas vienetas.** Teisinė šeima (Paramos būstui įstatymas), statistinė šeima / šeiminis namų ūkis (VDA surašymas) ir šeimos branduolys (Eurostat) turi atskirus `definition_id`.
4. **„Jauna pora“ – nebe projekto populiacijos sąvoka.** Nebepublikuoti jos kaip oficialaus demografinio rodiklio. „25–30 m. dviejų dirbančių asmenų namų ūkio scenarijus“ gali būti **diagnostinis modelis**, o ne oficiali teisinė ar statistinė populiacija.
5. Projekto 2024–2025 faktai aiškinami pagal atitinkamų metų taisykles; 2026 m. pakeitimai – tik atskiras vėlesnių pokyčių kontekstas.

## Pakartotinio atradimo prevencija: faktas ≠ naujas tyrimo rezultatas

Prieš įtraukiant bet kurį skaičių į naują temą, **pirmiausia patikrinti, ar jis jau pateiktas projekto viešame puslapyje** (skyrius, grafikas, metai, šaltinis), ir anksčiau surinktus tyrimo dokumentus / JSON. Jei jau pateiktas, **nevadinti nauju atradimu**; kitame skyriuje naudoti trumpą kontekstą ir nuorodą į esamą analizę arba nurodyti naują pjūvį, kurio anksčiau nebuvo.

**Patikrintas pavyzdys 2026-10-10:** 2024 m. pirmąjį vaiką gimdančių moterų vidutinis amžius **28,7 m.** ir **2021–2024** grafikas jau yra `?view=fertility#amzius`. „Būstas“ puslapyje **nedubliuoti** grafiko / KPI, rodyti **kryžminę nuorodą** ir tirti tik iki šiol neatsakytą 2025 m. reikšmę bei tikrą būsto prieinamumo / gimstamumo ryšį.

**Etiketės:** `EXISTING_PUBLIC_FACT`, `REUSED_CONTEXT`, `NEW_VERIFIED_OBSERVATION`, `DERIVED_FROM_EXISTING`, `RESEARCH_GAP`. Pakartotinis perskaičiavimas ar perkėlimas iš vieno skyriaus į kitą savaime nėra `NEW_VERIFIED_OBSERVATION`.

## Duomenų kilmės ir galutinumo taisyklė

**Oficialu** nusako pirminę statistikos rengėją ir paskelbimo būdą; **faktinio tyrimo rezultatas** nusako, kad jis įvertintas iš realių stebėjimų / apklausos, o **galutinumas** nusako, ar reikšmė gali būti patikslinta. Šie trys požymiai nėra vienas laukas.

- **OFFICIAL + FINAL** – oficiali paskelbta reikšmė, kurios galutinis statusas patikrintas pagal konkretaus šaltinio žymas ir metodiką. Vien tai, kad nėra `p` žymos ar praėjo kalendoriniai metai, savaime nepakanka patvirtinti galutinumą.
- **OFFICIAL + PROVISIONAL (`p`)** – oficialiai paskelbtas konkrečių metų faktinių stebėjimų rodiklis, bet institucijos žyma rodo, kad rezultatas dar gali būti tikslinamas. Tinkama vieša žyma: **„Oficialus faktinio tyrimo rodiklis, preliminarus (Eurostat p)“**.
- **OFFICIAL + FORECAST (`f`)** – prognozė; negalima vadinti faktiniu tyrimo rezultatu.
- **MODELLED** – autoriaus modelis iš oficialių ar kitų duomenų: nenaudoti oficialios institucijos fakto žymos visam skaičiavimui.
- **PRELIMINARY** kaip vienintelė projekto žyma yra nepakankama, jei skaitytojui neaišku, ar kalbama apie institucijos preliminarų faktą, ar autoriaus dar neužbaigtą scenarijų. Privalomas atskiras `source_type`, `official_quality_flag`, `official_release_status`, `data_nature`.

**Atvejis 2026-10-09:** Eurostat `ilc_lvph02` Lietuvai, `A1` (vienas suaugęs asmuo), **2024 m. 50,5 % (p)** ir **2025 m. 55,7 % (p)**. Abu yra **oficialiai paskelbti faktinių metų statistinio tyrimo įverčiai**, o ne prognozės; tačiau abiem žyma `p` tebegalioja po 2026-09-17 rinkinio atnaujinimo. Nuoroda: https://ec.europa.eu/eurostat/databrowser/view/ilc_lvph02/default/table.

## Viešos kalbos standartas: žmonės ≠ būstas ≠ būsto nuosavybė

**Aptikta skaitytojų painiava:** terminas „namų ūkis“ kartais suprantamas kaip nuosavas namas arba butas. Oficialios sąvokos nekeičiame, bet pirmą kartą ją vartojant viešoje temoje **privalomas paaiškinimas paprasta kalba**.

- **Namų ūkis** – statistinis žmonių vienetas: vienas žmogus arba kartu gyvenantys ir pajamas ar būtinas išlaidas dalijantys asmenys. Nesvarbu, ar jie nuomojasi, ar gyvena savo būste.
- **Būstas** – gyvenamoji vieta / būsto vienetas; žmonių skaičius ir būstų skaičius nėra tas pats.
- **Būsto nuosavybė / naudojimo pagrindas** – ar gyvenamas būstas yra nuosavas, nuomojamas ar naudojamas kitu pagrindu; tai atskiras kintamasis.
- **Vienas būstas nebūtinai = vienas namų ūkis**: kartu gyvenantys, bet nesidalijantys išlaidomis žmonės pagal EU-SILC gali sudaryti atskirus namų ūkius. Taip pat keli giminaičiai viename būste gali sudaryti vieną namų ūkį.

**Rekomenduojama pirmoji vieša formuluotė:** „Namų ūkiai – vieni gyvenantys arba kartu bendrą ūkį tvarkantys žmonės, nepriklausomai nuo to, kam priklauso būstas.“

**Rekomenduojami skyriaus pavadinimai:** „Kaip gyvena Lietuvos žmonės“ (skaitytojui), „Namų ūkių sudėtis“ (oficialus statistinis pavadinimas / grafiko paantraštė). Nerašyti „Namų savininkų skaičius“, kai rodiklis yra namų ūkių dalis. Pateikiant procentus nurodyti ar tai **% namų ūkių**, **% gyventojų**, ar **% būstų**. Tai trys atskiri vardikliai.

**Oficiali definicija:** Eurostat EU-SILC „private household membership“: https://ec.europa.eu/eurostat/web/income-and-living-conditions/methodology

## Oficialių sąvokų auditas

| Sąvoka | Oficiali reikšmė / apibrėžimas | Institucija / šaltinis | 2024 | 2025 | Tinkamumas |
|---|---|---|---|---|---|
| Jauna šeima | Paramos būstui įstatyme: kiekvienas sutuoktinis ar registruotą partnerystę sudaręs asmuo iki 36 m.; taip pat vienas vaiką (-us) auginantis tėvas, motina ar pagal normą globėjas (rūpintojas) iki 36 m. | Paramos būstui įsigyti ar išsinuomoti įstatymo 2 str.; SADM; SPIS | Oficialus teisinis kriterijus | Oficialus; paramos skyrimo taisyklės keitėsi 2025-01-01 | **Tik teisinėms paramos populiacijoms**, ne universaliam būsto įperkamumui |
| Šeima | Paramos būstui įstatymo šeimos narių apibrėžimas (teisinis); VDA surašymo statistinė šeima / šeiminis namų ūkis apibrėžiami kitaip | Įstatymas; VDA; Eurostat | Naudojama skirtinguose registruose ir statistikoje | Taip pat | Privalomas **teisinės ar statistinės šeimos** patikslinimas |
| Sutuoktiniai | Oficialiai santuoką sudarę asmenys; šeimos branduolių statistikoje atskiriami nuo sugyventinių | Civilinis kodeksas; VDA | Taip | Taip | Tinkamas civilinės būklės / porų tipų pjūviui, ne visiems kartu gyvenantiesiems |
| Registruoti partneriai | Teisinėje „jaunos šeimos“ nuostatoje nurodyti asmenys, sudarę registruotos partnerystės sutartį; *faktiškai kartu gyvenantys nesusituokę asmenys* savaime nėra tapati teisinė kategorija | Paramos būstui įstatymas, VDA / Eurostat statistinės poros | Nuostata vartojama | Nuostata vartojama | Griežtai atskirti teisinį statusą ir statistinį sugyvenimą |
| Vienas vaiką auginantis asmuo | Tam tikromis sąlygomis vienas tėvas, motina ar globėjas su vaiku (-ais) atitinka teisinę „jaunos šeimos“ definiciją; statistikoje – vieno iš tėvų šeimos branduolys | Įstatymas; VDA / Eurostat | Taip | Taip | Tinkamas, tik su konkrečia amžiaus, vaiko ir globos definicija |
| Jaunas asmuo / jaunimas | Jaunimo politikos taikoma amžiaus grupė 14–29 m.; ne ta pati grupė kaip būsto įstatymo iki 36 m. | Jaunimo politikos pagrindų įstatymas / Jaunimo reikalų agentūra | 14–29 m. | 14–29 m. | Tinka jaunimo analizei, ne kaip jaunos šeimos sinonimas |
| Namų ūkis | Privatus vieno ar daugiau kartu gyvenančių asmenų ūkinis / gyvenamasis vienetas; surašymo ir EU-SILC operacionalizacijos skiriasi | VDA; Eurostat surašymas / EU-SILC | Taip | Taip | **Pagrindinis statistinis vienetas**, nurodant duomenų rinkinio tipą |

**Amžiaus redakcijų pastaba:** išlaikomas įstatymo tekstas „iki 36 metų“; teisės taikymo klausimą dėl konkrečios gimimo datos reikia tikrinti pagal *tą dieną* galiojusią redakciją. Paramos priemonės sąlygos (pvz., 2024 / 2025 subsidijų dydžiai) nėra definicijos sinonimas. Naujausios 2026 m. informacijos nenaudoti kaip ankstesnių metų įrodymo.

## Viešai skelbiamų 2024–2025 m. duomenų aprėpties auditas

| Rodiklis | Išvada | Pastaba |
|---|---|---|
| Visų teisiškai apibrėžtų „jaunų šeimų“ skaičius Lietuvoje 2024 m. | **Oficialiai neskelbiama (vieningas viešas rodiklis neaptiktas)** | SPIS pareiškėjų registras nėra visų šeimų registras |
| Tas pats 2025 m. | **Oficialiai neskelbiama (vieningas viešas rodiklis neaptiktas)** | 515 yra gavėjų skaičius, o ne visų šeimų skaičius |
| Jaunos teisinės šeimos savivaldybėmis / apskritimis | **Oficialiai neskelbiama** | SADM / SPIS teritorinio pjūvio užklausa jau pateikta, atsakymo dar nėra |
| Teisinės jaunos šeimos su vaikais / be vaikų | **Oficialiai neskelbiama** | Paramos schemos tarifai patvirtina grupių egzistavimą, bet ne nacionalinius skaičius |
| Šeimos pagal visų suaugusiųjų amžių, 2024–2025 | **Oficialiai neskelbiama kaip vieninga vieša teisinio apibrėžimo laiko eilutė** | VDA 2021 surašymas turi platesnius šeimų / namų ūkių pjūvius |
| Teisinių jaunų šeimų bendras užimtumas / pajamos / būsto nuosavybė | **Oficialiai neskelbiama tokiu bendru jungtiniu pjūviu** | Sodra individualūs apdraustieji ≠ du dirbantys vienoje šeimoje; EU-SILC namų ūkiai ≠ teisinės jaunos šeimos |
| Per metus naujai susidarančios jaunos teisinės šeimos | **Oficialiai neskelbiama kaip vieningas srautas** | Metinės santuokos, gimimai ar prašymai ≠ susiformavusių jaunų šeimų skaičius |

**Vardiklio sprendimas:** `515 / visos Lietuvos teisinės jaunos šeimos` **neskaičiuoti**. Jo oficialaus, patikrinto ir metų pradžiai / pabaigai apibrėžto vardiklio nėra. Taip pat 515 yra *paramos gavėjos*, kurios turi tenkinti daugiau reikalavimų (pirmas būstas, teritorija ir t. t.), tad visos jaunos šeimos būtų skirtinga tinkamumo populiacija. Atskiro `tinkamų gauti paskatą` vardiklio taip pat neturime.

## Patvirtinti paramos faktai ir palyginimo ribos

| Priemonė | Populiacija | Teritorija | 2024 m. gavėjai | 2025 m. gavėjai | 2025 m. panaudota | Statusas |
|---|---|---|---:|---:|---:|---|
| Finansinė paskata pirmam būstui regionuose | Teisinės **jaunos šeimos**, kurios gavo paskatą | Finansavimo teritorijos | 342 | 515 | apie **8,24 mln. €** | OFFICIAL / SADM |
| Subsidija valstybės iš dalies kompensuojamo kredito daliai | Platesnės kategorijos **asmenys / šeimos** | Lietuva | 688 | 556 | apie **10,32 mln. €** | OFFICIAL / SADM |

556 apima **32 papildomos subsidijos** gavėjus (2024 m. – 48). Todėl 515 + 556 **nėra** jaunų šeimų skaičius, naujų paramos gavėjų skaičius ar savaime unikalaus asmenų / šeimų skaičiaus įvertis.

**SADM suvestinės apskaitos patikra:** SADM įvardija **1 039** 2025 m. paramos / finansinės paskatos gavėjus ir **982** 2024 m. gavėjus. Šie dydžiai aritmetiškai sutampa su **515 + (556 − 32) = 1 039** ir **342 + (688 − 48) = 982**, jei antrosios schemos papildomos subsidijos gavėjai nelaikomi naujais. SADM taip pat atskirai skelbia **76 papildomos subsidijos** gavėjus 2025 m.: **44** regioninės paskatos ir **32** kompensuojamo kredito schemoje. Ši suvestinė **nėra** teisinės „jaunos šeimos“ nacionalinis vardiklis ar 2025 m. naujai susidariusių jaunų šeimų matas; apie unikalumą skirtingose schemose neteigiame daugiau nei teigia SADM.

2025 m. sausio 1 d. keitėsi finansinės paskatos teikimo tvarka, teritorinės ir subsidijų taisyklės, buvo nagrinėjami ankstesnėje eilėje buvę pareiškėjai. Todėl 342 → 515 yra **gavėjų faktinis pokytis (+50,6 %)**, o ne įrodytas geresnis paramos prieinamumas ar didesnė tinkamos populiacijos dalis.

## Būsto dalies viešos redakcijos sprendimas

- **Pagrindinis tyrimo klausimas – pirmojo būsto prieinamumas jaunoms šeimoms ir galimas ryšys su gimstamumu.** Dabartinės viešai patvirtintos faktinės išvados šioje temoje apsiriboja **SADM 2024–2025 paramos faktais**, aiškiai nurodant `vardiklis nežinomas` ir tai, kad paramos gavėjų skaičius neišsprendžia būsto įperkamumo ar poveikio gimstamumui klausimų.
- Dabartinį viešą 2025-11 pajamų ribos grafiką **šalinti** iš pagrindinės viešos temos. Jis 2025-11 vieno asmens modelį paverčia kalendoriniais šeimos metais (×2×12), nors neskaičiuoja dviejų konkrečios šeimos narių deklaruotų pajamų ir nematuoja teisinės „jaunos šeimos“ populiacijos. Gali klaidinti dėl 2025 m. paramos tinkamumo.
- `data/housing-state-support-income-screen-2025.json`, `research/housing-income-model-2025-11.md` ir atitinkami CSV išlieka **MODELLED / DIAGNOSTIC ONLY**, ne oficialaus vardiklio ar apskričių reitingo pagrindas.
- **50 m² ne vienodas būstas** – 10 apskričių įperkamumo reitingas lieka užblokuotas, kol nėra vienodo 2025 m. butų tipo / ploto / statybos segmento ir pakankamo sandorių N.
- 2024 m. taisyklės taikomos 2024 m., 2025 m. taisyklės – 2025 m. rodikliams.
- Kitų kategorijų senų tekstų neperrašyti mechaniškai; pirmiausia rankiniu būdu sudaryti vartojimo auditą.

## Techninė rodiklio sutartis (privaloma)

Kiekvienas viešas rodiklis turi turėti `population`, `population_definition_id`, `territory`, `period`, `measure`, `status`, `source`; rekomenduojama `source_edition_date` ir `quality_note`. Jei bent vienas esminis laukas neapibrėžtas, skaičius neįtraukiamas į pagrindinę išvadą.

Neprilyginamos schemos, juridiniai ir statistiniai vienetai, asmenys ir šeimos bei skirtingi metai **nesumuojami ir tyliai nelyginami**.

## Susiję failai ir kontraktų auditas

- `housing-affordability.js` – viešas pavadinimas, įvadas, jaunesnių porų teiginiai, pajamų grafikas, vardiklio paaiškinimas; keisti atskiroje audit šakoje.
- `data/housing-state-support-outcomes-2025.json` – oficialių schemų populiacijos turi būti aiškiai atribotos.
- `data/housing-state-support-income-screen-2025.json`, `data/housing-income-*-model-2025-11.csv` – **diagnostinis modelis**, ne teisinio tinkamumo faktas.
- `research/housing-affordability-methodology.md`, `research/housing-affordability-data-contract.md`, `research/housing-affordability-handoff-2026-10-02.md`, `research/housing-income-model-2025-11.md` – istoriniai darbo dokumentai; neatlikti automatinio „jauna pora“ keitimo.
- `feature/housing-affordability` turi nepublikuotą 20–40 tūkst. tariamos tikslinės porų populiacijos **modelį**; šio modelio **nepromotinti** į pagrindinę faktinę analizę be atskiro metodologinio sprendimo.
- `index.html`, `app.js`, `research-nav.js` – tikrinti po viešo teksto redakcijos, ypač cache-busting ir „Būstas“ navigaciją.

## Pirminiai / oficialūs šaltiniai

- Paramos būstui įsigyti ar išsinuomoti įstatymas: https://www.e-tar.lt/portal/lt/legalAct/e944ee00600111e4bad5c03f56793630/asr
- Finansinės paskatos pirmąjį būstą įsigyjančioms jaunoms šeimoms įstatymas: https://www.e-tar.lt/portal/lt/legalAct/61b5aa40794511e8ae2bfd1913d66d57/asr
- SADM 2025 m. veiklos ataskaita (2024–2025 palyginimas): https://socmin.lrv.lt/public/canonical/1773646445/6523/2026%2003%2006_SADM_Veiklos%20ataskaita%202025-03-10.pdf
- SADM 2025 m. subsidijų taisyklių kontekstas: https://socmin.lrv.lt/lt/naujienos-1/proverzis-paramos-jaunoms-seimoms-isigyjancioms-pirmaji-busta-sistemoje-C1v/
- VDA 2021 m. namų ūkiai ir šeimos: https://osp.stat.gov.lt/2021-gyventoju-ir-bustu-surasymo-rezultatai/namu-ukiai-ir-seimos
- VDA statistiniai šeimos apibrėžimai: https://osp.stat.gov.lt/lt_LT/gyventoju-ir-bustu-surasymai1
- Eurostat namų ūkių pajamų metodika: https://ec.europa.eu/eurostat/web/income-and-living-conditions/methodology
- Jaunimo reikalų agentūra: https://jra.lrv.lt/lt/projektas-jungtys/
- Nacionalinė šeimos taryba, 2024 m. pranešimas „Jaunos šeimos Lietuvoje“ (2025 m. pristatytas): https://seimostaryba.lt/administracine-informacija/metiniai-pranesimai/ (papildomas tyrimas, ne oficialus teisinės populiacijos skaitiklis)
