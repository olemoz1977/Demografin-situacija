import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
p = json.loads((ROOT/"research/raw/cohort-size-20261125/demo_pjan.json").read_text())
f = json.loads((ROOT/"research/raw/cohort-size-20261125/demo_frate.json").read_text())
def value(dataset, age, year):
    index = 0
    for dimension, size in zip(dataset["id"], dataset["size"]):
        key = {"age": f"Y{age}", "time": str(year)}.get(dimension, next(iter(dataset["dimension"][dimension]["category"]["index"])))
        index = index * size + dataset["dimension"][dimension]["category"]["index"][key]
    return dataset["value"][str(index)]
def exposure(age, year):
    return (value(p, age, year) + value(p, age, year + 1)) / 2
results = []
for base in [2010, 2015, 2019]:
    end = 2024
    ages = range(20, 45)
    b0 = sum(exposure(a,base)*value(f,a,base) for a in ages)
    b1 = sum(exposure(a,end)*value(f,a,end) for a in ages)
    counterfactual = sum(exposure(a,end)*value(f,a,base) for a in ages)
    structure = sum((exposure(a,end)-exposure(a,base))*(value(f,a,base)+value(f,a,end))/2 for a in ages)
    rates = sum((value(f,a,end)-value(f,a,base))*(exposure(a,base)+exposure(a,end))/2 for a in ages)
    assert abs(structure+rates-(b1-b0)) < 1e-8
    results.append(dict(base=base,end=end,ages="20-44",b0=b0,b1=b1,counterfactual=counterfactual,structure=structure,rate=rates,structure_share=structure/(b1-b0)))
print(json.dumps(results, indent=2))
