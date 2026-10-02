import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const reportUrl = "https://app.powerbi.com/view?r=eyJrIjoiYzhmZGZlMjYtM2UwMi00ODc1LWJiODMtYWZjY2JkYTUxZmE1IiwidCI6ImUwM2ViNjEzLTMyY2ItNDBlZi04MGQ2LTY5YmYwNTBmZDc5OCIsImMiOjl9";
const outDir = "research/raw/smart-continent-bi1-sale-probe";
fs.mkdirSync(outDir, {recursive:true});

let queryEndpoint = null;
let queryHeaders = null;
let modelId = null;

const browser = await chromium.launch({headless:true});
const context = await browser.newContext({locale:"lt-LT", viewport:{width:1600,height:1000}});
const page = await context.newPage();

page.on("request", req => {
  if (!queryEndpoint && /\/public\/reports\/querydata\?synchronous=true/i.test(req.url())) {
    queryEndpoint = req.url();
    const h = req.headers();
    queryHeaders = {};
    for (const k of ["content-type","x-powerbi-resourcekey","activityid","requestid","origin","referer"]) {
      if (h[k]) queryHeaders[k] = h[k];
    }
  }
});
page.on("response", async res => {
  if (modelId || !/modelsAndExploration/i.test(res.url())) return;
  try {
    const o = await res.json();
    modelId = o?.models?.[0]?.id ?? null;
  } catch {}
});

await page.goto(reportUrl,{waitUntil:"domcontentloaded",timeout:120000});
await page.waitForTimeout(25000);

if (!queryEndpoint || !queryHeaders || !modelId) {
  fs.writeFileSync(path.join(outDir,"status.json"), JSON.stringify({
    ok:false, queryEndpoint:!!queryEndpoint, queryHeaders:!!queryHeaders, modelId
  }, null, 2)+"\n");
  await browser.close();
  process.exit(2);
}

queryHeaders["activityid"] = crypto.randomUUID();
queryHeaders["requestid"] = crypto.randomUUID();
queryHeaders["content-type"] = "application/json";

const props = [
  "BI_1",
  "Vid būsto sandorio  kaina, Eur/kv.m.",
  "Vidutinis darbo užmokestis (neto)"
];

const payload = {
  version:"1.0.0",
  queries:[{
    Query:{
      Commands:[{
        SemanticQueryDataShapeCommand:{
          Query:{
            Version:2,
            From:[
              {Name:"s",Entity:"DimSavivaldybė",Type:0},
              {Name:"f",Entity:"FactBPI",Type:0}
            ],
            Select:[
              {
                Column:{
                  Expression:{SourceRef:{Source:"s"}},
                  Property:"Savivaldybė"
                },
                Name:"DimSavivaldybė.Savivaldybė",
                NativeReferenceName:"Savivaldybė"
              },
              ...props.map(Property => ({
                Column:{
                  Expression:{SourceRef:{Source:"f"}},
                  Property
                },
                Name:"FactBPI."+Property,
                NativeReferenceName:Property
              }))
            ],
            Where:[{
              Condition:{
                In:{
                  Expressions:[{
                    Column:{
                      Expression:{SourceRef:{Source:"f"}},
                      Property:"Metai"
                    }
                  }],
                  Values:[[{Literal:{Value:"2024L"}}]]
                }
              }
            }]
          },
          Binding:{
            Primary:{
              Groupings:[{
                Projections:[0,1,2,3],
                Subtotal:1
              }]
            },
            DataReduction:{
              DataVolume:6,
              Primary:{Window:{Count:500}}
            },
            Version:1
          },
          ExecutionMetricsKind:1
        }
      }]
    },
    CacheKey:""
  }],
  cancelQueries:[],
  modelId
};

const api = await context.request.post(queryEndpoint,{
  headers:queryHeaders,
  data:payload,
  timeout:120000
});
const body = await api.text();

fs.writeFileSync(path.join(outDir,"query.json"), JSON.stringify(payload,null,2)+"\n");
fs.writeFileSync(path.join(outDir,"response.txt"), body);
fs.writeFileSync(path.join(outDir,"status.json"), JSON.stringify({
  ok:api.ok(), status:api.status(), modelId, queryEndpoint,
  headerNames:Object.keys(queryHeaders), responseBytes:Buffer.byteLength(body),
  columns:["municipality",...props]
},null,2)+"\n");

console.log(JSON.stringify({status:api.status(),ok:api.ok(),modelId,responseBytes:Buffer.byteLength(body)},null,2));
await browser.close();
if (!api.ok()) process.exit(3);
