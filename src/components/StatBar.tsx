/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Activity, 
  GraduationCap, 
  Coins, 
  Target, 
  Users,
  AlertTriangle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { StatKey } from '../types/simulation';
import { getStatStatus } from '../utils/simulationLogic';

// Map icon component to visual
const iconMap: { [key: string]: any } = {
  energy: Zap,
  stress: Activity,
  grades: GraduationCap,
  money: Coins,
  focus: Target,
  social: Users,
};

// Define customized colors for each stat
const colors: { [key in StatKey]: { bg: string; fill: string; shadow: string; text: string } } = {
  energy: {
    bg: 'bg-amber-950/20 border-amber-900/30',
    fill: 'bg-gradient-to-r from-amber-500 to-yellow-400',
    shadow: 'shadow-[0_0_12px_rgba(245,158,11,0.3)]',
    text: 'text-amber-400'
  },
  stress: {
    bg: 'bg-rose-950/20 border-rose-900/30',
    fill: 'bg-gradient-to-r from-rose-500 to-red-400',
    shadow: 'shadow-[0_0_12px_rgba(244,63,94,0.3)]',
    text: 'text-rose-400'
  },
  grades: {
    bg: 'bg-cyan-950/20 border-cyan-900/30',
    fill: 'bg-gradient-to-r from-cyan-500 to-sky-400',
    shadow: 'shadow-[0_0_12px_rgba(6,182,212,0.3)]',
    text: 'text-cyan-400'
  },
  money: {
    bg: 'bg-emerald-950/20 border-emerald-900/30',
    fill: 'bg-gradient-to-r from-emerald-500 to-green-400',
    shadow: 'shadow-[0_0_12px_rgba(16,185,129,0.3)]',
    text: 'text-emerald-400'
  },
  focus: {
    bg: 'bg-indigo-950/20 border-indigo-900/30',
    fill: 'bg-gradient-to-r from-indigo-500 to-violet-400',
    shadow: 'shadow-[0_0_12px_rgba(99,102,241,0.3)]',
    text: 'text-indigo-400'
  },
  social: {
    bg: 'bg-fuchsia-950/20 border-fuchsia-900/30',
    fill: 'bg-gradient-to-r from-fuchsia-500 to-pink-400',
    shadow: 'shadow-[0_0_12px_rgba(217,70,239,0.3)]',
    text: 'text-fuchsia-400'
  },
};

interface StatBarProps {
  key?: any;
  statKey: StatKey;
  value: number;
  latestChange?: number;
}

export default function StatBar({ statKey, value, latestChange }: StatBarProps) {
  const IconComponent = iconMap[statKey] || Zap;
  const statusLabel = getStatStatus(statKey, value);
  const style = colors[statKey];

  // Detect critical status flags (Warning / Critical)
  const isStressWarning = statKey === 'stress' && value >= 75;
  const isEnergyWarning = statKey === 'energy' && value <= 30;

  return (
    <div className={`relative p-4 rounded-xl border ${style.bg} backdrop-blur-md transition-all duration-300 shadow-sm ${
      isStressWarning ? 'border-red-500/50 bg-red-950/10 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : ''
    } ${
      isEnergyWarning ? 'border-amber-500/50 bg-amber-950/10 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : ''
    }`}>
      
      {/* Absolute positioned floating stat modification chips */}
      <AnimatePresence>
        {latestChange !== undefined && latestChange !== 0 && (
          <motion.div
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: -15 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`absolute top-0 right-4 flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wide ${
              latestChange > 0 
                ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                : 'bg-rose-500/20 border border-rose-500/30 text-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.2)]'
            }`}
          >
            {latestChange > 0 ? (
              <ArrowUp className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
            ) : (
              <ArrowDown className="w-2.5 h-2.5 text-rose-400 shrink-0" />
            )}
            <span>
              {latestChange > 0 ? '+' : ''}
              {latestChange}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title & Micro indicators */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className={`p-1.5 rounded-lg bg-zinc-950/40 border border-zinc-800/80 ${style.text}`}>
            <IconComponent className="w-4 h-4 shrink-0" />
          </span>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">STATISTIC</span>
            <span className="text-xs font-semibold text-white capitalize">{statKey}</span>
          </div>
        </div>

        {/* Status text label (e.g. Critical, Energized) */}
        <div className="text-right">
          <span className="text-[10px] font-mono tracking-wide text-zinc-500 uppercase block">CONDITION</span>
          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
            isStressWarning ? 'text-red-400 animate-pulse' : 
            isEnergyWarning ? 'text-amber-400 animate-pulse' : style.text
          }`}>
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Numeric value readout */}
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-2xl font-mono font-extrabold text-white tracking-tight">
          {value}
          <span className="text-[10px] font-mono text-zinc-500 ml-0.5">/100</span>
        </span>
      </div>

      {/* Animated micro progress bar */}
      <div className="h-2 w-full bg-zinc-950/60 rounded-full border border-zinc-900/60 overflow-hidden relative">
        <motion.div
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`h-full rounded-full ${style.fill} ${style.shadow}`}
        />
      </div>

      {/* Embedded Alert indicators */}
      {isStressWarning && (
        <div className="mt-2 flex items-center gap-1 text-[10px] text-red-400 font-mono uppercase bg-red-950/40 border border-red-500/20 px-2 py-0.5 rounded">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>Stress level critical</span>
        </div>
      )}
      {isEnergyWarning && (
        <div className="mt-2 flex items-center gap-1 text-[10px] text-amber-400 font-mono uppercase bg-amber-950/40 border border-amber-500/20 px-2 py-0.5 rounded">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>Energy running low</span>
        </div>
      )}
    </div>
  );
}
