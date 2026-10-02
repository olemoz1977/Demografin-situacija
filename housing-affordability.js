(() => {
  const SECTION_ID='housingAffordability';

  function insertShell(){
    if(document.getElementById(SECTION_ID)) return document.getElementById(SECTION_ID);
    const section=document.createElement('section');
    section.id=SECTION_ID;
    section.innerHTML=`<div class="container">
      <div class="section-label">Pirmas šeimos būstas <span class="badge badge-prelim">PALYGINIMAS TIKSLINAMAS</span></div>
      <h2>Ar jaunai dirbančiai porai prieinamas pirmas šeimos būstas?</h2>
      <p class="lead">Tai demografinio konteksto klausimas: ar pirmo nuosavo būsto įsigijimas gali būti vienas iš materialių šeimos kūrimo aplinkos barjerų. <strong>Ši analizė neįrodinėja priežastinio ryšio su gimstamumu.</strong> Kol kas tarpapskritinio palyginimo nerodome, nes dabartinis pardavimo kainų sluoksnis nelygina vienodų būstų visose apskrityse.</p>

      <div class="housing-comparability-stop">
        <div class="housing-takeaway-label">Kodėl nerodome ankstesnių skaičių</div>
        <p><strong>50 m² nėra tas pats būstas.</strong> Vienodas plotas nepašalina skirtumų dėl statybos laikotarpio, naujos ir antrinės rinkos dalies, būklės ar kitų kokybės skirtumų. Be to, ankstesnis pardavimo proxy buvo bendro būsto rodiklis, ne grynai daugiabučių butų sluoksnis.</p>
        <p>Todėl ankstesni 10 apskričių įverčiai ir jų santykiai <strong>nebelaikomi tinkamu tarpapskritiniu rezultatu</strong> ir viešai nerodomi.</p>
      </div>

      <div class="two-col housing-comparable-next">
        <div class="card">
          <div class="eyebrow">Ką norime pamatuoti</div>
          <p><strong>Tikslinė situacija:</strong> 25–30 m. dirbanti pora, siekianti įsigyti pirmą nuosavą šeimos būstą. Vaikų turėjimas čia nėra atskira sąlyga, nes vaikų išlaidos ir vaiko priežiūros laikotarpio pajamų pokyčiai šiame modelyje neskaičiuojami.</p>
          <p><strong>Pajamos:</strong> teritorinis neto pajamų modelis, sudarytas oficialių „Sodros“ duomenų pagrindu.</p>
          <p><strong>Oficiali kontrolė:</strong> VDA turi 2025 m. faktinių daugiabučių butų sandorių kainų etaloną Lietuvai ir 6 miestų savivaldybėms.</p>
        </div>
        <div class="card">
          <div class="eyebrow">Ko reikia patikimam pirmo būsto palyginimui</div>
          <p>Tas pats objektų krepšelis visur: <strong>butas daugiabutyje</strong>, vienodas laikotarpis, panašus plotas, aiški statybos laikotarpio / rinkos segmento taisyklė ir pakankamas sandorių skaičius kiekvienoje teritorijoje.</p>
          <p>Pirminis ploto kandidatas: <strong>45–55 m²</strong>. Statybos laikotarpis bus pasirenkamas tik pamačius realią 2025 m. sandorių aprėptį visose 10 apskričių.</p>
        </div>
      </div>

      <div class="alert alert-blue">
        <strong>Projekto taisyklė.</strong> Jei rodiklis matuoja nepalyginamus objektus arba jo interpretacija gali klaidinti, jis nepatenka į pagrindinę išvadą. Jei paliekamas diagnostikai, turi būti aiškiai pažymėtas kaip nepalyginamas / diagnostinis.
      </div>

      <details class="housing-details">
        <summary>Ką dar tiksliname?</summary>
        <div class="housing-details-body">
          <p><strong>Pardavimo kaina:</strong> reikia 2025 m. daugiabučių butų duomenų pagal apskritį, ploto intervalą ir statybos laikotarpio grupę, su sandorių N.</p>
          <p><strong>Nuoma:</strong> dabartinis sluoksnis yra 1 kambario ilgalaikės nuomos skelbimų imtis. Jis lieka diagnostinis, kol neturime vienodo ir pakankamai pilno krepšelio visoms 10 apskričių.</p>
          <p><strong>Pajamos:</strong> išlieka modeliuotos oficialių duomenų pagrindu ir bus aiškiai žymimos kaip modeliuotos, ne tiesiogiai išmatuotos pagal amžių × apskritį.</p>
        </div>
      </details>

      <div class="source-line">Šaltiniai / bazė: Sodra 2025-11 · VDA S7R280 2025 · Registrų centro / VDA būsto sandorių šaltinių auditas · rinkos nuomos imčių QA. Ankstesni v0.1 apskričių skaičiai palikti tik research diagnostikai, ne viešai išvadai.</div>
    </div>`;

    const target=document.getElementById('scenarijai')||document.getElementById('isvados')||document.getElementById('metodika');
    if(target) target.insertAdjacentElement('beforebegin',section); else document.body.appendChild(section);
    return section;
  }

  insertShell();
})();