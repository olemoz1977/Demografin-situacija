(() => {
  const SECTION_ID='housingAffordability';

  const fmt=(v,d=1)=>Number(v).toLocaleString('lt-LT',{minimumFractionDigits:d,maximumFractionDigits:d});
  const fmt0=v=>Number(v).toLocaleString('lt-LT',{maximumFractionDigits:0});
  const money=v=>Number(v).toLocaleString('lt-LT',{maximumFractionDigits:0})+' €';

  function insertShell(){
    if(document.getElementById(SECTION_ID)) return document.getElementById(SECTION_ID);
    const section=document.createElement('section');
    section.id=SECTION_ID;
    section.innerHTML=`<div class="container">
      <div class="section-label">Būstas ir pajamos <span class="badge badge-prelim">2025 · PRELIMINARU</span></div>
      <h2>Kiek poros metinių pajamų kainuoja 50 m² būstas?</h2>
      <p class="lead">Palyginame 25–30 m. dirbančios poros modeliuotas neto pajamas su 50 m² būsto kainos įverčiu kiekvienoje apskrityje. <strong>Mažesnis skaičius reiškia palankesnį kainos ir pajamų santykį.</strong></p>

      <div class="housing-takeaway" id="housingTakeaway"></div>
      <div class="kpi-row housing-kpis" id="housingKpis"></div>

      <h3 class="housing-subhead">10 apskričių palyginimas</h3>
      <div class="chart-wrap housing-main-chart"><canvas id="housingAffordabilityChart"></canvas></div>
      <div class="chart-caption"><strong>Kaip skaityti:</strong> 3,7 metų reiškia, kad 50 m² būsto kainos įvertis prilygsta maždaug 3,7 visų poros metinių neto pajamų sumai. Tai nereiškia, kad pora realiai galėtų būstą nusipirkti per 3,7 metų.</div>

      <div id="housingSimpleTable"></div>

      <div class="alert alert-blue housing-plain-warning"><strong>Tai nėra bankinis paskolos įperkamumo vertinimas.</strong> Čia neskaičiuojame pradinio įnašo, palūkanų, paskolos termino, kitų šeimos išlaidų ar banko taikomų ribų. Rodiklis skirtas palyginti, kur būsto kainos yra didesnės arba mažesnės pajamų atžvilgiu.</div>

      <div class="alert alert-amber"><strong>Preliminari versija.</strong> Pajamos modeliuotos pagal „Sodros“ 2025-11 duomenis, o būsto kainos apskrityse kol kas yra modelinis įvertis, kalibruotas pagal oficialius VDA 2025 m. šešių miestų duomenis. Todėl svarbiau skirtumų mastas, o ne dešimtosios dalys.</div>

      <details class="housing-details">
        <summary>Kaip skaičiuota ir kas dar tikslinama?</summary>
        <div class="housing-details-body">
          <div class="two-col">
            <div class="card"><div class="eyebrow">Kas remiasi oficialiais duomenimis</div><p><strong>Pajamos:</strong> 10/10 apskričių modeliuotos iš oficialių „Sodros“ duomenų. <strong>Kontrolė:</strong> VDA S7R280 pateikia faktines 2025 m. daugiabučių butų sandorių kainas Lietuvai ir 6 miestų savivaldybėms.</p></div>
            <div class="card"><div class="eyebrow">Kas dar bus pakeista</div><p><strong>Pardavimo kainos:</strong> proxy pakeisime gavę pilną 2025 m. faktinių butų sandorių sluoksnį. <strong>Nuoma:</strong> dabartinė 2025 m. skelbimų imtis bus pakeista arba validuota pilnesniu 10 apskričių sluoksniu.</p></div>
          </div>
          <p class="small"><strong>Duomenų būsenos:</strong> Oficialu = tiesioginis oficialus etalonas · Modeliuota = oficialių duomenų pagrindu apskaičiuota · Preliminaru = dar ne galutinis rinkos sluoksnis · Tikslinama = bus perskaičiuota gavus stipresnius duomenis.</p>
        </div>
      </details>

      <details class="housing-details">
        <summary>Rodyti nuomos ir techninius v0.1 rodiklius</summary>
        <div class="housing-details-body" id="housingTechnicalTable"></div>
      </details>

      <div class="source-line">Šaltiniai / bazė: Sodra 2025-11 · VDA S7R280 2025 · Aplinkos ministerijos / Smart Continent 2024 savivaldybių būsto sandorių rodikliai · Skelbiu.lt 2025 istorinė imtis · Aruodas 2025 trijų miestų validacija. Metodika: <code>research/housing-affordability-preliminary-v01-qa.json</code>.</div>
    </div>`;
    const target=document.getElementById('scenarijai')||document.getElementById('isvados')||document.getElementById('metodika');
    if(target) target.insertAdjacentElement('beforebegin',section); else document.body.appendChild(section);
    return section;
  }

  function render(data){
    const rows=(data.rows||[]).slice().sort((a,b)=>Number(b.standard_50m2_price_to_pair_annual_net_years)-Number(a.standard_50m2_price_to_pair_annual_net_years));
    if(!rows.length) throw new Error('No preliminary housing rows');

    const section=insertShell();
    const values=rows.map(r=>Number(r.standard_50m2_price_to_pair_annual_net_years));
    const min=Math.min(...values);
    const max=Math.max(...values);
    const spread=max/min;
    const minRow=rows.find(r=>Number(r.standard_50m2_price_to_pair_annual_net_years)===min);
    const maxRow=rows.find(r=>Number(r.standard_50m2_price_to_pair_annual_net_years)===max);

    section.querySelector('#housingTakeaway').innerHTML=`
      <div class="housing-takeaway-label">Pagrindinė išvada</div>
      <p>Pagal dabartinį modelį 50 m² būsto kainos ir jaunos dirbančios poros pajamų santykis tarp apskričių skiriasi beveik <strong>${fmt(spread,1)} karto</strong>. Kraštiniai įverčiai – apie <strong>${fmt(min,1)} metų</strong> poros neto pajamų ${minRow.county} apskrityje ir <strong>${fmt(max,1)} metų</strong> ${maxRow.county} apskrityje.</p>
    `;

    section.querySelector('#housingKpis').innerHTML=`
      <div class="kpi"><div class="kpi-num green">${fmt(min,1)}</div><div class="kpi-label">metų poros neto pajamų</div><div class="kpi-note">mažiausias 50 m² kainos / pajamų įvertis · ${minRow.county}</div></div>
      <div class="kpi"><div class="kpi-num red">${fmt(max,1)}</div><div class="kpi-label">metų poros neto pajamų</div><div class="kpi-note">didžiausias 50 m² kainos / pajamų įvertis · ${maxRow.county}</div></div>
      <div class="kpi"><div class="kpi-num blue">${fmt(spread,1)}×</div><div class="kpi-label">skirtumas tarp kraštinių įverčių</div><div class="kpi-note">palyginamos visos 10 Lietuvos apskričių</div></div>
    `;

    const simpleRows=rows.map(r=>{
      const pairAnnual=Number(r.model_net_25_30_eur_month)*2*12;
      return `<tr>
        <td data-label="Apskritis"><strong>${r.county}</strong></td>
        <td class="td-num" data-label="50 m² / metinės neto"><strong>${fmt(r.standard_50m2_price_to_pair_annual_net_years,2)} m.</strong></td>
        <td class="td-num" data-label="50 m² kainos įvertis">${money(r.standard_50m2_price_eur)}</td>
        <td class="td-num" data-label="Poros metinės neto">${money(pairAnnual)}</td>
      </tr>`;
    }).join('');

    section.querySelector('#housingSimpleTable').innerHTML=`
      <h3 style="margin-top:1.7rem">Pagrindiniai skaičiai</h3>
      <p class="small">50 m² būsto kaina yra preliminarus modelio įvertis. Poros pajamos – dviejų 25–30 m. dirbančių žmonių modeliuotos metinės neto pajamos.</p>
      <div class="housing-simple-table-wrap">
        <table class="housing-simple-table">
          <thead><tr>
            <th>Apskritis</th>
            <th class="td-num">50 m² kaina / poros metinės neto</th>
            <th class="td-num">50 m² kainos įvertis</th>
            <th class="td-num">Poros metinės neto</th>
          </tr></thead>
          <tbody>${simpleRows}</tbody>
        </table>
      </div>
    `;

    const technicalRows=rows.map(r=>{
      const lowN=Number(r.sample_n)<5;
      return `<tr>
        <td><strong>${r.county}</strong></td>
        <td class="td-num">${fmt0(r.rent_month_median_eur)} €</td>
        <td class="td-num ${lowN?'td-red':''}">N=${r.sample_n}</td>
        <td class="td-num">${fmt(r.rent_burden_pct_pair_net_income,1)} %</td>
        <td class="td-num">${fmt(r.m2_per_year_after_rent)}</td>
        <td class="td-num">${fmt(r.m2_after_rent_sensitivity_low)}–${fmt(r.m2_after_rent_sensitivity_high)}</td>
      </tr>`;
    }).join('');

    section.querySelector('#housingTechnicalTable').innerHTML=`
      <p class="small">Šie rodikliai palikti skaidrumui ir metodinei peržiūrai. <strong>m²/metus po nuomos</strong> yra eksperimentinis teorinis indeksas, o ne realiai per metus nuperkamas būsto plotas. Tauragės nuomos imtis šiuo metu ypač maža (N=2).</p>
      <p class="small housing-scroll-hint" aria-hidden="true">Telefone lentelę slinkite horizontaliai →</p>
      <div class="housing-table-scroll" tabindex="0" aria-label="Techninė būsto įperkamumo lentelė; telefone slinkite horizontaliai">
        <table class="housing-table">
          <thead><tr>
            <th>Apskritis</th>
            <th class="td-num">Nuoma €/mėn.</th>
            <th class="td-num">Nuomos imtis</th>
            <th class="td-num">Nuomos našta</th>
            <th class="td-num">m²/metus po nuomos</th>
            <th class="td-num">Scenarijų diapazonas</th>
          </tr></thead>
          <tbody>${technicalRows}</tbody>
        </table>
      </div>
      <p class="small"><strong>Tai nėra galutinis apskričių įperkamumo reitingas.</strong> Techniniai v0.1 skaičiai bus perskaičiuoti gavus stipresnius pardavimo ir nuomos duomenis.</p>
    `;

    const canvas=section.querySelector('#housingAffordabilityChart');
    if(window.Chart && canvas){
      const ctx=canvas.getContext('2d');
      const labels=rows.map(r=>r.county);
      const years=rows.map(r=>Number(r.standard_50m2_price_to_pair_annual_net_years));
      const existing=Chart.getChart(canvas); if(existing) existing.destroy();
      new Chart(ctx,{
        type:'bar',
        data:{labels,datasets:[{
          label:'50 m² būsto kaina / poros metinės neto pajamos',
          data:years,
          backgroundColor:'#a95d12',
          borderWidth:0
        }]},
        options:{
          indexAxis:'y',
          responsive:true,
          maintainAspectRatio:false,
          plugins:{
            legend:{display:false},
            tooltip:{callbacks:{label:(ctx)=>' '+fmt(ctx.raw,2)+' metų poros neto pajamų'}}
          },
          scales:{
            x:{
              beginAtZero:true,
              title:{display:true,text:'Poros metinių neto pajamų metai'},
              ticks:{callback:v=>String(v).replace('.',',')}
            },
            y:{ticks:{autoSkip:false}}
          }
        }
      });
    }
  }

  async function init(){
    insertShell();
    try{
      const res=await fetch('data/housing-affordability-preliminary-v01.json?v=20261002c',{cache:'no-store'});
      if(!res.ok) throw new Error('HTTP '+res.status);
      render(await res.json());
    }catch(err){
      const section=document.getElementById(SECTION_ID);
      const wrap=section?.querySelector('#housingSimpleTable');
      if(wrap) wrap.innerHTML='<div class="alert alert-red"><strong>Nepavyko įkelti v0.1 duomenų.</strong> '+String(err)+'</div>';
    }
  }

  init();
})();