/**
 * Japanese pronunciation through the Web Speech API (ja-JP).
 *
 * Falls back gracefully: without speech synthesis nothing is played (the callbacks still
 * fire); without a Japanese voice the browser default voice reads the romaji, and the UI
 * shows « prononciation approximative » (SynthesisNotice).
 */

export interface PronunciationOptions {
  slow?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}

class AudioSpeechService {
  private synth: SpeechSynthesis | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private voicesLoaded = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return;
    // a Japanese voice (ja-JP, ja) when the system has one; otherwise the default voice
    this.selectedVoice =
      voices.find(v => v.lang.toLowerCase().replace('_', '-') === 'ja-jp') ??
      voices.find(v => v.lang.toLowerCase().startsWith('ja')) ??
      null;
    this.voicesLoaded = true;
  }

  /** True when speech synthesis exists in this browser. */
  public isSupported(): boolean {
    return !!this.synth;
  }

  /** True when the browser offers a real Japanese voice; false while unknown or when falling back. */
  public hasJapaneseVoice(): boolean {
    if (!this.synth) return false;
    if (!this.voicesLoaded) this.initVoices();
    return !!this.selectedVoice;
  }

  public getAvailableVoiceName(): string {
    if (!this.selectedVoice) return 'Voix par défaut';
    return `${this.selectedVoice.name} (${this.selectedVoice.lang})`;
  }

  /** Speaks a Japanese term (romaji or kana/kanji). */
  public speak(text: string, options: PronunciationOptions = {}) {
    if (typeof window === 'undefined' || !this.synth) {
      options.onEnd?.();
      return;
    }
    this.synth.cancel();

    // hyphens and macrons read badly: "katate-dori" -> "katate dori"
    const cleanText = text.replace(/\[.*?\]/g, '').replace(/[-_]/g, ' ').trim();
    if (!cleanText) {
      options.onEnd?.();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
      utterance.lang = this.selectedVoice.lang;
    } else {
      // asks the browser for Japanese; it uses its default voice when it has none
      utterance.lang = 'ja-JP';
    }
    utterance.rate = options.slow ? 0.6 : 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => options.onStart?.();
    utterance.onend = () => options.onEnd?.();
    utterance.onerror = e => {
      console.warn('Speech synthesis notice:', e);
      options.onError?.(e);
      options.onEnd?.();
    };
    this.synth.speak(utterance);
  }

  public stop() {
    this.synth?.cancel();
  }
}

export const audioSpeech = new AudioSpeechService();
