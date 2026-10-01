# Registrų centro RSi / agreguoto 2024 m. butų sluoksnio priėmimo planas

Data: 2026-10-02  
Statusas: ACTIVE – pagrindinis pardavimo kainos kelias po Smart Continent FAIL.

## Tikslas

Gauti 2024 m. faktinių butų pirkimo–pardavimo sandorių kainų sluoksnį, kurį galima
patikimai agreguoti:

`sandoris / objektas → savivaldybė → apskritis → Lietuva`

Galutinis publikavimo vienetas – 10 apskričių. Savivaldybė yra tarpinis agregavimo
sluoksnis, ne apskrities centro pakaitalas.

## RC viešos RSi specifikacijos faktai

RSi „nesudėtinga“ paieška leidžia filtruoti pagal:
- savivaldybę;
- sandorio datą;
- objektus sutartyje, įskaitant „butai“;
- sandorio sumą ir vieneto kainą;
- sandorio tipą;
- kainos tipą;
- turto paskirtį;
- plotą, statybos metus ir baigtumą.

Rezultatuose pateikiami laukai, reikalingi sandorio kainos QA:
- Sandorio ID;
- sandorio data;
- sandorio objektas;
- sandorio tipas;
- objektų skaičius;
- kainos tipas;
- sandorio suma;
- paskirstyta kaina;
- vieneto kaina;
- adresas / savivaldybė;
- objekto tipas ir paskirtis;
- objekto ir įsigytas plotas;
- unikalus objekto numeris;
- baigtumas ir kiti kadastro požymiai.

„Sudėtingos“ individualios užklausos laukai papildomai aiškiai apima savivaldybę,
buto numerį, dalį, įsigytą plotą, butų skaičių, kambarių skaičių ir kt.

## Svarbi išdavimo riba

Standartinis RSi nėra pilnos rinkos eksportas:
- nesudėtinga paieška pateikia kriterijus atitinkančių sandorių kiekį, bet mokamame
  rezultate galima pasirinkti iki 25 arba iki 50 naujausių sandorių;
- individualios sudėtingos užklausos viešose sąlygose, kai atitikmenų >25, taip pat
  numatyta pateikti naujausius sandorius.

Todėl visų 2024 m. Lietuvos butų mikrolygmens duomenų atkūrimas vien standartinėmis
RSi užklausomis būtų fragmentuotas, potencialiai brangus ir metodologiškai nepatogus.

**Prioritetas – RC individualiai parengtas agreguotas arba nuasmenintas failas, kurio
jau paprašyta 2026-10-01.**

## Minimalus priimtinas agreguotas failas

Kiekvienai iš 60 savivaldybių reikia bent:

1. `municipality`;
2. `year = 2024`;
3. `apartment_transaction_count`;
4. `valid_price_observation_count` – jei skiriasi nuo sandorių skaičiaus;
5. `avg_apartment_transaction_eur_m2`;
6. kainos rodiklio apibrėžimo;
7. aiškaus buto / patalpos atrankos apibrėžimo;
8. paaiškinimo, kaip tvarkomi kelių objektų ir dalinio įsigijimo sandoriai;
9. patvirtinimo, kad tai sandorio, o ne pasiūlos kaina;
10. publikavimo / citavimo sąlygų.

Jei `valid_price_observation_count` nepateiktas, negalima automatiškai sverti
savivaldybės vidutinės kainos visų sandorių skaičiumi nepatikrinus, kad kiekvienas
sandoris turėjo galiojančią EUR/m² reikšmę.

## Pageidaujamas mikrolygmens failas

Jei RC gali pateikti nuasmenintą mikrolygmenį, reikalingas minimalus laukų rinkinys:

- sandorio ID arba stabilus pseudoniminis ID;
- metai / mėnuo;
- savivaldybė;
- sandorio tipas;
- sandorio objektas;
- objekto tipas;
- paskirtis;
- kainos tipas;
- sandorio suma;
- paskirstyta kaina;
- vieneto kaina EUR/m²;
- objekto plotas;
- įsigytas plotas;
- įsigyta dalis;
- objektų skaičius sutartyje;
- butų skaičius;
- baigtumas.

Adresas, buto numeris, unikalus objekto numeris ir kiti identifikuojantys laukai mūsų
analizei **nereikalingi** ir jų neprašome, jei RC gali jų neteikti.

## Atrankos metodikos principai

Galutinei kainai negalima aklai imti visų eilučių, kuriose yra žodis „butas“.

Prieš agreguojant būtina atskirai identifikuoti:
- pilno buto ir dalinio įsigijimo sandorius;
- vieno objekto ir kelių objektų sandorius;
- sandorius, kuriems žinoma objekto paskirstyta kaina;
- sandorius, kuriems vieneto kaina apskaičiuota nuo bendros kelių objektų sandorio sumos;
- nulines, neigiamas, akivaizdžiai technines ar trūkstamas kainas;
- galimus ne rinkos / nestandartinius kainos tipus, jei RC klasifikacija juos leidžia atskirti.

### Kelių objektų sandoriai

Prioritetų seka kainai:
1. atskiro buto notaro / RC paskirstyta kaina, jei ji patikimai priskirta objektui;
2. vieno buto sandorio suma, kai sandoryje nėra kitų kainą iškreipiančių objektų;
3. RC jau apskaičiuota validi objekto `vieneto kaina`, jei jos metodika atitinka 1–2;
4. kitu atveju kainos stebinys neįtraukiamas į EUR/m² vidurkį, bet sandoris gali likti
   sandorių skaičiaus kontrolėje.

Nenaudoti bendros kelių objektų sandorio sumos kaip vieno buto kainos.

## Savivaldybė → apskritis agregavimas

Jei gauname mikrolygmenį, apskrities kainą skaičiuojame tiesiogiai iš visų apskrities
validžių butų kainos stebinių pagal pasirinktą RC metodiką.

Jei gauname tik savivaldybių agregatus, naudojame:

`county_price = Σ(municipality_price × valid_price_observation_count) / Σ(valid_price_observation_count)`

Tik jei RC patvirtina, kad savivaldybės `avg_apartment_transaction_eur_m2` yra paprastas
tų pačių kainos stebinių vidurkis.

**Nenaudoti:**
- paprasto nesverto savivaldybių vidurkio;
- bendro savivaldybės sandorių skaičiaus kaip svorio, jei dalis sandorių neturėjo validžios
  EUR/m² kainos;
- gyventojų skaičiaus kaip pardavimo kainos svorio.

## Nacionalinės kontrolės

Pirmo lygio kontrolės:
- 2024 m. butų sandorių skaičius: apie **27 330**;
- Smart Continent pristatymo 2024 m. vidutinė buto kaina: **1 669 Eur/m²**.

Tai nėra automatiniai „tiesos“ skaičiai skirtingoms atrankoms. PASS reiškia:
- skirtumas paaiškinamas atrankos apibrėžimu;
- nėra sisteminio praradimo savivaldybių;
- nėra nesverto savivaldybių vidurkio klaidos;
- sandorių populiacija yra butai, o ne bendras būstas.

## Savivaldybių pilnumo kontrolės

Privaloma:
- 60/60 savivaldybių;
- 10/10 apskričių po mapping;
- atskirai patikrinti Tauragės r. ir Telšių r. sav., nes atviras VDA gardelių rinkinys
  jų 2024 m. neapėmė;
- RC / Finansų ministerijos kontrolės: Tauragės r. 186 butai, Telšių r. 222 butai,
  jei atrankos apibrėžimas sutampa.

## Kokybės klasė

Pardavimo kainos sluoksniui:
- **A** – oficialūs RC faktiniai sandoriai, pilna / aiškiai apibrėžta 2024 m. butų populiacija,
  60 savivaldybių, žinomas kainos stebinių skaičius ir agregavimo metodas;
- **B** – oficialus RC agregatas, bet dalis mikroatrankos / outlier metodikos neatskleista,
  nors kontrolės ir aprėptis atitinka;
- **C / nepublikuoti** – trūksta savivaldybių, neaiški sandorio populiacija, pasiūlos kainos,
  nesvertas savivaldybių vidurkis arba nepaaiškinamas nacionalinės kontrolės neatitikimas.

Pagal pasirinktą Variantą A galutiniam viešam sluoksniui siekiame **A**; B priimtinas tik
kaip tarpinis / aiškiai pažymėtas modelinis ar riboto skaidrumo sluoksnis, ne kaip
nepažymėtas oficialus faktas.

## Veiksmas gavus RC atsakymą

1. Patikrinti licenciją / publikavimo sąlygas prieš įkeliant žalius duomenis į viešą repo.
2. Jei failas gali būti saugomas repo – commitinti raw kopiją su checksum.
3. Jei raw failo viešinti negalima – saugoti tik leistiną agreguotą išvestį ir metodinį
   provenance aprašą.
4. Paleisti 60 savivaldybių completeness, duplicate, null, range ir national-control QA.
5. Tik po PASS kurti `data/housing-sale-county-2024.csv`.
6. `main` / live nekeisti iki bendro pajamų + pardavimo + nuomos sluoksnių priėmimo.
