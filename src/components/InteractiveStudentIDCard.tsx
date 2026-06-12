import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { GraduationCap, Zap, Briefcase, Coffee, Crown, Fingerprint, Barcode } from 'lucide-react';

interface InteractiveStudentIDCardProps {
  studentName: string;
  studentIcon?: string;
  isFlipped?: boolean;
  finalScore?: number;
  className?: string;
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  GraduationCap,
  Zap,
  Briefcase,
  Coffee,
  Crown
};

export default function InteractiveStudentIDCard({ 
  studentName, 
  studentIcon = 'GraduationCap', 
  isFlipped = false, 
  finalScore,
  className = ''
}: InteractiveStudentIDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  // Motion values for mouse position
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), { stiffness: 300, damping: 30 });
  const brightness = useTransform(mouseY, [0, 1], [1.2, 0.8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // If we are flipped initially, override rotation Y to show back
  const flipAngle = isFlipped ? 180 : 0;
  const combinedRotateY = useTransform(rotateY, (r) => r + flipAngle);

  const IconComponent = iconMap[studentIcon] || GraduationCap;

  return (
    <div className={`[perspective:1000px] w-full max-w-[320px] aspect-[1.586] mx-auto select-none ${className}`}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: hovering ? rotateX : 0,
          rotateY: hovering ? combinedRotateY : flipAngle,
          filter: `brightness(${hovering ? brightness.get() : 1})`,
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
        }}
        animate={{ rotateY: combinedRotateY.get(), rotateX: hovering ? rotateX.get() : 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full h-full relative cursor-pointer group"
      >
        {/* Front of Card */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl shadow-xl"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl bg-brand-paper border border-brand-navy/10 flex flex-col pt-3">
            {/* Header Strip */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-brand-blue flex items-center px-4">
              <span className="text-[10px] font-mono font-black text-white/90 tracking-[0.2em] uppercase">Student ID Card</span>
            </div>
            
            <div className="flex-1 flex px-4 mt-6 items-center">
              {/* Avatar block */}
              <div className="w-[70px] h-[85px] shrink-0 bg-brand-cream border border-brand-navy/15 rounded-lg flex items-center justify-center p-2 mr-4 shadow-inner">
                 <IconComponent className="w-8 h-8 text-brand-navy opacity-80" />
              </div>
              
              {/* Info Block */}
              <div className="flex-1 flex flex-col justify-center translate-y-1">
                <span className="text-[8px] font-mono font-bold text-brand-navy/40 uppercase tracking-widest mb-0.5">Name</span>
                <span className="font-sans font-black text-brand-ink text-base uppercase leading-none mb-2">{studentName || 'Unknown'}</span>
                
                <span className="text-[8px] font-mono font-bold text-brand-navy/40 uppercase tracking-widest mb-0.5">ID No.</span>
                <span className="font-mono font-bold text-brand-blue text-sm uppercase leading-none">
                  #JM-{new Date().getFullYear()}-001
                </span>
              </div>
              
              <div className="ml-auto w-8 h-8 flex items-center justify-center border border-brand-coral/30 rounded-lg text-brand-coral/50">
                 <Fingerprint className="w-5 h-5" />
              </div>
            </div>
            
            {/* Bottom Barcode */}
            <div className="mt-auto h-10 bg-brand-navy/5 flex items-center justify-between px-4">
               <div className="font-mono text-[8px] text-brand-navy/40 font-bold uppercase tracking-[0.3em]">Valid Term</div>
               <Barcode className="w-20 h-6 text-brand-navy opacity-40 shrink-0" />
            </div>

            {/* Glare effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 mix-blend-overlay pointer-events-none"
              style={{
                x: useTransform(mouseX, [0, 1], ['-100%', '100%']),
                y: useTransform(mouseY, [0, 1], ['-100%', '100%']),
              }}
            />
          </div>
        </div>

        {/* Back of Card (Report Card) */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl shadow-xl"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: 'rotateY(180deg)' }}
        >
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl bg-brand-navy border border-brand-navy/10 flex flex-col">
            {/* Notebook Paper texture overlay */}
            <div className="absolute inset-0 opacity-10 notebook-grid" />
            <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-brand-coral opacity-50" />
            
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 text-center">
              <span className="text-[10px] font-mono font-black text-brand-cream/60 tracking-[0.2em] uppercase mb-2">Final Evaluation</span>
              {finalScore !== undefined ? (
                <>
                  <div className="text-4xl font-mono font-black text-brand-cream">{finalScore}</div>
                  <div className="text-[10px] font-mono font-bold text-brand-cream/40 uppercase tracking-widest mt-1">/ 100</div>
                </>
              ) : (
                <div className="text-sm font-mono font-bold text-brand-cream/50">Pending...</div>
              )}
              
              <div className="mt-4 px-3 py-1 bg-brand-cream/10 border border-brand-cream/20 text-brand-cream text-[8px] font-mono font-bold uppercase rounded tracking-widest">
                Simulation Complete
              </div>
            </div>
            
            <div className="relative z-10 mt-auto h-8 bg-brand-ink/50 flex items-center justify-center">
              <span className="text-[8px] font-mono font-bold text-brand-cream/30 tracking-widest uppercase">Property of the Simulation</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
