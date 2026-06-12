/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface IntroScreenProps {
  onNext: () => void;
  soundEnabled: boolean;
  studentName?: string;
}

export default function IntroScreen({ onNext, soundEnabled, studentName }: IntroScreenProps) {
  const handleNextClick = () => {
    playClickSound(soundEnabled);
    onNext();
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center py-10 px-4 sm:px-6 select-none z-10 w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative max-w-2xl w-full rounded-2xl bg-brand-paper border border-brand-navy/15 p-8 sm:p-10 shadow-[0_12px_40px_rgba(30,42,68,0.08)] overflow-hidden"
      >
        {/* Ivory Accent Line on top of Card */}
        <div className="absolute top-0 inset-x-0 h-[4px] bg-gradient-to-r from-brand-blue via-brand-amber to-brand-coral rounded-t-2xl" />

        {/* Story Section Header */}
        <div className="space-y-2 mb-8">
          <span className="text-xs font-mono text-brand-blue tracking-[0.2em] uppercase block font-bold">LOG #01 : SIMULATION BRIEFING</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-brand-ink tracking-tight">
            {studentName ? `Welcome to Eyysat City, ${studentName}.` : "Welcome to Eyysat City."}
          </h2>
        </div>

        {/* Descriptive Rules Bento Blocks */}
        <div className="space-y-6 text-brand-navy/85">
          <p className="leading-relaxed sm:text-lg font-sans">
            You are about to simulate one crucial school week. Every daily choice triggers realistic, multi-stat consequences. Some choices improve your grades, others protect your sanity budget, and others affect your relationships.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            
            <div className="p-4 rounded-xl bg-brand-cream border border-brand-navy/10 flex items-start gap-3 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-sans font-bold text-brand-ink">Survive with Balance</h4>
                <p className="text-xs text-brand-navy/70 mt-1 font-sans font-medium">Grades alone will not secure an academic victory. Keep your stress and allowance in careful balance.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-brand-cream border border-brand-navy/10 flex items-start gap-3 shadow-sm">
              <AlertCircle className="w-5 h-5 text-brand-coral shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-sans font-bold text-brand-ink">Clamped Extremes</h4>
                <p className="text-xs text-brand-navy/70 mt-1 font-sans font-medium">If stress hits critical peaks or energy cascades to empty, emergency academic consequences expand instantly.</p>
              </div>
            </div>

          </div>

          <p className="text-brand-blue font-semibold border-l-3 border-brand-blue pl-4 py-1 italic text-sm">
            “Your goal is not just to get high grades. Your goal is to survive with balance.”
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-10 flex justify-end">
          <motion.button
            id="choose-student-type-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNextClick}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue/95 text-white font-extrabold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-brand-blue/15"
          >
            <span>Choose Student Profile</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
