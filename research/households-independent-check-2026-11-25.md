# Nepriklausomo palyginimo rezultatas: gyvenimas po vieną 65+ grupėje

## Naujas rezultatas

Patikrintas kitas tyrimas: EU-SILC ilc_lvps30, Distribution of population aged 65 and over by type of household. Pasirinkta A1_GE65, sex=T, PC, LT ir EU27_2020. Vardiklis yra tos amžiaus grupės asmenys privačiuose namų ūkiuose. Tai ne ankstesnės ilc_lvph02 lentelės procentai nuo visų namų ūkių.

| Metai | LT EU-LFS, % | LT EU-SILC, % | ES EU-LFS, % | ES EU-SILC, % |
| --- | ---: | ---: | ---: | ---: |
| 2021 | 34,8 (b) | 44,3 | 31,1 (b) | 31,1 |
| 2022 | 37,1 | 48,6 | 31,9 | 31,7 |
| 2023 | 40,6 | 51,0 | 32,1 | 31,5 |
| 2024 | 54,3 | 54,9 (p) | 32,1 | 31,9 |
| 2025 | 65,0 | 59,9 (p) | 32,2 | 32,2 |

EU-SILC atnaujinta 2026-10-20; 2024 ir 2025 m. LT reikšmės preliminarios. 2021 EU-LFS pažymėta b. Šaltinis https://ec.europa.eu/eurostat/databrowser/view/ilc_lvps30/default/table . Pirminiai atsakymai ir formulės saugomi JSON; atkartoti `python scripts/compare_households_senior_surveys.py`.

Abu tyrimai rodo didėjantį Lietuvos įvertį, kai ES įverčiai daug stabilesni. Tačiau LT 2024–2025 pokytis EU-SILC yra +5,0 p. p., EU-LFS +10,7 p. p. 2025 m. lygio skirtumas 5,1 p. p.; 2023 m. skirtumo kryptis buvo priešinga (EU-SILC aukščiau už EU-LFS). Todėl tai nėra pastovus vieno tyrimo poslinkis, kurį galima tiesiog atimti. Nežinant imties paklaidų, skirtumų statistinio reikšmingumo nenustatome.

EU-SILC lyties pjūvis 2025 m. LT: vyrai 49,2 % (p), moterys 65,9 % (p). EU-LFS: 52,0 % ir 72,3 %. Vyresnių moterų ir vyrų kontrasto kryptis sutampa. Tikslios imtys, datos ir klasifikacija ne tapatūs; tyrimų nevidurkiname ir vieno nevadiname kito revizija.

## Nacionalinis šaltinis, nepriklausomas nuo šių apklausų

2021 m. VDA surašymo skyrius https://osp.stat.gov.lt/2021-gyventoju-ir-bustu-surasymo-rezultatai/namu-ukiai-ir-seimos pateikia: 1 215,0 tūkst. namų ūkių, 35,2 % vieno asmens, 427,3 tūkst. gyvenančių po vieną. Tarp vieno asmens namų ūkių 35,5 % sudarė 70+ žmonės. Tai patvirtina, kad vyresnio amžiaus grupė jau tuomet sudarė reikšmingą gyvenančiųjų po vieną dalį, bet nepatvirtina 2025 metinio šuolio.

Surašymas taip pat nurodo, kad našlių moterų buvo 5,5 karto daugiau nei vyrų. Tai galimo demografinio konteksto faktas. Šiame puslapyje nėra našlystės × gyvenimo po vieną lentelės; todėl negalima nustatyti, kiek vieno asmens namų ūkių rodiklio paaiškina našlystė. 70+ sudėties procentas neturi būti suplaktas su 65+ gyvenimo po vieną dažniu ar perskaičiuojamas į jį.

## 2025 m. kokybės dokumento prieinamumas

Pakartotinai patikrintas https://ec.europa.eu/eurostat/cache/metadata/en/employ_simslfs2_lt.htm . Jame paskutinė atnaujinimo data 2025-06-09; susietas kokybės priedas apima 2024 m. Viešoje tikslinėje paieškoje neaptiktas pakankamas 2025 m. Lietuvos namų ūkių šuolio metodinis paaiškinimas. Tai paieškos rezultatas, ne teiginys, kad dokumento apskritai nėra. Išorinių užklausų nesiųsta.

## Ką dabar galime teigti

- Aukšta Lietuvos vyresnių žmonių gyvenimo po vieną dalis ir jos įverčių augimo kryptis matoma abiejuose apklausų šaltiniuose. Tai daugiau nei vien EU-LFS anomalijos pastebėjimas.
- Tikslaus 2024–2025 šuolio dydžio abu tyrimai vienodai nepatvirtina.
- Surašymas palaiko vyresnio amžiaus ir lyčių skirtumo svarbą kaip kontekstą, bet neteikia 2025 m. augimo priežastinės dekompozicijos.
- Nei migracija, nei našlystė, nei apklausos svoriai neįrodyti kaip konkretaus šuolio priežastis.

## Tęstinumas ir publikavimo sprendimas

Nekuriamas ketvirtas dubliuojantis registro įrašas. Nauji šaltiniai ir patikslinimas prijungti prie EU-HH-LFS-TREND-QA-2025-01, išsaugant jo ID ir VERIFIED_UNPUBLISHED būseną. Visi ankstesni 47 registro įrašai išlieka. Vieša svetainė nekeista.

Bendras tyrimo rezultatas pakankamas atsargiai aprašomajai išvadai, bet ne istorijai apie migracijos ar elgesio sukeltą šuolį. Tolesnė 2025 m. šuolio priežasčių analizė lieka RESEARCH_BLOCKED užduoties prasme, kol atsiras paklaidų ar 2025 kokybės dokumentų; pats patikrintas aprašomasis rezultatas nepaneigiamas. Kartoti tų pačių procentų skaičiavimą be naujo šaltinio nebūtina.
