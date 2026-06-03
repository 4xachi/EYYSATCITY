/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';
import { playClickSound } from '../utils/audio';

interface SoundToggleProps {
  soundEnabled: boolean;
  onToggle: () => void;
}

export default function SoundToggle({ soundEnabled, onToggle }: SoundToggleProps) {
  const handleClick = () => {
    onToggle();
    // Play a test tone if turning ON
    if (!soundEnabled) {
      setTimeout(() => {
        playClickSound(true);
      }, 50);
    }
  };

  return (
    <motion.button
      id="sound-toggle-btn"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`relative p-2.5 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 flex items-center gap-2 ${
        soundEnabled 
          ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)]' 
          : 'bg-zinc-950/40 border-zinc-800 text-zinc-500'
      }`}
      title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
      aria-label={soundEnabled ? 'Mute Synth Sounds' : 'Unmute Synth Sounds'}
    >
      {soundEnabled ? (
        <Volume2 className="w-5 h-5 animate-pulse" />
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
      <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline">
        {soundEnabled ? 'Synth ON' : 'Synth OFF'}
      </span>
    </motion.button>
  );
}
