/**
 * Core type definitions for Aikido Lingo
 * Defines belt levels, categories, terminology items, and learning units
 */

/** Belt levels in Aikido (9 grades: 5th Kyu → 4th Dan) */
export type BeltLevel =
  | 'white_5'   // 5ème kyū
  | 'white_4'   // 4ème kyū
  | 'white_3'   // 3ème kyū
  | 'white_2'   // 2ème kyū
  | 'white_1'   // 1er kyū
  | 'black_1'   // 1er dan
  | 'black_2'   // 2ème dan
  | 'black_3'   // 3ème dan
  | 'black_4'   // 4ème dan

/** Technique categories */
export type TechniqueCategory =
  | 'etiquette'      // Dojo etiquette
  | 'positions'      // Basic stances (kamae, seiza, etc.)
  | 'movements'      // Movements (tenkan, irimi, etc.)
  | 'techniques'     // Techniques (ikkyo, nikyo, etc.)
  | 'weapons'        // Weapons (bokken, jo, tanto)
  | 'falls'          // Falls (ukemi)
  | 'principles'     // Philosophical principles

/** Icon element type for composite icons */
export interface IconElement {
  type: 'shape' | 'arrow' | 'line' | 'text'
  position: { x: number; y: number }

  // For shape
  shape?: 'circle' | 'square' | 'triangle' | 'person'

  // For arrow/line
  direction?: 'up' | 'down' | 'left' | 'right' | 'diagonal'

  // For text
  text?: string

  color?: string
  size?: number
}

/** Icon data structure */
export interface IconData {
  type: 'svg' | 'emoji' | 'composite' | 'lucide'

  // For type='svg'
  svgPath?: string              // Path to SVG file
  svgContent?: string           // Inline SVG content

  // For type='emoji'
  emoji?: string                // Unicode emoji (e.g. "🧎")

  // For type='composite' (multiple elements)
  elements?: IconElement[]

  // For type='lucide' (lucide-react icons)
  iconName?: string             // Name of the lucide icon (e.g. 'UserCircle')
  strokeWidth?: number          // Stroke width for lucide icons (default: 2)

  // Styling
  color?: string                // Primary color
  backgroundColor?: string      // Background if needed
  size?: 'small' | 'medium' | 'large'
}

/** Terminology item with icon */
export interface TerminologyItem {
  id: string                    // Unique identifier
  japanese: string              // Japanese term (e.g. "seiza")
  romaji: string                // Romanization (e.g. "SE-i-za")
  french: string                // French translation
  english: string               // English translation

  // Visual representation
  iconType: 'svg' | 'emoji' | 'composite' | 'lucide'
  iconData: IconData            // Icon data
  iconCaption: string           // Caption (e.g. "Sitting on heels")

  // Context
  category: TechniqueCategory
  beltLevel: BeltLevel          // Minimum required belt
  description: string           // Detailed description

  // Optional resources
  videoUrl?: string             // Video demonstration
  imageUrl?: string             // Real photo of position
  audioUrl?: string             // Audio pronunciation

  // Metadata
  difficulty: 1 | 2 | 3 | 4 | 5 // Difficulty level
  keywords: string[]            // Keywords for search
  relatedTerms: string[]        // IDs of related terms
}

/** Learning unit */
export interface LearningUnit {
  id: string
  title: string                 // E.g. "Basic positions"
  description: string           // Learning objectives

  beltLevel: BeltLevel          // Related belt level
  category: TechniqueCategory

  terminology: TerminologyItem[] // 5-15 terms to learn
  exercises: Exercise[]          // 8-12 varied exercises

  targetScore: number           // Minimum score to validate (%)
  estimatedTime: number         // Estimated time (minutes)

  prerequisites: string[]       // IDs of prerequisite units
  isSafetyCritical: boolean     // Requires safety validation
}

/** Curriculum organization */
export interface Curriculum {
  belts: BeltSection[]
}

/** Belt section */
export interface BeltSection {
  id: string
  level: BeltLevel
  name: string                  // E.g. "5ème Kyū - White belt"
  description: string
  units: LearningUnit[]
  color: string                 // Associated color
  unlockCondition: UnlockCondition
}

/** Unlock condition */
export interface UnlockCondition {
  type: 'previous_belt' | 'specific_units' | 'always_unlocked'
  requiredUnits?: string[]      // IDs of units to complete
  requiredScore?: number        // Minimum global score
}

/** Exercise types */
export type ExerciseType =
  | 'icon_matching'             // Match terms and icons
  | 'term_to_icon'              // Given term → choose icon
  | 'icon_to_term'              // Given icon → choose term
  | 'video_observation'         // Watch video + identify
  | 'position_identification'   // Identify position in context
  | 'safety_quiz'               // Safety MCQ
  | 'sequence_ordering'         // Put sequence in order
  | 'free_recall'               // Free recall (flashcard)

/** Exercise option */
export interface ExerciseOption {
  id: string
  value: string                 // Option text
  iconData?: IconData           // Icon if applicable
  isCorrect: boolean
}

/** Term pair for matching */
export interface TermPair {
  id: string
  term: string
  icon: IconData
  caption: string
}

/** Sequence item */
export interface SequenceItem {
  id: string
  order: number                 // Correct position
  term: string
  icon: IconData
  description: string
}

/** Generic exercise */
export interface Exercise {
  id: string
  type: ExerciseType
  question: string              // Question asked

  // Content
  terminologyItem: TerminologyItem

  // For multiple choice
  options?: ExerciseOption[]
  correctAnswer: string

  // For matching
  pairs?: TermPair[]

  // For sequence
  sequence?: SequenceItem[]
  correctOrder?: number[]

  // Support
  hint?: string
  context?: string              // Situational context
  videoUrl?: string

  // Metadata
  difficulty: 1 | 2 | 3 | 4 | 5
  estimatedTime: number         // Seconds
}
