/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Check, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface ProgressTrackerProps {
  currentDayIndex: number; // 0 to 4
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function ProgressTracker({ currentDayIndex }: ProgressTrackerProps) {
  return (
    <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/40 backdrop-blur-md">
      <div className="flex items-center gap-2 border-b border-zinc-900 pb-2.5 mb-4">
        <Calendar className="w-4 h-4 text-violet-400" />
        <span className="text-xs font-mono tracking-widest text-[#a5b4fc] uppercase">PROGRESS TRACKER</span>
      </div>

      <div className="relative flex justify-between items-center w-full px-2">
        {/* Background connector line */}
        <div className="absolute top-[15px] left-8 right-8 h-[2px] bg-zinc-900" />
        
        {/* Fill line with animated width representing progress */}
        <motion.div 
          className="absolute top-[15px] left-8 h-[2px] bg-gradient-to-r from-cyan-500 to-indigo-500 origin-left"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentDayIndex / 4) * 85}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        {/* Days elements */}
        {days.map((day, idx) => {
          const isCompleted = idx < currentDayIndex;
          const isCurrent = idx === currentDayIndex;
          const isFuture = idx > currentDayIndex;

          return (
            <div key={day} className="z-10 flex flex-col items-center select-none">
              
              {/* Orb indicator */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                    : isCurrent 
                      ? 'bg-indigo-900 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-600'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-cyan-400 stroke-[3px]" />
                ) : (
                  <span className="text-xs font-mono font-bold">{idx + 1}</span>
                )}
              </motion.div>

              {/* Day Label */}
              <span className={`text-[9px] font-mono font-bold tracking-wider mt-2.5 uppercase ${
                isCurrent 
                  ? 'text-indigo-400 font-extrabold drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]' 
                  : isCompleted 
                    ? 'text-cyan-500/80' 
                    : 'text-zinc-600'
              }`}>
                {day.substring(0, 3)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
