(() => {
  const SECTION_ID='housingAffordability';

  const fmt=(v,d=1)=>Number(v).toLocaleString('lt-LT',{minimumFractionDigits:d,maximumFractionDigits:d});
  const fmt0=v=>Number(v).toLocaleString('lt-LT',{maximumFractionDigits:0});

  function insertShell(){
    if(document.getElementById(SECTION_ID)) return document.getElementById(SECTION_ID);
    const section=document.createElement('section');
    section.id=SECTION_ID;
    section.innerHTML=`<div class="container">
      <div class="section-label">Būsto įperkamumas <span class="badge badge-prelim">v0.1 · PRELIMINARU</span></div>
      <h2>Kiek būsto m² per metus teoriškai atitinka jaunos dirbančios poros pajamos po nuomos?</h2>
      <p class="lead">Tai preliminarus 10 apskričių modelis. Jis leidžia matyti kryptį dabar, nelaukiant, kol visi duomenų sluoksniai taps galutiniai.</p>
      <div class="alert alert-amber"><strong>Skaičiai bus tikslinami.</strong> Pajamos yra modeliuotos pagal „Sodros“ 2025-11 duomenis; nuoma – 2025 m. istorinė rinkos skelbimų imtis; pardavimo kaina – 2025 m. butų kainos proxy, kalibruotas pagal oficialų VDA šešių miestų etaloną. Tai nėra oficialios apskričių butų kainos.</div>
      <div class="kpi-row" id="housingKpis"></div>
      <div class="chart-wrap" style="height:430px"><canvas id="housingAffordabilityChart"></canvas></div>
      <div class="chart-caption">Centrinis preliminarus įvertis. Plonesnė juosta rodo jautrumo diapazoną, o ne statistinį pasikliautinąjį intervalą.</div>
      <div id="housingTableWrap"></div>
      <div class="two-col" style="margin-top:1.5rem">
        <div class="card"><div class="eyebrow">Kas jau gana tvirta</div><p><strong>Pajamų sluoksnis:</strong> 10/10 apskričių, modeliuotas pagal oficialius „Sodros“ duomenis. <strong>2025 VDA etalonas:</strong> tikros daugiabučių butų sandorių kainos Lietuvai ir 6 miestų savivaldybėms.</p></div>
        <div class="card"><div class="eyebrow">Kas bus tikslinama</div><p><strong>Pardavimo kaina:</strong> pakeisime, kai gausime 2025 m. 60 savivaldybių faktinius butų sandorius. <strong>Nuoma:</strong> pakeisime arba validuosime gavę pilnesnį 10 apskričių rinkos sluoksnį.</p></div>
      </div>
      <div class="alert alert-blue"><strong>Kaip skaityti:</strong> svarbiau ne vienas dešimtainis skaičius, o skirtumų mastas tarp apskričių. Tauragės nuomos imtis ypač silpna (N=2), todėl jos poziciją laikykite tik orientacine.</div>
      <div class="source-line">Šaltiniai / bazė: Sodra 2025-11 · VDA S7R280 2025 · Aplinkos ministerijos / Smart Continent 2024 savivaldybių būsto sandorių rodikliai · Skelbiu.lt 2025 istorinė imtis · Aruodas 2025 trijų miestų validacija. Metodika: <code>research/housing-affordability-preliminary-v01-qa.json</code>.</div>
    </div>`;
    const target=document.getElementById('scenarijai')||document.getElementById('isvados')||document.getElementById('metodika');
    if(target) target.insertAdjacentElement('beforebegin',section); else document.body.appendChild(section);
    return section;
  }

  function render(data){
    const rows=(data.rows||[]).slice().sort((a,b)=>a.preliminary_affordability_rank-b.preliminary_affordability_rank);
    if(!rows.length) throw new Error('No preliminary housing rows');

    const section=insertShell();
    const best=rows[0], worst=rows[rows.length-1];
    const kpis=section.querySelector('#housingKpis');
    kpis.innerHTML=`
      <div class="kpi"><div class="kpi-num amber">${fmt(best.m2_per_year_after_rent)}</div><div class="kpi-label">m²/metus · didžiausias preliminarus įvertis</div><div class="kpi-note">${best.county} · diapazonas ${fmt(best.m2_after_rent_sensitivity_low)}–${fmt(best.m2_after_rent_sensitivity_high)}</div></div>
      <div class="kpi"><div class="kpi-num">${fmt(worst.m2_per_year_after_rent)}</div><div class="kpi-label">m²/metus · mažiausias preliminarus įvertis</div><div class="kpi-note">${worst.county} · diapazonas ${fmt(worst.m2_after_rent_sensitivity_low)}–${fmt(worst.m2_after_rent_sensitivity_high)}</div></div>
      <div class="kpi"><div class="kpi-num blue">10/10</div><div class="kpi-label">Apskritys turi v0.1 skaičių</div><div class="kpi-note">Visi pažymėti kaip preliminarūs</div></div>
      <div class="kpi"><div class="kpi-num red">1</div><div class="kpi-label">Apskritis su nuomos N&lt;5</div><div class="kpi-note">Tauragės · N=2</div></div>
    `;

    const table=rows.map(r=>{
      const lowN=Number(r.sample_n)<5;
      return `<tr>
        <td><strong>${r.county}</strong></td>
        <td class="td-num">${fmt(r.m2_per_year_after_rent)}</td>
        <td class="td-num">${fmt(r.m2_after_rent_sensitivity_low)}–${fmt(r.m2_after_rent_sensitivity_high)}</td>
        <td class="td-num">${fmt0(r.sale_price_proxy_2025_eur_m2)} €</td>
        <td class="td-num">${fmt0(r.rent_month_median_eur)} €</td>
        <td class="td-num ${lowN?'td-red':''}">N=${r.sample_n}</td>
        <td class="td-num">${fmt0(r.model_net_25_30_eur_month)} €</td>
      </tr>`;
    }).join('');
    section.querySelector('#housingTableWrap').innerHTML=`
      <h3 style="margin-top:1.5rem">Preliminarus 10 apskričių vaizdas</h3>
      <table>
        <thead><tr>
          <th>Apskritis</th><th class="td-num">m²/metus po nuomos</th><th class="td-num">Jautrumo diapazonas</th>
          <th class="td-num">Pardavimo proxy €/m²</th><th class="td-num">Nuoma €/mėn.</th><th class="td-num">Nuomos imtis</th><th class="td-num">Neto / asm.</th>
        </tr></thead><tbody>${table}</tbody>
      </table>`;

    const canvas=section.querySelector('#housingAffordabilityChart');
    if(window.Chart && canvas){
      const ctx=canvas.getContext('2d');
      const labels=rows.map(r=>r.county);
      const central=rows.map(r=>Number(r.m2_per_year_after_rent));
      const low=rows.map(r=>Number(r.m2_after_rent_sensitivity_low));
      const high=rows.map(r=>Number(r.m2_after_rent_sensitivity_high));
      const existing=Chart.getChart(canvas); if(existing) existing.destroy();
      new Chart(ctx,{
        type:'bar',
        data:{labels,datasets:[
          {label:'Centrinis preliminarus įvertis',data:central,backgroundColor:'#a95d12'},
          {label:'Jautrumo apatinė riba',data:low,type:'line',borderColor:'#7c7872',backgroundColor:'transparent',pointRadius:2,tension:.15},
          {label:'Jautrumo viršutinė riba',data:high,type:'line',borderColor:'#1d4f7d',backgroundColor:'transparent',pointRadius:2,tension:.15}
        ]},
        options:{
          responsive:true,maintainAspectRatio:false,
          plugins:{legend:{position:'bottom'}},
          scales:{
            y:{beginAtZero:true,title:{display:true,text:'m² per metus po nuomos'}},
            x:{ticks:{maxRotation:45,minRotation:0}}
          }
        }
      });
    }
  }

  async function init(){
    insertShell();
    try{
      const res=await fetch('data/housing-affordability-preliminary-v01.json?v=20261002a',{cache:'no-store'});
      if(!res.ok) throw new Error('HTTP '+res.status);
      render(await res.json());
    }catch(err){
      const section=document.getElementById(SECTION_ID);
      const wrap=section?.querySelector('#housingTableWrap');
      if(wrap) wrap.innerHTML='<div class="alert alert-red"><strong>Nepavyko įkelti v0.1 duomenų.</strong> '+String(err)+'</div>';
    }
  }

  init();
})();