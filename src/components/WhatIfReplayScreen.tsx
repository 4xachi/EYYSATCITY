/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WhatIfSuggestion, StatKey } from '../types/simulation';
import { RefreshCcw, ArrowRight, ArrowDownRight, TrendingUp, TrendingDown } from 'lucide-react';

interface WhatIfReplayScreenProps {
  suggestion: WhatIfSuggestion | null;
  onClose: () => void;
  onRetry: () => void;
}

export default function WhatIfReplayScreen({ suggestion, onClose, onRetry }: WhatIfReplayScreenProps) {
  if (!suggestion) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-brand-paper rounded-3xl p-8 text-center space-y-6 shadow-xl border border-brand-navy/10">
          <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto">
            <RefreshCcw className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-sans font-extrabold text-brand-ink">Your run was already stable.</h2>
          <p className="text-brand-navy/60 font-sans">You made mostly balanced decisions, so there was no major risky choice to replace. Try a challenge mode in the future for a harder run.</p>
          <div className="flex justify-center gap-4 pt-4">
            <button onClick={onClose} className="px-6 py-3 rounded-xl border border-brand-navy/20 font-bold hover:bg-brand-navy/5 transition-colors text-sm">Back to Final Profile</button>
            <button onClick={onRetry} className="px-6 py-3 rounded-xl bg-brand-ink text-brand-paper font-bold hover:bg-brand-navy transition-colors text-sm">Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  const formatStatDifference = (diff: number, key: string) => {
    if (diff === 0) return null;
    const isPositive = diff > 0;
    // For stress, lower is better. 
    const isGood = key === 'stress' ? !isPositive : isPositive;
    
    return (
      <div key={key} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold ${
        isGood ? 'bg-brand-green/10 text-brand-green' : 'bg-brand-coral/10 text-brand-coral'
      }`}>
        {isPositive ? '+' : ''}{diff} {key.toUpperCase()}
      </div>
    );
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-4xl bg-brand-paper rounded-3xl shadow-2xl overflow-hidden border border-brand-navy/10">
        
        {/* Header */}
        <div className="bg-brand-navy p-6 sm:p-8 text-brand-paper relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
            <RefreshCcw className="w-64 h-64 -mr-16 -mt-16" />
          </div>
          <div className="relative z-10 space-y-2">
            <span className="text-brand-blue font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2">
              <RefreshCcw className="w-4 h-4" /> What-If Replay
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold pb-2">What if you chose differently on {suggestion.day}?</h2>
            <p className="text-brand-paper/70 font-sans text-sm max-w-2xl">
              Scenario: <strong>{suggestion.scenarioTitle}</strong>
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Actual Choice */}
            <div className="space-y-4 p-5 sm:p-6 rounded-2xl bg-brand-coral/5 border border-brand-coral/20">
              <div className="flex items-center gap-2 text-brand-coral">
                <ArrowDownRight className="w-5 h-5" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest">Actual Decision</h3>
              </div>
              <p className="font-sans text-lg font-bold text-brand-ink">"{suggestion.actualChoice}"</p>
            </div>

            {/* Alternative Choice */}
            <div className="space-y-4 p-5 sm:p-6 rounded-2xl bg-brand-green/5 border border-brand-green/20 relative">
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-brand-paper shadow-sm border border-brand-navy/10 z-10 text-brand-navy/40 font-mono text-xs">
                VS
              </div>
              <div className="flex items-center gap-2 text-brand-green">
                <TrendingUp className="w-5 h-5" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest">Better Alternative</h3>
              </div>
              <p className="font-sans text-lg font-bold text-brand-ink">What if you chose: "{suggestion.alternativeChoice}"?</p>
            </div>

          </div>

          {/* Difference */}
          <div className="space-y-4 border-t border-brand-navy/10 pt-6">
            <h3 className="text-sm font-mono text-brand-navy/50 uppercase tracking-widest font-bold text-center">Estimated Difference</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {(Object.keys(suggestion.estimatedDifference) as StatKey[]).map((k) => 
                formatStatDifference(suggestion.estimatedDifference[k] || 0, k)
              )}
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-brand-paper p-5 rounded-xl border border-brand-navy/5 space-y-3">
             <h3 className="text-xs font-mono text-brand-blue uppercase tracking-widest font-bold">Analysis</h3>
             <p className="font-sans text-brand-ink font-medium leading-relaxed">
               {suggestion.explanation}
             </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 border-t border-brand-navy/10">
            <button onClick={onClose} className="px-6 py-4 rounded-xl border border-brand-navy/20 font-bold hover:bg-brand-navy/5 transition-colors text-sm sm:w-1/2 text-center">Back to Final Profile</button>
            <button onClick={onRetry} className="px-6 py-4 rounded-xl bg-brand-ink text-brand-paper font-bold hover:bg-brand-navy transition-colors text-sm sm:w-1/2 text-center flex items-center justify-center gap-2">
              <RefreshCcw className="w-4 h-4" /> Try Again
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
