// Read the same data that Chart.js displays; do not infer missing values.
(() => {
  const formatter=new Intl.NumberFormat('lt-LT',{maximumFractionDigits:3});
  const signatures=new WeakMap();
  function describe(chart){
    const canvas=chart.canvas, wrap=canvas?.closest('.chart-wrap');
    if(!wrap||!canvas.id) return;
    const labels=chart.data.labels||[], datasets=chart.data.datasets||[];
    if(!labels.length||!datasets.length) return;
    const signature=JSON.stringify({labels,datasets:datasets.map(d=>({label:d.label,data:d.data}))});
    if(signatures.get(canvas)===signature) return;
    signatures.set(canvas,signature);
    const tableId=canvas.id+'Data';
    let details=document.getElementById(tableId);
    if(!details){
      details=document.createElement('details'); details.id=tableId; details.className='reader-details chart-data';
      const caption=wrap.nextElementSibling;
      (caption?.classList.contains('chart-caption')?caption:wrap).insertAdjacentElement('afterend',details);
    }
    const open=details.open;
    details.replaceChildren(); details.open=open;
    const summary=document.createElement('summary'); summary.textContent='Grafiko reikšmės lentelėje'; details.appendChild(summary);
    const region=document.createElement('div'); region.className='chart-data-scroll'; region.tabIndex=0;
    region.setAttribute('role','region');region.setAttribute('aria-label','Slenkama grafiko duomenų lentelė');
    const table=document.createElement('table'), caption=document.createElement('caption');
    const nearCaption=wrap.nextElementSibling;
    caption.textContent=nearCaption?.classList.contains('chart-caption')?nearCaption.textContent:'Grafiko duomenys';
    table.appendChild(caption);
    const head=document.createElement('thead'), row=document.createElement('tr');
    function cell(tag,value,scope){const el=document.createElement(tag);el.textContent=value;if(scope)el.scope=scope;return el;}
    row.appendChild(cell('th','Grupė / metai','col'));
    const unit=chart.options.scales?.y?.title?.text||chart.options.scales?.x?.title?.text||'Reikšmė';
    datasets.forEach((d,i)=>row.appendChild(cell('th',d.label||(datasets.length===1?unit:'Rodiklis '+(i+1)),'col')));
    head.appendChild(row);table.appendChild(head);
    const body=document.createElement('tbody');
    labels.forEach((label,i)=>{
      const tr=document.createElement('tr');tr.appendChild(cell('th',Array.isArray(label)?label.join(' '):String(label),'row'));
      datasets.forEach(d=>{
        let value=d.data[i];
        if(value&&typeof value==='object') value=value.y;
        if(canvas.id==='sexAgeChart'&&typeof value==='number')value=Math.abs(value);
        tr.appendChild(cell('td',typeof value==='number'&&Number.isFinite(value)?formatter.format(value):'–'));
      });body.appendChild(tr);
    });table.appendChild(body);region.appendChild(table);details.appendChild(region);
    const note=document.createElement('p');note.className='small';
    note.textContent='Lentelė rodo grafike pateiktas reikšmes. Brūkšnys reiškia trūkstamą reikšmę, ne nulį.';
    details.appendChild(note);
    canvas.setAttribute('role','img');canvas.setAttribute('aria-label',caption.textContent.trim()+' Tikslios reikšmės pateiktos lentelėje po grafiku.');
    canvas.setAttribute('aria-details',tableId);
  }
  if(!window.Chart) return;
  Chart.register({id:'readerDataTables',afterUpdate(chart){queueMicrotask(()=>describe(chart));}});
  const scan=()=>document.querySelectorAll('canvas').forEach(c=>{const chart=Chart.getChart(c);if(chart)describe(chart);});
  scan(); [250,1000,2500].forEach(ms=>setTimeout(scan,ms));
})();
