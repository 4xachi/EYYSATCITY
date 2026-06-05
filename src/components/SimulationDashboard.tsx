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

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 z-10 w-full select-none space-y-6">
      
      {/* Simulation Grid System */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        
        {/* LEFT COLUMN: Scenario Description, Option Buttons & Consequences (7/12 cols) */}
        <div className="lg:col-span-7 space-y-6 w-full">
          
          {/* Day & Location Banner */}
          <div className="relative rounded-2xl border border-brand-navy/15 bg-brand-paper p-6 overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-[0_4px_12px_rgba(30,42,68,0.03)]">
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-brand-blue to-brand-coral" />
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold tracking-[0.15em] text-brand-blue uppercase">
                CALENDAR WORKLOAD TIMELINE
              </span>
              <h2 className="text-3xl font-serif font-extrabold text-brand-ink tracking-tight flex items-center gap-2">
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

          {/* Scenario Graphic Card as a pristine study journal sheet */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-brand-navy/15 bg-brand-paper p-6 space-y-4 shadow-[0_6px_18px_rgba(30,42,68,0.02)]"
          >
            <div className="flex items-center gap-1.5 text-xs text-brand-blue font-mono tracking-widest uppercase font-bold">
              <BookOpen className="w-4 h-4 text-brand-blue" /> STUDY LIFE DILEMMA
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-brand-ink tracking-tight">
                {currentScenario.title}
              </h3>
              <p className="text-brand-navy/85 leading-relaxed font-sans text-sm sm:text-base">
                {currentScenario.description}
              </p>
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
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-widest text-brand-navy/50 block font-bold">IDENTITY CARD</span>
                <h4 className="text-base font-extrabold text-brand-ink tracking-tight uppercase">
                  {selectedStudentType.name}
                </h4>
                <p className="text-xs text-brand-navy/70 leading-normal font-medium">
                  Resource Multiplier: <span className="text-brand-blue font-bold">{selectedStudentType.strength}</span>
                </p>
              </div>
            </div>
          )}

          {/* Dynamic Progress Tracker bar */}
          <ProgressTracker currentDayIndex={currentScenario.dayIndex} />

          {/* Main Stat Dashboard parameters */}
          <StatDashboard stats={stats} statChanges={statChanges} />

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
