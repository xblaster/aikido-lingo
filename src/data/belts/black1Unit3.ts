/**
 * Unit 3: Jiyu Waza - Free Technique (1er Dan - Black Belt)
 * Spontaneous response, reading attacks, flow state
 */

import { TerminologyItem, LearningUnit, Exercise } from '@/types'

export const black1Unit3Terminology: TerminologyItem[] = [
  {
    id: 'jiyu_waza',
    japanese: '自由技',
    romaji: 'jiyu waza',
    french: 'Technique libre',
    english: 'Free technique',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Wind', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Liberté technique',
    category: 'techniques',
    beltLevel: 'black_1',
    description: 'Technique libre sans forme prédéterminée. Jiyu = liberté. Réponse naturelle émerge selon situation. Sommet de la pratique aikido.',
    difficulty: 5,
    keywords: ['jiyu', 'free', 'technique', 'spontaneous', 'natural'],
    relatedTerms: ['takemusu_aiki', 'mushin', 'nagare', 'spontaneity']
  },
  {
    id: 'reading_intention',
    japanese: '意図を読む',
    romaji: 'ito wo yomu',
    french: 'Lire l\'intention',
    english: 'Reading intention',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Eye', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Percevoir avant',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Capacité à percevoir intention avant mouvement physique. Lire énergie, posture, regard. Permet réponse anticipative naturelle.',
    difficulty: 5,
    keywords: ['reading', 'intention', 'perception', 'anticipation', 'sen'],
    relatedTerms: ['awase', 'sen', 'perception', 'anticipation']
  },
  {
    id: 'empty_mind_response',
    japanese: '空心応答',
    romaji: 'kushin oto',
    french: 'Réponse esprit vide',
    english: 'Empty mind response',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Circle', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Vide réactif',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Répondre depuis esprit vide (mushin). Pas pensée analytique. Corps réagit naturellement comme eau prend forme contenant.',
    difficulty: 5,
    keywords: ['empty', 'mind', 'mushin', 'response', 'natural'],
    relatedTerms: ['mushin', 'natural', 'spontaneous', 'zen']
  },
  {
    id: 'attack_harmony',
    japanese: '攻撃との調和',
    romaji: 'kogeki to no chowa',
    french: 'Harmonie avec attaque',
    english: 'Attack harmony',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Merge', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Fusion avec force',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'S\'harmoniser complètement avec attaque au lieu de bloquer ou éviter. Devenir un avec l\'énergie. Rediriger naturellement.',
    difficulty: 5,
    keywords: ['harmony', 'attack', 'blend', 'awase', 'fusion'],
    relatedTerms: ['awase', 'musubi', 'aiki', 'harmony']
  },
  {
    id: 'flow_without_thought',
    japanese: '無思考流れ',
    romaji: 'mushiko nagare',
    french: 'Flux sans pensée',
    english: 'Flow without thought',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Waves', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Courant naturel',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'État de flux complet sans pensée consciente. Nagare absolu. Technique suit technique sans planification. État méditatif en mouvement.',
    difficulty: 5,
    keywords: ['flow', 'thought', 'nagare', 'natural', 'meditation'],
    relatedTerms: ['nagare', 'mushin', 'flow', 'meditation']
  },
  {
    id: 'natural_technique',
    japanese: '自然技',
    romaji: 'shizen waza',
    french: 'Technique naturelle',
    english: 'Natural technique',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Leaf', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Mouvement organique',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Technique émerge naturellement comme feuille tombe d\'arbre. Pas forcé ou construit. Résultat organique de l\'entraînement profond.',
    difficulty: 5,
    keywords: ['natural', 'technique', 'organic', 'spontaneous', 'effortless'],
    relatedTerms: ['natural', 'spontaneous', 'takemusu', 'organic']
  },
  {
    id: 'no_resistance',
    japanese: '無抵抗',
    romaji: 'muteiko',
    french: 'Sans résistance',
    english: 'No resistance',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Droplet', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Fluidité absolue',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Éliminer toute résistance interne et externe. Comme eau qui n\'oppose pas force mais s\'adapte. Non-résistance = vraie force.',
    difficulty: 5,
    keywords: ['no', 'resistance', 'water', 'adaptation', 'flow'],
    relatedTerms: ['nagare', 'water', 'adaptation', 'softness']
  },
  {
    id: 'beginner_mind',
    japanese: '初心',
    romaji: 'shoshin',
    french: 'Esprit débutant',
    english: 'Beginner mind',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Sparkles', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Fraîcheur perpétuelle',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Garder esprit ouvert du débutant même comme expert. Shoshin = esprit premier. Pas présomptions. Chaque pratique est première fois.',
    difficulty: 4,
    keywords: ['beginner', 'mind', 'shoshin', 'open', 'fresh'],
    relatedTerms: ['learning', 'humility', 'openness', 'zen']
  },
  {
    id: 'play_exploration',
    japanese: '遊び探求',
    romaji: 'asobi tankyu',
    french: 'Jeu exploratoire',
    english: 'Playful exploration',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Smile', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Découverte joyeuse',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Jiyu waza comme jeu exploratoire. Pas performance rigide. Curiosité et joie. Découvrir possibilités avec partenaire. Apprentissage ludique.',
    difficulty: 4,
    keywords: ['play', 'exploration', 'joy', 'discovery', 'curiosity'],
    relatedTerms: ['learning', 'joy', 'exploration', 'partnership']
  },
  {
    id: 'trust_body',
    japanese: '体を信じる',
    romaji: 'karada wo shinjiru',
    french: 'Faire confiance au corps',
    english: 'Trust the body',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Heart', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Confiance corporelle',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Faire confiance au corps entraîné. Esprit doute, corps sait. Des années d\'entraînement créent sagesse corporelle. Lâcher contrôle mental.',
    difficulty: 5,
    keywords: ['trust', 'body', 'confidence', 'training', 'wisdom'],
    relatedTerms: ['mushin', 'trust', 'training', 'body']
  }
]

function generateBlack1Unit3Exercises(): Exercise[] {
  const exercises: Exercise[] = []

  exercises.push({
    id: 'black1_unit3_ex1',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Jiyu waza" (technique libre) ?',
    terminologyItem: black1Unit3Terminology[0],
    options: [
      { id: 'opt1', value: 'Liberté technique', iconData: black1Unit3Terminology[0].iconData, isCorrect: true },
      { id: 'opt2', value: 'Vide réactif', iconData: black1Unit3Terminology[2].iconData, isCorrect: false },
      { id: 'opt3', value: 'Courant naturel', iconData: black1Unit3Terminology[4].iconData, isCorrect: false },
      { id: 'opt4', value: 'Fluidité absolue', iconData: black1Unit3Terminology[6].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Jiyu = liberté, réponse naturelle émerge',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit3_ex2',
    type: 'icon_to_term',
    question: 'Que permet de percevoir avant mouvement physique ?',
    terminologyItem: black1Unit3Terminology[1],
    options: [
      { id: 'opt1', value: 'Lire intention (énergie, posture, regard)', isCorrect: true },
      { id: 'opt2', value: 'Deviner au hasard', isCorrect: false },
      { id: 'opt3', value: 'Attendre contact physique', isCorrect: false },
      { id: 'opt4', value: 'Réagir après coup', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Percevoir intention = réponse anticipative naturelle',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit3_ex3',
    type: 'term_to_icon',
    question: 'Depuis quel état mental devez-vous répondre en jiyu waza ?',
    terminologyItem: black1Unit3Terminology[2],
    options: [
      { id: 'opt1', value: 'Vide réactif', iconData: black1Unit3Terminology[2].iconData, isCorrect: true },
      { id: 'opt2', value: 'Analyse complexe', iconData: black1Unit3Terminology[1].iconData, isCorrect: false },
      { id: 'opt3', value: 'Planification rigide', iconData: black1Unit3Terminology[5].iconData, isCorrect: false },
      { id: 'opt4', value: 'Hésitation prudente', iconData: black1Unit3Terminology[8].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Mushin - corps réagit naturellement',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit3_ex4',
    type: 'icon_to_term',
    question: 'Comment devez-vous vous harmoniser avec une attaque ?',
    terminologyItem: black1Unit3Terminology[3],
    options: [
      { id: 'opt1', value: 'Devenir un avec l\'énergie', isCorrect: true },
      { id: 'opt2', value: 'Bloquer fermement', isCorrect: false },
      { id: 'opt3', value: 'Éviter complètement', isCorrect: false },
      { id: 'opt4', value: 'Opposer force égale', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Fusion avec force, rediriger naturellement',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit3_ex5',
    type: 'term_to_icon',
    question: 'Quel est l\'état ultime de flux en jiyu waza ?',
    terminologyItem: black1Unit3Terminology[4],
    options: [
      { id: 'opt1', value: 'Courant naturel', iconData: black1Unit3Terminology[4].iconData, isCorrect: true },
      { id: 'opt2', value: 'Mouvement organique', iconData: black1Unit3Terminology[5].iconData, isCorrect: false },
      { id: 'opt3', value: 'Confiance corporelle', iconData: black1Unit3Terminology[9].iconData, isCorrect: false },
      { id: 'opt4', value: 'Découverte joyeuse', iconData: black1Unit3Terminology[8].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Technique suit technique sans planification',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit3_ex6',
    type: 'icon_to_term',
    question: 'Comment technique émerge-t-elle en jiyu waza avancé ?',
    terminologyItem: black1Unit3Terminology[5],
    options: [
      { id: 'opt1', value: 'Naturellement, comme feuille tombe', isCorrect: true },
      { id: 'opt2', value: 'Par force et construction', isCorrect: false },
      { id: 'opt3', value: 'Par mémorisation rigide', isCorrect: false },
      { id: 'opt4', value: 'Par effort conscient', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Résultat organique de l\'entraînement profond',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit3_ex7',
    type: 'term_to_icon',
    question: 'Quelle approche caractérise le mouvement en jiyu waza ?',
    terminologyItem: black1Unit3Terminology[6],
    options: [
      { id: 'opt1', value: 'Fluidité absolue', iconData: black1Unit3Terminology[6].iconData, isCorrect: true },
      { id: 'opt2', value: 'Rigidité forte', iconData: black1Unit3Terminology[9].iconData, isCorrect: false },
      { id: 'opt3', value: 'Opposition directe', iconData: black1Unit3Terminology[3].iconData, isCorrect: false },
      { id: 'opt4', value: 'Blocage systématique', iconData: black1Unit3Terminology[1].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Comme eau - non-résistance = vraie force',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit3_ex8',
    type: 'icon_to_term',
    question: 'Quel état d\'esprit maintenir même en tant qu\'expert ?',
    terminologyItem: black1Unit3Terminology[7],
    options: [
      { id: 'opt1', value: 'Esprit débutant (shoshin)', isCorrect: true },
      { id: 'opt2', value: 'Arrogance de l\'expert', isCorrect: false },
      { id: 'opt3', value: 'Présomptions rigides', isCorrect: false },
      { id: 'opt4', value: 'Fermeture mentale', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Chaque pratique est première fois - fraîcheur perpétuelle',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit3_ex9_recall',
    type: 'free_recall',
    question: 'Expliquez le lien entre mushin, jiyu waza et takemusu aiki',
    terminologyItem: black1Unit3Terminology[0],
    options: [
      { id: 'hard', value: 'Je ne comprends pas', isCorrect: false },
      { id: 'medium', value: 'Je connais les termes séparément', isCorrect: false },
      { id: 'good', value: 'Je peux expliquer progression vers spontanéité', isCorrect: true },
      { id: 'easy', value: 'Je peux démontrer cet état', isCorrect: true }
    ],
    correctAnswer: 'good',
    hint: 'Mushin (esprit vide) → jiyu waza (libre) → takemusu aiki (spontané créatif)',
    difficulty: 5,
    estimatedTime: 30
  })

  exercises.push({
    id: 'black1_unit3_ex10',
    type: 'term_to_icon',
    question: 'À quoi devez-vous faire confiance en jiyu waza ?',
    terminologyItem: black1Unit3Terminology[9],
    options: [
      { id: 'opt1', value: 'Confiance corporelle', iconData: black1Unit3Terminology[9].iconData, isCorrect: true },
      { id: 'opt2', value: 'Analyse mentale', iconData: black1Unit3Terminology[1].iconData, isCorrect: false },
      { id: 'opt3', value: 'Formes rigides', iconData: black1Unit3Terminology[5].iconData, isCorrect: false },
      { id: 'opt4', value: 'Contrôle conscient', iconData: black1Unit3Terminology[2].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Corps sait - lâcher contrôle mental',
    difficulty: 5,
    estimatedTime: 15
  })

  return exercises
}

export const black1Unit3: LearningUnit = {
  id: 'black1_unit3',
  title: 'Jiyu Waza - Technique libre',
  description: 'Sommet de la pratique. Réponse spontanée depuis mushin, harmonie complète, technique naturelle émergeant sans pensée.',

  beltLevel: 'black_1',
  category: 'techniques',

  terminology: black1Unit3Terminology,
  exercises: generateBlack1Unit3Exercises(),

  targetScore: 80,
  estimatedTime: 35,

  prerequisites: ['black1_unit2'],
  isSafetyCritical: false
}
