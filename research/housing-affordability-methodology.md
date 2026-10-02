# Jaunos poros būsto įperkamumas pagal apskritis — metodika

Statusas: research / feature branch, nepublikuota.

## Tikslinis klausimas
Kiek būsto kvadratinių metrų per vienerius metus teoriškai atitinka dviejų 25–30 m. visą mėnesį dirbančių žmonių grynosios darbo pajamos, atėmus 12 mėn. 1 kambario buto nuomą?

Pirminis noras buvo rezultatą pateikti pagal 10 Lietuvos apskričių. 2026-10-01 atliktas šaltinių auditas parodė, kad oficialūs VDA būsto kainų ir nuomos rodikliai tokio geografinio detalumo nepateikia.

## Pagrindinė formulė
m²_per_year = ((2 × monthly_net_income_25_30 × 12) − annual_rent) / sale_price_eur_m2

Rodiklis yra santykinis būsto įperkamumo indeksas, o ne realiai per metus sutaupoma suma. Maistas, transportas, komunaliniai mokesčiai, kredito sąlygos ir kitos išlaidos neįtraukiamos.

## Pajamų sluoksnis
Patikrintas nacionalinis orientyras:
- Sodra, 2025 m. lapkritis: 25–30 m. visą mėnesį dirbusių apdraustųjų vidutinės darbo pajamos = 2 516 EUR bruto / 1 535 EUR neto.
- Šaltinis: https://sodra.lt/wp-content/uploads/2026/02/20260224_Sodra_2025-4-ketvircio-darbo-pajamu-apzvalga.pdf

Teritorinis orientyras:
- 2025 m. IV ketv. vidutinis neto darbo užmokestis pagal 10 apskričių saugomas faile data/housing-affordability-input.json.
- Tai visų darbuotojų, o ne tik 25–30 m. grupės rodiklis.
- Kol nėra tiesioginio amžius × apskritis pjūvio, jaunos poros pajamas galima tik modeliuoti ir tai turi būti aiškiai pažymėta.

## Oficialus būsto pirkimo kainų šaltinis — VDA
VDA rodiklis „Būsto pirkimo–pardavimo vidutinės kainos“:
- remiasi Registrų centro Nekilnojamojo turto registro ir Sandorių duomenų bazių duomenimis;
- yra faktinių pirkimo–pardavimo sandorių rodiklis;
- skelbiamas šalies mastu ir 6 miestų savivaldybėms: Vilniaus, Alytaus, Kauno, Klaipėdos, Panevėžio ir Šiaulių;
- apskričių duomenų nėra;
- laikotarpis nuo 2017 m., metinis.

Metaduomenys:
https://osp.stat.gov.lt/documents/10180/5118910/B%C5%ABsto%2Bpirkimo-pardavimo%2Bvidutin%C4%97s%2Bkainos%2B%5BLT%5D%2B155070000.html

Išvada: VDA pirkimo kainų serija labai patikima, bet 10 apskričių palyginimui neužtenka.

## Oficialus butų nuomos šaltinis — VDA
VDA rodiklis „Butų nuomos vidutinės metinės kainos“:
- skelbiamas tik 5 miestų savivaldybėms: Vilniaus, Kauno, Klaipėdos, Panevėžio ir Šiaulių;
- matavimo vienetas: EUR/m² per metus;
- apskaičiuojamas iš NT agentūrų ir internetinių portalų kainų, naudojamas 3 mėn. slenkantis vidurkis;
- apskričių ir kitų 5 apskričių centrų oficialios serijos nėra;
- laikotarpis nuo 2019 m., metinis.

Metaduomenys:
https://osp.stat.gov.lt/documents/10180/5118910/But%C5%B3%2Bnuomos%2Bvidutin%C4%97s%2Bmetin%C4%97s%2Bkainos%2B%5BLT%5D%2B163640000.html

GIS:
https://www.arcgis.com/apps/dashboards/3fba56c8042649aabbb5fc85329b2f70

## Geografinio palyginimo sprendimo taisyklė
Negalima vadinti 10 apskričių rodiklio „oficialiu apskrities vidurkiu“, jei NT sluoksnis paremtas tik apskrities centro miestu.

Tolimesni galimi variantai:
A. 5 didžiųjų miestų griežtai oficialus palyginimas — metodologiškai stipriausias, bet ne 10 apskričių.
B. 10 apskričių centrų rinkos modelis — Vilnius, Kaunas, Klaipėda, Šiauliai, Panevėžys, Alytus, Marijampolė, Utena, Telšiai, Tauragė; vienas rinkos šaltinis likusiems miestams ir aiški žyma „apskrities centro modelis“.
C. 10 apskričių tikras agregatas — reikia surinkti savivaldybių lygmens NT kainas bei nuomą ir agreguoti pagal iš anksto nustatytus svorius; tai didžiausios apimties, bet tiksliausiai atitinka pradinį klausimą.

Kol nėra pasirinktas B arba C ir užpildyti visi duomenys, live puslapio nekeisti.

## Publikavimo taisyklė
Į main / live puslapį nekelti m² rodiklio, kol nėra:
- pilnos pasirinktos geografijos pajamų įvesties;
- pilnos pardavimo kainos;
- pilnos nuomos kainos;
- vienodo laikotarpio arba aiškiai pažymėto laikotarpių skirtumo;
- metodikos ir šaltinių pastabų;
- aiškiai atskirta „oficialu“ nuo „modeliuota“.

## Vizualo planas
Pagrindinis blokas:
„Kiek būsto m² per metus atitinka dviejų jaunų dirbančių žmonių pajamos po nuomos?“

Elementai:
- horizontali diagrama;
- lentelė: teritorija, 25–30 m. modelinė neto pajamų reikšmė, nuoma, EUR/m², m²/metus;
- duomenų kokybės žyma;
- metodikos paaiškinimas;
- atskiras „be nuomos“ etaloninis rodiklis kaip papildomas palyginimas.


## 2026-10-01 šaltinių audito atnaujinimas — pasirinktas kelias

### Esminis radinys: faktinių butų sandorių sluoksnį galime sukurti visai Lietuvai
Valstybės duomenų agentūra Atvirų duomenų portale skelbia rinkinį „Nekilnojamojo turto registro butų pirkimų sandorių informacija gardelėse“.

Rinkinys:
- rengiamas iš Registrų centro NTR duomenų;
- apima 1×1 km gardeles visoje Lietuvoje;
- turi metinius laikotarpius nuo 1998 m.;
- atnaujinamas kas savaitę;
- kiekvienai gardelei pateikia sandorių ir objektų skaičių, vidutinę sandorio vertę, įsigyto ploto vidurkį, tiesioginį buto vertės EUR/m² vidurkį ir 10–90 procentilius;
- gardelės susiejamos su savivaldybe per atskirą Grid1KmSq modelį.

Šaltiniai:
- https://data.gov.lt/datasets/2559/
- https://data.gov.lt/datasets/2559/versions/1012/models/ButuPirkimas/
- API dokumentacija: https://data.gov.lt/datasets/2559/versions/1012/api/getall/ButuPirkimas/

Tai reiškia, kad pardavimo kainai NEBEREIKIA remtis skelbimų portalais ar vien apskričių centrais.

### Pardavimo kainos skaičiavimo metodas
1. Filtruoti 2025 m. įrašus.
2. Gardelę per Grid1KmSq susieti su savivaldybe.
3. Savivaldybę susieti su apskritimi.
4. Apskrities kainą skaičiuoti kaip objektų skaičiumi svertą gardelių vid_buto_verte (EUR/m²) vidurkį.
5. Papildomai skaičiuoti robustiškumo patikrą pagal gardelių buto_verte_p50 ir kainų sklaidą.
6. Skelbiamam rezultatui rodyti sandorių/objektų imties dydį.

Apribojimas: rinkinys neapima sandorių, kuriuose vienu sandoriu pirkti keli objektai (pvz., butas + sandėliukas). Tai turi būti nurodyta metodikoje.

### Pajamų sluoksnis — detalizuojame iki savivaldybių
„Sodros“ atvirų duomenų rinkinyje yra vidutinės apdraustųjų pajamos pagal savivaldybes ir atskira pajamų analizė pagal amžių ir lytį visą mėnesį dirbusiems apdraustiesiems.

Viešai patikrintas 2025 m. IV ketvirčio nacionalinis 25–30 m. orientyras: 2 516 EUR bruto / 1 535 EUR neto. Tuo pačiu laikotarpiu visą mėnesį dirbusių darbuotojų nacionalinis vidurkis: 2 480 EUR bruto / 1 514 EUR neto.

Jei tiesioginio amžius × savivaldybė pjūvio nepavyksta gauti, naudojamas aiškiai pažymėtas modelis:
jaunimo_pajamos_sav = savivaldybės_bendros_pajamos × (25–30 nacionalinis / visų nacionalinis)

2025 m. IV ketv. bruto korekcijos koeficientas pagal patikrintus „Sodros“ skaičius: 2516 / 2480 ≈ 1,0145.

Galutinis apskrities jaunimo pajamų rodiklis turi būti agreguojamas iš savivaldybių, sveriant 25–30 m. dirbančiųjų skaičiumi, jei tokį svorį galime gauti; jei ne — visų apdraustųjų skaičiumi ir pažymėti tai kaip aproksimaciją.

### Nuoma — silpniausias ir vienintelis ne visiškai oficialus sluoksnis
Atviro faktinių privačių nuomos sutarčių rinkinio, tinkamo 60 savivaldybių, šiuo metu nerasta. VDA oficiali nuomos serija apima tik 5 didžiuosius miestus.

Pasirinktas hibridinis metodas:
1. 5 didžiuosiuose miestuose VDA nuomos rodiklis naudojamas kaip etalonas / validacija.
2. Visoms savivaldybėms renkamas vienodo laikotarpio 1 kambario butų skelbimų rinkos mėginys.
3. Naudojama MEDIANA, ne vidurkis.
4. Renkami mėnesio nuoma EUR, plotas, EUR/m², skelbimų skaičius ir surinkimo data.
5. Dubliuoti skelbimai deduplikuojami.
6. Savivaldybės su maža imtimi jungiamos į ilgesnį 90 dienų langą.
7. Jei ir tada N < 5, savivaldybės nuomos rodiklis nepublikuojamas tiesiogiai, o apskrities rodiklis sudaromas iš likusių stebimų savivaldybių ir pažymimas žemesne duomenų kokybės klase.

Apskrities nuomos rodikliui rekomenduojamas ne paprastas savivaldybių vidurkis, o nuomininko ekspozicijos svoris: prioritetas — 25–30 m. dirbančiųjų skaičius; atsarginis svoris — 25–34 m. gyventojų skaičius; tik kraštutiniu atveju — visų gyventojų skaičius.

### Galutinė pasirinkta architektūra
A. PAJAMOS — oficialus šaltinis + modelinė 25–30 m. teritorinė korekcija.
B. PIRKIMO KAINA — faktiniai Registrų centro sandoriai per VDA atvirų duomenų gardeles.
C. NUOMA — rinkos pasiūlos mediana, validuojama prieš VDA 5 didžiųjų miestų oficialią seriją.

Pagrindinis rodiklis:
m²_po_nuomos = ((2 × jaunimo_neto_mėn × 12) − metinė_1k_nuoma) / faktinė_buto_kaina_EUR_m²

Kontroliniai rodikliai:
- m²_be_nuomos;
- nuomos našta = metinė nuoma / poros metinės neto pajamos;
- kainos/pajamų santykis;
- duomenų kokybės klasė A/B/C.

### Duomenų kokybės klasės
A — oficialus tiesioginis arba faktinių sandorių sluoksnis su pakankama imtimi.
B — oficialių duomenų pagrindu modeliuotas teritorinis rodiklis arba rinkos mediana su N ≥ 10.
C — rinkos mediana su 5 ≤ N < 10 arba reikšminga geografinė aproksimacija.
N < 5 — neskaičiuoti atskiro teritorijos rodiklio.

### Publikavimo sprendimas
Galutiniame puslapyje NEGALIMA rašyti, kad visas rodiklis yra „oficiali statistika“. Teisinga formuluotė: „Autoriaus apskaičiuotas būsto įperkamumo rodiklis, sudarytas iš oficialių pajamų ir faktinių NT sandorių duomenų bei rinkos nuomos pasiūlos duomenų.“

main nekeisti, kol 2025 m. faktinių sandorių agregatas apskritims nesuskaičiuotas, savivaldybių pajamų sluoksnis nesukomplektuotas, nuomos imtis nesurinkta ir nevaliduota, nepaskaičiuotos kokybės klasės ir jautrumo analizė.


## 2026-10-02 metodikos korekcija — supersedes 2026-10-01 grid architecture

2026-10-01 prielaida, kad VDA / RC 1×1 km `ButuPirkimas` gardelių rinkinys gali būti
pagrindinis 10 apskričių faktinių butų kainų sluoksnis, **atšaukta** po aprėpties audito.

Patvirtinta:
- 2024 m. pilname šio endpointo snapshot yra tik 516 sandorių / 474 objektai;
- aprėptis — 33 savivaldybės ir 8 apskritys;
- Tauragės ir Telšių apskritys nepatenka;
- nepriklausomi oficialūs RC kontroliniai dydžiai rodo, kad 2024 m. butų rinkos apimtis buvo
  daug didesnė;
- todėl dataset 2559 yra siauras rinkos poaibis ir galutinei 10 apskričių kainai netinka.

Dabartinė pardavimo architektūra:
1. pagrindinis šaltinis — oficialus RC 2024 butų sandorių 60 savivaldybių
   agregatas arba anonimizuotas micro-layer;
2. `scripts/build_housing_sale_county_from_rc.py` tikrina 60/60 → 10/10 struktūrą;
3. gardelės paliekamos tik QA / outlier / JOIN diagnostikai;
4. legacy grid pipeline pagal nutylėjimą užblokuotas.

Dabartinė nuomos architektūra:
1. pagrindinis tikslas — 2025 m. privataus ilgalaikio 1 kambario buto pasiūlos mediana
   visoms 10 apskričių;
2. pageidaujamas tiesioginis apskrities agregatas iš vienodo listing-level krepšelio;
3. validatorius `scripts/validate_housing_rent_provider.py`;
4. N>=10 → B; 5–9 → C; N<5 → insufficient;
5. VDA 2025 oficialus 5 didžiųjų miestų rodiklis S7R281 naudojamas kaip kontrolė;
6. Smart Continent BI_3 — QA tik, pagrindiniam nuomos sluoksniui FAIL.

2025 m. VDA kontrolinės nuomos reikšmės:
- Vilnius: 155,09 EUR/m²/metus;
- Kaunas: 124,35;
- Klaipėda: 113,46;
- Šiauliai: 95,15;
- Panevėžys: 91,40.

Ši korekcija yra viršesnė už ankstesnę to paties dokumento skiltį
„Esminis radinys: faktinių butų sandorių sluoksnį galime sukurti visai Lietuvai“.

`main` / live nekeisti, kol RC pardavimo ir 10 apskričių nuomos vartai nepraeiti.
