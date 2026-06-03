/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeftRight, ArrowRight, ClipboardCheck, Terminal } from 'lucide-react';
import { Choice, Stats, StatKey } from '../types/simulation';
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
  money: 'Money',
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
      className="rounded-xl border border-indigo-500/30 bg-[#09081a]/80 p-5 backdrop-blur-xl space-y-4"
    >
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2.5">
        <Terminal className="w-4 h-4 text-indigo-400" />
        <span className="text-xs font-mono tracking-widest text-[#a5b4fc] uppercase">DECISION CONSEQUENCE</span>
      </div>

      {/* Main explanation text */}
      <div className="space-y-3">
        <p className="text-zinc-300 text-sm leading-relaxed font-sans font-medium">
          {choice.feedback}
        </p>
      </div>

      {/* Stat change indicators with beautiful glows */}
      <div className="space-y-2">
        <h4 className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">TELEMTRY MODIFICATIONS</h4>
        <div className="flex flex-wrap gap-2">
          {effectsList.map(([key, value]) => {
            if (value === 0) return null;
            const isPositive = value > 0;
            // Stress going down is good, going up is bad. Or just standard check direction
            const isGood = key === 'stress' ? !isPositive : isPositive;

            return (
              <div
                key={key}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold tracking-wide ${
                  isGood
                    ? 'bg-emerald-950/20 border-emerald-500/25 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)] animate-pulse'
                    : 'bg-red-950/20 border-red-500/25 text-red-400 shadow-[0_0_12px_rgba(244,63,94,0.15)]'
                }`}
              >
                <span>{statNameLabels[key]}</span>
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
      <div className="pt-2 flex justify-end">
        <motion.button
          id={`consequence-next-btn`}
          whileHover={{ scale: 1.03, boxShadow: isFriday ? '0 0 25px rgba(236,72,153,0.3)' : '0 0 20px rgba(6,182,212,0.3)' }}
          whileTap={{ scale: 0.98 }}
          onClick={handleProceed}
          className={`w-full sm:w-auto px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-[background-color,color,box-shadow,border-color] duration-300 shadow-md ${
            isFriday
              ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white border border-pink-400/30 shadow-pink-500/10'
              : 'bg-cyan-500 text-black border border-cyan-400/30'
          }`}
        >
          <span>{isFriday ? 'View Final Result' : 'Next Day'}</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </motion.button>
      </div>
    </motion.div>
  );
}
