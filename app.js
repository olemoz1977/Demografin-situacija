(() => {
  const load=(src,cb)=>{const s=document.createElement('script');s.src=src;s.onload=cb||null;document.body.appendChild(s);};
  load('research-nav.js?v=20260915a',()=>load('app-base.js?v=20260915d',()=>load('overview-nowcast.js?v=20260915d',()=>load('sex-history.js?v=20260915d',()=>load('migration-sex.js?v=20260915d',()=>load('policy-history.js?v=20260915d',()=>load('policy-fre.js?v=20260915d',()=>load('infrastructure.js?v=20260915d',()=>load('future.js?v=20260915d',()=>load('family-hypothesis.js?v=20260915d',()=>load('future-fix.js?v=20260915d',()=>load('nav-finalize.js?v=20260915a'))))))))))));
})();
