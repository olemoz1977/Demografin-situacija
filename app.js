(() => {
  const load=(src,cb)=>{const s=document.createElement('script');s.src=src;s.onload=cb||null;document.body.appendChild(s);};
  load('app-base.js?v=20260915b',()=>load('overview-nowcast.js?v=20260915b',()=>load('sex-history.js?v=20260915b',()=>load('migration-sex.js?v=20260915b',()=>load('policy-history.js?v=20260915b',()=>load('policy-fre.js?v=20260915b',()=>load('infrastructure.js?v=20260915b',()=>load('future.js?v=20260915b',()=>load('family-hypothesis.js?v=20260915b',()=>load('future-fix.js?v=20260915b'))))))))));
})();
