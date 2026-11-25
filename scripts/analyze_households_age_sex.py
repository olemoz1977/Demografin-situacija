"""Reproduce within-group living-alone rates and a descriptive decomposition."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
SOURCE='data/households-lfs-age-sex-source-2024-2025.json'
j=json.loads((ROOT/SOURCE).read_text())
AGES=['Y18-24','Y25-54','Y55-64','Y_GE65']
def cell(geo,year,sex,age,comp):
    selection=dict(freq='A',sex=sex,age=age,phhcomp=comp,unit='THS_PER',wstatus='POP',geo=geo,time=year)
    n=0
    for dim,size in zip(j['id'],j['size']):
        n=n*size+j['dimension'][dim]['category']['index'][selection[dim]]
    return dict(selection=selection,value=j['value'].get(str(n)),status=j.get('status',{}).get(str(n),''))
rows=[]
for geo in ['LT','EU27_2020']:
 for year in ['2024','2025']:
  for age in AGES+['Y_GE18']:
   for sex in ['T','M','F']:
    num=cell(geo,year,sex,age,'A1_NCH');den=cell(geo,year,sex,age,'TOTAL')
    assert num['value'] is not None and den['value']>0 and 0<=num['value']<=den['value']
    rows.append(dict(geo=geo,year=year,age=age,sex=sex,numerator=num,denominator=den,pct=100*num['value']/den['value']))
# Eight mutually exclusive age-sex strata. Normalise from their own totals.
strata={g:[r for r in rows if r['geo']==g and r['year']=='2025' and r['age'] in AGES and r['sex'] in ['M','F']] for g in ['LT','EU27_2020']}
totals={g:sum(r['denominator']['value'] for r in rs) for g,rs in strata.items()}
composition=rates=0
contributions=[]
for lt,eu in zip(strata['LT'],strata['EU27_2020']):
 assert (lt['age'],lt['sex'])==(eu['age'],eu['sex'])
 wl=lt['denominator']['value']/totals['LT'];we=eu['denominator']['value']/totals['EU27_2020'];rl=lt['pct']/100;re=eu['pct']/100
 c=100*(wl-we)*(rl+re)/2;r=100*(rl-re)*(wl+we)/2
 composition+=c;rates+=r;contributions.append(dict(age=lt['age'],sex=lt['sex'],composition_pp=c,within_group_rates_pp=r))
observed={g:100*sum(r['numerator']['value'] for r in rs)/totals[g] for g,rs in strata.items()}
assert abs(observed['LT']-observed['EU27_2020']-composition-rates)<1e-10
for geo in ['LT','EU27_2020']:
 for year in ['2024','2025']:
  # Independent totals supplied by Eurostat, not assumed exact after rounding.
  for comp in ['TOTAL','A1_NCH']:
   summed=sum(cell(geo,year,'T',a,comp)['value'] for a in AGES)
   overall=cell(geo,year,'T','Y_GE18',comp)['value']
   assert abs(summed-overall)<=.31,(geo,year,comp,summed,overall)
out=dict(dataset='lfst_hhindws',survey='EU-LFS',source_file=SOURCE,updated=j['updated'],formula='100*A1_NCH/TOTAL within identical sex, age, year, geo, POP and THS_PER',rows=rows,decomposition_2025=dict(method='Symmetric Kitagawa arithmetic decomposition, 8 broad age-sex groups; not causal',composition_pp=composition,within_group_rates_pp=rates,observed_pct_from_strata=observed,contributions=contributions),limitations=['Private household survey population only; collective households excluded.','A1_NCH excludes single adults living with resident children; not a marital-status or loneliness measure.','Age bands overlap elsewhere in source: only four disjoint bands used here.','Source counts rounded to 0.1 thousand persons; direct totals may differ slightly from sums.','No sampling standard errors available; no significance or causal attribution.','EU-SILC age findings and EU-LFS results must not be joined into one series.'])
(ROOT/'data/households-lfs-age-sex-analysis.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print('PASS: rates, raw-source age totals, bounds and decomposition identity')
print('2025 decomposition pp:',round(composition,3),round(rates,3))
