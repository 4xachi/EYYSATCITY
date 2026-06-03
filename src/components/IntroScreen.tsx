/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, AlertCircle, HeartCrack, Layers, ShieldCheck } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface IntroScreenProps {
  onNext: () => void;
  soundEnabled: boolean;
}

export default function IntroScreen({ onNext, soundEnabled }: IntroScreenProps) {
  const handleNextClick = () => {
    playClickSound(soundEnabled);
    onNext();
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center py-10 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative max-w-2xl w-full rounded-2xl bg-zinc-950/60 border border-zinc-800 p-8 sm:p-10 backdrop-blur-xl shadow-2xl shadow-indigo-950/15 overflow-hidden"
      >
        {/* Aesthetic Laser Line Accent */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500" />

        {/* Story Section Header */}
        <div className="space-y-2 mb-8">
          <span className="text-xs font-mono text-cyan-400 tracking-[0.2em] uppercase block">TRANSMISSION ESTABLISHED</span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
            Welcome to EYYSAT CITY.
          </h2>
        </div>

        {/* Descriptive Rules Bento Blocks */}
        <div className="space-y-6 text-zinc-300">
          <p className="leading-relaxed sm:text-lg">
            You are about to enter one full school week. Every choice has a consequence. Some decisions improve your grades. Some protect your energy. Some increase stress. Some affect your relationships.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/15 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-cyan-300">Survive with Balance</h4>
                <p className="text-xs text-zinc-400 mt-1">High grades alone will not save you. Focus on keeping stress low and social connections warm.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-500/15 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-violet-300">Clamped Extremes</h4>
                <p className="text-xs text-zinc-400 mt-1">If your stress breaches critical peaks or energy cascades to empty, consequences expand dynamically.</p>
              </div>
            </div>

          </div>

          <p className="text-emerald-400 font-medium border-l-2 border-emerald-500 pl-4 py-1 italic text-sm">
            “Your goal is not just to get high grades. Your goal is to survive with balance.”
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-10 flex justify-end">
          <motion.button
            id="choose-student-type-btn"
            whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(124,58,237,0.3)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNextClick}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer text-center flex items-center justify-center border border-violet-400/30"
          >
            Choose Student Type
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
