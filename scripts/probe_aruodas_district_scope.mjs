import fs from "node:fs";
import path from "node:path";

const outDir="research/raw/aruodas-district-scope-probe";
fs.mkdirSync(outDir,{recursive:true});

async function get(url){
  const r=await fetch(url,{headers:{"user-agent":"Demografin-situacija-research/1.0","accept-language":"lt-LT,lt;q=0.9"},redirect:"follow"});
  const text=await r.text();
  return {status:r.status,url:r.url,text};
}

const search=await get("https://m.aruodas.lt/butu-nuoma/");
fs.writeFileSync(path.join(outDir,"rental-search.html"),search.text);

const targetNames=["Vilnius","Kaunas","Klaipėda","Šiauliai","Panevėžys","Alytus","Marijampolė","Utena","Telšiai","Tauragė"];
const contexts={};
for(const name of targetNames){
  const arr=[]; let i=0;
  while((i=search.text.indexOf(name,i))>=0 && arr.length<15){
    arr.push(search.text.slice(Math.max(0,i-500),Math.min(search.text.length,i+name.length+700)).replace(/\s+/g," "));
    i+=name.length;
  }
  contexts[name]=arr;
}

const idCandidates=new Map();
for(const [name,arr] of Object.entries(contexts)){
  const ids=new Set();
  for(const ctx of arr){
    for(const re of [
      /district_id(?:%5B\d*%5D|\[\d*\]|)=([0-9]+)/gi,
      /district_id[^0-9]{0,20}([0-9]+)/gi,
      /value=["\']([0-9]+)["\'][^>]{0,300}>[^<]*$/gi
    ]){
      for(const m of ctx.matchAll(re)) ids.add(Number(m[1]));
    }
  }
  idCandidates.set(name,[...ids]);
}

// Also inspect any explicit district labels tied to numeric values.
const labelPairs=[];
for(const m of search.text.matchAll(/<(?:option|li|a|label)[^>]{0,500}>([\s\S]{0,300}?)<\/(?:option|li|a|label)>/gi)){
  const raw=m[0], label=m[1].replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
  if(!targetNames.some(n=>label.includes(n))) continue;
  const nums=[...raw.matchAll(/(?:value|district_id)[^0-9]{0,20}([0-9]+)/gi)].map(x=>Number(x[1]));
  if(nums.length) labelPairs.push({label,nums,raw:raw.slice(0,900)});
}

const candidateIds=new Set([1,6,7]);
for(const ids of idCandidates.values()) for(const id of ids) if(id>0&&id<500) candidateIds.add(id);
for(const p of labelPairs) for(const id of p.nums) if(id>0&&id<500) candidateIds.add(id);

function activeCity(html){
  const m=html.match(/class=["\'][^"\']*round-btn active[^"\']*["\'][^>]*>([^<]+)<\/a>/i);
  return m?m[1].replace(/\s+/g," ").trim():null;
}
function oneRoom(html){
  const block=html.match(/<table[^>]*class=["\'][^"\']*obj_4[^"\']*["\'][\s\S]*?<\/table>/i)?.[0]||"";
  const row=block.match(/<tr[^>]*>[\s\S]*?1\s*kamb\.[\s\S]*?<\/tr>/i)?.[0]||"";
  const vals=[...row.matchAll(/([0-9][0-9\s]*)\s*€/g)].map(x=>Number(x[1].replace(/\s/g,"")));
  return vals;
}

const probes=[];
for(const id of [...candidateIds].sort((a,b)=>a-b)){
  const q=await get(`https://m.aruodas.lt/tendencijos/?district_id=${id}&month=2026-01&tab_type=nuoma`);
  probes.push({id,status:q.status,final_url:q.url,active_city:activeCity(q.text),one_room_values:oneRoom(q.text),bytes:Buffer.byteLength(q.text)});
}

const out={
  search_status:search.status, search_final_url:search.url, search_bytes:Buffer.byteLength(search.text),
  target_contexts:contexts, id_candidates:Object.fromEntries(idCandidates), label_pairs:labelPairs, probes
};
fs.writeFileSync(path.join(outDir,"summary.json"),JSON.stringify(out,null,2)+"\n");
console.log(JSON.stringify({id_candidates:out.id_candidates,label_pairs:labelPairs.map(x=>({label:x.label,nums:x.nums})),probes},null,2));