#!/usr/bin/env python3
"""Read-only LDP data availability probe. Never logs/releases individual records."""
import json
import urllib.error
import urllib.parse
import urllib.request

TIMEOUT=25
HEADERS={"Accept":"application/json","User-Agent":"Demografine-analize-LDP-source-availability/1.0"}
def read_json(url,body=None):
    args={"method":"POST","data":json.dumps(body).encode("utf-8")} if body is not None else {}
    req=urllib.request.Request(url,headers={**HEADERS,**({"Content-Type":"application/json"} if body is not None else {})},**args)
    try:
        with urllib.request.urlopen(req,timeout=TIMEOUT) as resp:
            raw=resp.read(2_000_000)
            return json.loads(raw)
    except urllib.error.HTTPError as exc:
        return {"error":"HTTP "+str(exc.code),"detail":exc.read(200).decode("utf-8",errors="replace")}
    except Exception as exc:
        return {"error":type(exc).__name__,"detail":str(exc)[:190]}

def summarise_rows(rows):
    result=[]
    for r in rows:
        if not isinstance(r,dict):continue
        src=str(r.get("pajamu_saltinis","")).strip()
        unit=str(r.get("matavimo_vienetai","")).strip()
        # Only aggregated values of total income where clear, never individual records.
        if (("viso" in src.lower() or "bendr" in src.lower()) and "namų ūkiui" in unit.lower()):
            result.append({"period":r.get("laikotarpis"),"county":r.get("apskritys"),"category":src,"unit":unit,"value":r.get("s3r908"),"symbol":r.get("sutartinis_simbolis")})
    return result

result={"schema_version":1,"probe_type":"PUBLIC_DATA_AVAILABILITY_AND_AGGREGATE_ONLY","sources":{}}
prefix="https://api.dataportal.gov.lt/namespaces/188600177/tables/"
table="S3R908_M3080109_lt"
src={"source":"https://dataportal.gov.lt/lt/datasets/sd003622","table":table}
meta=read_json(prefix+table+"/schema")
src["schema_status"]="ERROR" if "error" in meta else "OK"
src["schema_error"]=meta.get("error")
probe=read_json(prefix+table+"/query",{"limit":1,"offset":0})
src["minimal_query"]={"http_error":probe.get("error"),"count":probe.get("total"),"returned":len(probe.get("data",[]))}
control_table="S3R640_M3060807_1_lt"
control=read_json(prefix+control_table+"/query",{"select":"apskritys,s3r640","filter":"laikotarpis._co=2024","sort":"-s3r640","limit":3})
src["documented_working_example"]={"table":control_table,"http_error":control.get("error"),"count":control.get("total"),"returned":len(control.get("data",[]))}
for year in (2024,2025):
    out=read_json(prefix+table+"/query",{"filter":f"laikotarpis._co={year}","limit":1200,"offset":0})
    src[str(year)]={"http_error":out.get("error"),"count":out.get("total"),"returned":len(out.get("data",[])),"categories":sorted({str(r.get("pajamu_saltinis","")).strip() for r in out.get("data",[]) if isinstance(r,dict)})[:70],"units":sorted({str(r.get("matavimo_vienetai","")).strip() for r in out.get("data",[]) if isinstance(r,dict)}),"aggregate_candidate_rows":summarise_rows(out.get("data",[]))[:20]}
result["sources"]["ldp_county_household_income"]=src

# These are anonymised EU-SILC survey records. Probe field names & year availability ONLY.
# Do not log, export, commit, or save any individual-level record.
base="https://get.data.gov.lt/datasets/gov/lsd/pajamu_ir_gyvenimo_salygos/"
for model in ("NamuUkis","Asmens"):
    out=read_json(base+model+"/?_limit=5")
    rows=out.get("_data",out.get("data",[]))
    if not isinstance(rows,list):rows=[]
    row_years=list(sorted({str(r.get("metai"))[:4] for r in rows if isinstance(r,dict) and r.get("metai") is not None}))
    result["sources"]["eu_silc_"+model]={"source_url":base+model,"error":out.get("error"),"keys":sorted(rows[0].keys()) if rows and isinstance(rows[0],dict) else [],"sample_years":row_years,"sample_count":len(rows),"sample_not_comprehensive":True}

print(json.dumps(result,ensure_ascii=False,indent=2))
