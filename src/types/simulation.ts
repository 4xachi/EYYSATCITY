/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type StatKey = 'energy' | 'stress' | 'grades' | 'money' | 'focus' | 'social';

export interface Stats {
  energy: number;
  stress: number;
  grades: number;
  money: number;
  focus: number;
  social: number;
}

export type GoalId = "high_grades" | "balanced" | "avoid_burnout" | "save_money" | "social_life" | "survive";

export interface Goal {
  id: GoalId;
  title: string;
  description: string;
  successConditionText: string;
  evaluate: (stats: Stats, finalScore: number) => boolean;
}

export interface DecisionMemory {
  studiedEarly: boolean;
  crammedAtMidnight: boolean;
  scrolledInsteadOfStudying: boolean;
  savedMoney: boolean;
  skippedMeal: boolean;
  borrowedMoney: boolean;
  handledProjectAlone: boolean;
  ignoredProject: boolean;
  messagedGroupRespectfully: boolean;
  reportedGroup: boolean;
  createdTaskPlan: boolean;
  overworked: boolean;
  tookBreak: boolean;
  talkedToFriend: boolean;
  plannedTasks: boolean;
  askedForHelpFinal: boolean;
  gaveUpFinal: boolean;
}

export interface StudentType {
  id: string;
  name: string;
  description: string;
  strength: string;
  weakness: string;
  startingStats: Stats;
  iconName: string;
}

export interface Choice {
  id: string;
  text: string;
  effects: Partial<Stats>;
  feedback: string;
  memoryFlag?: keyof DecisionMemory;
}

export interface Scenario {
  dayIndex: number;
  dayName: string;
  location: string;
  title: string;
  description: string;
  choices: Choice[];
}

export interface RandomEvent {
  id: string;
  title: string;
  message: string;
  effects: Partial<Stats>;
}

export interface ReflectionEntry {
  day: string;
  location: string;
  scenarioTitle: string;
  chosenChoiceTitle: string;
  feedback: string;
  randomEventTitle?: string;
  randomEventMessage?: string;
  totalStatChanges: Partial<Stats>;
  reflectionText: string;
  lessonText: string;
  mood: "balanced" | "risky" | "strong" | "stressful" | "recovered";
  endStressLevel?: number;
  statsSnapshot?: Stats;
}

export interface ChoiceHistoryEntry {
  dayIndex: number;
  day: string;
  scenarioTitle: string;
  chosenChoiceTitle: string;
  chosenEffects: Partial<Stats>;
  feedback: string;
  availableChoices: Choice[];
}

export interface FinalResult {
  title: string;
  description: string;
  gradeLevel: string; // Keep for fallback or simple grading
  finalScore: number;
  goalAchieved: boolean;
  goalMessage: string;
  strongestStat: StatKey;
  weakestStat: StatKey;
  riskPattern: string;
  suggestedNextGoal: string;
}

export interface Badge {
  id: string;
  name: string;
  title?: string;
  description: string;
  requirement: string;
  requirementText?: string;
  iconName: string;
  icon?: string;
  evaluate?: (
    stats: Stats,
    finalScore: number,
    decisionMemory: DecisionMemory,
    selectedGoal: Goal | null,
    goalAchieved: boolean,
    runMeta: RunMeta
  ) => boolean;
}

export interface RunMeta {
  maxStressReached: number;
  planningChoiceCount: number;
  supportChoiceCount: number;
  completedRuns: number;
}

export interface WhatIfSuggestion {
  day: string;
  scenarioTitle: string;
  actualChoice: string;
  alternativeChoice: string;
  actualEffects: Partial<Stats>;
  alternativeEffects: Partial<Stats>;
  estimatedDifference: Partial<Stats>;
  explanation: string;
}

export type ScreenType = 'loading' | 'agreement' | 'hero' | 'intro' | 'goalSelection' | 'studentSelection' | 'campusMap' | 'simulation' | 'randomEvent' | 'reflection' | 'finalResult' | 'whatIfReplay';

export interface SimulationState {
  screen: ScreenType;
  selectedStudentType: StudentType | null;
  selectedGoal: Goal | null;
  currentDayIndex: number; // 0 to 4 (Mon to Fri)
  stats: Stats;
  hasChosenToday: boolean;
  selectedChoice: Choice | null;
  consequenceText: string;
  statChanges: Partial<Stats> | null;
  
  // New features
  decisionMemory: DecisionMemory;
  choiceHistory: ChoiceHistoryEntry[];
  reflectionJournal: ReflectionEntry[];
  currentReflection: ReflectionEntry | null;
  
  randomEvent: RandomEvent | null;
  randomEventOccurred: boolean;
  simulationStarted: boolean;
  finalResult: FinalResult | null;
  
  badgesEarnedThisRun: Badge[];
  unlockedBadges: Badge[];
  runMeta: RunMeta;
  
  bestScore: number;
  bestResult: string;
  soundEnabled: boolean;
}
