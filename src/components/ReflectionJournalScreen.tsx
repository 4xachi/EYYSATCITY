/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReflectionEntry } from '../types/simulation';
import { BookOpen, ArrowRight } from 'lucide-react';

interface ReflectionJournalScreenProps {
  entry: ReflectionEntry | null;
  onContinue: () => void;
  isFriday: boolean;
}

export default function ReflectionJournalScreen({ entry, onContinue, isFriday }: ReflectionJournalScreenProps) {
  if (!entry) return null;

  return (
    <div className="min-h-[100dvh]  flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-brand-navy/10">
        
        {/* Header */}
        <div className="bg-brand-navy border-b border-brand-navy/10 p-6 sm:p-8 flex items-center gap-4 text-white">
          <BookOpen className="w-8 h-8 text-brand-salmon" />
          <div>
            <span className="text-brand-salmon/80 font-mono text-xs uppercase tracking-widest font-bold">Reflection Journal</span>
            <h2 className="text-2xl font-sans font-extrabold">{entry.day} completed</h2>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-mono text-brand-navy/50 uppercase tracking-widest font-bold mb-2">Scenario</h3>
              <p className="text-lg font-sans font-bold text-brand-ink">{entry.scenarioTitle}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-mono text-brand-navy/50 uppercase tracking-widest font-bold mb-2">Your Decision</h3>
              <div className="bg-brand-paper p-4 rounded-xl border border-brand-navy/10">
                <p className="font-sans text-brand-ink font-medium">"{entry.chosenChoiceTitle}"</p>
                <div className="mt-3 pt-3 border-t border-brand-navy/10">
                  <p className="text-sm text-brand-navy/70">{entry.feedback}</p>
                </div>
              </div>
            </div>

            {entry.randomEventTitle && (
              <div>
                <h3 className="text-sm font-mono text-brand-coral uppercase tracking-widest font-bold mb-2">Random Campus Event</h3>
                <div className="bg-brand-coral/5 p-4 rounded-xl border border-brand-coral/20">
                  <p className="font-sans font-bold text-brand-ink">{entry.randomEventTitle}</p>
                  <p className="text-sm text-brand-navy/70 mt-1">{entry.randomEventMessage}</p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-brand-navy/10">
              <h3 className="text-sm font-mono text-brand-navy/50 uppercase tracking-widest font-bold mb-3">Daily Reflection</h3>
              <p className="text-xl font-sans text-brand-ink italic mb-4 leading-relaxed">
                "{entry.reflectionText}"
              </p>
              <div className="bg-brand-ink text-white p-4 rounded-xl flex items-start gap-3">
                <span className="shrink-0 text-xl">💡</span>
                <p className="font-sans font-medium text-sm leading-relaxed">{entry.lessonText}</p>
              </div>
            </div>
          </div>

          <button
            onClick={onContinue}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-brand-blue text-white font-sans font-bold text-lg hover:bg-brand-navy transition-all shadow-md hover:shadow-lg"
          >
            {isFriday ? 'View Final Student Profile' : 'Return to Campus Map'}
            <ArrowRight className="w-5 h-5" />
          </button>

        </div>
      </div>
    </div>
  );
}
