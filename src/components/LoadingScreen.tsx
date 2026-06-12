/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Coffee, 
  Clock, 
  Sparkles, 
  Check, 
  Zap, 
  BookOpen, 
  Smile 
} from 'lucide-react';
import { playClickSound, playPositiveSound } from '../utils/audio';

interface LoadingScreenProps {
  onComplete: () => void;
}

// Fun student thoughts that change as the terminal prepares
const studentThoughts = [
  "If I sleep for 4 minutes now, does that count as a full sleep cycle?",
  "Will the professor notice if my bibliography is mostly just Wikipedia links?",
  "Brain-booster hypothesis: Coffee to forget stress, energy drinks to forget coffee.",
  "Maybe if I dress nicely on finals day, they will overlook my missing homework.",
  "Drafting emergency contingency sheets for the 8:00 AM quiz...",
  "Searching backpack for standard ballpoint pen that actually works.",
  "Applying mental caffeine buffers to key academic regions."
];

// Interactive backpack packing checklist that ticks as bar advances
const checklistItems = [
  { id: 'backpack', label: 'Pack heavy course binder (4 kg)', progressTrigger: 15, icon: '🎒' },
  { id: 'mug', label: 'Double-drip espresso boiler', progressTrigger: 40, icon: '☕' },
  { id: 'formulas', label: 'Inscribe basic cheat formulas on forearm', progressTrigger: 65, icon: '📝' },
  { id: 'charge', label: 'Acquire 7% charged phone battery', progressTrigger: 85, icon: '⚡' },
  { id: 'id', label: 'Locate lost Student Photo ID card', progressTrigger: 100, icon: '🪪' }
];

interface Particle {
  id: number;
  x: number;
  y: number;
  type: 'zzz' | 'sip' | 'star';
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [thoughtIndex, setThoughtIndex] = useState(0);
  const [interactiveClicks, setInteractiveClicks] = useState(0);
  const [isAlarmShaking, setIsAlarmShaking] = useState(false);
  const [isCoffeeSteaming, setIsCoffeeSteaming] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const hasTriggeredComplete = useRef(false);

  // Auto progression loader
  useEffect(() => {
    const totalDuration = 5500; // Normal rate takes 5.5s, interactive clicks accelerate it
    const intervalTime = 40;
    const increment = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          if (!hasTriggeredComplete.current) {
            hasTriggeredComplete.current = true;
            // Play a gratifying chime
            playPositiveSound(true);
            setTimeout(() => {
              onComplete();
            }, 300);
          }
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Rotates high-school / college wisdom thoughts
  useEffect(() => {
    const interval = setInterval(() => {
      setThoughtIndex((prev) => (prev + 1) % studentThoughts.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Utility to push progress via manual clicking
  const boostProgress = (type: 'zzz' | 'sip' | 'star') => {
    playClickSound(true);
    setInteractiveClicks((prev) => prev + 1);
    
    // Add particle burst at the cursor/tap zone
    const newId = Date.now() + Math.random();
    const angle = Math.random() * Math.PI * 2;
    const dist = 30 + Math.random() * 50;
    const newParticle: Particle = {
      id: newId,
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 30, // upward physics drift
      type
    };

    setParticles((prev) => [...prev, newParticle]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newId));
    }, 1500);

    // Boost progress by 5-7% per click
    setProgress((prev) => Math.min(prev + (Math.random() * 2 + 5), 100));
  };

  const handleSnooze = () => {
    if (progress >= 100) return;
    setIsAlarmShaking(true);
    boostProgress('zzz');
    setTimeout(() => setIsAlarmShaking(false), 400);
  };

  const handleBrew = () => {
    if (progress >= 100) return;
    setIsCoffeeSteaming(true);
    boostProgress('sip');
    setTimeout(() => setIsCoffeeSteaming(false), 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-cream text-brand-ink selection:bg-brand-blue/10 select-none flex flex-col">
      {/* Dynamic desktop graph grid sheet background */}
      <div className="absolute inset-0 notebook-grid opacity-35 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-amber/5 via-transparent to-brand-blue/5 pointer-events-none" />

      {/* Decorative notebook binding spiral holes - hidden on mobile for touch zone safety */}
      <div className="hidden sm:flex absolute left-4 top-0 bottom-0 flex-col justify-around py-8 w-4 pointer-events-none opacity-40">
        {Array.from({ length: 16 }).map((_, idx) => (
          <div key={idx} className="w-4 h-4 rounded-full bg-brand-navy/15 border-r border-brand-navy/10" />
        ))}
      </div>

      <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 sm:px-8 z-10">
        <div className="relative max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* LEFT COLUMN: Hand-drawn Academic Checklist & Student Planner Card */}
          <div className="lg:col-span-5 order-2 lg:order-1 bg-brand-paper p-5 sm:p-6 rounded-3xl border border-brand-navy/12 shadow-md relative text-left">
            <div className="absolute left-6 top-0 bottom-0 w-[1.5px] bg-brand-coral/20" />
            
            <div className="pl-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-brand-navy/8">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-navy/50 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-brand-blue" /> Student Kit Preparation
                </span>
                <span className="text-[10px] font-mono text-brand-coral font-bold uppercase">
                  {checklistItems.filter(item => progress >= item.progressTrigger).length} / {checklistItems.length} READY
                </span>
              </div>

              <p className="text-[11px] font-serif italic text-brand-navy/60">
                Cramming and arranging items inside your study bag before class gates lock...
              </p>

              <ul className="space-y-3 pt-1">
                {checklistItems.map((item) => {
                  const isPacked = progress >= item.progressTrigger;
                  return (
                    <motion.li 
                      key={item.id}
                      className="flex items-center justify-between gap-3 text-xs"
                      animate={{ opacity: isPacked ? 1 : 0.45 }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base filter drop-shadow-sm">{item.icon}</span>
                        <span className={`font-semibold ${isPacked ? 'line-through text-brand-navy/40 font-mono' : 'text-brand-ink font-sans'}`}>
                          {item.label}
                        </span>
                      </div>
                      <div>
                        {isPacked ? (
                          <div className="w-5 h-5 rounded-full bg-brand-green/10 border border-brand-green flex items-center justify-center text-brand-green">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-dashed border-brand-navy/20 bg-brand-navy/2" />
                        )}
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: The Interactive Desk (Alarm & Coffee Steamer Mug) */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8">
            
            {/* Main Titles */}
            <div className="space-y-2">
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="inline-flex items-center gap-1 px-3 py-1 bg-brand-navy/5 border border-brand-navy/10 rounded-full text-[10px] font-mono tracking-wider text-brand-navy font-black uppercase"
              >
                <Zap className="w-3 h-3 text-brand-amber animate-pulse" />
                <span>Dusk Prep Interactive Simulator</span>
              </motion.div>
              
              <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-brand-ink leading-none">
                EYYSAT <span className="text-brand-blue italic font-medium">CITY</span>
              </h1>
              <p className="text-[10px] sm:text-xs font-mono tracking-widest text-brand-navy/50 font-bold uppercase">
                ★ Campus Board Survival Workspace ★
              </p>
            </div>

            {/* Interactive Desk Surface & Assets */}
            <div className="relative w-full max-w-sm h-40 sm:h-48 bg-brand-navy/3 border border-brand-navy/8 rounded-3xl p-5 flex items-center justify-around overflow-visible">
              
              {/* Ambient wood grains on desk sketch */}
              <div className="absolute inset-x-4 top-1/2 h-0.5 border-t border-dashed border-brand-navy/8 pointer-events-none" />
              
              {/* CLICK INSTRUCTION ARROWS AND STICKER */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-coral text-white text-[9px] font-mono font-black py-0.5 px-3 rounded-full shadow-md uppercase tracking-widest flex items-center gap-1.5 animate-pulse whitespace-nowrap">
                <Smile className="w-3 h-3" /> Tap objects to brew speed!
              </div>

              {/* INTERACTIVE ALARM CLOCK */}
              <motion.button
                onClick={handleSnooze}
                disabled={progress >= 100}
                className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-brand-paper border-2 border-brand-navy border-b-4 hover:bg-brand-amber/5 active:border-b-2 cursor-pointer transition-all shadow-md focus:outline-none relative ${
                  isAlarmShaking ? 'animate-[bounce_0.2s_infinite]' : ''
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Ticking Bell ears */}
                <div className="absolute -top-2 left-2 w-4 h-2 bg-brand-coral border border-brand-navy rounded-t-full rotate-[-30deg]" />
                <div className="absolute -top-2 right-2 w-4 h-2 bg-brand-coral border border-brand-navy rounded-t-full rotate-[30deg]" />
                
                <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-brand-coral" />
                <span className="text-[9px] font-mono font-black uppercase text-brand-navy mt-1.5">SNOOZE CLOCK</span>
              </motion.button>

              {/* INTERACTIVE STEAM COFFEE CUP */}
              <motion.button
                onClick={handleBrew}
                disabled={progress >= 100}
                className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-brand-paper border-2 border-brand-navy border-b-4 hover:bg-brand-blue/5 active:border-b-2 cursor-pointer transition-all shadow-md focus:outline-none relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated steam wisps */}
                <div className="absolute -top-5 flex gap-1 justify-center w-full">
                  <motion.div 
                    animate={{ y: [0, -10], opacity: [0.6, 0] }} 
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'easeOut' }}
                    className="w-1.5 h-3 bg-brand-blue/20 rounded-full" 
                  />
                  <motion.div 
                    animate={{ y: [0, -12], opacity: [0.7, 0] }} 
                    transition={{ repeat: Infinity, duration: 1.4, delay: 0.3, ease: 'easeOut' }}
                    className="w-1.5 h-4.5 bg-brand-blue/15 rounded-full" 
                  />
                  <motion.div 
                    animate={{ y: [0, -8], opacity: [0.5, 0] }} 
                    transition={{ repeat: Infinity, duration: 1, delay: 0.6, ease: 'easeOut' }}
                    className="w-1.5 h-2.5 bg-brand-blue/20 rounded-full" 
                  />
                </div>

                <Coffee className={`w-8 h-8 sm:w-10 sm:h-10 text-brand-blue ${isCoffeeSteaming ? 'scale-110 rotate-[5deg]' : ''} transition-transform`} />
                <span className="text-[9px] font-mono font-black uppercase text-brand-navy mt-1.5">BREW ESPRESSO</span>
              </motion.button>

              {/* FLYING DOODLE FLOATING PARTICLES CANVAS */}
              <div className="absolute inset-0 pointer-events-none overflow-visible">
                <AnimatePresence>
                  {particles.map((p) => (
                    <motion.div
                      key={p.id}
                      initial={{ scale: 0.6, x: 0, y: 0, opacity: 1 }}
                      animate={{ 
                        scale: 1.3, 
                        x: p.x, 
                        y: p.y, 
                        opacity: 0,
                        rotate: p.x > 0 ? 45 : -45
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="absolute top-1/2 left-1/2 -ml-4 -mt-4 text-sm font-mono font-black select-none z-50 filter drop-shadow"
                    >
                      {p.type === 'zzz' ? (
                        <span className="text-brand-coral text-lg font-bold">Zzz</span>
                      ) : (
                        <span className="text-brand-blue text-lg">☕</span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

            </div>

            {/* Progress Timeline Loading Container */}
            <div className="w-full max-w-sm space-y-3 sm:space-y-3.5">
              <div className="flex justify-between items-center text-[10px] font-mono text-brand-blue font-extrabold tracking-widest uppercase">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-brand-amber animate-spin-[5s]" />
                  <span>PREPING ENGINE:</span>
                </span>
                <span className="text-brand-ink text-xs font-black">{Math.floor(progress)}% COMPLETE</span>
              </div>

              {/* High-quality styled dynamic slider bar */}
              <div className="w-full h-3.5 bg-brand-navy/6 border-2 border-brand-navy rounded-full overflow-hidden p-[2px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-blue via-brand-amber to-brand-coral rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Clicks counter encouragement message */}
              {interactiveClicks > 0 && (
                <p className="text-[9px] font-mono text-brand-amber font-extrabold uppercase tracking-wide">
                  ⚡ Energy brewed: +{(interactiveClicks * 5.5).toFixed(0)}% acceleration! ⚡
                </p>
              )}

              {/* Changing Wisdom Sub-statements */}
              <div className="h-10 mt-2 sm:mt-3 relative">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={thoughtIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.16 }}
                    className="text-xs font-mono font-bold text-brand-navy/60 leading-relaxed max-w-xs mx-auto italic"
                  >
                    "{studentThoughts[thoughtIndex]}"
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
