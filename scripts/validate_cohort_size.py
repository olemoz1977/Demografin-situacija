"""Decompose observed births, using approximate annual female exposure."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / 'research/raw/cohort-size-20261125'
p = json.loads((RAW / 'demo_pjan.json').read_text())
b = json.loads((RAW / 'demo_fasec.json').read_text())

def value(dataset, age, year):
    index = 0
    for dimension, size in zip(dataset['id'], dataset['size']):
        key = {'age': age, 'time': str(year), 'sex': 'F' if dataset is p else 'T'}.get(
            dimension, next(iter(dataset['dimension'][dimension]['category']['index'])))
        index = index * size + dataset['dimension'][dimension]['category']['index'][key]
    return dataset['value'][str(index)]

def exposure(age, year):
    return (value(p, f'Y{age}', year) + value(p, f'Y{age}', year + 1)) / 2

results = []
for base in [2010, 2015, 2019]:
    end, ages = 2024, range(20, 45)
    f0 = {a: value(b, f'Y{a}', base) / exposure(a, base) for a in ages}
    f1 = {a: value(b, f'Y{a}', end) / exposure(a, end) for a in ages}
    structure = sum((exposure(a,end)-exposure(a,base))*(f0[a]+f1[a])/2 for a in ages)
    rate = sum((f1[a]-f0[a])*(exposure(a,base)+exposure(a,end))/2 for a in ages)
    b0 = sum(value(b, f'Y{a}', base) for a in ages)
    b1 = sum(value(b, f'Y{a}', end) for a in ages)
    assert abs(structure + rate - (b1 - b0)) < 1e-8
    results.append(dict(base=base,end=end,b0=b0,b1=b1,structure=structure,rate=rate,
        structure_share=structure/(b1-b0),coverage_base=b0/value(b,'TOTAL',base),
        coverage_end=b1/value(b,'TOTAL',end)))
print(json.dumps(results, indent=2))
