/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReflectionEntry } from '../types/simulation';
import { BookMarked } from 'lucide-react';

interface WeeklyReflectionReportProps {
  journal: ReflectionEntry[];
}

export default function WeeklyReflectionReport({ journal }: WeeklyReflectionReportProps) {
  if (!journal || journal.length === 0) return null;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-navy/10 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookMarked className="w-5 h-5 text-brand-salmon" />
            <h3 className="text-xl font-sans font-extrabold text-brand-ink uppercase tracking-tight">Weekly Reflection Report</h3>
          </div>
          <p className="text-sm font-sans text-brand-navy/60">A look back at your daily decisions and what you learned.</p>
        </div>
      </div>

      <div className="space-y-4">
        {journal.map((entry, index) => (
          <div key={index} className="bg-brand-paper p-4 rounded-xl border border-brand-navy/5">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded">
                {entry.day}
              </span>
            </div>
            <p className="font-sans text-sm text-brand-ink font-medium mb-3 border-l-2 border-brand-blue/30 pl-3 py-1">
              {entry.chosenChoiceTitle}
            </p>
            <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-brand-navy/5">
              <span className="shrink-0">💡</span>
              <p className="text-xs font-sans text-brand-navy/70 leading-relaxed font-medium">
                {entry.lessonText}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
