(() => {
  const SECTION_ID='housingAffordability';

  function insertShell(){
    if(document.getElementById(SECTION_ID)) return document.getElementById(SECTION_ID);
    const section=document.createElement('section');
    section.id=SECTION_ID;
    section.innerHTML=`<div class="container">
      <div class="section-label">Jaunų šeimų pirmasis būstas <span class="badge badge-official">BŪSTAS · 2024–2025 FAKTAI IR TYRIMO EIGA</span></div>
      <h2>Ar pirmasis būstas prieinamas jaunoms šeimoms?</h2>
      <p class="lead"><strong>Ką jau galime pasakyti:</strong> turime 2024–2025 m. butų pardavimo kainų duomenis šešiuose miestuose, 2025 m. gruodžio nuomos ir pirkimo intervalus trijuose miestuose bei valstybės paramos gavėjų statistiką. <strong>Ko dar negalime:</strong> patikimai palyginti pirmojo būsto įperkamumo jaunoms šeimoms visose 10 apskričių. Tam trūksta suderintų būsto, teisiškai apibrėžtų šeimų pajamų, sudėties ir išlaidų duomenų.</p>
      <p class="small" id="housingYoungFamilyDefinition"><strong>Ką šiame tyrime vadiname jauna šeima?</strong> Remiamės Lietuvoje būsto paramai taikoma teisine sąvoka: sutuoktinių ar registruotų partnerių šeima, kurioje kiekvienas yra iki 36 metų, arba vienas vaiką (-us) auginantis tėvas ar motina iki 36 metų. Tai nėra visų jaunų asmenų ar visų pirmojo būsto pirkėjų statistinė grupė. <a href="https://socmin.lrv.lt/lt/veiklos-sritys/seima-ir-vaikai/finansine-paskata-pirmaji-busta-isigyjancioms-jaunoms-seimoms/" target="_blank" rel="noopener">SADM · teisinė apibrėžtis</a>.</p>




      <section class="housing-research-evidence" id="housingMarketResearch" aria-labelledby="housingMarketResearchTitle">
        <div class="section-label">Pirmojo būsto įperkamumas <span class="badge badge-prelim">2024–2025 · TYRIMAS TĘSIAMAS</span></div>
        <h3 id="housingMarketResearchTitle">Ką jau ištyrėme apie būsto kainas ir nuomą?</h3>
        <p class="small" id="housingSingleAdultHouseholds"><strong>Namų ūkių kontekstas:</strong> Eurostat 2025 m. preliminariais duomenimis, Lietuvoje <strong>55,7 % privačių namų ūkių</strong> sudarė vienas suaugęs asmuo be išlaikomų vaikų (ES – 35,7 %). Tai <strong>ne būsto įperkamumo, nuosavybės ar jaunų šeimų rodiklis</strong>. <a href="?view=population#populationHouseholdStructure">Rodiklio paaiškinimas – Gyventojų struktūroje →</a></p>

        <p>Čia – atskiri patikrinami <strong>rinkos faktai</strong>, o ne apskričių įperkamumo reitingas. Skirtingo laikotarpio ir standarto duomenų į vieną tariamai tikslų rodiklį nejungiame.</p>
        <h4>1. VDA: daugiabučių butų pardavimo kainos šešiuose miestuose</h4>
        <p class="small"><strong>Oficiali 2024–2025 m. statistika, €/m².</strong> Tai visų dydžių, amžiaus ir būklės butų pardavimo vidurkiai, o ne vienodo standarto pirmojo būsto krepšelis. <strong>Miestas nėra apskritis.</strong></p>
        <div class="housing-table-scroll" role="region" tabindex="0" aria-label="VDA 2024 ir 2025 metų butų pardavimo vidurkiai šešiuose miestuose">
          <table class="housing-table"><thead><tr><th scope="col">Miestas</th><th scope="col">2024, €/m²</th><th scope="col">2025, €/m²</th></tr></thead><tbody><tr><th scope="row">Alytus</th><td>890</td><td>1 039</td></tr>
<tr><th scope="row">Kaunas</th><td>1 772</td><td>1 988</td></tr>
<tr><th scope="row">Klaipėda</th><td>1 559</td><td>1 741</td></tr>
<tr><th scope="row">Panevėžys</th><td>1 030</td><td>1 170</td></tr>
<tr><th scope="row">Šiauliai</th><td>1 098</td><td>1 262</td></tr>
<tr><th scope="row">Vilnius</th><td>2 639</td><td>2 846</td></tr></tbody></table>
        </div>
        <p class="small">Šaltinis: <a href="https://osp-sdg.stat.gov.lt/arcgis/rest/services/EVP_DB_connection/evp56/FeatureServer/0" target="_blank" rel="noopener">VDA S7R280</a>. Dėl galimai skirtingos 2024 ir 2025 m. parduotų butų sudėties metinio kainų indekso neskaičiuojame.</p>

        <h4>2. „Ober-Haus“: 2025 m. gruodžio nuomos ir pirkimo segmentai</h4>
        <p class="small"><strong>Rinkos ekspertiniai intervalai, ne sandorių medianos.</strong> Trijuose miestuose abiejų lentelių teritorija įvardyta „gyvenamieji rajonai“. 1 kambario <strong>nuoma</strong> ir 2 kambarių <strong>pardavimas</strong> yra skirtingų butų rinkos; naujas butas – <strong>dalinės apdailos</strong>, seno būsto būklė ne visiškai suderinta.</p>
        <div class="housing-table-scroll" role="region" tabindex="0" aria-label="Ober-Haus 2025 metų gruodžio nuomos ir pardavimo intervalai">
          <table class="housing-table"><thead><tr><th scope="col">Miestas</th><th scope="col">1 kamb. nuoma, €/mėn.</th><th scope="col">2 kamb. naujas, dalinė apdaila, €/m²</th><th scope="col">2 kamb. senos statybos, €/m²</th></tr></thead><tbody><tr><th scope="row">Vilnius</th><td>320–520</td><td>2 500–3 300</td><td>1 660–2 550</td></tr>
<tr><th scope="row">Kaunas</th><td>280–420</td><td>2 300–2 950</td><td>1 240–1 720</td></tr>
<tr><th scope="row">Klaipėda</th><td>270–400</td><td>2 250–2 950</td><td>1 060–1 460</td></tr></tbody></table>
        </div>
        <p class="small">Šaltinis: UAB „OBER-HAUS“ nekilnojamasis turtas, <a href="https://www.ober-haus.lt/wp-content/uploads/NT-kainos-2025-gruodis.pdf" target="_blank" rel="noopener">2025 m. gruodžio kainų apžvalga, 1–2 psl.</a>. <strong>Vieno mėnesio intervalai nėra 2025 m. metiniai vidurkiai.</strong> Naujo ir seno būsto negalima laikyti vienodos būklės; neįtrauktos įrengimo ir remonto išlaidos. Duomenys nesudaro 10 apskričių imties.</p>

        <h4>3. Pirmojo būsto finansavimas – metodika parengta</h4>
        <p>2025 m. istoriniame scenarijuje taikomas įprastas <strong>15 % pradinis įnašas</strong>. Lietuvos banko 2025 m. gruodžio vidutinė naujų būsto paskolų palūkanų norma – <strong>3,69 %</strong>. Atlikome paskolos įmokų ir palūkanų jautrumo skaičiavimus <strong>už vieną perkamą m²</strong>, nes 50 m² nėra pagrįstas visų pirmųjų butų standartas. <a href="https://www.lb.lt/lt/paskolu-palukanu-normos" target="_blank" rel="noopener">Lietuvos banko šaltinis</a>.</p>
        <p class="small">Tai <strong>2025 m. istorinė metodika, ne šiandieninis banko pasiūlymas</strong>. Faktinių jaunų šeimų santaupų, įrengimo ir kitų išlaidų trūksta, todėl modelinių m²/metus verčių nepateikiame kaip realios statistikos.</p>
        <div class="alert alert-amber"><strong>Kas dar nepatvirtinta?</strong> Vienodo standarto parduotų butų ir 1 kambario nuomos duomenys visose 10 apskričių, jaunų šeimų faktinės pajamos ir realios pragyvenimo išlaidos. Dėl to <strong>10 apskričių įperkamumo reitingas ir metinio taupymo m² rodiklis nepublikuojami</strong>.</div>
        <p class="small"><strong>Metodikos ir šaltinių patikra:</strong> <a href="https://github.com/olemoz1977/Demografin-situacija/blob/main/research/housing-sale-coverage-contradiction-2024.md" target="_blank" rel="noopener">butų sandorių duomenų patikra</a> · <a href="https://github.com/olemoz1977/Demografin-situacija/blob/main/research/housing-state-support-2025.md" target="_blank" rel="noopener">2025 m. paramos taisyklės</a> · <a href="https://github.com/olemoz1977/Demografin-situacija/blob/audit/population-standard-2024-2025/research/housing-first-home-2025-mortgage-servicing-per-m2.md" target="_blank" rel="noopener">paskolos metodika pagal €/m²</a>. Nei skirtingų būstų vidurkiai, nei atskiri skaičiavimo pavyzdžiai nėra jaunų šeimų įperkamumo įvertis.</p>
      </section>
      <section class="housing-support-layer" aria-labelledby="housingSupportTitle">
        <div class="section-label">Valstybės parama pirmajam būstui <span class="badge badge-official">SADM · 2019–2025</span></div>
        <h3 id="housingSupportTitle">Kiek paramos realiai suteikta 2025 m.?</h3>
      <div class="alert alert-blue">
        <strong>2025 m. regioninę paskatą gavo 515 jaunų šeimų.</strong> 2022 m. jų buvo 1 595, o 2025 m. pradžioje apie 1 700 ankstesnių metų prašymų dar laukė nagrinėjimo. <strong>Vien +50,6 % pokytis nuo 2024 m. neparodo viso vaizdo.</strong> Tai skirtingi rodikliai, ne paramos aprėpties procentas.
      </div>

        <div class="kpi-row housing-support-kpis" id="housingSupportKpis">
          <div class="kpi"><div class="kpi-num blue">515</div><div class="kpi-label">Jaunų šeimų gavo finansinę paskatą pirmajam būstui regionuose · 2025</div><div class="kpi-note">2024: 342 · +50,6 %</div></div>
          <div class="kpi"><div class="kpi-num">556</div><div class="kpi-label">Asmenų / šeimų gavo subsidiją pagal valstybės iš dalies kompensuojamo būsto kredito schemą · 2025</div><div class="kpi-note">2024: 688 · platesnė gavėjų grupė</div></div>
          <div class="kpi"><div class="kpi-num green">8,2 mln. €</div><div class="kpi-label">Panaudota finansinei paskatai jaunoms šeimoms · 2025</div><div class="kpi-note">2024: 7,2 mln. €</div></div>
          <div class="kpi"><div class="kpi-num amber">10,3 mln. €</div><div class="kpi-label">Panaudota kompensuojamo būsto kredito subsidijoms · 2025</div><div class="kpi-note">2024: 12,2 mln. €</div></div>
        </div>

        <h4>Kaip keitėsi jaunų šeimų regioninės paskatos mastas 2019–2025 m.?</h4>
        <div class="chart-wrap housing-support-outcomes-chart"><canvas id="housingSupportRecipientsChart"></canvas></div>
        <div class="chart-caption">Oficialus SADM regioninę paskatą pirmajam būstui <strong>gavusių jaunų šeimų skaičius per kalendorinius metus</strong>. Tai <strong>viena konkreti paramos programa</strong>, o ne abiejų schemų suma. 2022 m. – 1 595, 2025 m. – 515 šeimų. 2025 m. keitėsi programos sąlygos ir buvo nagrinėjama ankstesnių metų eilė; grafikas rodo išmokėtas subsidijas, <strong>ne paramos poreikio, tinkamų pareiškėjų ar prieinamumo procentą</strong>. Šaltinis: <a href="https://socmin.lrv.lt/public/canonical/1773646445/6523/2026%2003%2006_SADM_Veiklos%20ataskaita%202025-03-10.pdf" target="_blank" rel="noopener">SADM 2025 m. veiklos ataskaita, 32 pav.</a></div>

        <div class="alert alert-blue housing-support-demand-context">
          <strong>515 šeimų – tai išmokų skaičius, ne paramos aprėpties procentas.</strong>
          <p class="small"><strong>2025 m. paklausos kontekstas:</strong> SADM duomenimis, 2025-01-01 apie <strong>1 700 jaunų šeimų</strong> laukė eilėje pagal ankstesnius (nuo 2023 m.) prašymus. 2025-09-17 ministerija paskelbė, kad eilė panaikinta ir išnagrinėta apie 1 700 prašymų. <strong>1 700 nagrinėtų prašymų nėra 1 700 išmokėtų subsidijų.</strong> <a href="https://socmin.lrv.lt/lt/naujienos/proverzis-paramos-jaunoms-seimoms-isigyjancioms-pirmaji-busta-sistemoje-C1v/" target="_blank" rel="noopener">SADM · 2025-09-17</a>.</p>
          <p class="small"><strong>Vienas svarbus 2025 m. dokumentuotas paradoksas:</strong> iš maždaug 1 700 eilėje laukusių šeimų <strong>mažiau nei 100</strong> pavasarį pateikė prašymą pereiti prie naujų, nuo 2025-01-01 galiojančių paskatos taisyklių. Vėliau pradėta nagrinėti eilėje buvusių šeimų prašymus pagal senąsias sąlygas. <strong>Šis skaičius nėra naujų visos šalies prašymų ar atmestų šeimų skaičius.</strong> <a href="https://socmin.lrv.lt/public/canonical/1773646445/6523/2026%2003%2006_SADM_Veiklos%20ataskaita%202025-03-10.pdf" target="_blank" rel="noopener">SADM 2025 m. veiklos ataskaita</a>.</p>
          <p class="small"><strong>Atskiras 2026 m. kontekstas – kita programa.</strong> 2026-05-19 platesnės <em>valstybės iš dalies kompensuojamo būsto kredito ir (ar) subsidijos</em> programos kvietimas sustabdytas po <strong>10 minučių</strong>, gavus beveik <strong>1 000 prašymų</strong>. Iš pradžių planuota 5,6 mln. €, kitą dieną skirta papildomai 5 mln. €. <strong>Tai NE 2025 m. 515 jaunų šeimų regioninės programos kvietimas.</strong> <a href="https://socmin.lrv.lt/lt/naujienos-1/baigtas-paraisku-priemimas-valstybes-paramai-bustui-isigyti-gIR/" target="_blank" rel="noopener">SADM · 2026-05-19</a>; <a href="https://socmin.lrv.lt/lt/naujienos/j-zailskiene-paramai-bustui-isigyti-papildomai-skiriami-5-mln-euru-9TZ/" target="_blank" rel="noopener">2026-05-20</a>.</p>
          <p class="small"><strong>2026 m. rugsėjį</strong> pagal būtent <em>regioninę jaunų šeimų</em> programą pateikta beveik <strong>800 prašymų</strong>. SADM pranešė, kad lėšų turėtų pakakti visiems reikalavimus atitinkantiems prašymams – tai dar <strong>nėra 800 išmokėtų subsidijų</strong>. <a href="https://socmin.lrv.lt/lt/naujienos-1/visos-prasymus-pateikusios-ir-reikalavimus-atitinkancios-jaunos-seimos-gaus-valstybes-subsidija-pirmajam-bustui-regionuose-isigyti-i1j/" target="_blank" rel="noopener">SADM · 2026-09-29</a>.</p>
          <p class="small"><strong>Metodinė išvada:</strong> 515 / 1 700 būtų <strong>neteisingas procentas</strong>: vienas skaičius matuoja 2025 m. išmokas, kitas – ankstesnių metų prašymų eilės likutį. Taip pat nežinome, kiek iš viso 2025 m. jaunų šeimų turėjo teisę į paskatą, todėl <strong>realios paramos aprėpties procento neteikiame</strong>.</p>
        </div>

        <div class="alert alert-amber">
          <strong>Populiacijos ir išmokų tipai skiriasi.</strong> Regioninė paskata skirta teisinėms jaunoms šeimoms; kompensuojamo kredito schema apima ir kitus asmenis bei šeimas. Pastarosios 556 gavėjų rodiklyje <strong>32 gavo papildomą subsidiją</strong>. Todėl aritmetinis 515 + 556 = 1 071 <strong>nėra</strong> pagrindinę paramą gavusių šeimų skaičius. SADM 2025 m. ataskaitoje nurodyta <strong>1 039 pagrindinės paramos gavėjai pagal abi programas</strong> (515 + 556 − 32) ir atskirai <strong>76 papildomos subsidijos</strong> (44 regioninėje programoje ir 32 platesnėje). <strong>1 039 nėra 1 039 jaunos šeimos</strong> ar įrodytas unikalių pirmojo būsto pirkėjų skaičius.
        </div>

        <div class="two-col housing-support-grid">
          <div class="card housing-support-card">
            <div class="eyebrow">1 · Finansinė paskata jaunoms šeimoms</div>
            <h4>Pirmas būstas finansuojamose teritorijose</h4>
            <p><strong>Naujų 2025 m. prašymų sąlygos:</strong> būsto vertė iki 120 000 €, subsidija 10–15 % pagal vaikų skaičių, subsidijos bazė – iki 87 000 € kredito. <strong>Subsidijos procentas nėra skaičiuojamas nuo visos buto kainos.</strong></p>
            <p class="small"><strong>Didžiausios galimos subsidijos pagal naująsias 2025 m. taisykles:</strong> 0–1 vaikas – 10 %, iki <strong>8 700 €</strong>; 2 vaikai – 12,5 %, iki <strong>10 875 €</strong>; 3 ir daugiau – 15 %, iki <strong>13 050 €</strong>. Šios sumos galimos tik jeigu tinkama kredito dalis siekia bent 87 000 €; realios išmokos gali būti mažesnės. Pavyzdžiui, už 120 000 € būstą 8 700 € sudarytų <strong>7,25 % būsto kainos</strong>, ne 10 %; tai tik skaičiavimo pavyzdys.</p>
            <p class="small"><strong>Netinkamas „vidurkis“:</strong> 8,24 mln. € išlaidų padalijus iš 515 pagrindinės paskatos gavėjų gautume 16 000 €, daugiau nei naujos tvarkos 13 050 € maksimumą. <strong>Tai nėra faktinė vidutinė subsidija pagal naująją 2025 m. tvarką:</strong> metinės išlaidos apima senąsias taisykles ir papildomas subsidijas. Negalima suvienodinti skirtingų išmokų.</p>
            <p class="small"><strong>Skyrimo kriterijų skirtumas:</strong> regioninė jaunų šeimų paskata <strong>neturi atskiro pajamų ir turto ribojimo</strong>; ją riboja pirmojo būsto, teritorijos, šeimos statuso, būsto vertės ir kitos įstatymo sąlygos. Žemiau nurodyti pajamų bei turto limitai taikomi <strong>kitai</strong> – kompensuojamo kredito – programai.</p>
            <p class="small"><strong>Pereinamoji išimtis:</strong> dalis 2025 m. suteiktos paskatos buvo susijusi su iki 2024-12-31 pateiktais prašymais, nagrinėtais pagal ankstesnes nuostatas. Todėl 515 gavėjų nebūtinai visiems taikytas tas pats subsidijos tarifas.</p>
            <p class="small"><strong>Papildoma subsidija, padidėjus vaikų skaičiui:</strong> SADM duomenimis, regioninėje programoje 2024 m. ją gavo <strong>560 šeimų</strong>, o 2025 m. – <strong>44 šeimos</strong>. Tai atskira papildoma išmoka, ne naujų pagrindinės paskatos gavėjų ar gimusių vaikų skaičius; 2025 m. keitėsi subsidijų taisyklės ir ankstesnių gavėjų papildomo finansavimo galimybės.</p>
            <p class="small">Regioninė paskata skiriama pagal šio puslapio pradžioje pateiktą <a href="#housingYoungFamilyDefinition">teisinę jaunos šeimos apibrėžtį</a>; gavėjų skaičiaus negalima interpretuoti kaip visų pirmąjį būstą įsigyjančių asmenų skaičiaus.</p>
          </div>

          <div class="card housing-support-card">
            <div class="eyebrow">2 · Valstybės iš dalies kompensuojamas būsto kreditas</div>
            <h4>Visoje Lietuvoje, bet su pajamų ir turto ribomis</h4>
            <p><strong>2025 m. dviejų asmenų šeimai:</strong> metinės vertinamos pajamos iki 32 708 €, turtas iki 57 902 €, kredito suma šeimai iki 87 000 €.</p>
            <p class="small">Jaunoms šeimoms subsidija 15–30 % pagal vaikų skaičių; schema taip pat apima kitas teisę į paramą turinčias grupes.</p>
          </div>
        </div>

        <div class="alert alert-amber">
          <strong>Paramos aprėptis tarp visų jaunų šeimų – oficialiai neskelbiama.</strong> Turime gavėjų skaičių, bet ne patikimą visų teisiškai apibrėžtų jaunų šeimų ar teisę į paskatą turinčių šeimų skaičių 2025 m. Neskaičiuojame tariamai tikslaus procento ir nesprendžiame apie paramos tinkamumą iš bendrų darbo pajamų vidurkių.
        </div>

        <p class="source-line">Šaltinis: <a href="https://socmin.lrv.lt/public/canonical/1773646445/6523/2026%2003%2006_SADM_Veiklos%20ataskaita%202025-03-10.pdf" target="_blank" rel="noopener">SADM · 2025 metų veiklos ataskaita</a>. Sąvokų paaiškinimas: šioje temoje „jauna šeima“ – teisinė paramos gavėjų kategorija; namų ūkis – atskiras statistinis analizės vienetas.</p>
      </section>

      <details class="housing-details">
        <summary>Kas dar neatsakyta ir kodėl?</summary>
        <div class="housing-details-body">
          <p><strong>Tikslinės grupės:</strong> skaičiuojant jaunų šeimų įperkamumą ar paramos pasiekiamumą reikia duomenų apie būtent teisiškai apibrėžtas šeimas ir jų sudėtį. Neturint suderintų duomenų apie tokias šeimas, įperkamumo ar aprėpties įverčio neteikiame.</p>
          <p><strong>Būsto kainų palyginimo dar nerodome.</strong> Vienodas 50 m² plotas nepadaro būstų palyginamų: apskrityse skiriasi statybos laikotarpis, naujos / antrinės rinkos dalis ir būklė. Ankstesnis pardavimo proxy buvo bendro būsto rodiklis, ne grynai daugiabučių butų sluoksnis.</p>
          <p><strong>Ko reikia:</strong> 2025 m. daugiabučių butų duomenų pagal apskritį, panašų plotą (pirminis kandidatas 45–55 m²), statybos laikotarpio grupę ir sandorių N.</p>
          <p><strong>Nuoma:</strong> bus pridedama vėliau kaip atskiras sluoksnis, kai turėsime vienodą ir pakankamai pilną 2025 m. krepšelį visoms 10 apskričių.</p>
          <p><strong>Paramos aprėpties procentas nežinomas:</strong> nėra tinkamai apibrėžto paramos siekusių ir kriterijus atitikusių jaunų šeimų vardiklio bei vienos prašymų kohortos baigties duomenų.</p>
        </div>
      </details>

      <div class="alert alert-blue">
        <strong>Projekto taisyklė.</strong> Jei rodiklis matuoja nepalyginamus objektus arba jo interpretacija gali klaidinti, jis nepatenka į pagrindinę išvadą. Jei paliekamas diagnostikai, turi būti aiškiai pažymėtas kaip nepalyginamas / diagnostinis.
      </div>
    </div>`;

    const target=document.getElementById('scenarijai')||document.getElementById('isvados')||document.getElementById('metodika');
    if(target) target.insertAdjacentElement('beforebegin',section); else document.body.appendChild(section);
    return section;
  }

  function fmt0(v){ return Number(v).toLocaleString('lt-LT',{maximumFractionDigits:0}); }

  function renderSupportOutcomes(data){
    const section=document.getElementById(SECTION_ID);
    const canvas=section?.querySelector('#housingSupportRecipientsChart');
    if(!canvas || !window.Chart || !Array.isArray(data?.rows) || data.rows.length!==7) return;
    if(data.status!=='OFFICIAL_SADM_2025_REPORT_FIG_32' || data.no_coverage_denominator!==true) return;
    const years=data.rows.map(r=>String(r.year));
    const families=data.rows.map(r=>r.young_families_main_subsidy_paid_n);
    const existing=Chart.getChart(canvas); if(existing) existing.destroy();
    new Chart(canvas.getContext('2d'),{
      type:'line',
      data:{
        labels:years,
        datasets:[{
          label:'Paramą gavusios jaunos šeimos',
          data:families,
          borderColor:'#1d4f7d',
          backgroundColor:'#1d4f7d',
          pointRadius:4,
          pointHoverRadius:6,
          tension:0.15,
          fill:false
        }]
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
          legend:{display:false},
          tooltip:{callbacks:{label:(ctx)=>` ${ctx.formattedValue} šeimų gavo subsidiją`}}
        },
        scales:{
          y:{beginAtZero:true,title:{display:true,text:'Subsidiją gavusių jaunų šeimų skaičius'}},
          x:{title:{display:true,text:'Metai'}}
        }
      }
    });
  }

  async function loadJson(url){
    const res=await fetch(url,{cache:'no-store'});
    if(!res.ok) throw new Error('HTTP '+res.status);
    return res.json();
  }

  async function init(){
    insertShell();
    try {
      const series=await loadJson('data/housing-support-young-family-series-2019-2025.json?v=20261010published');
      renderSupportOutcomes(series);
    } catch(error) {
      const canvas=document.getElementById('housingSupportRecipientsChart');
      if(canvas) canvas.parentElement.insertAdjacentHTML('afterend',
        '<p class="small">Grafiko įkelti nepavyko. SADM metiniai gavėjai: 2019 – 820; 2020 – 1 202; 2021 – 1 580; 2022 – 1 595; 2023 – 609; 2024 – 342; 2025 – 515.</p>');
    }
  }
  init();
})();
