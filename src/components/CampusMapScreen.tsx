/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Lock, CheckCircle2, Navigation, ArrowLeft, Compass, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Scenario } from '../types/simulation';
import {
  mondayScenarios,
  tuesdayScenarios,
  wednesdayScenarios,
  thursdayScenarios,
  fridayScenarios
} from '../data/scenarios';
import { playClickSound } from '../utils/audio';

interface CampusMapScreenProps {
  currentDayIndex: number;
  onEnterDay: () => void;
  onSelectScenario: (scenario: Scenario) => void;
  soundEnabled: boolean;
}

const daysInfo = [
  { dayIndex: 0, day: 'Monday', title: 'Day 1: Academic Setup', theme: 'Start the week with academic reviews or unexpected events.', icon: '📅' },
  { dayIndex: 1, day: 'Tuesday', title: 'Day 2: Social & Finances', theme: 'Manage daily allowances, club recruitment, or shopping traps.', icon: '💸' },
  { dayIndex: 2, day: 'Wednesday', title: 'Day 3: Collaboration', theme: 'Confront team contentions, speech panics, or assignment pileups.', icon: '👥' },
  { dayIndex: 3, day: 'Thursday', title: 'Day 4: Burnout Control', theme: 'Tackle extreme exhaustion, misplaced passes, or job offers.', icon: '🧘' },
  { dayIndex: 4, day: 'Friday', title: 'Day 5: Finals & Outcomes', theme: 'Conclude the school week with grades, job interviews, or final challenges.', icon: '🎯' },
];

const dailyScenariosList = [
  mondayScenarios,
  tuesdayScenarios,
  wednesdayScenarios,
  thursdayScenarios,
  fridayScenarios
];

function getLocationMetadata(locationName: string) {
  const norm = locationName.toUpperCase();
  if (norm.includes('F BUILDING')) return { icon: '🏢', theme: 'Main Lecture Hall and Classroom areas.', highlight: 'Academic Focus' };
  if (norm.includes('STUDY LOUNGE')) return { icon: '🛋️', theme: 'Dormitory environment and cozy study nooks.', highlight: 'Dorm Life & Keys' };
  if (norm.includes('COMPUTER LAB')) return { icon: '💻', theme: 'Technology lab with high-end workstations.', highlight: 'Hardware Crisis' };
  
  if (norm.includes('C BUILDING')) return { icon: '🍱', theme: 'Modern student cafeteria and snack bars.', highlight: 'Food & Allowance' };
  if (norm.includes('CAMPUS PLAZA')) return { icon: '🏟️', theme: 'Open courtyard where student club trials take place.', highlight: 'Organization Recruit' };
  if (norm.includes('RETAIL CENTER')) return { icon: '🛍️', theme: 'Campus bookstore, merchandise, and accessory shop.', highlight: 'Flash Sale Temptation' };
  
  if (norm.includes('E BUILDING')) return { icon: '👥', theme: 'Discussion room for team project collaborations.', highlight: 'Group Project Conflict' };
  if (norm.includes('CONFERENCE ROOM')) return { icon: '🎤', theme: 'Formal seminar halls for administrative presentations.', highlight: 'Speech Anxiety' };
  if (norm.includes('COLLEGE LIBRARY') || norm.includes('LIBRARY')) return { icon: '📚', theme: 'General archives and quiet learning study desks.', highlight: 'Assignments Overload' };
  
  if (norm.includes('V BUILDING')) return { icon: '🧘', theme: 'Wellness park green space for mental re-energizing.', highlight: 'Burnout Defense' };
  if (norm.includes('INFRASTRUCTURE GATE')) return { icon: '🚧', theme: 'Main secure checking gates of the university campus.', highlight: 'Security Clearance' };
  if (norm.includes('OFF-CAMPUS CAFE')) return { icon: '☕', theme: 'Local cozy coffee house offering relief shift cash payments.', highlight: 'Side-Job Offers' };
  
  if (norm.includes('AMPHI THEATRE')) return { icon: '🎭', theme: 'Historical graduation theater and final halls.', highlight: 'Weekly Capstone' };
  if (norm.includes('INNOVATION HUB')) return { icon: '🚀', highlight: 'Future Career', theme: 'Incubation center for corporate interviews and job scoutings.' };
  if (norm.includes('EXAMINATION COURT')) return { icon: '✍️', highlight: 'Borderline Grades', theme: 'The final academic testing center of the campus.' };

  return { icon: '📍', theme: 'Explore this campus workspace with its unique challenges.', highlight: 'Campus Exploration' };
}

export default function CampusMapScreen({
  currentDayIndex,
  onEnterDay,
  onSelectScenario,
  soundEnabled
}: CampusMapScreenProps) {
  const [viewMode, setViewMode] = useState<'map' | 'choose'>('map');
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);

  const activeScenariosPool = dailyScenariosList[currentDayIndex] || [];
  const activeDayName = daysInfo[currentDayIndex]?.day || 'Today';

  const handleEnterZone = () => {
    setSelectedScenarioIndex(0);
    setViewMode('choose');
  };

  const handleSelectScenarioAndGo = (scenario: Scenario) => {
    onSelectScenario(scenario);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-brand-cream notebook-grid flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 select-none">
      <div className="w-full max-w-6xl mx-auto bg-brand-paper p-6 sm:p-8 rounded-3xl border border-brand-navy/12 shadow-lg relative overflow-hidden">
        
        {/* Notebook margin red rule on left */}
        <div className="absolute left-6 top-0 bottom-0 w-[1.5px] bg-brand-coral/30" />

        <AnimatePresence mode="wait">
          {viewMode === 'map' ? (
            <motion.div
              key="map-view"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.25 }}
              className="space-y-10"
            >
              {/* Board Header as a pinned memo strip */}
              <div className="text-center space-y-3 relative pl-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/10 border border-brand-blue/25 text-brand-blue rounded-full text-xs font-mono font-bold uppercase">
                  <Navigation className="w-3.5 h-3.5 text-brand-blue animate-pulse" />
                  <span>Interactive Campus Board</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-sans font-black text-brand-ink uppercase tracking-tight leading-none">
                  Weekly Map & Day Zones
                </h1>
                
                <p className="text-brand-navy/60 font-sans text-xs sm:text-sm max-w-xl mx-auto font-medium">
                  Enter the unlocked Day Zone to chart your custom route. Choose from different campus workspaces each day to fit your playstyle.
                </p>
              </div>

              {/* Tactile Bulletin Board Wrapper */}
              <div className="relative pl-6">
                {/* Thread connector line representing pins map (Desk String) */}
                <div className="hidden lg:block absolute top-[45%] left-8 right-8 h-[2px] border-t-2 border-dashed border-brand-navy/15 z-0" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
                  {daysInfo.map((loc) => {
                    const isPast = currentDayIndex > loc.dayIndex;
                    const isCurrent = currentDayIndex === loc.dayIndex;
                    const isFuture = currentDayIndex < loc.dayIndex;

                    return (
                      <div 
                        key={loc.dayIndex} 
                        className={`relative p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full min-h-[220px] group ${
                          isCurrent 
                            ? 'bg-brand-paper border-brand-ink shadow-xl scale-[1.03] z-20 ring-1 ring-brand-ink/40' 
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

                        <div className="space-y-3 pt-2 text-left animate-fade-in">
                          <div className="flex justify-between items-center">
                            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              isCurrent 
                                ? 'bg-brand-ink text-brand-paper' 
                                : isPast 
                                ? 'bg-brand-green/10 text-brand-green' 
                                : 'bg-brand-navy/20 text-brand-navy/50'
                            }`}>
                              {loc.day}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-xl sm:text-2xl block">{loc.icon}</span>
                            <h3 className="font-sans font-black text-sm text-brand-ink leading-tight group-hover:text-brand-blue transition-colors">
                              {loc.title}
                            </h3>
                            <p className="text-xs text-brand-navy/60 font-sans leading-tight font-semibold mt-1">
                              {loc.theme}
                            </p>
                          </div>
                        </div>

                        {/* Operational Controls based on states (Stamping completions) */}
                        <div className="pt-4 mt-auto border-t border-brand-navy/6">
                          {isCurrent ? (
                            <button
                              onClick={() => { playClickSound(soundEnabled); handleEnterZone(); }}
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
            </motion.div>
          ) : (
            <motion.div
              key="location-choose-view"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Back button header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-brand-navy/8 text-left pl-6">
                <button
                  onClick={() => { playClickSound(soundEnabled); setViewMode('map'); }}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-brand-navy/12 text-brand-navy/80 hover:text-brand-navy font-semibold hover:bg-brand-navy/5 text-xs font-mono uppercase tracking-wider transition-colors max-w-fit cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Calendar
                </button>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 font-mono text-[10px] font-black bg-brand-coral/10 border border-brand-coral/30 text-brand-coral uppercase rounded-md">
                    {activeDayName} schedule chooser
                  </span>
                </div>
              </div>

              {/* Day selection prompt header details */}
              <div className="text-left space-y-2 pl-6">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-ink uppercase tracking-tight flex items-center gap-2">
                  <Compass className="w-7 h-7 text-brand-blue animate-spin-[20s]" />
                  <span>Choose Your Destination</span>
                </h2>
                <p className="text-brand-navy/60 font-sans text-xs sm:text-sm font-semibold max-w-2xl">
                  Each location has a unique event and scenario pool on this {activeDayName}. Check their descriptions below and pick where you wish to invest your day's efforts!
                </p>
              </div>

              {/* Dynamic 3-Way Grid Selector */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative pl-6 z-10">
                {activeScenariosPool.map((scenario, index) => {
                  const meta = getLocationMetadata(scenario.location);
                  const isSelected = selectedScenarioIndex === index;

                  return (
                    <div
                      key={scenario.location + index}
                      onClick={() => { playClickSound(soundEnabled); setSelectedScenarioIndex(index); }}
                      className={`relative p-6 rounded-3xl border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[280px] group ${
                        isSelected
                          ? 'bg-brand-paper border-brand-blue ring-2 ring-brand-blue/30 shadow-xl scale-[1.02]'
                          : 'bg-brand-paper/70 border-brand-navy/12 hover:border-brand-navy/25 hover:bg-brand-cream/50 shadow-sm'
                      }`}
                    >
                      {/* Highlighted sticker or pointer pin */}
                      {isSelected && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-brand-blue text-white rounded-full font-mono font-black text-[9px] uppercase tracking-widest shadow-md flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 animate-bounce" /> Current Route
                        </div>
                      )}

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-3xl filter drop-shadow-sm">{meta.icon}</span>
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isSelected ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20' : 'bg-brand-navy/5 text-brand-navy/60'
                          }`}>
                            {meta.highlight}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-sans font-black text-lg text-brand-ink leading-tight group-hover:text-brand-blue transition-colors">
                            {scenario.location}
                          </h3>
                          <p className="text-[11px] font-mono text-brand-navy/50 font-bold uppercase tracking-wider">
                            Topic: {scenario.title}
                          </p>
                          <p className="text-xs text-brand-navy/70 leading-relaxed font-semibold">
                            {meta.theme}
                          </p>
                        </div>
                      </div>

                      {/* Scenario preview peek inside box */}
                      <div className={`mt-4 pt-4 border-t border-dashed rounded-xl p-3 text-left transition-colors ${
                        isSelected 
                          ? 'border-brand-blue/30 bg-brand-blue/5' 
                          : 'border-brand-navy/10 bg-brand-navy/3'
                      }`}>
                        <div className="flex gap-1.5 items-start">
                          <AlertCircle className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${isSelected ? 'text-brand-blue' : 'text-brand-navy/50'}`} />
                          <p className="text-[11px] font-sans font-medium text-brand-navy/85 leading-snug line-clamp-3">
                            <span className="italic">" {scenario.description} "</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Play buttons confirmation */}
              <div className="pt-6 border-t border-brand-navy/8 flex justify-end pl-6">
                <button
                  onClick={() => {
                    playClickSound(soundEnabled);
                    const chosen = activeScenariosPool[selectedScenarioIndex];
                    if (chosen) {
                      handleSelectScenarioAndGo(chosen);
                    }
                  }}
                  className="px-8 py-3 rounded-2xl bg-brand-blue hover:bg-brand-blue/95 text-white font-sans font-black text-sm uppercase tracking-widest hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer shadow-md inline-flex items-center gap-2 focus:outline-none"
                >
                  <span>Travel To {activeScenariosPool[selectedScenarioIndex]?.location || 'Zone'}</span>
                  <Compass className="w-4 h-4 animate-spin-[10s]" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
