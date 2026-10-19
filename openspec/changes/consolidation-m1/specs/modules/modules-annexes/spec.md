# modules/modules-annexes

## MODIFIED Requirements

### Requirement: Simulateur de passage de grade
L'application SHALL proposer, pour chaque niveau, un simulateur qui enchaîne des « appels » du jury
tirés de `content/examen.yaml` (par exemple « ai hanmi katate dori ikkyo »). Pour chaque appel,
l'apprenant identifie l'attaque, la technique et la variante ; le simulateur affiche ensuite les
conseils et, en fin de session, les critères d'évaluation du grade et les sources. La durée accordée à
chaque appel SHALL être celle définie pour le grade dans `content/examen.yaml` (`dureeAppel`, en
secondes), 30 s par défaut si elle est absente. Le simulateur SHALL rappeler qu'il est un outil de
révision et ne préjuge pas du résultat d'un examen réel.

#### Scenario: Appel du jury
- **WHEN** le simulateur 5e kyu affiche un appel
- **THEN** l'appel est lu en synthèse vocale et l'apprenant doit décomposer attaque, technique et variante

#### Scenario: Programme limité au grade
- **WHEN** le simulateur d'un grade tire ses appels
- **THEN** seuls des appels de ce grade ou des grades inférieurs sont proposés, conformément au référentiel

#### Scenario: Durée propre au grade
- **WHEN** `content/examen.yaml` fixe `dureeAppel: 45` pour le 5e kyu
- **THEN** chaque appel du simulateur 5e kyu dispose de 45 secondes
