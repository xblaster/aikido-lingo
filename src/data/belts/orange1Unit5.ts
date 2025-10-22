/**
 * Unit 5: Weapons Combinations - Jo & Bokken Integration (1er Kyū - Orange Belt)
 * Advanced weapons work with partner kata
 */

import { TerminologyItem, LearningUnit, Exercise } from '@/types'

export const orange1Unit5Terminology: TerminologyItem[] = [
  {
    id: 'kumijo',
    japanese: '組杖',
    romaji: 'ku-mi-jo',
    french: 'Kata de jo en paire',
    english: 'Paired jo kata',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Swords', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Duo de bâtons',
    category: 'weapons',
    beltLevel: 'white_1',
    description: 'Kata de jo pratiqué en paire. Dialogue rythmique entre deux partenaires. Enseigne timing, distance et flux d\'énergie avec arme.',
    difficulty: 5,
    keywords: ['kumijo', 'jo', 'paired', 'kata', 'weapons'],
    relatedTerms: ['jo', 'kata', 'kumitachi', 'partner_practice']
  },
  {
    id: 'kumitachi',
    japanese: '組太刀',
    romaji: 'ku-mi-ta-chi',
    french: 'Kata de bokken en paire',
    english: 'Paired bokken kata',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Swords', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Duo de sabres',
    category: 'weapons',
    beltLevel: 'white_1',
    description: 'Kata de bokken pratiqué en paire. Échange chorégraphié d\'attaques et défenses. Développe précision et contrôle avec sabre.',
    difficulty: 5,
    keywords: ['kumitachi', 'bokken', 'paired', 'kata', 'sword'],
    relatedTerms: ['bokken', 'kata', 'kumijo', 'kenjutsu']
  },
  {
    id: 'awase_no_tsuki',
    japanese: '合わせの突き',
    romaji: 'a-wa-se no tsu-ki',
    french: 'Coup de pointe harmonisé',
    english: 'Blended thrust',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'MoveRight', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Pointe synchronisée',
    category: 'weapons',
    beltLevel: 'white_1',
    description: 'Technique de pointe (tsuki) en harmonie avec partenaire. Dans kumijo, synchroniser pointes pour créer flux. Base de kumijo.',
    difficulty: 5,
    keywords: ['awase', 'tsuki', 'thrust', 'jo', 'synchronized'],
    relatedTerms: ['kumijo', 'tsuki', 'awase', 'timing']
  },
  {
    id: 'uchikomi',
    japanese: '打ち込み',
    romaji: 'u-chi-ko-mi',
    french: 'Frappe répétée',
    english: 'Repeated strike',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'ChevronsDown', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Entraînement intensif',
    category: 'weapons',
    beltLevel: 'white_1',
    description: 'Pratique de frappes répétées pour développer forme et puissance. Uke attaque continuellement, tori répond. Développe endurance et précision.',
    difficulty: 4,
    keywords: ['uchikomi', 'repeated', 'strike', 'training', 'intensity'],
    relatedTerms: ['kumitachi', 'bokken', 'training', 'kihon']
  },
  {
    id: 'hikitate_geiko',
    japanese: '引き立て稽古',
    romaji: 'hi-ki-ta-te ge-i-ko',
    french: 'Entraînement pour élever',
    english: 'Training to elevate',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'TrendingUp', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Élever le partenaire',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Concept d\'entraînement pour élever partenaire. Senior adapte niveau pour challenger junior constructivement. Pas écraser, mais développer.',
    difficulty: 4,
    keywords: ['hikitate', 'geiko', 'training', 'elevate', 'teaching'],
    relatedTerms: ['training', 'teaching', 'partnership', 'respect']
  },
  {
    id: 'ma_ai_weapons',
    japanese: '武器間合い',
    romaji: 'bu-ki ma-ai',
    french: 'Distance avec armes',
    english: 'Weapons distance',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Ruler', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Portée étendue',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Distance appropriée avec armes. Plus longue qu\'à mains nues. Jo et bokken étendent portée. Comprendre issoku itto (une coupe, un pas).',
    difficulty: 5,
    keywords: ['maai', 'distance', 'weapons', 'range', 'spacing'],
    relatedTerms: ['maai', 'issoku_itto', 'weapons', 'distance']
  },
  {
    id: 'weapon_safety_partner',
    japanese: '武器安全',
    romaji: 'bu-ki an-zen',
    french: 'Sécurité avec armes',
    english: 'Weapons safety',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'ShieldAlert', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Prudence maximale',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'SÉCURITÉ CRITIQUE : Contrôle absolu avec armes. Bokken et jo peuvent blesser gravement. Arrêter coups, jamais impact complet. Awareness totale.',
    difficulty: 2,
    keywords: ['safety', 'weapons', 'control', 'awareness', 'sécurité'],
    relatedTerms: ['weapons', 'safety', 'control', 'awareness']
  },
  {
    id: 'ki_ken_tai_ichi',
    japanese: '気剣体一',
    romaji: 'ki-ken-tai-i-chi',
    french: 'Esprit-sabre-corps unis',
    english: 'Spirit-sword-body unity',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Sparkles', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Unité totale',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Principe d\'unité esprit-sabre-corps. Les trois doivent bouger ensemble. Esprit guide, sabre est extension, corps exécute. Unité = puissance.',
    difficulty: 5,
    keywords: ['ki', 'ken', 'tai', 'unity', 'spirit'],
    relatedTerms: ['ki', 'weapons', 'unity', 'principle']
  },
  {
    id: 'kiai_weapons',
    japanese: '気合',
    romaji: 'ki-ai',
    french: 'Cri d\'énergie',
    english: 'Spirit shout',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Volume2', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Unification vocale',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Kiai dans pratique d\'armes. Exprime unification ki-ken-tai. Renforce frappe, projette intention, unité esprit-corps. Ya! Toh! Ei!',
    difficulty: 3,
    keywords: ['kiai', 'shout', 'spirit', 'energy', 'vocal'],
    relatedTerms: ['ki', 'kiai', 'spirit', 'weapons']
  },
  {
    id: 'weapons_flow',
    japanese: '武器流れ',
    romaji: 'bu-ki na-ga-re',
    french: 'Flux avec armes',
    english: 'Weapons flow',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Waves', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Fluidité armée',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Concept de nagare (flux) appliqué aux armes. Mouvements fluides et continus. Arme devient extension naturelle. Pas saccadé, mais comme eau.',
    difficulty: 5,
    keywords: ['weapons', 'flow', 'nagare', 'fluidity', 'continuous'],
    relatedTerms: ['nagare', 'weapons', 'fluidity', 'natural']
  }
]

function generateOrange1Unit5Exercises(): Exercise[] {
  const exercises: Exercise[] = []

  exercises.push({
    id: 'orange1_unit5_ex1',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Kumijo" (kata de jo en paire) ?',
    terminologyItem: orange1Unit5Terminology[0],
    options: [
      { id: 'opt1', value: 'Duo de bâtons', iconData: orange1Unit5Terminology[0].iconData, isCorrect: true },
      { id: 'opt2', value: 'Pointe synchronisée', iconData: orange1Unit5Terminology[2].iconData, isCorrect: false },
      { id: 'opt3', value: 'Frappe répétée', iconData: orange1Unit5Terminology[3].iconData, isCorrect: false },
      { id: 'opt4', value: 'Fluidité armée', iconData: orange1Unit5Terminology[9].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Kumijo = pratique en paire avec jo',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit5_ex2_safety',
    type: 'safety_quiz',
    question: 'Comment devez-vous contrôler vos frappes d\'armes en kumitachi ?',
    terminologyItem: orange1Unit5Terminology[6],
    options: [
      { id: 'opt1', value: 'Arrêter coups, jamais impact complet', isCorrect: true },
      { id: 'opt2', value: 'Frapper avec force maximale', isCorrect: false },
      { id: 'opt3', value: 'Contact modéré acceptable', isCorrect: false },
      { id: 'opt4', value: 'Vitesse prime sur contrôle', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    context: 'CRITIQUE : Bokken et jo peuvent causer blessures graves. Contrôle absolu obligatoire.',
    difficulty: 2,
    estimatedTime: 20
  })

  exercises.push({
    id: 'orange1_unit5_ex3',
    type: 'icon_to_term',
    question: 'Quelle différence de distance existe avec armes vs mains nues ?',
    terminologyItem: orange1Unit5Terminology[5],
    options: [
      { id: 'opt1', value: 'Distance étendue (portée des armes)', isCorrect: true },
      { id: 'opt2', value: 'Même distance exactement', isCorrect: false },
      { id: 'opt3', value: 'Distance plus courte', isCorrect: false },
      { id: 'opt4', value: 'Distance variable aléatoire', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Armes étendent portée - ma-ai différent',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit5_ex4',
    type: 'term_to_icon',
    question: 'Quel principe unit esprit, sabre et corps ?',
    terminologyItem: orange1Unit5Terminology[7],
    options: [
      { id: 'opt1', value: 'Unité totale', iconData: orange1Unit5Terminology[7].iconData, isCorrect: true },
      { id: 'opt2', value: 'Unification vocale', iconData: orange1Unit5Terminology[8].iconData, isCorrect: false },
      { id: 'opt3', value: 'Portée étendue', iconData: orange1Unit5Terminology[5].iconData, isCorrect: false },
      { id: 'opt4', value: 'Élever partenaire', iconData: orange1Unit5Terminology[4].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Ki-ken-tai-ichi = les trois bougent ensemble',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit5_ex5',
    type: 'icon_to_term',
    question: 'Quel type d\'entraînement élève le partenaire constructivement ?',
    terminologyItem: orange1Unit5Terminology[4],
    options: [
      { id: 'opt1', value: 'Hikitate geiko (entraînement pour élever)', isCorrect: true },
      { id: 'opt2', value: 'Écraser le junior', isCorrect: false },
      { id: 'opt3', value: 'Ne jamais challenger', isCorrect: false },
      { id: 'opt4', value: 'Compétition pure', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Senior adapte pour développer, pas dominer',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit5_ex6',
    type: 'term_to_icon',
    question: 'Quelle technique de base utilise kumijo ?',
    terminologyItem: orange1Unit5Terminology[2],
    options: [
      { id: 'opt1', value: 'Pointe synchronisée', iconData: orange1Unit5Terminology[2].iconData, isCorrect: true },
      { id: 'opt2', value: 'Duo sabres', iconData: orange1Unit5Terminology[1].iconData, isCorrect: false },
      { id: 'opt3', value: 'Entraînement intensif', iconData: orange1Unit5Terminology[3].iconData, isCorrect: false },
      { id: 'opt4', value: 'Prudence maximale', iconData: orange1Unit5Terminology[6].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Awase no tsuki = pointes harmonisées',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit5_ex7',
    type: 'icon_to_term',
    question: 'Quel type de pratique développe endurance et précision au bokken ?',
    terminologyItem: orange1Unit5Terminology[3],
    options: [
      { id: 'opt1', value: 'Uchikomi (frappes répétées)', isCorrect: true },
      { id: 'opt2', value: 'Une seule frappe parfaite', isCorrect: false },
      { id: 'opt3', value: 'Méditation statique', isCorrect: false },
      { id: 'opt4', value: 'Théorie seulement', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Répétition intensive développe forme et puissance',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit5_ex8',
    type: 'term_to_icon',
    question: 'Qu\'exprime le kiai dans la pratique d\'armes ?',
    terminologyItem: orange1Unit5Terminology[8],
    options: [
      { id: 'opt1', value: 'Unification vocale', iconData: orange1Unit5Terminology[8].iconData, isCorrect: true },
      { id: 'opt2', value: 'Unité esprit-corps', iconData: orange1Unit5Terminology[7].iconData, isCorrect: false },
      { id: 'opt3', value: 'Prudence maximale', iconData: orange1Unit5Terminology[6].iconData, isCorrect: false },
      { id: 'opt4', value: 'Fluidité armée', iconData: orange1Unit5Terminology[9].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Kiai renforce frappe et projette intention',
    difficulty: 3,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit5_ex9_recall',
    type: 'free_recall',
    question: 'Expliquez la différence entre kumijo et kumitachi',
    terminologyItem: orange1Unit5Terminology[0],
    options: [
      { id: 'hard', value: 'Je ne sais pas', isCorrect: false },
      { id: 'medium', value: 'Je connais les armes utilisées', isCorrect: false },
      { id: 'good', value: 'Je peux décrire les deux kata', isCorrect: true },
      { id: 'easy', value: 'Je peux démontrer les deux', isCorrect: true }
    ],
    correctAnswer: 'good',
    hint: 'Kumijo = jo (bâton), kumitachi = bokken (sabre), tous deux en paire',
    difficulty: 4,
    estimatedTime: 25
  })

  exercises.push({
    id: 'orange1_unit5_ex10',
    type: 'term_to_icon',
    question: 'Comment doivent être les mouvements d\'armes avancés ?',
    terminologyItem: orange1Unit5Terminology[9],
    options: [
      { id: 'opt1', value: 'Fluidité armée', iconData: orange1Unit5Terminology[9].iconData, isCorrect: true },
      { id: 'opt2', value: 'Saccadés et brusques', iconData: orange1Unit5Terminology[3].iconData, isCorrect: false },
      { id: 'opt3', value: 'Rigides et mécaniques', iconData: orange1Unit5Terminology[6].iconData, isCorrect: false },
      { id: 'opt4', value: 'Hésitants et prudents', iconData: orange1Unit5Terminology[4].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Nagare = flux continu, arme comme extension naturelle',
    difficulty: 5,
    estimatedTime: 15
  })

  return exercises
}

export const orange1Unit5: LearningUnit = {
  id: 'orange1_unit5',
  title: 'Weapons Combinations - Jo & Bokken',
  description: 'Kumijo et kumitachi. Pratique en paire développant timing, distance et flux avec armes. Contrôle absolu requis.',

  beltLevel: 'white_1',
  category: 'weapons',

  terminology: orange1Unit5Terminology,
  exercises: generateOrange1Unit5Exercises(),

  targetScore: 80,
  estimatedTime: 30,

  prerequisites: ['orange1_unit4'],
  isSafetyCritical: true // Weapons require absolute control
}
