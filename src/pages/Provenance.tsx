import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { ProjectedFeature } from '../components/opal/ThreeOpalViewer';
const ThreeOpalViewer = React.lazy(() => import('../components/opal/ThreeOpalViewer').then(module => ({ default: module.ThreeOpalViewer })));

const matrixTwinUrl = '/images/Matrixtwin_opal.glb';


type TimelineStage = {
  id: string;
  label: string;
  q: string;
  desc: string;
};

const TIMELINE: TimelineStage[] = [
  { id: 'origin', label: 'Origin', q: 'Where did it come from?', desc: 'The physical stone sits in pure darkness. Formed over millions of years in the deep time of the Australian outback.' },
  { id: 'discovery', label: 'Discovery', q: 'Who found it?', desc: 'Unearthed from the dirt, catching the harsh directional light of the sun for the first time.' },
  { id: 'geology', label: 'Geology', q: 'What happened beneath the ground?', desc: 'Exposing the physical structure of the host rock. The relationship between the silica spheres and the sandstone matrix.' },
  { id: 'identity', label: 'Identity', q: 'What makes this stone different?', desc: 'A chemical signature. The unique spectral fingerprint that proves this exact stone cannot be counterfeited.' },
  { id: 'history', label: 'History', q: 'What happened before it was cut?', desc: 'Documenting the transformation from rough to cut. The physical memory of the stone is preserved.' },
  { id: 'custody', label: 'Custody', q: 'Who owned or handled it?', desc: 'A stark, cryptographic mesh representing the transfer of custody, ownership records, and immutable data.' },
  { id: 'evidence', label: 'Evidence', q: 'What can actually be demonstrated?', desc: 'The culmination of physical and digital truth. The story is no longer a claim; it is attached to the object.' }
];

export default function Provenance() {
  const [activeStage, setActiveStage] = useState<TimelineStage>(TIMELINE[0]);
  const [projectedFeatures, setProjectedFeatures] = useState<ProjectedFeature[]>([]);
  
  const panelRef = useRef<HTMLDivElement>(null);
  const [targetCoords, setTargetCoords] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update target coordinates of the panel so the line knows where to connect
  useEffect(() => {
    const updateTarget = () => {
      if (panelRef.current) {
        const rect = panelRef.current.getBoundingClientRect();
        setTargetCoords({
          x: rect.left, // Left edge of the panel
          y: rect.top + 24 // Roughly align with the heading
        });
      }
    };
    
    updateTarget();
    window.addEventListener('resize', updateTarget);
    return () => window.removeEventListener('resize', updateTarget);
  }, [activeStage]);

  const activeFeature = projectedFeatures.find(f => f.id === activeStage.id);

  return (
    <div className="min-h-screen bg-[#0C0B0A] text-[#f5f2ed] font-serif-body relative overflow-hidden">
      
      {/* FIXED BACKGROUND OPAL */}
      <div className="fixed inset-0 z-0">
        <React.Suspense fallback={<div className="w-full h-full flex items-center justify-center font-mono-tech text-[10px] text-[#8E8A82] tracking-widest uppercase">Initializing Spatial Engine...</div>}>
          <ThreeOpalViewer
          modelUrl={matrixTwinUrl}
          features={TIMELINE.map(t => t.id)}
          onFeaturesProjected={setProjectedFeatures}
          onActiveFeatureChange={(id) => {
            const stage = TIMELINE.find(s => s.id === id);
            if (stage) setActiveStage(prev => prev.id === id ? prev : stage);
          }}
          className="w-full h-full object-cover"
        />
        </React.Suspense>
      </div>

      {/* SVG CONNECTING LINE & NODES OVERLAY */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <svg className="w-full h-full">
          {/* Connecting Line for Active Node */}
          <AnimatePresence>
            {activeFeature && activeFeature.visible && targetCoords && (
               <motion.g
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
               >
                 {/* Animated Dashed Line */}
                 <motion.line 
                    x1={activeFeature.x} 
                    y1={activeFeature.y} 
                    x2={targetCoords.x} 
                    y2={targetCoords.y} 
                    stroke="#C8A97E" 
                    strokeWidth="0.5"
                    strokeOpacity="0.6"
                    strokeDasharray="2 4"
                    initial={{ strokeDashoffset: 100 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                 />
                 {/* Solid Base Line */}
                 <line 
                    x1={activeFeature.x} 
                    y1={activeFeature.y} 
                    x2={targetCoords.x} 
                    y2={targetCoords.y} 
                    stroke="#C8A97E" 
                    strokeWidth="0.5"
                    strokeOpacity="0.2"
                 />
               </motion.g>
            )}
          </AnimatePresence>

          {/* Render All Visible Copper Nodes */}
          {projectedFeatures.map(feature => {
             if (!feature.visible) return null;
             const isActive = feature.id === activeStage.id;
             return (
               <g 
                 key={feature.id} 
                 className="pointer-events-none"
               >
                 {/* Invisible larger hit area for easier clicking */}
                 <circle cx={feature.x} cy={feature.y} r="16" fill="transparent" />
                 
                 <circle 
                    cx={feature.x} 
                    cy={feature.y} 
                    r={isActive ? "3" : "2"} 
                    fill={isActive ? "#C8A97E" : "#505050"} 
                    className="transition-all duration-300"
                 />
                 {isActive && (
                   <motion.circle 
                      cx={feature.x} 
                      cy={feature.y} 
                      r="8" 
                      fill="transparent" 
                      stroke="#C8A97E"
                      strokeWidth="0.5"
                      strokeOpacity="0.8"
                      initial={{ scale: 0.5, opacity: 0.8 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                   />
                 )}
               </g>
             )
          })}
        </svg>
      </div>

      {/* TOP LEFT UI */}
      <div className="fixed top-32 sm:top-40 left-6 lg:left-12 pointer-events-none z-20">
        <div className="font-mono-tech text-[9px] uppercase tracking-[0.25em] text-[#f5f2ed] mb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#C8A97E] rounded-full animate-pulse" />
          SPECIMEN TRACKING
        </div>
        <div className="font-mono-tech text-[8px] text-[#8E8A82] tracking-widest">
          INTERACTIVE 3D PROJECTION <br/>
          ROTATIONAL ANCHOR: ACTIVE
        </div>
      </div>

      {/* BOTTOM RIGHT ACTIVE STAGE PANEL */}
      <div className="fixed bottom-10 left-6 right-6 sm:left-auto sm:right-6 lg:right-12 z-20 pointer-events-auto flex sm:justify-end max-w-sm w-auto sm:w-full">
         <div ref={panelRef} className="bg-[#0C0B0A]/92 backdrop-blur-md border border-hairline p-5 lg:p-6 shadow-2xl relative w-full crosshair-corner">
            <motion.h2 
              key={activeStage.id + "-label"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="font-mono-tech text-[10px] sm:text-xs uppercase tracking-[0.25em] mb-2.5 text-[#C8A97E] flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 bg-[#C8A97E]" />
              <span>{activeStage.label}</span>
            </motion.h2>
            
            <motion.div 
               key={activeStage.id + "-content"}
               initial={{ opacity: 0, y: 8 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            >
               <p className="font-serif-editorial text-lg sm:text-xl italic text-[#f5f2ed] mb-3 leading-snug">
                 {activeStage.q}
               </p>
               
               <p className="font-display font-light text-xs sm:text-[13px] text-[#D4D0C8] leading-relaxed">
                 {activeStage.desc}
               </p>
            </motion.div>
         </div>
      </div>

    </div>
  );
}
