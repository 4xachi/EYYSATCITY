/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Lock, CheckCircle2, Navigation } from 'lucide-react';

interface CampusMapScreenProps {
  currentDayIndex: number;
  onEnterDay: () => void;
}

const locations = [
  { dayIndex: 0, day: 'Monday', name: 'Library Zone', theme: 'Pop Quiz preparation and studying.', icon: '📚' },
  { dayIndex: 1, day: 'Tuesday', name: 'Canteen Lane', theme: 'Manage daily allowance & food budget.', icon: '🍱' },
  { dayIndex: 2, day: 'Wednesday', name: 'Group Room', theme: 'Teamwork dynamics & collective peer pressure.', icon: '👥' },
  { dayIndex: 3, day: 'Thursday', name: 'Wellness Corner', theme: 'Unwind from burnout and restore energy.', icon: '🧘' },
  { dayIndex: 4, day: 'Friday', name: 'Deadline Board', theme: 'Evaluation of week and final student profile card.', icon: '🎯' },
];

export default function CampusMapScreen({ currentDayIndex, onEnterDay }: CampusMapScreenProps) {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F7F3EA] notebook-grid flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 select-none">
      <div className="w-full max-w-6xl mx-auto space-y-10 bg-[#FFFDF7] p-6 sm:p-8 rounded-3xl border border-brand-navy/12 shadow-lg relative overflow-hidden">
        
        {/* Notebook margin red rule on left */}
        <div className="absolute left-6 top-0 bottom-0 w-[1.5px] bg-brand-coral/30" />

        {/* Board Header as a pinned memo strip */}
        <div className="text-center space-y-3 relative pl-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/10 border border-brand-blue/25 text-brand-blue rounded-full text-xs font-mono font-bold uppercase">
            <Navigation className="w-3.5 h-3.5 text-brand-blue animate-pulse" />
            <span>Interactive Campus Board</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-sans font-black text-brand-ink uppercase tracking-tight leading-none">
            Weekly Map & Map Locations
          </h1>
          
          <p className="text-brand-navy/60 font-sans text-xs sm:text-sm max-w-xl mx-auto font-medium">
            Enter the unlocked room corresponding to today's schedule to play. Complete choices to progress toward your student profile.
          </p>
        </div>

        {/* Tactile Bulletin Board Wrapper */}
        <div className="relative pl-6">
          
          {/* Thread connector line representing pins map (Desk String) */}
          <div className="hidden lg:block absolute top-[45%] left-8 right-8 h-[2px] border-t-2 border-dashed border-brand-navy/15 z-0" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {locations.map((loc) => {
              const isPast = currentDayIndex > loc.dayIndex;
              const isCurrent = currentDayIndex === loc.dayIndex;
              const isFuture = currentDayIndex < loc.dayIndex;

              return (
                <div 
                  key={loc.dayIndex} 
                  className={`relative p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full min-h-[220px] group ${
                    isCurrent 
                      ? 'bg-[#FFFFFE] border-brand-ink shadow-xl scale-[1.03] z-20 ring-1 ring-brand-ink/40' 
                      : isPast 
                      ? 'bg-brand-paper/90 border-brand-green/30 opacity-80' 
                      : 'bg-brand-paper border-brand-navy/10 opacity-60 grayscale'
                  }`}
                >
                  {/* Push-Pin detail (Visual tactile anchor) */}
                  <div className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-4.5 h-4.5 rounded-full shadow-md border border-white/60 z-30 transition-colors ${
                    isCurrent ? 'bg-brand-coral animate-bounce' : isPast ? 'bg-brand-green' : 'bg-brand-navy/40'
                  }`}>
                    {/* Metal pin needle shine feedback */}
                    <div className="absolute top-0.5 left-1 w-1.5 h-1.5 bg-white/70 rounded-full" />
                  </div>

                  {/* Adhesive tape piece on top if it is the current target */}
                  {isCurrent && (
                    <div className="absolute -top-2.5 right-4 w-12 h-5 bg-brand-blue/15 border-x border-[#4F7BFF]/30 rotate-[12deg] z-20 pointer-events-none" />
                  )}

                  <div className="space-y-3 pt-2 text-left">
                    <div className="flex justify-between items-center">
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isCurrent 
                          ? 'bg-brand-ink text-white' 
                          : isPast 
                          ? 'bg-brand-green/10 text-brand-green' 
                          : 'bg-brand-navy/5 text-brand-navy/50'
                      }`}>
                        {loc.day}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xl sm:text-2xl block">{loc.icon}</span>
                      <h3 className="font-sans font-black text-base text-brand-ink leading-tight group-hover:text-brand-blue transition-colors">
                        {loc.name}
                      </h3>
                      <p className="text-xs text-brand-navy/60 font-sans leading-tight font-semibold">
                        {loc.theme}
                      </p>
                    </div>
                  </div>

                  {/* Operational Controls based on states (Stamping completions) */}
                  <div className="pt-4 mt-auto border-t border-brand-navy/6">
                    {isCurrent ? (
                      <button
                        onClick={onEnterDay}
                        className="w-full py-2 px-3 rounded-xl bg-brand-blue hover:bg-brand-blue/95 text-white font-sans font-extrabold text-xs uppercase tracking-widest hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer shadow focus:outline-none"
                      >
                        Enter Zone
                      </button>
                    ) : isPast ? (
                      <div className="text-center">
                        <span className="border border-dashed border-brand-green/60 text-brand-green px-2 py-0.5 text-[9px] font-mono font-extrabold rounded-md uppercase tracking-wider block rotate-[4deg] w-fit mx-auto bg-brand-green/5">
                          ✓ COMPLETED
                        </span>
                      </div>
                    ) : (
                      <div className="text-center flex items-center justify-center gap-1 text-[10px] font-mono text-brand-navy/40 font-bold uppercase">
                        <Lock className="w-3.5 h-3.5" />
                        <span>LOCKED</span>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
