(() => {
  const load=(src,cb)=>{const s=document.createElement('script');s.src=src;s.onload=cb||null;document.body.appendChild(s);};
  load('app-base.js?v=20260913f',()=>load('overview-nowcast.js?v=20260913f',()=>load('sex-history.js?v=20260913f',()=>load('future.js?v=20260913f',()=>load('family-hypothesis.js?v=20260913f',()=>load('future-fix.js?v=20260913f'))))));
})();
