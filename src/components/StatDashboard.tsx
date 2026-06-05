/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Stats, StatKey } from '../types/simulation';
import StatBar from './StatBar';
import { Activity } from 'lucide-react';

interface StatDashboardProps {
  stats: Stats;
  statChanges: Partial<Stats> | null;
}

export default function StatDashboard({ stats, statChanges }: StatDashboardProps) {
  // Ordered keys for presentation
  const orderedKeys: StatKey[] = ['energy', 'grades', 'stress', 'money', 'focus', 'social'];

  return (
    <div className="space-y-4">
      {/* Mini Title Grid */}
      <div className="flex flex-wrap items-center justify-between border-b border-brand-navy/10 pb-2 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
          <h3 className="text-sm font-mono tracking-widest text-brand-ink uppercase flex items-center gap-1 font-bold">
            <Activity className="w-4 h-4 text-brand-blue" /> Current Stats
          </h3>
        </div>
        <p className="text-[9px] font-mono text-brand-navy/50 uppercase font-bold tracking-wider">Clamped 0 - 100 max</p>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {orderedKeys.map((key) => {
          const value = stats[key];
          const latestChange = statChanges ? statChanges[key] : undefined;

          return (
            <StatBar
              key={key}
              statKey={key}
              value={value}
              latestChange={latestChange}
            />
          );
        })}
      </div>
    </div>
  );
}
