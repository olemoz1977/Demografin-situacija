(() => {
  const load=(src,cb)=>{const s=document.createElement('script');s.src=src;s.onload=cb||null;document.body.appendChild(s);};
  load('app-base.js?v=20260913e',()=>load('sex-history.js?v=20260913e',()=>load('future.js?v=20260913e',()=>load('family-hypothesis.js?v=20260913e',()=>load('future-fix.js?v=20260913e')))));
})();
