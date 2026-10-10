#!/usr/bin/env python3
"""Reject missing, untraceable or silently dropped research findings."""
import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REGISTER = "data/research-findings-register.json"
MODULES = {"overview", "fertility", "population", "migration", "family", "housing", "future", "methods"}
VALID_STATUS = {
    "PUBLISHED_FACT", "PUBLISHED_CONTEXT", "PUBLISHED_METHOD_ONLY",
    "VERIFIED_UNPUBLISHED", "MODELLED_UNPUBLISHED", "RESEARCH_BLOCKED", "SUPERSEDED",
}

def load_current():
    return json.loads((ROOT / REGISTER).read_text(encoding="utf-8"))

def validate(data):
    failures = []
    ids = set()
    if data.get("budget_eur") != 0:
        failures.append("The project's documented research budget must remain 0 EUR.")
    modules = data.get("module_inventory", [])
    if {m.get("module") for m in modules} != MODULES or len(modules) != len(MODULES):
        failures.append("Eight site module inventory entries required, even if only PENDING audit.")
    if data.get("governance", {}).get("remove_existing_finding_from_registry_forbidden") is not True:
        failures.append("No-silent-removal governance rule must remain enabled.")
    for i, row in enumerate(data.get("findings", [])):
        ident = row.get("id", "")
        if not re.fullmatch(r"[A-Z][A-Z0-9-]+", ident):
            failures.append(f"Finding #{i} needs a stable uppercase ID.")
        if ident in ids:
            failures.append(f"Duplicate finding ID {ident}.")
        ids.add(ident)
        if row.get("area") not in MODULES:
            failures.append(f"{ident}: unknown module.")
        if row.get("status") not in VALID_STATUS:
            failures.append(f"{ident}: invalid status {row.get('status')}.")
        for field in ("title", "period", "statement", "next_action"):
            if not isinstance(row.get(field), str) or len(row[field].strip()) < 4:
                failures.append(f"{ident}: missing required {field}.")
        sources = row.get("source_urls", [])
        if not sources or not all(isinstance(x, str) and x.startswith("https://") for x in sources):
            failures.append(f"{ident}: explicit HTTPS origin sources required.")
        evidence = row.get("evidence_files", [])
        if not evidence or not all(isinstance(p, str) and (ROOT / p).is_file() for p in evidence):
            failures.append(f"{ident}: source evidence must exist in current repository checkout.")
        public = row.get("publication", {})
        if public.get("module") not in MODULES:
            failures.append(f"{ident}: publication destination must be a real module.")
        if row.get("status", "").startswith("PUBLISHED_"):
            path, marker = public.get("file"), public.get("marker")
            if not path or not marker or not (ROOT / path).is_file():
                failures.append(f"{ident}: published requires a real file + exact public marker.")
            elif marker not in (ROOT / path).read_text(encoding="utf-8"):
                failures.append(f"{ident}: previously published finding not visible in {path} (STOP).")
        elif row.get("status") == "SUPERSEDED":
            if not row.get("superseded_reason") or not row.get("replaced_by"):
                failures.append(f"{ident}: superseded requires written rationale and replacement ID.")
        elif not row.get("blocker"):
            failures.append(f"{ident}: unpublished or blocked item needs explicit reason.")
    if "EU-HH-2025-01" not in ids:
        failures.append("Previously forgotten Eurostat household finding cannot be omitted.")
    return failures

def load_old(base):
    res = subprocess.run(
        ["git", "show", f"{base}:{REGISTER}"],
        cwd=ROOT, capture_output=True, text=True, check=False,
    )
    if res.returncode == 0:
        return json.loads(res.stdout)
    # For initial adoption, the register did not exist in repository history.
    chk = subprocess.run(["git", "cat-file", "-e", f"{base}^{{commit}}"],
                         cwd=ROOT, capture_output=True, check=False)
    if chk.returncode != 0:
        raise ValueError(f"Base git ref {base!r} cannot be resolved.")
    return None

def continuity(old, new):
    if old is None:
        return []
    old_by_id = {r["id"]: r for r in old.get("findings", [])}
    new_by_id = {r["id"]: r for r in new.get("findings", [])}
    failures=[]
    for ident, prior in old_by_id.items():
        current = new_by_id.get(ident)
        if current is None:
            failures.append(f"REMOVED PRIOR FINDING: {ident}. Retain ID and supersede with reason.")
            continue
        if prior.get("status", "").startswith("PUBLISHED_") and not current.get("status", "").startswith("PUBLISHED_"):
            if current.get("status") != "SUPERSEDED":
                failures.append(f"PUBLISHED finding {ident} silently unpublished. Declare SUPERSEDED with replacement.")
        if prior.get("status") == "SUPERSEDED" and current.get("status") != "SUPERSEDED":
            failures.append(f"SUPERSEDED finding {ident} reactivated without documented correction.")
    return failures

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("--base", help="Git ref of prior committed register; supports PR base and main parent")
    args=parser.parse_args()
    current=load_current()
    errors=validate(current)
    if args.base:
        errors.extend(continuity(load_old(args.base), current))
    if errors:
        for error in errors:
            print("FAIL:", error, file=sys.stderr)
        return 1
    print(f"PASS: {len(current['findings'])} research findings registered, "
          f"{len(current['module_inventory'])} modules inventoried; "
          "published facts traced to the site, no previous item lost.")
    return 0

if __name__=="__main__":
    raise SystemExit(main())
