(() => {
  const load=(src,cb)=>{const s=document.createElement('script');s.src=src;s.onload=cb||null;document.body.appendChild(s);};
  load('app-base.js?v=20260915c',()=>load('overview-nowcast.js?v=20260915c',()=>load('sex-history.js?v=20260915c',()=>load('migration-sex.js?v=20260915c',()=>load('policy-history.js?v=20260915c',()=>load('policy-fre.js?v=20260915c',()=>load('infrastructure.js?v=20260915c',()=>load('future.js?v=20260915c',()=>load('family-hypothesis.js?v=20260915c',()=>load('future-fix.js?v=20260915c'))))))))));
})();
