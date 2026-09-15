(() => {
  const labels={overview:'Apžvalga',fertility:'Gimstamumas',population:'Struktūra',migration:'Migracija',family:'Šeimos aplinka',future:'Ateitis',methods:'Metodika',all:'Visas tyrimas'};
  const valid=Object.keys(labels);
  const hashMap={'#apzvalga':'overview','#tfr':'fertility','#regionai':'fertility','#amzius':'fertility','#lytis-amzius':'population','#gyventojai':'migration','#uzsienieciai':'migration','#santuokos':'family','#parama-istorija':'family','#infrastruktura':'family','#skaitmena':'family','#familyFormationHypotheses':'family','#scenarijai':'future','#metodika':'methods','#saltiniai':'methods','#isvados':'all'};
  const params=new URLSearchParams(location.search);
  let view=params.get('view');
  if(!valid.includes(view)) view=hashMap[location.hash]||'overview';
  const nav=document.querySelector('nav');
  if(!nav) return;
  nav.classList.add('research-primary');
  nav.innerHTML='';
  valid.forEach(v=>{
    const a=document.createElement('a');
    a.href=`${location.pathname}?view=${encodeURIComponent(v)}`;
    a.textContent=labels[v];
    if(v===view) a.classList.add('active');
    nav.appendChild(a);
  });
})();
