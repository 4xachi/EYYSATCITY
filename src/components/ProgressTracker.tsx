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
    <div className="p-4 rounded-2xl border border-brand-navy/15 bg-brand-paper shadow-sm select-none">
      <div className="flex items-center gap-2 border-b border-brand-navy/10 pb-2.5 mb-4">
        <Calendar className="w-4 h-4 text-brand-blue" />
        <span className="text-xs font-mono tracking-wider text-brand-navy/60 font-bold uppercase">WEEKLY TIMELOG TIMETABLE</span>
      </div>

      <div className="relative flex justify-between items-center w-full px-2">
        {/* Background connector line */}
        <div className="absolute top-[16px] left-8 right-8 h-[2.5px] bg-brand-cream" />
        
        {/* Fill line with animated width representing progress */}
        <motion.div 
          className="absolute top-[16px] left-8 h-[2.5px] bg-gradient-to-r from-brand-blue to-brand-lavender origin-left"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentDayIndex / 4) * 82}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        {/* Days elements */}
        {days.map((day, idx) => {
          const isCompleted = idx < currentDayIndex;
          const isCurrent = idx === currentDayIndex;

          return (
            <div key={day} className="z-10 flex flex-col items-center select-none">
              
              {/* Card tab indicator */}
              <motion.div
                whileHover={{ scale: 1.12 }}
                className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-brand-green/10 border-brand-green text-brand-green shadow-sm' 
                    : isCurrent 
                      ? 'bg-brand-blue border-brand-blue text-white shadow-md shadow-brand-blue/15'
                      : 'bg-brand-cream/40 border-brand-navy/10 text-brand-navy/40 font-semibold'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-brand-green stroke-[3px]" />
                ) : (
                  <span className="text-xs font-mono font-bold">{idx + 1}</span>
                )}
              </motion.div>

              {/* Day Label */}
              <span className={`text-[9px] font-mono font-bold tracking-wider mt-2.5 uppercase ${
                isCurrent 
                  ? 'text-brand-blue font-extrabold' 
                  : isCompleted 
                    ? 'text-brand-green/80 font-bold' 
                    : 'text-brand-navy/40 font-bold'
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
