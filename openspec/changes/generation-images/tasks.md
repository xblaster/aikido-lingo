# Tasks

> Propriétaires : `[technique]`, `[contenu]`, `[orchestration]`, `[recherche]` (voir `docs/contrat.md`)
> et `[antigravity]` (outil externe, guidé par `docs/images/prompt-antigravity.md`).

## 1. Catalogue et charte

- [x] 1.1 [orchestration] Rédiger `docs/images/manifest.yaml` : 57 entrées (26 scènes, 15 couvertures, 4 modules, 6 mascotte, 6 badges), champs `origine`, `video`, `relecture` — vérif : le YAML parse et chaque id est unique dans sa famille
- [x] 1.2 [orchestration] Rédiger `docs/images/prompt-antigravity.md` (situations réelles, dessin non photoréaliste, palette, personnages, justesse technique, pas de vidéo de technique générée) — vérif : relecture du document
- [x] 1.3 [orchestration] Section « Images » de `docs/contrat.md` + entrée au journal — vérif : entrée datée dans le journal
- [x] 1.4 [orchestration] Mettre à jour la section « Images » du contrat : familles `scenes` (et non plus `pictos`), champ `video`, origines `libre|genere|filme`, `public/videos/` — vérif : entrée datée dans le journal

## 2. Sources libres

- [ ] 2.1 [recherche] Rédiger `docs/images/sources-libres.md` : pour chaque entrée, 1 à 3 candidats image et vidéo (URL, auteur, licence, attribution, justesse technique constatée, personnes reconnaissables) et une recommandation libre / intégrée / à filmer / à générer — vérif : les 57 entrées ont une recommandation
- [ ] 2.2 [orchestration] Reporter dans le manifeste l'`origine` (et la `video`) retenue pour chaque entrée, après accord de l'utilisateur sur les recommandations — vérif : aucune entrée sans `origine`
- [ ] 2.3 [orchestration] Télécharger les médias libres retenus, les convertir (WebP 1200×900 / 1600×800 ; clips WebM sans son ≤ 10 s ≤ 2 Mo) dans `public/images/` et `public/videos/` — vérif : un fichier par entrée `libre`, tailles conformes

## 3. Interface et validation (sans média)

- [x] 3.1 [technique] Jetons Tailwind `aiki.*` avec les 8 hex de la charte, utilisés par l'interface — vérif : `tailwind.config.ts` contient les 8 hex
- [x] 3.2 [technique] `build-content` copie le manifeste dans `src/data/generated/images.json` — vérif : test node:test sur le fichier généré
- [x] 3.3 [technique] Composant de média : image 4:3 ou 2:1 selon la famille, emoji de repli dans un cadre de même format, `alt` obligatoire, aucun média non `valide` en production ; utilisé par `image_choice`, les intros de leçon, le lexique, la mascotte, les badges, les bandeaux d'unité (`cover`) et de modules — vérif : `npm run build` sans aucun média, rendu emoji partout
- [x] 3.4 [technique] Vidéo : fichier en boucle sans son, ou intégration `youtube-nocookie` chargée au clic seulement et limitée à `[debut, fin]` ; l'image reste l'affiche et le repli — vérif : aucune requête vers un tiers avant clic (onglet réseau), repli sans connexion
- [x] 3.5 [technique] `validate:content` rejette un `illustration.image` ou un `cover` absent du manifeste — vérif : test avec un identifiant inconnu qui échoue en nommant l'exercice
- [x] 3.6 [technique] Page « Crédits » générée depuis les `origine` libres du manifeste (auteur, licence, lien) — vérif : test sur une entrée CC BY-SA fictive

## 4. Contenu

- [ ] 4.1 [contenu] Ajouter `image: scenes/<id>` aux illustrations quand une entrée correspond (emoji conservé) et l'utiliser dans les intros de leçon (postures, attaques) — vérif : `npm run validate:content` passe
- [ ] 4.2 [contenu] Associer chaque unité à une couverture (`cover:`) — vérif : validation passe, chaque unité a une couverture

## 5. Génération (Antigravity) — entrées sans source libre retenue

- [ ] 5.1 [antigravity] Générer `scenes/seiza` et `scenes/katate-dori` (références de style et de personnages) — vérif : validées par l'utilisateur avant la suite
- [ ] 5.2 [antigravity] Générer les autres `scenes` à générer — vérif : auto-contrôle du prompt coché pour chacune
- [ ] 5.3 [antigravity] Générer les `covers`, `modules`, `mascotte` et `badges` à générer — vérif : un fichier WebP par entrée `genere`, tailles conformes

## 6. Relecture

- [ ] 6.1 [orchestration] Vérifier le droit à l'image des photos libres retenues (personnes reconnaissables, aucun mineur identifiable) — vérif : note par photo dans le manifeste
- [ ] 6.2 [orchestration] Relecture technique par un gradé de chaque scène et vidéo (posture, salut, chute, déplacement, attaque) ; statut `valide` ou `refuse` avec raison — vérif : plus aucune entrée `a-relire` dans `scenes`
- [ ] 6.3 [technique] Vérifier l'affichage en thème sombre et clair, sur mobile, avec et sans vidéo — vérif : captures d'écran

## Workflow follow-up

- Archiver le change (`/opsx:archive generation-images`) une fois les médias validés ; cela crée `openspec/specs/illustrations/spec.md`.
