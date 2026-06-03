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
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <h3 className="text-sm font-mono tracking-widest text-[#cbd5e1] uppercase flex items-center gap-1">
            <Activity className="w-4 h-4 text-cyan-400" /> Current Stats
          </h3>
        </div>
        <p className="text-[10px] font-mono text-zinc-500 uppercase">Clamped 0 - 100 max</p>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
