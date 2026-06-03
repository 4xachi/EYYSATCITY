/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Activity, Zap, GraduationCap, ShieldAlert, Heart } from 'lucide-react';
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
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        
        {/* Left Column: Text Content & Actions */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          
          {/* Best Score High-Contrast Micro-Indicator */}
          {bestScore > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider"
            >
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>BEST SURVIVAL SCORE: <strong className="text-white">{bestScore}</strong> ({bestResult})</span>
            </motion.div>
          )}

          {/* Subtitle Accent */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center lg:justify-start gap-2 text-violet-400 font-mono text-xs uppercase tracking-[0.25em]"
          >
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
            <span>AISAT CAMPUS SIMULATOR</span>
          </motion.div>

          {/* Main Titles */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-5xl sm:text-7xl font-sans font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-[#92400e]/30 font-sans"
              style={{
                backgroundImage: 'linear-gradient(to right, #ffffff, #06b6d4, #a78bfa)',
              }}
            >
              EYYSAT CITY
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="text-xl sm:text-2xl font-serif italic text-cyan-200/90 font-medium tracking-wide"
            >
              Student Life Survival Simulator
            </motion.h2>
          </div>

          {/* Hero Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
          >
            Enter a futuristic school city where every decision affects your grades, energy, stress, money, focus, and social life. Survive one school week and discover what kind of student you become.
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
              whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(6,182,212,0.45)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEnterClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold text-base tracking-wider shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-3 border border-cyan-400/30 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            >
              <span>Enter EYYSAT CITY</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Small Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5 }}
            className="text-xs font-mono uppercase tracking-widest text-zinc-500 block"
          >
            No login. No instructions. Just choices and consequences.
          </motion.p>
        </div>

        {/* Right Column: Premium Futuristic Floating Dashboard Card & Visual Shapes */}
        <div className="lg:col-span-5 relative w-full flex justify-center items-center py-8">
          
          {/* Cybernetic Circle Ring Graphic behind stats */}
          <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border border-cyan-500/10 animate-spin" style={{ animationDuration: '40s' }} />
          <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full border border-violet-500/10 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
          <div className="absolute w-[180px] h-[180px] rounded-full bg-cyan-500/[0.02] filter blur-xl" />

          {/* Interactive Floating Micro-Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full max-w-[340px] rounded-2xl bg-zinc-950/70 border border-zinc-800/80 p-5 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Top glassmorphic scanner bar */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

            {/* Micro Card Header */}
            <div className="flex justify-between items-center border-b border-zinc-800/60 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">LIVE TELEMETRY</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400">STATUS: ACTIVE</span>
            </div>

            {/* Core Stats Displays */}
            <div className="space-y-4">
              
              {/* Stat 1: energy */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 flex items-center gap-1.5 font-sans">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> Energy
                  </span>
                  <span className="text-zinc-200 font-mono">80%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: ['40%', '80%', '75%'] }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                    className="h-full bg-amber-400 rounded-full shadow-[0_0_8px_#fbbf24]"
                  />
                </div>
              </div>

              {/* Stat 2: Grades */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 flex items-center gap-1.5 font-sans">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-400" /> Grades
                  </span>
                  <span className="text-zinc-200 font-mono">92%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: ['60%', '92%', '85%'] }}
                    transition={{ duration: 3.5, repeat: Infinity, repeatType: 'reverse' }}
                    className="h-full bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"
                  />
                </div>
              </div>

              {/* Stat 3: Stress */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 flex items-center gap-1.5 font-sans">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> Stress
                  </span>
                  <span className="text-zinc-200 font-mono">24%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: ['45%', '24%', '30%'] }}
                    transition={{ duration: 4.5, repeat: Infinity, repeatType: 'reverse' }}
                    className="h-full bg-rose-400 rounded-full shadow-[0_0_8px_#f43f5e]"
                  />
                </div>
              </div>

              {/* Current Student Avatar Block */}
              <div className="mt-5 p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/10 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-900/30 border border-cyan-500/20">
                  <Activity className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-cyan-300">Targeting: Balanced</h4>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">Profile calculation ongoing</p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Overlay glow */}
          <div className="absolute top-[2vh] right-[4vw] w-12 h-12 rounded-full bg-violet-500/25 blur-lg animate-bounce duration-[10000ms]" />
          <div className="absolute bottom-[4vh] left-[2vw] w-16 h-16 rounded-full bg-cyan-500/20 blur-lg animate-bounce duration-[8000ms]" />

        </div>

      </div>
    </div>
  );
}
