# ButuPirkimas eksporto QA — svarbi korekcija

Statusas: INVALIDUOTA kaip statistinis apskričių agregatas.

2026-10-01 patikrinus vartotojo pateiktą `ButuPirkimas.csv` paaiškėjo:
- faile yra 4 630 duomenų eilučių;
- laukas `_page.next` turi tęsinio žymą;
- vadinasi tai nėra visas VDA / Registrų centro rinkinys, o tik viena API puslapio dalis;
- todėl iš šio failo apskaičiuotos apskričių aprėptys, sandorių skaičiai ir €/m² rodikliai NEGALI būti naudojami analizei ar publikavimui.

Svarbu:
- 146/146 šiame faile buvusių 2024 m. gardelių sėkmingai susijungė su `Grid1KmSq.csv`;
- taigi JOIN logika ir laukų interpretacija techniškai patvirtinta;
- tačiau statistinis rezultatas yra nepilnas dėl puslapiavimo.

Anksčiau pastebėta Utenos anomalija (labai mažo įsigyto ploto atvejis) lieka naudinga kaip QA pavyzdys, bet ne kaip apskrities statistikos įrodymas.

Toliau:
1. parsisiųsti VISUS `ButuPirkimas` API puslapius pagal `_page.next`;
2. sujungti juos į vieną pilną snapshot;
3. patikrinti eilučių skaičių, metų aprėptį ir paskutinį cursor;
4. tik tada kartoti 2024 / 2022–2024 agregavimą.

`main` nekeisti.
