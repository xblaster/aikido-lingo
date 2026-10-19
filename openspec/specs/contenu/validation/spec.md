# contenu/validation Specification

## Purpose

Définit la chaîne de qualité du contenu : construction YAML → JSON, validation automatique, les cinq
passes de production (recherche, rédaction, validation automatique, revérification indépendante,
relecture humaine) et leur traçabilité. Le processus est décrit dans `content/README.md`.

## Requirements

### Requirement: Construction du contenu
`npm run content:build` SHALL convertir le contenu YAML de `content/` en JSON dans
`src/data/generated/` (non versionné), en ignorant les fichiers et dossiers dont le nom commence par
`_`. La construction SHALL être lancée par `npm run dev`, `npm run build` et `npm test`.

#### Scenario: Exemple ignoré
- **WHEN** `content/_exemples/` contient une unité
- **THEN** cette unité n'apparaît pas dans le JSON généré

### Requirement: Validation automatique bloquante
`npm run validate:content` SHALL vérifier au minimum le schéma, les sources, les volumes, les types
d'exercices, l'unicité des identifiants, la cohérence des réponses et l'existence des fiches de
recherche. Elle SHALL sortir en erreur si une règle est violée, et `npm run build` SHALL échouer
dans ce cas.

#### Scenario: Contrôles couverts
- **WHEN** on lit la liste des règles du validateur
- **THEN** on y trouve : schéma des unités, leçons et exercices ; présence et type des sources ; volumes 5 × 8 × 8 et leçon de révision ; type et champs obligatoires ; au moins 3 types par leçon ; identifiants uniques ; bonne réponse parmi les options, paires complètes, tuiles suffisantes, décomposition cohérente ; fiche de recherche existante

#### Scenario: Bonne réponse absente des options
- **WHEN** la `correctAnswer` d'un `meaning_choice` ne correspond à aucune option
- **THEN** la validation échoue en nommant l'exercice

#### Scenario: Niveau incomplet en cours de rédaction
- **WHEN** un niveau ne contient encore que 2 unités sur 5
- **THEN** la validation signale le volume manquant comme avertissement sans bloquer, et bloque toute unité présente mais incomplète

### Requirement: Revérification indépendante
Chaque leçon SHALL être revérifiée par une session ou une personne différente de son auteur, qui
consigne le résultat dans `verification` (`date`, `verificateur`, `session`, `ecarts`). La session
de vérification SHALL différer de `auteur.session`. Une leçon avec un écart `ouvert` SHALL NOT
passer en `relu`.

#### Scenario: Auto-vérification
- **WHEN** `verification.session` est égal à `auteur.session`
- **THEN** la validation signale que la revérification n'est pas indépendante

### Requirement: Relecture humaine avant publication
Une unité SHALL NOT passer au statut `relu` ou `publie` sans relecture par un enseignant d'aïkido
qualifié (DEJEPS mention aïkido, BEES aïkido, brevet fédéral, ou 3e dan au moins), consignée dans
`review: { statut, relecteur, qualification, date }`.

#### Scenario: Statut relu sans relecteur
- **WHEN** une unité a `review.statut: relu` sans `relecteur` ni `qualification`
- **THEN** la validation refuse l'unité

### Requirement: Tests automatisés
`npm test` SHALL exécuter les tests unitaires du moteur (comparaison des réponses, correction de
chaque type, migration de la progression) et de la validation.

#### Scenario: Régression sur la comparaison
- **WHEN** une modification fait refuser `Katate-dori` pour `katate dori`
- **THEN** `npm test` échoue
