"""Reproduce household shares from the archived Eurostat JSON-stat response."""
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
SOURCE = 'data/sources/eurostat-lfst-hhnhtych-20261122.json'
j = json.loads((ROOT / SOURCE).read_text())
def cell(geo, comp, children='TOTAL', year='2025'):
    selection = dict(freq='A', agechild='TOTAL', n_child=children, phhcomp=comp, unit='THS_HH', geo=geo, time=year)
    index = 0
    for dim, size in zip(j['id'], j['size']):
        index = index * size + j['dimension'][dim]['category']['index'][selection[dim]]
    value = j['value'][str(index)]
    return dict(selection=selection, value=value, status=j.get('status', {}).get(str(index), ''))
result = dict(dataset='lfst_hhnhtych', survey='EU-LFS', source_file=SOURCE, updated=j['updated'], unit='THS_HH', year=2025,
    child_definition='Resident household member aged under 18; not the EU-SILC dependent-child definition.',
    formula='100 * numerator / denominator; percentages rounded to one decimal only for presentation.',
    warning='Cross-sectional household composition, not completed fertility, parity progression or causal evidence.', countries={})
for geo in ['LT', 'EU27_2020']:
    total = cell(geo, 'TOTAL'); children = cell(geo, 'DCH')
    metrics = {}
    for key, numerator, denominator in [
        ('single_adult_without_children', cell(geo, 'A1_NCH'), total),
        ('households_with_children', children, total),
        ('one_child_among_households_with_children', cell(geo, 'DCH', '1'), children),
        ('two_children_among_households_with_children', cell(geo, 'DCH', '2'), children),
        ('three_plus_children_among_households_with_children', cell(geo, 'DCH', 'GE3'), children),
        ('single_adult_among_households_with_children', cell(geo, 'A1_CH'), children)]:
        metrics[key] = dict(numerator=numerator, denominator=denominator, percentage=100*numerator['value']/denominator['value'])
    result['countries'][geo] = metrics
(ROOT / 'data/households-lfs-2025.json').write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n')
if __name__ == '__main__':
    for geo, metrics in result['countries'].items():
        print(geo, {key:round(x['percentage'],1) for key,x in metrics.items()})
