import fs from "node:fs";
import path from "node:path";

const outDir = "research/raw/vda-sale-big-cities";
fs.mkdirSync(outDir, { recursive: true });

const layerUrl =
  "https://osp-sdg.stat.gov.lt/arcgis/rest/services/EVP_DB_connection/evp56/FeatureServer/0";

async function query(params) {
  const qs = new URLSearchParams({
    returnGeometry: "false",
    f: "json",
    ...params,
  });
  const url = layerUrl + "/query?" + qs.toString();
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
  return { url, json };
}

const where = [
  "laikotarpis_name='2024'",
  "indicator_code='S7R280'",
  "bustotipas_2='1123'",
  "matvnt='eur_1_m2'",
].join(" AND ");

const data = await query({
  where,
  outFields:
    "bustotipas_2,bustotipas_2_name,laikotarpis_name,matvnt,matvnt_name," +
    "savivaldybesm2021007,savivaldybesm2021007_name,collection_name," +
    "indicator_code,indicator_name,value",
  orderByFields: "savivaldybesm2021007_name ASC",
  resultRecordCount: "100",
});

const rawRows = (data.json.features || []).map(f => f.attributes || {});
const national = rawRows.find(
  a => a.savivaldybesm2021007_name === "Lietuvos Respublika"
);
const cityRaw = rawRows.filter(
  a => a.savivaldybesm2021007_name !== "Lietuvos Respublika"
);

const rows = cityRaw.map(a => ({
  municipality_code: a.savivaldybesm2021007,
  municipality: a.savivaldybesm2021007_name,
  year: Number(a.laikotarpis_name),
  housing_type_code: a.bustotipas_2,
  housing_type: a.bustotipas_2_name,
  indicator_code: a.indicator_code,
  indicator_name: a.indicator_name,
  price_eur_m2: Number(a.value),
  unit: a.matvnt_name,
  collection: a.collection_name,
  source: "Valstybės duomenų agentūra / ArcGIS EVP56",
  source_url: layerUrl,
  role: "official_sale_validation_benchmark_only",
}));

const expected = new Set([
  "Vilniaus m. sav.",
  "Kauno m. sav.",
  "Klaipėdos m. sav.",
  "Panevėžio m. sav.",
  "Šiaulių m. sav.",
  "Alytaus m. sav.",
]);

const actual = new Set(rows.map(r => r.municipality));
const missing = [...expected].filter(x => !actual.has(x));
const extra = [...actual].filter(x => !expected.has(x));

if (rawRows.length !== 7 || rows.length !== 6 || missing.length || extra.length) {
  throw new Error(
    "Expected 6 city rows + Lithuania for 2024 apartment EUR/m² benchmark; " +
    `raw=${rawRows.length} city=${rows.length} missing=${JSON.stringify(missing)} extra=${JSON.stringify(extra)}`
  );
}
if (!national || !(Number(national.value) > 0)) {
  throw new Error("Missing positive Lithuania 2024 apartment EUR/m² benchmark");
}
if (rows.some(r => !(r.price_eur_m2 > 0))) {
  throw new Error("Non-positive 2024 city sale-price value found");
}
if (rows.some(r => r.housing_type !== "Butas daugiabučiuose namuose")) {
  throw new Error("Unexpected housing type in apartment benchmark");
}

function esc(v) {
  const s = String(v == null ? "" : v);
  return /[",\n]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
}

const headers = Object.keys(rows[0]);
const csv =
  [headers.join(",")]
    .concat(rows.map(r => headers.map(h => esc(r[h])).join(",")))
    .join("\n") + "\n";

fs.writeFileSync(
  path.join(outDir, "vda-sale-big-cities-2024.csv"),
  csv
);

const qa = {
  year: 2024,
  indicator_code: "S7R280",
  indicator_name: "Būsto pirkimo-pardavimo vidutinės kainos",
  housing_type_code: "1123",
  housing_type: "Butas daugiabučiuose namuose",
  unit: "EUR/m²",
  collection: rows[0].collection,
  municipality_count: rows.length,
  municipalities: rows.map(r => r.municipality),
  values_eur_m2: Object.fromEntries(
    rows.map(r => [r.municipality, r.price_eur_m2])
  ),
  lithuania_apartment_eur_m2: Number(national.value),
  source_layer: layerUrl,
  role: "OFFICIAL_VALIDATION_ONLY_NOT_10_COUNTY_SALE_LAYER",
  coverage_limit:
    "Official VDA series covers Lithuania plus six city municipalities; it cannot be relabelled as 10 counties.",
  query_url: data.url,
};

fs.writeFileSync(
  path.join(outDir, "vda-sale-big-cities-2024-qa.json"),
  JSON.stringify(qa, null, 2) + "\n"
);

console.log(JSON.stringify(qa, null, 2));
