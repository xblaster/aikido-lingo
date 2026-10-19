# Feuille de route — Aikido Lingo

Jalons successifs ; un jalon est atteint quand **tous** ses critères d'acceptation sont vérifiés.
Propriétaires : **technique** (T), **contenu** (C), **recherche** (R), **orchestration** (O),
**humain** (H : enseignant relecteur ou porteur du projet). Les exigences détaillées sont dans
`openspec/specs/`, le format des données dans `docs/contrat.md`.

État au 2026-10-19 : M1 en cours. **Décision du porteur (2026-10-19) : on commence par le 6e et le 5e kyu** ; les niveaux suivants (M2 à M4) sont différés.

## M1 — Application, 6e et 5e kyu

| # | Livrable | Critère d'acceptation | Propriétaire |
|---|---|---|---|
| 1.1 | Dépôt, conventions, specs | `README.md`, `CLAUDE.md`, `content/README.md`, `openspec/specs/` (6 capacités, `openspec validate --specs --strict` au vert), dépôt git sur `main` | O |
| 1.2 | Référentiel et sources | `content/referentiel/sources.md` et `6k.yaml` présents, chaque entrée datée ; divergences entre fédérations listées | R |
| 1.3 | Chaîne de contenu | `npm run content:build`, `npm run validate:content` et `npm test` existent et passent sur `content/_exemples/` | T |
| 1.4 | Moteur des 16 types | les 16 types ont un rendu et une correction propres, visibles sur la page de démonstration ; tests de la comparaison tolérante (casse, tirets, macrons) | T |
| 1.5 | Arbre, leçon, progression | arbre de compétences 6 niveaux, apport puis 8 exercices, XP, série, sauvegarde locale, avertissement « le tatami d'abord » | T |
| 1.6 | Contenu 6e kyu | 5 unités × 8 leçons × 8 exercices, fiches de recherche et plans, validation au vert | C |
| 1.6b | Contenu 5e kyu | référentiel `5k.yaml`, 5 unités × 8 leçons × 8 exercices, validation au vert | R → C |
| 1.7 | Revérification 6e et 5e kyu | chaque leçon a `verification` d'une autre session, aucun écart `ouvert` | C (autre session) |
| 1.8 | Intégration | `docs/integration.md` : build, validation et tests au vert sur `main` | O |

## M2 — 4e kyu et modules annexes (différé)

| # | Livrable | Critère d'acceptation | Propriétaire |
|---|---|---|---|
| 2.1 | Référentiel 4k | `4k.yaml` complet et sourcé | R → C |
| 2.3 | Contenu 4e kyu | idem | C |
| 2.4 | Lexique et reishiki | `lexique.yaml` couvre tous les termes enseignés jusqu'au 4e kyu ; `etiquette.yaml` couvre les saluts, l'entrée au dojo, la tenue ; modules affichés | C, T |
| 2.5 | Décodeur libre | décodeur alimenté par le lexique, signale les termes inconnus | T |

## M3 — 3e, 2e et 1er kyu (différé)

| # | Livrable | Critère d'acceptation | Propriétaire |
|---|---|---|---|
| 3.1 | Référentiels 3k et 2k-1k | complets et sourcés, y compris armes (*bokken*, *jo*, *tanto*) selon les fédérations | R → C |
| 3.2 | Contenu 3e kyu et 2e–1er kyu | 2 × 320 exercices, validation au vert, revérification sans écart ouvert | C |
| 3.3 | Simulateur (kyu) | `examen.yaml` couvre les grades 6e → 1er kyu ; simulateur jouable pour chacun | C, T |

## M4 — Shodan et simulateur complet (différé)

| # | Livrable | Critère d'acceptation | Propriétaire |
|---|---|---|---|
| 4.1 | Référentiel shodan | programme CSDGE du 1er dan, épreuves et critères, sourcés | R → C |
| 4.2 | Contenu shodan | 320 exercices, validation au vert, revérification sans écart ouvert | C |
| 4.3 | Simulateur shodan | épreuves et critères du 1er dan, avertissement « outil de révision » | C, T |
| 4.4 | Parcours complet | 1 920 exercices, tous les niveaux jouables de bout en bout, tests au vert | O (contrôle) |

## M5 — Relecture humaine et déploiement

| # | Livrable | Critère d'acceptation | Propriétaire |
|---|---|---|---|
| 5.1 | Recrutement des relecteurs | au moins un enseignant qualifié (DEJEPS/BEES aïkido, BF ou ≥ 3e dan, voir `content/README.md`) par grade, idéalement des deux fédérations | H, O |
| 5.2 | Relecture | chaque unité `review.statut: relu` avec `relecteur`, `qualification`, `date` ; écarts corrigés | H, C |
| 5.3 | Publication | unités relues passées en `publie` | C |
| 5.4 | Déploiement | export statique servi (cible à décider, cf. `deploy/`), HTTPS, page « À propos » avec sources et avertissement | T, O |
| 5.5 | README à jour | le README décrit exactement ce qui est livré | O |
