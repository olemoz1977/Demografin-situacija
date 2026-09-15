(() => {
  const red='#b9382b', blue='#1d4f7d', amber='#a95d12', ink3='#7c7872';
  const grid='rgba(74,72,69,.12)';

  fetch('data/sex-ratio-history.json?v=20260915')
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
        block.id='sexRatioByAgeBlock';
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

      // Gimimų santykis vs. dabartinis tų pačių apytikslių amžiaus kohortų santykis.
      fetch('data/birth-sex-history.json?v=20260915',{cache:'no-store'})
        .then(r=>{if(!r.ok) throw new Error(`HTTP ${r.status}`); return r.json();})
        .then(births=>{
          if(document.getElementById('sexBirthCohortBlock')) return;
          const rows=births.data||[];
          const groups=[
            {from:1985,to:1989,age:'35–39'},
            {from:1990,to:1994,age:'30–34'},
            {from:1995,to:1999,age:'25–29'}
          ].map(g=>{
            const subset=rows.filter(r=>r.year>=g.from&&r.year<=g.to);
            const male=subset.reduce((s,r)=>s+r.male,0);
            const female=subset.reduce((s,r)=>s+r.female,0);
            const now=data.latest_by_age.values.find(v=>v.age===g.age);
            return {
              label:`${g.from}–${String(g.to).slice(-2)} → ${g.age} m.`,
              born:male?Math.round(female/male*10000)/10:null,
              now:now?.women_per_1000_men??null
            };
          });
          const anchor=document.getElementById('sexRatioByAgeBlock');
          if(!anchor) return;
          const block=document.createElement('div');
          block.id='sexBirthCohortBlock';
          block.style.marginTop='2.4rem';
          block.innerHTML=`
            <h3>Ar vien gimimų santykis paaiškina dabartinį disbalansą?</h3>
            <p class="lead">Ne. 1985–1999 m. Lietuvoje gimstant mergaičių ir berniukų santykis buvo maždaug <strong>942–950 mergaičių 1 000 berniukų</strong>. 2025 m. atitinkamose 25–39 m. gyventojų grupėse santykis jau buvo tik <strong>877–884 moterys 1 000 vyrų</strong>.</p>
            <div class="chart-wrap" style="height:340px"><canvas id="sexBirthCohortChart"></canvas></div>
            <div class="chart-caption">Gimimų santykis: UN Statistics Division Demographic Yearbook, oficialios civilinės registracijos statistika. 2025 m. gyventojų santykis: Eurostat <code>demo_pjan</code>. Penkerių metų gimimo laikotarpiai lyginami su beveik atitinkančiomis amžiaus grupėmis 2025-01-01.</div>
            <div class="alert alert-amber" style="margin-top:1.1rem"><strong>Svarbi metodinė riba.</strong> Tai nėra uždara tos pačios kohortos sekimo studija. Gimimų duomenys rodo vaikus, gimusius Lietuvoje, o 2025 m. gyventojų duomenys – tuo metu Lietuvoje gyvenančius žmones nepriklausomai nuo gimimo šalies. Skirtumą gali keisti tarptautinė migracija, mirtingumas ir gyventojų apskaitos pokyčiai. Todėl grafikas parodo, kad <strong>vien biologinio santykio gimstant dabartiniam skirtumui paaiškinti nepakanka</strong>, bet pats savaime neįrodo priežasties.</div>
            <p class="small">UN 1980–1999 lentelėje Lietuvos bendras gimimų skaičius pateiktas ir 1980–1984 m., tačiau vyrų / moterų pjūvis tiems metams ten nepaskelbtas, todėl palyginama lyčių serija čia pradedama 1985 m.</p>
            <div class="source-line">Šaltiniai: <a href="${births.source.url_1985_1998}" target="_blank" rel="noopener">UN Demographic Yearbook · 1985–1998 gimimai pagal lytį</a> · <a href="${births.source.url_1999}" target="_blank" rel="noopener">UN Demographic Yearbook · 1999 patikslinti duomenys</a> · <a href="https://ec.europa.eu/eurostat/databrowser/view/demo_pjan/default/table?lang=en" target="_blank" rel="noopener">Eurostat · demo_pjan</a></div>`;
          anchor.insertAdjacentElement('afterend',block);

          const c=document.getElementById('sexBirthCohortChart');
          if(c&&window.Chart){
            new Chart(c,{
              type:'bar',
              data:{labels:groups.map(g=>g.label),datasets:[
                {label:'Gimstant · mergaičių 1 000 berniukų',data:groups.map(g=>g.born),backgroundColor:amber},
                {label:'2025 m. · moterų 1 000 vyrų',data:groups.map(g=>g.now),backgroundColor:blue}
              ]},
              options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},scales:{y:{min:820,max:1000,grid:{color:grid},title:{display:true,text:'Moterų / mergaičių 1 000 vyrų / berniukų'}},x:{grid:{display:false}}}}
            });
          }
        })
        .catch(err=>console.error('Nepavyko įkelti istorinių gimimų pagal lytį:',err));

      const source=document.querySelector('#lytis-amzius .source-line');
      if(source && !source.innerHTML.includes('demo_pjan')){
        source.innerHTML += ' · <a href="https://ec.europa.eu/eurostat/databrowser/view/demo_pjan/default/table?lang=en" target="_blank" rel="noopener">Eurostat · demo_pjan · amžius × lytis</a>';
      }
    })
    .catch(err => console.error('Nepavyko įkelti Eurostat lyties/amžiaus istorijos:',err));
})();
