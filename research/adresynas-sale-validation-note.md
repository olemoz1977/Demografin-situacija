# Adresynas.lt kaip nepriklausomas faktinių sandorių validacijos veidrodis

2026-10-01 patikrinta, kad Adresynas.lt:
- naudoja tą patį data.gov.lt rinkinį 2559;
- nurodo duomenų atsisiuntimo datą 2026-08-21;
- rodo naujausią 2024 m. metinį langą ir skelbėjo pateiktas p10–p90 reikšmes;
- nerodo gardelių su mažiau nei 5 sandoriais;
- nekeičia ir neinterpoliuoja tarp skelbėjo procentilių.

Šaltiniai:
- https://adresynas.lt/saltiniai
- https://adresynas.lt/metodika

Naudojimas šiame projekte:
- VALIDACIJA: patikrinti, ar mūsų VDA snapshot / transformacijos duoda suderinamus gardelių skaičius ir reikšmes.
- NE PAGRINDINIS APSKRITIES ŠALTINIS: viešuose vietovių puslapiuose nėra patogaus unikalaus gardelės ID ir pilno apskrities eksporto, todėl deduplikacija per vietoves nebūtų patikima.
- Adresyno puslapiai patvirtina, kad 2024 m. oficialus sandorių langas egzistuoja net tuo metu, kai tiesioginis get.data.gov.lt API GitHub runneriams grąžina HTTP 500.
