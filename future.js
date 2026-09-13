// Baigiamoji dalis: oficialios projekcijos + aiškiai pažymėtos prielaidos / scenarijai
(() => {
  const ink2='#4a4845';
  const fBlue='#1d4f7d', fRed='#b9382b', fGreen='#2f6942', fAmber='#a95d12';
  const fGrid='rgba(74,72,69,.12)';

  const synthesis=document.getElementById('isvados');
  if(!synthesis || document.getElementById('scenarijai')) return;

  const section=document.createElement('section');
  section.id='scenarijai';
  section.innerHTML=`<div class="container">
    <div class="section-label">10 · Prognozės ir prielaidos Lietuvai <span class="badge badge-official">OFICIALIOS PROJEKCIJOS</span> <span class="badge badge-prelim">SCENARIJAI ≠ FAKTAI</span></div>
    <h2>Demografinis spaudimas didins produktyvumo poreikį. Klausimas – kaip prie to prisitaikys darbo rinka ir socialinės sistemos finansavimas</h2>
    <div class="alert alert-amber"><strong>Ši dalis sąmoningai kitokia nei visas puslapis.</strong> Skaičiai pateikiami tik iš oficialių Europos Komisijos projekcijų. Toliau esanti priežastinė grandinė ir trys scenarijai yra analitinės prielaidos, paremtos aukščiau parodyta Lietuvos statistika ir OECD aprašytais mechanizmais. Tai nėra prognozuojamos tikimybės.</div>

    <h3>Kas jau yra oficialiai projektuojama</h3>
    <div class="two-col">
      <div>
        <div class="chart-wrap" style="height:330px"><canvas id="futureDependencyChart"></canvas></div>
        <div class="chart-caption">65+ gyventojų / 20–64 m. gyventojų santykis. Europos Komisijos 2024 Ageing Report bazinis scenarijus.</div>
      </div>
      <div>
        <table><thead><tr><th>Rodiklis</th><th class="td-num">2022</th><th class="td-num">2030</th><th class="td-num">2040</th><th class="td-num">2050</th></tr></thead><tbody>
          <tr><td>Lietuvos gyventojai, mln.</td><td class="td-num">2,838</td><td class="td-num">2,729</td><td class="td-num">2,513</td><td class="td-num">2,329</td></tr>
          <tr><td>Užimtieji, mln.</td><td class="td-num">1,424</td><td class="td-num">1,296</td><td class="td-num">1,159</td><td class="td-num">1,034</td></tr>
          <tr><td>65+ / 20–64</td><td class="td-num">33,1 %</td><td class="td-num">41,5 %</td><td class="td-num">50,3 %</td><td class="td-num td-red">57,9 %</td></tr>
          <tr><td>Pensininkai / užimtieji</td><td class="td-num">0,7</td><td class="td-num">0,7</td><td class="td-num">0,8</td><td class="td-num td-red">0,9</td></tr>
          <tr><td>Viešosios pensijos / BVP</td><td class="td-num">6,4 %</td><td class="td-num">8,1 %</td><td class="td-num">9,3 %</td><td class="td-num td-red">9,8 %</td></tr>
        </tbody></table>
        <p class="small">Tai „constant policy“ tipo ilgalaikės projekcijos, o ne garantuota ateitis. 2035 / 2045 m. reikšmių neinterpoliuojame.</p>
      </div>
    </div>

    <div class="kpi-row">
      <div class="kpi"><div class="kpi-num red">−18,6 %</div><div class="kpi-label">Užimtųjų skaičiaus pokytis · 2022→2040</div><div class="kpi-note">1,424 → 1,159 mln. · skaičiavimas iš EK projekcijos</div></div>
      <div class="kpi"><div class="kpi-num red">−27,4 %</div><div class="kpi-label">Užimtųjų skaičiaus pokytis · 2022→2050</div><div class="kpi-note">1,424 → 1,034 mln. · skaičiavimas iš EK projekcijos</div></div>
      <div class="kpi"><div class="kpi-num amber">+3,4 p. p.</div><div class="kpi-label">Viešųjų pensijų išlaidos / BVP · 2022→2050</div><div class="kpi-note">6,4 % → 9,8 %</div></div>
    </div>

    <div class="alert alert-blue"><strong>Lietuva prieš ES.</strong> 2022 m. Lietuvos senatvės priklausomybės rodiklis buvo mažesnis už ES (33,1 % prieš 36,9 %), 2040 m. beveik susilygina (50,3 % prieš 51,5 %), o 2050 m. baziniame scenarijuje Lietuva jau viršija ES (57,9 % prieš 55,9 %).</div>

    <h3>Nuo oficialios projekcijos – prie mūsų hipotezės</h3>
    <div class="findings">
      <div class="finding"><div class="finding-num">01</div><div><div class="finding-title">Mažiau darbuotojų + daugiau išlaikomų vyresnio amžiaus žmonių</div><div class="finding-body"><strong>Oficiali projekcija.</strong> Užimtųjų skaičius mažėja, o 65+ / 20–64 santykis didėja. Tai reiškia didesnį poreikį vienam dirbančiajam ir vienai darbo valandai sukurti daugiau ekonominės vertės.</div></div></div>
      <div class="finding"><div class="finding-num">02</div><div><div class="finding-title">Darbo jėgos trūkumas didina automatizavimo paskatą</div><div class="finding-body"><strong>Pagrįsta prielaida.</strong> Kai darbuotojų mažėja, įmonėms tampa racionaliau investuoti į procesų efektyvinimą, automatizaciją, robotizaciją ir AI. OECD pažymi, kad senėjimo sukeltas darbo jėgos trūkumas gali pats skatinti technologines inovacijas ir produktyvumo augimą.</div></div></div>
      <div class="finding"><div class="finding-num">03</div><div><div class="finding-title">Automatizacija gali išlaikyti gamybos apimtį net mažėjant darbuotojų skaičiui</div><div class="finding-body"><strong>Scenarijus, ne garantija.</strong> Jei produktyvumas augs greičiau nei trauksis darbo pasiūla, mažesnė darbo jėga nebūtinai reikš proporcingai mažesnę ekonomiką. Todėl automatizacija senstančiai Lietuvai gali būti ne problema, o būtina adaptacijos priemonė.</div></div></div>
      <div class="finding"><div class="finding-num">04</div><div><div class="finding-title">Finansavimo paradoksas</div><div class="finding-body"><strong>Sisteminė rizikos hipotezė.</strong> Jei vis didesnę vertės dalį kurs kapitalas, robotai ir programinė įranga, o socialinės apsaugos finansavimas liks stipriai susietas su darbo pajamomis, finansavimo bazė gali augti lėčiau nei socialiniai poreikiai. OECD 2026 m. būtent šį neatitikimą įvardija kaip vieną iš priežasčių svarstyti platesnę socialinės apsaugos finansavimo bazę.</div></div></div>
      <div class="finding"><div class="finding-num">05</div><div><div class="finding-title">Tai nėra argumentas „apmokestinti robotą“</div><div class="finding-body">Labai automatizuota įmonė ir toliau moka pelno, vartojimo, turto bei kitus mokesčius. Problema yra ne robotas pats savaime, o galimas neatitikimas tarp <em>kur kuriama ekonominė vertė</em> ir <em>nuo ko surenkamos socialinės sistemos pajamos</em>.</div></div></div>
    </div>

    <h3 style="margin-top:2rem">Trys Lietuvos scenarijai</h3>
    <div class="three-col">
      <div class="card"><h3>A · Prisitaikanti ekonomika</h3><p><strong>Prielaida:</strong> spartėja automatizacija ir produktyvumas, dalį darbo jėgos trūkumo kompensuoja migracija ir ilgesnis aktyvus amžius, o socialinės apsaugos finansavimo bazė palaipsniui diversifikuojama.</p><p style="margin-top:.7rem"><strong>Galima kryptis:</strong> mažiau darbuotojų, bet aukštesnė vertė vienam darbuotojui; demografinė našta tampa labiau valdoma.</p></div>
      <div class="card"><h3>B · Automatizacija + sena finansavimo logika</h3><p><strong>Prielaida:</strong> kapitalo intensyvumas auga, bet didelė socialinės sistemos finansavimo dalis ir toliau remiasi darbo pajamomis.</p><p style="margin-top:.7rem"><strong>Rizika:</strong> likusiam darbui tenkanti mokestinė našta didėja, o tai gali dar labiau skatinti darbo pakeitimą kapitalu – teigiamo grįžtamojo ryšio kilpa.</p></div>
      <div class="card"><h3>C · Lėta automatizacija</h3><p><strong>Prielaida:</strong> darbui imlios įmonės lėtai keičia technologijas, o darbo pasiūla mažėja pagal demografinę kryptį.</p><p style="margin-top:.7rem"><strong>Rizika:</strong> didesnis darbuotojų trūkumas, darbo sąnaudų spaudimas ir konkurencingumo problema sektoriuose, kuriuose technologinis pakaitalas įmanomas.</p></div>
    </div>

    <div class="alert alert-green"><strong>Pagrindinė hipotezė projektui:</strong> Lietuvos demografinė problema nebūtinai reiškia „per mažai žmonių pagaminti pakankamai“. Ji gali reikšti <strong>per siaurą darbo pajamų bazę finansuoti sistemą</strong>, jei produktyvumo prieaugis vis labiau persikels į kapitalą, o finansavimo modelis nepasikeis.</div>

    <h3>Ką stebėti, kad žinotume, kuris scenarijus realizuojasi</h3>
    <table><thead><tr><th>Signalas</th><th>Ką jis parodytų</th></tr></thead><tbody>
      <tr><td>Užimtųjų skaičius ir bendros dirbtos valandos</td><td>Ar demografinė darbo pasiūlos bazė realiai traukiasi.</td></tr>
      <tr><td>Produktyvumas vienam darbuotojui / valandai</td><td>Ar technologijos kompensuoja mažėjantį darbo kiekį.</td></tr>
      <tr><td>Investicijos į automatizaciją, robotiką ir AI</td><td>Kaip greitai verslas keičia darbą kapitalu ir technologijomis.</td></tr>
      <tr><td>Darbo pajamų dalis ekonomikoje</td><td>Ar produktyvumo prieaugis lieka darbo užmokesčio bazėje, ar didesnė dalis pereina kapitalui.</td></tr>
      <tr><td>Socialinių įmokų ir bendrųjų mokesčių finansavimo santykis</td><td>Ar socialinės sistemos pajamų bazė diversifikuojasi.</td></tr>
      <tr><td>20–39 m. gyventojų neto migracija</td><td>Ar migracija kompensuoja darbingo amžiaus gyventojų trūkumą.</td></tr>
    </tbody></table>

    <div class="source-line">Oficialios projekcijos: <a href="https://economy-finance.ec.europa.eu/publications/2024-ageing-report-economic-and-budgetary-projections-eu-member-states-2022-2070_en" target="_blank" rel="noopener">Europos Komisija · 2024 Ageing Report</a> · <a href="https://economy-finance.ec.europa.eu/document/download/b8767642-877c-4605-ad16-8b4b174e1f05_en?filename=2024-ageing-report-country-fiche-Lithuania.pdf" target="_blank" rel="noopener">Lithuania Country Fiche</a><br>Scenarijų mechanizmų šaltinis: <a href="https://www.oecd.org/en/publications/financing-of-social-protection_b384fd31-en.html" target="_blank" rel="noopener">OECD · Financing of Social Protection · 2026</a> · <a href="https://www.oecd.org/en/publications/financing-of-social-protection_b384fd31-en/full-report/securing-the-revenue-base-for-social-protection_fee691c9.html" target="_blank" rel="noopener">Securing the Revenue Base for Social Protection</a></div>
  </div>`;
  synthesis.insertAdjacentElement('afterend',section);

  const nav=document.querySelector('nav');
  const methodLink=nav?.querySelector('a[href="#metodika"]');
  if(nav && methodLink && !nav.querySelector('a[href="#scenarijai"]')){
    const link=document.createElement('a');
    link.href='#scenarijai';
    link.textContent='Prognozės · scenarijai';
    methodLink.insertAdjacentElement('beforebegin',link);
  }

  const methodLabel=document.querySelector('#metodika .section-label');
  const sourcesLabel=document.querySelector('#saltiniai .section-label');
  if(methodLabel) methodLabel.innerHTML=methodLabel.innerHTML.replace(/^\d{2}/,'11');
  if(sourcesLabel) sourcesLabel.innerHTML=sourcesLabel.innerHTML.replace(/^\d{2}/,'12');

  const chartCanvas=document.getElementById('futureDependencyChart');
  if(chartCanvas && window.Chart){
    new Chart(chartCanvas,{type:'line',data:{labels:['2022','2030','2040','2050'],datasets:[
      {label:'Lietuva',data:[33.1,41.5,50.3,57.9],borderColor:fRed,backgroundColor:fRed,tension:.2,pointRadius:5,borderWidth:3},
      {label:'ES',data:[36.9,43.3,51.5,55.9],borderColor:fBlue,backgroundColor:fBlue,tension:.2,pointRadius:5,borderWidth:2}
    ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},scales:{y:{min:25,max:65,grid:{color:fGrid},title:{display:true,text:'65+ / 20–64, %'}},x:{grid:{display:false}}}}});
  }

  const sources=document.querySelector('#saltiniai .sources');
  if(sources){
    const ec=document.createElement('div');
    ec.className='source-card';
    ec.innerHTML='<strong>Europos Komisija · 2024 Ageing Report · Lithuania Country Fiche</strong><a href="https://economy-finance.ec.europa.eu/document/download/b8767642-877c-4605-ad16-8b4b174e1f05_en?filename=2024-ageing-report-country-fiche-Lithuania.pdf" target="_blank" rel="noopener">Gyventojų, užimtumo, priklausomybės ir pensijų projekcijos 2022–2070</a>';
    const oecd=document.createElement('div');
    oecd.className='source-card';
    oecd.innerHTML='<strong>OECD · Financing of Social Protection · 2026</strong><a href="https://www.oecd.org/en/publications/financing-of-social-protection_b384fd31-en.html" target="_blank" rel="noopener">Senėjimas, darbo pajamų bazė, technologijos ir socialinės apsaugos finansavimas</a>';
    sources.append(ec,oecd);
  }
})();
