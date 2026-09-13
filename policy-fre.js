// Normalizuotas vaiko priežiūros išmokų palyginimas be valiutos / infliacijos poveikio
(() => {
  const section=document.getElementById('parama-istorija');
  if(!section || document.getElementById('policyFreBlock')) return;

  const twoCol=section.querySelector('.two-col');
  const block=document.createElement('div');
  block.id='policyFreBlock';
  block.innerHTML=`
    <h3 style="margin-top:2rem">Kiek „100 % pajamų mėnesių“ atitinka skirtingos išmokų schemos?</h3>
    <p class="lead"><strong>FRE (full-rate equivalent)</strong> – paprastas būdas skirtingas išmokų normas paversti į vieną bendrą matą. Įsivaizduojame, kad vietoj skirtingų procentų visa išmoka būtų mokama po <strong>100 % ankstesnių pajamų</strong>. Tada klausiame: kiek tokių „pilno tarifo mėnesių“ susidarytų per visą laikotarpį?</p>
    <div class="alert alert-blue"><strong>Pavyzdys.</strong> 2008 m. schema buvo 12 mėn. po 100 % ir dar 12 mėn. po 85 %. Skaičiuojame: 12 × 100 % + 12 × 85 % = <strong>22,2 pilno tarifo mėnesio</strong>. Tai <strong>nereiškia</strong>, kad 22,2 mėn. buvo mokama 100 % – tai tik bendras tos schemos ekvivalentas.</div>
    <div class="chart-wrap" style="height:330px"><canvas id="policyFreChart"></canvas></div>
    <div class="chart-caption"><strong>Supaprastintas 24 mėn. FRE palyginimas.</strong> Jis leidžia palyginti sistemas nenaudojant litų ar eurų, todėl valiutos pakeitimas ir infliacija čia netrukdo. Tačiau grafikas lygina tik bazines išmokų normas: <strong>lubos, mokesčiai ir individualios taisyklės neįtrauktos</strong>.</div>
    <div class="alert alert-amber" style="margin-top:1.2rem"><strong>Kaip skaityti.</strong> Kuo daugiau „100 % pajamų mėnesių“, tuo dosnesnė bazinė išmokų schema. 2008 m. – 22,2; 2010 m. – 19,8; 2011 m. dvejų metų variantas – 13,2; dabartinės 24 mėn. schemos bazinės 45 % / 30 % normos – 9,0. <strong>Dabartinės sistemos 2 + 2 neperleidžiami mėnesiai po 78 % į šią bazinę juostą neįtraukti</strong>, todėl 9,0 nėra visos dabartinės sistemos galutinis FRE.</div>
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
