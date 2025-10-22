/**
 * Unit 4: Weapons Mastery (1er Dan - Black Belt)
 * Advanced jo, bokken, tanto techniques and kata
 */

import { TerminologyItem, LearningUnit, Exercise } from '@/types'

export const black1Unit4Terminology: TerminologyItem[] = [
  {
    id: 'advanced_jo_kata',
    japanese: '高度杖型',
    romaji: 'ko-do jo ka-ta',
    french: 'Kata de jo avancés',
    english: 'Advanced jo kata',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Minus', color: '#000000', strokeWidth: 3 },
    iconCaption: 'Formes supérieures',
    category: 'weapons',
    beltLevel: 'black_1',
    description: 'Kata de jo niveau avancé. Séquences complexes intégrant multiples techniques. Précision, timing et flux doivent être parfaits.',
    difficulty: 5,
    keywords: ['jo', 'kata', 'advanced', 'complex', 'precision'],
    relatedTerms: ['jo', 'kata', 'weapons', 'precision']
  },
  {
    id: 'advanced_bokken_kata',
    japanese: '高度木剣型',
    romaji: 'ko-do bo-kken ka-ta',
    french: 'Kata de bokken avancés',
    english: 'Advanced bokken kata',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Sword', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Sabre maîtrisé',
    category: 'weapons',
    beltLevel: 'black_1',
    description: 'Kata de bokken avancés. Mouvements fluides combinant coupes, parades, estocs. Exige control total et grâce.',
    difficulty: 5,
    keywords: ['bokken', 'kata', 'advanced', 'cuts', 'flow'],
    relatedTerms: ['bokken', 'kata', 'kenjutsu', 'precision']
  },
  {
    id: 'tanto_dori_mastery',
    japanese: '短刀取り習得',
    romaji: 'tan-to do-ri shu-to-ku',
    french: 'Maîtrise défense couteau',
    english: 'Knife defense mastery',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'ShieldAlert', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Défense lame',
    category: 'weapons',
    beltLevel: 'black_1',
    description: 'Maîtrise complète tanto dori. Multiples angles, vitesses, situations. Comprendre danger réel. Distance, timing, contrôle lame critiques.',
    difficulty: 5,
    keywords: ['tanto', 'dori', 'knife', 'defense', 'mastery'],
    relatedTerms: ['tanto', 'defense', 'safety', 'control']
  },
  {
    id: 'weapon_extension_body',
    japanese: '武器体延長',
    romaji: 'bu-ki ka-ra-da en-cho',
    french: 'Arme extension corps',
    english: 'Weapon as body extension',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Link', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Unité organique',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Arme devient véritable extension du corps. Pas objet séparé. Intégrée dans mouvement naturel. Bouger avec, pas l\'agiter.',
    difficulty: 5,
    keywords: ['weapon', 'extension', 'body', 'unity', 'integration'],
    relatedTerms: ['weapons', 'unity', 'integration', 'natural']
  },
  {
    id: 'weapons_timing',
    japanese: '武器タイミング',
    romaji: 'bu-ki ta-i-min-gu',
    french: 'Timing avec armes',
    english: 'Weapons timing',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Clock', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Synchronisation armée',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Timing diffère avec armes. Distance augmentée change timing. Issoku itto = une coupe, un pas. Maîtriser tempo différent.',
    difficulty: 5,
    keywords: ['weapons', 'timing', 'distance', 'issoku', 'tempo'],
    relatedTerms: ['timing', 'maai', 'issoku_itto', 'weapons']
  },
  {
    id: 'weapon_awareness',
    japanese: '武器意識',
    romaji: 'bu-ki i-shi-ki',
    french: 'Conscience de l\'arme',
    english: 'Weapon awareness',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Eye', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Perception étendue',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Conscience de position arme à tout moment. Sentir bout du jo/bokken comme doigt. Awareness spatiale étendue. Éviter contacts accidentels.',
    difficulty: 5,
    keywords: ['weapon', 'awareness', 'consciousness', 'spatial', 'safety'],
    relatedTerms: ['awareness', 'weapons', 'safety', 'spatial']
  },
  {
    id: 'tanto_safety_absolute',
    japanese: '短刀絶対安全',
    romaji: 'tan-to ze-tta-i an-zen',
    french: 'Sécurité tanto absolue',
    english: 'Absolute tanto safety',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'ShieldCheck', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Prudence maximale',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'SÉCURITÉ CRITIQUE : Tanto (même bois) = danger. Contrôle absolu requis. Jamais pointer vers visage. Awareness totale. Respect de la lame.',
    difficulty: 2,
    keywords: ['tanto', 'safety', 'absolute', 'control', 'respect'],
    relatedTerms: ['tanto', 'safety', 'control', 'awareness']
  },
  {
    id: 'tenouchi',
    japanese: '手の内',
    romaji: 'te-no-u-chi',
    french: 'Prise interne',
    english: 'Inside of hand',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Hand', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Saisie subtile',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Art de tenir arme correctement. Tenouchi = "dedans la main". Ferme mais relaxé. Trop serré = rigide. Trop lâche = perte contrôle. Balance subtile.',
    difficulty: 5,
    keywords: ['tenouchi', 'grip', 'hand', 'holding', 'subtle'],
    relatedTerms: ['grip', 'control', 'weapons', 'subtlety']
  },
  {
    id: 'cutting_spirit',
    japanese: '切る精神',
    romaji: 'ki-ru se-i-shin',
    french: 'Esprit de coupe',
    english: 'Cutting spirit',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Zap', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Intention tranchante',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Intention de couper réellement avec bokken. Pas geste vide. Esprit déterminé rend technique vivante. Kiru = couper avec conviction.',
    difficulty: 5,
    keywords: ['cutting', 'spirit', 'intention', 'kiru', 'conviction'],
    relatedTerms: ['spirit', 'intention', 'bokken', 'commitment']
  },
  {
    id: 'weapons_meditation',
    japanese: '武器瞑想',
    romaji: 'bu-ki me-i-so',
    french: 'Méditation avec armes',
    english: 'Weapons meditation',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Sparkles', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Focus méditatif',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Pratique d\'armes comme méditation en mouvement. Concentration absolue. Esprit calme, corps précis. Kata deviennent pratique spirituelle.',
    difficulty: 5,
    keywords: ['weapons', 'meditation', 'focus', 'spiritual', 'concentration'],
    relatedTerms: ['meditation', 'focus', 'kata', 'spiritual']
  }
]

function generateBlack1Unit4Exercises(): Exercise[] {
  const exercises: Exercise[] = []

  exercises.push({
    id: 'black1_unit4_ex1',
    type: 'term_to_icon',
    question: 'Quel niveau de kata de jo est atteint au shodan ?',
    terminologyItem: black1Unit4Terminology[0],
    options: [
      { id: 'opt1', value: 'Formes supérieures', iconData: black1Unit4Terminology[0].iconData, isCorrect: true },
      { id: 'opt2', value: 'Sabre maîtrisé', iconData: black1Unit4Terminology[1].iconData, isCorrect: false },
      { id: 'opt3', value: 'Défense lame', iconData: black1Unit4Terminology[2].iconData, isCorrect: false },
      { id: 'opt4', value: 'Focus méditatif', iconData: black1Unit4Terminology[9].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Séquences complexes, précision parfaite',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit4_ex2_safety',
    type: 'safety_quiz',
    question: 'Comment devez-vous traiter tanto même en bois ?',
    terminologyItem: black1Unit4Terminology[6],
    options: [
      { id: 'opt1', value: 'Comme danger réel - contrôle absolu', isCorrect: true },
      { id: 'opt2', value: 'Décontracté car bois', isCorrect: false },
      { id: 'opt3', value: 'Pointer librement', isCorrect: false },
      { id: 'opt4', value: 'Sans attention particulière', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    context: 'CRITIQUE : Tanto bois peut blesser. Jamais pointer visage, contrôle total, respect de la lame.',
    difficulty: 2,
    estimatedTime: 20
  })

  exercises.push({
    id: 'black1_unit4_ex3',
    type: 'icon_to_term',
    question: 'Comment une arme doit-elle être intégrée au mouvement ?',
    terminologyItem: black1Unit4Terminology[3],
    options: [
      { id: 'opt1', value: 'Comme extension naturelle du corps', isCorrect: true },
      { id: 'opt2', value: 'Comme objet séparé agité', isCorrect: false },
      { id: 'opt3', value: 'En y pensant constamment', isCorrect: false },
      { id: 'opt4', value: 'Avec effort conscient', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Unité organique - bouger avec, pas l\'agiter',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit4_ex4',
    type: 'term_to_icon',
    question: 'Qu\'est-ce qui change le timing en pratique d\'armes ?',
    terminologyItem: black1Unit4Terminology[4],
    options: [
      { id: 'opt1', value: 'Synchronisation armée', iconData: black1Unit4Terminology[4].iconData, isCorrect: true },
      { id: 'opt2', value: 'Perception étendue', iconData: black1Unit4Terminology[5].iconData, isCorrect: false },
      { id: 'opt3', value: 'Saisie subtile', iconData: black1Unit4Terminology[7].iconData, isCorrect: false },
      { id: 'opt4', value: 'Intention tranchante', iconData: black1Unit4Terminology[8].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Distance augmentée = tempo différent',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit4_ex5',
    type: 'icon_to_term',
    question: 'Quelle conscience spatiale est requise avec armes ?',
    terminologyItem: black1Unit4Terminology[5],
    options: [
      { id: 'opt1', value: 'Sentir bout arme comme un doigt', isCorrect: true },
      { id: 'opt2', value: 'Ne penser qu\'à la main', isCorrect: false },
      { id: 'opt3', value: 'Ignorer position arme', isCorrect: false },
      { id: 'opt4', value: 'Focus vision uniquement', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Awareness spatiale étendue - éviter contacts',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit4_ex6',
    type: 'term_to_icon',
    question: 'Comment devez-vous tenir une arme (tenouchi) ?',
    terminologyItem: black1Unit4Terminology[7],
    options: [
      { id: 'opt1', value: 'Saisie subtile', iconData: black1Unit4Terminology[7].iconData, isCorrect: true },
      { id: 'opt2', value: 'Serré maximum', iconData: black1Unit4Terminology[8].iconData, isCorrect: false },
      { id: 'opt3', value: 'Très lâche', iconData: black1Unit4Terminology[3].iconData, isCorrect: false },
      { id: 'opt4', value: 'Variable aléatoire', iconData: black1Unit4Terminology[5].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Ferme mais relaxé - balance subtile',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit4_ex7',
    type: 'icon_to_term',
    question: 'Quelle intention rend bokken technique vivante ?',
    terminologyItem: black1Unit4Terminology[8],
    options: [
      { id: 'opt1', value: 'Esprit de couper réellement (kiru)', isCorrect: true },
      { id: 'opt2', value: 'Geste vide et mou', isCorrect: false },
      { id: 'opt3', value: 'Mouvement sans conviction', isCorrect: false },
      { id: 'opt4', value: 'Hésitation prudente', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Intention déterminée = technique vivante',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit4_ex8',
    type: 'term_to_icon',
    question: 'Quelle est la dimension spirituelle de la pratique d\'armes ?',
    terminologyItem: black1Unit4Terminology[9],
    options: [
      { id: 'opt1', value: 'Focus méditatif', iconData: black1Unit4Terminology[9].iconData, isCorrect: true },
      { id: 'opt2', value: 'Unité organique', iconData: black1Unit4Terminology[3].iconData, isCorrect: false },
      { id: 'opt3', value: 'Défense lame', iconData: black1Unit4Terminology[2].iconData, isCorrect: false },
      { id: 'opt4', value: 'Prudence maximale', iconData: black1Unit4Terminology[6].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Kata comme méditation en mouvement',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit4_ex9_recall',
    type: 'free_recall',
    question: 'Expliquez pourquoi maîtrise tanto dori est critique pour shodan',
    terminologyItem: black1Unit4Terminology[2],
    options: [
      { id: 'hard', value: 'Je ne sais pas', isCorrect: false },
      { id: 'medium', value: 'Je connais quelques techniques', isCorrect: false },
      { id: 'good', value: 'Je peux expliquer danger réel et principes', isCorrect: true },
      { id: 'easy', value: 'Je peux enseigner tanto dori sécuritairement', isCorrect: true }
    ],
    correctAnswer: 'good',
    hint: 'Distance, timing, contrôle lame, multiples angles, danger réel',
    difficulty: 5,
    estimatedTime: 30
  })

  exercises.push({
    id: 'black1_unit4_ex10',
    type: 'icon_to_term',
    question: 'Que combinent les kata de bokken avancés ?',
    terminologyItem: black1Unit4Terminology[1],
    options: [
      { id: 'opt1', value: 'Coupes, parades, estocs fluides', isCorrect: true },
      { id: 'opt2', value: 'Mouvements rigides séparés', isCorrect: false },
      { id: 'opt3', value: 'Techniques isolées', isCorrect: false },
      { id: 'opt4', value: 'Gestes sans connection', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Contrôle total et grâce dans mouvements fluides',
    difficulty: 5,
    estimatedTime: 15
  })

  return exercises
}

export const black1Unit4: LearningUnit = {
  id: 'black1_unit4',
  title: 'Maîtrise des armes',
  description: 'Kata avancés jo et bokken, maîtrise tanto dori. Arme comme extension corps, timing armé, esprit de coupe.',

  beltLevel: 'black_1',
  category: 'weapons',

  terminology: black1Unit4Terminology,
  exercises: generateBlack1Unit4Exercises(),

  targetScore: 80,
  estimatedTime: 35,

  prerequisites: ['black1_unit3'],
  isSafetyCritical: true // Tanto and weapons require absolute safety
}
