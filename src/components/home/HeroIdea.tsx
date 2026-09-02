import React, { useState } from 'react';
import { motion } from 'motion/react';
import appMasterLogo from '../../public/images/APP_Master.svg';
import { ThreeOpalViewer } from '../opal/ThreeOpalViewer';
import { Rotate3D, Sparkles, Shield, Compass, ArrowRight, Layers, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const matrixTwinUrl = '/images/Matrixtwin_opal.glb';

export const HeroIdea: React.FC = () => {
  

  return (
    <section className="relative min-h-[96vh] flex flex-col justify-between pt-24 pb-12">
      {/* Subtle Archival Horizon Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden">
        <div className="w-full h-full archival-grain" />
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent" />
      </div>

      {/* Top Quiet Telemetry Line */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[9px] font-mono-tech tracking-[0.25em] text-[#8E8A82] uppercase border-b border-[rgba(242,240,235,0.06)] pb-4">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8FA382] animate-pulse" />
          <span className="text-[#F5F3ED] font-bold">SYSTEM ACTIVE</span>
          <span className="opacity-30">/</span>
          <span>PILOT 01 // ANDAMOOKA</span>
        </div>
        <div className="flex items-center gap-4 text-[8px] text-[#A09B90]">
          <span>LAT 30°27' S // LON 137°09' E</span>
          <span className="opacity-30">|</span>
          <span className="text-[#C5A059]">115 MA CRETACEOUS HORIZON</span>
        </div>
      </div>

      {/* Main Grand Cinematic Grid: Typography on Left, Tactile 3D Specimen on Right */}
      <div className="relative z-10 my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Monumental Editorial Statement */}
        <div className="lg:col-span-6 flex flex-col items-start">
          {/* Emblem Stamp */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-6"
          >
            <img
              src={appMasterLogo}
              alt="Australian Provenance Project"
              className="w-10 sm:w-12 h-auto opacity-90"
            />
            <div className="flex flex-col">
              <span className="text-[8px] font-mono-tech tracking-[0.3em] uppercase text-[#C5A059]">
                AUSTRALIAN PROVENANCE PROJECT
              </span>
              <span className="text-[7px] font-mono-tech tracking-[0.2em] uppercase text-[#666]">
                ORIGIN VERIFICATION & CIVIC ENGINE
              </span>
            </div>
          </motion.div>

          {/* Primary Statement */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-4xl sm:text-6xl xl:text-7xl text-[#F5F3ED] tracking-[0.1em] uppercase leading-[1.02] mb-6"
          >
            Everything<br />
            Has A Story.
          </motion.h1>

          {/* Triad Axiom */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 mb-8"
          >
            <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#D4D0C8] font-light leading-snug">
              Every place has a story.<br />
              Every person has a place.<br />
              Every asset has a history.
            </p>

            <p className="font-serif-editorial text-sm sm:text-base text-[#A39E93] leading-relaxed max-w-lg">
              We do not manufacture value. We uncover, connect, and verify the value that is already there. Andamooka is the proof. Matrix opal is the first asset.
            </p>
          </motion.div>

          {/* Direct Tactical Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <a
              href="#five-pillars"
              className="px-5 py-3 bg-[#C5A059] text-[#070605] font-mono-tech text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#D4B26F] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(197,160,89,0.25)] rounded-sm"
            >
              <span>EXPLORE THE 5 PILLARS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <Link
              to="/opal"
              className="px-5 py-3 bg-[#12110D] border border-[rgba(197,160,89,0.3)] hover:border-[#C5A059] text-[#E0DDD5] font-mono-tech text-[10px] tracking-[0.2em] uppercase transition-all flex items-center gap-2 rounded-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>INSPECT 3D TWIN</span>
            </Link>
          </motion.div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 pt-4 border-t border-[rgba(242,240,235,0.06)] flex items-center gap-6 text-[8px] font-mono-tech text-[#777] uppercase tracking-wider">
            <div>
              <span className="text-[#C5A059] font-bold">115M YRS</span>
              <span className="ml-1 opacity-70">STRATA</span>
            </div>
            <span className="opacity-30">|</span>
            <div>
              <span className="text-[#8FA382] font-bold">AOSA-2024</span>
              <span className="ml-1 opacity-70">STANDARD</span>
            </div>
            <span className="opacity-30">|</span>
            <div>
              <span className="text-[#F5F3ED] font-bold">8.5%</span>
              <span className="ml-1 opacity-70">CIVIC RETURN</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Live 3D Opal Specimen Viewport */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 relative flex flex-col items-center justify-center"
        >
          {/* Subtle Ambient Radial Backlight */}
          <div className="absolute inset-0 bg-radial from-[#C5A059]/10 via-[#0C0B08]/40 to-transparent blur-2xl pointer-events-none" />

          {/* 3D Canvas Stage */}
          <div className="relative w-full h-[380px] sm:h-[460px] md:h-[500px] bg-gradient-to-b from-[#0C0B08]/80 to-[#060605] border border-[rgba(197,160,89,0.25)] rounded overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            
            {/* Top Telemetry Header inside 3D Viewport */}
            <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none text-[8px] font-mono-tech tracking-[0.2em] uppercase">
              <div className="flex items-center gap-2 bg-[#070605]/80 px-2.5 py-1 border border-[rgba(242,240,235,0.08)] backdrop-blur-sm rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping" />
                <span className="text-[#F5F3ED] font-bold">ANDAMOOKA MATRIX OPAL // 3D TWIN</span>
              </div>
              <span className="text-[#888] hidden sm:inline">20µm MICRO-PHOTOGRAMMETRY</span>
            </div>

            {/* Live WebGL 3D Specimen Viewer */}
            <ThreeOpalViewer
              modelUrl={matrixTwinUrl}
              className="w-full h-full"
            />

            {/* Bottom Interactive Mode Controls inside 3D Viewport */}
            <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2 bg-[#070605]/85 backdrop-blur-md px-3 py-2 border border-[rgba(197,160,89,0.2)] rounded text-[8px] font-mono-tech">
              <div className="flex items-center gap-1.5">
                
              </div>

              <div className="hidden sm:flex items-center gap-1 text-[#C5A059]">
                <Rotate3D className="w-3 h-3 animate-spin" style={{ animationDuration: '8s' }} />
                <span>DRAG TO ROTATE</span>
              </div>
            </div>
          </div>

          {/* Caption underneath 3D twin */}
          <div className="w-full mt-3 flex items-center justify-between text-[8px] font-mono-tech text-[#666] tracking-[0.18em] uppercase">
            <span>SPECIMEN ID: AND-MO-001 // 1,462,380 POLYGONS</span>
            <Link to="/opal" className="text-[#C5A059] hover:underline flex items-center gap-1">
              FULL LAB INSPECTOR →
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 flex items-center justify-between pt-4 border-t border-[rgba(242,240,235,0.06)] text-[8px] font-mono-tech tracking-[0.25em] text-[#666] uppercase">
        <div className="flex items-center gap-3">
          <span className="text-[#C5A059]">// SCROLL TO UNCOVER THE SYSTEM</span>
          <span className="w-8 h-[1px] bg-[#C5A059]/40" />
        </div>
        <div className="flex items-center gap-4">
          <span>CIVIC CO-GRADING</span>
          <span>•</span>
          <span>SPATIAL TWIN</span>
          <span>•</span>
          <span>RWA CONTINUITY</span>
        </div>
      </div>
    </section>
  );
};
