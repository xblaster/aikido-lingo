# Aikido Lingo - Quick Reference Card

A condensed reference for common patterns, APIs, and implementation details.

## Core Type Reference

### TerminologyItem
```typescript
{
  id: string;              // Unique identifier
  japanese: string;        // Japanese term
  romaji: string;          // Romanization
  french: string;          // French translation
  english: string;         // English translation
  iconType: 'svg' | 'emoji' | 'composite';
  iconData: IconData;
  iconCaption: string;     // Descriptive subtitle
  category: TechniqueCategory;
  beltLevel: BeltLevel;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  keywords: string[];
  relatedTerms: string[];
}
```

### Exercise
```typescript
{
  id: string;
  type: ExerciseType;      // 'term_to_icon' | 'icon_to_term' | etc.
  question: string;
  terminologyItem: TerminologyItem;
  options?: ExerciseOption[];
  correctAnswer: string;
  hint?: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedTime: number;   // Seconds
}
```

### UserProgress
```typescript
{
  currentBeltLevel: BeltLevel;
  completedUnits: string[];
  unlockedUnits: string[];
  stats: UserStats;
  practiceLog: PracticeSession[];
  spacedRepetitionData: SpacedRepetitionData;
  safetyChecklist: Record<string, boolean>;
  createdAt: string;
  lastUpdated: string;
}
```

## Essential Constants

```typescript
// From @/utils/constants

MAX_HEARTS = 5
MIN_PASSING_SCORE = 80
BASE_XP_PER_UNIT = 100

LEITNER_INTERVALS = {
  1: 1,   // 1 day
  2: 3,   // 3 days
  3: 7,   // 7 days
  4: 14,  // 14 days
  5: 30   // 30 days
}

ICON_SIZES = {
  small: 48,
  medium: 96,
  large: 144
}

STORAGE_KEYS = {
  PROGRESS: 'aikido-lingo-progress',
  SETTINGS: 'aikido-lingo-settings',
  CACHE: 'aikido-lingo-cache'
}
```

## Common Hooks

### useProgress
```typescript
const {
  progress,              // Current user progress
  updateProgress,        // Update progress
  completeUnit,          // Mark unit as complete
  unlockUnit,            // Unlock a unit
  achievements,          // User achievements
  addXp                  // Add XP
} = useProgress();
```

### useUnitSession
```typescript
const {
  session,              // Current session state
  startSession,         // Start new session
  submitExercise,       // Submit exercise result
  endSession,           // End session
  currentExercise,      // Current exercise
  hearts,               // Remaining hearts
  progress              // Session progress %
} = useUnitSession();
```

## Service Functions

### Progress Tracking
```typescript
import {
  initializeProgress,
  calculateXpGain,
  calculateAccuracy,
  updateStreak,
  createPracticeSession
} from '@/services/progressTracking';

// Initialize new user
const progress = initializeProgress();

// Calculate XP from results
const xp = calculateXpGain(score, results);

// Calculate accuracy
const accuracy = calculateAccuracy(results);
```

### Spaced Repetition
```typescript
import {
  initializeTerm,
  updateTermAfterReview,
  getTermsDueForReview,
  getReviewStats
} from '@/services/spacedRepetition';

// Add term to system
const box = initializeTerm('seiza');

// Update after review
const updated = updateTermAfterReview(box, isCorrect);

// Get terms due today
const dueTerms = getTermsDueForReview(spacedRepData);
```

### Unlock System
```typescript
import {
  isUnitUnlocked,
  isBeltUnlocked,
  getNextUnlockableUnits
} from '@/services/unlockSystem';

// Check if unit is unlocked
if (isUnitUnlocked(unitId, progress, curriculum)) {
  // Allow access
}

// Get next units that can be unlocked
const nextUnits = getNextUnlockableUnits(progress, curriculum);
```

## Component Patterns

### Exercise Component Template
```typescript
interface ExerciseProps {
  exercise: Exercise;
  onComplete: (result: ExerciseResult) => void;
}

export const MyExercise: React.FC<ExerciseProps> = ({
  exercise,
  onComplete
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [startTime] = useState(Date.now());

  const handleSubmit = () => {
    const result: ExerciseResult = {
      exerciseId: exercise.id,
      isCorrect: selected === exercise.correctAnswer,
      timeSpent: Date.now() - startTime,
      attempts: 1,
      timestamp: new Date().toISOString(),
      userAnswer: selected!,
      correctAnswer: exercise.correctAnswer,
      hintsUsed: 0,
    };
    onComplete(result);
  };

  return (
    <Box>
      {/* Exercise UI */}
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};
```

### Icon Rendering
```typescript
import { IconRenderer } from '@/components/icons/IconRenderer';

<IconRenderer
  iconData={term.iconData}
  caption={term.iconCaption}
  size="medium"
  showCaption={true}
/>
```

### Using MUI Theme
```typescript
import { useTheme } from '@mui/material/styles';

const theme = useTheme();

<Box
  sx={{
    color: 'primary.main',           // Theme primary color
    bgcolor: 'background.paper',     // Theme background
    p: 2,                            // padding: theme.spacing(2)
    borderRadius: 2,                 // theme.shape.borderRadius * 2
    [theme.breakpoints.up('md')]: {  // Media query
      p: 3
    }
  }}
>
```

## localStorage Operations

```typescript
import {
  saveProgress,
  loadProgress,
  clearAllData,
  exportData,
  importData
} from '@/utils/localStorage';

// Save progress
saveProgress(userProgress);

// Load progress
const saved = loadProgress();

// Export all data (for backup)
const json = exportData();

// Import data
const success = importData(jsonString);

// Clear everything (reset)
clearAllData();
```

## Icon Definition Examples

### Emoji Icon
```typescript
const icon: IconData = {
  type: 'emoji',
  emoji: '🧎'
};
```

### SVG Icon
```typescript
const icon: IconData = {
  type: 'svg',
  svgPath: '/assets/icons/seiza.svg',
  color: '#1976d2'
};
```

### Composite Icon
```typescript
const icon: IconData = {
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
      direction: 'right',
      position: { x: 70, y: 50 },
      color: '#c62828',
      size: 20
    }
  ]
};
```

## Exercise Type Quick Reference

| Type | Description | Priority | Phase |
|------|-------------|----------|-------|
| `term_to_icon` | Given term, choose icon | High | MVP |
| `icon_to_term` | Given icon, choose term | High | MVP |
| `safety_quiz` | Safety MCQ | High | MVP |
| `free_recall` | Flashcard recall | High | MVP |
| `icon_matching` | Drag-drop matching | Medium | Phase 2 |
| `video_observation` | Watch video, identify | Medium | Phase 2 |
| `position_identification` | Identify in context | Low | Phase 2 |
| `sequence_ordering` | Order technique steps | Low | Phase 2 |

## Navigation Paths

```typescript
// Routes
'/'                    // HomePage
'/learning'            // LearningPage (belt selection)
'/learning/:unitId'    // LearningUnit (active session)
'/review'              // ReviewPage (Phase 2)
'/library'             // LibraryPage (Phase 2)
'/dashboard'           // DashboardPage (Phase 2)

// Programmatic navigation
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/learning/white5_unit1');
```

## Styling Patterns

### Common sx Props
```typescript
// Flexbox
sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}

// Grid
sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}

// Spacing
sx={{ p: 2, m: 1, px: 3, py: 1, mb: 2 }}

// Typography
sx={{ fontSize: 16, fontWeight: 600, textAlign: 'center' }}

// Colors
sx={{ color: 'primary.main', bgcolor: 'background.paper' }}

// Borders
sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}

// Responsive
sx={{
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '50%'
  }
}}
```

## Error Handling

### Try-Catch Pattern
```typescript
try {
  const data = loadProgress();
  if (!data) {
    // Handle null case
    return initializeProgress();
  }
  return data;
} catch (error) {
  console.error('Failed to load progress:', error);
  return initializeProgress();
}
```

### Error Boundary
```typescript
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

<ErrorBoundary fallback={<div>Error loading component</div>}>
  <MyComponent />
</ErrorBoundary>
```

## Testing Quick Reference

### Component Test
```typescript
import { render, screen, fireEvent } from '@testing-library/react';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent prop="value" />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('handles click', () => {
    const handleClick = jest.fn();
    render(<MyComponent onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Service Test
```typescript
import { myFunction } from './myService';

describe('myFunction', () => {
  it('returns expected value', () => {
    const result = myFunction(input);
    expect(result).toBe(expected);
  });

  it('handles edge case', () => {
    const result = myFunction(null);
    expect(result).toBeDefined();
  });
});
```

## Performance Tips

### Memoization
```typescript
import { useMemo, useCallback, memo } from 'react';

// Memoize expensive calculation
const sortedTerms = useMemo(() => {
  return terms.sort((a, b) => a.japanese.localeCompare(b.japanese));
}, [terms]);

// Memoize callback
const handleClick = useCallback((id: string) => {
  // Handler logic
}, [dependencies]);

// Memoize component
export const MyComponent = memo<Props>(({ data }) => {
  // Component logic
});
```

### Code Splitting
```typescript
import { lazy, Suspense } from 'react';

const LibraryPage = lazy(() => import('./pages/LibraryPage'));

<Suspense fallback={<LoadingSpinner />}>
  <LibraryPage />
</Suspense>
```

## Debug Helpers

### Console Logging
```typescript
// Progress state
console.log('Progress:', JSON.stringify(progress, null, 2));

// Exercise data
console.table(exercises.map(e => ({
  id: e.id,
  type: e.type,
  difficulty: e.difficulty
})));

// Performance timing
console.time('operation');
// ... code ...
console.timeEnd('operation');
```

### localStorage Inspection
```javascript
// Browser DevTools Console
localStorage.getItem('aikido-lingo-progress')

// View formatted
JSON.parse(localStorage.getItem('aikido-lingo-progress'))

// Clear specific key
localStorage.removeItem('aikido-lingo-progress')

// Clear all
localStorage.clear()
```

## Common Commands

```bash
# Development
npm start                 # Start dev server (localhost:3000)
npm test                  # Run tests
npm run build            # Production build
npm run lint             # Run ESLint
npm run format           # Run Prettier

# Git
git status
git add .
git commit -m "feat: Add feature"
git push origin main

# Deployment (Netlify)
npm run build
netlify deploy --prod
```

## Keyboard Shortcuts (Development)

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + S` | Save file |
| `Ctrl/Cmd + P` | Quick file open |
| `Ctrl/Cmd + Shift + P` | Command palette |
| `F12` | Open DevTools |
| `Ctrl/Cmd + Shift + I` | Open DevTools |
| `Ctrl/Cmd + K + 0` | Collapse all code |
| `Ctrl/Cmd + K + J` | Expand all code |

## File Import Cheat Sheet

```typescript
// Types
import type { Exercise, UserProgress } from '@/types';

// Components
import { IconRenderer } from '@/components/icons/IconRenderer';
import { ProgressBar } from '@/components/common/ProgressBar';

// Hooks
import { useProgress } from '@/contexts/ProgressContext';
import { useNavigate } from 'react-router-dom';

// Services
import { calculateXpGain } from '@/services/progressTracking';

// Utils
import { saveProgress } from '@/utils/localStorage';
import { BELT_COLORS } from '@/utils/constants';

// Data
import { curriculum } from '@/data/curriculum';
import { stancesIcons } from '@/data/icons/stancesIcons';

// MUI
import { Box, Typography, Button, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
```

## Priority Order for MVP

1. ✅ Type system (`src/types/`)
2. ✅ Constants & utilities (`src/utils/`)
3. ✅ Services (`src/services/`)
4. ✅ Theme (`src/theme.ts`)
5. ✅ Contexts (`src/contexts/`)
6. ✅ Common components (`src/components/common/`)
7. ✅ Icon system (`src/components/icons/`)
8. ✅ Exercise components (4 types for MVP)
9. ✅ Learning components (`src/components/learning/`)
10. ✅ Navigation components (`src/components/navigation/`)
11. ✅ Icon data (`src/data/icons/`)
12. ✅ Unit 1-3 data (`src/data/belts/white5Data.ts`)
13. ✅ Curriculum (`src/data/curriculum.ts`)
14. ✅ Pages (`src/pages/`)
15. ✅ App & routing (`src/App.tsx`)

---

Keep this reference handy while developing. For detailed explanations, refer to:
- **ARCHITECTURE.md** - Complete technical architecture
- **IMPLEMENTATION_GUIDE.md** - Step-by-step implementation
- **PROJECT_STRUCTURE.md** - File organization details
- **SPECIFICATIONS.md** - Product requirements
