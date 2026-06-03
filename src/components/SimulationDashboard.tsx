/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, AlertCircle, Info, GraduationCap, Zap, Activity, Briefcase, Coffee, Crown } from 'lucide-react';
import { Scenario, Stats, Choice, StudentType } from '../types/simulation';
import ProgressTracker from './ProgressTracker';
import StatDashboard from './StatDashboard';
import ChoiceCard from './ChoiceCard';
import ConsequencePanel from './ConsequencePanel';
import { playClickSound } from '../utils/audio';

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
}

const archetypeIcons: { [key: string]: any } = {
  scholar: GraduationCap,
  crammer: Zap,
  hustler: Briefcase,
  chill: Coffee,
  leader: Crown,
};

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
}: SimulationDashboardProps) {

  const StudentIcon = selectedStudentType ? (archetypeIcons[selectedStudentType.id] || GraduationCap) : GraduationCap;

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 z-10 w-full animate-fade-in space-y-8 select-none">
      
      {/* Simulation Grid System */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        
        {/* LEFT COLUMN: Scenario Description, Option Buttons & Consequences (7/12 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Day & Location Banner */}
          <div className="relative rounded-2xl border border-zinc-800 bg-[#04040e]/95 p-6 backdrop-blur-md overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-lg shadow-black/40">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-cyan-400 uppercase">
                CURRENT TEMPORAL SECTOR
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                {currentScenario.dayName}
              </h2>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 w-fit">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <div className="font-mono text-xs uppercase tracking-wider text-cyan-300">
                LCTN: <strong className="text-white">{currentScenario.location}</strong>
              </div>
            </div>
          </div>

          {/* Scenario Graphic Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-zinc-800 bg-zinc-950/65 p-6 backdrop-blur-md space-y-4"
          >
            <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-mono tracking-widest uppercase">
              <Info className="w-3.5 h-3.5" /> DILEMMA SEQUENCE
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight">
                {currentScenario.title}
              </h3>
              <p className="text-zinc-300 leading-relaxed font-sans text-sm sm:text-base">
                {currentScenario.description}
              </p>
            </div>
          </motion.div>

          {/* Decision Choice Buttons Selection Map */}
          <div className="space-y-3.5">
            <h4 className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">AVAILABLE OUTCOMES</h4>
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
        <div className="lg:col-span-5 space-y-6">
          
          {/* Chosen Archetype summary card */}
          {selectedStudentType && (
            <div className="rounded-2xl border border-zinc-800 bg-[#040410]/70 p-4.5 backdrop-blur-md flex items-center gap-4">
              <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-400">
                <StudentIcon className="w-6 h-6 shrink-0" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block">IDENTITY SECTOR</span>
                <h4 className="text-base font-extrabold text-white tracking-tight uppercase">
                  {selectedStudentType.name}
                </h4>
                <p className="text-xs text-zinc-400 leading-normal">
                  Strength: <strong className="text-indigo-300">{selectedStudentType.strength}</strong>
                </p>
              </div>
            </div>
          )}

          {/* Dynamic Progress Tracker bar */}
          <ProgressTracker currentDayIndex={currentScenario.dayIndex} />

          {/* Main Stat Dashboard parameters */}
          <StatDashboard stats={stats} statChanges={statChanges} />

        </div>

      </div>

    </div>
  );
}
