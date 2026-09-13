(() => {
  const load=(src,cb)=>{const s=document.createElement('script');s.src=src;s.onload=cb||null;document.body.appendChild(s);};
  load('app-base.js?v=20260913d',()=>load('sex-history.js?v=20260913d',()=>load('future.js?v=20260913d',()=>load('future-fix.js?v=20260913d'))));
})();
