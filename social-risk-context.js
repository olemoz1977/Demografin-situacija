// 2026-10-18 publication: Eurostat AROPE context and a distinct, unproven fertility hypothesis.
// New blocks are additive. Prior sections and their findings remain untouched.
(() => {
  const addBlock=(selector,id,markup)=>{
    const parent=document.querySelector(selector);
    if(!parent||document.getElementById(id)) return;
    const block=document.createElement('div');
    block.id=id;
    block.style.marginTop='2rem';
    block.innerHTML=markup;
    parent.appendChild(block);
  };

  addBlock('#lytis-amzius > .container','populationArope2025',`
    <div class="section-label">2025 · ES socialinės rizikos kontekstas <span class="badge badge-prelim">LIETUVA (p) PRELIMINARU</span></div>
    <h3>2025 m. socialinės atskirties rizika Lietuvoje: virš ES vidurkio</h3>
    <p class="lead">„Eurostat“ AROPE rodiklis apima <strong>skurdo ARBA socialinės atskirties riziką</strong>. Tai nėra vien mažų pajamų ar subjektyvaus vienišumo matas.</p>
    <div class="kpi-row">
      <div class="kpi"><div class="kpi-num red">26,3 %</div><div class="kpi-label">Lietuva · 2025 (p)</div><div class="kpi-note">Eurostat 2026 m. leidinio preliminarus įvertis</div></div>
      <div class="kpi"><div class="kpi-num">20,9 %</div><div class="kpi-label">ES · 2025</div><div class="kpi-note">92,7 mln. ES gyventojų</div></div>
      <div class="kpi"><div class="kpi-num red">+5,4 p. p.</div><div class="kpi-label">Lietuvos ir ES skirtumas</div><div class="kpi-note">Procentiniai punktai, ne procentinis augimas</div></div>
    </div>
    <div class="alert alert-amber" style="margin-top:1rem"><strong>Ką matuoja AROPE.</strong> Bent vieną iš trijų rizikų: pajamų skurdą, didelį materialinį ir socialinį nepriteklių arba gyvenimą labai mažo darbo intensyvumo namų ūkyje. Šių rodiklių negalima sutapatinti su namų ūkių sudėtimi ar gimstamumo priežastimis. <strong>Lietuvos NUTS 2 regioninių reikšmių čia neskelbiame</strong>, kol jos nėra tiesiogiai patikrintos.</div>
    <div class="source-line">Šaltiniai: <a href="https://ec.europa.eu/eurostat/documents/15216629/23964567/KS-01-26-035-EN-N.pdf" target="_blank" rel="noopener">Eurostat · Key figures on Europe 2026 (LT 26,3 %)</a> · <a href="https://ec.europa.eu/eurostat/web/products-eurostat-news/w/edn-20261016-1" target="_blank" rel="noopener">Eurostat · AROPE 2025 (ES 20,9 %)</a> · <a href="https://ec.europa.eu/eurostat/databrowser/view/ilc_peps01n/default/table" target="_blank" rel="noopener">Duomenų rinkinys ilc_peps01n</a>.</div>
  `);

  addBlock('#tfr > .container','fertilityDevelopmentParadox2026',`
    <div class="section-label">Tyrimo klausimas · skirtingi analizės lygmenys</div>
    <h3>Gimstamumo ir ekonominio išsivystymo paradoksas: kodėl ryšys nėra vienodas?</h3>
    <div class="two-col">
      <div class="card"><h3>Tarp skirtingo išsivystymo šalių</h3><p>Demografinio perėjimo metu didėjant išsivystymo lygiui gimstamumas dažnai mažėja. Tačiau vien šalies pajamos nepaaiškina gimstamumo: kartu keičiasi išsilavinimas, vaikų mirtingumas, urbanizacija ir šeimos aplinka.</p></div>
      <div class="card"><h3>Tarp ekonomiškai išsivysčiusių šalių</h3><p>OECD tyrimai sieja šeimos ir darbo suderinimą, būsto kainas, užimtumą bei finansinį saugumą su gimstamumo skirtumais. OECD vidutinis TFR 1960–2022 m. sumažėjo nuo 3,3 iki 1,5; tai <strong>ne</strong> Lietuvos šių veiksnių poveikio įrodymas.</p></div>
    </div>
    <div class="alert alert-blue" style="margin-top:1rem"><strong>Autoriaus tikrinama hipotezė.</strong> Lietuvoje socialinis ir būsto nesaugumas gali prisidėti prie atidėtų arba neįgyvendintų šeimos planų, nors tarptautiniu mastu turtingesnės visuomenės paprastai turi mažesnį TFR. <strong>Šio priežastinio ryšio Lietuvos duomenimis nepatvirtinome.</strong> Eurostat AROPE ir TFR yra skirtingi rodikliai; šalių vidurkiai nepasako, kodėl atskira šeima susilaukia arba nesusilaukia vaikų.</div>
    <div class="source-line">Šaltiniai: <a href="https://www.oecd.org/en/publications/society-at-a-glance-2024_918d8db3-en/full-report/fertility-trends-across-the-oecd-underlying-drivers-and-the-role-for-policy_770679b8.html" target="_blank" rel="noopener">OECD · Society at a Glance 2024</a> · <a href="https://population.un.org/wpp/" target="_blank" rel="noopener">JT · World Population Prospects</a>. <a href="?view=population#populationArope2025">Lietuvos socialinės rizikos duomenys →</a></div>
  `);

  addBlock('#metodika > .container','aropeMethodology2026',`
    <div class="alert alert-amber"><strong>AROPE ir gimstamumo palyginimo riba.</strong> 2025 m. Lietuvos AROPE reikšmė „Eurostat“ 2026 m. leidinyje pažymėta (p) – preliminaru. ES agregatas ir Lietuvos reikšmė yra asmenų, patiriančių bent vieną socialinės rizikos sąlygą, dalys; jos <strong>nėra</strong> namų ūkių, vienišų žmonių ar šeimų, neturinčių vaikų, dalys. AROPE ir TFR sąsaja Lietuvoje netirta kaip priežastinis poveikis.</div>
  `);
})();
