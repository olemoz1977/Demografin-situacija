(() => {
  const section=document.getElementById('apzvalga');
  if(!section) return;
  // Stebėtas 2024 m. TFR lieka pagrindinis KPI (1,11).
  // 2025P TFR = 1,03 yra Eurostat EUROPOP2025 bazinio scenarijaus
  // prielaida, o ne stebėtas ar preliminarus VDA rodiklis.
  const firstKpi=section.querySelector('.kpi-row .kpi');
  const note=firstKpi?.querySelector('.kpi-note');
  if(note) note.textContent='Eurostat / VDA · 2024 m. stebėtas';

  const lead=section.querySelector('.lead');
  if(lead){
    lead.innerHTML='2024 m. stebėtas Lietuvos TFR – <strong>1,11</strong>. 2025P TFR = 1,03 yra atskira Eurostat EUROPOP2025 bazinio scenarijaus reikšmė, <strong>ne stebėtas 2025 m. TFR</strong>.';
  }

  const source=section.querySelector('.source-line');
  if(source && !source.querySelector('a[href*="proj_25naasfr"]')){
    source.insertAdjacentHTML('beforeend',' · <a href="https://ec.europa.eu/eurostat/databrowser/view/proj_25naasfr/default/table?lang=en" target="_blank" rel="noopener">Eurostat · EUROPOP2025 fertility assumptions</a>');
  }
})();
