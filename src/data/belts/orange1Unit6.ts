/**
 * Unit 6: Philosophical Synthesis (1er Kyū - Orange Belt)
 * Deep aiki principles and O-Sensei's teachings
 */

import { TerminologyItem, LearningUnit, Exercise } from '@/types'

export const orange1Unit6Terminology: TerminologyItem[] = [
  {
    id: 'masakatsu_agatsu',
    japanese: '正勝吾勝',
    romaji: 'ma-sa-ka-tsu a-ga-tsu',
    french: 'Vraie victoire, victoire sur soi',
    english: 'True victory, self-victory',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Award', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Victoire intérieure',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Enseignement central d\'O-Sensei. Vraie victoire (masakatsu) est victoire sur soi-même (agatsu). Vaincre ego, peur, colère. Non combat externe.',
    difficulty: 5,
    keywords: ['masakatsu', 'agatsu', 'victory', 'self', 'philosophy'],
    relatedTerms: ['philosophy', 'osensei', 'victory', 'ego']
  },
  {
    id: 'takemusu_aiki',
    japanese: '武産合気',
    romaji: 'ta-ke-mu-su a-i-ki',
    french: 'Aiki créatif spontané',
    english: 'Spontaneous creative aiki',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Sparkles', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Création martiale',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Niveau ultime où technique émerge spontanément. Take = martial, musu = créer/naître, aiki = harmonie. Technique naît naturellement du moment.',
    difficulty: 5,
    keywords: ['takemusu', 'aiki', 'spontaneous', 'creative', 'ultimate'],
    relatedTerms: ['aiki', 'mushin', 'spontaneity', 'mastery']
  },
  {
    id: 'misogi',
    japanese: '禊',
    romaji: 'mi-so-gi',
    french: 'Purification',
    english: 'Purification',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Droplet', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Nettoyage spirituel',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Purification physique et spirituelle. O-Sensei pratiquait misogi sous cascades. Entraînement aikido lui-même est misogi - purifier corps et esprit.',
    difficulty: 4,
    keywords: ['misogi', 'purification', 'spiritual', 'cleansing', 'practice'],
    relatedTerms: ['spiritual', 'training', 'purification', 'discipline']
  },
  {
    id: 'kami_waza',
    japanese: '神業',
    romaji: 'ka-mi-wa-za',
    french: 'Technique divine',
    english: 'Divine technique',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Star', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Mouvement transcendant',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Technique qui transcende l\'ordinaire. Mouvement parfait qui semble divin. But ultime - aikido comme expression du divin à travers mouvement.',
    difficulty: 5,
    keywords: ['kami', 'waza', 'divine', 'transcendent', 'ultimate'],
    relatedTerms: ['mastery', 'transcendence', 'ultimate', 'spiritual']
  },
  {
    id: 'ai_ki_do',
    japanese: '合気道',
    romaji: 'a-i-ki-do',
    french: 'Voie de l\'harmonie',
    english: 'Way of harmony',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Heart', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Chemin de paix',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Signification profonde d\'aikido. Ai = harmonie/amour, ki = énergie, do = voie. Non "art de se battre" mais "voie d\'unification énergétique".',
    difficulty: 4,
    keywords: ['aikido', 'harmony', 'way', 'philosophy', 'meaning'],
    relatedTerms: ['philosophy', 'harmony', 'way', 'path']
  },
  {
    id: 'bansan_tanren',
    japanese: '万三鍛錬',
    romaji: 'ban-san tan-ren',
    french: 'Forge infinie',
    english: 'Endless forging',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Flame', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Raffinement perpétuel',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Entraînement sans fin. Comme forger une lame - répétition constante raffine. Pas de perfection finale, seulement raffinement continu.',
    difficulty: 4,
    keywords: ['bansan', 'tanren', 'forging', 'training', 'endless'],
    relatedTerms: ['training', 'discipline', 'refinement', 'continuous']
  },
  {
    id: 'fudoshin',
    japanese: '不動心',
    romaji: 'fu-do-shin',
    french: 'Esprit immobile',
    english: 'Immovable mind',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Shield', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Calme inébranlable',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Esprit calme et inébranlable. Non rigide, mais centré. Comme roc dans rivière - eau coule autour. Perturbations ne déstabilisent pas.',
    difficulty: 5,
    keywords: ['fudoshin', 'mind', 'immovable', 'calm', 'centered'],
    relatedTerms: ['mind', 'calm', 'centered', 'spirit']
  },
  {
    id: 'mushin',
    japanese: '無心',
    romaji: 'mu-shin',
    french: 'Non-esprit',
    english: 'No-mind',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Brain', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Absence de pensée',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'État d\'absence de pensée délibérée. Action sans réflexion consciente. Corps réagit naturellement. État de flow suprême.',
    difficulty: 5,
    keywords: ['mushin', 'no-mind', 'flow', 'natural', 'spontaneous'],
    relatedTerms: ['mushin', 'flow', 'spontaneity', 'zen']
  },
  {
    id: 'shin_gi_tai',
    japanese: '心技体',
    romaji: 'shin-gi-tai',
    french: 'Esprit-technique-corps',
    english: 'Mind-technique-body',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Triangle', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Triade martiale',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Trois piliers du budo. Shin = esprit/mental, Gi = technique, Tai = corps physique. Tous trois doivent être développés harmonieusement.',
    difficulty: 4,
    keywords: ['shin', 'gi', 'tai', 'mind', 'body', 'technique'],
    relatedTerms: ['training', 'development', 'balance', 'holistic']
  },
  {
    id: 'bu_no_michi',
    japanese: '武の道',
    romaji: 'bu no mi-chi',
    french: 'Voie martiale',
    english: 'Martial way',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Compass', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Chemin du guerrier',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Le chemin martial comme voie de développement personnel. Bu = martial, mais aussi "arrêter la lance" (stopper violence). Paradoxe du guerrier pacifique.',
    difficulty: 5,
    keywords: ['bu', 'michi', 'way', 'martial', 'path'],
    relatedTerms: ['philosophy', 'way', 'path', 'budo']
  }
]

function generateOrange1Unit6Exercises(): Exercise[] {
  const exercises: Exercise[] = []

  exercises.push({
    id: 'orange1_unit6_ex1',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Masakatsu agatsu" (vraie victoire sur soi) ?',
    terminologyItem: orange1Unit6Terminology[0],
    options: [
      { id: 'opt1', value: 'Victoire intérieure', iconData: orange1Unit6Terminology[0].iconData, isCorrect: true },
      { id: 'opt2', value: 'Création martiale', iconData: orange1Unit6Terminology[1].iconData, isCorrect: false },
      { id: 'opt3', value: 'Mouvement transcendant', iconData: orange1Unit6Terminology[3].iconData, isCorrect: false },
      { id: 'opt4', value: 'Chemin paix', iconData: orange1Unit6Terminology[4].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Enseignement central d\'O-Sensei sur la vraie victoire',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit6_ex2',
    type: 'icon_to_term',
    question: 'Quel est le niveau ultime où technique émerge spontanément ?',
    terminologyItem: orange1Unit6Terminology[1],
    options: [
      { id: 'opt1', value: 'Takemusu aiki (aiki créatif spontané)', isCorrect: true },
      { id: 'opt2', value: 'Technique mémorisée', isCorrect: false },
      { id: 'opt3', value: 'Forme rigide', isCorrect: false },
      { id: 'opt4', value: 'Répétition mécanique', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Technique naît naturellement du moment',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit6_ex3',
    type: 'term_to_icon',
    question: 'Quel concept décrit l\'aikido comme purification ?',
    terminologyItem: orange1Unit6Terminology[2],
    options: [
      { id: 'opt1', value: 'Nettoyage spirituel', iconData: orange1Unit6Terminology[2].iconData, isCorrect: true },
      { id: 'opt2', value: 'Raffinement perpétuel', iconData: orange1Unit6Terminology[5].iconData, isCorrect: false },
      { id: 'opt3', value: 'Calme inébranlable', iconData: orange1Unit6Terminology[6].iconData, isCorrect: false },
      { id: 'opt4', value: 'Absence pensée', iconData: orange1Unit6Terminology[7].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Misogi = purification corps et esprit',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit6_ex4',
    type: 'icon_to_term',
    question: 'Que signifie vraiment "aikido" ?',
    terminologyItem: orange1Unit6Terminology[4],
    options: [
      { id: 'opt1', value: 'Voie d\'unification énergétique/harmonie', isCorrect: true },
      { id: 'opt2', value: 'Art de se battre', isCorrect: false },
      { id: 'opt3', value: 'Technique de combat', isCorrect: false },
      { id: 'opt4', value: 'Sport de compétition', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Ai = harmonie, ki = énergie, do = voie',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit6_ex5',
    type: 'term_to_icon',
    question: 'Quel principe décrit l\'entraînement sans fin ?',
    terminologyItem: orange1Unit6Terminology[5],
    options: [
      { id: 'opt1', value: 'Raffinement perpétuel', iconData: orange1Unit6Terminology[5].iconData, isCorrect: true },
      { id: 'opt2', value: 'Perfection atteinte', iconData: orange1Unit6Terminology[3].iconData, isCorrect: false },
      { id: 'opt3', value: 'Fin de l\'étude', iconData: orange1Unit6Terminology[0].iconData, isCorrect: false },
      { id: 'opt4', value: 'Stagnation', iconData: orange1Unit6Terminology[6].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Bansan tanren = forge infinie, raffinement continu',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit6_ex6',
    type: 'icon_to_term',
    question: 'Quel état mental reste calme et centré face aux perturbations ?',
    terminologyItem: orange1Unit6Terminology[6],
    options: [
      { id: 'opt1', value: 'Fudoshin (esprit immobile)', isCorrect: true },
      { id: 'opt2', value: 'Esprit agité', isCorrect: false },
      { id: 'opt3', value: 'Peur constante', isCorrect: false },
      { id: 'opt4', value: 'Confusion mentale', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Comme roc dans rivière - eau coule autour',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit6_ex7',
    type: 'term_to_icon',
    question: 'Quel état permet action sans pensée délibérée ?',
    terminologyItem: orange1Unit6Terminology[7],
    options: [
      { id: 'opt1', value: 'Absence de pensée', iconData: orange1Unit6Terminology[7].iconData, isCorrect: true },
      { id: 'opt2', value: 'Calme inébranlable', iconData: orange1Unit6Terminology[6].iconData, isCorrect: false },
      { id: 'opt3', value: 'Triade martiale', iconData: orange1Unit6Terminology[8].iconData, isCorrect: false },
      { id: 'opt4', value: 'Chemin guerrier', iconData: orange1Unit6Terminology[9].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Mushin = no-mind, corps réagit naturellement',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit6_ex8',
    type: 'icon_to_term',
    question: 'Quels sont les trois piliers à développer harmonieusement ?',
    terminologyItem: orange1Unit6Terminology[8],
    options: [
      { id: 'opt1', value: 'Esprit, technique, corps (shin-gi-tai)', isCorrect: true },
      { id: 'opt2', value: 'Force, vitesse, agilité', isCorrect: false },
      { id: 'opt3', value: 'Attaque, défense, contre', isCorrect: false },
      { id: 'opt4', value: 'Début, milieu, fin', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Développement holistique du pratiquant',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit6_ex9_recall',
    type: 'free_recall',
    question: 'Expliquez le paradoxe du "guerrier pacifique" (bu no michi)',
    terminologyItem: orange1Unit6Terminology[9],
    options: [
      { id: 'hard', value: 'Je ne comprends pas', isCorrect: false },
      { id: 'medium', value: 'Je connais le terme', isCorrect: false },
      { id: 'good', value: 'Je peux expliquer bu = "arrêter la lance"', isCorrect: true },
      { id: 'easy', value: 'Je comprends profondément', isCorrect: true }
    ],
    correctAnswer: 'good',
    hint: 'Art martial qui vise stopper violence, pas la créer',
    difficulty: 5,
    estimatedTime: 30
  })

  exercises.push({
    id: 'orange1_unit6_ex10',
    type: 'term_to_icon',
    question: 'Quel type de technique transcende l\'ordinaire ?',
    terminologyItem: orange1Unit6Terminology[3],
    options: [
      { id: 'opt1', value: 'Mouvement transcendant', iconData: orange1Unit6Terminology[3].iconData, isCorrect: true },
      { id: 'opt2', value: 'Technique mécanique', iconData: orange1Unit6Terminology[5].iconData, isCorrect: false },
      { id: 'opt3', value: 'Mouvement basique', iconData: orange1Unit6Terminology[8].iconData, isCorrect: false },
      { id: 'opt4', value: 'Forme rigide', iconData: orange1Unit6Terminology[6].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Kami waza = technique divine, expression du divin',
    difficulty: 5,
    estimatedTime: 15
  })

  return exercises
}

export const orange1Unit6: LearningUnit = {
  id: 'orange1_unit6',
  title: 'Synthèse philosophique',
  description: 'Enseignements profonds d\'O-Sensei. Masakatsu agatsu, takemusu aiki, et la voie de l\'harmonie. Comprendre l\'essence de l\'aikido.',

  beltLevel: 'white_1',
  category: 'principles',

  terminology: orange1Unit6Terminology,
  exercises: generateOrange1Unit6Exercises(),

  targetScore: 80,
  estimatedTime: 35,

  prerequisites: ['orange1_unit5'],
  isSafetyCritical: false
}
