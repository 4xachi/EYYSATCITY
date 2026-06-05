/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  RotateCcw, 
  Sparkles,
  Award,
  RefreshCcw
} from 'lucide-react';
import { FinalResult, Stats, Badge, Goal, ReflectionEntry } from '../types/simulation';
import StatDashboard from './StatDashboard';
import GoalStatusCard from './GoalStatusCard';
import WeeklyReflectionReport from './WeeklyReflectionReport';
import BadgeCollection from './BadgeCollection';
import { playResultSound } from '../utils/audio';

interface FinalResultScreenProps {
  result: FinalResult;
  finalStats: Stats;
  badgesEarned: Badge[];
  studentName: string;
  studentIcon: string;
  onRestart: () => void;
  soundEnabled: boolean;
  selectedGoal: Goal | null;
  reflectionJournal: ReflectionEntry[];
  unlockedBadgeIds: string[];
  onShowWhatIf: () => void;
}

export default function FinalResultScreen({
  result,
  finalStats,
  badgesEarned,
  studentName,
  studentIcon,
  onRestart,
  soundEnabled,
  selectedGoal,
  reflectionJournal,
  unlockedBadgeIds,
  onShowWhatIf
}: FinalResultScreenProps) {

  useEffect(() => {
    // Play fanfare based on score ranking
    playResultSound(soundEnabled, result.finalScore > 75);
  }, [soundEnabled, result.finalScore]);

  return (
    <div className="py-12 px-4 max-w-5xl mx-auto space-y-12 pb-24">
      
      {/* Title Header */}
      <div className="text-center space-y-4 pt-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-brand-cream border-4 border-white shadow-xl text-4xl sm:text-6xl text-brand-blue mb-4"
        >
          {studentIcon}
        </motion.div>
        
        <h1 className="text-4xl sm:text-6xl font-sans font-extrabold text-brand-ink uppercase tracking-tight text-balance">
          {result.title}
        </h1>
        <p className="text-brand-navy/60 font-mono tracking-widest text-sm uppercase font-bold">
          {studentName} Run Complete
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Summary and Core Stats */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-navy/10 shadow-sm relative overflow-hidden">
             {/* Score Ribbon */}
             <div className="absolute top-0 right-0 bg-brand-ink text-brand-paper px-6 py-2 rounded-bl-3xl font-mono font-bold text-xl flex items-center gap-2">
               <Trophy className="w-5 h-5 text-brand-gold" /> 
               {result.finalScore} / 100
             </div>

             <div className="mt-8 space-y-4">
               <div>
                  <h3 className="text-sm font-mono text-brand-navy/50 uppercase tracking-widest font-bold mb-2">Final Evaluation</h3>
                  <p className="text-lg font-sans text-brand-ink font-medium leading-relaxed">
                    {result.description}
                  </p>
               </div>
               
               {/* Pattern Diagnostics */}
               <div className="pt-4 mt-4 border-t border-brand-navy/10 grid grid-cols-2 gap-4">
                  <div>
                     <span className="text-[10px] font-mono text-brand-navy/40 uppercase tracking-widest font-bold block mb-1">Tendency</span>
                     <span className="font-sans font-bold text-brand-ink text-sm bg-brand-paper px-2 py-1 rounded inline-block">{result.riskPattern}</span>
                  </div>
                  <div>
                     <span className="text-[10px] font-mono text-brand-navy/40 uppercase tracking-widest font-bold block mb-1">Peak Capability</span>
                     <span className="font-mono font-bold text-brand-green text-sm bg-brand-green/10 px-2 py-1 rounded inline-block uppercase">{result.strongestStat}</span>
                  </div>
               </div>
             </div>
          </div>

          <GoalStatusCard 
            goal={selectedGoal} 
            achieved={result.goalAchieved} 
            message={result.goalMessage} 
          />

          <div className="bg-white rounded-3xl border border-brand-navy/10 p-6 shadow-sm">
             <h3 className="text-sm font-mono text-brand-navy/50 uppercase tracking-widest font-bold mb-4">Final Student Vitals</h3>
             <StatDashboard stats={finalStats} statChanges={null} />
          </div>

        </div>

        {/* Right Column: Badges & Next Steps */}
        <div className="lg:col-span-5 space-y-8">
          
          { badgesEarned.length > 0 && (
            <div className="bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 p-6 sm:p-8 rounded-3xl border border-brand-gold/30 shadow-sm animate-pulse-slow">
              <div className="flex items-center gap-2 mb-4 text-brand-gold">
                <Sparkles className="w-6 h-6" />
                <h3 className="text-lg font-sans font-extrabold uppercase tracking-tight">New Badges Earned</h3>
              </div>
              <div className="space-y-3">
                {badgesEarned.map(b => (
                  <div key={b.id} className="bg-white p-3 rounded-xl flex items-center gap-3 shadow-sm border border-brand-gold/10">
                    <div className="bg-brand-gold/20 p-2 rounded-lg text-brand-gold">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-brand-ink block text-sm">{b.name}</span>
                      <span className="text-xs text-brand-navy/60 font-sans">{b.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-brand-navy p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col gap-6">
             <div>
                <h3 className="font-mono text-brand-blue uppercase tracking-widest text-xs font-bold mb-2">Instructor Advice</h3>
                <p className="font-sans font-medium text-white/90 leading-relaxed text-sm">
                  {result.suggestedNextGoal}
                </p>
             </div>

             <div className="space-y-3 pt-6 border-t border-white/10">
                <button 
                  onClick={onShowWhatIf}
                  className="w-full py-4 px-6 rounded-xl bg-brand-blue/20 hover:bg-brand-blue/30 text-brand-blue font-sans font-bold flex items-center justify-center gap-2 transition-colors border border-brand-blue/30"
                >
                  <RefreshCcw className="w-5 h-5" />
                  Try a What-If Replay
                </button>
                <button 
                  onClick={onRestart}
                  className="w-full py-4 px-6 rounded-xl bg-white text-brand-navy hover:bg-brand-paper hover:scale-[1.02] font-sans font-extrabold uppercase tracking-wide transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Start New Week
                </button>
             </div>
          </div>

        </div>
      </div>

      <WeeklyReflectionReport journal={reflectionJournal} />
      
      <BadgeCollection unlockedBadgeIds={unlockedBadgeIds} />
      
    </div>
  );
}
