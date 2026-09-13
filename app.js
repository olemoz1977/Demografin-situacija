(() => {
  const load=(src,cb)=>{const s=document.createElement('script');s.src=src;s.onload=cb||null;document.body.appendChild(s);};
  load('app-base.js?v=20260913i',()=>load('overview-nowcast.js?v=20260913i',()=>load('sex-history.js?v=20260913i',()=>load('policy-history.js?v=20260913i',()=>load('policy-fre.js?v=20260913i',()=>load('infrastructure.js?v=20260913i',()=>load('future.js?v=20260913i',()=>load('family-hypothesis.js?v=20260913i',()=>load('future-fix.js?v=20260913i')))))))));
})();
