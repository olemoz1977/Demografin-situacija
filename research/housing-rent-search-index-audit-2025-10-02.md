# 2025 m. mažųjų miestų nuomos paieškos indekso auditas — 2026-10-02

Statusas: research / nepublikuota.

## Tikslas

Patikrinti, ar viešai indeksuojamais Skelbiu.lt istoriniais puslapiais galima pakelti
Utenos, Tauragės ir Telšių 2025 m. 1 kambario ilgalaikės nuomos imtis bent iki N>=5,
nemažinant jau nustatytos kokybės kartelės.

## Priėmimo kriterijai

Priimama tik jei viename patikrinamame istoriniame puslapyje galima pagrįsti:
- atnaujinimo data yra 2025 m.;
- vieta yra tikslinis miestas;
- 1 kambario savarankiškas butas;
- nurodyta mėnesio kaina ir plotas;
- nėra aiškaus tik trumpalaikės nuomos signalo;
- nėra kambario / komercinių patalpų nuoma;
- skelbimas nėra jau turimos eilutės dublikatas.

Dabartinis / 2026 m. skelbimas nėra naudojamas net jei pardavėjas registruotas 2025 m.

## Naujas priimtas stebinys

### Telšiai — PASS
- 2025-08-01
- 360 EUR/mėn.
- 37 m²
- 1 kamb.
- 9,73 EUR/m²
- Žemaitės g.
- šaltinis:
  https://www.skelbiu.lt/skelbimai/nuomojamas-butas-renovuotame-name-80855399.html
- pagrindas: istorinis puslapis aiškiai rodo atnaujinimą 2025-08-01, 1 kambario
  savarankišką butą ir mėnesio nuomos kainą; trumpalaikės nuomos signalo nėra.

Rezultatas:
- Telšiai N=3 -> N=4;
- mediana 250 -> 275 EUR/mėn.;
- kokybė lieka `insufficient`.

## Patikrinti, bet atmesti kandidatų tipai

### Utena
- https://www.skelbiu.lt/skelbimai/nuoma-80731027.html
  - 2025-08-03, bet 2 kambariai -> REJECT wrong basket.
- https://www.skelbiu.lt/skelbimai/buto-nuoma-82277032.html
  - 2025-11-18, 3 kambariai (apraše minimi 2) -> REJECT wrong basket / inconsistent.
- dabartinis 1 kambario skelbimas Vaižganto g., 330 EUR:
  - puslapis rodo `Atnaujintas prieš ...`, o ne įrodomą 2025 m. datą;
  - pardavėjo registracijos 2025 m. data nėra skelbimo 2025 m. stebinio įrodymas -> REJECT current observation.

### Telšiai
- https://www.skelbiu.lt/skelbimai/31-kv-m-butoko-nuoma-telsiuose-ezero-g-80675525.html
  - 2025-10-19, 1 kamb., bet kategorija / aprašymas rodo patalpą konsultacijoms,
    masažui ir pan., ne normalų privataus 1 kambario buto krepšelį -> REJECT wrong use/basket.
- https://www.skelbiu.lt/skelbimai/2-kambariu-buto-nuoma-be-tarpininku-telsiuose-81776708.html
  - 2025-10-17, 2 kambariai -> REJECT wrong basket.
- https://www.skelbiu.lt/skelbimai/buto-nuoma-telsiuose-81533259.html
  - 2025-10-15, 2 kambariai -> REJECT wrong basket.
- dabartinis Laisvės g. 1 kambario ilgalaikės nuomos skelbimas, 260 EUR:
  - aktualus dabar, bet puslapis nerodo įrodomos 2025 m. stebinio datos -> REJECT current observation.

### Tauragė
- https://www.skelbiu.lt/skelbimai/trumpalaike-buto-nuoma-59193492.html
  - 2025-10-05, 1 kamb., bet tik trumpalaikė nuoma -> REJECT short-term.
- https://www.skelbiu.lt/skelbimai/buto-nuoma-taurageje-80863717.html
  - 2025-08-01, 4 kambariai -> REJECT wrong basket.
- komercinių patalpų / teritorijos nuomos rezultatai -> REJECT wrong property type.

## Būsena po papildomos paieškos

- Utena: N=4 -> `insufficient`
- Telšiai: N=4 -> `insufficient`
- Tauragė: N=2 -> `insufficient`
- Alytus: N=6 -> C
- Marijampolė: N=7 -> C

Viešo paieškos indekso kelias šiuo metu **neįrodo**, kad galime patikimai pasiekti N>=5
visiems trims silpniausiems miestams, nekontaminuodami 2025 m. imties dabartiniais,
trumpalaikiais ar netinkamo turto tipo skelbimais.

## Metodinis sprendimas

- N ribos nemažinti.
- Dabartinių 2026 m. skelbimų nepridėti prie 2025 m. imties.
- Skirtingų portalų pavienių skelbimų nemaišyti į tą pačią medianą be atskiro
  kalibravimo modelio.
- Paieškos indekso imtį laikyti diagnostine / pagalbine.
- Pagrindinis kelias lieka vienodo tiekėjo 10 apskričių istorinis agregatas arba
  listing-level eksportas.
