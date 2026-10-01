# Alternatyvūs faktinių butų pardavimo kainų šaltiniai

Data: 2026-10-02

## 1. Registrų centro Rinkos sandorių duomenų teikimas (RSi)

Tai šiuo metu stipriausias kandidatas A varianto pardavimo kainų sluoksniui.

Registrų centro dokumentuose nurodyta, kad galima:
- ieškoti pagal savivaldybę (-es);
- filtruoti pagal sandorio datą;
- pasirinkti sandorio objektą „butai“;
- gauti sandorio sumą, paskirstytą kainą, vieneto kainą EUR/m², plotą,
  įsigytą plotą, objektų skaičių sutartyje ir kitus laukus;
- sudėtingos individualios užklausos duomenis gauti Excel formatu per iki 5 darbo dienų.

Svarbus pranašumas: ši paslauga apima ir kelių objektų sandorius bei pateikia lauką
„paskirstyta kaina“, kai notarinėje sutartyje atskiro objekto kaina išskirta.

Šaltiniai:
- https://www.registrucentras.lt/bylos/dokumentai/ntr/Rinkos%20sandoriu%20duomenu%20teikimas%20su%20asmens%20duomenimis%20%28fiziniams_asmenims%29.pdf
- https://www.registrucentras.lt/sanduzk/jsp/login.jsp

Statusas: mokama sutartinė paslauga; aktualus įkainis viešoje paieškoje dar nepatvirtintas.

## 2. Registrų centro masinio vertinimo dokumentai

Visoms savivaldybėms viešinamos nekilnojamojo turto masinio vertinimo ataskaitos ir
lyginamojo metodo modeliai. Tai oficialus, visą Lietuvą apimantis šaltinis, paremtas rinkos
sandoriais, tačiau jo rezultatas yra masinio vertinimo / vidutinės rinkos vertės modelis,
o ne faktinių metų sandorių kainų agregatas.

Naudojimas:
- validacijai ir jautrumo analizei — taip;
- pagrindiniam „faktinių pardavimo kainų“ sluoksniui — tik jei nepavyksta gauti RSi duomenų
  ir metodika aiškiai pervadinama.

## 3. Finansų ministerijos savivaldybių NT apžvalgos

2025 m. paskelbtose savivaldybių apžvalgose naudojami Registrų centro nekilnojamojo turto
rinkos sandorių duomenys. Jos pateikia metinius parduotų butų skaičius pagal savivaldybes
(2021–2025*), todėl yra labai geras nepriklausomas aprėpties QA.

Patvirtinta:
- Tauragės r. sav. 2024: 186 butai;
- Telšių r. sav. 2024: 222 butai.

Šios ataskaitos neatrodo pateikiančios mums reikalingos vienodos faktinės EUR/m² kainos visoms
savivaldybėms, todėl jos naudojamos sandorių skaičiaus validacijai.

## Darbo seka

1. Išsiaiškinti RSi kainą ir ar viena individuali užklausa gali apimti visas 60 savivaldybių,
   2024 m., objektas „butai“, su vieneto / paskirstytos kainos laukais.
2. Jei kaina priimtina — naudoti RSi kaip pagrindinį A varianto pardavimo kainų šaltinį.
3. Jei ne — audituoti 2024 m. masinio vertinimo modelius kaip galimą oficialų B-planą.


## 4. Aplinkos ministerijos / Smart Continent savivaldybių būsto prieinamumo indeksas

2026-09-01 Aplinkos ministerija viešai paskelbė „Savivaldybių būsto prieinamumo indeksą“
ir duomenų švieslentę. Oficialus puslapis nurodo, kad:
- indeksas yra 2025–2026 m. Smart Continent atlikto Būsto prieinamumo vertinimo dalis;
- šiuo metu naudojami 2022–2024 m. duomenys;
- galima filtruoti metus, regioną, savivaldybių grupę ir konkrečią savivaldybę;
- 4 švieslentės puslapyje pateikiami indekso skaičiavimui naudoti pradiniai duomenys.

Tai šiuo metu yra stipriausias NEMOKAMAS kandidatas mūsų 10 apskričių kainų sluoksniui,
nes tas pats tyrimas viešai pateikia 2024 m. vidutinę buto kainą Eur/m² ir savivaldybių pjūvį.

Oficialus puslapis:
https://am.lrv.lt/lt/veiklos-sritys-1/busto-prieinamumas/savivaldybiu-busto-prieinamumo-indeksas/

Vertinimo puslapis:
https://am.lrv.lt/lt/veiklos-sritys-1/busto-prieinamumas/busto-prieinamumo-lietuvoje-didinimo-galimybiu-vertinimas/

Tarpinių rezultatų pristatyme:
- pateikiami būstų pirkimo–pardavimo sandorių skaičiai pagal savivaldybes;
- pateikiami atskiri 2024 m. butų daugiabučiuose ir individualių namų sandorių skaičiai;
- pateikiamas žemėlapis „Vidutinė butų kaina už 1 kv. m“ pagal savivaldybes;
- Lietuvos 2024 m. kontrolinė vidutinė buto kaina = 1 669 Eur/m².

Pristatymas:
https://lntpa.lt/wp-content/uploads/2026/04/Tarpiniu-vertinimo-rezultatu-pristatymas.pdf

Statusas: PRIORITETINIS AUDITAS. Prieš naudojant reikia išsiaiškinti:
1. pirminį kainos duomenų šaltinį ir atranką;
2. ar „vidutinė butų kaina“ yra faktinių sandorių, o ne pasiūlos kaina;
3. tikslų agregavimo metodą;
4. ar 4 psl. pradiniai duomenys gali būti eksportuoti struktūrizuotu formatu;
5. ar savivaldybių sandorių skaičiai gali būti naudojami kaip svoriai apskričių agregacijai.

Jei šie punktai patvirtinami, šis šaltinis gali pakeisti mokamą RSi kaip pagrindinį
A varianto pardavimo kainų sluoksnį.
