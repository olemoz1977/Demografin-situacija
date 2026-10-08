(() => {
  const SECTION_ID='housingAffordability';

  function insertShell(){
    if(document.getElementById(SECTION_ID)) return document.getElementById(SECTION_ID);
    const section=document.createElement('section');
    section.id=SECTION_ID;
    section.innerHTML=`<div class="container">
      <div class="section-label">Pirmas šeimos būstas <span class="badge badge-official">2025 FAKTAI + MODELIUOTA</span></div>
      <h2>Ar jaunai dirbančiai porai prieinamas pirmas šeimos būstas?</h2>
      <p class="lead">Tai demografinio konteksto klausimas: ar pirmo nuosavo būsto įsigijimas gali būti vienas iš materialių šeimos kūrimo aplinkos barjerų. <strong>Ši analizė neįrodinėja priežastinio ryšio su gimstamumu.</strong> 2025 m. jau galime parodyti du dalykus: kiek valstybės paramos realiai suteikta ir kaip modeliuotos 25–30 m. dirbančios poros pajamos santykiauja su viena iš paramos ribų.</p>

      <div class="alert alert-blue">
        <strong>2025 m. faktas.</strong> Finansinę paskatą pirmajam būstui regionuose gavo <strong>515 jaunų šeimų</strong>. Kita – valstybės iš dalies kompensuojamo būsto kredito – subsidijų schema pasiekė <strong>556 asmenis arba šeimas</strong>, tačiau tai platesnė gavėjų grupė, todėl šių dviejų skaičių nesumuojame kaip „jaunų porų“.
      </div>

      <div class="housing-target-size">
        <div class="section-label">Tikslinės grupės mastelis <span class="badge badge-prelim">MODELIUOTA</span></div>
        <div class="two-col">
          <div class="card">
            <div class="eyebrow">25–30 m. · abu partneriai dirba</div>
            <div class="kpi-num blue">~20–40 tūkst.</div>
            <p><strong>Modeliuotas 2025 m. porų intervalas Lietuvoje.</strong> Centrinis orientyras – apie 30 tūkst. porų. Tai nėra tiesioginė oficiali statistika, nes viešai nėra vieno pjūvio „pora × abiejų amžius × abiejų užimtumas“.</p>
          </div>
          <div class="card">
            <div class="eyebrow">Svarbi interpretavimo riba</div>
            <p><strong>515 paramą gavusių jaunų šeimų negalima dalinti iš šio intervalo ir vadinti paramos aprėptimi.</strong> 515 gavėjų apibrėžimas remiasi teisine „jaunos šeimos“ kategorija iki 36 m., o čia modeliuojame siauresnę grupę – abu partneriai 25–30 m. ir abu dirba.</p>
            <p class="small">Intervalas sudarytas iš 25–30 m. gyventojų masto, gyvenimo poroje ir abiejų partnerių užimtumo prielaidų. Viešai naudojamas tik apvalintas diapazonas, kad nebūtų tariamo tikslumo.</p>
          </div>
        </div>
      </div>

      <section class="housing-support-layer" aria-labelledby="housingSupportTitle">
        <div class="section-label">Valstybės pagalba pirmajam būstui <span class="badge badge-official">SADM · 2025</span></div>
        <h3 id="housingSupportTitle">Kiek paramos realiai suteikta 2025 m.?</h3>

        <div class="kpi-row housing-support-kpis" id="housingSupportKpis">
          <div class="kpi"><div class="kpi-num blue">515</div><div class="kpi-label">Jaunų šeimų gavo finansinę paskatą pirmajam būstui regionuose · 2025</div><div class="kpi-note">2024: 342 · +50,6 %</div></div>
          <div class="kpi"><div class="kpi-num">556</div><div class="kpi-label">Asmenų / šeimų gavo subsidiją pagal valstybės iš dalies kompensuojamo būsto kredito schemą · 2025</div><div class="kpi-note">2024: 688 · platesnė gavėjų grupė</div></div>
          <div class="kpi"><div class="kpi-num green">8,2 mln. €</div><div class="kpi-label">Panaudota finansinei paskatai jaunoms šeimoms · 2025</div><div class="kpi-note">2024: 7,2 mln. €</div></div>
          <div class="kpi"><div class="kpi-num amber">10,3 mln. €</div><div class="kpi-label">Panaudota kompensuojamo būsto kredito subsidijoms · 2025</div><div class="kpi-note">Vidutinė subsidija: 19 304 €</div></div>
        </div>

        <div class="chart-wrap housing-support-outcomes-chart"><canvas id="housingSupportRecipientsChart"></canvas></div>
        <div class="chart-caption">Oficialus SADM 2024–2025 m. gavėjų skaičius. Schemos rodomos greta, bet jų tikslinės grupės nėra tapačios: pirmoji skirta jaunoms šeimoms pirmajam būstui regionuose, antroji apima platesnį paramos gavėjų ratą.</div>

        <div class="alert alert-amber">
          <strong>Nesumuojame į vieną „jaunų porų“ skaičių.</strong> 2025 m. 556 gavėjų grupėje yra ne tik jaunos šeimos; 32 gavėjams išmokėta papildoma subsidija, o 55 % išmokėtų subsidijų buvo 30 % dydžio pažeidžiamiausioms grupėms.
        </div>

        <div class="two-col housing-support-grid">
          <div class="card housing-support-card">
            <div class="eyebrow">1 · Finansinė paskata jaunoms šeimoms</div>
            <h4>Pirmas būstas finansuojamose teritorijose</h4>
            <p><strong>2025 m. taisyklės:</strong> būsto vertė iki 120 000 €, subsidija 10–15 % pagal vaikų skaičių, subsidijos bazė – iki 87 000 € kredito.</p>
            <p class="small">Teisinė „jauna šeima“ nėra tas pats, kas mūsų analitinė 25–30 m. dirbanti pora.</p>
          </div>

          <div class="card housing-support-card">
            <div class="eyebrow">2 · Valstybės iš dalies kompensuojamas būsto kreditas</div>
            <h4>Visoje Lietuvoje, bet su pajamų ir turto ribomis</h4>
            <p><strong>2025 m. dviejų asmenų šeimai:</strong> metinės vertinamos pajamos iki 32 708 €, turtas iki 57 902 €, kredito suma šeimai iki 87 000 €.</p>
            <p class="small">Jaunoms šeimoms subsidija 15–30 % pagal vaikų skaičių; schema taip pat apima kitas teisę į paramą turinčias grupes.</p>
          </div>
        </div>

        <div class="housing-income-screen" id="housingIncomeScreen">
          <div class="eyebrow">2025 m. pajamų lubų patikra · 2 asmenų šeimos scenarijus</div>
          <h4>Ar modeliuotos jaunos poros pajamos telpa į 2025 m. ribą?</h4>
          <p class="small">Čia lyginame tik pajamas su oficialia 2025 m. pajamų riba valstybės iš dalies kompensuojamam būsto kreditui. <strong>Tai nėra individualios teisės į paramą nustatymas</strong>: realiai vertinamos konkrečios šeimos už kalendorinius metus deklaruotos grynosios pajamos, turtas ir kiti kriterijai.</p>
          <div class="housing-support-insight" id="housingSupportInsight">Kraunama…</div>
          <div class="chart-wrap housing-support-chart"><canvas id="housingSupportIncomeChart"></canvas></div>
          <div class="chart-caption">Oficiali 2025 m. dviejų asmenų šeimos pajamų riba – <strong>32 708 € per metus</strong>. Apskričių stulpeliai – mūsų 2025-11 modeliuotos vieno asmens neto pajamos × 2 asmenys × 12 mėn. Tai orientacinis „screening“, o ne teisinis tinkamumo testas.</div>
        </div>

        <div class="alert alert-green">
          <strong>Ką jau galime teigti.</strong> Pagal mūsų 2025 m. pajamų modelį Vilniaus, Kauno ir Klaipėdos apskričių 25–30 m. dirbančios poros orientacinės metinės neto pajamos yra virš 32 708 € ribos. Tai signalas, kad aukštesnės pajamos daliai jaunų porų gali sumažinti vienos paramos schemos pasiekiamumą, nors tai dar nėra individualaus tinkamumo įrodymas.
        </div>

        <p class="source-line">Šaltinis: <a href="https://socmin.lrv.lt/public/canonical/1773646445/6523/2026%2003%2006_SADM_Veiklos%20ataskaita%202025-03-10.pdf" target="_blank" rel="noopener">SADM · 2025 metų veiklos ataskaita</a>. Pajamų modelio bazė: Sodra 2025-11.</p>
      </section>

      <details class="housing-details">
        <summary>Kas dar neatsakyta ir kodėl?</summary>
        <div class="housing-details-body">
          <p><strong>Tikslinė situacija:</strong> 25–30 m. dirbanti pora, siekianti įsigyti pirmą nuosavą šeimos būstą. Vaikų išlaidos ir vaiko priežiūros laikotarpio pajamų pokyčiai šiame modelyje neskaičiuojami.</p>
          <p><strong>Būsto kainų palyginimo dar nerodome.</strong> Vienodas 50 m² plotas nepadaro būstų palyginamų: apskrityse skiriasi statybos laikotarpis, naujos / antrinės rinkos dalis ir būklė. Ankstesnis pardavimo proxy buvo bendro būsto rodiklis, ne grynai daugiabučių butų sluoksnis.</p>
          <p><strong>Ko reikia:</strong> 2025 m. daugiabučių butų duomenų pagal apskritį, panašų plotą (pirminis kandidatas 45–55 m²), statybos laikotarpio grupę ir sandorių N.</p>
          <p><strong>Nuoma:</strong> bus pridedama vėliau kaip atskiras sluoksnis, kai turėsime vienodą ir pakankamai pilną 2025 m. krepšelį visoms 10 apskričių.</p>
          <p><strong>Kiek Lietuvoje iš viso yra tokių 25–30 m. dirbančių porų:</strong> modeliuojame apie 20–40 tūkst. porų (centrinis orientyras ~30 tūkst.), tačiau tai nėra oficialus tiesioginis matavimas. Procentinės paramos aprėpties iš 515 gavėjų neskaičiuojame, nes gavėjų teisinė amžiaus ir šeimos apibrėžtis platesnė.</p>
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
  function fmt1(v){ return Number(v).toLocaleString('lt-LT',{minimumFractionDigits:1,maximumFractionDigits:1}); }

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

  function renderIncomeScreen(data){
    const section=document.getElementById(SECTION_ID);
    if(!section) return;
    const rows=(data.rows||[]).slice().sort((a,b)=>b.model_pair_annual_net_eur-a.model_pair_annual_net_eur);
    const limit=Number(data.official_threshold?.annual_net_income_limit_eur||32708);
    const vilnius=rows.find(r=>r.county==='Vilniaus');
    const kaunas=rows.find(r=>r.county==='Kauno');
    const klaipeda=rows.find(r=>r.county==='Klaipėdos');

    const pct=r=>((Number(r.model_pair_annual_net_eur)/limit-1)*100);
    const insight=section.querySelector('#housingSupportInsight');
    if(insight && vilnius && kaunas && klaipeda){
      const klPct=pct(klaipeda);
      insight.innerHTML=`
        <div><strong>Vilniaus aps.</strong><span>${fmt0(vilnius.model_pair_annual_net_eur)} € · <b>+${fmt1(pct(vilnius))}% virš ribos</b></span></div>
        <div><strong>Kauno aps.</strong><span>${fmt0(kaunas.model_pair_annual_net_eur)} € · <b>+${fmt1(pct(kaunas))}% virš ribos</b></span></div>
        <div><strong>Klaipėdos aps.</strong><span>${fmt0(klaipeda.model_pair_annual_net_eur)} € · <b>${klPct>=0?'+':''}${fmt1(klPct)}% ${klPct>=0?'virš':'žemiau'} ribos</b></span></div>
      `;
    }

    const canvas=section.querySelector('#housingSupportIncomeChart');
    if(!canvas || !window.Chart) return;

    const thresholdPlugin={
      id:'housingIncomeThreshold',
      afterDraw(chart,args,opts){
        const x=chart.scales.x.getPixelForValue(opts.value);
        const {ctx,chartArea}=chart;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x,chartArea.top);
        ctx.lineTo(x,chartArea.bottom);
        ctx.lineWidth=2;
        ctx.setLineDash([6,5]);
        ctx.strokeStyle='#1f4e79';
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle='#1f4e79';
        ctx.font='600 11px Instrument Sans, sans-serif';
        ctx.fillText('2025 riba 32 708 €',Math.min(x+7,chartArea.right-115),chartArea.top+13);
        ctx.restore();
      }
    };

    const existing=Chart.getChart(canvas); if(existing) existing.destroy();
    new Chart(canvas.getContext('2d'),{
      type:'bar',
      data:{
        labels:rows.map(r=>r.county),
        datasets:[{
          label:'Modeliuotos poros metinės neto pajamos',
          data:rows.map(r=>Number(r.model_pair_annual_net_eur)),
          backgroundColor:rows.map(r=>Number(r.model_pair_annual_net_eur)>limit?'#a44a3f':'#5f8267'),
          borderWidth:0
        }]
      },
      plugins:[thresholdPlugin],
      options:{
        indexAxis:'y',
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
          legend:{display:false},
          tooltip:{callbacks:{label:(ctx)=>' '+fmt0(ctx.raw)+' € per metus'}}
        },
        scales:{
          x:{
            beginAtZero:true,
            max:43000,
            ticks:{callback:v=>fmt0(v)+' €'},
            title:{display:true,text:'Modeliuotos poros metinės neto pajamos'}
          },
          y:{ticks:{autoSkip:false}}
        },
        housingIncomeThreshold:{value:limit}
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
    const [outcomes,income]=await Promise.allSettled([
      loadJson('data/housing-state-support-outcomes-2025.json?v=20261005a'),
      loadJson('data/housing-state-support-income-screen-2025.json?v=20261002a')
    ]);
    if(outcomes.status==='fulfilled') renderSupportOutcomes(outcomes.value);
    if(income.status==='fulfilled') renderIncomeScreen(income.value);
    else {
      const insight=document.querySelector('#housingSupportInsight');
      if(insight) insight.innerHTML='<span class="small">Pajamų ribos grafiko nepavyko įkelti.</span>';
    }
  }

  init();
})();