class AudioManager {
  private static instance: AudioManager;
  private audioPool: Map<string, HTMLAudioElement> = new Map();
  private enabled: boolean = false;
  private volume: number = 0.3;
  private isUnlocked: boolean = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      const unlock = () => {
        if (this.isUnlocked) return;
        this.playOscillator(20000, 0.001); // Silent unlock
        this.isUnlocked = true;
        window.removeEventListener('click', unlock);
        window.removeEventListener('touchstart', unlock);
      };
      window.addEventListener('click', unlock, { once: true });
      window.addEventListener('touchstart', unlock, { once: true });
    }
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public init(soundEnabled: boolean, vol: number) {
    this.enabled = soundEnabled;
    this.volume = vol;
  }

  public preload(src: string, id: string) {
    if (typeof window === 'undefined') return;
    try {
      const audio = new Audio(src);
      audio.preload = 'auto';
      audio.volume = this.volume;
      this.audioPool.set(id, audio);
    } catch (e) {
      console.warn('Audio preload failed', e);
    }
  }

  public play(id: string, fallbackFreq: number) {
    if (!this.enabled) return;
    
    const audio = this.audioPool.get(id);
    if (audio && this.isUnlocked) {
      audio.currentTime = 0;
      audio.play().catch(() => this.playOscillator(fallbackFreq));
    } else {
      this.playOscillator(fallbackFreq);
    }
  }

  private playOscillator(freq: number, forceVol?: number) {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.value = forceVol ?? this.volume;
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
  }
}

export const audioManager = AudioManager.getInstance();