/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Goal } from '../types/simulation';
import { Target, CheckCircle2, XCircle } from 'lucide-react';

interface GoalStatusCardProps {
  goal: Goal | null;
  achieved: boolean;
  message: string;
}

export default function GoalStatusCard({ goal, achieved, message }: GoalStatusCardProps) {
  if (!goal) return null;

  return (
    <div className={`p-5 rounded-2xl border ${achieved ? 'bg-brand-green/5 border-brand-green/20' : 'bg-brand-coral/5 border-brand-coral/20'}`}>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl shrink-0 ${achieved ? 'bg-brand-green' : 'bg-brand-coral'}`}>
          {achieved ? <CheckCircle2 className="w-6 h-6 text-white" /> : <XCircle className="w-6 h-6 text-white" />}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Target className={`w-4 h-4 ${achieved ? 'text-brand-green' : 'text-brand-coral'}`} />
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-brand-navy/60">Selected Goal</h4>
          </div>
          <h3 className={`font-sans font-bold text-lg mb-2 ${achieved ? 'text-brand-green' : 'text-brand-coral'}`}>{goal.title}</h3>
          <p className="text-sm font-sans text-brand-ink/80 leading-relaxed font-medium">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
