"""Compare same-year 65+ living-alone rates from two separate surveys."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
s=json.loads((ROOT/'data/households-silc-65plus-history-source.json').read_text())
l=json.loads((ROOT/'data/households-lfs-history-analysis.json').read_text())
rows=[]
for g in ['LT','EU27_2020']:
 for year in ['2021','2022','2023','2024','2025']:
  selection=dict(freq='A',sex='T',hhcomp='A1_GE65',unit='PC',geo=g,time=year);n=0
  for d,size in zip(s['id'],s['size']):n=n*size+s['dimension'][d]['category']['index'][selection[d]]
  silc=s['value'][str(n)];flag=s.get('status',{}).get(str(n),'')
  lfs=next(r for r in l['rows'] if (r['geo'],r['year'],r['age'])==(g,year,'Y_GE65'))
  rows.append(dict(geo=g,year=year,silc_pct=silc,silc_status=flag,silc_selection=selection,lfs_pct=lfs['pct'],lfs_numerator_status=lfs['numerator']['status'],lfs_denominator_status=lfs['denominator']['status']))
lt={r['year']:r for r in rows if r['geo']=='LT'}
assert lt['2024']['silc_status']=='p' and lt['2025']['silc_status']=='p'
assert abs(lt['2025']['silc_pct']-lt['2024']['silc_pct']-5.0)<1e-9
out=dict(rows=rows,lt_change_2024_2025_pp=dict(silc=lt['2025']['silc_pct']-lt['2024']['silc_pct'],lfs=lt['2025']['lfs_pct']-lt['2024']['lfs_pct']),interpretation='Both surveys support the direction of LT growth in their estimates; they do not establish the same magnitude or its cause.',caution='Survey sample errors and differences are not quantified; do not average surveys or label one erroneous.')
(ROOT/'data/households-senior-survey-comparison.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print('PASS: five same-year comparisons, provisional SILC flags and change arithmetic')
print(out['lt_change_2024_2025_pp'])
