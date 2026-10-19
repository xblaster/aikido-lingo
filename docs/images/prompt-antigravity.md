# Prompt de génération des images — Antigravity

> À donner tel quel à Antigravity. Liste : `docs/images/manifest.yaml` (fermée : ne rien générer
> d'autre). Change OpenSpec : `openspec/changes/generation-images/` (`/opsx-apply generation-images`,
> tâches `[antigravity]`). Avant de générer une entrée, vérifier dans `docs/images/sources-libres.md`
> qu'elle n'est pas déjà couverte par une image ou une vidéo libre retenue (champ `origine` du manifeste).

---

## Mission

Tu produis les illustrations de **Aikido Lingo**, application d'apprentissage de l'aikido façon
Duolingo (interface française, publics adultes et adolescents). Ce ne sont **pas des icônes** : chaque
image **montre la situation réelle** — des pratiquants dans un dojo, avec les bonnes saisies, les bons
appuis, la bonne distance — pour que l'élève reconnaisse ce qu'il vivra sur le tatami.

Génère uniquement les entrées du manifeste dont l'`origine` n'est pas `libre` ou `filme`. Enregistre en
**WebP** sous `public/images/<famille>/<id>.webp` et passe l'entrée à
`origine: { type: genere }`, `relecture: { statut: a-relire }`. Coche les tâches correspondantes de
`openspec/changes/generation-images/tasks.md`. Ne modifie aucun autre fichier.

## Style (commun à toutes les illustrations de situation)

**Dessin, pas photo.** Illustration éditoriale semi-réaliste façon manuel d'arts martiaux moderne :
trait d'encre souple, couleurs en aplats avec ombrage léger, arrière-plan de dojo simplifié mais
présent (tatami, mur en bois, lumière latérale douce). Anatomie et proportions réalistes. Pas de rendu
photoréaliste : une image générée ne doit jamais pouvoir passer pour une photo d'une vraie séance.
Les photos libres retenues et ces dessins cohabitent ; la cohérence vient du cadrage, de la lumière et
de la palette.

**Palette** — identique aux jetons de l'interface ; dominante naturelle (bois, tatami, blanc des
keikogi), l'indigo et le vermillon en accents :

| Jeton | Hex | Usage |
|---|---|---|
| `ai` (indigo hakama) | `#22325A` | hakama, ombres froides |
| `ai-fonce` | `#16213D` | cheveux, ombres profondes |
| `kinari` (écru keikogi) | `#F6F1E7` | keikogi, lumière |
| `shu` (vermillon) | `#D2462D` | accent rare (détail du kamiza, flèche de mouvement si nécessaire) |
| `sumi` (encre) | `#1C1C1E` | trait, ceinture noire |
| `bois` | `#C8A46A` | murs, armes en bois |
| `tatami` | `#CFC79A` | sol |
| `gris` | `#8A8F99` | ombres neutres |

**Personnages récurrents** (les mêmes dans toutes les images générées) :
- **Tori** : adulte, keikogi blanc, **hakama indigo**, cheveux courts foncés.
- **Uke** : adulte, keikogi et pantalon blancs, **ceinture blanche**, cheveux attachés.
- Visages calmes et concentrés, traits génériques (ne ressemblant à personne), genre et origine non
  marqués. Pieds nus sur le tatami. Kimono croisé gauche sur droite.

**Justesse technique (prioritaire sur l'esthétique)** :
- La saisie, la frappe ou la posture correspond **exactement** au champ `scene` (quelle main, quel
  poignet, une ou deux mains, épaule, sommet ou côté de la tête).
- `ai-hanmi` : **même** pied avant chez les deux partenaires ; `gyaku-hanmi` : pieds avant opposés.
- `seiza` : gros orteils croisés ou joints, dos droit, mains sur les cuisses ; `zarei` : mains posées
  devant, la gauche d'abord, buste incliné sans lever les fesses.
- Ukemi : menton rentré, roulade sur le bras et l'épaule, jamais sur la tête ou la nuque.
- Cadrage assez large pour voir mains **et** pieds.

**Interdits** : texte, lettres, chiffres ou kanji lisibles (une calligraphie au kamiza reste floue) ;
toute personne réelle reconnaissable (aucun portrait du fondateur Morihei Ueshiba ni d'un Doshu, aucune
photo au kamiza) ; logos (FFAAA, FFAB, Aikikai…) ; armes réelles (bois uniquement) ; sang, douleur,
violence ; chaussures sur le tatami.

## Formats

| Famille | Taille | Cadrage |
|---|---|---|
| `scenes` | 1200×900 (4:3) | sujet centré, mains et pieds visibles, marge 6 % |
| `covers` | 1600×800 (2:1) | scène sur les deux tiers droits, tiers gauche calme (le titre s'y superpose) |
| `modules` | 1600×800 (2:1) | ambiance, sujet centré, sobre |
| `mascotte` | 512×512, fond transparent | personnage d'interface (voir plus bas) |
| `badges` | 512×512, fond transparent | élément d'interface (voir plus bas) |

## Gabarits de prompt

Remplace `{scene}` par le champ `scene` de l'entrée.

**scenes / covers / modules**
> Semi-realistic editorial illustration in the style of a modern martial-arts manual, soft ink
> linework with flat colour and light shading, NOT photorealistic. Setting: a simple aikido dojo with
> tatami mats (#CFC79A), light wooden walls (#C8A46A), soft side lighting. Scene: {scene}. Tori is an
> adult in a white keikogi and indigo (#22325A) hakama; uke is an adult in a white keikogi, white
> trousers and a white belt. Barefoot, anatomically correct hands and feet, technically accurate grip
> and stance, framing wide enough to show hands and feet. Generic faces that resemble no real person.
> Palette dominated by off-white #F6F1E7, wood and tatami tones, indigo accents, rare vermilion
> #D2462D accent. No text, no letters, no kanji, no logo. {format}

**mascotte** (seul personnage stylisé de l'application, pour les messages d'encouragement)
> Friendly mascot sticker, 512×512, transparent background, 8px off-white outline: a small round
> aikido practitioner (big head, short body), white keikogi, indigo #22325A hakama, small vermilion
> #D2462D ensō circle on the chest, simple dot eyes. Pose: {scene}. Same character in every pose. No text.

**badges**
> Clean illustrated badge, 512×512, transparent background: {scene}, drawn in the same ink-and-flat
> style, on an indigo #22325A disc. Vermilion #D2462D stripes for progress marks. No text, no numbers.

## Vidéos

Antigravity **ne génère pas de vidéo de technique** : un mouvement d'aikido généré est presque toujours
faux (appuis, saisies, chute) et pourrait blesser un débutant qui l'imite. Les vidéos viennent de
sources libres, d'intégrations officielles ou d'un tournage au club (voir `sources-libres.md` et le champ
`video` du manifeste). Seule exception possible : une courte boucle d'ambiance sans personne pour une
couverture (`covers/dojo`), si l'utilisateur la demande.

## Ordre de génération

1. `scenes/seiza` et `scenes/katate-dori` : **les faire valider par l'utilisateur avant de continuer**
   (elles fixent le style et les deux personnages), puis les utiliser comme références.
2. Les autres `scenes` non couvertes par une source libre, puis `covers`, `modules`, `mascotte`, `badges`.

## Auto-contrôle avant d'enregistrer chaque image

- [ ] La situation du champ `scene` est exactement représentée (main, poignet, hanmi, hauteur de frappe)
- [ ] Mains et pieds visibles et anatomiquement corrects ; pas de doigts en trop
- [ ] Mêmes personnages que les images de référence ; visages génériques
- [ ] Rendu dessiné (pas photoréaliste), palette respectée
- [ ] Aucun texte, kanji lisible, logo, personne réelle, arme réelle
- [ ] Fichier `public/images/<famille>/<id>.webp`, taille exacte

Chaque image reste `a-relire` jusqu'à la relecture technique par un pratiquant gradé.
