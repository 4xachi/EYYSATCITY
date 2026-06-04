/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, BookOpen, Coffee, Notebook } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingSteps = [
  'Organizing student notebooks...',
  'Synchronizing weekly lecture schedules...',
  'Pre-boiling coffee makers...',
  'Drafting final exam probability sheets...',
  'Ready to begin academic term.'
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const totalDuration = 1800; // Fast 1.8 seconds loading experience
    const intervalTime = 30;
    const increment = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 250);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const stepInterval = 1800 / loadingSteps.length;
    const stepTimer = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, stepInterval);

    return () => clearInterval(stepTimer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F7F3EA] text-brand-ink selection:bg-brand-blue/10">
      {/* Soft notebook grid lines in loading screen */}
      <div className="absolute inset-0 notebook-grid opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-amber/5 via-transparent to-brand-blue/5 pointer-events-none" />

      <div className="relative max-w-sm w-full px-6 flex flex-col items-center text-center z-10">
        
        {/* Scholar academic icon */}
        <motion.div
          animate={{
            rotate: [0, 8, -8, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-white border border-brand-navy/10 shadow-[0_8px_20px_rgba(30,42,68,0.04)]"
        >
          <GraduationCap className="w-8 h-8 text-brand-blue" />
        </motion.div>

        {/* Text Area */}
        <h1 className="text-3xl font-serif font-extrabold tracking-tight text-brand-ink">
          EYYSAT <span className="text-brand-blue italic font-medium">CITY</span>
        </h1>
        
        <p className="text-[10px] font-mono tracking-widest text-brand-navy/50 font-bold uppercase mt-1">
          STUDENT SURVIVAL SIMULATOR
        </p>

        {/* Progress Value */}
        <div className="mt-10 font-mono text-[10px] text-brand-blue font-bold tracking-widest uppercase mb-2">
          {Math.floor(progress)}% TIMELINE BUILT
        </div>

        {/* Dynamic progress bar container */}
        <div className="w-full h-2 bg-brand-navy/5 border border-brand-navy/10 rounded-full overflow-hidden p-[1px]">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-blue via-brand-amber to-brand-coral rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Sub-text step display */}
        <div className="h-8 mt-5 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="text-xs font-mono font-bold text-brand-navy/60 max-w-xs leading-relaxed"
            >
              {loadingSteps[stepIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
