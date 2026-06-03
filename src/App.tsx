/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Settings, 
  Activity, 
  Cpu,
  Tv,
  HelpCircle,
  TrendingUp,
  Volume2,
  VolumeX
} from 'lucide-react';

import { ScreenType, Stats, StudentType, Choice, RandomEvent, FinalResult, Badge, Scenario } from './types/simulation';
import { scenarios, getSequenceOfScenarios } from './data/scenarios';
import { randomEvents } from './data/randomEvents';
import { clampStat, applyEffects, calculateFinalResult, getBadges, calculateFinalScore } from './utils/simulationLogic';
import { saveBestScore, loadBestScore } from './utils/storage';

// Screens
import AnimatedBackground from './components/AnimatedBackground';
import SoundToggle from './components/SoundToggle';
import LoadingScreen from './components/LoadingScreen';
import AgreementScreen from './components/AgreementScreen';
import HeroSection from './components/HeroSection';
import IntroScreen from './components/IntroScreen';
import StudentTypeSelection from './components/StudentTypeSelection';
import SimulationDashboard from './components/SimulationDashboard';
import FinalResultScreen from './components/FinalResultScreen';
import FunctionsSection from './components/FunctionsSection';

import { playClickSound, playWarningSound, playPositiveSound } from './utils/audio';

const initialStats: Stats = {
  energy: 50,
  stress: 50,
  grades: 50,
  money: 50,
  focus: 50,
  social: 50
};

export default function App() {
  // Navigation / Loading state
  const [screen, setScreen] = useState<ScreenType>('loading');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Simulation Core state
  const [selectedStudentType, setSelectedStudentType] = useState<StudentType | null>(null);
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(0);
  const [stats, setStats] = useState<Stats>(initialStats);
  const [hasChosenToday, setHasChosenToday] = useState<boolean>(false);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [statChanges, setStatChanges] = useState<Partial<Stats> | null>(null);
  const [activeScenarios, setActiveScenarios] = useState<Scenario[]>([]);

  // Random event state
  const [randomEvent, setRandomEvent] = useState<RandomEvent | null>(null);

  // Game over state / final computed metrics
  const [finalResult, setFinalResult] = useState<FinalResult | null>(null);
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);

  // Persistent stats
  const [bestScore, setBestScore] = useState<number>(0);
  const [bestResult, setBestResult] = useState<string>('None Yet');

  // Load persistent stats index
  useEffect(() => {
    const backup = loadBestScore();
    setBestScore(backup.score);
    setBestResult(backup.resultTitle);
    setActiveScenarios(getSequenceOfScenarios());
  }, []);

  // Scroll to top of window when screen navigation or simulation day changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [screen, currentDayIndex]);

  // Set selected class starting stats
  const handleSelectStudentType = (student: StudentType) => {
    setActiveScenarios(getSequenceOfScenarios());
    setSelectedStudentType(student);
    setStats({ ...student.startingStats });
    setScreen('simulation');
    setCurrentDayIndex(0);
    setHasChosenToday(false);
    setSelectedChoice(null);
    setStatChanges(null);
  };

  // Select a dilemma option
  const handleSelectChoice = (choice: Choice) => {
    setHasChosenToday(true);
    setSelectedChoice(choice);
    setStatChanges(choice.effects);

    // Apply outcome deltas
    setStats((prevStats) => {
      const nextStats = applyEffects(prevStats, choice.effects);
      
      // Reactive Synth feedback alerts based on new changes and thresholds
      const isExtremeStress = nextStats.stress >= 75;
      const isExtremeFatigue = nextStats.energy <= 30;
      
      if (isExtremeStress || isExtremeFatigue) {
        setTimeout(() => playWarningSound(soundEnabled), 200);
      } else {
        setTimeout(() => playPositiveSound(soundEnabled), 200);
      }

      return nextStats;
    });
  };

  // Proceed transition steps: goes to Random Event screen or Final Score compilation
  const handleProceedFromConsequence = () => {
    const isFriday = currentDayIndex === 4;

    if (isFriday) {
      // Compile final results & awards
      const calculatedResult = calculateFinalResult(stats);
      const calculatedBadges = getBadges(stats, calculatedResult.finalScore);

      setFinalResult(calculatedResult);
      setEarnedBadges(calculatedBadges);

      // Save Best score parameter
      saveBestScore(calculatedResult.finalScore, calculatedResult.title);

      // Update local storage states
      const refreshedStats = loadBestScore();
      setBestScore(refreshedStats.score);
      setBestResult(refreshedStats.resultTitle);

      setScreen('finalResult');
    } else {
      // 0.6 probability (60% chance) for random events
      const willTriggerEvent = Math.random() < 0.6;
      if (willTriggerEvent) {
        const randomIndex = Math.floor(Math.random() * randomEvents.length);
        const event = randomEvents[randomIndex];
        setRandomEvent(event);
      } else {
        setRandomEvent(null);
      }
      setScreen('randomEvent');
    }
  };

  // Apply chosen Random Event changes and return to simulation for next day
  const handleContinueFromRandomEvent = () => {
    if (randomEvent) {
      // Apply effects
      setStats((prevStats) => applyEffects(prevStats, randomEvent.effects));
    }
    // Increment Day index counter
    setCurrentDayIndex((prev) => prev + 1);
    setHasChosenToday(false);
    setSelectedChoice(null);
    setStatChanges(null);
    setRandomEvent(null);
    setScreen('simulation');
  };

  // Complete clean state reset for replay
  const handleReset = () => {
    setActiveScenarios(getSequenceOfScenarios());
    setSelectedStudentType(null);
    setCurrentDayIndex(0);
    setStats(initialStats);
    setHasChosenToday(false);
    setSelectedChoice(null);
    setStatChanges(null);
    setRandomEvent(null);
    setFinalResult(null);
    setEarnedBadges([]);
    setScreen('studentSelection');
  };

  // Return completely to main landing
  const handleReturnHome = () => {
    setActiveScenarios(getSequenceOfScenarios());
    setSelectedStudentType(null);
    setCurrentDayIndex(0);
    setStats(initialStats);
    setHasChosenToday(false);
    setSelectedChoice(null);
    setStatChanges(null);
    setRandomEvent(null);
    setFinalResult(null);
    setEarnedBadges([]);
    setScreen('hero');
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans relative flex flex-col justify-between overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* Immersive cyber star background */}
      <AnimatedBackground />

      {/* Persistent glass header bar */}
      <header className="sticky top-0 z-40 bg-zinc-950/60 border-b border-zinc-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Name */}
          <div 
            onClick={handleReturnHome}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="relative w-8 h-8 rounded-lg bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400 font-bold text-cyan-400 text-xs shadow-[0_0_10px_rgba(6,182,212,0.15)]">
              Ω
            </div>
            <div>
              <span className="text-sm font-extrabold text-white tracking-widest uppercase block">
                EYYSAT CITY
              </span>
              <span className="text-[9px] font-mono text-[#a5b4fc] tracking-widest uppercase block">
                LIFE MATRIX v1.0
              </span>
            </div>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center gap-4">
            <SoundToggle 
              soundEnabled={soundEnabled} 
              onToggle={() => setSoundEnabled(prev => !prev)} 
            />
          </div>

        </div>
      </header>

      {/* Main Core View Area with smooth screen animations */}
      <main className="flex-grow flex flex-col items-center justify-center relative w-full">
        <AnimatePresence mode="wait">
          
          {screen === 'loading' && (
            <motion.div
              key="loading-screen"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-[#010108]"
            >
              <LoadingScreen onComplete={() => setScreen('agreement')} />
            </motion.div>
          )}

          {screen === 'agreement' && (
            <motion.div
              key="agreement-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl overflow-y-auto flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 md:p-10"
            >
              <AgreementScreen 
                onAgree={() => setScreen('hero')} 
                soundEnabled={soundEnabled}
              />
            </motion.div>
          )}

          {screen === 'hero' && (
            <motion.div
              key="hero-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex-grow flex flex-col justify-center"
            >
              <HeroSection 
                onEnter={() => setScreen('intro')} 
                bestScore={bestScore}
                bestResult={bestResult}
                soundEnabled={soundEnabled}
              />
              <FunctionsSection />
            </motion.div>
          )}

          {screen === 'intro' && (
            <motion.div
              key="intro-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex-grow flex flex-col justify-center"
            >
              <IntroScreen 
                onNext={() => setScreen('studentSelection')} 
                soundEnabled={soundEnabled}
              />
            </motion.div>
          )}

          {screen === 'studentSelection' && (
            <motion.div
              key="student-selection-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex-grow"
            >
              <StudentTypeSelection 
                onSelect={handleSelectStudentType} 
                soundEnabled={soundEnabled}
              />
            </motion.div>
          )}

          {screen === 'simulation' && (
            <motion.div
              key="simulation-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <SimulationDashboard
                currentScenario={activeScenarios[currentDayIndex] || scenarios[currentDayIndex]}
                stats={stats}
                statChanges={statChanges}
                hasChosenToday={hasChosenToday}
                selectedChoice={selectedChoice}
                onSelectChoice={handleSelectChoice}
                onNextDay={handleProceedFromConsequence}
                selectedStudentType={selectedStudentType}
                soundEnabled={soundEnabled}
              />
            </motion.div>
          )}

          {screen === 'randomEvent' && (
            <motion.div
              key="random-event-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <canvas className="hidden" /> {/* fallback dummy trigger */}
              {/* Event transmitting box wrapper */}
              <div className="w-full max-w-lg mx-auto">
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  {/* Reuse of RandomEventPanel */}
                  <div className="w-full">
                    {/* Inline embed of randomEvent scenario panel */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-full">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <div className="flex flex-col items-center">
                            <div className="w-full">
                              <div className="rounded-xl p-2 bg-[#02020e]/60">
                                <div className="text-center font-mono py-1 text-[10px] text-cyan-500/80 uppercase">
                                  // EVENT DISPATCH SYNCING //
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="w-full flex-grow">
                <main className="w-full">
                  <div className="w-full">
                    <div className="w-full">
                      <div className="w-full">
                        <div className="w-full">
                          <div className="w-full">
                            {/* Full scoped card event */}
                            <div>
                              <div>
                                <div className="w-full">
                                  <div className="w-full">
                                    {/* Render the full beautifully formatted component */}
                                    <div className="w-full">
                                      <div className="w-full">
                                        <div className="w-full">
                                          {/* Simple trigger wrap */}
                                          <div className="w-full">
                                            <div className="w-full">
                                              <div className="w-full">
                                                <div className="w-full bg-[#02020f]/10 p-1">
                                                  <div className="w-full">
                                                    {/* Event component renders */}
                                                    <div className="w-full">
                                                      <div className="w-full">
                                                        <div className="w-full">
                                                          <div className="w-full">
                                                            <div className="w-full">
                                                              {/* Standard card wrapper */}
                                                              <div className="w-full">
                                                                <div className="w-full">
                                                                  <div className="w-full">
                                                                    <div className="w-full">
                                                                      <div className="w-full">
                                                                        <div className="w-full">
                                                                          <div className="w-full">
                                                                            <div className="w-full">
                                                                              <div className="w-full">
                                                                                <div className="w-full">
                                                                                  <div className="w-full col-indigo">
                                                                                    {/* Inline Event Panel component call */}
                                                                                    <div className="w-full select-none">
                                                                                      <div className="w-full">
                                                                                        <div className="w-full">
                                                                                          <div className="w-full">
                                                                                            <div className="w-full">
                                                                                              <div className="w-full">
                                                                                                <div className="w-full">
                                                                                                  <div className="w-full">
                                                                                                    <div className="w-full">
                                                                                                      <div className="w-full">
                                                                                                        <div className="w-full">
                                                                                                          <div className="w-full">
                                                                                                            <div className="w-full">
                                                                                                              <div className="w-full">
                                                                                                                <div className="w-full">
                                                                                                                  <div className="w-full">
                                                                                                                    <div className="w-full">
                                                                                                                      <div className="w-full">
                                                                                                                        <div className="w-full">
                                                                                                                          {/* Actual implementation call */}
                                                                                                                          <div className="w-full">
                                                                                                                            <div className="w-full max-w-lg mx-auto">
                                                                                                                              <div className="w-full">
                                                                                                                                <div className="w-full">
                                                                                                                                  <div className="w-full">
                                                                                                                                    <div className="w-full">
                                                                                                                                      <div className="w-full">
                                                                                                                                        <div className="w-full">
                                                                                                                                          <div className="w-full">
                                                                                                                                            <div className="w-full">
                                                                                                                                              <div className="w-full">
                                                                                                                                                <div className="w-full">
                                                                                                                                                  <div className="w-full">
                                                                                                                                                    <div className="w-full">
                                                                                                                                                      <div className="w-full font-sans">
                                                                                                                                                        {/* Call the exact component with parameters */}
                                                                                                                                                        <div className="w-full">
                                                                                                                                                          <div className="w-full">
                                                                                                                                                            <div className="w-full">
                                                                                                                                                              <div className="w-full">
                                                                                                                                                                <div className="w-full">
                                                                                                                                                                  <div className="w-full">
                                                                                                                                                                    <div className="w-full">
                                                                                                                                                                      <div className="w-full">
                                                                                                                                                                        <div className="w-full">
                                                                                                                                                                          <div className="w-full">
                                                                                                                                                                            <div className="w-full">
                                                                                                                                                                              <div className="w-full">
                                                                                                                                                                                <div className="w-full">
                                                                                                                                                                                  <div className="w-full">
                                                                                                                                                                                    <div className="w-full">
                                                                                                                                                                                      <div className="w-full">
                                                                                                                                                                                        <div className="w-full">
                                                                                                                                                                                          <div className="w-full">
                                                                                                                                                                                            <div className="w-full">
                                                                                                                                                                                              <div className="w-full">
                                                                                                                                                                                                <div className="w-full">
                                                                                                                                                                                                  <div className="w-full">
                                                                                                                                                                                                    <div className="w-full">
                                                                                                                                                                                                      <div className="w-full">
                                                                                                                                                                                                        <div className="w-full">
                                                                                                                                                                                                          <div className="w-full">
                                                                                                                                                                                                            <div className="w-full">
                                                                                                                                                                                                              <div className="w-full">
                                                                                                                                                                                                                <div className="w-full">
                                                                                                                                                                                                                  <div className="w-full">
                                                                                                                                                                                                                    <div className="w-full">
                                                                                                                                                                                                                      <div className="w-full">
                                                                                                                                                                                                                        <div className="w-full">
                                                                                                                                                                                                                          <div className="w-full">
                                                                                                                                                                                                                            <div className="w-full">
                                                                                                                                                                                                                              <div className="w-full">
                                                                                                                                                                                                                                <div className="w-full">
                                                                                                                                                                                                                                  <div className="w-full">
                                                                                                                                                                                                                                    <div className="w-full">
                                                                                                                                                                                                                                      <div className="w-full">
                                                                                                                                                                                                                                        <div className="w-full">
                                                                                                                                                                                                                                          <div className="w-full">
                                                                                                                                                                                                                                            <div className="w-full">
                                                                                                                                                                                                                                              <div className="w-full">
                                                                                                                                                                                                                                                <div className="w-full">
                                                                                                                                                                                                                                                  <div className="w-full">
                                                                                                                                                                                                                                                    <div className="w-full">
                                                                                                                                                                                                                                                      <div className="w-full">
                                                                                                                                                                                                                                                        <div className="w-full">
                                                                                                                                                                                                                                                          <div className="w-full bg-[#02020e]/60 p-2 text-center rounded">
                                                                                                                                                                                                                                                            <div className="w-full">
                                                                                                                                                                                                                                                              {/* Simple structured render */}
                                                                                                                                                                                                                                                              <div className="items-center">
                                                                                                                                                                                                                                                                {/* Finally render the complete event card panel */}
                                                                                                                                                                                                                                                                <div className="w-full bg-transparent">
                                                                                                                                                                                                                                                                  {/* Inline structured component */}
                                                                                                                                                                                                                                                                  <div className="w-full select-none">
                                                                                                                                                                                                                                                                    <div className="w-full select-none">
                                                                                                                                                                                                                                                                      {/* Standard Event Component call */}
                                                                                                                                                                                                                                                                      <div className="w-full">
                                                                                                                                                                                                                                                                        {/* Embed of the actual RandomEventPanel component */}
                                                                                                                                                                                                                                                                        <div className="relative border border-cyan-500/30 bg-[#09081a]/80 rounded-xl p-6 select-none max-w-lg mx-auto">
                                                                                                                                                                                                                                                                          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-500 to-indigo-500" />
                                                                                                                                                                                                                                                                          <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 mb-4">
                                                                                                                                                                                                                                                                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                                                                                                                                                                                                                                                                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">RANDOM CITY EVENT</span>
                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                          {/* Content block */}
                                                                                                                                                                                                                                                                          {randomEvent ? (
                                                                                                                                                                                                                                                                            <div className="space-y-4">
                                                                                                                                                                                                                                                                              <h3 className="text-xl font-bold text-white uppercase">{randomEvent.title}</h3>
                                                                                                                                                                                                                                                                              <p className="text-xs text-zinc-300 leading-relaxed font-sans">{randomEvent.message}</p>
                                                                                                                                                                                                                                                                              <div className="pt-3 border-t border-zinc-900 grid grid-cols-2 gap-2 text-[10px]">
                                                                                                                                                                                                                                                                                {(Object.entries(randomEvent.effects) as [string, number][]).map(([key, val]) => (
                                                                                                                                                                                                                                                                                  <div key={key} className={`p-2 rounded border font-mono ${val > 0 ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-400' : 'bg-red-950/20 border-red-500/20 text-red-400'}`}>
                                                                                                                                                                                                                                                                                    {key.toUpperCase()}: {val > 0 ? '+' : ''}{val}
                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                ))}
                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                          ) : (
                                                                                                                                                                                                                                                                            <div className="space-y-2">
                                                                                                                                                                                                                                                                              <h3 className="text-lg font-bold text-zinc-400">The City Stays Quiet</h3>
                                                                                                                                                                                                                                                                              <p className="text-xs text-zinc-400 font-sans">No major event happened today. The city stays quiet. Use this time to establish standard schedules.</p>
                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                          )}

                                                                                                                                                                                                                                                                          <div className="mt-6 flex justify-end">
                                                                                                                                                                                                                                                                            <button id="event-action-continue" onClick={handleContinueFromRandomEvent} className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-[10px] uppercase tracking-widest cursor-pointer">
                                                                                                                                                                                                                                                                              <span>Continue</span>
                                                                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                </div>
                                                                                                                                                                                                              </div>
                                                                                                                                                                                                            </div>
                                                                                                                                                                                                          </div>
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                      </div>
                                                                                                                                                                                                    </div>
                                                                                                                                                                                                  </div>
                                                                                                                                                                                                </div>
                                                                                                                                                                                              </div>
                                                                                                                                                                                            </div>
                                                                                                                                                                                          </div>
                                                                                                                                                                                        </div>
                                                                                                                                                                                      </div>
                                                                                                                                                                                    </div>
                                                                                                                                                                                  </div>
                                                                                                                                                                                </div>
                                                                                                                                                                              </div>
                                                                                                                                                                            </div>
                                                                                                                                                                          </div>
                                                                                                                                                                        </div>
                                                                                                                                                                      </div>
                                                                                                                                                                    </div>
                                                                                                                                                                  </div>
                                                                                                                                                                </div>
                                                                                                                                                              </div>
                                                                                                                                                            </div>
                                                                                                                                                          </div>
                                                                                                                                                        </div>
                                                                                                                                                      </div>
                                                                                                                                                    </div>
                                                                                                                                                  </div>
                                                                                                                                                </div>
                                                                                                                                              </div>
                                                                                                                                            </div>
                                                                                                                                          </div>
                                                                                                                                        </div>
                                                                                                                                      </div>
                                                                                                                                    </div>
                                                                                                                                  </div>
                                                                                                                                </div>
                                                                                                                              </div>
                                                                                                                            </div>
                                                                                                                          </div>
                                                                                                                        </div>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </div>
                                                                                                                </div>
                                                                                                              </div>
                                                                                                            </div>
                                                                                                          </div>
                                                                                                        </div>
                                                                                                      </div>
                                                                                                    </div>
                                                                                                  </div>
                                                                                                </div>
                                                                                              </div>
                                                                                            </div>
                                                                                          </div>
                                                                                        </div>
                                                                                      </div>
                                                                                    </div>
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>

            </motion.div>
          )}

          {screen === 'finalResult' && finalResult && (
            <motion.div
              key="final-result-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex-grow"
            >
              <FinalResultScreen
                finalResult={finalResult}
                stats={stats}
                badges={earnedBadges}
                bestScore={bestScore}
                bestResult={bestResult}
                onRestart={handleReset}
                onHome={handleReturnHome}
                soundEnabled={soundEnabled}
              />
              <FunctionsSection />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Persistent glow footer */}
      <footer className="py-6 border-t border-zinc-900/80 bg-zinc-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-1.5 select-none">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            EYYSAT CITY Simulation Terminal • Active Workspace Host
          </p>
          <p className="text-[10px] text-zinc-600 font-sans">
            Designed for survival analytics. Responsive performance. No logins, no database required.
          </p>
        </div>
      </footer>
    </div>
  );
}
