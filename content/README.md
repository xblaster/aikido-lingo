# Contenu pédagogique d'Aikido Lingo

Tout ce que l'application enseigne vit ici, en YAML, lisible et corrigeable sans toucher au code.
`npm run content:build` (lancé aussi par `npm run dev`, `npm run build` et `npm test`) convertit ces
fichiers en JSON dans `src/data/generated/` (non versionné). Le format exact des données est fixé
par [`docs/contrat.md`](../docs/contrat.md), qui fait foi.

## Arborescence

| Chemin | Contenu | Propriétaire |
|---|---|---|
| `referentiel/<grade>.yaml` | référentiel du grade : programme officiel, attaques, techniques, termes, sources | recherche puis contenu |
| `referentiel/sources.md` | liste des sources autorisées, avec date de consultation | recherche puis contenu |
| `niveaux/<grade>/<grade>-u<N>.yaml` | une unité : 8 leçons, leurs apports et leurs 8 exercices | contenu |
| `niveaux/<grade>/<grade>-u<N>/plan.yaml` | plan de l'unité (thème, notions et types d'exercices par leçon), écrit avant la rédaction | contenu |
| `niveaux/<grade>/<grade>-u<N>/recherche/<leçon>.md` | fiche de recherche de chaque leçon, écrite avant la rédaction | contenu |
| `lexique.yaml`, `etiquette.yaml`, `examen.yaml` | modules annexes (lexique, reishiki, simulateur de passage de grade) | contenu |
| `_exemples/` | exemple complet commenté (ignoré par l'application) | contenu |

Grades et dossiers : `6k`, `5k`, `4k`, `3k`, `1k` (2e–1er kyu ; référentiel `2k-1k.yaml`), `shodan`.
Les fichiers et dossiers dont le nom commence par `_` ne sont jamais chargés par l'application.

## Volumes (fixes)

Par grade : **5 unités × 8 leçons × 8 exercices = 320 exercices** (1 920 pour les six grades). Ni
plus, ni moins : on ne rajoute jamais un exercice pour caser un type. La leçon 8 de chaque unité est
une révision des leçons 1 à 7 (`isReview: true`). Chaque leçon utilise au moins 3 des 16 types du
catalogue (voir [`docs/types-exercices.md`](../docs/types-exercices.md)).

## Processus en cinq passes (pour chaque leçon)

1. **Recherche.** Écrire la fiche `recherche/<leçon>.md` avant tout exercice : passage du programme
   officiel couvert (référentiel du grade), chaque terme japonais vérifié (romaji, kanji, sens) dans
   une source de `referentiel/sources.md`, faits historiques et culturels sourcés, **variations
   entre fédérations ou écoles** relevées, et ce qui n'a pas pu être vérifié. Un fait sans source
   publiée n'est pas enseigné.
2. **Rédaction.** À partir de la fiche seulement : l'apport (`intro` : termes, note, points, culture
   une leçon sur trois environ), puis exactement 8 exercices **originaux**. Les programmes et
   ouvrages donnent le périmètre, jamais le texte. Chaque exercice cite au moins une source. Une
   variante propre à une fédération est présentée comme telle. Aucune consigne d'exécution d'une
   technique en autonomie.
3. **Validation automatique.** `npm run validate:content` : schéma, sources, volumes, types,
   cohérence des réponses (la bonne réponse figure dans les options, paires complètes, etc.).
4. **Revérification indépendante.** Une **autre session** (ou une autre personne) que celle qui a
   rédigé relit chaque phrase contre la fiche et les sources, recontrôle chaque terme et kanji,
   rejoue chaque réponse et vérifie que les distracteurs sont bien faux. Résultat consigné dans
   `verification` (les écarts restent `ouvert` jusqu'à correction).
5. **Relecture humaine.** Un **enseignant d'aïkido qualifié** relit l'unité entière (exactitude
   technique, terminologie, étiquette, sécurité, présentation des variantes) ; on consigne
   `review: { statut: relu, relecteur, qualification, date }`. Seule une unité relue peut passer
   en `publie`.

### Qui peut faire la relecture humaine (passe 5)

On demande un enseignant gradé et diplômé, titulaire d'au moins l'un des titres suivants :

- **DEJEPS spécialité « perfectionnement sportif », mention « aïkido, aïkibudo et disciplines
  associées »** (diplôme d'État, RNCP 37575, niveau 5 ; l'entrée en formation exige notamment une
  maîtrise technique de niveau 3e dan définie par l'Union des fédérations d'aïkido et 300 h
  d'enseignement). Il satisfait l'obligation de qualification de l'article L. 212-1 du code du
  sport pour enseigner contre rémunération.
  Sources : [France Compétences, RNCP 37575](https://www.francecompetences.fr/recherche/rncp/37575/),
  [Onisep](https://www.onisep.fr/ressources/univers-formation/formations/post-bac/dejeps-specialite-perfectionnement-sportif-mention-aikido-aikibudo-et-disciplines-associees)
  (consultés le 2026-10-19).
- **Brevet d'État d'éducateur sportif (BEES) option aïkido**, diplôme antérieur au DEJEPS, toujours
  valable pour ses titulaires.
- **Brevet fédéral (BF)** de la FFAAA ou de la FFAB : qualification fédérale d'enseignement
  bénévole dans un club affilié (le BF est en cours de refonte à la FFAAA selon sa lettre
  d'information de novembre 2025 ; conditions à vérifier auprès de la fédération).
- À défaut, un enseignant titulaire du **3e dan ou plus** délivré par la CSDGE ou l'Aikikai.

Le relecteur indique son titre dans `review.qualification`. Pour le shodan et le simulateur de
passage de grade, un relecteur ayant l'expérience des jurys d'examen est préférable.

> Les conditions exactes du BF (grade minimal, rôle bénévole) n'ont pas pu être confirmées sur un
> texte fédéral officiel à la date de rédaction : à confirmer par la recherche dans
> `referentiel/sources.md`.

## Statuts de publication

| `review.statut` | Sens | Visible dans l'application |
|---|---|---|
| `brouillon` | rédigé, éventuellement revérifié, pas encore relu | oui, avec la mention « brouillon, non relu par un enseignant » |
| `relu` | relu par un enseignant qualifié, écarts corrigés | oui |
| `publie` | relu et validé pour la mise en ligne publique | oui |

## Champs de traçabilité

Sur l'unité :

```yaml
review: { statut: relu, relecteur: "Prénom Nom", qualification: "DEJEPS aïkido, 4e dan", date: 2026-11-02 }
referentiel: { ref: "Programme 6e kyu, FFAAA", url: "…" }
```

Sur la leçon (en plus des champs du contrat) :

```yaml
research: niveaux/6k/6k-u1/recherche/6k-u1-l1.md
auteur: { session: <identifiant de la session de rédaction>, date: 2026-10-19 }
verification:
  date: 2026-10-20
  verificateur: "session de revérification"
  session: <autre identifiant que auteur.session>
  ecarts:
    - { exercice: 6k-u1-l1-e3, constat: "…", correction: "…", statut: corrige }   # ou ouvert
```

Une source : `{ type: officiel|aikikai|federation|ouvrage|web|relecture, ref, url?, page?, consulte: AAAA-MM-JJ }`.

## Fiche de recherche (modèle)

```markdown
# 6k-u1-l1 — Entrer au dojo et saluer

## Périmètre
Passage du programme couvert, référence (référentiel 6k.yaml, entrée …).

## Termes
| romaji | kanji | sens | source |

## Faits et explications
Chaque affirmation suivie de sa source.

## Variations
Ce qui diffère selon FFAAA / FFAB / Aikikai / dojos.

## Non vérifié
Ce qui n'a pas été retenu faute de source.
```
