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

const months = Array.from({ length: 12 }, function (_, i) {
  return "2025-" + String(i + 1).padStart(2, "0");
});

function normNumber(s) {
  return Number(String(s).replace(/[^0-9.,-]/g, "").replace(",", "."));
}

function parseOneRoom(text, expectedMonth) {
  const lines = text.split(/\r?\n/).map(function (x) { return x.trim(); }).filter(Boolean);
  const headingIdx = lines.findIndex(function (x) {
    return /Vidutinė nuomojamo buto pasiūlos kaina/i.test(x);
  });
  if (headingIdx < 0) {
    throw new Error("Offer-price section not found for " + expectedMonth);
  }

  const oneIdx = lines.findIndex(function (x, i) {
    return i >= headingIdx && /^1\s*kamb\.$/i.test(x);
  });
  if (oneIdx < 0) {
    throw new Error("1 kamb. row not found for " + expectedMonth);
  }

  const headerWindow = lines.slice(headingIdx, oneIdx);
  const monthSeen = headerWindow.some(function (x) {
    return x.replace(/\s+/g, " ").includes(expectedMonth);
  });
  if (!monthSeen) {
    throw new Error(
      "Requested month " + expectedMonth +
      " not shown in offer-price table header. Header: " +
      headerWindow.join(" | ").slice(0, 1000)
    );
  }

  const evidence = [lines[oneIdx]];
  let selected = null;
  for (let i = oneIdx + 1; i < Math.min(lines.length, oneIdx + 5); i++) {
    evidence.push(lines[i]);
    const m = lines[i].match(/^([0-9][0-9\s]*)\s*€$/);
    if (m) {
      selected = normNumber(m[1]);
      break;
    }
  }

  if (selected === null) {
    throw new Error(
      "Current EUR value not found immediately after 1 kamb. for " +
      expectedMonth + ": " + evidence.join(" | ")
    );
  }

  if (!(selected >= 100 && selected <= 3000)) {
    throw new Error(
      "Implausible 1-room rent " + selected + " EUR for " + expectedMonth
    );
  }

  return {
    selected_month_eur: selected,
    evidence: evidence.join(" | ").slice(0, 500),
  };
}

function median(values) {
  const a = Array.from(values).sort(function (x, y) { return x - y; });
  const n = a.length;
  return n % 2 ? a[(n - 1) / 2] : (a[n / 2 - 1] + a[n / 2]) / 2;
}

function csvEscape(v) {
  const s = String(v == null ? "" : v);
  return /[",\n]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  locale: "lt-LT",
  viewport: { width: 1280, height: 900 },
});

const rows = [];
let probeSaved = false;

for (const c of cities) {
  for (const month of months) {
    const page = await context.newPage();
    const url =
      "https://m.aruodas.lt/tendencijos/?district_id=" +
      c.district_id +
      "&month=" +
      month +
      "&tab_type=nuoma";

    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 90000,
    });

    if (!response || !response.ok()) {
      throw new Error(
        "HTTP failure for " +
        c.city +
        " " +
        month +
        ": " +
        (response ? response.status() : "no response")
      );
    }

    await page.waitForTimeout(1200);
    const text = await page.locator("body").innerText();

    if (!probeSaved && c.city === "Kaunas" && month === "2025-12") {
      fs.writeFileSync(
        path.join(outDir, "probe-kaunas-2025-12.txt"),
        text
      );
      probeSaved = true;
    }

    const parsed = parseOneRoom(text, month);
    rows.push({
      city: c.city,
      district_id: c.district_id,
      month: month,
      one_room_asking_rent_eur_month: parsed.selected_month_eur,
      price_basis: "asking_offer",
      source: "Aruodas.lt",
      source_url: url,
      evidence: parsed.evidence,
    });

    console.log(
      c.city + " " + month + ": " + parsed.selected_month_eur + " EUR"
    );
    await page.close();
  }
}

await browser.close();

const headers = [
  "city",
  "district_id",
  "month",
  "one_room_asking_rent_eur_month",
  "price_basis",
  "source",
  "source_url",
];

const csv =
  [headers.join(",")]
    .concat(
      rows.map(function (r) {
        return headers.map(function (h) {
          return csvEscape(r[h]);
        }).join(",");
      })
    )
    .join("\n") +
  "\n";

fs.writeFileSync(
  path.join(outDir, "aruodas-rent-1room-monthly-2025.csv"),
  csv
);

const summary = {};
for (const c of cities) {
  const values = rows
    .filter(function (r) { return r.city === c.city; })
    .map(function (r) { return r.one_room_asking_rent_eur_month; });

  if (values.length !== 12) {
    throw new Error(c.city + ": expected 12 months, got " + values.length);
  }

  const decRow = rows.find(function (r) {
    return r.city === c.city && r.month === "2025-12";
  });

  summary[c.city] = {
    months_n: values.length,
    mean_eur_month:
      values.reduce(function (a, b) { return a + b; }, 0) / values.length,
    median_eur_month: median(values),
    min_eur_month: Math.min.apply(null, values),
    max_eur_month: Math.max.apply(null, values),
    dec_2025_eur_month: decRow ? decRow.one_room_asking_rent_eur_month : null,
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
      method_note:
        "Monthly offer averages calculated by Aruodas from ads active at a certain point in the month.",
      city_count: cities.length,
      month_rows: rows.length,
      summary: summary,
      publication_role: "QA_VALIDATION_ONLY",
    },
    null,
    2
  ) + "\n"
);

console.log(JSON.stringify({ rows: rows.length, summary: summary }, null, 2));
