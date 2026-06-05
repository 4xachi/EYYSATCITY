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

// Define customized colors for each stat - Academic Palette
const colors: { [key in StatKey]: { bg: string; fill: string; text: string; lightBg: string } } = {
  energy: {
    bg: 'border-brand-navy/10',
    fill: 'bg-brand-amber',
    text: 'text-brand-amber',
    lightBg: 'bg-brand-amber/10'
  },
  stress: {
    bg: 'border-brand-navy/10',
    fill: 'bg-brand-coral',
    text: 'text-brand-coral',
    lightBg: 'bg-brand-coral/11'
  },
  grades: {
    bg: 'border-brand-navy/10',
    fill: 'bg-brand-blue',
    text: 'text-brand-blue',
    lightBg: 'bg-brand-blue/10'
  },
  money: {
    bg: 'border-brand-navy/10',
    fill: 'bg-brand-green',
    text: 'text-brand-green',
    lightBg: 'bg-brand-green/10'
  },
  focus: {
    bg: 'border-brand-navy/10',
    fill: 'bg-brand-lavender',
    text: 'text-brand-lavender',
    lightBg: 'bg-brand-lavender/10'
  },
  social: {
    bg: 'border-brand-navy/10',
    fill: 'bg-teal-500',
    text: 'text-teal-600',
    lightBg: 'bg-teal-500/10'
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
    <div className={`relative p-4 rounded-2xl border ${style.bg} bg-brand-paper transition-all duration-300 shadow-[0_4px_10px_rgba(30,42,68,0.02)] ${
      isStressWarning ? 'border-brand-coral/50 bg-brand-coral/5 shadow-[0_4px_12px_rgba(242,109,91,0.05)]' : ''
    } ${
      isEnergyWarning ? 'border-brand-amber/50 bg-brand-amber/5 shadow-[0_4px_12px_rgba(245,184,75,0.05)]' : ''
    }`}>
      
      {/* Absolute positioned floating stat modification chips */}
      <AnimatePresence>
        {latestChange !== undefined && latestChange !== 0 && (
          <motion.div
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: -15 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`absolute top-0 right-4 flex items-center gap-0.5 px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono tracking-wide ${
              latestChange > 0 
                ? 'bg-brand-green/10 border border-brand-green/30 text-brand-green shadow-sm'
                : 'bg-brand-coral/10 border border-brand-coral/30 text-brand-coral shadow-sm'
            }`}
          >
            {latestChange > 0 ? (
              <ArrowUp className="w-2.5 h-2.5 text-brand-green shrink-0" />
            ) : (
              <ArrowDown className="w-2.5 h-2.5 text-brand-coral shrink-0" />
            )}
            <span>
              {latestChange > 0 ? '+' : ''}
              {latestChange}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title & Micro indicators */}
      <div className="flex justify-between items-start mb-2 gap-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className={`p-1.5 rounded-lg border border-brand-navy/5 shrink-0 ${style.lightBg} ${style.text}`}>
            <IconComponent className="w-4 h-4 shrink-0" />
          </span>
          <div className="min-w-0">
            <span className="text-[8px] sm:text-[9px] font-mono tracking-wider text-brand-navy/50 font-bold uppercase block truncate">STAT</span>
            <span className="text-xs font-bold text-brand-ink capitalize truncate block">{statKey}</span>
          </div>
        </div>

        {/* Status text label (e.g. Critical, Energized) */}
        <div className="text-right min-w-0 shrink-0">
          <span className="text-[8px] sm:text-[9px] font-mono tracking-wide text-brand-navy/50 font-bold uppercase block truncate">STATUS</span>
          <span className={`text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider block truncate ${
            isStressWarning ? 'text-brand-coral animate-pulse' : 
            isEnergyWarning ? 'text-brand-amber animate-pulse' : style.text
          }`}>
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Numeric value readout */}
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-2xl font-mono font-extrabold text-brand-ink tracking-tight">
          {value}
          <span className="text-[10px] font-mono text-brand-navy/40 ml-0.5 font-bold">/100</span>
        </span>
      </div>

      {/* Animated micro progress bar */}
      <div className="h-2 w-full bg-brand-cream/40 rounded-full border border-brand-navy/5 overflow-hidden relative">
        <motion.div
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`h-full rounded-full ${style.fill}`}
        />
      </div>

      {/* Embedded Alert indicators */}
      {isStressWarning && (
        <div className="mt-2.5 flex items-center gap-1 text-[9px] text-brand-coral font-mono font-bold uppercase bg-brand-coral/10 border border-brand-coral/20 px-2 py-0.5 rounded-lg">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>Stress level critical</span>
        </div>
      )}
      {isEnergyWarning && (
        <div className="mt-2.5 flex items-center gap-1 text-[9px] text-brand-amber font-mono font-bold uppercase bg-brand-amber/10 border border-brand-amber/20 px-2 py-0.5 rounded-lg">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>Energy running low</span>
        </div>
      )}
    </div>
  );
}
