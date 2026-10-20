'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { aspectOf, embedUrl, fallbackEmoji, fitOf, imageUrl, videoFileUrl, videoOf } from '@/data/images';

export interface IllustrationProps {
  /** Catalogue id "<famille>/<id>" (docs/images/manifest.yaml). */
  image?: string;
  /** Fallback emoji (default: the catalogue's). */
  emoji?: string;
  /** Text alternative (required). */
  alt: string;
  /** Frame width in px; the height follows the family's format (scenes 4:3, covers/modules 2:1, else 1:1). */
  size?: number;
  /** Explicit frame (overrides size and format), e.g. "100%". */
  width?: number | string;
  height?: number | string;
  className?: string;
  /** Emoji size relative to the frame height. */
  emojiScale?: number;
  /** Rendered instead of the emoji when no image is shown (e.g. the SVG mascot). */
  fallbackNode?: React.ReactNode;
  /** Purely decorative (alt is then not announced). */
  decorative?: boolean;
  /** Play the entry's video when it has one (clip in loop, or external player on click). */
  withVideo?: boolean;
}

/**
 * A media of the catalogue: its image when the file exists (and, in production, has been
 * reviewed `valide`), otherwise the fallback emoji — always in a frame of the family's format,
 * so nothing moves when the image loads or fails. With `withVideo`, a local clip plays muted in
 * loop over the image; an external video is only loaded when the learner clicks play.
 */
export const Illustration: React.FC<IllustrationProps> = ({
  image, emoji, alt, size = 64, width, height, className = '', emojiScale = 0.55, decorative = false, fallbackNode, withVideo = false,
}) => {
  const [failed, setFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const url = imageUrl(image);
  const ratio = aspectOf(image);
  const w = width ?? size;
  const h = height ?? (typeof w === 'number' ? Math.round(w / ratio) : undefined);
  const fallback = emoji ?? fallbackEmoji(image) ?? '🥋';
  const numericH = typeof h === 'number' ? h : typeof w === 'number' ? w / ratio : size / ratio;
  const video = withVideo && image ? videoOf(image) : null;
  const fit = fitOf(image) === 'cover' ? 'object-cover' : 'object-contain';
  const style: React.CSSProperties = { width: w, height: h, ...(h === undefined ? { aspectRatio: String(ratio) } : {}) };

  const still = url && !failed ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={url} alt={decorative ? '' : alt} className={`w-full h-full ${fit}`} loading="lazy" onError={() => setFailed(true)} />
  ) : fallbackNode ? (
    fallbackNode
  ) : (
    <span
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : alt}
      aria-hidden={decorative || undefined}
      className="leading-none select-none"
      style={{ fontSize: Math.round(numericH * emojiScale) }}
    >
      {fallback}
    </span>
  );

  let media: React.ReactNode = still;
  if (video?.type === 'fichier' && !videoFailed && image) {
    media = (
      <video
        className={`w-full h-full ${fit}`}
        src={videoFileUrl(image, video)}
        poster={url && !failed ? url : undefined}
        muted
        loop
        autoPlay
        playsInline
        aria-label={alt}
        onError={() => setVideoFailed(true)}
      />
    );
  } else if (video?.type === 'embed') {
    const src = embedUrl(video);
    if (src && playing) {
      media = (
        <iframe
          src={src}
          title={alt}
          className="w-full h-full"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      );
    } else if (src) {
      // poster: the image (or emoji); nothing is requested from the third party before the click
      media = (
        <>
          {still}
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/35 transition-colors"
            aria-label={`Lire la vidéo : ${alt} (lecteur externe YouTube, sans cookie)`}
          >
            <span className="rounded-full bg-aiki-shu text-white p-3 shadow-lg"><Play size={22} className="fill-white" /></span>
          </button>
        </>
      );
    }
  }

  return (
    <span
      className={`relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden ${className}`}
      style={style}
      data-illustration={image ?? 'emoji'}
    >
      {media}
    </span>
  );
};
