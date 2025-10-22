# Aikido Lingo - Project Structure Guide

This document provides the detailed file and folder structure for immediate implementation.

## Complete Directory Tree with File Descriptions

```
aikido-lingo/
│
├── public/
│   ├── index.html                    # Main HTML entry, PWA meta tags
│   ├── manifest.json                 # PWA manifest configuration
│   ├── service-worker.js             # Service worker for offline support (Phase 2)
│   ├── robots.txt                    # SEO robots file
│   └── icons/                        # PWA app icons
│       ├── icon-192.png              # 192x192 app icon
│       ├── icon-512.png              # 512x512 app icon
│       └── favicon.ico               # Browser favicon
│
├── src/
│   │
│   ├── index.tsx                     # React app entry point, root rendering
│   ├── App.tsx                       # Root component with routing and providers
│   ├── theme.ts                      # Material-UI theme configuration
│   │
│   ├── types/                        # TypeScript type definitions
│   │   ├── index.ts                  # Central type exports
│   │   ├── AikidoTypes.ts            # Core domain types (TerminologyItem, LearningUnit, etc.)
│   │   ├── ExerciseTypes.ts          # Exercise-related types (Exercise, ExerciseResult, etc.)
│   │   ├── IconTypes.ts              # Icon system types (IconData, IconElement)
│   │   ├── ProgressTypes.ts          # Progress tracking types (UserProgress, Stats, etc.)
│   │   └── UtilityTypes.ts           # Helper types (UnlockCondition, Achievement, etc.)
│   │
│   ├── contexts/                     # React Context providers
│   │   ├── ProgressContext.tsx       # Global progress state management
│   │   ├── UnitSessionContext.tsx    # Active exercise session state
│   │   └── SettingsContext.tsx       # User settings state (Phase 2)
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useProgress.ts            # Hook for accessing progress context
│   │   ├── useSpacedRepetition.ts    # Spaced repetition logic hook
│   │   ├── useUnitSession.ts         # Exercise session management hook
│   │   ├── useLocalStorage.ts        # localStorage wrapper hook
│   │   └── useMediaQuery.ts          # Responsive design helper
│   │
│   ├── components/                   # React components
│   │   │
│   │   ├── common/                   # Shared UI components
│   │   │   ├── ProgressBar.tsx       # Generic progress bar component
│   │   │   ├── HeartDisplay.tsx      # Lives/hearts visualization
│   │   │   ├── StatCard.tsx          # Statistics display card
│   │   │   ├── BeltBadge.tsx         # Belt level badge component
│   │   │   ├── LoadingSpinner.tsx    # Loading state spinner
│   │   │   └── ErrorBoundary.tsx     # Error boundary wrapper component
│   │   │
│   │   ├── icons/                    # Icon rendering system
│   │   │   ├── IconRenderer.tsx      # Main icon renderer (factory pattern)
│   │   │   ├── EmojiIcon.tsx         # Emoji icon renderer
│   │   │   ├── SvgIcon.tsx           # SVG icon renderer
│   │   │   ├── CompositeIcon.tsx     # Composite icon builder (SVG-based)
│   │   │   └── IconCard.tsx          # Icon display card with caption
│   │   │
│   │   ├── exercises/                # Exercise type components
│   │   │   ├── ExerciseContainer.tsx         # Common exercise wrapper/layout
│   │   │   ├── IconMatchingExercise.tsx      # Drag-drop term-icon matching
│   │   │   ├── TermToIconExercise.tsx        # MCQ: given term, choose icon
│   │   │   ├── IconToTermExercise.tsx        # MCQ: given icon, choose term
│   │   │   ├── VideoObservationExercise.tsx  # Watch video, identify technique
│   │   │   ├── PositionIdentificationExercise.tsx  # Identify position in context
│   │   │   ├── SafetyQuizExercise.tsx        # Safety question MCQ
│   │   │   ├── SequenceOrderingExercise.tsx  # Order technique steps correctly
│   │   │   └── FreeRecallExercise.tsx        # Flashcard recall exercise
│   │   │
│   │   ├── learning/                 # Learning mode components
│   │   │   ├── LearningUnit.tsx      # Unit orchestrator component
│   │   │   ├── ExerciseRenderer.tsx  # Dynamic exercise type renderer
│   │   │   ├── ExerciseResult.tsx    # Exercise result/feedback display
│   │   │   ├── UnitCompletion.tsx    # Unit completion summary screen
│   │   │   └── HintDisplay.tsx       # Exercise hint component
│   │   │
│   │   ├── navigation/               # Navigation components
│   │   │   ├── BeltProgressList.tsx  # Belt/unit navigation list
│   │   │   ├── UnitCard.tsx          # Individual unit display card
│   │   │   ├── BeltSection.tsx       # Belt section with units
│   │   │   └── NavigationMenu.tsx    # Main menu navigation
│   │   │
│   │   ├── review/                   # Review mode components
│   │   │   ├── ReviewMode.tsx        # Review session orchestrator
│   │   │   ├── Flashcard.tsx         # Flashcard component (front/back)
│   │   │   └── ReviewSchedule.tsx    # Review schedule display
│   │   │
│   │   ├── library/                  # Library mode components
│   │   │   ├── IconLibrary.tsx       # Library main component
│   │   │   ├── LibraryFilters.tsx    # Filter controls (category, belt, etc.)
│   │   │   ├── TermDetail.tsx        # Detailed term view modal
│   │   │   └── LibraryGrid.tsx       # Icon grid display
│   │   │
│   │   └── dashboard/                # Dashboard/stats components
│   │       ├── Dashboard.tsx         # Main dashboard layout
│   │       ├── StatsOverview.tsx     # Statistics summary cards
│   │       ├── ProgressChart.tsx     # Progress visualization chart
│   │       ├── BadgeDisplay.tsx      # Achievement badge display
│   │       └── StreakCounter.tsx     # Daily streak counter
│   │
│   ├── pages/                        # Route page components
│   │   ├── HomePage.tsx              # Landing/menu page
│   │   ├── LearningPage.tsx          # Learning mode page (belt selection)
│   │   ├── ReviewPage.tsx            # Review mode page
│   │   ├── LibraryPage.tsx           # Library/reference page
│   │   └── DashboardPage.tsx         # Dashboard/statistics page
│   │
│   ├── services/                     # Business logic services
│   │   ├── progressTracking.ts       # Progress calculation and tracking
│   │   ├── spacedRepetition.ts       # Leitner box algorithm implementation
│   │   ├── exerciseGenerator.ts      # Dynamic exercise generation (Phase 2)
│   │   ├── iconRenderer.ts           # Icon rendering utilities
│   │   ├── scoringSystem.ts          # XP and scoring calculations
│   │   ├── unlockSystem.ts           # Unit/belt unlock logic
│   │   └── achievementSystem.ts      # Badge/achievement checking logic
│   │
│   ├── utils/                        # Utility functions
│   │   ├── localStorage.ts           # localStorage wrapper functions
│   │   ├── dateHelpers.ts            # Date formatting and calculations
│   │   ├── arrayHelpers.ts           # Array manipulation utilities
│   │   ├── validators.ts             # Input validation functions
│   │   ├── constants.ts              # Application-wide constants
│   │   └── soundEffects.ts           # Sound effect utilities (Phase 2)
│   │
│   ├── data/                         # Static data files
│   │   │
│   │   ├── curriculum.ts             # Complete curriculum structure
│   │   │
│   │   ├── belts/                    # Belt-specific learning units
│   │   │   ├── white5Data.ts         # 5th kyu units and terminology
│   │   │   ├── white4Data.ts         # 4th kyu units and terminology
│   │   │   ├── white3Data.ts         # 3rd kyu units and terminology
│   │   │   ├── white2Data.ts         # 2nd kyu units and terminology
│   │   │   ├── white1Data.ts         # 1st kyu units and terminology
│   │   │   ├── black1Data.ts         # 1st dan units (Phase 2+)
│   │   │   ├── black2Data.ts         # 2nd dan units (Phase 3+)
│   │   │   └── ...                   # Additional dan levels
│   │   │
│   │   ├── icons/                    # Icon definitions by category
│   │   │   ├── index.ts              # Re-export all icon collections
│   │   │   ├── stancesIcons.ts       # Position/stance icons (seiza, hanmi, etc.)
│   │   │   ├── movementsIcons.ts     # Movement icons (irimi, tenkan, etc.)
│   │   │   ├── techniquesIcons.ts    # Technique icons (ikkyo, nikyo, etc.)
│   │   │   ├── weaponsIcons.ts       # Weapon icons (bokken, jo, tanto)
│   │   │   ├── fallsIcons.ts         # Ukemi/fall icons
│   │   │   └── etiquetteIcons.ts     # Etiquette icons (rei, dojo rules)
│   │   │
│   │   └── achievements.ts           # Achievement/badge definitions
│   │
│   └── assets/                       # Static asset files
│       ├── icons/                    # SVG icon files
│       │   ├── stances/              # Stance SVG icons
│       │   ├── movements/            # Movement SVG icons
│       │   └── techniques/           # Technique SVG icons
│       ├── videos/                   # Demo video files (Phase 2)
│       │   ├── seiza-demo.mp4
│       │   └── ...
│       └── sounds/                   # Sound effect files (Phase 2)
│           ├── correct.mp3
│           ├── incorrect.mp3
│           └── ...
│
├── tests/                            # Test files
│   ├── unit/                         # Unit tests
│   │   ├── components/               # Component tests
│   │   │   ├── IconRenderer.test.tsx
│   │   │   └── ...
│   │   ├── services/                 # Service tests
│   │   │   ├── spacedRepetition.test.ts
│   │   │   └── ...
│   │   └── utils/                    # Utility tests
│   │       ├── localStorage.test.ts
│   │       └── ...
│   ├── integration/                  # Integration tests
│   │   └── unitCompletion.test.tsx
│   └── e2e/                          # E2E tests (Cypress/Playwright)
│       └── learningFlow.spec.ts
│
├── .github/                          # GitHub configuration
│   └── workflows/                    # GitHub Actions workflows
│       ├── deploy.yml                # Deployment workflow
│       └── test.yml                  # Testing workflow
│
├── .env.example                      # Environment variables template
├── .eslintrc.js                      # ESLint configuration
├── .prettierrc                       # Prettier configuration
├── .gitignore                        # Git ignore rules
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # NPM dependencies and scripts
├── package-lock.json                 # NPM dependency lock file
├── Dockerfile                        # Docker image configuration
├── docker-compose.yml                # Docker compose configuration (Phase 2)
├── nginx.conf                        # Nginx server configuration
├── netlify.toml                      # Netlify deployment configuration
├── README.md                         # Project documentation
├── SPECIFICATIONS.md                 # Detailed project specifications
├── ARCHITECTURE.md                   # Technical architecture documentation
├── PROJECT_STRUCTURE.md              # This file
└── CHANGELOG.md                      # Version history and changes
```

## Priority Files for Phase 1 (MVP)

### Week 1-2: Foundation

**Must Create**:
1. ✅ `package.json` - Initialize with dependencies
2. ✅ `tsconfig.json` - TypeScript strict configuration
3. ✅ `src/theme.ts` - MUI theme
4. ✅ All files in `src/types/` - Type system foundation
5. ✅ `src/utils/constants.ts` - Application constants
6. ✅ `src/utils/localStorage.ts` - Storage utilities
7. ✅ `src/App.tsx` - Root component with routing
8. ✅ `src/index.tsx` - React entry point

**Can Defer**:
- Test files (create alongside features)
- Phase 2 components (review, library advanced features)
- Backend integration files

### Week 3-4: Core Components

**Must Create**:
1. ✅ `src/contexts/ProgressContext.tsx`
2. ✅ `src/contexts/UnitSessionContext.tsx`
3. ✅ `src/services/progressTracking.ts`
4. ✅ `src/services/spacedRepetition.ts`
5. ✅ `src/components/icons/IconRenderer.tsx`
6. ✅ `src/components/icons/CompositeIcon.tsx`
7. ✅ `src/components/common/ProgressBar.tsx`
8. ✅ `src/components/common/HeartDisplay.tsx`
9. ✅ `src/components/learning/LearningUnit.tsx`
10. ✅ `src/components/learning/ExerciseRenderer.tsx`
11. ✅ 4 priority exercise components (TermToIcon, IconToTerm, Safety, FreeRecall)

### Week 5-6: Content & Pages

**Must Create**:
1. ✅ `src/data/belts/white5Data.ts` - First 3 units
2. ✅ `src/data/icons/stancesIcons.ts`
3. ✅ `src/data/icons/movementsIcons.ts`
4. ✅ `src/data/icons/etiquetteIcons.ts`
5. ✅ `src/data/curriculum.ts`
6. ✅ `src/pages/HomePage.tsx`
7. ✅ `src/pages/LearningPage.tsx`
8. ✅ `src/components/navigation/BeltProgressList.tsx`
9. ✅ `src/components/learning/UnitCompletion.tsx`

## File Size Guidelines

| File Type | Recommended Max | Absolute Max |
|-----------|-----------------|--------------|
| Component | 200 lines | 300 lines |
| Service | 300 lines | 500 lines |
| Data file | 500 lines | 1000 lines |
| Utility | 150 lines | 200 lines |

**Reason**: Files larger than these limits should be split into smaller, focused modules.

## Import Path Aliases

Configure `tsconfig.json` with path aliases for clean imports:

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"],
      "@/components/*": ["components/*"],
      "@/types/*": ["types/*"],
      "@/services/*": ["services/*"],
      "@/utils/*": ["utils/*"],
      "@/data/*": ["data/*"],
      "@/hooks/*": ["hooks/*"],
      "@/contexts/*": ["contexts/*"]
    }
  }
}
```

**Usage**:
```typescript
// Instead of: import { IconRenderer } from '../../../components/icons/IconRenderer'
import { IconRenderer } from '@/components/icons/IconRenderer';

// Instead of: import type { Exercise } from '../../types/ExerciseTypes'
import type { Exercise } from '@/types';
```

## File Creation Order (Optimal)

### 1. Type System (Day 1-2)
```
src/types/AikidoTypes.ts
src/types/ExerciseTypes.ts
src/types/ProgressTypes.ts
src/types/IconTypes.ts
src/types/UtilityTypes.ts
src/types/index.ts
```

### 2. Utilities & Constants (Day 2-3)
```
src/utils/constants.ts
src/utils/localStorage.ts
src/utils/dateHelpers.ts
src/utils/arrayHelpers.ts
```

### 3. Services (Day 3-5)
```
src/services/progressTracking.ts
src/services/spacedRepetition.ts
src/services/scoringSystem.ts
src/services/unlockSystem.ts
```

### 4. Contexts (Day 5-6)
```
src/contexts/ProgressContext.tsx
src/contexts/UnitSessionContext.tsx
```

### 5. Common Components (Day 7-9)
```
src/components/common/ProgressBar.tsx
src/components/common/HeartDisplay.tsx
src/components/common/StatCard.tsx
src/components/common/LoadingSpinner.tsx
```

### 6. Icon System (Day 9-11)
```
src/components/icons/EmojiIcon.tsx
src/components/icons/SvgIcon.tsx
src/components/icons/CompositeIcon.tsx
src/components/icons/IconRenderer.tsx
src/components/icons/IconCard.tsx
```

### 7. Exercise Components (Day 11-18)
```
src/components/exercises/ExerciseContainer.tsx
src/components/exercises/TermToIconExercise.tsx
src/components/exercises/IconToTermExercise.tsx
src/components/exercises/SafetyQuizExercise.tsx
src/components/exercises/FreeRecallExercise.tsx
```

### 8. Learning Components (Day 18-22)
```
src/components/learning/ExerciseRenderer.tsx
src/components/learning/ExerciseResult.tsx
src/components/learning/HintDisplay.tsx
src/components/learning/UnitCompletion.tsx
src/components/learning/LearningUnit.tsx
```

### 9. Navigation (Day 22-24)
```
src/components/navigation/UnitCard.tsx
src/components/navigation/BeltSection.tsx
src/components/navigation/BeltProgressList.tsx
src/components/navigation/NavigationMenu.tsx
```

### 10. Pages (Day 24-26)
```
src/pages/HomePage.tsx
src/pages/LearningPage.tsx
```

### 11. Data (Day 26-30)
```
src/data/icons/stancesIcons.ts
src/data/icons/movementsIcons.ts
src/data/icons/etiquetteIcons.ts
src/data/icons/index.ts
src/data/belts/white5Data.ts
src/data/curriculum.ts
```

### 12. Root Setup (Day 30)
```
src/theme.ts
src/App.tsx
src/index.tsx
```

## Checklist for File Completion

Each file should have:

- [ ] File header comment explaining purpose
- [ ] All imports organized (external, types, components, utils)
- [ ] TypeScript types/interfaces defined
- [ ] Main implementation
- [ ] Exports (named exports preferred)
- [ ] JSDoc comments for public APIs
- [ ] Unit test file created (or planned)

## Example File Template

```typescript
/**
 * ComponentName.tsx
 *
 * Brief description of what this component does.
 * Used by: [list parent components]
 * Dependencies: [list key dependencies]
 */

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

import type { SomeType } from '@/types';
import { SomeComponent } from '@/components/common';
import { someUtility } from '@/utils/helpers';

interface ComponentNameProps {
  /** Prop description */
  prop1: string;
  /** Optional prop description */
  prop2?: number;
  /** Callback description */
  onAction: (id: string) => void;
}

/**
 * ComponentName component
 *
 * Detailed description if needed.
 *
 * @example
 * ```tsx
 * <ComponentName prop1="value" onAction={handleAction} />
 * ```
 */
export const ComponentName: React.FC<ComponentNameProps> = ({
  prop1,
  prop2 = 0,
  onAction,
}) => {
  // Component implementation

  return (
    <Box>
      <Typography>{prop1}</Typography>
    </Box>
  );
};
```

---

This structure provides a clear roadmap for creating all project files in the optimal order, ensuring dependencies are satisfied and the project builds incrementally.
