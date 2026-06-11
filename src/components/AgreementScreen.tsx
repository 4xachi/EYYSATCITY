/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, CheckSquare, Square, ChevronRight } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface AgreementScreenProps {
  onAgree: () => void;
  soundEnabled: boolean;
}

export default function AgreementScreen({ onAgree, soundEnabled }: AgreementScreenProps) {
  const [agreed, setAgreed] = useState(false);

  const handleAgreeClick = () => {
    setAgreed(!agreed);
    playClickSound(soundEnabled);
  };

  const handleEnterClick = () => {
    if (agreed) {
      playClickSound(soundEnabled);
      onAgree();
    }
  };

  return (
    <div className="w-full max-w-2xl my-auto select-none">
      <motion.div 
        className="w-full bg-brand-paper rounded-3xl border border-brand-navy/15 overflow-hidden shadow-[0_16px_48px_rgba(30,42,68,0.08)] relative"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="absolute top-0 inset-x-0 h-[4px] bg-gradient-to-r from-brand-blue via-brand-amber to-brand-coral" />
        
        <div className="p-6 sm:p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6 border-b border-brand-navy/10 pb-4">
            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center border border-brand-blue/15 shrink-0">
              <GraduationCap className="w-5 h-5 text-brand-blue" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-extrabold text-brand-ink tracking-tight">Academic Honor Code</h1>
              <p className="text-[10px] sm:text-xs text-brand-navy/50 font-mono tracking-widest uppercase font-bold">EYYSAT ACADEMY // ENROLLMENT DECREE</p>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5 text-brand-navy/80 font-sans text-sm md:text-base leading-relaxed">
            <p>
              Welcome to <span className="text-brand-blue font-bold">Eyysat City</span>, an interactive high-school and college-life survival simulator.
            </p>
            <p>
              To claim an academic victory, you must establish a balanced lifestyle between sleep hours, exam preparation, budgeting your allowance, and group study dynamics. High grades alone are useless if you crash on energy or suffer high levels of stress.
            </p>
            
            {/* Faculty Registry Board representing development roster */}
            <div className="bg-brand-cream border border-brand-navy/10 rounded-2xl p-5 shadow-sm">
              <h3 className="text-brand-ink font-bold mb-3 uppercase tracking-wider text-[10px] font-mono">Simulators Designed & Built By:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-blue" />
                  <span className="text-xs sm:text-sm font-semibold text-brand-ink">Cabading, Rhon Kyel</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-amber" />
                  <span className="text-xs sm:text-sm font-semibold text-brand-ink">Estrada, John Mark</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-coral" />
                  <span className="text-xs sm:text-sm font-semibold text-brand-ink">Frago, John Eric</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-blue/80" />
                  <span className="text-xs sm:text-sm font-semibold text-brand-ink">Linas, John Rhey</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-lavender" />
                  <span className="text-xs sm:text-sm font-semibold text-brand-ink">Parenas, Elbhert John</span>
                </li>
              </ul>
            </div>
            
            <p className="text-xs text-brand-navy/55 leading-normal italic pl-3 border-l-2 border-brand-coral">
              Disclaimer: Choices made within the simulation have immediate, integrated consequences on student metrics. Advance with focused, balanced intent.
            </p>
          </div>

          <div className="mt-6 sm:mt-8 border-t border-brand-navy/10 pt-6">
            <div 
              className="flex items-start gap-3 cursor-pointer group mb-6 w-full"
              onClick={handleAgreeClick}
            >
              <div className="text-brand-blue relative mt-0.5 shrink-0">
                {agreed ? (
                  <CheckSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Square className="w-5 h-5 sm:w-6 sm:h-6 text-brand-navy/25 group-hover:text-brand-blue transition-colors" />
                )}
              </div>
              <span className={`text-xs sm:text-sm select-none transition-colors font-medium leading-snug ${agreed ? 'text-brand-ink font-semibold' : 'text-brand-navy/60 group-hover:text-brand-navy/85'}`}>
                I acknowledge the academic balance criteria and wish to enroll.
              </span>
            </div>

            <motion.button
              whileHover={agreed ? { scale: 1.01 } : {}}
              whileTap={agreed ? { scale: 0.99 } : {}}
              onClick={handleEnterClick}
              disabled={!agreed}
              className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold tracking-widest uppercase text-xs sm:text-sm transition-all duration-300 ${
                agreed 
                  ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/15 cursor-pointer' 
                  : 'bg-brand-cream text-brand-navy/30 border border-brand-navy/5 cursor-not-allowed'
              }`}
            >
              <span>Begin Term Enrollment</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
