/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Zap, 
  Briefcase, 
  Coffee, 
  Crown, 
  Flame, 
  Activity, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { StudentType, Stats } from '../types/simulation';
import { studentTypes } from '../data/studentTypes';
import { playClickSound, playPositiveSound } from '../utils/audio';

// Map icon names to Lucide icons
const iconMap: { [key: string]: any } = {
  GraduationCap: GraduationCap,
  Zap: Zap,
  Briefcase: Briefcase,
  Coffee: Coffee,
  Crown: Crown,
};

interface StudentTypeSelectionProps {
  onSelect: (selected: StudentType) => void;
  soundEnabled: boolean;
}

export default function StudentTypeSelection({ onSelect, soundEnabled }: StudentTypeSelectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleCardClick = (student: StudentType) => {
    setSelectedId(student.id);
    playClickSound(soundEnabled);
  };

  const handleConfirmClick = () => {
    if (selectedId) {
      const selectedStudent = studentTypes.find((s) => s.id === selectedId);
      if (selectedStudent) {
        playPositiveSound(soundEnabled);
        onSelect(selectedStudent);
      }
    }
  };

  const currentSelected = studentTypes.find((s) => s.id === selectedId);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 z-10 w-full">
      {/* Selection Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-xs font-mono text-cyan-400 tracking-[0.2em] uppercase">STEP 02 : SYSTEM ARCHETYPE</span>
        <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-white tracking-tight">
          Select Student Identity
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
          Each student class begins with unique stats representing their starting strengths, habits, and balance parameters.
        </p>
      </div>

      {/* Grid of 5 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10 w-full">
        {studentTypes.map((student) => {
          const IconComponent = iconMap[student.iconName] || GraduationCap;
          const isSelected = selectedId === student.id;

          return (
            <motion.div
              id={`student-card-${student.id}`}
              key={student.id}
              whileHover={{ 
                scale: 1.03, 
                borderColor: isSelected ? 'rgba(6,182,212,0.8)' : 'rgba(255,255,255,0.22)',
                boxShadow: isSelected 
                  ? '0 0 25px rgba(6,182,212,0.25)' 
                  : '0 10px 30px rgba(0,0,0,0.5)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardClick(student)}
              className={`relative rounded-xl border p-5 backdrop-blur-md cursor-pointer transition-[border-color,background-color,color,box-shadow] duration-300 flex flex-col justify-between ${
                isSelected 
                  ? 'bg-cyan-950/20 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)] text-white' 
                  : 'bg-zinc-950/40 border-zinc-800 text-zinc-300'
              }`}
            >
              {/* Selected indicator chip */}
              {isSelected && (
                <div className="absolute top-3 right-3 text-cyan-400">
                  <CheckCircle2 className="w-5 h-5 fill-cyan-950/80" />
                </div>
              )}

              {/* Main Info */}
              <div className="space-y-4">
                <div className={`p-3 rounded-lg w-fit ${
                  isSelected ? 'bg-cyan-900/30 text-cyan-400' : 'bg-zinc-900 text-zinc-400'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold tracking-tight">{student.name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1">{student.description}</p>
                </div>

                {/* Strength & Weakness Bullet Elements */}
                <div className="space-y-2 border-t border-zinc-900 pt-3 text-[11px] font-sans">
                  <div className="flex items-center gap-1 text-cyan-300">
                    <TrendingUp className="w-3.5 h-3.5 shrink-0 col-cyan" />
                    <span><strong>Pros:</strong> {student.strength}</span>
                  </div>
                  <div className="flex items-center gap-1 text-rose-300">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 col-rose" />
                    <span><strong>Cons:</strong> {student.weakness}</span>
                  </div>
                </div>
              </div>

              {/* Mini Stat bars inside each student preview card */}
              <div className="mt-5 pt-3 border-t border-zinc-900 space-y-2">
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                  <span>ENERGY</span>
                  <span className="text-zinc-300 font-bold">{student.startingStats.energy}</span>
                </div>
                <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400" style={{ width: `${student.startingStats.energy}%` }} />
                </div>

                <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                  <span>GRADES</span>
                  <span className="text-zinc-300 font-bold">{student.startingStats.grades}</span>
                </div>
                <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400" style={{ width: `${student.startingStats.grades}%` }} />
                </div>

                <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                  <span>STRESS</span>
                  <span className="text-zinc-400 font-bold">{student.startingStats.stress}</span>
                </div>
                <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500" style={{ width: `${student.startingStats.stress}%` }} />
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Confirmation & Summary Panel */}
      {selectedId && currentSelected && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-cyan-500/30 bg-cyan-950/10 p-6 backdrop-blur-xl max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center md:text-left">
            <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase">CLASS SELECTED</p>
            <h4 className="text-xl font-bold text-white uppercase">{currentSelected.name}</h4>
            <p className="text-xs text-zinc-400">
              Starting multipliers: <strong className="text-cyan-300">Focus ({currentSelected.startingStats.focus})</strong>, <strong className="text-violet-300">Social ({currentSelected.startingStats.social})</strong>
            </p>
          </div>

          <motion.button
            id="start-school-week-btn"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(6,182,212,0.3)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConfirmClick}
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-[background-color,color,box-shadow] duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            <span>Start School Week</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
