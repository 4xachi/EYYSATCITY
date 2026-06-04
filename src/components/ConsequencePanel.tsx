/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ClipboardCheck } from 'lucide-react';
import { Choice, StatKey } from '../types/simulation';
import { playClickSound } from '../utils/audio';

interface ConsequencePanelProps {
  choice: Choice;
  isFriday: boolean;
  onNext: () => void;
  soundEnabled: boolean;
}

const statNameLabels: { [keyName in StatKey]: string } = {
  energy: 'Energy',
  stress: 'Stress',
  grades: 'Grades',
  money: 'Budget',
  focus: 'Focus',
  social: 'Social',
};

export default function ConsequencePanel({ choice, isFriday, onNext, soundEnabled }: ConsequencePanelProps) {
  const handleProceed = () => {
    playClickSound(soundEnabled);
    onNext();
  };

  const effectsList = Object.entries(choice.effects) as [StatKey, number][];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="rounded-2xl border border-brand-navy/15 bg-brand-paper p-5.5 shadow-[0_8px_16px_rgba(30,42,68,0.04)] space-y-4 relative"
    >
      <div className="absolute top-0 inset-x-0 h-[2.5px] bg-brand-coral rounded-t-2xl" />

      <div className="flex items-center gap-2 border-b border-brand-navy/10 pb-3">
        <ClipboardCheck className="w-4 h-4 text-brand-coral" />
        <span className="text-xs font-mono tracking-wider text-brand-navy/60 font-bold uppercase">DIARY REFLECTION LOG</span>
      </div>

      {/* Main explanation text */}
      <div className="space-y-3 pl-1">
        <p className="text-brand-ink text-sm sm:text-base leading-relaxed font-sans font-medium">
          {choice.feedback}
        </p>
      </div>

      {/* Stat change indicators with beautiful pastel backgrounds */}
      <div className="space-y-2.5 pl-1">
        <h4 className="text-[9px] font-mono uppercase text-brand-navy/55 tracking-wider font-bold">RESOURCE ADJUSTMENTS</h4>
        <div className="flex flex-wrap gap-2">
          {effectsList.map(([key, value]) => {
            if (value === 0) return null;
            const isPositive = value > 0;
            // Stress going down is good (benefit), grades/money going up is good
            const isGood = key === 'stress' ? !isPositive : isPositive;

            return (
              <div
                key={key}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold tracking-wide ${
                  isGood
                    ? 'bg-brand-green/10 border-brand-green/25 text-brand-green'
                    : 'bg-brand-coral/10 border-brand-coral/25 text-brand-coral'
                }`}
              >
                <span className="opacity-95">{statNameLabels[key]}</span>
                <span>
                  {value > 0 ? '+' : ''}
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action button */}
      <div className="pt-3 pr-1 flex justify-end">
        <motion.button
          id={`consequence-next-btn`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleProceed}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-md ${
            isFriday
              ? 'bg-brand-coral hover:bg-brand-coral/95 text-white shadow-brand-coral/15'
              : 'bg-brand-blue hover:bg-brand-blue/95 text-white shadow-brand-blue/15'
          }`}
        >
          <span>{isFriday ? 'View Term Report' : 'Plan Next Day'}</span>
          <ArrowRight className="w-4 h-4 shrink-0 text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
}
