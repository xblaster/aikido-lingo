# curriculum/referentiel-sources Specification

## Purpose

Définit le référentiel (programmes de grades et terminologie) sur lequel repose tout le contenu, la
hiérarchie des sources admises, la façon de présenter les variations entre fédérations et écoles,
et la traçabilité de chaque fait enseigné.

## Requirements

### Requirement: Référentiel par grade
Le dépôt SHALL contenir un référentiel par niveau dans `content/referentiel/` (`6k.yaml`, `5k.yaml`,
`4k.yaml`, `3k.yaml`, `2k-1k.yaml`, `shodan.yaml`) décrivant le programme du grade (attaques,
techniques, formes de travail, termes), et une liste des sources `content/referentiel/sources.md`
avec, pour chacune, sa référence, son URL éventuelle et sa date de consultation.

#### Scenario: Référentiel manquant
- **WHEN** une unité d'un niveau existe sans le fichier de référentiel du niveau
- **THEN** la validation du contenu signale l'absence du référentiel

### Requirement: Hiérarchie des sources
Les sources SHALL être de l'un des types `officiel` (CSDGE, ministère, textes réglementaires),
`aikikai` (Aikikai Foundation / Hombu Dojo), `federation` (FFAAA, FFAB, autres fédérations
reconnues), `ouvrage` (livre publié), `web` (site de référence) ou `relecture` (relecture d'un
enseignant qualifié). En cas de désaccord, un texte officiel ou fédéral SHALL primer sur un ouvrage,
un ouvrage sur un site web.

#### Scenario: Source de type inconnu
- **WHEN** un exercice cite une source de type `forum`
- **THEN** la validation refuse l'exercice

### Requirement: Rien n'est enseigné sans source
Chaque exercice SHALL citer au moins une source au format
`{ type, ref, url?, page?, consulte: AAAA-MM-JJ }`. Chaque terme présenté dans un apport SHALL être
vérifiable dans une source du référentiel. Un fait qui ne figure dans aucune source publiée SHALL
être exclu du contenu et consigné comme « non vérifié » dans la fiche de recherche.

#### Scenario: Exercice sans source
- **WHEN** un exercice n'a pas de champ `sources` ou une liste vide
- **THEN** la validation refuse l'exercice en le nommant

### Requirement: Variations présentées comme telles
Lorsqu'une technique, une dénomination, un critère de grade ou un point d'étiquette diffère selon
la fédération, l'école ou le dojo, le contenu SHALL le présenter comme une variation attribuée
(« selon la FFAAA… », « à la FFAB… », « dans de nombreux dojos… ») et SHALL NOT présenter l'une des
formes comme la seule correcte. Un exercice SHALL NOT avoir pour bonne réponse une forme propre à
une seule fédération sans le dire dans sa consigne.

#### Scenario: Nom de technique variable
- **WHEN** une technique porte deux noms usuels selon les écoles
- **THEN** l'apport cite les deux noms avec leur usage et la saisie accepte les deux (`acceptedAnswers`)

### Requirement: Fiche de recherche par leçon
Chaque leçon SHALL référencer (`research`) une fiche de recherche écrite avant la rédaction, qui
liste le passage du programme couvert, les termes vérifiés avec leur source, les faits et leur
source, les variations relevées et ce qui n'a pas pu être vérifié.

#### Scenario: Fiche absente
- **WHEN** le champ `research` d'une leçon pointe vers un fichier inexistant
- **THEN** la validation refuse la leçon

### Requirement: Romanisation cohérente
Les termes japonais SHALL être écrits en romaji Hepburn, en minuscules dans le texte courant, mots
séparés par une espace et sans macron dans la forme de référence ; le kanji SHALL figurer dans le
champ `kanji` lorsqu'il est attesté dans une source.

#### Scenario: Forme de référence
- **WHEN** l'apport présente la saisie du poignet
- **THEN** le terme s'écrit `katate dori` avec le kanji `片手取り`, et la note peut mentionner la graphie `katate-dori`
