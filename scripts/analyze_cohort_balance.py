"""Track birth-year groups, distinguishing deaths from a residual stock balance."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / 'research/raw/cohort-size-20261125'


def cell(dataset, age, year):
    index = 0
    keys = {'age': f'Y{age}', 'time': str(year), 'sex': 'F'}
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
    return dict(population='LT residents, female, birth years 1985-1999',
                stock_dates=['2010-01-01', '2025-01-01'],
                death_event_years=[2010, 2024],
                residual_definition='net migration plus statistical adjustments; not gross emigration',
                rows=rows, totals=totals)


if __name__ == '__main__':
    print(json.dumps(calculate(), indent=2))
