/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReflectionEntry } from '../types/simulation';
import { BookOpen, ArrowRight, Flame, Lock, AlertTriangle, Sparkles, Smile, ShieldAlert } from 'lucide-react';

interface ReflectionJournalScreenProps {
  entry: ReflectionEntry | null;
  onContinue: () => void;
  isFriday: boolean;
  reflectionJournal?: ReflectionEntry[];
}

const weekdays = [
  { key: 'Monday', label: 'Mon', index: 0 },
  { key: 'Tuesday', label: 'Tue', index: 1 },
  { key: 'Wednesday', label: 'Wed', index: 2 },
  { key: 'Thursday', label: 'Thu', index: 3 },
  { key: 'Friday', label: 'Fri', index: 4 }
];

export default function ReflectionJournalScreen({ entry, onContinue, isFriday, reflectionJournal = [] }: ReflectionJournalScreenProps) {
  if (!entry) return null;

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-brand-paper rounded-3xl shadow-2xl overflow-hidden border border-brand-navy/10 relative">
        
        {/* Header */}
        <div className="bg-brand-navy border-b border-brand-navy/10 p-6 sm:p-8 flex items-center gap-4 text-brand-paper">
          <BookOpen className="w-8 h-8 text-brand-salmon" />
          <div>
            <span className="text-brand-salmon/80 font-mono text-xs uppercase tracking-widest font-bold">Reflection Journal</span>
            <h2 className="text-2xl font-sans font-extrabold">{entry.day} completed</h2>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-mono text-brand-navy/50 uppercase tracking-widest font-bold mb-2">Scenario</h3>
              <p className="text-lg font-sans font-bold text-brand-ink">{entry.scenarioTitle}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-mono text-brand-navy/50 uppercase tracking-widest font-bold mb-2">Your Decision</h3>
              <div className="bg-brand-paper p-4 rounded-xl border border-brand-navy/10 relative">
                <p className="font-sans text-brand-ink font-medium">"{entry.chosenChoiceTitle}"</p>
                <div className="mt-3 pt-3 border-t border-brand-navy/10">
                  <p className="text-sm text-brand-navy/70">{entry.feedback}</p>
                </div>
              </div>
            </div>

            {entry.randomEventTitle && (
              <div>
                <h3 className="text-sm font-mono text-brand-coral uppercase tracking-widest font-bold mb-2">Random Campus Event</h3>
                <div className="bg-brand-coral/5 p-4 rounded-xl border border-brand-coral/20">
                  <p className="font-sans font-bold text-brand-ink">{entry.randomEventTitle}</p>
                  <p className="text-sm text-brand-navy/70 mt-1">{entry.randomEventMessage}</p>
                </div>
              </div>
            )}

            {/* Heatmap visualization section */}
            <div className="pt-6 border-t border-brand-navy/10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-mono text-brand-navy/50 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-brand-coral animate-pulse" />
                  Weekly Stress Heatmap
                </h3>
                <span className="text-[10px] font-mono font-bold text-brand-blue uppercase bg-brand-blue/10 px-2 py-0.5 rounded">
                  Mental Vitals
                </span>
              </div>
              
              <p className="text-xs text-brand-navy/60 mb-4 leading-relaxed">
                Monitor your stress levels and check peak pressure zones. Hover over completed days to recall past decisions.
              </p>

              {/* Grid of Days */}
              <div className="grid grid-cols-5 gap-2 md:gap-3">
                {weekdays.map((dayDef) => {
                  // Find journaling entry corresponding to weekday row
                  const journalEntry = reflectionJournal.find(
                    (j) => j.day.toLowerCase() === dayDef.key.toLowerCase()
                  );
                  const isCurrentDay = entry.day.toLowerCase() === dayDef.key.toLowerCase();
                  
                  // Use recorded stress or default
                  const stressLevel = journalEntry?.endStressLevel !== undefined 
                    ? journalEntry.endStressLevel 
                    : (isCurrentDay && entry.endStressLevel !== undefined ? entry.endStressLevel : null);

                  const change = journalEntry?.totalStatChanges?.stress || (isCurrentDay ? entry.totalStatChanges?.stress : 0);

                  let colorClass = "";
                  let hoverEffect = "";
                  let statusLabel = "N/A";
                  let ratingIcon = null;

                  if (stressLevel !== null) {
                    if (stressLevel <= 30) {
                      colorClass = "bg-brand-green/10 text-brand-green border-brand-green/35 text-center";
                      statusLabel = "Chill";
                      ratingIcon = <Smile className="w-4 h-4 inline" />;
                    } else if (stressLevel <= 60) {
                      colorClass = "bg-brand-amber/15 text-brand-amber border-brand-amber/35 text-center";
                      statusLabel = "Stable";
                      ratingIcon = <Sparkles className="w-4 h-4 inline" />;
                    } else if (stressLevel <= 80) {
                      colorClass = "bg-brand-coral/15 text-brand-coral border-brand-coral/40 text-center";
                      statusLabel = "High";
                      ratingIcon = <AlertTriangle className="w-4 h-4 inline" />;
                    } else {
                      colorClass = "bg-red-500/10 text-red-600 border-red-500/30 text-center shadow-[0_0_12px_rgba(239,68,68,0.08)_inset]";
                      statusLabel = "Critical";
                      ratingIcon = <ShieldAlert className="w-4 h-4 inline" />;
                    }
                    hoverEffect = "hover:scale-105 transition-transform duration-200 cursor-pointer relative group";
                  } else {
                    colorClass = "bg-brand-cream/40 border-dashed border border-brand-navy/15 text-brand-navy/30 flex flex-col items-center justify-center text-center";
                    statusLabel = "Locked";
                  }

                  return (
                    <div
                      key={dayDef.key}
                      className={`relative p-2 sm:p-3 rounded-2xl border flex flex-col justify-between items-center min-h-[96px] sm:min-h-[110px] ${colorClass} ${hoverEffect}`}
                    >
                      {/* Active Sticky Tape for current day */}
                      {isCurrentDay && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#FFEAE5] border-x border-[#F26D5B]/35 rotate-[-3deg] uppercase font-mono text-[7px] tracking-widest text-[#F26D5B] font-black flex items-center justify-center pointer-events-none z-10 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                          Today
                        </div>
                      )}

                      <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-tight opacity-75">
                        {dayDef.label}
                      </span>

                      {stressLevel !== null ? (
                        <>
                          <div className="my-1 text-center">
                            <span className="text-xl sm:text-2xl font-sans font-black tracking-tight leading-none block">
                              {stressLevel}
                            </span>
                            <span className="text-[8px] sm:text-[9px] font-mono tracking-wider uppercase font-extrabold opacity-60 block">
                              {statusLabel}
                            </span>
                          </div>

                          {/* Stat change indicator */}
                          <div className="text-[9px] font-mono leading-none flex items-center gap-0.5 justify-center py-0.5 px-1.5 rounded-full bg-brand-paper/70 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                            {change !== undefined && change !== 0 ? (
                              <span className={change > 0 ? "text-brand-coral font-bold" : "text-brand-green font-bold"}>
                                {change > 0 ? `+${change}` : change}
                              </span>
                            ) : (
                              <span className="opacity-50 text-[8px] uppercase">Stable</span>
                            )}
                          </div>
                          
                          {/* Rich hover tooltip displaying exactly what option was chosen and short details */}
                          <div className="absolute bottom-[105%] left-1/2 -translate-x-1/2 bg-brand-ink text-brand-paper text-[11px] p-3 rounded-xl shadow-xl w-52 sm:w-60 hidden group-hover:block z-30 pointer-events-none border border-brand-paper/10 text-left font-sans leading-relaxed">
                            <div className="font-bold text-brand-salmon border-b border-brand-paper/15 pb-1 mb-1 font-mono uppercase text-[9px] tracking-wider flex items-center justify-between">
                              <span>{dayDef.key} Action</span>
                              <span className="font-normal opacity-80 text-[8px] lowercase">Stress Index: {stressLevel}</span>
                            </div>
                            <p className="font-medium">
                              "{journalEntry?.chosenChoiceTitle || entry.chosenChoiceTitle}"
                            </p>
                            <div className="text-[10px] uppercase font-mono tracking-widest font-black mt-2 text-brand-blue flex items-center gap-1.5">
                              {ratingIcon} Rating: {statusLabel}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-1 my-2 text-brand-navy/30">
                          <Lock className="w-4 h-4" />
                          <span className="text-[8px] font-mono uppercase tracking-widest font-bold">
                            Locked
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Color Spectrum legend indicator */}
              <div className="mt-3.5 grid grid-cols-4 gap-1 text-[8px] sm:text-[9px] font-mono uppercase font-bold text-brand-navy/40 px-1 border-t border-brand-navy/5 pt-3">
                <span className="flex items-center gap-1 justify-center sm:justify-start">
                  <span className="w-2 h-2 rounded-full bg-brand-green/20 border border-brand-green/45 inline-block" />
                  Low (0-30)
                </span>
                <span className="flex items-center gap-1 justify-center sm:justify-start">
                  <span className="w-2 h-2 rounded-full bg-brand-amber/20 border border-brand-amber/45 inline-block" />
                  Stable (31-60)
                </span>
                <span className="flex items-center gap-1 justify-center sm:justify-start">
                  <span className="w-2 h-2 rounded-full bg-brand-coral/20 border border-brand-coral/45 inline-block" />
                  High (61-80)
                </span>
                <span className="flex items-center gap-1 justify-center sm:justify-start">
                  <span className="w-2 h-2 rounded-full bg-red-500/20 border border-red-500/40 inline-block" />
                  Critical (81+)
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-navy/10">
              <h3 className="text-sm font-mono text-brand-navy/50 uppercase tracking-widest font-bold mb-3">Daily Reflection</h3>
              <p className="text-xl font-sans text-brand-ink italic mb-4 leading-relaxed">
                "{entry.reflectionText}"
              </p>
              <div className="bg-brand-ink text-brand-paper p-4 rounded-xl flex items-start gap-3">
                <span className="shrink-0 text-xl">💡</span>
                <p className="font-sans font-medium text-sm leading-relaxed">{entry.lessonText}</p>
              </div>
            </div>
          </div>

          <button
            onClick={onContinue}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-brand-blue text-white font-sans font-bold text-lg hover:bg-brand-blue/90 transition-all shadow-md hover:shadow-lg"
          >
            {isFriday ? 'View Final Student Profile' : 'Return to Campus Map'}
            <ArrowRight className="w-5 h-5" />
          </button>

        </div>
      </div>
    </div>
  );
}
