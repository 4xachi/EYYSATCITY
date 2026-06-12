/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Badge } from '../types/simulation';
import { ALL_BADGES } from '../data/badges';
import { Award, Lock } from 'lucide-react';

interface BadgeCollectionProps {
  unlockedBadgeIds: string[];
}

export default function BadgeCollection({ unlockedBadgeIds }: BadgeCollectionProps) {
  return (
    <div className="bg-brand-paper p-6 sm:p-8 rounded-3xl border border-brand-navy/10 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-6 h-6 text-brand-gold" />
            <h3 className="text-xl font-sans font-extrabold text-brand-ink uppercase tracking-tight">Badge Collection</h3>
          </div>
          <p className="text-sm font-sans text-brand-navy/60">Unlock permanent badges across multiple runs.</p>
        </div>
        <div className="bg-brand-paper px-4 py-2 rounded-lg border border-brand-navy/5">
          <span className="font-mono text-sm font-bold text-brand-ink">
            {unlockedBadgeIds.length} / {ALL_BADGES.length} <span className="text-brand-navy/40 ml-1">Unlocked</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {ALL_BADGES.map((badge) => {
          const isUnlocked = unlockedBadgeIds.includes(badge.id);

          return (
            <div 
              key={badge.id}
              className={`p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full ${
                isUnlocked 
                  ? 'bg-gradient-to-br from-brand-gold/10 to-transparent border-brand-gold/30 shadow-sm' 
                  : 'bg-brand-paper border-brand-navy/5 grayscale-[50%] opacity-70'
              }`}
            >
              {!isUnlocked && (
                <div className="absolute top-4 right-4 animate-pulse">
                  <Lock className="w-4 h-4 text-brand-navy/30" />
                </div>
              )}
              
              <div className="flex flex-col justify-between h-full w-full space-y-4">
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isUnlocked ? 'bg-brand-gold text-white shadow-md' : 'bg-brand-navy/10 text-brand-navy/40'
                  }`}>
                    <Award className="w-5 h-5" />
                  </div>
                  
                  <div>
                    <h4 className={`font-sans font-bold mb-1 ${isUnlocked ? 'text-brand-ink' : 'text-brand-navy/60'}`}>
                      {badge.name}
                    </h4>
                    <p className="text-xs font-sans text-brand-navy/50 leading-relaxed">
                      {isUnlocked ? badge.description : 'Hidden achievement.'}
                    </p>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-brand-navy/10 mt-auto">
                  <span className="text-[9px] font-mono uppercase font-bold text-brand-navy/40 block mb-1">Requirement</span>
                  <span className={`text-xs font-mono font-medium ${isUnlocked ? 'text-brand-ink' : 'text-brand-navy/50'}`}>
                    {badge.requirementText || badge.requirement}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
