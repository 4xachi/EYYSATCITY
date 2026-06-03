/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StudentType } from '../types/simulation';

export const studentTypes: StudentType[] = [
  {
    id: 'scholar',
    name: 'The Scholar',
    description: 'Focused, prepared, and grade-driven.',
    strength: 'High grades and focus',
    weakness: 'Lower social energy',
    startingStats: {
      energy: 70,
      stress: 35,
      grades: 75,
      money: 50,
      focus: 80,
      social: 40,
    },
    iconName: 'GraduationCap',
  },
  {
    id: 'crammer',
    name: 'The Crammer',
    description: 'Fast under pressure, but always near burnout.',
    strength: 'Quick grade boost',
    weakness: 'High stress',
    startingStats: {
      energy: 60,
      stress: 55,
      grades: 60,
      money: 50,
      focus: 65,
      social: 50,
    },
    iconName: 'Zap',
  },
  {
    id: 'hustler',
    name: 'The Hustler',
    description: 'Balancing school, budget, and responsibilities.',
    strength: 'Better money control',
    weakness: 'Lower energy',
    startingStats: {
      energy: 65,
      stress: 45,
      grades: 55,
      money: 70,
      focus: 60,
      social: 45,
    },
    iconName: 'Briefcase',
  },
  {
    id: 'chill',
    name: 'The Chill Student',
    description: 'Relaxed, friendly, and hard to pressure.',
    strength: 'Low stress and high social',
    weakness: 'Lower focus',
    startingStats: {
      energy: 80,
      stress: 25,
      grades: 45,
      money: 50,
      focus: 45,
      social: 75,
    },
    iconName: 'Coffee',
  },
  {
    id: 'leader',
    name: 'The Leader',
    description: 'Good with people, but carries responsibility.',
    strength: 'High social score',
    weakness: 'More responsibility stress',
    startingStats: {
      energy: 70,
      stress: 45,
      grades: 60,
      money: 50,
      focus: 65,
      social: 80,
    },
    iconName: 'Crown',
  },
];
