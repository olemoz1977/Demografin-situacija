import fs from "node:fs";
import path from "node:path";

const outDir = "research/raw/vda-arcgis-catalog";
fs.mkdirSync(outDir, { recursive: true });

async function getJson(url) {
  const res = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "Demografin-situacija-research/1.0",
    },
    signal: AbortSignal.timeout(30000),
  });
  const text = await res.text();
  if (!res.ok) throw new Error("HTTP " + res.status + ": " + text.slice(0,500));
  const json = JSON.parse(text);
  if (json.error) throw new Error(JSON.stringify(json.error));
  return json;
}

const queries = [
  'owner:LT_open_data AND (title:būsto OR title:busto OR title:butų OR title:butu)',
  'owner:LT_open_data AND (title:pirkimo OR title:pardavimo OR title:kainos)',
  'owner:LT_open_data AND (tags:būsto OR tags:busto OR tags:butų OR tags:butu)',
  'owner:LT_open_data AND (description:pirkimo OR description:pardavimo)',
];

const all = new Map();
for (const q of queries) {
  const url = "https://www.arcgis.com/sharing/rest/search?" + new URLSearchParams({
    q,
    num: "100",
    start: "1",
    f: "json",
    sortField: "modified",
    sortOrder: "desc",
  });
  const json = await getJson(url);
  for (const r of json.results || []) {
    all.set(r.id, r);
  }
}

const items = [...all.values()].map(r => ({
  id: r.id,
  title: r.title,
  type: r.type,
  owner: r.owner,
  url: r.url,
  tags: r.tags,
  snippet: r.snippet,
  description: r.description,
  modified: r.modified,
  created: r.created,
}));

const relevant = items.filter(r =>
  /būst|bust|but|pirk|pard|kain/i.test(
    [
      r.title,
      r.type,
      r.url,
      ...(r.tags || []),
      r.snippet,
      r.description,
    ].filter(Boolean).join(" ")
  )
);

const enriched = [];
for (const item of relevant.slice(0, 100)) {
  const out = {...item};
  try {
    out.meta = await getJson(
      `https://www.arcgis.com/sharing/rest/content/items/${item.id}?f=json`
    );
  } catch (e) {
    out.meta_error = String(e);
  }
  if (/Web Map|Dashboard|Web Mapping Application/i.test(item.type || "")) {
    try {
      out.data = await getJson(
        `https://www.arcgis.com/sharing/rest/content/items/${item.id}/data?f=json`
      );
    } catch (e) {
      out.data_error = String(e);
    }
  }
  enriched.push(out);
}

function collectStrings(v, out=[]) {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) for (const x of v) collectStrings(x,out);
  else if (v && typeof v === "object") for (const x of Object.values(v)) collectStrings(x,out);
  return out;
}

const services = new Set();
for (const item of enriched) {
  const strings = collectStrings(item);
  for (const s of strings) {
    for (const m of s.matchAll(/https?:\/\/[^"'\s)]+\/(?:FeatureServer|MapServer)(?:\/\d+)?/gi)) {
      services.add(m[0].replace(/[},\]]+$/g,""));
    }
  }
}

const summary = {
  queried_at: new Date().toISOString(),
  queries,
  unique_items: items.length,
  relevant_items: relevant.length,
  relevant: enriched.map(x => ({
    id: x.id,
    title: x.title,
    type: x.type,
    url: x.url,
    owner: x.owner,
    tags: x.tags,
    modified: x.modified,
  })),
  discovered_services: [...services].sort(),
};

fs.writeFileSync(path.join(outDir, "catalog-summary.json"), JSON.stringify(summary,null,2)+"\n");
fs.writeFileSync(path.join(outDir, "catalog-enriched.json"), JSON.stringify(enriched,null,2)+"\n");

console.log(JSON.stringify(summary,null,2));
