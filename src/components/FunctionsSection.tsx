/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  GitCommit, 
  UserPlus, 
  MapPin, 
  CheckSquare, 
  Sliders, 
  FileText, 
  Workflow, 
  Calendar, 
  Calculator, 
  RotateCcw 
} from 'lucide-react';

const functionsList = [
  {
    num: '01',
    title: 'Start Function',
    desc: 'Starts the simulation and moves the user from the landing page to the student life experience.',
    icon: GitCommit,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/15',
    glow: 'shadow-[0_0_15px_rgba(6,182,212,0.1)]'
  },
  {
    num: '02',
    title: 'Student Type Function',
    desc: 'Lets the user choose a student type with different starting stats.',
    icon: UserPlus,
    color: 'text-violet-400',
    borderColor: 'border-violet-500/15',
    glow: 'shadow-[0_0_15px_rgba(139,92,246,0.1)]'
  },
  {
    num: '03',
    title: 'Scenario Display Function',
    desc: 'Shows the current school day, location, and problem the user must solve.',
    icon: MapPin,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/15',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]'
  },
  {
    num: '04',
    title: 'Choice Function',
    desc: 'Allows the user to select a decision from multiple options.',
    icon: CheckSquare,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/15',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.1)]'
  },
  {
    num: '05',
    title: 'Stat Update Function',
    desc: 'Updates energy, stress, grades, money, focus, and social life based on the selected choice.',
    icon: Sliders,
    color: 'text-rose-450',
    borderColor: 'border-rose-500/15',
    glow: 'shadow-[0_0_15px_rgba(244,63,94,0.1)]'
  },
  {
    num: '06',
    title: 'Consequence Function',
    desc: 'Displays the result of the user’s decision.',
    icon: FileText,
    color: 'text-sky-400',
    borderColor: 'border-sky-500/15',
    glow: 'shadow-[0_0_15px_rgba(56,189,248,0.1)]'
  },
  {
    num: '07',
    title: 'Random Event Function',
    desc: 'Generates unexpected events that affect the user’s stats.',
    icon: Workflow,
    color: 'text-fuchsia-400',
    borderColor: 'border-fuchsia-500/15',
    glow: 'shadow-[0_0_15px_rgba(232,121,249,0.1)]'
  },
  {
    num: '08',
    title: 'Progress Function',
    desc: 'Tracks the user’s progress from Monday to Friday.',
    icon: Calendar,
    color: 'text-blue-400',
    borderColor: 'border-blue-500/15',
    glow: 'shadow-[0_0_15px_rgba(59,130,246,0.1)]'
  },
  {
    num: '09',
    title: 'Final Result Function',
    desc: 'Calculates the final outcome based on the user’s stats.',
    icon: Calculator,
    color: 'text-orange-400',
    borderColor: 'border-orange-500/15',
    glow: 'shadow-[0_0_15px_rgba(249,115,22,0.1)]'
  },
  {
    num: '10',
    title: 'Restart Function',
    desc: 'Resets the simulation so the user can try again.',
    icon: RotateCcw,
    color: 'text-teal-400',
    borderColor: 'border-teal-500/15',
    glow: 'shadow-[0_0_15px_rgba(20,184,166,0.1)]'
  }
];

export default function FunctionsSection() {
  return (
    <section className="py-14 border-t border-zinc-800 bg-[#02020a]/60 w-full z-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Core Presentation Section Title */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono text-cyan-400 tracking-[0.25em] uppercase">SYSTEM ANALYSIS OVERVIEW</span>
          <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-white tracking-tight">
            How EYYSAT CITY Works
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            These are the 10 core programmatic functions governing the simulation life engine. Leverage this section for presentation queries.
          </p>
        </div>

        {/* 10 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {functionsList.map((f) => {
            const IconComponent = f.icon;

            return (
              <motion.div
                key={f.num}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`flex flex-col justify-between rounded-xl border ${f.borderColor} bg-zinc-950/55 p-5 relative overflow-hidden transition-all duration-300 ${f.glow}`}
              >
                {/* Diagonal background number label */}
                <span className="absolute top-2 right-3 font-mono text-[11px] font-bold tracking-widest text-[#a5b4fc] opacity-60">
                  {f.num}
                </span>

                <div className="space-y-4">
                  {/* Glowing icon circle */}
                  <div className={`p-2 w-fit rounded-lg bg-zinc-900 border border-zinc-800 ${f.color}`}>
                    <IconComponent className="w-5 h-5 shrink-0" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-sm font-extrabold text-white tracking-tight uppercase">
                      {f.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      {f.desc}
                    </p>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
