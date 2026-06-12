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
  RefreshCcw,
  BookOpen,
  Calendar,
  Compass,
  GraduationCap,
  Zap,
  Briefcase,
  Coffee,
  Crown
} from 'lucide-react';

const iconMap: { [key: string]: React.ComponentType<any> } = {
  GraduationCap,
  Zap,
  Briefcase,
  Coffee,
  Crown
};
import { FinalResult, Stats, Badge, Goal, ReflectionEntry } from '../types/simulation';
import StatDashboard from './StatDashboard';
import GoalStatusCard from './GoalStatusCard';
import WeeklyReflectionReport from './WeeklyReflectionReport';
import BadgeCollection from './BadgeCollection';
import PotentialFutures from './PotentialFutures';
import { playResultSound } from '../utils/audio';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-brand-paper p-3.5 border-2 border-brand-navy rounded-2xl shadow-lg font-sans text-xs space-y-1.5 text-left z-50">
        <p className="font-mono font-black text-brand-navy uppercase tracking-wider mb-1.5">{label} Vitals</p>
        {payload.map((pld: any) => (
          <div key={pld.name} className="flex items-center gap-2 font-bold">
            <span className="w-2.5 h-2.5 rounded-full border border-brand-navy/10" style={{ backgroundColor: pld.color }} />
            <span className="text-brand-navy/70 uppercase text-[10px] font-mono tracking-wider">{pld.name}:</span>
            <span className="text-brand-ink font-mono font-black">{pld.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

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
    playResultSound(soundEnabled);
  }, [soundEnabled, result.finalScore]);

  const chartData = (reflectionJournal || []).map((entry) => {
    const snapshot = entry.statsSnapshot || { energy: 50, stress: 50, grades: 50 };
    return {
      name: entry.day ? entry.day.substring(0, 3) : '',
      Energy: snapshot.energy,
      Stress: snapshot.stress,
      Grades: snapshot.grades
    };
  });

  return (
    <div className="py-12 px-4 max-w-5xl mx-auto space-y-12 pb-24 select-none bg-brand-cream notebook-grid min-h-screen">
      
      {/* Upper Corkboard Identity Section */}
      <div className="text-center space-y-4 pt-8 relative max-w-xl mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="inline-flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-brand-paper border-4 border-brand-ink/10 shadow-xl text-brand-blue mb-2 relative"
        >
          {/* Wooden desk pin at top */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-coral shadow" />
          {(() => {
            const IconComponent = iconMap[studentIcon] || GraduationCap;
            return <IconComponent className="w-12 h-12 sm:w-16 sm:h-16 relative z-10 text-brand-blue animate-pulse" />;
          })()}
        </motion.div>
        
        <h1 className="text-4xl sm:text-5xl font-sans font-black text-brand-ink uppercase tracking-tight leading-none text-balance">
          {result.title}
        </h1>
        
        <div className="inline-block px-3 py-1 bg-brand-blue/10 border border-brand-blue/25 text-brand-blue text-xs font-mono font-bold uppercase rounded-md tracking-wider">
          Student ID: {studentName} &bull; Term Finished
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Summary and Core Stats (The Report Card Notebook Sheet) */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="bg-brand-paper p-6 sm:p-8 rounded-3xl border border-brand-navy/12 shadow-md relative overflow-hidden">
             
             {/* Red margin Notebook line flowing vertically */}
             <div className="absolute left-6 top-0 bottom-0 w-[1.5px] bg-brand-coral/30" />

             {/* Red Ink Grade Evaluation Stamp (Signature Detail) */}
             <div className="absolute top-6 right-6 border-4 border-dashed border-brand-coral/80 text-brand-coral px-4 py-2 text-center rounded-xl rotate-[12deg] z-10 select-none bg-brand-paper/50">
               <span className="text-[9px] font-mono font-bold uppercase block tracking-widest text-brand-coral/70">GRADE EVALUATION</span>
               <span className="text-2xl font-mono font-black">{result.finalScore} / 100</span>
             </div>

             <div className="mt-8 space-y-6 pl-6 text-left">
               <div>
                  <h3 className="text-xs font-mono text-brand-navy/50 uppercase tracking-widest font-black flex items-center gap-1.5 pb-2 border-b border-brand-navy/8">
                    <BookOpen className="w-4 h-4 text-brand-blue" /> Term Performance Record
                  </h3>
                  <p className="text-base sm:text-lg font-sans text-brand-navy leading-relaxed font-semibold pt-3">
                    {result.description}
                  </p>
               </div>
               
               {/* Term Diagnostics Stats summary details */}
               <div className="pt-4 mt-4 border-t border-brand-navy/8 grid grid-cols-2 gap-4">
                  <div>
                     <span className="text-[10px] font-mono text-brand-navy/40 uppercase tracking-widest font-black block mb-1">Weekly Tendency:</span>
                     <span className="font-sans font-bold text-brand-ink text-xs sm:text-sm bg-brand-cream border border-brand-navy/10 px-2.5 py-1 rounded-lg inline-block uppercase">{result.riskPattern}</span>
                  </div>
                  <div>
                     <span className="text-[10px] font-mono text-brand-navy/40 uppercase tracking-widest font-black block mb-1">Peak Student Capability:</span>
                     <span className="font-mono font-extrabold text-brand-green text-xs sm:text-sm bg-brand-green/10 border border-brand-green/20 px-2.5 py-1 rounded-lg inline-block uppercase">{result.strongestStat}</span>
                  </div>
               </div>
             </div>
          </div>

          {/* Goal Objective Status Card */}
          <GoalStatusCard 
            goal={selectedGoal} 
            achieved={result.goalAchieved} 
            message={result.goalMessage} 
          />

          {/* Weekly Performance Line Chart */}
          <div className="bg-brand-paper rounded-3xl border border-brand-navy/12 p-6 shadow-md relative overflow-hidden">
            {/* Red notebook margin line */}
            <div className="absolute left-6 top-0 bottom-0 w-[1.5px] bg-brand-coral/30" />
            <div className="pl-6 text-left space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-brand-navy/8">
                <h3 className="text-xs font-mono text-brand-navy/50 uppercase tracking-widest font-black flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-blue" /> Weekly Performance Chart
                </h3>
                <span className="text-[10px] font-mono text-brand-blue font-bold uppercase tracking-wider">
                  Vitals Progression (Mon - Fri)
                </span>
              </div>

              {chartData.length === 0 ? (
                <p className="text-sm font-sans font-semibold text-brand-navy/60 py-8 text-center">
                  No stats logged during this week.
                </p>
              ) : (
                <div className="w-full h-64 sm:h-72 mt-4 font-mono text-[10px] sm:text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#1E2A44" strokeOpacity={0.08} />
                      <XAxis 
                        dataKey="name" 
                        stroke="#1E2A44" 
                        strokeOpacity={0.6}
                        tickLine={false}
                        axisLine={{ stroke: '#1E2A44', strokeOpacity: 0.15 }}
                        tick={{ fill: '#1E2A44', fontWeight: 'bold' }}
                      />
                      <YAxis 
                        domain={[0, 100]} 
                        stroke="#1E2A44" 
                        strokeOpacity={0.6}
                        tickLine={false}
                        axisLine={{ stroke: '#1E2A44', strokeOpacity: 0.15 }}
                        tick={{ fill: '#1E2A44', fontWeight: 'bold' }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ paddingTop: '15px', fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                      />
                      <Line 
                        name="Grades"
                        type="monotone" 
                        dataKey="Grades" 
                        stroke="#4FA66A" 
                        strokeWidth={3} 
                        dot={{ r: 4, strokeWidth: 1, fill: '#4FA66A' }} 
                        activeDot={{ r: 6 }} 
                      />
                      <Line 
                        name="Energy"
                        type="monotone" 
                        dataKey="Energy" 
                        stroke="#4F7BFF" 
                        strokeWidth={3} 
                        dot={{ r: 4, strokeWidth: 1, fill: '#4F7BFF' }} 
                        activeDot={{ r: 6 }} 
                      />
                      <Line 
                        name="Stress"
                        type="monotone" 
                        dataKey="Stress" 
                        stroke="#F26D5B" 
                        strokeWidth={3} 
                        dot={{ r: 4, strokeWidth: 1, fill: '#F26D5B' }} 
                        activeDot={{ r: 6 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>

          {/* Pinned Stats Dashboard sheet */}
          <div className="bg-brand-paper rounded-3xl border border-brand-navy/12 p-6 shadow-md relative">
             <div className="absolute left-6 top-0 bottom-0 w-[1.5px] bg-brand-coral/30" />
             <div className="pl-6 text-left">
               <h3 className="text-xs font-mono text-brand-navy/50 uppercase tracking-widest font-black mb-4 flex items-center gap-1.5 pb-2 border-b border-brand-navy/8">
                 <Compass className="w-4 h-4 text-brand-blue" /> Term End Vitals Summary
               </h3>
               <StatDashboard stats={finalStats} statChanges={null} />
             </div>
          </div>

        </div>

        {/* Right Column: Badges Collection Stickers & Advisor Action Slips */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Badge Stickers panel */}
          { badgesEarned.length > 0 && (
            <div className="bg-gradient-to-br from-brand-amber/12 to-brand-amber/5 p-6 sm:p-8 rounded-3xl border border-brand-amber/30 shadow-md relative overflow-hidden animate-pulse-slow">
              
              {/* Adhesive tape banner across sticker panel */}
              <div className="absolute -top-1.5 left-[30%] w-24 h-4 bg-brand-coral/10 border-x border-brand-coral/20 rotate-[1.5deg] z-10" />

              <div className="flex items-center gap-2 mb-4 text-brand-ink">
                <Sparkles className="w-5 h-5 text-brand-amber animate-spin-slow" />
                <h3 className="text-sm font-sans font-black uppercase tracking-wider block text-left">New Badges Stickers Unlocked</h3>
              </div>
              <div className="space-y-3">
                {badgesEarned.map(b => (
                  <div key={b.id} className="bg-brand-paper p-3.5 rounded-xl flex items-center gap-3 shadow-sm border border-brand-navy/10 relative overflow-hidden hover:scale-[1.01] transition-transform">
                    {/* Tiny adhesive look border */}
                    <div className="absolute inset-y-0 left-0 w-1 bg-brand-amber" />
                    <div className="bg-brand-amber/20 p-2.5 rounded-lg text-brand-amber border border-brand-amber/10 shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="font-black text-brand-ink block text-xs uppercase tracking-wide">{b.name}</span>
                      <span className="text-[10px] text-brand-navy/60 font-sans leading-tight block">{b.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Academic Advisors Card panel */}
          <div className="bg-brand-ink p-6 sm:p-8 rounded-3xl text-brand-paper border-2 border-brand-navy shadow-lg flex flex-col gap-6 relative">
             
             {/* Small notebook rule label */}
             <div className="absolute top-2.5 right-4 text-[9px] font-mono uppercase text-brand-paper/40 tracking-widest font-bold">Log #719-EP</div>

             <div className="text-left">
                <h3 className="font-mono text-brand-blue uppercase tracking-widest text-xs font-black mb-2 flex items-center gap-1">
                  <span>📌</span> Advisor Recommendations
                </h3>
                <p className="font-sans font-semibold text-brand-paper/85 leading-relaxed text-sm">
                  {result.suggestedNextGoal}
                </p>
             </div>

             <div className="space-y-3 pt-6 border-t border-brand-paper/15">
                {/* Replay option pass styled button */}
                <button 
                  onClick={onShowWhatIf}
                  className="w-full py-4 px-6 rounded-xl bg-brand-blue/15 hover:bg-brand-blue/35 text-brand-blue font-sans font-extrabold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all border border-brand-blue/30 cursor-pointer shadowHOVER"
                >
                  <RefreshCcw className="w-4 h-4 shrink-0" />
                  <span>Try a What-If Replay</span>
                </button>

                {/* Restart option pass styled button */}
                <button 
                  onClick={onRestart}
                  className="w-full py-4 px-6 rounded-xl bg-brand-paper hover:bg-brand-cream text-brand-ink font-sans font-black text-sm uppercase tracking-widest hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 shrink-0" />
                  <span>Restart New Week</span>
                </button>
             </div>
          </div>

        </div>
      </div>

      {/* Potential Futures Projection Analysis Section */}
      <PotentialFutures finalStats={finalStats} badgesEarned={badgesEarned} />

      {/* Reflection Journal Log entries */}
      <WeeklyReflectionReport journal={reflectionJournal} />
      
      {/* Badge Stickers grid album desk element */}
      <BadgeCollection unlockedBadgeIds={unlockedBadgeIds} />
      
    </div>
  );
}
