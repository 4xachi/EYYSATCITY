/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DecisionMemory } from '../types/simulation';
import { History } from 'lucide-react';

interface ChoiceMemoryCardProps {
  decisionMemory: DecisionMemory | null;
}

export default function ChoiceMemoryCard({ decisionMemory }: ChoiceMemoryCardProps) {
  if (!decisionMemory) return null;

  const activeMemories: string[] = [];

  if (decisionMemory.studiedEarly) activeMemories.push("Prepared early.");
  if (decisionMemory.skippedMeal) activeMemories.push("Skipped a meal.");
  if (decisionMemory.createdTaskPlan) activeMemories.push("Created task plan.");
  if (decisionMemory.handledProjectAlone) activeMemories.push("Carried group alone.");
  if (decisionMemory.crammedAtMidnight) activeMemories.push("Crammed late.");
  if (decisionMemory.borrowedMoney) activeMemories.push("Borrowed money.");

  if (activeMemories.length === 0) return null;

  // Show only up to 3 recent or important memories to keep UI clean
  const displayMemories = activeMemories.slice(-3);

  return (
    <div className="bg-brand-paper p-3 sm:p-4 rounded-xl border border-brand-navy/10 mt-4">
      <div className="flex items-center gap-2 mb-2">
        <History className="w-4 h-4 text-brand-blue" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-navy/60">Choice Memory</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {displayMemories.map((note, index) => (
          <span key={index} className="px-2.5 py-1 bg-brand-cream/60 border border-brand-navy/10 rounded-md text-[11px] font-sans text-brand-ink font-medium shadow-sm">
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}
