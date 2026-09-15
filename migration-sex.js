// Tarptautinės migracijos srautai pagal lytį · 25–44 m.
(() => {
  const blue='#1d4f7d', red='#b9382b', ink3='#7c7872';
  const grid='rgba(74,72,69,.12)';
  const fmt=n=>Number(n).toLocaleString('lt-LT');
  const signed=n=>`${n>0?'+':''}${fmt(n)}`;

  fetch('data/migration-sex-history.json?v=20260915b',{cache:'no-store'})
    .then(r=>{if(!r.ok) throw new Error(`HTTP ${r.status}`); return r.json();})
    .then(data=>{
      const total=data.total_25_44||[];
      const lt=data.lithuanian_citizens_25_44||[];
      if(!total.length || document.getElementById('migrationSexBlock')) return;

      const anchor=document.getElementById('sexBirthCohortBlock') || document.getElementById('sexRatioByAgeBlock');
      if(!anchor) return;

      const sum=(rows,key)=>rows.reduce((s,r)=>s+(Number(r[key])||0),0);
      const maleNet=sum(total,'net_men');
      const femaleNet=sum(total,'net_women');
      const latest=total[total.length-1];
      const ltLatest=lt.length?lt[lt.length-1]:null;
      const start=total[0].year, end=latest.year;

      const block=document.createElement('div');
      block.id='migrationSexBlock';
      block.style.marginTop='2.5rem';
      block.innerHTML=`
        <h3>Ką su 25–44 m. lyčių balansu darė migracija?</h3>
        <p class="lead">Eurostat leidžia atskirti atvykimus ir išvykimus pagal lytį. ${start}–${end} m. 25–44 m. grupėje susumuotas tarptautinės migracijos balansas buvo <strong>${signed(maleNet)} vyrams</strong> ir <strong>${signed(femaleNet)} moterims</strong>. Tai jau tiesioginis migracijos srautų signalas, tačiau <strong>ne 2025 m. gyventojų lyčių disbalanso priežasties įrodymas</strong>.</p>

        <div class="chart-wrap" style="height:340px"><canvas id="migrationNetSexChart"></canvas></div>
        <div class="chart-caption">25–44 m. neto tarptautinė migracija pagal lytį: imigracija minus emigracija tais pačiais metais. Eurostat <code>migr_imm8</code> ir <code>migr_emi2</code>. Naujausias palyginamas detalus laikotarpis – ${end} m.</div>

        <div class="alert alert-blue" style="margin-top:1.1rem"><strong>${end} m. pjūvis.</strong> Į Lietuvą atvyko <strong>${fmt(latest.immigration_men)} vyrų</strong> ir <strong>${fmt(latest.immigration_women)} moterų</strong> 25–44 m. grupėje; išvyko atitinkamai <strong>${fmt(latest.emigration_men)}</strong> ir <strong>${fmt(latest.emigration_women)}</strong>. Metinis neto balansas: <strong>${signed(latest.net_men)} vyrams</strong> ir <strong>${signed(latest.net_women)} moterims</strong>.</div>

        ${lt.length?`
        <h3 style="margin-top:2rem">O Lietuvos piliečių grįžimas?</h3>
        <p>Čia „grįžtamąją migraciją“ apibrėžiame kaip <strong>Lietuvos piliečių imigraciją į Lietuvą</strong>. Tai agreguotas oficialus rodiklis – jis neseka, ar grįžo tas pats anksčiau išvykęs žmogus.</p>
        <div class="chart-wrap" style="height:360px"><canvas id="ltCitizenMigrationSexChart"></canvas></div>
        <div class="chart-caption">25–44 m. Lietuvos piliečiai pagal lytį · grįžo į Lietuvą ir išvyko iš Lietuvos. Eurostat <code>migr_imm1ctz</code> ir <code>migr_emi1ctz</code>.</div>
        ${ltLatest?`<div class="alert alert-green" style="margin-top:1.1rem"><strong>${ltLatest.year} m. Lietuvos piliečiai, 25–44 m.</strong> Grįžo <strong>${fmt(ltLatest.return_men)} vyrų</strong> ir <strong>${fmt(ltLatest.return_women)} moterų</strong>; išvyko <strong>${fmt(ltLatest.emigration_men)} vyrų</strong> ir <strong>${fmt(ltLatest.emigration_women)} moterų</strong>. Neto: <strong>${signed(ltLatest.net_men)} vyrams</strong>, <strong>${signed(ltLatest.net_women)} moterims</strong>.</div>`:''}
        `:''}

        <div class="alert alert-amber" style="margin-top:1.2rem"><strong>Kaip interpretuoti.</strong> Jei vyrų neto migracija ilgą laiką yra didesnė už moterų, migracija gali stumti 25–44 m. lyčių santykį vyrų pusėn. Tačiau 2025 m. populiacijos santykį kartu veikia kohortų senėjimas, ankstesnių metų migracija, mirtingumas ir tai, kad gyventojų grupė nėra uždara. Todėl čia tikriname mechanizmą, o ne skelbiame vieną priežastį.</div>

        <div class="source-line">Šaltiniai: <a href="${data.source.urls.migr_imm8}" target="_blank" rel="noopener">Eurostat · migr_imm8 · imigracija pagal amžių ir lytį</a> · <a href="${data.source.urls.migr_emi2}" target="_blank" rel="noopener">migr_emi2 · emigracija pagal amžių ir lytį</a> · <a href="${data.source.urls.migr_imm1ctz}" target="_blank" rel="noopener">migr_imm1ctz · imigracija pagal pilietybę</a> · <a href="${data.source.urls.migr_emi1ctz}" target="_blank" rel="noopener">migr_emi1ctz · emigracija pagal pilietybę</a></div>`;

      anchor.insertAdjacentElement('afterend',block);

      const c=document.getElementById('migrationNetSexChart');
      if(c&&window.Chart){
        new Chart(c,{
          type:'line',
          data:{labels:total.map(r=>String(r.year)),datasets:[
            {label:'Vyrų neto migracija',data:total.map(r=>r.net_men),borderColor:blue,backgroundColor:blue,borderWidth:3,tension:.2,pointRadius:4},
            {label:'Moterų neto migracija',data:total.map(r=>r.net_women),borderColor:red,backgroundColor:red,borderWidth:3,tension:.2,pointRadius:4},
            {label:'0 · balansas',data:total.map(()=>0),borderColor:ink3,backgroundColor:ink3,borderDash:[6,6],pointRadius:0,borderWidth:1.5}
          ]},
          options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},scales:{y:{grid:{color:grid},title:{display:true,text:'Neto migracija, žmonės'}},x:{grid:{display:false}}}}
        });
      }

      const lc=document.getElementById('ltCitizenMigrationSexChart');
      if(lc&&window.Chart&&lt.length){
        new Chart(lc,{
          type:'line',
          data:{labels:lt.map(r=>String(r.year)),datasets:[
            {label:'Grįžo vyrai',data:lt.map(r=>r.return_men),borderColor:blue,backgroundColor:blue,borderWidth:3,tension:.2,pointRadius:3},
            {label:'Išvyko vyrai',data:lt.map(r=>r.emigration_men),borderColor:blue,backgroundColor:blue,borderDash:[6,5],borderWidth:2,tension:.2,pointRadius:2},
            {label:'Grįžo moterys',data:lt.map(r=>r.return_women),borderColor:red,backgroundColor:red,borderWidth:3,tension:.2,pointRadius:3},
            {label:'Išvyko moterys',data:lt.map(r=>r.emigration_women),borderColor:red,backgroundColor:red,borderDash:[6,5],borderWidth:2,tension:.2,pointRadius:2}
          ]},
          options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},scales:{y:{beginAtZero:true,grid:{color:grid},title:{display:true,text:'Žmonės'}},x:{grid:{display:false}}}}
        });
      }
    })
    .catch(err=>console.error('Nepavyko įkelti migracijos pagal lytį duomenų:',err));
})();
