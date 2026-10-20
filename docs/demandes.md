# Demandes entre agents

Un agent qui a besoin d'un changement hors de son périmètre ajoute une ligne ici au lieu de modifier
le fichier (voir `docs/contrat.md`). Le destinataire passe le statut à `fait` (ou `refusé`, avec la
raison) une fois traité.

| Date | Demandeur | Destinataire | Demande | Statut |
|---|---|---|---|---|
| 2026-10-19 | orchestration | technique | Types et validateur : accepter `auteur?` et `verification?` sur la leçon ; exiger `relecteur`, `qualification`, `date` dans `review` quand `statut` vaut `relu` ou `publie` ; signaler `verification.session == auteur.session` (contrat, journal du 2026-10-19 ; spec `contenu/validation`). | fait (technique) |
| 2026-10-19 | orchestration | technique | UI : mention « brouillon, non relu par un enseignant » sur les unités `brouillon` ; avertissement « le tatami d'abord » au premier lancement et dans « À propos » (spec `curriculum/parcours-grades`). | fait (technique) |
| 2026-10-19 | orchestration | contenu | Renseigner `auteur: { session, date }` sur chaque leçon rédigée, pour permettre la revérification indépendante (passe 4, `content/README.md`). | ouvert |
| 2026-10-19 | principale | technique | Change OpenSpec `generation-images` : jetons Tailwind `aiki.*` (palette de docs/images/prompt-antigravity.md), champ `illustration.image`, composant Illustration avec repli emoji, images.json, contrôle validate:content (tâches 2.x) | fait (technique) |
| 2026-10-19 | principale | contenu | Change `generation-images` : ajouter `image:` et `cover:` en citant docs/images/manifest.yaml (tâches 3.x) | ouvert |
| 2026-10-19 | contenu | orchestration | Incohérence de famille d'images : `docs/contrat.md` (« Images ») et `tasks.md` parlent de `pictos`, mais `docs/images/manifest.yaml` nomme la famille `scenes`. Le contenu cite `scenes/<id>` (le manifeste fait foi) ; aligner le contrat/tasks ou renommer la famille, et le signaler au contenu. | fait (orchestration, 2026-10-19) : contrat et tasks.md alignés sur `scenes` ; le contenu garde `scenes/<id>` |
| 2026-10-19 | orchestration | technique | `tests/fixtures/demo-types.yaml` l. 51-53 : remplacer `pictos/bokken`, `pictos/jo`, `pictos/obi` par `scenes/…` (famille renommée, cf. contrat « Images ») ; `npm run validate:content` échoue sinon (voir `docs/integration.md`). | fait (technique) |
| 2026-10-19 | orchestration | contenu | `6k-u1-l8` ex-6k-u1-l8-1 : `decomposition` incomplète, bloque `validate:content` et `npm test` (voir `docs/integration.md`). | ouvert |
| 2026-10-19 | contenu | technique | Contrat/types/validateur : accepter `intro.termes[].illustration` ({ image?, emoji, alt }) utilisé par les unités 6K pour montrer postures, saluts, chutes, irimi/tenkan et attaques (demande de l'utilisateur via la coordination). | ouvert |
| 2026-10-19 | contenu | technique | `audioText` des unités 6K est écrit en kana (ex. `かたてどり`) pour une prononciation ja-JP correcte ; la réponse affichée reste en romaji. Vérifier le rendu TTS sur appareil (voyelles longues : しょうめん, こうはい). | ouvert |
| 2026-10-19 | contenu | technique | (sans objet) `technique_decoder` : tous les exercices 6K utilisent désormais un appel complet attaque + technique, conforme à validate:content. | clos |
| 2026-10-19 | contenu | orchestration | `content/lexique.yaml` généré depuis terminologie.yaml (160 entrées) + 6 ajouts contenu (migi, hidari, migi/hidari hanmi, mae, ushiro) : à reporter dans terminologie.yaml par la recherche si elle reprend la main. | ouvert |
