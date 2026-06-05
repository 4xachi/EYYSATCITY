/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Coffee, 
  Pizza, 
  FileText, 
  Gamepad2, 
  Brain, 
  Sparkles, 
  Package, 
  Coins, 
  Check, 
  Trash2,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { Stats } from '../types/simulation';
import { playClickSound, playPositiveSound, playWarningSound } from '../utils/audio';

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  effects: Partial<Stats>;
  rarity: 'Common' | 'Rare' | 'Legendary';
  color: string; // Tailwind glow border color codes
  badgeColor: string;
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'espresso',
    name: '☕ Nano-Jet Double Espresso',
    description: 'Bypasses adenosine receptors using atomic steam. +20 Energy, -5 Focus, +8 Stress.',
    cost: 6,
    effects: { energy: 20, focus: -5, stress: 8 },
    rarity: 'Common',
    color: 'border-brand-blue/15 hover:border-brand-blue bg-brand-blue/5',
    badgeColor: 'bg-brand-blue/10 text-brand-blue'
  },
  {
    id: 'burger',
    name: '🍔 Tactical C canteen Burger',
    description: 'Deep-fried thermodynamic carb-cluster. +30 Energy, -10 Focus, -12 Stress.',
    cost: 10,
    effects: { energy: 30, focus: -10, stress: -12 },
    rarity: 'Common',
    color: 'border-brand-navy/12 hover:border-brand-ink bg-brand-navy/5',
    badgeColor: 'bg-brand-navy/10 text-brand-ink'
  },
  {
    id: 'nootropic',
    name: '💊 Nootropix-X Neural Pill',
    description: 'Increases cerebral bandwidth. +25 Focus, +10 Grades, -15 Energy.',
    cost: 15,
    effects: { focus: 25, grades: 10, energy: -15 },
    rarity: 'Rare',
    color: 'border-[#4F7BFF]/30 hover:border-[#4F7BFF] bg-[#4F7BFF]/5',
    badgeColor: 'bg-[#4F7BFF]/10 text-brand-blue'
  },
  {
    id: 'cheatsheet',
    name: '📝 Calculus Leak Sheet',
    description: 'Formulas written in microscopic invisible ink. +20 Grades, +18 Stress.',
    cost: 22,
    effects: { grades: 20, stress: 18 },
    rarity: 'Rare',
    color: 'border-[#E5A93C]/30 hover:border-[#E5A93C] bg-[#E5A93C]/5',
    badgeColor: 'bg-[#E5A93C]/10 text-[#A6751B]'
  },
  {
    id: 'gaming',
    name: '🎮 Voxel-VR Escape Pod',
    description: 'Submerge into a simulated visual realm. -35 Stress, +20 Social, -15 Focus.',
    cost: 18,
    effects: { stress: -35, social: 20, focus: -15 },
    rarity: 'Rare',
    color: 'border-brand-lavender/30 hover:border-brand-lavender bg-brand-lavender/5',
    badgeColor: 'bg-brand-lavender/10 text-brand-lavender'
  },
  {
    id: 'canteen_pass',
    name: '🎟️ VIP Canteen Pass Coupon',
    description: 'Full buffet permission in the executive cafeteria. +45 Energy, -20 Stress, +15 Focus, +15 Social.',
    cost: 32,
    effects: { energy: 45, stress: -20, focus: 15, social: 15 },
    rarity: 'Legendary',
    color: 'border-[#F05D5E]/30 hover:border-[#F05D5E] bg-[#F05D5E]/5',
    badgeColor: 'bg-brand-coral/10 text-brand-coral'
  }
];

interface StudentShopInventoryProps {
  money: number;
  inventory: string[];
  soundEnabled: boolean;
  onBuyItem: (itemId: string, cost: number) => void;
  onUseItem: (itemId: string, effects: Partial<Stats>) => void;
}

export default function StudentShopInventory({
  money,
  inventory,
  soundEnabled,
  onBuyItem,
  onUseItem,
}: StudentShopInventoryProps) {
  const [activeTab, setActiveTab] = useState<'shop' | 'inventory'>('shop');
  const [lastActionFeedback, setLastActionFeedback] = useState<string | null>(null);

  // Group inventory items for unified stacked presentation count
  const groupedInventory = inventory.reduce((acc, currentId) => {
    acc[currentId] = (acc[currentId] || 0) + 1;
    return acc;
  }, {} as { [id: string]: number });

  const handlePurchase = (item: ShopItem) => {
    if (money < item.cost) {
      playWarningSound(soundEnabled);
      setLastActionFeedback(`❌ INSUFFICIENT FUNDS: Need $${item.cost} to buy ${item.name}!`);
      setTimeout(() => setLastActionFeedback(null), 3000);
      return;
    }

    playPositiveSound(soundEnabled);
    onBuyItem(item.id, item.cost);
    setLastActionFeedback(`🚀 BOUGHT: ${item.name} added to your Inventory Desk!`);
    setTimeout(() => setLastActionFeedback(null), 3000);
  };

  const handleUse = (itemId: string) => {
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    playPositiveSound(soundEnabled);
    onUseItem(itemId, item.effects);
    setLastActionFeedback(`✨ CONSUMED: Used ${item.name}! Applied stat delta values.`);
    setTimeout(() => setLastActionFeedback(null), 3000);
  };

  return (
    <div id="shop-inventory-card" className="rounded-2xl border border-brand-navy/15 bg-brand-paper p-5 shadow-[0_4px_12px_rgba(30,42,68,0.03)] relative overflow-hidden flex flex-col justify-between">
      {/* Absolute floating corner graphic */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full -mr-6 -mt-6 pointer-events-none" />

      <div className="space-y-4">
        {/* Header Block with Budget Counter */}
        <div className="flex items-center justify-between border-b border-brand-navy/8 pb-3">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl border border-brand-blue/20 bg-brand-blue/10 text-brand-blue`}>
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="space-y-0.5 animate-fade-in">
              <span className="text-[9px] font-mono uppercase tracking-widest text-brand-navy/50 font-bold block">CANTEEN & STUDY HUB</span>
              <h4 className="text-sm font-extrabold text-brand-ink tracking-tight uppercase">Survival Shop & Locker</h4>
            </div>
          </div>

          {/* Money Telemetry */}
          <div className="flex items-center gap-1.5 bg-brand-green/10 border border-brand-green/20 py-1 px-2.5 rounded-xl">
            <Coins className="w-3.5 h-3.5 text-brand-green animate-bounce" />
            <span className="text-xs font-mono font-black text-brand-green">
              ${money.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Dynamic Interactive Segment Tabs */}
        <div className="flex bg-brand-navy/5 p-1 rounded-xl gap-1">
          <button
            onClick={() => { playClickSound(soundEnabled); setActiveTab('shop'); }}
            className={`flex-1 py-1.5 px-1 rounded-lg text-[9px] sm:text-[10px] font-mono uppercase font-black transition-all truncate ${
              activeTab === 'shop' 
                ? 'bg-white text-brand-ink shadow-sm font-extrabold border border-brand-navy/5' 
                : 'text-brand-navy/60 hover:text-brand-ink'
            }`}
          >
            <span className="hidden sm:inline">🛒 </span>SHOP
          </button>
          <button
            onClick={() => { playClickSound(soundEnabled); setActiveTab('inventory'); }}
            className={`flex-1 py-1.5 px-1 rounded-lg text-[9px] sm:text-[10px] font-mono uppercase font-black transition-all relative truncate ${
              activeTab === 'inventory' 
                ? 'bg-white text-brand-ink shadow-sm font-extrabold border border-brand-navy/5' 
                : 'text-brand-navy/60 hover:text-brand-ink'
            }`}
          >
            <span className="hidden sm:inline">🎒 </span>INVENTORY ({inventory.length})
            {inventory.length > 0 && (
              <span className="absolute top-1 right-1.5 w-2 h-2 bg-brand-coral rounded-full animate-pulse" />
            )}
          </button>
        </div>

        {/* Toast Feed Back Log alerts */}
        <AnimatePresence>
          {lastActionFeedback && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="text-[10px] font-mono font-bold leading-relaxed tracking-tight py-1.5 px-3 rounded-lg border border-brand-navy/10 bg-brand-cream/80 text-brand-ink"
            >
              {lastActionFeedback}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab contents panels */}
        <div className="min-h-[240px] max-h-[360px] overflow-y-auto pr-1">
          {activeTab === 'shop' ? (
            <div className="grid grid-cols-1 gap-2.5">
              {SHOP_ITEMS.map((item) => {
                const isAffordable = money >= item.cost;
                return (
                  <div
                    key={item.id}
                    className={`rounded-xl border p-3 flex flex-col justify-between gap-2.5 transition-all relative overflow-hidden group ${item.color}`}
                  >
                    {/* Corner micro background designation badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[8px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-md ${item.badgeColor}`}>
                        {item.rarity}
                      </span>
                      <span className="text-xs font-mono font-extrabold text-[#E5A93C] group-hover:scale-105 transition-transform flex items-center gap-0.5">
                        <Coins className="w-3 h-3 block shrink-0" /> ${item.cost}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <h5 className="text-xs font-bold text-brand-ink font-sans uppercase">
                        {item.name}
                      </h5>
                      <p className="text-[10px] text-brand-navy/70 leading-normal font-sans">
                        {item.description}
                      </p>
                    </div>

                    {/* Quick review effect deltas */}
                    <div className="flex flex-wrap items-center gap-1">
                      {Object.entries(item.effects).map(([key, val]) => (
                        <span 
                          key={key} 
                          className={`text-[8px] font-mono px-1 py-0.5 rounded font-black border ${
                            val > 0 
                              ? 'bg-brand-green/5 border-brand-green/15 text-brand-green' 
                              : 'bg-brand-coral/5 border-brand-coral/15 text-brand-coral'
                          }`}
                        >
                          {key.toUpperCase()}: {val > 0 ? `+${val}` : val}
                        </span>
                      ))}
                    </div>

                    {/* Purchase Action trigger */}
                    <button
                      onClick={() => handlePurchase(item)}
                      className={`w-full py-1.5 px-3 rounded-lg font-mono text-[9px] font-black uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-all ${
                        isAffordable 
                          ? 'bg-brand-ink text-white hover:bg-[#4F7BFF]' 
                          : 'bg-brand-navy/10 text-brand-navy/40 border border-brand-navy/5 cursor-not-allowed'
                      }`}
                    >
                      <PlusIcon className="w-3 h-3" /> Buy Object
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            /* INVENTORY tab */
            <div className="space-y-2.5">
              {inventory.length === 0 ? (
                <div className="py-12 text-center space-y-2.5 border border-dashed border-brand-navy/15 rounded-xl bg-brand-cream/10">
                  <Package className="w-8 h-8 text-brand-navy/30 mx-auto stroke-1" />
                  <div className="space-y-0.5">
                    <p className="text-xs text-brand-navy/55 font-sans font-bold">Locker is Empty</p>
                    <p className="text-[10px] text-brand-navy/40 font-mono">PURCHASE ITEMS TO GEAR UP FOR WORK</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2.5">
                  {Object.entries(groupedInventory).map(([itemId, count]) => {
                    const item = SHOP_ITEMS.find((i) => i.id === itemId);
                    if (!item) return null;

                    return (
                      <div
                        key={itemId}
                        className="rounded-xl border border-brand-navy/12 bg-white p-3 flex items-center justify-between gap-3 shadow-sm hover:border-brand-navy/20 transition-all relative overflow-hidden"
                      >
                        <div className="space-y-1 pr-2 flex-grow">
                          <div className="flex items-center gap-1.5">
                            <h5 className="text-xs font-bold text-brand-ink uppercase">{item.name}</h5>
                            <span className="text-[9px] font-mono font-black text-[#4F7BFF] bg-[#4F7BFF]/10 px-1.5 py-0.2 rounded-full border border-[#4F7BFF]/20">
                              x{count}
                            </span>
                          </div>
                          
                          <p className="text-[10px] text-brand-navy/65 leading-relaxed font-sans">
                            {item.description}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-1 pt-1">
                            {Object.entries(item.effects).map(([key, val]) => (
                              <span 
                                key={key} 
                                className={`text-[8px] font-mono px-1 rounded font-bold border ${
                                  val > 0 ? 'bg-brand-green/5 border-brand-green/18 text-brand-green' : 'bg-brand-coral/5 border-brand-coral/18 text-brand-coral'
                                }`}
                              >
                                {key.toUpperCase()}: {val > 0 ? `+${val}` : val}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Trigger Activation */}
                        <button
                          onClick={() => handleUse(itemId)}
                          className="py-2 px-3 rounded-lg bg-brand-green hover:bg-brand-green/90 text-white font-mono text-[9px] uppercase tracking-wider font-extrabold shrink-0 border border-brand-navy/10 flex items-center gap-1 cursor-pointer transition-all hover:scale-[1.03]"
                        >
                          <Sparkles className="w-3 h-3" /> Consume
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer warning indicators */}
      <div className="mt-4 pt-3 border-t border-brand-navy/8 flex items-center justify-between text-[8px] font-mono text-brand-navy/45">
        <span>STRATEGY SLOTS ACTIVE: {inventory.length}/10 Max Capacity</span>
        <span className="flex items-center gap-1 select-none">
          🛡️ SYSTEM SAFE
        </span>
      </div>
    </div>
  );
}

// Simple internal icon to bypass dependency errors
function PlusIcon(props: React.JSX.IntrinsicElements['svg']) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5"
      {...props}
    >
      <path d="M5 12h14M12 5v14" />
    </svg>
  );
}
