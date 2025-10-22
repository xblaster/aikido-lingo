/**
 * Unit 3: Henka Waza - Variation Techniques (1er Kyū - Orange Belt)
 * Technique transitions and adaptability in practice
 */

import { TerminologyItem, LearningUnit, Exercise } from '@/types'

export const orange1Unit3Terminology: TerminologyItem[] = [
  {
    id: 'henka_waza',
    japanese: '変化技',
    romaji: 'hen-ka wa-za',
    french: 'Techniques de variation',
    english: 'Variation techniques',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Shuffle', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Adaptation fluide',
    category: 'techniques',
    beltLevel: 'white_1',
    description: 'Techniques de variation et transition. Changer fluidement d\'une technique à une autre selon la résistance. Adaptabilité en temps réel.',
    difficulty: 5,
    keywords: ['henka', 'variation', 'change', 'adaptation', 'transition'],
    relatedTerms: ['kaeshi_waza', 'jiyu_waza', 'oyo_waza', 'nagare']
  },
  {
    id: 'ikkyo_to_nikyo',
    japanese: '一教から二教',
    romaji: 'i-kkyo ka-ra ni-kyo',
    french: 'Transition ikkyo vers nikyo',
    english: 'Ikkyo to nikyo transition',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'ArrowRight', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Changement de contrôle',
    category: 'techniques',
    beltLevel: 'white_1',
    description: 'Transition d\'ikkyo vers nikyo si résistance. Si uke résiste ikkyo, pivoter vers nikyo. Principe d\'adaptation aux forces.',
    difficulty: 5,
    keywords: ['ikkyo', 'nikyo', 'transition', 'henka', 'adaptation'],
    relatedTerms: ['henka_waza', 'ikkyo', 'nikyo', 'resistance']
  },
  {
    id: 'shihonage_to_iriminage',
    japanese: '四方投げから入身投げ',
    romaji: 'shi-ho-na-ge ka-ra i-ri-mi na-ge',
    french: 'Shihonage vers iriminage',
    english: 'Shihonage to iriminage',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'CornerUpRight', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Transition projection',
    category: 'techniques',
    beltLevel: 'white_1',
    description: 'Si shihonage bloqué, transition vers iriminage. Utiliser momentum existant. Changement fluide sans pause.',
    difficulty: 5,
    keywords: ['shihonage', 'iriminage', 'transition', 'projection', 'henka'],
    relatedTerms: ['henka_waza', 'shihonage', 'iriminage', 'nagare']
  },
  {
    id: 'reading_resistance',
    japanese: '抵抗を読む',
    romaji: 'te-i-ko wo yo-mu',
    french: 'Lire la résistance',
    english: 'Reading resistance',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Gauge', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Perception des forces',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Capacité à sentir et lire la résistance de uke. Percevoir direction et force. Permet adaptation technique appropriée.',
    difficulty: 5,
    keywords: ['reading', 'resistance', 'perception', 'sensing', 'awase'],
    relatedTerms: ['henka_waza', 'awase', 'musubi', 'listening']
  },
  {
    id: 'flow_state',
    japanese: '流れの状態',
    romaji: 'na-ga-re no jo-tai',
    french: 'État de flux',
    english: 'Flow state',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Waves', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Fluidité naturelle',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'État mental de fluidité totale. Réponse sans pensée consciente. Technique émerge naturellement. But ultime de l\'entraînement henka waza.',
    difficulty: 5,
    keywords: ['flow', 'nagare', 'fluidity', 'mushin', 'natural'],
    relatedTerms: ['nagare', 'mushin', 'takemusu_aiki', 'spontaneity']
  },
  {
    id: 'seamless_transition',
    japanese: 'シームレス移行',
    romaji: 'shi-mu-re-su i-ko',
    french: 'Transition sans couture',
    english: 'Seamless transition',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Link', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Changement invisible',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Transition imperceptible entre techniques. Pas de pause ou rupture. Mouvement continu comme si planifié. Marque de maîtrise.',
    difficulty: 5,
    keywords: ['seamless', 'transition', 'continuous', 'flow', 'mastery'],
    relatedTerms: ['henka_waza', 'nagare', 'musubi', 'connection']
  },
  {
    id: 'opportunistic_technique',
    japanese: '機会技',
    romaji: 'ki-kai wa-za',
    french: 'Technique opportuniste',
    english: 'Opportunistic technique',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Sparkles', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Saisir le moment',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Saisir opportunité technique qui se présente. Pas forcer technique prévue. Suivre ouverture naturelle. Adaptabilité suprême.',
    difficulty: 5,
    keywords: ['opportunity', 'technique', 'adaptation', 'opening', 'spontaneous'],
    relatedTerms: ['henka_waza', 'jiyu_waza', 'timing', 'awareness']
  },
  {
    id: 'principle_over_form',
    japanese: '原理優先',
    romaji: 'gen-ri yu-sen',
    french: 'Principe avant forme',
    english: 'Principle over form',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Lightbulb', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Essence sur apparence',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Comprendre principes plutôt que formes rigides. Forme peut changer, principe reste. Permet vraie adaptabilité.',
    difficulty: 5,
    keywords: ['principle', 'form', 'essence', 'understanding', 'depth'],
    relatedTerms: ['henka_waza', 'kihon', 'ri_ai', 'philosophy']
  },
  {
    id: 'kaeshi_principle',
    japanese: '返し原理',
    romaji: 'kae-shi gen-ri',
    french: 'Principe de retournement',
    english: 'Reversal principle',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Repeat', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Inversion de force',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Principe de retourner la force. Si une direction bloquée, utiliser direction opposée. Base des contre-techniques.',
    difficulty: 5,
    keywords: ['reversal', 'kaeshi', 'counter', 'direction', 'force'],
    relatedTerms: ['kaeshi_waza', 'henka_waza', 'kuzushi', 'awase']
  },
  {
    id: 'multiple_solutions',
    japanese: '複数解決',
    romaji: 'fu-ku-su kai-ke-tsu',
    french: 'Solutions multiples',
    english: 'Multiple solutions',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'GitBranch', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Plusieurs chemins',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Chaque situation a multiples solutions techniques. Pas une seule bonne réponse. Choisir selon contexte et énergie. Flexibilité mentale.',
    difficulty: 5,
    keywords: ['multiple', 'solutions', 'options', 'flexibility', 'choices'],
    relatedTerms: ['henka_waza', 'jiyu_waza', 'adaptability', 'creativity']
  }
]

function generateOrange1Unit3Exercises(): Exercise[] {
  const exercises: Exercise[] = []

  exercises.push({
    id: 'orange1_unit3_ex1',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Henka waza" (techniques de variation) ?',
    terminologyItem: orange1Unit3Terminology[0],
    options: [
      { id: 'opt1', value: 'Adaptation fluide', iconData: orange1Unit3Terminology[0].iconData, isCorrect: true },
      { id: 'opt2', value: 'Changement contrôle', iconData: orange1Unit3Terminology[1].iconData, isCorrect: false },
      { id: 'opt3', value: 'État de flux', iconData: orange1Unit3Terminology[4].iconData, isCorrect: false },
      { id: 'opt4', value: 'Transition invisible', iconData: orange1Unit3Terminology[5].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Henka = changement, variation adaptative',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit3_ex2',
    type: 'icon_to_term',
    question: 'Que devez-vous faire si uke résiste à ikkyo ?',
    terminologyItem: orange1Unit3Terminology[1],
    options: [
      { id: 'opt1', value: 'Transition vers nikyo ou autre technique', isCorrect: true },
      { id: 'opt2', value: 'Forcer ikkyo avec plus de force', isCorrect: false },
      { id: 'opt3', value: 'Arrêter et recommencer', isCorrect: false },
      { id: 'opt4', value: 'Maintenir position rigidement', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Adaptation > Force. Suivre l\'énergie, ne pas la combattre',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit3_ex3',
    type: 'term_to_icon',
    question: 'Quelle capacité permet de choisir la bonne variation ?',
    terminologyItem: orange1Unit3Terminology[3],
    options: [
      { id: 'opt1', value: 'Perception des forces', iconData: orange1Unit3Terminology[3].iconData, isCorrect: true },
      { id: 'opt2', value: 'Inversion force', iconData: orange1Unit3Terminology[8].iconData, isCorrect: false },
      { id: 'opt3', value: 'Essence principe', iconData: orange1Unit3Terminology[7].iconData, isCorrect: false },
      { id: 'opt4', value: 'Saisir moment', iconData: orange1Unit3Terminology[6].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Lire la résistance permet adaptation appropriée',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit3_ex4',
    type: 'icon_to_term',
    question: 'Quel est le but ultime de l\'entraînement henka waza ?',
    terminologyItem: orange1Unit3Terminology[4],
    options: [
      { id: 'opt1', value: 'État de flux (réponse sans pensée)', isCorrect: true },
      { id: 'opt2', value: 'Mémoriser toutes variations', isCorrect: false },
      { id: 'opt3', value: 'Vitesse maximale', isCorrect: false },
      { id: 'opt4', value: 'Force supérieure', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Nagare no jotai = technique émerge naturellement',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit3_ex5',
    type: 'term_to_icon',
    question: 'Comment doit être une bonne transition entre techniques ?',
    terminologyItem: orange1Unit3Terminology[5],
    options: [
      { id: 'opt1', value: 'Changement invisible', iconData: orange1Unit3Terminology[5].iconData, isCorrect: true },
      { id: 'opt2', value: 'Pause claire', iconData: orange1Unit3Terminology[1].iconData, isCorrect: false },
      { id: 'opt3', value: 'Rupture nette', iconData: orange1Unit3Terminology[8].iconData, isCorrect: false },
      { id: 'opt4', value: 'Arrêt complet', iconData: orange1Unit3Terminology[3].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Seamless = sans couture, continu',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit3_ex6',
    type: 'icon_to_term',
    question: 'Qu\'est-ce qui est plus important que la forme technique ?',
    terminologyItem: orange1Unit3Terminology[7],
    options: [
      { id: 'opt1', value: 'Comprendre les principes sous-jacents', isCorrect: true },
      { id: 'opt2', value: 'Copier exactement la forme', isCorrect: false },
      { id: 'opt3', value: 'Répéter sans comprendre', isCorrect: false },
      { id: 'opt4', value: 'Suivre rigidement le kata', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Principe > Forme. Essence permet vraie adaptation',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit3_ex7',
    type: 'term_to_icon',
    question: 'Quelle approche définit une technique opportuniste ?',
    terminologyItem: orange1Unit3Terminology[6],
    options: [
      { id: 'opt1', value: 'Saisir le moment', iconData: orange1Unit3Terminology[6].iconData, isCorrect: true },
      { id: 'opt2', value: 'Forcer technique prévue', iconData: orange1Unit3Terminology[1].iconData, isCorrect: false },
      { id: 'opt3', value: 'Ignorer ouvertures', iconData: orange1Unit3Terminology[3].iconData, isCorrect: false },
      { id: 'opt4', value: 'Rigidité mentale', iconData: orange1Unit3Terminology[7].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Suivre ouverture naturelle, pas forcer',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit3_ex8',
    type: 'icon_to_term',
    question: 'Quel principe permet les contre-techniques ?',
    terminologyItem: orange1Unit3Terminology[8],
    options: [
      { id: 'opt1', value: 'Principe de retournement (kaeshi)', isCorrect: true },
      { id: 'opt2', value: 'Force directe', isCorrect: false },
      { id: 'opt3', value: 'Blocage rigide', isCorrect: false },
      { id: 'opt4', value: 'Résistance pure', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Si bloqué dans une direction, utiliser direction opposée',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit3_ex9_recall',
    type: 'free_recall',
    question: 'Expliquez pourquoi henka waza nécessite compréhension profonde des principes',
    terminologyItem: orange1Unit3Terminology[0],
    options: [
      { id: 'hard', value: 'Je ne sais pas', isCorrect: false },
      { id: 'medium', value: 'Je connais quelques variations', isCorrect: false },
      { id: 'good', value: 'Je peux expliquer principes vs formes', isCorrect: true },
      { id: 'easy', value: 'Je peux adapter spontanément', isCorrect: true }
    ],
    correctAnswer: 'good',
    hint: 'Principes permettent adaptation. Formes seules = rigidité',
    difficulty: 5,
    estimatedTime: 30
  })

  exercises.push({
    id: 'orange1_unit3_ex10',
    type: 'term_to_icon',
    question: 'Combien de solutions techniques existe-t-il pour une situation ?',
    terminologyItem: orange1Unit3Terminology[9],
    options: [
      { id: 'opt1', value: 'Plusieurs chemins', iconData: orange1Unit3Terminology[9].iconData, isCorrect: true },
      { id: 'opt2', value: 'Une seule voie', iconData: orange1Unit3Terminology[1].iconData, isCorrect: false },
      { id: 'opt3', value: 'Deux options max', iconData: orange1Unit3Terminology[5].iconData, isCorrect: false },
      { id: 'opt4', value: 'Aucune flexibilité', iconData: orange1Unit3Terminology[7].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Flexibilité mentale = multiples solutions selon contexte',
    difficulty: 5,
    estimatedTime: 15
  })

  return exercises
}

export const orange1Unit3: LearningUnit = {
  id: 'orange1_unit3',
  title: 'Henka Waza - Techniques de variation',
  description: 'Maîtrisez l\'art de la transition fluide et de l\'adaptation spontanée. Principe > Forme.',

  beltLevel: 'white_1',
  category: 'techniques',

  terminology: orange1Unit3Terminology,
  exercises: generateOrange1Unit3Exercises(),

  targetScore: 80,
  estimatedTime: 35,

  prerequisites: ['orange1_unit2'],
  isSafetyCritical: false
}
