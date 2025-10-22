/**
 * Unit 3: Basic Movements (5ème Kyū)
 * Fundamental footwork and body movements in Aikido
 */

import { TerminologyItem, LearningUnit, Exercise } from '../../types'
import { movementsIcons, ukemiIcons } from '../icons'

/** Terminology items for Unit 3 */
export const unit3Terminology: TerminologyItem[] = [
  {
    id: 'irimi',
    japanese: '入身',
    romaji: 'i-ri-mi',
    french: 'Entrer directement',
    english: 'Direct entry',
    iconType: 'composite',
    iconData: movementsIcons.irimi,
    iconCaption: 'Mouvement d\'entrée',
    category: 'movements',
    beltLevel: 'white_5',
    description: 'Entrer directement dans l\'espace de l\'adversaire. Mouvement fondamental d\'engagement.',
    difficulty: 2,
    keywords: ['irimi', 'entrer', 'entry', 'forward'],
    relatedTerms: ['tenkan', 'tai-sabaki']
  },
  {
    id: 'tenkan',
    japanese: '転換',
    romaji: 'ten-kan',
    french: 'Rotation pivot',
    english: 'Pivot turn',
    iconType: 'composite',
    iconData: movementsIcons.tenkan,
    iconCaption: 'Pivoter sur place',
    category: 'movements',
    beltLevel: 'white_5',
    description: 'Rotation sur un pied, changeant la direction du corps. Esquive par rotation.',
    difficulty: 2,
    keywords: ['tenkan', 'rotation', 'pivot', 'turn'],
    relatedTerms: ['irimi', 'tai-sabaki']
  },
  {
    id: 'tai-sabaki',
    japanese: '体捌き',
    romaji: 'tai-sa-ba-ki',
    french: 'Déplacement du corps',
    english: 'Body movement',
    iconType: 'composite',
    iconData: movementsIcons.taiSabaki,
    iconCaption: 'Esquive circulaire',
    category: 'movements',
    beltLevel: 'white_5',
    description: 'Mouvement d\'esquive du corps. Combiner déplacement et rotation pour éviter l\'attaque.',
    difficulty: 3,
    keywords: ['tai-sabaki', 'esquive', 'evasion', 'dodge'],
    relatedTerms: ['irimi', 'tenkan']
  },
  {
    id: 'ayumi-ashi',
    japanese: '歩み足',
    romaji: 'a-yu-mi-a-shi',
    french: 'Pas normal',
    english: 'Normal walking',
    iconType: 'composite',
    iconData: movementsIcons.ayumiAshi,
    iconCaption: 'Marche naturelle',
    category: 'movements',
    beltLevel: 'white_5',
    description: 'Déplacement par pas normaux, comme la marche quotidienne.',
    difficulty: 1,
    keywords: ['ayumi-ashi', 'marche', 'walking', 'steps'],
    relatedTerms: ['tsugi-ashi']
  },
  {
    id: 'tsugi-ashi',
    japanese: '継ぎ足',
    romaji: 'tsu-gi-a-shi',
    french: 'Pas glissés',
    english: 'Shuffle steps',
    iconType: 'composite',
    iconData: movementsIcons.tsugiAshi,
    iconCaption: 'Pas chassés',
    category: 'movements',
    beltLevel: 'white_5',
    description: 'Pas glissés où le pied arrière rattrape le pied avant. Maintient la distance constante.',
    difficulty: 2,
    keywords: ['tsugi-ashi', 'glissés', 'shuffle', 'slide'],
    relatedTerms: ['ayumi-ashi']
  },
  {
    id: 'tenshin',
    japanese: '転身',
    romaji: 'ten-shin',
    french: 'Reculer en pivotant',
    english: 'Retreat pivot',
    iconType: 'composite',
    iconData: movementsIcons.tenshin,
    iconCaption: 'Esquive arrière',
    category: 'movements',
    beltLevel: 'white_5',
    description: 'Mouvement de retrait avec rotation. Esquiver en reculant et tournant.',
    difficulty: 3,
    keywords: ['tenshin', 'reculer', 'retreat', 'backward'],
    relatedTerms: ['tenkan', 'tai-sabaki']
  },
  {
    id: 'mae-ukemi',
    japanese: '前受身',
    romaji: 'ma-e-u-ke-mi',
    french: 'Chute avant',
    english: 'Forward roll',
    iconType: 'composite',
    iconData: ukemiIcons.maeUkemi,
    iconCaption: 'Roulade avant',
    category: 'falls',
    beltLevel: 'white_5',
    description: 'Roulade avant pour absorber une projection. Rentrer le menton, rouler en diagonale.',
    difficulty: 2,
    keywords: ['mae-ukemi', 'chute', 'roll', 'forward'],
    relatedTerms: ['ushiro-ukemi', 'ukemi']
  },
  {
    id: 'ushiro-ukemi',
    japanese: '後受身',
    romaji: 'u-shi-ro-u-ke-mi',
    french: 'Chute arrière',
    english: 'Backward roll',
    iconType: 'composite',
    iconData: ukemiIcons.ushiroUkemi,
    iconCaption: 'Roulade arrière',
    category: 'falls',
    beltLevel: 'white_5',
    description: 'Roulade arrière en cas de projection vers l\'arrière. Protéger la tête.',
    difficulty: 3,
    keywords: ['ushiro-ukemi', 'chute', 'roll', 'backward'],
    relatedTerms: ['mae-ukemi', 'ukemi']
  },
  {
    id: 'yoko-ukemi',
    japanese: '横受身',
    romaji: 'yo-ko-u-ke-mi',
    french: 'Chute latérale',
    english: 'Side fall',
    iconType: 'composite',
    iconData: ukemiIcons.yokoUkemi,
    iconCaption: 'Chute sur le côté',
    category: 'falls',
    beltLevel: 'white_5',
    description: 'Chute latérale avec frappe du bras au sol. Protège le corps lors d\'une projection latérale.',
    difficulty: 2,
    keywords: ['yoko-ukemi', 'chute', 'fall', 'side'],
    relatedTerms: ['mae-ukemi', 'ushiro-ukemi']
  },
  {
    id: 'ukemi',
    japanese: '受身',
    romaji: 'u-ke-mi',
    french: 'Art de chuter',
    english: 'Falling technique',
    iconType: 'emoji',
    iconData: { type: 'emoji', emoji: '🤸' },
    iconCaption: 'Technique de chute',
    category: 'falls',
    beltLevel: 'white_5',
    description: 'Art de chuter en toute sécurité. Compétence fondamentale pour protéger son corps.',
    difficulty: 2,
    keywords: ['ukemi', 'chute', 'falling', 'breakfall'],
    relatedTerms: ['mae-ukemi', 'ushiro-ukemi', 'yoko-ukemi']
  }
]

/** Generate exercises for Unit 3 */
const generateUnit3Exercises = (): Exercise[] => {
  const exercises: Exercise[] = []

  // Exercise 1: Term to Icon - Irimi
  exercises.push({
    id: 'ex1_term_irimi',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Irimi" (entrée directe) ?',
    terminologyItem: unit3Terminology[0],
    options: [
      { id: 'opt1', value: 'Entrer directement', iconData: movementsIcons.irimi, isCorrect: true },
      { id: 'opt2', value: 'Rotation pivot', iconData: movementsIcons.tenkan, isCorrect: false },
      { id: 'opt3', value: 'Reculer pivot', iconData: movementsIcons.tenshin, isCorrect: false },
      { id: 'opt4', value: 'Esquive circulaire', iconData: movementsIcons.taiSabaki, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Mouvement vers l\'avant',
    difficulty: 2,
    estimatedTime: 15
  })

  // Exercise 2: Icon to Term - Tenkan
  exercises.push({
    id: 'ex2_icon_tenkan',
    type: 'icon_to_term',
    question: 'Quel est le nom de ce mouvement de rotation sur place ?',
    terminologyItem: unit3Terminology[1],
    options: [
      { id: 'opt1', value: 'Tenkan', isCorrect: true },
      { id: 'opt2', value: 'Irimi', isCorrect: false },
      { id: 'opt3', value: 'Tenshin', isCorrect: false },
      { id: 'opt4', value: 'Tai-sabaki', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Pivoter comme une porte',
    difficulty: 2,
    estimatedTime: 15
  })

  // Exercise 3: Safety Quiz - Ukemi
  exercises.push({
    id: 'ex3_safety_ukemi',
    type: 'safety_quiz',
    question: 'Lors d\'un mae ukemi (chute avant), que devez-vous absolument faire ?',
    terminologyItem: unit3Terminology[6],
    options: [
      { id: 'opt1', value: 'Rentrer le menton pour protéger la tête', isCorrect: true },
      { id: 'opt2', value: 'Garder la tête droite', isCorrect: false },
      { id: 'opt3', value: 'Regarder en arrière', isCorrect: false },
      { id: 'opt4', value: 'Bloquer votre respiration', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    context: 'Protéger la tête et la nuque est essentiel lors des chutes',
    difficulty: 2,
    estimatedTime: 20
  })

  // Exercise 4: Term to Icon - Ayumi-ashi
  exercises.push({
    id: 'ex4_term_ayumi',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Ayumi-ashi" (pas normaux) ?',
    terminologyItem: unit3Terminology[3],
    options: [
      { id: 'opt1', value: 'Marche naturelle', iconData: movementsIcons.ayumiAshi, isCorrect: true },
      { id: 'opt2', value: 'Pas glissés', iconData: movementsIcons.tsugiAshi, isCorrect: false },
      { id: 'opt3', value: 'Rotation', iconData: movementsIcons.tenkan, isCorrect: false },
      { id: 'opt4', value: 'Entrée', iconData: movementsIcons.irimi, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    difficulty: 1,
    estimatedTime: 15
  })

  // Exercise 5: Icon to Term - Tsugi-ashi
  exercises.push({
    id: 'ex5_icon_tsugi',
    type: 'icon_to_term',
    question: 'Comment appelle-t-on les pas glissés où un pied rattrape l\'autre ?',
    terminologyItem: unit3Terminology[4],
    options: [
      { id: 'opt1', value: 'Tsugi-ashi', isCorrect: true },
      { id: 'opt2', value: 'Ayumi-ashi', isCorrect: false },
      { id: 'opt3', value: 'Irimi', isCorrect: false },
      { id: 'opt4', value: 'Tenkan', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Pas chassés',
    difficulty: 2,
    estimatedTime: 15
  })

  // Exercise 6: Free Recall - Tai-sabaki
  exercises.push({
    id: 'ex6_recall_taisabaki',
    type: 'free_recall',
    question: 'Quel terme désigne le déplacement du corps pour esquiver ?',
    terminologyItem: unit3Terminology[2],
    correctAnswer: 'tai-sabaki',
    hint: 'Commence par "tai"',
    difficulty: 3,
    estimatedTime: 20
  })

  // Exercise 7: Term to Icon - Mae Ukemi
  exercises.push({
    id: 'ex7_term_mae_ukemi',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Mae ukemi" (chute avant) ?',
    terminologyItem: unit3Terminology[6],
    options: [
      { id: 'opt1', value: 'Roulade avant', iconData: ukemiIcons.maeUkemi, isCorrect: true },
      { id: 'opt2', value: 'Roulade arrière', iconData: ukemiIcons.ushiroUkemi, isCorrect: false },
      { id: 'opt3', value: 'Chute latérale', iconData: ukemiIcons.yokoUkemi, isCorrect: false },
      { id: 'opt4', value: 'Entrée directe', iconData: movementsIcons.irimi, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Mae signifie "avant"',
    difficulty: 2,
    estimatedTime: 15
  })

  // Exercise 8: Icon to Term - Ushiro Ukemi
  exercises.push({
    id: 'ex8_icon_ushiro_ukemi',
    type: 'icon_to_term',
    question: 'Quel est le nom de la chute arrière ?',
    terminologyItem: unit3Terminology[7],
    options: [
      { id: 'opt1', value: 'Ushiro ukemi', isCorrect: true },
      { id: 'opt2', value: 'Mae ukemi', isCorrect: false },
      { id: 'opt3', value: 'Yoko ukemi', isCorrect: false },
      { id: 'opt4', value: 'Koho ukemi', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Ushiro signifie "arrière"',
    difficulty: 2,
    estimatedTime: 15
  })

  // Exercise 9: Safety Quiz - Direction of Movement
  exercises.push({
    id: 'ex9_safety_movement',
    type: 'safety_quiz',
    question: 'Pourquoi est-il important de maîtriser tai-sabaki ?',
    terminologyItem: unit3Terminology[2],
    options: [
      { id: 'opt1', value: 'Pour esquiver les attaques en toute sécurité', isCorrect: true },
      { id: 'opt2', value: 'Pour impressionner les spectateurs', isCorrect: false },
      { id: 'opt3', value: 'Ce n\'est pas vraiment important', isCorrect: false },
      { id: 'opt4', value: 'Juste pour l\'examen', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    context: 'Le déplacement du corps permet d\'éviter les attaques tout en maintenant l\'équilibre',
    difficulty: 2,
    estimatedTime: 20
  })

  // Exercise 10: Term to Icon - Tenshin
  exercises.push({
    id: 'ex10_term_tenshin',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Tenshin" (reculer en pivotant) ?',
    terminologyItem: unit3Terminology[5],
    options: [
      { id: 'opt1', value: 'Esquive arrière', iconData: movementsIcons.tenshin, isCorrect: true },
      { id: 'opt2', value: 'Rotation pivot', iconData: movementsIcons.tenkan, isCorrect: false },
      { id: 'opt3', value: 'Entrée directe', iconData: movementsIcons.irimi, isCorrect: false },
      { id: 'opt4', value: 'Esquive circulaire', iconData: movementsIcons.taiSabaki, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Mouvement vers l\'arrière',
    difficulty: 3,
    estimatedTime: 15
  })

  return exercises
}

/** Complete learning unit */
export const white5Unit3: LearningUnit = {
  id: 'white5_unit3',
  title: 'Déplacements de base',
  description: 'Apprenez les mouvements fondamentaux de l\'aïkido : irimi, tenkan, et les chutes (ukemi).',
  beltLevel: 'white_5',
  category: 'movements',
  terminology: unit3Terminology,
  exercises: generateUnit3Exercises(),
  targetScore: 80,
  estimatedTime: 18,
  prerequisites: [],
  isSafetyCritical: true
}
