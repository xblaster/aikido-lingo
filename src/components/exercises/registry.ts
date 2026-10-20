import type { CatalogueExerciseType } from '@/types/curriculum';
import {
  ChoiceView, KanjiChoiceView, ListenChoiceView, ScenarioView, choiceDefinition,
  techniqueDecoderDefinition, trueFalseDefinition,
} from './ChoiceExercise';
import { tileBuildDefinition } from './TileExercise';
import { imageChoiceDefinition } from './ImageChoiceExercise';
import { listenTypeDefinition, typedTermDefinition } from './TypedExercise';
import { matchPairsAudioDefinition, matchPairsDefinition } from './PairsExercise';
import { orderStepsDefinition } from './OrderStepsExercise';
import { storyDefinition } from './StoryExercise';
import type { ExerciseRegistry, ExerciseDefinition } from './types';

/**
 * One definition per exercise type of the catalogue (docs/contrat.md, docs/types-exercices.md).
 * Typed as a complete record: adding a type to the catalogue without its view fails to compile.
 */
export const EXERCISE_REGISTRY: ExerciseRegistry = {
  meaning_choice: choiceDefinition('Que signifie ce terme ?', ChoiceView),
  term_choice: choiceDefinition('Retrouvez le terme japonais', ChoiceView),
  kanji_choice: choiceDefinition('Lisez le kanji', KanjiChoiceView),
  image_choice: imageChoiceDefinition,
  match_pairs: matchPairsDefinition,
  match_pairs_audio: matchPairsAudioDefinition,
  listen_choose: choiceDefinition('Écoutez et choisissez', ListenChoiceView),
  listen_type: listenTypeDefinition,
  typed_term: typedTermDefinition,
  tile_build: tileBuildDefinition,
  missing_word: choiceDefinition('Choisissez le mot manquant', ChoiceView),
  order_steps: orderStepsDefinition,
  true_false: trueFalseDefinition,
  scenario: choiceDefinition('Au dojo, que faites-vous ?', ScenarioView),
  technique_decoder: techniqueDecoderDefinition,
  story: storyDefinition,
};

export function getExerciseDefinition(type: string): ExerciseDefinition<any> | undefined {
  return EXERCISE_REGISTRY[type as CatalogueExerciseType];
}
