/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Play,
  Target,
  GraduationCap,
  MapPin,
  BookOpen,
  CheckSquare,
  Activity,
  GitFork,
  Sparkles,
  FileText,
  Trophy,
  Award,
  RefreshCw,
  RotateCcw,
  ShoppingBag,
  Brain,
  Volume2
} from 'lucide-react';

const functionsList = [
  {
    num: '01',
    title: 'Start Function',
    desc: 'Starts the simulator and moves the user into the student-life experience.',
    icon: Play,
    color: 'text-brand-blue bg-brand-blue/10 border-brand-blue/20',
  },
  {
    num: '02',
    title: 'Goal Selection Function',
    desc: 'Lets the user choose a personal goal and checks if they achieved it at the end.',
    icon: Target,
    color: 'text-brand-lavender bg-brand-lavender/10 border-brand-lavender/20',
  },
  {
    num: '03',
    title: 'Student Type Function',
    desc: 'Lets the user choose a student type with different starting stats.',
    icon: GraduationCap,
    color: 'text-brand-coral bg-brand-coral/10 border-brand-coral/20',
  },
  {
    num: '04',
    title: 'Campus Map Function',
    desc: 'Shows the school-week locations and lets the user enter the current unlocked day.',
    icon: MapPin,
    color: 'text-brand-amber bg-brand-amber/10 border-brand-amber/20',
  },
  {
    num: '05',
    title: 'Scenario Display Function',
    desc: 'Displays realistic student-life situations for each school day.',
    icon: BookOpen,
    color: 'text-brand-green bg-brand-green/10 border-brand-green/20',
  },
  {
    num: '06',
    title: 'Choice Function',
    desc: 'Allows the user to make one decision per day.',
    icon: CheckSquare,
    color: 'text-brand-blue bg-brand-blue/10 border-brand-blue/20',
  },
  {
    num: '07',
    title: 'Stat Engine Function',
    desc: 'Updates energy, stress, grades, money, focus, and social life based on user decisions.',
    icon: Activity,
    color: 'text-brand-lavender bg-brand-lavender/10 border-brand-lavender/20',
  },
  {
    num: '08',
    title: 'Branching Consequence Function',
    desc: 'Changes future scenarios based on previous decisions.',
    icon: GitFork,
    color: 'text-brand-coral bg-brand-coral/10 border-brand-coral/20',
  },
  {
    num: '09',
    title: 'Campus Event Function',
    desc: 'Adds unexpected school-life events between days.',
    icon: Sparkles,
    color: 'text-brand-amber bg-brand-amber/10 border-brand-amber/20',
  },
  {
    num: '10',
    title: 'Reflection Journal Function',
    desc: 'Summarizes what happened each day and gives a short student-life lesson.',
    icon: FileText,
    color: 'text-brand-green bg-brand-green/10 border-brand-green/20',
  },
  {
    num: '11',
    title: 'Multiple Ending Function',
    desc: 'Generates different final student profiles based on stats, score, goals, and decision patterns.',
    icon: Trophy,
    color: 'text-brand-blue bg-brand-blue/10 border-brand-blue/20',
  },
  {
    num: '12',
    title: 'Badge Collection Function',
    desc: 'Rewards different play styles and saves unlocked badges locally.',
    icon: Award,
    color: 'text-brand-lavender bg-brand-lavender/10 border-brand-lavender/20',
  },
  {
    num: '13',
    title: 'What-If Replay Function',
    desc: 'Shows how a different choice could have changed the user’s result.',
    icon: RefreshCw,
    color: 'text-brand-coral bg-brand-coral/10 border-brand-coral/20',
  },
  {
    num: '14',
    title: 'Restart Function',
    desc: 'Resets the simulation so the user can try a new path.',
    icon: RotateCcw,
    color: 'text-brand-amber bg-brand-amber/10 border-brand-amber/20',
  },
  {
    num: '15',
    title: 'Survival Shop Function',
    desc: 'Lets users spend starting academic allowance on vitals boosters like study guides and energy coffee.',
    icon: ShoppingBag,
    color: 'text-brand-blue bg-brand-blue/10 border-brand-blue/20',
  },
  {
    num: '16',
    title: 'Brain Booster Quiz Function',
    desc: 'Runs live, optional trivia quizzes to instantly raise grades and test student knowledge.',
    icon: Brain,
    color: 'text-brand-lavender bg-brand-lavender/10 border-brand-lavender/20',
  },
  {
    num: '17',
    title: 'Audio Feedback Function',
    desc: 'Utilizes interactive audio cues to emphasize actions, failures, milestones, and shop actions.',
    icon: Volume2,
    color: 'text-brand-coral bg-brand-coral/10 border-brand-coral/20',
  }
];

export default function FunctionsSection() {
  return (
    <section id="how-eyysat-works" className="py-14 border-t border-brand-navy/10 bg-transparent w-full z-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
         {/* Core Presentation Section Title */}
         <div className="text-center space-y-3">
           <span className="text-xs font-mono text-brand-blue tracking-[0.25em] uppercase font-bold">SYSTEM ARCHITECTURE MANUAL</span>
           <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-brand-ink tracking-tight">
             How Eyysat City Works
           </h2>
           <p className="text-brand-navy/70 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
             Seventeen core programmatic systems governing the student simulation. Read this guide to understand its inner academic machinery.
           </p>
         </div>

        {/* Responsive Grid with equal card sizing logic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {functionsList.map((f) => {
            const IconComponent = f.icon;

            return (
              <motion.div
                key={f.num}
                whileHover={{ y: -4, scale: 1.01 }}
                className="flex flex-col justify-between h-full rounded-2xl border border-brand-navy/15 bg-brand-paper p-5 relative overflow-hidden transition-all duration-300 shadow-sm"
              >
                <div className="flex flex-col justify-between h-full w-full space-y-4">
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
                </div>

                {/* Diagonal background number label */}
                <span className="absolute top-3 right-3.5 font-mono text-xs font-extrabold tracking-widest text-[#4F7BFF]/75">
                  {f.num}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
