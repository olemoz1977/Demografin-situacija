(() => {
  const SECTION_ID='housingAffordability';

  function insertShell(){
    if(document.getElementById(SECTION_ID)) return document.getElementById(SECTION_ID);
    const section=document.createElement('section');
    section.id=SECTION_ID;
    section.innerHTML=`<div class="container">
      <div class="section-label">Pirmas šeimos būstas <span class="badge badge-prelim">PALYGINIMAS TIKSLINAMAS</span></div>
      <h2>Ar jaunai dirbančiai porai prieinamas pirmas šeimos būstas?</h2>
      <p class="lead">Tai demografinio konteksto klausimas: ar pirmo nuosavo būsto įsigijimas gali būti vienas iš materialių šeimos kūrimo aplinkos barjerų. <strong>Ši analizė neįrodinėja priežastinio ryšio su gimstamumu.</strong> Kol kas tarpapskritinio palyginimo nerodome, nes dabartinis pardavimo kainų sluoksnis nelygina vienodų būstų visose apskrityse.</p>

      <div class="housing-comparability-stop">
        <div class="housing-takeaway-label">Kodėl nerodome ankstesnių skaičių</div>
        <p><strong>50 m² nėra tas pats būstas.</strong> Vienodas plotas nepašalina skirtumų dėl statybos laikotarpio, naujos ir antrinės rinkos dalies, būklės ar kitų kokybės skirtumų. Be to, ankstesnis pardavimo proxy buvo bendro būsto rodiklis, ne grynai daugiabučių butų sluoksnis.</p>
        <p>Todėl ankstesni 10 apskričių įverčiai ir jų santykiai <strong>nebelaikomi tinkamu tarpapskritiniu rezultatu</strong> ir viešai nerodomi.</p>
      </div>

      <div class="two-col housing-comparable-next">
        <div class="card">
          <div class="eyebrow">Ką norime pamatuoti</div>
          <p><strong>Tikslinė situacija:</strong> 25–30 m. dirbanti pora, siekianti įsigyti pirmą nuosavą šeimos būstą. Vaikų turėjimas čia nėra atskira sąlyga, nes vaikų išlaidos ir vaiko priežiūros laikotarpio pajamų pokyčiai šiame modelyje neskaičiuojami.</p>
          <p><strong>Pajamos:</strong> teritorinis neto pajamų modelis, sudarytas oficialių „Sodros“ duomenų pagrindu.</p>
          <p><strong>Oficiali kontrolė:</strong> VDA turi 2025 m. faktinių daugiabučių butų sandorių kainų etaloną Lietuvai ir 6 miestų savivaldybėms.</p>
        </div>
        <div class="card">
          <div class="eyebrow">Ko reikia patikimam pirmo būsto palyginimui</div>
          <p>Tas pats objektų krepšelis visur: <strong>butas daugiabutyje</strong>, vienodas laikotarpis, panašus plotas, aiški statybos laikotarpio / rinkos segmento taisyklė ir pakankamas sandorių skaičius kiekvienoje teritorijoje.</p>
          <p>Pirminis ploto kandidatas: <strong>45–55 m²</strong>. Statybos laikotarpis bus pasirenkamas tik pamačius realią 2025 m. sandorių aprėptį visose 10 apskričių.</p>
        </div>
      </div>

      <section class="housing-support-layer" aria-labelledby="housingSupportTitle">
        <div class="section-label">Valstybės pagalba pirmajam būstui <span class="badge badge-official">OFICIALIOS 2025 M. SĄLYGOS</span></div>
        <h3 id="housingSupportTitle">Valstybė pirmo būsto barjerą mažina dviem skirtingais keliais</h3>
        <p class="lead housing-support-lead">Šis sluoksnis svarbus demografiniam kontekstui, tačiau parama nėra universali. Mūsų analitinė „25–30 m. dirbanti pora“ nėra tas pats, kas teisės aktuose apibrėžta „jauna šeima“.</p>

        <div class="two-col housing-support-grid">
          <div class="card housing-support-card">
            <div class="eyebrow">1 · Finansinė paskata jaunoms šeimoms</div>
            <h4>Pirmas būstas tik finansuojamose teritorijose</h4>
            <p><strong>Kas laikoma jauna šeima:</strong> sutuoktiniai, registruoti partneriai arba vienas vaiką auginantis tėvas / mama, kurių amžius iki 36 metų.</p>
            <p><strong>Būsto vertė:</strong> iki 120 000 €. Taikomi teritoriniai ribojimai: schema neapima dalies didžiųjų miestų, jų brangesnių žiedinių savivaldybių ir kurortų.</p>
            <div class="housing-support-rate-grid">
              <div><strong>10 %</strong><span>0 arba 1 vaikas</span></div>
              <div><strong>12,5 %</strong><span>2 vaikai</span></div>
              <div><strong>15 %</strong><span>3+ vaikų</span></div>
            </div>
            <p class="small">Subsidija skaičiuojama nuo ne didesnės kaip 87 000 € kredito sumos. Teorinė maksimali subsidija atitinkamai: <strong>8 700 € / 10 875 € / 13 050 €</strong>.</p>
          </div>

          <div class="card housing-support-card">
            <div class="eyebrow">2 · Valstybės iš dalies kompensuojamas būsto kreditas</div>
            <h4>Galimas visoje Lietuvoje, bet taikomos pajamų ir turto ribos</h4>
            <p><strong>2025 m. dviejų asmenų šeimai:</strong> metinės vertinamos pajamos turėjo neviršyti 32 708 €, turtas – 57 902 €. Tai yra individualios teisės kriterijai, todėl jų automatiškai netaikome mūsų apskričių pajamų vidurkiams.</p>
            <p><strong>Kredito suma šeimai:</strong> iki 87 000 €.</p>
            <div class="housing-support-rate-grid four">
              <div><strong>15 %</strong><span>0 vaikų</span></div>
              <div><strong>20 %</strong><span>1 vaikas</span></div>
              <div><strong>25 %</strong><span>2 vaikai</span></div>
              <div><strong>30 %</strong><span>3+ vaikų</span></div>
            </div>
            <p class="small">Jei kreditas siektų visą 87 000 € ribą, subsidijos dydis būtų iki <strong>13 050 € / 17 400 € / 21 750 € / 26 100 €</strong>.</p>
          </div>
        </div>

        <div class="housing-income-screen" id="housingIncomeScreen">
          <div class="eyebrow">2025 m. pajamų lubų patikra · 2 asmenų šeimos scenarijus</div>
          <h4>Ar modeliuotos jaunos poros pajamos telpa į 2025 m. ribą?</h4>
          <p class="small">Čia lyginame tik pajamas su oficialia 2025 m. pajamų riba valstybės iš dalies kompensuojamam būsto kreditui. <strong>Tai nėra individualios teisės į paramą nustatymas</strong>: realiai vertinamos konkrečios šeimos už kalendorinius metus deklaruotos grynosios pajamos, turtas ir kiti kriterijai.</p>
          <div class="housing-support-insight" id="housingSupportInsight">Kraunama…</div>
          <div class="chart-wrap housing-support-chart"><canvas id="housingSupportIncomeChart"></canvas></div>
          <div class="chart-caption">Oficiali 2025 m. dviejų asmenų šeimos pajamų riba – <strong>32 708 € per metus</strong>. Apskričių stulpeliai – mūsų 2025-11 modeliuotos vieno asmens neto pajamos × 2 asmenys × 12 mėn. Tai orientacinis „screening“, o ne teisinis tinkamumo testas.</div>
          <p class="small"><strong>Laiko kontekstas:</strong> 2024 m. tokia pati dviejų asmenų šeimos pajamų riba buvo 26 048 €. Jos tiesiogiai nelyginame su 2025-11 pajamų modeliu, nes dar neturime lygiaverčio 2024 m. 25–30 m. pajamų sluoksnio.</p>
        </div>

        <div class="alert alert-amber">
          <strong>Ką tai reiškia mūsų tyrimui.</strong> Valstybės parama gali reikšmingai sumažinti pradinį pirmo būsto barjerą, bet jos poveikis priklauso nuo šeimos teisinio statuso, pajamų ir turto, vaikų skaičiaus, būsto vietos ir konkretaus kvietimo. Todėl paramą rodome kaip atskirą scenarijų, o ne kaip automatinį visų jaunų porų „nuolaidos“ dydį.
        </div>

        <p class="source-line">2025 m. sąlygos tikrintos 2026-10-02 pagal Socialinės apsaugos ir darbo ministerijos 2025 m. informaciją apie finansinę paskatą pirmąjį būstą įsigyjančioms jaunoms šeimoms ir paramą būstui įsigyti ar išsinuomoti.</p>
      </section>

      <div class="alert alert-blue">
        <strong>Projekto taisyklė.</strong> Jei rodiklis matuoja nepalyginamus objektus arba jo interpretacija gali klaidinti, jis nepatenka į pagrindinę išvadą. Jei paliekamas diagnostikai, turi būti aiškiai pažymėtas kaip nepalyginamas / diagnostinis.
      </div>

      <details class="housing-details">
        <summary>Ką dar tiksliname?</summary>
        <div class="housing-details-body">
          <p><strong>Pardavimo kaina:</strong> reikia 2025 m. daugiabučių butų duomenų pagal apskritį, ploto intervalą ir statybos laikotarpio grupę, su sandorių N.</p>
          <p><strong>Nuoma:</strong> dabartinis sluoksnis yra 1 kambario ilgalaikės nuomos skelbimų imtis. Jis lieka diagnostinis, kol neturime vienodo ir pakankamai pilno krepšelio visoms 10 apskričių.</p>
          <p><strong>Pajamos:</strong> išlieka modeliuotos oficialių duomenų pagrindu ir bus aiškiai žymimos kaip modeliuotos, ne tiesiogiai išmatuotos pagal amžių × apskritį.</p>
        </div>
      </details>

      <div class="source-line">Šaltiniai / bazė: Sodra 2025-11 · VDA S7R280 2025 · Registrų centro / VDA būsto sandorių šaltinių auditas · rinkos nuomos imčių QA. Ankstesni v0.1 apskričių skaičiai palikti tik research diagnostikai, ne viešai išvadai.</div>
    </div>`;

    const target=document.getElementById('scenarijai')||document.getElementById('isvados')||document.getElementById('metodika');
    if(target) target.insertAdjacentElement('beforebegin',section); else document.body.appendChild(section);
    return section;
  }

  function fmt0(v){ return Number(v).toLocaleString('lt-LT',{maximumFractionDigits:0}); }
  function fmt1(v){ return Number(v).toLocaleString('lt-LT',{minimumFractionDigits:1,maximumFractionDigits:1}); }

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
      insight.innerHTML=`
        <div><strong>Vilniaus aps.</strong><span>${fmt0(vilnius.model_pair_annual_net_eur)} € · <b>+${fmt1(pct(vilnius))}% virš ribos</b></span></div>
        <div><strong>Kauno aps.</strong><span>${fmt0(kaunas.model_pair_annual_net_eur)} € · <b>+${fmt1(pct(kaunas))}% virš ribos</b></span></div>
        <div><strong>Klaipėdos aps.</strong><span>${fmt0(klaipeda.model_pair_annual_net_eur)} € · <b>${fmt1(pct(klaipeda))}% nuo ribos</b></span></div>
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
        ctx.font='600 11px DM Sans, sans-serif';
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

  async function init(){
    insertShell();
    try{
      const res=await fetch('data/housing-state-support-income-screen-2025.json?v=20261002a',{cache:'no-store'});
      if(!res.ok) throw new Error('HTTP '+res.status);
      renderIncomeScreen(await res.json());
    }catch(err){
      const insight=document.querySelector('#housingSupportInsight');
      if(insight) insight.innerHTML='<span class="small">Pajamų ribos grafiko nepavyko įkelti.</span>';
    }
  }

  init();
})();