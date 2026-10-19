# modules/modules-annexes Specification

## Purpose

Définit les modules accessibles en dehors du parcours : lexique, reishiki (étiquette), décodeur de
techniques et simulateur de passage de grade. Leurs données viennent de `content/lexique.yaml`,
`content/etiquette.yaml` et `content/examen.yaml` (format dans `docs/contrat.md`).

## Requirements

### Requirement: Lexique
L'application SHALL proposer un lexique consultable des termes japonais (`content/lexique.yaml`),
avec pour chaque entrée le romaji, le kanji et le kana s'ils sont attestés, le sens, la catégorie,
une note éventuelle et sa source. Le lexique SHALL être filtrable par catégorie et interrogeable en
romaji comme en français, avec la même tolérance que la saisie des exercices.

#### Scenario: Recherche tolérante
- **WHEN** l'apprenant cherche `kokyu nage` ou `kokyū-nage`
- **THEN** la même entrée est trouvée

#### Scenario: Écoute d'un terme
- **WHEN** l'apprenant touche le bouton d'écoute d'une entrée
- **THEN** le terme est lu en synthèse vocale ja-JP

### Requirement: Reishiki
L'application SHALL proposer les fiches d'étiquette de `content/etiquette.yaml`, chacune avec son
titre, son terme japonais éventuel, ses étapes, la raison d'être de la pratique et sa source. Les
pratiques propres à certains dojos SHALL être signalées comme telles.

#### Scenario: Fiche d'étiquette
- **WHEN** l'apprenant ouvre la fiche « Zarei »
- **THEN** il voit les étapes, le « pourquoi » et la source, ainsi que les variations connues

### Requirement: Décodeur de techniques
L'application SHALL proposer un décodeur libre : l'apprenant compose ou saisit un nom de technique
(garde, attaque, technique, forme) et obtient sa décomposition et le sens de chaque élément, à
partir des seuls termes du lexique. Un élément inconnu du lexique SHALL être signalé et non deviné.

#### Scenario: Élément inconnu
- **WHEN** l'apprenant saisit un mot absent du lexique
- **THEN** le décodeur indique qu'il ne connaît pas ce terme au lieu d'inventer un sens

### Requirement: Simulateur de passage de grade
L'application SHALL proposer, pour chaque niveau, un simulateur qui enchaîne des « appels » du jury
tirés de `content/examen.yaml` (par exemple « ai hanmi katate dori ikkyo »). Pour chaque appel,
l'apprenant identifie l'attaque, la technique et la variante ; le simulateur affiche ensuite les
conseils et, en fin de session, les critères d'évaluation du grade et les sources. Le simulateur
SHALL rappeler qu'il est un outil de révision et ne préjuge pas du résultat d'un examen réel.

#### Scenario: Appel du jury
- **WHEN** le simulateur 5e kyu affiche un appel
- **THEN** l'appel est lu en synthèse vocale et l'apprenant doit décomposer attaque, technique et variante

#### Scenario: Programme limité au grade
- **WHEN** le simulateur d'un grade tire ses appels
- **THEN** seuls des appels de ce grade ou des grades inférieurs sont proposés, conformément au référentiel
