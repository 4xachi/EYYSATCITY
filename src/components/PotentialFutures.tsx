/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  TrendingUp, 
  Zap, 
  Smile, 
  Terminal, 
  Activity, 
  Award, 
  Sparkles, 
  ArrowRight,
  Shield,
  HelpCircle
} from 'lucide-react';
import { Stats, Badge } from '../types/simulation';

interface CareerPath {
  id: string;
  title: string;
  sector: string;
  classTag: "CLASS S" | "CLASS A" | "CLASS B" | "CLASS DETRIMENTAL";
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  textColor: string;
  accentBg: string;
  idealProfile: {
    grades?: number;
    stress?: number;
    money?: number;
    energy?: number;
    focus?: number;
    social?: number;
  };
  alignmentReason: string;
}

const CAREER_REGISTRY: CareerPath[] = [
  {
    id: "neo_cyber_director",
    title: "Neo-Cyber Spire Director",
    sector: "Academic Data Spire",
    classTag: "CLASS S",
    description: "You supervise the algorithmic flow of synthetic intelligence in EYYSAT’s central cognitive spire. You analyze student focus records to optimize regional academic output.",
    icon: Cpu,
    color: "bg-[#4F7BFF]/10 border-[#4F7BFF]/35 text-[#4F7BFF]",
    textColor: "text-[#4F7BFF]",
    accentBg: "bg-[#4F7BFF]/5",
    idealProfile: { grades: 85, focus: 80, stress: 30 },
    alignmentReason: "Triggered by your outstanding Academic Focus and Term GPAs."
  },
  {
    id: "autonomous_venture_strategist",
    title: "Venture Protocol Analyst",
    sector: "District Wealth Block",
    classTag: "CLASS S",
    description: "You deploy self-executing capital protocols across the city's hyper-active smart sectors. You turn micro-loans into sustainable urban infrastructure.",
    icon: TrendingUp,
    color: "bg-[#F5B84B]/10 border-[#F5B84B]/35 text-[#F5B84B]",
    textColor: "text-brand-amber",
    accentBg: "bg-brand-amber/5",
    idealProfile: { money: 80, focus: 60 },
    alignmentReason: "Your excellent financial discipline paired with strong focus metrics."
  },
  {
    id: "sub_grid_syndicate_broker",
    title: "Sub-Grid Network Broker",
    sector: "Lower Underground",
    classTag: "CLASS B",
    description: "You navigate trading favors, unregistered modchips, and synthetic energy units in the vibrant neon alleyways beneath EYYSAT’s high-rises.",
    icon: Terminal,
    color: "bg-purple-500/10 border-purple-500/30 text-purple-600",
    textColor: "text-purple-600",
    accentBg: "bg-purple-500/5",
    idealProfile: { social: 75, grades: 40, stress: 60 },
    alignmentReason: "Based on your profound social intelligence amidst tight academic pressures."
  },
  {
    id: "harmony_architect",
    title: "District Welfare Steward",
    sector: "Socio-Residential Ward",
    classTag: "CLASS A",
    description: "You manage community emotional stability and coordinate local festivals to maintain zero-stress zen states across residential zones.",
    icon: Smile,
    color: "bg-[#4FA66A]/10 border-[#4FA66A]/35 text-[#4FA66A]",
    textColor: "text-[#4FA66A]",
    accentBg: "bg-[#4FA66A]/5",
    idealProfile: { social: 80, stress: 25, energy: 65 },
    alignmentReason: "Your low-stress index combined with magnificent social rapport."
  },
  {
    id: "grid_power_engineer",
    title: "Quantum Grid Core Technician",
    sector: "Deep Energy Wards",
    classTag: "CLASS A",
    description: "You maintain EYYSAT’s subterranean hyperloop core. Your high stamina ensures that energy overflows correctly without triggering a neighborhood surge.",
    icon: Zap,
    color: "bg-cyan-500/10 border-cyan-500/35 text-cyan-600",
    textColor: "text-cyan-600",
    accentBg: "bg-cyan-500/5",
    idealProfile: { energy: 85, stress: 40 },
    alignmentReason: "Your robust energy reserve level and steady physical output."
  },
  {
    id: "academic_bio_overseer",
    title: "Bio-Augment Consultant",
    sector: "Neural Optimization Lab",
    classTag: "CLASS B",
    description: "Having survived the heaviest burnout, you counsel students on safe cognitive neural filters and performance stimulant regulators.",
    icon: Activity,
    color: "bg-[#F26D5B]/10 border-[#F26D5B]/35 text-[#F26D5B]",
    textColor: "text-[#F26D5B]",
    accentBg: "bg-[#F26D5B]/5",
    idealProfile: { stress: 80, grades: 70 },
    alignmentReason: "Triggered by your experience dealing with high-burnout academic schedules."
  }
];

interface PotentialFuturesProps {
  finalStats: Stats;
  badgesEarned: Badge[];
}

export default function PotentialFutures({ finalStats, badgesEarned }: PotentialFuturesProps) {
  const [selectedCareerId, setSelectedCareerId] = useState<string | null>(null);

  // Math score algorithm to determine the top 3 best fits
  const evaluatedCareers = CAREER_REGISTRY.map(career => {
    let differenceSum = 0;
    let count = 0;

    Object.entries(career.idealProfile).forEach(([stat, targetVal]) => {
      const actualVal = finalStats[stat as keyof Stats] ?? 50;
      // Calculate how close the actual stat is to the target
      // Higher score = smaller difference
      if (stat === 'stress' && targetVal !== undefined) {
        // For stress, if player is low and target is low, that's high compatibility.
        // If player is high and target is high, that's high compatibility.
        differenceSum += Math.abs(actualVal - targetVal);
      } else if (targetVal !== undefined) {
        differenceSum += Math.abs(actualVal - targetVal);
      }
      count++;
    });

    // Match percentage: 100 - average offset
    const avgDiff = count > 0 ? differenceSum / count : 0;
    const matchPercentage = Math.round(Math.max(45, Math.min(99, 100 - avgDiff * 0.75)));

    // Badge boost: Boost specific paths if player holds aligning badges
    let finalMatch = matchPercentage;
    if (career.id === "neo_cyber_director" && badgesEarned.some(b => b.id.includes("grade") || b.id.includes("ace"))) {
      finalMatch = Math.min(99, finalMatch + 8);
    }
    if (career.id === "autonomous_venture_strategist" && badgesEarned.some(b => b.id.includes("money") || b.id.includes("save"))) {
      finalMatch = Math.min(99, finalMatch + 8);
    }
    if (career.id === "harmony_architect" && badgesEarned.some(b => b.id.includes("social") || b.id.includes("friend"))) {
      finalMatch = Math.min(99, finalMatch + 8);
    }
    if (career.id === "academic_bio_overseer" && badgesEarned.some(b => b.id.includes("stress") || b.id.includes("burn"))) {
      finalMatch = Math.min(99, finalMatch + 8);
    }

    return {
      ...career,
      matchPercentage: finalMatch
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage); // Sort by highest compatibility match

  // Select top 3 careers
  const recommendedCareers = evaluatedCareers.slice(0, 3);

  return (
    <div className="bg-[#FFFDF7] rounded-3xl border border-brand-navy/12 p-6 sm:p-8 shadow-md relative text-left overflow-hidden">
      {/* Notebook margin line */}
      <div className="absolute left-6 top-0 bottom-0 w-[1.5px] bg-brand-coral/30 pointer-events-none" />

      <div className="pl-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-navy/8 pb-4">
          <div className="space-y-0.5">
            <span className="text-brand-blue font-mono text-[10px] font-bold uppercase tracking-widest block">
              EYYSAT CITY UNIVERSE PROJECTIONS
            </span>
            <h3 className="text-xl sm:text-2xl font-sans font-black text-brand-ink uppercase tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-amber animate-pulse" />
              Potential Futures Analysis
            </h3>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#F7F3EA] border border-brand-navy/10 text-brand-navy/60 font-mono text-[9px] font-bold uppercase self-start sm:self-center">
            <span>Core Diagnostics Checked</span>
          </div>
        </div>

        <p className="text-sm text-brand-navy/70 leading-relaxed max-w-xl font-medium">
          Based on the stats accumulated at the end of your term, neural forecast networks have simulated your path forward inside the EYYSAT technology metropolis. Explore your 3 most compatible careers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedCareers.map((career) => {
            const IconComponent = career.icon;
            const isSelected = selectedCareerId === career.id;

            return (
              <div
                key={career.id}
                onClick={() => setSelectedCareerId(isSelected ? null : career.id)}
                className={`group p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px] select-none ${
                  isSelected 
                    ? "bg-[#172033]/95 border-brand-navy text-[#FFFDF7] scale-[1.02] shadow-lg" 
                    : "bg-white hover:bg-brand-paper hover:-translate-y-1 border-brand-navy/10 shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div className={`p-2.5 rounded-xl border ${career.color} shrink-0`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-[8px] font-mono font-black border uppercase px-1.5 py-0.5 rounded ${
                        isSelected 
                          ? "border-white/20 bg-white/10 text-brand-amber"
                          : "border-brand-navy/15 text-brand-navy/55 bg-brand-paper"
                      }`}>
                        {career.classTag}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-brand-green mt-1">
                        {career.matchPercentage}% Match
                      </span>
                    </div>
                  </div>

                  <h4 className={`font-sans font-black text-sm uppercase tracking-wide group-hover:text-brand-blue transition-colors ${
                    isSelected ? "text-white" : "text-brand-ink"
                  }`}>
                    {career.title}
                  </h4>
                  <span className={`text-[9px] font-mono uppercase tracking-widest font-bold block mb-3 opacity-60`}>
                    {career.sector}
                  </span>

                  <p className={`text-xs font-sans leading-relaxed transition-opacity ${
                    isSelected ? "text-white/85" : "text-brand-navy/70"
                  }`}>
                    {career.description}
                  </p>
                </div>

                <div className="mt-4 pt-3.5 border-t border-brand-navy/8 flex flex-col gap-2">
                  <span className={`text-[9px] font-mono font-black uppercase text-left ${
                    isSelected ? "text-brand-amber" : "text-brand-coral"
                  }`}>
                    Alignment Factor:
                  </span>
                  <span className={`text-[10px] font-sans leading-snug font-medium ${
                    isSelected ? "text-white/70" : "text-brand-navy/60"
                  }`}>
                    {career.alignmentReason}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {recommendedCareers.length > 0 && (
          <div className="bg-brand-paper/50 p-4 rounded-xl border border-brand-navy/5 flex items-start gap-2.5 text-xs text-brand-navy/60 leading-relaxed font-sans mt-2">
            <span className="text-sm">💡</span>
            <p>
              <strong>Futuristic Lore Tip:</strong> High focus and positive grades secure safer executive roles inside the Core City sectors, while high stress experience empowers resilience in peripheral containment circles. Change your gameplay strategies next week to unlock more paths!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
