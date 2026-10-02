import fs from "node:fs";
import path from "node:path";

const outDir = "research/raw/vda-rent-big-cities";
fs.mkdirSync(outDir, { recursive: true });

const layerUrl =
  "https://osp-sdg.stat.gov.lt/arcgis/rest/services/EVP_DB_connection/evp32/FeatureServer/0";

const params = new URLSearchParams({
  where: "laikotarpis_name='2025' AND indicator_code='S7R281'",
  outFields:
    "laikotarpis_name,matvnt_name,savivaldybesm2020113,savivaldybesm2020113_name,collection_name,indicator_code,indicator_name,value",
  returnGeometry: "false",
  orderByFields: "savivaldybesm2020113_name ASC",
  f: "json",
});

const url = layerUrl + "/query?" + params.toString();
const res = await fetch(url, {
  headers: {
    accept: "application/json",
    "user-agent": "Demografin-situacija-research/1.0",
  },
});
const text = await res.text();
if (!res.ok) {
  throw new Error("HTTP " + res.status + ": " + text.slice(0, 500));
}
const json = JSON.parse(text);
if (json.error) throw new Error(JSON.stringify(json.error));

const rows = (json.features || []).map(function (f) {
  const a = f.attributes || {};
  return {
    municipality_code: a.savivaldybesm2020113,
    municipality: a.savivaldybesm2020113_name,
    year: Number(a.laikotarpis_name),
    indicator_code: a.indicator_code,
    indicator_name: a.indicator_name,
    annual_rent_eur_m2: Number(a.value),
    monthly_equivalent_eur_m2: Number(a.value) / 12,
    unit: a.matvnt_name,
    collection: a.collection_name,
    source: "Valstybės duomenų agentūra / ArcGIS EVP32",
    source_url: layerUrl,
    role: "official_validation_benchmark_only",
  };
});

if (rows.length !== 5) {
  throw new Error("Expected 5 major-city rows for 2025, got " + rows.length);
}

const expected = new Set([
  "Vilniaus m. sav.",
  "Kauno m. sav.",
  "Klaipėdos m. sav.",
  "Panevėžio m. sav.",
  "Šiaulių m. sav.",
]);
const actual = new Set(rows.map(function (r) { return r.municipality; }));
const missing = Array.from(expected).filter(function (x) { return !actual.has(x); });
const extra = Array.from(actual).filter(function (x) { return !expected.has(x); });
if (missing.length || extra.length) {
  throw new Error(
    "Major-city coverage mismatch: missing=" +
      JSON.stringify(missing) +
      " extra=" +
      JSON.stringify(extra)
  );
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
  path.join(outDir, "vda-rent-big-cities-2025.csv"),
  csv
);

const qa = {
  year: 2025,
  indicator_code: "S7R281",
  indicator_name: "Butų nuomos vidutinės metinės kainos",
  unit: "EUR/m² per metus",
  municipality_count: rows.length,
  municipalities: rows.map(function (r) { return r.municipality; }),
  values: Object.fromEntries(
    rows.map(function (r) {
      return [
        r.municipality,
        {
          annual_rent_eur_m2: r.annual_rent_eur_m2,
          monthly_equivalent_eur_m2: r.monthly_equivalent_eur_m2,
        },
      ];
    })
  ),
  role: "OFFICIAL_VALIDATION_ONLY_NOT_10_COUNTY_RENT_LAYER",
};

fs.writeFileSync(
  path.join(outDir, "vda-rent-big-cities-2025-qa.json"),
  JSON.stringify(qa, null, 2) + "\n"
);

console.log(JSON.stringify(qa, null, 2));
