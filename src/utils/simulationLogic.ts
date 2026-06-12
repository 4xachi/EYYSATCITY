/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Stats, FinalResult, Badge, StatKey, DecisionMemory, Goal, Choice, RandomEvent, ReflectionEntry, ChoiceHistoryEntry, WhatIfSuggestion, Scenario, RunMeta } from '../types/simulation';
import { ALL_BADGES } from '../data/badges';

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

export function evaluateGoal(selectedGoal: Goal | null, stats: Stats, finalScore: number): boolean {
  if (!selectedGoal || !selectedGoal.evaluate) return false;
  return selectedGoal.evaluate(stats, finalScore);
}

export function getStrongestStat(stats: Omit<Stats, 'stress'>): StatKey {
  const positiveStats = { energy: stats.energy, grades: stats.grades, money: stats.money, focus: stats.focus, social: stats.social };
  return Object.keys(positiveStats).reduce((a, b) => positiveStats[a as keyof typeof positiveStats] > positiveStats[b as keyof typeof positiveStats] ? a : b) as StatKey;
}

export function getWeakestStat(stats: Omit<Stats, 'stress'>): StatKey {
  const positiveStats = { energy: stats.energy, grades: stats.grades, money: stats.money, focus: stats.focus, social: stats.social };
  return Object.keys(positiveStats).reduce((a, b) => positiveStats[a as keyof typeof positiveStats] < positiveStats[b as keyof typeof positiveStats] ? a : b) as StatKey;
}

export function getRiskPattern(stats: Stats, decisionMemory: DecisionMemory): string {
  if (stats.stress >= 75) return 'High Stress Accumulation';
  if (stats.energy <= 30) return 'Chronic Fatigue';
  if (stats.money <= 30 && decisionMemory.borrowedMoney) return 'Dependent Budgeting';
  if (stats.social <= 30 && decisionMemory.handledProjectAlone) return 'Isolation Working';
  if (decisionMemory.crammedAtMidnight || decisionMemory.skippedMeal) return 'Last-Minute Scrambling';
  return 'Generally Balanced';
}

export function getSuggestedNextGoal(stats: Stats, decisionMemory: DecisionMemory): string {
  if (stats.stress >= 70) return 'Avoid Burnout';
  if (stats.money <= 40) return 'Save Money';
  if (stats.social <= 40) return 'Build Social Life';
  if (stats.grades <= 60) return 'Get High Grades';
  return 'Balanced Run';
}

export function calculateFinalResult(stats: Stats, decisionMemory: DecisionMemory, selectedGoal: Goal | null): FinalResult {
  const finalScore = calculateFinalScore(stats);
  const goalAchieved = evaluateGoal(selectedGoal, stats, finalScore);
  const goalMessage = goalAchieved
    ? "You successfully met your primary goal."
    : "You survived, but your main goal slipped away.";

  // Determine Letter Grade Level for display
  let gradeLevel = 'C';
  if (finalScore >= 330) gradeLevel = 'A+';
  else if (finalScore >= 290) gradeLevel = 'A';
  else if (finalScore >= 250) gradeLevel = 'B';
  else if (finalScore >= 200) gradeLevel = 'C';
  else if (finalScore >= 150) gradeLevel = 'D';
  else gradeLevel = 'F';

  const hasRiskyChoice = decisionMemory.skippedMeal || decisionMemory.ignoredProject || decisionMemory.crammedAtMidnight || decisionMemory.overworked || decisionMemory.gaveUpFinal;

  let title = 'Survived the Week';
  let description = 'You made it through the week with mixed results. Some choices helped you, while others made student life harder.';

  if (finalScore < 170 || stats.grades <= 35 || stats.focus <= 30) {
    title = 'Crisis Mode Student';
    description = 'The week became overwhelming. Your choices led to too much pressure, low energy, or weak performance. Try again with better balance.';
  } else if (stats.stress >= 80 || stats.energy <= 25) {
    title = 'Burnout Survivor';
    description = 'You survived the week, but your stress became too high or your energy dropped too low. Your result shows that rest and balance are also part of success.';
  } else if (stats.grades >= 85 && stats.stress >= 65) {
    title = 'Academic Beast';
    description = 'Your academic performance is strong, but it came with a cost. You pushed hard, but your energy and peace suffered.';
  } else if (decisionMemory.handledProjectAlone || (decisionMemory.createdTaskPlan && stats.stress >= 70)) {
    title = 'Overloaded Leader';
    description = 'You carried responsibility for others. Your leadership helped the outcome, but the pressure became heavy.';
  } else if (stats.social >= 80 && stats.grades >= 55) {
    title = 'Social Strategist';
    description = 'You used communication and teamwork to survive the week. You proved that student life is not meant to be handled alone.';
  } else if (stats.money >= 75 && finalScore >= 240) {
    title = 'Budget Genius';
    description = 'You managed your allowance wisely while still surviving the school week. Your budget discipline gave you more control.';
  } else if (finalScore >= 260 && stats.stress <= 60 && hasRiskyChoice) {
    title = 'Comeback Student';
    description = 'You made some risky choices, but you recovered before the week ended. Your result shows improvement and adjustment.';
  } else if (decisionMemory.crammedAtMidnight || (finalScore >= 250 && stats.focus >= 70 && stats.stress >= 60)) {
    title = 'Last-Minute Hero';
    description = 'You relied on pressure and late effort to survive. It worked this time, but it is not the safest strategy.';
  } else if (stats.social <= 35 && finalScore >= 220) {
    title = 'Silent Survivor';
    description = 'You made it through the week quietly. You survived, but your result shows that support and communication could have made things easier.';
  } else if (stats.stress <= 30 && stats.grades <= 55 && stats.focus <= 55) {
    title = 'Chill but Risky';
    description = 'You stayed relaxed, but some responsibilities were left behind. Comfort is good, but too much avoidance can hurt your progress.';
  } else if (finalScore >= 330 && stats.stress <= 60 && stats.energy >= 50) {
    title = 'Future Ready Student';
    description = 'You balanced schoolwork, health, and decisions well. You did not just survive the week — you handled it wisely.';
  } else if (finalScore >= 270 && stats.stress <= 65) {
    title = 'Balanced Achiever';
    description = 'You made practical choices and kept your student life stable. You may not be perfect, but you know how to balance pressure and responsibility.';
  }

  return {
    title,
    description,
    gradeLevel,
    finalScore,
    goalAchieved,
    goalMessage,
    strongestStat: getStrongestStat(stats),
    weakestStat: getWeakestStat(stats),
    riskPattern: getRiskPattern(stats, decisionMemory),
    suggestedNextGoal: getSuggestedNextGoal(stats, decisionMemory)
  };
}

export function checkBadges(stats: Stats, finalScore: number, decisionMemory: DecisionMemory, selectedGoal: Goal | null, goalAchieved: boolean, runMeta: RunMeta): Badge[] {
  return ALL_BADGES.filter(badge => {
    if (badge.evaluate) {
      return badge.evaluate(stats, finalScore, decisionMemory, selectedGoal, goalAchieved, runMeta);
    }
    return false;
  });
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

export function getScenarioVariant(scenario: Scenario, dayIndex: number, stats: Stats, decisionMemory: DecisionMemory): Scenario {
  const modified = { ...scenario };
  
  if (dayIndex === 1) { // Tuesday
    if (decisionMemory.studiedEarly) {
      modified.description = "Because you prepared early yesterday, your mind feels clearer today. " + modified.description;
    } else if (decisionMemory.crammedAtMidnight) {
      modified.description = "Because you crammed late last night, you start the day with lower energy. " + modified.description;
    }
  } else if (dayIndex === 2) { // Wednesday
    if (decisionMemory.skippedMeal) {
      modified.description = "Skipping food yesterday made it harder to focus today. " + modified.description;
    } else if (decisionMemory.savedMoney) {
      modified.description = "Your practical spending yesterday helped you enter the day with less budget pressure. " + modified.description;
    }
  } else if (dayIndex === 3) { // Thursday
    if (decisionMemory.handledProjectAlone) {
      modified.description = "You carried most of the group project alone, and now the pressure is catching up. " + modified.description;
    } else if (decisionMemory.createdTaskPlan) {
      modified.description = "Your group has clearer direction because of yesterday’s task plan, but you still need to manage your own stress. " + modified.description;
    } else if (decisionMemory.ignoredProject) {
      modified.description = "The ignored project is now becoming a serious problem. " + modified.description;
    }
  } else if (dayIndex === 4) { // Friday
    if (decisionMemory.ignoredProject || decisionMemory.handledProjectAlone) {
      modified.title = "Final Challenge: Project Pressure";
      modified.description = "The final day arrives with your project still creating pressure. Your earlier group decisions are affecting the deadline. " + modified.description;
    } else if (stats.stress >= 75 || stats.energy <= 30 || decisionMemory.overworked) {
      modified.title = "Final Challenge: Burnout Risk";
      modified.description = "You reached Friday, but your body and mind are running low. Every move now matters. " + modified.description;
    } else if (decisionMemory.studiedEarly && decisionMemory.createdTaskPlan && stats.stress <= 60) {
      modified.title = "Final Challenge: Prepared Momentum";
      modified.description = "Your earlier planning is paying off. You enter the final day with a better chance to finish strong. " + modified.description;
    }
  }
  
  return modified;
}

export function generateReflectionEntry(day: string, location: string, scenarioTitle: string, chosenChoice: Choice, randomEvent: RandomEvent | null, statChanges: Partial<Stats>, endStressLevel?: number, statsSnapshot?: Stats): ReflectionEntry {
  let mood: ReflectionEntry["mood"] = "balanced";
  let reflectionText = "You got through the day with moderate choices.";
  let lessonText = "Consistency is key in student life.";

  if ((statChanges.stress || 0) >= 20) {
    mood = "stressful";
    reflectionText = "Today helped your progress, but the pressure became heavier.";
    lessonText = "Not all progress is worth the immediate burnout.";
  } else if ((statChanges.grades || 0) > 10 && (statChanges.stress || 0) <= 0) {
    mood = "strong";
    reflectionText = "You made a smart academic choice without creating unnecessary pressure.";
    lessonText = "Planning early can reduce stress later.";
  } else if ((statChanges.energy || 0) <= -20) {
    mood = "risky";
    reflectionText = "You got through the day, but your energy took a serious hit.";
    lessonText = "Skipping basic needs can hurt your focus in the long run.";
  } else if ((statChanges.social || 0) >= 15) {
    mood = "recovered";
    reflectionText = "Communication made the day easier to handle.";
    lessonText = "Teamwork works better when communication is clear.";
  } else if ((statChanges.stress || 0) <= -15) {
    mood = "recovered";
    reflectionText = "You took time out to let your mind recover.";
    lessonText = "Rest is not wasted time when it protects your focus.";
  }

  return {
    day,
    location,
    scenarioTitle,
    chosenChoiceTitle: chosenChoice.text,
    feedback: chosenChoice.feedback,
    randomEventTitle: randomEvent?.title,
    randomEventMessage: randomEvent?.message,
    totalStatChanges: statChanges,
    reflectionText,
    lessonText,
    mood,
    endStressLevel,
    statsSnapshot
  };
}

export function getWhatIfSuggestion(choiceHistory: ChoiceHistoryEntry[], selectedGoal: Goal | null): WhatIfSuggestion | null {
  // Find a risky choice
  const riskyIndex = choiceHistory.findIndex(entry => {
    const ef = entry.chosenEffects;
    return (ef.stress || 0) >= 15 || (ef.energy || 0) <= -20 || (ef.grades || 0) <= -15 || (ef.focus || 0) <= -15 || (ef.money || 0) <= -20 || (ef.social || 0) <= -15;
  });

  if (riskyIndex === -1) return null;

  const entry = choiceHistory[riskyIndex];
  
  // Find a less risky alternative
  const alternatives = entry.availableChoices.filter(c => c.text !== entry.chosenChoiceTitle);
  const betterAlternative = alternatives.find(c => {
    const ef = c.effects;
    return (ef.stress || 0) < 15 && (ef.energy || 0) > -20;
  });

  if (!betterAlternative) return null;

  const ed: Partial<Stats> = {
    stress: (betterAlternative.effects.stress || 0) - (entry.chosenEffects.stress || 0),
    energy: (betterAlternative.effects.energy || 0) - (entry.chosenEffects.energy || 0),
    grades: (betterAlternative.effects.grades || 0) - (entry.chosenEffects.grades || 0),
    money: (betterAlternative.effects.money || 0) - (entry.chosenEffects.money || 0),
    social: (betterAlternative.effects.social || 0) - (entry.chosenEffects.social || 0),
    focus: (betterAlternative.effects.focus || 0) - (entry.chosenEffects.focus || 0),
  };

  return {
    day: entry.day,
    scenarioTitle: entry.scenarioTitle,
    actualChoice: entry.chosenChoiceTitle,
    alternativeChoice: betterAlternative.text,
    actualEffects: entry.chosenEffects,
    alternativeEffects: betterAlternative.effects,
    estimatedDifference: ed,
    explanation: `Your actual choice made things heavier. Choosing "${betterAlternative.text}" would have improved the outcome while protecting your status.`
  };
}
