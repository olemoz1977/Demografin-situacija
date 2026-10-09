#!/usr/bin/env python3
"""Single-run, zero-EUR, read-only freshness audit of public VDA/RC grid 2559.
Never publish individual grid records. Only counts/date fields from tiny samples.
"""
import json
from urllib.request import urlopen, Request
from urllib.error import HTTPError
from urllib.parse import quote
from socket import timeout
ROOT="https://get.data.gov.lt/datasets/gov/lsd/butu_pirkimai_gardelese/ButuPirkimas/"
queries={
 "basic_first": "?_limit=2",
 "sorted_last": "?sort(-data_nuo)&limit(2)",
 "selected_sorted_last": "?select(data_nuo)&sort(-data_nuo)&limit(2)",
 "year_2025": "?select(data_nuo)&data_nuo=2025-01-01&limit(2)"
}
out={"dataset":"data.gov.lt/datasets/2559","table":"ButuPirkimas","run_scope":"small read-only public API probes, no row content saved","queries":{}}
for name,q in queries.items():
 entry={}
 try:
  req=Request(ROOT+q,headers={"User-Agent":"lt-civic-housing-2025-availability-check/1.0","Accept":"application/json"})
  with urlopen(req,timeout=12) as resp:
   entry["http"]=resp.status
   body=resp.read(120000)
  obj=json.loads(body)
  rows=obj.get("_data",obj.get("data",[])) if isinstance(obj,dict) else []
  if not isinstance(rows,list):rows=[]
  entry["returned_small_sample"]=len(rows)
  entry["observed_periods"]=sorted({str(r.get("data_nuo",""))[:10] for r in rows if isinstance(r,dict) and r.get("data_nuo") is not None})
  entry["has_more_marker"]=bool(obj.get("_page",{}).get("next")) if isinstance(obj,dict) else None
 except HTTPError as e:
  entry["http"]=e.code
 except Exception as exc:
  entry["error"]=type(exc).__name__
 out["queries"][name]=entry
print(json.dumps(out,ensure_ascii=False,indent=2))
