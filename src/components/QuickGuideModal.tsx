import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, HeartPulse, Battery, BookOpen } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface QuickGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
}

export default function QuickGuideModal({ isOpen, onClose, soundEnabled }: QuickGuideModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           onClick={() => {
             playClickSound(soundEnabled);
             onClose();
           }}
           className="absolute inset-0 bg-brand-ink/40 backdrop-blur-[3px] cursor-pointer"
        />

        <motion.div
           initial={{ scale: 0.93, y: 15, opacity: 0 }}
           animate={{ scale: 1, y: 0, opacity: 1, transition: { type: "spring", stiffness: 350, damping: 25 } }}
           exit={{ scale: 0.93, y: 15, opacity: 0, transition: { duration: 0.15 } }}
           className="relative max-w-md w-full bg-brand-paper border-2 border-brand-navy rounded-3xl p-6 shadow-xl overflow-hidden z-[310]"
        >
          {/* Decorative design line */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-blue via-brand-coral to-brand-amber" />
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-serif font-extrabold text-brand-ink tracking-tight flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-brand-blue" />
              Quick Guide
            </h3>
            <button
               onClick={() => {
                 playClickSound(soundEnabled);
                 onClose();
               }}
               className="p-1.5 rounded-full hover:bg-brand-navy/10 text-brand-navy/60 hover:text-brand-navy transition-colors focus:outline-none"
               aria-label="Close Guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <p className="text-sm text-brand-navy/80 font-medium">
              Welcome to the Campus Board Survival! Your goal is to balance your Academic, Social, and Personal life efficiently. Keep an eye on these two vital stats:
            </p>

            <div className="bg-brand-cream/50 border border-brand-coral/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <HeartPulse className="w-5 h-5 text-brand-coral" />
                <h4 className="font-bold text-brand-ink uppercase text-sm">Managing Stress</h4>
              </div>
              <ul className="text-sm text-brand-navy/80 space-y-1.5 list-disc pl-4">
                <li>High stress (&gt;80) can lead to burnout or bad decisions.</li>
                <li>Take breaks, sleep well, and socialize to lower stress.</li>
                <li>Cramming and ignoring problems will quickly raise it.</li>
              </ul>
            </div>

            <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Battery className="w-5 h-5 text-brand-blue" />
                <h4 className="font-bold text-brand-ink uppercase text-sm">Conserving Energy</h4>
              </div>
              <ul className="text-sm text-brand-navy/80 space-y-1.5 list-disc pl-4">
                <li>Low energy (&lt;25) reduces your focus and limits your choices.</li>
                <li>Rest properly and eat meals to restore energy.</li>
                <li>Use items from the Campus Shop for a quick boost.</li>
              </ul>
            </div>
            
            <p className="text-xs text-brand-navy/60 font-medium italic mt-4 text-center">
              Remember: It's all about balance. Good luck!
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
