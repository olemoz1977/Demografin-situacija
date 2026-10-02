import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const outDir = "research/raw/aruodas-rent-benchmark";
fs.mkdirSync(outDir, { recursive: true });

const cities = [
  { city: "Vilnius", district_id: 1 },
  { city: "Kaunas", district_id: 6 },
  { city: "Klaipėda", district_id: 7 },
];

const months = Array.from({ length: 12 }, (_, i) => `2025-${String(i + 1).padStart(2, "0")}`);

function normNumber(s) {
  return Number(String(s).replace(/[^0-9.,-]/g, "").replace(",", "."));
}

function parseOneRoom(text, expectedMonth) {
  const lines = text.split(/\r?\n/).map(x => x.trim()).filter(Boolean);
  const headingIdx = lines.findIndex(x => /Vidutinė nuomojamo buto pasiūlos kaina/i.test(x));
  const start = headingIdx >= 0 ? headingIdx : 0;
  const oneIdx = lines.findIndex((x, i) => i >= start && /1\s*kamb\./i.test(x));
  if (oneIdx < 0) throw new Error(`1 kamb. row not found for ${expectedMonth}`);

  const window = lines.slice(oneIdx, oneIdx + 8).join(" | ");
  const euroMatches = [...window.matchAll(/([0-9][0-9\s]*)\s*€/g)].map(m => normNumber(m[1]));
  if (euroMatches.length < 2) {
    throw new Error(`Expected two EUR values near 1 kamb. for ${expectedMonth}; got: ${window}`);
  }

  // Aruodas historical report compares same month previous year vs selected month.
  return {
    prior_year_same_month_eur: euroMatches[0],
    selected_month_eur: euroMatches[1],
    evidence: window.slice(0, 500),
  };
}

function median(values) {
  const a = [...values].sort((x, y) => x - y);
  const n = a.length;
  return n % 2 ? a[(n - 1) / 2] : (a[n / 2 - 1] + a[n / 2]) / 2;
}

function csvEscape(v) {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  locale: "lt-LT",
  viewport: { width: 1280, height: 900 },
});
const page = await context.newPage();

const rows = [];
let probeSaved = false;

for (const c of cities) {
  for (const month of months) {
    const url = `https://m.aruodas.lt/tendencijos/?district_id=${c.district_id}&month=${month}&tab_type=nuoma`;
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
    if (!response || !response.ok()) {
      throw new Error(`HTTP failure for ${c.city} ${month}: ${response?.status()}`);
    }
    await page.waitForTimeout(1200);
    const text = await page.locator("body").innerText();

    if (!probeSaved && c.city === "Kaunas" && month === "2025-12") {
      fs.writeFileSync(path.join(outDir, "probe-kaunas-2025-12.txt"), text);
      probeSaved = true;
    }

    const parsed = parseOneRoom(text, month);
    rows.push({
      city: c.city,
      district_id: c.district_id,
      month,
      one_room_asking_rent_eur_month: parsed.selected_month_eur,
      prior_year_same_month_one_room_eur_month: parsed.prior_year_same_month_eur,
      price_basis: "asking_offer",
      source: "Aruodas.lt",
      source_url: url,
      evidence: parsed.evidence,
    });

    console.log(`${c.city} ${month}: ${parsed.selected_month_eur} EUR`);
  }
}

await browser.close();

const headers = [
  "city",
  "district_id",
  "month",
  "one_room_asking_rent_eur_month",
  "prior_year_same_month_one_room_eur_month",
  "price_basis",
  "source",
  "source_url",
];
const csv = [
  headers.join(","),
  ...rows.map(r => headers.map(h => csvEscape(r[h])).join(",")),
].join("\n") + "\n";
fs.writeFileSync(path.join(outDir, "aruodas-rent-1room-monthly-2025.csv"), csv);

const summary = {};
for (const c of cities) {
  const values = rows
    .filter(r => r.city === c.city)
    .map(r => r.one_room_asking_rent_eur_month);
  if (values.length !== 12) throw new Error(`${c.city}: expected 12 months, got ${values.length}`);
  summary[c.city] = {
    months_n: values.length,
    mean_eur_month: values.reduce((a, b) => a + b, 0) / values.length,
    median_eur_month: median(values),
    min_eur_month: Math.min(...values),
    max_eur_month: Math.max(...values),
    dec_2025_eur_month: rows.find(r => r.city === c.city && r.month === "2025-12")?.one_room_asking_rent_eur_month,
    role: "validation_benchmark_only_not_county_value",
  };
}

fs.writeFileSync(
  path.join(outDir, "aruodas-rent-1room-summary-2025.json"),
  JSON.stringify(
    {
      year: 2025,
      basket: "1-room apartment asking rent",
      source: "Aruodas.lt historical trend pages",
      method_note: "Monthly offer averages calculated by Aruodas from ads active at a certain point in the month.",
      city_count: cities.length,
      month_rows: rows.length,
      summary,
      publication_role: "QA_VALIDATION_ONLY",
    },
    null,
    2
  ) + "\n"
);

console.log(JSON.stringify({ rows: rows.length, summary }, null, 2));
