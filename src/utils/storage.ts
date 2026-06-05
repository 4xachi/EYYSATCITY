/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface BestScoreInfo {
  score: number;
  resultTitle: string;
}

export function saveBestScore(score: number, resultTitle: string): void {
  try {
    const currentBest = loadBestScore();
    if (score > currentBest.score) {
      localStorage.setItem('eyysatcity_best_score', score.toString());
      localStorage.setItem('eyysatcity_best_result', resultTitle);
    }
  } catch (error) {
    console.warn('LocalStorage is not available:', error);
  }
}

export function loadBestScore(): BestScoreInfo {
  try {
    const scoreStr = localStorage.getItem('eyysatcity_best_score');
    const resultTitle = localStorage.getItem('eyysatcity_best_result');
    return {
      score: scoreStr ? parseInt(scoreStr, 10) : 0,
      resultTitle: resultTitle || 'None Yet'
    };
  } catch (error) {
    return {
      score: 0,
      resultTitle: 'None Yet'
    };
  }
}

export function loadUnlockedBadges(): string[] {
  try {
    const badgesStr = localStorage.getItem('eyysat_city_unlocked_badges');
    return badgesStr ? JSON.parse(badgesStr) : [];
  } catch (error) {
    return [];
  }
}

export function saveUnlockedBadges(badges: string[]): void {
  try {
    localStorage.setItem('eyysat_city_unlocked_badges', JSON.stringify(badges));
  } catch (error) {
    console.warn('LocalStorage is not available:', error);
  }
}

export function updateUnlockedBadges(newBadgeIds: string[]): string[] {
  const currentBadges = loadUnlockedBadges();
  const updatedBadges = [...new Set([...currentBadges, ...newBadgeIds])];
  saveUnlockedBadges(updatedBadges);
  return updatedBadges;
}

export function loadCompletedRuns(): number {
  try {
    const countStr = localStorage.getItem('eyysat_city_completed_runs');
    return countStr ? parseInt(countStr, 10) : 0;
  } catch (error) {
    return 0;
  }
}

export function saveCompletedRuns(count: number): void {
  try {
    localStorage.setItem('eyysat_city_completed_runs', count.toString());
  } catch (error) {
    console.warn('LocalStorage is not available:', error);
  }
}
