# Aikido Lingo - Curriculum Implementation Guide

## Quick Start for Adding New Units

This guide provides step-by-step instructions for implementing the remaining 27 curriculum units following the established patterns.

---

## Overview

**Current Status**:
- ✅ 6 units completed (examples for white 5, white 4, yellow 3)
- 📋 27 units remaining
- ✅ Complete curriculum design documented
- ✅ All patterns and templates established

**Implementation Time**:
- Per unit: 2.5-3.5 hours
- Total remaining: ~67-95 hours
- At 5 units/week: 5-6 weeks to completion

---

## Step-by-Step Unit Creation

### Step 1: Choose Your Unit

Follow the recommended implementation order from CURRICULUM_SUMMARY.md:

**Priority Order**:
1. Complete White 5 (unit 5 remaining)
2. Complete White 4 (units 2-5)
3. Complete Yellow 3 (units 2-6)
4. Complete Yellow 2 (units 1-6)
5. Complete Orange 1 (units 1-6)
6. Complete Black 1 (units 1-5)

### Step 2: Create Unit File

```bash
# Example: Creating white 5 unit 5
touch src/data/belts/white5Unit5.ts
```

### Step 3: Copy Base Template

Use this template structure (see working examples in existing units):

```typescript
/**
 * Unit [Number]: [Title] ([Belt Level])
 * [Brief description]
 */

import { TerminologyItem, LearningUnit, Exercise } from '@/types'

/** Terminology items for [Unit Name] */
export const [unitName]Terminology: TerminologyItem[] = [
  // Add 8-15 terms here
]

/** Generate exercises for [Unit Name] */
function generate[UnitName]Exercises(): Exercise[] {
  const exercises: Exercise[] = []

  // Add 8-12 exercises here

  return exercises
}

/** Complete [Unit Name] export */
export const [unitId]: LearningUnit = {
  id: '[belt_level]_unit[number]',
  title: '[French Title]',
  description: '[French Description]',

  beltLevel: '[belt_level]',
  category: '[category]',

  terminology: [unitName]Terminology,
  exercises: generate[UnitName]Exercises(),

  targetScore: 80, // or 85 for black belt
  estimatedTime: 20, // in minutes

  prerequisites: ['[prerequisite_unit_ids]'],
  isSafetyCritical: false // or true if safety-critical
}
```

### Step 4: Add Terminology Items

**CRITICAL REQUIREMENT**: All icons must be BLACK (#000000) only - no colors!

```typescript
{
  id: 'unique_term_id',
  japanese: '日本語',
  romaji: 'ro-ma-ji', // Hyphenated for clarity
  french: 'Traduction française',
  english: 'English translation',

  iconType: 'lucide',
  iconData: {
    type: 'lucide',
    iconName: 'IconName', // From lucide-react
    color: '#000000',      // BLACK ONLY - REQUIRED
    strokeWidth: 2
  },
  iconCaption: 'Short descriptive caption',

  category: 'techniques', // positions, movements, weapons, falls, principles, etiquette
  beltLevel: 'white_5',   // Current belt level
  description: 'Detailed explanation in French.',

  difficulty: 2,          // 1-5 based on belt level
  keywords: ['key', 'words', 'for', 'search'],
  relatedTerms: ['term_id_1', 'term_id_2']
}
```

### Step 5: Add Exercises

Follow the distribution pattern:
- 35% Term to Icon (exercises 1, 3, 5, 7)
- 35% Icon to Term (exercises 2, 4, 6)
- 15-30% Safety Quiz (more if safety-critical)
- 15% Free Recall (usually last exercise)

#### Template 1: Term to Icon

```typescript
exercises.push({
  id: '[belt]_unit[num]_ex[num]',
  type: 'term_to_icon',
  question: 'Quelle icône représente "[Term]" ([translation]) ?',
  terminologyItem: [unitName]Terminology[index],
  options: [
    {
      id: 'opt1',
      value: 'Correct caption',
      iconData: [unitName]Terminology[index].iconData,
      isCorrect: true
    },
    {
      id: 'opt2',
      value: 'Wrong caption',
      iconData: { type: 'lucide', iconName: 'OtherIcon', color: '#000000' },
      isCorrect: false
    },
    {
      id: 'opt3',
      value: 'Wrong caption',
      iconData: { type: 'lucide', iconName: 'AnotherIcon', color: '#000000' },
      isCorrect: false
    },
    {
      id: 'opt4',
      value: 'Wrong caption',
      iconData: { type: 'lucide', iconName: 'DifferentIcon', color: '#000000' },
      isCorrect: false
    }
  ],
  correctAnswer: 'opt1',
  hint: 'Helpful hint in French',
  difficulty: 2,
  estimatedTime: 15
})
```

#### Template 2: Icon to Term

```typescript
exercises.push({
  id: '[belt]_unit[num]_ex[num]',
  type: 'icon_to_term',
  question: 'Quel est ce terme ?',
  terminologyItem: [unitName]Terminology[index],
  options: [
    { id: 'opt1', value: 'Correct Term', isCorrect: true },
    { id: 'opt2', value: 'Similar Wrong Term', isCorrect: false },
    { id: 'opt3', value: 'Another Wrong Term', isCorrect: false },
    { id: 'opt4', value: 'Different Wrong Term', isCorrect: false }
  ],
  correctAnswer: 'opt1',
  hint: 'Helpful hint explaining the term',
  difficulty: 2,
  estimatedTime: 15
})
```

#### Template 3: Safety Quiz (CRITICAL for safety-critical units)

```typescript
exercises.push({
  id: '[belt]_unit[num]_ex[num]_safety',
  type: 'safety_quiz',
  question: 'Question de sécurité importante ?',
  terminologyItem: [unitName]Terminology[index],
  options: [
    {
      id: 'opt1',
      value: 'Correct safe answer',
      isCorrect: true
    },
    {
      id: 'opt2',
      value: 'Unsafe answer',
      isCorrect: false
    },
    {
      id: 'opt3',
      value: 'Another unsafe answer',
      isCorrect: false
    },
    {
      id: 'opt4',
      value: 'Wrong answer',
      isCorrect: false
    }
  ],
  correctAnswer: 'opt1',
  context: 'IMPORTANT safety context and explanation. Why this matters.',
  difficulty: 1,
  estimatedTime: 20
})
```

#### Template 4: Free Recall

```typescript
exercises.push({
  id: '[belt]_unit[num]_ex[num]_recall',
  type: 'free_recall',
  question: 'Question de rappel libre - expliquez ou nommez...',
  terminologyItem: [unitName]Terminology[index],
  options: [
    { id: 'hard', value: 'Je ne sais pas', isCorrect: false },
    { id: 'medium', value: 'Je connais un peu', isCorrect: false },
    { id: 'good', value: 'Je connais bien', isCorrect: true },
    { id: 'easy', value: 'Je maîtrise parfaitement', isCorrect: true }
  ],
  correctAnswer: 'good',
  hint: 'Optional hint with key points',
  difficulty: 3,
  estimatedTime: 20
})
```

### Step 6: Update Curriculum

```typescript
// In src/data/curriculum.ts

// 1. Import your new unit
import { white5Unit5 } from './belts/white5Unit5'

// 2. Add to the appropriate belt section's units array
{
  id: 'white_5_belt',
  level: 'white_5',
  name: '5ème Kyū - Ceinture blanche',
  description: 'Découvrez les fondamentaux...',
  units: [
    white5Unit1,
    white5Unit2,
    white5Unit3,
    white5Unit4,
    white5Unit5  // ← Add here
  ],
  color: '#ffffff',
  unlockCondition: { type: 'always_unlocked' }
}
```

### Step 7: Test Your Unit

```bash
# 1. Compile TypeScript
npm run build

# 2. If successful, start dev server
npm start

# 3. In browser:
#    - Navigate to your new unit
#    - Complete as a user would
#    - Verify all icons appear in BLACK AND WHITE
#    - Check all exercises work
#    - Ensure difficulty feels right
```

---

## Black and White Icon System

### CRITICAL REQUIREMENT
**ALL icons MUST be black (#000000) with NO other colors.**

This is non-negotiable for visual consistency and professional appearance.

### Recommended Lucide Icons

#### People & Positions
```typescript
'User'          // Single person, general stance
'Users'         // Multiple people, partner work
'UserCircle'    // Person with emphasis
'UserCheck'     // Correct position
'UserX'         // Incorrect position
```

#### Movement - Straight Directions
```typescript
'ArrowUp'       // Forward, shomen direction
'ArrowDown'     // Downward, strikes, mae ukemi
'ArrowLeft'     // Left movement
'ArrowRight'    // Right movement, entering
'ArrowUpRight'  // Diagonal movements
'ArrowDownLeft' // Diagonal movements
```

#### Movement - Rotation
```typescript
'RotateCw'      // Clockwise rotation, tenkan
'RotateCcw'     // Counter-clockwise, nikyo motion
'RefreshCw'     // Continuous rotation, kaiten
'Repeat'        // Repeated movement, practice
```

#### Movement - Complex
```typescript
'Move'          // General movement, tai sabaki
'MoveHorizontal'// Lateral movement
'MoveVertical'  // Vertical movement
'TrendingUp'    // Rising movement, spiral motion
```

#### Control & Technique
```typescript
'Hand'          // Hand position, grab, tegatana
'Grip'          // Gripping, control, osae
'Lock'          // Immobilization, pin, kansetsu
'Target'        // Strike point, atemi
'Crosshair'     // Precise targeting, focus point
```

#### Connection & Principles
```typescript
'Link'          // Connection, musubi
'Unlink'        // Separation
'Waves'         // Flow, harmonization, awase
'Wind'          // Ki, breath, kokyu
'Zap'           // Energy, power
```

#### Safety & Awareness
```typescript
'Shield'        // Protection, safety, ukemi
'ShieldAlert'   // Critical safety warning
'AlertTriangle' // Warning, caution
'Eye'           // Awareness, metsuke
```

#### Learning & Progression
```typescript
'Book'          // Study, learning, theory
'BookOpen'      // Open learning
'GraduationCap' // Levels, achievement
'TrendingUp'    // Progression, improvement
'CheckCircle'   // Correct, success
'XCircle'       // Incorrect, failure
```

#### Weapons
```typescript
'Sword'         // Bokken, ken
'Minus'         // Jo (staff as simple line)
'GitBranch'     // Tanto (knife/dagger)
```

#### Geometric Shapes
```typescript
'Circle'        // Circular movement, tenkan
'Square'        // Stability, foundation
'Triangle'      // Hanmi, sankaku
'Minimize2'     // Distance, maai
'Maximize2'     // Expansion, extension
```

#### Measurement & Control
```typescript
'Gauge'         // Pressure, control level
'Ruler'         // Distance measurement
'Weight'        // Balance, center
```

### Icon Usage Example

```typescript
// For tenkan (pivot/rotation)
iconData: {
  type: 'lucide',
  iconName: 'RotateCw',
  color: '#000000',  // BLACK ONLY
  strokeWidth: 2
}

// For shomen uchi (front strike)
iconData: {
  type: 'lucide',
  iconName: 'ArrowDown',
  color: '#000000',  // BLACK ONLY
  strokeWidth: 2
}

// For musubi (connection)
iconData: {
  type: 'lucide',
  iconName: 'Link',
  color: '#000000',  // BLACK ONLY
  strokeWidth: 2
}

// For safety/protection
iconData: {
  type: 'lucide',
  iconName: 'Shield',
  color: '#000000',  // BLACK ONLY
  strokeWidth: 2
}
```

---

## Common Aikido Terms by Category

### Positions (Kamae)
- seiza, shizentai, kamae, hanmi
- migi hanmi, hidari hanmi, gyaku hanmi, ai hanmi
- sankaku no kamae, chudan, jodan, gedan
- shikko (knee walking), suwari waza, tachi waza

### Movements (Tai Sabaki)
- ayumi ashi, tsugi ashi, suri ashi
- tenkan, irimi, tenshin, tai sabaki
- tai no henko, happo giri
- ma-ai, issoku ittou no ma-ai, to-ma, chika-ma

### Basic Techniques (Kihon Waza)
- ikkyo, nikyo, sankyo, yonkyo, gokyo (five pins)
- omote, ura (front/back versions)
- osae waza (pins), katame waza (locks), kansetsu waza (joint locks)

### Projection Techniques (Nage Waza)
- shiho nage, kote gaeshi, kaiten nage
- irimi nage, tenchi nage, kokyu nage
- juji garami, ude garami, koshi nage, aiki otoshi

### Attacks (Uke's Role)
- katate dori (one hand grab)
- ryote dori (two hands grab)
- kata dori (shoulder grab)
- shomen uchi (front strike)
- yokomen uchi (side strike)
- munetsuki (chest punch)
- ushiro (from behind)

### Ukemi (Falling)
- ukemi, mae ukemi, ushiro ukemi, yoko ukemi
- zempo kaiten (forward high roll)
- koho tento (backward roll)
- tobi ukemi (flying fall)

### Weapons (Buki Waza)
- bokken / ken (wooden sword)
- jo (staff, 128cm)
- tanto (knife/dagger)
- suburi (solo practice swings)
- kumitachi (paired sword)
- kumijo (paired staff)
- tanto dori, tachi dori, jo dori (disarms)

### Principles (Riai)
- ki (energy/spirit)
- aiki (harmonizing energy)
- kokyu (breath)
- kokyu ryoku (breath power)
- ki no nagare (flowing with ki)
- musubi (connection)
- awase (blending/harmonization)
- zanshin (remaining mind/awareness)
- kuzushi (breaking balance)
- ma-ai (distancing)
- metsuke (eye contact/gaze)

### Etiquette (Reigi)
- rei (bow)
- onegaishimasu (please teach me)
- arigatou gozaimashita (thank you)
- sensei (teacher)
- dojo (training hall)
- tatami (mat)
- kamiza (upper seat, place of honor)
- uke (receiver, one who falls)
- tori / nage (performer, one who throws)

---

## Difficulty Guidelines by Belt Level

### White Belt (5th-4th Kyu)
- **Difficulty Range**: 1-3 (mostly 1-2)
- **Focus**: Concrete, fundamental terms
- **Examples**: rei, seiza, kamae, shomen uchi
- **Exercise Style**: Clear distinctions, direct matching
- **Estimated Time**: 15-22 minutes per unit

### Yellow Belt (3rd-2nd Kyu)
- **Difficulty Range**: 2-4 (mostly 2-3)
- **Focus**: Core techniques, principles beginning
- **Examples**: nikyo, tenkan, irimi nage, kokyu
- **Exercise Style**: Similar options requiring discrimination
- **Estimated Time**: 20-25 minutes per unit

### Orange Belt (1st Kyu)
- **Difficulty Range**: 3-5 (mostly 3-4)
- **Focus**: Advanced techniques, variations
- **Examples**: henka waza, kaeshi waza, advanced projections
- **Exercise Style**: Complex integration, variations
- **Estimated Time**: 24-28 minutes per unit

### Black Belt (1st Dan)
- **Difficulty Range**: 4-5
- **Focus**: Teaching, philosophy, mastery concepts
- **Examples**: jiyu waza, pedagogical terms, O-Sensei's teachings
- **Exercise Style**: Conceptual understanding, application
- **Estimated Time**: 26-30 minutes per unit

---

## Safety-Critical Unit Checklist

If `isSafetyCritical: true`, ensure:

- [ ] **Minimum 2-3 safety quiz questions** (vs 1 for regular units)
- [ ] First safety quiz appears within exercises 1-3
- [ ] Safety quizzes cover:
  - [ ] Proper technique application
  - [ ] Partner communication (tap signals, verbal cues)
  - [ ] Injury prevention methods
  - [ ] Progressive practice approach
- [ ] Context field always filled with detailed explanation
- [ ] Related safety terms cross-referenced
- [ ] Description emphasizes safety considerations

**Safety-Critical Categories**:
- All ukemi units (falls)
- All joint lock units (nikyo, sankyo, yonkyo, gokyo)
- All nage waza units (throws/projections)
- All weapons units
- All jiyu waza / randori units (free practice)

---

## Japanese Romanization (Hepburn System)

### Basic Rules
- Long vowels: Use macron (ō, ū) or double vowel (oo, uu)
- Hyphenate syllables for clarity: `ko-kyu` not `kokyu`
- Double consonants preserved: `ikkyo` not `ikyo`
- N before consonants: `tenkan` not `tekan`
- Soft 'ch' for chi: `mochi` not `moti`

### Common Patterns
- -yo ending: `ikkyo`, `nikyo`, `sankyo`
- -ku ending: `kokyu`, `doku`
- -shi ending: `mawashi`, `tenshi`
- -tsu sound: `munetsuki`, `tsuki`
- Long o: `dojo`, `seiza`

---

## Translation Tips

### French Translations
- Use proper accents: é, è, ê, à, ô, ù
- Formal register for instruction
- Technical terms: Japanese + French explanation
- Action verbs: Use infinitive form
- Example: "Salut respectueux" not just "salut"

### English Translations
- More literal than French
- Technical accuracy over colloquial
- Consistent terminology across units
- Example: "Bow" not "greeting" for rei

---

## Implementation Checklist

### Before Starting
- [ ] Review existing example units (white5Unit4, white4Unit1, yellow3Unit1)
- [ ] Check CURRICULUM_DESIGN.md for unit content specifications
- [ ] Understand belt level requirements
- [ ] Identify if unit is safety-critical

### During Implementation
- [ ] Create file in src/data/belts/
- [ ] Define 8-15 terminology items
- [ ] ALL icons BLACK (#000000) ONLY
- [ ] Japanese characters correct
- [ ] Romaji properly hyphenated
- [ ] French translations accurate with accents
- [ ] English translations clear
- [ ] Difficulty appropriate for belt
- [ ] Related terms cross-referenced
- [ ] Generate 8-12 exercises
- [ ] Exercise distribution correct (35/35/15/15)
- [ ] Safety quizzes if applicable
- [ ] Difficulty progression within unit
- [ ] Estimated times realistic
- [ ] Prerequisites correctly set

### After Implementation
- [ ] Import in src/data/curriculum.ts
- [ ] Add to belt section array
- [ ] Run `npm run build` - no errors
- [ ] Run `npm start` - loads correctly
- [ ] Test complete unit flow
- [ ] Verify all icons BLACK AND WHITE
- [ ] Check French text for errors
- [ ] Validate exercise difficulty
- [ ] Confirm safety content clear

---

## Testing Procedure

### 1. TypeScript Compilation
```bash
npm run build
```
**Expected**: No errors, clean compile

**Common Issues**:
- Missing import statements
- Mismatched type definitions
- Incorrect export names

### 2. Development Server
```bash
npm start
```
**Expected**: Unit appears in curriculum

**Check**:
- Unit visible in appropriate belt section
- Prerequisites respected (locked if not met)
- Unit card displays correctly

### 3. Unit Flow Test
**Steps**:
1. Start unit
2. Complete each exercise
3. Verify icons render (BLACK AND WHITE)
4. Check answer validation
5. Progress through all exercises
6. Complete unit
7. Verify XP awarded
8. Check unit marked complete

### 4. Content Quality Review
- [ ] No typos in French text
- [ ] No grammatical errors
- [ ] Icons visually distinct
- [ ] Hints helpful but not giving answers
- [ ] Safety information clear
- [ ] Difficulty feels appropriate

---

## Common Issues and Solutions

### Issue: Icon Doesn't Render
**Problem**: Blank space where icon should be

**Solutions**:
- Verify iconName exactly matches lucide-react export
- Ensure color is '#000000' (string, not just black)
- Check iconType === 'lucide'
- Confirm strokeWidth is number not string

### Issue: TypeScript Error on Import
**Problem**: Cannot find module '@/data/belts/...'

**Solutions**:
- Use `@/` path alias, not relative paths
- Ensure export name matches import name
- Check file actually exists
- Verify tsconfig.json paths configured

### Issue: Exercise Validation Not Working
**Problem**: Selecting correct answer doesn't register

**Solutions**:
- Verify correctAnswer matches an option id
- Check isCorrect boolean on options
- Ensure terminologyItem is defined
- Validate all required fields present

### Issue: Unit Won't Unlock
**Problem**: New unit not appearing in curriculum

**Solutions**:
- Check prerequisites array
- Verify previous unit IDs correct
- Ensure belt unlockCondition properly set
- Complete prerequisite units

### Issue: Icons Have Color
**Problem**: Icons showing in blue/red/etc instead of black

**Solutions**:
- Check color: '#000000' on ALL iconData
- Verify no default colors in theme
- Ensure IconRenderer respects color prop
- Remove any color overrides in components

---

## Next Unit to Implement

### Recommended: white5Unit5 - First Techniques

**Purpose**: Introduce basic ikkyo and fundamental attack forms

**Terminology to Include** (8-10 terms):
1. ikkyo (first principle)
2. katate dori (one-hand grab)
3. ryote dori (two-hands grab)
4. kata dori (shoulder grab)
5. shomen uchi (front strike)
6. yokomen uchi (side strike)
7. omote (front version)
8. ura (back version)
9. kihon waza (basic technique)
10. nagare (flowing movement)

**Exercise Focus**:
- Recognizing different attack forms
- Understanding omote vs ura concept
- Ikkyo application basics
- Safety: controlled speed, tap signals

**Safety Quiz Topics**:
- Speed control when learning
- Partner agreement before techniques
- Stopping on tap signal

**Estimated Development Time**: 2.5-3 hours

**File Location**: `C:\dev\aikido-lingo\src\data\belts\white5Unit5.ts`

---

## Implementation Progress Tracking

### Completed Units (6)
- ✅ white5Unit1 - Dojo Etiquette
- ✅ white5Unit2 - Basic Positions
- ✅ white5Unit3 - Movement Foundations
- ✅ white5Unit4 - Safety & Ukemi Basics
- ✅ white4Unit1 - Advanced Kamae
- ✅ yellow3Unit1 - Nikyo Second Principle

### Remaining Units by Belt (27)

**White 5** (1):
- [ ] Unit 5: First Techniques ← START HERE

**White 4** (4):
- [ ] Unit 2: Tai Sabaki Deep Dive
- [ ] Unit 3: Ikkyo Variations
- [ ] Unit 4: Weapons Awareness
- [ ] Unit 5: Ukemi Development

**Yellow 3** (5):
- [ ] Unit 2: Sankyo Third Principle
- [ ] Unit 3: Tenkan Mastery
- [ ] Unit 4: Irimi Techniques
- [ ] Unit 5: Kokyu Principles
- [ ] Unit 6: Weapons Integration

**Yellow 2** (6):
- [ ] Unit 1: Yonkyo Fourth Principle
- [ ] Unit 2: Gokyo Fifth Principle
- [ ] Unit 3: Projection Techniques
- [ ] Unit 4: Advanced Footwork
- [ ] Unit 5: Jo Fundamentals
- [ ] Unit 6: Partner Dynamics

**Orange 1** (6):
- [ ] Unit 1: Advanced Projections
- [ ] Unit 2: Henka Waza
- [ ] Unit 3: Kaeshi Waza
- [ ] Unit 4: Weapons Combinations
- [ ] Unit 5: Philosophy Integration
- [ ] Unit 6: Synthesis and Flow

**Black 1** (5):
- [ ] Unit 1: Teaching Fundamentals
- [ ] Unit 2: Advanced Applications
- [ ] Unit 3: Jiyu Waza
- [ ] Unit 4: Weapons Mastery
- [ ] Unit 5: O-Sensei's Vision

---

## Resources

### Aikido References
- **Aikikai Foundation**: aikikai.or.jp (official headquarters)
- **Traditional Aikido**: traditionalaikido.com
- **Aikido Journal**: aikidojournal.com

### Japanese Language
- **Jisho.org**: Japanese-English dictionary
- **Romaji Converter**: Online tools for Hepburn romanization
- **Japanese Grammar Guide**: Tae Kim's guide

### Icons
- **Lucide Icons**: lucide.dev
- Browse complete icon library
- Preview and search functionality
- Copy component names

### Development
- **TypeScript Handbook**: typescriptlang.org/docs
- **React Documentation**: react.dev
- **Material-UI**: mui.com/material-ui

---

## Support Documents

All documentation is in the project root:

- **CURRICULUM_DESIGN.md**: Complete pedagogical design and rationale
- **CURRICULUM_IMPLEMENTATION.ts**: TypeScript structures and templates
- **CURRICULUM_SUMMARY.md**: Overview and quick reference
- **IMPLEMENTATION_GUIDE.md**: This file - step-by-step instructions
- **DATA_TEMPLATE.md**: Original template guide (still relevant)

---

## Conclusion

You have everything needed to implement the remaining units:

✅ Complete curriculum design across 6 belt levels
✅ Clear pedagogical progression
✅ 6 working example units demonstrating all patterns
✅ Comprehensive templates and code examples
✅ Black and white icon system fully specified
✅ Exercise patterns established
✅ Testing procedures defined
✅ Quality checklists provided

**Start with white5Unit5 and work systematically through the belt levels.**

Each unit follows the same pattern. The work becomes faster as the patterns become familiar.

**Estimated Timeline**:
- Weeks 1-2: Complete White 5 & White 4 (6 units)
- Weeks 3-4: Complete Yellow 3 & start Yellow 2 (8 units)
- Weeks 5-6: Complete Yellow 2, Orange 1, Black 1 (remaining 13 units)

**Total: 6 weeks to complete all 27 remaining units at a pace of 4-5 units per week.**

Good luck with the implementation!

---

**Document Version**: 1.0
**Last Updated**: 2025-10-22
**Author**: Claude Code (Aikido Curriculum Expert)
