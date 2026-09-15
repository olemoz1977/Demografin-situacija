(() => {
  const load=(src,cb)=>{const s=document.createElement('script');s.src=src;s.onload=cb||null;document.body.appendChild(s);};
  load('research-nav.js?v=20260915a',()=>load('app-base.js?v=20260915e',()=>load('overview-nowcast.js?v=20260915e',()=>load('sex-history.js?v=20260915e',()=>load('migration-sex.js?v=20260915e',()=>load('policy-history.js?v=20260915e',()=>load('policy-fre.js?v=20260915e',()=>load('infrastructure.js?v=20260915e',()=>load('future.js?v=20260915e',()=>load('family-hypothesis.js?v=20260915e',()=>load('future-fix.js?v=20260915e',()=>load('nav-finalize.js?v=20260915a',()=>load('editorial-copy.js?v=20260915a')))))))))))));
})();
