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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`relative p-2.5 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 flex items-center gap-2 select-none cursor-pointer ${
        soundEnabled 
          ? 'bg-brand-blue/10 border-brand-blue/30 text-brand-blue shadow-sm' 
          : 'bg-brand-cream border-brand-navy/10 text-brand-navy/40'
      }`}
      title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
      aria-label={soundEnabled ? 'Mute Synth Sounds' : 'Unmute Synth Sounds'}
    >
      {soundEnabled ? (
        <Volume2 className="w-5 h-5" />
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
      <span className="text-xs font-mono font-bold uppercase tracking-wider hidden sm:inline">
        {soundEnabled ? 'Synth ON' : 'Synth OFF'}
      </span>
    </motion.button>
  );
}
