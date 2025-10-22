# Spécifications Techniques - Aikido Lingo

## 1. Vue d'ensemble du projet

### 1.1 Description
**Aikido Lingo** est une plateforme d'apprentissage gamifiée inspirée de Duolingo, conçue pour aider les pratiquants d'aïkido à maîtriser la terminologie, les positions et les techniques nécessaires aux passages de grade.

### 1.2 Problématique
Les pratiquants d'aïkido doivent mémoriser de nombreux termes japonais associés à des positions, mouvements et techniques spécifiques. L'apprentissage par icônes visuelles simples et intuitives facilite la mémorisation et la compréhension rapide lors de la pratique.

### 1.3 Objectif principal
Créer une application d'apprentissage qui permet de maîtriser les **couples "terme d'aïkido" ⇔ icône/symbole"** avec :
- Des **icônes représentatives** mais simples à comprendre
- Des **sous-titres clairs** expliquant l'action ou la position
- Une progression **gamifiée** par grade/ceinture
- Un système de **répétition espacée** pour la mémorisation

---

## 2. Architecture technique

### 2.1 Stack technologique (basé sur letz-learn)

| Composant | Technologie | Version | Justification |
|-----------|-------------|---------|---------------|
| **Frontend Framework** | React | 18.2.0 | Composants réutilisables, écosystème riche |
| **Langage** | TypeScript | 4.9.5 | Typage fort, maintenabilité |
| **UI Library** | Material-UI (MUI) | 7.3.2 | Composants accessibles, responsive |
| **Styling** | Emotion | 11.14.0 | CSS-in-JS, thème dynamique |
| **Routing** | React Router DOM | 7.9.2 | Navigation multi-pages |
| **Build Tool** | create-react-app | 5.0.1 | Configuration zero, production-ready |
| **Containerisation** | Docker | Latest | Déploiement reproductible |
| **Web Server** | Nginx | Stable Alpine | Serveur léger pour fichiers statiques |

### 2.2 Structure du projet

```
aikido-lingo/
├── src/
│   ├── components/                 # Composants React
│   │   ├── exercises/              # Types d'exercices spécifiques
│   │   │   ├── IconMatchingExercise.tsx
│   │   │   ├── TermToIconExercise.tsx
│   │   │   ├── IconToTermExercise.tsx
│   │   │   ├── VideoObservationExercise.tsx
│   │   │   ├── PositionIdentificationExercise.tsx
│   │   │   ├── SafetyQuizExercise.tsx
│   │   │   ├── SequenceOrderingExercise.tsx
│   │   │   └── FreeRecallExercise.tsx
│   │   ├── LearningUnit.tsx        # Orchestrateur d'unité
│   │   ├── BeltProgressList.tsx    # Navigation par grade
│   │   ├── ProgressBar.tsx         # Barre de progression
│   │   ├── StatCards.tsx           # Statistiques utilisateur
│   │   └── IconLibrary.tsx         # Bibliothèque d'icônes
│   ├── data/                       # Données d'apprentissage
│   │   ├── belts/                  # Organisation par grade
│   │   │   ├── white5Data.ts       # 5ème kyū (ceinture blanche)
│   │   │   ├── white4Data.ts
│   │   │   ├── white3Data.ts
│   │   │   └── ...
│   │   ├── icons/                  # Définitions d'icônes
│   │   │   ├── stancesIcons.ts
│   │   │   ├── movementsIcons.ts
│   │   │   ├── techniquesIcons.ts
│   │   │   └── weaponsIcons.ts
│   │   └── curriculum.ts           # Organisation du curriculum
│   ├── hooks/                      # React hooks personnalisés
│   │   ├── useProgress.ts
│   │   └── useSpacedRepetition.ts
│   ├── services/                   # Logique métier
│   │   ├── progressTracking.ts
│   │   ├── spacedRepetition.ts
│   │   └── iconRenderer.ts
│   ├── types/                      # Définitions TypeScript
│   │   ├── AikidoTypes.ts
│   │   ├── ExerciseTypes.ts
│   │   └── IconTypes.ts
│   ├── utils/                      # Utilitaires
│   │   ├── progressStorage.ts
│   │   ├── iconHelpers.ts
│   │   └── soundEffects.ts
│   ├── assets/                     # Ressources statiques
│   │   ├── icons/                  # Icônes SVG
│   │   ├── videos/                 # Vidéos de démonstration
│   │   └── sounds/                 # Effets sonores
│   ├── App.tsx                     # Composant principal
│   └── theme.ts                    # Configuration du thème
├── public/
├── Dockerfile
├── package.json
└── README.md
```

### 2.3 Architecture des données

```
Curriculum
├── Belt Level (9 grades: 5ème kyū → 1er dan)
│   ├── Category (Positions, Techniques, Armes, etc.)
│   │   ├── Learning Unit (Sujet spécifique)
│   │   │   ├── Terminology Items (Termes + Icônes)
│   │   │   └── Exercises (8-12 exercices variés)
│   │   │       └── Exercise Results (Performance utilisateur)
```

---

## 3. Modèles de données

### 3.1 Types de base

```typescript
// src/types/AikidoTypes.ts

/** Niveaux de grade en aïkido */
type BeltLevel =
  | 'white_5'   // 5ème kyū
  | 'white_4'   // 4ème kyū
  | 'white_3'   // 3ème kyū
  | 'white_2'   // 2ème kyū
  | 'white_1'   // 1er kyū
  | 'black_1'   // 1er dan
  | 'black_2'   // 2ème dan
  | 'black_3'   // 3ème dan
  | 'black_4'   // 4ème dan

/** Catégories de techniques */
type TechniqueCategory =
  | 'positions'      // Positions de base (kamae, seiza, etc.)
  | 'movements'      // Déplacements (tenkan, irimi, etc.)
  | 'techniques'     // Techniques (ikkyo, nikyo, etc.)
  | 'weapons'        // Armes (bokken, jo, tanto)
  | 'falls'          // Chutes (ukemi)
  | 'principles'     // Principes philosophiques
  | 'etiquette'      // Étiquette du dojo

/** Élément de terminologie avec icône */
interface TerminologyItem {
  id: string                    // Identifiant unique
  japanese: string              // Terme en japonais (ex: "seiza")
  romaji: string                // Romanisation (ex: "SE-i-za")
  french: string                // Traduction française
  english: string               // Traduction anglaise

  // Représentation visuelle
  iconType: 'svg' | 'emoji' | 'composite'
  iconData: IconData            // Données de l'icône
  iconCaption: string           // Sous-titre explicatif (ex: "Assis sur les talons")

  // Contexte
  category: TechniqueCategory
  beltLevel: BeltLevel          // Grade minimal requis
  description: string           // Description détaillée

  // Ressources optionnelles
  videoUrl?: string             // Démonstration vidéo
  imageUrl?: string             // Photo réelle de la position
  audioUrl?: string             // Prononciation audio

  // Métadonnées
  difficulty: 1 | 2 | 3 | 4 | 5 // Niveau de difficulté
  keywords: string[]            // Mots-clés pour recherche
  relatedTerms: string[]        // IDs de termes associés
}

/** Définition d'une icône */
interface IconData {
  type: 'svg' | 'emoji' | 'composite'

  // Pour type='svg'
  svgPath?: string              // Chemin du fichier SVG
  svgContent?: string           // Contenu SVG inline

  // Pour type='emoji'
  emoji?: string                // Unicode emoji (ex: "🧎")

  // Pour type='composite' (plusieurs éléments)
  elements?: IconElement[]

  // Styling
  color?: string                // Couleur principale
  backgroundColor?: string      // Fond (si nécessaire)
  size?: 'small' | 'medium' | 'large'
}

/** Élément d'icône composite */
interface IconElement {
  type: 'shape' | 'arrow' | 'line' | 'text'
  position: { x: number; y: number }

  // Pour shape
  shape?: 'circle' | 'square' | 'triangle' | 'person'

  // Pour arrow/line
  direction?: 'up' | 'down' | 'left' | 'right' | 'diagonal'

  // Pour text
  text?: string

  color?: string
  size?: number
}
```

### 3.2 Unité d'apprentissage

```typescript
/** Unité d'apprentissage complète */
interface LearningUnit {
  id: string
  title: string                 // Ex: "Positions de base"
  description: string           // Objectifs d'apprentissage

  beltLevel: BeltLevel          // Grade concerné
  category: TechniqueCategory

  terminology: TerminologyItem[] // 5-15 termes à apprendre
  exercises: Exercise[]          // 8-12 exercices variés

  targetScore: number           // Score minimum pour valider (%)
  estimatedTime: number         // Temps estimé (minutes)

  prerequisites: string[]       // IDs des unités prérequises
  isSafetyCritical: boolean     // Nécessite validation sécurité
}

/** Organisation du curriculum */
interface Curriculum {
  belts: BeltSection[]
}

interface BeltSection {
  id: string
  level: BeltLevel
  name: string                  // Ex: "5ème Kyū - Ceinture blanche"
  description: string
  units: LearningUnit[]
  color: string                 // Couleur associée au grade
  unlockCondition: UnlockCondition
}

interface UnlockCondition {
  type: 'previous_belt' | 'specific_units' | 'always_unlocked'
  requiredUnits?: string[]      // IDs des unités à compléter
  requiredScore?: number        // Score minimum global
}
```

### 3.3 Exercices

```typescript
/** Types d'exercices disponibles */
type ExerciseType =
  | 'icon_matching'             // Associer termes et icônes
  | 'term_to_icon'              // Terme donné → choisir icône
  | 'icon_to_term'              // Icône donnée → choisir terme
  | 'video_observation'         // Regarder vidéo + identifier
  | 'position_identification'   // Identifier position dans contexte
  | 'safety_quiz'               // QCM de sécurité
  | 'sequence_ordering'         // Remettre séquence dans l'ordre
  | 'free_recall'               // Rappel libre (flashcard)

/** Exercice générique */
interface Exercise {
  id: string
  type: ExerciseType
  question: string              // Question posée

  // Contenu
  terminologyItem: TerminologyItem

  // Pour exercices à choix multiples
  options?: ExerciseOption[]
  correctAnswer: string

  // Pour exercices d'association
  pairs?: TermPair[]

  // Pour exercices de séquence
  sequence?: SequenceItem[]
  correctOrder?: number[]

  // Supports
  hint?: string
  context?: string              // Contexte situationnel
  videoUrl?: string

  // Métadonnées
  difficulty: 1 | 2 | 3 | 4 | 5
  estimatedTime: number         // Secondes
}

interface ExerciseOption {
  id: string
  value: string                 // Texte de l'option
  iconData?: IconData           // Icône si applicable
  isCorrect: boolean
}

interface TermPair {
  id: string
  term: string
  icon: IconData
  caption: string
}

interface SequenceItem {
  id: string
  order: number                 // Position correcte
  term: string
  icon: IconData
  description: string
}
```

### 3.4 Progression utilisateur

```typescript
/** Progression globale sauvegardée */
interface UserProgress {
  // Progression curriculum
  currentBeltLevel: BeltLevel
  completedUnits: string[]      // IDs des unités complétées
  unlockedUnits: string[]       // IDs des unités débloquées

  // Statistiques globales
  stats: UserStats

  // Historique de pratique
  practiceLog: PracticeSession[]

  // Répétition espacée
  spacedRepetitionData: SpacedRepetitionData

  // Certifications de sécurité
  safetyChecklist: { [unitId: string]: boolean }

  // Métadonnées
  createdAt: string             // ISO timestamp
  lastUpdated: string
}

interface UserStats {
  totalXp: number               // Points d'expérience
  totalMinutes: number          // Temps total de pratique
  unitsCompleted: number        // Nombre d'unités validées
  accuracy: number              // Précision moyenne (%)
  streak: number                // Jours consécutifs de pratique

  // Par catégorie
  categoryProgress: {
    [key in TechniqueCategory]: {
      termsLearned: number
      accuracy: number
    }
  }
}

interface PracticeSession {
  date: string                  // ISO date
  unitId: string
  duration: number              // Minutes
  exercisesCompleted: number
  score: number                 // Pourcentage
  termsReviewed: string[]       // IDs des termes pratiqués
}

/** Système de répétition espacée (Leitner) */
interface SpacedRepetitionData {
  boxes: {
    [termId: string]: {
      box: 1 | 2 | 3 | 4 | 5    // Boîte actuelle (1=nouveau, 5=maîtrisé)
      lastReviewed: string      // ISO timestamp
      nextReview: string        // ISO timestamp
      consecutiveCorrect: number
      totalReviews: number
    }
  }
}

/** Résultat d'exercice */
interface ExerciseResult {
  exerciseId: string
  isCorrect: boolean
  timeSpent: number             // Millisecondes
  attempts: number              // Nombre de tentatives
  timestamp: string             // ISO timestamp

  // Feedback spécifique
  userAnswer: string
  correctAnswer: string
  hintsUsed: number
}

/** État d'une unité en cours */
interface UnitProgress {
  unitId: string
  currentExerciseIndex: number
  completedExercises: ExerciseResult[]
  score: number                 // Pourcentage actuel
  hearts: number                // Vies restantes (sur 5)
  isCompleted: boolean
  startedAt: string
  completedAt?: string
}
```

---

## 4. Types d'exercices détaillés

### 4.1 Icon Matching (Association d'icônes)

**Objectif** : Associer des termes à leurs icônes correspondantes par glisser-déposer.

**Interface** :
```
┌─────────────────────────────────────────┐
│ Associez les termes aux icônes          │
├─────────────────────────────────────────┤
│                                         │
│  Termes           Icônes               │
│  ┌─────────┐     ┌─────────┐          │
│  │ Seiza   │─────│  🧎     │          │
│  └─────────┘     │ Assis   │          │
│                  └─────────┘          │
│  ┌─────────┐     ┌─────────┐          │
│  │ Kamae   │     │  🚶➡️   │          │
│  └─────────┘     │ Garde   │          │
│                  └─────────┘          │
└─────────────────────────────────────────┘
```

**Paramètres** :
- 4-6 paires à associer
- Feedback immédiat sur connexion correcte/incorrecte
- Animation de validation

### 4.2 Term to Icon (Terme vers icône)

**Objectif** : Choisir la bonne icône parmi plusieurs options pour un terme donné.

**Interface** :
```
┌─────────────────────────────────────────┐
│ Quelle icône représente "Tenkan" ?      │
│ (Mouvement pivotant)                    │
├─────────────────────────────────────────┤
│  A)  ⭕➡️              B)  🔄           │
│      Déplacement           Rotation     │
│      circulaire            sur place    │
│                                         │
│  C)  ⬆️               D)  ↩️            │
│      Avancer              Reculer       │
│      direct               pivot         │
└─────────────────────────────────────────┘
```

**Paramètres** :
- 4 options (1 correcte + 3 distracteurs)
- Icônes similaires pour augmenter difficulté
- Sous-titres clairs sous chaque icône

### 4.3 Icon to Term (Icône vers terme)

**Objectif** : Identifier le terme japonais correspondant à une icône affichée.

**Interface** :
```
┌─────────────────────────────────────────┐
│ Quel est ce mouvement ?                 │
├─────────────────────────────────────────┤
│                                         │
│         🙏➡️                            │
│     Mains jointes                       │
│     puis extension                      │
│                                         │
├─────────────────────────────────────────┤
│  A) Kokyu-ho    B) Tegatana             │
│  C) Shomen      D) Katate-dori          │
└─────────────────────────────────────────┘
```

### 4.4 Video Observation (Observation vidéo)

**Objectif** : Regarder une démonstration vidéo et identifier la technique montrée.

**Interface** :
```
┌─────────────────────────────────────────┐
│ Regardez cette démonstration            │
├─────────────────────────────────────────┤
│  ┌───────────────────────────────┐     │
│  │                               │     │
│  │    [Lecteur vidéo 10-20s]    │     │
│  │                               │     │
│  └───────────────────────────────┘     │
│                                         │
│  Quelle technique est démontrée ?      │
│                                         │
│  ○ Ikkyo                               │
│  ○ Nikyo                               │
│  ○ Sankyo                              │
│  ○ Yonkyo                              │
└─────────────────────────────────────────┘
```

**Paramètres** :
- Vidéo courte (10-20 secondes)
- Angle de vue clair
- Possibilité de revoir 2-3 fois
- QCM après visionnage

### 4.5 Position Identification (Identification de position)

**Objectif** : Identifier des positions spécifiques dans un contexte (photo, schéma).

**Interface** :
```
┌─────────────────────────────────────────┐
│ Cliquez sur la personne en "Hanmi"     │
├─────────────────────────────────────────┤
│                                         │
│      👤①        👤②         👤③       │
│   (debout    (position    (assis)      │
│    neutre)    triangle)                 │
│                                         │
│         [Indice : position latérale]   │
└─────────────────────────────────────────┘
```

### 4.6 Safety Quiz (Quiz de sécurité)

**Objectif** : Valider la compréhension des consignes de sécurité critiques.

**Interface** :
```
┌─────────────────────────────────────────┐
│ ⚠️  Question de sécurité                │
├─────────────────────────────────────────┤
│ Lors d'un ukemi avant, vous devez :    │
│                                         │
│ ○ Garder la tête relevée               │
│ ○ Rentrer le menton (CORRECT)          │
│ ○ Regarder vers l'arrière              │
│ ○ Bloquer votre respiration            │
│                                         │
│ ⚠️  Cette question ne coûte pas de vie │
│    mais doit être réussie pour         │
│    valider l'unité                     │
└─────────────────────────────────────────┘
```

**Spécificités** :
- Ne compte pas dans le système de vies
- DOIT être réussie pour valider l'unité
- Explications détaillées après réponse

### 4.7 Sequence Ordering (Mise en séquence)

**Objectif** : Remettre les étapes d'une technique dans le bon ordre.

**Interface** :
```
┌─────────────────────────────────────────┐
│ Remettez les étapes de l'Ikkyo         │
│ dans le bon ordre                       │
├─────────────────────────────────────────┤
│                                         │
│  [ 3 ] 🤝➡️  Saisie du poignet          │
│       (Katate-dori)                     │
│                                         │
│  [ 1 ] 🧍 Position de départ            │
│       (Hanmi)                           │
│                                         │
│  [ 4 ] 🔄⬇️ Contrôle au sol             │
│       (Osae)                            │
│                                         │
│  [ 2 ] ↩️  Déséquilibre                 │
│       (Kuzushi)                         │
│                                         │
│       [Valider l'ordre]                │
└─────────────────────────────────────────┘
```

### 4.8 Free Recall (Rappel libre - Flashcard)

**Objectif** : Système de flashcards avec répétition espacée.

**Interface - Recto** :
```
┌─────────────────────────────────────────┐
│          📇 Flashcard 3/10              │
├─────────────────────────────────────────┤
│                                         │
│              🧎                         │
│         Assis sur les                   │
│            talons                       │
│                                         │
│  Quel est ce terme en japonais ?       │
│                                         │
│         [Afficher la réponse]          │
└─────────────────────────────────────────┘
```

**Interface - Verso** :
```
┌─────────────────────────────────────────┐
│          📇 Flashcard 3/10              │
├─────────────────────────────────────────┤
│                                         │
│              Seiza                      │
│            (SE-i-za)                    │
│                                         │
│  Vous vous en souvenez ?               │
│                                         │
│  [😟 Pas du tout]  [😐 Un peu]         │
│  [😊 Bien]  [😄 Parfait!]              │
└─────────────────────────────────────────┘
```

**Algorithme** :
- Leitner box system (5 boîtes)
- Intervalles : 1j, 3j, 7j, 14j, 30j
- Rétrogradation si erreur

---

## 5. Système d'icônes

### 5.1 Principes de conception

**Objectifs** :
- ✅ Simplicité : compréhensible en < 3 secondes
- ✅ Cohérence : style uniforme dans toute l'app
- ✅ Clarté : un sous-titre explicite toujours présent
- ✅ Accessibilité : contraste suffisant, taille adaptative

**Règles de design** :
1. **Palette limitée** : 3-4 couleurs maximum par icône
2. **Formes géométriques simples** : cercles, triangles, flèches
3. **Représentation de la personne** : silhouette stylisée (🧍)
4. **Flèches directionnelles** : pour indiquer mouvements
5. **Symboles universels** : ✋ (main), 👣 (pieds), 🔄 (rotation)

### 5.2 Exemples d'icônes par catégorie

#### Positions (Kamae)

| Terme | Icône | Sous-titre | Description |
|-------|-------|------------|-------------|
| **Seiza** | 🧎 | Assis sur les talons | Silhouette assise, jambes repliées |
| **Hanmi** | 🧍📐 | Position triangulaire | Silhouette + triangle au sol |
| **Shizentai** | 🧍 | Posture naturelle | Silhouette debout, pieds parallèles |
| **Kamae** | 🧍⚔️ | En garde | Silhouette + symbole garde |

#### Mouvements (Tai Sabaki)

| Terme | Icône | Sous-titre | Description |
|-------|-------|------------|-------------|
| **Irimi** | ➡️🧍 | Entrer direct | Flèche vers avant + silhouette |
| **Tenkan** | 🔄🧍 | Rotation pivot | Cercle + flèche courbe |
| **Tenshin** | ↩️🧍 | Reculer pivot | Flèche arrière courbe |
| **Tai Sabaki** | ⭕➡️ | Esquive circulaire | Cercle + flèche tangente |

#### Techniques (Waza)

| Terme | Icône | Sous-titre | Description |
|-------|-------|------------|-------------|
| **Ikkyo** | ✋⬇️ | Contrôle 1er principe | Main + flèche vers bas |
| **Nikyo** | 🤝🔄 | Torsion poignet | Poignée de main + rotation |
| **Kote Gaeshi** | 🤝↩️ | Retournement poignet | Main + flèche retour |
| **Shiho Nage** | 🤝⤴️ | Projection 4 directions | Main + flèche montante |

#### Saisies (Kumi Kata)

| Terme | Icône | Sous-titre | Description |
|-------|-------|------------|-------------|
| **Katate-dori** | 🤝 | Saisie un poignet | Poignée de main |
| **Morote-dori** | 🤝🤝 | Saisie deux mains | Double poignée |
| **Ryote-dori** | 🙌 | Saisie deux poignets | Deux mains levées |
| **Shomen-uchi** | ✋⬇️ | Frappe verticale | Main ouverte + flèche descendante |

#### Chutes (Ukemi)

| Terme | Icône | Sous-titre | Description |
|-------|-------|------------|-------------|
| **Mae Ukemi** | 🤸⬇️ | Chute avant | Figure en mouvement vers avant |
| **Ushiro Ukemi** | 🤸⬅️ | Chute arrière | Figure en mouvement vers arrière |
| **Yoko Ukemi** | 🤸➡️ | Chute latérale | Figure en mouvement latéral |

#### Armes (Buki Waza)

| Terme | Icône | Sous-titre | Description |
|-------|-------|------------|-------------|
| **Bokken** | 🗡️ | Sabre en bois | Symbole sabre |
| **Jo** | ⚊ | Bâton court | Ligne verticale épaisse |
| **Tanto** | 🔪 | Couteau | Symbole couteau |

### 5.3 Implémentation technique

```typescript
// src/data/icons/stancesIcons.ts

export const stancesIcons: Record<string, IconData> = {
  seiza: {
    type: 'composite',
    elements: [
      {
        type: 'shape',
        shape: 'person',
        position: { x: 50, y: 60 },
        color: '#1976d2',
        size: 40
      },
      {
        type: 'line',
        position: { x: 30, y: 90 },
        direction: 'horizontal',
        color: '#666',
        size: 40
      }
    ]
  },

  hanmi: {
    type: 'composite',
    elements: [
      {
        type: 'shape',
        shape: 'person',
        position: { x: 50, y: 40 },
        color: '#1976d2'
      },
      {
        type: 'shape',
        shape: 'triangle',
        position: { x: 50, y: 80 },
        color: '#ffa726',
        size: 30
      }
    ]
  }
}
```

### 5.4 Composant de rendu d'icône

```typescript
// src/components/IconRenderer.tsx

interface IconRendererProps {
  iconData: IconData
  caption: string
  size?: 'small' | 'medium' | 'large'
  showCaption?: boolean
}

export const IconRenderer: React.FC<IconRendererProps> = ({
  iconData,
  caption,
  size = 'medium',
  showCaption = true
}) => {
  const sizeMap = {
    small: 48,
    medium: 96,
    large: 144
  }

  return (
    <Box sx={{ textAlign: 'center' }}>
      {iconData.type === 'emoji' && (
        <Typography fontSize={sizeMap[size]}>
          {iconData.emoji}
        </Typography>
      )}

      {iconData.type === 'svg' && (
        <img
          src={iconData.svgPath}
          alt={caption}
          style={{ width: sizeMap[size], height: sizeMap[size] }}
        />
      )}

      {iconData.type === 'composite' && (
        <CompositeIcon elements={iconData.elements} size={sizeMap[size]} />
      )}

      {showCaption && (
        <Typography variant="caption" color="text.secondary" mt={1}>
          {caption}
        </Typography>
      )}
    </Box>
  )
}
```

---

## 6. Fonctionnalités principales

### 6.1 Parcours d'apprentissage progressif

**Navigation par grade** :
```
5ème Kyū (Ceinture blanche) ✓
├── Unité 1: Positions de base (5/5 ⭐⭐⭐⭐⭐) ✓
├── Unité 2: Salutations (4/5 ⭐⭐⭐⭐) ✓
└── Unité 3: Premiers déplacements (0/5) 🔒

4ème Kyū 🔒
3ème Kyū 🔒
```

**Système de déverrouillage** :
- Premier grade toujours déverrouillé
- Unité suivante déverrouillée après validation de la précédente (score ≥ 80%)
- Grade suivant déverrouillé après complétion de toutes les unités du grade actuel

### 6.2 Système de gamification

**Points d'expérience (XP)** :
- Base : 100 XP par unité complétée
- Bonus : +50 XP si score ≥ 90%
- Bonus : +25 XP si complété sans erreur
- Bonus streak : +10 XP par jour consécutif

**Système de vies (Coeurs)** :
- 5 coeurs ❤️❤️❤️❤️❤️ par unité
- Erreur = -1 coeur
- 0 coeur = échec de l'unité, recommencer
- Questions de sécurité ne coûtent pas de coeur

**Badges et réalisations** :
- 🥋 "Premier pas" : Première unité complétée
- 🔥 "Série de 7" : 7 jours consécutifs de pratique
- 🎯 "Perfectionniste" : 10 unités à 100%
- 📚 "Vocabulaire de fer" : 100 termes maîtrisés
- ⚡ "Vitesse éclair" : Unité complétée en < 5 minutes

### 6.3 Répétition espacée intelligente

**Mode révision** :
- Accessible depuis le menu principal
- Propose automatiquement les termes à réviser selon algorithme Leitner
- Adapte la fréquence selon la performance
- Flashcards avec auto-évaluation

**Algorithme** :
```
Boîte 1 (nouveau) → Révision tous les jours
Boîte 2 → Révision tous les 3 jours
Boîte 3 → Révision tous les 7 jours
Boîte 4 → Révision tous les 14 jours
Boîte 5 (maîtrisé) → Révision tous les 30 jours

Succès → Monter d'une boîte
Échec → Redescendre à la boîte 1
```

### 6.4 Bibliothèque de référence

**Consultation libre** :
- Toutes les icônes et termes accessibles
- Filtrage par :
  - Catégorie (positions, mouvements, techniques...)
  - Grade (5ème kyū → 1er dan)
  - Difficulté
- Fonction recherche (japonais, français, anglais)
- Aucun tracking de progression

**Interface** :
```
┌─────────────────────────────────────────┐
│ 📚 Bibliothèque de référence            │
├─────────────────────────────────────────┤
│ Recherche: [________]  🔍               │
│                                         │
│ Filtres:                                │
│ Grade: [Tous ▼]  Catégorie: [Tous ▼]   │
├─────────────────────────────────────────┤
│                                         │
│ ┌────────┐ ┌────────┐ ┌────────┐      │
│ │  🧎    │ │ 🧍📐   │ │ ➡️🧍   │      │
│ │ Seiza  │ │ Hanmi  │ │ Irimi  │      │
│ │ Assis  │ │ Garde  │ │ Entrer │      │
│ └────────┘ └────────┘ └────────┘      │
│                                         │
└─────────────────────────────────────────┘
```

### 6.5 Tableau de bord utilisateur

**Statistiques affichées** :
- XP total et niveau actuel
- Grade en cours et progression
- Termes maîtrisés / Total
- Précision moyenne
- Série de jours consécutifs
- Temps de pratique total
- Graphique de progression hebdomadaire

### 6.6 Mode hors ligne

**Progressive Web App (PWA)** :
- Installation sur mobile/desktop
- Fonctionne sans connexion
- Synchronisation automatique quand en ligne
- Service worker pour cache des ressources

---

## 7. Interface utilisateur

### 7.1 Thème visuel

**Palette de couleurs** :
```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#c62828',      // Rouge aikido (passion, énergie)
      light: '#ff5f52',
      dark: '#8e0000'
    },
    secondary: {
      main: '#1a237e',      // Bleu marine (discipline, respect)
      light: '#534bae',
      dark: '#000051'
    },
    success: {
      main: '#2e7d32',      // Vert (progression)
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: '"Noto Sans JP", "Inter", "Roboto", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 }
  },
  shape: {
    borderRadius: 12
  }
})
```

**Grades et couleurs associées** :
- 5ème-4ème Kyū : Blanc (#ffffff)
- 3ème-2ème Kyū : Jaune (#fdd835)
- 1er Kyū : Orange (#fb8c00)
- 1er Dan+ : Noir (#212121)

### 7.2 Navigation principale

**Menu principal** (4 cartes) :
```
┌─────────────────────────────────────────┐
│ 🥋 Aikido Lingo                         │
│ Votre progression: 5ème Kyū - 35% ━━━━  │
├─────────────────────────────────────────┤
│                                         │
│ ┌──────────┐ ┌──────────┐              │
│ │ 📖       │ │ 🔄       │              │
│ │ Apprendre│ │ Réviser  │              │
│ │ Suivre   │ │ Répétition│             │
│ │ le       │ │ espacée  │              │
│ │ parcours │ │          │              │
│ └──────────┘ └──────────┘              │
│                                         │
│ ┌──────────┐ ┌──────────┐              │
│ │ 📚       │ │ 📊       │              │
│ │ Biblio   │ │ Stats    │              │
│ │ Consulter│ │ Voir vos │              │
│ │ termes   │ │ progrès  │              │
│ └──────────┘ └──────────┘              │
│                                         │
└─────────────────────────────────────────┘
```

### 7.3 Écran d'exercice

```
┌─────────────────────────────────────────┐
│ ← Positions de base        ❤️❤️❤️❤️🤍  │
│ ━━━━━━━━━━━━━━━━━━ 7/10 (70%)          │
├─────────────────────────────────────────┤
│                                         │
│ Quelle icône représente "Seiza" ?      │
│                                         │
│ 💡 Indice : Position assise formelle   │
│                                         │
│ ┌─────────┐ ┌─────────┐                │
│ │   🧎    │ │  🧍📐   │                │
│ │ Assis   │ │ Position│                │
│ │ talons  │ │triangle │                │
│ └─────────┘ └─────────┘                │
│                                         │
│ ┌─────────┐ ┌─────────┐                │
│ │   🧍    │ │  🤸     │                │
│ │ Debout  │ │ Chute   │                │
│ │ naturel │ │ avant   │                │
│ └─────────┘ └─────────┘                │
│                                         │
│        [Voir l'indice] [Passer]        │
└─────────────────────────────────────────┘
```

### 7.4 Écran de complétion d'unité

```
┌─────────────────────────────────────────┐
│                                         │
│          ⭐ Unité terminée! ⭐          │
│                                         │
│            Score: 90%                   │
│         ⭐⭐⭐⭐⭐                        │
│                                         │
│  📊 Statistiques:                       │
│  • Temps: 8 minutes                    │
│  • Précision: 9/10 exercices           │
│  • XP gagné: +150 XP                   │
│                                         │
│  🎯 Termes maîtrisés:                  │
│  • Seiza, Hanmi, Kamae, Shizentai      │
│                                         │
│  💪 Termes à réviser:                  │
│  • Suwari waza                         │
│                                         │
│  [Continuer] [Réviser les erreurs]     │
└─────────────────────────────────────────┘
```

### 7.5 Responsive design

**Mobile-first** :
- Touch targets ≥ 48x48px
- Police lisible (16px minimum)
- Navigation par swipe entre exercices
- Mode portrait optimisé

**Breakpoints** :
- xs (0-600px) : 1 colonne, full-width
- sm (600-960px) : 2 colonnes pour grille d'icônes
- md (960px+) : Layout desktop, sidebar navigation

---

## 8. Données de contenu

### 8.1 Organisation du curriculum

**9 grades** avec progression :

1. **5ème Kyū** (Ceinture blanche) - Fondamentaux
   - Unité 1 : Étiquette du dojo (rei, seiza)
   - Unité 2 : Positions de base (kamae, hanmi)
   - Unité 3 : Premiers déplacements (ayumi ashi, tsugi ashi)
   - Unité 4 : Chutes de base (mae ukemi, ushiro ukemi)

2. **4ème Kyū** - Saisies et entrées
   - Unité 5 : Saisies fondamentales (katate-dori, ryote-dori)
   - Unité 6 : Entrées directes (irimi)
   - Unité 7 : Premières immobilisations (ikkyo)

3. **3ème Kyū** - Techniques avancées
   - Unité 8 : Rotations (tenkan, tenshin)
   - Unité 9 : Immobilisations 2-3 (nikyo, sankyo)
   - Unité 10 : Projections simples (kote gaeshi)

4. **2ème Kyū** - Combinaisons
   - Unité 11 : Enchaînements
   - Unité 12 : Armes initiation (bokken, jo)
   - Unité 13 : Variations d'attaques

5. **1er Kyū** - Préparation 1er dan
   - Unité 14 : Techniques complètes
   - Unité 15 : Principes philosophiques
   - Unité 16 : Travail des armes avancé

6-9. **1er-4ème Dan** - Maîtrise progressive
   - Techniques avancées
   - Variations multiples
   - Enseignement et transmission

### 8.2 Structure d'un fichier de données

```typescript
// src/data/belts/white5Data.ts

import { TerminologyItem, LearningUnit } from '@/types/AikidoTypes'
import { stancesIcons } from '@/data/icons/stancesIcons'

/** Vocabulaire Unité 1 : Étiquette du dojo */
const unit1Terminology: TerminologyItem[] = [
  {
    id: 'rei',
    japanese: '礼',
    romaji: 'rei',
    french: 'Salut',
    english: 'Bow',
    iconType: 'composite',
    iconData: {
      type: 'composite',
      elements: [
        {
          type: 'shape',
          shape: 'person',
          position: { x: 50, y: 50 },
          color: '#1976d2'
        },
        {
          type: 'arrow',
          direction: 'down',
          position: { x: 50, y: 30 },
          color: '#c62828'
        }
      ]
    },
    iconCaption: 'Salut respectueux',
    category: 'etiquette',
    beltLevel: 'white_5',
    description: 'Salut formel marquant respect et humilité. Se fait debout (ritsu rei) ou assis (za rei).',
    difficulty: 1,
    keywords: ['salut', 'respect', 'étiquette', 'bow'],
    relatedTerms: ['seiza', 'ritsu_rei', 'za_rei']
  },

  {
    id: 'seiza',
    japanese: '正座',
    romaji: 'sei-za',
    french: 'Position assise formelle',
    english: 'Formal sitting',
    iconType: 'emoji',
    iconData: {
      type: 'emoji',
      emoji: '🧎'
    },
    iconCaption: 'Assis sur les talons',
    category: 'positions',
    beltLevel: 'white_5',
    description: 'Position assise traditionnelle sur les talons, genoux au sol, dos droit.',
    videoUrl: '/videos/seiza-demo.mp4',
    difficulty: 1,
    keywords: ['assis', 'position', 'sitting', 'formal'],
    relatedTerms: ['rei', 'tatami']
  },

  // ... 8-12 autres termes
]

/** Générateur d'exercices Unité 1 */
const generateUnit1Exercises = (): Exercise[] => {
  const exercises: Exercise[] = []

  // Exercice 1: Vidéo observation
  exercises.push({
    id: 'video_rei',
    type: 'video_observation',
    question: 'Regardez cette démonstration et identifiez le type de salut',
    terminologyItem: unit1Terminology[0], // rei
    videoUrl: '/videos/rei-demonstration.mp4',
    options: [
      { id: 'opt1', value: 'Ritsu rei (debout)', isCorrect: true },
      { id: 'opt2', value: 'Za rei (assis)', isCorrect: false },
      { id: 'opt3', value: 'Sensei ni rei', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    difficulty: 1,
    estimatedTime: 30
  })

  // Exercice 2: Term to Icon
  exercises.push({
    id: 'term_seiza',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Seiza" ?',
    terminologyItem: unit1Terminology[1],
    options: [
      {
        id: 'opt1',
        value: 'Position assise',
        iconData: { type: 'emoji', emoji: '🧎' },
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Position debout',
        iconData: { type: 'emoji', emoji: '🧍' },
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Chute avant',
        iconData: { type: 'emoji', emoji: '🤸' },
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Position garde',
        iconData: stancesIcons.hanmi,
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    hint: 'Position assise formelle japonaise',
    difficulty: 1,
    estimatedTime: 15
  })

  // ... 8-10 autres exercices variés

  return exercises
}

/** Unité d'apprentissage complète */
export const learningUnit1: LearningUnit = {
  id: 'white5_unit1',
  title: 'Étiquette du dojo',
  description: 'Apprenez les bases du respect et de la conduite dans un dojo d\'aïkido',
  beltLevel: 'white_5',
  category: 'etiquette',
  terminology: unit1Terminology,
  exercises: generateUnit1Exercises(),
  targetScore: 80,
  estimatedTime: 15,
  prerequisites: [],
  isSafetyCritical: false
}
```

### 8.3 Données initiales à créer

**Phase 1** (MVP - 3 premières unités) :
- Unit 1 : Étiquette (10 termes, 10 exercices)
- Unit 2 : Positions (12 termes, 12 exercices)
- Unit 3 : Déplacements (10 termes, 10 exercices)

**Total Phase 1** : 32 termes, 32 exercices, ~1h30 de contenu

**Phase 2** (Expansion) :
- Unités 4-7 (4ème-3ème kyū)
- Total : 80+ termes

**Phase 3** (Complet) :
- Toutes les unités jusqu'au 1er dan
- Total : 200+ termes

---

## 9. Stockage et persistence

### 9.1 localStorage (Phase 1)

**Clés utilisées** :
```
'aikido-lingo-progress'    → UserProgress
'aikido-lingo-settings'    → UserSettings
'aikido-lingo-cache'       → ContentCache
```

**Exemple de données sauvegardées** :
```json
{
  "currentBeltLevel": "white_5",
  "completedUnits": ["white5_unit1", "white5_unit2"],
  "unlockedUnits": ["white5_unit1", "white5_unit2", "white5_unit3"],
  "stats": {
    "totalXp": 450,
    "totalMinutes": 45,
    "unitsCompleted": 2,
    "accuracy": 87.5,
    "streak": 3
  },
  "spacedRepetitionData": {
    "boxes": {
      "rei": {
        "box": 3,
        "lastReviewed": "2025-10-20T10:30:00Z",
        "nextReview": "2025-10-27T10:30:00Z",
        "consecutiveCorrect": 5,
        "totalReviews": 8
      }
    }
  },
  "lastUpdated": "2025-10-21T14:22:00Z"
}
```

### 9.2 Backend optionnel (Phase 2+)

**API REST** pour :
- Synchronisation multi-appareils
- Sauvegarde cloud
- Statistiques globales (classement communauté)
- Partage de progression avec instructeur

**Endpoints** :
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/progress
PUT    /api/progress
GET    /api/stats/global
POST   /api/share/instructor
```

---

## 10. Tests et qualité

### 10.1 Tests unitaires

**Framework** : Jest + React Testing Library

**Couverture cible** :
- Components : 80%
- Utils : 90%
- Services : 85%

**Exemples** :
```typescript
// IconRenderer.test.tsx
describe('IconRenderer', () => {
  it('renders emoji icon correctly', () => {
    const iconData: IconData = {
      type: 'emoji',
      emoji: '🧎'
    }
    render(<IconRenderer iconData={iconData} caption="Test" />)
    expect(screen.getByText('🧎')).toBeInTheDocument()
  })

  it('displays caption when showCaption is true', () => {
    // ...
  })
})

// progressStorage.test.ts
describe('Progress Storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('saves and loads progress correctly', () => {
    const progress: UserProgress = { /* ... */ }
    saveProgress(progress)
    const loaded = loadProgress()
    expect(loaded).toEqual(progress)
  })
})
```

### 10.2 Tests E2E

**Framework** : Cypress ou Playwright

**Scénarios critiques** :
1. Parcours complet d'une unité
2. Déverrouillage progression
3. Système de vies (échec/succès)
4. Répétition espacée
5. Persistence après refresh

### 10.3 Accessibilité

**Conformité WCAG 2.1 AA** :
- Contraste ≥ 4.5:1 pour textes
- Navigation clavier complète
- ARIA labels sur éléments interactifs
- Alt text sur toutes les images
- Focus indicators visibles

**Tests** :
- Lighthouse Accessibility score ≥ 90
- axe DevTools : 0 violations
- Test navigation clavier manuelle

---

## 11. Déploiement

### 11.1 Build de production

```bash
# Installation dépendances
npm install

# Build optimisé
npm run build
# → Génère dossier build/ avec assets minifiés

# Preview local
npx serve -s build
```

### 11.2 Docker

**Dockerfile** (multi-stage) :
```dockerfile
# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build et run** :
```bash
docker build -t aikido-lingo:latest .
docker run -p 8080:80 aikido-lingo:latest
```

### 11.3 Hébergement

**Options recommandées** :

| Option | Avantages | Coût |
|--------|-----------|------|
| **Netlify** | Gratuit, CI/CD, CDN global | Gratuit (hobby) |
| **Vercel** | Performance optimale, preview | Gratuit (hobby) |
| **GitHub Pages** | Simple, gratuit | Gratuit |
| **AWS S3 + CloudFront** | Scalable, pro | ~5-10€/mois |

**Configuration Netlify** :
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 11.4 PWA Configuration

**Service Worker** :
```javascript
// public/service-worker.js
const CACHE_NAME = 'aikido-lingo-v1'
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/icons/*',
  '/videos/*'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  )
})
```

**manifest.json** :
```json
{
  "name": "Aikido Lingo",
  "short_name": "AikidoLingo",
  "description": "Apprenez la terminologie d'aïkido",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#c62828",
  "background_color": "#fafafa",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 12. Roadmap de développement

### Phase 1 : MVP (4-6 semaines)

**Semaine 1-2 : Configuration et architecture**
- [ ] Setup projet (create-react-app + TypeScript)
- [ ] Configuration MUI theme
- [ ] Types de base (AikidoTypes.ts, ExerciseTypes.ts)
- [ ] Structure de dossiers complète
- [ ] Composant IconRenderer de base

**Semaine 3-4 : Fonctionnalités core**
- [ ] Système de navigation (BeltProgressList)
- [ ] Composant LearningUnit
- [ ] 4 types d'exercices prioritaires :
  - [ ] TermToIconExercise
  - [ ] IconToTermExercise
  - [ ] IconMatchingExercise
  - [ ] SafetyQuizExercise
- [ ] Système de progression (localStorage)
- [ ] Système de vies (hearts)

**Semaine 5-6 : Contenu et polish**
- [ ] Données 3 premières unités (32 termes)
- [ ] 20+ icônes SVG/composites
- [ ] Écrans de complétion d'unité
- [ ] Statistiques de base
- [ ] Tests unitaires critiques
- [ ] Déploiement Netlify

**Livrables MVP** :
✅ 3 unités jouables (5ème kyū)
✅ 32 termes avec icônes
✅ 4 types d'exercices
✅ Progression sauvegardée
✅ Application déployée

### Phase 2 : Expansion (6-8 semaines)

**Fonctionnalités** :
- [ ] 4 types d'exercices supplémentaires
- [ ] Mode révision avec répétition espacée
- [ ] Bibliothèque de référence
- [ ] Tableau de bord statistiques avancé
- [ ] Système de badges
- [ ] Mode PWA (offline)

**Contenu** :
- [ ] Unités 4-10 (4ème-3ème kyū)
- [ ] 80+ termes additionnels
- [ ] Vidéos de démonstration (10-15)
- [ ] Bibliothèque complète d'icônes (100+)

### Phase 3 : Optimisation (4 semaines)

- [ ] Backend API (optionnel)
- [ ] Synchronisation cloud
- [ ] Partage progression instructeur
- [ ] Analytics avancés
- [ ] Tests E2E complets
- [ ] Optimisation performance (lazy loading)
- [ ] Accessibilité WCAG AA complète

### Phase 4 : Extension (continu)

- [ ] Unités jusqu'au 1er dan
- [ ] Mode multijoueur/défi
- [ ] Application mobile native (React Native)
- [ ] Reconnaissance vocale japonais
- [ ] Réalité augmentée (visualisation 3D positions)

---

## 13. Critères de succès

### Métriques techniques

| Métrique | Objectif | Priorité |
|----------|----------|----------|
| **Performance** | Lighthouse ≥ 90 | Haute |
| **Accessibilité** | WCAG AA, Lighthouse ≥ 90 | Haute |
| **SEO** | Lighthouse ≥ 85 | Moyenne |
| **Bundle size** | < 500 KB (gzipped) | Moyenne |
| **Time to Interactive** | < 3s (3G) | Haute |
| **Test coverage** | ≥ 80% | Haute |

### Métriques utilisateur

| Métrique | Objectif MVP | Objectif v1.0 |
|----------|--------------|---------------|
| **Rétention J7** | 40% | 60% |
| **Temps moyen/session** | 8 min | 12 min |
| **Unités complétées/semaine** | 1.5 | 3 |
| **Taux de complétion unité** | 75% | 85% |
| **Score moyen** | 70% | 80% |

### Feedback qualitatif

**Objectifs** :
- [ ] Application intuitive sans tutoriel
- [ ] Icônes comprises en < 3 secondes
- [ ] Motivant et engageant (gamification)
- [ ] Aide réelle pour passage de grade
- [ ] Retours positifs de 3+ instructeurs d'aïkido

---

## 14. Risques et mitigations

| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| **Icônes trop abstraites** | Haute | Moyenne | Tests utilisateurs précoces, iterations |
| **Terminologie incorrecte** | Haute | Faible | Validation par instructeurs certifiés |
| **Faible engagement** | Haute | Moyenne | Gamification forte, feedback rapide |
| **Performance mobile** | Moyenne | Moyenne | Lazy loading, optimisation images/videos |
| **Pas de vidéos dispo** | Moyenne | Moyenne | Fallback sur images + descriptions |
| **Difficulté scaling contenu** | Moyenne | Haute | Templates, générateurs d'exercices |

---

## 15. Annexes

### 15.1 Glossaire technique

- **CEFR** : Common European Framework of Reference (pour langues, adapté ici)
- **Kyū** : Grade en dessous de la ceinture noire (5ème → 1er)
- **Dan** : Grade de ceinture noire (1er → 10ème)
- **Leitner box** : Système de répétition espacée par boîtes
- **PWA** : Progressive Web App (application web installable)
- **Ukemi** : Techniques de chute en aïkido

### 15.2 Ressources externes

**Design** :
- Icônes : Material Icons, Font Awesome
- Police japonaise : Noto Sans JP
- Couleurs : Material Design palette

**Développement** :
- Documentation React : https://react.dev
- MUI Components : https://mui.com
- TypeScript Handbook : https://www.typescriptlang.org/docs

**Contenu aïkido** :
- Aikikai Foundation (terminologie officielle)
- Vidéos Aikido Journal
- Manuels techniques dojos locaux

### 15.3 Contact et gouvernance

**Chef de projet** : [Votre nom]
**Validation technique** : Instructeurs certifiés
**Review contenu** : [Nom instructeur principal]
**Feedback utilisateurs** : [Email/formulaire]

---

## Conclusion

Ce document définit les spécifications complètes pour **Aikido Lingo**, une plateforme d'apprentissage gamifiée basée sur l'architecture éprouvée de letz-learn, adaptée spécifiquement à l'enseignement de la terminologie d'aïkido via un système d'**icônes intuitives et sous-titres clairs**.

L'approche progressive par grade, le système de répétition espacée et la gamification motivante permettront aux pratiquants de maîtriser efficacement les termes nécessaires aux passages de grade.

**Prochaines étapes** :
1. Validation de ces specs avec instructeurs
2. Setup environnement de développement
3. Début Phase 1 - MVP (3 premières unités)

---

**Version** : 1.0
**Date** : 21 octobre 2025
**Statut** : Draft pour validation
