# Proposal

## Why

Les emojis utilisés comme illustrations ne montrent rien de l'aikido (aucun ne représente un *zarei*, un
*gyaku hanmi* ou un *shomen uchi*). L'élève doit voir la **situation réelle** qu'il vivra sur le tatami :
de vraies images (photo ou dessin) et, quand un mouvement se comprend mieux en mouvement, une vidéo. Il
faut une liste fermée, une charte commune et des règles de source avant toute récupération ou génération.

## What Changes

- **Images de situation, pas d'icônes** : 26 `scenes` (postures, saluts, chutes, déplacements, 8 attaques,
  tenue et armes en situation), 15 couvertures d'unité, 4 bandeaux de modules ; seuls la mascotte (6) et
  les badges de niveau (6) restent des éléments graphiques d'interface — 57 entrées
  (`docs/images/manifest.yaml`).
- **Trois origines** par entrée, dans cet ordre de préférence : média **libre** (photo, dessin ou vidéo
  sous licence réutilisable, recherché dans `docs/images/sources-libres.md`), **filmé** au club, ou
  **généré** par Antigravity (dessin semi-réaliste, jamais photoréaliste, jamais de vidéo de technique).
- **Vidéo optionnelle** sur une entrée : clip court hébergé ou lecteur externe limité à un segment, chargé
  seulement au clic ; l'image reste l'affiche et le repli.
- Charte et prompt Antigravity (`docs/images/prompt-antigravity.md`), palette identique à l'interface.
- Licences et attributions affichées dans « Crédits » ; droit à l'image vérifié pour les photos.
- Relecture technique de chaque média par un pratiquant gradé ; repli emoji tant qu'il n'est pas validé.

## Capabilities

### New Capabilities

- `illustrations` : catalogue fermé des médias (images et vidéos), origine et licences, affichage avec
  repli, charte des dessins générés, relecture technique.

### Modified Capabilities

(aucune : `exercices/moteur-exercices` et `modules/modules-annexes` gardent leurs exigences ; ils
référencent un identifiant de média)

## Impact

- **technique** : jetons Tailwind `aiki.*`, champs `illustration.image` et `cover`, composant de média
  (image, vidéo fichier, intégration au clic, repli emoji), `images.json` généré, contrôles dans
  `validate:content`, page « Crédits », `public/images/` et `public/videos/`.
- **contenu** : cite uniquement les identifiants du manifeste ; demande les ajouts via `docs/demandes.md`.
- **orchestration** : tient le manifeste (origine, licence, relecture), le processus de relecture et le
  contrat.
- **recherche** : recherche des médias libres (`docs/images/sources-libres.md`).
- **Antigravity** (externe) : génère les entrées sans source libre retenue.
- `docs/contrat.md` **change** : section « Images » (consignée au journal).
