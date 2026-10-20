import manifest from './generated/images.json';
import * as media from '@/utils/media';
import type { MediaEntry } from '@/utils/media';

export type { MediaEntry, MediaVideo, MediaOrigin, CreditLine } from '@/utils/media';
export { aspectOf, fitOf, embedUrl, youtubeId, videoFileUrl, FAMILY_ASPECT } from '@/utils/media';

/** Media catalogue (docs/images/manifest.yaml), keyed by "<famille>/<id>". */
export const IMAGES = (manifest as unknown as { entries: Record<string, MediaEntry> }).entries;

const production = () => process.env.NODE_ENV === 'production';

export const mediaAllowed = (id: string | undefined) => media.mediaAllowed(id, production(), IMAGES);
export const imageUrl = (id: string | undefined) => media.imageUrl(id, production(), IMAGES);
export const videoOf = (id: string | undefined) => media.videoOf(id, production(), IMAGES);
export const fallbackEmoji = (id: string | undefined) => (id ? IMAGES[id]?.emoji : undefined);
export const sceneFor = (term: string | undefined) => media.sceneFor(term, IMAGES);
export const creditLines = () => media.creditLines(IMAGES, production());
