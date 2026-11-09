# Antro ir trečio vaiko paradoksas: ekonominiai ištekliai, ketinimai ir realūs gimimai Lietuvoje

**Tyrimo pradžia:** 2026-11-09. **Statusas:** vykdomas tyrimas; nauja priežastinė hipotezė NEPATVIRTINTA, tyrimo duomenys NESKELBTI svetainėje. **Biudžetas:** 0 EUR.

## Pagrindinis klausimas

**Kodėl net ekonomiškai saugios šeimos gali nesusilaukti antro ar trečio vaiko?** Ar, didėjant ištekliams, finansinių kliūčių reikšmė mažėja, o sprendimą daugiau lemia norimas šeimos dydis, laiko ir karjeros alternatyvos, santykių stabilumas, sveikata, amžius bei vaikų priežiūros krūvis?

Pagrindinė H1: didesni ištekliai gali palengvinti perėjimą nuo vieno prie dviejų ir nuo dviejų prie trijų vaikų, bet toks poveikis nebūtinai tiesinis; net ekonomiškai saugioje grupėje ne visi nori, gali ar suspėja turėti trečią vaiką.

**Konkurencinės hipotezės:** H0 ekonominė įtaka išlieka stipri ir pasiturinčiose grupėse (laiko, būsto bei karjeros alternatyvioji kaina); H2 skirtingus gimimų rodiklius pirmiausia paaiškina amžius, partnerystė, jau turimų vaikų skaičius ir atranka; H3 neįgyvendinti norai skiriasi nuo sąmoningo nenoro.

**JAV impulsas:** Mike Konczal, `Survey of Consumer Finances` 2013–2025 sujungtų imčių analizė (45–64 m. respondento namų ūkiai). Turtingiausio 1 % šeimose didesnė 3+ vaikų dalis, bet tai **ne** sprendimo dėl trečio gimimo priežastinis tyrimas ir **ne** uždaras viso gyvenimo gimimų registras (gali apimti įvaikius, povaikius, vaikų iš ankstesnių sąjungų). Šaltinis: https://newsletter.mikekonczal.com/p/what-distinguishes-the-1-from-the

## Pirmas Lietuvos faktinis sluoksnis: gimimai pagal eiliškumą

Šaltinis: **VDA, „Lietuvos gyventojai (2023 m. leidimas)“**, 2013–2022 m. oficiali istorinė gimimų pagal eiliškumą lentelė:
https://osp.stat.gov.lt/lietuvos-gyventojai-2023/gimstamumas

Mašininiu formatu tiksliai perrašyta į `data/lt-live-birth-order-vda-2013-2022.json` (10 metų, 8 count stulpeliai; visas eiles subalansuojame su `total_births`).

| Indikatorius | 2013 | 2022 | Pokytis |
|---|---:|---:|---:|
| Visi gyvi gimę | 29 885 | 22 068 | −7 817 (−26,2 %) |
| Pirmieji gimimai | 14 411 | 10 018 | −4 393 |
| Antrieji gimimai | 11 014 | 8 469 | −2 545 |
| Treti ir paskesni | **4 447** | **3 581** | −866 (−19,5 %) |
| Trečių ir paskesnių dalis tarp VISŲ gimimų | **14,88 %** | **16,23 %** | +1,35 proc. punkto |

**Svarbi išvada apie vardiklį:** trečių ir paskesnių gimimų *dalis tarp visų gimimų* ūgtelėjo, nors jų *skaičius* sumažėjo. Tai **nereiškia**, kad dviejų vaikų šeimų tikimybė susilaukti trečio padidėjo. Tam reikėtų žinoti, kiek moterų / šeimų baziniu laikotarpiu turėjo du vaikus, jų amžių ir stebėjimo laiką.

**Duomenų perrašymo detalė:** VDA istorinėje lentelėje „šeštasis gimimas“ pateiktas kaip papildomas `6 ir paskesnių` išskaidymas; jo **nepridėti antrą kartą**, kadangi `6+` jau įtraukia šeštąjį. Nežinomą eiliškumą laikyti atskirai.

**Duomenų revizijos blokas:** VDA 2023 m. leidimas 2020 m. visų gyvų gimusių skaičių nurodo **25 144**, o VDA „Lietuva skaičiais 2025“ lentelėje 2020 m. **23 556**; šiuo etapu jų NEJUNGTI, kol neišaiškinta revizija / aprėptis. Vėlesnių 2023–2024 m. eiliškumo reikšmių į šią istorinę seriją neprirašyti automatiškai. Antras šaltinis: https://publikacijos.stat.gov.lt/lietuva-skaiciais-2025/lt/categories/3

**Eurostat tolesnių duomenų adresai:** `demo_fordagec` (gimimai pagal motinos amžių ir eiliškumą), `demo_find` (gimimų eiliškumo dalis), pirminis katalogas: https://ec.europa.eu/eurostat/databrowser/view/demo_fordagec/default/table?lang=en ir https://ec.europa.eu/eurostat/databrowser/view/demo_find/default/table?lang=en . Naujesnių duomenų reikšmės dar neimportuotos / nevaliduotos.

## Antras faktinis sluoksnis: Lietuvoje išsakyti ketinimai, 2026 m.

**Krizių įveikimo centras / HUBEL / Norstat**, apklausa 2026-04-03–13. Bendra imtis **N=500**, 16–64 m. gyventojai, internetinė panelė. Klausimas apie planus turėti (daugiau) vaikų skirtas 18–45 m. **N=271**:
- 11,4 % planuoja per 1–2 metus;
- 15,9 % planuoja vėliau;
- 14,4 % neapsisprendę;
- 40,2 % neplanuoja;
- 18,1 % jau turi tiek vaikų, kiek nori.

Abejojančių ar neplanuojančių nurodytų priežasčių klausimo imtis **N=146**; atskiros apibendrinimo dalys: nėra tinkamo partnerio 22 %, nerimas dėl ateities / nesaugumas 17 %, emocinis nepasirengimas 15 %, svarba išsaugoti gyvenimo būdą / laisvę 10 %. Tai **ne** nepriklausomos priežasčių dalys; pasirinkimai gali persidengti. 8 % „finansinė situacija leidžia“ yra *norinčių* vaikų motyvas kitame klausime su **N=118**, o ne 8 % norinčių / galinčių turėti vaikų visoje Lietuvoje. Būtent finansinių kliūčių procento iš šių duomenų **negalima nustatyti**.

**Apribojimas:** viešoje santraukoje nėra suderintos lentelės `jau turimų vaikų skaičius (0/1/2/3+)` × `namų ūkio pajamos` × `ketinimai`; grupių N yra maži, nesumaišyti su bendrąja N=500. Nerasta pagrindo teigti, kad turtingi tėvai Lietuvoje dažniau / rečiau nori trečio vaiko.

Šaltinis: https://krizesiveikimas.lt/wp-content/uploads/2026/05/HUBEL_KIC_tyrimas-gimstamumas_2026.pdf

## Trečias duomenų kelias: panelinis GGP

**GGP LT / Gimstamumo ir šeimos tyrimas**, VDA, VDU, LSMC ir STRATA: įgyvendinamas nuo 2025-12; apklausos pirma banga numatyta **2026 m. III ketvirtį**, kita 2029 m. Tyrimo apraše tiesiogiai numatyta vaikų susilaukimo istorija, ketinimai, finansinė padėtis, būsto, partnerystės, darbo ir šeimos derinimo bei vertybių informacija. Tai tiksliausia kryptis H1 testuoti. **Pirmos bangos individualių Lietuvos duomenų viešai analizei šiame etape negavome; jų buvimo ar prieinamumo neišgalvoti.**

- VDA: https://vda.lrv.lt/lt/nuorodos/gimstamumo-ir-seimos-tyrimas-ggp-lt/
- GGP katalogas: https://www.ggp-i.org/data-catalog/
- Ankstesnis GGS Lithuania Wave 1: https://www.ggp-i.org/dataset/ggs1-lt-wave1/ (mikroduomenims reikia registracijos ir sąlygų priėmimo).
- OECD 2024 sintezė: https://www.oecd.org/en/publications/society-at-a-glance-2024_918d8db3-en/full-report/fertility-trends-across-the-oecd-underlying-drivers-and-the-role-for-policy_770679b8.html

## Analizės modelis, kai bus suderinami mikrolygmens duomenys

**Tikri rezultato rodikliai:**
1. `P2`: tarp asmenų / moterų, kurie **turi vieną vaiką** stebėjimo pradžioje, dalis susilaukusių antrojo per, pvz., 5 metus; tiriamų asmenų skaičius, iškritimas ir apklausos svoriai privalomi.
2. `P3`: tarp asmenų / moterų, kurie **turi du vaikus** stebėjimo pradžioje, dalis susilaukusių trečiojo per tą patį laikotarpį.
3. `G2/G3`: kiek norėtų 2/3+ vaikų esant dabartinėms aplinkybėms ir kiek siekė / neįgyvendino; atskirai `nepageidauja`, `atidėjo`, `negali`, `nežino`.

**Pagrindiniai aiškinamieji kintamieji:** ankstesnių metų *ekvivalentinės disponuojamos namų ūkio pajamos*, turtas / skolos, būsto statusas ir kaina, finansinio saugumo subjektyvus vertinimas, motinos amžius, partnerystė, abiejų partnerių darbas ir darbo grafikas, vaikų priežiūra ir laiko našta, vaikų amžius, sveikatos / reprodukcinės kliūtys, išsilavinimas, gyvenamoji vieta.

**Analizės seka:** pirmiausia aprašomieji `P2` / `P3` dažniai pagal vienodai apibrėžtus pajamų kvintilius; po to amžiaus / partnerystės / išsilavinimo kontrolė, pajamų–rezultato netiesiškumo patikra, patikimumo intervalai ir mažų imčių slopinimas. Net ir po kontrolės tai nėra savaime priežastinis poveikis. Jei yra tik skerspjūvio duomenys, vertinti asociacijas, o ne 5 metų tikimybes.

**Kategorijų taisyklė:** šiai reprodukcinio elgesio analizei **nenaudoti teisinio būsto paramos termino „jauna šeima“**. Populiaciją apibrėžti respondentų amžiumi, partnerystės statusu ir jau turimų vaikų skaičiumi.

## Duomenų rinkimo matrica

| Įrašas | Šaltinis | Turime | Trūksta | Būsena |
|---|---|---|---|---|
| FERTILITY-BIRTH-ORDER-LT-2013-2022-01 | VDA 2023 leidimas | 10 metų pilni eiliškumo skaičiai ir vardikliai | Tėvų pajamos, 2023–2024 to paties apibrėžimo serija | VERIFIED_UNPUBLISHED |
| FERTILITY-RESOURCE-PARITY-HYPOTHESIS-2026-01 | JAV SCF, OECD | Tyrimo klausimas ir palyginimų logika | Lietuvos individualus pajamų–pariteto–ketinimų pjūvis | MODELLED_UNPUBLISHED |
| KIC 2026 | Krizių įveikimo centras | N=271 ketinimų dalys, N=146 abejonės | Pajamos × konkretus vaikų skaičius × ketinimai | KONTEXTAS, NE P3 įvertis |
| GGP LT 2026/2029 | VDA/VDU/LSMC/STRATA | Tyrimo dizainas ir numatomi kintamieji | Viešai prieinami faktiniai Lietuvos 2026 respondentų mikrolygmens duomenys | DUOMENYS NESURINKTI |
| Eurostat `demo_fordagec` | Eurostat | Patvirtintas šaltinio kodas ir skaidymas | Patikrintos LT 2023–2024 reikšmės; duomenų vintages palyginamumas | LAUKIA IŠTRAUKIMO |

## Sprendimas šiame etape

**Dar neįrodyta, kad net turėdami finansinius išteklius Lietuvos tėvai sąmoningai atsisako antro / trečio vaiko.** Faktiniai gimimų eiliškumo ir apklausos duomenys sudaro pradinį sluoksnį, tačiau priežastiniam teiginiui reikalingas viename asmens / šeimos lygmens duomenų rinkinyje suderintas pajamų, jau turimų vaikų ir ketinimų pjūvis.

**T0 saugiklis:** jokių senų ID ar rezultatų nešalinti. Hipotezės ir pirmas skaitinis sluoksnis registruojami dviem naujais, NEPUBLIKUOTAIS ID. `main` svetainės turinio ir dizaino nekeisti; išlaikyti Draft PR tol, kol analizė tęsiasi.
