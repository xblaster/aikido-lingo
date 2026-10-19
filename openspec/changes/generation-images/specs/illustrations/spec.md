# illustrations

## ADDED Requirements

### Requirement: Images de situation

Les illustrations pédagogiques (familles `scenes`, `covers`, `modules`) SHALL montrer la situation
réelle qu'elles désignent — pratiquants dans un dojo, saisie, frappe, posture ou chute exactes — sous
forme de photo ou de dessin. Elles MUST NOT être des icônes ou pictogrammes. Seules la mascotte et les
badges de niveau sont des éléments graphiques d'interface.

#### Scenario: Exercice de reconnaissance d'une attaque
- **WHEN** un exercice `image_choice` demande de reconnaître `ryote dori`
- **THEN** chaque option montre deux partenaires, et l'option correcte montre uke saisissant les deux
  poignets de tori, une main pour chaque poignet

### Requirement: Catalogue fermé des médias

Le système SHALL n'utiliser que les entrées de `docs/images/manifest.yaml`. Chaque entrée MUST avoir un
identifiant unique dans sa famille, un emoji de repli et une description de scène, et SHALL indiquer son
origine (`libre`, `genere` ou `filme`) avant publication. Le chemin d'une image MUST être
`public/images/<famille>/<id>.webp`.

#### Scenario: Référence connue
- **WHEN** un exercice déclare `illustration: { image: scenes/seiza, emoji: "🧎", alt: "…" }`
- **THEN** la validation du contenu l'accepte

#### Scenario: Référence inconnue
- **WHEN** un exercice cite `scenes/kokyu-ho` absent du manifeste
- **THEN** `npm run validate:content` échoue en nommant l'exercice et l'identifiant

### Requirement: Vidéo optionnelle

Une entrée MAY avoir une vidéo, soit fichier (clip court sans son, en boucle, hébergé avec l'application),
soit intégration d'un lecteur externe limitée à un segment. L'image de l'entrée SHALL servir d'affiche et
de repli. La vidéo MUST NOT démarrer avec du son, et une intégration externe MUST NOT être chargée avant
une action de l'utilisateur (pas de requête vers un tiers à l'affichage de la page).

#### Scenario: Vidéo intégrée
- **WHEN** l'intro d'une leçon affiche `scenes/mae-ukemi` qui a une vidéo `embed`
- **THEN** l'image s'affiche avec un bouton lecture, et le lecteur externe n'est chargé qu'au clic,
  sur le seul segment `[debut, fin]`

#### Scenario: Pas de connexion
- **WHEN** la vidéo ne peut pas être chargée
- **THEN** l'image reste affichée, sans erreur bloquante

### Requirement: Affichage avec repli

L'interface SHALL afficher le média quand il est disponible et validé, et MUST afficher l'emoji de repli
quand le fichier est absent ou ne se charge pas, sans décalage de mise en page. Tout média MUST avoir un
texte alternatif.

#### Scenario: Image pas encore produite
- **WHEN** `public/images/scenes/zarei.webp` n'existe pas
- **THEN** l'emoji de repli s'affiche dans un cadre de même format et l'option reste sélectionnable

### Requirement: Licences et attributions

Un média d'origine `libre` MUST avoir une licence autorisant la réutilisation dans l'application, son
auteur et son texte d'attribution, et SHALL apparaître dans la page « Crédits ». Une personne
reconnaissable sur une photo libre MUST être signalée et ne SHALL être publiée qu'après vérification que
l'usage ne porte pas atteinte à son droit à l'image (aucun mineur identifiable).

#### Scenario: Photo sous CC BY-SA
- **WHEN** `scenes/seiza` provient de Wikimedia Commons sous CC BY-SA 4.0
- **THEN** la page « Crédits » mentionne l'auteur, la licence et le lien de la source

### Requirement: Charte des dessins générés

Les images générées SHALL suivre `docs/images/prompt-antigravity.md` : rendu dessiné non photoréaliste,
palette de l'interface, mêmes personnages, aucun texte ni kanji lisible, aucune personne réelle
reconnaissable, aucun logo. Les vidéos de technique MUST NOT être générées.

#### Scenario: Image photoréaliste générée
- **WHEN** une image générée peut passer pour la photo d'une vraie séance
- **THEN** elle est refusée à la relecture et régénérée

### Requirement: Justesse technique relue

Tout média représentant une posture, un salut, une chute, un déplacement ou une attaque MUST être relu
par un pratiquant gradé, avec un statut consigné dans le manifeste. En production, un média non `valide`
MUST NOT être affiché : l'emoji de repli le remplace.

#### Scenario: Hanmi inversé
- **WHEN** le relecteur constate que `scenes/ai-hanmi` montre des pieds avant opposés
- **THEN** le statut passe à `refuse` avec la raison et le média est remplacé
