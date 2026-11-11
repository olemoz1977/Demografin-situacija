# Demografinė situacija

- Prieš keisdamas tyrimą, duomenis ar svetainę, perskaityk [T0 tęstinumo taisyklę](research/RESEARCH-CONTINUITY-RULE.md). Ji apibrėžia tyrimo, publikavimo ir patikrų eigą.
- Patikrintą išvadą išsaugok kanoniniame registre `data/research-findings-register.json` ir susiek su įrodymų failu. Nurodyk šaltinį, laikotarpį, populiaciją ir būseną. Hipotezėms ir modeliuotiems rezultatams naudok T0 numatytas būsenas.
- Išsaugok registruotų išvadų ID. Jei išvada atnaujinama, paneigiama arba perkeliama, laikykis T0 pakeitimų atsekamumo taisyklių. Kartu sutikrink nuo jos priklausančius tekstus, lenteles ir grafikus.
- Keisdamas modulio turinį ar navigaciją, sutikrink rodomas išvadas su registru. Patikrink, ar skelbiamos išvados pasiekiamos tinkamame modulyje, įskaitant nuorodas iš Apžvalgos.
- Keisdamas registrą ar publikavimo žymas, paleisk `python -m unittest -v tests/test_research_registry.py`. Registro tęstinumo ir gyvos svetainės patikroms vadovaukis `.github/workflows/research-continuity.yml` ir `.github/workflows/live-publication-qa.yml`.
