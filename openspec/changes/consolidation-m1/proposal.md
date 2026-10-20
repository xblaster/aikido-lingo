# Proposal

## Why

Les premiers retours des agents (technique et recherche du référentiel) montrent que l'application et
le référentiel sont posés, mais avec des manques qui bloquent la mise en main pour le jalon M1
(application + 6e et 5e kyu) : thème clair incomplet, types d'exercices jamais testés dans un
navigateur, minuteur d'examen figé, et un référentiel dont la référence principale, les variantes et
les lacunes (kanji non vérifiés, faits à source unique) ne sont pas encore visibles pour l'apprenant.

## What Changes

- Thème clair complet (modules et écran de leçon inclus), en plus du thème sombre.
- Vérification de chaque type d'exercice et de chaque module dans un vrai navigateur (bureau et mobile).
- Minuteur du simulateur de passage de grade réglable par grade, au lieu de 30 s fixes.
- Référentiel : chaque fichier de grade déclare sa référence principale et son état (`complet` ou
  `a-completer`) ; les variantes (FFAAA, FLAM Luxembourg, Aikikai) sont affichées comme telles.
- Lacunes du référentiel traitées : kanji absents affichés sans kanji (jamais inventés), faits à source
  unique signalés, lecture du livret kyu FFAB et des ouvrages de référence à faire.
- Retours du contenu 6K : illustrations sur les termes de l'apport, `audioText` en kana pour la
  synthèse ja-JP, report des 6 ajouts du lexique dans `terminologie.yaml`, traçabilité `auteur` des
  leçons, liste des points à faire relire par un enseignant, clôture des demandes déjà traitées.
- Hors périmètre : déploiement, niveaux 4e kyu et au-delà, médias (change `generation-images`).

## Capabilities

### New Capabilities

- `interface/themes` : thèmes sombre et clair complets sur tous les écrans.

### Modified Capabilities

- `modules/modules-annexes` : simulateur de passage de grade (durée des appels réglable par grade).
- `curriculum/referentiel-sources` : référentiel par grade (référence principale, état, variantes).

## Impact

- **technique** : thème clair (modules, leçon), minuteur réglable, affichage de la référence
  principale et des variantes, vérification navigateur.
- **recherche / contenu** : champs `referencePrincipale` et `etat` dans les fichiers de référentiel,
  lacunes de `sources.md`, durée des appels dans `content/examen.yaml`.
- **orchestration** : décision sur la référence principale des kyu (FFAB ou FLAM) à consigner.
- `docs/contrat.md` **change** : champs `referencePrincipale`, `etat` (référentiel) et `dureeAppel`
  (examen), consignés au journal par l'orchestration.
