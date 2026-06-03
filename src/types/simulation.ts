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

export interface FinalResult {
  title: string;
  description: string;
  gradeLevel: string; // e.g. A, B, C, D, F
  finalScore: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  requirement: string;
  iconName: string;
}

export type ScreenType = 'loading' | 'agreement' | 'hero' | 'intro' | 'studentSelection' | 'simulation' | 'randomEvent' | 'finalResult';

export interface SimulationState {
  screen: ScreenType;
  selectedStudentType: StudentType | null;
  currentDayIndex: number; // 0 to 4 (Mon to Fri)
  stats: Stats;
  hasChosenToday: boolean;
  selectedChoice: Choice | null;
  consequenceText: string;
  statChanges: Partial<Stats> | null;
  randomEvent: RandomEvent | null;
  randomEventOccurred: boolean; // whether an event was rolled (even if "no event")
  simulationStarted: boolean;
  finalResult: FinalResult | null;
  badges: Badge[];
  bestScore: number;
  bestResult: string;
  soundEnabled: boolean;
}
