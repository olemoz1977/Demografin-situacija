# 2025 m. privataus 1 kambario nuomos duomenų priėmimo sutartis

Statusas: research / feature/housing-affordability / nepublikuota.

## Tikslas

Sukurti palyginamą 10 Lietuvos apskričių privataus ilgalaikio 1 kambario buto
nuomos sluoksnį būsto įperkamumo modeliui.

Šis sluoksnis yra rinkos pasiūlos rodiklis, jei šaltinis yra skelbimų portalas.
Jo negalima vadinti faktinių nuomos sandorių kaina.

## Pageidaujamas šaltinio lygmuo

Pirmenybė teikiama **tiesioginiam 10 apskričių agregatui**, apskaičiuotam iš vienodo
listing-level krepšelio.

Tai geriau už savivaldybių medianų agregavimą, nes apskrities medianos negalima
tiksliai atkurti iš savivaldybių medianų.

Jei tiekėjas gali pateikti tik savivaldybių duomenis:
- būtina visų 60 savivaldybių aprėptis arba aiškus nulinės rinkos / duomenų stokos žymėjimas;
- savivaldybių medianų negalima paprastai ar svertai vidurkinti ir vadinti apskrities mediana;
- galutinis apskrities rodiklis turi būti skaičiuojamas iš listing-level duomenų arba
  tiekėjo tiesiogiai perskaičiuotas apskrities lygmeniu;
- jei naudojamas kitas agregavimo būdas, jis turi būti atskirai pagrįstas ir pažymėtas kaip modeliuotas.

## Vienodas nuomos krepšelis

Privalomi kriterijai:
- property_type = apartment;
- rooms = 1;
- rental_term = long_term;
- price_basis = asking_offer;
- laikotarpis = 2025 m.;
- mėnesinė nuomos kaina EUR/mėn.;
- savarankiškas butas, ne kambario nuoma.

Neįtraukti:
- trumpalaikės nuomos, jei ilgalaikė aiškiai nesiūloma;
- bendrabučio / kambario tipo pasiūlymų su bendromis patalpomis;
- ieškančių išsinuomoti skelbimų;
- komercinių patalpų ir kitų NT tipų;
- akivaizdžių dublių / pakartotinių to paties objekto snapshot'ų, jei jie reprezentuoja
  tą patį aktyvų pasiūlymą.

## Minimalūs laukai tiesioginiam apskrities agregatui

- county;
- year;
- property_type;
- rooms;
- rental_term;
- price_basis;
- unique_listing_count;
- median_asking_rent_eur_month.

Papildomai labai pageidautina:
- mean_asking_rent_eur_month;
- q25 / q75;
- median_area_m2;
- median_asking_rent_eur_m2;
- extraction_window_start / end;
- active_snapshot_count arba listing-days, jei metodikoje naudojami momentiniai snapshot'ai.

## Kokybės klasė

Pagal dabartinę projekto taisyklę:
- N >= 10: B;
- 5 <= N < 10: C;
- N < 5: insufficient.

N<5 apskritis negali būti naudojama galutiniam indikatoriui.

C klasė techniškai gali pereiti struktūrinį validatorių, bet turi būti aiškiai pažymėta
ir prieš publikaciją peržiūrėta metodologiškai.

## Privalomas metodikos gate

Net ir 10/10 apskričių failas nėra automatiškai publication-ready.

Prieš naudojimą turi būti patvirtinta:
1. `unique_listing_count` reiškia deduplikuotus pasiūlymus / objektus, o ne puslapio peržiūras
   ar pakartotinius mėnesio snapshot'us.
2. Visoms 10 apskričių taikytas tas pats laikotarpis ir tas pats krepšelis.
3. Mediana apskaičiuota iš listing-level mėnesinių pasiūlos kainų apskrities viduje.
4. Dokumentuotas pakartotinai paskelbtų / redaguotų skelbimų traktavimas.
5. Aišku, ar vienas objektas, aktyvus kelis mėnesius, laikomas vienu unikaliu skelbimu,
   ar keliais mėnesio stebiniais.
6. Žinomos išvestinių agregatų viešo publikavimo / citavimo teisės.

## Automatinis validatorius

`scripts/validate_housing_rent_provider.py`

Jis:
- tikrina 10/10 apskričių aprėptį;
- tikrina vienodą 1 kambario ilgalaikės butų nuomos krepšelį;
- tikrina, kad tai pasiūlos, o ne faktinių sandorių kaina;
- tikrina N ir B/C/insufficient klasę;
- generuoja tik `candidate_not_publication_approved`.

Jis sąmoningai **nepatvirtina** metodikos, deduplikavimo ir publikavimo teisių.

## Netinkami pakaitalai

- apskrities centro nuoma kaip apskrities nuoma;
- Smart Continent BI_3 rekonstrukcija kaip rinkos nuomos kaina;
- socialinio / savivaldybių būsto nuomos dydžiai;
- kelių savivaldybių medianų paprastas vidurkis;
- skirtingų portalų / skirtingų laikotarpių mišinys be aiškaus modelio ir kalibravimo.
