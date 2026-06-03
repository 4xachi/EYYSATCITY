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
