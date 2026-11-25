"""Track birth-year groups, distinguishing deaths from a residual stock balance."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / 'research/raw/cohort-size-20261125'


def cell(dataset, age, year):
    index = 0
    keys = {'age': f'Y{age}', 'time': str(year), 'sex': 'F', 'agedef': 'REACH'}
    for dimension, size in zip(dataset['id'], dataset['size']):
        codes = dataset['dimension'][dimension]['category']['index']
        key = keys.get(dimension, next(iter(codes)))
        index = index * size + codes[key]
    # Missing observations must never become zero.
    return dataset['value'][str(index)]


def calculate():
    population = json.loads((RAW / 'demo_pjan.json').read_text())
    deaths = json.loads((RAW / 'demo_mager.json').read_text())
    births = json.loads((ROOT / 'data/birth-sex-history.json').read_text())
    rows = []
    for birth in births['data']:
        year = birth['year']
        # January 1 population = preceding December 31 population.
        # Birth year c therefore maps to age t-1-c on January 1 of t.
        start = cell(population, 2009 - year, 2010)
        end = cell(population, 2024 - year, 2025)
        # demo_mager uses age REACHED: event year minus birth year.
        deceased = sum(cell(deaths, t - year, t) for t in range(2010, 2025))
        change = end - start
        residual = change + deceased
        assert change == -deceased + residual
        rows.append(dict(birth_year=year, female_births=birth['female'],
                         age_jan1_2010=2009-year, age_jan1_2025=2024-year,
                         residents_2010=start, residents_2025=end,
                         deaths_2010_2024=deceased, stock_change=change,
                         migration_plus_adjustment_residual=residual))
    fields = ['female_births', 'residents_2010', 'residents_2025',
              'deaths_2010_2024', 'stock_change',
              'migration_plus_adjustment_residual']
    totals = {key: sum(row[key] for row in rows) for key in fields}
    assert totals['stock_change'] == (-totals['deaths_2010_2024']
                                     + totals['migration_plus_adjustment_residual'])
    result = dict(population='LT residents, female, birth years 1985-1999',
                stock_dates=['2010-01-01', '2025-01-01'],
                death_event_years=[2010, 2024],
                residual_definition='net migration plus statistical adjustments; not gross emigration',
                rows=rows, totals=totals)
    # A separate matched interval; 2010-2011 REACH flows are missing.
    immigration = json.loads((RAW / 'migr_imm8.json').read_text())
    emigration = json.loads((RAW / 'migr_emi2.json').read_text())
    matched = []
    for row in rows:
        c = row['birth_year']
        start = cell(population, 2011-c, 2012)
        end = row['residents_2025']
        deceased = sum(cell(deaths, t-c, t) for t in range(2012, 2025))
        arrivals = sum(cell(immigration, t-c, t) for t in range(2012, 2025))
        departures = sum(cell(emigration, t-c, t) for t in range(2012, 2025))
        net = arrivals-departures
        adjustment = end-start+deceased-net
        assert end-start == -deceased+net+adjustment
        matched.append(dict(birth_year=c, residents_2012=start,
                            residents_2025=end, stock_change=end-start,
                            deaths_2012_2024=deceased, immigration=arrivals,
                            emigration=departures, net_migration=net,
                            accounting_residual=adjustment))
    fields = [k for k in matched[0] if k != 'birth_year']
    sums = {key: sum(row[key] for row in matched) for key in fields}
    # Independent end-point check: 1985-1999 cohorts = ages 25-39 on 2025-01-01.
    assert sums['residents_2025'] == sum(cell(population, a, 2025) for a in range(25, 40))
    assert sums['stock_change'] == (-sums['deaths_2012_2024']
                                   + sums['net_migration'] + sums['accounting_residual'])
    result['matched_migration_period'] = dict(
        stock_dates=['2012-01-01', '2025-01-01'], event_years=[2012, 2024],
        age_definition='REACH', rows=matched, totals=sums,
        missing_2010_2011_reach='Not imputed or replaced with COMPLET ages')
    return result


if __name__ == '__main__':
    print(json.dumps(calculate(), indent=2))
