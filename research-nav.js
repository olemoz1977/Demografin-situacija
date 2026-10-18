(() => {
  const VALID_VIEWS=['overview','fertility','population','migration','family','housing','future','methods','all'];
  const VIEW_META={
    overview:{label:'Apžvalga',title:'60 sekundžių apžvalga',desc:'2024 m. TFR 1,11; 2025* natūralaus mažėjimo migracija nekompensavo.'},
    fertility:{label:'Gimstamumas',title:'Gimstamumas',desc:'2024 m. TFR 1,11 ir visose 10 apskričių 0,96–1,21; pirmojo vaiko gimdymo amžius 28,7 m., ES – 29,9 m.'},
    population:{label:'Struktūra',title:'Gyventojų struktūra',desc:'2025 m. 25–44 m. grupėje 884 moterys 1 000 vyrų; 55,7 % (p) privačių namų ūkių sudarė vienas suaugęs be išlaikomų vaikų.'},
    migration:{label:'Migracija',title:'Migracija',desc:'2025* neto migracija +16 165, palyginti su +23 140 2024 m.; atskirai analizuojami pilietybės ir lyčių srautų kontrastai.'},
    family:{label:'Šeimos aplinka',title:'Šeimai palanki aplinka',desc:'Vaikų priežiūros pasiekiamumas ne visada sutampa su laisvų vietų skaičiumi; išmokų istorija ir partnerystės hipotezės vertinamos atskirai.'},
    housing:{label:'Būstas',title:'Pirmojo būsto įperkamumas ir parama',desc:'2024–2025 m. padidėjo šešių miestų parduotų butų €/m² vidurkiai; regioninės paskatos gavėjų 2022 m. buvo 1 595, 2025 m. – 515. Jaunų šeimų įperkamumas dar neišmatuotas.'},
    future:{label:'Ateitis',title:'Projekcijos ir scenarijai',desc:'EK baziniame scenarijuje 2022–2040 m. užimtųjų skaičius mažėja 18,6 %; autoriaus prisitaikymo hipotezės – atskirai.'},
    methods:{label:'Metodika',title:'Metodika ir šaltiniai',desc:'Rodiklių statusai, vardikliai ir šaltiniai pagal temas; aprašomieji kontrastai nereiškia įrodytų priežasčių.'},
    all:{label:'Visas tyrimas',title:'Visas tyrimas',desc:'Visos sekcijos viename ilgame puslapyje.'}
  };
  const SECTION_VIEWS={
    apzvalga:'overview',researchHome:'overview',tfr:'fertility',regionai:'fertility',amzius:'fertility',
    'lytis-amzius':'population',gyventojai:'migration','migration-sex-section':'migration',uzsienieciai:'migration',
    santuokos:'family','parama-istorija':'family',infrastruktura:'family',skaitmena:'family','family-hypotheses-section':'family',housingAffordability:'housing',
    scenarijai:'future',isvados:'all',metodika:'methods',saltiniai:'methods'
  };
  const HASH_VIEW={
    '#apzvalga':'overview','#tfr':'fertility','#regionai':'fertility','#amzius':'fertility','#lytis-amzius':'population',
    '#gyventojai':'migration','#uzsienieciai':'migration','#santuokos':'family','#parama-istorija':'family',
    '#infrastruktura':'family','#skaitmena':'family','#familyFormationHypotheses':'family','#housing-affordability':'housing','#housingAffordability':'housing','#scenarijai':'future',
    '#metodika':'methods','#saltiniai':'methods','#isvados':'all'
  };
  const qs=new URLSearchParams(location.search);
  let view=qs.get('view');
  if(!VALID_VIEWS.includes(view)) view=HASH_VIEW[location.hash]||'overview';

  const css=document.createElement('link');
  css.rel='stylesheet'; css.href='research-nav.css?v=20261010routefix';
  document.head.appendChild(css);
  document.body.classList.add('research-routed');
  const makeUrl=v=>`${location.pathname}?view=${encodeURIComponent(v)}`;

  function updateHeader(){
    const right=document.querySelector('.masthead-right');
    if(right) right.innerHTML='Atnaujinta 2026-10-19<br>2025* – išankstiniai, kai pažymėta';
    const sub=document.querySelector('.masthead-sub');
    if(sub) sub.innerHTML='<span>Gimstamumas</span><span>Gyventojų struktūra</span><span>Migracija</span><span>Šeimos aplinka</span><span>Būstas</span><span>Ateitis</span>';
    document.querySelectorAll('footer').forEach(f=>{f.innerHTML=f.innerHTML.replace(/Atnaujinta\s+2026-10-02/g,'Atnaujinta 2026-10-19');});
  }

  function buildNav(){
    const nav=document.querySelector('nav');
    if(!nav) return;
    nav.classList.add('research-primary');
    nav.innerHTML='';
    ['overview','fertility','population','migration','family','housing','future','methods','all'].forEach(v=>{
      const a=document.createElement('a'); a.href=makeUrl(v); a.textContent=VIEW_META[v].label;
      if(v===view) a.classList.add('active');
      nav.appendChild(a);
    });
  }

  function ensureHome(){
    if(document.getElementById('researchHome')) return;
    const overview=document.getElementById('apzvalga');
    if(!overview) return;
    const section=document.createElement('section');
    section.id='researchHome'; section.className='research-home';
    section.innerHTML=`<div class="container">
      <div class="section-label">Tyrimo žemėlapis <span class="badge badge-official">REDAKCIJA 2026-10-19</span></div>
      <h2>Žemas gimstamumas apima visą Lietuvą. 2025 m. migracija natūralaus mažėjimo nekompensavo.</h2>
      <p class="lead">Svarbiausi jau nustatyti šalies demografiniai kontrastai: gimstamumas visose apskrityse, gyventojų balansas, lyčių santykis pagal amžių ir neįprasta namų ūkių sandara. Paskutinė išvada – aiškiai pažymėta <strong>Europos Komisijos bazinė projekcija</strong>, o ne įvykęs pokytis.</p>
      <h3 id="overviewThreeFindings">Penkios svarbiausios tyrimo išvados</h3>
      <div class="research-summary">
        <div class="card"><div class="eyebrow">01 · 2024 m. · stebėtas rodiklis</div><strong>Žemas gimstamumas apima visas apskritis</strong><p>Lietuvos TFR buvo <strong>1,11</strong> – trečias mažiausias ES. Nė vienoje iš dešimties apskričių rodiklis neviršijo <strong>1,21</strong> (intervalas 0,96–1,21). <a href="${makeUrl('fertility')}">Gimstamumo tyrimas →</a></p></div>
        <div class="card"><div class="eyebrow">02 · 2025* · išankstiniai VDA</div><strong>Migracija nebekompensavo natūralaus mažėjimo</strong><p>Natūrali kaita <strong>−19 946</strong>, neto migracija <strong>+16 165</strong>; jų balansas <strong>−3 781</strong>. Nuo 2024 m. bendras balansas pablogėjo 8 554 žmonėmis – daugiausia dėl sumažėjusio migracijos prieaugio. <a href="${makeUrl('migration')}">Migracijos tyrimas →</a></p></div>
        <div class="card"><div class="eyebrow">03 · 2025 m. · gyventojų struktūra</div><strong>Lyčių santykis jaunesniame amžiuje priešingas bendram</strong><p>Visoje populiacijoje apie <strong>1 104 moterys / 1 000 vyrų</strong>, tačiau 25–44 m. grupėje – tik <strong>884</strong>. Tai gyventojų santykis, ne individualių partnerystės galimybių rodiklis. <a href="${makeUrl('population')}">Gyventojų struktūra →</a></p></div>
        <div class="card"><div class="eyebrow">04 · 2025 m. (p) · Eurostat apklausos įvertis</div><strong>Lietuvos namų ūkių sandara išsiskiria ES</strong><p><strong>55,7 %</strong> Lietuvos privačių namų ūkių sudarė vienas suaugęs be išlaikomų vaikų; ES – <strong>35,7 %</strong>. Tai namų ūkių, <strong>ne vienišų gyventojų</strong> dalis. <a href="${makeUrl('population')}#populationHouseholdStructure">Rodiklio apibrėžimas →</a></p></div>
        <div class="card"><div class="eyebrow">05 · EK bazinis scenarijus · ne stebėtas faktas</div><strong>Senėjimas didina prisitaikymo poreikį</strong><p>Europos Komisijos baziniame scenarijuje 2022–2040 m. užimtųjų skaičius mažėja <strong>18,6 %</strong>, o 65+/20–64 m. gyventojų santykis didėja <strong>33,1 → 50,3 %</strong>. Tai sąlyginė projekcija. <a href="${makeUrl('future')}">Ateities scenarijai →</a></p></div>
      </div>
      <h3>Ką rodo šeimos paslaugų ir būsto tyrimai?</h3>
      <p>Vaikų priežiūros vietų pasiekiamumo neatitikimai gali išlikti net esant laisvų vietų mieste (<a href="${makeUrl('family')}">Šeimos aplinka</a>). Regioninės pirmojo būsto paskatos gavėjų buvo <strong>1 595 (2022 m.)</strong> ir <strong>515 (2025 m.)</strong>; tai ne paramos poreikio ar aprėpties procentas (<a href="${makeUrl('housing')}">Būstas</a>). Palyginamų jaunų šeimų pajamų ir būsto kainų jungtis dar neišmatuota.</p>
      <p class="small"><strong>Duomenų statusai:</strong> 2025* – išankstiniai VDA rodikliai; (p) – preliminarus Eurostat apklausos įvertis; EK bazinis scenarijus – projekcija. <a href="${makeUrl('methods')}">Visos ribos ir šaltiniai →</a></p>
      <div class="topic-grid">
        <a class="topic-card" href="${makeUrl('fertility')}"><div class="eyebrow">01 · Gimstamumas</div><h3>Žemas TFR visose apskrityse</h3><p>2024 m. TFR 1,11, apskrityse 0,96–1,21; pirmojo vaiko amžius mažesnis nei ES vidurkis.</p><span class="topic-link">Atverti temą →</span></a>
        <a class="topic-card" href="${makeUrl('population')}"><div class="eyebrow">02 · Gyventojų struktūra</div><h3>Jaunesniame amžiuje lyčių santykis kitoks</h3><p>25–44 m. – 884 moterys 1 000 vyrų; 55,7 % privačių namų ūkių sudaro vienas suaugęs be išlaikomų vaikų (p).</p><span class="topic-link">Atverti temą →</span></a>
        <a class="topic-card" href="${makeUrl('migration')}"><div class="eyebrow">03 · Migracija</div><h3>2025 m. migracijos prieaugis susitraukė</h3><p>Neto migracija +16 165, palyginti su +23 140 2024 m.; skiriami piliečių ir lyčių srautai.</p><span class="topic-link">Atverti temą →</span></a>
        <a class="topic-card" href="${makeUrl('family')}"><div class="eyebrow">04 · Šeimos aplinka</div><h3>Vaikų priežiūros vietos ne visada ten, kur reikia</h3><p>Paslaugų pasiekiamumas, istorinės išmokos ir atskirai pažymėtos partnerystės hipotezės.</p><span class="topic-link">Atverti temą →</span></a>
        <a class="topic-card" href="${makeUrl('housing')}"><div class="eyebrow">05 · Būstas · NAUJA ANALIZĖ</div><h3>Rinkos kainos ir paramos mastas – bet ne įperkamumo reitingas</h3><p>2024–2025 m. visuose šešiuose miestuose pardavimo €/m² vidurkiai padidėjo; regioninės paskatos gavėjų sumažėjo nuo 1 595 (2022) iki 515 (2025). Jaunų šeimų įperkamumas neišmatuotas.</p><span class="topic-link">Atverti Būsto analizę →</span></a>
        <a class="topic-card" href="${makeUrl('future')}"><div class="eyebrow">06 · Ateitis</div><h3>EK projektuoja −18,6 % užimtųjų iki 2040 m.</h3><p>Bazinio scenarijaus sąlyginė projekcija ir skirtingos prisitaikymo prielaidos.</p><span class="topic-link">Atverti temą →</span></a>
        <a class="topic-card" href="${makeUrl('methods')}"><div class="eyebrow">07 · Metodika</div><h3>Rodiklių apibrėžimai ir šaltiniai</h3><p>Statusai, vardikliai ir šaltiniai pagal modulį; faktai atskiriami nuo projekcijų ir hipotezių.</p><span class="topic-link">Atverti metodiką →</span></a>
      </div>
    </div>`;
    overview.insertAdjacentElement('beforebegin',section);
  }

  function normalizeDynamicBlocks(){
    const migrationBlock=document.getElementById('migrationSexBlock');
    if(migrationBlock && !document.getElementById('migration-sex-section')){
      const section=document.createElement('section'); section.id='migration-sex-section';
      const container=document.createElement('div'); container.className='container'; section.appendChild(container); container.appendChild(migrationBlock);
      const gyventojai=document.getElementById('gyventojai');
      if(gyventojai) gyventojai.insertAdjacentElement('afterend',section); else document.body.appendChild(section);
    }
    const familyBlock=document.getElementById('familyFormationHypotheses');
    if(familyBlock && !document.getElementById('family-hypotheses-section')){
      const section=document.createElement('section'); section.id='family-hypotheses-section';
      const container=document.createElement('div'); container.className='container'; section.appendChild(container); container.appendChild(familyBlock);
      const infra=document.getElementById('infrastruktura'); const synthesis=document.getElementById('isvados');
      if(infra) infra.insertAdjacentElement('afterend',section); else if(synthesis) synthesis.insertAdjacentElement('beforebegin',section); else document.body.appendChild(section);
    }
  }

  function ensureTopicIntro(){
    let intro=document.getElementById('researchTopicIntro');
    if(view==='overview'||view==='all'){intro?.remove();return;}
    if(!intro){intro=document.createElement('section');intro.id='researchTopicIntro';intro.className='research-topic-intro';}
    intro.innerHTML=`<div class="container"><div class="eyebrow">Teminis tyrimo puslapis</div><h2>${VIEW_META[view].title}<span class="research-view-badge">${VIEW_META[view].label}</span></h2><p class="lead">${VIEW_META[view].desc}</p></div>`;
    const first=[...document.querySelectorAll('body > section')].find(s=>SECTION_VIEWS[s.id]===view);
    if(first&&intro.nextElementSibling!==first) first.insertAdjacentElement('beforebegin',intro);
  }

  function renumberVisible(){
    const sections=[...document.querySelectorAll('body > section')].filter(s=>!s.classList.contains('research-hidden')&&!['researchHome','researchTopicIntro'].includes(s.id));
    let i=0;
    sections.forEach(section=>{
      const label=section.querySelector(':scope > .container > .section-label'); if(!label) return;
      const n=String(i++).padStart(2,'0');
      const firstText=[...label.childNodes].find(x=>x.nodeType===Node.TEXT_NODE);
      if(firstText){const clean=firstText.textContent.replace(/^\s*\d{2}\s*·\s*/,'').trimStart();firstText.textContent=`${n} · ${clean}`;}
    });
  }

  function addNextLink(){
    document.querySelectorAll('.research-next').forEach(n=>n.remove());
    const order=['fertility','population','migration','family','housing','future','methods'];
    if(!order.includes(view)) return;
    const next=order[order.indexOf(view)+1]; if(!next) return;
    const visible=[...document.querySelectorAll('body > section')].filter(s=>!s.classList.contains('research-hidden')&&s.id!=='researchTopicIntro');
    const container=visible[visible.length-1]?.querySelector(':scope > .container'); if(!container) return;
    const div=document.createElement('div'); div.className='research-next';
    div.innerHTML=`Toliau tyrime: <a href="${makeUrl(next)}">${VIEW_META[next].label} →</a>`;
    container.appendChild(div);
  }

  function applyVisibility(){
    normalizeDynamicBlocks(); ensureHome(); ensureTopicIntro();
    [...document.querySelectorAll('body > section')].forEach(section=>{
      if(section.id==='researchTopicIntro') return;
      const show=view==='all'||SECTION_VIEWS[section.id]===view;
      section.classList.toggle('research-hidden',!show);
      section.classList.toggle('research-visible',show);
    });
    const intro=document.getElementById('researchTopicIntro');
    if(intro){
      const showIntro=view!=='overview'&&view!=='all';
      intro.classList.toggle('research-hidden',!showIntro);
      intro.classList.toggle('research-visible',showIntro);
    }
    renumberVisible(); addNextLink();
    document.title=`Lietuva · Demografinė situacija · ${VIEW_META[view].title}`;
  }

  updateHeader(); buildNav(); ensureHome(); applyVisibility();

  let timer=null;
  const watched='#lytis-amzius,#migrationSexBlock,#parama-istorija,#infrastruktura,#scenarijai,#familyFormationHypotheses,#housingAffordability';
  const observer=new MutationObserver(mutations=>{
    const relevant=mutations.some(m=>[...m.addedNodes].some(node=>node.nodeType===1&&(node.matches?.(watched)||node.querySelector?.(watched))));
    if(!relevant) return;
    clearTimeout(timer); timer=setTimeout(applyVisibility,60);
  });
  observer.observe(document.body,{childList:true,subtree:true});
  [200,600,1200,2500].forEach(ms=>setTimeout(applyVisibility,ms));

  if(location.hash) setTimeout(()=>document.querySelector(location.hash)?.scrollIntoView({block:'start'}),900);
})();
