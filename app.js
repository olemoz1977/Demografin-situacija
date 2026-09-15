(() => {
  const load=(src,cb)=>{const s=document.createElement('script');s.src=src;s.onload=cb||null;document.body.appendChild(s);};
  load('app-base.js?v=20260915a',()=>load('overview-nowcast.js?v=20260915a',()=>load('sex-history.js?v=20260915a',()=>load('policy-history.js?v=20260915a',()=>load('policy-fre.js?v=20260915a',()=>load('infrastructure.js?v=20260915a',()=>load('future.js?v=20260915a',()=>load('family-hypothesis.js?v=20260915a',()=>load('future-fix.js?v=20260915a')))))))));
})();
