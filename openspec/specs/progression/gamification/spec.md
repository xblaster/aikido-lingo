# progression/gamification Specification

## Purpose

Définit la progression de l'apprenant et les mécanismes de motivation : XP, série de jours,
statistiques, ainsi que la sauvegarde locale de la progression.

## Requirements

### Requirement: XP et fin de leçon
Terminer une leçon SHALL rapporter son `xpReward`. L'écran de fin de leçon SHALL afficher l'XP
gagnée, le taux de réussite et un encouragement.

#### Scenario: Leçon terminée
- **WHEN** l'apprenant termine la leçon 6k-u1-l1 dont `xpReward` vaut 20
- **THEN** son total d'XP augmente de 20

### Requirement: Série de jours
L'application SHALL compter les jours consécutifs avec au moins une leçon terminée et remettre la
série à zéro après un jour calendaire sans leçon.

#### Scenario: Jour manqué
- **WHEN** l'apprenant n'a terminé aucune leçon hier et en termine une aujourd'hui
- **THEN** la série repart à 1

### Requirement: Erreurs sans blocage
Une erreur SHALL renvoyer l'exercice en fin de leçon pour être retenté ; l'apprenant SHALL pouvoir
terminer une leçon même après plusieurs erreurs et rejouer une leçon à volonté.

#### Scenario: Exercice manqué
- **WHEN** l'apprenant se trompe sur un exercice
- **THEN** cet exercice revient avant la fin de la leçon

### Requirement: Progression locale et sans compte
La progression SHALL être sauvegardée uniquement dans le stockage local du navigateur, sans compte
ni envoi de données. Un changement d'identifiants de leçons SHALL s'accompagner d'une migration qui
conserve la progression existante.

#### Scenario: Retour de l'apprenant
- **WHEN** l'apprenant rouvre l'application sur le même navigateur
- **THEN** il retrouve ses leçons terminées, son XP et sa série

#### Scenario: Stockage indisponible
- **WHEN** le stockage local est bloqué (navigation privée)
- **THEN** l'application fonctionne et prévient que la progression ne sera pas conservée
