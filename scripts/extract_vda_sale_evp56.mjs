import fs from "node:fs";
import path from "node:path";

const outDir = "research/raw/vda-sale-evp56";
fs.mkdirSync(outDir, { recursive: true });

const dataItemId = "9b3d36f484194721beee10fbb6c5df44";
const dashboardItemId = "bdcbe64adb6941e6a8929d198c4cc1d5";

async function getJson(url) {
  const res = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "Demografin-situacija-research/1.0",
    },
    signal: AbortSignal.timeout(30000),
  });
  const text = await res.text();
  if (!res.ok) throw new Error("HTTP " + res.status + ": " + text.slice(0, 500));
  const json = JSON.parse(text);
  if (json.error) throw new Error(JSON.stringify(json.error));
  return json;
}

const meta = await getJson(
  `https://www.arcgis.com/sharing/rest/content/items/${dataItemId}?f=json`
);
if (!meta.url) throw new Error("Referenced data item has no service URL");

const serviceUrl = meta.url.replace(/\/$/,"");
const serviceMeta = await getJson(serviceUrl + "?f=json");

let layerUrl = serviceUrl;
if (!/\/(?:FeatureServer|MapServer)\/\d+$/i.test(serviceUrl)) {
  layerUrl = serviceUrl + "/0";
}
const layerMeta = await getJson(layerUrl + "?f=json");

async function query(params) {
  const qs = new URLSearchParams({
    returnGeometry: "false",
    f: "json",
    ...params,
  });
  const url = layerUrl + "/query?" + qs.toString();
  const json = await getJson(url);
  return {url,json};
}

const q = await query({
  where: "laikotarpis_name='2024'",
  outFields: "*",
  orderByFields: "savivaldybesm2021007_name ASC,bustotipas_2_name ASC,matvnt_name ASC",
  resultRecordCount: "5000",
});
const rows = (q.json.features || []).map(f => f.attributes || {});

function distinct(field) {
  return [...new Set(rows.map(r=>r[field]).filter(v=>v!==null && v!==undefined))].sort();
}

const summary = {
  dashboard_item_id: dashboardItemId,
  data_item_id: dataItemId,
  data_item_title: meta.title,
  data_item_type: meta.type,
  service_url: serviceUrl,
  layer_url: layerUrl,
  layer_name: layerMeta.name,
  max_record_count: layerMeta.maxRecordCount,
  field_names: (layerMeta.fields || []).map(f=>({name:f.name,alias:f.alias,type:f.type})),
  query_2024_url: q.url,
  rows_2024: rows.length,
  municipalities_2024: distinct("savivaldybesm2021007_name"),
  housing_types_2024: distinct("bustotipas_2_name"),
  units_2024: distinct("matvnt_name"),
  indicators_2024: distinct("indicator_name"),
  collections_2024: distinct("collection_name"),
};

fs.writeFileSync(path.join(outDir,"item-meta.json"),JSON.stringify(meta,null,2)+"\n");
fs.writeFileSync(path.join(outDir,"layer-meta.json"),JSON.stringify(layerMeta,null,2)+"\n");
fs.writeFileSync(path.join(outDir,"rows-2024.json"),JSON.stringify(rows,null,2)+"\n");
fs.writeFileSync(path.join(outDir,"summary.json"),JSON.stringify(summary,null,2)+"\n");

console.log(JSON.stringify(summary,null,2));
console.log(JSON.stringify(rows.slice(0,50),null,2));
