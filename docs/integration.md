# Suivi d'intégration

Résultats des commandes de contrôle lancées par l'orchestration sur l'arbre de travail (pas
seulement sur `main`). Les corrections reviennent au propriétaire indiqué (voir `docs/contrat.md`) ;
l'orchestration ne corrige pas les fichiers des autres.

| Date | Commande | Résultat | Premières erreurs | À corriger par |
|---|---|---|---|---|
| 2026-10-19 14:45 | `npm run content:build` | ✅ succès | — (0 unité : `content/niveaux/` absent) | — |
| 2026-10-19 14:45 | `npm run validate:content` | ❌ échec (3 erreurs, 6 alertes) | `[image-inconnue] fixture fx-image-choice` : `pictos/bokken`, `pictos/jo`, `pictos/obi` absents du manifeste (la famille s'appelle `scenes`) ; alertes `[niveau-vide]` attendues pour les 6 niveaux | technique (`tests/fixtures/demo-types.yaml`) |
| 2026-10-19 14:45 | `npm test` | ✅ succès (5/5) | — (seuls les tests de migration de progression existent) | — |
| 2026-10-19 15:10 | `npm run content:build` | ✅ succès | 1 unité (6k-u1), 64 exercices, lexique 160 | — |
| 2026-10-19 15:10 | `npm run validate:content` | ❌ échec (1 erreur, 7 alertes) | `[decomposition] 6k-u1-l8 ex-6k-u1-l8-1 : decomposition { attaque, technique, variante? } incomplète` (l'erreur `pictos/*` de la fixture est corrigée) | contenu (`content/niveaux/6k/6k-u1.yaml`) |
| 2026-10-19 15:10 | `npm test` | ❌ 58/59 | `validate-content.test.mts` « the current content, demo and fixture have no error » : même erreur de décomposition | contenu |
