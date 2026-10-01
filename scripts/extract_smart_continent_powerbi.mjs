import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const reportUrl = "https://app.powerbi.com/view?r=eyJrIjoiYzhmZGZlMjYtM2UwMi00ODc1LWJiODMtYWZjY2JkYTUxZmE1IiwidCI6ImUwM2ViNjEzLTMyY2ItNDBlZi04MGQ2LTY5YmYwNTBmZDc5OCIsImMiOjl9";
const outDir = process.env.PBI_OUT_DIR || "research/raw/smart-continent-powerbi/latest";
fs.mkdirSync(outDir, { recursive: true });

const network = [];
const requests = [];
let totalBodyBytes = 0;
const maxBodyBytes = 30 * 1024 * 1024;

function relevant(url) {
  return /querydata|modelsAndExploration|conceptualschema|metadata|explore|bootstrap|report|public/i.test(url);
}
function safeName(s) {
  return s.replace(/[^a-z0-9._-]+/gi, "_").slice(0, 140);
}
function write(name, data) {
  fs.writeFileSync(path.join(outDir, name), data);
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1600, height: 1000 },
  locale: "lt-LT"
});
const page = await context.newPage();

page.on("request", req => {
  const url = req.url();
  if (!relevant(url)) return;
  const post = req.postData();
  requests.push({
    at: new Date().toISOString(),
    method: req.method(),
    url,
    resourceType: req.resourceType(),
    postData: post && post.length <= 2_000_000 ? post : post ? "__TRUNCATED__" : null
  });
});

page.on("response", async res => {
  const url = res.url();
  if (!relevant(url)) return;
  const headers = await res.allHeaders().catch(() => ({}));
  const ct = headers["content-type"] || "";
  const rec = {
    at: new Date().toISOString(),
    status: res.status(),
    url,
    contentType: ct,
    bodyFile: null,
    bodyBytes: null
  };
  try {
    if (/json|text|javascript|octet-stream/i.test(ct) && totalBodyBytes < maxBodyBytes) {
      const body = await res.body();
      rec.bodyBytes = body.length;
      if (body.length <= 8 * 1024 * 1024 && totalBodyBytes + body.length <= maxBodyBytes) {
        const idx = String(network.length + 1).padStart(3, "0");
        const ext = /json/i.test(ct) ? "json" : "txt";
        const filename = `response-${idx}-${safeName(new URL(url).pathname.split("/").pop() || "body")}.${ext}`;
        fs.writeFileSync(path.join(outDir, filename), body);
        rec.bodyFile = filename;
        totalBodyBytes += body.length;
      }
    }
  } catch (e) {
    rec.bodyError = String(e);
  }
  network.push(rec);
});

const consoleLines = [];
page.on("console", msg => consoleLines.push(`[${msg.type()}] ${msg.text()}`));
page.on("pageerror", err => consoleLines.push(`[pageerror] ${String(err)}`));

async function snapshot(label) {
  const info = { label, url: page.url(), title: await page.title().catch(() => "") , frames: [] };
  for (const [i, frame] of page.frames().entries()) {
    const f = { index: i, url: frame.url(), text: "", controls: [] };
    try {
      f.text = (await frame.locator("body").innerText({ timeout: 5000 })).slice(0, 500000);
    } catch {}
    try {
      f.controls = await frame.locator("button,[role=button],a,[aria-label],[title]").evaluateAll(els =>
        els.slice(0, 1000).map((el, idx) => ({
          idx,
          tag: el.tagName,
          text: (el.innerText || el.textContent || "").trim().slice(0, 300),
          aria: el.getAttribute("aria-label"),
          title: el.getAttribute("title"),
          role: el.getAttribute("role")
        }))
      );
    } catch {}
    info.frames.push(f);
  }
  write(`${label}.json`, JSON.stringify(info, null, 2));
  await page.screenshot({ path: path.join(outDir, `${label}.png`), fullPage: true }).catch(() => {});
  return info;
}

async function clickNextOnce() {
  const patterns = [
    /next page/i, /kitas puslap/i, /toliau/i, /next/i,
    /chevron.*right/i, /arrow.*right/i
  ];
  for (const frame of page.frames()) {
    const candidates = frame.locator("button,[role=button]");
    const n = await candidates.count().catch(() => 0);
    for (let i = Math.max(0, n - 80); i < n; i++) {
      const el = candidates.nth(i);
      const txt = [
        await el.getAttribute("aria-label").catch(() => ""),
        await el.getAttribute("title").catch(() => ""),
        await el.innerText().catch(() => "")
      ].filter(Boolean).join(" | ");
      if (patterns.some(p => p.test(txt))) {
        try {
          if (await el.isVisible()) {
            await el.click({ timeout: 3000 });
            await page.waitForTimeout(5000);
            return { clicked: true, descriptor: txt };
          }
        } catch {}
      }
    }
  }
  return { clicked: false };
}

async function clickPageLabel(label) {
  for (const frame of page.frames()) {
    const selectors = [
      `[aria-label="${label}"]`,
      `[title="${label}"]`,
      `text="${label}"`
    ];
    for (const sel of selectors) {
      try {
        const el = frame.locator(sel).last();
        if (await el.isVisible({ timeout: 500 })) {
          await el.click({ timeout: 2000 });
          await page.waitForTimeout(5000);
          return { clicked: true, selector: sel, frame: frame.url() };
        }
      } catch {}
    }
  }
  return { clicked: false };
}

let navLog = [];
let fatal = null;
try {
  await page.goto(reportUrl, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.waitForTimeout(20000);
  await snapshot("page-initial");

  // First try direct visible labels for the 4th page; if not found, click next three times.
  for (const label of ["4", "4 psl.", "Pradiniai duomenys", "Indekso apskaičiavimui naudoti pradiniai duomenys"]) {
    const r = await clickPageLabel(label);
    navLog.push({ action: "direct", label, ...r });
    if (r.clicked) break;
  }

  const directWorked = navLog.some(x => x.clicked);
  if (!directWorked) {
    for (let i = 1; i <= 3; i++) {
      const r = await clickNextOnce();
      navLog.push({ action: "next", step: i, ...r });
      if (!r.clicked) break;
    }
  }

  await page.waitForTimeout(15000);
  await snapshot("page-target");

  // Scroll through all frames to provoke virtualized table rows and additional queries.
  for (const frame of page.frames()) {
    try {
      await frame.evaluate(async () => {
        const sleep = ms => new Promise(r => setTimeout(r, ms));
        for (let y = 0; y <= document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await sleep(120);
        }
      });
    } catch {}
  }
  await page.waitForTimeout(5000);
  await snapshot("page-target-scrolled");
} catch (e) {
  fatal = String(e?.stack || e);
}

write("network-index.json", JSON.stringify(network, null, 2));
write("requests.json", JSON.stringify(requests, null, 2));
write("navigation.json", JSON.stringify(navLog, null, 2));
write("console.txt", consoleLines.join("\n"));
write("summary.json", JSON.stringify({
  generatedAt: new Date().toISOString(),
  reportUrl,
  fatal,
  requestCount: requests.length,
  responseCount: network.length,
  queryDataRequests: requests.filter(x => /querydata/i.test(x.url)).length,
  queryDataResponses: network.filter(x => /querydata/i.test(x.url)).length,
  capturedBodyBytes: totalBodyBytes,
  navigation: navLog
}, null, 2));

await browser.close();
