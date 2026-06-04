/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Scale, 
  GraduationCap, 
  ShieldAlert, 
  Users, 
  Coins, 
  Target, 
  BatteryCharging, 
  Sparkles,
  Trophy
} from 'lucide-react';
import { Badge } from '../types/simulation';

const badgeIconMap: { [key: string]: any } = {
  Scale: Scale,
  GraduationCap: GraduationCap,
  ShieldAlert: ShieldAlert,
  Users: Users,
  Coins: Coins,
  Target: Target,
  BatteryCharging: BatteryCharging,
  Sparkles: Sparkles,
};

interface BadgeChipProps {
  key?: any;
  badge: Badge;
}

export default function BadgeChip({ badge }: BadgeChipProps) {
  const IconComponent = badgeIconMap[badge.iconName] || Trophy;

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01, boxShadow: '0 8px 20px rgba(30,42,68,0.04)' }}
      className="relative rounded-2xl border border-brand-navy/15 bg-brand-paper p-4 flex gap-4 items-center transition-all duration-300 shadow-sm"
    >
      {/* Badge circular scholastic pin medal wrapper */}
      <div className="p-3 rounded-full bg-brand-amber/10 border border-brand-amber/20 text-brand-amber flex items-center justify-center shrink-0">
        <IconComponent className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="space-y-0.5 select-none">
        <h4 className="text-sm font-bold text-brand-ink uppercase tracking-tight font-sans">
          {badge.name}
        </h4>
        <p className="text-xs text-brand-navy/75 leading-relaxed font-sans">
          {badge.description}
        </p>
        <span className="text-[8px] font-mono uppercase text-brand-navy/55 bg-brand-cream px-2 py-0.5 rounded-lg border border-brand-navy/10 block w-fit mt-1.5 font-bold">
          CRITERIA: {badge.requirement}
        </span>
      </div>
    </motion.div>
  );
}
