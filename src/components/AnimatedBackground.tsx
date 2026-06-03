/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, memo } from 'react';

const AnimatedBackground = memo(function AnimatedBackground() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate static particle locations to avoid server mismatch, or client-only generation
    const generated = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * -20,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#02020f] select-none pointer-events-none">
      {/* Dynamic Deep Mesh Gradients */}
      <div className="absolute inset-0 bg-radial-at-t from-[#1b1035] via-[#02020e] to-[#01010a] opacity-90" />
      
      {/* Animated Floating Cybernetic Orbs */}
      <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#00f2fe]/20 to-[#4facfe]/10 blur-[130px] animate-pulse duration-[8000ms]" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-[#7f00ff]/15 to-[#ff007f]/5 blur-[150px] animate-pulse duration-[12000ms]" />
      <div className="absolute top-[40%] left-[30%] w-[35vw] h-[35vw] rounded-full bg-[#180e29] blur-[100px] animate-pulse duration-[6000ms]" />

      {/* Futuristic Grid Floor perspective lines at the bottom */}
      <div className="absolute bottom-0 inset-x-0 h-[35vh] opacity-[0.08]" 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 242, 254, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 254, 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg) translateY(50px)',
          transformOrigin: 'bottom center',
        }} 
      />

      {/* Subtle Grid overlay across the whole screen */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      {/* CSS-based City Vector Outline / Skyline Glow in Background at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-[180px] flex items-end justify-between px-4 opacity-10">
        <div className="w-[12%] h-[120px] bg-gradient-to-t from-cyan-600 to-transparent rounded-t-lg" />
        <div className="w-[6%] h-[160px] bg-gradient-to-t from-violet-600 to-transparent rounded-t" />
        <div className="w-[15%] h-[80px] bg-gradient-to-t from-cyan-600 to-transparent rounded-t-md" />
        <div className="w-[8%] h-[140px] bg-gradient-to-t from-violet-600 to-transparent rounded-t-lg" />
        <div className="w-[10%] h-[100px] bg-gradient-to-t from-cyan-500 to-transparent rounded-t" />
        <div className="w-[14%] h-[150px] bg-gradient-to-t from-violet-700 to-transparent rounded-t-md animate-pulse duration-5000" />
        <div className="w-[8%] h-[90px] bg-gradient-to-t from-cyan-600 to-transparent rounded-t" />
        <div className="w-[12%] h-[130px] bg-gradient-to-t from-violet-800 to-transparent rounded-t-lg" />
      </div>

      {/* Glowing horizontal laser line across bottom */}
      <div className="absolute bottom-[35vh] inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f2fe]/40 to-transparent blur-[1px]" />

      {/* Floating particles (ambient starfield / coding dust) */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bg-cyan-400 rounded-full opacity-30 shadow-[0_0_8px_#00f2fe] will-change-transform"
          style={{
            top: `${p.y}%`,
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `floatUp ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(110vh) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-10vh) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
});

export default AnimatedBackground;
