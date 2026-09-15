(() => {
  const VALID_VIEWS=['overview','fertility','population','migration','family','future','methods','all'];
  const VIEW_META={
    overview:{label:'Apžvalga',title:'60 sekundžių apžvalga',desc:'Svarbiausi naujausi skaičiai ir žemėlapis į visą tyrimą.'},
    fertility:{label:'Gimstamumas',title:'Gimstamumas',desc:'TFR, regioniniai skirtumai ir pirmojo vaiko gimdymo amžius.'},
    population:{label:'Struktūra',title:'Gyventojų struktūra',desc:'Lytis, amžius, reprodukcinio amžiaus santykis ir gimimo kohortų palyginimas.'},
    migration:{label:'Migracija',title:'Migracija',desc:'Bendri srautai, 25–44 m. pjūvis pagal lytį, Lietuvos piliečių grįžimas ir užsienio piliečiai.'},
    family:{label:'Šeimos aplinka',title:'Šeimai palanki aplinka',desc:'Santuokos, šeimos politika, išmokų dosnumas, vaikų infrastruktūra ir socialinės hipotezės.'},
    future:{label:'Ateitis',title:'Projekcijos ir scenarijai',desc:'Oficialios EK projekcijos, produktyvumo poreikis, automatizacija ir socialinės sistemos finansavimo hipotezė.'},
    methods:{label:'Metodika',title:'Metodika ir šaltiniai',desc:'Kas yra faktas, kas išankstinis rodiklis, kas projekcija ir kur prasideda hipotezė.'},
    all:{label:'Visas tyrimas',title:'Visas tyrimas',desc:'Visos sekcijos viename ilgame puslapyje.'}
  };
  const SECTION_VIEWS={
    apzvalga:'overview',
    researchHome:'overview',
    tfr:'fertility',
    regionai:'fertility',
    amzius:'fertility',
    'lytis-amzius':'population',
    gyventojai:'migration',
    'migration-sex-section':'migration',
    uzsienieciai:'migration',
    santuokos:'family',
    'parama-istorija':'family',
    infrastruktura:'family',
    skaitmena:'family',
    'family-hypotheses-section':'family',
    scenarijai:'future',
    isvados:'all',
    metodika:'methods',
    saltiniai:'methods'
  };
  const HASH_VIEW={
    '#apzvalga':'overview','#tfr':'fertility','#regionai':'fertility','#amzius':'fertility',
    '#lytis-amzius':'population','#gyventojai':'migration','#uzsienieciai':'migration',
    '#santuokos':'family','#parama-istorija':'family','#infrastruktura':'family','#skaitmena':'family',
    '#familyFormationHypotheses':'family','#scenarijai':'future','#metodika':'methods','#saltiniai':'methods','#isvados':'all'
  };

  const qs=new URLSearchParams(location.search);
  let view=qs.get('view');
  if(!VALID_VIEWS.includes(view)) view=HASH_VIEW[location.hash]||'overview';

  const css=document.createElement('link');
  css.rel='stylesheet'; css.href='research-nav.css?v=20260915a';
  document.head.appendChild(css);
  document.body.classList.add('research-routed');

  const makeUrl=v=>`${location.pathname}?view=${encodeURIComponent(v)}`;

  function updateHeader(){
    const right=document.querySelector('.masthead-right');
    if(right) right.innerHTML='Atnaujinta 2026-09-15<br>2025* – išankstiniai, kai pažymėta';
    const sub=document.querySelector('.masthead-sub');
    if(sub) sub.innerHTML='<span>Gimstamumas</span><span>Gyventojų struktūra</span><span>Migracija</span><span>Šeimos aplinka</span><span>Ateitis</span>';
    document.querySelectorAll('footer').forEach(f=>{
      f.innerHTML=f.innerHTML.replace(/Atnaujinta\s+2026-09-13/g,'Atnaujinta 2026-09-15');
    });
  }

  function buildNav(){
    const nav=document.querySelector('nav');
    if(!nav) return;
    nav.classList.add('research-primary');
    nav.innerHTML='';
    ['overview','fertility','population','migration','family','future','methods','all'].forEach(v=>{
      const a=document.createElement('a');
      a.href=makeUrl(v);
      a.textContent=VIEW_META[v].label;
      if(v===view) a.classList.add('active');
      nav.appendChild(a);
    });
  }

  function ensureHome(){
    if(document.getElementById('researchHome')) return;
    const overview=document.getElementById('apzvalga');
    if(!overview) return;
    const section=document.createElement('section');
    section.id='researchHome';
    section.className='research-home';
    section.innerHTML=`<div class="container">
      <div class="section-label">Tyrimo žemėlapis <span class="badge badge-official">ATNAUJINTA 2026-09-15</span></div>
      <h2>Ne vienas skaičius. Penkios susijusios tyrimo kryptys.</h2>
      <p class="lead">Pagrindinis puslapis dabar rodo trumpą vaizdą. Toliau galima eiti tiesiai į dominančią temą – nebereikia slinkti per visą tyrimą iki projekcijų ir hipotezių.</p>
      <div class="research-summary">
        <div class="card"><div class="eyebrow">Dabar</div><strong>17 478 gimimai</strong><p>2025* natūrali kaita –19 946, neto migracija +16 165. 2025P TFR nowcast – 1,03; 2024 galutinis TFR – 1,11.</p></div>
        <div class="card"><div class="eyebrow">Naujas struktūros signalas</div><strong>884 moterys / 1 000 vyrų</strong><p>2025 m. 25–44 m. grupėje. Gimimų santykis vienas to nepaaiškina; migracijos pjūvis rodo stiprų papildomą mechanizmą.</p></div>
        <div class="card"><div class="eyebrow">Ateities klausimas</div><strong>1,424 → 1,034 mln.</strong><p>EK bazinėje projekcijoje tiek mažėja užimtųjų skaičius 2022→2050. Klausimas – ar produktyvumas ir finansavimo bazė prisitaikys.</p></div>
      </div>
      <div class="alert alert-blue"><strong>Kaip skaityti tyrimą.</strong> Faktus, išankstinius rodiklius, oficialias projekcijas ir autoriaus hipotezes laikome atskirai. Viena kreivė savaime nėra priežasties įrodymas.</div>
      <div class="topic-grid">
        <a class="topic-card" href="${makeUrl('fertility')}"><div class="eyebrow">01 · Gimstamumas</div><h3>Kiek problema didelė?</h3><p>TFR Lietuvoje ir ES, regioniniai skirtumai, pirmojo vaiko amžius.</p><span class="topic-link">Atverti temą →</span></a>
        <a class="topic-card" href="${makeUrl('population')}"><div class="eyebrow">02 · Gyventojų struktūra</div><h3>Kas yra reprodukcinio amžiaus grupėje?</h3><p>Amžiaus ir lyties struktūra, 25–44 / 15–49 santykiai, gimimo kohortos.</p><span class="topic-link">Atverti temą →</span></a>
        <a class="topic-card" href="${makeUrl('migration')}"><div class="eyebrow">03 · Migracija</div><h3>Kas pakeitė gyventojų struktūrą?</h3><p>Bendri srautai, migracija pagal lytį, Lietuvos piliečių grįžimas ir užsienio piliečiai.</p><span class="topic-link">Atverti temą →</span></a>
        <a class="topic-card" href="${makeUrl('family')}"><div class="eyebrow">04 · Šeimos aplinka</div><h3>Ką valstybė ir aplinka gali keisti?</h3><p>Išmokų istorija ir FRE, infrastruktūra, santuokos, skaitmeninis kontekstas ir partnerystės hipotezės.</p><span class="topic-link">Atverti temą →</span></a>
        <a class="topic-card" href="${makeUrl('future')}"><div class="eyebrow">05 · Ateitis</div><h3>Kas nutiks, jei darbuotojų mažės?</h3><p>EK projekcijos, automatizacija, produktyvumas ir socialinės sistemos finansavimo scenarijai.</p><span class="topic-link">Atverti temą →</span></a>
        <a class="topic-card" href="${makeUrl('methods')}"><div class="eyebrow">06 · Metodika</div><h3>Kur baigiasi faktai ir prasideda hipotezės?</h3><p>Duomenų statusai, metodinės ribos ir visi pirminiai šaltiniai.</p><span class="topic-link">Atverti metodiką →</span></a>
      </div>
    </div>`;
    overview.insertAdjacentElement('afterend',section);
  }

  function normalizeDynamicBlocks(){
    const migrationBlock=document.getElementById('migrationSexBlock');
    if(migrationBlock && !document.getElementById('migration-sex-section')){
      const section=document.createElement('section');
      section.id='migration-sex-section';
      const container=document.createElement('div');
      container.className='container';
      section.appendChild(container);
      container.appendChild(migrationBlock);
      const gyventojai=document.getElementById('gyventojai');
      if(gyventojai) gyventojai.insertAdjacentElement('afterend',section);
      else document.body.appendChild(section);
    }

    const familyBlock=document.getElementById('familyFormationHypotheses');
    if(familyBlock && !document.getElementById('family-hypotheses-section')){
      const section=document.createElement('section');
      section.id='family-hypotheses-section';
      const container=document.createElement('div');
      container.className='container';
      section.appendChild(container);
      container.appendChild(familyBlock);
      const infra=document.getElementById('infrastruktura');
      const synthesis=document.getElementById('isvados');
      if(infra) infra.insertAdjacentElement('afterend',section);
      else if(synthesis) synthesis.insertAdjacentElement('beforebegin',section);
      else document.body.appendChild(section);
    }
  }

  function ensureTopicIntro(){
    let intro=document.getElementById('researchTopicIntro');
    if(view==='overview' || view==='all'){
      intro?.remove();
      return;
    }
    if(!intro){
      intro=document.createElement('section');
      intro.id='researchTopicIntro';
      intro.className='research-topic-intro';
    }
    intro.innerHTML=`<div class="container"><div class="eyebrow">Teminis tyrimo puslapis</div><h2>${VIEW_META[view].title}<span class="research-view-badge">${VIEW_META[view].label}</span></h2><p class="lead">${VIEW_META[view].desc}</p></div>`;
    const first=[...document.querySelectorAll('body > section')].find(s=>SECTION_VIEWS[s.id]===view);
    if(first && intro.nextElementSibling!==first) first.insertAdjacentElement('beforebegin',intro);
  }

  function renumberVisible(){
    const sections=[...document.querySelectorAll('body > section')].filter(s=>!s.classList.contains('research-hidden') && !['researchHome','researchTopicIntro'].includes(s.id));
    let i=0;
    sections.forEach(section=>{
      const label=section.querySelector(':scope > .container > .section-label');
      if(!label) return;
      const n=String(i++).padStart(2,'0');
      const firstText=[...label.childNodes].find(n=>n.nodeType===Node.TEXT_NODE);
      if(firstText){
        const clean=firstText.textContent.replace(/^\s*\d{2}\s*·\s*/,'').trimStart();
        firstText.textContent=`${n} · ${clean}`;
      }
    });
  }

  function addNextLink(){
    document.querySelectorAll('.research-next').forEach(n=>n.remove());
    const order=['fertility','population','migration','family','future','methods'];
    if(!order.includes(view)) return;
    const idx=order.indexOf(view);
    const next=order[idx+1];
    if(!next) return;
    const visible=[...document.querySelectorAll('body > section')].filter(s=>!s.classList.contains('research-hidden') && s.id!=='researchTopicIntro');
    const last=visible[visible.length-1];
    const container=last?.querySelector(':scope > .container');
    if(!container) return;
    const div=document.createElement('div');
    div.className='research-next';
    div.innerHTML=`Toliau tyrime: <a href="${makeUrl(next)}">${VIEW_META[next].label} →</a>`;
    container.appendChild(div);
  }

  function applyVisibility(){
    normalizeDynamicBlocks();
    ensureHome();
    ensureTopicIntro();
    const sections=[...document.querySelectorAll('body > section')];
    sections.forEach(section=>{
      if(section.id==='researchTopicIntro') return;
      let show=true;
      if(view!=='all'){
        const owner=SECTION_VIEWS[section.id];
        show=owner===view;
      }
      section.classList.toggle('research-hidden',!show);
    });
    const intro=document.getElementById('researchTopicIntro');
    if(intro) intro.classList.toggle('research-hidden',view==='overview'||view==='all');
    renumberVisible();
    addNextLink();
    document.title=`Lietuva · Demografinė situacija · ${VIEW_META[view].title}`;
  }

  updateHeader();
  buildNav();
  ensureHome();
  applyVisibility();

  let timer=null;
  const observer=new MutationObserver(()=>{
    clearTimeout(timer);
    timer=setTimeout(applyVisibility,60);
  });
  observer.observe(document.body,{childList:true,subtree:true});
  [200,600,1200,2500].forEach(ms=>setTimeout(applyVisibility,ms));

  if(location.hash){
    setTimeout(()=>document.querySelector(location.hash)?.scrollIntoView({block:'start'}),900);
  }
})();
