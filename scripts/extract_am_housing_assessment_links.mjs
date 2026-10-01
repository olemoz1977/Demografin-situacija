import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const url = "https://am.lrv.lt/lt/veiklos-sritys-1/busto-prieinamumas/busto-prieinamumo-lietuvoje-didinimo-galimybiu-vertinimas/";
const outDir = "research/raw/am-housing-assessment-links";
fs.mkdirSync(outDir, {recursive:true});

const browser = await chromium.launch({headless:true});
const page = await browser.newPage({locale:"lt-LT"});
await page.goto(url,{waitUntil:"domcontentloaded",timeout:120000});
await page.waitForTimeout(5000);
const links = await page.locator("a").evaluateAll(as => as.map(a => ({
  text:(a.innerText||a.textContent||"").trim(),
  href:a.href,
  title:a.getAttribute("title")
})).filter(x => x.href));
const relevant = links.filter(x => /vertinimo|pried|santrauk|strateg|pristat|\.pdf|\.docx|\.xlsx/i.test((x.text||"")+" "+x.href+" "+(x.title||"")));
const bodyText=(await page.locator("body").innerText()).slice(0,200000);
fs.writeFileSync(path.join(outDir,"links.json"), JSON.stringify({
  fetchedAt:new Date().toISOString(),url:page.url(),title:await page.title(),
  links:relevant,bodyText
}, null, 2)+"\n");
console.log(JSON.stringify({url:page.url(),title:await page.title(),count:relevant.length,links:relevant}, null, 2));
await browser.close();
