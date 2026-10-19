# Design

## Context

Voir `proposal.md`. État constaté : `npm test` (59/59) et `npm run build` passent ; thème clair partiel
(modules et leçon restent sombres) ; minuteur d'examen codé à 30 s ; types `order_steps`,
`technique_decoder`, `true_false`, `kanji_choice`, `term_choice` jamais vus dans un navigateur.
Référentiel : FFAB pour les kyu, CSDGE pour le shodan ; 6k et 5k complets, 4k à shodan `à compléter` ;
~25 termes sans kanji vérifié ; 2 faits à source unique.

## Goals / Non-Goals

**Goals** : rendre M1 (6e–5e kyu) utilisable et honnête sur ses sources.
**Non-Goals** : déploiement, grades au-delà du 5e kyu, médias.

## Decisions

1. **Référence principale dans les données, pas dans la spec** : `referencePrincipale` par fichier de
   grade. Le choix FFAB / FLAM pour les kyu reste ainsi une décision de contenu, réversible sans
   changer le code. Par défaut : FFAB (seul programme kyu officiel et actuel publié en France) ; FLAM
   (Luxembourg, 2011, indicatif) en variante.
2. **Thème par jetons** : les écrans restés sombres passent aux classes du thème (jetons `aiki.*`)
   plutôt qu'à des couleurs codées en dur.
3. **`dureeAppel` dans `content/examen.yaml`**, 30 s par défaut, pour ne pas casser le contenu existant.
4. **Vérification navigateur manuelle** guidée par `/demo` (un exercice par type), consignée dans
   `docs/integration.md` avec captures ; pas de framework de test de bout en bout à ce stade (coût).

## Risks / Trade-offs

- [Choix FFAB contesté si l'utilisateur pratique au Luxembourg] → bascule par simple changement de
  `referencePrincipale` et des variantes.
- [Vérification manuelle non rejouable] → liste de contrôle fixe par type dans `docs/integration.md`.

## Open Questions

- Référence principale des kyu : FFAB (par défaut) ou FLAM ? Réponse attendue de l'utilisateur ; sans
  effet sur les tâches (valeur de données).
