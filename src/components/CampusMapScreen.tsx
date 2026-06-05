/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Lock, CheckCircle2 } from 'lucide-react';

interface CampusMapScreenProps {
  currentDayIndex: number;
  onEnterDay: () => void;
}

const locations = [
  { dayIndex: 0, day: 'Monday', name: 'Library Zone', theme: 'Study and preparation' },
  { dayIndex: 1, day: 'Tuesday', name: 'Canteen Lane', theme: 'Budget, food, and energy' },
  { dayIndex: 2, day: 'Wednesday', name: 'Group Room', theme: 'Teamwork and communication' },
  { dayIndex: 3, day: 'Thursday', name: 'Wellness Corner', theme: 'Stress and recovery' },
  { dayIndex: 4, day: 'Friday', name: 'Deadline Board', theme: 'Final decisions and results' },
];

export default function CampusMapScreen({ currentDayIndex, onEnterDay }: CampusMapScreenProps) {
  return (
    <div className="min-h-[100dvh] bg-brand-paper flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl mx-auto space-y-12">
        
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-sans font-extrabold text-brand-ink uppercase tracking-tight">
            Campus Map
          </h1>
          <p className="text-brand-navy/50 font-mono text-sm tracking-wide uppercase font-bold">
            Navigate the School Week
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-brand-navy/10 -translate-y-1/2 rounded-full" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {locations.map((loc) => {
              const isPast = currentDayIndex > loc.dayIndex;
              const isCurrent = currentDayIndex === loc.dayIndex;
              const isFuture = currentDayIndex < loc.dayIndex;

              return (
                <div 
                  key={loc.dayIndex} 
                  className={`relative p-5 rounded-2xl border transition-all duration-500 bg-white shadow-sm flex flex-col justify-between h-full min-h-[180px] ${
                    isCurrent ? 'border-brand-ink ring-2 ring-brand-ink ring-offset-2 scale-105 z-10' : 
                    isPast ? 'border-brand-green/30 opacity-75' : 
                    'border-brand-navy/10 opacity-50 grayscale'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isCurrent ? 'bg-brand-ink text-white' : 
                        isPast ? 'bg-brand-green/20 text-brand-green' : 
                        'bg-brand-navy/10 text-brand-navy/50'
                      }`}>
                        {loc.day}
                      </span>
                      {isPast && <CheckCircle2 className="w-5 h-5 text-brand-green" />}
                      {isFuture && <Lock className="w-4 h-4 text-brand-navy/30" />}
                      {isCurrent && <MapPin className="w-5 h-5 text-brand-blue animate-bounce" />}
                    </div>

                    <h3 className="font-sans font-bold text-lg text-brand-ink leading-tight">
                      {loc.name}
                    </h3>
                    <p className="text-xs text-brand-navy/60 font-sans">
                      {loc.theme}
                    </p>
                  </div>

                  {isCurrent && (
                    <button
                      onClick={onEnterDay}
                      className="mt-4 w-full py-2.5 rounded-xl bg-brand-ink text-white font-sans font-bold text-sm hover:bg-brand-navy transition-colors animate-pulse"
                    >
                      Start This Day
                    </button>
                  )}
                  {isPast && (
                    <div className="mt-4 text-center">
                      <span className="text-[10px] font-mono font-bold text-brand-green uppercase tracking-wider flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Done
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
