/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Server, Activity, ShieldAlert } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingSteps = [
  'Establishing cybernetic grid connection...',
  'Synchronizing local student directories...',
  'Configuring stress buffers and life telemetry...',
  'Injecting daily probability arrays...',
  'EYYSAT CITY Engine is live.'
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const totalDuration = 2000; // 2 seconds total loading
    const intervalTime = 40;
    const increment = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 350);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const stepInterval = 2000 / loadingSteps.length;
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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#010108] text-white">
      {/* Decorative center micro-grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.06)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="relative max-w-md w-full px-6 flex flex-col items-center text-center">
        {/* Futuristic glowing geometric icon */}
        <motion.div
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative w-16 h-16 mb-8 flex items-center justify-center rounded-2xl bg-cyan-950/40 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
        >
          <Cpu className="w-8 h-8 text-cyan-400" />
          <span className="absolute inset-0 rounded-2xl border border-cyan-400/20 animate-ping duration-1000" />
        </motion.div>

        {/* Text Area */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-sans font-semibold tracking-wider text-cyan-400 uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
        >
          EYYSAT CITY
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          className="text-xs font-mono tracking-widest text-[#a5b4fc] uppercase mt-1.5"
        >
          Student Life Survival Simulator
        </motion.p>

        {/* Progress Value */}
        <div className="mt-10 font-mono text-xs text-cyan-500/80 mb-2">
          {Math.floor(progress)}% CONNECTIVITY STATE
        </div>

        {/* Cinematic progress bar container */}
        <div className="w-full h-1 bg-zinc-950/80 border border-zinc-800 rounded-full overflow-hidden p-[1px]">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-cyan-400 rounded-full"
            style={{ width: `${progress}%` }}
            shadow-glow="cyan"
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
              className="text-xs font-mono text-zinc-400 max-w-xs leading-relaxed"
            >
              {loadingSteps[stepIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Bottom micro diagnostics */}
        <div className="absolute bottom-[-10vh] left-0 right-0 flex justify-between px-2 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
          <span className="flex items-center gap-1"><Server className="w-3.5 h-3.5 text-cyan-500/40" /> SYS.ONLINE</span>
          <span className="flex items-center gap-1"><Activity className="w-3.5 h-3.5 text-violet-500/40" /> LNK.ESTABLISHED</span>
        </div>
      </div>
    </div>
  );
}
