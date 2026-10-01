# Oficialaus duomenų eksporto užklausos juodraštis

Tikslas: gauti pilną VDA / Registrų centro rinkinio „Nekilnojamojo turto registro butų pirkimų sandorių informacija gardelėse“ snapshot arba veikiančią pilno eksporto nuorodą.

Rinkinys:
https://data.gov.lt/datasets/2559/

Techninis simptomas:
- oficialus duomenų puslapis rodo JSON, JSONL ir CSV pateiktis;
- pilno JSON/JSONL ir CSV maršrutai šiuo metu grąžina HTTP 500 automatizuotose užklausose;
- vartotojo naršyklėje gauti eksportai turi _page.next, todėl yra tik daliniai API puslapiai;
- analizėje būtinas pilnas snapshot, nes dalinio puslapio negalima naudoti teritoriniams 10 apskričių agregatams.

## Laiškas VDA

Kam: atverimas@stat.gov.lt

Tema: Pilnas ButuPirkimas rinkinio eksportas analizei

Sveiki,

rengiu viešą Lietuvos būsto įperkamumo analizę pagal apskritis ir norėčiau naudoti jūsų skelbiamą rinkinį „Nekilnojamojo turto registro butų pirkimų sandorių informacija gardelėse“:
https://data.gov.lt/datasets/2559/

Man reikalingas pilnas ButuPirkimas duomenų snapshot, pageidautina CSV arba JSONL formatu. Šiuo metu per portalo pateikiamas nuorodas gaunamas tik dalinis puslapis su _page.next, o pilno eksporto endpointai mano automatizuotose užklausose grąžina HTTP 500.

Ar galėtumėte nurodyti veikiančią pilno rinkinio atsisiuntimo nuorodą arba pateikti pilną naujausią eksportą?

Analizėje duomenys būtų naudojami agreguotai — faktinei butų sandorių kainai EUR/m² apskaičiuoti pagal 10 Lietuvos apskričių. Šaltinis ir metodika būtų aiškiai nurodyti.

Ačiū.

## Laiškas VSSA

Kam: atviriduomenys@vssa.lt

Tema: data.gov.lt rinkinio 2559 pilno eksporto HTTP 500

Sveiki,

bandant atsisiųsti pilną duomenų rinkinio
https://data.gov.lt/datasets/2559/
eksportą, JSON/JSONL ir CSV pilno eksporto maršrutai grąžina HTTP 500.

Problema kartojasi tiek per oficialias portalo pateiktis, tiek automatizuotose GitHub Actions užklausose. Dalinis ButuPirkimas eksportas veikia, tačiau jame lieka _page.next cursor, todėl tai nėra pilnas snapshot.

Prašau patikrinti pilno eksporto veikimą arba nurodyti alternatyvų būdą parsisiųsti visą rinkinį.

Ačiū.
