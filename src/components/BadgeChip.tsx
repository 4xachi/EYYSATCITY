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
      whileHover={{ y: -5, scale: 1.03, boxShadow: '0 8px 25px rgba(6,182,212,0.15)' }}
      className="relative rounded-xl border border-cyan-500/15 bg-zinc-950/70 p-4 backdrop-blur-md flex gap-3.5 items-center transition-all duration-300"
    >
      {/* Decorative premium badge neon halo */}
      <div className="absolute inset-0 rounded-xl border border-cyan-500/5 hover:border-cyan-500/25 pointer-events-none transition-colors" />

      {/* Badge circular glowing medal wrapper */}
      <div className="p-3 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
        <IconComponent className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h4 className="text-sm font-extrabold text-white tracking-tight uppercase">
          {badge.name}
        </h4>
        <p className="text-xs text-zinc-400 leading-relaxed font-sans">
          {badge.description}
        </p>
        <span className="text-[9px] font-mono uppercase text-cyan-400/80 bg-cyan-950/20 px-1.5 py-0.5 rounded border border-cyan-500/10 block w-fit mt-1">
          REQD: {badge.requirement}
        </span>
      </div>
    </motion.div>
  );
}
