"use strict";
const fs=require("fs");
const {chromium}=require("playwright");
const register=JSON.parse(fs.readFileSync("data/research-findings-register.json","utf8"));
const published=register.findings.filter(f=>f.status.startsWith("PUBLISHED_"));
const checks=[
  [
    "OVERVIEW-LATEST-2025-01",
    "overview",
    "#apzvalga",
    "17 478"
  ],
  [
    "OVERVIEW-TFR-NOWCAST-2025-01",
    "overview",
    "#apzvalga .lead",
    "2025P TFR = 1,03"
  ],
  [
    "FERTILITY-TFR-EU-2024-01",
    "fertility",
    "#tfr",
    "trečias žemiausias Europos Sąjungoje"
  ],
  [
    "FERTILITY-COUNTIES-2024-01",
    "fertility",
    "#regionai",
    "2024 m. visose 10 Lietuvos apskričių TFR"
  ],
  [
    "FERTILITY-FIRST-BIRTH-AGE-2024-01",
    "fertility",
    "#amzius",
    "pirmąjį vaiką gimdžiusių moterų vidutinis amžius Lietuvoje – 28,7"
  ],
  [
    "EU-HH-2025-01",
    "population",
    "#populationHouseholdStructure",
    "55,7 % Lietuvos privačių namų ūkių"
  ],
  [
    "POPULATION-SEX-AGE-2025-01",
    "population",
    "#lytis-amzius",
    "20,9 %"
  ],
  [
    "POPULATION-REPRO-SEX-2025-01",
    "population",
    "#reproLatestNote",
    "883,7"
  ],
  [
    "POPULATION-BIRTH-COHORTS-2025-01",
    "population",
    "#sexBirthCohortBlock",
    "942–950 mergaičių 1 000 berniukų"
  ],
  [
    "MIGRATION-FLOW-2025-01",
    "migration",
    "#gyventojai",
    "44 705"
  ],
  [
    "MIGRATION-FOREIGN-CITIZENS-2025-01",
    "migration",
    "#uzsienieciai",
    "217 067 užsienio piliečiai"
  ],
  [
    "MIGRATION-SEX-AGE-01",
    "migration",
    "#migrationSexBlock",
    "25–44 m. neto tarptautinė migracija pagal lytį"
  ],
  [
    "FAMILY-MARRIAGES-2024-01",
    "family",
    "#santuokos",
    "12 890 santuokų ir 7 127 ištuokos"
  ],
  [
    "FAMILY-LEAVE-POLICY-2007-2012-01",
    "family",
    "#parama-istorija",
    "2007–2012: labai dosnios vaiko priežiūros išmokos"
  ],
  [
    "FAMILY-LEAVE-FRE-01",
    "family",
    "#policyFreBlock",
    "22,2 pilno tarifo mėnesio"
  ],
  [
    "FAMILY-CHILDCARE-ACCESS-2025-01",
    "family",
    "#infrastruktura",
    "1 656"
  ],
  [
    "FAMILY-DIGITAL-HYPOTHESES-01",
    "family",
    "#skaitmena",
    "Skaitmeninio naudojimo kontekstas"
  ],
  [
    "HOUSING-CITY-SALES-2025-01",
    "housing",
    "#housingMarketResearch",
    "VDA: daugiabučių butų pardavimo kainos šešiuose miestuose"
  ],
  [
    "HOUSING-RENT-SALE-2025-12-01",
    "housing",
    "#housingMarketResearch",
    "2025 m. gruodžio nuomos ir pirkimo segmentai"
  ],
  [
    "HOUSING-LOAN-2025-01",
    "housing",
    "#housingMarketResearch",
    "2025 m. istoriniame scenarijuje taikomas įprastas"
  ],
  [
    "HOUSING-SUBSIDY-2019-2025-01",
    "housing",
    "#housingAffordability",
    "Kaip keitėsi jaunų šeimų regioninės paskatos mastas"
  ],
  [
    "HOUSING-QUEUE-2025-01",
    "housing",
    "#housingAffordability",
    "1 700 ankstesnių metų prašymų"
  ],
  [
    "HOUSING-SUBSIDY-SCHEMES-2025-01",
    "housing",
    "#housingAffordability",
    "1 039 pagrindinės paramos gavėjai"
  ],
  [
    "FUTURE-AGEING-REPORT-2040-01",
    "future",
    "#scenarijai",
    "2022 m. Lietuvos senatvės priklausomybės rodiklis"
  ],
  [
    "FUTURE-ADAPTATION-SCENARIOS-01",
    "future",
    "#scenarijai",
    "Trys Lietuvos scenarijai"
  ],
  [
    "METHODS-STATUSES-2025-01",
    "methods",
    "#metodika",
    "2025P = Eurostat projekcinis TFR"
  ],
  [
    "METHODS-DENOMINATORS-01",
    "methods",
    "#metodika",
    "Koreliacija ≠ priežastis"
  ]
];
const checkMap=new Map(checks.map(([id,view,selector,phrase])=>[id,{view,selector,phrase}]));
const ids=new Set(published.map(f=>f.id));
if(ids.size!==published.length||checkMap.size!==checks.length)throw Error("Duplicate published/check IDs");
const unknown=checks.filter(([id])=>!ids.has(id)).map(([id])=>id);
const omitted=published.filter(f=>!checkMap.has(f.id)).map(f=>f.id);
if(unknown.length||omitted.length)throw Error(JSON.stringify({unknown,omitted}));
for(const f of published)
  if(checkMap.get(f.id).view!==f.publication.module)
    throw Error(f.id+": registered publication.module differs from browser route");
const normalize=s=>s.replace(/[\u00a0\u202f\s]+/g," ").trim();
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  for(const [screen,viewport] of [["desktop",{width:1365,height:800}],["mobile",{width:390,height:844}]]){
   const page=await browser.newPage({viewport});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   let done=0;
   for(const view of ["overview","fertility","population","migration","family","housing","future","methods"]){
    await page.goto("http://127.0.0.1:8765/?view="+view,{waitUntil:"networkidle"});
    const relevant=checks.filter(row=>row[1]===view),failures=[];
    for(const [id,,selector,expected] of relevant){
     try{
      await page.waitForFunction(({selector,expected})=>{
        const el=document.querySelector(selector);
        if(!el||!el.getClientRects().length||getComputedStyle(el).display==="none")return false;
        return el.innerText.replace(/[\u00a0\u202f\s]+/g," ").trim().includes(expected);
      },{selector,expected:normalize(expected)},{timeout:12000});
      done++;
     }catch(error){
       const detail=await page.evaluate(selector=>{
         const el=document.querySelector(selector);
         return {exists:!!el,visible:!!el?.getClientRects().length,
           text:el?.innerText?.replace(/[\u00a0\u202f\s]+/g," ").slice(0,260)};
       },selector);
       failures.push({id,selector,expected,detail});
     }
    }
    const geometry=await page.evaluate(()=>({
      overflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),
      visibleSections:[...document.querySelectorAll("body > section")]
       .filter(s=>getComputedStyle(s).display!=="none").map(s=>s.id)
    }));
    console.log("VISIBILITY",screen,view,(relevant.length-failures.length)+"/"+relevant.length,JSON.stringify(geometry));
    if(failures.length)throw Error(screen+"/"+view+": "+JSON.stringify(failures));
    if(geometry.overflow>3)throw Error(screen+"/"+view+" horizontal overflow "+geometry.overflow);
    if(view!=="overview"&&geometry.visibleSections.includes("researchHome"))
      throw Error(screen+"/"+view+" unexpected Overview");
    if(errors.length)throw Error(screen+"/"+view+" JS errors: "+errors.join(" | "));
   }
   await page.goto("http://127.0.0.1:8765/?view=all",{waitUntil:"networkidle"});
   const archive=await page.evaluate(()=>({
     sections:[...document.querySelectorAll("body > section")].filter(s=>getComputedStyle(s).display!=="none").length,
     housing:!!document.querySelector("#housingAffordability"),
     population:!!document.querySelector("#populationHouseholdStructure")
   }));
   if(archive.sections<15||!archive.housing||!archive.population)
     throw Error(screen+" all-route regression "+JSON.stringify(archive));
   console.log("PASS",screen,done+"/"+published.length,"published findings, 8 modules and archive");
   await page.close();
  }
 }finally{await browser.close();}
 console.log("PASS: all",published.length,"registered published findings in intended sections, desktop and mobile");
})().catch(error=>{console.error(error);process.exit(1);});
