(() => {
  const section=document.getElementById('apzvalga');
  if(!section) return;
  const firstKpi=section.querySelector('.kpi-row .kpi');
  if(firstKpi){
    const num=firstKpi.querySelector('.kpi-num');
    const label=firstKpi.querySelector('.kpi-label');
    const note=firstKpi.querySelector('.kpi-note');
    if(num) num.textContent='1,03';
    if(label) label.textContent='Suminis gimstamumo rodiklis · 2025P';
    if(note) note.innerHTML='Eurostat EUROPOP2025 · bazinis nowcast<br>2024 galutinis: 1,11';
  }

  const lead=section.querySelector('.lead');
  if(lead){
    lead.innerHTML='<strong>2025P TFR = 1,03</strong> – Eurostat EUROPOP2025 bazinio scenarijaus 2025 m. nowcast / projekcinė prielaida, apskaičiuota iš amžiui specifinių vaisingumo rodiklių. Tai nėra galutinis stebėtas 2025 m. TFR. 2024 m. galutinis rodiklis lieka 1,11.';
  }

  const alert=section.querySelector('.alert-amber');
  if(alert && !alert.dataset.tfrNowcast){
    alert.dataset.tfrNowcast='1';
    alert.insertAdjacentHTML('beforeend','<br><br><strong>2025P – Eurostat EUROPOP2025 nowcast.</strong> Tai atskiras statusas nuo 2025* VDA išankstinių faktinių rodiklių. Eurostat 2025 m. TFR bazinio scenarijaus reikšmė – 1,0293, puslapyje rodoma suapvalinta iki 1,03.');
  }

  const source=section.querySelector('.source-line');
  if(source && !source.querySelector('a[href*="proj_25naasfr"]')){
    source.insertAdjacentHTML('beforeend',' · <a href="https://ec.europa.eu/eurostat/databrowser/view/proj_25naasfr/default/table?lang=en" target="_blank" rel="noopener">Eurostat · EUROPOP2025 fertility assumptions</a>');
  }
})();
