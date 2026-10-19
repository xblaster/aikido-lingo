# Aikido Lingo

> Une application web inspirée de Duolingo pour apprendre les **bases théoriques de l'aïkido** :
> vocabulaire japonais, étiquette du dojo (*reishiki*), nomenclature des techniques et programme des
> passages de grade, du **6e kyu au 1er dan (*shodan*)**.

Tout ce que l'application enseigne s'appuie sur un **référentiel réel et actuel** : programmes de
grades des fédérations françaises (FFAAA, FFAB) et de la CSDGE (Commission Spécialisée des Dans et
Grades Équivalents), publications de l'Aikikai Hombu Dojo (Tokyo) et ouvrages publiés. Aucun fait
n'est enseigné sans source.

---

> **État actuel :** le parcours démarre avec le **6e et le 5e kyu** ; les grades suivants viendront
> ensuite (voir [`docs/roadmap.md`](docs/roadmap.md)).

## Avertissement : le tatami d'abord

**Aikido Lingo complète l'enseignement sur le tatami ; il ne le remplace jamais.** L'aïkido s'apprend
avec un enseignant qualifié, dans un dojo affilié, au contact de partenaires. L'application
n'enseigne pas à exécuter une technique : elle aide à **comprendre et retenir** ce que l'on travaille
au cours (les noms, l'étiquette, la structure du programme).

- Ne tentez pas de reproduire seul une technique, une chute (*ukemi*) ou une clé articulaire vue dans
  l'application : les clés (*kansetsu waza*) et les projections exposent à des blessures si elles ne
  sont pas encadrées.
- Les critères d'un passage de grade, les variantes de techniques et l'étiquette **varient selon les
  fédérations, les écoles et les dojos**. En cas de différence, la consigne de votre enseignant
  prévaut ; l'application signale ces variations (« selon la FFAAA… », « dans de nombreux dojos… »).
- Le simulateur de passage de grade est un outil de révision ; il ne préjuge pas du résultat d'un
  examen réel.

## Fonctionnalités

1. **Arbre de compétences par grade** : six niveaux (6e kyu, 5e kyu, 4e kyu, 3e kyu, 2e–1er kyu,
   shodan), chacun en 5 unités de 8 leçons ; la dernière leçon de chaque unité est une révision.
   Chaque leçon commence par un apport (termes, kanji, explication, culture) puis 8 exercices.
2. **16 types d'exercices** : choix du sens, choix du terme, kanji, image, paires (texte et audio),
   écoute, saisie en romaji, tuiles, mot manquant, étapes à ordonner, vrai/faux, mise en situation au
   dojo, **décodeur de techniques** (attaque / technique / *omote*–*ura*) et récits avec questions.
   Catalogue détaillé : [`docs/types-exercices.md`](docs/types-exercices.md).
3. **Lexique** : dictionnaire des termes (romaji, kanji, kana, sens, catégorie, source), avec écoute
   en synthèse vocale japonaise.
4. **Reishiki** : fiches d'étiquette (saluts debout et à genoux, entrée au dojo, tenue, soin du
   *keikogi* et des armes…), avec leur raison d'être et leur source.
5. **Décodeur de techniques** : un nom comme *ai hanmi katate dori ikkyo omote* se décompose en
   garde, saisie, technique et forme ; l'inverse s'entraîne aussi.
6. **Simulateur de passage de grade** : le « jury » appelle des techniques du programme du grade
   visé ; l'apprenant identifie l'attaque, la technique et la variante, avec les critères
   d'évaluation et des conseils.
7. **Progression et gamification** : XP, série de jours, révisions (sans vies : on réessaie à volonté), sauvegarde locale de la
   progression (aucun compte, aucune donnée envoyée).

## Référentiel et sources

- Le référentiel vit dans [`content/referentiel/`](content/referentiel/) : un fichier par grade et
  la liste des sources (`sources.md`) avec leur date de consultation.
- Hiérarchie des sources : textes officiels (CSDGE, fédérations délégataires) → Aikikai Hombu Dojo
  → ouvrages publiés → sites de référence → relecture par un enseignant.
- Les termes japonais sont donnés en **romaji Hepburn** avec leur **kanji** ; voir la convention
  dans [`CLAUDE.md`](CLAUDE.md).
- Ce qui varie selon les fédérations ou les écoles est présenté comme tel, jamais comme une vérité
  unique.
- Chaque leçon est précédée d'une fiche de recherche et suivie d'une revérification indépendante puis
  d'une relecture par un enseignant diplômé : voir [`content/README.md`](content/README.md).

## Images et vidéos

Les illustrations montrent des **situations réelles** (pratiquants, saisies, appuis, distance), pas
des icônes. Liste fermée : [`docs/images/manifest.yaml`](docs/images/manifest.yaml). Chaque entrée
est soit un média **sous licence libre** repéré par la recherche
(`docs/images/sources-libres.md`, auteur et licence crédités), soit un **dessin généré par
Antigravity** selon la charte [`docs/images/prompt-antigravity.md`](docs/images/prompt-antigravity.md)
(jamais photoréaliste, aucune vidéo de technique générée), soit filmé pour le projet. Les images de
postures, saluts, chutes, déplacements et attaques sont **relues par un gradé** avant d'être
affichées ; en attendant, l'application affiche un emoji de repli. Exigences : change OpenSpec
`openspec/changes/generation-images/`.

## Lancement rapide

```bash
npm install
npm run dev               # construit le contenu puis lance http://localhost:3000
npm run content:build     # YAML (content/) → JSON (src/data/generated/, non versionné)
npm run validate:content  # validation du contenu (sources, volumes, types, cohérence)
npm test                  # tests unitaires
npm run build             # export statique (valide le contenu avant)
```

## Structure du projet

| Chemin | Rôle |
|---|---|
| `src/` | application Next.js 14 (export statique), composants, moteur d'exercices |
| `scripts/` | construction et validation du contenu |
| `tests/` | tests unitaires (`node --test`) |
| `content/niveaux/<grade>/` | unités, plans et fiches de recherche par grade |
| `content/referentiel/` | référentiel par grade et sources |
| `content/lexique.yaml`, `etiquette.yaml`, `examen.yaml` | modules annexes |
| `docs/contrat.md` | **contrat de données et propriété des dossiers** (à lire en premier) |
| `docs/roadmap.md` | jalons et critères d'acceptation |
| `docs/demandes.md` | demandes entre contributeurs |
| `docs/images/` | manifeste des images, charte de génération, sources libres |
| `openspec/` | spécifications (OpenSpec) des capacités de l'application et changes en cours |
| `.claude/`, `.agents/` | commandes et skills OpenSpec pour Claude Code et Antigravity |
| `deploy/`, `Dockerfile` | déploiement |

## Contribuer

1. Lire [`docs/contrat.md`](docs/contrat.md) (format des données, propriété des dossiers) et
   [`content/README.md`](content/README.md) (processus en cinq passes).
2. Toute évolution de comportement passe par une proposition OpenSpec (`/opsx:propose`), puis
   `/opsx:apply` et `/opsx:archive`. Les specs en vigueur sont dans `openspec/specs/`.
3. Un besoin hors de son périmètre se note dans [`docs/demandes.md`](docs/demandes.md) au lieu de
   modifier le fichier d'un autre propriétaire.
4. Avant tout commit : `npm run validate:content` et `npm test` doivent passer.
5. Une unité n'est publiée (`review.statut: publie`) qu'après relecture par un enseignant qualifié.

Vous êtes enseignant d'aïkido et souhaitez relire une unité ? C'est la contribution la plus utile :
voir la passe 5 dans [`content/README.md`](content/README.md).
