(() => {
  const body=document.querySelector('#scenarijai .findings .finding:nth-child(5) .finding-body');
  if(body){
    body.innerHTML='Labai automatizuota įmonė ir toliau gali mokėti pelno bei turto mokesčius, o jos veikla ir produkcija generuoti vartojimo bei kitų mokesčių pajamas. Problema yra ne robotas pats savaime, o galimas neatitikimas tarp <em>kur kuriama ekonominė vertė</em> ir <em>nuo ko surenkamos socialinės sistemos pajamos</em>.';
  }

  // Įtraukus istorinį šeimos politikos pjūvį, scenarijų ir metodikos numeracija pasislenka.
  const scenarioLabel=document.querySelector('#scenarijai .section-label');
  const methodLabel=document.querySelector('#metodika .section-label');
  const sourcesLabel=document.querySelector('#saltiniai .section-label');
  if(scenarioLabel) scenarioLabel.innerHTML=scenarioLabel.innerHTML.replace(/^\d{2}/,'11');
  if(methodLabel) methodLabel.innerHTML=methodLabel.innerHTML.replace(/^\d{2}/,'12');
  if(sourcesLabel) sourcesLabel.innerHTML=sourcesLabel.innerHTML.replace(/^\d{2}/,'13');

  const nav=document.querySelector('nav');
  if(nav && !nav.querySelector('a[href="#parama-istorija"]')){
    const synthesis=nav.querySelector('a[href="#isvados"]');
    const link=document.createElement('a');
    link.href='#parama-istorija';
    link.textContent='Istorinis paketas';
    if(synthesis) synthesis.insertAdjacentElement('beforebegin',link);
    else nav.appendChild(link);
  }
})();
