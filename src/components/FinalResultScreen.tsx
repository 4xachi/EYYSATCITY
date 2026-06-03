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
  BookOpen,
  Mail,
  Users,
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
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 z-10 w-full animate-fade-in space-y-12 select-none">
      
      {/* Top Banner Result Titles */}
      <div className="text-center space-y-3">
        <span className="text-xs font-mono text-cyan-400 tracking-[0.25em] uppercase">SYSTEM COMPUTATION COMPLETE</span>
        <h2 className="text-4xl sm:text-6xl font-sans font-extrabold text-white tracking-tight">
          Your Week Result
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
          The engine has completed life telemetry compilation. Review your profile archetypes below.
        </p>
      </div>

      {/* Main Core Score Card Block (Glassmorphic panel) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl border border-cyan-500/25 bg-zinc-950/70 p-8 sm:p-10 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Large Badge visual circle */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-4">
            
            <div className="relative w-36 h-36 rounded-full bg-cyan-950/20 border-2 border-cyan-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.15)] animate-pulse">
              <div className="absolute -inset-1 rounded-full border border-violet-500/10 animate-ping duration-3000" />
              <div className="text-center">
                <span className="text-[10px] font-mono text-cyan-400 tracking-wider block">SCORE STATE</span>
                <span className="text-5xl font-mono font-extrabold text-white">{finalResult.finalScore}</span>
                <span className="text-xs font-mono text-zinc-500 block uppercase mt-0.5">PTS</span>
              </div>
            </div>

            <div className="px-3.5 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/15 text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
              GRADE RATING: {finalResult.gradeLevel}
            </div>
          </div>

          {/* Right Core Data Description */}
          <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-violet-400 tracking-widest uppercase block">CALCULATED STUDENT PROFILE</span>
              <h3 className="text-3xl font-extrabold text-white tracking-tight">
                {finalResult.title}
              </h3>
            </div>

            <p className="text-zinc-300 leading-relaxed font-sans text-sm sm:text-base">
              {finalResult.description}
            </p>

            {/* Micro high-scores layout compare */}
            <div className="pt-4 border-t border-zinc-900 grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
                <Trophy className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">BEST HISTORIC SCORE</span>
                  <span className="text-sm font-mono font-bold text-white">{bestScore || finalResult.finalScore} PTS</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">BEST PROFILE TYPE</span>
                  <span className="text-sm font-sans font-bold text-white">{bestResult || finalResult.title}</span>
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
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <h4 className="text-sm font-mono tracking-widest text-[#a5b4fc] uppercase">Week Ending Stats</h4>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {(Object.keys(stats) as (keyof Stats)[]).map((key) => (
              <StatBar key={key} statKey={key} value={stats[key]} />
            ))}
          </div>
        </div>

        {/* Right Side: Earned Badges */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
            <Award className="w-4 h-4 text-violet-400" />
            <h4 className="text-sm font-mono tracking-widest text-[#a5b4fc] uppercase">
              Badges Earned ({badges.length})
            </h4>
          </div>

          {badges.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 max-h-[420px] overflow-y-auto pr-1">
              {badges.map((badge) => (
                <BadgeChip key={badge.id} badge={badge} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-950/20 p-8 text-center text-zinc-500 space-y-2">
              <Sparkles className="w-8 h-8 mx-auto opacity-35 text-zinc-500" />
              <p className="text-xs uppercase tracking-widest font-mono text-zinc-600 block">No Badges Awarded</p>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">None of your week statistics reached extreme badge requirements. Try again to explore more archetypes!</p>
            </div>
          )}
        </div>

      </div>

      {/* Interactive Trigger navigation block */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-zinc-900 pt-8">
        <motion.button
          id="restart-sim-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRestart}
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all"
        >
          <RotateCcw className="w-4 h-4 text-black shrink-0" />
          <span>Try Again</span>
        </motion.button>

        <motion.button
          id="back-home-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleHome}
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <Home className="w-4 h-4 text-zinc-400 shrink-0" />
          <span>Back to Home</span>
        </motion.button>
      </div>

    </div>
  );
}
