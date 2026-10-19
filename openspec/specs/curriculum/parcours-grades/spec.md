# curriculum/parcours-grades Specification

## Purpose

Définit le parcours d'apprentissage : six niveaux calqués sur les grades d'aïkido (6e kyu → shodan),
leur découpage fixe en unités, leçons et exercices, l'ordre de déblocage et le contenu d'une leçon.
Le format des données est fixé par `docs/contrat.md`.

## Requirements

### Requirement: Six niveaux alignés sur les grades
L'application SHALL proposer exactement six niveaux, dans cet ordre et avec ces identifiants : `6K`
(6e kyu), `5K` (5e kyu), `4K` (4e kyu), `3K` (3e kyu), `1K` (2e et 1er kyu), `SHODAN` (1er dan).
Chaque niveau SHALL couvrir le programme du grade correspondant tel que décrit dans
`content/referentiel/<grade>.yaml`.

#### Scenario: Liste des niveaux
- **WHEN** l'apprenant ouvre l'arbre de compétences
- **THEN** il voit les six niveaux 6e kyu, 5e kyu, 4e kyu, 3e kyu, 2e–1er kyu et shodan, dans cet ordre

#### Scenario: Programme couvert
- **WHEN** une unité est chargée
- **THEN** elle indique dans `referentiel` le passage du programme officiel qu'elle couvre, avec sa référence et, si elle existe, son URL

### Requirement: Volumes fixes
Chaque niveau SHALL contenir exactement 5 unités de 8 leçons, et chaque leçon exactement 8
exercices (320 exercices par niveau). La leçon 8 de chaque unité SHALL être une révision
(`isReview: true`) portant sur les leçons 1 à 7 de l'unité.

#### Scenario: Leçon incomplète
- **WHEN** une leçon contient 7 ou 9 exercices
- **THEN** la validation du contenu refuse la leçon en indiquant le nombre attendu

#### Scenario: Leçon de révision
- **WHEN** l'apprenant ouvre la leçon 8 d'une unité
- **THEN** les exercices ne portent que sur des notions présentées dans les leçons 1 à 7 de cette unité

### Requirement: Une leçon commence par un apport
Chaque leçon SHALL présenter un apport (`intro`) avant ses exercices : les termes introduits (romaji,
kanji, sens), une note explicative et, selon la leçon, des points clés et un encadré culturel sourcé.
Un exercice SHALL ne porter que sur des notions présentées dans l'apport de la leçon ou dans une leçon
précédente du parcours.

#### Scenario: Terme nouveau dans un exercice
- **WHEN** un exercice demande le sens d'un terme jamais présenté auparavant dans le parcours
- **THEN** la revérification indépendante le consigne comme écart `ouvert`

### Requirement: Progression et déblocage
Une leçon SHALL être débloquée lorsque la précédente est terminée ; la première leçon d'un niveau
SHALL être débloquée lorsque la dernière leçon du niveau précédent est terminée. L'apprenant SHALL
pouvoir rejouer toute leçon déjà terminée.

#### Scenario: Leçon verrouillée
- **WHEN** l'apprenant n'a pas terminé la leçon 6k-u1-l2
- **THEN** la leçon 6k-u1-l3 s'affiche verrouillée et ne peut pas être ouverte

### Requirement: Statut de relecture visible
Chaque unité SHALL porter un statut `review.statut` (`brouillon`, `relu`, `publie`). Une unité au
statut `brouillon` SHALL afficher la mention « brouillon, non relu par un enseignant ».

#### Scenario: Unité non relue
- **WHEN** l'apprenant ouvre une unité au statut `brouillon`
- **THEN** la mention de brouillon est visible dans l'en-tête de l'unité

### Requirement: Le tatami d'abord
L'application SHALL afficher, à la première ouverture et dans « À propos », que l'application
complète sans le remplacer l'enseignement d'un professeur qualifié sur le tatami. Aucune leçon SHALL
ne donner de consigne d'exécution d'une technique, d'une chute ou d'une clé à pratiquer seul.

#### Scenario: Premier lancement
- **WHEN** l'apprenant ouvre l'application pour la première fois
- **THEN** il voit l'avertissement « le tatami d'abord » avant sa première leçon
