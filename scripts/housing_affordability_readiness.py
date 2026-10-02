#!/usr/bin/env python3
"""Generate a non-failing publication-readiness report for housing affordability.

This script is a gate reporter, not a data producer. Expected research blockers
(sale/rent source waiting) result in ready_for_publication=false but exit code 0.
Configuration corruption still raises an error.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

EXPECTED_COUNTIES = {
    "Alytaus",
    "Kauno",
    "Klaipėdos",
    "Marijampolės",
    "Panevėžio",
    "Šiaulių",
    "Tauragės",
    "Telšių",
    "Utenos",
    "Vilniaus",
}


def gate(name: str, passed: bool, detail: str, blocker: str | None = None) -> dict[str, Any]:
    return {
        "name": name,
        "status": "PASS" if passed else "BLOCKED",
        "detail": detail,
        **({"blocker": blocker} if blocker and not passed else {}),
    }


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument(
        "--input",
        type=Path,
        default=Path("data/housing-affordability-input.json"),
    )
    p.add_argument(
        "--out",
        type=Path,
        default=Path("research/housing-affordability-readiness.json"),
    )
    args = p.parse_args()

    cfg = json.loads(args.input.read_text(encoding="utf-8"))

    required = cfg.get("required_fields_not_yet_validated")
    acquisition = cfg.get("acquisition_status")
    income_model = cfg.get("income_model_2025_11")
    if not isinstance(required, dict) or not isinstance(acquisition, dict):
        raise ValueError("Missing readiness configuration sections")
    if not isinstance(income_model, dict):
        raise ValueError("Missing income_model_2025_11")

    county_income = income_model.get("county_model_net_eur_month") or {}
    income_counties = set(county_income)
    income_pass = (
        income_model.get("quality") == "B-modelled"
        and income_counties == EXPECTED_COUNTIES
        and all(float(v) > 0 for v in county_income.values())
        and acquisition.get("income_layer", {}).get("status") == "source_locked"
    )

    sale_state = acquisition.get("sale_layer", {})
    sale_required = required.get("sale_price_eur_m2")
    sale_pass = (
        sale_required is None
        and sale_state.get("status") in {"ready", "publication_ready", "source_locked"}
        and sale_state.get("main_layer_status") in {None, "READY", "PUBLICATION_READY"}
    )

    rent_state = acquisition.get("rent_layer", {})
    rent_required = required.get("rent")
    rent_pass = (
        rent_required is None
        and rent_state.get("status") in {"ready", "publication_ready", "source_locked"}
        and rent_state.get("main_layer_status") in {None, "READY", "PUBLICATION_READY"}
    )

    no_city_as_county = any(
        "No county-center substitution" in str(note)
        for note in cfg.get("notes", [])
    )

    gates = [
        gate(
            "income_10_counties",
            income_pass,
            (
                f"Income model covers {len(income_counties)}/10 counties; "
                f"quality={income_model.get('quality')}"
            ),
            "Income layer must cover exactly 10 counties as B-modelled or stronger.",
        ),
        gate(
            "sale_actual_apartment_transactions",
            sale_pass,
            (
                f"sale status={sale_state.get('status')}; "
                f"required={sale_required}"
            ),
            (
                "Waiting for an official RC 2024 actual-apartment transaction layer "
                "covering 60 municipalities / 10 counties with a verified aggregation method."
            ),
        ),
        gate(
            "rent_private_1room_10_counties",
            rent_pass,
            (
                f"rent status={rent_state.get('status')}; "
                f"main_layer_status={rent_state.get('main_layer_status')}; "
                f"required={rent_required}"
            ),
            (
                "Waiting for a 2025 private long-term 1-room asking-rent layer "
                "covering all 10 counties with an accepted sample/methodology gate."
            ),
        ),
        gate(
            "no_county_center_substitution",
            no_city_as_county,
            "Repository notes explicitly prohibit relabelling city values as county values.",
            "Methodology must explicitly prohibit county-center substitution.",
        ),
    ]

    blockers = [
        {
            "gate": g["name"],
            "reason": g["blocker"],
        }
        for g in gates
        if g["status"] == "BLOCKED"
    ]

    ready = not blockers

    report = {
        "audit_date": cfg.get("audit_date"),
        "target": "10 Lithuania counties; working 25–30-year-old couple; no children",
        "formula": (
            "m²/year = [(2 × monthly net income × 12) – annual rent] "
            "/ apartment sale price EUR/m²"
        ),
        "ready_for_publication": ready,
        "decision": "READY" if ready else "DO_NOT_PUBLISH",
        "gates": gates,
        "blockers": blockers,
        "non_publication_sources": {
            "sale_grid_2559": "QA_DIAGNOSTIC_ONLY",
            "smart_continent_sale": "QA_DIAGNOSTIC_ONLY",
            "smart_continent_bi3_rent": "QA_DIAGNOSTIC_ONLY",
            "vda_5_city_rent": "OFFICIAL_VALIDATION_ONLY",
            "city_search_index_rent": "RESEARCH_SAMPLE_ONLY",
        },
        "expected_next_inputs": {
            "sale": sale_required,
            "rent": rent_required,
        },
        "source": str(args.input),
    }

    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
