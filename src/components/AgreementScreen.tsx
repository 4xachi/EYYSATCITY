import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, CheckSquare, Square, ChevronRight } from 'lucide-react';
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
    <div className="w-full flex-grow flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-2xl bg-zinc-950/80 backdrop-blur-md rounded-2xl border border-cyan-500/30 overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.1)] relative"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500" />
        
        <div className="p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/50 flex items-center justify-center border border-cyan-500/30">
              <AlertTriangle className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-widest uppercase">System Initialization</h1>
              <p className="text-xs text-indigo-400 font-mono tracking-wider">EYYSAT CITY Protocol v1.0</p>
            </div>
          </div>

          <div className="space-y-6 text-zinc-300 font-sans text-sm md:text-base leading-relaxed h-[40vh] md:h-auto overflow-y-auto pr-2 custom-scrollbar">
            <p>
              Welcome to <span className="text-cyan-400 font-bold">EYYSAT CITY</span>, a futuristic student life simulator.
            </p>
            <p>
              This interactive experience is designed to simulate the rigorous decision-making, stress management, and resource allocation required to survive a modern academic week in a hyper-competitive city.
            </p>
            
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-white font-bold mb-2 uppercase tracking-wide text-xs">Developed By:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span className="font-mono text-cyan-200">Cabading, Rhon Kyel</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span className="font-mono text-cyan-200">Estrada, John Mark</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span className="font-mono text-cyan-200">Frago, John Eric</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span className="font-mono text-cyan-200">Linas, John Rhey</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span className="font-mono text-cyan-200">Parenas, Elbhert John</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span className="font-mono text-cyan-200">kung sino ka man</span>
                </li>
              </ul>
            </div>
            
            <p className="text-xs text-zinc-500 italic">
              Warning: Choices made within the simulation have direct consequences on your virtual metrics (Energy, Focus, Grades, Money, Stress, Social). Proceed with calculated intent.
            </p>
          </div>

          <div className="mt-8 border-t border-zinc-800 pt-6">
            <div 
              className="flex items-center gap-3 cursor-pointer group mb-6 w-max"
              onClick={handleAgreeClick}
            >
              <div className="text-cyan-400 relative">
                {agreed ? (
                  <CheckSquare className="w-6 h-6" />
                ) : (
                  <Square className="w-6 h-6 text-zinc-600 group-hover:text-cyan-500 transition-colors" />
                )}
              </div>
              <span className={`text-sm select-none transition-colors ${agreed ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                I acknowledge the simulation parameters and wish to enter.
              </span>
            </div>

            <motion.button
              whileHover={agreed ? { scale: 1.02, boxShadow: '0 0 20px rgba(6,182,212,0.4)' } : {}}
              whileTap={agreed ? { scale: 0.98 } : {}}
              onClick={handleEnterClick}
              disabled={!agreed}
              className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold tracking-widest uppercase transition-all duration-300 ${
                agreed 
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.2)] cursor-pointer' 
                  : 'bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed'
              }`}
            >
              <span>Initialize Matrix</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
