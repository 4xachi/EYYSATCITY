/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  RotateCcw, 
  Home, 
  Activity, 
  Sparkles,
  Award
} from 'lucide-react';
import { FinalResult, Stats, Badge } from '../types/simulation';
import BadgeChip from './BadgeChip';
import StatBar from './StatBar';
import { playClickSound, playResultSound } from '../utils/audio';

interface FinalResultScreenProps {
  finalResult: FinalResult;
  stats: Stats;
  badges: Badge[];
  bestScore: number;
  bestResult: string;
  onRestart: () => void;
  onHome: () => void;
  soundEnabled: boolean;
}

export default function FinalResultScreen({
  finalResult,
  stats,
  badges,
  bestScore,
  bestResult,
  onRestart,
  onHome,
  soundEnabled
}: FinalResultScreenProps) {
  
  // Play triumphant sound on component mount
  React.useEffect(() => {
    playResultSound(soundEnabled);
  }, [soundEnabled]);

  const handleRestart = () => {
    playClickSound(soundEnabled);
    onRestart();
  };

  const handleHome = () => {
    playClickSound(soundEnabled);
    onHome();
  };

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 z-10 w-full select-none space-y-10">
      
      {/* Top Banner Result Titles */}
      <div className="text-center space-y-3">
        <span className="text-xs font-mono text-brand-blue tracking-[0.25em] uppercase font-bold">LOG #05 : COMPILATION FINALIZED</span>
        <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-brand-ink tracking-tight">
          Your Week in Review
        </h2>
        <p className="text-brand-navy/70 max-w-xl mx-auto text-sm sm:text-base">
          Thermometer report card finalized. Our simulation models have successfully cataloged your high-school week.
        </p>
      </div>

      {/* Main Core Score Card Block (Styled as an official Academic folder receipt) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl border border-brand-navy/15 bg-brand-paper p-8 sm:p-10 shadow-[0_12px_36px_rgba(30,42,68,0.06)] overflow-hidden"
      >
        {/* Soft notebook grid accent */}
        <div className="absolute inset-0 notebook-grid opacity-15 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-[4px] bg-gradient-to-r from-brand-blue via-brand-amber to-brand-coral rounded-t-2xl" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Large Badge Wax Seal element */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-4">
            
            <div className="relative w-36 h-36 rounded-full bg-brand-cream border-2 border-brand-blue/30 flex items-center justify-center shadow-[0_4px_12px_rgba(30,42,68,0.03)] p-2">
              <div className="absolute inset-1 rounded-full border border-dashed border-brand-navy/20" />
              <div className="text-center">
                <span className="text-[10px] font-mono text-brand-navy/40 tracking-wider block font-bold">FINAL SCORE</span>
                <span className="text-5xl font-mono font-extrabold text-brand-ink">{finalResult.finalScore}</span>
                <span className="text-xs font-mono text-brand-blue block uppercase font-bold tracking-widest mt-0.5">PTS</span>
              </div>
            </div>

            <div className="px-4 py-1.5 rounded-xl bg-brand-cream border border-brand-navy/10 text-[10px] font-mono text-brand-blue font-bold uppercase tracking-widest shadow-sm">
              GRADE CLASSIFICATION: {finalResult.gradeLevel}
            </div>
          </div>

          {/* Right Core Data Description */}
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <div className="space-y-1">
              <span className="text-xs font-mono text-brand-blue tracking-widest uppercase font-bold block">OBTAINED SURVIVAL CHARACTER</span>
              <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-brand-ink tracking-tight">
                {finalResult.title}
              </h3>
            </div>

            <p className="text-brand-navy/80 leading-relaxed font-sans text-sm sm:text-base">
              {finalResult.description}
            </p>

            {/* Micro high-scores comparison folder */}
            <div className="pt-4 border-t border-brand-navy/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-brand-cream border border-brand-navy/10 flex items-start gap-3 shadow-sm">
                <Trophy className="w-5 h-5 text-brand-blue mt-0.5 shrink-0" />
                <div>
                  <span className="text-[9px] font-mono text-brand-navy/50 font-bold uppercase block">BEST HISTORIC RECORD</span>
                  <span className="text-xs font-mono font-bold text-brand-ink">{bestScore || finalResult.finalScore} PTS</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-brand-cream border border-brand-navy/10 flex items-start gap-3 shadow-sm">
                <Award className="w-5 h-5 text-brand-amber mt-0.5 shrink-0" />
                <div>
                  <span className="text-[9px] font-mono text-brand-navy/50 font-bold uppercase block">BEST PROFILE TYPE</span>
                  <span className="text-xs font-sans font-bold text-brand-ink">{bestResult || finalResult.title}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </motion.div>

      {/* Grid: Stats Summary on Left, Badges list on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        
        {/* Left Side: Week Final Stats */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-brand-navy/10 pb-2">
            <Activity className="w-4 h-4 text-brand-blue" />
            <h4 className="text-sm font-mono tracking-wider text-brand-blue font-bold uppercase">Week Ending Stats</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(Object.keys(stats) as (keyof Stats)[]).map((key) => (
              <StatBar key={key} statKey={key} value={stats[key]} />
            ))}
          </div>
        </div>

        {/* Right Side: Earned Badges */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-brand-navy/10 pb-2">
            <Award className="w-4 h-4 text-brand-coral" />
            <h4 className="text-sm font-mono tracking-wider text-brand-coral font-bold uppercase">
              Badges Earned ({badges.length})
            </h4>
          </div>

          {badges.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 max-h-[420px] overflow-y-auto pr-1 planner-scrollbar">
              {badges.map((badge) => (
                <BadgeChip key={badge.id} badge={badge} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-brand-navy/15 bg-brand-paper p-8 text-center text-brand-navy/50 space-y-2">
              <Sparkles className="w-8 h-8 mx-auto text-brand-navy/30" />
              <p className="text-[10px] uppercase tracking-widest font-mono text-brand-navy/40 font-bold block">No Badges Awarded</p>
              <p className="text-xs text-brand-navy/70 max-w-xs mx-auto font-sans leading-relaxed">
                Your stats did not reach any extreme boundary conditions this week. Keep experimenting to earn stickers!
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Navigation block */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-brand-navy/10 pt-8">
        <motion.button
          id="restart-sim-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRestart}
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue/95 text-white font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-brand-blue/15"
        >
          <RotateCcw className="w-4 h-4 text-white shrink-0" />
          <span>Try Another Week</span>
        </motion.button>

        <motion.button
          id="back-home-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleHome}
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-cream border border-brand-navy/15 hover:bg-brand-cream/80 text-brand-ink font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
        >
          <Home className="w-4 h-4 text-brand-navy/70 shrink-0" />
          <span>Campus Directory</span>
        </motion.button>
      </div>

    </div>
  );
}
