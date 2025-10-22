# Aikido Lingo - Data Creation Template

This document provides templates and examples for creating curriculum data (terminology, exercises, units).

## Terminology Item Template

Use this template to create new terminology items:

```typescript
{
  id: 'unique_term_id',                    // lowercase, underscores
  japanese: '日本語',                      // Japanese characters
  romaji: 'ni-hon-go',                     // Hyphenated pronunciation
  french: 'Traduction française',          // French translation
  english: 'English translation',          // English translation

  iconType: 'emoji' | 'svg' | 'composite', // Icon type
  iconData: {
    // See Icon Data Templates below
  },
  iconCaption: 'Short descriptive caption', // 3-5 words

  category: 'positions',                   // See categories below
  beltLevel: 'white_5',                    // Minimum required belt
  description: 'Detailed explanation of the term, technique, or position. Include context, execution, and importance.',

  // Optional fields
  videoUrl: '/videos/term-demo.mp4',       // Optional demo video
  imageUrl: '/images/term-photo.jpg',      // Optional reference photo
  audioUrl: '/audio/term-pronunciation.mp3', // Optional pronunciation

  difficulty: 1,                           // 1 (easiest) to 5 (hardest)
  keywords: ['keyword1', 'keyword2'],      // Search keywords
  relatedTerms: ['term_id_1', 'term_id_2'] // Related term IDs
}
```

## Icon Data Templates

### Emoji Icon (Simplest)
```typescript
iconData: {
  type: 'emoji',
  emoji: '🧎'  // Single emoji character
}
```

**Common Aikido Emojis**:
- 🧎 Kneeling (seiza)
- 🧍 Standing (shizentai, kamae)
- 🤸 Tumbling (ukemi)
- 🤝 Handshake/grip (kumi kata)
- 🗡️ Sword (bokken, ken)
- 🙏 Prayer hands (respect)
- ✋ Raised hand (tegatana)
- 👣 Footprints (tai sabaki)
- ⚔️ Crossed swords (buki waza)

### SVG Icon
```typescript
iconData: {
  type: 'svg',
  svgPath: '/assets/icons/stances/hanmi.svg',
  color: '#1976d2'  // Optional tint color
}
```

### Composite Icon (Most Flexible)

**Simple Person Icon**:
```typescript
iconData: {
  type: 'composite',
  elements: [
    {
      type: 'shape',
      shape: 'person',
      position: { x: 50, y: 50 },  // Center of 100x100 viewBox
      color: '#1976d2',
      size: 30
    }
  ]
}
```

**Person with Triangle (Hanmi)**:
```typescript
iconData: {
  type: 'composite',
  elements: [
    {
      type: 'shape',
      shape: 'person',
      position: { x: 50, y: 40 },
      color: '#1976d2',
      size: 30
    },
    {
      type: 'shape',
      shape: 'triangle',
      position: { x: 50, y: 75 },
      color: '#ffa726',
      size: 25
    }
  ]
}
```

**Person with Arrow (Irimi)**:
```typescript
iconData: {
  type: 'composite',
  elements: [
    {
      type: 'arrow',
      direction: 'right',
      position: { x: 20, y: 50 },
      color: '#2e7d32',
      size: 30,
      strokeWidth: 3
    },
    {
      type: 'shape',
      shape: 'person',
      position: { x: 70, y: 50 },
      color: '#1976d2',
      size: 25
    }
  ]
}
```

**Circular Motion (Tenkan)**:
```typescript
iconData: {
  type: 'composite',
  elements: [
    {
      type: 'shape',
      shape: 'circle',
      position: { x: 50, y: 50 },
      color: 'none',  // Invisible circle for structure
      size: 30
    },
    {
      type: 'arrow',
      direction: 'right',
      position: { x: 30, y: 30 },
      color: '#2e7d32',
      size: 20
    },
    {
      type: 'shape',
      shape: 'person',
      position: { x: 50, y: 50 },
      color: '#1976d2',
      size: 20
    }
  ]
}
```

## Exercise Templates

### Term to Icon Exercise
```typescript
{
  id: 'unit1_ex1_seiza',
  type: 'term_to_icon',
  question: 'Quelle icône représente "Seiza" ?',
  terminologyItem: seizaTerm,  // Reference to TerminologyItem

  options: [
    {
      id: 'opt1',
      value: 'Assis sur les talons',
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
      value: 'Position de garde',
      iconData: kamaeIcon,
      isCorrect: false
    },
    {
      id: 'opt4',
      value: 'Chute avant',
      iconData: { type: 'emoji', emoji: '🤸' },
      isCorrect: false
    }
  ],

  correctAnswer: 'opt1',
  hint: 'Position assise formelle japonaise',
  difficulty: 1,
  estimatedTime: 15
}
```

### Icon to Term Exercise
```typescript
{
  id: 'unit1_ex2_rei',
  type: 'icon_to_term',
  question: 'Quel est ce terme ?',
  terminologyItem: reiTerm,

  options: [
    { id: 'opt1', value: 'Rei', iconData: reiIcon, isCorrect: true },
    { id: 'opt2', value: 'Seiza', iconData: seizaIcon, isCorrect: false },
    { id: 'opt3', value: 'Kamae', iconData: kamaeIcon, isCorrect: false },
    { id: 'opt4', value: 'Ukemi', iconData: ukemiIcon, isCorrect: false }
  ],

  correctAnswer: 'opt1',
  hint: 'Marque de respect au début et fin de pratique',
  difficulty: 1,
  estimatedTime: 15
}
```

### Safety Quiz Exercise
```typescript
{
  id: 'unit1_safety1',
  type: 'safety_quiz',
  question: 'Avant de commencer un exercice avec partenaire, vous devez :',
  terminologyItem: reiTerm,  // Related term

  options: [
    {
      id: 'opt1',
      value: 'Saluer votre partenaire (rei)',
      isCorrect: true
    },
    {
      id: 'opt2',
      value: 'Commencer immédiatement',
      isCorrect: false
    },
    {
      id: 'opt3',
      value: 'Discuter de la technique',
      isCorrect: false
    },
    {
      id: 'opt4',
      value: 'Attendre le signal du professeur',
      isCorrect: false
    }
  ],

  correctAnswer: 'opt1',
  context: 'Le salut (rei) marque le respect mutuel et la concentration avant chaque pratique.',
  difficulty: 1,
  estimatedTime: 20
}
```

### Free Recall Exercise (Flashcard)
```typescript
{
  id: 'unit1_recall1_seiza',
  type: 'free_recall',
  question: 'Quel est ce terme en japonais ?',
  terminologyItem: seizaTerm,

  // For flashcards, options are self-assessment
  options: [
    { id: 'hard', value: 'Pas du tout', isCorrect: false },
    { id: 'medium', value: 'Un peu', isCorrect: false },
    { id: 'good', value: 'Bien', isCorrect: true },
    { id: 'easy', value: 'Parfait', isCorrect: true }
  ],

  correctAnswer: 'good',  // Anything >= 'good' is acceptable
  difficulty: 2,
  estimatedTime: 10
}
```

## Category Reference

```typescript
type TechniqueCategory =
  | 'positions'      // Kamae, stances (seiza, hanmi, shizentai)
  | 'movements'      // Tai sabaki (irimi, tenkan, tenshin)
  | 'techniques'     // Waza (ikkyo, nikyo, kote gaeshi, etc.)
  | 'weapons'        // Buki waza (bokken, jo, tanto)
  | 'falls'          // Ukemi (mae, ushiro, yoko)
  | 'principles'     // Philosophy (ki, kokyu, ma-ai)
  | 'etiquette'      // Dojo rules (rei, sensei, tatami)
```

## Belt Levels

```typescript
type BeltLevel =
  | 'white_5'   // 5th kyu - Fundamentals
  | 'white_4'   // 4th kyu - Basic techniques
  | 'white_3'   // 3rd kyu - Intermediate
  | 'white_2'   // 2nd kyu - Advanced basics
  | 'white_1'   // 1st kyu - Pre-black belt
  | 'black_1'   // 1st dan - First mastery
  | 'black_2'   // 2nd dan
  | 'black_3'   // 3rd dan
  | 'black_4'   // 4th dan
```

## Complete Unit Template

```typescript
/**
 * Unit [Number]: [Title]
 * Belt: [Belt Level]
 * Category: [Category]
 */

import type { LearningUnit, TerminologyItem, Exercise } from '@/types';

// Terminology for this unit
const terminology: TerminologyItem[] = [
  {
    id: 'term1',
    // ... complete term definition
  },
  {
    id: 'term2',
    // ... complete term definition
  },
  // 5-15 terms total
];

// Exercise generator
function generateExercises(): Exercise[] {
  const exercises: Exercise[] = [];

  // Mix exercise types:
  // - 30% term_to_icon
  // - 30% icon_to_term
  // - 20% free_recall
  // - 10% safety_quiz (if safety-critical)
  // - 10% variety

  // Example exercises
  exercises.push({
    id: 'unit_ex1',
    type: 'term_to_icon',
    // ... exercise definition
  });

  // Add 8-12 exercises total

  return exercises;
}

// Complete unit export
export const learningUnit: LearningUnit = {
  id: 'white5_unit1',
  title: 'Étiquette du dojo',
  description: 'Apprenez les bases du respect et de la conduite dans un dojo d\'aïkido',

  beltLevel: 'white_5',
  category: 'etiquette',

  terminology,
  exercises: generateExercises(),

  targetScore: 80,           // Minimum % to pass
  estimatedTime: 15,         // Estimated minutes

  prerequisites: [],         // Required unit IDs (empty for first unit)
  isSafetyCritical: false   // Set true if safety quiz required
};
```

## Example: Complete First Unit Data

```typescript
/**
 * Unit 1: Dojo Etiquette
 * Belt: 5th Kyu (White Belt)
 * Category: Etiquette
 */

import type { LearningUnit, TerminologyItem, Exercise } from '@/types';

const terminology: TerminologyItem[] = [
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
          color: '#1976d2',
          size: 30
        },
        {
          type: 'arrow',
          direction: 'down',
          position: { x: 50, y: 30 },
          color: '#c62828',
          size: 15
        }
      ]
    },
    iconCaption: 'Salut respectueux',
    category: 'etiquette',
    beltLevel: 'white_5',
    description: 'Le salut (rei) est une marque de respect fondamentale en aïkido. Il se fait au début et à la fin de chaque cours, ainsi qu\'avant et après chaque exercice avec un partenaire.',
    difficulty: 1,
    keywords: ['salut', 'respect', 'bow', 'greeting', 'étiquette'],
    relatedTerms: ['seiza', 'sensei', 'dojo']
  },

  {
    id: 'seiza',
    japanese: '正座',
    romaji: 'sei-za',
    french: 'Position assise formelle',
    english: 'Formal sitting position',
    iconType: 'emoji',
    iconData: {
      type: 'emoji',
      emoji: '🧎'
    },
    iconCaption: 'Assis sur les talons',
    category: 'positions',
    beltLevel: 'white_5',
    description: 'Seiza est la position assise traditionnelle japonaise. On s\'assoit sur les talons, genoux au sol, dos droit. Cette position est utilisée pour le salut formel (za rei) et la méditation.',
    difficulty: 1,
    keywords: ['assis', 'sitting', 'formal', 'position', 'seiza'],
    relatedTerms: ['rei', 'tatami', 'za_rei']
  },

  {
    id: 'sensei',
    japanese: '先生',
    romaji: 'sen-sei',
    french: 'Professeur',
    english: 'Teacher',
    iconType: 'emoji',
    iconData: {
      type: 'emoji',
      emoji: '👨‍🏫'
    },
    iconCaption: 'Instructeur/professeur',
    category: 'etiquette',
    beltLevel: 'white_5',
    description: 'Sensei signifie "celui qui est né avant" ou professeur. C\'est le titre respectueux donné à l\'instructeur d\'aïkido.',
    difficulty: 1,
    keywords: ['teacher', 'instructor', 'professor', 'sensei'],
    relatedTerms: ['rei', 'dojo']
  },

  {
    id: 'dojo',
    japanese: '道場',
    romaji: 'do-jo',
    french: 'Lieu d\'entraînement',
    english: 'Training hall',
    iconType: 'emoji',
    iconData: {
      type: 'emoji',
      emoji: '🏯'
    },
    iconCaption: 'Lieu de pratique',
    category: 'etiquette',
    beltLevel: 'white_5',
    description: 'Le dojo est le lieu où l\'on pratique l\'aïkido. Littéralement "lieu de la voie", c\'est un espace respecté et sacré où l\'on apprend.',
    difficulty: 1,
    keywords: ['dojo', 'training hall', 'lieu', 'practice'],
    relatedTerms: ['tatami', 'sensei', 'rei']
  },

  {
    id: 'tatami',
    japanese: '畳',
    romaji: 'ta-ta-mi',
    french: 'Tapis d\'entraînement',
    english: 'Training mat',
    iconType: 'emoji',
    iconData: {
      type: 'emoji',
      emoji: '🟩'
    },
    iconCaption: 'Surface de pratique',
    category: 'etiquette',
    beltLevel: 'white_5',
    description: 'Le tatami est le tapis sur lequel on pratique l\'aïkido. On ne marche jamais dessus avec des chaussures et on le salue en montant et descendant.',
    difficulty: 1,
    keywords: ['mat', 'tapis', 'floor', 'surface'],
    relatedTerms: ['dojo', 'rei']
  },

  // Add 5-10 more terms for complete unit
];

function generateUnit1Exercises(): Exercise[] {
  const exercises: Exercise[] = [];

  // Exercise 1: Term to Icon - rei
  exercises.push({
    id: 'unit1_ex1',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Rei" (salut) ?',
    terminologyItem: terminology[0],
    options: [
      {
        id: 'opt1',
        value: 'Salut respectueux',
        iconData: terminology[0].iconData,
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Position assise',
        iconData: terminology[1].iconData,
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Professeur',
        iconData: terminology[2].iconData,
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Dojo',
        iconData: terminology[3].iconData,
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    hint: 'Marque de respect au début et à la fin de la pratique',
    difficulty: 1,
    estimatedTime: 15
  });

  // Exercise 2: Icon to Term - seiza
  exercises.push({
    id: 'unit1_ex2',
    type: 'icon_to_term',
    question: 'Quel est ce terme ?',
    terminologyItem: terminology[1],
    options: [
      { id: 'opt1', value: 'Rei', isCorrect: false },
      { id: 'opt2', value: 'Seiza', isCorrect: true },
      { id: 'opt3', value: 'Tatami', isCorrect: false },
      { id: 'opt4', value: 'Kamae', isCorrect: false }
    ],
    correctAnswer: 'opt2',
    hint: 'Position assise sur les talons',
    difficulty: 1,
    estimatedTime: 15
  });

  // Add 8-10 more exercises...

  return exercises;
}

export const learningUnit1: LearningUnit = {
  id: 'white5_unit1',
  title: 'Étiquette du dojo',
  description: 'Apprenez les bases du respect et de la conduite dans un dojo d\'aïkido',
  beltLevel: 'white_5',
  category: 'etiquette',
  terminology,
  exercises: generateUnit1Exercises(),
  targetScore: 80,
  estimatedTime: 15,
  prerequisites: [],
  isSafetyCritical: false
};
```

## Content Creation Checklist

For each unit:
- [ ] 8-15 terminology items defined
- [ ] All terms have unique IDs
- [ ] All terms have icons (emoji or composite)
- [ ] All terms have clear captions
- [ ] All terms have descriptions
- [ ] Related terms linked
- [ ] 10-12 exercises created
- [ ] Exercise types varied (mix of 4 types for MVP)
- [ ] At least 1 safety quiz if safety-critical
- [ ] Difficulty progression (start easy, end harder)
- [ ] Estimated times realistic
- [ ] All exercises reference valid terminology items

## Validation

Before committing unit data:

1. **Type Check**: Run `npm run build` to verify TypeScript types
2. **Test in Browser**: Load unit in development mode
3. **Icon Check**: Verify all icons display correctly
4. **Exercise Flow**: Complete full unit to test flow
5. **Difficulty**: Ensure progression feels natural
6. **Translations**: Verify French/English accuracy with native speakers
7. **Japanese**: Verify romanization and characters with sensei

---

Use these templates to create consistent, high-quality curriculum content for Aikido Lingo.
