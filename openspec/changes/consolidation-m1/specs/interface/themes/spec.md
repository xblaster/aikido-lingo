# interface/themes

## ADDED Requirements

### Requirement: Thèmes sombre et clair complets
L'application SHALL offrir un thème sombre et un thème clair, et chaque écran (parcours, leçon,
modules, statistiques, crédits) SHALL respecter le thème choisi. Le choix SHALL être conservé dans le
stockage local.

#### Scenario: Leçon en thème clair
- **WHEN** l'apprenant a choisi le thème clair et ouvre une leçon
- **THEN** l'intro, les exercices et l'écran de fin s'affichent en clair, texte lisible (contraste AA)

#### Scenario: Module en thème clair
- **WHEN** l'apprenant ouvre le décodeur de techniques en thème clair
- **THEN** le module s'affiche en clair, sans zone restée sombre
