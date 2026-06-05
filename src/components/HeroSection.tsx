/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Calendar, HelpCircle, Award, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface HeroSectionProps {
  onEnter: () => void;
  bestScore: number;
  bestResult: string;
  soundEnabled: boolean;
}

const previewDays = [
  { day: 'Mon', title: 'Quiz Warning', location: 'Library Zone', desc: 'Prepare or risk grades.', icon: '📝', color: 'border-brand-blue/30 bg-brand-blue/5' },
  { day: 'Tue', title: 'Allowance Problem', location: 'Canteen Lane', desc: 'Manage lunch or starve.', icon: '🍱', color: 'border-brand-amber/30 bg-brand-amber/5' },
  { day: 'Wed', title: 'Group Project', location: 'Group Room', desc: 'Carried or coordinate.', icon: '👥', color: 'border-brand-lavender/30 bg-brand-lavender/5' },
  { day: 'Thu', title: 'Burnout Warning', location: 'Wellness Corner', desc: 'Sanity vs deadlines.', icon: '🧘', color: 'border-brand-coral/30 bg-brand-coral/5' },
  { day: 'Fri', title: 'Final Challenge', location: 'Deadline Board', desc: 'Term results evaluation.', icon: '🎯', color: 'border-brand-green/30 bg-brand-green/5' },
];

export default function HeroSection({ onEnter, bestScore, bestResult, soundEnabled }: HeroSectionProps) {
  const handleEnterClick = () => {
    playClickSound(soundEnabled);
    onEnter();
  };

  const scrollToHowItWorks = () => {
    playClickSound(soundEnabled);
    const element = document.getElementById('how-eyysat-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 w-full select-none space-y-12">
      
      {/* Red Notebook Margin line wrapper & grid dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
        
        {/* Left Column: Student Week Introduction */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-brand-paper rounded-3xl border border-brand-navy/12 shadow-sm relative overflow-hidden h-full">
          
          {/* Subtle Red Notebook Margin Line (Visual Detail 1) */}
          <div className="absolute left-4 top-0 bottom-0 w-[1.5px] bg-[#F26D5B]/35" />
          
          <div className="space-y-6 sm:space-y-8 pl-4 sm:pl-6">
            
            {/* BEST RECORD pin */}
            {bestScore > 0 ? (
              <motion.div
                initial={{ opacity: 0, hover: { scale: 1.05 } }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-[10px] font-mono font-bold uppercase w-fit"
              >
                <Award className="w-3.5 h-3.5 text-brand-green animate-bounce" />
                <span>Best Record: {bestScore} pts ({bestResult})</span>
              </motion.div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/15 text-brand-blue text-[10px] font-mono font-bold uppercase w-fit">
                <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
                <span>Ready for Day 1</span>
              </div>
            )}

            {/* Structured Branding Headings (Visual Detail & Brand Lockup) */}
            <div className="space-y-3">
              <div className="flex items-baseline gap-2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-black tracking-tighter text-brand-ink uppercase">
                  EYYSAT
                </h1>
                <span className="px-2.5 py-1 text-xs md:text-sm font-mono border-2 border-brand-coral/75 text-brand-coral font-black rounded uppercase rotate-[-4deg] tracking-widest inline-block bg-brand-coral/5 shadow-sm">
                  CITY
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-sans text-brand-navy/80 font-bold tracking-wide">
                Student Life Survival Simulator
              </h2>
            </div>

            {/* Survival Paragraph */}
            <p className="text-brand-navy/70 text-sm sm:text-base leading-relaxed font-sans font-medium">
              Survive one school week through choices, campus events, goals, and final student profile results. Every decision changes your grades, stress, energy, money, focus, and social life.
            </p>

            {/* Tactical Primary and Secondary Action cards (Buttons Redesign) */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Primary action (styled like a custom campus permit pass card) */}
              <button
                id="enter-eyysatcity-btn"
                onClick={handleEnterClick}
                className="group flex-1 flex items-center justify-between px-6 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue/95 text-white font-sans font-extrabold text-sm tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 cursor-pointer"
              >
                <span>Start My Week</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToHowItWorks}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-brand-navy/15 hover:border-brand-navy bg-white hover:bg-brand-paper hover:-translate-y-0.5 active:translate-y-0 transition-all font-sans font-extrabold text-xs tracking-widest uppercase text-brand-ink"
              >
                <HelpCircle className="w-4 h-4 text-brand-navy/60" />
                <span>How It Works</span>
              </button>
            </div>

          </div>

          {/* Core metadata details wrapper */}
          <div className="mt-8 pt-4 border-t border-brand-navy/8 pl-4 sm:pl-6 flex items-center justify-between text-[10px] font-mono text-brand-navy/50 font-semibold uppercase">
            <span>Ver. 3.5 Standalone</span>
            <span>Local DB Ready</span>
          </div>

        </div>

        {/* Center/Right Panel: Interactive Campus Board Preview */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 bg-brand-cream/40 rounded-3xl border border-brand-navy/12 shadow-sm relative overflow-hidden h-full">
          
          {/* Subtle wood desk board header or pins */}
          <div className="flex justify-between items-center mb-6 border-b border-brand-navy/10 pb-4">
            <div className="flex items-center gap-2 text-brand-ink">
              <span className="text-xl">📍</span>
              <div>
                <h3 className="font-sans font-bold text-sm uppercase tracking-wider">Campus Board</h3>
                <p className="text-[10px] font-mono font-bold text-brand-navy/50 uppercase">School-Week Outlook</p>
              </div>
            </div>
            {/* Tiny adhesive tape label (Visual Detail 2) */}
            <div className="px-3 py-1 bg-brand-amber/15 border border-brand-amber/35 text-brand-amber text-[9px] font-mono font-extrabold uppercase rotate-[2deg] tracking-wider rounded-md">
              Pinned Schedule
            </div>
          </div>

          {/* Grid Layout representing Monday to Friday Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
            
            {/* Visual connector path connecting the days (Visual Detail 3) */}
            <div className="hidden sm:block absolute top-[28px] left-[10%] right-[10%] h-[1.5px] border-t border-dashed border-brand-navy/20 z-0 pointer-events-none" />

            {previewDays.map((item, index) => {
              const isActive = index === 0; // Highlight Monday (Day 1) as active preview
              return (
                <div
                  key={index}
                  className={`relative p-3.5 rounded-xl border transition-all duration-300 z-10 flex flex-col justify-between h-[150px] group ${
                    isActive
                      ? 'bg-white border-brand-ink shadow-md scale-[1.03] ring-1 ring-brand-ink/50'
                      : 'bg-brand-paper hover:bg-white border-brand-navy/10 opacity-80 hover:opacity-100 hover:scale-[1.02]'
                  }`}
                >
                  {/* Miniature tape on top of Monday (Visual Detail 4) */}
                  {isActive && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-14 h-6 bg-[#FFEAE5] border-x-2 border-brand-coral/35 rotate-[-3deg] uppercase font-mono text-[8px] flex items-center justify-center text-brand-coral font-black tracking-widest z-20 shadow-[0_1px_3px_rgba(0,0,0,0.05)] pointer-events-none">
                      Active
                    </div>
                  )}

                  <div className="space-y-1 text-left">
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full inline-block ${
                      isActive ? 'bg-brand-ink text-white' : 'bg-brand-navy/5 text-brand-navy/50'
                    }`}>
                      {item.day}
                    </span>
                    <h4 className="font-sans font-black text-xs text-brand-ink leading-tight pt-1 group-hover:text-brand-blue transition-colors">
                      {item.title}
                    </h4>
                  </div>

                  <div className="pt-2 text-left space-y-1">
                    <span className="text-[8px] font-mono font-bold text-brand-navy/40 uppercase block">Location</span>
                    <span className="text-[10px] font-sans font-bold text-brand-blue flex items-center gap-1">
                      <span>{item.icon}</span> {item.location}
                    </span>
                  </div>
                </div>
              );
            })}

          </div>

          {/* Underlay Info Note (Visual Detail 5) */}
          <div className="mt-6 pt-5 border-t border-brand-navy/10 flex items-center gap-3 bg-white/60 p-3 rounded-xl border border-brand-navy/5">
            <AlertCircle className="w-5 h-5 text-brand-blue shrink-0" />
            <p className="text-xs font-sans text-brand-navy/70 leading-relaxed font-semibold">
              <strong className="text-brand-ink font-bold">Interactive Preview:</strong> Monday triggers a surprise <span className="text-brand-coral font-bold">Quiz Warning</span> in the Library. Prepare your starting student type's mental resources appropriately to protect your weekend results.
            </p>
          </div>

        </div>

      </div>

      {/* Make Preview Cards Functional Looking (Allowance, Stress, ID, Badge Cards) */}
      <div className="space-y-4">
        <div className="text-left">
          <span className="text-[10px] font-mono text-brand-navy/50 uppercase font-bold tracking-widest block mb-1">INTERACTIVE DESK OBJECT METRICS</span>
          <h3 className="text-base font-sans font-black text-brand-ink uppercase tracking-tight">Active Simulator Previews</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Card 1: Student ID Pass */}
          <div className="bg-white p-4.5 rounded-2xl border border-brand-navy/12 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[145px] hover:border-brand-blue/30 transition-all">
            <div className="absolute top-0 right-0 w-12 h-12 bg-brand-blue/5 rounded-bl-full pointer-events-none" />
            <div className="space-y-2">
              <span className="text-[8px] font-mono font-bold text-brand-blue uppercase bg-brand-blue/10 px-2 py-0.5 rounded">Student ID</span>
              <div className="space-y-0.5">
                <h4 className="font-sans font-black text-sm text-brand-ink">Player One</h4>
                <p className="text-[10px] font-mono text-brand-navy/50">Type: Not Chosen Yet</p>
              </div>
            </div>
            <div className="pt-2 border-t border-brand-navy/8 flex items-center justify-between text-[10px]">
              <span className="font-mono text-brand-navy/40 uppercase">Goal:</span>
              <span className="font-sans font-bold text-brand-ink">Waiting...</span>
            </div>
          </div>

          {/* Card 2: Allowance Tracker Receipt */}
          <div className="bg-[#FFFFFE] p-4.5 rounded-2xl border border-brand-navy/12 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[145px] hover:border-brand-amber/30 transition-all">
            {/* Tiny Red margin line at the edge */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-amber" />
            <div className="space-y-2">
              <span className="text-[8px] font-mono font-bold text-brand-amber uppercase bg-brand-amber/10 px-2 py-0.5 rounded ml-1">Daily Allowance</span>
              <div className="space-y-0.5 pl-1">
                <h4 className="font-sans font-black text-sm text-brand-ink">₱50.00</h4>
                <p className="text-[10px] font-mono text-brand-navy/55 font-bold">In-game Wallet Balance</p>
              </div>
            </div>
            <div className="pt-2 border-t border-brand-navy/8 flex items-center justify-between text-[10px] pl-1">
              <span className="font-mono text-brand-navy/40 uppercase">Status:</span>
              <span className="font-sans font-bold text-brand-green">Tight / Manageable</span>
            </div>
          </div>

          {/* Card 3: Stress Meter Warning */}
          <div className="bg-[#FFFDFB] p-4.5 rounded-2xl border border-brand-navy/12 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[145px] hover:border-brand-coral/30 transition-all">
            <div className="absolute top-2 right-2 flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-coral animate-ping" />
              <div className="w-1.5 h-1.5 rounded-full bg-brand-coral" />
            </div>
            <div className="space-y-2">
              <span className="text-[8px] font-mono font-bold text-brand-coral uppercase bg-brand-coral/10 px-2 py-0.5 rounded">Stress Warning</span>
              <div className="space-y-0.5">
                <h4 className="font-sans font-black text-sm text-brand-ink">Medium Tension</h4>
                <p className="text-[10px] font-mono text-brand-navy/55 leading-tight">Rest directly affects academic focus</p>
              </div>
            </div>
            <div className="pt-2 border-t border-brand-navy/8 flex items-center justify-between text-[10px]">
              <span className="font-mono text-brand-navy/40 uppercase">Action Needed:</span>
              <span className="font-sans font-bold text-brand-coral">Maintain Balance</span>
            </div>
          </div>

          {/* Card 4: Goal Mission Planner */}
          <div className="bg-white p-4.5 rounded-2xl border border-brand-navy/12 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[145px] hover:border-brand-lavender/30 transition-all">
            <div className="space-y-1">
              <span className="text-[8px] font-mono font-bold text-brand-lavender uppercase bg-brand-lavender/10 px-2 py-0.5 rounded">Active Objective</span>
              <h4 className="font-sans font-bold text-xs text-brand-ink leading-tight pt-1">
                Choose Before Start
              </h4>
            </div>
            <p className="text-[10px] text-brand-navy/60 font-sans leading-tight">
              Select your personal goal before starting the week to secure different endings.
            </p>
            <div className="pt-2 border-t border-brand-navy/8 text-right">
              <span className="text-[9px] font-mono uppercase text-brand-navy/40 font-black">6 goals loaded</span>
            </div>
          </div>

          {/* Card 5: Unlockable Badge Stickers */}
          <div className="bg-white p-4.5 rounded-2xl border border-brand-navy/12 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[145px] hover:border-brand-green/30 transition-all">
            <div className="space-y-2">
              <span className="text-[8px] font-mono font-bold text-brand-green uppercase bg-brand-green/10 px-2 py-0.5 rounded">Sticker Unlock</span>
              <div className="space-y-0.5">
                <h4 className="font-sans font-black text-sm text-brand-ink flex items-center gap-1">
                  🔒 Locked
                </h4>
                <p className="text-[10px] font-mono text-brand-navy/55">Achievement: Balance Master</p>
              </div>
            </div>
            <div className="pt-2 border-t border-brand-navy/8 flex items-center justify-between text-[10px]">
              <span className="font-mono text-brand-navy/40 uppercase">Award Rate:</span>
              <span className="font-sans font-bold text-brand-navy">Hard Mode</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
