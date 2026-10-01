import fs from "node:fs";
import path from "node:path";

const url = "https://am.lrv.lt/lt/veiklos-sritys-1/busto-prieinamumas/busto-prieinamumo-lietuvoje-didinimo-galimybiu-vertinimas/";
const outDir = "research/raw/am-housing-assessment-links";
fs.mkdirSync(outDir, {recursive:true});

const r = await fetch(url, {headers: {"user-agent":"Mozilla/5.0 source-audit/1.0"}});
const html = await r.text();
if (!r.ok) throw new Error(`HTTP ${r.status}`);

const hrefs = [...html.matchAll(/href\s*=\s*["']([^"']+)["']/gi)].map(m => m[1]);
const decoded = hrefs.map(h => h.replaceAll("&amp;","&"));
const interesting = [...new Set(decoded.filter(h => /busto|vertin|pried|\.pdf|\.docx|\.xlsx|attachment|media|file/i.test(h)))];
const abs = interesting.map(h => {
  try { return new URL(h, url).href; } catch { return h; }
});
fs.writeFileSync(path.join(outDir,"links.json"), JSON.stringify({fetchedAt:new Date().toISOString(),url,status:r.status,htmlBytes:html.length,links:abs}, null, 2)+"\n");
console.log(JSON.stringify({status:r.status,htmlBytes:html.length,count:abs.length,links:abs}, null, 2));
