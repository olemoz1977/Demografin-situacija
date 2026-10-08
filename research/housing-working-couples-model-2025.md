# 25–30 m. dirbančių porų Lietuvoje modelis — 2025

Statusas: **MODELLED RANGE / NOT OFFICIAL COUNT / FEATURE ONLY**

## Klausimas

Kiek Lietuvoje 2025 m. galėjo būti porų, kuriose:
- abu partneriai yra 25–30 metų;
- abu dirba?

Tiesioginio oficialaus `pora × abiejų amžius × abiejų užimtumas` pjūvio viešoje
statistikoje nerasta, todėl vieno „tikslaus“ skaičiaus pateikti negalima.

## Faktiniai orientyrai

### 2021 m. surašymas

VDA 2021 m. surašymas:
- pora apima sutuoktinius ir kartu gyvenančius partnerius;
- namų ūkiuose buvo 1,150 mln. sutuoktinių ir 144,6 tūkst. sugyventinių;
- pirmos santuokos kaupiamasis rodiklis rodo labai staigų perėjimą 25–30 m. amžiuje:
  - vyrų 1995 m. karta: iki 25 m. pirmą kartą vedę 11,2 %;
  - vyrų 1990 m. karta: iki 30 m. pirmą kartą vedę 42,9 %;
  - moterų 1995 m. karta: iki 25 m. pirmą kartą ištekėjusios 26,2 %;
  - moterų 1990 m. karta: iki 30 m. pirmą kartą ištekėjusios 61,5 %.

Šie dydžiai nėra tas pats, kas 2025 m. „šiuo metu poroje“, bet padeda apriboti
tikėtiną partnerystės mastą.

### 2025 m. amžiaus grupės mastas

2025 m. penkmečių amžiaus grupių orientyras:
- 25–29 m.: 178 321 gyventojas;
- 30–34 m.: 205 664 gyventojai.

30-mečių skaičius šiame modelyje aproksimuojamas kaip 1/5 iš 30–34 grupės:
- ~41 133.

Todėl 25–30 m. populiacijos mastas:
- ~219 454 žmonės.

Tai masto orientyras, ne tiesioginis VDA 25–30 metų pjūvis.

## Modelio logika

Formulė:

`poros = 25–30 m. gyventojai × dalis, esanti poroje su kitu 25–30 m. asmeniu / 2 × tikimybė, kad abu dirba`

Kadangi dviejų paskutinių parametrų tiesiogiai nematuojame, naudojame platų scenarijų
intervalą.

### Žemas scenarijus
- 30 % 25–30 m. gyventojų yra poroje su kitu 25–30 m. asmeniu;
- 70 % tokių porų abu dirba;
- rezultatas: **~23,0 tūkst. porų**.

### Centrinis scenarijus
- 37,5 % 25–30 m. gyventojų yra poroje su kitu 25–30 m. asmeniu;
- 75 % tokių porų abu dirba;
- rezultatas: **~30,9 tūkst. porų**.

### Aukštas scenarijus
- 45 % 25–30 m. gyventojų yra poroje su kitu 25–30 m. asmeniu;
- 80 % tokių porų abu dirba;
- rezultatas: **~39,5 tūkst. porų**.

## Rekomenduojamas rezultatas

Viešai, jei apskritai rodoma:

> **2025 m. Lietuvoje galėjo būti maždaug 23–40 tūkst. porų, kuriose abu partneriai
> yra 25–30 m. ir abu dirba; centrinis modelio taškas – apie 31 tūkst.**
> Tai modeliuotas dydis, ne oficialus porų skaičius.

## Kodėl 515 / šis skaičius NĖRA paramos aprėptis

2025 m. 515 gavėjų:
- yra SADM finansinės paskatos pirmajam būstui gavusios teisiškai apibrėžtos
  „jaunos šeimos“;
- amžiaus riba platesnė nei 25–30 m.;
- gali būti vienas vaiką auginantis tėvas / mama;
- nereikalaujama, kad abu suaugusieji būtų dirbantys;
- gavėjo populiacija nėra sutapatinama su mūsų modelio vardikliu.

Todėl 515 dalinti iš 23–40 tūkst. ir vadinti „paramos aprėptimi“ būtų metodologiškai
neteisinga.

## Šaltiniai

- VDA, 2021 m. gyventojų ir būstų surašymas — Namų ūkiai ir šeimos:
  https://osp.stat.gov.lt/2021-gyventoju-ir-bustu-surasymo-rezultatai/namu-ukiai-ir-seimos
- Eurostat 2021 Census metadata — family status / couple definition:
  https://ec.europa.eu/eurostat/cache/metadata/EN/cens_21_esmscs21_lt.htm
- Eurostat population by age and sex, 2025 table exists as `demo_pjan`;
  current feature model uses a UN WPP 2024 five-year-group 2025 scale anchor until
  an exact official VDA/Eurostat 25–30 extract is reproducibly stored in the repo.

## Publication gate

- **Feature/research: allowed.**
- **Main/live KPI: NOT YET.**
- Before publication, replace the 2025 age-group scale anchor with a directly stored
  official VDA/Eurostat extract if feasible.
- Do not publish a 515 / denominator percentage.
