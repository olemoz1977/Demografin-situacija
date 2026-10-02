import fs from "node:fs";
import path from "node:path";

const outDir = "research/raw/vda-sale-discovery";
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
    signal: AbortSignal.timeout(30000),
  });
  const text = await res.text();
  if (!res.ok) throw new Error("HTTP " + res.status + ": " + text.slice(0, 500));
  const json = JSON.parse(text);
  if (json.error) throw new Error(JSON.stringify(json.error));
  return { url, json };
}

const q = await query({
  where: "laikotarpis_name='2024'",
  outFields:
    "indicator_code,indicator_name,indicator_name_en,collection_code,collection_name,matvnt,matvnt_name,savivaldybesm2020113_name",
  orderByFields: "indicator_name ASC, savivaldybesm2020113_name ASC",
  resultRecordCount: "5000",
});

const rows = (q.json.features || []).map(f => f.attributes || {});
const grouped = {};
for (const r of rows) {
  const key = [
    r.indicator_code ?? "",
    r.indicator_name ?? "",
    r.collection_code ?? "",
    r.collection_name ?? "",
    r.matvnt ?? "",
    r.matvnt_name ?? "",
  ].join(" | ");
  if (!grouped[key]) {
    grouped[key] = {
      indicator_code: r.indicator_code,
      indicator_name: r.indicator_name,
      indicator_name_en: r.indicator_name_en,
      collection_code: r.collection_code,
      collection_name: r.collection_name,
      matvnt: r.matvnt,
      matvnt_name: r.matvnt_name,
      municipalities: new Set(),
    };
  }
  if (r.savivaldybesm2020113_name) {
    grouped[key].municipalities.add(r.savivaldybesm2020113_name);
  }
}

const indicators = Object.values(grouped)
  .map(x => ({
    ...x,
    municipalities: [...x.municipalities].sort(),
    municipality_count: x.municipalities.size,
  }))
  .sort((a,b) => String(a.indicator_name).localeCompare(String(b.indicator_name), "lt"));

const saleLike = indicators.filter(x =>
  /pirk|pard|būst|but/i.test(
    [x.indicator_name, x.indicator_name_en, x.collection_name].join(" ")
  )
);

const out = {
  year: 2024,
  layerUrl,
  row_count: rows.length,
  indicator_group_count: indicators.length,
  sale_like_count: saleLike.length,
  sale_like: saleLike,
  all_indicators: indicators,
  query_url: q.url,
};

fs.writeFileSync(
  path.join(outDir, "vda-evp32-2024-indicators.json"),
  JSON.stringify(out, null, 2) + "\n"
);

console.log(JSON.stringify({
  row_count: rows.length,
  indicator_group_count: indicators.length,
  sale_like: saleLike.map(x => ({
    indicator_code: x.indicator_code,
    indicator_name: x.indicator_name,
    collection_name: x.collection_name,
    matvnt_name: x.matvnt_name,
    municipality_count: x.municipality_count,
    municipalities: x.municipalities,
  })),
}, null, 2));
