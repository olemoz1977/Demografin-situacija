// Vaikų infrastruktūra: vietų skaičius, erdvinis neatitikimas ir istorinis mokyklų tinklo pjūvis
(() => {
  const anchor=document.getElementById('isvados');
  if(!anchor || document.getElementById('infrastruktura')) return;

  const nav=document.querySelector('nav');
  if(nav && !nav.querySelector('a[href="#infrastruktura"]')){
    const a=document.createElement('a');
    a.href='#infrastruktura';
    a.textContent='Infrastruktūra';
    const before=nav.querySelector('a[href="#isvados"]');
    if(before) nav.insertBefore(a,before); else nav.appendChild(a);
  }

  const section=document.createElement('section');
  section.id='infrastruktura';
  section.innerHTML=`<div class="container">
    <div class="section-label">11 · Vaikų infrastruktūra <span class="badge badge-official">SAVIVALDYBIŲ DUOMENYS</span></div>
    <h2>„Trūksta darželių ir mokyklų“ – per paprasta. Dažnai problema yra ne kiek vietų turime, o kur jos yra</h2>
    <p class="lead">Didmiesčių duomenys rodo paradoksą: mieste vienu metu gali būti ir laisvų vietų, ir laukiančių vaikų. Tai reiškia, kad bendras vietų skaičius ne visada parodo realų šeimos prieinamumą prie namų.</p>

    <div class="kpi-row">
      <div class="kpi"><div class="kpi-num blue">1 656</div><div class="kpi-label">Vilnius · laisvos darželių vietos · 2025-04</div><div class="kpi-note">Savivaldybės įstaigose</div></div>
      <div class="kpi"><div class="kpi-num red">3 493</div><div class="kpi-label">Vilnius · vaikai eilėje · 2025-04</div><div class="kpi-note">1 705 jau lankė kitą savivaldybės darželį</div></div>
      <div class="kpi"><div class="kpi-num blue">783</div><div class="kpi-label">Kaunas · laisvos vietos · 2025-05</div><div class="kpi-note">14 931 vieta, 13 946 ugdomi vaikai</div></div>
      <div class="kpi"><div class="kpi-num blue">421</div><div class="kpi-label">Klaipėda · laisvos vietos pietuose</div><div class="kpi-note">Centrinėje ir šiaurinėje dalyse laisvų vietų nebuvo</div></div>
    </div>

    <div class="alert alert-amber"><strong>Svarbi metodinė pastaba.</strong> Šių miestų „eilės“ ir „laisvos vietos“ nėra vienodai skaičiuojami, todėl jų tarpusavyje nereitinguojame. Juos naudojame kaip atskirus pavyzdžius, parodančius <strong>erdvinį pasiūlos ir paklausos neatitikimą</strong>.</div>

    <div class="three-col" style="margin-top:1.5rem">
      <div class="finding"><div class="finding-num">VILNIUS</div><div><div class="finding-title">Laisvos vietos ir eilė egzistuoja vienu metu</div><div class="finding-body">2025 m. balandį buvo 1 656 laisvos vietos ir 3 493 vaikai eilėje. Didžiausia laisvų vietų pasiūla buvo Žirmūnuose, Naujininkuose, Lazdynuose, Antakalnyje ir Karoliniškėse, o didžiausios eilės – Verkiuose, Pilaitėje, Naujojoje Vilnioje, Pašilaičiuose ir Paneriuose.</div></div></div>
      <div class="finding"><div class="finding-num">KAUNAS</div><div><div class="finding-title">Bendras vietų deficitas sumažėjo, bet poreikis liko lokalus</div><div class="finding-body">2025 m. gegužę savivaldybės analizėje buvo 14 931 vieta, 13 946 ugdomi vaikai ir 783 laisvos vietos. Didžiausias institucinio ikimokyklinio ugdymo poreikis išliko Šilainiuose, Aleksote ir Centre, taip pat didesnis Vilijampolėje.</div></div></div>
      <div class="finding"><div class="finding-num">KLAIPĖDA</div><div><div class="finding-title">Vietų pakako miesto mastu, bet ne norimoje dalyje</div><div class="finding-body">Savivaldybės 2024 m. veiklos ataskaitoje nurodyta, kad vietą buvo galima užtikrinti visiems vaikams, tačiau 124 laukė pageidaujamos įstaigos. Pietinėje miesto dalyje buvo 421 laisva vieta, o centrinėje ir šiaurinėje – laisvų vietų nebuvo.</div></div></div>
    </div>

    <h3>Istorinis signalas: mažėjantis vaikų skaičius savaime neišsprendė vietinio mokyklų trūkumo</h3>
    <div class="two-col">
      <div>
        <div class="chart-wrap" style="height:320px"><canvas id="vilniusSchoolHistoryChart"></canvas></div>
        <div class="chart-caption">Vilniaus bendrojo lavinimo mokyklų mokinių skaičius · 2007/08–2011/12 · miesto galimybių studija.</div>
      </div>
      <div>
        <div class="alert alert-blue"><strong>2007/08 → 2011/12:</strong> mokinių skaičius sumažėjo nuo <strong>75 458</strong> iki <strong>65 666</strong> (−9,8 tūkst.). Tačiau 2011/12 m. <strong>8 mokyklos vis dar dirbo dviem pamainomis</strong>. Miesto dokumente taip pat nurodyta, kad pagal projektinį pajėgumą mokyklose būtų galėję mokytis 64 070 mokinių, kai 2011 m. rugsėjo 1 d. savivaldybės mokyklose mokėsi 60 985.</div>
        <p class="small">Tai nėra prieštaravimas: bendras pajėgumas gali būti pakankamas, bet netinkamai pasiskirstęs tarp rajonų ar konkrečių mokyklų.</p>
      </div>
    </div>

    <h3>Ką reiškia „arti namų“?</h3>
    <p class="lead">Teritorijų planavimo normose rekomenduojamas didžiausias realus pasiekiamumo atstumas nuo būsto yra <strong>750 m iki vaikų darželio</strong>, <strong>1 250 m iki pradinės mokyklos</strong> ir <strong>1 750 m iki pagrindinės mokyklos / progimnazijos / gimnazijos</strong>. Tai gerokai prasmingesnis šeimai rodiklis nei vien bendras miesto vietų skaičius.</p>
    <div class="kpi-row">
      <div class="kpi"><div class="kpi-num">750 m</div><div class="kpi-label">Darželis</div><div class="kpi-note">rekomenduojamas didžiausias pasiekiamumo atstumas</div></div>
      <div class="kpi"><div class="kpi-num">1 250 m</div><div class="kpi-label">Pradinė mokykla</div><div class="kpi-note">1–4 klasės</div></div>
      <div class="kpi"><div class="kpi-num">1 750 m</div><div class="kpi-label">Pagrindinė / progimnazija / gimnazija</div><div class="kpi-note">6 klasių lygiai ar daugiau</div></div>
    </div>

    <div class="alert alert-green"><strong>Teigiama dabarties pusė.</strong> 2026 m. Vilnius skelbė, kad 98 % prašymus teikusių vaikų jau buvo priimti į norimas mokyklas. Tai rodo, kad infrastruktūros problema nėra vien kryptingai blogėjanti – ji gali būti valdoma tinklo plėtra ir srautų planavimu.</div>

    <div class="alert alert-blue"><strong>Išvada.</strong> Diskusijoje apie šeimų politiką prasminga klausti ne tik „kiek skiriame pinigų?“ ir ne tik „kiek turime darželių?“, bet ir <strong>ar šeima gauna vietą ten, kur gyvena, be neproporcingos kasdienės logistikos</strong>. Finansinė parama ir arti namų esanti infrastruktūra nėra alternatyvos – jos papildo viena kitą.</div>

    <div class="source-line">Šaltiniai: <a href="https://vilnius.lt/naujienos/prasideda-priemimas-i-atsilaisvinusias-vietas-sostines-darzeliuose" target="_blank" rel="noopener">Vilnius · darželių priėmimas 2025</a> · <a href="https://www.kaunas.lt/wp-content/uploads/sites/13/2015/07/2025-m.-analizes.pdf" target="_blank" rel="noopener">Kaunas · ikimokyklinio ugdymo analizė 2025</a> · <a href="https://www.klaipeda.lt/data/public/uploads/2025/05/elektroniniodokumentonuorasas.pdf" target="_blank" rel="noopener">Klaipėda · 2024 m. veiklos ataskaita</a> · <a href="https://vilnius.lt/rest/assets/15daae7f-4601-4c8f-80c6-1aba102e1a05" target="_blank" rel="noopener">Vilnius · istorinis mokyklų tinklo pjūvis</a> · <a href="https://e-seimas.lrs.lt/rs/actualedition/f2b240507a7411e38df3da592f4236cc/taYQwYlifI/" target="_blank" rel="noopener">E-Seimas · švietimo infrastruktūros pasiekiamumo normos</a> · <a href="https://vilnius.lt/naujienos/dauguma-vilnieciu-jau-zino-kur-mokysis-ju-vaikai-priemimas-dar-tesiasi" target="_blank" rel="noopener">Vilnius · mokyklų priėmimas 2026</a></div>
  </div>`;
  anchor.insertAdjacentElement('beforebegin',section);

  const c=document.getElementById('vilniusSchoolHistoryChart');
  if(c && window.Chart){
    new Chart(c,{
      type:'line',
      data:{
        labels:['2007/08','2008/09','2009/10','2010/11','2011/12'],
        datasets:[{label:'Mokiniai',data:[75458,72408,69989,67295,65666],borderColor:'#2f6942',backgroundColor:'#2f6942',tension:.2,pointRadius:4,borderWidth:3}]
      },
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{title:{display:true,text:'Mokinių skaičius'},grid:{color:'rgba(74,72,69,.12)'}},x:{grid:{display:false}}}}
    });
  }
})();
