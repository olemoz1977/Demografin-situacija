(() => {
  const showLoadError=()=>{
    if(document.getElementById('researchLoadError'))return;
    const notice=document.createElement('div');notice.id='researchLoadError';notice.className='alert alert-amber';notice.setAttribute('role','alert');
    notice.textContent='Dalis tyrimo turinio neįsikėlė. ';
    const retry=document.createElement('button');retry.type='button';retry.textContent='Atnaujinti puslapį';retry.onclick=()=>location.reload();notice.appendChild(retry);
    document.querySelector('nav')?.insertAdjacentElement('afterend',notice);
  };
  window.reportResearchLoadIssue=showLoadError;
  const load=(src,cb)=>{const s=document.createElement('script');s.src=src;s.onload=cb||null;s.onerror=showLoadError;document.body.appendChild(s);};
  load('research-nav.js?v=20261125fullreview1',()=>load('app-base.js?v=20261125fullreview1',()=>load('overview-nowcast.js?v=20261019editorial1',()=>load('sex-history.js?v=20261125fullreview1',()=>load('migration-sex.js?v=20261125fullreview1',()=>load('policy-history.js?v=20261125fullreview1',()=>load('policy-fre.js?v=20261019editorial1',()=>load('infrastructure.js?v=20261125fullreview1',()=>load('future.js?v=20261125fullreview1',()=>load('family-hypothesis.js?v=20261125fullreview1',()=>load('future-fix.js?v=20260915e',()=>load('housing-affordability.js?v=20261125fullreview1',()=>load('nav-finalize.js?v=20261125fullreview1',()=>load('editorial-copy.js?v=20261125fullreview1',()=>load('social-risk-context.js?v=20261018publish1',()=>load('reader-tools.js?v=20261125fullreview1'))))))))))))))));
})();
