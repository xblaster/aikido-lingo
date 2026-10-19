# Contrat de données et répartition du travail — Aikido Lingo

Document de référence partagé par les agents (technique, contenu pédagogique, orchestration) et
la recherche du référentiel. **Toute modification de ce contrat passe par l'agent orchestration**,
qui la consigne en bas de ce fichier (section « Journal des changements »).

Projet modèle : `C:\dev\letz-learn` (LuxLingo). On reprend sa structure (Next.js 14 export statique,
contenu YAML → JSON, référentiel par niveau, fiches de recherche, validations, gamification), avec
un thème aikido. Interface et contenu en français ; termes en japonais (romaji + kanji).

## Propriété des dossiers (qui écrit quoi)

| Dossier / fichier | Propriétaire |
|---|---|
| `src/`, `scripts/`, `tests/`, `public/`, `package.json`, configs (`next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`, `postcss.config.mjs`), `Dockerfile`, `deploy/` | **technique** |
| `content/referentiel/` | **recherche** (en cours) puis **contenu** (corrections) |
| `content/niveaux/`, `content/lexique.yaml`, `content/etiquette.yaml`, `content/examen.yaml`, `content/_exemples/`, `docs/types-exercices.md` | **contenu** |
| `README.md`, `CLAUDE.md`, `content/README.md`, `docs/` (hors `types-exercices.md`), `openspec/`, `.claude/`, `.agents/`, `.gitignore`, git | **orchestration** |

Un agent qui a besoin d'un changement hors de son périmètre le note dans `docs/demandes.md`
(une ligne : date, demandeur, destinataire, demande) au lieu de modifier le fichier.

## Niveaux (grades)

Identifiants fixes, dans l'ordre : `6K`, `5K`, `4K`, `3K`, `1K`, `SHODAN`
(6e kyu, 5e kyu, 4e kyu, 3e kyu, 2e–1er kyu, 1er dan). Dossiers en minuscules :
`content/niveaux/6k/`, …, `content/niveaux/shodan/`. Référentiel : `content/referentiel/<id minuscule>.yaml`
(`6k.yaml`, `5k.yaml`, `4k.yaml`, `3k.yaml`, `2k-1k.yaml` pour `1K`, `shodan.yaml`).

## Volumes

Par niveau : **5 unités × 8 leçons × 8 exercices**. La leçon 8 de chaque unité est une révision
(`isReview: true`). Chaque leçon utilise au moins 3 types d'exercices.

## Format d'une unité : `content/niveaux/<niv>/<niv>-u<N>.yaml`

```yaml
id: 6k-u1
level: 6K
unitNumber: 1
title: "Le dojo et l'étiquette"     # français
jpTitle: "Reishiki"                 # romaji
description: "…"
themeColor: "bg-emerald-500"        # classe tailwind
icon: Landmark                      # icône lucide-react
review: { statut: brouillon }       # brouillon | relu | publie
                                    # relu/publie exigent aussi : relecteur, qualification, date
                                    # ex. { statut: relu, relecteur: "…", qualification: "DEJEPS aïkido, 4e dan", date: 2026-11-02 }
referentiel: { ref: "…", url: "…" } # passage du programme officiel couvert
lessons: [ … 8 leçons … ]
```

## Format d'une leçon

```yaml
- id: 6k-u1-l1
  title: "Entrer au dojo et saluer"
  subtitle: "Onegaishimasu"          # terme japonais emblématique (romaji)
  description: "…"
  icon: DoorOpen
  xpReward: 20
  focus: "Ritsurei et zarei"          # notion clé
  isReview: false
  research: niveaux/6k/6k-u1/recherche/6k-u1-l1.md
  auteur?: { session: "…", date: AAAA-MM-JJ }            # session de rédaction
  verification?: { date, verificateur, session, ecarts: [{ exercice, constat, correction?, statut: ouvert|corrige }] }
                                     # passe 4 : session différente de auteur.session (voir content/README.md)
  intro:
    termes:                           # termes présentés (affichés en cartes)
      - { jp: "Rei", kanji: "礼", fr: "salut", note?: "…", source?: {…} }
    note: { titre: "…", texte: "…" } # explication principale
    points: ["…", "…"]               # points clés / étapes (optionnel)
    culture?: { titre, texte, sources: [Source] }
  exercises: [ … 8 exercices … ]
```

## Format d'un exercice (champs communs)

`id`, `type`, `prompt` (consigne FR), `correctAnswer` (string | string[]), `sources` (obligatoire,
au moins une), `explanation?` (affichée après réponse), `acceptedAnswers?`.
Champs selon le type : `jpText` (texte en romaji), `kanji`, `frText`, `audioText` (romaji/japonais lu
en synthèse vocale ja-JP), `options: [{ id, text, translation?, illustration?: { image?, emoji, alt } }]`,
`wordBank: string[]`, `pairs: [{ jp, fr }]`, `steps: string[]`, `dialogue: [{ speaker, text, missing? }]`,
`storyQuestions: [{ afterLine, prompt, options, correctAnswer }]`, `statement` + `correctAnswer: "vrai"|"faux"`,
`decomposition: { attaque, technique, variante? }`.

### Catalogue des types (16)

| Type | Interaction | Champs clés |
|---|---|---|
| `meaning_choice` | terme japonais → choisir le sens | `jpText`, `options` |
| `term_choice` | sens / description → choisir le terme japonais | `frText`, `options` |
| `kanji_choice` | kanji → choisir romaji/sens | `kanji`, `options` |
| `image_choice` | terme → choisir l'illustration (image du catalogue, repli emoji) | `jpText`, `options[].illustration` |
| `match_pairs` | associer termes et sens | `pairs` (`correctAnswer: pairs`) |
| `match_pairs_audio` | associer prononciation (TTS) et sens | `pairs` |
| `listen_choose` | écouter → choisir le terme | `audioText`, `options` |
| `listen_type` | écouter → taper le romaji | `audioText` |
| `typed_term` | sens → taper le terme en romaji | `frText` |
| `tile_build` | composer un nom de technique avec des tuiles | `frText`, `wordBank`, `correctAnswer: string[]` |
| `missing_word` | compléter une phrase (choix) | `frText` avec `___`, `options` |
| `order_steps` | remettre des étapes dans l'ordre | `steps` (dans le bon ordre ; l'UI mélange), `correctAnswer: steps` |
| `true_false` | vrai / faux sur une affirmation | `statement`, `correctAnswer` |
| `scenario` | situation au dojo → choisir la bonne attitude/réplique | `dialogue` ou `frText`, `options` |
| `technique_decoder` | spécifique aikido : décomposer un nom de technique (attaque / technique / omote-ura) ou l'inverse | `jpText`, `decomposition`, `options` |
| `story` | récit (ex. histoire du fondateur, un cours type) avec questions | `dialogue`, `storyQuestions` |

Comparaison des réponses tapées : insensible à la casse, aux accents, aux tirets/espaces
(`katatedori` = `Katate-dori` = `katate dori`), macrons ignorés (`ō` = `o` = `ou`).

## Sources

`Source = { type: officiel|aikikai|federation|ouvrage|web|relecture, ref, url?, page?, consulte: AAAA-MM-JJ }`.
Règle d'or : **rien n'est enseigné sans source** issue du référentiel (`content/referentiel/sources.md`).
Ce qui varie selon les écoles/fédérations est présenté comme tel (« selon la FFAAA… », « dans de nombreux dojos… »).

## Fichiers annexes (contenu → technique)

- `content/lexique.yaml` : `[{ id, romaji, kanji?, kana?, sens, categorie, note?, source }]` (dictionnaire)
- `content/etiquette.yaml` : fiches du module « Reishiki » `[{ id, titre, jp?, etapes: [..], pourquoi, source }]`
- `content/examen.yaml` : simulateur de passage de grade `[{ level, epreuves: [{ categorie, appel (ce que dit le jury, ex. "Ai hanmi katate dori ikkyo"), attaque, technique, variante?, conseils: [..] }], criteres: [..], sources }]`

## Images et vidéos

De **vraies images** qui montrent la situation (photo ou dessin), **pas des icônes**. Liste fermée :
`docs/images/manifest.yaml` (57 entrées : `scenes` 26, `covers` 15, `modules` 4, `mascotte` 6,
`badges` 6). Une illustration cite `image: <famille>/<id>` (ex. `scenes/seiza`) **et** garde un `emoji`
de repli, affiché tant que `public/images/<famille>/<id>.webp` n'existe pas ou n'est pas relu. Une
unité cite `cover: <id>` (famille `covers`). Une entrée peut avoir une `video` (fichier
`public/videos/<famille>/<id>.webm` ou intégration chargée au clic) ; l'image reste l'affiche et le repli.
Origine de chaque média : `libre` (licence réutilisable, crédité), `filme` (club) ou `genere`
(Antigravity, dessin non photoréaliste, jamais de vidéo de technique). Charte :
`docs/images/prompt-antigravity.md` ; sources libres : `docs/images/sources-libres.md` ; exigences :
change OpenSpec `generation-images`. Besoin d'un média absent : `docs/demandes.md`.

## Journal des changements

- 2026-10-19 : création (session principale).
- 2026-10-19 (orchestration) : ajout des champs de traçabilité `auteur?` et `verification?` sur la leçon (passe 4) et de `relecteur`, `qualification`, `date` exigés sur `review` d'une unité `relu`/`publie` (passe 5). Champs optionnels pour une unité `brouillon` : aucun contenu existant n'est invalidé. Demande correspondante à la technique dans `docs/demandes.md`.
- 2026-10-19 (session principale) : ajout de `illustration.image`, de `cover` sur l'unité et de la section « Images » (change OpenSpec `generation-images`). Champs optionnels : aucun contenu existant n'est invalidé.
- 2026-10-19 (orchestration) : section « Images » : la famille `pictos` est renommée `scenes` pour s'aligner sur `docs/images/manifest.yaml`, qui fait foi (demande du contenu) ; `openspec/changes/generation-images/tasks.md` aligné.
- 2026-10-19 (orchestration) : section « Images » complétée (tâche 1.4 de `generation-images`) : champs `origine` (`libre|genere|filme`), `video` (`fichier|embed`, `public/videos/`), `relecture`.
- 2026-10-19 (session principale) : médias = vraies images de situation (photo ou dessin), pas des icônes ; famille `pictos` renommée `scenes` ; champ `video` ; origines `libre|filme|genere`.
- 2026-10-19 (orchestration) : `.agents/` (commandes et skills OpenSpec pour Antigravity) ajouté au périmètre orchestration.
