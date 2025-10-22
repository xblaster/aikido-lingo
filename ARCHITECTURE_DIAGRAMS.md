# Aikido Lingo - Architecture Diagrams

Visual representations of system architecture, data flow, and component relationships.

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                           USER INTERFACE                            │
│                     (Browser / Mobile Device)                       │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        REACT APPLICATION                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │   Learning   │  │   Review     │  │   Library    │             │
│  │   Mode       │  │   Mode       │  │   Mode       │             │
│  └──────────────┘  └──────────────┘  └──────────────┘             │
│                                                                     │
│  ┌─────────────────────── Component Layer ───────────────────┐    │
│  │  Exercise Components  │  Navigation  │  Common Components │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                     │
│  ┌─────────────────────── State Management ───────────────────┐    │
│  │  ProgressContext  │  UnitSessionContext  │  Local State   │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                     │
│  ┌─────────────────────── Service Layer ──────────────────────┐    │
│  │  Progress  │  Spaced Repetition  │  Unlock  │  Scoring    │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                     │
│  ┌─────────────────────── Data Layer ─────────────────────────┐    │
│  │  Curriculum Data  │  Icon Definitions  │  Achievements     │    │
│  └─────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      PERSISTENCE LAYER                              │
│  ┌──────────────┐           ┌──────────────┐                       │
│  │ localStorage │           │   API Server │  (Phase 2)            │
│  │  (Phase 1)   │           │   (Optional) │                       │
│  └──────────────┘           └──────────────┘                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
│
├── ThemeProvider
│   └── CssBaseline
│
├── ProgressProvider
│   │
│   ├── UnitSessionProvider
│   │   │
│   │   └── BrowserRouter
│   │       │
│   │       └── Routes
│   │           │
│   │           ├── HomePage
│   │           │   ├── NavigationMenu
│   │           │   │   ├── MenuCard (x4)
│   │           │   │   │   └── CardActionArea
│   │           │   ├── ProgressSummary
│   │           │   │   └── ProgressBar
│   │           │   └── QuickStats
│   │           │       └── StatCard (x3)
│   │           │
│   │           ├── LearningPage
│   │           │   └── BeltProgressList
│   │           │       ├── BeltSection (multiple)
│   │           │       │   ├── BeltHeader
│   │           │       │   └── UnitCard (multiple)
│   │           │       │       ├── IconRenderer
│   │           │       │       ├── ProgressBar
│   │           │       │       └── LockIcon (conditional)
│   │           │       └── ProgressBar (overall)
│   │           │
│   │           ├── LearningUnit (/:unitId)
│   │           │   ├── Header
│   │           │   │   ├── BackButton
│   │           │   │   ├── UnitTitle
│   │           │   │   └── HeartDisplay
│   │           │   ├── ProgressBar
│   │           │   ├── ExerciseRenderer
│   │           │   │   ├── TermToIconExercise
│   │           │   │   │   ├── QuestionDisplay
│   │           │   │   │   ├── TermCard
│   │           │   │   │   ├── OptionGrid
│   │           │   │   │   │   └── IconCard (x4)
│   │           │   │   │   │       └── IconRenderer
│   │           │   │   │   ├── HintDisplay (conditional)
│   │           │   │   │   └── SubmitButton
│   │           │   │   │
│   │           │   │   ├── IconToTermExercise
│   │           │   │   ├── SafetyQuizExercise
│   │           │   │   └── FreeRecallExercise
│   │           │   │
│   │           │   └── UnitCompletion (conditional)
│   │           │       ├── ResultHeader
│   │           │       ├── ScoreDisplay
│   │           │       ├── StarsDisplay
│   │           │       ├── StatsOverview
│   │           │       │   └── StatCard (x3)
│   │           │       ├── TermsSummary
│   │           │       │   ├── MasteredTerms
│   │           │       │   └── ReviewTerms
│   │           │       └── ActionButtons
│   │           │           ├── ContinueButton
│   │           │           └── RetryButton
│   │           │
│   │           ├── ReviewPage (Phase 2)
│   │           ├── LibraryPage (Phase 2)
│   │           └── DashboardPage (Phase 2)
```

## Data Flow - Exercise Completion

```
User Answers Exercise
         │
         ▼
┌─────────────────────┐
│ Exercise Component  │  (e.g., TermToIconExercise)
│ - Validates answer  │
│ - Calculates time   │
│ - Creates result    │
└─────────────────────┘
         │
         │ ExerciseResult
         ▼
┌─────────────────────┐
│ UnitSessionContext  │
│ - Updates session   │
│ - Decrements hearts │
│ - Calculates score  │
│ - Checks completion │
└─────────────────────┘
         │
         │ If unit complete
         ▼
┌─────────────────────┐
│  ProgressContext    │
│ - Adds XP           │
│ - Marks complete    │
│ - Unlocks next unit │
│ - Updates stats     │
│ - Creates session   │
└─────────────────────┘
         │
         │ UserProgress
         ▼
┌─────────────────────┐
│   localStorage      │
│ - Saves progress    │
│ - Persists state    │
└─────────────────────┘
```

## State Management Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    APPLICATION STATE                       │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────────────────────────────────────────────┐     │
│  │           ProgressContext (Global)               │     │
│  │  ┌────────────────────────────────────────────┐  │     │
│  │  │ State:                                     │  │     │
│  │  │  - currentBeltLevel                        │  │     │
│  │  │  - completedUnits[]                        │  │     │
│  │  │  - unlockedUnits[]                         │  │     │
│  │  │  - stats { totalXp, accuracy, streak }    │  │     │
│  │  │  - practiceLog[]                           │  │     │
│  │  │  - spacedRepetitionData                    │  │     │
│  │  └────────────────────────────────────────────┘  │     │
│  │  ┌────────────────────────────────────────────┐  │     │
│  │  │ Actions:                                   │  │     │
│  │  │  - updateProgress()                        │  │     │
│  │  │  - completeUnit()                          │  │     │
│  │  │  - unlockUnit()                            │  │     │
│  │  │  - addXp()                                 │  │     │
│  │  └────────────────────────────────────────────┘  │     │
│  └──────────────────────────────────────────────────┘     │
│                                                            │
│  ┌──────────────────────────────────────────────────┐     │
│  │        UnitSessionContext (Session)              │     │
│  │  ┌────────────────────────────────────────────┐  │     │
│  │  │ State:                                     │  │     │
│  │  │  - currentExerciseIndex                    │  │     │
│  │  │  - completedExercises[]                    │  │     │
│  │  │  - hearts (0-5)                            │  │     │
│  │  │  - score (%)                               │  │     │
│  │  │  - isCompleted                             │  │     │
│  │  └────────────────────────────────────────────┘  │     │
│  │  ┌────────────────────────────────────────────┐  │     │
│  │  │ Actions:                                   │  │     │
│  │  │  - startSession()                          │  │     │
│  │  │  - submitExercise()                        │  │     │
│  │  │  - endSession()                            │  │     │
│  │  └────────────────────────────────────────────┘  │     │
│  └──────────────────────────────────────────────────┘     │
│                                                            │
│  ┌──────────────────────────────────────────────────┐     │
│  │         Component Local State                    │     │
│  │  - Form inputs                                   │     │
│  │  - UI toggles (modals, dropdowns)               │     │
│  │  - Animation states                              │     │
│  │  - Temporary selections                          │     │
│  └──────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────┘
```

## Icon Rendering System

```
IconRenderer (Factory Component)
         │
         │ Analyzes iconData.type
         ├─────────┬─────────┬─────────┐
         │         │         │         │
         ▼         ▼         ▼         │
    ┌────────┐ ┌──────┐ ┌──────────┐  │
    │ Emoji  │ │ SVG  │ │Composite │  │
    │ Icon   │ │ Icon │ │  Icon    │  │
    └────────┘ └──────┘ └──────────┘  │
         │         │         │         │
         │         │         ├─────────┤
         │         │         │         │
         │         │         ▼         │
         │         │    ┌──────────────┴────┐
         │         │    │ Element Renderers │
         │         │    ├───────────────────┤
         │         │    │ - ShapeRenderer   │
         │         │    │ - ArrowRenderer   │
         │         │    │ - LineRenderer    │
         │         │    │ - TextRenderer    │
         │         │    └───────────────────┘
         │         │         │
         └─────────┴─────────┘
                   │
                   ▼
         ┌─────────────────┐
         │  Rendered Icon  │
         │  with Caption   │
         └─────────────────┘
```

## Spaced Repetition Flow (Leitner System)

```
New Term Added
      │
      ▼
┌──────────┐     Correct      ┌──────────┐     Correct      ┌──────────┐
│  Box 1   │ ─────────────▶  │  Box 2   │ ─────────────▶  │  Box 3   │
│ (1 day)  │                  │ (3 days) │                  │ (7 days) │
└──────────┘                  └──────────┘                  └──────────┘
      ▲                             ▲                             │
      │                             │                             │
      │      Incorrect              │      Incorrect              │ Correct
      └─────────────────────────────┴─────────────────────────────┤
                                                                   ▼
                                                            ┌──────────┐
┌──────────┐                                                │  Box 4   │
│  Box 5   │ ◀────────────────  Correct  ─────────────────│(14 days) │
│(30 days) │                                               └──────────┘
│ MASTERED │                                                     │
└──────────┘                                                     │
      ▲                                                          │
      │                    Incorrect                             │
      └──────────────────────────────────────────────────────────┘

Review Schedule:
- Box 1: Every 1 day
- Box 2: Every 3 days
- Box 3: Every 7 days
- Box 4: Every 14 days
- Box 5: Every 30 days (Mastered)

On Incorrect: Always return to Box 1
On Correct: Move up one box (max Box 5)
```

## Unit Unlock Logic

```
User Completes Unit
         │
         ▼
    Calculate Score
         │
         ├─── Score < 80% ────▶ Fail ────▶ Can Retry
         │
         └─── Score ≥ 80% ────▶ Pass
                                  │
                                  ▼
                           Mark Unit Complete
                                  │
                                  ▼
                           Award XP + Bonuses
                           (Base: 100 XP)
                           (High Score: +50)
                           (Perfect: +25)
                           (Fast: +25)
                                  │
                                  ▼
                           Check Next Unit
                                  │
                 ┌────────────────┴────────────────┐
                 ▼                                 ▼
        Prerequisites Met?                Prerequisites Not Met
                 │                                 │
                 │ Yes                             │ No
                 ▼                                 ▼
           Unlock Next Unit                   Remain Locked
                 │
                 ▼
        Check Belt Completion
                 │
         ┌───────┴───────┐
         ▼               ▼
    All Units        Some Units
    Complete         Remaining
         │               │
         ▼               └─── Continue Current Belt
    Unlock Next Belt
```

## Exercise Type Decision Tree

```
Exercise Type Selection
         │
         ├─── Visual Recognition ───┬─── term_to_icon
         │                          └─── icon_to_term
         │
         ├─── Memory Recall ────────┬─── free_recall (flashcard)
         │                          └─── icon_matching (drag-drop)
         │
         ├─── Contextual ───────────┬─── video_observation
         │                          └─── position_identification
         │
         ├─── Sequential ───────────── sequence_ordering
         │
         └─── Knowledge ────────────── safety_quiz

Priority for MVP:
1. term_to_icon      (Core - 30%)
2. icon_to_term      (Core - 30%)
3. free_recall       (Memory - 20%)
4. safety_quiz       (Required - 20%)

Phase 2 Addition:
5. icon_matching     (Engagement)
6. video_observation (Immersive)
7. position_identification (Advanced)
8. sequence_ordering (Complex)
```

## localStorage Structure

```
localStorage
├── 'aikido-lingo-progress'
│   └── {
│         version: "1.0",
│         timestamp: "2025-10-21T10:00:00Z",
│         data: {
│           currentBeltLevel: "white_5",
│           completedUnits: ["white5_unit1"],
│           unlockedUnits: ["white5_unit1", "white5_unit2"],
│           stats: {
│             totalXp: 450,
│             totalMinutes: 45,
│             unitsCompleted: 2,
│             accuracy: 87.5,
│             streak: 3,
│             categoryProgress: { ... }
│           },
│           practiceLog: [
│             {
│               date: "2025-10-21",
│               unitId: "white5_unit1",
│               duration: 15,
│               score: 90,
│               exercisesCompleted: 10,
│               termsReviewed: ["rei", "seiza", ...]
│             }
│           ],
│           spacedRepetitionData: {
│             boxes: {
│               "rei": {
│                 box: 3,
│                 lastReviewed: "2025-10-20T10:00:00Z",
│                 nextReview: "2025-10-27T10:00:00Z",
│                 consecutiveCorrect: 5,
│                 totalReviews: 8
│               }
│             }
│           },
│           safetyChecklist: {
│             "white5_unit4": true
│           }
│         }
│       }
│
├── 'aikido-lingo-settings'
│   └── {
│         soundEnabled: true,
│         language: "fr",
│         theme: "light"
│       }
│
└── 'aikido-lingo-cache'
    └── {
          lastFetch: "2025-10-21T10:00:00Z",
          curriculum: { ... }
        }
```

## Routing Architecture

```
URL Path                    Component               Context Required
────────────────────────────────────────────────────────────────────
/                          HomePage                 ProgressContext
                           ├─ NavigationMenu
                           ├─ ProgressSummary
                           └─ QuickStats

/learning                  LearningPage             ProgressContext
                           └─ BeltProgressList
                              ├─ BeltSection (x9)
                              └─ UnitCard (multiple)

/learning/:unitId          LearningUnit             ProgressContext
                           ├─ Header                UnitSessionContext
                           ├─ ExerciseRenderer
                           └─ UnitCompletion

/review                    ReviewPage               ProgressContext
(Phase 2)                  └─ Flashcard             (SpacedRepetitionData)

/library                   LibraryPage              None
(Phase 2)                  └─ IconLibrary           (Read-only)

/library/:termId           LibraryPage              None
(Phase 2)                  └─ TermDetail            (Read-only)

/dashboard                 DashboardPage            ProgressContext
(Phase 2)                  ├─ StatsOverview
                           ├─ ProgressChart
                           └─ BadgeDisplay
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Developer Machine                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Source Code (TypeScript, React, MUI)                │  │
│  └──────────────────────────────────────────────────────┘  │
│                            │                                │
│                            │ npm run build                  │
│                            ▼                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Production Build (Optimized JS, CSS, HTML)          │  │
│  │  - Minified                                           │  │
│  │  - Tree-shaken                                        │  │
│  │  - Code-split                                         │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ git push
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      GitHub Repository                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  main branch                                          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ webhook trigger
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      CI/CD (GitHub Actions)                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  1. Install dependencies                              │  │
│  │  2. Run tests                                         │  │
│  │  3. Build production                                  │  │
│  │  4. Deploy to Netlify                                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ deployment
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Netlify CDN                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Static Files                                         │  │
│  │  - index.html                                         │  │
│  │  - *.js bundles                                       │  │
│  │  - *.css stylesheets                                  │  │
│  │  - assets (icons, images)                            │  │
│  │                                                        │  │
│  │  Features:                                            │  │
│  │  - Global CDN distribution                            │  │
│  │  - HTTPS by default                                   │  │
│  │  - Automatic redirects for SPA                        │  │
│  │  - Custom domain support                              │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ https://aikido-lingo.app
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      End Users                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Desktop    │  │    Mobile    │  │    Tablet    │     │
│  │   Browser    │  │   Browser    │  │   Browser    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  PWA Features (Phase 2):                                   │
│  - Install to home screen                                  │
│  - Offline mode via Service Worker                         │
│  - Push notifications                                      │
└─────────────────────────────────────────────────────────────┘
```

## Performance Optimization Strategy

```
Load Time Optimization
├── Code Splitting
│   ├── Route-based splitting
│   │   └── Lazy load pages (Library, Dashboard)
│   └── Component-based splitting
│       └── Lazy load heavy components
│
├── Bundle Size Reduction
│   ├── Tree shaking
│   ├── Minification
│   └── Compression (gzip/brotli)
│
├── Asset Optimization
│   ├── Images
│   │   ├── WebP format
│   │   ├── Responsive sizes
│   │   └── Lazy loading
│   ├── Icons
│   │   ├── SVG instead of PNG
│   │   └── Inline critical icons
│   └── Fonts
│       ├── Font subsetting
│       └── Preload critical fonts
│
└── Caching Strategy
    ├── Static assets (1 year)
    ├── API responses (configurable)
    └── Service Worker cache (PWA)

Runtime Performance
├── React Optimizations
│   ├── React.memo for pure components
│   ├── useMemo for expensive calculations
│   ├── useCallback for stable functions
│   └── Virtual scrolling for long lists
│
├── State Management
│   ├── Local state over context when possible
│   ├── Selective re-renders
│   └── Batched updates
│
└── Event Handling
    ├── Debounce search inputs
    ├── Throttle scroll handlers
    └── Passive event listeners
```

---

These diagrams provide a comprehensive visual understanding of the Aikido Lingo architecture. Refer to ARCHITECTURE.md for detailed technical specifications.
