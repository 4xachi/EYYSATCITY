/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Stats, FinalResult, Badge, StatKey } from '../types/simulation';

export function clampStat(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export function applyEffects(currentStats: Stats, effects: Partial<Stats>): Stats {
  const newStats = { ...currentStats };
  (Object.keys(currentStats) as StatKey[]).forEach((key) => {
    if (effects[key] !== undefined) {
      newStats[key] = clampStat(newStats[key] + (effects[key] ?? 0));
    }
  });
  return newStats;
}

export function calculateFinalScore(stats: Stats): number {
  return stats.grades + stats.energy + stats.focus + stats.social + stats.money - stats.stress;
}

export function calculateFinalResult(stats: Stats): FinalResult {
  const finalScore = calculateFinalScore(stats);

  // Determine Letter Grade Level for display
  let gradeLevel = 'C';
  if (finalScore >= 330) gradeLevel = 'A+';
  else if (finalScore >= 290) gradeLevel = 'A';
  else if (finalScore >= 250) gradeLevel = 'B';
  else if (finalScore >= 200) gradeLevel = 'C';
  else if (finalScore >= 150) gradeLevel = 'D';
  else gradeLevel = 'F';

  // 1. Priority conditions
  if (stats.stress >= 80 && stats.energy <= 35) {
    return {
      title: 'Burnout Survivor',
      description: 'You survived the week, but your stress became too high and your energy dropped too low. Your result shows that rest and balance are also part of success.',
      gradeLevel,
      finalScore
    };
  }

  if (stats.grades >= 85 && stats.stress >= 70) {
    return {
      title: 'Academic Beast',
      description: 'Your academic performance is strong, but it came with a cost. You pushed hard, but your energy and peace suffered.',
      gradeLevel,
      finalScore
    };
  }

  if (stats.social >= 80 && stats.grades >= 60) {
    return {
      title: 'Social Strategist',
      description: 'You used communication and teamwork to survive the week. You proved that student life is not meant to be handled alone.',
      gradeLevel,
      finalScore
    };
  }

  if (stats.stress <= 30 && stats.grades <= 50 && stats.focus <= 50) {
    return {
      title: 'Chill but Risky',
      description: 'You stayed relaxed, but some responsibilities were left behind. Comfort is good, but too much avoidance can hurt your progress.',
      gradeLevel,
      finalScore
    };
  }

  if (stats.grades <= 40 || stats.focus <= 35 || finalScore < 170) {
    return {
      title: 'Crisis Mode Student',
      description: 'The week became overwhelming. Your choices led to too much pressure, low energy, or weak performance. Try again with better balance.',
      gradeLevel,
      finalScore
    };
  }

  // 2. Score-based results
  if (finalScore >= 330) {
    return {
      title: 'Future Ready Student',
      description: 'You balanced your schoolwork, health, and decisions well. You did not just survive the week — you handled it wisely.',
      gradeLevel,
      finalScore
    };
  }

  if (finalScore >= 270) {
    return {
      title: 'Balanced Achiever',
      description: 'You made practical choices and kept your student life stable. You may not be perfect, but you know how to balance pressure and responsibility.',
      gradeLevel,
      finalScore
    };
  }

  if (finalScore >= 220) {
    return {
      title: 'Survived the Week',
      description: 'You made it through the week with mixed results. Some choices helped you, while others made student life harder.',
      gradeLevel,
      finalScore
    };
  }

  if (finalScore >= 170) {
    return {
      title: 'Risky Week',
      description: 'You survived, but the week exposed weak points in your balance. Better planning could improve your next run.',
      gradeLevel,
      finalScore
    };
  }

  return {
    title: 'Crisis Mode Student',
    description: 'The week became overwhelming. Your choices led to too much pressure, low energy, or weak performance. Try again with better balance.',
    gradeLevel,
    finalScore
  };
}

export function getBadges(stats: Stats, finalScore: number): Badge[] {
  const badgesList: Badge[] = [];

  // 1. Balance Master
  if (
    stats.energy > 50 &&
    stats.grades > 50 &&
    stats.money > 50 &&
    stats.focus > 50 &&
    stats.social > 50 &&
    stats.stress < 60
  ) {
    badgesList.push({
      id: 'balance_master',
      name: 'Balance Master',
      description: 'Kept all major stats above 50 and stress stable.',
      requirement: 'All stats except stress are above 50 and stress below 60',
      iconName: 'Scale'
    });
  }

  // 2. Academic Beast
  if (stats.grades > 90) {
    badgesList.push({
      id: 'academic_beast',
      name: 'Academic Beast',
      description: 'Acquired stellar marks through intense commitment.',
      requirement: 'Grades above 90',
      iconName: 'GraduationCap'
    });
  }

  // 3. Calm Under Pressure
  if (stats.stress < 30) {
    badgesList.push({
      id: 'calm_under_pressure',
      name: 'Calm Under Pressure',
      description: 'Sailed through stressful times without breaking a sweat.',
      requirement: 'Stress below 30',
      iconName: 'ShieldAlert'
    });
  }

  // 4. Team Player
  if (stats.social > 80) {
    badgesList.push({
      id: 'team_player',
      name: 'Team Player',
      description: 'Mastered student collaboration and group synergy.',
      requirement: 'Social above 80',
      iconName: 'Users'
    });
  }

  // 5. Budget Genius
  if (stats.money > 70) {
    badgesList.push({
      id: 'budget_genius',
      name: 'Budget Genius',
      description: 'Managed finances elegantly and maintained capital.',
      requirement: 'Money above 70',
      iconName: 'Coins'
    });
  }

  // 6. Focus Locked
  if (stats.focus > 85) {
    badgesList.push({
      id: 'focus_locked',
      name: 'Focus Locked',
      description: 'Demonstrated exceptional sharp mental clarity.',
      requirement: 'Focus above 85',
      iconName: 'Target'
    });
  }

  // 7. Energy Keeper
  if (stats.energy > 80) {
    badgesList.push({
      id: 'energy_keeper',
      name: 'Energy Keeper',
      description: 'Preserved cellular energy and avoided severe fatigue.',
      requirement: 'Energy above 80',
      iconName: 'BatteryCharging'
    });
  }

  // 8. Comeback Student
  if (finalScore > 250 && stats.stress < 50) {
    badgesList.push({
      id: 'comeback_student',
      name: 'Comeback Student',
      description: 'Ended with high stability and robust final performance.',
      requirement: 'Final score above 250 and stress below 50',
      iconName: 'Sparkles'
    });
  }

  return badgesList;
}

export function getStatStatus(statName: StatKey, value: number): string {
  switch (statName) {
    case 'energy':
      if (value <= 25) return 'Exhausted';
      if (value <= 50) return 'Low';
      if (value <= 75) return 'Stable';
      return 'Energized';
    case 'stress':
      if (value <= 25) return 'Calm';
      if (value <= 50) return 'Manageable';
      if (value <= 75) return 'Pressured';
      return 'Critical';
    case 'grades':
      if (value <= 25) return 'At Risk';
      if (value <= 50) return 'Needs Work';
      if (value <= 75) return 'Stable';
      return 'Strong';
    case 'money':
      if (value <= 25) return 'Almost Empty';
      if (value <= 50) return 'Tight';
      if (value <= 75) return 'Okay';
      return 'Comfortable';
    case 'focus':
      if (value <= 25) return 'Scattered';
      if (value <= 50) return 'Distracted';
      if (value <= 75) return 'Locked In';
      return 'Sharp';
    case 'social':
      if (value <= 25) return 'Isolated';
      if (value <= 50) return 'Quiet';
      if (value <= 75) return 'Connected';
      return 'Trusted';
    default:
      return '';
  }
}
