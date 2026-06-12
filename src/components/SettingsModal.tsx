/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  X, 
  Volume2, 
  VolumeX, 
  FastForward, 
  Sun, 
  Moon, 
  Sparkles,
  HelpCircle,
  Trash2,
  Info,
  ChevronLeft
} from 'lucide-react';
import { playClickSound } from '../utils/audio';
import AgreementScreen from './AgreementScreen';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  fastForwardEnabled: boolean;
  onToggleFastForward: () => void;
  darkModeEnabled: boolean;
  onToggleDarkMode: () => void;
  onDeleteData: () => void;
  studentName?: string;
  onNameChange?: (name: string) => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  soundEnabled,
  onToggleSound,
  fastForwardEnabled,
  onToggleFastForward,
  darkModeEnabled,
  onToggleDarkMode,
  onDeleteData,
  studentName = '',
  onNameChange
}: SettingsModalProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [activeView, setActiveView] = useState<'settings' | 'about'>('settings');
  const [tempName, setTempName] = useState(studentName);

  // Sync temp name when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setTempName(studentName);
      setActiveView('settings');
    }
  }, [isOpen, studentName]);

  const handleNameBlur = () => {
    if (onNameChange && tempName.trim().length >= 2) {
      onNameChange(tempName.trim());
    } else {
      setTempName(studentName); // Revert if invalid
    }
  };

  if (!isOpen) {
    if (confirmDelete) setConfirmDelete(false);
    return null;
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-ink/40 backdrop-blur-[3px] cursor-pointer"
        />

        {activeView === 'about' && (
          <div className="relative z-[260] w-full max-w-2xl">
              <AgreementScreen 
                isSettingsMode={true} 
                onClose={() => setActiveView('settings')}
                onAgree={() => {}}
                soundEnabled={soundEnabled}
                initialStudentName={studentName}
              />
          </div>
        )}

        {/* Modal content */}
        {activeView === 'settings' && (
        <motion.div
          initial={{ scale: 0.93, y: 15, opacity: 0 }}
          animate={{ 
            scale: 1, 
            y: 0, 
            opacity: 1,
            transition: { type: 'spring', stiffness: 420, damping: 25 }
          }}
          exit={{ 
            scale: 0.93, 
            y: 10, 
            opacity: 0,
            transition: { duration: 0.15 }
          }}
          className="relative max-w-sm w-full bg-brand-paper border-2 border-brand-navy rounded-3xl p-6 shadow-[0_12px_36px_rgba(33,39,52,0.18)] overflow-hidden z-[260]"
        >
          {/* Decorative design line */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-blue via-brand-coral to-brand-amber" />

          {/* Close corner button */}
          <button
            onClick={() => {
              playClickSound(soundEnabled);
              onClose();
            }}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-brand-navy/5 text-brand-navy/60 hover:text-brand-ink transition-colors cursor-pointer focus:outline-none"
            aria-label="Close Settings"
            id="close-settings-btn"
          >
            <X className="w-4.5 h-4.5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-6 mt-1">
            <div className="p-2 rounded-xl bg-brand-blue/10 border border-brand-blue/20 text-brand-blue">
              <Settings className="w-5 h-5 animate-[spin_8s_linear_infinite]" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-black tracking-tight text-brand-ink">
                Simulation Settings
              </h3>
              <p className="text-[10px] font-mono text-brand-navy/60 uppercase tracking-widest font-bold">
                Configure your survival week
              </p>
            </div>
          </div>

          {/* Settings list */}
          <div className="space-y-4.5 max-h-[60vh] overflow-y-auto pr-1">
            {/* Enrollment Name Input */}
            <div className="p-3 rounded-2xl bg-brand-cream/40 border border-brand-navy/5">
              <label className="block text-xs font-sans font-black text-brand-ink uppercase tracking-wide mb-2 flex items-center gap-2">
                <span className="p-1 rounded bg-brand-blue/10 text-brand-blue border border-brand-blue/20"><Sparkles className="w-3 h-3" /></span>
                Student Name / ID
              </label>
              <input 
                type="text" 
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onBlur={handleNameBlur}
                placeholder="Enter new name..."
                maxLength={30}
                className="w-full px-3 py-2 bg-brand-paper border border-brand-navy/15 rounded-xl text-sm font-bold text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-blue"
              />
            </div>
            {/* Setting 1: Dark Mode */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-brand-cream/40 border border-brand-navy/5">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl border ${
                  darkModeEnabled 
                    ? 'bg-brand-lavender/10 border-brand-lavender/25 text-brand-lavender' 
                    : 'bg-brand-amber/10 border-brand-amber/25 text-brand-amber'
                }`}>
                  {darkModeEnabled ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
                </div>
                <div>
                  <h4 className="text-xs font-sans font-black text-brand-ink uppercase tracking-wide">
                    Dark Mode Theme
                  </h4>
                  <p className="text-[10px] text-brand-navy/65 font-medium">
                    Soothing palette for study nights
                  </p>
                </div>
              </div>

              {/* Toggle switch Button */}
              <button
                id="toggle-darkmode-switch"
                onClick={() => {
                  onToggleDarkMode();
                  playClickSound(soundEnabled);
                }}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer focus:outline-none ${
                  darkModeEnabled ? 'bg-brand-blue' : 'bg-brand-navy/20'
                }`}
                aria-label="Toggle Dark Mode"
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  darkModeEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Setting 2: Fast-forward mode */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-brand-cream/40 border border-brand-navy/5">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl border ${
                  fastForwardEnabled 
                    ? 'bg-brand-coral/10 border-brand-coral/25 text-brand-coral' 
                    : 'bg-brand-navy/10 border-brand-navy/15 text-brand-navy/40'
                }`}>
                  <FastForward className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-sans font-black text-brand-ink uppercase tracking-wide flex items-center gap-1">
                    Fast-Forward
                    {fastForwardEnabled && <span className="text-[9px] text-brand-coral">⚡</span>}
                  </h4>
                  <p className="text-[10px] text-brand-navy/65 font-medium max-w-[190px]">
                    Skips reflection journal logging screens (Ideal for multi-run players)
                  </p>
                </div>
              </div>

              {/* Toggle switch Button */}
              <button
                id="toggle-fastforward-switch"
                onClick={() => {
                  onToggleFastForward();
                  playClickSound(soundEnabled);
                }}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer focus:outline-none ${
                  fastForwardEnabled ? 'bg-brand-coral' : 'bg-brand-navy/20'
                }`}
                aria-label="Toggle Fast Forward Mode"
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  fastForwardEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Setting 3: Sound Effects */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-brand-cream/40 border border-brand-navy/5">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl border ${
                  soundEnabled 
                    ? 'bg-brand-green/10 border-brand-green/25 text-brand-green' 
                    : 'bg-brand-navy/10 border-brand-navy/15 text-brand-navy/40'
                }`}>
                  {soundEnabled ? <Volume2 className="w-4.5 h-4.5" /> : <VolumeX className="w-4.5 h-4.5" />}
                </div>
                <div>
                  <h4 className="text-xs font-sans font-black text-brand-ink uppercase tracking-wide">
                    Sound Effects
                  </h4>
                  <p className="text-[10px] text-brand-navy/65 font-medium">
                    Decision clicks, achievements, and warnings
                  </p>
                </div>
              </div>

              {/* Toggle switch Button */}
              <button
                id="toggle-sound-switch"
                onClick={() => {
                  onToggleSound();
                  // play click sound immediately to provide immediate feedback
                  setTimeout(() => playClickSound(!soundEnabled), 50);
                }}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer focus:outline-none ${
                  soundEnabled ? 'bg-brand-green' : 'bg-brand-navy/20'
                }`}
                aria-label="Toggle Sounds"
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Setting 4: Reset Local Data */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-brand-cream/40 border border-brand-navy/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl border bg-brand-coral/10 border-brand-coral/25 text-brand-coral">
                  <Trash2 className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-sans font-black text-brand-coral uppercase tracking-wide">
                    Delete Data
                  </h4>
                  <p className="text-[10px] text-brand-coral/80 font-medium">
                    Clear local saves & start over
                  </p>
                </div>
              </div>

              {/* Delete Button */}
              <button
                id="delete-data-btn"
                onClick={() => {
                  playClickSound(soundEnabled);
                  if (confirmDelete) {
                    onDeleteData();
                    setConfirmDelete(false);
                  } else {
                    setConfirmDelete(true);
                    setTimeout(() => setConfirmDelete(false), 3000); // Reset after 3 seconds
                  }
                }}
                className={`px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider hover:scale-105 transition-all focus:outline-none ${
                  confirmDelete 
                    ? 'bg-brand-coral text-white' 
                    : 'bg-brand-coral/10 text-brand-coral hover:bg-brand-coral/20'
                }`}
                aria-label="Delete Local Data"
              >
                {confirmDelete ? "Confirm?" : "Reset"}
              </button>
            </div>
            {/* Setting 5: About App & Agreement */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-brand-cream/40 border border-brand-navy/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl border bg-brand-blue/10 border-brand-blue/25 text-brand-blue">
                  <Info className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-sans font-black text-brand-ink uppercase tracking-wide">
                    About App & Terms
                  </h4>
                  <p className="text-[10px] text-brand-navy/65 font-medium">
                    View developers and enroll decree
                  </p>
                </div>
              </div>

              {/* View Button */}
              <button
                onClick={() => {
                  playClickSound(soundEnabled);
                  setActiveView('about');
                }}
                className="px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider hover:scale-105 transition-all focus:outline-none bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20"
                aria-label="View About App"
              >
                View
              </button>
            </div>
          </div>

          {/* Footer / Info Hint */}
          <div className="mt-5.5 flex items-start gap-2 text-[10px] text-brand-navy/50 font-mono">
            <HelpCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-brand-blue" />
            <span className="leading-normal">
              Eyysat City automatically persists these parameters in your local workspace memory for successive runs.
            </span>
          </div>

          {/* Confirm Button */}
          <div className="mt-5">
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-brand-navy text-brand-paper hover:bg-brand-navy/95 border border-brand-navy font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer focus:outline-none"
            >
              Done / Return to Study
            </button>
          </div>
        </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
