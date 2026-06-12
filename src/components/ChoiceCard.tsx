/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Choice, StatKey } from '../types/simulation';
import { CheckCircle2, ChevronRight, PenTool } from 'lucide-react';

interface ChoiceCardProps {
  key?: any;
  choice: Choice;
  onSelect: (choice: Choice) => void;
  disabled: boolean;
  isSelected: boolean;
  showEffects?: boolean;
}

const keyLabelMap: { [key in StatKey]: string } = {
  energy: 'Energy',
  stress: 'Stress',
  grades: 'Grades',
  money: 'Budget',
  focus: 'Focus',
  social: 'Social',
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 350, damping: 28 } 
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    transition: { duration: 0.12 } 
  }
};

export default function ChoiceCard({ choice, onSelect, disabled, isSelected, showEffects = false }: ChoiceCardProps) {
  // Extract effects for preview chips
  const effectsArray = Object.entries(choice.effects) as [StatKey, number][];

  return (
    <motion.button
      id={`choice-btn-${choice.id}`}
      variants={itemVariants}
      whileHover={disabled ? {} : { scale: 1.01, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.99 }}
      onClick={() => !disabled && onSelect(choice)}
      disabled={disabled}
      className={`relative w-full rounded-2xl border p-4.5 text-left transition-all duration-300 flex items-start gap-4 shadow-sm ${
        isSelected 
          ? 'bg-brand-paper border-brand-blue shadow-[0_8px_16px_rgba(79,123,255,0.06)] ring-1 ring-brand-blue text-brand-ink' 
          : disabled 
            ? 'bg-brand-cream/40 border-brand-navy/5 opacity-50 text-brand-navy/40 cursor-not-allowed' 
            : 'bg-brand-paper border-brand-navy/10 text-brand-navy/80 hover:border-brand-blue/60 hover:bg-white hover:shadow-md cursor-pointer'
      }`}
    >
      {/* Decorative vertical interactive bar */}
      <div 
        className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl transition-all duration-300 ${
          isSelected 
            ? 'bg-brand-blue' 
            : disabled 
              ? 'bg-brand-navy/10' 
              : 'bg-brand-navy/15 hover:bg-brand-blue/45'
        }`}
      />

      {/* Choice Icon on the left */}
      <div className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-colors shrink-0 ${
        isSelected 
          ? 'bg-brand-blue/10 border-brand-blue/20 text-brand-blue' 
          : disabled 
            ? 'bg-brand-cream border-brand-navy/10 text-brand-navy/20' 
            : 'bg-brand-cream border-brand-navy/5 text-brand-navy/50'
      }`}>
        <PenTool className={`w-4 h-4 ${isSelected ? 'animate-pulse' : ''}`} />
        <span className="text-[8px] font-mono font-bold uppercase mt-1 tracking-wider">PLAN</span>
      </div>

      <div className="flex-1 space-y-2.5 pr-2 pl-1">
        {/* Main interactive choice content */}
        <p className={`text-sm sm:text-base font-bold leading-normal font-sans ${isSelected ? 'text-brand-ink' : 'text-brand-navy/90'}`}>
          {choice.text}
        </p>

        {/* Floating small mini consequences hints (Visible only when selected and effects are to be shown) */}
        {isSelected && showEffects && (
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {effectsArray.map(([stat, val]) => {
              if (val === 0) return null;
              const isPositive = val > 0;
              // Stress reduction is a benefit, so stress -10 is good (green), stress +10 is bad (coral)
              const isValueBenefit = stat === 'stress' ? !isPositive : isPositive;

              return (
                <span
                  key={stat}
                  className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-lg uppercase tracking-wide border ${
                    isValueBenefit
                      ? 'bg-brand-green/10 border-brand-green/20 text-brand-green'
                      : 'bg-brand-coral/10 border-brand-coral/20 text-brand-coral'
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
          <div className="text-brand-blue">
            <CheckCircle2 className="w-5 h-5 fill-white" />
          </div>
        ) : (
          <div className={`transition-all duration-300 ${disabled ? 'text-brand-navy/20' : 'text-brand-navy/30 hover:text-brand-blue hover:translate-x-0.5'}`}>
            <ChevronRight className="w-5 h-5" />
          </div>
        )}
      </div>
    </motion.button>
  );
}
