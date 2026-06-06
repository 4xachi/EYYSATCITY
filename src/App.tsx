/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { ScreenType, Stats, StudentType, Choice, RandomEvent, FinalResult, Badge, Scenario, Goal, DecisionMemory, ReflectionEntry, ChoiceHistoryEntry, WhatIfSuggestion, RunMeta, StatKey } from './types/simulation';
import { scenarios, getSequenceOfScenarios } from './data/scenarios';
import { randomEvents } from './data/randomEvents';
import { clampStat, applyEffects, calculateFinalResult, checkBadges, calculateFinalScore, evaluateGoal, getScenarioVariant, generateReflectionEntry, getWhatIfSuggestion } from './utils/simulationLogic';
import { saveBestScore, loadBestScore, loadUnlockedBadges, saveUnlockedBadges, loadCompletedRuns, saveCompletedRuns, updateUnlockedBadges } from './utils/storage';

// Screens
import AnimatedBackground from './components/AnimatedBackground';
import SoundToggle from './components/SoundToggle';
import LoadingScreen from './components/LoadingScreen';
import AgreementScreen from './components/AgreementScreen';
import HeroSection from './components/HeroSection';
import IntroScreen from './components/IntroScreen';
import GoalSelectionScreen from './components/GoalSelectionScreen';
import StudentTypeSelection from './components/StudentTypeSelection';
import CampusMapScreen from './components/CampusMapScreen';
import SimulationDashboard from './components/SimulationDashboard';
import ReflectionJournalScreen from './components/ReflectionJournalScreen';
import FinalResultScreen from './components/FinalResultScreen';
import WhatIfReplayScreen from './components/WhatIfReplayScreen';
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

const initialDecisionMemory: DecisionMemory = {
  studiedEarly: false,
  crammedAtMidnight: false,
  scrolledInsteadOfStudying: false,
  savedMoney: false,
  skippedMeal: false,
  borrowedMoney: false,
  handledProjectAlone: false,
  ignoredProject: false,
  messagedGroupRespectfully: false,
  reportedGroup: false,
  createdTaskPlan: false,
  overworked: false,
  tookBreak: false,
  talkedToFriend: false,
  plannedTasks: false,
  askedForHelpFinal: false,
  gaveUpFinal: false
};

const initialRunMeta: RunMeta = {
  maxStressReached: 0,
  planningChoiceCount: 0,
  supportChoiceCount: 0,
  completedRuns: 0
};

export default function App() {
  // Navigation / Loading state
  const [screen, setScreen] = useState<ScreenType>('loading');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Simulation Core state
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [selectedStudentType, setSelectedStudentType] = useState<StudentType | null>(null);
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(0);
  const [stats, setStats] = useState<Stats>(initialStats);
  const [hasChosenToday, setHasChosenToday] = useState<boolean>(false);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [statChanges, setStatChanges] = useState<Partial<Stats> | null>(null);
  const [activeScenarios, setActiveScenarios] = useState<Scenario[]>([]);
  
  // New features state
  const [decisionMemory, setDecisionMemory] = useState<DecisionMemory>(initialDecisionMemory);
  const [choiceHistory, setChoiceHistory] = useState<ChoiceHistoryEntry[]>([]);
  const [reflectionJournal, setReflectionJournal] = useState<ReflectionEntry[]>([]);
  const [currentReflection, setCurrentReflection] = useState<ReflectionEntry | null>(null);
  const [whatIfSuggestion, setWhatIfSuggestion] = useState<WhatIfSuggestion | null>(null);

  // Inventory / Shop (Preserved from existing)
  const [inventory, setInventory] = useState<string[]>([]);

  // Random event state
  const [randomEvent, setRandomEvent] = useState<RandomEvent | null>(null);
  const [randomEventOccurred, setRandomEventOccurred] = useState<boolean>(false);

  // Game over state / final computed metrics
  const [finalResult, setFinalResult] = useState<FinalResult | null>(null);
  const [badgesEarnedThisRun, setBadgesEarnedThisRun] = useState<Badge[]>([]);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [runMeta, setRunMeta] = useState<RunMeta>(initialRunMeta);

  // Persistent stats
  const [bestScore, setBestScore] = useState<number>(0);
  const [bestResult, setBestResult] = useState<string>('None Yet');

  // Load persistent stats
  useEffect(() => {
    const backup = loadBestScore();
    setBestScore(backup.score);
    setBestResult(backup.resultTitle);
    
    const unlocked = loadUnlockedBadges();
    setUnlockedBadges(unlocked);
    
    const runs = loadCompletedRuns();
    setRunMeta(prev => ({ ...prev, completedRuns: runs }));
    
    setActiveScenarios(getSequenceOfScenarios());
  }, []);

  // Sync max stress
  useEffect(() => {
    if (stats.stress > runMeta.maxStressReached) {
      setRunMeta(prev => ({ ...prev, maxStressReached: stats.stress }));
    }
  }, [stats.stress]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [screen, currentDayIndex]);


  const handleSelectGoal = (goal: Goal) => {
    setSelectedGoal(goal);
  };

  const handleSelectStudentType = (student: StudentType) => {
    setActiveScenarios(getSequenceOfScenarios());
    setSelectedStudentType(student);
    setStats({ ...student.startingStats });
    
    // Reset simulation state
    setCurrentDayIndex(0);
    setHasChosenToday(false);
    setSelectedChoice(null);
    setStatChanges(null);
    setDecisionMemory(initialDecisionMemory);
    setChoiceHistory([]);
    setReflectionJournal([]);
    setCurrentReflection(null);
    setInventory([]);
    setRandomEvent(null);
    setRandomEventOccurred(false);
    setRunMeta(prev => ({...prev, maxStressReached: student.startingStats.stress, planningChoiceCount: 0, supportChoiceCount: 0}));

    setScreen('campusMap');
  };

  const handleSelectChoice = (choice: Choice) => {
    setHasChosenToday(true);
    setSelectedChoice(choice);
    setStatChanges(choice.effects);

    // Update Decision Memory map
    if (choice.memoryFlag) {
      setDecisionMemory(prev => ({ ...prev, [choice.memoryFlag!]: true }));
    }

    // Check meta counts for badges
    const planningFlags = ['studiedEarly', 'createdTaskPlan', 'plannedTasks'];
    const supportFlags = ['messagedGroupRespectfully', 'talkedToFriend', 'askedForHelpFinal']; // roughly mapping choices
    
    if (choice.memoryFlag && planningFlags.includes(choice.memoryFlag)) {
       setRunMeta(prev => ({ ...prev, planningChoiceCount: prev.planningChoiceCount + 1 }));
    }
    if (choice.memoryFlag && supportFlags.includes(choice.memoryFlag)) {
       setRunMeta(prev => ({ ...prev, supportChoiceCount: prev.supportChoiceCount + 1 }));
    }
    // Handle asking classmates which might not explicitly trigger memory
    if (choice.text.toLowerCase().includes('ask') || choice.text.toLowerCase().includes('message')) {
       setRunMeta(prev => ({ ...prev, supportChoiceCount: prev.supportChoiceCount + 1 }));
    }

    // Save choice history
    const currentScenario = activeScenarios[currentDayIndex];
    setChoiceHistory(prev => [...prev, {
      dayIndex: currentDayIndex,
      day: currentScenario.dayName,
      scenarioTitle: currentScenario.title,
      chosenChoiceTitle: choice.text,
      chosenEffects: choice.effects,
      feedback: choice.feedback,
      availableChoices: currentScenario.choices
    }]);

    // Apply outcome deltas
    setStats((prevStats) => {
      const nextStats = applyEffects(prevStats, choice.effects);
      
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

  const handleApplyStatBonus = (bonus: Partial<Stats>) => {
    setStats((prevStats) => applyEffects(prevStats, bonus));
  };

  const handleBuyItem = (itemId: string, cost: number) => {
    setStats((prev) => ({
      ...prev,
      money: Math.max(0, prev.money - cost),
    }));
    setInventory((prev) => [...prev, itemId]);
  };

  const handleUseItem = (itemId: string, effects: Partial<Stats>) => {
    setStats((prev) => applyEffects(prev, effects));
    setInventory((prev) => {
      const idx = prev.indexOf(itemId);
      if (idx > -1) {
        const copy = [...prev];
        copy.splice(idx, 1);
        return copy;
      }
      return prev;
    });
  };

  const handleProceedFromConsequence = () => {
    // Determine random event
    let eventTriggered: RandomEvent | null = null;
    const willTriggerEvent = Math.random() < 0.6;
    if (willTriggerEvent) {
      const randomIndex = Math.floor(Math.random() * randomEvents.length);
      eventTriggered = randomEvents[randomIndex];
      setRandomEvent(eventTriggered);
    } else {
      setRandomEvent(null);
    }
    setRandomEventOccurred(true);

    if (eventTriggered) {
      setStats((prevStats) => applyEffects(prevStats, eventTriggered!.effects));
    }

    // Generate reflection entry
    const scenario = getScenarioVariant(activeScenarios[currentDayIndex], currentDayIndex, stats, decisionMemory);
    
    // Combine stat changes from choice and event
    const comboEffects = { ...statChanges };
    if (eventTriggered) {
        Object.keys(eventTriggered.effects).forEach(k => {
           const key = k as StatKey;
           comboEffects[key] = (comboEffects[key] || 0) + (eventTriggered!.effects[key] || 0);
        });
    }

    const finalStressForThisDay = clampStat(stats.stress + (eventTriggered?.effects?.stress || 0));

    const entry = generateReflectionEntry(
      scenario.dayName,
      scenario.location,
      scenario.title,
      selectedChoice!,
      eventTriggered,
      comboEffects,
      finalStressForThisDay
    );
    
    setReflectionJournal(prev => [...prev, entry]);
    setCurrentReflection(entry);
    
    setScreen('reflection');
  };

  const handleContinueFromReflection = () => {
    const isFriday = currentDayIndex === 4;

    if (isFriday) {
      
      const newRunCount = runMeta.completedRuns + 1;
      setRunMeta(prev => ({...prev, completedRuns: newRunCount}));
      saveCompletedRuns(newRunCount);

      const calculatedResult = calculateFinalResult(stats, decisionMemory, selectedGoal);
      
      const newBadgesObj = checkBadges(stats, calculatedResult.finalScore, decisionMemory, selectedGoal, calculatedResult.goalAchieved, { ...runMeta, completedRuns: newRunCount });
      
      const newBadgeIds = newBadgesObj.map(b => b.id);
      
      // Keep track of which ones are actually NEW this run vs previously unlocked
      const previouslyUnlocked = loadUnlockedBadges();
      const strictlyNewBadgesObj = newBadgesObj.filter(b => !previouslyUnlocked.includes(b.id));

      const updatedIds = updateUnlockedBadges(newBadgeIds);
      
      setFinalResult(calculatedResult);
      setBadgesEarnedThisRun(strictlyNewBadgesObj); // Only show new ones in the alert
      setUnlockedBadges(updatedIds);

      saveBestScore(calculatedResult.finalScore, calculatedResult.title);
      const refreshedStats = loadBestScore();
      setBestScore(refreshedStats.score);
      setBestResult(refreshedStats.resultTitle);

      setScreen('finalResult');
    } else {
      setCurrentDayIndex((prev) => prev + 1);
      setHasChosenToday(false);
      setSelectedChoice(null);
      setStatChanges(null);
      setRandomEvent(null);
      setRandomEventOccurred(false);
      
      setScreen('campusMap');
    }
  };

  const handleShowWhatIf = () => {
    const suggestion = getWhatIfSuggestion(choiceHistory, selectedGoal);
    setWhatIfSuggestion(suggestion);
    setScreen('whatIfReplay');
  };

  const handleReset = () => {
    setActiveScenarios(getSequenceOfScenarios());
    setSelectedGoal(null);
    setSelectedStudentType(null);
    setCurrentDayIndex(0);
    setStats(initialStats);
    setHasChosenToday(false);
    setSelectedChoice(null);
    setStatChanges(null);
    setDecisionMemory(initialDecisionMemory);
    setChoiceHistory([]);
    setReflectionJournal([]);
    setCurrentReflection(null);
    setRandomEvent(null);
    setRandomEventOccurred(false);
    setFinalResult(null);
    setBadgesEarnedThisRun([]);
    setInventory([]);
    setScreen('goalSelection');
  };

  const handleReturnHome = () => {
    handleReset();
    setScreen('hero');
  };


  const currentScenarioRaw = activeScenarios[currentDayIndex];
  // Apply branching modifier here safely for the Simulation props
  const branchedScenario = currentScenarioRaw ? getScenarioVariant(currentScenarioRaw, currentDayIndex, stats, decisionMemory) : null;

  return (
    <div className="min-h-screen text-brand-ink font-sans relative flex flex-col justify-between overflow-x-hidden selection:bg-brand-blue/20 selection:text-brand-ink">
      
      {/* Immersive cyber star background */}
      <AnimatedBackground />

      {/* Persistent desk header bar */}
      <header className="sticky top-0 z-40 bg-brand-cream/90 border-b border-brand-navy/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Name */}
          <div 
            onClick={handleReturnHome}
            className="flex items-center gap-2 mt-0.5 cursor-pointer select-none group"
          >
            <div className="relative w-9 h-9 rounded-xl bg-brand-blue/5 border border-brand-navy/10 flex items-center justify-center group-hover:border-brand-blue/50 font-bold text-brand-blue text-base shadow-sm transition-all rotate-[-2deg]">
              🎓
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-base font-black text-brand-ink tracking-tight font-sans">
                  EYYSAT
                </span>
                <span className="px-1.5 py-0.2 text-[8px] sm:text-[9px] font-mono border border-brand-coral/40 text-brand-coral font-bold rounded uppercase rotate-[-2deg] tracking-wide inline-block bg-brand-coral/5">
                  CITY
                </span>
              </div>
              <span className="text-[8px] font-mono text-brand-navy/55 tracking-widest uppercase font-bold mt-1">
                CAMPUS BOARD SURVIVAL
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
            <motion.div key="loading-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-[#F7F3EA]">
              <LoadingScreen onComplete={() => setScreen('agreement')} />
            </motion.div>
          )}

          {screen === 'agreement' && (
            <motion.div key="agreement-screen" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[100] bg-brand-ink/45 backdrop-blur-md overflow-y-auto flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 md:p-10">
              <AgreementScreen onAgree={() => setScreen('hero')} soundEnabled={soundEnabled} />
            </motion.div>
          )}

          {screen === 'hero' && (
            <motion.div key="hero-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full flex-grow flex flex-col justify-center">
              <HeroSection onEnter={() => setScreen('intro')} bestScore={bestScore} bestResult={bestResult} soundEnabled={soundEnabled} />
              <FunctionsSection />
            </motion.div>
          )}

          {screen === 'intro' && (
            <motion.div key="intro-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full flex-grow flex flex-col justify-center">
              <IntroScreen onNext={() => setScreen('goalSelection')} soundEnabled={soundEnabled} />
            </motion.div>
          )}

          {screen === 'goalSelection' && (
            <motion.div key="goal-selection-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full flex-grow">
              <GoalSelectionScreen onSelectGoal={handleSelectGoal} selectedGoal={selectedGoal} onContinue={() => {
                 playClickSound(soundEnabled);
                 setScreen('studentSelection');
              }} />
            </motion.div>
          )}

          {screen === 'studentSelection' && (
            <motion.div key="student-selection-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full flex-grow">
              <StudentTypeSelection onSelect={(st) => { playClickSound(soundEnabled); handleSelectStudentType(st); }} soundEnabled={soundEnabled} />
            </motion.div>
          )}

          {screen === 'campusMap' && (
            <motion.div key="campus-map-screen" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.3 }} className="w-full flex-grow">
              <CampusMapScreen currentDayIndex={currentDayIndex} onEnterDay={() => { playClickSound(soundEnabled); setScreen('simulation'); }} />
            </motion.div>
          )}

          {screen === 'simulation' && branchedScenario && (
            <motion.div key={`simulation-screen-${currentDayIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full">
              <SimulationDashboard
                currentScenario={branchedScenario}
                stats={stats}
                statChanges={statChanges}
                hasChosenToday={hasChosenToday}
                selectedChoice={selectedChoice}
                onSelectChoice={handleSelectChoice}
                onNextDay={handleProceedFromConsequence}
                selectedStudentType={selectedStudentType}
                soundEnabled={soundEnabled}
                onApplyStatBonus={handleApplyStatBonus}
                inventory={inventory}
                onBuyItem={handleBuyItem}
                onUseItem={handleUseItem}
                decisionMemory={decisionMemory}
              />
            </motion.div>
          )}

          {screen === 'reflection' && (
            <motion.div key={`reflection-screen-${currentDayIndex}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="w-full flex-grow">
              <ReflectionJournalScreen entry={currentReflection} onContinue={handleContinueFromReflection} isFriday={currentDayIndex === 4} reflectionJournal={reflectionJournal} />
            </motion.div>
          )}

          {screen === 'whatIfReplay' && (
            <motion.div key="what-if-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="w-full flex-grow">
              <WhatIfReplayScreen suggestion={whatIfSuggestion} onClose={() => setScreen('finalResult')} onRetry={handleReset} />
            </motion.div>
          )}

          {screen === 'finalResult' && finalResult && selectedStudentType && (
            <motion.div key="final-result-screen" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.5, type: 'spring' }} className="w-full min-h-screen">
              <FinalResultScreen
                result={finalResult}
                finalStats={stats}
                badgesEarned={badgesEarnedThisRun}
                studentName={selectedStudentType.name}
                studentIcon={selectedStudentType.iconName}
                onRestart={handleReset}
                soundEnabled={soundEnabled}
                
                selectedGoal={selectedGoal}
                reflectionJournal={reflectionJournal}
                unlockedBadgeIds={unlockedBadges}
                onShowWhatIf={handleShowWhatIf}
              />
            </motion.div>
          )}
          
        </AnimatePresence>
      </main>

    </div>
  );
}
