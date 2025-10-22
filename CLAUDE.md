# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Aikido Lingo** is a gamified learning platform for mastering Aikido terminology, inspired by Duolingo. It's a React TypeScript SPA with Material-UI components that teaches Japanese martial arts terms through interactive exercises with a visual icon system.

## Essential Commands

### Development
```bash
npm start          # Start dev server (localhost:3000)
npm run build      # Production build
npm test           # Run tests in watch mode
npm run format     # Format code with Prettier
npm run lint       # Lint TypeScript/TSX files
```

### Testing
```bash
npm test                           # Run all tests in watch mode
npm test -- --coverage             # Run tests with coverage
npm test -- TermToIconExercise     # Run specific test file
```

## Architecture Overview

### Core Architectural Pattern

The application uses a **layered architecture** with clear separation of concerns:

```
Pages → Components → Services → Data
         ↓              ↓
      Contexts ← Storage Utils
```

**Key principle**: Business logic lives in services, not components. Components handle UI and delegate to services for state mutations and complex operations.

### TypeScript Path Aliases

All imports use `@/` aliases defined in `tsconfig.json`:

```typescript
import { TerminologyItem } from '@/types'
import { calculateScore } from '@/services/progressTracking'
import { IconRenderer } from '@/components/icons/IconRenderer'
```

**Never use relative imports** like `../../types`. Always use the `@/` prefix.

### State Management Strategy

**Global State** (ProgressContext):
- User progress (XP, completed units, unlocked units)
- Spaced repetition data (Leitner box system)
- Practice sessions and statistics
- Access via `useProgress()` hook

**Local State** (component useState):
- Current exercise state
- UI interactions (dialogs, animations)
- Form inputs

**Immutable Updates**: Always spread state when updating:
```typescript
const updatedProgress = { ...progress, stats: { ...progress.stats, totalXp: newXp } }
```

### Icon Rendering System

The application uses a **factory pattern** for rendering three types of icons:

1. **Emoji Icons**: Simple Unicode emojis (`🧎`, `🤸`, etc.)
2. **SVG Icons**: External or inline SVG graphics
3. **Composite Icons**: Programmatically generated from shape elements (circles, arrows, person figures)

The `IconRenderer` component dispatches to `EmojiIcon`, `SvgIcon`, or `CompositeIcon` based on `iconData.type`. All terminology items must have an `iconData` object.

### Exercise Flow

Each unit contains 8-15 exercises of 4 types:
1. **TermToIcon**: Given Japanese/Romaji term → select matching icon
2. **IconToTerm**: Given icon → select correct term
3. **SafetyQuiz**: Multiple choice safety questions (critical for martial arts)
4. **FreeRecall**: Flashcard-style recall (show term, reveal answer)

Exercises track:
- Correctness (`isCorrect`)
- Attempts before success
- Time spent
- Used for XP calculation and spaced repetition scheduling

### Spaced Repetition (Leitner System)

Implements a **5-box Leitner system** for long-term retention:
- Box 1: Review in 1 day
- Box 2: Review in 3 days
- Box 3: Review in 7 days
- Box 4: Review in 14 days
- Box 5: Review in 30 days

Correct answer → advance to next box
Incorrect answer → return to Box 1

Service: `src/services/spacedRepetition.ts`

### Progress Tracking

XP rewards defined in `src/utils/constants.ts`:
- Base unit completion: 100 XP
- High score bonus (90%+): 50 XP
- No errors bonus: 25 XP

Units require **80% score** to pass (defined as `TARGET_SCORE_PERCENTAGE`).

Unlock logic: Complete current unit → automatically unlock next unit (see `getNextUnitId` in `src/services/progressTracking.ts`).

### Storage Architecture

**Phase 1 (current)**: localStorage via `src/utils/progressStorage.ts`
- Auto-saves on every progress update (via useEffect in ProgressContext)
- JSON serialization of UserProgress type

**Phase 2 (planned)**: Backend API for cloud sync

## Data Structure

### Curriculum Organization

```
Curriculum
  └─ BeltSection (e.g., "5ème Kyū - White belt")
      └─ LearningUnit[] (e.g., "Unit 1: Dojo Etiquette")
          ├─ TerminologyItem[] (5-15 terms)
          └─ Exercise[] (8-12 exercises)
```

Data files:
- `src/data/curriculum.ts` - Master curriculum
- `src/data/belts/white5Unit1.ts` - Individual unit definitions
- `src/data/icons/*.ts` - Icon definitions by category

### Adding New Content

To add a new term or unit, follow the templates in `DATA_TEMPLATE.md`. Key steps:

1. Create `TerminologyItem` with icon data
2. Add to unit's terminology array
3. Generate exercises using the term
4. Update curriculum imports

Icon data must specify `type` ('emoji', 'svg', or 'composite') and corresponding data fields.

## Component Architecture

### Key Components

**Pages** (`src/pages/`):
- `HomePage.tsx` - Unit selection grid, progress dashboard
- `UnitPracticePage.tsx` - Exercise orchestration, hearts/lives system
- `CompletionPage.tsx` - Unit completion summary with XP rewards

**Exercise Components** (`src/components/exercises/`):
Each exercise type is self-contained with:
- Props: `exercise`, `onAnswer(isCorrect, attempts)`, `onNext()`
- State: Selected answer, validation, animations
- Emits events upward to `UnitPracticePage`

**Icon Components** (`src/components/icons/`):
- `IconRenderer.tsx` - Factory dispatcher
- `EmojiIcon.tsx`, `SvgIcon.tsx`, `CompositeIcon.tsx` - Specialized renderers

### Styling

Uses **Material-UI 7** with **Emotion** for CSS-in-JS. Theme defined in `src/theme.ts`.

Prefer MUI's `sx` prop over `styled()` for one-off styles:
```typescript
<Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
```

For reusable styles, use the theme:
```typescript
sx={{ color: 'primary.main', bgcolor: 'background.paper' }}
```

## Type System

All types defined in `src/types/`:
- `AikidoTypes.ts` - Core domain types (TerminologyItem, Exercise, Curriculum)
- `ProgressTypes.ts` - User progress and session tracking
- `index.ts` - Re-exports all types

**Strict mode enabled**: All functions must have explicit return types. No implicit `any`.

## Important Patterns

### Services Return New State

Services **never mutate** their inputs. They return new objects:

```typescript
// Good
export const completeUnit = (
  progress: UserProgress,
  unitId: string,
  unitProgress: UnitProgress
): UserProgress => {
  const updatedProgress = { ...progress }
  // ...mutations to updatedProgress
  return updatedProgress
}
```

### Context Consumers Use Custom Hooks

Never use `useContext(ProgressContext)` directly. Always use:
```typescript
const { progress, completeUnitWithProgress } = useProgress()
```

This enforces the invariant that ProgressContext is always available.

### Exercise Components Are Controlled

Exercise components don't manage completion state. Parent (`UnitPracticePage`) orchestrates:
1. Render current exercise
2. Receive `onAnswer` callback
3. Update hearts/score
4. Advance to next exercise

## Common Pitfalls

1. **Don't bypass services**: Don't manipulate `progress` object directly in components. Use service functions.
2. **Import from `@/types`, not `@/types/AikidoTypes`**: The barrel export in `index.ts` is the entry point.
3. **Icons must match type**: If `iconData.type === 'emoji'`, must have `iconData.emoji`. TypeScript will catch this but runtime will fail silently.
4. **localStorage limits**: UserProgress JSON can grow large. Monitor size if adding media URLs.

## File Naming Conventions

- Components: PascalCase (e.g., `IconRenderer.tsx`)
- Services/Utils: camelCase (e.g., `progressTracking.ts`)
- Types: PascalCase (e.g., `AikidoTypes.ts`)
- Data files: camelCase with descriptive suffix (e.g., `white5Unit1.ts`)

## Extending the App

### Adding a New Exercise Type

1. Define type in `ExerciseType` union (`src/types/AikidoTypes.ts`)
2. Create component in `src/components/exercises/`
3. Add exercise objects to unit data files
4. Update `UnitPracticePage` to render new type

### Adding a New Belt Level

1. Create unit files in `src/data/belts/` (e.g., `white4Unit1.ts`)
2. Add BeltSection to `aikidoCurriculum.belts` array
3. Update `getNextUnitId` logic in `progressTracking.ts` for unlock flow
4. Add belt level to `BeltLevel` type if needed

## Testing Philosophy

Tests should be written for:
- Service functions (pure logic, easy to test)
- Complex components with conditional rendering
- Icon rendering system (visual regression candidate)

Use React Testing Library conventions:
- Query by role/label, not test IDs
- Fire user events, not direct function calls
- Assert on rendered output, not internal state
