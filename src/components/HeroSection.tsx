/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Bookmark, Calendar, DollarSign, Award, Clock } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface HeroSectionProps {
  onEnter: () => void;
  bestScore: number;
  bestResult: string;
  soundEnabled: boolean;
}

export default function HeroSection({ onEnter, bestScore, bestResult, soundEnabled }: HeroSectionProps) {
  const handleEnterClick = () => {
    playClickSound(soundEnabled);
    onEnter();
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-center w-full">
        
        {/* Left Column: Text Content & Actions (Academic Editorial style) */}
        <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
          
          {/* Best Score High-Contrast Micro-Indicator (styled as a campus merit badge) */}
          {bestScore > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-brand-paper border border-brand-blue/20 text-brand-blue text-xs font-semibold shadow-sm"
            >
              <Award className="w-4 h-4 text-brand-amber bg-brand-amber/10 p-0.5 rounded" />
              <span>BEST SURVIVAL PROFILE: <strong className="text-brand-ink font-bold">{bestScore} pts</strong> ({bestResult})</span>
            </motion.div>
          )}

          {/* Subtitle Accent (as a modern planner sticker) */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center lg:justify-start gap-2.5 text-brand-blue font-mono text-xs uppercase tracking-[0.2em] font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-brand-coral animate-pulse" />
            <span>EYYSAT CITY // STUDENT SURVIVAL DIARY</span>
          </motion.div>

          {/* Main Titles - Soft Editorial Styling */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-5xl sm:text-7xl font-serif font-extrabold tracking-tight text-brand-ink"
            >
              EYYSAT <span className="text-brand-blue italic font-medium">CITY</span>
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="text-lg sm:text-xl font-sans text-brand-navy/80 font-medium tracking-wide flex items-center justify-center lg:justify-start gap-2"
            >
              <span>The Premium Campus Life Simulator</span>
            </motion.h2>
          </div>

          {/* Hero Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-brand-navy/70 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans"
          >
            Step into the simulator where high-school realities clash with your daily energy, grades, stress, and allowance. Balance sleep, assignments, social pressure, and school lunch budgets through a critical academic week.
          </motion.p>

          {/* CTA & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <motion.button
              id="enter-eyysatcity-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEnterClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-base tracking-wider shadow-lg shadow-brand-blue/15 flex items-center justify-center gap-3 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
            >
              <span>Enter Eyysat City</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </motion.button>
          </motion.div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.5 }}
            className="text-xs font-mono uppercase tracking-wider text-brand-navy/60 block"
          >
            No installation • Real-time choices • Designed for students
          </motion.p>
        </div>

        {/* Right Column: Beautiful Layered Desk Workspace (ID, schedule, sticky notes) */}
        <div className="lg:col-span-6 relative w-full flex justify-center items-center py-6">
          
          {/* Ambient desktop clock outline or book shadow */}
          <div className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full border border-brand-navy/5 animate-pulse" />
          
          {/* Main container to hold layered cards */}
          <div className="relative w-full max-w-[420px] h-[380px] sm:h-[420px]">
            
            {/* Card 1: Student ID Card (Back layer - rotated left) */}
            <motion.div
              initial={{ opacity: 0, x: -30, rotate: -15 }}
              animate={{ opacity: 1, x: 0, rotate: -8 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              whileHover={{ y: -8, rotate: -5, zIndex: 30 }}
              className="absolute top-2 left-2 w-[240px] rounded-2xl bg-brand-paper border border-brand-navy/10 p-4 shadow-md select-none transition-all duration-300 z-10"
            >
              <div className="flex items-center justify-between border-b border-brand-navy/5 pb-2 mb-3">
                <span className="text-[9px] font-mono font-bold tracking-wider text-brand-blue uppercase">STUDENT ID</span>
                <span className="text-[8px] font-mono text-brand-navy/40">NO. L2057</span>
              </div>
              <div className="flex gap-3">
                {/* ID Portrait (Generative SVG styled as outline avatar) */}
                <div className="w-12 h-12 rounded-lg bg-brand-cream border border-brand-navy/10 flex flex-col justify-end overflow-hidden">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/20 mx-auto -mb-2 flex items-center justify-center">
                    <span className="text-[10px] text-brand-blue font-bold">☺</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-brand-ink leading-tight">SIR PAL</h4>
                  <p className="text-[9px] text-brand-navy/65 font-mono">EYYSAT ACADEMY</p>
                  <p className="text-[8px] text-brand-green bg-brand-green/10 px-1 py-0.5 rounded font-bold w-fit">ACTIVE</p>
                </div>
              </div>
              {/* barcode placeholder */}
              <div className="mt-4 pt-2 border-t border-brand-navy/5 flex flex-col gap-1">
                <div className="h-4 bg-brand-navy/15 rounded opacity-40 notebook-grid" />
                <span className="text-[7px] font-mono text-center text-brand-navy/40 tracking-widest">** 5e174af8 **</span>
              </div>
            </motion.div>

            {/* Card 2: Weekly Schedule Timetable Card (Rotated right) */}
            <motion.div
              initial={{ opacity: 0, x: 30, rotate: 12 }}
              animate={{ opacity: 1, x: 0, rotate: 6 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8, rotate: 2, zIndex: 30 }}
              className="absolute top-10 right-2 w-[260px] rounded-2xl bg-brand-paper border border-brand-navy/10 p-5 shadow-lg select-none transition-all duration-300 z-20"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                  <span className="text-[10px] font-bold text-brand-ink uppercase font-sans">Weekly Focus</span>
                </div>
                <span className="text-[9px] font-mono text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-full font-bold">MON - FRI</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] border-b border-brand-navy/5 pb-1">
                  <span className="font-semibold text-brand-navy/80">Monday</span>
                  <span className="text-brand-coral font-bold text-[10px]">Pop Quiz Alert</span>
                </div>
                <div className="flex items-center justify-between text-[11px] border-b border-brand-navy/5 pb-1">
                  <span className="font-semibold text-brand-navy/80">Wednesday</span>
                  <span className="text-brand-amber font-bold text-[10px]">Math Midnight Cram</span>
                </div>
                <div className="flex items-center justify-between text-[11px] pb-1">
                  <span className="font-semibold text-brand-navy/80">Friday</span>
                  <span className="text-brand-green font-bold text-[10px]">Survival Grade Card</span>
                </div>
              </div>

              {/* Progress Slider note */}
              <div className="mt-4 pt-3 border-t border-brand-navy/5 flex items-center justify-between">
                <span className="text-[9px] font-mono text-brand-navy/50 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> TERM WORKFLOW
                </span>
                <span className="text-[9px] font-bold text-brand-blue">ON TRACK</span>
              </div>
            </motion.div>

            {/* Card 3: Canteen Expense Receipt Card (Rotated slightly left, on top) */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: -1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8, rotate: 0, zIndex: 30 }}
              className="absolute bottom-4 left-6 w-[230px] rounded-2xl bg-[#FFFFFC] border border-brand-navy/10 p-4.5 shadow-xl select-none transition-all duration-300 z-25 flex flex-col justify-between"
              style={{ backgroundImage: 'linear-gradient(rgba(245,184,75,0.03) 0%, rgba(255,255,255,0) 100%)' }}
            >
              <div className="border-b border-dashed border-brand-navy/20 pb-2 mb-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-brand-navy uppercase tracking-wider">CANTEEN RECEIPT</span>
                  <DollarSign className="w-3.5 h-3.5 text-brand-green" />
                </div>
                <span className="text-[8px] font-mono text-brand-navy/40">TIME: 12:40 PM</span>
              </div>
              <div className="space-y-1.5 text-[10px] text-brand-navy/85 font-mono">
                <div className="flex justify-between">
                  <span>Double Espresso</span>
                  <span>-$3.50</span>
                </div>
                <div className="flex justify-between">
                  <span>Textbook PDF</span>
                  <span>-$12.00</span>
                </div>
                <div className="flex justify-between font-bold text-brand-ink pt-1.5 border-t border-dashed border-brand-navy/15">
                  <span>WEEKLY ALLOWANCE</span>
                  <span className="text-brand-green">$50.00</span>
                </div>
              </div>
            </motion.div>

            {/* Sticky Yellow Notebook Note (At bottom right) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
              animate={{ opacity: 1, scale: 1, rotate: 8 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
              whileHover={{ scale: 1.05, rotate: 4, zIndex: 35 }}
              className="absolute bottom-6 right-8 w-32 h-30 bg-[#FEF9C3] hover:bg-[#FEF08A] border-l-3 border-brand-amber text-brand-ink p-3 shadow-md select-none transition-all duration-200 z-28 text-left rotate-8 transform"
            >
              <span className="text-[8px] font-mono text-brand-coral uppercase tracking-wider block font-bold mb-1">STICKY REMINDER</span>
              <p className="text-[10px] font-sans font-semibold text-brand-navy/90 leading-snug">
                Study Group Session cancelled. Sleep &gt; Coffee! Don't fail calculations.
              </p>
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
}
