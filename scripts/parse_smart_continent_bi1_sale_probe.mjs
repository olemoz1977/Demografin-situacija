import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const responsePath=path.join(root,"research/raw/smart-continent-bi1-sale-probe/response.txt");
const mappingPath=path.join(root,"data/municipality-county-map.csv");
const officialPath=path.join(root,"research/raw/vda-sale-big-cities/vda-sale-big-cities-2024.csv");
const outCsv=path.join(root,"data/housing-sale-smart-continent-bi1-2024-diagnostic.csv");
const outQa=path.join(root,"research/smart-continent-bi1-sale-qa-2024.json");

function parseCsvLine(line){
  const out=[]; let cur=""; let q=false;
  for(let i=0;i<line.length;i++){
    const c=line[i];
    if(c==='"'){
      if(q && line[i+1]==='"'){cur+='"';i++;} else q=!q;
    } else if(c===','&&!q){out.push(cur);cur="";} else cur+=c;
  }
  out.push(cur); return out;
}
function readCsv(file){
  const lines=fs.readFileSync(file,"utf8").trim().split(/\r?\n/);
  const h=parseCsvLine(lines[0]);
  return lines.slice(1).filter(Boolean).map(line=>{
    const v=parseCsvLine(line); const o={};
    h.forEach((k,i)=>o[k]=v[i]??""); return o;
  });
}
function esc(v){
  const s=String(v??"");
  return /[",\n]/.test(s)?'"'+s.replaceAll('"','""')+'"':s;
}
function num(v){
  if(typeof v==="number") return v;
  return Number(String(v).replace(/D$/,""));
}
function pct(a,b){ return b ? (a-b)/b*100 : null; }

const raw=JSON.parse(fs.readFileSync(responsePath,"utf8"));
const data=raw?.results?.[0]?.result?.data;
const ds=data?.dsr?.DS?.[0];
const dm=ds?.PH?.[0]?.DM0;
const dict=ds?.ValueDicts?.D0;
if(!Array.isArray(dm)||!Array.isArray(dict)) throw new Error("Unexpected Power BI response shape");
if(dm.length!==60) throw new Error(`Expected 60 municipality rows, got ${dm.length}`);

const mapping=readCsv(mappingPath);
const countyByMunicipality=new Map(mapping.map(r=>[r.sav_pav,r.apskritis]));
if(countyByMunicipality.size!==60) throw new Error("Municipality mapping must have 60 rows");

const rows=dm.map((r,i)=>{
  const c=r.C||[];
  if(c.length<4) throw new Error(`Row ${i} missing expected values: ${JSON.stringify(r)}`);
  const key=c[0];
  const municipality=Number.isInteger(key)?dict[key]:key;
  const bi1=num(c[1]);
  const genericPrice=num(c[2]);
  const net=num(c[3]);
  const county=countyByMunicipality.get(municipality);
  if(!county) throw new Error(`Missing county mapping for ${municipality}`);
  return {
    municipality,county,year:2024,
    bi_1:bi1,
    smart_continent_generic_housing_eur_m2:genericPrice,
    smart_continent_net_wage_eur_month:net,
    generic_price_to_monthly_net_ratio:genericPrice/net,
    generic_price_to_annual_net_ratio:genericPrice/(net*12),
    status:"diagnostic_only"
  };
});

const h=Object.keys(rows[0]);
fs.writeFileSync(outCsv,h.join(",")+"\n"+rows.map(r=>h.map(k=>esc(r[k])).join(",")).join("\n")+"\n");

const official=readCsv(officialPath);
const comparisons=official.map(o=>{
  const x=rows.find(r=>r.municipality===o.municipality);
  if(!x) throw new Error(`No Smart Continent row for official city ${o.municipality}`);
  const off=Number(o.price_eur_m2);
  return {
    municipality:o.municipality,
    official_vda_apartment_eur_m2:off,
    smart_continent_generic_housing_eur_m2:x.smart_continent_generic_housing_eur_m2,
    bi_1:x.bi_1,
    net_wage_eur_month:x.smart_continent_net_wage_eur_month,
    generic_vs_official_difference_pct:pct(x.smart_continent_generic_housing_eur_m2,off)
  };
});

function maxAbsDiff(fn){
  return Math.max(...rows.map(r=>Math.abs(r.bi_1-fn(r))));
}
const candidateIdentities=[
  {name:"generic_price / monthly_net",max_abs_diff:maxAbsDiff(r=>r.smart_continent_generic_housing_eur_m2/r.smart_continent_net_wage_eur_month)},
  {name:"generic_price / annual_net",max_abs_diff:maxAbsDiff(r=>r.smart_continent_generic_housing_eur_m2/(r.smart_continent_net_wage_eur_month*12))},
  {name:"generic_price * 100 / monthly_net",max_abs_diff:maxAbsDiff(r=>100*r.smart_continent_generic_housing_eur_m2/r.smart_continent_net_wage_eur_month)}
].sort((a,b)=>a.max_abs_diff-b.max_abs_diff);

const best=candidateIdentities[0];
const qa={
  year:2024,
  municipality_count:rows.length,
  county_count:new Set(rows.map(r=>r.county)).size,
  queried_columns:[
    "FactBPI.BI_1",
    "FactBPI.Vid būsto sandorio  kaina, Eur/kv.m.",
    "FactBPI.Vidutinis darbo užmokestis (neto)"
  ],
  bi1_candidate_identity_tests:candidateIdentities,
  exact_generic_price_identity:best.max_abs_diff<1e-10?best.name:null,
  official_vda_apartment_benchmark_comparison:comparisons,
  interpretation:best.max_abs_diff<1e-10
    ? "BI_1 is an exact arithmetic transform of the Smart Continent generic housing price and net wage. It does not reveal an independent apartment-only price series."
    : "BI_1 is not explained by the tested simple transforms; further source-method inspection is required before any apartment-price inference.",
  hard_gate:{
    municipality_coverage_60_of_60:true,
    county_mapping_10_of_10:new Set(rows.map(r=>r.county)).size===10,
    apartment_only_semantics_verified:false,
    independent_apartment_price_signal:best.max_abs_diff<1e-10?false:null
  },
  verdict:best.max_abs_diff<1e-10
    ? "FAIL_FOR_APARTMENT_SALE_RECONSTRUCTION_REDUNDANT_WITH_GENERIC_PRICE"
    : "UNRESOLVED_REQUIRES_METHOD_FORMULA_AUDIT",
  publication_status:"DIAGNOSTIC_ONLY"
};
fs.writeFileSync(outQa,JSON.stringify(qa,null,2)+"\n");
console.log(JSON.stringify({outCsv,outQa,verdict:qa.verdict,best_identity:best,comparisons},null,2));
