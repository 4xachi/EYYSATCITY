/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FastForward, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { playClickSound } from '../utils/audio';

interface FastForwardToggleProps {
  fastForwardEnabled: boolean;
  onToggle: () => void;
  soundEnabled: boolean;
}

export default function FastForwardToggle({ 
  fastForwardEnabled, 
  onToggle, 
  soundEnabled 
}: FastForwardToggleProps) {
  const handleClick = () => {
    onToggle();
    playClickSound(soundEnabled);
  };

  return (
    <motion.button
      id="fast-forward-toggle-btn"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`relative p-2.5 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 flex items-center gap-2 select-none cursor-pointer ${
        fastForwardEnabled 
          ? 'bg-brand-coral/10 border-brand-coral/30 text-brand-coral shadow-sm' 
          : 'bg-brand-cream border-brand-navy/10 text-brand-navy/40'
      }`}
      title={fastForwardEnabled ? 'Disable Fast-Forward' : 'Enable Fast-Forward (Skips Reflection Screens)'}
      aria-label={fastForwardEnabled ? 'Disable Fast-Forward' : 'Enable Fast-Forward'}
    >
      <FastForward className={`w-5 h-5 ${fastForwardEnabled ? 'animate-pulse' : ''}`} />
      
      <span className="text-xs font-mono font-bold uppercase tracking-wider hidden sm:inline">
        {fastForwardEnabled ? 'FF: ON' : 'FF: OFF'}
      </span>

      {fastForwardEnabled && (
        <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-coral text-[8px] text-white font-black ring-2 ring-brand-paper">
          ⚡
        </span>
      )}
    </motion.button>
  );
}
