# exercices/moteur-exercices Specification

## Purpose

Définit le catalogue des 16 types d'exercices, l'interaction et la correction de chacun, les règles
de comparaison des réponses saisies et le retour pédagogique. Les champs de chaque type sont fixés
par `docs/contrat.md` ; le catalogue détaillé est dans `docs/types-exercices.md`.

## Requirements

### Requirement: Catalogue de 16 types
Le moteur SHALL prendre en charge exactement les 16 types suivants, chacun avec un rendu et une
correction propres : `meaning_choice`, `term_choice`, `kanji_choice`, `image_choice`, `match_pairs`,
`match_pairs_audio`, `listen_choose`, `listen_type`, `typed_term`, `tile_build`, `missing_word`,
`order_steps`, `true_false`, `scenario`, `technique_decoder`, `story`. Un exercice d'un autre type
SHALL être refusé par la validation.

#### Scenario: Type inconnu
- **WHEN** le contenu contient un exercice de type `translate_sentence`
- **THEN** la validation refuse l'exercice en citant la liste des types admis

#### Scenario: Chaque type a son rendu
- **WHEN** on ouvre la page de démonstration des types
- **THEN** chacun des 16 types s'affiche avec son interaction propre, aucun n'étant rendu comme un QCM générique par défaut

### Requirement: Au moins trois types par leçon
Chaque leçon SHALL utiliser au moins 3 types d'exercices différents parmi ses 8 exercices.

#### Scenario: Leçon monotone
- **WHEN** les 8 exercices d'une leçon sont tous de type `meaning_choice`
- **THEN** la validation refuse la leçon

### Requirement: Comparaison tolérante des réponses saisies
Pour `listen_type`, `typed_term` et toute autre saisie libre, la correction SHALL ignorer la casse,
les accents, les tirets et espaces, et les macrons ; une voyelle longue notée `ou` ou `oo` SHALL
être équivalente à `o` et `uu` à `u`. Les variantes listées dans `acceptedAnswers` SHALL être
acceptées.

#### Scenario: Graphies de la même saisie
- **WHEN** la réponse attendue est `katate dori` et l'apprenant tape `Katate-dori` ou `katatedori`
- **THEN** la réponse est jugée correcte

#### Scenario: Voyelle longue
- **WHEN** la réponse attendue est `ikkyo` et l'apprenant tape `ikkyō` ou `ikkyou`
- **THEN** la réponse est jugée correcte

### Requirement: Audio en synthèse vocale japonaise
Les types `listen_choose`, `listen_type` et `match_pairs_audio`, et le bouton d'écoute des termes,
SHALL lire `audioText` (ou le terme) en synthèse vocale `ja-JP` du navigateur. Si aucune voix
japonaise n'est disponible, l'application SHALL l'indiquer et proposer d'afficher le texte.

#### Scenario: Pas de voix japonaise
- **WHEN** le navigateur ne propose aucune voix ja-JP
- **THEN** un avis s'affiche et l'exercice d'écoute reste réalisable en affichant le romaji

### Requirement: Décodeur de techniques
Le type `technique_decoder` SHALL permettre de décomposer un nom de technique en ses éléments
(`decomposition` : attaque, technique, variante éventuelle telle que `omote` / `ura`) ou, à
l'inverse, de retrouver le nom à partir de ses éléments.

#### Scenario: Décomposition
- **WHEN** l'exercice affiche `katate dori ikkyo omote`
- **THEN** l'apprenant choisit l'attaque (`katate dori`), la technique (`ikkyo`) et la forme (`omote`), et chaque élément est corrigé

### Requirement: Ordre des étapes mélangé
Pour `order_steps`, le contenu SHALL fournir les étapes dans le bon ordre et l'interface SHALL les
présenter mélangées, jamais dans l'ordre de la réponse.

#### Scenario: Mélange
- **WHEN** un exercice `order_steps` s'affiche
- **THEN** l'ordre initial des étapes diffère de l'ordre correct

### Requirement: Retour pédagogique
Après chaque réponse, le moteur SHALL indiquer si elle est juste, montrer la bonne réponse en cas
d'erreur et afficher `explanation` lorsqu'elle existe, ainsi que la source de l'exercice.

#### Scenario: Réponse fausse
- **WHEN** l'apprenant choisit une mauvaise option
- **THEN** la bonne réponse et l'explication s'affichent avant de passer à l'exercice suivant
