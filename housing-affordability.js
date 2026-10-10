(() => {
  const SECTION_ID='housingAffordability';

  function insertShell(){
    if(document.getElementById(SECTION_ID)) return document.getElementById(SECTION_ID);
    const section=document.createElement('section');
    section.id=SECTION_ID;
    section.innerHTML=`<div class="container">
      <div class="section-label">Pirmojo būsto prieinamumas ir šeimos kūrimas <span class="badge badge-official">2024–2025 · PATVIRTINTI PARAMOS FAKTAI</span></div>
      <h2>Ar pirmasis būstas prieinamas jaunoms šeimoms?</h2>
      <p class="lead"><strong>Tyrimo klausimas:</strong> ar jaunoms šeimoms realiai prieinamas pirmasis nuosavas būstas ir ar būsto įsigijimo kliūtys gali būti susijusios su vaikų susilaukimo atidėjimu bei gimstamumu? Šiandien turime <strong>2024–2025 m. oficialius valstybės paramos faktus</strong>, tačiau jie savaime neatsako nei į viso būsto prieinamumo, nei į jo poveikio gimstamumui klausimą. Palyginamų būsto kainų, šeimų pajamų ir gimstamumo ryšio analizė dar tikrinama.</p>
      <p class="small"><strong>Analizės ribos:</strong> paramos dalyje „jauna šeima“ yra teisinė kategorija; kituose pjūviuose taikome tiksliai apibrėžtus statistinius vienetus. Visų teisiškai apibrėžtų jaunų šeimų patikimo skaičiaus neturime, todėl paramos aprėpties procento neskaičiuojame. Galimas ryšys su gimstamumu – tyrimo hipotezė, o ne įrodytas priežastinis poveikis.</p>
      <p class="small"><strong>Ką reiškia „namų ūkis“?</strong> Tai žmonės, o ne nekilnojamasis turtas: vienas žmogus arba kartu gyvenantys ir bendras pajamas ar išlaidas turintys asmenys. Jie gali nuomotis būstą arba gyventi nuosavame. <strong>Namų ūkis ≠ nuosavas būstas.</strong> Viename būste gali būti keli atskiri namų ūkiai.</p>

      <p class="small"><strong>Platesnis gyvenimo sąlygų kontekstas:</strong> 2025 m. Lietuvoje <strong>55,7 % privačių namų ūkių sudarė vienas suaugęs asmuo be išlaikomų vaikų</strong> (ES – 35,7 %). Tai <strong>namų ūkių, ne gyventojų ar būsto savininkų, procentas</strong>; į jį patenka įvairaus amžiaus žmonės, todėl jis <strong>neįrodo jaunų šeimų būsto neprieinamumo ar poveikio gimstamumui</strong>. Oficialus faktinės apklausos rodiklis, Eurostat žyma <strong>p – gali būti tikslinamas</strong>. <a href="https://ec.europa.eu/eurostat/databrowser/view/ilc_lvph02/default/table" target="_blank" rel="noopener">Šaltinis: Eurostat, ilc_lvph02</a>.</p>

      <div class="alert alert-blue">
        <strong>Kada prasideda gyvenimas savarankiškai?</strong> Eurostat vertinimu, 2025 m. Lietuvoje amžius, kai pusė jaunų žmonių nebegyvena su tėvais, buvo <strong>22,7 metų</strong> (2024 m. – 22,4), o ES – <strong>26,3 metų</strong> (2024 m. – 26,2). <strong>Tai išsikėlimas iš tėvų namų, o ne pirmojo nuosavo būsto įsigijimas.</strong> Nežinome, kiek šių jaunų žmonių nuomojasi, kiek gyvena partnerio ar tėvų nuosavybėje ir kiek yra asmeniniai pirmojo būsto savininkai. <a href="https://ec.europa.eu/eurostat/databrowser/view/yth_demo_030/default/table" target="_blank" rel="noopener">Eurostat · yth_demo_030, EU-LFS</a>.
      </div>

      <div class="alert alert-blue">
        <strong>2025 m. faktas.</strong> Finansinę paskatą pirmajam būstui regionuose gavo <strong>515 jaunų šeimų</strong>. Kita – valstybės iš dalies kompensuojamo būsto kredito – subsidijų schema pasiekė <strong>556 asmenis arba šeimas</strong>, tačiau tai platesnė gavėjų grupė, todėl šių dviejų skaičių nesumuojame kaip jaunų šeimų.
      </div>

      <section class="housing-support-layer" aria-labelledby="housingSupportTitle">
        <div class="section-label">Valstybės parama būstui <span class="badge badge-official">SADM · 2025</span></div>
        <h3 id="housingSupportTitle">Kiek paramos realiai suteikta 2025 m.?</h3>

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
          <strong>Populiacijos skiriasi.</strong> Regioninė paskata skirta teisinėms jaunoms šeimoms; kompensuojamo kredito schema apima ir kitus asmenis bei šeimas. Į 556 įskaičiuoti 32 papildomos subsidijos gavėjai. 515 + 556 negalima vadinti jaunų šeimų ar naujų unikalių gavėjų skaičiumi.
        </div>

        <div class="two-col housing-support-grid">
          <div class="card housing-support-card">
            <div class="eyebrow">1 · Finansinė paskata jaunoms šeimoms</div>
            <h4>Pirmas būstas finansuojamose teritorijose</h4>
            <p><strong>Naujų 2025 m. prašymų sąlygos:</strong> būsto vertė iki 120 000 €, subsidija 10–15 % pagal vaikų skaičių, subsidijos bazė – iki 87 000 € kredito.</p><p class="small"><strong>Pereinamoji išimtis:</strong> dalis 2025 m. suteiktos paskatos buvo susijusi su iki 2024-12-31 pateiktais prašymais, nagrinėtais pagal ankstesnes nuostatas. Todėl 515 gavėjų nebūtinai visiems taikytas tas pats subsidijos tarifas.</p>
            <p class="small">Įstatyme apibrėžta jauna šeima apima tinkamo amžiaus sutuoktinius, registruotus partnerius ir vieną vaiką auginantį asmenį; tai nėra visų kartu gyvenančių jaunų namų ūkių statistika.</p>
          </div>

          <div class="card housing-support-card">
            <div class="eyebrow">2 · Valstybės iš dalies kompensuojamas būsto kreditas</div>
            <h4>Visoje Lietuvoje, bet su pajamų ir turto ribomis</h4>
            <p><strong>2025 m. dviejų asmenų šeimai:</strong> metinės vertinamos pajamos iki 32 708 €, turtas iki 57 902 €, kredito suma šeimai iki 87 000 €.</p>
            <p class="small">Jaunoms šeimoms subsidija 15–30 % pagal vaikų skaičių; schema taip pat apima kitas teisę į paramą turinčias grupes.</p>
          </div>
        </div>

        <div class="alert alert-amber">
          <strong>Paramos aprėptis tarp visų jaunų šeimų – oficialiai neskelbiama.</strong> Turime gavėjų skaičių, bet ne patikimą visų teisiškai apibrėžtų jaunų šeimų ar teisę į paskatą turinčių šeimų skaičių 2025 m. Neskaičiuojame tariamai tikslaus procento. Pajamų modelis iš 2025 m. lapkričio paliktas tik atskirai diagnostikai, o ne paramos tinkamumui spręsti.
        </div>

        <p class="source-line">Šaltinis: <a href="https://socmin.lrv.lt/public/canonical/1773646445/6523/2026%2003%2006_SADM_Veiklos%20ataskaita%202025-03-10.pdf" target="_blank" rel="noopener">SADM · 2025 metų veiklos ataskaita</a>. Sąvokų paaiškinimas: šioje temoje „jauna šeima“ – teisinė paramos gavėjų kategorija; namų ūkis – atskiras statistinis analizės vienetas.</p>
      </section>

      <p class="small"><strong>Ryšys su jau esančia gimstamumo analize:</strong> pirmojo vaiko gimdymo amžiaus 2021–2024 m. grafikas ir VDA / Eurostat šaltiniai <strong>jau pateikti</strong> <a href="?view=fertility#amzius">„Gimstamumo“ skyriuje</a>. Čia jų nekartojame. Nei išsikėlimo iš tėvų namų, nei pirmojo vaiko gimimo amžiaus rodikliai nenusako tos pačios poros įvykių sekos ir neįrodo būsto kainų įtakos gimstamumui.</p>

      <section class="housing-support-layer" aria-labelledby="housingCityContextTitle">
        <div class="section-label">Jau turimi oficialūs rinkos faktai <span class="badge badge-official">VDA · 2024–2025</span></div>
        <h3 id="housingCityContextTitle">Butų kainų orientyrai šešiuose miestuose</h3>
        <p>Valstybės duomenų agentūra pateikia oficialias daugiabučių butų pardavimo vidutines kainas 2024 ir 2025 m. šešiose miestų savivaldybėse, o 2025 m. butų nuomos kainas – penkiose. <strong>Miestas nėra apskritis; tai nėra konkretaus 45–55 m² pirmojo būsto ar jaunų šeimų įperkamumo reitingas.</strong> Skirtingus nuomos ir pirkimo rodiklius pateikiame kaip atskirus rinkos faktus.</p>
        <div id="housingCityBenchmarkTable"><p class="small">Rengiama 2024–2025 m. oficialių miestų duomenų lentelė.</p></div>
        <p class="source-line">Šaltiniai: VDA <a href="https://osp-sdg.stat.gov.lt/arcgis/rest/services/EVP_DB_connection/evp56/FeatureServer/0" target="_blank" rel="noopener">S7R280 · daugiabučių butų pardavimas</a>; <a href="https://osp-sdg.stat.gov.lt/arcgis/rest/services/EVP_DB_connection/evp32/FeatureServer/0" target="_blank" rel="noopener">S7R281 · butų nuoma</a>. Rodikliai skelbiami be nuoseklaus 45–55 m² ir statybos laikotarpio krepšelio.</p>
      </section>

      <details class="housing-details">
        <summary>Kas dar neatsakyta ir kodėl?</summary>
        <div class="housing-details-body">
          <p><strong>Populiacija:</strong> paramos dalyje „jauna šeima“ reiškia įstatyme apibrėžtą teisinę kategoriją; pajamų ir gyvenimo sąlygų statistikoje remiamės VDA / Eurostat namų ūkio sąvoka. Jos nėra tapačios. Atskirai tyrimui išsaugotas 25–30 m. dviejų dirbančių asmenų modelis nėra oficiali populiacijos statistika.</p>
          <p><strong>Būsto kainų palyginimo dar nerodome.</strong> Vienodas 50 m² plotas nepadaro būstų palyginamų: apskrityse skiriasi statybos laikotarpis, naujos / antrinės rinkos dalis ir būklė. Ankstesnis pardavimo proxy buvo bendro būsto rodiklis, ne grynai daugiabučių butų sluoksnis.</p>
          <p><strong>Ko reikia:</strong> 2025 m. daugiabučių butų duomenų pagal apskritį, panašų plotą (pirminis kandidatas 45–55 m²), statybos laikotarpio grupę ir sandorių N.</p>
          <p><strong>Nuoma:</strong> bus pridedama vėliau kaip atskiras sluoksnis, kai turėsime vienodą ir pakankamai pilną 2025 m. krepšelį visoms 10 apskričių.</p>
          <p><strong>Kiek yra teisinių jaunų šeimų 2024–2025 m.?</strong> Vieningo oficialiai viešai skelbiamo skaičiaus nerasta. Kol nėra tinkamo nacionalinio vardiklio, paramos aprėpties procentų neskaičiuojame. SADM / SPIS teritorinio pjūvio atsakymo taip pat dar neturime.</p>
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
    if(!canvas || !window.Chart || !data?.rows?.length) return;
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

  function renderCityBenchmarks(data){
    const target=document.getElementById('housingCityBenchmarkTable');
    if(!target || !data?.sale?.places || !data?.rent?.places) return;
    const rent=new Map(data.rent.places.map(v=>[v.municipality,v.annual_eur_m2]));
    const money=v=>Number(v).toLocaleString('lt-LT',{maximumFractionDigits:0});
    const decimal=v=>Number(v).toLocaleString('lt-LT',{minimumFractionDigits:1,maximumFractionDigits:1});
    const rows=data.sale.places.map(city=>{
      const annualRent=rent.get(city.municipality);
      const growth=(city.eur_m2_2025/city.eur_m2_2024-1)*100;
      // Official VDA yearly city means; the change and monthly rental equivalence are calculated context, not official first-home affordability.
      return `<tr><th scope="row">${city.name}</th><td>${money(city.eur_m2_2024)}</td><td>${money(city.eur_m2_2025)}</td><td>+${decimal(growth)} %</td><td>${annualRent===undefined?'–':decimal(annualRent/12)}</td></tr>`;
    }).join('');
    target.innerHTML=`<div class="housing-table-scroll"><table class="housing-table">
      <thead><tr><th scope="col">Miestas</th><th scope="col">Butų pardavimas 2024, €/m²</th><th scope="col">Butų pardavimas 2025, €/m²</th><th scope="col">Pardavimo kainų pokytis 2024–2025, %</th><th scope="col">Nuomos 2025 m. mėnesio atitikmuo, €/m²/mėn.</th></tr></thead>
      <tbody>${rows}</tbody>
      </table></div>
      <p class="chart-caption">VDA oficialūs miestų vidutiniai rodikliai, o procentinis kainų pokytis ir mėnesio nuomos atitikmuo – mūsų aritmetiniai perskaičiavimai. Nuomos pirminis šaltinis skelbia €/m² per metus; mėnesio atitikmuo = metinė reikšmė / 12. Alytaus nuomos reikšmė neturima (–). Parduotų būstų sudėtis metais skiriasi; tai nėra tų pačių butų kainų indeksas, 1 kambario nuoma ar jaunų šeimų įperkamumas.</p>`;
  }

  async function loadJson(url){
    const res=await fetch(url,{cache:'no-store'});
    if(!res.ok) throw new Error('HTTP '+res.status);
    return res.json();
  }

  async function init(){
    insertShell();
    try {
      const series=await loadJson('data/housing-support-young-family-series-2019-2025.json?v=20261010series');
      renderSupportOutcomes(series);
    } catch (error) {
      const layer=document.querySelector('#housingSupportTitle');
      if(layer) layer.insertAdjacentHTML('afterend','<p class="small">Paramos gavėjų grafiko duomenų įkelti nepavyko. Rodomos pirminio SADM šaltinio pagrindu patikrintos reikšmės.</p>');
    }
    try {
      const benchmarks=await loadJson('data/housing-verified-city-benchmarks-2024-2025.json?v=20261009reuse');
      renderCityBenchmarks(benchmarks);
    } catch (error) {
      const target=document.getElementById('housingCityBenchmarkTable');
      if(target) target.textContent='Oficialios miestų kainų lentelės įkelti nepavyko. Šaltinių nuorodos pateiktos žemiau.';
    }
  }

  init();
})();