/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Target, CheckCircle2 } from 'lucide-react';
import { GOALS } from '../data/goals';
import { Goal } from '../types/simulation';

interface GoalSelectionScreenProps {
  onSelectGoal: (goal: Goal) => void;
  selectedGoal: Goal | null;
  onContinue: () => void;
}

export default function GoalSelectionScreen({ onSelectGoal, selectedGoal, onContinue }: GoalSelectionScreenProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-2xl bg-brand-navy/5 text-brand-ink mb-2">
            <Target className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-sans font-extrabold text-brand-ink tracking-tight">
            Choose Your Student Goal
          </h1>
          <p className="text-brand-navy/60 max-w-2xl mx-auto font-sans text-sm sm:text-base leading-relaxed">
            Before the school week starts, choose what kind of student life you want to protect. Your final result will check if you achieved your goal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GOALS.map((goal) => {
            const isSelected = selectedGoal?.id === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => onSelectGoal(goal)}
                className={`text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group flex flex-col justify-between h-full w-full ${
                  isSelected 
                    ? 'border-brand-ink bg-white shadow-xl scale-[1.02] ring-2 ring-brand-ink ring-offset-2' 
                    : 'border-brand-navy/15 bg-white/60 hover:bg-white hover:border-brand-navy/30 hover:-translate-y-1'
                }`}
              >
                <div className="flex flex-col justify-between h-full w-full space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-sans font-bold text-base sm:text-lg text-brand-ink leading-snug">
                        {goal.title}
                      </h3>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 animate-bounce" />
                      )}
                    </div>
                    <p className="text-sm text-brand-navy/60 font-sans leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-brand-navy/10 mt-auto">
                    <span className="text-[10px] font-mono uppercase font-bold text-brand-navy/40 block mb-1">Success Condition</span>
                    <span className={`text-xs font-mono font-extrabold ${isSelected ? 'text-brand-ink' : 'text-brand-navy/60'}`}>
                      {goal.successConditionText}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center pt-8">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: selectedGoal ? 1 : 0.5, y: 0 }}
            disabled={!selectedGoal}
            onClick={onContinue}
            className={`px-8 py-4 rounded-xl font-sans font-bold tracking-wide transition-all ${
              selectedGoal 
                ? 'bg-brand-ink text-white hover:bg-brand-navy hover:scale-[1.02] shadow-lg' 
                : 'bg-brand-navy/10 text-brand-navy/40 cursor-not-allowed'
            }`}
          >
            Continue to Student Type
          </motion.button>
        </div>

      </div>
    </div>
  );
}
