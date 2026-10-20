/**
 * Media catalogue logic (docs/images/manifest.yaml): pure functions over the catalogue entries,
 * bound to the generated catalogue in src/data/images.ts.
 */

export interface MediaOrigin {
  type?: 'libre' | 'genere' | 'filme' | string;
  url?: string;
  auteur?: string;
  licence?: string;
  attribution?: string;
}

export interface MediaVideo {
  type: 'fichier' | 'embed';
  /** fichier: path under public/ (default public/videos/<famille>/<id>.webm). */
  src?: string;
  /** embed: page URL of the external player (YouTube). */
  url?: string;
  /** embed: segment, in seconds. */
  debut?: number;
  fin?: number;
  licence?: string;
  attribution?: string;
}

export interface MediaEntry {
  family: string;
  emoji: string;
  scene?: string;
  /** Review status: only `valide` media are shown in production. */
  statut: string;
  origine?: MediaOrigin;
  video?: MediaVideo;
}


/** Frame of each family: width / height. Pictures of situations are 4:3, banners 2:1. */
export const FAMILY_ASPECT: Record<string, number> = { scenes: 4 / 3, covers: 2, modules: 2, mascotte: 1, badges: 1 };

export function aspectOf(id: string | undefined): number {
  const family = id?.split('/')[0] ?? '';
  return FAMILY_ASPECT[family] ?? 1;
}

/** Interface graphics (mascot, badges) are contained; situation pictures fill their frame. */
export function fitOf(id: string | undefined): 'cover' | 'contain' {
  const family = id?.split('/')[0] ?? '';
  return family === 'mascotte' || family === 'badges' ? 'contain' : 'cover';
}

/** May this entry's media be requested? Unknown: no; in production, only `valide`. */
export function mediaAllowed(id: string | undefined, production: boolean, entries: Record<string, MediaEntry>): boolean {
  if (!id) return false;
  const entry = entries[id];
  if (!entry) return false;
  return !production || entry.statut === 'valide';
}

/** URL of a catalogue image, or null when it must not be requested. */
export function imageUrl(id: string | undefined, production: boolean, entries: Record<string, MediaEntry>): string | null {
  return mediaAllowed(id, production, entries) ? `/images/${id}.webp` : null;
}

/** Scene of the catalogue named after a term (« Mae ukemi » -> scenes/mae-ukemi), if any. */
export function sceneFor(term: string | undefined, entries: Record<string, MediaEntry>): string | undefined {
  if (!term) return undefined;
  const slug = term.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim().replace(/[\s_]+/g, '-');
  const id = `scenes/${slug}`;
  return entries[id] ? id : undefined;
}


/** Video of an entry, when allowed. */
export function videoOf(id: string | undefined, production: boolean, entries: Record<string, MediaEntry>): MediaVideo | null {
  if (!id || !mediaAllowed(id, production, entries)) return null;
  return entries[id]?.video ?? null;
}

/** Local clip path: public/videos/<famille>/<id>.webm unless `src` says otherwise. */
export function videoFileUrl(id: string, video: MediaVideo): string {
  if (video.src) return video.src.startsWith('/') ? video.src : `/${video.src.replace(/^public\//, '')}`;
  return `/videos/${id}.webm`;
}

/** YouTube video id of a watch/short/embed URL. */
export function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

/**
 * Privacy-enhanced embed URL (youtube-nocookie), limited to [debut, fin], muted, autoplay
 * (it is only built after the learner clicks).
 */
export function embedUrl(video: MediaVideo): string | null {
  const id = video.url ? youtubeId(video.url) : null;
  if (!id) return null;
  const params = new URLSearchParams({ autoplay: '1', mute: '1', rel: '0', playsinline: '1', modestbranding: '1' });
  if (video.debut != null) params.set('start', String(Math.floor(video.debut)));
  if (video.fin != null) params.set('end', String(Math.ceil(video.fin)));
  return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
}

export interface CreditLine {
  id: string;
  what: 'image' | 'vidéo';
  auteur?: string;
  licence?: string;
  url?: string;
  attribution?: string;
}

/**
 * Credits page: every free-licensed media (origine.type libre, and videos with a licence),
 * limited to what is displayed (in production: `valide` only).
 */
export function creditLines(entries: Record<string, MediaEntry>, production: boolean): CreditLine[] {
  const out: CreditLine[] = [];
  for (const [id, e] of Object.entries(entries)) {
    if (production && e.statut !== 'valide') continue;
    if (e.origine?.type === 'libre') {
      out.push({ id, what: 'image', auteur: e.origine.auteur, licence: e.origine.licence, url: e.origine.url, attribution: e.origine.attribution });
    }
    if (e.video && (e.video.licence || e.video.attribution)) {
      out.push({ id, what: 'vidéo', licence: e.video.licence, url: e.video.url, attribution: e.video.attribution });
    }
  }
  return out.sort((a, b) => a.id.localeCompare(b.id));
}
