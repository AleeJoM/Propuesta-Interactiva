// Audio Service for romantic sounds and music
export class AudioService {
  private audioContext: AudioContext | null = null;
  private currentMusic: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  async playHeartbeat(): Promise<void> {
    // Simple heartbeat sound using Web Audio API
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(80, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(40, this.audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  async playClickSound(): Promise<void> {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  async playSuccessSound(): Promise<void> {
    if (!this.audioContext) return;

    const frequencies = [261.63, 329.63, 392.00]; // C, E, G major chord
    
    frequencies.forEach((freq, index) => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);

      oscillator.frequency.setValueAtTime(freq, this.audioContext!.currentTime + index * 0.1);
      gainNode.gain.setValueAtTime(0.2, this.audioContext!.currentTime + index * 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext!.currentTime + index * 0.1 + 0.5);

      oscillator.start(this.audioContext!.currentTime + index * 0.1);
      oscillator.stop(this.audioContext!.currentTime + index * 0.1 + 0.5);
    });
  }

  playBackgroundMusic(src: string): void {
    if (this.currentMusic) {
      this.currentMusic.pause();
    }

    this.currentMusic = new Audio(src);
    this.currentMusic.loop = true;
    this.currentMusic.volume = 0.3;
    this.currentMusic.play().catch(console.error);
  }

  stopBackgroundMusic(): void {
    if (this.currentMusic) {
      this.currentMusic.pause();
      this.currentMusic = null;
    }
  }
}

// Animation Service for coordinated animations
export class AnimationService {
  static createHeartRain(): { x: number; y: number; delay: number; duration: number }[] {
    return Array.from({ length: 15 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.3,
      duration: 3 + Math.random() * 2
    }));
  }

  static createFireworks(): { x: number; y: number; delay: number; color: string }[] {
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffd700', '#ff69b4'];
    
    return Array.from({ length: 20 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.1,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  }

  static getSparklePositions(count: number = 10): { x: number; y: number; delay: number }[] {
    return Array.from({ length: count }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.2
    }));
  }
}

// Local Storage Service for persisting game state
export class StorageService {
  private static readonly KEYS = {
    GAME_SESSION: 'romantic_game_session',
    HIGH_SCORE: 'romantic_game_high_score',
    USER_PREFERENCES: 'romantic_game_preferences'
  };

  static saveGameSession(session: any): void {
    try {
      localStorage.setItem(this.KEYS.GAME_SESSION, JSON.stringify(session));
    } catch (error) {
      console.error('Error saving game session:', error);
    }
  }

  static loadGameSession(): any | null {
    try {
      const session = localStorage.getItem(this.KEYS.GAME_SESSION);
      return session ? JSON.parse(session) : null;
    } catch (error) {
      console.error('Error loading game session:', error);
      return null;
    }
  }

  static saveHighScore(score: number): void {
    try {
      const currentHigh = this.getHighScore();
      if (score > currentHigh) {
        localStorage.setItem(this.KEYS.HIGH_SCORE, score.toString());
      }
    } catch (error) {
      console.error('Error saving high score:', error);
    }
  }

  static getHighScore(): number {
    try {
      const score = localStorage.getItem(this.KEYS.HIGH_SCORE);
      return score ? parseInt(score, 10) : 0;
    } catch (error) {
      console.error('Error getting high score:', error);
      return 0;
    }
  }

  static clearGameData(): void {
    try {
      Object.values(this.KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing game data:', error);
    }
  }
}

// Export singleton instances
export const audioService = new AudioService();
export const animationService = AnimationService;
export const storageService = StorageService;
