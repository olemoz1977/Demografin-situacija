// Normalizuotas vaiko priežiūros išmokų palyginimas be valiutos / infliacijos poveikio
(() => {
  const section=document.getElementById('parama-istorija');
  if(!section || document.getElementById('policyFreBlock')) return;

  const twoCol=section.querySelector('.two-col');
  const block=document.createElement('div');
  block.id='policyFreBlock';
  block.innerHTML=`
    <h3 style="margin-top:2rem">Kaip palyginti skirtingas sistemas be Lt / €, infliacijos ir 2019 m. bruto reformos?</h3>
    <p class="lead">Nominalių sumų nelyginame. Vietoje jų naudojame <strong>supaprastintą OECD „full-rate equivalent“ (FRE) principu paremtą indeksą</strong>: kiek 100 % ankstesnių pajamų mėnesių atitiktų konkretaus 24 mėn. režimo bazinės išmokų normos.</p>
    <div class="chart-wrap" style="height:330px"><canvas id="policyFreChart"></canvas></div>
    <div class="chart-caption"><strong>Supaprastintas 24 mėn. bazinio režimo FRE indeksas.</strong> Skaičiavimas: 12 × pirmųjų metų norma + 12 × antrųjų metų norma. Tai nėra faktinė šeimai išmokėta suma: neįtraukiamos išmokų lubos, mokesčiai, nėštumo ir gimdymo išmoka, faktinė vaiko priežiūros išmokos pradžios data ir kitos individualios taisyklės.</div>
    <div class="alert alert-blue" style="margin-top:1.2rem"><strong>Kaip skaityti grafiką.</strong> 2008 m. 100 % / 85 % režimas duoda 22,2 pilno atlygio ekvivalento mėnesio (vidutiniškai 92,5 % per du metų blokus); 2010 m. 90 % / 75 % – 19,8 mėn.; 2011 m. dvejų metų 70 % / 40 % pasirinkimas – 13,2 mėn.; dabartinės 24 mėn. schemos bazinės 45 % / 30 % normos – 9,0 mėn. <strong>Dabartinės sistemos 2 + 2 neperleidžiami mėnesiai, mokami 78 %, į šią bazinę juostą sąmoningai neįtraukti</strong>, nes jų vieta laikotarpyje ir šeimos pasirinkimas keičia tikslų bendrą FRE.</div>
    <div class="source-line">Metodikos orientyras: <a href="https://www.oecd.org/els/family/PF2_4_Parental_leave_replacement_rates.pdf" target="_blank" rel="noopener">OECD Family Database · PF2.4 · Parental leave replacement rates</a> · Dabartinės normos: <a href="https://sodra.lt/ismokos/seimos-ismokos/vaiko-prieziuros-ismoka-nuo-2023-m" target="_blank" rel="noopener">Sodra · vaiko priežiūros išmoka</a>. Istorinės normos – aukščiau pateikti E-Seimo šaltiniai.</div>
  `;

  if(twoCol) twoCol.insertAdjacentElement('afterend',block);
  else section.querySelector('.container')?.appendChild(block);

  const c=document.getElementById('policyFreChart');
  if(c && window.Chart){
    new Chart(c,{
      type:'bar',
      data:{
        labels:['2008 · 100/85','2010 · 90/75','2011 · 70/40','2026 · 45/30 bazė'],
        datasets:[{
          label:'100 % pajamų ekvivalento mėnesiai',
          data:[22.2,19.8,13.2,9.0],
          backgroundColor:['#2f6942','#4d7659','#a95d12','#b9382b'],
          borderWidth:0
        }]
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
          legend:{display:false},
          tooltip:{callbacks:{label:(ctx)=>`${ctx.parsed.y.toLocaleString('lt-LT',{minimumFractionDigits:1,maximumFractionDigits:1})} pilno atlygio mėn.`}}
        },
        scales:{
          y:{beginAtZero:true,max:24,title:{display:true,text:'100 % pajamų ekvivalento mėnesiai'},grid:{color:'rgba(74,72,69,.12)'}},
          x:{grid:{display:false}}
        }
      }
    });
  }
})();
