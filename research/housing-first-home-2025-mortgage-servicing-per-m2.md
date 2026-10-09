# 2025 m. pirmojo būsto paskolos našta vienam m² – nemokamas Lietuvos banko faktas + nevisiškai suvienodintas kainų segmentas

**2026-10-10 | RESEARCH ONLY | 0 EUR | NEPUBLIKUOTI 10 APSKRIČIŲ REITINGO.**

## Kodėl tai nauja vertė pradinei analizei?

Ankstesniuose skaičiavimuose vertinome tik santaupų **m² kainos ekvivalentą per metus** ir hipotetinį pradinį įnašą. Tačiau net sukaupusi pradinį įnašą jauna šeima turi pajėgti kas mėnesį mokėti **būsto paskolos įmoką**. Dabar pridėtas **2025 m. gruodžio oficialus Lietuvos banko palūkanų orientyras**, todėl paskolos aptarnavimo kainą galima išreikšti **€/m² per mėn. be spėjamo 50 m² buto**.

**Patikrinti faktai:**
- Lietuvos bankas skelbia, kad **2025 m. gruodžio naujų būsto paskolų susitarimų vidutinė metinė palūkanų norma – 3,69 %**. Tai **šalies vidurkis**, ne konkrečiai jaunų šeimų ar konkretaus miesto siūlomos palūkanos. Šaltinis: https://www.lb.lt/lt/paskolu-palukanu-normos .
- **2025 m. atsakingojo skolinimo taisyklės**: įprastas maksimalus LTV 85 % (15 % pradinis įnašas), **30 m.** ilgiausias terminas, visų paskolų įmokų / tvarių pajamų santykis **iki 40 %**, papildomai **iki 50 %** perskaičiavus su **ne mažiau kaip 5 %** palūkanomis. Šaltiniai: https://www.lb.lt/lt/naujienos/ar-atsakingojo-skolinimo-nuostatai-lietuvoje-reiksmingai-prisidejo-prie-finansu-sistemos-stiprinimo ; https://www.lb.lt/lt/naujienos/atnaujinti-atsakingojo-skolinimo-nuostatai-daugiau-galimybiu-perkantiesiems-pirma-busta-grieztesni-reikalavimai-imantiems-antra-ar-paskesne-busto-paskola .
- Nuo **2026-08-01** įsigaliojusio 10 % įnašo / 6 % perskaičiavimo režimo **NEPRITAIKOME 2025 m. istoriniam modeliui**.
- Vienodo mėnesio *ekspertinės rinkos kainos* iš **UAB „OBER-HAUS“ 2025 m. gruodžio** 2 kambarių **naujos statybos, dalinės apdailos, gyvenamųjų rajonų** intervalų. PDF 1 psl.: https://www.ober-haus.lt/wp-content/uploads/NT-kainos-2025-gruodis.pdf . **Tai ne faktinių sandorių mediana**, nėra butų ploto ar imties N. Iš dalies ta pati būsto kategorija yra Vilniuje, Kaune, Klaipėdoje, bet kitos kokybės ir vietos savybės nekontroliuotos.

## Nauja išvestinė metrika: mėnesinė paskola už vieną m²

Skaičiuojame **lygių mėnesinių įmokų anuitetą** 30 m. terminui, 85 % perkamos kainos finansuojant kreditu.

| Miestas (ne apskritis) | 2 kamb. naujo / dalinės apdailos buto kaina, €/m² | 15 % įnašui reikia €/m² | Paskolos įmoka, €/m² / mėn. esant **3,69 %** | Įmoka atliekant 2025 m. **5 %** testą, €/m² / mėn. |
|---|---:|---:|---:|---:|
| Vilnius | 2 500–3 300 | 375–495 | **9,77–12,90** | 11,41–15,06 |
| Kaunas | 2 300–2 950 | 345–442,50 | **8,99–11,53** | 10,49–13,46 |
| Klaipėda | 2 250–2 950 | 337,50–442,50 | **8,79–11,53** | 10,27–13,46 |

**Pavyzdys be savavališko buto ploto:** jei 2 kambarių naujo / dalinės apdailos būsto kaina yra 2 500 €/m², hipotetinis 85 % kreditas reiškia **2 125 € skolą už kiekvieną perkamą m²**; 30 m. anuiteto paskolos įmoka su 3,69 % palūkanomis yra **~9,77 € / m² per mėnesį**. Kai tik turėsime tikro buto plotą, bus galima dauginti iš jo; **nedarome prielaidos, kad 2 kambariai būtinai yra 50 m²**.

Formulė: `A = (€/m² × 0,85) × (r / (1 − (1+r)^(-360)))`, `r = 0,0369/12`. Papildomai palūkanų šoko bandymas su `r = 0,05/12`.

**Apribojimas:** įmoka **nėra pilnas būsto išlaikymas** (trūksta komunalinių, draudimo, remonto, administravimo), **dalinė apdaila dar nėra gyvenimui įrengtas būstas**, jos užbaigimui reikia papildomo biudžeto. Atsakingojo skolinimo DSTI skaičiavimui reikia tikros tvarios abiejų suaugusiųjų pajamų istorijos, kitų paskolų, vaikų ir būtinų išlaidų; dviejų nacionalinių mėnesinių atlyginimų suma **nėra patikimas kreditingumo patvirtinimas**. Kainų intervalai yra **ekspertiniai orientyrai, ne statistiniai pasikliautinieji intervalai**. Jų negalima naudoti kaip įrodymo, kuris miestas įperkamesnis.

**Dvi atskiros vartų sąlygos:**
1. **Pradinio įnašo kaupimas:** metinis realus taupymo pajėgumas turėtų būti apskaičiuojamas iš faktinių jaunos šeimos pajamų ir visų išlaidų; šiuo metu neturime pakankamo 2025 m. pogrupio rodiklio.
2. **Paskolos aptarnavimas:** turime **oficialų bendrą 2025-12 paskolų palūkanų orientyrą** ir galima apskaičiuoti €/m² **tik teorinę įmoką**; bankas paskolą vertintų individualiai pagal 2025 m. DSTI, paskolos ir šeimos išlaikymo įvertinimą.

**Duomenų rinkinio vardas:** `data/housing-first-home-2025-12-per-m2-mortgage-burden.json` (`big_guardrails.not_a_territorial_ranking=true`). Anksčiau išbandyti **metinės santaupos / €/m²** modeliai išlieka diagnostiniai, bet to neužtenka skelbti įperkamumo.

**Sprendimas:** sudėjus pradinio įnašo ir paskolos aptarnavimo ribas galima daug aiškiau parodyti pirmojo būsto finansavimo sąlygų struktūrą **nedarant nepatikimo geografinių vidurkių reitingo**. 10 apskričių palyginimas lieka **BLOCKED** dėl nemokamai neprieinamų pilnų, suvienodintos kokybės butų sandorių / nuomos ir realių jaunų šeimų biudžetų.

**Jokių mokamų užklausų, laiškų, main/live pakeitimų.**
