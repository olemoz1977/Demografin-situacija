import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const outDir="research/raw/aruodas-rent-benchmark-2025";
fs.mkdirSync(outDir,{recursive:true});

const cities=[
  {city:"Vilnius",district_id:1},
  {city:"Kaunas",district_id:6},
  {city:"Klaipėda",district_id:7},
];

function euroNumber(s){
  const m=String(s).match(/([0-9][0-9\s]*)\s*€/);
  return m ? Number(m[1].replace(/\s/g,"")) : null;
}

function extractTargetMonth(text,targetMonth,reportMonth){
  const lines=text.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
  const heading=lines.findIndex(x=>/Vidutinė nuomojamo buto pasiūlos kaina,\s*€/i.test(x));
  if(heading<0) throw new Error(`price block not found: target=${targetMonth} report=${reportMonth}`);

  const one=lines.findIndex((x,i)=>i>heading && /^1\s*kamb\.$/i.test(x));
  if(one<0) throw new Error(`1 kamb row not found: target=${targetMonth} report=${reportMonth}`);

  const before=lines.slice(heading,one);
  const months=[];
  for(const line of before){
    for(const m of line.matchAll(/20\d{2}-\d{2}/g)){
      if(!months.includes(m[0])) months.push(m[0]);
    }
  }
  const targetIndex=months.indexOf(targetMonth);
  if(targetIndex<0){
    throw new Error(`target month ${targetMonth} absent; months=${JSON.stringify(months)}`);
  }

  const values=[];
  const evidence=[lines[one]];
  for(let i=one+1;i<Math.min(lines.length,one+10);i++){
    const line=lines[i];
    if(/^[23]\s*kamb\.$/i.test(line)) break;
    evidence.push(line);
    const v=euroNumber(line);
    if(v!==null) values.push(v);
  }
  if(values.length<=targetIndex){
    throw new Error(`not enough EUR values target=${targetMonth}; months=${months}; values=${values}; evidence=${evidence.join(" | ")}`);
  }
  const value=values[targetIndex];
  if(!(value>=100 && value<=2000)){
    throw new Error(`implausible one-room rent ${value} for ${targetMonth}`);
  }
  return {value,months,values,evidence:evidence.join(" | ").slice(0,700)};
}

function mean(a){return a.reduce((x,y)=>x+y,0)/a.length}
function median(a){
  const x=[...a].sort((a,b)=>a-b),n=x.length;
  return n%2?x[(n-1)/2]:(x[n/2-1]+x[n/2])/2;
}
function esc(v){
  const s=String(v??"");
  return /[",\n]/.test(s)?'"'+s.replaceAll('"','""')+'"':s;
}

const browser=await chromium.launch({headless:true});
const context=await browser.newContext({locale:"lt-LT",viewport:{width:1280,height:1000}});
const rows=[];

for(const c of cities){
  for(let month=1;month<=12;month++){
    const mm=String(month).padStart(2,"0");
    const targetMonth=`2025-${mm}`;
    // Jan-Sep: 2026 report exposes the prior-year 2025 value.
    // Oct-Dec: archived 2025 report is directly available.
    const reportMonth=month<=9?`2026-${mm}`:targetMonth;
    const url=`https://m.aruodas.lt/tendencijos/?district_id=${c.district_id}&month=${reportMonth}&tab_type=nuoma`;
    const page=await context.newPage();
    const response=await page.goto(url,{waitUntil:"domcontentloaded",timeout:90000});
    if(!response?.ok()) throw new Error(`HTTP ${response?.status()} ${url}`);
    await page.waitForTimeout(700);
    const text=await page.locator("body").innerText();
    const parsed=extractTargetMonth(text,targetMonth,reportMonth);
    rows.push({
      city:c.city,
      district_id:c.district_id,
      target_month:targetMonth,
      source_report_month:reportMonth,
      one_room_asking_rent_eur_month:parsed.value,
      price_basis:"asking_offer",
      source:"Aruodas.lt tendencies",
      source_url:url,
      extraction_note:month<=9?"prior-year comparison value in 2026 report":"direct 2025 archived report",
      evidence:parsed.evidence
    });
    console.log(`${c.city} ${targetMonth} = ${parsed.value} EUR via ${reportMonth}`);
    await page.close();
  }
}
await browser.close();

if(rows.length!==36) throw new Error(`expected 36 rows, got ${rows.length}`);

const expectedDec={Vilnius:484,Kaunas:379,Klaipėda:371};
for(const [city,v] of Object.entries(expectedDec)){
  const r=rows.find(x=>x.city===city&&x.target_month==="2025-12");
  if(!r||r.one_room_asking_rent_eur_month!==v){
    throw new Error(`December control failed for ${city}: got ${r?.one_room_asking_rent_eur_month}, expected ${v}`);
  }
}

const headers=[
 "city","district_id","target_month","source_report_month","one_room_asking_rent_eur_month",
 "price_basis","source","source_url","extraction_note"
];
fs.writeFileSync(path.join(outDir,"aruodas-1room-rent-monthly-2025.csv"),
  headers.join(",")+"\n"+rows.map(r=>headers.map(h=>esc(r[h])).join(",")).join("\n")+"\n");

const summary={};
for(const c of cities){
  const rr=rows.filter(r=>r.city===c.city);
  const vals=rr.map(r=>r.one_room_asking_rent_eur_month);
  summary[c.city]={
    months_n:rr.length,
    mean_eur_month:Number(mean(vals).toFixed(2)),
    median_eur_month:Number(median(vals).toFixed(2)),
    min_eur_month:Math.min(...vals),
    max_eur_month:Math.max(...vals),
    jan_2025_eur_month:rr.find(r=>r.target_month==="2025-01").one_room_asking_rent_eur_month,
    dec_2025_eur_month:rr.find(r=>r.target_month==="2025-12").one_room_asking_rent_eur_month,
  };
}
const qa={
  year:2025,
  city_count:3,
  row_count:rows.length,
  cities:cities.map(x=>x.city),
  basket:"1-room apartment asking-rent monthly offer average",
  method:"Jan-Sep 2025 recovered from same-month 2026 year-over-year comparison reports; Oct-Dec from direct 2025 archived reports.",
  site_scope:"Aruodas tendency page states that filtering is available only for Vilnius, Kaunas and Klaipėda.",
  role:"OFFICIAL_PORTAL_VALIDATION_BENCHMARK_ONLY_NOT_COUNTY_LAYER",
  december_controls:expectedDec,
  summary
};
fs.writeFileSync(path.join(outDir,"aruodas-1room-rent-2025-qa.json"),JSON.stringify(qa,null,2)+"\n");
console.log(JSON.stringify(qa,null,2));
