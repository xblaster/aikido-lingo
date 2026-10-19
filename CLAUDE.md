# CLAUDE.md — conventions d'Aikido Lingo

Application web façon Duolingo (Next.js 14, export statique) qui enseigne en français les bases
théoriques de l'aïkido, du 6e kyu au shodan. Projet modèle : `C:\dev\letz-learn` (LuxLingo).

## À lire avant toute modification

1. `docs/contrat.md` — format des données (unités, leçons, exercices, sources, fichiers annexes),
   niveaux, volumes et **table de propriété des dossiers**. C'est la référence ; en cas de conflit
   avec un autre document, le contrat l'emporte.
2. `content/README.md` — processus de contenu en cinq passes.
3. `openspec/specs/` — exigences en vigueur ; `docs/roadmap.md` — jalons.

## Propriété (résumé, détail dans le contrat)

| Rôle | Écrit dans |
|---|---|
| technique | `src/`, `scripts/`, `tests/`, `public/`, `package.json`, configs, `Dockerfile`, `deploy/` |
| recherche puis contenu | `content/referentiel/` |
| contenu | `content/niveaux/`, `content/lexique.yaml`, `etiquette.yaml`, `examen.yaml`, `content/_exemples/`, `docs/types-exercices.md` |
| orchestration | `README.md`, `CLAUDE.md`, `content/README.md`, `docs/` (sauf `types-exercices.md`), `openspec/`, `.claude/`, `.agents/`, `.gitignore`, git |

- Ne modifiez pas un fichier hors de votre périmètre : ajoutez une ligne dans `docs/demandes.md`.
- Toute modification du contrat passe par l'orchestration et est consignée dans son « Journal des
  changements ».

## Règles de contenu (non négociables)

- **Rien n'est enseigné sans source** issue de `content/referentiel/sources.md`. Chaque exercice a
  au moins une `source`. Un fait introuvable dans une source publiée n'est pas enseigné ; il est
  noté comme « non vérifié » dans la fiche de recherche.
- Ce qui varie selon les fédérations, écoles ou dojos est présenté comme tel (« selon la FFAAA… »,
  « dans de nombreux dojos… »). Jamais de vérité unique sur une variante.
- Pas d'instruction d'exécution dangereuse : l'application nomme et situe les techniques, elle
  n'apprend pas à les exécuter seul. Le message « le tatami d'abord » reste visible.
- Les exercices sont **originaux** : les programmes officiels donnent le périmètre, jamais le texte.
- Volumes fixes : 5 unités × 8 leçons × 8 exercices par grade ; leçon 8 = révision ; ≥ 3 types par
  leçon.

## Convention de romanisation

- **Hepburn modifié**, en minuscules dans le texte courant (majuscule initiale admise en début de titre, de phrase ou d'appel du jury), mots séparés par une espace :
  `katate dori`, `ai hanmi`, `shomen uchi`, `ikkyo`. Pas de tiret dans le texte de référence (le
  tiret reste accepté en saisie).
- **Voyelles longues** : on écrit la forme d'usage courant dans les dojos français, sans macron
  (`ikkyo`, `kokyu`, `dojo`, `Ueshiba Morihei`) ; la forme avec macron (`ikkyō`, `kokyū`, `dōjō`)
  peut figurer en `note`. La correction ignore les macrons (`ō` = `o` = `ou`).
- **Kanji** dans le champ `kanji` (forme japonaise actuelle, *shinjitai* : 気 et non 氣, sauf
  citation historique signalée).
- Noms de personnes japonaises : ordre japonais (nom puis prénom) avec mention à la première
  occurrence : « Ueshiba Morihei (le fondateur, *O sensei*) ».
- Mots japonais en italique dans les textes Markdown ; pas d'italique dans les YAML.

## Images

- Liste fermée `docs/images/manifest.yaml` (familles `scenes`, `covers`, `modules`, `mascotte`,
  `badges`) ; le contenu cite `image: <famille>/<id>` et garde toujours un `emoji` de repli. Une
  image absente du manifeste se demande dans `docs/demandes.md`, jamais inventée.
- Origine de chaque média : `libre` (licence vérifiée et attribution, `docs/images/sources-libres.md`),
  `genere` (Antigravity, charte `docs/images/prompt-antigravity.md` : dessin non photoréaliste,
  justesse technique, aucune vidéo de technique générée) ou `filme`.
- Les scènes de postures, saluts, chutes, déplacements et attaques passent une **relecture par un
  gradé** (`relecture.statut: valide`) avant d'être affichées.
- Exigences et tâches : change OpenSpec `generation-images` (tâches `[antigravity]` exécutées par
  Antigravity via `.agents/`).

## Commandes

```bash
npm install
npm run dev               # content:build puis next dev
npm run content:build     # content/ (YAML) → src/data/generated/ (JSON, non versionné)
npm run validate:content  # doit passer avant tout commit de contenu
npm test                  # tests unitaires (node --test, tests/**/*.test.mts)
npm run build             # content:build + validate:content + next build
```

OpenSpec (CLI `openspec`, commandes `/opsx:propose`, `/opsx:apply`, `/opsx:archive`,
`/opsx:explore`, `/opsx:sync`, `/opsx:update`) : toute évolution de comportement commence par une
proposition dans `openspec/changes/`. Les commandes et skills OpenSpec existent pour Claude Code
(`.claude/`) et pour Antigravity (`.agents/`, créé par `openspec init --tools claude,antigravity`) ;
les régénérer avec `openspec update` plutôt que de les éditer à la main. Les artefacts sont rédigés en français ; les titres
structurels et les mots-clés SHALL/MUST restent en anglais.

## Git

- Branche `main`. Commits petits et cohérents, un sujet par commit.
- Message en **français**, à l'impératif ou en description courte du livrable, comme dans LuxLingo :
  `6e kyu unité 1 « Le dojo et l'étiquette » : 8 leçons × 8 exercices`,
  `Validateur : refuser un exercice sans source`.
- Ne committez que des fichiers de votre périmètre, avec `validate:content` et `npm test` au vert.
- Les commits rédigés avec Claude se terminent par la ligne
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Jamais de `--no-verify`, jamais de réécriture d'historique publié.
