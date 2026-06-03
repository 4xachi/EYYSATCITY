/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RandomEvent } from '../types/simulation';

export const randomEvents: RandomEvent[] = [
  {
    id: 'quiz',
    title: 'Sudden Quiz Announced',
    message: 'A sudden quiz was announced. The pressure increased.',
    effects: { stress: 10, focus: -5 }
  },
  {
    id: 'notes',
    title: 'Friend Gives You Notes',
    message: 'A friend shared useful notes with you.',
    effects: { grades: 10, social: 5 }
  },
  {
    id: 'traffic',
    title: 'Traffic Delay',
    message: 'Traffic delayed your day and drained your energy.',
    effects: { energy: -10, stress: 10 }
  },
  {
    id: 'battery',
    title: 'Phone Battery Died',
    message: 'Your phone died. You were less distracted, but missed some messages.',
    effects: { focus: 5, social: -5 }
  },
  {
    id: 'allowance',
    title: 'Extra Allowance Found',
    message: 'You found extra allowance in your bag.',
    effects: { money: 15 }
  },
  {
    id: 'group_help',
    title: 'Groupmate Finally Helped',
    message: 'A groupmate finally helped and reduced the workload.',
    effects: { grades: 10, stress: -10 }
  },
  {
    id: 'bad_sleep',
    title: 'Bad Night Sleep',
    message: 'You slept badly and woke up unfocused.',
    effects: { energy: -15, focus: -10 }
  },
  {
    id: 'extension',
    title: 'Professor Extends Deadline',
    message: 'The professor extended the deadline. Your stress dropped.',
    effects: { stress: -20 }
  },
  {
    id: 'forgot_assignment',
    title: 'Forgot Assignment',
    message: 'You forgot an assignment and had to deal with the consequence.',
    effects: { grades: -15, stress: 10 }
  },
  {
    id: 'good_meal',
    title: 'Nourishing Meal',
    message: 'A good meal helped you recover energy.',
    effects: { energy: 15, stress: -5 }
  }
];
