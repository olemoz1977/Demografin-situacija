import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const outDir="research/raw/aruodas-hidden-history-probe";
fs.mkdirSync(outDir,{recursive:true});

const cases=[
  {city:"Kaunas",district_id:6,report:"2026-01",known_prior:"361"},
  {city:"Klaipėda",district_id:7,report:"2026-01",known_prior:"345"},
  {city:"Vilnius",district_id:1,report:"2026-01",known_prior:null},
];

function safeName(s){return s.replace(/[^a-z0-9_-]+/gi,"_").slice(0,120)}
function contexts(text,needle,span=600){
  const out=[]; let i=0;
  while((i=text.indexOf(needle,i))>=0 && out.length<20){
    out.push(text.slice(Math.max(0,i-span),Math.min(text.length,i+needle.length+span)));
    i+=needle.length;
  }
  return out;
}

const browser=await chromium.launch({headless:true});
const context=await browser.newContext({locale:"lt-LT",viewport:{width:1440,height:1000}});

const summary=[];
for(const c of cases){
  const page=await context.newPage();
  const captured=[];
  page.on("response",async res=>{
    const req=res.request();
    const rt=req.resourceType();
    if(!["document","script","xhr","fetch"].includes(rt)) return;
    try{
      const ct=(res.headers()["content-type"]||"").toLowerCase();
      if(!/(text|json|javascript|html|xml)/.test(ct)) return;
      const text=await res.text();
      const hitYear=text.includes("2025-01");
      const hitKnown=c.known_prior ? new RegExp(`(^|[^0-9])${c.known_prior}([^0-9]|$)`).test(text) : false;
      const hitLabels=/1\s*kamb|nuomojamo buto pasiūlos kaina|Pokytis per metus/i.test(text);
      if(hitYear||hitKnown||hitLabels){
        captured.push({
          url:res.url(),
          status:res.status(),
          resourceType:rt,
          contentType:ct,
          bytes:Buffer.byteLength(text),
          hitYear,
          hitKnown,
          hitLabels,
          yearContexts:hitYear?contexts(text,"2025-01",900):[],
          knownContexts:(hitKnown&&c.known_prior)?contexts(text,c.known_prior,900):[],
          labelContexts:hitLabels?contexts(text,"1 kamb",900):[],
        });
      }
    }catch{}
  });

  const url=`https://m.aruodas.lt/tendencijos/?district_id=${c.district_id}&month=${c.report}&tab_type=nuoma`;
  const resp=await page.goto(url,{waitUntil:"networkidle",timeout:120000});
  await page.waitForTimeout(2500);
  const html=await page.content();
  const body=await page.locator("body").innerText();

  const scripts=await page.locator("script").evaluateAll(nodes=>nodes.map((n,i)=>({
    i,
    src:n.src||null,
    type:n.type||null,
    text:n.textContent||""
  })));

  const scriptHits=scripts.filter(s=>{
    const t=s.text||"";
    return t.includes("2025-01") ||
      (c.known_prior && new RegExp(`(^|[^0-9])${c.known_prior}([^0-9]|$)`).test(t)) ||
      /1\s*kamb|nuomojamo buto pasiūlos kaina|Pokytis per metus/i.test(t);
  }).map(s=>({
    i:s.i,src:s.src,type:s.type,bytes:Buffer.byteLength(s.text||""),
    yearContexts:contexts(s.text||"","2025-01",900),
    knownContexts:c.known_prior?contexts(s.text||"",c.known_prior,900):[],
    labelContexts:contexts(s.text||"","1 kamb",900)
  }));

  const entry={
    city:c.city,
    url,
    http_status:resp?.status()??null,
    html_bytes:Buffer.byteLength(html),
    body_bytes:Buffer.byteLength(body),
    html_has_2025_01:html.includes("2025-01"),
    html_has_known_prior:c.known_prior?new RegExp(`(^|[^0-9])${c.known_prior}([^0-9]|$)`).test(html):null,
    html_year_contexts:contexts(html,"2025-01",1000),
    html_known_contexts:c.known_prior?contexts(html,c.known_prior,1000):[],
    script_hits:scriptHits,
    response_hits:captured,
  };
  summary.push(entry);

  fs.writeFileSync(path.join(outDir,`${safeName(c.city)}-2026-01.html`),html);
  fs.writeFileSync(path.join(outDir,`${safeName(c.city)}-2026-01-body.txt`),body);
  await page.close();
}

await browser.close();

fs.writeFileSync(path.join(outDir,"summary.json"),JSON.stringify(summary,null,2)+"\n");
console.log(JSON.stringify(summary.map(x=>({
  city:x.city,
  http_status:x.http_status,
  html_has_2025_01:x.html_has_2025_01,
  html_has_known_prior:x.html_has_known_prior,
  script_hit_count:x.script_hits.length,
  response_hit_count:x.response_hits.length,
  response_urls:x.response_hits.map(y=>y.url)
})),null,2));
