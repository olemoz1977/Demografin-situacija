(() => {
  const SECTION_ID='housingAffordability';

  function insertShell(){
    if(document.getElementById(SECTION_ID)) return document.getElementById(SECTION_ID);
    const section=document.createElement('section');
    section.id=SECTION_ID;
    section.innerHTML=`<div class="container">
      <div class="section-label">Pirmas būstas ir valstybės parama <span class="badge badge-official">2024–2025 · SADM FAKTAI</span></div>
      <h2>Ką žinome apie valstybės paramą pirmajam būstui?</h2>
      <p class="lead">Analizuojame <strong>2024–2025 m. faktinius paramos gavėjus</strong>, atskirdami teisinę „jauną šeimą“ nuo platesnės asmenų ir šeimų grupės. <strong>Visų Lietuvoje gyvenančių teisiškai apibrėžtų jaunų šeimų patikimo skaičiaus neturime</strong>, todėl paramos aprėpties procento neskaičiuojame. Tai nėra būsto įperkamumo reitingas ar įrodymas apie poveikį gimstamumui.</p>
      <p class="small"><strong>Ką reiškia „namų ūkis“?</strong> Tai žmonės, o ne nekilnojamasis turtas: vienas žmogus arba kartu gyvenantys ir bendras pajamas ar išlaidas turintys asmenys. Jie gali nuomotis būstą arba gyventi nuosavame. <strong>Namų ūkis ≠ nuosavas būstas.</strong> Viename būste gali būti keli atskiri namų ūkiai.</p>

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

        <div class="chart-wrap housing-support-outcomes-chart"><canvas id="housingSupportRecipientsChart"></canvas></div>
        <div class="chart-caption">Oficialus SADM 2024–2025 m. gavėjų skaičius. Schemos turi skirtingas tikslines grupes, o nuo 2025-01-01 regioninės paskatos taisyklės keitėsi; tai gavėjų skaičiaus, ne paramos prieinamumo pokyčio grafikas.</div>

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
    if(!canvas || !window.Chart || !data?.schemes?.length) return;
    const s1=data.schemes[0], s2=data.schemes[1];
    const existing=Chart.getChart(canvas); if(existing) existing.destroy();
    new Chart(canvas.getContext('2d'),{
      type:'bar',
      data:{
        labels:['Paskata jaunoms šeimoms','Kompensuojamo kredito subsidija'],
        datasets:[
          {label:'2024',data:[s1.recipients_2024,s2.recipients_2024],backgroundColor:'#a9a39a'},
          {label:'2025',data:[s1.recipients_2025,s2.recipients_2025],backgroundColor:'#1d4f7d'}
        ]
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
          legend:{position:'bottom'},
          tooltip:{callbacks:{label:(ctx)=>` ${ctx.dataset.label}: ${fmt0(ctx.raw)} gavėjų`}}
        },
        scales:{
          y:{beginAtZero:true,title:{display:true,text:'Gavėjų skaičius'}},
          x:{ticks:{maxRotation:0,minRotation:0}}
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
      const outcomes=await loadJson('data/housing-state-support-outcomes-2025.json?v=20261009population');
      renderSupportOutcomes(outcomes);
    } catch (error) {
      const layer=document.querySelector('#housingSupportTitle');
      if(layer) layer.insertAdjacentHTML('afterend','<p class="small">Paramos gavėjų grafiko duomenų įkelti nepavyko. Rodomos pirminio SADM šaltinio pagrindu patikrintos reikšmės.</p>');
    }
  }

  init();
})();