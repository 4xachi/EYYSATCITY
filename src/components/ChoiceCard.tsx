/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Choice, Stats, StatKey } from '../types/simulation';
import { CheckCircle, ChevronRight, Sparkles } from 'lucide-react';

interface ChoiceCardProps {
  key?: any;
  choice: Choice;
  onSelect: (choice: Choice) => void;
  disabled: boolean;
  isSelected: boolean;
}

const keyLabelMap: { [key in StatKey]: string } = {
  energy: 'Energy',
  stress: 'Stress',
  grades: 'Grades',
  money: 'Money',
  focus: 'Focus',
  social: 'Social',
};

export default function ChoiceCard({ choice, onSelect, disabled, isSelected }: ChoiceCardProps) {
  // Extract effects for preview chips
  const effectsArray = Object.entries(choice.effects) as [StatKey, number][];

  return (
    <motion.button
      id={`choice-btn-${choice.id}`}
      whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.99 }}
      onClick={() => !disabled && onSelect(choice)}
      disabled={disabled}
      className={`relative w-full rounded-xl border-2 p-5 text-left transition-[border-color,background-color,color,box-shadow] duration-300 flex items-start gap-4 shadow-sm ${
        isSelected 
          ? 'bg-gradient-to-r from-indigo-950/40 to-cyan-950/20 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] text-white' 
          : disabled 
            ? 'bg-zinc-950/40 border-zinc-900 opacity-60 text-zinc-500 cursor-not-allowed' 
            : 'bg-[#0a0a14] border-zinc-800/90 text-zinc-400 hover:border-cyan-500/80 hover:bg-[#111124] hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:text-white cursor-pointer active:border-cyan-400'
      }`}
    >
      {/* Decorative vertical interactive bar */}
      <div 
        className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-lg transition-transform duration-300 ${
          isSelected 
            ? 'bg-indigo-500' 
            : disabled 
              ? 'bg-zinc-800' 
              : 'bg-zinc-700/80 group-hover:bg-cyan-400'
        }`}
      />

      {/* Choice Icon / Number Indicator on the left */}
      <div className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-colors shrink-0 ${
        isSelected 
          ? 'bg-indigo-950 border-indigo-500/40 text-indigo-400' 
          : disabled 
            ? 'bg-zinc-900 border-zinc-800 text-zinc-600' 
            : 'bg-[#15152a] border-zinc-800 text-cyan-400 group-hover:border-cyan-500/50'
      }`}>
        <Sparkles className={`w-4 h-4 ${isSelected ? 'animate-pulse' : ''}`} />
        <span className="text-[8px] font-mono font-extrabold uppercase mt-1 tracking-wider">CHOOSE</span>
      </div>

      <div className="flex-1 space-y-3 pr-2">
        {/* Main interactive choice content */}
        <p className={`text-sm sm:text-base font-semibold leading-relaxed font-sans ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
          {choice.text}
        </p>

        {/* Floating small mini consequences hints (Visible only when selected) */}
        {isSelected && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {effectsArray.map(([stat, val]) => {
              if (val === 0) return null;
              const isPositive = val > 0;
              // Stress is positive effect if negative (since less stress is better for survival!)
              const isValueBenefit = stat === 'stress' ? !isPositive : isPositive;

              return (
                <span
                  key={stat}
                  className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wide border ${
                    isValueBenefit
                      ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-400'
                      : 'bg-red-950/20 border-red-500/20 text-red-400'
                  }`}
                >
                  {keyLabelMap[stat]} {isPositive ? '+' : ''}
                  {val}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Selection indicators on the far right */}
      <div className="shrink-0 pt-0.5">
        {isSelected ? (
          <div className="text-indigo-400">
            <CheckCircle className="w-5 h-5 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
          </div>
        ) : (
          <div className={`transition-all duration-300 ${disabled ? 'text-zinc-800' : 'text-zinc-500 hover:text-cyan-400 hover:translate-x-1'}`}>
            <ChevronRight className="w-5 h-5" />
          </div>
        )}
      </div>
    </motion.button>
  );
}
