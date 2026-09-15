// Redakcinis sluoksnis: profesionali, bet žmogiška kalba. Duomenų ir metodikos nekeičia.
(() => {
  const q=(s)=>document.querySelector(s);
  const qa=(s)=>[...document.querySelectorAll(s)];
  const text=(s,v)=>{const el=q(s); if(el) el.textContent=v;};
  const html=(s,v)=>{const el=q(s); if(el) el.innerHTML=v;};
  const textAt=(s,i,v)=>{const el=qa(s)[i]; if(el) el.textContent=v;};
  const htmlAt=(s,i,v)=>{const el=qa(s)[i]; if(el) el.innerHTML=v;};
  const replace=(s,from,to)=>{const el=q(s); if(el && el.innerHTML.includes(from)) el.innerHTML=el.innerHTML.replace(from,to);};
  const replaceAll=(s,from,to)=>qa(s).forEach(el=>{if(el.innerHTML.includes(from)) el.innerHTML=el.innerHTML.replace(from,to);});

  function staticCopy(){
    text('#apzvalga h2','Naujausias vaizdas: ką jau žinome apie 2025 metus');
    html('#apzvalga .lead','<strong>2025P TFR = 1,03</strong> – Eurostat EUROPOP2025 bazinio scenarijaus 2025 m. įvertis. Paprastai tariant, tai dabartinis Eurostat bazinis vertinimas, o ne galutinis stebėtas 2025 m. TFR. 2024 m. galutinis rodiklis – <strong>1,11</strong>.');

    html('#tfr .alert-blue','<strong>Svarbu:</strong> Lietuvos TFR 2023→2024 m. sumažėjo, tačiau negalime teigti, kad kritimas buvo sparčiausias ES. Eurostat didžiausią metinį sumažėjimą fiksuoja Rumunijoje: 1,54 → 1,39.');

    html('#amzius .lead','2024 m. Lietuvos rodiklis buvo <strong>28,7 metų</strong>, ES vidurkis – <strong>29,9</strong>. Vėlesnis pirmas vaikas gali trumpinti laiką vėlesniems gimimams, tačiau vien šis rodiklis Lietuvos TFR nepaaiškina.');

    text('#skaitmena h2','Skaitmeninis gyvenimas pasikeitė smarkiai. Čia jį rodome kaip kontekstą, ne kaip gimstamumo priežastį');
    html('#skaitmena .alert-green','<strong>Kaip tai skaityti.</strong> Skaitmeninio naudojimo ir demografinių rodiklių kreivės gali keistis tuo pačiu metu. Vien toks sutapimas dar nepasako, kad vienas reiškinys sukėlė kitą.');

    html('#uzsienieciai .lead','2025 m. gruodžio 31 d. Lietuvoje gyveno <strong>217 067 užsienio piliečiai</strong> – 7,5 % šalies gyventojų. Čia žiūrime į bendrą mastą, neskirstydami žmonių pagal pilietybės valstybes.');
    replace('#uzsienieciai .alert-amber','Ilgalaikės prognozės riba.','Ko čia neprognozuojame.');

    text('#metodika h2','Kaip skaityti šį tyrimą');
    text('#isvados h2','Ką duomenys leidžia pasakyti – ir kur prasideda nežinomybė');
  }

  function homeCopy(){
    text('#researchHome h2','Ne vienas skaičius. Penkios susijusios tyrimo kryptys.');
    html('#researchHome .lead','Jei norite tik esmės, jos pakanka šiame puslapyje. Jei norite suprasti, <strong>kas slypi už skaičių</strong>, tyrimą galima atsidaryti pagal temą – nuo gimstamumo ir gyventojų struktūros iki migracijos, šeimos aplinkos ir ateities scenarijų.');
    replace('#researchHome .research-summary .card:nth-child(2) p','Gimimų santykis vienas to nepaaiškina; migracijos pjūvis rodo stiprų papildomą mechanizmą.','Gimimų santykis vienas to nepaaiškina. Migracijos duomenys rodo stiprų papildomą mechanizmą, kurį verta nagrinėti atskirai.');
    replace('#researchHome .topic-card:nth-child(4) p','Išmokų istorija ir FRE, infrastruktūra, santuokos, skaitmeninis kontekstas ir partnerystės hipotezės.','Išmokų istorija ir FRE, infrastruktūra, santuokos, darbo–šeimos aplinka bei partnerystės ir skaitmeninio konteksto hipotezės.');
    replace('#researchHome .alert-blue','Kaip skaityti tyrimą.','Tyrimo taisyklė.');
    const intro=q('#researchTopicIntro .eyebrow');
    if(intro) intro.textContent='TYRIMO KRYPTIS';
  }

  function sexCopy(){
    replace('#reproLatestNote',' moteris ir ',' moterų ir ');
    replace('#reproLatestNote','Visos populiacijos bendras 2025 m. rodiklis (1 104) šį amžiaus skirtumą paslepia.','Bendras visų amžiaus grupių 2025 m. rodiklis – 1 104 – šio skirtumo reprodukciniame amžiuje neparodo.');

    text('#sexBirthCohortBlock h3','Ar dabartinį disbalansą galima paaiškinti vien tuo, kad gimė mažiau mergaičių?');
    html('#sexBirthCohortBlock .lead','<strong>Ne vien tuo.</strong> 1985–1999 m. Lietuvoje gimstant santykis buvo maždaug <strong>942–950 mergaičių 1 000 berniukų</strong>. 2025 m. atitinkamose 25–39 m. gyventojų grupėse jis jau buvo tik <strong>877–884 moterys 1 000 vyrų</strong>. Vadinasi, gimimo metu buvęs skirtumas dabartinio santykio visiškai nepaaiškina.');
    replace('#sexBirthCohortBlock .alert-amber','Svarbi metodinė riba.','Šio palyginimo riba.');
    replace('#sexBirthCohortBlock .alert-amber','Todėl grafikas parodo, kad <strong>vien biologinio santykio gimstant dabartiniam skirtumui paaiškinti nepakanka</strong>, bet pats savaime neįrodo priežasties.','Todėl grafikas leidžia pasakyti vieną dalyką: <strong>gimimų santykio dabartiniam skirtumui nepakanka</strong>. Kas skirtumą padidino vėliau, reikia tikrinti atskirai.');
  }

  function migrationCopy(){
    textAt('#migrationSexBlock h3',0,'Kaip migracija keitė 25–44 m. lyčių balansą?');
    replace('#migrationSexBlock .lead','Tai jau tiesioginis migracijos srautų signalas, tačiau <strong>ne 2025 m. gyventojų lyčių disbalanso priežasties įrodymas</strong>.','Skirtumas aiškus. Tačiau vien šio sumavimo neužtenka teigti, kad migracija viena sukūrė 2025 m. gyventojų lyčių disbalansą.');
    replaceAll('#migrationSexBlock .alert','Kaip interpretuoti.','Ką tai reiškia.');
    replace('#migrationSexBlock .alert-amber','Todėl čia tikriname mechanizmą, o ne skelbiame vieną priežastį.','Todėl migraciją laikome svarbiu paaiškinimo mechanizmu, bet ne vienintele priežastimi.');
    replace('#migrationSexBlock .alert-blue','Svarbus kontrastas.','Svarbus skirtumas.');
  }

  function policyCopy(){
    text('#parama-istorija h2','2007–2012 m. dosnios išmokos sutapo su TFR kilimu. Sutapimas dar nėra priežastis');
    htmlAt('#parama-istorija .alert-amber',0,'<strong>Svarbi korekcija.</strong> 2008–2009 m. sistema nebuvo tiesiog „be lubų“. Išmokos buvo labai dosnios, tačiau maksimalus kompensuojamasis uždarbis buvo ribojamas. Todėl toliau ją vadiname <strong>labai dosnia / aukštų lubų sistema</strong>.');

    const tfrCanvas=q('#policyTfrChart');
    const tfrCaption=tfrCanvas?.closest('.chart-wrap')?.nextElementSibling;
    if(tfrCaption?.classList.contains('chart-caption')) tfrCaption.innerHTML='Eurostat stebėtas Lietuvos TFR · 2005–2012. Trūkstamų reikšmių neinterpoliuojame.';

    const blue=qa('#parama-istorija .alert-blue').find(el=>el.textContent.includes('Ką galima pasakyti') || el.textContent.includes('Eurostat fiksuoja'));
    if(blue) blue.innerHTML='<strong>Ką iš to galime pasakyti.</strong> Lietuvos TFR nuo 1,29 2005 m. pakilo iki 1,50 2010 m., 1,55 2011 m. ir 1,60 2012 m. Kilimas sutapo su ypač dosnios šeimos politikos laikotarpiu, tačiau prasidėjo dar iki 2008 m. reformos. Tuo pačiu metu keitėsi ekonomika, migracija, amžiaus struktūra ir galėjo realizuotis anksčiau atidėti gimimai. Todėl tai yra <strong>įdomus politikos poveikio signalas, bet ne priežasties įrodymas</strong>.';

    const orderTitle=qa('#parama-istorija h3').find(el=>el.textContent.trim()==='Ar keitėsi gimimų eiliškumas?');
    if(orderTitle) orderTitle.textContent='Ar keitėsi pirmų, antrų ir trečių vaikų dalis?';
    const birthLead=qa('#parama-istorija .lead').find(el=>el.textContent.includes('demo_find'));
    if(birthLead) birthLead.innerHTML='Svarbu žiūrėti ne tik į bendrą TFR. <strong>Gimimų eiliškumas</strong> parodo, ar tuo laikotarpiu keitėsi pirmų, antrų ir trečių vaikų dalis. Tai padeda tiksliau klausti, ar finansinis saugumas galėjo būti svarbesnis sprendžiant dėl antro ar trečio vaiko.';

    const finTitle=qa('#parama-istorija h3').find(el=>el.textContent.trim()==='Finansinė pusė');
    if(finTitle) finTitle.textContent='Kokia buvo finansinė pusė?';
    textAt('#parama-istorija .finding-title',0,'2008 m. išmokų sistema pareikalavo daug lėšų');
    textAt('#parama-istorija .finding-title',2,'Dosnumas ir tvarumas – du skirtingi klausimai');
    const green=qa('#parama-istorija .alert-green').find(el=>el.textContent.includes('Ką verta stebėti dabar'));
    if(green) green.innerHTML='<strong>Ką verta stebėti dabar.</strong> Jei norime rimtai įvertinti 2026 m. paketą, neužteks žiūrėti tik į bendrą TFR. Reikės sekti <strong>pirmų, antrų ir trečių gimimų dalis, motinos amžių pagal gimimo eiliškumą, gimimus pagal pajamas ar užimtumo statusą (jei tokie oficialūs duomenys bus prieinami) ir realią metinę paketo kainą</strong>.';
  }

  function infrastructureCopy(){
    html('#infrastruktura .lead','Didmiesčių duomenys rodo paprastą paradoksą: mieste vienu metu gali būti ir laisvų vietų, ir laukiančių vaikų. Vadinasi, svarbu ne tik <strong>kiek vietų yra mieste</strong>, bet ir ar šeima turi tinkamą vietą ten, kur gyvena.');
    html('#infrastruktura .alert-amber','<strong>Šių skaičių tiesiogiai nelyginame.</strong> Vilnius, Kaunas ir Klaipėda „eiles“ bei „laisvas vietas“ skaičiuoja ne visai vienodai. Čia jie rodo tą patį principą: <strong>vietų gali būti, bet ne ten, kur jų labiausiai reikia</strong>.');
    const green=q('#infrastruktura .alert-green');
    if(green) green.innerHTML='<strong>Yra ir geras signalas.</strong> 2026 m. Vilnius skelbė, kad 98 % prašymus teikusių vaikų jau buvo priimti į norimas mokyklas. Tai primena, kad infrastruktūros problema nėra vien kryptingai blogėjanti – ją galima mažinti plečiant tinklą ir geriau planuojant srautus.';
    const blue=qa('#infrastruktura .alert-blue').find(el=>el.textContent.startsWith('Išvada.'));
    if(blue) blue.innerHTML='<strong>Ką tai reiškia šeimai.</strong> Svarbu ne vien bendras darželių ar mokyklų vietų skaičius. Svarbu, ar tinkama vieta yra <strong>arti namų ir nereikalauja neproporcingos kasdienės logistikos</strong>. Finansinė parama ir patogi infrastruktūra nėra alternatyvos – jos viena kitą papildo.';
  }

  function futureCopy(){
    text('#scenarijai h2','Darbuotojų mažės. Esminis klausimas – ar produktyvumas ir socialinės sistemos finansavimas spės prisitaikyti');
    htmlAt('#scenarijai .alert-amber',0,'<strong>Čia atskiriame du sluoksnius.</strong> Pirmiausia – oficialios Europos Komisijos projekcijos. Po jų – mūsų scenarijai, paremti šiame tyrime parodytais duomenimis ir OECD aprašytais mechanizmais. <strong>Scenarijai nėra prognozuojamos tikimybės.</strong>');
    textAt('#scenarijai h3',0,'Ką oficialiai projektuoja Europos Komisija');
    const small=qa('#scenarijai .small').find(el=>el.textContent.includes('constant policy'));
    if(small) small.innerHTML='Tai ilgalaikės projekcijos darant prielaidą, kad politikos kryptis iš esmės nesikeičia. Tai <strong>ne garantuota ateitis</strong>; 2035 ir 2045 m. reikšmių patys neinterpoliuojame.';
    textAt('#scenarijai h3',1,'Nuo oficialių skaičių – prie klausimo, ką jie gali reikšti');
    textAt('#scenarijai .finding-title',0,'Mažiau darbuotojų, daugiau vyresnio amžiaus žmonių');
    textAt('#scenarijai .finding-title',2,'Mažiau darbuotojų nebūtinai reiškia mažesnę gamybą');
    htmlAt('#scenarijai .finding-body',2,'<strong>Scenarijus, ne garantija.</strong> Jei produktyvumas augs greičiau nei mažės darbo pasiūla, mažesnė darbo jėga nebūtinai reikš proporcingai mažesnę ekonomiką. Tokiu atveju automatizacija senstančiai Lietuvai būtų ne grėsmė, o viena iš prisitaikymo priemonių.');
    htmlAt('#scenarijai .finding-body',4,'Labai automatizuota įmonė ir toliau moka pelno, vartojimo, turto bei kitus mokesčius. Klausimas ne „ar robotas moka mokesčius?“, o <em>ar socialinės sistemos pajamų bazė juda kartu su tuo, kur ekonomikoje kuriama vertė</em>.');

    const cards=qa('#scenarijai .three-col .card');
    if(cards[0]) cards[0].innerHTML='<h3>A · Prisitaikanti ekonomika</h3><p><strong>Prielaida:</strong> automatizacija ir produktyvumas auga, dalį darbo jėgos trūkumo kompensuoja migracija bei ilgesnis aktyvus amžius, o socialinės apsaugos finansavimo bazė pamažu plečiama už darbo pajamų ribų.</p><p style="margin-top:.7rem"><strong>Galima kryptis:</strong> darbuotojų mažiau, bet vienas darbuotojas sukuria daugiau vertės; demografinė našta tampa lengviau valdoma.</p>';
    if(cards[1]) cards[1].innerHTML='<h3>B · Automatizacija + sena finansavimo logika</h3><p><strong>Prielaida:</strong> kapitalo ir technologijų vaidmuo auga, bet didelė socialinės sistemos finansavimo dalis ir toliau remiasi darbo pajamomis.</p><p style="margin-top:.7rem"><strong>Rizika:</strong> likusiam darbui tenka vis didesnė našta. Taip gali susidaryti uždaras ratas: kuo darbas brangesnis, tuo didesnė paskata dalį jo keisti kapitalu ir technologijomis.</p>';
    if(cards[2]) cards[2].innerHTML='<h3>C · Lėta automatizacija</h3><p><strong>Prielaida:</strong> darbui imlios įmonės lėtai diegia technologijas, o darbo pasiūla mažėja pagal demografinę kryptį.</p><p style="margin-top:.7rem"><strong>Rizika:</strong> darbuotojų trūkumas ir darbo sąnaudų spaudimas didėja, o konkurencingumas silpnėja ten, kur dalį darbo būtų galima automatizuoti.</p>';

    const green=qa('#scenarijai .alert-green').find(el=>el.textContent.includes('Pagrindinė hipotezė'));
    if(green) green.innerHTML='<strong>Pagrindinė šio tyrimo hipotezė:</strong> Lietuvos demografinė problema nebūtinai bus „per mažai žmonių pagaminti pakankamai“. Ji gali tapti problema, kai <strong>darbo pajamų bazė per siaura finansuoti sistemą</strong>, nors technologijos leidžia ekonomikai sukurti pakankamai vertės.';

    const watch=qa('#scenarijai h3').find(el=>el.textContent.includes('Ką stebėti'));
    if(watch) watch.textContent='Ką stebėti, kad pamatytume, kuri kryptis pildosi';
  }

  function familyHypothesisCopy(){
    if(!q('#familyFormationHypotheses')) return;
    htmlAt('#familyFormationHypotheses .alert-amber',0,'<strong>Kur baigiasi duomenys.</strong> Žemiau nėra vieno „atsakymo“, kodėl Lietuvos TFR toks žemas. Tai skirtingo įrodymų stiprumo mechanizmai: vienus gana gerai palaiko tarptautiniai tyrimai, kitus laikome hipotezėmis. Socialinių tinklų grandinė iki gimstamumo aiškiai pažymėta kaip autoriaus hipotezė.');
    textAt('#familyFormationHypotheses .finding-title',0,'Vėlesnis pirmas vaikas palieka mažiau laiko antram ir trečiam');
    textAt('#familyFormationHypotheses .finding-title',3,'Daug pasirinkimo nebūtinai palengvina partnerio pasirinkimą');
    htmlAt('#familyFormationHypotheses .finding-body',3,'<strong>Tyrimų palaikymas – vidutinis ir netiesioginis.</strong> Eksperimentai su pažinčių programėlėmis rodo, kad labai didelė potencialių partnerių pasiūla gali sukelti pasirinkimo perkrovą ir apsunkinti sprendimą. Tai pagrindžia vieną grandį, bet neįrodo poveikio Lietuvos gimstamumui.');

    const author=qa('#familyFormationHypotheses .alert-blue').find(el=>el.textContent.includes('Autoriaus nuomonė'));
    if(author) author.innerHTML='<strong>Autoriaus hipotezė.</strong> Socialiniai tinklai ir pažinčių platformos gali kelti „tinkamo partnerio“ lūkesčių kartelę: realus žmogus lyginamas ne tik su artima aplinka, bet ir su nuolatiniu atrinktų bei pagražintų alternatyvų srautu. Kartu gali mažėti gyvo bendravimo praktika – gebėjimas toleruoti netobulumą, spręsti konfliktą ir atpažinti realų suderinamumą. <strong>Grandinės socialiniai tinklai → partnerio pasirinkimas → vėlesnė stabili partnerystė → vėlesnis pirmas vaikas → mažiau aukštesnio eiliškumo gimimų Lietuvai priežastiniu tyrimu nepatvirtinome.</strong>';
    const chainTitle=qa('#familyFormationHypotheses h3').find(el=>el.textContent.includes('Hipotezinė grandinė'));
    if(chainTitle) chainTitle.textContent='Grandinė, kurią būtų verta patikrinti Lietuvoje';
  }

  function freCopy(){
    const lead=q('#policyFreBlock .lead');
    if(lead) lead.innerHTML='<strong>FRE (full-rate equivalent)</strong> leidžia skirtingas išmokų schemas paversti į vieną bendrą matą. Mintis paprasta: perskaičiuojame skirtingus procentus taip, tarsi visa parama būtų mokama po <strong>100 % ankstesnių pajamų</strong>, ir pažiūrime, kiek tokių „pilno tarifo mėnesių“ susidarytų.';
    replace('#policyFreBlock .chart-caption','Jis leidžia palyginti sistemas nenaudojant litų ar eurų, todėl valiutos pakeitimas ir infliacija čia netrukdo.','Taip galime palyginti skirtingų laikotarpių schemas neversdami litų į eurus ir nekoreguodami nominalių sumų dėl infliacijos.');
  }

  function polish(){
    staticCopy();
    homeCopy();
    sexCopy();
    migrationCopy();
    policyCopy();
    infrastructureCopy();
    futureCopy();
    familyHypothesisCopy();
    freCopy();
  }

  polish();
  [250,700,1400,2600].forEach(ms=>setTimeout(polish,ms));

  const watched='#researchHome,#researchTopicIntro,#reproLatestNote,#sexBirthCohortBlock,#migrationSexBlock,#parama-istorija,#policyFreBlock,#infrastruktura,#scenarijai,#familyFormationHypotheses';
  let timer=null;
  const observer=new MutationObserver(mutations=>{
    const relevant=mutations.some(m=>[...m.addedNodes].some(node=>node.nodeType===1&&(node.matches?.(watched)||node.querySelector?.(watched))));
    if(!relevant) return;
    clearTimeout(timer);
    timer=setTimeout(polish,80);
  });
  observer.observe(document.body,{childList:true,subtree:true});
})();
