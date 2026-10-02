import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const responsePath = path.join(root, "research/raw/smart-continent-rent-proxy/response.txt");
const mappingPath = path.join(root, "data/municipality-county-map.csv");
const samplePath = path.join(root, "data/housing-rent-city-sample-2025-summary.csv");
const outCsv = path.join(root, "data/housing-rent-smart-continent-proxy-2024-diagnostic.csv");
const outQa = path.join(root, "research/smart-continent-rent-proxy-qa-2024.json");

// Captured from the public Power BI comparison matrix on 2026-10-02.
// It is retained only as a QA control. The parser below independently calculates
// the arithmetic mean of all 60 municipal BI_3 values.
const DASHBOARD_LITHUANIA_BI3_CAPTURE = 0.17216391698378458;
const INTERIM_PRESENTATION_PGS_2024_RENT_SHARE = 0.166;

function parseCsvLine(line) {
  const out=[]; let cur=""; let q=false;
  for (let i=0;i<line.length;i++) {
    const c=line[i];
    if (c === '"') {
      if (q && line[i+1] === '"') { cur+='"'; i++; }
      else q=!q;
    } else if (c === ',' && !q) { out.push(cur); cur=""; }
    else cur+=c;
  }
  out.push(cur); return out;
}
function readCsv(file) {
  const lines=fs.readFileSync(file,"utf8").trim().split(/\r?\n/);
  const h=parseCsvLine(lines[0]);
  return lines.slice(1).filter(Boolean).map(line => {
    const v=parseCsvLine(line); const o={};
    h.forEach((k,i)=>o[k]=v[i]??""); return o;
  });
}
function esc(v) {
  const s=String(v ?? "");
  return /[",\n]/.test(s) ? '"' + s.replaceAll('"','""') + '"' : s;
}
function num(v) {
  if (typeof v === "number") return v;
  if (typeof v !== "string") return Number(v);
  return Number(v.replace(/D$/,""));
}

const raw=JSON.parse(fs.readFileSync(responsePath,"utf8"));
const data=raw?.results?.[0]?.result?.data;
const dm=data?.dsr?.DS?.[0]?.PH?.[0]?.DM0;
const dict=data?.dsr?.DS?.[0]?.ValueDicts?.D0;
if (!Array.isArray(dm) || !Array.isArray(dict)) throw new Error("Unexpected Power BI response shape");
if (dm.length !== 60) throw new Error(`Expected 60 municipality rows, got ${dm.length}`);

const mapping=readCsv(mappingPath);
const countyByMunicipality=new Map(mapping.map(r=>[r.sav_pav,r.apskritis]));
if (countyByMunicipality.size !== 60) throw new Error("Municipality mapping must have 60 rows");

const rows=dm.map((r,i)=>{
  const c=r.C || [];
  if (c.length < 3) throw new Error(`Row ${i} missing expected values`);
  const key=c[0];
  const municipality = Number.isInteger(key) ? dict[key] : key;
  const bi3=num(c[1]);
  const net=num(c[2]);
  const county=countyByMunicipality.get(municipality);
  if (!county) throw new Error(`Missing county mapping for ${municipality}`);
  return {
    municipality,
    county,
    year:2024,
    bi_3_rent_share_of_net_wage:bi3,
    smart_continent_net_wage_eur_month:net,
    implied_rent_eur_month:bi3*net,
    reconstruction_formula:"BI_3 × Smart Continent net VDU",
    status:"diagnostic_proxy_not_publication_approved"
  };
});

const headers=Object.keys(rows[0]);
fs.writeFileSync(outCsv, headers.join(",")+"\n"+rows.map(r=>headers.map(h=>esc(r[h])).join(",")).join("\n")+"\n");

const sample=readCsv(samplePath);
const cityMap={
  "Alytus":"Alytaus m. sav.",
  "Marijampolė":"Marijampolės sav.",
  "Tauragė":"Tauragės r. sav.",
  "Telšiai":"Telšių r. sav.",
  "Utena":"Utenos r. sav."
};
const comparisons=sample.map(s=>{
  const municipality=cityMap[s.city];
  const x=rows.find(r=>r.municipality===municipality);
  const market=Number(s.rent_month_median_eur);
  const proxy=x?.implied_rent_eur_month ?? NaN;
  return {
    city:s.city,
    municipality,
    smart_continent_2024_implied_rent_eur_month:proxy,
    skelbiu_2025_one_room_sample_median_eur:market,
    skelbiu_sample_n:Number(s.sample_n),
    difference_eur:proxy-market,
    difference_pct:market ? (proxy-market)/market*100 : null,
    comparison_limit:"different year and housing basket; diagnostic only"
  };
});

const anchors=["Vilniaus m. sav.","Kauno m. sav.","Klaipėdos m. sav.","Alytaus m. sav.","Marijampolės sav.","Utenos r. sav.","Tauragės r. sav.","Telšių r. sav."];
const anchorRows=Object.fromEntries(anchors.map(m=>{
  const r=rows.find(x=>x.municipality===m);
  return [m,{bi_3:r.bi_3_rent_share_of_net_wage,net_wage_eur_month:r.smart_continent_net_wage_eur_month,implied_rent_eur_month:r.implied_rent_eur_month}];
}));

const rents=rows.map(r=>r.implied_rent_eur_month);
const bi3=rows.map(r=>r.bi_3_rent_share_of_net_wage);
const simpleMeanBi3=bi3.reduce((a,b)=>a+b,0)/bi3.length;
const dashboardMeanDiff=Math.abs(simpleMeanBi3-DASHBOARD_LITHUANIA_BI3_CAPTURE);

const lowRentDiagnostics=rows
  .filter(r=>r.implied_rent_eur_month < 100)
  .map(r=>({municipality:r.municipality,implied_rent_eur_month:r.implied_rent_eur_month,bi_3:r.bi_3_rent_share_of_net_wage}));

const qa={
  year:2024,
  municipality_count:rows.length,
  county_count:new Set(rows.map(r=>r.county)).size,
  formula:"implied_rent_eur_month = BI_3 × Smart Continent net VDU",
  semantic_evidence:{
    bi_3_label:"Vidutinė nuomos įmokų dalis nuo VDU, % (BI_3)",
    fact_table_columns:["BI_3","Vidutinis darbo užmokestis (neto)"],
    interim_presentation_national_fact:{
      value:INTERIM_PRESENTATION_PGS_2024_RENT_SHARE,
      label:"Pajamų dalis skiriama nuomai",
      source:"2024 Pajamų ir gyvenimo sąlygų tyrimas (PGS), household questionnaire",
      note:"Presentation gives a national 16.6% fact; it does not establish that 60 municipality BI_3 estimates are publication-grade municipal PGS estimates."
    },
    interpretation:"The arithmetic reconstruction is exact by indicator naming, but upstream municipal estimation method, housing basket, treatment of missing observations, and precision remain unverified."
  },
  aggregation_diagnostic:{
    simple_mean_of_60_municipality_bi_3:simpleMeanBi3,
    captured_dashboard_lithuania_bi_3:DASHBOARD_LITHUANIA_BI3_CAPTURE,
    absolute_difference:dashboardMeanDiff,
    matches_unweighted_municipality_mean:dashboardMeanDiff < 1e-12,
    implication:"The dashboard Lithuania BI_3 value is the unweighted arithmetic mean of 60 municipal BI_3 values, not the 16.6% national PGS fact shown in the interim presentation."
  },
  implied_rent_range_eur_month:{min:Math.min(...rents),max:Math.max(...rents)},
  low_implied_rent_diagnostic:{
    threshold_eur_month:100,
    threshold_is_not_a_quality_rule:true,
    municipality_count:lowRentDiagnostics.length,
    rows:lowRentDiagnostics,
    interpretation:"Descriptive warning only: multiple reconstructed values are implausibly low for a private market rent measure, so BI_3 must not be treated as a municipal market-rent series without methodology evidence."
  },
  anchors:anchorRows,
  external_market_sample_comparison:comparisons,
  hard_gate:{
    municipality_coverage_60_of_60:true,
    county_mapping_10_of_10:new Set(rows.map(r=>r.county)).size===10,
    upstream_municipal_rent_estimation_verified:false,
    housing_basket_verified:false,
    municipality_observation_counts_known:false,
    municipality_precision_or_uncertainty_known:false,
    county_aggregation_weight_available:false
  },
  verdict:"FAIL_FOR_MAIN_RENT_LAYER_DIAGNOSTIC_ONLY",
  publication_status:"FAIL_UNTIL_MUNICIPAL_METHOD_BASKET_AND_PRECISION_ARE_VERIFIED"
};
fs.writeFileSync(outQa, JSON.stringify(qa,null,2)+"\n");
console.log(JSON.stringify({outCsv,outQa,municipalities:rows.length,verdict:qa.verdict,simpleMeanBi3,dashboardMeanDiff},null,2));
