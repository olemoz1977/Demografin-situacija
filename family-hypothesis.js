// Baigiamosios dalies papildymas: šeimos formavimosi hipotezės ir autoriaus nuomonė
(() => {
  const section=document.getElementById('scenarijai');
  if(!section || document.getElementById('familyFormationHypotheses')) return;

  const container=section.querySelector('.container');
  if(!container) return;

  const sourceLine=container.querySelector('.source-line');
  const block=document.createElement('div');
  block.id='familyFormationHypotheses';
  block.innerHTML=`
    <h3 style="margin-top:2.4rem">Šeimos formavimosi hipotezės</h3>
    <div class="alert alert-amber"><strong>Riba tarp duomenų ir interpretacijos.</strong> Žemiau pateikti mechanizmai nėra Lietuvos TFR priežastinio modelio įrodymas. Kai kurie ryšiai gerai pagrįsti tarptautiniais tyrimais, kiti – tikėtinos hipotezės, o socialinių tinklų poveikio grandinė iki gimstamumo aiškiai pažymėta kaip autoriaus nuomonė.</div>

    <div class="findings">
      <div class="finding"><div class="finding-num">A</div><div><div class="finding-title">Vėlesnis šeimos kūrimas suspaudžia laiką aukštesnio eiliškumo gimimams</div><div class="finding-body"><strong>Pagrįstas mechanizmas.</strong> OECD fiksuoja gimdymų persislinkimą į vyresnį amžių: jaunesnių nei 30 m. moterų vaisingumas mažėjo, o 30+ grupėse didėjo. Vėlesnis pirmas vaikas savaime neįrodo, kad antras ar trečias vaikas negims, tačiau palieka mažiau biologinio ir gyvenimo ciklo laiko vėlesniems gimimams.</div></div></div>
      <div class="finding"><div class="finding-num">B</div><div><div class="finding-title">Karjera nėra tas pats, kas mažesnis gimstamumas</div><div class="finding-body"><strong>Svarbi korekcija.</strong> OECD rodo, kad šiuolaikinėse ekonomikose moterų užimtumas ir TFR vidutiniškai siejasi teigiamai, kai darbą ir šeimą galima realiai suderinti. Rizika atsiranda tada, kai karjeros ir ekonominio savarankiškumo lūkesčiai auga, tačiau priežiūros ir buities našta šeimoje lieka neproporcinga.</div></div></div>
      <div class="finding"><div class="finding-num">C</div><div><div class="finding-title">Tinkamo partnerio nebuvimas yra realus vaisingumo planų barjeras</div><div class="finding-body"><strong>Tyrimų palaikymas – stiprus ketinimų lygmeniu.</strong> Europos tyrimuose tinkamo partnerio nebuvimas yra vienas dažniausiai nurodomų neįgyvendintų ketinimų susilaukti vaikų paaiškinimų. Tai nereiškia, kad partnerio paieška viena paaiškina TFR, bet stabilios partnerystės formavimosi laikas yra svarbi grandis.</div></div></div>
      <div class="finding"><div class="finding-num">D</div><div><div class="finding-title">Didelis skaitmeninis pasirinkimas gali apsunkinti partnerio pasirinkimą</div><div class="finding-body"><strong>Tyrimų palaikymas – vidutinis ir netiesioginis.</strong> Eksperimentai su pažinčių programėlėmis rodo, kad labai didelė potencialių partnerių pasiūla gali didinti „choice overload“, baimę likti vienam ir mažinti sprendimo kokybę. Tai pagrindžia vieną grandį, bet neįrodo poveikio Lietuvos gimstamumui.</div></div></div>
    </div>

    <div class="alert alert-blue" style="margin-top:1.5rem"><strong>Autoriaus nuomonė / hipotezė.</strong> Socialinių tinklų ir pažinčių platformų aplinka nuo paauglystės gali formuoti idealizuotą „tinkamo partnerio“ portretą: žmogus lyginamas ne su realia artima aplinka, o su nuolatiniu atrinktų, pagražintų ir algoritmiškai pateikiamų alternatyvų srautu. Tai gali kelti lūkesčių kartelę ir skatinti jausmą, kad „geresnis variantas“ vis dar yra už kito perbraukimo. Autoriaus nuomone, kartu gali mažėti gyvo bendravimo praktika – gebėjimas toleruoti netobulumą, skaityti neverbalinius signalus, spręsti konfliktą ir atpažinti realų suderinamumą, o ne skaitmeninį profilį. <strong>Šios visos grandinės – socialiniai tinklai → partnerio pasirinkimas → vėlesnė stabili partnerystė → vėlesnis pirmas vaikas → mažiau aukštesnio eiliškumo gimimų – Lietuvai priežastiniu tyrimu nepatvirtinome.</strong></div>

    <h3 style="margin-top:2rem">Hipotezinė grandinė, kurią verta tikrinti Lietuvoje</h3>
    <div class="three-col">
      <div class="card"><h3>1 · Lūkesčiai ir pasirinkimas</h3><p>Socialinis palyginimas, filtruoti gyvenimo vaizdai ir beveik neribotos pažinčių alternatyvos gali didinti idealizuoto partnerio lūkesčius bei pasirinkimo perkrovą.</p></div>
      <div class="card"><h3>2 · Partnerystės laikas</h3><p>Jei stabilaus partnerio paieška ilgėja, pirmoji ilgalaikė partnerystė ir sprendimas dėl vaikų gali persikelti į vyresnį amžių.</p></div>
      <div class="card"><h3>3 · Gimimų laiko langas</h3><p>Vėlesnis pirmas gimimas palieka trumpesnį laiką antram ir trečiam gimimui. Tai tikėtinas mechanizmas, tačiau jo dydį Lietuvai reikia matuoti, o ne numanyti.</p></div>
    </div>

    <h3 style="margin-top:2rem">Įrodymų stiprumas</h3>
    <table><thead><tr><th>Teiginys</th><th>Vertinimas šiame projekte</th></tr></thead><tbody>
      <tr><td>Gimdymai OECD šalyse persislenka į vyresnį amžių</td><td><strong>Stiprus</strong> · oficiali OECD analizė</td></tr>
      <tr><td>Darbo–šeimos konflikto ir nelygios priežiūros naštos mažinimas gali palaikyti gimstamumą</td><td><strong>Stiprus–vidutinis</strong> · OECD ir tarptautinė literatūra</td></tr>
      <tr><td>Tinkamo partnerio nebuvimas siejasi su neįgyvendintais vaisingumo ketinimais</td><td><strong>Stiprus ketinimų lygmeniu</strong> · Europos tyrimai</td></tr>
      <tr><td>Didelė pažinčių programėlių pasirinkimo pasiūla sukelia partnerio pasirinkimo perkrovą</td><td><strong>Vidutinis</strong> · eksperimentiniai ir apklausų tyrimai</td></tr>
      <tr><td>Socialiniai tinklai nuo vaikystės suformuoja per aukštą „idealaus partnerio“ standartą ir dėl to mažina Lietuvos TFR</td><td><strong>Autoriaus hipotezė</strong> · visa priežastinė grandinė neįrodyta</td></tr>
      <tr><td>Pati lyčių lygybė mažina gimstamumą</td><td><strong>Nepalaikoma</strong> · OECD veikiau pabrėžia darbo ir šeimos suderinamumą bei teisingesnį priežiūros pasidalijimą</td></tr>
    </tbody></table>

    <div class="source-line" style="margin-top:1.2rem">Konteksto šaltiniai: <a href="https://www.oecd.org/en/publications/2024/06/society-at-a-glance-2024_08001b73/full-report/fertility-trends-across-the-oecd-underlying-drivers-and-the-role-for-policy_770679b8.html" target="_blank" rel="noopener">OECD · Fertility trends and underlying drivers</a> · <a href="https://link.springer.com/article/10.1007/s10680-023-09664-5" target="_blank" rel="noopener">European Journal of Population · Partnership status and fertility intentions</a> · <a href="https://www.sciencedirect.com/science/article/pii/S0747563221003009" target="_blank" rel="noopener">Computers in Human Behavior · Partner choice overload</a> · <a href="https://pubmed.ncbi.nlm.nih.gov/39480282/" target="_blank" rel="noopener">JPSP · Ideal partner preferences</a></div>
  `;

  if(sourceLine) sourceLine.insertAdjacentElement('beforebegin',block);
  else container.appendChild(block);
})();
