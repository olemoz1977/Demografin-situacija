# Kartų dydis ir gimimų mažėjimas: preliminarus tyrimas, 2026-11-25

Būsena: MODELLED_UNPUBLISHED. Svetainė nekeičiama.

## Ankstesnis įdirbis
data/birth-sex-history.json (UN Demographic Yearbook): 1990 m. gimė 27 732 mergaitės, 1999 m. 17 659, skirtumas −36,32 %. 2025 m. šioms kartoms sukako 35 ir 26 m. Tai gimusių, o ne dabartinių gyventojų skaičiai. Amerikietiškos baby boom kartų ribos šiame modelyje nenaudojamos.

## Duomenys
Eurostat demo_pjan: LT, F, NR, 2010–2025; demo_frate: LT, NR, COMPLET, 2010–2024. Atsisiųsta 2026-11-25. Žali API atsakymai saugomi research/raw/cohort-size-20261125/.
2024 m. trūksta atskirų 15–16 ir 47–48 metų gimdymo rodiklių (N). Trūkstami duomenys nepakeisti nuliais. Pirmas pilnai stebimas vientisas pagrindinio gimdymo amžiaus intervalas: 20–44 m. Visos toliau pateikiamos dalys taikomos TIK šiam intervalui.

## Metodas
W(a,t) = [moterų skaičius sausio 1 d. t metais + sausio 1 d. t+1 metais]/2; tai apytikslė vidutinė metinė ekspozicija, ne oficialiai atkurti gimimų skaičiai.
B(t) = suma W(a,t) × f(a,t).
Simetrinė Kitagawa dekompozicija:
struktūra = suma [W1−W0] × [f0+f1]/2;
rodikliai = suma [f1−f0] × [W0+W1]/2.
Abiejų indėlių suma lygi modeliuotam B1−B0. Rodiklių indėlis apima gimdymo laiko, intensyvumo ir kitus amžiui specifinių rodiklių pokyčius; tai ne išmatuotas noras turėti vaikų.

| Laikotarpis | Modeliuoti gimimai pradžioje | 2024 | Struktūros indėlis | Rodiklių indėlis | Struktūros dalis sumažėjime |
|---|---:|---:|---:|---:|---:|
| 2010–2024 | 29 192 | 18 758 | −4 488 | −5 947 | 43,0 % |
| 2015–2024 | 29 061 | 18 758 | −2 225 | −8 078 | 21,6 % |
| 2019–2024 | 24 384 | 18 758 | −563 | −5 063 | 10,0 % |

Alternatyvus nuoseklus scenarijus: su 2024 m. moterų amžiaus sudėtimi ir 2010 m. amžiui specifiniais rodikliais 20–44 m. grupėje būtų apie 23 624 modeliuotų gimimų. Šio scenarijaus nesuplakti su simetriniu 43 % indėliu.

## Interpretacija ir ribos
Ilgu laikotarpiu moterų skaičius ir jų amžiaus sudėtis reikšmingi; naujesniame 2019–2024 m. palyginime vyrauja amžiui specifinių gimdymo rodiklių sumažėjimas. Tai aprašomasis, ne priežastinis išskaidymas.
Struktūros indėlis nėra grynas istorinių gimimų indėlis: jame susimaišo kartų dydis, migracija ir mirtingumas. Tiksliai juos atskirti reikia papildomo kohortų balanso.
Nevertinamas visas 15–49 m. intervalas, pilna užbaigta kartų vaisingumo istorija, nei 2025–2026 m. gimstamumo raida. Toliau tikrinti VDA gimimus pagal motinos amžių, oficialią vidutinę metinę moterų populiaciją ir trūkstamus amžius; tik tada spręsti dėl publikavimo.

## Aprėpties išsaugojimas
Visi ankstesni 44 registro ID ir jų publikavimo vietos lieka. Pridedamas vienas nepublikuotas modelis, skirtas fertility moduliui ateityje. Vieša svetainė nekeičiama.

Šaltiniai:
https://ec.europa.eu/eurostat/databrowser/view/demo_pjan/default/table
https://ec.europa.eu/eurostat/databrowser/view/demo_frate/default/table
https://unstats.un.org/unsd/demographic/products/dyb/DYBNat/NatStatTab01.pdf
