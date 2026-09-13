(() => {
  const load=(src,cb)=>{const s=document.createElement('script');s.src=src;s.onload=cb||null;document.body.appendChild(s);};
  load('app-base.js?v=20260913g',()=>load('overview-nowcast.js?v=20260913g',()=>load('sex-history.js?v=20260913g',()=>load('policy-history.js?v=20260913g',()=>load('future.js?v=20260913g',()=>load('family-hypothesis.js?v=20260913g',()=>load('future-fix.js?v=20260913g')))))));
})();
