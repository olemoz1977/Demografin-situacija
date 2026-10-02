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
function mean(a){return a.reduce((x,y)=>x+y,0)/a.length}
function median(a){
  const x=[...a].sort((a,b)=>a-b),n=x.length;
  return n%2?x[(n-1)/2]:(x[n/2-1]+x[n/2])/2;
}
function esc(v){
  const s=String(v??"");
  return /[",\n]/.test(s)?'"'+s.replaceAll('"','""')+'"':s;
}

async function extractOneRoomMonthlyOffer(page,targetMonth){
  const tables=page.locator("table.flatsTable");
  const count=await tables.count();
  const candidates=[];
  for(let i=0;i<count;i++){
    const table=tables.nth(i);
    const data=await table.evaluate(el=>{
      const rows=[...el.querySelectorAll("tr")].map(tr=>
        [...tr.querySelectorAll("td,th")].map(td=>(td.textContent||"").replace(/\s+/g," ").trim())
      );
      return {
        className:el.className,
        rows
      };
    });
    const flat=data.rows.flat().join(" | ");
    if(/1\s*kamb\./i.test(flat) && /€/.test(flat)) candidates.push(data);
  }

  // obj_4 is the monthly rent-offer EUR table on Aruodas tendencies.
  // Keep a semantic fallback in case CSS class changes.
  let table=candidates.find(x=>/\bobj_4\b/.test(x.className||""));
  if(!table){
    table=candidates.find(x=>{
      const flat=x.rows.flat().join(" | ");
      return /Visi butai/i.test(flat) && !/€\/m²|€\/m2/i.test(flat);
    });
  }
  if(!table){
    throw new Error("No monthly rent-offer EUR table with 1 kamb. found");
  }

  const headerRow=table.rows.find(r=>r.some(x=>/20\d{2}-\d{2}/.test(x)));
  if(!headerRow) throw new Error("Month header row not found in monthly rent table");

  const monthCells=headerRow
    .map((text,index)=>({text,index}))
    .filter(x=>/^20\d{2}-\d{2}$/.test(x.text));

  const target=monthCells.find(x=>x.text===targetMonth);
  if(!target){
    throw new Error(
      "Target month "+targetMonth+" missing from table headers: "+
      JSON.stringify(monthCells.map(x=>x.text))
    );
  }

  const roomRow=table.rows.find(r=>r.some(x=>/^1\s*kamb\.$/i.test(x)));
  if(!roomRow) throw new Error("1 kamb. row missing");

  // Header and room rows share the same TD positions: room-name/blank column first,
  // then previous/current month values and optional change.
  const valueText=roomRow[target.index] ?? "";
  const value=euroNumber(valueText);
  if(!(value>=100 && value<=2000)){
    throw new Error(
      "Invalid target value for "+targetMonth+
      "; header="+JSON.stringify(headerRow)+
      "; row="+JSON.stringify(roomRow)
    );
  }

  return {
    value,
    headerRow,
    roomRow,
    tableClass:table.className,
  };
}

const browser=await chromium.launch({headless:true});
const context=await browser.newContext({locale:"lt-LT",viewport:{width:1280,height:1000}});
const rows=[];

for(const c of cities){
  for(let month=1;month<=12;month++){
    const mm=String(month).padStart(2,"0");
    const targetMonth=`2025-${mm}`;
    const reportMonth=month<=9?`2026-${mm}`:targetMonth;
    const url=`https://m.aruodas.lt/tendencijos/?district_id=${c.district_id}&month=${reportMonth}&tab_type=nuoma`;

    const page=await context.newPage();
    const response=await page.goto(url,{waitUntil:"domcontentloaded",timeout:90000});
    if(!response?.ok()) throw new Error(`HTTP ${response?.status()} ${url}`);
    await page.waitForTimeout(500);

    const parsed=await extractOneRoomMonthlyOffer(page,targetMonth);
    rows.push({
      city:c.city,
      district_id:c.district_id,
      target_month:targetMonth,
      source_report_month:reportMonth,
      one_room_asking_rent_eur_month:parsed.value,
      price_basis:"asking_offer",
      source:"Aruodas.lt tendencies",
      source_url:url,
      extraction_note:month<=9
        ?"hidden previous-year comparison column in 2026 same-month report"
        :"current column in direct 2025 archived report",
      table_class:parsed.tableClass,
    });

    console.log(`${c.city} ${targetMonth} = ${parsed.value} EUR via ${reportMonth}`);
    await page.close();
  }
}
await browser.close();

if(rows.length!==36) throw new Error(`Expected 36 rows, got ${rows.length}`);

const controls={
  "Kaunas|2025-01":361,
  "Klaipėda|2025-01":345,
  "Vilnius|2025-12":484,
  "Kaunas|2025-12":379,
  "Klaipėda|2025-12":371,
};
for(const [key,v] of Object.entries(controls)){
  const [city,target_month]=key.split("|");
  const r=rows.find(x=>x.city===city&&x.target_month===target_month);
  if(!r||r.one_room_asking_rent_eur_month!==v){
    throw new Error(
      `Control failed for ${key}: got ${r?.one_room_asking_rent_eur_month}, expected ${v}`
    );
  }
}

const headers=[
 "city","district_id","target_month","source_report_month","one_room_asking_rent_eur_month",
 "price_basis","source","source_url","extraction_note","table_class"
];
fs.writeFileSync(
  path.join(outDir,"aruodas-1room-rent-monthly-2025.csv"),
  headers.join(",")+"\n"+rows.map(r=>headers.map(h=>esc(r[h])).join(",")).join("\n")+"\n"
);

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
  basket:"1-room apartment monthly asking-rent offer average",
  method:"Jan-Sep 2025 recovered from hidden previous-year comparison columns in 2026 same-month reports; Oct-Dec from current columns in direct 2025 archived reports.",
  site_scope:"Aruodas tendency filtering is available for Vilnius, Kaunas and Klaipėda; this is a city validation benchmark, not a 10-county layer.",
  controls,
  summary,
  role:"PORTAL_VALIDATION_BENCHMARK_ONLY_NOT_COUNTY_LAYER"
};
fs.writeFileSync(
  path.join(outDir,"aruodas-1room-rent-2025-qa.json"),
  JSON.stringify(qa,null,2)+"\n"
);
console.log(JSON.stringify(qa,null,2));
