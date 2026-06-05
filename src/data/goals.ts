/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Goal, GoalId, Stats } from '../types/simulation';

export const GOALS: Goal[] = [
  {
    id: 'high_grades',
    title: 'Get High Grades',
    description: 'Focus on academic performance and strong quiz/project results.',
    successConditionText: 'Grades >= 80',
    evaluate: (stats: Stats) => stats.grades >= 80,
  },
  {
    id: 'balanced',
    title: 'Stay Balanced',
    description: 'Keep school, energy, stress, money, focus, and social life stable.',
    successConditionText: 'Energy >= 50, Grades >= 60, Focus >= 55, Social >= 45, Money >= 35, Stress <= 60',
    evaluate: (stats: Stats) => 
      stats.energy >= 50 && 
      stats.grades >= 60 && 
      stats.focus >= 55 && 
      stats.social >= 45 && 
      stats.money >= 35 && 
      stats.stress <= 60,
  },
  {
    id: 'avoid_burnout',
    title: 'Avoid Burnout',
    description: 'Protect your energy and keep stress under control.',
    successConditionText: 'Stress <= 45 and Energy >= 50',
    evaluate: (stats: Stats) => stats.stress <= 45 && stats.energy >= 50,
  },
  {
    id: 'save_money',
    title: 'Save Money',
    description: 'Survive the week without draining your allowance.',
    successConditionText: 'Money >= 65',
    evaluate: (stats: Stats) => stats.money >= 65,
  },
  {
    id: 'social_life',
    title: 'Build Social Life',
    description: 'Use teamwork, communication, and support to survive the week.',
    successConditionText: 'Social >= 75',
    evaluate: (stats: Stats) => stats.social >= 75,
  },
  {
    id: 'survive',
    title: 'Survive No Matter What',
    description: 'Finish the week even if it becomes messy.',
    successConditionText: 'Final score >= 220',
    evaluate: (stats: Stats, finalScore: number) => finalScore >= 220,
  }
];
