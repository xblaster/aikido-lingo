/**
 * Unit 4: Kaeshi Waza - Counter Techniques (1er Kyū - Orange Belt)
 * Counter applications and timing reversals
 */

import { TerminologyItem, LearningUnit, Exercise } from '@/types'

export const orange1Unit4Terminology: TerminologyItem[] = [
  {
    id: 'kaeshi_waza',
    japanese: '返し技',
    romaji: 'kae-shi wa-za',
    french: 'Techniques de contre',
    english: 'Counter techniques',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Repeat', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Retournement technique',
    category: 'techniques',
    beltLevel: 'white_1',
    description: 'Techniques de contre-attaque. Retourner technique de l\'adversaire contre lui. Nécessite timing parfait et compréhension profonde.',
    difficulty: 5,
    keywords: ['kaeshi', 'counter', 'reversal', 'contre', 'timing'],
    relatedTerms: ['henka_waza', 'uke_nagashi', 'timing', 'awase']
  },
  {
    id: 'kotegaeshi_counter',
    japanese: '小手返し返し',
    romaji: 'ko-te-gae-shi kae-shi',
    french: 'Contre-kotegaeshi',
    english: 'Kotegaeshi counter',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'RotateCw', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Inversion kotegaeshi',
    category: 'techniques',
    beltLevel: 'white_1',
    description: 'Contrer kotegaeshi par kotegaeshi inverse. Si partenaire applique kotegaeshi, retourner avec même principe. Timing critique.',
    difficulty: 5,
    keywords: ['kotegaeshi', 'counter', 'wrist', 'reversal', 'kaeshi'],
    relatedTerms: ['kaeshi_waza', 'kotegaeshi', 'timing', 'awase']
  },
  {
    id: 'shihonage_counter',
    japanese: '四方投げ返し',
    romaji: 'shi-ho-na-ge kae-shi',
    french: 'Contre-shihonage',
    english: 'Shihonage counter',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'CornerUpLeft', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Inversion quatre directions',
    category: 'techniques',
    beltLevel: 'white_1',
    description: 'Contrer shihonage avant projection finale. Intercepter rotation, inverser contrôle. Nécessite sentir point de basculement.',
    difficulty: 5,
    keywords: ['shihonage', 'counter', 'four directions', 'reversal', 'kaeshi'],
    relatedTerms: ['kaeshi_waza', 'shihonage', 'kuzushi', 'timing']
  },
  {
    id: 'timing_reversal',
    japanese: '逆タイミング',
    romaji: 'gya-ku ta-i-min-gu',
    french: 'Timing inversé',
    english: 'Reversal timing',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Clock', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Instant de retournement',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Timing précis pour kaeshi waza. Trop tôt = technique pas engagée. Trop tard = déjà contrôlé. Moment parfait = juste avant point de non-retour.',
    difficulty: 5,
    keywords: ['timing', 'reversal', 'kaeshi', 'moment', 'precision'],
    relatedTerms: ['kaeshi_waza', 'timing', 'ma', 'awase']
  },
  {
    id: 'sen_timing',
    japanese: '先',
    romaji: 'sen',
    french: 'Initiative',
    english: 'Initiative',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Zap', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Prendre devant',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Concept d\'initiative. Sen = prendre devant. Sen no sen = anticiper. Go no sen = répondre. Sen sen no sen = dominer intention. Base timing kaeshi.',
    difficulty: 5,
    keywords: ['sen', 'initiative', 'timing', 'anticipation', 'strategy'],
    relatedTerms: ['timing', 'kaeshi_waza', 'strategy', 'awase']
  },
  {
    id: 'committed_attack',
    japanese: '完全攻撃',
    romaji: 'kan-zen ko-ge-ki',
    french: 'Attaque engagée',
    english: 'Committed attack',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Target', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Engagement total',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Attaque avec engagement total nécessaire pour kaeshi. Si uke retient, kaeshi impossible. Confiance mutuelle essentielle pour entraînement.',
    difficulty: 4,
    keywords: ['committed', 'attack', 'engagement', 'trust', 'full'],
    relatedTerms: ['kaeshi_waza', 'trust', 'training', 'sincerity']
  },
  {
    id: 'feeling_commitment',
    japanese: '決意を感じる',
    romaji: 'ke-tsui wo kan-ji-ru',
    french: 'Sentir l\'engagement',
    english: 'Feeling commitment',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Gauge', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Perception intention',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Sentir quand partenaire est engagé dans technique. Point de non-retour senti physiquement. Permet timing parfait du contre.',
    difficulty: 5,
    keywords: ['feeling', 'sensing', 'commitment', 'perception', 'awase'],
    relatedTerms: ['kaeshi_waza', 'musubi', 'awase', 'listening']
  },
  {
    id: 'mutual_respect',
    japanese: '相互尊重',
    romaji: 'so-go son-cho',
    french: 'Respect mutuel',
    english: 'Mutual respect',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'HandHeart', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Confiance partagée',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Kaeshi waza nécessite respect et confiance mutuels. Uke doit attaquer sincèrement. Tori ne doit pas abuser. Dialogue corporel.',
    difficulty: 3,
    keywords: ['respect', 'mutual', 'trust', 'dialogue', 'partnership'],
    relatedTerms: ['kaeshi_waza', 'trust', 'etiquette', 'partnership']
  },
  {
    id: 'escape_vs_counter',
    japanese: '逃避対反撃',
    romaji: 'to-hi tai han-ge-ki',
    french: 'Échappement vs contre',
    english: 'Escape vs counter',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'GitBranch', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Choix tactique',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Différence entre échappement (fuir) et contre (retourner). Kaeshi = retourner technique. Pas simplement échapper. Choix selon situation.',
    difficulty: 4,
    keywords: ['escape', 'counter', 'choice', 'tactics', 'strategy'],
    relatedTerms: ['kaeshi_waza', 'strategy', 'tactics', 'henka_waza']
  },
  {
    id: 'advanced_awase',
    japanese: '高度合わせ',
    romaji: 'ko-do a-wa-se',
    french: 'Harmonisation avancée',
    english: 'Advanced blending',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Merge', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Fusion supérieure',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Awase avancé pour kaeshi. Fusionner complètement avec attaque pour la retourner. Plus subtil que awase basique. Maîtrise du timing.',
    difficulty: 5,
    keywords: ['awase', 'blending', 'advanced', 'fusion', 'timing'],
    relatedTerms: ['awase', 'kaeshi_waza', 'musubi', 'timing']
  }
]

function generateOrange1Unit4Exercises(): Exercise[] {
  const exercises: Exercise[] = []

  exercises.push({
    id: 'orange1_unit4_ex1',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Kaeshi waza" (techniques de contre) ?',
    terminologyItem: orange1Unit4Terminology[0],
    options: [
      { id: 'opt1', value: 'Retournement technique', iconData: orange1Unit4Terminology[0].iconData, isCorrect: true },
      { id: 'opt2', value: 'Inversion kotegaeshi', iconData: orange1Unit4Terminology[1].iconData, isCorrect: false },
      { id: 'opt3', value: 'Instant retournement', iconData: orange1Unit4Terminology[3].iconData, isCorrect: false },
      { id: 'opt4', value: 'Prendre devant', iconData: orange1Unit4Terminology[4].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Kaeshi = retourner, inverser la technique',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit4_ex2',
    type: 'icon_to_term',
    question: 'Quel est le moment critique pour réussir kaeshi waza ?',
    terminologyItem: orange1Unit4Terminology[3],
    options: [
      { id: 'opt1', value: 'Juste avant le point de non-retour', isCorrect: true },
      { id: 'opt2', value: 'Au tout début de l\'attaque', isCorrect: false },
      { id: 'opt3', value: 'Après être complètement contrôlé', isCorrect: false },
      { id: 'opt4', value: 'N\'importe quand', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Ni trop tôt ni trop tard - timing parfait essentiel',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit4_ex3',
    type: 'term_to_icon',
    question: 'Quel concept stratégique guide le timing des contres ?',
    terminologyItem: orange1Unit4Terminology[4],
    options: [
      { id: 'opt1', value: 'Initiative (sen)', iconData: orange1Unit4Terminology[4].iconData, isCorrect: true },
      { id: 'opt2', value: 'Engagement total', iconData: orange1Unit4Terminology[5].iconData, isCorrect: false },
      { id: 'opt3', value: 'Choix tactique', iconData: orange1Unit4Terminology[8].iconData, isCorrect: false },
      { id: 'opt4', value: 'Fusion supérieure', iconData: orange1Unit4Terminology[9].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Sen = initiative, anticiper l\'intention',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit4_ex4',
    type: 'icon_to_term',
    question: 'Qu\'est-ce qui rend kaeshi waza possible pendant l\'entraînement ?',
    terminologyItem: orange1Unit4Terminology[5],
    options: [
      { id: 'opt1', value: 'Attaque sincère et engagée', isCorrect: true },
      { id: 'opt2', value: 'Attaque retenue et hésitante', isCorrect: false },
      { id: 'opt3', value: 'Résistance passive', isCorrect: false },
      { id: 'opt4', value: 'Mouvement incomplet', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Si uke retient, kaeshi impossible. Engagement total nécessaire',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit4_ex5',
    type: 'term_to_icon',
    question: 'Quelle capacité permet de détecter le bon moment ?',
    terminologyItem: orange1Unit4Terminology[6],
    options: [
      { id: 'opt1', value: 'Perception intention', iconData: orange1Unit4Terminology[6].iconData, isCorrect: true },
      { id: 'opt2', value: 'Confiance partagée', iconData: orange1Unit4Terminology[7].iconData, isCorrect: false },
      { id: 'opt3', value: 'Choix tactique', iconData: orange1Unit4Terminology[8].iconData, isCorrect: false },
      { id: 'opt4', value: 'Retournement', iconData: orange1Unit4Terminology[0].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Sentir quand partenaire est engagé = timing parfait',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit4_ex6',
    type: 'icon_to_term',
    question: 'Quelle attitude est essentielle pour pratiquer kaeshi waza ?',
    terminologyItem: orange1Unit4Terminology[7],
    options: [
      { id: 'opt1', value: 'Respect et confiance mutuels', isCorrect: true },
      { id: 'opt2', value: 'Compétition agressive', isCorrect: false },
      { id: 'opt3', value: 'Méfiance constante', isCorrect: false },
      { id: 'opt4', value: 'Individualisme', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Dialogue corporel nécessite confiance partagée',
    difficulty: 3,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit4_ex7',
    type: 'term_to_icon',
    question: 'Quelle est la différence entre échappement et contre ?',
    terminologyItem: orange1Unit4Terminology[8],
    options: [
      { id: 'opt1', value: 'Choix tactique', iconData: orange1Unit4Terminology[8].iconData, isCorrect: true },
      { id: 'opt2', value: 'Instant retournement', iconData: orange1Unit4Terminology[3].iconData, isCorrect: false },
      { id: 'opt3', value: 'Initiative', iconData: orange1Unit4Terminology[4].iconData, isCorrect: false },
      { id: 'opt4', value: 'Inversion technique', iconData: orange1Unit4Terminology[0].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Kaeshi = retourner vs fuir. Choix selon situation',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit4_ex8',
    type: 'icon_to_term',
    question: 'Comment contrer kotegaeshi efficacement ?',
    terminologyItem: orange1Unit4Terminology[1],
    options: [
      { id: 'opt1', value: 'Kotegaeshi inverse au bon timing', isCorrect: true },
      { id: 'opt2', value: 'Force brute opposée', isCorrect: false },
      { id: 'opt3', value: 'Résistance rigide', isCorrect: false },
      { id: 'opt4', value: 'Échappement simple', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Retourner avec même principe - timing critique',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit4_ex9_recall',
    type: 'free_recall',
    question: 'Expliquez pourquoi kaeshi waza nécessite niveau technique avancé',
    terminologyItem: orange1Unit4Terminology[0],
    options: [
      { id: 'hard', value: 'Je ne sais pas', isCorrect: false },
      { id: 'medium', value: 'Je connais quelques contres', isCorrect: false },
      { id: 'good', value: 'Je comprends timing et awase requis', isCorrect: true },
      { id: 'easy', value: 'Je peux appliquer spontanément', isCorrect: true }
    ],
    correctAnswer: 'good',
    hint: 'Nécessite: timing parfait, awase avancé, compréhension profonde, confiance',
    difficulty: 5,
    estimatedTime: 30
  })

  exercises.push({
    id: 'orange1_unit4_ex10',
    type: 'term_to_icon',
    question: 'Quel niveau d\'awase est requis pour kaeshi waza ?',
    terminologyItem: orange1Unit4Terminology[9],
    options: [
      { id: 'opt1', value: 'Fusion supérieure', iconData: orange1Unit4Terminology[9].iconData, isCorrect: true },
      { id: 'opt2', value: 'Harmonisation basique', iconData: orange1Unit4Terminology[7].iconData, isCorrect: false },
      { id: 'opt3', value: 'Opposition directe', iconData: orange1Unit4Terminology[5].iconData, isCorrect: false },
      { id: 'opt4', value: 'Contact minimal', iconData: orange1Unit4Terminology[6].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Awase avancé = fusionner complètement pour retourner',
    difficulty: 5,
    estimatedTime: 15
  })

  return exercises
}

export const orange1Unit4: LearningUnit = {
  id: 'orange1_unit4',
  title: 'Kaeshi Waza - Techniques de contre',
  description: 'Art du retournement technique. Nécessite timing parfait, awase avancé et confiance mutuelle.',

  beltLevel: 'white_1',
  category: 'techniques',

  terminology: orange1Unit4Terminology,
  exercises: generateOrange1Unit4Exercises(),

  targetScore: 80,
  estimatedTime: 35,

  prerequisites: ['orange1_unit3'],
  isSafetyCritical: false
}
