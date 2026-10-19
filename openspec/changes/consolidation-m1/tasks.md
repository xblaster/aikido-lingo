# Tasks

## 1. Contrat et référentiel

- [ ] 1.1 [orchestration] Ajouter au contrat `referencePrincipale`, `etat`, `variantes` (référentiel), `sourceUnique` (histoire) et `dureeAppel` (examen) ; consigner au journal — vérif : entrée datée dans `docs/contrat.md`
- [ ] 1.2 [recherche] Renseigner `referencePrincipale` et `etat` dans les 6 fichiers de grade (6k, 5k `complet` ; autres `a-completer`) et nommer les variantes — vérif : les 6 fichiers parsent et ont les deux champs
- [ ] 1.3 [recherche] Marquer `sourceUnique: true` les faits concernés de `histoire.yaml` (arrivée en France 1951, création FFAAA 1983) — vérif : `grep sourceUnique` liste ces faits
- [ ] 1.4 [recherche] Lire le livret kyu FFAB (46 p.) et confirmer ou corriger `5k.yaml` ; consigner dans `sources.md` — vérif : source marquée « lue » dans `sources.md`

## 2. Validation et affichage du référentiel

- [ ] 2.1 [technique] `validate:content` : échec si une unité `publie` appartient à un niveau `a-completer` ; échec si un terme a un kanji sans source — vérif : tests node:test avec deux fixtures en échec
- [ ] 2.2 [technique] Présentation de niveau : référence principale et variantes affichées ; lexique sans kanji quand absent ; « selon … » pour `sourceUnique` — vérif : rendu sur 5K dans `/`

## 3. Simulateur de passage de grade

- [ ] 3.1 [technique] Lire `dureeAppel` par grade dans `examen.yaml` (30 s par défaut) — vérif : test unitaire sur la durée, 45 s affichées avec une fixture
- [ ] 3.2 [contenu] Fixer `dureeAppel` pour 5K dans `content/examen.yaml` si le référentiel donne une indication, sinon laisser le défaut — vérif : `npm run validate:content` passe

## 4. Thème et vérification navigateur

- [ ] 4.1 [technique] Thème clair sur l'écran de leçon (intro, exercices, fin) et les 4 modules, via les jetons — vérif : aucune zone sombre en thème clair, contraste AA
- [ ] 4.2 [technique] Vérifier dans un navigateur (bureau + mobile 375 px) les 16 types via `/demo` et les 4 modules, en thèmes sombre et clair ; consigner résultats et captures dans `docs/integration.md` — vérif : une ligne par type et par module, état OK / à corriger
- [ ] 4.3 [technique] Corriger les défauts relevés en 4.2 — vérif : toutes les lignes OK, `npm test` et `npm run build` passent
