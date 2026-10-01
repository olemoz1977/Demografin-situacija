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
