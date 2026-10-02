import fs from "node:fs";
import path from "node:path";

const outDir = "research/raw/vda-sale-big-cities";
fs.mkdirSync(outDir, { recursive: true });

const layerUrl =
  "https://osp-sdg.stat.gov.lt/arcgis/rest/services/EVP_DB_connection/evp32/FeatureServer/0";

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
  });
  const text = await res.text();
  if (!res.ok) throw new Error("HTTP " + res.status + ": " + text.slice(0, 500));
  const json = JSON.parse(text);
  if (json.error) throw new Error(JSON.stringify(json.error));
  return { url, json };
}

const discovery = await query({
  where: "indicator_name LIKE '%pirkimo-pardavimo%'",
  outFields: "indicator_code,indicator_name,matvnt_name,collection_name",
  returnDistinctValues: "true",
  orderByFields: "indicator_name ASC",
});

const candidates = (discovery.json.features || []).map(function (f) {
  return f.attributes || {};
});
fs.writeFileSync(
  path.join(outDir, "indicator-candidates.json"),
  JSON.stringify({ query_url: discovery.url, candidates }, null, 2) + "\n"
);

const matching = candidates.filter(function (x) {
  return /būsto pirkimo-pardavimo vidutin/i.test(String(x.indicator_name || ""));
});
if (matching.length !== 1) {
  throw new Error(
    "Expected exactly one purchase-price indicator candidate, got " +
      matching.length +
      ": " +
      JSON.stringify(candidates)
  );
}

const indicator = matching[0];
const data = await query({
  where:
    "laikotarpis_name='2024' AND indicator_code='" +
    String(indicator.indicator_code).replaceAll("'", "''") +
    "'",
  outFields:
    "laikotarpis_name,matvnt_name,savivaldybesm2020113,savivaldybesm2020113_name,collection_name,indicator_code,indicator_name,value",
  orderByFields: "savivaldybesm2020113_name ASC",
});

const rawRows = (data.json.features || []).map(function (f) {
  return f.attributes || {};
});

const rows = rawRows
  .filter(function (a) {
    return a.savivaldybesm2020113_name !== "Lietuvos Respublika";
  })
  .map(function (a) {
    return {
      municipality_code: a.savivaldybesm2020113,
      municipality: a.savivaldybesm2020113_name,
      year: Number(a.laikotarpis_name),
      indicator_code: a.indicator_code,
      indicator_name: a.indicator_name,
      price_eur_m2: Number(a.value),
      unit: a.matvnt_name,
      collection: a.collection_name,
      source: "Valstybės duomenų agentūra / ArcGIS EVP32",
      source_url: layerUrl,
      role: "official_sale_validation_benchmark_only",
    };
  });

const expected = new Set([
  "Vilniaus m. sav.",
  "Kauno m. sav.",
  "Klaipėdos m. sav.",
  "Panevėžio m. sav.",
  "Šiaulių m. sav.",
  "Alytaus m. sav.",
]);

const actual = new Set(rows.map(function (r) { return r.municipality; }));
const missing = Array.from(expected).filter(function (x) { return !actual.has(x); });
const extra = Array.from(actual).filter(function (x) { return !expected.has(x); });

console.log(JSON.stringify({ indicator, rawRows, rows }, null, 2));

if (rows.length !== 6 || missing.length || extra.length) {
  throw new Error(
    "Expected six-city 2024 sale benchmark; rows=" +
      rows.length +
      " missing=" +
      JSON.stringify(missing) +
      " extra=" +
      JSON.stringify(extra)
  );
}

if (rows.some(function (r) { return !(r.price_eur_m2 > 0); })) {
  throw new Error("Non-positive 2024 sale-price value found");
}

function esc(v) {
  const s = String(v == null ? "" : v);
  return /[",\n]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
}

const headers = Object.keys(rows[0]);
const csv =
  [headers.join(",")]
    .concat(
      rows.map(function (r) {
        return headers.map(function (h) { return esc(r[h]); }).join(",");
      })
    )
    .join("\n") +
  "\n";

fs.writeFileSync(
  path.join(outDir, "vda-sale-big-cities-2024.csv"),
  csv
);

const qa = {
  year: 2024,
  indicator_code: indicator.indicator_code,
  indicator_name: indicator.indicator_name,
  unit: indicator.matvnt_name,
  collection: indicator.collection_name,
  municipality_count: rows.length,
  municipalities: rows.map(function (r) { return r.municipality; }),
  values_eur_m2: Object.fromEntries(
    rows.map(function (r) { return [r.municipality, r.price_eur_m2]; })
  ),
  role: "OFFICIAL_VALIDATION_ONLY_NOT_10_COUNTY_SALE_LAYER",
  query_url: data.url,
};

fs.writeFileSync(
  path.join(outDir, "vda-sale-big-cities-2024-qa.json"),
  JSON.stringify(qa, null, 2) + "\n"
);

console.log(JSON.stringify(qa, null, 2));
