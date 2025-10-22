# Aikido Lingo - Implementation Guide

This guide provides step-by-step instructions, code templates, and best practices for implementing the Aikido Lingo application.

## Quick Start

### 1. Initial Setup (30 minutes)

```bash
# Create React app with TypeScript
npx create-react-app aikido-lingo --template typescript
cd aikido-lingo

# Install dependencies
npm install @mui/material @emotion/react @emotion/styled
npm install react-router-dom@7.9.2
npm install @mui/icons-material

# Install dev dependencies
npm install --save-dev @types/react-router-dom
npm install --save-dev prettier eslint-config-prettier

# Initialize git
git init
git add .
git commit -m "Initial commit: Create React App with TypeScript"
```

### 2. Configure TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"],
      "@/components/*": ["components/*"],
      "@/types/*": ["types/*"],
      "@/services/*": ["services/*"],
      "@/utils/*": ["utils/*"],
      "@/data/*": ["data/*"],
      "@/hooks/*": ["hooks/*"],
      "@/contexts/*": ["contexts/*"],
      "@/pages/*": ["pages/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

### 3. Configure ESLint (.eslintrc.js)

```javascript
module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
```

### 4. Configure Prettier (.prettierrc)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "avoid"
}
```

## Implementation Roadmap

### Week 1: Type System & Utilities

#### Day 1: Core Types

**File: `src/types/AikidoTypes.ts`**

See ARCHITECTURE.md section 4.2 for complete type definitions. Key points:

- Define all domain types first
- Use strict TypeScript (no `any`)
- Export types, not interfaces when using unions
- Document complex types with JSDoc

**File: `src/types/ExerciseTypes.ts`**

Exercise types must support all 8 exercise formats. See ARCHITECTURE.md for details.

**File: `src/types/ProgressTypes.ts`**

Critical for localStorage persistence structure.

#### Day 2-3: Constants & Utilities

**File: `src/utils/constants.ts`**

```typescript
/**
 * Application-wide constants
 */

import type { BeltLevel } from '@/types';

// Storage keys
export const STORAGE_KEYS = {
  PROGRESS: 'aikido-lingo-progress',
  SETTINGS: 'aikido-lingo-settings',
  CACHE: 'aikido-lingo-cache',
} as const;

// Game mechanics
export const MAX_HEARTS = 5;
export const MIN_PASSING_SCORE = 80;
export const BASE_XP_PER_UNIT = 100;
export const XP_BONUS_HIGH_SCORE = 50;  // Score >= 90%
export const XP_BONUS_PERFECT = 25;     // Score = 100%
export const XP_BONUS_FAST = 25;        // Avg time < 15s

// Spaced repetition intervals (days)
export const LEITNER_INTERVALS = {
  1: 1,
  2: 3,
  3: 7,
  4: 14,
  5: 30,
} as const;

// Belt colors for UI
export const BELT_COLORS: Record<BeltLevel, string> = {
  white_5: '#ffffff',
  white_4: '#ffffff',
  white_3: '#fdd835',
  white_2: '#fdd835',
  white_1: '#fb8c00',
  black_1: '#212121',
  black_2: '#212121',
  black_3: '#212121',
  black_4: '#212121',
};

// Belt display names
export const BELT_NAMES: Record<BeltLevel, string> = {
  white_5: '5th Kyu - White Belt',
  white_4: '4th Kyu - White Belt',
  white_3: '3rd Kyu - Yellow Belt',
  white_2: '2nd Kyu - Yellow Belt',
  white_1: '1st Kyu - Orange Belt',
  black_1: '1st Dan - Black Belt',
  black_2: '2nd Dan - Black Belt',
  black_3: '3rd Dan - Black Belt',
  black_4: '4th Dan - Black Belt',
};

// Icon sizes in pixels
export const ICON_SIZES = {
  small: 48,
  medium: 96,
  large: 144,
} as const;

// Exercise time estimates (seconds)
export const EXERCISE_TIME_ESTIMATES = {
  icon_matching: 30,
  term_to_icon: 15,
  icon_to_term: 15,
  video_observation: 45,
  position_identification: 20,
  safety_quiz: 20,
  sequence_ordering: 30,
  free_recall: 10,
} as const;
```

**File: `src/utils/localStorage.ts`**

See ARCHITECTURE.md section 11.2 for complete implementation.

Key functions:
- `saveProgress(progress: UserProgress): void`
- `loadProgress(): UserProgress | null`
- `clearAllData(): void`
- `exportData(): string`
- `importData(jsonString: string): boolean`

#### Day 4-5: Services Layer

**File: `src/services/progressTracking.ts`**

```typescript
/**
 * Progress tracking service
 * Handles progress calculations, XP gains, and statistics
 */

import type {
  UserProgress,
  ExerciseResult,
  PracticeSession,
  TechniqueCategory,
} from '@/types';
import {
  BASE_XP_PER_UNIT,
  XP_BONUS_HIGH_SCORE,
  XP_BONUS_PERFECT,
  XP_BONUS_FAST,
} from '@/utils/constants';

/**
 * Initialize new user progress
 */
export function initializeProgress(): UserProgress {
  return {
    currentBeltLevel: 'white_5',
    completedUnits: [],
    unlockedUnits: ['white5_unit1'], // First unit always unlocked
    stats: {
      totalXp: 0,
      totalMinutes: 0,
      unitsCompleted: 0,
      accuracy: 0,
      streak: 0,
      categoryProgress: {
        positions: { termsLearned: 0, accuracy: 0 },
        movements: { termsLearned: 0, accuracy: 0 },
        techniques: { termsLearned: 0, accuracy: 0 },
        weapons: { termsLearned: 0, accuracy: 0 },
        falls: { termsLearned: 0, accuracy: 0 },
        principles: { termsLearned: 0, accuracy: 0 },
        etiquette: { termsLearned: 0, accuracy: 0 },
      },
    },
    practiceLog: [],
    spacedRepetitionData: { boxes: {} },
    safetyChecklist: {},
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Calculate XP gained from unit completion
 */
export function calculateXpGain(score: number, results: ExerciseResult[]): number {
  let xp = BASE_XP_PER_UNIT;

  // Bonus for high score
  if (score >= 90) {
    xp += XP_BONUS_HIGH_SCORE;
  }
  if (score === 100) {
    xp += XP_BONUS_PERFECT;
  }

  // Bonus for speed (average < 15s per exercise)
  const avgTime = results.reduce((sum, r) => sum + r.timeSpent, 0) / results.length;
  if (avgTime < 15000) {
    xp += XP_BONUS_FAST;
  }

  return xp;
}

/**
 * Calculate accuracy percentage from results
 */
export function calculateAccuracy(results: ExerciseResult[]): number {
  if (results.length === 0) return 0;
  const correct = results.filter(r => r.isCorrect).length;
  return Math.round((correct / results.length) * 100);
}

/**
 * Update or continue streak
 */
export function updateStreak(progress: UserProgress): number {
  const today = new Date().toISOString().split('T')[0];
  const lastSession = progress.practiceLog[progress.practiceLog.length - 1];

  if (!lastSession) return 1;

  const lastDate = new Date(lastSession.date).toISOString().split('T')[0];
  const daysDiff = Math.floor(
    (new Date(today).getTime() - new Date(lastDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysDiff === 0) return progress.stats.streak; // Same day
  if (daysDiff === 1) return progress.stats.streak + 1; // Next day
  return 1; // Streak broken, restart
}

/**
 * Create practice session record
 */
export function createPracticeSession(
  unitId: string,
  duration: number,
  score: number,
  exercisesCompleted: number,
  termsReviewed: string[]
): PracticeSession {
  return {
    date: new Date().toISOString(),
    unitId,
    duration: Math.round(duration / 60000), // Convert ms to minutes
    exercisesCompleted,
    score: Math.round(score),
    termsReviewed,
  };
}

/**
 * Update category progress
 */
export function updateCategoryProgress(
  progress: UserProgress,
  category: TechniqueCategory,
  termsCount: number,
  accuracy: number
): UserProgress {
  const categoryStats = progress.stats.categoryProgress[category];

  return {
    ...progress,
    stats: {
      ...progress.stats,
      categoryProgress: {
        ...progress.stats.categoryProgress,
        [category]: {
          termsLearned: categoryStats.termsLearned + termsCount,
          accuracy: Math.round(
            (categoryStats.accuracy * categoryStats.termsLearned + accuracy * termsCount) /
              (categoryStats.termsLearned + termsCount)
          ),
        },
      },
    },
  };
}

/**
 * Calculate overall accuracy from all practice sessions
 */
export function calculateOverallAccuracy(sessions: PracticeSession[]): number {
  if (sessions.length === 0) return 0;

  const totalScore = sessions.reduce((sum, s) => sum + s.score, 0);
  return Math.round(totalScore / sessions.length);
}
```

**File: `src/services/spacedRepetition.ts`**

See ARCHITECTURE.md section 9.2 for complete implementation of Leitner algorithm.

**File: `src/services/unlockSystem.ts`**

See ARCHITECTURE.md section 9.3 for unlock logic implementation.

### Week 2: Theme & Component Foundation

#### Day 6: Theme Configuration

**File: `src/theme.ts`**

See ARCHITECTURE.md section 12.1 for complete theme configuration.

This sets up:
- Aikido-inspired color palette (red primary, navy secondary)
- Typography with Japanese font support
- Responsive breakpoints
- Component style overrides

#### Day 7-9: Common Components

**File: `src/components/common/ProgressBar.tsx`**

```typescript
/**
 * ProgressBar component
 * Displays progress toward completion (used in exercises and units)
 */

import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

interface ProgressBarProps {
  /** Current progress value */
  current: number;
  /** Total/max value */
  total: number;
  /** Display format */
  variant?: 'detailed' | 'simple';
  /** Custom label */
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  variant = 'detailed',
  label,
}) => {
  const percentage = Math.round((current / total) * 100);

  if (variant === 'simple') {
    return (
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{ height: 8, borderRadius: 4 }}
      />
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          {label || 'Progress'}
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          {current}/{total} ({percentage}%)
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{ height: 8, borderRadius: 4 }}
      />
    </Box>
  );
};
```

**File: `src/components/common/HeartDisplay.tsx`**

```typescript
/**
 * HeartDisplay component
 * Shows remaining lives/hearts during exercises
 */

import React from 'react';
import { Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { MAX_HEARTS } from '@/utils/constants';

interface HeartDisplayProps {
  /** Number of hearts remaining (0-5) */
  hearts: number;
  /** Size of hearts */
  size?: 'small' | 'medium' | 'large';
}

const sizeMap = {
  small: 20,
  medium: 28,
  large: 36,
};

export const HeartDisplay: React.FC<HeartDisplayProps> = ({ hearts, size = 'medium' }) => {
  const iconSize = sizeMap[size];

  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {Array.from({ length: MAX_HEARTS }).map((_, index) => {
        const filled = index < hearts;

        return filled ? (
          <FavoriteIcon
            key={index}
            sx={{ fontSize: iconSize, color: 'error.main' }}
          />
        ) : (
          <FavoriteBorderIcon
            key={index}
            sx={{ fontSize: iconSize, color: 'action.disabled' }}
          />
        );
      })}
    </Box>
  );
};
```

**File: `src/components/common/StatCard.tsx`**

```typescript
/**
 * StatCard component
 * Displays a single statistic value with icon
 */

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface StatCardProps {
  /** Statistic label */
  label: string;
  /** Statistic value */
  value: string | number;
  /** Icon to display */
  icon: React.ReactNode;
  /** Accent color */
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  color = 'primary.main',
}) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ color, mr: 1 }}>{icon}</Box>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </Box>
        <Typography variant="h4" fontWeight={700}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};
```

### Week 3-4: Icon System & Exercise Components

#### Day 10-12: Icon Rendering System

See ARCHITECTURE.md section 8 for complete icon system implementation:

- `src/components/icons/IconRenderer.tsx` - Main factory
- `src/components/icons/EmojiIcon.tsx` - Simple emoji rendering
- `src/components/icons/SvgIcon.tsx` - SVG file rendering
- `src/components/icons/CompositeIcon.tsx` - Complex composite icons

#### Day 13-18: Priority Exercise Components

**File: `src/components/exercises/TermToIconExercise.tsx`**

See ARCHITECTURE.md section 7.4 for complete implementation.

This is the most important exercise type for MVP. Key features:
- Display Japanese term prominently
- Show 4 icon options in a grid
- Handle selection and submission
- Track time and hints used
- Return `ExerciseResult` on completion

**Similar pattern for**:
- `IconToTermExercise.tsx` - Show icon, choose term
- `SafetyQuizExercise.tsx` - Text-based MCQ
- `FreeRecallExercise.tsx` - Flashcard with self-assessment

### Week 4: Learning Flow

#### Day 19-22: Learning Components

**File: `src/components/learning/ExerciseRenderer.tsx`**

```typescript
/**
 * ExerciseRenderer component
 * Dynamically renders the appropriate exercise component based on type
 */

import React from 'react';
import type { Exercise, ExerciseResult } from '@/types';

import { TermToIconExercise } from '@/components/exercises/TermToIconExercise';
import { IconToTermExercise } from '@/components/exercises/IconToTermExercise';
import { SafetyQuizExercise } from '@/components/exercises/SafetyQuizExercise';
import { FreeRecallExercise } from '@/components/exercises/FreeRecallExercise';
// Import other exercise types as implemented

interface ExerciseRendererProps {
  exercise: Exercise;
  onComplete: (result: ExerciseResult) => void;
}

export const ExerciseRenderer: React.FC<ExerciseRendererProps> = ({
  exercise,
  onComplete,
}) => {
  // Map exercise types to components
  const exerciseComponents = {
    term_to_icon: TermToIconExercise,
    icon_to_term: IconToTermExercise,
    safety_quiz: SafetyQuizExercise,
    free_recall: FreeRecallExercise,
    // Add other types as implemented
  };

  const ExerciseComponent = exerciseComponents[exercise.type];

  if (!ExerciseComponent) {
    console.error(`Unknown exercise type: ${exercise.type}`);
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">
          Exercise type "{exercise.type}" not implemented
        </Typography>
      </Box>
    );
  }

  return (
    <ExerciseComponent
      exercise={exercise}
      onComplete={onComplete}
    />
  );
};
```

**File: `src/components/learning/LearningUnit.tsx`**

See ARCHITECTURE.md section 7.2 for complete implementation.

This is the main orchestrator component that:
1. Loads unit data
2. Initializes session in UnitSessionContext
3. Renders current exercise
4. Updates progress on completion
5. Shows completion screen when done

### Week 5-6: Data & Pages

#### Day 23-26: Content Creation

**File: `src/data/icons/stancesIcons.ts`**

```typescript
/**
 * Stance/position icon definitions
 */

import type { IconData } from '@/types';

export const stancesIcons: Record<string, IconData> = {
  seiza: {
    type: 'emoji',
    emoji: '🧎',
  },

  hanmi: {
    type: 'composite',
    elements: [
      {
        type: 'shape',
        shape: 'person',
        position: { x: 50, y: 40 },
        color: '#1976d2',
        size: 30,
      },
      {
        type: 'shape',
        shape: 'triangle',
        position: { x: 50, y: 75 },
        color: '#ffa726',
        size: 25,
      },
    ],
  },

  shizentai: {
    type: 'composite',
    elements: [
      {
        type: 'shape',
        shape: 'person',
        position: { x: 50, y: 50 },
        color: '#1976d2',
        size: 30,
      },
    ],
  },

  kamae: {
    type: 'composite',
    elements: [
      {
        type: 'shape',
        shape: 'person',
        position: { x: 50, y: 50 },
        color: '#1976d2',
        size: 30,
      },
      {
        type: 'line',
        position: { x: 30, y: 50 },
        direction: 'right',
        color: '#c62828',
        size: 15,
        strokeWidth: 3,
      },
    ],
  },
};
```

**File: `src/data/belts/white5Data.ts`**

```typescript
/**
 * 5th Kyu (White Belt) curriculum data
 * Units 1-4: Fundamentals
 */

import type { LearningUnit, TerminologyItem, Exercise } from '@/types';
import { stancesIcons } from '@/data/icons/stancesIcons';
import { etiquetteIcons } from '@/data/icons/etiquetteIcons';

/** Unit 1: Dojo Etiquette */
const unit1Terminology: TerminologyItem[] = [
  {
    id: 'rei',
    japanese: '礼',
    romaji: 'rei',
    french: 'Salut',
    english: 'Bow',
    iconType: 'composite',
    iconData: etiquetteIcons.rei,
    iconCaption: 'Salut respectueux',
    category: 'etiquette',
    beltLevel: 'white_5',
    description: 'Salut formel marquant respect et humilité dans le dojo.',
    difficulty: 1,
    keywords: ['salut', 'respect', 'bow', 'greeting'],
    relatedTerms: ['seiza', 'sensei'],
  },

  {
    id: 'seiza',
    japanese: '正座',
    romaji: 'sei-za',
    french: 'Position assise formelle',
    english: 'Formal sitting',
    iconType: 'emoji',
    iconData: stancesIcons.seiza,
    iconCaption: 'Assis sur les talons',
    category: 'positions',
    beltLevel: 'white_5',
    description: 'Position assise traditionnelle japonaise, genoux au sol, dos droit.',
    difficulty: 1,
    keywords: ['sitting', 'assis', 'position', 'formal'],
    relatedTerms: ['rei', 'tatami'],
  },

  // Add 8-10 more terms for complete unit
];

function generateUnit1Exercises(): Exercise[] {
  const exercises: Exercise[] = [];

  // Exercise 1: Term to Icon - rei
  exercises.push({
    id: 'unit1_ex1_rei',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Rei" (salut) ?',
    terminologyItem: unit1Terminology[0],
    options: [
      {
        id: 'opt1',
        value: 'Salut respectueux',
        iconData: etiquetteIcons.rei,
        isCorrect: true,
      },
      {
        id: 'opt2',
        value: 'Position assise',
        iconData: stancesIcons.seiza,
        isCorrect: false,
      },
      {
        id: 'opt3',
        value: 'Position debout',
        iconData: stancesIcons.shizentai,
        isCorrect: false,
      },
      {
        id: 'opt4',
        value: 'Position de garde',
        iconData: stancesIcons.kamae,
        isCorrect: false,
      },
    ],
    correctAnswer: 'opt1',
    hint: 'Marque de respect au début et à la fin de chaque pratique',
    difficulty: 1,
    estimatedTime: 15,
  });

  // Add 9-11 more exercises with variety

  return exercises;
}

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
  isSafetyCritical: false,
};

// Export all white5 units
export const white5Units = [
  learningUnit1,
  // Add unit 2, 3, etc.
];
```

**File: `src/data/curriculum.ts`**

```typescript
/**
 * Complete curriculum structure
 */

import type { Curriculum } from '@/types';
import { white5Units } from './belts/white5Data';
import { BELT_COLORS, BELT_NAMES } from '@/utils/constants';

export const curriculum: Curriculum = {
  belts: [
    {
      id: 'white_5',
      level: 'white_5',
      name: BELT_NAMES.white_5,
      description: 'Fondamentaux de l\'aïkido: étiquette, positions de base et premiers mouvements',
      units: white5Units,
      color: BELT_COLORS.white_5,
      unlockCondition: {
        type: 'always_unlocked',
      },
    },
    // Add other belts as content is created
  ],
};
```

#### Day 27-30: Pages & Routing

**File: `src/pages/HomePage.tsx`**

```typescript
/**
 * HomePage
 * Main landing page with navigation menu
 */

import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { NavigationMenu } from '@/components/navigation/NavigationMenu';
import { useProgress } from '@/contexts/ProgressContext';
import { ProgressBar } from '@/components/common/ProgressBar';

export const HomePage: React.FC = () => {
  const { progress } = useProgress();

  const completedCount = progress.completedUnits.length;
  const totalUnits = progress.unlockedUnits.length;

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" gutterBottom>
            🥋 Aikido Lingo
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Maîtrisez la terminologie d'aïkido
          </Typography>
        </Box>

        {/* Progress Summary */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Votre progression
          </Typography>
          <ProgressBar
            current={completedCount}
            total={totalUnits}
            label="Unités complétées"
          />
        </Box>

        {/* Navigation Menu */}
        <NavigationMenu />

        {/* Quick Stats */}
        <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Total XP: {progress.stats.totalXp} |
            Précision: {progress.stats.accuracy}% |
            Série: {progress.stats.streak} jours
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
```

**File: `src/App.tsx`**

```typescript
/**
 * App root component
 * Sets up routing, theme, and context providers
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';

import { theme } from './theme';
import { ProgressProvider } from './contexts/ProgressContext';
import { UnitSessionProvider } from './contexts/UnitSessionContext';

import { HomePage } from './pages/HomePage';
import { LearningPage } from './pages/LearningPage';
import { LearningUnit } from './components/learning/LearningUnit';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProgressProvider>
        <UnitSessionProvider>
          <BrowserRouter>
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/learning" element={<LearningPage />} />
                <Route path="/learning/:unitId" element={<LearningUnit />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Box>
          </BrowserRouter>
        </UnitSessionProvider>
      </ProgressProvider>
    </ThemeProvider>
  );
};
```

## Testing Checklist

### Unit Tests to Write

For each service:
```typescript
// src/services/progressTracking.test.ts
describe('Progress Tracking Service', () => {
  it('initializes progress with correct defaults', () => {
    const progress = initializeProgress();
    expect(progress.currentBeltLevel).toBe('white_5');
    expect(progress.unlockedUnits).toContain('white5_unit1');
  });

  it('calculates XP correctly for perfect score', () => {
    const xp = calculateXpGain(100, mockResults);
    expect(xp).toBe(175); // Base + high score + perfect
  });
});
```

For each component:
```typescript
// src/components/common/ProgressBar.test.tsx
describe('ProgressBar', () => {
  it('displays correct percentage', () => {
    render(<ProgressBar current={7} total={10} />);
    expect(screen.getByText('70%')).toBeInTheDocument();
  });
});
```

## Deployment

### Netlify Deployment

1. Connect GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
3. Add `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Common Pitfalls & Solutions

### 1. Type Errors
**Problem**: TypeScript errors with Material-UI
**Solution**: Ensure `@emotion/react` and `@emotion/styled` are installed

### 2. Import Path Issues
**Problem**: `@/` paths not resolving
**Solution**: Check `tsconfig.json` baseUrl and paths configuration

### 3. Context Not Found
**Problem**: "useProgress must be used within ProgressProvider"
**Solution**: Ensure App.tsx wraps all routes with context providers

### 4. localStorage Not Persisting
**Problem**: Progress not saved between sessions
**Solution**: Check browser DevTools → Application → Local Storage

### 5. Exercise Not Rendering
**Problem**: Blank screen when loading exercise
**Solution**: Verify exercise type is mapped in ExerciseRenderer

## Next Steps After MVP

1. Add remaining 4 exercise types
2. Implement review mode with spaced repetition
3. Create library page with filtering
4. Build dashboard with statistics charts
5. Add PWA support for offline use
6. Create units 4-10 for full curriculum

---

This guide provides everything needed to start implementing Aikido Lingo. Follow the week-by-week structure, use the provided code templates, and refer to ARCHITECTURE.md for detailed specifications.
