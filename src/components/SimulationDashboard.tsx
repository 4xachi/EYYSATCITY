/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Info, GraduationCap, Zap, Briefcase, Coffee, Crown, BookOpen } from 'lucide-react';
import { Scenario, Stats, Choice, StudentType, DecisionMemory } from '../types/simulation';
import ProgressTracker from './ProgressTracker';
import StatDashboard from './StatDashboard';
import ChoiceCard from './ChoiceCard';
import ConsequencePanel from './ConsequencePanel';
import BrainBoosterQuiz from './BrainBoosterQuiz';
import ChoiceMemoryCard from './ChoiceMemoryCard';

import StudentShopInventory from './StudentShopInventory';

interface SimulationDashboardProps {
  currentScenario: Scenario;
  stats: Stats;
  statChanges: Partial<Stats> | null;
  hasChosenToday: boolean;
  selectedChoice: Choice | null;
  onSelectChoice: (choice: Choice) => void;
  onNextDay: () => void;
  selectedStudentType: StudentType | null;
  soundEnabled: boolean;
  onApplyStatBonus: (bonus: Partial<Stats>) => void;
  inventory: string[];
  onBuyItem: (itemId: string, cost: number) => void;
  onUseItem: (itemId: string, effects: Partial<Stats>) => void;
  decisionMemory?: DecisionMemory;
}

const archetypeIcons: { [key: string]: any } = {
  scholar: GraduationCap,
  crammer: Zap,
  hustler: Briefcase,
  chill: Coffee,
  leader: Crown,
};

// Map original raw locations to requested theme regions dynamically
function mapVisualLocation(loc: string): { name: string; detail: string } {
  const normalized = loc.toLowerCase();
  if (normalized.includes('build') || normalized.includes('lounge') || normalized.includes('lab') || normalized.includes('study') || normalized.includes('lecture') || normalized.includes('class')) {
    return { name: 'Study District', detail: 'desk / library' };
  } else if (normalized.includes('cafeteria') || normalized.includes('canteen') || normalized.includes('cafe') || normalized.includes('budget') || normalized.includes('receipt') || normalized.includes('alley') || normalized.includes('mall') || normalized.includes('store') || normalized.includes('lunch')) {
    return { name: 'Budget Alley', detail: 'allowance tracker / canteen' };
  } else if (normalized.includes('hub') || normalized.includes('dorm') || normalized.includes('social') || normalized.includes('quad') || normalized.includes('club') || normalized.includes('friend') || normalized.includes('chat') || normalized.includes('pub') || normalized.includes('party')) {
    return { name: 'Social Hub', detail: 'group project board / chat' };
  } else if (normalized.includes('mind') || normalized.includes('zone') || normalized.includes('wellness') || normalized.includes('sleep') || normalized.includes('calm') || normalized.includes('corner') || normalized.includes('gym') || normalized.includes('park') || normalized.includes('garden')) {
    return { name: 'MindZone', detail: 'wellness journal / calm reading' };
  } else {
    return { name: 'Deadline Tower', detail: 'calendar deadline pressure' };
  }
}

export default function SimulationDashboard({
  currentScenario,
  stats,
  statChanges,
  hasChosenToday,
  selectedChoice,
  onSelectChoice,
  onNextDay,
  selectedStudentType,
  soundEnabled,
  onApplyStatBonus,
  inventory,
  onBuyItem,
  onUseItem,
  decisionMemory
}: SimulationDashboardProps) {

  const StudentIcon = selectedStudentType ? (archetypeIcons[selectedStudentType.id] || GraduationCap) : GraduationCap;
  const mappedLocation = mapVisualLocation(currentScenario.location);
  const isCriticalStress = stats.stress >= 75;

  return (
    <div className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 z-10 w-full select-none space-y-6 relative">
      {/* Absolute floating ambient red warning halo vignette when student stress exceeds 75 */}
      {isCriticalStress && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="fixed inset-0 pointer-events-none z-50 border-[12px] border-brand-coral/15 rounded-[32px] blur-sm m-2 shadow-[inset_0_0_80px_rgba(242,109,91,0.15)]"
        />
      )}
      
      {/* Prominent Weekly Progress Calendar strip top-level planner bar */}
      <ProgressTracker currentDayIndex={currentScenario.dayIndex} />

      {/* Simulation Grid System */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        
        {/* LEFT COLUMN: Scenario Description, Option Buttons & Consequences (7/12 cols) */}
        <div className="lg:col-span-7 space-y-6 w-full relative">
          
          {/* Day & Location Banner with interactive pressure warning */}
          <div className={`relative rounded-2xl border bg-brand-paper p-6 overflow-visible flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-[0_4px_12px_rgba(30,42,68,0.03)] transition-all duration-500 ${
            isCriticalStress 
              ? 'border-brand-coral/45 shadow-[0_0_15px_rgba(242,109,91,0.1)] bg-[#FFFBFA]' 
              : 'border-brand-navy/15'
          }`}>
            {/* Soft adhesive tape graphic anchor detail */}
            <div className="absolute -top-2.5 left-12 w-16 h-5 bg-[#FFF2DE] border-x-2 border-[#F5B84B]/35 rotate-[-2deg] z-20 shadow-[0_1px_3px_rgba(0,0,0,0.04)] pointer-events-none" />
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-[0.15em] text-brand-blue uppercase">
                  CALENDAR WORKLOAD TIMELINE
                </span>
                {isCriticalStress && (
                  <motion.span 
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-brand-coral/10 border border-brand-coral/30 text-brand-coral font-mono text-[8px] font-black uppercase tracking-wider"
                  >
                    ⚠️ High Stress
                  </motion.span>
                )}
              </div>
              <h2 className="text-3xl font-serif font-black text-brand-ink tracking-tight flex items-center gap-2">
                <span>{currentScenario.dayName}</span>
                <span className="text-xs font-mono font-bold bg-brand-cream text-brand-navy/60 px-2 py-0.5 rounded-md uppercase tracking-wider">Day {currentScenario.dayIndex + 1} of 5</span>
              </h2>
            </div>

            <div className="flex flex-col gap-0.5 px-4 py-2 rounded-xl bg-brand-cream border border-brand-navy/10 w-fit">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-coral shrink-0" />
                <span className="text-[10px] font-mono font-bold text-brand-navy/55 uppercase tracking-wider">
                  LOCATION CATEGORY
                </span>
              </div>
              <div className="text-xs font-sans font-bold text-brand-ink block mt-0.5">
                {mappedLocation.name} <span className="font-medium text-[9px] text-[#4F7BFF]/95">({mappedLocation.detail})</span>
              </div>
            </div>
          </div>

          {/* Scenario Graphic Card as a beautiful handwritten study journal notebook sheet */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-3xl border p-6 sm:p-8 space-y-4 shadow-[0_6px_18px_rgba(30,42,68,0.02)] relative overflow-hidden transition-all duration-500 ${
              isCriticalStress 
                ? 'border-brand-coral/40 bg-gradient-to-br from-brand-paper to-[#FFFDFD] shadow-[0_8px_24px_rgba(242,109,91,0.04)]' 
                : 'border-brand-navy/15 bg-brand-paper'
            }`}
          >
            {/* Red notebook margin line on this specific visual card */}
            <div className={`absolute top-0 bottom-0 w-[1.5px] transition-all duration-500 ${
              isCriticalStress ? 'left-5 bg-brand-coral' : 'left-5 bg-brand-coral/30'
            }`} />
            
            <div className="space-y-3 pl-6">
              <div className="flex items-center gap-1.5 text-xs text-brand-blue font-mono tracking-widest uppercase font-bold">
                <BookOpen className="w-4 h-4 text-brand-blue" /> STUDY LIFE DILEMMA
              </div>

              <div className="space-y-3 text-left">
                <h3 className="text-2xl sm:text-3xl font-sans font-black text-brand-ink tracking-tight leading-snug">
                  {currentScenario.title}
                </h3>
                <p className="text-brand-navy/85 leading-relaxed font-sans text-sm sm:text-base font-medium">
                  {currentScenario.description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Decision Choice Buttons Selection Map */}
          <div className="space-y-3.5">
            <h4 className="text-[10px] font-mono uppercase text-brand-navy/50 tracking-wider font-bold">CHOOSE YOUR STUDY STRATEGY</h4>
            <div className="grid grid-cols-1 gap-3.5">
              {currentScenario.choices.map((choice) => (
                <ChoiceCard
                  key={choice.id}
                  choice={choice}
                  disabled={hasChosenToday}
                  isSelected={selectedChoice?.id === choice.id}
                  onSelect={onSelectChoice}
                />
              ))}
            </div>
            {decisionMemory && (
              <ChoiceMemoryCard decisionMemory={decisionMemory} />
            )}
          </div>

          {/* Consequence Overlay Panel */}
          <AnimatePresence>
            {hasChosenToday && selectedChoice && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <ConsequencePanel
                  choice={selectedChoice}
                  isFriday={currentScenario.dayIndex === 4}
                  onNext={onNextDay}
                  soundEnabled={soundEnabled}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* RIGHT COLUMN: Live Stat Dashes, Progress, and Archetype summary (5/12 cols) */}
        <div className="lg:col-span-5 space-y-6 w-full">
          
          {/* Chosen Archetype summary card styled as a cute library log */}
          {selectedStudentType && (
            <div className="rounded-2xl border border-brand-navy/15 bg-brand-paper p-4.5 flex items-center gap-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full -mr-6 -mt-6" />
              <div className="p-3 rounded-xl bg-brand-blue/10 text-brand-blue border border-brand-blue/15">
                <StudentIcon className="w-6 h-6 shrink-0" />
              </div>
              <div className="space-y-1 text-left">
                <span className="text-[9px] font-mono uppercase tracking-widest text-brand-navy/50 block font-bold">IDENTITY CARD</span>
                <h4 className="text-base font-black text-brand-ink tracking-tight uppercase">
                  {selectedStudentType.name}
                </h4>
                <p className="text-xs text-brand-navy/70 leading-normal font-semibold">
                  Resource Multiplier: <span className="text-brand-blue font-bold">{selectedStudentType.strength}</span>
                </p>
              </div>
            </div>
          )}

          {/* Main Stat Dashboard parameters */}
          <div className="bg-brand-paper rounded-3xl p-5 border border-brand-navy/12 shadow-sm space-y-1">
            <span className="text-[9px] font-mono font-bold tracking-widest text-[#4F7BFF] uppercase block">Live Student Stats</span>
            <StatDashboard stats={stats} statChanges={statChanges} />
          </div>

          {/* Academic Brain Booster Pop-Quiz Trivia mini-game */}
          <BrainBoosterQuiz 
            currentDayIndex={currentScenario.dayIndex} 
            soundEnabled={soundEnabled} 
            onApplyStatBonus={onApplyStatBonus}
          />

          {/* Student Survival Store & Locker Inventory Desk */}
          <StudentShopInventory 
            money={stats.money} 
            inventory={inventory} 
            soundEnabled={soundEnabled} 
            onBuyItem={onBuyItem} 
            onUseItem={onUseItem} 
          />

        </div>

      </div>

    </div>
  );
}
