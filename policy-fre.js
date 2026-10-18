// Istorinė 2008–2011 FRE išmokų normų diagrama; 2026 dalinė bazė nelaikoma lygiaverte visa schema
(() => {
  const section=document.getElementById('parama-istorija');
  if(!section || document.getElementById('policyFreBlock')) return;

  const twoCol=section.querySelector('.two-col');
  const block=document.createElement('div');
  block.id='policyFreBlock';
  block.innerHTML=`
    <h3 style="margin-top:2rem">2008–2011 m. vaiko priežiūros išmokų bazinių normų FRE</h3>
    <p class="lead"><strong>FRE (full-rate equivalent)</strong> – išmokų normų ir mokėjimo mėnesių sandaugų suma. Čia lyginamos tik <strong>2008, 2010 ir 2011 m. dvejų metų istorinės schemos</strong> pagal bazinius tarifus, ne faktinės šeimos grynosios pajamos. Dabartinės schemos visos apimties pagal šiuos duomenis neapskaičiuojame.</p>
    <div class="alert alert-blue"><strong>Pavyzdys.</strong> 2008 m. schema buvo 12 mėn. po 100 % ir dar 12 mėn. po 85 %. Skaičiuojame: 12 × 100 % + 12 × 85 % = <strong>22,2 pilno tarifo mėnesio</strong>. Tai <strong>nereiškia</strong>, kad 22,2 mėn. buvo mokama 100 % – tai tik bendras tos schemos ekvivalentas.</div>
    <div class="chart-wrap" style="height:330px"><canvas id="policyFreChart"></canvas></div>
    <div class="chart-caption"><strong>Istorinių bazinių normų 24 mėn. FRE.</strong> Tarifikacijos formulė parodo schemos ekvivalentą, tačiau ne realų neto pajamų pakeitimą: lubos, mokesčiai ir individualios sąlygos neįtrauktos. <strong>2026 m. bazės į šį grafiką nededame</strong>, nes jai trūksta neperleidžiamų mėnesių komponento.</div>
    <div class="alert alert-amber" style="margin-top:1.2rem"><strong>Dabartinė schema – atskiras, nepilnas komponentas.</strong> Vien 45 % / 30 % bazinių normų formulė duoda <strong>9,0 pilno tarifo mėnesių</strong>, tačiau joje <strong>nėra 2 + 2 neperleidžiamų mėnesių po 78 %</strong>. Todėl negalima teigti, kad 2008 m. visa 22,2 mėn. schema tiesiogiai palyginama su 2026 m. „9,0“, arba pagal šį grafiką reitinguoti faktinį šeimos pajamų saugumą. Visos dabartinės schemos FRE šiame tyrime <strong>neskaičiuojamas</strong>.</div>
    <div class="source-line">Metodikos orientyras: <a href="https://www.oecd.org/els/family/PF2_4_Parental_leave_replacement_rates.pdf" target="_blank" rel="noopener">OECD Family Database · PF2.4 · Parental leave replacement rates</a> · Dabartinės normos: <a href="https://sodra.lt/ismokos/seimos-ismokos/vaiko-prieziuros-ismoka-nuo-2023-m" target="_blank" rel="noopener">Sodra · vaiko priežiūros išmoka</a>. Istorinės normos – aukščiau pateikti E-Seimo šaltiniai.</div>
  `;

  if(twoCol) twoCol.insertAdjacentElement('afterend',block);
  else section.querySelector('.container')?.appendChild(block);

  const c=document.getElementById('policyFreChart');
  if(c && window.Chart){
    new Chart(c,{
      type:'bar',
      data:{
        labels:['2008 · 100/85','2010 · 90/75','2011 · 70/40'],
        datasets:[{
          label:'100 % pajamų ekvivalento mėnesiai',
          data:[22.2,19.8,13.2],
          backgroundColor:['#2f6942','#4d7659','#a95d12'],
          borderWidth:0
        }]
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
          legend:{display:false},
          tooltip:{callbacks:{label:(ctx)=>`${ctx.parsed.y.toLocaleString('lt-LT',{minimumFractionDigits:1,maximumFractionDigits:1})} pilno tarifo mėn.`}}
        },
        scales:{
          y:{beginAtZero:true,max:24,title:{display:true,text:'„100 % pajamų“ mėnesių ekvivalentas'},grid:{color:'rgba(74,72,69,.12)'}},
          x:{grid:{display:false}}
        }
      }
    });
  }
})();
