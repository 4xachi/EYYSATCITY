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
    title: 'Start Method',
    desc: 'Starts the simulation and initiates the user from the greeting hall to the student experience.',
    icon: GitCommit,
    color: 'text-brand-blue bg-brand-blue/10 border-brand-blue/20',
  },
  {
    num: '02',
    title: 'Student Choice Selector',
    desc: 'Assigns chosen profiles holding unique balance multipliers.',
    icon: UserPlus,
    color: 'text-brand-lavender bg-brand-lavender/10 border-brand-lavender/20',
  },
  {
    num: '03',
    title: 'Campus Scenario Mapper',
    desc: 'Brings current days and mapped survival neighborhoods (e.g., Study District) to view.',
    icon: MapPin,
    color: 'text-brand-coral bg-brand-coral/10 border-brand-coral/20',
  },
  {
    num: '04',
    title: 'Strategy Resolver',
    desc: 'Processes active decision models from the student options pool.',
    icon: CheckSquare,
    color: 'text-brand-amber bg-brand-amber/10 border-brand-amber/20',
  },
  {
    num: '05',
    title: 'Multi-Stat Compiler',
    desc: 'Calculates active gains and losses across energy, budget, and sanity meters.',
    icon: Sliders,
    color: 'text-brand-green bg-brand-green/10 border-brand-green/20',
  },
  {
    num: '06',
    title: 'Reflection Logger',
    desc: 'Reveals qualitative reports and highlights physical status reminders.',
    icon: FileText,
    color: 'text-brand-blue bg-brand-blue/10 border-brand-blue/20',
  },
  {
    num: '07',
    title: 'Random Event Trigger',
    desc: 'Hooks dynamic high-school occurrences affecting active resources.',
    icon: Workflow,
    color: 'text-brand-lavender bg-brand-lavender/10 border-brand-lavender/20',
  },
  {
    num: '08',
    title: 'Calendar Timer',
    desc: 'Maintains week progression state from Monday to the final Friday buzzer.',
    icon: Calendar,
    color: 'text-brand-coral bg-brand-coral/10 border-brand-coral/20',
  },
  {
    num: '09',
    title: 'Term Mark Evaluator',
    desc: 'Aggregates the final scores against historic best scores to rate final outcomes.',
    icon: Calculator,
    color: 'text-brand-amber bg-brand-amber/10 border-brand-amber/20',
  },
  {
    num: '10',
    title: 'Curriculum Restart',
    desc: 'Flushes active week timelines to let users enroll in another week.',
    icon: RotateCcw,
    color: 'text-brand-green bg-brand-green/10 border-brand-green/20',
  }
];

export default function FunctionsSection() {
  return (
    <section className="py-14 border-t border-brand-navy/10 bg-transparent w-full z-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Core Presentation Section Title */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono text-brand-blue tracking-[0.25em] uppercase font-bold">SYSTEM ARCHITECTURE MANUAL</span>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-brand-ink tracking-tight">
            How Eyysat City Works
          </h2>
          <p className="text-brand-navy/70 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Ten core programmatic systems governing the student simulation. Read this guide to understand its inner academic machinery.
          </p>
        </div>

        {/* 10 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {functionsList.map((f) => {
            const IconComponent = f.icon;

            return (
              <motion.div
                key={f.num}
                whileHover={{ y: -4, scale: 1.01 }}
                className="flex flex-col justify-between rounded-2xl border border-brand-navy/15 bg-brand-paper p-5 relative overflow-hidden transition-all duration-300 shadow-sm"
              >
                {/* Diagonal background number label */}
                <span className="absolute top-3 right-3.5 font-mono text-xs font-extrabold tracking-widest text-[#4F7BFF]/75">
                  {f.num}
                </span>

                <div className="space-y-4">
                  {/* Glowing icon circle */}
                  <div className={`p-2 w-fit rounded-xl border ${f.color}`}>
                    <IconComponent className="w-5 h-5 shrink-0" />
                  </div>

                  <div className="space-y-1.5 pr-2">
                    <h3 className="text-sm font-bold text-brand-ink tracking-tight uppercase">
                      {f.title}
                    </h3>
                    <p className="text-xs text-brand-navy/75 leading-relaxed font-sans font-medium">
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
