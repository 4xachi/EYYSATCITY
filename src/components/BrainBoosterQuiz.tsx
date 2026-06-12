/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Zap, 
  Clock, 
  ChevronRight, 
  RotateCcw,
  Volume2
} from 'lucide-react';
import { Stats } from '../types/simulation';
import { playClickSound, playPositiveSound, playWarningSound } from '../utils/audio';

interface TriviaQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

// A diverse, highly polished set of questions spanning logic, computer science, statistics, physics, and campus life
const QUIZ_QUESTIONS_POOL: TriviaQuestion[] = [
  {
    question: "If all Zugs are Wugs, and some Wugs are Pugs, is it certain that some Zugs are Pugs?",
    options: ["Yes, absolutely", "No, not necessarily", "Zugs are always Pugs", "Pugs can never be Zugs"],
    answerIndex: 1,
    explanation: "Overlapping sub-elements don't guarantee a direct intersection. In logic diagrams, Zugs and Pugs might not touch."
  },
  {
    question: "In binary computation, what is the value of the bitwise calculation (1010 AND 1100)?",
    options: ["1110", "1100", "1000", "1010"],
    answerIndex: 2,
    explanation: "Bitwise AND returns 1 only where both input bits are 1: comparing 1010 and 1100 yields 1000."
  },
  {
    question: "A grade is weighted: 40% Exams, 40% Labs, 20% Attendance. With scores of 70 (Exams), 80 (Labs), and 100 (Attendance), what is the grade?",
    options: ["75%", "78%", "80%", "82%"],
    answerIndex: 1,
    explanation: "Calculated as: (70 * 0.4) + (80 * 0.4) + (100 * 0.2) = 28 + 32 + 20 = 78%."
  },
  {
    question: "Which computer science data structure operates on a strict 'FIFO' (First-In, First-Out) principle?",
    options: ["Stack", "Queue", "Binary Tree", "Hash Map"],
    answerIndex: 1,
    explanation: "A Queue processes elements in the sequence they were inserted, just like a line at the student canteen."
  },
  {
    question: "In standard CSS layout, which value of the 'position' property keeps an element in standard flow but offset relative to itself?",
    options: ["absolute", "fixed", "static", "relative"],
    answerIndex: 3,
    explanation: "Position 'relative' shifts an element from its default layout placement while leaving its occupied space unchanged."
  },
  {
    question: "What is the average runtime complexity of searching a sorted array of N elements using Binary Search?",
    options: ["O(1)", "O(N)", "O(log N)", "O(N log N)"],
    answerIndex: 2,
    explanation: "Each comparison discards half of the remaining array, giving logarithmic O(log N) time complexity."
  },
  {
    question: "Which chemical compound is widely referred to as the 'fuel of student survival' (C8H10N4O2)?",
    options: ["Glucose", "Sucrose", "Caffeine", "Ethanol"],
    answerIndex: 2,
    explanation: "C8H10N4O2 is the chemical structure for Caffeine, which blocks adenosine receptors to keep you awake."
  },
  {
    question: "Which law states that 'work expands to fill the time available for its completion'?",
    options: ["Newton's First Law", "Parkinson’s Law", "Murphy’s Law", "Moore’s Law"],
    answerIndex: 1,
    explanation: "Parkinson’s Law explains why a 2-hour assignment can take an entire week if you sit down too early."
  }
];

interface BrainBoosterQuizProps {
  currentDayIndex: number; // 0 to 4 (Monday to Friday)
  soundEnabled: boolean;
  onApplyStatBonus: (bonus: Partial<Stats>) => void;
}

export default function BrainBoosterQuiz({
  currentDayIndex,
  soundEnabled,
  onApplyStatBonus,
}: BrainBoosterQuizProps) {
  // Navigation / Interactive panel states
  const [isActive, setIsActive] = useState(false);
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answeredToday, setAnsweredToday] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  
  // Track quiz record across days: map day index to their score
  const [dailyScores, setDailyScores] = useState<{ [day: number]: number }>({});

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Re-verify quiz status when the current day index increments
  const hasPlayedToday = dailyScores[currentDayIndex] !== undefined;

  // Curate 3 random questions from the pool when starting a new quiz session
  const initializeQuizSession = () => {
    playClickSound(soundEnabled);
    const shuffled = [...QUIZ_QUESTIONS_POOL].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 3));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setCorrectCount(0);
    setQuizFinished(false);
    setTimeLeft(15);
    setIsActive(true);
  };

  // Timer loop logic for active quiz question
  useEffect(() => {
    if (isActive && !quizFinished && selectedAnswer === null) {
      setTimeLeft(15);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            // Timeout automatically triggers a wrong answer
            handleAnswerSelect(-1); 
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, currentIndex, quizFinished, selectedAnswer]);

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null || quizFinished) return;

    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedAnswer(index);

    const isCorrect = index === questions[currentIndex]?.answerIndex;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      playPositiveSound(soundEnabled);
    } else {
      playWarningSound(soundEnabled);
    }
  };

  const handleNextQuestion = () => {
    playClickSound(soundEnabled);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      // Compile final results & rewards based on correct answers
      const finalScore = correctCount;
      const calculatedEffects: Partial<Stats> = {};

      if (finalScore === 3) {
        calculatedEffects.grades = 15;
        calculatedEffects.focus = 15;
        calculatedEffects.stress = -15;
        calculatedEffects.energy = 5;
      } else if (finalScore === 2) {
        calculatedEffects.grades = 8;
        calculatedEffects.focus = 8;
        calculatedEffects.stress = -5;
      } else if (finalScore === 1) {
        calculatedEffects.focus = 4;
        calculatedEffects.stress = -2;
      } else {
        calculatedEffects.stress = 5; // tiny bit of study blocks tension
      }

      // Dispatch stat rewards immediately
      onApplyStatBonus(calculatedEffects);

      // Persist day score record
      setDailyScores((prev) => ({
        ...prev,
        [currentDayIndex]: finalScore
      }));

      setQuizFinished(true);
    }
  };

  const handleCloseQuiz = () => {
    playClickSound(soundEnabled);
    setIsActive(false);
  };

  return (
    <div id="brain-booster-quiz-card" className="rounded-2xl border border-brand-navy/15 bg-brand-paper p-5 shadow-[0_4px_12px_rgba(30,42,68,0.03)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full -mr-6 -mt-6" />
      
      {/* CARD MAIN SCREEN */}
      {!isActive ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#4F7BFF]/10 to-[#F05D5E]/10 border border-brand-blue/15 text-brand-blue">
                <Brain className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono uppercase tracking-widest text-brand-navy/50 font-bold block">DAILY MINDSYNC ENGINE</span>
                <h4 className="text-sm font-extrabold text-brand-ink tracking-tight uppercase">Brain Booster Academy</h4>
              </div>
            </div>
            
            <div className="text-right">
              {hasPlayedToday ? (
                <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold bg-brand-green/10 text-brand-green px-2 py-0.5 rounded-full border border-brand-green/18">
                  <CheckCircle2 className="w-3 h-3" /> STATS BOOSTED
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold bg-[#4F7BFF]/10 text-brand-blue px-2 py-0.5 rounded-full border border-[#4F7BFF]/18 animate-pulse">
                  <Zap className="w-3 h-3" /> AVAILABLE
                </span>
              )}
            </div>
          </div>

          <p className="text-xs text-brand-navy/75 leading-relaxed font-sans">
            Unlock bonus metrics! Solve 3 academic, CS, and logic brain-boosters to sharpen your student's daily Focus (+15), lift grades, and dissolve stress levels. Available once per school day!
          </p>

          {hasPlayedToday ? (
            <div className="p-3.5 rounded-xl bg-brand-cream/60 border border-brand-navy/8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4.5 h-4.5 text-brand-amber text-[#E5A93C]" />
                <span className="text-xs font-sans font-bold text-brand-ink">
                  Today's Quiz Score:
                </span>
              </div>
              <span className="text-sm font-mono font-black text-brand-ink">
                {dailyScores[currentDayIndex]}/3 Correct
              </span>
            </div>
          ) : (
            <button
              id="quiz-trigger-start"
              onClick={initializeQuizSession}
              className="w-full py-2.5 px-4 rounded-xl font-mono text-[10px] uppercase tracking-wider font-extrabold bg-[#4F7BFF] hover:bg-[#4F7BFF]/92 text-white border border-brand-navy/10 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#4F7BFF]/15 transition-all text-center"
            >
              <Zap className="w-3.5 h-3.5" /> Launch Study pop-quiz
            </button>
          )}
        </div>
      ) : (
        /* ACTIVE TRIVIA SCREEN */
        <AnimatePresence mode="wait">
          {!quizFinished ? (
            <motion.div
              key="active-question"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* Terminal Title Header */}
              <div className="flex items-center justify-between border-b border-brand-navy/10 pb-2">
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#4F7BFF] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#4F7BFF] animate-pulse" />
                  <span>PREPARATION STAGE // INTERACTIVE EXAM // Q{currentIndex + 1} OF 3</span>
                </div>
                {/* Timer Clock */}
                {selectedAnswer === null && (
                  <div className="flex items-center gap-1.5 text-brand-coral font-mono text-[10px] font-extrabold bg-brand-coral/10 py-0.5 px-2 rounded-md border border-brand-coral/15">
                    <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                    <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
                  </div>
                )}
              </div>

              {/* Question Text */}
              <div className="space-y-1">
                <h5 className="text-xs font-mono font-bold text-brand-navy/50 uppercase">QUESTION DESCRIPTION</h5>
                <p className="text-sm font-serif font-extrabold text-brand-ink leading-snug">
                  {questions[currentIndex]?.question}
                </p>
              </div>

              {/* Dynamic timer progressive micro bar */}
              {selectedAnswer === null && (
                <div className="w-full h-1 bg-brand-navy/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: '100%' }}
                    animate={{ width: `${(timeLeft / 15) * 100}%` }}
                    transition={{ duration: 1, ease: 'linear' }}
                    className="h-full bg-brand-coral"
                  />
                </div>
              )}

              {/* Choices Map Grid */}
              <div className="grid grid-cols-1 gap-2">
                {questions[currentIndex]?.options.map((option, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrectAnswer = idx === questions[currentIndex].answerIndex;
                  const hasAnswered = selectedAnswer !== null;
                  
                  let cardStyle = "border-brand-navy/12 bg-brand-paper text-brand-ink hover:bg-brand-cream/40";
                  let iconElement = null;

                  if (hasAnswered) {
                    if (isCorrectAnswer) {
                      cardStyle = "border-brand-green/30 bg-brand-green/10 text-brand-green font-bold shadow-sm shadow-brand-green/5";
                      iconElement = <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />;
                    } else if (isSelected) {
                      cardStyle = "border-brand-coral/30 bg-brand-coral/10 text-brand-coral font-bold shadow-sm shadow-brand-coral/5";
                      iconElement = <XCircle className="w-4 h-4 text-brand-coral shrink-0" />;
                    } else {
                      cardStyle = "border-brand-navy/8 bg-brand-paper/50 opacity-55 text-brand-navy/60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasAnswered}
                      onClick={() => handleAnswerSelect(idx)}
                      className={`p-3 rounded-xl border text-left font-sans text-xs flex items-center justify-between gap-3 text-brand-ink transition-all cursor-pointer select-none ${cardStyle}`}
                    >
                      <span>{option}</span>
                      {iconElement}
                    </button>
                  );
                })}
              </div>

              {/* Timeout Indicator or Explanations block */}
              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl border border-brand-navy/8 bg-brand-cream/50 p-3.5 space-y-1.5"
                >
                  <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-wider text-brand-blue uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" /> Diagnostic Analysis
                  </div>
                  <p className="text-xs text-brand-navy/80 leading-relaxed font-sans font-medium">
                    {selectedAnswer === -1 ? (
                      <span className="text-brand-coral font-bold block">TIME EXPIRED! </span>
                    ) : selectedAnswer === questions[currentIndex].answerIndex ? (
                      <span className="text-brand-green font-bold block">CORRECT MATRIX METRIC GAINED! </span>
                    ) : (
                      <span className="text-brand-coral font-bold block font-sans">INCORRECT OUTCOME. </span>
                    )}
                    {questions[currentIndex]?.explanation}
                  </p>

                  <div className="pt-2 flex justify-end">
                    <button
                      id="quiz-next-question-btn"
                      onClick={handleNextQuestion}
                      className="inline-flex items-center gap-1 py-1.5 px-3 rounded-lg bg-brand-blue hover:bg-brand-blue/90 text-white font-mono text-[9px] uppercase tracking-wider font-extrabold transition-all cursor-pointer"
                    >
                      <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'Complete Exam'}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* COMPLETION CARD SCREEN */
            <motion.div
              key="finished-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-5 text-center py-4"
            >
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-brand-green/10 border border-brand-green/20 flex items-center justify-center text-brand-green mb-1 animate-bounce">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h5 className="text-base font-serif font-extrabold text-brand-ink uppercase tracking-tight">EXAM COMPLETED</h5>
                <p className="text-[10px] font-mono text-[#4F7BFF] font-bold uppercase tracking-widest">TRANSMISSION LOGS SENT</p>
              </div>

              <div className="bg-brand-cream/50 rounded-2xl p-4 border border-brand-navy/8 space-y-3.5 max-w-sm mx-auto">
                <div className="flex justify-between items-center px-2">
                  <span className="text-xs text-brand-navy/60 font-sans font-medium">Correct Score Rate:</span>
                  <span className="text-sm font-mono font-black text-brand-ink">{correctCount} of 3 questions</span>
                </div>
                
                <div className="border-t border-brand-navy/10 pt-3 text-left">
                  <span className="text-[9px] font-mono text-brand-navy/55 uppercase font-bold tracking-wider block mb-1">
                    APPLIED STAT BONUSES
                  </span>
                  
                  {correctCount === 3 ? (
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="font-mono text-[9px] bg-brand-green/10 text-brand-green font-bold border border-brand-green/20 p-1 rounded text-center">GRADES: +15</div>
                      <div className="font-mono text-[9px] bg-brand-green/10 text-brand-green font-bold border border-brand-green/20 p-1 rounded text-center">FOCUS: +15</div>
                      <div className="font-mono text-[9px] bg-brand-green/10 text-brand-green font-bold border border-brand-green/20 p-1 rounded text-center">STRESS: -15</div>
                      <div className="font-mono text-[9px] bg-brand-green/10 text-brand-green font-bold border border-brand-green/20 p-1 rounded text-center">ENERGY: +5</div>
                    </div>
                  ) : correctCount === 2 ? (
                    <div className="grid grid-cols-3 gap-1 px-1">
                      <div className="font-mono text-[9px] bg-brand-green/10 text-brand-green font-bold border border-brand-green/20 p-1 rounded text-center">GRADES: +8</div>
                      <div className="font-mono text-[9px] bg-brand-green/10 text-brand-green font-bold border border-brand-green/20 p-1 rounded text-center">FOCUS: +8</div>
                      <div className="font-mono text-[9px] bg-brand-green/10 text-brand-green font-bold border border-brand-green/20 p-1 rounded text-center">STRESS: -5</div>
                    </div>
                  ) : correctCount === 1 ? (
                    <div className="grid grid-cols-2 gap-1 px-1">
                      <div className="font-mono text-[9px] bg-brand-green/10 text-brand-green font-bold border border-brand-green/20 p-1 rounded text-center">FOCUS: +4</div>
                      <div className="font-mono text-[9px] bg-brand-green/10 text-brand-green font-bold border border-brand-green/20 p-1 rounded text-center">STRESS: -2</div>
                    </div>
                  ) : (
                    <div className="p-1.5 uppercase font-mono text-[9px] bg-brand-coral/10 text-brand-coral font-bold border border-brand-coral/20 rounded text-center">
                      STRESS: +5 (Exam pressure!)
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="quiz-complete-close-btn"
                  onClick={handleCloseQuiz}
                  className="w-full py-2 px-4 rounded-xl font-sans text-[10px] font-bold uppercase tracking-widest bg-brand-ink text-brand-paper hover:bg-brand-ink/90 cursor-pointer block text-center"
                >
                  Return to Dashboard
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
