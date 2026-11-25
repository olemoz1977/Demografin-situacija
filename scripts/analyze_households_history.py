"""Extract disjoint-age rates and flags without bridging the 2021 break."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
j=json.loads((ROOT/'data/households-lfs-history-source.json').read_text())
def cell(geo,year,age,comp):
 sel=dict(freq='A',sex='T',age=age,phhcomp=comp,unit='THS_PER',wstatus='POP',geo=geo,time=year);i=0
 for d,n in zip(j['id'],j['size']):i=i*n+j['dimension'][d]['category']['index'][sel[d]]
 return dict(selection=sel,value=j['value'].get(str(i)),status=j.get('status',{}).get(str(i),''))
rows=[]
for geo in ['LT','EU27_2020']:
 for year in j['dimension']['time']['category']['index']:
  if int(year)<2014:continue
  for age in ['Y18-24','Y25-54','Y55-64','Y_GE65']:
   num=cell(geo,year,age,'A1_NCH');den=cell(geo,year,age,'TOTAL')
   pct=100*num['value']/den['value'] if num['value'] is not None and den['value'] else None
   if pct is not None:assert 0<=pct<=100
   rows.append(dict(geo=geo,year=year,age=age,numerator=num,denominator=den,pct=pct))
lookup={(r['geo'],r['year'],r['age']):r for r in rows}
for geo in ['LT','EU27_2020']:
 for age in ['Y18-24','Y25-54','Y55-64','Y_GE65']:
  assert lookup[geo,'2021',age]['numerator']['status']=='b'
  assert lookup[geo,'2021',age]['denominator']['status']=='b'
a=lookup['LT','2024','Y_GE65'];b=lookup['LT','2025','Y_GE65']
summary=dict(total_growth_pct=100*(b['denominator']['value']/a['denominator']['value']-1),alone_growth_pct=100*(b['numerator']['value']/a['numerator']['value']-1),rate_change_pp=b['pct']-a['pct'])
out=dict(dataset='lfst_hhindws',source_file='data/households-lfs-history-source.json',rows=rows,lt_65plus_2024_2025=summary,interpretation='2021 carries a break flag. 2024/2025 selected cells are unflagged. No cause is inferred from flag absence or rate growth.')
(ROOT/'data/households-lfs-history-analysis.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print('PASS: 2021 break flags and within-group rate bounds; LT65+ change',summary)
