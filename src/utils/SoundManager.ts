class SoundManager {
  private static instance: SoundManager;
  private audioContext: AudioContext | null = null;

  private constructor() {
    if (typeof window !== 'undefined' && window.AudioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private playSound(frequency: number, duration: number, type: string = 'sine') {
    if (!this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type as OscillatorType;

      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (e) {
      console.log('Audio context error:', e);
    }
  }

  playDiceRoll() {
    this.playSound(600, 0.1);
    setTimeout(() => this.playSound(700, 0.1), 100);
    setTimeout(() => this.playSound(800, 0.1), 200);
  }

  playCorrect() {
    this.playSound(800, 0.15);
    setTimeout(() => this.playSound(1000, 0.15), 150);
  }

  playWrong() {
    this.playSound(300, 0.2);
    setTimeout(() => this.playSound(200, 0.2), 200);
  }

  playWin() {
    this.playSound(1000, 0.2);
    setTimeout(() => this.playSound(1200, 0.2), 200);
    setTimeout(() => this.playSound(1400, 0.4), 400);
  }

  playBonus() {
    this.playSound(1200, 0.1);
    setTimeout(() => this.playSound(1400, 0.1), 100);
    setTimeout(() => this.playSound(1600, 0.15), 200);
  }

  playShield() {
    this.playSound(700, 0.1);
    setTimeout(() => this.playSound(900, 0.2), 100);
  }

  playSpecialSquare() {
    this.playSound(550, 0.15);
    setTimeout(() => this.playSound(750, 0.15), 150);
  }
}

export default SoundManager;
