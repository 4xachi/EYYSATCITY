/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Radio, ArrowRight, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { RandomEvent, StatKey } from '../types/simulation';
import { playClickSound } from '../utils/audio';

interface RandomEventPanelProps {
  event: RandomEvent | null; // null means no event triggered
  onContinue: () => void;
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

export default function RandomEventPanel({ event, onContinue, soundEnabled }: RandomEventPanelProps) {
  const handleContinue = () => {
    playClickSound(soundEnabled);
    onContinue();
  };

  const hasEvent = !!event;
  const effectsList = hasEvent ? (Object.entries(event.effects) as [StatKey, number][]) : [];

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center py-10 px-4 sm:px-6 w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, rotateY: 30 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className={`relative max-w-xl w-full rounded-2xl border p-8 sm:p-10 backdrop-blur-2xl shadow-2xl flex flex-col justify-between overflow-hidden ${
          hasEvent 
            ? 'bg-gradient-to-b from-[#0b0b1a] to-[#04040d] border-cyan-500/30 shadow-cyan-950/20' 
            : 'bg-gradient-to-b from-zinc-950 to-[#020208] border-zinc-800/80 shadow-black'
        }`}
      >
        {/* Cinematic scanning trace bar */}
        <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${
          hasEvent 
            ? 'from-cyan-500 via-indigo-500 to-violet-500' 
            : 'from-zinc-700 via-zinc-800 to-zinc-700'
        }`} />

        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
            <Radio className={`w-5 h-5 ${hasEvent ? 'text-cyan-400 animate-pulse' : 'text-zinc-600'}`} />
            <span className="text-xs font-mono tracking-[0.25em] text-zinc-500 uppercase">
              WIRELESS TELEMETRY INTERCEPT
            </span>
          </div>

          {/* Core Content Box */}
          {hasEvent ? (
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                <AlertCircle className="w-3.5 h-3.5" /> CRITICAL PROBABILITY TRIGGERED
              </span>

              <div className="space-y-2">
                <h3 className="text-2xl font-sans font-extrabold text-white tracking-tight uppercase">
                  {event.title}
                </h3>
                <p className="text-zinc-300 font-sans leading-relaxed text-sm">
                  {event.message}
                </p>
              </div>

              {/* Event Stat modifiers list */}
              <div className="space-y-2.5 border-t border-zinc-900 pt-5">
                <h4 className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">EVENT STOCHASTIC EFFECTS</h4>
                <div className="flex flex-wrap gap-2.5">
                  {effectsList.map(([key, value]) => {
                    const isPositive = value > 0;
                    const isGood = key === 'stress' ? !isPositive : isPositive;

                    return (
                      <div
                        key={key}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold tracking-wide ${
                          isGood
                            ? 'bg-emerald-950/20 border-emerald-500/25 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.15)] animate-pulse'
                            : 'bg-red-950/20 border-red-500/25 text-red-100 shadow-[0_0_8px_rgba(239,68,68,0.15)]'
                        }`}
                      >
                        <span>{statNameLabels[key]}</span>
                        <span>{value > 0 ? '+' : ''}{value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 py-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" /> STABLE MATRIX SEQUENCE
              </span>

              <div className="space-y-2">
                <h3 className="text-xl font-sans font-bold text-zinc-400 tracking-tight">
                  No Major City Event
                </h3>
                <p className="text-zinc-500 font-sans leading-relaxed text-sm">
                  No major event happened today. The city stays quiet. You got a sweet chance to recharge your routine without sudden deviations.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Continue Buttons */}
        <div className="mt-10 pt-5 border-t border-zinc-900 flex justify-end">
          <motion.button
            id={`event-continue-btn`}
            whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(6,182,212,0.3)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-md"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
