/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, memo } from 'react';
import { Book, Edit3, Paperclip, Clock, Coffee, Sparkles } from 'lucide-react';

const AnimatedBackground = memo(function AnimatedBackground() {
  const [elements, setElements] = useState<{ id: number; type: string; x: number; y: number; size: number; delay: number; duration: number; rotate: number }[]>([]);

  useEffect(() => {
    // Generate organic ambient scholarly items
    const types = ['book', 'pencil', 'paperclip', 'clock', 'coffee', 'sparkle'];
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      type: types[i % types.length],
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      size: Math.random() * 10 + 16,
      rotate: Math.random() * 360,
      duration: Math.random() * 20 + 25,
      delay: Math.random() * -20,
    }));
    setElements(generated);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#F8F6F1] select-none pointer-events-none transition-colors duration-1000">
      {/* Delicate Notebook Grid Texture */}
      <div className="absolute inset-0 notebook-grid opacity-75" />

      {/* Layered Desk Sunlight & Soft Warm Gradients */}
      <div className="absolute inset-0 bg-radial-at-tl from-[#FDFBF7] via-[#F8F6F1] to-[#EFECE3] opacity-80" />
      
      {/* Academic Aura / Soft Spotlight */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#9B7EDE]/10 via-[#4F7BFF]/5 to-transparent blur-[120px]" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-[#4FA66A]/10 via-[#F5B84B]/5 to-transparent blur-[100px]" />
      
      {/* Decorative Planner Border Line on the left side of screen */}
      <div className="absolute top-0 bottom-0 left-[4%] sm:left-[6%] w-[2px] bg-gradient-to-b from-brand-coral/20 via-brand-coral/40 to-brand-coral/10 hidden md:block" />
      <div className="absolute top-0 bottom-0 left-[4.5%] sm:left-[6.5%] w-[1px] bg-brand-coral/10 hidden md:block" />

      {/* Subtle organic desk-shadows or paper folds */}
      <div className="absolute top-[20%] right-[-5%] w-[35vw] h-[25vw] bg-black/[0.015] rounded-full filter blur-[80px]" />

      {/* Floating Elements (Study items drifting on student's desk) */}
      {elements.map((el) => {
        return (
          <div
            key={el.id}
            className="absolute text-[#1E2A44]/15 will-change-transform flex items-center justify-center"
            style={{
              top: `${el.y}%`,
              left: `${el.x}%`,
              animation: `floatMovement ${el.duration}s ease-in-out infinite alternate`,
              animationDelay: `${el.delay}s`,
              transform: `rotate(${el.rotate}deg)`,
            }}
          >
            {el.type === 'book' && <Book size={el.size} />}
            {el.type === 'pencil' && <Edit3 size={el.size} />}
            {el.type === 'paperclip' && <Paperclip size={el.size} />}
            {el.type === 'clock' && <Clock size={el.size} />}
            {el.type === 'coffee' && <Coffee size={el.size} />}
            {el.type === 'sparkle' && <Sparkles size={el.size} />}
          </div>
        );
      })}

      <style>{`
        @keyframes floatMovement {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.12;
          }
          50% {
            transform: translate(15px, -25px) rotate(15deg);
            opacity: 0.22;
          }
          100% {
            transform: translate(-10px, 15px) rotate(-10deg);
            opacity: 0.12;
          }
        }
      `}</style>
    </div>
  );
});

export default AnimatedBackground;
