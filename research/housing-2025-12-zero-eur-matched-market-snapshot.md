# Būsto įperkamumas: nemokamas 2025 m. gruodžio nuomos ir pirkimo segmentų suderinimas

**2026-10-10 | 0 EUR | RESEARCH ONLY | NEPUBLIKUOTI KAIP TERITORIJŲ REITINGO.** Tikslas – sumažinti ankstesnį skirtingo laikotarpio, rajonų ir buto standarto sumaišymą ir sąžiningai atsakyti į pirminį klausimą, kiek m² būsto kainos ekvivalento dviejų dirbančių asmenų **jauna šeima** galėtų sukaupti nuomodamasi 1 kambario butą. Tik **pavyzdinis** scenarijus, o ne tikros populiacijos pajamos.

## Tiksliai palyginta šaltinių aprėptis

**Vienas nemokamas ekspertinis šaltinis, vienas mėnuo:** UAB „OBER-HAUS“ nekilnojamasis turtas, *Nekilnojamojo turto kainos Lietuvoje*, **2025 m. gruodis**.

- **PDF 1 psl.:** 2 kambarių parduodamų butų rinkos €/m² **nuo–iki** intervalai, padalinti į miesto rajonų ir statybos kategorijas; `data/housing-oberhaus-2025-12-two-room-new-vs-old-city-ranges.json`.
- **PDF 2 psl.:** 1 kambario nuomojamų butų rinkos €/mėn. **nuo–iki** intervalai penkiuose miestuose; `data/housing-oberhaus-2025-12-one-room-rent-city-ranges.json`.
- **Rajono apibrėžtis vienodai įvardyta tik 3 miestuose:** Vilnius, Kaunas, Klaipėda – abiejose lentelėse **„Gyvenamieji rajonai“**. Šiauliuose ir Panevėžyje nuoma skaidoma į „Centras / Kiti rajonai“, pardavimas – į „Centras / Gyvenamieji rajonai“; **NEPAVADINTI** šių skirtingų kategorijų tiksliai sutampančiomis. Druskininkų butų nuoma 2 psl. nėra pateikta.
- **Būsto standartas nepaverčiamas vienodu:** 2 kambarių naujos statybos butai yra **dalinės apdailos**, o senos statybos: Vilniuje **blokiniuose namuose** (renovacijos statusas nenurodytas), Kaune ir Klaipėdoje **nerenovuoti**, Šiauliuose / Panevėžyje / Druskininkuose **senos statybos be renovacijos patikslinimo**. Abiejų kokybės grupių papildomos įrengimo, remonto, energijos sąnaudos neapskaičiuotos. Naujo ir seno segmento **neprilyginame** tam pačiam gyvenimui paruoštam būstui.

**Šaltinis (1–2 psl.):** https://www.ober-haus.lt/wp-content/uploads/NT-kainos-2025-gruodis.pdf . Naudojant apžvalgos duomenis būtina nuoroda į UAB „OBER-HAUS“ nekilnojamasis turtas.

## 2025-12 rėžiai (nemaišyti su 2025 m. vidurkiu)

| Miestas | Nuoma: 1 kamb., mėn. € | Pardavimas: 2 kamb., naujas / dalinė apdaila, €/m² | Pardavimas: 2 kamb., senos statybos, €/m² |
|---|---:|---:|---:|
| Vilnius | 320–520 | 2 500–3 300 | 1 660–2 550¹ |
| Kaunas | 280–420 | 2 300–2 950 | 1 240–1 720² |
| Klaipėda | 270–400 | 2 250–2 950 | 1 060–1 460² |
| Šiauliai | 230–310³ | 1 800–2 100 | 950–1 480⁴ |
| Panevėžys | 230–310³ | 1 800–2 100 | 890–1 450⁴ |

¹ Vilnius: senos statybos **blokiniuose** namuose. ² Kaunas ir Klaipėda: senos statybos **nerenovuoti** butai. ³ Nuoma skelbiama „**Kiti rajonai**“, o ne pardavimo lentelės „Gyvenamieji rajonai“ – teritorinio segmento tapatumas nepatvirtintas. ⁴ Senos statybos butai, renovacijos / būklės grupė nedetalizuota.

**Tai nėra registruotų sandorių kaina, sutartų nuomos mokesčių mediana ar atsitiktinės imties statistika.** Nėra pirkimo / nuomos objektų skaičiaus N, detalios ploto grupės, būsto faktinio įrengimo, tikslios mikrovietos; nėra teisės skaičiuoti visuotinai palyginamo apskričių reitingo.

## Metinis m² ekvivalentas: tik sąlygų ribų aritmetika

Naudojant tą patį **2025 m. gruodžio** rinkos nuomos ir pardavimo intervalų momentinį pjūvį galima išbandyti pirminę formulę su hipotetiniu **dviejų dirbančių iki 30 m.** jaunos šeimos pajamų scenarijumi: **3 070 €/mėn.**, nes imame po 1 535 € iš **nacionalinio**, vienam 25–30 m. darbuotojui priskirto **2025 m. lapkričio** „Sodros“ neto rodiklio. **Tik modelio prielaida:** dar 1 700 €/mėn. visoms kitoms šeimos išlaidoms, be nuomos. Kasmetiname šio vieno mėnesio ekonominių sąlygų modelį **12 mėnesių prielaida**, o ne teigiame, kad tokios buvo faktinės šeimos 2025 m. metinės pajamos / santaupos.

| Miestas | 2 kamb. naujas / dalinė apdaila: modelinis m² ekvivalentas per metus | 2 kamb. senos statybos: modelinis m² ekvivalentas per metus |
|---|---:|---:|
| Vilnius | **3,09–5,04** | 4,00–7,59¹ |
| Kaunas | **3,86–5,69** | 6,63–10,55² |
| Klaipėda | **3,95–5,87** | 7,97–12,45² |

Formulė riboms: `12 × (hypothetical 3070 – assumed non-rent living expenses 1700 – rent)` / `sale €/m²`; intervalo mažesnė riba remiasi **aukščiausia** nuoma ir **aukščiausia** pardavimo €/m² riba, didesnė – abiem **žemiausiomis**. Tai **hipotetiniai ekstremalių kombinacijų** rezultatai, **ne** tikros statistinės patikimumo ribos, ir **nėra** vienodų butų palyginimas. Negalima lyginti naujo dalinės apdailos ir seno nerenovuoto segmento, neįvertinus papildomo remonto / įrengimo. Negalima miestų laikyti apskritimis ar skelbti, kad Vilniaus jauna šeima „gali įpirkti mažiau“ nei Kauno.

Struktūrizuota audito byla: `data/housing-first-home-2025-12-consistent-market-snapshot-scenarios.json`. Joje `do_not_rank_cities=true`, `do_not_publish=true`.

## Kodėl tai pažanga ir kur riba?

**Pagerėjo:** vienas kainų šaltinis, vienas mėnuo, 3 miestuose vienodai pavadinta vietovės klasė, atskirta buto 1 kamb. **nuoma** nuo 2 kamb. **pirkimo**, parodomos **abiejų sandorio rinkų ribos** vietoje neteisingo vieno universalaus €/m². Nėra būtinybės mokamam RC agregatui vien šiai **diagnostikai**.

**Neišspręsta:** šeimų **faktinės** pajamos ir išlaidos, tikros nuomos / sandorių kainos, palyginamos renovacijos / įrengimo sąnaudos, buto plotas, sandorių N, visos 10 apskričių. 2025-12 momentinių rinkos kainų **negalima** vadinti 2025 m. metinių vidurkių atitikmeniu. Tai pirmiausia atvira **analitinė hipotezė** apie prieinamumo ribas, ne viešai publikuotinas teritorinis įperkamumo rodiklis.

### 0 EUR nemokamo RC gardelių sluoksnio prieigos pakartotinio bandymo rezultatas

2026-10-10 vienkartinis skaitymo bandymas su `data.gov.lt/datasets/2559` viešu `get.data.gov.lt` `ButuPirkimas` API grąžino **HTTP 500 visoms keturioms mažoms (iki 2 eilučių) užklausoms**. **Negalima pasakyti, kad šiame šaltinyje nėra 2025 m. eilučių** – jų prieinamumas **nepatikrintas dėl techninės klaidos**. Ankstesniame mūsų pilname eksporte paskutiniai duomenys buvo 2024 m. Net jeigu naujas eksportas atsirastų, oficialiame rinkinio apraše nurodyta, kad pateikiami tik **vieno objekto** sandoriai; kokybiškai palyginamų 10 apskričių butų kainų tai automatiškai nesudarys.

LDP / VDA šaltinį tikrinti tik kai atsiranda prasmingų viešų atnaujinimų. **Jokių mokamų duomenų, užsakymų ar laiškų.**

**Publication verdict: BLOCKED.** `main` ir live nepakeisti.
