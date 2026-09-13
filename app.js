(() => {
  const load=(src,cb)=>{const s=document.createElement('script');s.src=src;s.onload=cb||null;document.body.appendChild(s);};
  load('app-base.js?v=20260913h',()=>load('overview-nowcast.js?v=20260913h',()=>load('sex-history.js?v=20260913h',()=>load('policy-history.js?v=20260913h',()=>load('policy-fre.js?v=20260913h',()=>load('future.js?v=20260913h',()=>load('family-hypothesis.js?v=20260913h',()=>load('future-fix.js?v=20260913h'))))))));
})();
