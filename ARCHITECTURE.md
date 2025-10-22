# Aikido Lingo - Technical Architecture Documentation

**Version:** 1.0
**Last Updated:** October 21, 2025
**Status:** Production-Ready Architecture

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Technology Stack & Decisions](#2-technology-stack--decisions)
3. [Project Structure](#3-project-structure)
4. [Type System Architecture](#4-type-system-architecture)
5. [Component Architecture](#5-component-architecture)
6. [State Management Strategy](#6-state-management-strategy)
7. [Data Flow & Exercise Orchestration](#7-data-flow--exercise-orchestration)
8. [Icon Rendering System](#8-icon-rendering-system)
9. [Progress Tracking & Spaced Repetition](#9-progress-tracking--spaced-repetition)
10. [Routing Strategy](#10-routing-strategy)
11. [Storage Architecture](#11-storage-architecture)
12. [Theme & Styling](#12-theme--styling)
13. [Development Phases](#13-development-phases)
14. [Implementation Guidelines](#14-implementation-guidelines)
15. [Performance & Optimization](#15-performance--optimization)
16. [Testing Strategy](#16-testing-strategy)
17. [Deployment & CI/CD](#17-deployment--cicd)

---

## 1. Architecture Overview

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Interface                          │
│                    (React 18 + Material-UI 7)                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Learning   │  │   Review     │  │   Library    │         │
│  │   Mode       │  │   Mode       │  │   Mode       │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                      Component Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Exercise    │  │  Progress    │  │  Icon        │         │
│  │  Components  │  │  Tracker     │  │  Renderer    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                      Service Layer                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Progress    │  │  Spaced      │  │  Exercise    │         │
│  │  Service     │  │  Repetition  │  │  Generator   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                      Data Layer                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Curriculum  │  │  Icons       │  │  User        │         │
│  │  Data        │  │  Data        │  │  Progress    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                   Persistence Layer                             │
│            localStorage (Phase 1) → API (Phase 2)               │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Key Architectural Principles

1. **Component Isolation**: Each component is self-contained with clear props interface
2. **Single Responsibility**: Each service/component handles one concern
3. **Type Safety**: Full TypeScript coverage with strict mode
4. **Immutability**: State updates use immutable patterns
5. **Progressive Enhancement**: Core features work offline, enhanced with online features
6. **Mobile-First**: Responsive design from smallest to largest screens
7. **Accessibility**: WCAG 2.1 AA compliance throughout
8. **Performance**: Code splitting, lazy loading, optimized bundles

### 1.3 Data Flow Pattern

```
User Action
    ↓
Event Handler (Component)
    ↓
Service Method (Business Logic)
    ↓
State Update (Context/Local State)
    ↓
Re-render (React)
    ↓
Persistence (localStorage)
```

---

## 2. Technology Stack & Decisions

### 2.1 Core Technologies

| Technology | Version | Decision Rationale |
|------------|---------|-------------------|
| **React** | 18.2.0 | Industry standard, hooks API, concurrent features |
| **TypeScript** | 4.9.5+ | Type safety, better IDE support, reduced runtime errors |
| **Material-UI** | 7.3.2 | Comprehensive component library, accessibility built-in |
| **Emotion** | 11.14.0 | CSS-in-JS, theme integration, type-safe styling |
| **React Router** | 7.9.2 | Declarative routing, nested routes, data loading |
| **Create React App** | 5.0.1 | Zero-config setup, production optimization |

### 2.2 Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Code quality, consistent style |
| **Prettier** | Code formatting |
| **Jest** | Unit testing framework |
| **React Testing Library** | Component testing |
| **Cypress/Playwright** | E2E testing (Phase 2) |
| **Lighthouse** | Performance auditing |

### 2.3 Architecture Decisions

#### ADR-001: Local State vs Context

**Decision**: Use local component state for UI state, Context for shared application state

**Rationale**:
- Avoids prop drilling for deeply nested components
- Keeps component state isolated when possible
- Performance optimized (less re-renders)

**Implementation**:
- `ProgressContext`: User progress, completed units, stats
- `UnitSessionContext`: Current exercise session state
- Local state: Form inputs, UI toggles, animations

#### ADR-002: localStorage First, API Later

**Decision**: Phase 1 uses localStorage only, Phase 2+ adds optional backend

**Rationale**:
- Faster MVP development
- Works offline by default (PWA requirement)
- No server costs initially
- Easy migration path to API

#### ADR-003: Icon System Architecture

**Decision**: Support three icon types: emoji, SVG, composite

**Rationale**:
- Emoji: Fast, no assets, unicode standard
- SVG: Custom designs, scalable, performant
- Composite: Maximum flexibility for aikido positions

**Implementation**: Icon renderer factory pattern with pluggable renderers

#### ADR-004: Exercise Generation Strategy

**Decision**: Pre-generated exercises stored with units vs runtime generation

**Phase 1**: Pre-generated (faster, predictable)
**Phase 2+**: Runtime generation with seed (infinite variation)

**Rationale**:
- Ensures quality and accuracy initially
- Allows expert validation of every exercise
- Runtime generation adds replayability later

#### ADR-005: Styling Approach

**Decision**: Material-UI `sx` prop + theme system

**Rationale**:
- Type-safe styling
- Theme integration automatic
- Responsive design utilities
- Better than CSS modules for this use case

---

## 3. Project Structure

### 3.1 Complete Directory Structure

```
aikido-lingo/
├── public/
│   ├── index.html                    # Main HTML entry
│   ├── manifest.json                 # PWA manifest
│   ├── service-worker.js             # PWA service worker
│   ├── icons/                        # App icons (PWA)
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   └── robots.txt
│
├── src/
│   ├── index.tsx                     # Application entry point
│   ├── App.tsx                       # Root component with routing
│   ├── theme.ts                      # MUI theme configuration
│   │
│   ├── types/                        # TypeScript type definitions
│   │   ├── index.ts                  # Re-export all types
│   │   ├── AikidoTypes.ts            # Core aikido domain types
│   │   ├── ExerciseTypes.ts          # Exercise-related types
│   │   ├── IconTypes.ts              # Icon system types
│   │   ├── ProgressTypes.ts          # User progress types
│   │   └── UtilityTypes.ts           # Helper/utility types
│   │
│   ├── contexts/                     # React contexts for state
│   │   ├── ProgressContext.tsx       # Global progress state
│   │   ├── UnitSessionContext.tsx    # Active exercise session
│   │   └── SettingsContext.tsx       # User settings (Phase 2)
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useProgress.ts            # Progress management hook
│   │   ├── useSpacedRepetition.ts    # Leitner algorithm hook
│   │   ├── useUnitSession.ts         # Exercise session management
│   │   ├── useLocalStorage.ts        # localStorage abstraction
│   │   └── useMediaQuery.ts          # Responsive design helper
│   │
│   ├── components/                   # React components
│   │   ├── common/                   # Shared UI components
│   │   │   ├── ProgressBar.tsx       # Progress bar component
│   │   │   ├── HeartDisplay.tsx      # Lives/hearts display
│   │   │   ├── StatCard.tsx          # Statistic card
│   │   │   ├── BeltBadge.tsx         # Belt level badge
│   │   │   ├── LoadingSpinner.tsx    # Loading state
│   │   │   └── ErrorBoundary.tsx     # Error boundary wrapper
│   │   │
│   │   ├── icons/                    # Icon rendering system
│   │   │   ├── IconRenderer.tsx      # Main icon renderer
│   │   │   ├── EmojiIcon.tsx         # Emoji icon component
│   │   │   ├── SvgIcon.tsx           # SVG icon component
│   │   │   ├── CompositeIcon.tsx     # Composite icon builder
│   │   │   └── IconCard.tsx          # Icon with caption card
│   │   │
│   │   ├── exercises/                # Exercise type components
│   │   │   ├── ExerciseContainer.tsx      # Exercise wrapper/layout
│   │   │   ├── IconMatchingExercise.tsx   # Drag-drop matching
│   │   │   ├── TermToIconExercise.tsx     # MCQ: term → icon
│   │   │   ├── IconToTermExercise.tsx     # MCQ: icon → term
│   │   │   ├── VideoObservationExercise.tsx
│   │   │   ├── PositionIdentificationExercise.tsx
│   │   │   ├── SafetyQuizExercise.tsx
│   │   │   ├── SequenceOrderingExercise.tsx
│   │   │   └── FreeRecallExercise.tsx     # Flashcard
│   │   │
│   │   ├── learning/                 # Learning mode components
│   │   │   ├── LearningUnit.tsx      # Unit orchestrator
│   │   │   ├── ExerciseRenderer.tsx  # Dynamic exercise renderer
│   │   │   ├── ExerciseResult.tsx    # Result feedback
│   │   │   ├── UnitCompletion.tsx    # Unit completion screen
│   │   │   └── HintDisplay.tsx       # Hint component
│   │   │
│   │   ├── navigation/               # Navigation components
│   │   │   ├── BeltProgressList.tsx  # Belt/unit navigation
│   │   │   ├── UnitCard.tsx          # Unit display card
│   │   │   ├── BeltSection.tsx       # Belt section component
│   │   │   └── NavigationMenu.tsx    # Main menu
│   │   │
│   │   ├── review/                   # Review mode components
│   │   │   ├── ReviewMode.tsx        # Review orchestrator
│   │   │   ├── Flashcard.tsx         # Flashcard component
│   │   │   └── ReviewSchedule.tsx    # Review schedule display
│   │   │
│   │   ├── library/                  # Library mode components
│   │   │   ├── IconLibrary.tsx       # Library main component
│   │   │   ├── LibraryFilters.tsx    # Filter controls
│   │   │   ├── TermDetail.tsx        # Term detail view
│   │   │   └── LibraryGrid.tsx       # Icon grid display
│   │   │
│   │   └── dashboard/                # Dashboard/stats components
│   │       ├── Dashboard.tsx         # Main dashboard
│   │       ├── StatsOverview.tsx     # Stats summary
│   │       ├── ProgressChart.tsx     # Progress visualization
│   │       ├── BadgeDisplay.tsx      # Achievement badges
│   │       └── StreakCounter.tsx     # Daily streak display
│   │
│   ├── pages/                        # Route page components
│   │   ├── HomePage.tsx              # Landing/menu page
│   │   ├── LearningPage.tsx          # Learning mode page
│   │   ├── ReviewPage.tsx            # Review mode page
│   │   ├── LibraryPage.tsx           # Library page
│   │   └── DashboardPage.tsx         # Dashboard/stats page
│   │
│   ├── services/                     # Business logic services
│   │   ├── progressTracking.ts       # Progress calculation/tracking
│   │   ├── spacedRepetition.ts       # Leitner algorithm
│   │   ├── exerciseGenerator.ts      # Exercise generation (Phase 2)
│   │   ├── iconRenderer.ts           # Icon rendering utilities
│   │   ├── scoringSystem.ts          # XP/scoring logic
│   │   ├── unlockSystem.ts           # Unit/belt unlock logic
│   │   └── achievementSystem.ts      # Badge/achievement logic
│   │
│   ├── utils/                        # Utility functions
│   │   ├── localStorage.ts           # localStorage wrapper
│   │   ├── dateHelpers.ts            # Date formatting/calculation
│   │   ├── arrayHelpers.ts           # Array manipulation
│   │   ├── validators.ts             # Input validation
│   │   ├── constants.ts              # App-wide constants
│   │   └── soundEffects.ts           # Sound effect helpers (Phase 2)
│   │
│   ├── data/                         # Static data
│   │   ├── curriculum.ts             # Curriculum structure
│   │   │
│   │   ├── belts/                    # Belt-specific data
│   │   │   ├── white5Data.ts         # 5th kyu units
│   │   │   ├── white4Data.ts         # 4th kyu units
│   │   │   ├── white3Data.ts         # 3rd kyu units
│   │   │   ├── white2Data.ts         # 2nd kyu units
│   │   │   ├── white1Data.ts         # 1st kyu units
│   │   │   └── black1Data.ts         # 1st dan units (Phase 2+)
│   │   │
│   │   ├── icons/                    # Icon definitions
│   │   │   ├── index.ts              # Re-export all icons
│   │   │   ├── stancesIcons.ts       # Position/stance icons
│   │   │   ├── movementsIcons.ts     # Movement icons
│   │   │   ├── techniquesIcons.ts    # Technique icons
│   │   │   ├── weaponsIcons.ts       # Weapon icons
│   │   │   ├── fallsIcons.ts         # Ukemi icons
│   │   │   └── etiquetteIcons.ts     # Etiquette icons
│   │   │
│   │   └── achievements.ts           # Achievement/badge definitions
│   │
│   └── assets/                       # Static assets
│       ├── icons/                    # SVG icon files
│       │   ├── stances/
│       │   ├── movements/
│       │   └── techniques/
│       ├── videos/                   # Demo videos (Phase 2)
│       └── sounds/                   # Sound effects (Phase 2)
│
├── tests/                            # Test files
│   ├── unit/                         # Unit tests
│   │   ├── components/
│   │   ├── services/
│   │   └── utils/
│   ├── integration/                  # Integration tests
│   └── e2e/                          # E2E tests (Cypress/Playwright)
│
├── .env.example                      # Environment variables template
├── .eslintrc.js                      # ESLint configuration
├── .prettierrc                       # Prettier configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies
├── Dockerfile                        # Docker configuration
├── docker-compose.yml                # Docker compose (Phase 2)
├── nginx.conf                        # Nginx configuration
├── README.md                         # Project documentation
├── SPECIFICATIONS.md                 # Project specifications
├── ARCHITECTURE.md                   # This file
└── CHANGELOG.md                      # Version history
```

### 3.2 File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| **Components** | PascalCase.tsx | `IconRenderer.tsx` |
| **Hooks** | camelCase.ts | `useProgress.ts` |
| **Services** | camelCase.ts | `progressTracking.ts` |
| **Utils** | camelCase.ts | `localStorage.ts` |
| **Types** | PascalCase.ts | `ExerciseTypes.ts` |
| **Data Files** | camelCase.ts | `white5Data.ts` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_HEARTS = 5` |
| **Test Files** | Same as source + `.test` | `IconRenderer.test.tsx` |

### 3.3 Import Organization

Standard import order:
```typescript
// 1. External libraries
import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'

// 2. Type imports
import type { Exercise, ExerciseResult } from '@/types'

// 3. Components
import { IconRenderer } from '@/components/icons'
import { ProgressBar } from '@/components/common'

// 4. Hooks
import { useProgress } from '@/hooks/useProgress'

// 5. Services/Utils
import { calculateScore } from '@/services/scoringSystem'
import { EXERCISE_TYPES } from '@/utils/constants'

// 6. Data
import { curriculum } from '@/data/curriculum'

// 7. Styles (if not using sx)
import styles from './Component.module.css'
```

---

## 4. Type System Architecture

### 4.1 Type Hierarchy

```
Core Domain Types (AikidoTypes.ts)
├── BeltLevel
├── TechniqueCategory
├── TerminologyItem
├── LearningUnit
├── Curriculum
└── BeltSection

Exercise Types (ExerciseTypes.ts)
├── ExerciseType
├── Exercise
├── ExerciseOption
├── TermPair
├── SequenceItem
└── ExerciseResult

Icon Types (IconTypes.ts)
├── IconType
├── IconData
├── IconElement
└── IconRendererProps

Progress Types (ProgressTypes.ts)
├── UserProgress
├── UserStats
├── UnitProgress
├── PracticeSession
├── SpacedRepetitionData
└── SpacedRepetitionBox

Utility Types (UtilityTypes.ts)
├── UnlockCondition
├── Achievement
├── ErrorState
└── LoadingState
```

### 4.2 Core Type Definitions

Complete type definitions following the specifications:

**File: `src/types/AikidoTypes.ts`**
```typescript
/**
 * Aikido Lingo - Core Domain Types
 * Defines the fundamental data structures for aikido terminology and curriculum
 */

/** Belt levels in aikido progression */
export type BeltLevel =
  | 'white_5'   // 5th kyu
  | 'white_4'   // 4th kyu
  | 'white_3'   // 3rd kyu
  | 'white_2'   // 2nd kyu
  | 'white_1'   // 1st kyu
  | 'black_1'   // 1st dan
  | 'black_2'   // 2nd dan
  | 'black_3'   // 3rd dan
  | 'black_4';  // 4th dan

/** Technique categories */
export type TechniqueCategory =
  | 'positions'    // Stances (kamae, seiza, etc.)
  | 'movements'    // Movements (tenkan, irimi, etc.)
  | 'techniques'   // Techniques (ikkyo, nikyo, etc.)
  | 'weapons'      // Weapons (bokken, jo, tanto)
  | 'falls'        // Falls (ukemi)
  | 'principles'   // Philosophical principles
  | 'etiquette';   // Dojo etiquette

/** Difficulty levels */
export type Difficulty = 1 | 2 | 3 | 4 | 5;

/** Terminology item with visual representation */
export interface TerminologyItem {
  id: string;
  japanese: string;              // Japanese term (ex: "seiza")
  romaji: string;                // Romanization (ex: "SE-i-za")
  french: string;                // French translation
  english: string;               // English translation

  // Visual representation
  iconType: 'svg' | 'emoji' | 'composite';
  iconData: IconData;
  iconCaption: string;           // Descriptive subtitle

  // Context
  category: TechniqueCategory;
  beltLevel: BeltLevel;
  description: string;

  // Optional resources
  videoUrl?: string;
  imageUrl?: string;
  audioUrl?: string;

  // Metadata
  difficulty: Difficulty;
  keywords: string[];
  relatedTerms: string[];        // IDs of related terms
}

/** Icon data structure */
export interface IconData {
  type: 'svg' | 'emoji' | 'composite';

  // For type='svg'
  svgPath?: string;
  svgContent?: string;

  // For type='emoji'
  emoji?: string;

  // For type='composite'
  elements?: IconElement[];

  // Styling
  color?: string;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
}

/** Composite icon element */
export interface IconElement {
  type: 'shape' | 'arrow' | 'line' | 'text';
  position: { x: number; y: number };

  // For shape
  shape?: 'circle' | 'square' | 'triangle' | 'person';

  // For arrow/line
  direction?: 'up' | 'down' | 'left' | 'right' | 'diagonal';
  length?: number;

  // For text
  text?: string;

  // Styling
  color?: string;
  size?: number;
  strokeWidth?: number;
}

/** Complete learning unit */
export interface LearningUnit {
  id: string;
  title: string;
  description: string;

  beltLevel: BeltLevel;
  category: TechniqueCategory;

  terminology: TerminologyItem[];
  exercises: Exercise[];

  targetScore: number;           // Minimum % to pass
  estimatedTime: number;         // Estimated minutes

  prerequisites: string[];       // Required unit IDs
  isSafetyCritical: boolean;    // Requires safety validation
}

/** Unlock condition for belts/units */
export interface UnlockCondition {
  type: 'previous_belt' | 'specific_units' | 'always_unlocked';
  requiredUnits?: string[];
  requiredScore?: number;
}

/** Belt section in curriculum */
export interface BeltSection {
  id: string;
  level: BeltLevel;
  name: string;                  // Ex: "5th Kyu - White Belt"
  description: string;
  units: LearningUnit[];
  color: string;                 // Associated belt color
  unlockCondition: UnlockCondition;
}

/** Complete curriculum */
export interface Curriculum {
  belts: BeltSection[];
}

// Type imports for other files
export type { Exercise } from './ExerciseTypes';
```

**File: `src/types/ExerciseTypes.ts`**
```typescript
/**
 * Exercise-related type definitions
 */

import type { TerminologyItem, IconData, Difficulty } from './AikidoTypes';

/** Available exercise types */
export type ExerciseType =
  | 'icon_matching'              // Match terms to icons (drag-drop)
  | 'term_to_icon'               // Given term, choose icon
  | 'icon_to_term'               // Given icon, choose term
  | 'video_observation'          // Watch video, identify technique
  | 'position_identification'    // Identify position in context
  | 'safety_quiz'                // Safety question MCQ
  | 'sequence_ordering'          // Order technique steps
  | 'free_recall';               // Flashcard recall

/** Generic exercise structure */
export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;

  // Content
  terminologyItem: TerminologyItem;

  // For MCQ exercises
  options?: ExerciseOption[];
  correctAnswer: string;         // Option ID

  // For matching exercises
  pairs?: TermPair[];

  // For sequencing exercises
  sequence?: SequenceItem[];
  correctOrder?: number[];

  // Support materials
  hint?: string;
  context?: string;
  videoUrl?: string;

  // Metadata
  difficulty: Difficulty;
  estimatedTime: number;         // Seconds
}

/** Exercise option for MCQ */
export interface ExerciseOption {
  id: string;
  value: string;
  iconData?: IconData;
  isCorrect: boolean;
}

/** Term-icon pair for matching */
export interface TermPair {
  id: string;
  term: string;
  icon: IconData;
  caption: string;
}

/** Sequence item for ordering exercises */
export interface SequenceItem {
  id: string;
  order: number;                 // Correct position
  term: string;
  icon: IconData;
  description: string;
}

/** Exercise result/answer */
export interface ExerciseResult {
  exerciseId: string;
  isCorrect: boolean;
  timeSpent: number;             // Milliseconds
  attempts: number;
  timestamp: string;             // ISO timestamp

  // Feedback
  userAnswer: string;
  correctAnswer: string;
  hintsUsed: number;
}
```

**File: `src/types/ProgressTypes.ts`**
```typescript
/**
 * User progress and tracking types
 */

import type { BeltLevel, TechniqueCategory } from './AikidoTypes';
import type { ExerciseResult } from './ExerciseTypes';

/** Global user progress */
export interface UserProgress {
  // Curriculum progress
  currentBeltLevel: BeltLevel;
  completedUnits: string[];      // Unit IDs
  unlockedUnits: string[];       // Unit IDs

  // Statistics
  stats: UserStats;

  // Practice history
  practiceLog: PracticeSession[];

  // Spaced repetition
  spacedRepetitionData: SpacedRepetitionData;

  // Safety certifications
  safetyChecklist: Record<string, boolean>;

  // Metadata
  createdAt: string;
  lastUpdated: string;
}

/** User statistics */
export interface UserStats {
  totalXp: number;
  totalMinutes: number;
  unitsCompleted: number;
  accuracy: number;              // Percentage
  streak: number;                // Consecutive days

  // By category
  categoryProgress: Record<TechniqueCategory, {
    termsLearned: number;
    accuracy: number;
  }>;
}

/** Practice session record */
export interface PracticeSession {
  date: string;                  // ISO date
  unitId: string;
  duration: number;              // Minutes
  exercisesCompleted: number;
  score: number;                 // Percentage
  termsReviewed: string[];       // Term IDs
}

/** Spaced repetition data (Leitner system) */
export interface SpacedRepetitionData {
  boxes: Record<string, SpacedRepetitionBox>;
}

/** Individual term's spaced repetition state */
export interface SpacedRepetitionBox {
  termId: string;
  box: 1 | 2 | 3 | 4 | 5;       // Box number (1=new, 5=mastered)
  lastReviewed: string;          // ISO timestamp
  nextReview: string;            // ISO timestamp
  consecutiveCorrect: number;
  totalReviews: number;
}

/** Active unit session progress */
export interface UnitProgress {
  unitId: string;
  currentExerciseIndex: number;
  completedExercises: ExerciseResult[];
  score: number;                 // Current percentage
  hearts: number;                // Lives remaining (max 5)
  isCompleted: boolean;
  startedAt: string;
  completedAt?: string;
}

/** Achievement/badge */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;                  // Emoji or icon name
  condition: {
    type: 'units_completed' | 'streak' | 'accuracy' | 'terms_mastered' | 'speed';
    value: number;
  };
  unlockedAt?: string;           // ISO timestamp when unlocked
}
```

**File: `src/types/IconTypes.ts`**
```typescript
/**
 * Icon rendering system types
 */

export type { IconData, IconElement } from './AikidoTypes';

/** Icon renderer component props */
export interface IconRendererProps {
  iconData: IconData;
  caption?: string;
  size?: 'small' | 'medium' | 'large';
  showCaption?: boolean;
  onClick?: () => void;
}

/** Size mappings in pixels */
export const ICON_SIZES = {
  small: 48,
  medium: 96,
  large: 144,
} as const;

/** Icon renderer context */
export interface IconRenderContext {
  viewBoxSize: number;
  scale: number;
  theme: any;                    // MUI theme
}
```

**File: `src/types/index.ts`**
```typescript
/**
 * Central type export file
 */

// Core domain types
export type {
  BeltLevel,
  TechniqueCategory,
  Difficulty,
  TerminologyItem,
  IconData,
  IconElement,
  LearningUnit,
  BeltSection,
  Curriculum,
  UnlockCondition,
} from './AikidoTypes';

// Exercise types
export type {
  ExerciseType,
  Exercise,
  ExerciseOption,
  TermPair,
  SequenceItem,
  ExerciseResult,
} from './ExerciseTypes';

// Progress types
export type {
  UserProgress,
  UserStats,
  PracticeSession,
  SpacedRepetitionData,
  SpacedRepetitionBox,
  UnitProgress,
  Achievement,
} from './ProgressTypes';

// Icon types
export type {
  IconRendererProps,
  IconRenderContext,
} from './IconTypes';

export { ICON_SIZES } from './IconTypes';
```

---

## 5. Component Architecture

### 5.1 Component Hierarchy

```
App
├── Router
    ├── HomePage
    │   ├── NavigationMenu
    │   ├── ProgressSummary
    │   └── QuickStats
    │
    ├── LearningPage
    │   ├── BeltProgressList
    │   │   ├── BeltSection
    │   │   │   └── UnitCard (multiple)
    │   │   └── ProgressBar
    │   │
    │   └── LearningUnit
    │       ├── HeartDisplay
    │       ├── ProgressBar
    │       ├── ExerciseRenderer
    │       │   ├── IconMatchingExercise
    │       │   ├── TermToIconExercise
    │       │   ├── IconToTermExercise
    │       │   ├── SafetyQuizExercise
    │       │   └── ... (other exercise types)
    │       └── UnitCompletion
    │           ├── StatsOverview
    │           └── BadgeDisplay
    │
    ├── ReviewPage
    │   ├── ReviewSchedule
    │   └── Flashcard
    │       └── IconRenderer
    │
    ├── LibraryPage
    │   ├── LibraryFilters
    │   └── LibraryGrid
    │       └── IconCard (multiple)
    │           └── IconRenderer
    │
    └── DashboardPage
        ├── StatsOverview
        ├── ProgressChart
        ├── BadgeDisplay
        └── StreakCounter
```

### 5.2 Component Patterns

#### Pattern 1: Container/Presenter Pattern

**Container** (Smart Component): Handles logic, state, data fetching
**Presenter** (Dumb Component): Handles display, receives data via props

Example:
```typescript
// Container: LearningUnit.tsx
export const LearningUnit: React.FC<{ unitId: string }> = ({ unitId }) => {
  const [session, setSession] = useState<UnitProgress>(/* ... */);
  const { updateProgress } = useProgress();

  const handleExerciseComplete = (result: ExerciseResult) => {
    // Business logic
  };

  return (
    <ExerciseRenderer
      exercise={currentExercise}
      onComplete={handleExerciseComplete}
    />
  );
};

// Presenter: ExerciseRenderer.tsx
export const ExerciseRenderer: React.FC<ExerciseRendererProps> = ({
  exercise,
  onComplete
}) => {
  // Pure rendering logic, no business logic
  return <div>...</div>;
};
```

#### Pattern 2: Render Props for Flexibility

```typescript
interface RenderPropsExample {
  render: (data: SomeData) => React.ReactNode;
}

export const DataProvider: React.FC<RenderPropsExample> = ({ render }) => {
  const data = useData();
  return <>{render(data)}</>;
};

// Usage
<DataProvider render={(data) => <Display data={data} />} />
```

#### Pattern 3: Compound Components

```typescript
const Card = ({ children }: { children: React.ReactNode }) => (
  <Box>{children}</Box>
);

Card.Header = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="h6">{children}</Typography>
);

Card.Body = ({ children }: { children: React.ReactNode }) => (
  <Box>{children}</Box>
);

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

### 5.3 Component Composition Guidelines

1. **Small, Focused Components**: Each component should do one thing well
2. **Props over State**: Prefer props when possible, state when necessary
3. **Composition over Inheritance**: Build complex UI by composing simple components
4. **TypeScript Props**: Always type component props with interfaces
5. **Default Props**: Use default parameters instead of defaultProps
6. **Memoization**: Use `React.memo` for expensive pure components

Example component template:
```typescript
import React from 'react';
import { Box, Typography } from '@mui/material';
import type { SomeType } from '@/types';

interface MyComponentProps {
  title: string;
  data: SomeType;
  onAction?: (id: string) => void;
  variant?: 'default' | 'compact';
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  data,
  onAction,
  variant = 'default',
}) => {
  // Component logic here

  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      {/* More JSX */}
    </Box>
  );
};
```

---

## 6. State Management Strategy

### 6.1 State Architecture

```
Application State
├── Local Component State (useState, useReducer)
│   ├── UI state (modals, dropdowns, forms)
│   ├── Temporary data (current input)
│   └── Animation state
│
├── Context State (React Context)
│   ├── ProgressContext (global progress)
│   ├── UnitSessionContext (active session)
│   └── SettingsContext (user preferences)
│
└── Persistent State (localStorage)
    ├── UserProgress
    ├── SpacedRepetitionData
    └── Settings
```

### 6.2 Context Implementations

**ProgressContext** - Global user progress and statistics

```typescript
// src/contexts/ProgressContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProgress, Achievement } from '@/types';
import { loadProgress, saveProgress } from '@/utils/localStorage';
import { initializeProgress } from '@/services/progressTracking';

interface ProgressContextValue {
  progress: UserProgress;
  updateProgress: (updates: Partial<UserProgress>) => void;
  completeUnit: (unitId: string, score: number, results: ExerciseResult[]) => void;
  unlockUnit: (unitId: string) => void;
  achievements: Achievement[];
  addXp: (amount: number) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = loadProgress();
    return saved || initializeProgress();
  });

  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // Auto-save on changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const updateProgress = (updates: Partial<UserProgress>) => {
    setProgress(prev => ({
      ...prev,
      ...updates,
      lastUpdated: new Date().toISOString(),
    }));
  };

  const completeUnit = (unitId: string, score: number, results: ExerciseResult[]) => {
    // Implementation in section 7
  };

  const unlockUnit = (unitId: string) => {
    setProgress(prev => ({
      ...prev,
      unlockedUnits: [...prev.unlockedUnits, unitId],
    }));
  };

  const addXp = (amount: number) => {
    setProgress(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        totalXp: prev.stats.totalXp + amount,
      },
    }));
  };

  const value: ProgressContextValue = {
    progress,
    updateProgress,
    completeUnit,
    unlockUnit,
    achievements,
    addXp,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};
```

**UnitSessionContext** - Active exercise session state

```typescript
// src/contexts/UnitSessionContext.tsx

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { UnitProgress, Exercise, ExerciseResult } from '@/types';

interface UnitSessionContextValue {
  session: UnitProgress | null;
  startSession: (unitId: string, exercises: Exercise[]) => void;
  submitExercise: (result: ExerciseResult) => void;
  endSession: () => void;
  currentExercise: Exercise | null;
  hearts: number;
  progress: number;
}

const UnitSessionContext = createContext<UnitSessionContextValue | null>(null);

export const UnitSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<UnitProgress | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const startSession = useCallback((unitId: string, exerciseList: Exercise[]) => {
    setExercises(exerciseList);
    setSession({
      unitId,
      currentExerciseIndex: 0,
      completedExercises: [],
      score: 0,
      hearts: 5,
      isCompleted: false,
      startedAt: new Date().toISOString(),
    });
  }, []);

  const submitExercise = useCallback((result: ExerciseResult) => {
    setSession(prev => {
      if (!prev) return prev;

      const newCompleted = [...prev.completedExercises, result];
      const newHearts = result.isCorrect ? prev.hearts : prev.hearts - 1;
      const newScore = (newCompleted.filter(r => r.isCorrect).length / exercises.length) * 100;

      // Check if session complete or failed
      const isComplete = newCompleted.length === exercises.length || newHearts === 0;

      return {
        ...prev,
        completedExercises: newCompleted,
        currentExerciseIndex: prev.currentExerciseIndex + 1,
        hearts: newHearts,
        score: newScore,
        isCompleted: isComplete,
        completedAt: isComplete ? new Date().toISOString() : undefined,
      };
    });
  }, [exercises.length]);

  const endSession = useCallback(() => {
    setSession(null);
    setExercises([]);
  }, []);

  const currentExercise = session && session.currentExerciseIndex < exercises.length
    ? exercises[session.currentExerciseIndex]
    : null;

  const value: UnitSessionContextValue = {
    session,
    startSession,
    submitExercise,
    endSession,
    currentExercise,
    hearts: session?.hearts || 5,
    progress: session?.score || 0,
  };

  return (
    <UnitSessionContext.Provider value={value}>
      {children}
    </UnitSessionContext.Provider>
  );
};

export const useUnitSession = () => {
  const context = useContext(UnitSessionContext);
  if (!context) {
    throw new Error('useUnitSession must be used within UnitSessionProvider');
  }
  return context;
};
```

### 6.3 State Update Patterns

**Immutable Updates**:
```typescript
// ❌ Bad - Mutating state
progress.completedUnits.push(unitId);

// ✅ Good - Immutable update
setProgress(prev => ({
  ...prev,
  completedUnits: [...prev.completedUnits, unitId],
}));
```

**Functional Updates**:
```typescript
// When new state depends on previous state
setHearts(prev => prev - 1);
setProgress(prev => ({ ...prev, stats: { ...prev.stats, totalXp: prev.stats.totalXp + 100 } }));
```

---

## 7. Data Flow & Exercise Orchestration

### 7.1 Exercise Lifecycle

```
User starts unit
    ↓
LearningUnit component loads
    ↓
UnitSessionContext.startSession(unitId, exercises)
    ↓
First exercise rendered via ExerciseRenderer
    ↓
User completes exercise
    ↓
Exercise component calls onComplete(result)
    ↓
UnitSessionContext.submitExercise(result)
    ↓
State updated: hearts, score, currentIndex
    ↓
Next exercise or completion screen
    ↓
If complete: ProgressContext.completeUnit()
    ↓
Update global progress, unlock next unit
    ↓
Save to localStorage
```

### 7.2 Learning Unit Orchestrator

```typescript
// src/components/learning/LearningUnit.tsx

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { useProgress } from '@/contexts/ProgressContext';
import { useUnitSession } from '@/contexts/UnitSessionContext';
import { ExerciseRenderer } from './ExerciseRenderer';
import { UnitCompletion } from './UnitCompletion';
import { HeartDisplay } from '@/components/common/HeartDisplay';
import { ProgressBar } from '@/components/common/ProgressBar';
import { curriculum } from '@/data/curriculum';

export const LearningUnit: React.FC = () => {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();
  const { progress, completeUnit } = useProgress();
  const { session, startSession, submitExercise, currentExercise, hearts } = useUnitSession();

  // Find unit data
  const unit = curriculum.belts
    .flatMap(belt => belt.units)
    .find(u => u.id === unitId);

  useEffect(() => {
    if (unit && !session) {
      startSession(unit.id, unit.exercises);
    }
  }, [unit, session, startSession]);

  if (!unit) {
    return <div>Unit not found</div>;
  }

  if (!session) {
    return <div>Loading...</div>;
  }

  // Show completion screen
  if (session.isCompleted) {
    const passed = session.score >= unit.targetScore && session.hearts > 0;

    if (passed) {
      completeUnit(unit.id, session.score, session.completedExercises);
    }

    return (
      <UnitCompletion
        unit={unit}
        session={session}
        passed={passed}
        onContinue={() => navigate('/learning')}
        onRetry={() => startSession(unit.id, unit.exercises)}
      />
    );
  }

  // Render current exercise
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <HeartDisplay hearts={hearts} />
          <ProgressBar
            current={session.currentExerciseIndex}
            total={unit.exercises.length}
          />
        </Box>

        {/* Exercise */}
        {currentExercise && (
          <ExerciseRenderer
            exercise={currentExercise}
            onComplete={submitExercise}
          />
        )}
      </Box>
    </Container>
  );
};
```

### 7.3 Exercise Renderer (Dynamic)

```typescript
// src/components/learning/ExerciseRenderer.tsx

import React from 'react';
import type { Exercise, ExerciseResult } from '@/types';
import { TermToIconExercise } from '@/components/exercises/TermToIconExercise';
import { IconToTermExercise } from '@/components/exercises/IconToTermExercise';
import { IconMatchingExercise } from '@/components/exercises/IconMatchingExercise';
import { SafetyQuizExercise } from '@/components/exercises/SafetyQuizExercise';
// ... other exercise imports

interface ExerciseRendererProps {
  exercise: Exercise;
  onComplete: (result: ExerciseResult) => void;
}

export const ExerciseRenderer: React.FC<ExerciseRendererProps> = ({
  exercise,
  onComplete,
}) => {
  const exerciseComponents = {
    term_to_icon: TermToIconExercise,
    icon_to_term: IconToTermExercise,
    icon_matching: IconMatchingExercise,
    safety_quiz: SafetyQuizExercise,
    // ... other mappings
  };

  const ExerciseComponent = exerciseComponents[exercise.type];

  if (!ExerciseComponent) {
    console.error(`Unknown exercise type: ${exercise.type}`);
    return <div>Unknown exercise type</div>;
  }

  return (
    <ExerciseComponent
      exercise={exercise}
      onComplete={onComplete}
    />
  );
};
```

### 7.4 Example Exercise Component

```typescript
// src/components/exercises/TermToIconExercise.tsx

import React, { useState } from 'react';
import { Box, Typography, Button, Card } from '@mui/material';
import type { Exercise, ExerciseResult } from '@/types';
import { IconRenderer } from '@/components/icons/IconRenderer';

interface TermToIconExerciseProps {
  exercise: Exercise;
  onComplete: (result: ExerciseResult) => void;
}

export const TermToIconExercise: React.FC<TermToIconExerciseProps> = ({
  exercise,
  onComplete,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [startTime] = useState(Date.now());

  const handleSubmit = () => {
    if (!selectedOption) return;

    const isCorrect = selectedOption === exercise.correctAnswer;
    const timeSpent = Date.now() - startTime;

    const result: ExerciseResult = {
      exerciseId: exercise.id,
      isCorrect,
      timeSpent,
      attempts: 1,
      timestamp: new Date().toISOString(),
      userAnswer: selectedOption,
      correctAnswer: exercise.correctAnswer,
      hintsUsed: showHint ? 1 : 0,
    };

    onComplete(result);
  };

  return (
    <Box>
      {/* Question */}
      <Typography variant="h5" gutterBottom>
        {exercise.question}
      </Typography>

      {/* Term display */}
      <Card sx={{ p: 3, mb: 3, textAlign: 'center' }}>
        <Typography variant="h3">
          {exercise.terminologyItem.japanese}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {exercise.terminologyItem.romaji}
        </Typography>
      </Card>

      {/* Hint */}
      {exercise.hint && (
        <Box sx={{ mb: 2 }}>
          {!showHint ? (
            <Button onClick={() => setShowHint(true)}>
              Show Hint
            </Button>
          ) : (
            <Typography color="primary">{exercise.hint}</Typography>
          )}
        </Box>
      )}

      {/* Options */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
        {exercise.options?.map(option => (
          <Card
            key={option.id}
            onClick={() => setSelectedOption(option.id)}
            sx={{
              p: 2,
              cursor: 'pointer',
              border: 2,
              borderColor: selectedOption === option.id ? 'primary.main' : 'transparent',
              '&:hover': { borderColor: 'primary.light' },
            }}
          >
            {option.iconData && (
              <IconRenderer
                iconData={option.iconData}
                caption={option.value}
                size="medium"
              />
            )}
          </Card>
        ))}
      </Box>

      {/* Submit */}
      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={handleSubmit}
        disabled={!selectedOption}
      >
        Submit Answer
      </Button>
    </Box>
  );
};
```

### 7.5 Progress Calculation Service

```typescript
// src/services/progressTracking.ts

import type { UserProgress, ExerciseResult, PracticeSession } from '@/types';

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

export function calculateXpGain(score: number, results: ExerciseResult[]): number {
  let xp = 100; // Base XP

  // Bonus for high score
  if (score >= 90) xp += 50;
  if (score === 100) xp += 25;

  // Bonus for speed (average < 15s per exercise)
  const avgTime = results.reduce((sum, r) => sum + r.timeSpent, 0) / results.length;
  if (avgTime < 15000) xp += 25;

  return xp;
}

export function calculateAccuracy(results: ExerciseResult[]): number {
  if (results.length === 0) return 0;
  const correct = results.filter(r => r.isCorrect).length;
  return (correct / results.length) * 100;
}

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
  return 1; // Streak broken
}
```

---

## 8. Icon Rendering System

### 8.1 Icon Renderer Architecture

```
IconRenderer (Factory)
├── EmojiIcon (type='emoji')
├── SvgIcon (type='svg')
└── CompositeIcon (type='composite')
    ├── ShapeRenderer
    ├── ArrowRenderer
    ├── LineRenderer
    └── TextRenderer
```

### 8.2 Main Icon Renderer

```typescript
// src/components/icons/IconRenderer.tsx

import React from 'react';
import { Box } from '@mui/material';
import type { IconRendererProps } from '@/types';
import { ICON_SIZES } from '@/types';
import { EmojiIcon } from './EmojiIcon';
import { SvgIcon } from './SvgIcon';
import { CompositeIcon } from './CompositeIcon';

export const IconRenderer: React.FC<IconRendererProps> = ({
  iconData,
  caption,
  size = 'medium',
  showCaption = true,
  onClick,
}) => {
  const sizeInPx = ICON_SIZES[size];

  const renderIcon = () => {
    switch (iconData.type) {
      case 'emoji':
        return <EmojiIcon emoji={iconData.emoji!} size={sizeInPx} />;

      case 'svg':
        return (
          <SvgIcon
            svgPath={iconData.svgPath}
            svgContent={iconData.svgContent}
            size={sizeInPx}
            color={iconData.color}
          />
        );

      case 'composite':
        return (
          <CompositeIcon
            elements={iconData.elements!}
            size={sizeInPx}
            backgroundColor={iconData.backgroundColor}
          />
        );

      default:
        console.error('Unknown icon type');
        return null;
    }
  };

  return (
    <Box
      onClick={onClick}
      sx={{
        textAlign: 'center',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {renderIcon()}

      {showCaption && caption && (
        <Box
          component="span"
          sx={{
            display: 'block',
            mt: 1,
            fontSize: size === 'small' ? '0.75rem' : '0.875rem',
            color: 'text.secondary',
          }}
        >
          {caption}
        </Box>
      )}
    </Box>
  );
};
```

### 8.3 Composite Icon Renderer

```typescript
// src/components/icons/CompositeIcon.tsx

import React from 'react';
import { Box } from '@mui/material';
import type { IconElement } from '@/types';

interface CompositeIconProps {
  elements: IconElement[];
  size: number;
  backgroundColor?: string;
}

export const CompositeIcon: React.FC<CompositeIconProps> = ({
  elements,
  size,
  backgroundColor = 'transparent',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ backgroundColor }}
    >
      {elements.map((element, index) => (
        <g key={index}>
          {element.type === 'shape' && renderShape(element)}
          {element.type === 'arrow' && renderArrow(element)}
          {element.type === 'line' && renderLine(element)}
          {element.type === 'text' && renderText(element)}
        </g>
      ))}
    </svg>
  );
};

function renderShape(element: IconElement): React.ReactNode {
  const { shape, position, color = '#000', size = 20 } = element;

  switch (shape) {
    case 'circle':
      return (
        <circle
          cx={position.x}
          cy={position.y}
          r={size / 2}
          fill={color}
        />
      );

    case 'square':
      return (
        <rect
          x={position.x - size / 2}
          y={position.y - size / 2}
          width={size}
          height={size}
          fill={color}
        />
      );

    case 'triangle':
      const halfSize = size / 2;
      return (
        <polygon
          points={`${position.x},${position.y - halfSize} ${position.x - halfSize},${position.y + halfSize} ${position.x + halfSize},${position.y + halfSize}`}
          fill={color}
        />
      );

    case 'person':
      return (
        <g>
          {/* Head */}
          <circle cx={position.x} cy={position.y - 10} r={5} fill={color} />
          {/* Body */}
          <line
            x1={position.x}
            y1={position.y - 5}
            x2={position.x}
            y2={position.y + 10}
            stroke={color}
            strokeWidth={2}
          />
          {/* Arms */}
          <line
            x1={position.x - 7}
            y1={position.y}
            x2={position.x + 7}
            y2={position.y}
            stroke={color}
            strokeWidth={2}
          />
          {/* Legs */}
          <line
            x1={position.x}
            y1={position.y + 10}
            x2={position.x - 5}
            y2={position.y + 20}
            stroke={color}
            strokeWidth={2}
          />
          <line
            x1={position.x}
            y1={position.y + 10}
            x2={position.x + 5}
            y2={position.y + 20}
            stroke={color}
            strokeWidth={2}
          />
        </g>
      );

    default:
      return null;
  }
}

function renderArrow(element: IconElement): React.ReactNode {
  const { position, direction, color = '#000', size = 20, strokeWidth = 2 } = element;

  const arrowPaths = {
    up: `M ${position.x},${position.y} L ${position.x},${position.y - size} M ${position.x - 5},${position.y - size + 5} L ${position.x},${position.y - size} L ${position.x + 5},${position.y - size + 5}`,
    down: `M ${position.x},${position.y} L ${position.x},${position.y + size} M ${position.x - 5},${position.y + size - 5} L ${position.x},${position.y + size} L ${position.x + 5},${position.y + size - 5}`,
    left: `M ${position.x},${position.y} L ${position.x - size},${position.y} M ${position.x - size + 5},${position.y - 5} L ${position.x - size},${position.y} L ${position.x - size + 5},${position.y + 5}`,
    right: `M ${position.x},${position.y} L ${position.x + size},${position.y} M ${position.x + size - 5},${position.y - 5} L ${position.x + size},${position.y} L ${position.x + size - 5},${position.y + 5}`,
  };

  return (
    <path
      d={arrowPaths[direction || 'right']}
      stroke={color}
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinecap="round"
    />
  );
}

function renderLine(element: IconElement): React.ReactNode {
  const { position, direction, color = '#000', size = 20, strokeWidth = 2 } = element;

  const endPoints = {
    horizontal: { x2: position.x + size, y2: position.y },
    vertical: { x2: position.x, y2: position.y + size },
  };

  const end = direction === 'horizontal' || direction === 'left' || direction === 'right'
    ? endPoints.horizontal
    : endPoints.vertical;

  return (
    <line
      x1={position.x}
      y1={position.y}
      x2={end.x2}
      y2={end.y2}
      stroke={color}
      strokeWidth={strokeWidth}
    />
  );
}

function renderText(element: IconElement): React.ReactNode {
  const { position, text, color = '#000', size = 12 } = element;

  return (
    <text
      x={position.x}
      y={position.y}
      fill={color}
      fontSize={size}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {text}
    </text>
  );
}
```

### 8.4 Icon Data Examples

```typescript
// src/data/icons/stancesIcons.ts

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
        direction: 'horizontal',
        color: '#c62828',
        size: 15,
        strokeWidth: 3,
      },
    ],
  },
};

export const movementsIcons: Record<string, IconData> = {
  irimi: {
    type: 'composite',
    elements: [
      {
        type: 'arrow',
        direction: 'right',
        position: { x: 20, y: 50 },
        color: '#2e7d32',
        size: 30,
        strokeWidth: 3,
      },
      {
        type: 'shape',
        shape: 'person',
        position: { x: 70, y: 50 },
        color: '#1976d2',
        size: 25,
      },
    ],
  },

  tenkan: {
    type: 'composite',
    elements: [
      {
        type: 'shape',
        shape: 'circle',
        position: { x: 50, y: 50 },
        color: 'transparent',
        size: 30,
      },
      // Circular arrow (using path for complexity)
      {
        type: 'arrow',
        direction: 'right',
        position: { x: 50, y: 30 },
        color: '#2e7d32',
        size: 15,
      },
    ],
  },
};
```

---

## 9. Progress Tracking & Spaced Repetition

### 9.1 Leitner Box System

**Algorithm Overview**:
```
Box 1 (New):        Review every 1 day
Box 2 (Learning):   Review every 3 days
Box 3 (Familiar):   Review every 7 days
Box 4 (Known):      Review every 14 days
Box 5 (Mastered):   Review every 30 days

On Success:  Move to next box
On Failure:  Move back to Box 1
```

### 9.2 Spaced Repetition Service

```typescript
// src/services/spacedRepetition.ts

import type { SpacedRepetitionData, SpacedRepetitionBox, TerminologyItem } from '@/types';

const BOX_INTERVALS = {
  1: 1,    // 1 day
  2: 3,    // 3 days
  3: 7,    // 7 days
  4: 14,   // 14 days
  5: 30,   // 30 days
} as const;

/**
 * Initialize a new term in the spaced repetition system
 */
export function initializeTerm(termId: string): SpacedRepetitionBox {
  const now = new Date().toISOString();
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  return {
    termId,
    box: 1,
    lastReviewed: now,
    nextReview: tomorrow,
    consecutiveCorrect: 0,
    totalReviews: 0,
  };
}

/**
 * Update term after review
 */
export function updateTermAfterReview(
  box: SpacedRepetitionBox,
  isCorrect: boolean
): SpacedRepetitionBox {
  const now = new Date().toISOString();

  if (isCorrect) {
    // Move to next box (max 5)
    const newBox = Math.min(box.box + 1, 5) as 1 | 2 | 3 | 4 | 5;
    const intervalDays = BOX_INTERVALS[newBox];
    const nextReview = new Date(Date.now() + intervalDays * 24 * 60 * 60 * 1000).toISOString();

    return {
      ...box,
      box: newBox,
      lastReviewed: now,
      nextReview,
      consecutiveCorrect: box.consecutiveCorrect + 1,
      totalReviews: box.totalReviews + 1,
    };
  } else {
    // Move back to box 1
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    return {
      ...box,
      box: 1,
      lastReviewed: now,
      nextReview: tomorrow,
      consecutiveCorrect: 0,
      totalReviews: box.totalReviews + 1,
    };
  }
}

/**
 * Get terms due for review today
 */
export function getTermsDueForReview(data: SpacedRepetitionData): string[] {
  const now = new Date().getTime();

  return Object.values(data.boxes)
    .filter(box => new Date(box.nextReview).getTime() <= now)
    .sort((a, b) => new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime())
    .map(box => box.termId);
}

/**
 * Get review statistics
 */
export function getReviewStats(data: SpacedRepetitionData) {
  const boxes = Object.values(data.boxes);

  return {
    total: boxes.length,
    new: boxes.filter(b => b.box === 1).length,
    learning: boxes.filter(b => b.box === 2 || b.box === 3).length,
    mastered: boxes.filter(b => b.box === 4 || b.box === 5).length,
    dueToday: getTermsDueForReview(data).length,
  };
}
```

### 9.3 Unlock System Service

```typescript
// src/services/unlockSystem.ts

import type { UserProgress, LearningUnit, BeltSection, Curriculum } from '@/types';

/**
 * Check if a unit is unlocked for the user
 */
export function isUnitUnlocked(
  unitId: string,
  progress: UserProgress,
  curriculum: Curriculum
): boolean {
  // Already unlocked
  if (progress.unlockedUnits.includes(unitId)) {
    return true;
  }

  // Find the unit
  const unit = findUnit(unitId, curriculum);
  if (!unit) return false;

  // Check prerequisites
  if (unit.prerequisites.length === 0) {
    return true; // No prerequisites = unlocked
  }

  // All prerequisites must be completed
  return unit.prerequisites.every(prereqId =>
    progress.completedUnits.includes(prereqId)
  );
}

/**
 * Check if a belt is unlocked
 */
export function isBeltUnlocked(
  beltLevel: string,
  progress: UserProgress,
  curriculum: Curriculum
): boolean {
  const belt = curriculum.belts.find(b => b.level === beltLevel);
  if (!belt) return false;

  const condition = belt.unlockCondition;

  switch (condition.type) {
    case 'always_unlocked':
      return true;

    case 'previous_belt':
      const beltIndex = curriculum.belts.findIndex(b => b.level === beltLevel);
      if (beltIndex === 0) return true; // First belt always unlocked

      const previousBelt = curriculum.belts[beltIndex - 1];
      return previousBelt.units.every(u =>
        progress.completedUnits.includes(u.id)
      );

    case 'specific_units':
      return (condition.requiredUnits || []).every(unitId =>
        progress.completedUnits.includes(unitId)
      );

    default:
      return false;
  }
}

/**
 * Get next units to unlock
 */
export function getNextUnlockableUnits(
  progress: UserProgress,
  curriculum: Curriculum
): LearningUnit[] {
  const allUnits = curriculum.belts.flatMap(b => b.units);

  return allUnits.filter(unit => {
    // Not already unlocked or completed
    if (progress.unlockedUnits.includes(unit.id) ||
        progress.completedUnits.includes(unit.id)) {
      return false;
    }

    // One prerequisite away from unlocking
    const completed = unit.prerequisites.filter(prereqId =>
      progress.completedUnits.includes(prereqId)
    );

    return completed.length === unit.prerequisites.length - 1;
  });
}

function findUnit(unitId: string, curriculum: Curriculum): LearningUnit | undefined {
  return curriculum.belts
    .flatMap(b => b.units)
    .find(u => u.id === unitId);
}
```

### 9.4 Achievement System

```typescript
// src/services/achievementSystem.ts

import type { Achievement, UserProgress } from '@/types';
import { achievements } from '@/data/achievements';

/**
 * Check which achievements should be unlocked
 */
export function checkAchievements(progress: UserProgress): Achievement[] {
  return achievements.filter(achievement => {
    // Already unlocked
    if (achievement.unlockedAt) return false;

    // Check condition
    switch (achievement.condition.type) {
      case 'units_completed':
        return progress.stats.unitsCompleted >= achievement.condition.value;

      case 'streak':
        return progress.stats.streak >= achievement.condition.value;

      case 'accuracy':
        return progress.stats.accuracy >= achievement.condition.value;

      case 'terms_mastered':
        const mastered = Object.values(progress.spacedRepetitionData.boxes)
          .filter(box => box.box >= 4).length;
        return mastered >= achievement.condition.value;

      case 'speed':
        // Check if any unit was completed in under the time limit
        const fastSessions = progress.practiceLog.filter(
          session => session.duration <= achievement.condition.value
        );
        return fastSessions.length > 0;

      default:
        return false;
    }
  });
}

/**
 * Unlock an achievement
 */
export function unlockAchievement(achievementId: string): Achievement | null {
  const achievement = achievements.find(a => a.id === achievementId);
  if (!achievement) return null;

  return {
    ...achievement,
    unlockedAt: new Date().toISOString(),
  };
}
```

---

## 10. Routing Strategy

### 10.1 Route Structure

```typescript
// src/App.tsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import { ProgressProvider } from './contexts/ProgressContext';
import { UnitSessionProvider } from './contexts/UnitSessionContext';

// Pages
import { HomePage } from './pages/HomePage';
import { LearningPage } from './pages/LearningPage';
import { LearningUnit } from './components/learning/LearningUnit';
import { ReviewPage } from './pages/ReviewPage';
import { LibraryPage } from './pages/LibraryPage';
import { DashboardPage } from './pages/DashboardPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProgressProvider>
        <UnitSessionProvider>
          <BrowserRouter>
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />

              {/* Learning */}
              <Route path="/learning" element={<LearningPage />} />
              <Route path="/learning/:unitId" element={<LearningUnit />} />

              {/* Review */}
              <Route path="/review" element={<ReviewPage />} />

              {/* Library */}
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/library/:termId" element={<LibraryPage />} />

              {/* Dashboard */}
              <Route path="/dashboard" element={<DashboardPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </UnitSessionProvider>
      </ProgressProvider>
    </ThemeProvider>
  );
};
```

### 10.2 Navigation Menu Component

```typescript
// src/components/navigation/NavigationMenu.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardActionArea, Typography, Grid } from '@mui/material';

const menuItems = [
  {
    title: 'Learn',
    subtitle: 'Follow the curriculum',
    icon: '📖',
    path: '/learning',
    color: '#1976d2',
  },
  {
    title: 'Review',
    subtitle: 'Spaced repetition',
    icon: '🔄',
    path: '/review',
    color: '#2e7d32',
  },
  {
    title: 'Library',
    subtitle: 'Browse all terms',
    icon: '📚',
    path: '/library',
    color: '#ffa726',
  },
  {
    title: 'Stats',
    subtitle: 'View your progress',
    icon: '📊',
    path: '/dashboard',
    color: '#c62828',
  },
];

export const NavigationMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      {menuItems.map(item => (
        <Grid item xs={12} sm={6} key={item.path}>
          <Card>
            <CardActionArea
              onClick={() => navigate(item.path)}
              sx={{ p: 3, textAlign: 'center' }}
            >
              <Typography variant="h2" fontSize={48}>
                {item.icon}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.subtitle}
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
```

---

## 11. Storage Architecture

### 11.1 localStorage Keys and Structure

**Storage Keys**:
```typescript
// src/utils/constants.ts

export const STORAGE_KEYS = {
  PROGRESS: 'aikido-lingo-progress',
  SETTINGS: 'aikido-lingo-settings',
  CACHE: 'aikido-lingo-cache',
} as const;
```

**Data Structure**:
```json
{
  "aikido-lingo-progress": {
    "version": "1.0",
    "data": {
      "currentBeltLevel": "white_5",
      "completedUnits": ["white5_unit1"],
      "unlockedUnits": ["white5_unit1", "white5_unit2"],
      "stats": { ... },
      "spacedRepetitionData": { ... }
    }
  },

  "aikido-lingo-settings": {
    "soundEnabled": true,
    "language": "fr",
    "theme": "light"
  }
}
```

### 11.2 localStorage Utility

```typescript
// src/utils/localStorage.ts

import type { UserProgress } from '@/types';
import { STORAGE_KEYS } from './constants';

interface StorageData<T> {
  version: string;
  data: T;
  timestamp: string;
}

/**
 * Generic localStorage save function
 */
function saveToStorage<T>(key: string, data: T, version: string = '1.0'): void {
  try {
    const storageData: StorageData<T> = {
      version,
      data,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(key, JSON.stringify(storageData));
  } catch (error) {
    console.error(`Failed to save to localStorage (${key}):`, error);
  }
}

/**
 * Generic localStorage load function
 */
function loadFromStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const storageData: StorageData<T> = JSON.parse(item);

    // Version check could go here
    // if (storageData.version !== CURRENT_VERSION) { migrate() }

    return storageData.data;
  } catch (error) {
    console.error(`Failed to load from localStorage (${key}):`, error);
    return null;
  }
}

/**
 * Save user progress
 */
export function saveProgress(progress: UserProgress): void {
  saveToStorage(STORAGE_KEYS.PROGRESS, progress);
}

/**
 * Load user progress
 */
export function loadProgress(): UserProgress | null {
  return loadFromStorage<UserProgress>(STORAGE_KEYS.PROGRESS);
}

/**
 * Clear all data (reset progress)
 */
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

/**
 * Export data for backup
 */
export function exportData(): string {
  const data: Record<string, any> = {};
  Object.values(STORAGE_KEYS).forEach(key => {
    const item = localStorage.getItem(key);
    if (item) {
      data[key] = JSON.parse(item);
    }
  });
  return JSON.stringify(data, null, 2);
}

/**
 * Import data from backup
 */
export function importData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    Object.entries(data).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
    return true;
  } catch (error) {
    console.error('Failed to import data:', error);
    return false;
  }
}
```

---

## 12. Theme & Styling

### 12.1 MUI Theme Configuration

```typescript
// src/theme.ts

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#c62828',        // Aikido red (passion, energy)
      light: '#ff5f52',
      dark: '#8e0000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#1a237e',        // Navy blue (discipline, respect)
      light: '#534bae',
      dark: '#000051',
      contrastText: '#fff',
    },
    success: {
      main: '#2e7d32',        // Green (progress)
      light: '#60ad5e',
      dark: '#005005',
    },
    warning: {
      main: '#ffa726',        // Orange (attention)
      light: '#ffd95b',
      dark: '#c77800',
    },
    error: {
      main: '#d32f2f',
      light: '#ff6659',
      dark: '#9a0007',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
  },

  typography: {
    fontFamily: [
      '"Noto Sans JP"',
      '"Inter"',
      '"Roboto"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),

    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    button: {
      fontWeight: 500,
      fontSize: '0.875rem',
      textTransform: 'none', // Don't uppercase buttons
    },
  },

  shape: {
    borderRadius: 12,
  },

  spacing: 8, // 8px base spacing

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
        },
        sizeLarge: {
          padding: '14px 32px',
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
```

### 12.2 Belt Colors

```typescript
// src/utils/constants.ts

export const BELT_COLORS: Record<string, string> = {
  white_5: '#ffffff',
  white_4: '#ffffff',
  white_3: '#fdd835',      // Yellow
  white_2: '#fdd835',
  white_1: '#fb8c00',      // Orange
  black_1: '#212121',      // Black
  black_2: '#212121',
  black_3: '#212121',
  black_4: '#212121',
} as const;

export const MAX_HEARTS = 5;
export const MIN_PASSING_SCORE = 80;
export const BASE_XP_PER_UNIT = 100;
```

---

## 13. Development Phases

### Phase 1: MVP (Weeks 1-6)

#### Week 1-2: Foundation
- [x] Project setup (create-react-app, TypeScript, MUI)
- [x] All type definitions (`types/` directory)
- [x] Project structure scaffolding
- [x] Theme configuration
- [x] Basic routing setup
- [x] localStorage utilities
- [x] Core constants

**Deliverables**: Working dev environment, all types defined, routing skeleton

#### Week 3-4: Core Features
- [ ] ProgressContext with persistence
- [ ] UnitSessionContext for exercise flow
- [ ] IconRenderer with all three types (emoji, SVG, composite)
- [ ] 4 priority exercise components:
  - [ ] TermToIconExercise
  - [ ] IconToTermExercise
  - [ ] SafetyQuizExercise
  - [ ] FreeRecallExercise
- [ ] LearningUnit orchestrator
- [ ] ExerciseRenderer (dynamic)
- [ ] Common components (ProgressBar, HeartDisplay, etc.)

**Deliverables**: Complete exercise system working end-to-end

#### Week 5-6: Content & Polish
- [ ] First 3 units data:
  - [ ] Unit 1: Dojo Etiquette (10 terms)
  - [ ] Unit 2: Basic Positions (12 terms)
  - [ ] Unit 3: First Movements (10 terms)
- [ ] 20+ icon definitions (emoji + composite)
- [ ] BeltProgressList navigation
- [ ] UnitCompletion screen
- [ ] HomePage with navigation menu
- [ ] Basic unit tests
- [ ] Deployment setup (Netlify/Vercel)

**Deliverables**: Fully playable MVP with 3 units, deployable

**MVP Success Criteria**:
- ✅ User can complete 3 full units
- ✅ Progress saves and persists
- ✅ Hearts/lives system works correctly
- ✅ Icons display correctly on all screen sizes
- ✅ Score calculation accurate
- ✅ Unit unlocking works
- ✅ Lighthouse performance > 90

---

### Phase 2: Expansion (Weeks 7-14)

#### Features
- [ ] 4 additional exercise types:
  - [ ] IconMatchingExercise (drag-drop)
  - [ ] VideoObservationExercise
  - [ ] PositionIdentificationExercise
  - [ ] SequenceOrderingExercise
- [ ] ReviewPage with spaced repetition
- [ ] Flashcard component
- [ ] LibraryPage with filtering
- [ ] DashboardPage with charts
- [ ] Achievement system
- [ ] PWA support (service worker, manifest)
- [ ] Sound effects (optional)

#### Content
- [ ] Units 4-10 (4th-3rd kyu)
- [ ] 80+ additional terms
- [ ] 10-15 demo videos
- [ ] 50+ additional icons

**Phase 2 Success Criteria**:
- ✅ All 8 exercise types implemented
- ✅ Spaced repetition working
- ✅ 10+ units playable
- ✅ PWA installable offline
- ✅ 7-day retention > 40%

---

### Phase 3: Optimization (Weeks 15-18)

- [ ] Backend API (optional)
- [ ] Multi-device sync
- [ ] Instructor sharing
- [ ] Advanced analytics
- [ ] E2E test coverage
- [ ] Performance optimization (code splitting, lazy loading)
- [ ] WCAG AA accessibility audit
- [ ] Internationalization (English support)

---

### Phase 4: Future Enhancements

- [ ] Units up to 1st dan
- [ ] Multiplayer challenges
- [ ] React Native mobile app
- [ ] Voice recognition (Japanese pronunciation)
- [ ] AR position visualization
- [ ] Community features

---

## 14. Implementation Guidelines

### 14.1 Development Workflow

1. **Start with Types**: Always define types before implementing
2. **Build Bottom-Up**: Start with utilities, then services, then components
3. **Test as You Go**: Write unit tests alongside implementation
4. **Mobile-First**: Design for mobile, enhance for desktop
5. **Accessibility First**: Add ARIA labels, keyboard navigation from start

### 14.2 Code Quality Standards

**TypeScript**:
- Strict mode enabled
- No `any` types (use `unknown` if necessary)
- Explicit return types on functions
- Interface over type for objects

**React**:
- Functional components only
- Hooks for state/effects
- Memoize expensive computations
- Extract logic to custom hooks

**Testing**:
- Unit tests for all services/utilities
- Component tests for UI logic
- E2E tests for critical flows
- Minimum 80% coverage

**Performance**:
- Code splitting by route
- Lazy load heavy components
- Memoize expensive renders
- Optimize images (WebP, lazy loading)

### 14.3 Git Workflow

**Branch Strategy**:
```
main (production)
  ├── develop (integration)
      ├── feature/icon-renderer
      ├── feature/exercise-term-to-icon
      └── feature/unit-1-data
```

**Commit Messages**:
```
feat: Add IconRenderer component
fix: Correct heart deduction logic
docs: Update architecture documentation
test: Add tests for progress tracking
refactor: Simplify exercise renderer
```

### 14.4 File Organization Best Practices

1. **Group by feature**, not by type (when applicable)
2. **Co-locate tests** with source files or in parallel structure
3. **Index files** for clean imports
4. **Barrel exports** for public APIs

Example:
```typescript
// src/components/icons/index.ts
export { IconRenderer } from './IconRenderer';
export { CompositeIcon } from './CompositeIcon';
export { EmojiIcon } from './EmojiIcon';
export { SvgIcon } from './SvgIcon';

// Usage elsewhere
import { IconRenderer, CompositeIcon } from '@/components/icons';
```

---

## 15. Performance & Optimization

### 15.1 Performance Budget

| Metric | Target | Critical |
|--------|--------|----------|
| First Contentful Paint | < 1.5s | < 2s |
| Time to Interactive | < 3s | < 4s |
| Total Bundle Size (gzip) | < 400KB | < 500KB |
| Lighthouse Performance | > 95 | > 90 |
| Lighthouse Accessibility | > 95 | > 90 |

### 15.2 Optimization Techniques

**Code Splitting**:
```typescript
// Lazy load pages
const LibraryPage = lazy(() => import('./pages/LibraryPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

// Route-based splitting automatically with React Router
```

**Memoization**:
```typescript
// Expensive calculations
const sortedTerms = useMemo(() => {
  return terms.sort((a, b) => a.japanese.localeCompare(b.japanese));
}, [terms]);

// Component memoization
export const IconCard = React.memo<IconCardProps>(({ iconData, caption }) => {
  // ...
});
```

**Virtual Scrolling** (for large lists):
```typescript
import { FixedSizeList } from 'react-window';

// For library with 200+ items
<FixedSizeList
  height={600}
  itemCount={items.length}
  itemSize={120}
  width="100%"
>
  {Row}
</FixedSizeList>
```

### 15.3 Asset Optimization

- **Images**: WebP format, multiple sizes, lazy loading
- **Icons**: SVG (inlined for small, external for large)
- **Fonts**: Subset fonts, preload critical fonts
- **Videos**: Compress, multiple resolutions, lazy load

---

## 16. Testing Strategy

### 16.1 Unit Tests

**Example: Service Test**
```typescript
// src/services/spacedRepetition.test.ts

import { initializeTerm, updateTermAfterReview } from './spacedRepetition';

describe('Spaced Repetition Service', () => {
  describe('initializeTerm', () => {
    it('creates a new term in box 1', () => {
      const term = initializeTerm('seiza');

      expect(term.termId).toBe('seiza');
      expect(term.box).toBe(1);
      expect(term.consecutiveCorrect).toBe(0);
    });
  });

  describe('updateTermAfterReview', () => {
    it('moves term to next box on correct answer', () => {
      const initial = initializeTerm('seiza');
      const updated = updateTermAfterReview(initial, true);

      expect(updated.box).toBe(2);
      expect(updated.consecutiveCorrect).toBe(1);
    });

    it('moves term back to box 1 on incorrect answer', () => {
      const box3Term = { ...initializeTerm('seiza'), box: 3 as const };
      const updated = updateTermAfterReview(box3Term, false);

      expect(updated.box).toBe(1);
      expect(updated.consecutiveCorrect).toBe(0);
    });
  });
});
```

**Example: Component Test**
```typescript
// src/components/icons/IconRenderer.test.tsx

import { render, screen } from '@testing-library/react';
import { IconRenderer } from './IconRenderer';

describe('IconRenderer', () => {
  it('renders emoji icon correctly', () => {
    const iconData = { type: 'emoji' as const, emoji: '🧎' };
    render(<IconRenderer iconData={iconData} caption="Seiza" />);

    expect(screen.getByText('🧎')).toBeInTheDocument();
    expect(screen.getByText('Seiza')).toBeInTheDocument();
  });

  it('hides caption when showCaption is false', () => {
    const iconData = { type: 'emoji' as const, emoji: '🧎' };
    render(<IconRenderer iconData={iconData} caption="Seiza" showCaption={false} />);

    expect(screen.queryByText('Seiza')).not.toBeInTheDocument();
  });
});
```

### 16.2 Integration Tests

Test complete user flows:
- Complete an entire unit
- Unlock next unit
- Review flashcards
- Search library

### 16.3 E2E Tests (Phase 2)

Critical paths:
- First-time user completes first unit
- Returning user resumes progress
- User loses all hearts and retries
- User achieves perfect score

---

## 17. Deployment & CI/CD

### 17.1 Build Process

```bash
# Development
npm start

# Production build
npm run build

# Build output: build/ directory with optimized assets
```

### 17.2 Netlify Deployment

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 17.3 CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --coverage

      - name: Build
        run: npm run build

      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## Summary

This architecture document provides a complete, production-ready blueprint for the Aikido Lingo project. The architecture is:

✅ **Scalable**: Supports growth to 200+ terms, multiple belts
✅ **Maintainable**: Clear separation of concerns, typed interfaces
✅ **Performant**: Code splitting, memoization, optimized assets
✅ **Accessible**: WCAG AA compliance, keyboard navigation
✅ **Offline-First**: PWA support, localStorage persistence
✅ **Developer-Friendly**: Clear patterns, comprehensive documentation

**Next Steps**:
1. Set up development environment (Week 1)
2. Implement type system (Week 1-2)
3. Build core components (Week 3-4)
4. Create first 3 units content (Week 5-6)
5. Deploy MVP (Week 6)

The architecture supports the full feature set described in SPECIFICATIONS.md while providing clear paths for incremental development and future enhancements.
