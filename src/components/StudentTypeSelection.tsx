/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Zap, 
  Briefcase, 
  Coffee, 
  Crown, 
  CheckCircle2, 
  ArrowRight,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';
import { StudentType } from '../types/simulation';
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
  const confirmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedId && confirmRef.current) {
      const timer = setTimeout(() => {
        confirmRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedId]);

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
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 z-10 w-full select-none">
      
      {/* Selection Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-xs font-mono text-brand-blue tracking-[0.2em] uppercase font-bold">LOG #02 : CHOOSE ARCHETYPE</span>
        <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-brand-ink tracking-tight">
          Select Student Profile
        </h2>
        <p className="text-brand-navy/70 max-w-xl mx-auto text-sm sm:text-base">
          Choose your survival perspective. Each class holds different initial resources, stress capacities, and weekly study strategies.
        </p>
      </div>

      {/* Grid of 5 Cards (Styled as Student ID Cards pinned on a notice board) */}
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
                y: -4,
                boxShadow: '0 12px 24px rgba(30,42,68,0.08)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardClick(student)}
              className={`relative rounded-2xl border p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                isSelected 
                  ? 'bg-brand-paper border-brand-blue shadow-[0_12px_24px_rgba(79,123,255,0.12)] ring-1 ring-brand-blue' 
                  : 'bg-brand-paper border-brand-navy/15 text-brand-navy shadow-sm'
              }`}
            >
              {/* Selected indicator checkmark */}
              {isSelected && (
                <div className="absolute top-4 right-4 text-brand-blue">
                  <CheckCircle2 className="w-5 h-5 fill-white" />
                </div>
              )}

              {/* Main Info */}
              <div className="space-y-4">
                
                {/* ID Card Portrait placeholder with badge */}
                <div className={`p-3 rounded-xl w-fit ${
                  isSelected ? 'bg-brand-blue/10 text-brand-blue font-bold shadow-inner' : 'bg-brand-cream text-brand-navy/55 border border-brand-navy/5'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-base font-bold tracking-tight text-brand-ink uppercase font-sans">
                    {student.name}
                  </h3>
                  <p className="text-xs text-brand-navy/75 leading-relaxed mt-1 min-h-[48px] font-sans">
                    {student.description}
                  </p>
                </div>

                {/* Strength & Weakness Bullet Elements */}
                <div className="space-y-2.5 border-t border-brand-navy/10 pt-3.5 text-[11px] font-sans">
                  <div className="flex items-start gap-1.5 text-brand-green">
                    <ThumbsUp className="w-3.5 h-3.5 mt-0.5 shrink-0 text-brand-green" />
                    <span><strong className="text-brand-ink">Pros:</strong> {student.strength}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-brand-coral">
                    <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-brand-coral" />
                    <span><strong className="text-brand-ink">Cons:</strong> {student.weakness}</span>
                  </div>
                </div>
              </div>

              {/* High-quality compact Stat Bars inside preview cards */}
              <div className="mt-5 pt-3.5 border-t border-brand-navy/10 space-y-2">
                
                {/* energy bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] text-brand-navy/55 font-mono font-bold">
                    <span>ENERGY</span>
                    <span className="text-brand-navy font-bold">{student.startingStats.energy}%</span>
                  </div>
                  <div className="h-1 bg-brand-navy/5 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-amber rounded-full" style={{ width: `${student.startingStats.energy}%` }} />
                  </div>
                </div>

                {/* grades bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] text-brand-navy/55 font-mono font-bold">
                    <span>GRADES</span>
                    <span className="text-brand-navy font-bold">{student.startingStats.grades}%</span>
                  </div>
                  <div className="h-1 bg-brand-navy/5 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-blue rounded-full" style={{ width: `${student.startingStats.grades}%` }} />
                  </div>
                </div>

                {/* stress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] text-brand-navy/55 font-mono font-bold">
                    <span>STRESS</span>
                    <span className="text-brand-navy font-bold">{student.startingStats.stress}%</span>
                  </div>
                  <div className="h-1 bg-brand-navy/5 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-coral rounded-full" style={{ width: `${student.startingStats.stress}%` }} />
                  </div>
                </div>

              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Confirmation & Summary Sticky Note */}
      {selectedId && currentSelected && (
        <motion.div
          ref={confirmRef}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-brand-navy/15 bg-brand-paper p-6 shadow-md max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative"
        >
          <div className="absolute top-0 inset-x-0 h-[4px] bg-brand-blue rounded-t-2xl" />
          
          <div className="space-y-1 text-center md:text-left">
            <p className="text-[10px] font-mono text-brand-blue tracking-widest uppercase font-bold">PROFILE CHOSEN</p>
            <h4 className="text-xl font-serif font-extrabold text-brand-ink uppercase">{currentSelected.name}</h4>
            <p className="text-xs text-brand-navy/70 font-sans">
              Initial multi-triggers: <strong className="text-brand-blue">Focus rate multiplier ({currentSelected.startingStats.focus})</strong>, <strong className="text-brand-lavender">Social bandwidth ({currentSelected.startingStats.focus})</strong>
            </p>
          </div>

          <motion.button
            id="start-school-week-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConfirmClick}
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue/95 text-white font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-brand-blue/15 transition-all"
          >
            <span>Start School Week</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
