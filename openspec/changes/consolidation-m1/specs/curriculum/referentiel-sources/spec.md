# curriculum/referentiel-sources

## MODIFIED Requirements

### Requirement: Référentiel par grade
Le dépôt SHALL contenir un référentiel par niveau dans `content/referentiel/` (`6k.yaml`, `5k.yaml`,
`4k.yaml`, `3k.yaml`, `2k-1k.yaml`, `shodan.yaml`) décrivant le programme du grade (attaques,
techniques, formes de travail, termes), et une liste des sources `content/referentiel/sources.md`
avec, pour chacune, sa référence, son URL éventuelle et sa date de consultation. Chaque fichier de
grade SHALL déclarer sa référence principale (`referencePrincipale`) et son état (`etat: complet` ou
`a-completer`) ; les programmes d'autres organismes SHALL figurer comme `variantes` nommées.
L'application SHALL afficher, dans la présentation d'un niveau, sa référence principale et ses
variantes. Aucune unité ne SHALL être publiée pour un niveau dont le référentiel est `a-completer`.

#### Scenario: Référentiel manquant
- **WHEN** une unité d'un niveau existe sans le fichier de référentiel du niveau
- **THEN** la validation du contenu signale l'absence du référentiel

#### Scenario: Niveau incomplet
- **WHEN** une unité du 4e kyu passe au statut `publie` alors que `4k.yaml` est `a-completer`
- **THEN** la validation du contenu échoue

#### Scenario: Variantes affichées
- **WHEN** l'apprenant ouvre la présentation du 5e kyu
- **THEN** il voit la référence principale et la liste des variantes (par exemple FFAAA, FLAM, Aikikai)

## ADDED Requirements

### Requirement: Lacunes déclarées
Un terme dont le kanji n'est pas vérifié par une source SHALL être présenté sans kanji ; un kanji MUST
NOT être ajouté sans source. Un fait historique reposant sur une seule source SHALL être marqué
`sourceUnique: true` et présenté avec son origine (« selon … »).

#### Scenario: Kanji non vérifié
- **WHEN** le lexique affiche « kata dori men uchi » sans kanji sourcé
- **THEN** l'entrée s'affiche en romaji et en français uniquement, sans kanji
