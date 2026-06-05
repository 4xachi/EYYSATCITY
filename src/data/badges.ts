/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Badge, Stats, DecisionMemory, Goal, RunMeta } from '../types/simulation';

export const ALL_BADGES: Badge[] = [
  {
    id: 'balance_master',
    name: 'Balance Master',
    title: 'Balance Master',
    description: 'You maintained a perfectly balanced student lifestyle.',
    requirement: 'All stats except stress are above 50 and stress below 60',
    requirementText: 'All stats > 50, Stress < 60',
    iconName: 'Scale',
    icon: 'Scale',
    evaluate: (stats: Stats) => stats.energy > 50 && stats.grades > 50 && stats.focus > 50 && stats.social > 50 && stats.money > 50 && stats.stress < 60
  },
  {
    id: 'academic_beast',
    name: 'Academic Beast',
    title: 'Academic Beast',
    description: 'You crushed your exams and projects.',
    requirement: 'Grades above 90',
    requirementText: 'Grades > 90',
    iconName: 'BookOpen',
    icon: 'BookOpen',
    evaluate: (stats: Stats) => stats.grades > 90
  },
  {
    id: 'calm_under_pressure',
    name: 'Calm Under Pressure',
    title: 'Calm Under Pressure',
    description: 'Ice in your veins during a chaotic week.',
    requirement: 'Stress below 30',
    requirementText: 'Stress < 30',
    iconName: 'Wind',
    icon: 'Wind',
    evaluate: (stats: Stats) => stats.stress < 30
  },
  {
    id: 'team_player',
    name: 'Team Player',
    title: 'Team Player',
    description: 'You excel at group work and communication.',
    requirement: 'Social above 80',
    requirementText: 'Social > 80',
    iconName: 'Users',
    icon: 'Users',
    evaluate: (stats: Stats) => stats.social > 80
  },
  {
    id: 'budget_genius',
    name: 'Budget Genius',
    title: 'Budget Genius',
    description: 'Master of the student budget.',
    requirement: 'Money above 70',
    requirementText: 'Money > 70',
    iconName: 'Wallet',
    icon: 'Wallet',
    evaluate: (stats: Stats) => stats.money > 70
  },
  {
    id: 'focus_locked',
    name: 'Focus Locked',
    title: 'Focus Locked',
    description: 'Zero distractions made it through.',
    requirement: 'Focus above 85',
    requirementText: 'Focus > 85',
    iconName: 'Target',
    icon: 'Target',
    evaluate: (stats: Stats) => stats.focus > 85
  },
  {
    id: 'energy_keeper',
    name: 'Energy Keeper',
    title: 'Energy Keeper',
    description: 'Slept well, ate well, survived well.',
    requirement: 'Energy above 80',
    requirementText: 'Energy > 80',
    iconName: 'Zap',
    icon: 'Zap',
    evaluate: (stats: Stats) => stats.energy > 80
  },
  {
    id: 'comeback_student',
    name: 'Comeback Student',
    title: 'Comeback Student',
    description: 'You recovered from risky decisions.',
    requirement: 'Final score above 250 and stress below 50 after at least one risky choice',
    requirementText: 'Score > 250, Stress < 50, had risky choice',
    iconName: 'TrendingUp',
    icon: 'TrendingUp',
    evaluate: (stats: Stats, finalScore: number, decisionMemory: DecisionMemory) => 
      finalScore > 250 && 
      stats.stress < 50 && 
      (decisionMemory.skippedMeal || decisionMemory.ignoredProject || decisionMemory.crammedAtMidnight || decisionMemory.overworked || decisionMemory.gaveUpFinal)
  },
  {
    id: 'goal_getter',
    name: 'Goal Getter',
    title: 'Goal Getter',
    description: 'Achieved your personal goal for the week.',
    requirement: 'Selected goal achieved',
    requirementText: 'Achieve Goal',
    iconName: 'CheckCircle',
    icon: 'CheckCircle',
    evaluate: (stats: Stats, finalScore: number, decisionMemory: DecisionMemory, selectedGoal: Goal | null, goalAchieved: boolean) => goalAchieved
  },
  {
    id: 'no_burnout',
    name: 'No Burnout Run',
    title: 'No Burnout Run',
    description: 'You navigated the week without hitting the danger zone.',
    requirement: 'Stress never reaches 75 or higher during the whole run',
    requirementText: 'Max Stress < 75',
    iconName: 'Shield',
    icon: 'Shield',
    evaluate: (stats: Stats, finalScore: number, decisionMemory: DecisionMemory, selectedGoal: Goal | null, goalAchieved: boolean, runMeta: RunMeta) => runMeta.maxStressReached < 75
  },
  {
    id: 'planner_mindset',
    name: 'Planner Mindset',
    title: 'Planner Mindset',
    description: 'Organized and prepared for anything.',
    requirement: 'User chooses planning-related choices at least twice',
    requirementText: '2+ Planning Choices',
    iconName: 'Calendar',
    icon: 'Calendar',
    evaluate: (stats: Stats, finalScore: number, decisionMemory: DecisionMemory, selectedGoal: Goal | null, goalAchieved: boolean, runMeta: RunMeta) => runMeta.planningChoiceCount >= 2
  },
  {
    id: 'support_seeker',
    name: 'Support Seeker',
    title: 'Support Seeker',
    description: 'You knew when to ask for help.',
    requirement: 'User asks classmates/friends/groupmates for help at least twice',
    requirementText: '2+ Support Choices',
    iconName: 'MessageCircle',
    icon: 'MessageCircle',
    evaluate: (stats: Stats, finalScore: number, decisionMemory: DecisionMemory, selectedGoal: Goal | null, goalAchieved: boolean, runMeta: RunMeta) => runMeta.supportChoiceCount >= 2
  },
  {
    id: 'survival_streak',
    name: 'Survival Streak',
    title: 'Survival Streak',
    description: 'You completed a full week in EYYSAT CITY.',
    requirement: 'Finish one complete run',
    requirementText: 'Finish 1 Run',
    iconName: 'Award',
    icon: 'Award',
    evaluate: () => true
  }
];
