/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  AlertTriangle, 
  ZapOff, 
  Sparkles, 
  DollarSign, 
  Users, 
  Target, 
  X,
  Compass
} from 'lucide-react';

export type MilestoneType = 'celebration' | 'caution';

export interface MilestoneTrigger {
  id: string;
  type: MilestoneType;
  title: string;
  message: string;
  badgeCode?: string;
  icon: React.ReactNode;
  themeColor: string; // Tailwind color name like 'amber', 'coral', 'blue' etc
}

interface MilestoneOverlayProps {
  activeMilestone: MilestoneTrigger | null;
  onDismiss: () => void;
}

export default function MilestoneOverlay({ activeMilestone, onDismiss }: MilestoneOverlayProps) {
  if (!activeMilestone) return null;

  const isCelebration = activeMilestone.type === 'celebration';
  const colorMap: Record<string, { bg: string; border: string; text: string; accent: string; ring: string }> = {
    coral: {
      bg: 'bg-brand-coral/5',
      border: 'border-brand-coral',
      text: 'text-brand-coral',
      accent: 'bg-brand-coral/10',
      ring: 'ring-brand-coral/20'
    },
    blue: {
      bg: 'bg-brand-blue/5',
      border: 'border-brand-blue',
      text: 'text-brand-blue',
      accent: 'bg-brand-blue/10',
      ring: 'ring-brand-blue/20'
    },
    amber: {
      bg: 'bg-brand-amber/5',
      border: 'border-brand-amber',
      text: 'text-brand-amber',
      accent: 'bg-brand-amber/10',
      ring: 'ring-brand-amber/20'
    },
    salmon: {
      bg: 'bg-brand-salmon/5',
      border: 'border-[#E6A085]',
      text: 'text-[#E6A085]',
      accent: 'bg-brand-salmon/10',
      ring: 'ring-brand-salmon/20'
    },
  };

  const colors = colorMap[activeMilestone.themeColor] || colorMap.blue;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onDismiss}
          className="absolute inset-0 bg-brand-ink/40 backdrop-blur-[3px] cursor-pointer"
        />

        {/* Modal body card */}
        <motion.div
          initial={{ scale: 0.9, y: 15, opacity: 0 }}
          animate={{ 
            scale: 1, 
            y: 0, 
            opacity: 1,
            transition: { type: 'spring', stiffness: 380, damping: 26 }
          }}
          exit={{ 
            scale: 0.93, 
            y: 10, 
            opacity: 0,
            transition: { duration: 0.15 }
          }}
          className="relative max-w-md w-full bg-brand-paper border-2 border-brand-navy rounded-3xl p-6 sm:p-7 shadow-[0_12px_36px_rgba(33,39,52,0.18)] text-center overflow-hidden"
        >
          {/* Top colored strip line */}
          <div className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${
            isCelebration 
              ? 'from-brand-blue via-brand-amber to-[#E6A085]' 
              : 'from-brand-coral to-brand-amber'
          }`} />

          {/* Sparkles / warning visual effects backdrops */}
          <div className="absolute inset-x-0 top-0 h-40 pointer-events-none opacity-10 flex items-center justify-center">
            {isCelebration ? (
              <div className="w-full h-full scale-125 bg-[radial-gradient(circle_at_center,rgba(66,133,244,0.15)_0,transparent_70%)] animate-pulse" />
            ) : (
              <div className="w-full h-full scale-125 bg-[radial-gradient(circle_at_center,rgba(235,94,85,0.15)_0,transparent_70%)] animate-pulse" />
            )}
          </div>

          {/* Dismiss top corner cross button */}
          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-brand-navy/5 text-brand-navy/40 hover:text-brand-navy transition-colors cursor-pointer focus:outline-none"
            aria-label="Dismiss milestone"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Milestone circular badge container */}
          <div className="mx-auto mt-2 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.7, rotate: isCelebration ? -10 : 10 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                transition: { 
                  type: 'spring', 
                  stiffness: 400, 
                  damping: 18,
                  delay: 0.08 
                }
              }}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 border-brand-navy relative ${colors.accent} ${colors.text} shadow-sm`}
            >
              {activeMilestone.icon}
              
              {/* Star sparkles of achievement */}
              {isCelebration && (
                <>
                  <Sparkles className="absolute -top-1.5 -left-1.5 w-4 h-4 text-brand-amber animate-pulse" />
                  <Sparkles className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 text-brand-coral animate-pulse" />
                </>
              )}
            </motion.div>
          </div>

          {/* Typography details */}
          <div className="mt-5 space-y-2.5">
            <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 bg-brand-navy/5 border border-brand-navy/8 rounded-full inline-block text-brand-navy/60`}>
              {isCelebration ? '★ Milestone Achieved ★' : '⚠️ Critical Status Alert'}
            </span>
            
            <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-brand-ink leading-tight">
              {activeMilestone.title}
            </h2>
            
            <p className="text-xs sm:text-sm font-sans font-medium text-brand-navy/70 leading-relaxed max-w-sm mx-auto">
              {activeMilestone.message}
            </p>
          </div>

          {/* Dismiss button at base */}
          <div className="mt-6 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onDismiss}
              className={`w-full py-3 px-6 rounded-2xl border-2 border-brand-navy font-mono font-bold text-xs uppercase tracking-wider text-brand-navy shadow-[2px_2px_0px_0px_rgba(33,39,52,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(33,39,52,1)] select-none cursor-pointer hover:bg-brand-navy/5 transition-all focus:outline-none`}
            >
              {isCelebration ? 'Awesome! Keep it Up' : 'Acknowledged, Understood'}
            </motion.button>
          </div>

          {/* Bottom decorative paper details */}
          <div className="absolute bottom-1 right-3 text-[8px] font-mono text-brand-navy/20 uppercase tracking-widest select-none pointer-events-none">
            M-{activeMilestone.id.replace('milestone_', '')}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
