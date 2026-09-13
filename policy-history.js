// Istorinis šeimos politikos pjūvis: 2007–2012
(() => {
  const anchor=document.getElementById('isvados');
  if(!anchor || document.getElementById('parama-istorija')) return;

  const section=document.createElement('section');
  section.id='parama-istorija';
  section.innerHTML=`<div class="container">
    <div class="section-label">10 · Istorinis politikos pjūvis <span class="badge badge-official">EUROSTAT · E-SEIMAS</span></div>
    <h2>2007–2012: labai dosnios vaiko priežiūros išmokos ir gimstamumo kilimas sutapo laike, bet priežastinio ryšio iš vien šios sekos nustatyti negalime</h2>
    <div class="alert alert-amber"><strong>Svarbi korekcija.</strong> 2008–2009 m. sistema nebuvo pažodžiui „be lubų“. Vaiko priežiūros išmokos buvo labai dosnios, o maksimalus kompensuojamasis uždarbis buvo ribojamas. Todėl čia vartojame formuluotę <strong>„aukštų lubų / labai dosni sistema“</strong>.</div>

    <div class="two-col">
      <div>
        <h3>Politikos chronologija</h3>
        <table><thead><tr><th>Laikas</th><th>Vaiko priežiūros išmokos režimas</th></tr></thead><tbody>
          <tr><td>2007-01</td><td>85 % kompensuojamojo uždarbio.</td></tr>
          <tr><td>2007-07</td><td>100 % iki 6 mėn.; 85 % likusį laiką iki 1 metų.</td></tr>
          <tr><td><strong>2008-01</strong></td><td><strong>100 % iki 1 metų; 85 % iki 2 metų.</strong></td></tr>
          <tr><td>2010-07</td><td>Naujai skiriamoms išmokoms – 90 % iki 1 metų; 75 % iki 2 metų.</td></tr>
          <tr><td>2011-07</td><td>Pasirinkimas: 100 % iki 1 metų arba 70 % pirmaisiais ir 40 % antraisiais metais.</td></tr>
        </tbody></table>
        <p class="small">Tai pagrindiniai režimo lūžiai. Teisinės detalės ir maksimalūs dydžiai kito atskirai.</p>
      </div>
      <div>
        <h3>TFR tuo laikotarpiu</h3>
        <div class="chart-wrap" style="height:330px"><canvas id="policyTfrChart"></canvas></div>
        <div class="chart-caption">Eurostat stebėtas TFR. Jei pilna 2005–2012 metinė serija pasiekiama iš <code>demo_find</code>, ji užkraunama automatiškai; kitu atveju rodomi oficialiai paskelbti 2005, 2010–2012 taškai.</div>
      </div>
    </div>

    <div class="kpi-row">
      <div class="kpi"><div class="kpi-num">1,29</div><div class="kpi-label">TFR · 2005</div><div class="kpi-note">Eurostat</div></div>
      <div class="kpi"><div class="kpi-num green">1,50</div><div class="kpi-label">TFR · 2010</div><div class="kpi-note">Eurostat</div></div>
      <div class="kpi"><div class="kpi-num green">1,55</div><div class="kpi-label">TFR · 2011</div><div class="kpi-note">Eurostat</div></div>
      <div class="kpi"><div class="kpi-num green">1,60</div><div class="kpi-label">TFR · 2012</div><div class="kpi-note">Eurostat</div></div>
    </div>

    <div class="alert alert-blue"><strong>Ką galima pasakyti.</strong> Eurostat fiksuoja, kad Lietuvos TFR nuo 1,29 2005 m. pakilo iki 1,50 2010 m., 1,55 2011 m. ir 1,60 2012 m. Šis kilimas sutapo su ypač dosnios šeimos politikos laikotarpiu. Tačiau kilimas prasidėjo dar iki 2008 m. reformos, o laikotarpį veikė ir ekonominis ciklas, migracija, amžiaus struktūra bei atidėtų gimimų realizacija. Todėl šiame projekte tai laikome <strong>istoriniu sutapimu ir galimu politikos poveikio signalu, ne priežastinio efekto įrodymu</strong>.</div>

    <h3>Ar keitėsi gimimų eiliškumas?</h3>
    <p class="lead">Eurostat duomenų rinkinyje <code>demo_find</code> yra pirmo, antro, trečio ir ketvirto ar aukštesnio eiliškumo gimimų dalys. Jas naudojame tik tada, kai oficiali metinė serija pasiekiama. Tai svarbu mūsų klausimui: finansinis saugumas teoriškai gali labiau veikti sprendimą dėl antro ar trečio vaiko nei patį pirmojo vaiko faktą.</p>
    <div class="chart-wrap" style="height:330px"><canvas id="policyBirthOrderChart"></canvas></div>
    <div class="chart-caption" id="policyBirthOrderCaption">Laukiama Eurostat <code>demo_find</code> gimimų eiliškumo serijos. Jei duomenų nėra, grafikas nerodomas ir jokių reikšmių neinterpoliuojame.</div>

    <h3>Finansinė pusė</h3>
    <div class="findings">
      <div class="finding"><div class="finding-num">01</div><div><div class="finding-title">2008 m. išmokų režimas buvo fiskaliai brangus</div><div class="finding-body">Vyriausybės 2008 m. veiklos ataskaitoje nurodyta, kad beveik <strong>1,7 mlrd. Lt</strong> Valstybinio socialinio draudimo fondo lėšų buvo panaudota <strong>ligos ir motinystės socialinio draudimo išmokoms</strong> mokėti ir didinti. Tai nėra vien vaiko priežiūros išmokų suma, todėl jos taip ir nevadiname.</div></div></div>
      <div class="finding"><div class="finding-num">02</div><div><div class="finding-title">„Sodros“ išlaidos viršijo pajamas</div><div class="finding-body">Toje pačioje Vyriausybės ataskaitoje nurodyta, kad per 2008 m. beveik visas fondo atsargos rezervas buvo panaudotas, o metų pabaigoje fondui teko skolintis lėšų socialinio draudimo išmokoms laiku mokėti.</div></div></div>
      <div class="finding"><div class="finding-num">03</div><div><div class="finding-title">Politikos klausimas turi dvi puses</div><div class="finding-body">Vertinant naują 2026 m. šeimos paketą verta atskirai klausti: <strong>(a)</strong> ar finansinis saugumas keičia gimimų laiką ir eiliškumą, ir <strong>(b)</strong> ar pasirinktas finansavimo modelis yra tvarus senėjančiai visuomenei. Vienas teigiamas atsakymas savaime negarantuoja kito.</div></div></div>
    </div>

    <div class="alert alert-green"><strong>Ką verta stebėti dabar.</strong> Jei norėsime vertinti 2026 m. paketą rimtai, svarbiausi būsimi rodikliai bus ne tik bendras TFR, bet ir <strong>pirmų / antrų / trečių gimimų dalys, motinos amžius pagal gimimo eiliškumą, gimimų skaičius pagal pajamas / užimtumo statusą (jei oficialiai prieinama) ir reali metinė paketo fiskalinė kaina</strong>.</div>

    <div class="source-line">Šaltiniai: <a href="https://ec.europa.eu/eurostat/databrowser/view/demo_find/default/table?lang=en" target="_blank" rel="noopener">Eurostat · demo_find</a> · <a href="https://ec.europa.eu/eurostat/documents/2995521/5181166/3-07032014-BP-EN.PDF/86db5ee8-ad86-4b92-b7de-96d4685746ac?version=1.0" target="_blank" rel="noopener">Eurostat · fertility rates 2001/2005/2010–2012</a> · <a href="https://e-seimas.lrs.lt/rs/actualedition/TAIS.119523/FEcGJWRZMz/" target="_blank" rel="noopener">E-Seimas · išmokų režimas</a> · <a href="https://e-seimas.lrs.lt/rs/legalact/TAD/TAIS.350209/" target="_blank" rel="noopener">2009 m. įstatymas · 90/75 % nuo 2010-07</a> · <a href="https://e-seimas.lrs.lt/rs/legalact/TAD/TAIS.340242/" target="_blank" rel="noopener">Vyriausybės 2008 m. veiklos ataskaita</a></div>
  </div>`;
  anchor.insertAdjacentElement('beforebegin', section);

  const fallback=[
    {year:2005,tfr:1.29},
    {year:2010,tfr:1.50},
    {year:2011,tfr:1.55},
    {year:2012,tfr:1.60}
  ];

  const render=(rows)=>{
    const tfrRows=rows.filter(r=>Number.isFinite(r.tfr));
    const c=document.getElementById('policyTfrChart');
    if(c && window.Chart && tfrRows.length){
      new Chart(c,{type:'line',data:{labels:tfrRows.map(r=>String(r.year)),datasets:[{label:'Lietuvos TFR',data:tfrRows.map(r=>r.tfr),borderColor:'#b9382b',backgroundColor:'#b9382b',tension:.2,pointRadius:5,borderWidth:3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},scales:{y:{min:1.1,max:1.8,title:{display:true,text:'Vaikai vienai moteriai'},grid:{color:'rgba(74,72,69,.12)'}},x:{grid:{display:false}}}}});
    }

    const hasOrders=rows.some(r=>['first_birth_share','second_birth_share','third_birth_share','fourth_plus_birth_share'].some(k=>Number.isFinite(r[k])));
    const oc=document.getElementById('policyBirthOrderChart');
    const cap=document.getElementById('policyBirthOrderCaption');
    if(oc && window.Chart && hasOrders){
      const ks=[['first_birth_share','Pirmi'],['second_birth_share','Antri'],['third_birth_share','Treti'],['fourth_plus_birth_share','Ketvirti+']];
      const datasets=ks.map(([key,label])=>({label,data:rows.map(r=>Number.isFinite(r[key])?r[key]:null),borderWidth:2,tension:.2,pointRadius:3,spanGaps:true}));
      new Chart(oc,{type:'line',data:{labels:rows.map(r=>String(r.year)),datasets},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},scales:{y:{title:{display:true,text:'Visų gyvų gimimų dalis, %'},grid:{color:'rgba(74,72,69,.12)'}},x:{grid:{display:false}}}}});
      if(cap) cap.innerHTML='Gyvų gimimų dalis pagal gimimo eiliškumą · Eurostat <code>demo_find</code>. Tarpinių trūkstamų reikšmių neinterpoliuojame.';
    } else if(oc){
      oc.closest('.chart-wrap')?.remove();
    }
  };

  fetch('data/family-policy-history.json?v=20260913a',{cache:'no-store'})
    .then(r=>{if(!r.ok) throw new Error('no history data'); return r.json();})
    .then(j=>{
      const rows=(j.data||[]).map(r=>({
        ...r,
        tfr:Number.isFinite(r.tfr)?r.tfr:undefined,
        first_birth_share:Number.isFinite(r.first_birth_share)?r.first_birth_share:undefined,
        second_birth_share:Number.isFinite(r.second_birth_share)?r.second_birth_share:undefined,
        third_birth_share:Number.isFinite(r.third_birth_share)?r.third_birth_share:undefined,
        fourth_plus_birth_share:Number.isFinite(r.fourth_plus_birth_share)?r.fourth_plus_birth_share:undefined
      }));
      render(rows.some(r=>Number.isFinite(r.tfr))?rows:fallback);
    })
    .catch(()=>render(fallback));
})();
