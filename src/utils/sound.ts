/**
 * Synthesizes a soft organic paper rustle / page-flip sound effect using Web Audio API.
 * Ensures zero dependencies on external audio files and guaranteed offline reliability.
 */
class PaperSoundSynthesizer {
  private audioCtx: AudioContext | null = null;

  private initCtx() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public playPageTurnSound(enabled: boolean = true) {
    if (!enabled) return;

    try {
      this.initCtx();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;

      // 1. Create a 0.25s white noise buffer for paper rustle
      const bufferSize = Math.floor(this.audioCtx.sampleRate * 0.25);
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        // Soft white noise decay
        const progress = i / bufferSize;
        const envelope = Math.sin(progress * Math.PI) * Math.exp(-progress * 3);
        output[i] = (Math.random() * 2 - 1) * envelope;
      }

      // 2. Buffer Source Node
      const noiseSource = this.audioCtx.createBufferSource();
      noiseSource.buffer = buffer;

      // 3. High Pass Filter for crisp paper texture
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + 0.2);
      filter.Q.setValueAtTime(1.5, now);

      // 4. Gain Node for volume control
      const gainNode = this.audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.01, now);
      gainNode.gain.linearRampToValueAtTime(0.12, now + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

      // Connect pipeline
      noiseSource.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      // Start & Stop
      noiseSource.start(now);
      noiseSource.stop(now + 0.25);
    } catch {
      // Ignore audio context errors gracefully if browser blocks autoplay
    }
  }
}

export const paperSound = new PaperSoundSynthesizer();
