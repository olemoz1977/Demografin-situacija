import fs from "node:fs";
import path from "node:path";

const rawDir = process.env.PBI_RAW_DIR || "research/raw/smart-continent-powerbi/latest";
const outCsv = process.env.PBI_DIAG_CSV || "data/housing-sale-smart-continent-housing-2024-diagnostic.csv";
const outQa = process.env.PBI_DIAG_QA || "research/smart-continent-housing-page4-qa-2024.json";

const targetMeasure = "_measures.Vid. būsto sandorio kaina, Eur/kv.m";
const targetTxn = "_measures.Būstų pirkimo-pardavimo sandorių skaičius";
const targetMunicipality = "DimSavivaldybė.Savivaldybė";

function parseScalar(v) {
  if (typeof v !== "string") return v;
  if (/^-?\d+L$/.test(v)) return Number(v.slice(0, -1));
  if (/^-?(?:\d+\.?\d*|\d*\.\d+)D$/.test(v)) return Number(v.slice(0, -1));
  return v;
}

function bit(mask, i) {
  return ((Number(mask || 0) >>> i) & 1) === 1;
}

function findMainResponse() {
  const files = fs.readdirSync(rawDir)
    .filter(f => /^response-.*-querydata\.txt$/.test(f))
    .sort();

  for (const file of files) {
    const full = path.join(rawDir, file);
    let obj;
    try { obj = JSON.parse(fs.readFileSync(full, "utf8")); } catch { continue; }
    const data = obj?.results?.[0]?.result?.data;
    const names = (data?.descriptor?.Select || []).filter(Boolean).map(x => x.Name);
    if (names.includes(targetMunicipality) && names.includes(targetTxn) && names.includes(targetMeasure)) {
      return { file, obj, data };
    }
  }
  throw new Error("Main page-4 municipality response not found");
}

const { file: sourceFile, data } = findMainResponse();
const ds = data?.dsr?.DS?.[0];
if (!ds) throw new Error("DSR dataset missing");

const dm0 = ds.PH?.find(x => Array.isArray(x.DM0))?.DM0;
const dm1 = ds.PH?.find(x => Array.isArray(x.DM1))?.DM1;
if (!dm0?.length || !dm1?.length) throw new Error("Expected subtotal and municipality groups missing");

// The first municipality row carries the DSR schema names.
// Power BI interleaves every numeric measure with its dynamic format-string column.
const schema = (dm1[0].S || []).map(x => x.N);
if (!schema.length) throw new Error("DSR schema missing");
const width = schema.length;

const decoded = [];
let previous = Array(width).fill(null);
for (const row of dm1) {
  const values = Array(width);
  let ci = 0;
  for (let i = 0; i < width; i++) {
    if (bit(row.R, i)) values[i] = previous[i];
    else if (bit(row["Ø"], i)) values[i] = null;
    else values[i] = parseScalar(row.C?.[ci++]);
  }
  previous = values;
  decoded.push(Object.fromEntries(schema.map((name, i) => [name, values[i]])));
}

function descriptorToDsrName(selectName) {
  const selects = (data.descriptor.Select || []).filter(Boolean);
  const idx = selects.findIndex(x => x.Name === selectName);
  if (idx < 0) throw new Error("Descriptor field missing: " + selectName);
  // G0 is the municipality group key. Measure n maps to M(2*(n-1)).
  if (idx === 0) return "G0";
  return "M" + (2 * (idx - 1));
}

const nameCol = descriptorToDsrName(targetMunicipality);
const txnCol = descriptorToDsrName(targetTxn);
const priceCol = descriptorToDsrName(targetMeasure);

const rows = decoded.map(r => ({
  municipality: r[nameCol],
  housing_transactions: Number(r[txnCol]),
  avg_housing_transaction_eur_m2_raw: Number(r[priceCol])
}));

if (rows.length !== 60) throw new Error("Expected 60 municipalities, got " + rows.length);
if (rows.some(r => !r.municipality || !Number.isFinite(r.housing_transactions) || !Number.isFinite(r.avg_housing_transaction_eur_m2_raw))) {
  throw new Error("Missing municipality/transaction/price values");
}

const txnSum = rows.reduce((s, r) => s + r.housing_transactions, 0);
const simpleMean = rows.reduce((s, r) => s + r.avg_housing_transaction_eur_m2_raw, 0) / rows.length;
const weightedMean = rows.reduce((s, r) => s + r.housing_transactions * r.avg_housing_transaction_eur_m2_raw, 0) / txnSum;

// Decode only the subtotal value needed for QA using its declared schema.
const subtotalSchema = (dm0[0].S || []).map(x => x.N);
const subtotalValues = {};
let subtotalCi = 0;
for (let i = 0; i < subtotalSchema.length; i++) {
  if (bit(dm0[0]["Ø"], i)) subtotalValues[subtotalSchema[i]] = null;
  else subtotalValues[subtotalSchema[i]] = parseScalar(dm0[0].C?.[subtotalCi++]);
}
const totalTxn = Number(subtotalValues[txnCol.replace(/^M/, "A")]);
const totalPrice = Number(subtotalValues[priceCol.replace(/^M/, "A")]);

const headers = [
  "municipality",
  "year",
  "housing_transactions",
  "avg_housing_transaction_eur_m2_raw",
  "scope",
  "price_type",
  "use_status",
  "quality_note"
];
const esc = v => {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
};
const csvRows = rows.map(r => [
  r.municipality,
  2024,
  r.housing_transactions,
  r.avg_housing_transaction_eur_m2_raw.toFixed(6),
  "housing_all_types_dashboard_measure",
  "transaction_price",
  "diagnostic_only_not_apartment_specific",
  "Power BI page 4 raw measure; do not use as apartment price layer"
]);
fs.mkdirSync(path.dirname(outCsv), { recursive: true });
fs.writeFileSync(outCsv, [headers.join(","), ...csvRows.map(x => x.map(esc).join(","))].join("\n") + "\n");

const qa = {
  generated_at: new Date().toISOString(),
  source_response: path.join(rawDir, sourceFile),
  year: 2024,
  municipality_count: rows.length,
  dashboard_total_housing_transactions: totalTxn,
  municipality_transaction_sum: txnSum,
  dashboard_total_avg_housing_transaction_eur_m2: totalPrice,
  simple_mean_of_60_municipality_prices_eur_m2: simpleMean,
  transaction_count_weighted_mean_of_60_municipality_prices_eur_m2: weightedMean,
  total_equals_simple_municipality_mean_abs_diff: Math.abs(totalPrice - simpleMean),
  total_equals_transaction_weighted_mean_abs_diff: Math.abs(totalPrice - weightedMean),
  apartment_control_price_eur_m2_from_interim_presentation: 1669,
  apartment_control_transactions_approx_from_rc: 27330,
  verdict: "FAIL_FOR_APARTMENT_PRICE_LAYER",
  reasons: [
    "Page-4 measure is generic housing transaction price, not apartment-only.",
    "Dashboard total transactions are 37009, materially broader than the apartment-only control population.",
    "Dashboard total price is the unweighted arithmetic mean of 60 municipality price measures, not a transaction-count-weighted national aggregate.",
    "The dashboard total price 557 EUR/m2 does not reproduce the 1669 EUR/m2 national apartment control."
  ]
};
fs.mkdirSync(path.dirname(outQa), { recursive: true });
fs.writeFileSync(outQa, JSON.stringify(qa, null, 2) + "\n");

console.log(JSON.stringify(qa, null, 2));
