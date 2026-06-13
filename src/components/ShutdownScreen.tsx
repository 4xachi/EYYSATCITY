import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PowerOff, 
  Instagram, 
  AlertTriangle, 
  Terminal, 
  KeyRound, 
  ArrowRight, 
  Cpu, 
  Unlock, 
  Lock,
  Compass
} from 'lucide-react';
import { playClickSound, playWarningSound, playPositiveSound } from '../utils/audio';

interface ShutdownScreenProps {
  onActivate: () => void;
  soundEnabled?: boolean;
}

type DecryptStatus = 'idle' | 'parsing' | 'computing' | 'verifying' | 'granted' | 'failed';

const DECRYPT_TICKS: Record<Exclude<DecryptStatus, 'idle'>, string> = {
  parsing: '⚙️ PARSING ACTIVATION CARRIER...',
  computing: '⚡ COMPUTING SHA-256 ENCRYPTED DIGEST...',
  verifying: '🔍 COMPARING SECURITY CHECKSUM VECTOR...',
  granted: '✨ MATCH OK. RELEASING SYSTEM CORES...',
  failed: '❌ CHECKSUM MISMATCH. ACCESS DENIED.'
};

export default function ShutdownScreen({ onActivate, soundEnabled = true }: ShutdownScreenProps) {
  const [keyInput, setKeyInput] = useState('');
  const [status, setStatus] = useState<DecryptStatus>('idle');
  const [tickerProgress, setTickerProgress] = useState(0);
  const [activeCrosshair, setActiveCrosshair] = useState<{x: number, y: number} | null>(null);

  // Track cursor coordinates for reactive high-tech crosshairs
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Scale coordinates relative to viewport
      setActiveCrosshair({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const runDecryptionPipeline = async (inputStr: string) => {
    const timer = (ms: number) => new Promise(res => setTimeout(res, ms));
    
    // Step 1: Parsing
    setStatus('parsing');
    setTickerProgress(20);
    playClickSound(soundEnabled);
    await timer(450);

    // Step 2: Computing
    setStatus('computing');
    setTickerProgress(50);
    playClickSound(soundEnabled);
    await timer(500);

    // Step 3: Verifying
    setStatus('verifying');
    setTickerProgress(80);
    playClickSound(soundEnabled);
    await timer(600);

    try {
      const enc = new TextEncoder();
      const hashBuffer = await crypto.subtle.digest('SHA-256', enc.encode(inputStr.trim()));
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      // Target hash for "050711" is feace7fdc9515f563c82594b7f0a054a09bc44db943be82ddc470f9bf7617cf8
      if (hashHex === 'feace7fdc9515f563c82594b7f0a054a09bc44db943be82ddc470f9bf7617cf8') {
        setStatus('granted');
        setTickerProgress(100);
        playPositiveSound(soundEnabled);
        await timer(800);
        onActivate();
      } else {
        setStatus('failed');
        setTickerProgress(0);
        playWarningSound(soundEnabled);
        await timer(1500);
        setStatus('idle');
        setKeyInput('');
      }
    } catch (err) {
      console.error(err);
      setStatus('failed');
      setTickerProgress(0);
      playWarningSound(soundEnabled);
      await timer(1200);
      setStatus('idle');
      setKeyInput('');
    }
  };

  const handleActivateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'idle' || !keyInput.trim()) return;
    runDecryptionPipeline(keyInput);
  };

  return (
    <div className="min-h-screen w-full bg-brand-ink flex flex-col items-center justify-center p-4 sm:p-8 notebook-grid relative overflow-y-auto select-none">
      
      {/* Decorative High-Tech Grid Backdrops */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0.5),rgba(255,255,255,0))] bg-[length:100%_4px] mix-blend-overlay" />
      
      {/* Absolute floating circuit design symbols drifting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-32 h-32 rounded-full border border-brand-paper/5 animate-[spin_40s_linear_infinite]" />
        <div className="absolute bottom-[15%] right-[5%] w-48 h-48 rounded-full border border-brand-cream/5 animate-[spin_60s_linear_infinite]" />
        
        {/* Responsive reactive crosshair elements following viewport cursor loosely */}
        {activeCrosshair && (
          <div 
            style={{ 
              transform: `translate3d(${activeCrosshair.x}px, ${activeCrosshair.y}px, 0)`,
              transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
            className="absolute top-10 right-14 text-brand-paper/10 hidden md:block"
          >
            <Compass className="w-16 h-16 animate-pulse" />
          </div>
        )}
      </div>

      {/* Main Container with generous margin auto wrapper to stop top-part height cuts on small phones */}
      <div className="w-full max-w-md py-8 flex flex-col items-center justify-center relative z-10">
        
        {/* Floating Pulsing Top Lock Bracket */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 z-30"
        >
          <div className="w-16 h-16 bg-brand-navy rounded-2xl flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(33,39,52,0.4)] border-4 border-brand-paper rotate-3 hover:rotate-6 transition-all relative group cursor-pointer">
            {status === 'granted' ? (
              <Unlock className="w-7 h-7 text-green-400" />
            ) : status === 'failed' ? (
              <Lock className="w-7 h-7 text-brand-coral animate-bounce" />
            ) : (
              <PowerOff className="w-7 h-7 text-brand-coral animate-pulse" />
            )}
            
            {/* Pulsing indicator ring */}
            <span className="absolute -inset-1 rounded-2xl border-2 border-brand-coral/25 animate-ping opacity-60 pointer-events-none" />
          </div>
        </motion.div>

        {/* Premium Academic RESTRICTED Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.93, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className={`relative w-full bg-brand-paper rounded-[2.5rem] p-7 md:p-8 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] border-4 border-brand-navy overflow-hidden transition-all duration-300 ${
            status === 'failed' ? 'ring-8 ring-brand-coral/30 border-brand-coral shadow-brand-coral/10 scale-[0.98]' : ''
          }`}
        >
          {/* Aesthetic Danger Warning Stripes at top and bottom */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-brand-coral via-brand-amber to-brand-blue" />
          
          {/* Diagonal Stamp: DECOMMISSIONED & ARCHIVED */}
          <AnimatePresence>
            {status !== 'granted' && (
              <motion.div 
                initial={{ scale: 2.2, rotate: -25, opacity: 0 }}
                animate={{ scale: 1, rotate: -16, opacity: 0.16 }}
                transition={{ type: "spring", mass: 1.2, stiffness: 180, delay: 0.4 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1]"
              >
                <div className="border-8 border-dashed border-brand-coral px-6 py-3 font-mono font-black text-4xl uppercase tracking-widest text-brand-coral text-center rounded-3xl">
                  DECOMMISSIONED<br/>
                  <span className="text-xl">TERM COMPLETED</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Core Content */}
          <div className="relative z-10 space-y-7">
            
            {/* Header Section */}
            <div className="text-center space-y-3.5">
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-brand-ink uppercase tracking-tight leading-none mb-1">
                Simulation<br/>Shutdown
              </h1>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-coral/10 border border-brand-coral/20 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-brand-coral" />
                <span className="text-[10px] font-mono font-extrabold text-brand-coral uppercase tracking-widest">
                  DECREE #507-11 INACTIVE
                </span>
              </div>
            </div>

            {/* Explainer paragraph */}
            <p className="text-xs sm:text-sm font-medium text-brand-navy/80 leading-relaxed text-center px-2">
              The <strong className="text-brand-ink font-bold">Campus Board Survival</strong> simulator has officially shut down following the conclusion of its presentation phase. Core modules are sealed.
            </p>

            {/* Reactivation Sandbox Frame */}
            <div className="bg-brand-cream/55 border border-brand-navy/10 rounded-2xl p-5 shadow-inner">
              <h3 className="text-[9px] font-mono font-black text-brand-navy/55 uppercase tracking-[0.25em] mb-4 text-center">
                🔑 INSTANT DECRYPTION MODULE
              </h3>
              
              {/* Instagram Touchpoint Button */}
              <a 
                href="https://instagram.com/j.estrada_dev" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => playClickSound(soundEnabled)}
                className="group flex flex-col items-center gap-3 p-3.5 bg-white border-2 border-brand-navy/10 rounded-xl hover:border-brand-blue hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer mb-5 text-decoration-none"
              >
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Instagram className="w-5.5 h-5.5 text-white" />
                </div>
                <div className="text-center space-y-0.5">
                  <span className="block text-sm font-black text-brand-ink group-hover:text-brand-blue transition-colors">
                    @j.estrada_dev
                  </span>
                  <span className="block text-[10px] font-mono font-bold text-brand-navy/50">
                    Send DM to request key credentials
                  </span>
                </div>
              </a>

              {/* Secure Input Decrypter State Machine */}
              <div className="relative">
                {status === 'idle' ? (
                  <form onSubmit={handleActivateSubmit} className="relative">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <KeyRound className="h-4.5 w-4.5 text-brand-navy/40" />
                      </div>
                      <input
                        type="password"
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        placeholder="Enter Activation Key"
                        disabled={status !== 'idle'}
                        maxLength={25}
                        className="w-full pl-10 pr-11 py-3 bg-white border-2 border-brand-navy/15 rounded-xl text-sm font-bold placeholder:text-brand-navy/35 text-brand-ink focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 transition-all shadow-sm"
                      />
                      <button
                        type="submit"
                        disabled={!keyInput.trim()}
                        className="absolute inset-y-1 right-1.5 px-3 bg-brand-blue hover:bg-brand-blue/95 disabled:bg-brand-navy/5 disabled:text-brand-navy/25 text-white rounded-lg flex items-center justify-center transition-colors focus:outline-none"
                      >
                        <ArrowRight className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </form>
                ) : (
                  // Active interactive terminal decrypt log
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className={`p-4 rounded-xl font-mono text-[11px] leading-relaxed border flex flex-col space-y-2.5 shadow-inner ${
                      status === 'granted' 
                        ? 'bg-emerald-950/95 border-emerald-500/30 text-emerald-300' 
                        : status === 'failed' 
                        ? 'bg-rose-950/95 border-rose-500/30 text-rose-300' 
                        : 'bg-brand-navy text-brand-paper border-brand-navy'
                    }`}
                  >
                    <div className="flex items-center gap-2 justify-between">
                      <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                        <Cpu className={`w-3.5 h-3.5 ${status !== 'granted' && status !== 'failed' ? 'animate-spin' : ''}`} />
                        {status === 'granted' ? 'INTEGRITY OK' : status === 'failed' ? 'CHECKSUM FAIL' : 'DECRYPTING CORE'}
                      </span>
                      <span className="text-[10px] font-black">{tickerProgress}%</span>
                    </div>

                    {/* Simulation progress bar */}
                    <div className="w-full h-1.5 bg-brand-paper/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: '0%' }}
                        animate={{ width: `${tickerProgress}%` }}
                        transition={{ duration: 0.3 }}
                        className={`h-full ${
                          status === 'granted' 
                            ? 'bg-emerald-400' 
                            : status === 'failed' 
                            ? 'bg-rose-500' 
                            : 'bg-brand-blue'
                        }`}
                      />
                    </div>

                    <div className="min-h-[1.5rem] font-bold">
                      {DECRYPT_TICKS[status as Exclude<DecryptStatus, 'idle'>] || 'PREPARING SECTOR DECIPHERING...'}
                    </div>
                  </motion.div>
                )}
              </div>

            </div>

            {/* Interactive metadata footer markings */}
            <div className="flex items-center justify-between text-[9px] font-mono text-brand-navy/45 border-t border-brand-navy/10 pt-4 px-1">
              <span>PROJECT CODE: INSTANT_LOCK</span>
              <span>ESTEEM: HIGH</span>
            </div>

          </div>
        </motion.div>

        {/* Minimal friendly footer metadata label */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-[10px] font-mono text-brand-paper font-semibold tracking-wide text-center"
        >
          COORDINATED DIRECTLY BY J.ESTRADA_DEV © 2026
        </motion.p>
      </div>

    </div>
  );
}
