/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Simple Web Audio API Synthesizer client-side
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    // Custom fallback for some browsers
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

export function playClickSound(enabled: boolean): void {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.05);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.06);
}

export function playPositiveSound(enabled: boolean): void {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const playNote = (freq: number, delay: number, duration: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + delay + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  };

  // Nice futuristic arpeggio (C major 7th vibes)
  playNote(523.25, 0, 0.2);     // C5
  playNote(659.25, 0.08, 0.2);  // E5
  playNote(783.99, 0.16, 0.2);  // G5
  playNote(987.77, 0.24, 0.4);  // B5
}

export function playWarningSound(enabled: boolean): void {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const playTone = (freq: number, delay: number, duration: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + delay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

    // Apply a lowpass filter to make it less abrasive but intense
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime + delay);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  };

  // Two tense descending notes
  playTone(220, 0, 0.25);
  playTone(180, 0.15, 0.35);
}

export function playResultSound(enabled: boolean): void {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  // Futuristic victory digital chord
  const frequencies = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // Beautiful C Major spread
  frequencies.forEach((freq, idx) => {
    const osc = ctx!.createOscillator();
    const gain = ctx!.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx!.currentTime + idx * 0.04);

    gain.gain.setValueAtTime(0, ctx!.currentTime + idx * 0.04);
    gain.gain.linearRampToValueAtTime(0.04, ctx!.currentTime + idx * 0.04 + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx!.currentTime + idx * 0.04 + 0.8);

    osc.connect(gain);
    gain.connect(ctx!.destination);

    osc.start(ctx!.currentTime + idx * 0.04);
    osc.stop(ctx!.currentTime + idx * 0.04 + 0.8);
  });
}
