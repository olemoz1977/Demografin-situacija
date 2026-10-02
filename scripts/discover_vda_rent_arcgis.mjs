import fs from "node:fs";
import path from "node:path";

const rootItemId = "3fba56c8042649aabbb5fc85329b2f70";
const outDir = "research/raw/vda-rent-arcgis";
fs.mkdirSync(outDir, { recursive: true });

const base = "https://www.arcgis.com/sharing/rest/content/items";

async function getJson(url) {
  const r = await fetch(url, {
    headers: {
      "user-agent": "Demografin-situacija-research/1.0",
      "accept": "application/json,text/plain,*/*",
    },
  });
  const text = await r.text();
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}: ${text.slice(0, 500)}`);
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Non-JSON response for ${url}: ${text.slice(0, 500)}`);
  }
}

function walk(value, fn, pathParts = []) {
  fn(value, pathParts);
  if (Array.isArray(value)) {
    value.forEach((v, i) => walk(v, fn, [...pathParts, i]));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      walk(v, fn, [...pathParts, k]);
    }
  }
}

function collectRefs(obj) {
  const ids = new Set();
  const urls = new Set();
  walk(obj, (v) => {
    if (typeof v !== "string") return;
    for (const m of v.matchAll(/\b[a-f0-9]{32}\b/gi)) ids.add(m[0].toLowerCase());
    for (const m of v.matchAll(/https?:\/\/[^"'\s)]+/gi)) {
      const u = m[0].replace(/[},\]]+$/g, "");
      if (/FeatureServer|MapServer|arcgis\.com|arcgis\.com\/apps/i.test(u)) urls.add(u);
    }
  });
  return { ids: [...ids], urls: [...urls] };
}

const rootMeta = await getJson(`${base}/${rootItemId}?f=json`);
const rootData = await getJson(`${base}/${rootItemId}/data?f=json`);
fs.writeFileSync(path.join(outDir, "root-item.json"), JSON.stringify(rootMeta, null, 2) + "\n");
fs.writeFileSync(path.join(outDir, "root-data.json"), JSON.stringify(rootData, null, 2) + "\n");

const first = collectRefs(rootData);
const candidateIds = new Set(first.ids);
candidateIds.delete(rootItemId);

const items = [];
for (const id of [...candidateIds].slice(0, 60)) {
  try {
    const meta = await getJson(`${base}/${id}?f=json`);
    if (meta?.id && !meta?.error) {
      const row = {
        id,
        title: meta.title,
        type: meta.type,
        url: meta.url,
        owner: meta.owner,
        modified: meta.modified,
      };
      items.push(row);
      if (/Web Map|Web Mapping Application|Dashboard|Feature Service/i.test(meta.type || "")) {
        try {
          const data = await getJson(`${base}/${id}/data?f=json`);
          fs.writeFileSync(path.join(outDir, `item-${id}-data.json`), JSON.stringify(data, null, 2) + "\n");
          const refs = collectRefs(data);
          refs.ids.forEach(x => candidateIds.add(x));
          refs.urls.forEach(x => first.urls.push(x));
        } catch (e) {
          row.data_error = String(e);
        }
      }
    }
  } catch (e) {
    items.push({ id, error: String(e) });
  }
}

const serviceUrls = new Set();
for (const u of first.urls) {
  const m = u.match(/^(https?:\/\/[^?#]+\/(?:FeatureServer|MapServer))(?:\/\d+)?/i);
  if (m) serviceUrls.add(m[1]);
}
for (const item of items) {
  if (item.url) {
    const m = String(item.url).match(/^(https?:\/\/[^?#]+\/(?:FeatureServer|MapServer))(?:\/\d+)?/i);
    if (m) serviceUrls.add(m[1]);
  }
}

const services = [];
for (const serviceUrl of [...serviceUrls].slice(0, 30)) {
  const record = { serviceUrl, layers: [] };
  try {
    const meta = await getJson(`${serviceUrl}?f=json`);
    record.name = meta.name || meta.mapName;
    record.description = meta.description;
    record.layers = (meta.layers || []).map(x => ({ id: x.id, name: x.name }));
    fs.writeFileSync(
      path.join(outDir, `service-${Buffer.from(serviceUrl).toString("base64url")}.json`),
      JSON.stringify(meta, null, 2) + "\n"
    );

    for (const layer of record.layers.slice(0, 20)) {
      try {
        const layerUrl = `${serviceUrl}/${layer.id}`;
        const lm = await getJson(`${layerUrl}?f=json`);
        const sample = await getJson(
          `${layerUrl}/query?where=1%3D1&outFields=*&returnGeometry=false&resultRecordCount=5&f=json`
        );
        layer.fields = (lm.fields || []).map(f => ({
          name: f.name,
          alias: f.alias,
          type: f.type,
        }));
        layer.sample = sample.features || [];
      } catch (e) {
        layer.error = String(e);
      }
    }
  } catch (e) {
    record.error = String(e);
  }
  services.push(record);
}

const summary = {
  root_item: {
    id: rootItemId,
    title: rootMeta.title,
    type: rootMeta.type,
    owner: rootMeta.owner,
    modified: rootMeta.modified,
  },
  referenced_items: items,
  discovered_service_urls: [...serviceUrls],
  services,
};

fs.writeFileSync(path.join(outDir, "discovery-summary.json"), JSON.stringify(summary, null, 2) + "\n");
console.log(JSON.stringify({
  root: summary.root_item,
  itemCount: items.length,
  serviceCount: services.length,
  services: services.map(s => ({
    serviceUrl: s.serviceUrl,
    name: s.name,
    layers: s.layers.map(l => ({ id: l.id, name: l.name, fields: l.fields?.map(f => f.name) })),
  })),
}, null, 2));
