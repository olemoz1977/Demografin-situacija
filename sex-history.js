(() => {
  const red='#b9382b', blue='#1d4f7d', amber='#a95d12', ink3='#7c7872';
  const grid='rgba(74,72,69,.12)';

  fetch('data/sex-ratio-history.json?v=20260913')
    .then(r => { if(!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
    .then(data => {
      const histCanvas=document.getElementById('womenPer1000Chart');
      if(!histCanvas) return;

      const s15=data.series_15_49;
      const s25=data.series_25_44;
      const latest15=s15[s15.length-1];
      const latest25=s25[s25.length-1];
      const col=histCanvas.parentElement?.parentElement;
      const title=col?.querySelector('h3');
      const caption=col?.querySelector('.chart-caption');
      if(title) title.textContent='Reprodukcinio amžiaus moterų / vyrų santykis · 2015–2025';

      if(col && !document.getElementById('reproLatestNote')){
        const note=document.createElement('div');
        note.id='reproLatestNote';
        note.className='alert alert-blue';
        note.style.marginBottom='1rem';
        note.innerHTML=`<strong>2025 m.</strong> 15–49 m. grupėje buvo <strong>${latest15.women.toLocaleString('lt-LT')}</strong> moteris ir <strong>${latest15.men.toLocaleString('lt-LT')}</strong> vyrai – <strong>${latest15.women_per_1000_men.toLocaleString('lt-LT')} moters 1 000 vyrų</strong>. 25–44 m. papildomame pjūvyje – <strong>${latest25.women_per_1000_men.toLocaleString('lt-LT')}</strong>. Visos populiacijos bendras 2025 m. rodiklis (1 104) šį amžiaus skirtumą paslepia.`;
        title?.insertAdjacentElement('afterend',note);
      }

      const old=Chart.getChart(histCanvas);
      if(old) old.destroy();
      new Chart(histCanvas,{
        type:'line',
        data:{
          labels:s15.map(d=>String(d.year)),
          datasets:[
            {label:'15–49 m. · standartinis reprodukcinis amžius',data:s15.map(d=>d.women_per_1000_men),borderColor:red,backgroundColor:red,tension:.2,pointRadius:4,borderWidth:3},
            {label:'25–44 m. · papildomas pjūvis',data:s25.map(d=>d.women_per_1000_men),borderColor:amber,backgroundColor:amber,tension:.2,pointRadius:3,borderWidth:2},
            {label:'Balansas · 1 000',data:s15.map(()=>1000),borderColor:ink3,backgroundColor:ink3,borderDash:[6,6],pointRadius:0,borderWidth:1.5}
          ]
        },
        options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},scales:{y:{min:850,max:1040,grid:{color:grid},title:{display:true,text:'Moterų 1 000 vyrų'}},x:{grid:{display:false}}}}
      });
      if(caption) caption.innerHTML='Eurostat <code>demo_pjan</code> · metų pradžioje · skaičiuota iš absoliučių vienerių metų amžiaus vyrų ir moterų skaičių. 15–49 m. – standartinis vaisingumo rodiklių amžiaus intervalas; 25–44 m. – papildomas pjūvis.';

      const pyramid=document.getElementById('sexAgeChart');
      if(pyramid && !document.getElementById('sexRatioByAge2025Chart')){
        const pyramidCaption=pyramid.parentElement?.nextElementSibling;
        const block=document.createElement('div');
        block.style.marginTop='2rem';
        block.innerHTML=`<h3>Moterys 1 000 vyrų pagal amžių · ${data.latest_by_age.year}</h3><div class="chart-wrap" style="height:360px"><canvas id="sexRatioByAge2025Chart"></canvas></div><div class="chart-caption">Eurostat <code>demo_pjan</code> · absoliutūs gyventojų skaičiai. 1 000 = vienodas moterų ir vyrų skaičius toje amžiaus grupėje.</div>`;
        if(pyramidCaption) pyramidCaption.insertAdjacentElement('afterend',block);
        else pyramid.parentElement?.insertAdjacentElement('afterend',block);

        const vals=data.latest_by_age.values;
        const ageCanvas=document.getElementById('sexRatioByAge2025Chart');
        new Chart(ageCanvas,{
          type:'bar',
          data:{labels:vals.map(d=>d.age),datasets:[
            {label:'Moterys 1 000 vyrų',data:vals.map(d=>d.women_per_1000_men),backgroundColor:blue},
            {label:'Balansas · 1 000',data:vals.map(()=>1000),type:'line',borderColor:ink3,backgroundColor:ink3,borderDash:[6,6],pointRadius:0,borderWidth:1.5}
          ]},
          options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},scales:{y:{min:800,max:1450,grid:{color:grid},title:{display:true,text:'Moterų 1 000 vyrų'}},x:{grid:{display:false}}}}
        });
      }

      const source=document.querySelector('#lytis-amzius .source-line');
      if(source && !source.innerHTML.includes('demo_pjan')){
        source.innerHTML += ' · <a href="https://ec.europa.eu/eurostat/databrowser/view/demo_pjan/default/table?lang=en" target="_blank" rel="noopener">Eurostat · demo_pjan · amžius × lytis</a>';
      }
    })
    .catch(err => console.error('Nepavyko įkelti Eurostat lyties/amžiaus istorijos:',err));
})();
