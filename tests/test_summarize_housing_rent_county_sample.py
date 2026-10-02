#!/usr/bin/env python3
from __future__ import annotations
import subprocess,sys,tempfile,unittest
from pathlib import Path
import pandas as pd

ROOT=Path(__file__).resolve().parents[1]
SCRIPT=ROOT/"scripts"/"summarize_housing_rent_county_sample.py"
INPUT=ROOT/"data"/"housing-rent-city-sample-2025.csv"

class RentCountySummaryTest(unittest.TestCase):
    def run_it(self,out):
        return subprocess.run([
            sys.executable,str(SCRIPT),"--input",str(INPUT),"--out",str(out)
        ],cwd=ROOT,text=True,capture_output=True)

    def test_current_county_pool(self):
        with tempfile.TemporaryDirectory() as td:
            out=Path(td)/"county.csv"
            p=self.run_it(out)
            self.assertEqual(p.returncode,0,p.stderr)
            df=pd.read_csv(out).set_index("county")
            self.assertEqual(int(df.loc["Utenos","sample_n"]),6)
            self.assertEqual(int(df.loc["Utenos","localities_n"]),2)
            self.assertEqual(df.loc["Utenos","quality"],"C")
            self.assertAlmostEqual(float(df.loc["Utenos","rent_month_median_eur"]),255.0)
            self.assertEqual(int(df.loc["Alytaus","sample_n"]),6)
            self.assertEqual(int(df.loc["Marijampolės","sample_n"]),7)
            self.assertEqual(int(df.loc["Tauragės","sample_n"]),2)
            self.assertEqual(int(df.loc["Telšių","sample_n"]),4)

if __name__=="__main__":
    unittest.main()
