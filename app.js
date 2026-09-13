Chart.defaults.font.family="'Instrument Sans', sans-serif";
Chart.defaults.color='#4a4845';
const grid='rgba(74,72,69,.12)', red='#b9382b', blue='#1d4f7d', green='#2f6942', amber='#a95d12';
const canvas=id=>document.getElementById(id);
const makeChart=(id,config)=>{const el=canvas(id); if(el) return new Chart(el,config);};

makeChart('tfrChart',{type:'line',data:{labels:['2021','2022','2023','2024'],datasets:[{label:'Lietuva',data:[1.34,1.27,1.18,1.11],borderColor:red,backgroundColor:red,tension:.25,pointRadius:4,borderWidth:3},{label:'ES',data:[1.53,1.46,1.38,1.34],borderColor:blue,backgroundColor:blue,tension:.25,pointRadius:4,borderWidth:2}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},scales:{y:{min:1,max:1.65,grid:{color:grid},title:{display:true,text:'Gyvų gimusių vaikų / moteriai'}},x:{grid:{display:false}}}}});

makeChart('regionChart',{type:'bar',data:{labels:['Tauragės','Kauno','Klaipėdos','Telšių','Vilniaus','Šiaulių','Panevėžio','Marijampolės','Utenos','Alytaus'],datasets:[{data:[1.21,1.16,1.15,1.11,1.10,1.09,1.08,1.03,.96,.96],backgroundColor:[green,blue,blue,blue,blue,blue,blue,amber,red,red],borderWidth:0}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{min:.8,max:1.3,grid:{color:grid}},y:{grid:{display:false}}}}});

makeChart('marriageChart',{type:'line',data:{labels:['2020','2021','2022','2023','2024'],datasets:[{label:'Santuokų rodiklis',data:[5.4,6.0,5.7,4.9,4.5],borderColor:blue,backgroundColor:blue,tension:.25,pointRadius:4,borderWidth:2},{label:'Ištuokų rodiklis',data:[2.7,2.8,2.6,2.5,2.5],borderColor:red,backgroundColor:red,tension:.25,pointRadius:4,borderWidth:2}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},scales:{y:{min:0,max:7,grid:{color:grid},title:{display:true,text:'1 000 gyventojų'}},x:{grid:{display:false}}}}});

makeChart('ageChart',{type:'line',data:{labels:['2021','2022','2023','2024'],datasets:[{label:'Lietuva',data:[28.2,28.2,28.4,28.7],borderColor:amber,backgroundColor:amber,tension:.2,pointRadius:5,borderWidth:3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{min:27.5,max:30.2,grid:{color:grid},title:{display:true,text:'Metai'}},x:{grid:{display:false}}}}});

const digitalYears=['2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'];
makeChart('digitalChart',{type:'line',data:{labels:digitalYears,datasets:[{label:'Lietuva',data:[29.38,37.16,41.36,44.97,47.56,49.17,53.03,56.54,56.82,61.25,64.62,69.13,72.79,76.01,78.65,82.83,85.89,86.45,87.37],borderColor:red,backgroundColor:red,tension:.2,pointRadius:3,borderWidth:3},{label:'ES-27',data:[32,37.14,41.77,46.87,50.8,52.86,56.24,60.02,62.91,66.73,68.9,72.58,75.74,78.9,80.1,83.34,85.42,87.93,89.44],borderColor:blue,backgroundColor:blue,tension:.2,pointRadius:3,borderWidth:2}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},scales:{y:{min:20,max:100,grid:{color:grid},title:{display:true,text:'% 16–74 m. gyventojų'}},x:{grid:{display:false}}}}});

makeChart('pisaChart',{type:'bar',data:{labels:['Mokymuisi mokykloje','Laisvalaikiui mokykloje'],datasets:[{label:'Lietuva',data:[1.9,1.1],backgroundColor:blue},{label:'OECD vidurkis',data:[1.7,1.1],backgroundColor:amber}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},scales:{y:{beginAtZero:true,max:2.5,grid:{color:grid},title:{display:true,text:'Valandos per dieną'}},x:{grid:{display:false}}}}});

// 2025 m. lyties ir amžiaus struktūra, senėjimas ir gyvenimo trukmė
const ageSection=document.getElementById('amzius');
if(ageSection){
  const sexSection=document.createElement('section');
  sexSection.id='lytis-amzius';
  sexSection.innerHTML=`<div class="container">
    <div class="section-label">06 · Gyventojų struktūra pagal lytį ir amžių <span class="badge badge-official">VDA · 2025</span></div>
    <h2>2025 m. gyventojų piramidė: jaunesnėse ir vidutinio amžiaus grupėse struktūra skiriasi nuo vyresnių grupių</h2>
    <p class="lead">VDA 2025 m. pradžios duomenys pateikia vyrų ir moterų pasiskirstymą 5 metų amžiaus grupėmis. Kiekvienos lyties stulpeliai sudaro apie 100 % tos lyties gyventojų.</p>
    <div class="kpi-row">
      <div class="kpi"><div class="kpi-num">1 517,0 tūkst.</div><div class="kpi-label">Moterys · 2025-01-01</div><div class="kpi-note">52,5 % visų gyventojų</div></div>
      <div class="kpi"><div class="kpi-num">1 373,7 tūkst.</div><div class="kpi-label">Vyrai · 2025-01-01</div></div>
      <div class="kpi"><div class="kpi-num blue">1 104</div><div class="kpi-label">Moterų 1 000 vyrų · 2025</div><div class="kpi-note">2024: 1 113</div></div>
      <div class="kpi"><div class="kpi-num green">20,9 %</div><div class="kpi-label">65 metų ir vyresni · 2025</div><div class="kpi-note">603,5 tūkst.</div></div>
    </div>
    <div class="chart-wrap" style="height:520px"><canvas id="sexAgeChart"></canvas></div>
    <div class="chart-caption">Gyventojų skaičius pagal lytį ir amžiaus grupes · 2025 m. pradžia · procentais. Vyrai kairėje, moterys dešinėje.</div>
    <div class="two-col" style="margin-top:2rem">
      <div>
        <h3>Moterų skaičius 1 000 vyrų · 2015–2025</h3>
        <div class="chart-wrap" style="height:300px"><canvas id="womenPer1000Chart"></canvas></div>
        <div class="chart-caption">VDA · metų pradžioje. 2015: 1 174 → 2025: 1 104.</div>
      </div>
      <div>
        <h3>Senėjimo kontekstas · 2025</h3>
        <div class="kpi-row">
          <div class="kpi"><div class="kpi-num green">603,5 tūkst.</div><div class="kpi-label">65 metų ir vyresni gyventojai</div><div class="kpi-note">+16,5 tūkst. per metus · +2,8 %</div></div>
          <div class="kpi"><div class="kpi-num amber">148</div><div class="kpi-label">65+ žmonių 100 vaikų (0–14 m.)</div></div>
        </div>
        <div class="alert alert-blue"><strong>VDA kontekstas:</strong> 2025 m. pradžioje kas šeštas vyras ir kas ketvirta moteris buvo 65 metų ar vyresni. Tai gyventojų senėjimo struktūros rodikliai, ne TFR priežasties įrodymas.</div>
      </div>
    </div>
    <div class="two-col" style="margin-top:1rem">
      <div>
        <h3>Vidutinė tikėtina gyvenimo trukmė · 2024</h3>
        <div class="chart-wrap" style="height:260px"><canvas id="lifeExpectancyChart"></canvas></div>
        <div class="chart-caption">Vyrai 73,02 m.; moterys 81,64 m.; skirtumas 8,62 metų.</div>
      </div>
      <div>
        <div class="alert alert-green"><strong>Kaip skaityti piramidę:</strong> vyresnėse amžiaus grupėse moterų dalis didesnė. Vienas svarbus kontekstas – 2024 m. moterų vidutinė tikėtina gyvenimo trukmė buvo 8,6 metų ilgesnė nei vyrų.</div>
      </div>
    </div>
    <div class="source-line">Šaltinis: <a href="https://publikacijos.stat.gov.lt/lietuva-skaiciais-2025/lt/categories/3" target="_blank" rel="noopener">Valstybės duomenų agentūra · Lietuva skaičiais 2025 · Nuolatiniai gyventojai</a></div>
  </div>`;
  ageSection.insertAdjacentElement('afterend',sexSection);

  const nav=document.querySelector('nav');
  const digitalLink=nav?.querySelector('a[href="#skaitmena"]');
  if(nav && digitalLink && !nav.querySelector('a[href="#lytis-amzius"]')){
    const link=document.createElement('a'); link.href='#lytis-amzius'; link.textContent='Lytis · amžius';
    digitalLink.insertAdjacentElement('beforebegin',link);
  }
  const renumber=[['#skaitmena','07'],['#uzsienieciai','08'],['#isvados','09'],['#metodika','10'],['#saltiniai','11']];
  renumber.forEach(([sel,n])=>{const el=document.querySelector(`${sel} .section-label`); if(el) el.innerHTML=el.innerHTML.replace(/^\d{2}/,n);});
}

const sexAgeGroups=['0–4','5–9','10–14','15–19','20–24','25–29','30–34','35–39','40–44','45–49','50–54','55–59','60–64','65–69','70–74','75–79','80–84','85+'];
const malePct2025=[4.2,5.5,5.6,5.4,5.1,6.1,7.8,8.6,7.8,7.1,7.1,7.0,7.1,5.8,3.9,2.7,1.8,1.4];
const femalePct2025=[3.6,4.7,4.8,4.6,4.3,4.9,6.2,6.8,6.3,6.2,6.9,7.1,7.9,7.3,5.7,4.8,3.9,3.9];
makeChart('sexAgeChart',{type:'bar',data:{labels:sexAgeGroups,datasets:[{label:'Vyrai',data:malePct2025.map(v=>-v),backgroundColor:blue,borderWidth:0},{label:'Moterys',data:femalePct2025,backgroundColor:red,borderWidth:0}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'},tooltip:{callbacks:{label:(ctx)=>`${ctx.dataset.label}: ${Math.abs(ctx.raw).toLocaleString('lt-LT')} %`}}},scales:{x:{stacked:true,min:-9,max:9,grid:{color:grid},ticks:{callback:(v)=>Math.abs(v).toLocaleString('lt-LT')},title:{display:true,text:'% atitinkamos lyties gyventojų'}},y:{stacked:true,grid:{display:false}}}}});

makeChart('womenPer1000Chart',{type:'line',data:{labels:['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'],datasets:[{label:'Moterys 1 000 vyrų',data:[1174,1174,1175,1174,1171,1162,1154,1148,1139,1113,1104],borderColor:blue,backgroundColor:blue,tension:.2,pointRadius:4,borderWidth:3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{min:1080,max:1190,grid:{color:grid},title:{display:true,text:'Moterų 1 000 vyrų'}},x:{grid:{display:false}}}}});

makeChart('lifeExpectancyChart',{type:'bar',data:{labels:['Vyrai','Moterys'],datasets:[{data:[73.02,81.64],backgroundColor:[blue,red]}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{min:65,max:85,grid:{color:grid},title:{display:true,text:'Metai'}},x:{grid:{display:false}}}}});

// Ilgesnis migracijos kontekstas: 2015–2024 galutiniai VDA + 2025* išankstiniai VDA
const populationSection=document.getElementById('gyventojai');
if(populationSection){
  const source=populationSection.querySelector('.source-line');
  if(source && !canvas('migrationTrendChart')){
    const block=document.createElement('div');
    block.innerHTML=`<h3 style="margin-top:2rem">Tarptautinė migracija · 2015–2025*</h3><div class="chart-wrap" style="height:360px"><canvas id="migrationTrendChart"></canvas></div><div class="chart-caption">2015–2024 m. – galutiniai VDA duomenys; 2025* – išankstiniai VDA duomenys. Rodomi visi imigrantai ir emigrantai.</div>`;
    source.insertAdjacentElement('beforebegin',block);
  }
}
makeChart('migrationTrendChart',{type:'line',data:{labels:['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025*'],datasets:[{label:'Imigrantai',data:[31085,31395,33305,37420,46526,46020,44858,87367,66682,51845,44705],borderColor:green,backgroundColor:green,tension:.2,pointRadius:3,borderWidth:3},{label:'Emigrantai',data:[50445,56299,53951,38638,35441,25245,25205,15270,21688,28705,28540],borderColor:red,backgroundColor:red,tension:.2,pointRadius:3,borderWidth:3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},scales:{y:{beginAtZero:true,grid:{color:grid},title:{display:true,text:'Žmonių skaičius'}},x:{grid:{display:false}}}}});

// Oficialus suminis ištuokų rodiklis
const marriageSection=document.getElementById('santuokos');
if(marriageSection){
  const source=marriageSection.querySelector('.source-line');
  if(source && !marriageSection.querySelector('.divorce-lifetime-note')){
    const note=document.createElement('div');
    note.className='alert alert-blue divorce-lifetime-note';
    note.style.marginTop='1.2rem';
    note.innerHTML='<strong>Tikslesnis ilgalaikis matas:</strong> VDA nurodo, kad suminis ištuokų rodiklis, atsižvelgiantis į buvusios santuokos trukmę, reiškia: jei išliktų pastarųjų metų tendencija, iš 100 susituokusių porų apie 35 išsituoktų. Tai nėra tas pats, kas tų pačių metų santuokų ir ištuokų santykis.';
    source.insertAdjacentElement('beforebegin',note);
  }
}

// Pirminių šaltinių bloke aiškiai įtraukiame VDA 2025 demografijos puslapį
const sourcesGrid=document.querySelector('#saltiniai .sources');
if(sourcesGrid && !sourcesGrid.querySelector('a[href="https://publikacijos.stat.gov.lt/lietuva-skaiciais-2025/lt/categories/3"]')){
  const card=document.createElement('div');
  card.className='source-card';
  card.innerHTML='<strong>Valstybės duomenų agentūra · Lietuva skaičiais 2025 · Nuolatiniai gyventojai</strong><a href="https://publikacijos.stat.gov.lt/lietuva-skaiciais-2025/lt/categories/3" target="_blank" rel="noopener">Lytis ir amžius, senėjimas, gyvenimo trukmė, migracija, santuokos ir ištuokos</a>';
  sourcesGrid.prepend(card);
}
