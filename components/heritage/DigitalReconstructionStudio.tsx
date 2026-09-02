import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Eye, ShieldCheck, Box, Sliders, Sparkles, RefreshCw, Landmark, Camera } from 'lucide-react';
import { StatusPip } from '../design-system/StatusPip';

export const DigitalReconstructionStudio: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'ARCHIVAL_1933' | 'LIDAR_2026' | 'STABILIZED_2050'>('LIDAR_2026');
  const [opacitySlider, setOpacitySlider] = useState<number>(65);

  return (
    <div className="p-6 sm:p-10 bg-[#080605] border border-[rgba(242,240,235,0.08)] rounded-xl space-y-8 font-mono-tech">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(242,240,235,0.08)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-[#C47D68] tracking-[0.25em] uppercase font-bold mb-2">
            <span>XR & PHOTOGRAMMETRY LAB // DUAL-TWIN ARTIFACT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-light text-[#F5F3ED] uppercase tracking-wide">
            Digital Reconstruction <span className="text-[#C47D68] italic font-serif">Studio.</span>
          </h2>
        </div>
        <StatusPip status="verified" label="SUB-MM ACCURACY" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive 3D Spatial Canvas Simulator */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-[16/10] bg-[#030202] border border-[rgba(196,125,104,0.3)] rounded-xl overflow-hidden flex flex-col justify-between p-6">
            {/* Background Simulated Grid & Laser Scanner Lines */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: 'linear-gradient(#C47D68 1px, transparent 1px), linear-gradient(90deg, #C47D68 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            {/* Top Canvas HUD */}
            <div className="relative z-10 flex items-center justify-between text-[10px] text-[#C47D68]">
              <span className="font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5" />
                <span>ASSET: HISTORIC DUGOUT #14 (OPAL CREEK)</span>
              </span>
              <span className="text-[#888] font-mono">
                {activeLayer === 'ARCHIVAL_1933' && 'SOURCE: 1948 B&W CELLULOSE NEGATIVE'}
                {activeLayer === 'LIDAR_2026' && 'SOURCE: 4.6M VERTICES VOLUMETRIC SCAN'}
                {activeLayer === 'STABILIZED_2050' && 'SOURCE: STRUCTURAL ENGINEERING BLUEPRINT'}
              </span>
            </div>

            {/* Center Visual Representation */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-4">
              {activeLayer === 'ARCHIVAL_1933' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3 max-w-lg p-6 bg-[#0E0A08]/90 border border-[rgba(242,240,235,0.1)] rounded-lg backdrop-blur-sm"
                >
                  <Camera className="w-8 h-8 text-[#A89F91] mx-auto opacity-70" />
                  <div className="text-xs font-bold text-[#F5F3ED] uppercase">
                    1948 Initial Hand-Hewn Excavation
                  </div>
                  <p className="text-xs text-[#A89F91] font-serif-editorial italic">
                    Original archival photograph capturing the freshly swung pick marks in soft kaolin clay. Unreinforced calcrete ceiling before post-war timbering.
                  </p>
                </motion.div>
              )}

              {activeLayer === 'LIDAR_2026' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3 max-w-lg p-6 bg-[#070A0B]/90 border border-[#5C7D91] rounded-lg backdrop-blur-sm shadow-[0_0_20px_rgba(92,125,145,0.2)]"
                >
                  <Box className="w-8 h-8 text-[#5C7D91] mx-auto animate-pulse" />
                  <div className="text-xs font-bold text-[#F5F3ED] uppercase">
                    2026 Sub-Millimeter Point Cloud Mesh
                  </div>
                  <p className="text-xs text-[#A89F91] font-sans">
                    4,600,000 coordinate vertices documenting 78 years of thermal micro-movement, ceiling spallation risk zones, and airflow convection lines.
                  </p>
                </motion.div>
              )}

              {activeLayer === 'STABILIZED_2050' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3 max-w-lg p-6 bg-[#080D09]/90 border border-[#8FA382] rounded-lg backdrop-blur-sm shadow-[0_0_20px_rgba(143,163,130,0.2)]"
                >
                  <Landmark className="w-8 h-8 text-[#8FA382] mx-auto" />
                  <div className="text-xs font-bold text-[#F5F3ED] uppercase">
                    2050 Conservation & Structural Stabilization Plan
                  </div>
                  <p className="text-xs text-[#A89F91] font-sans">
                    Architectural simulation of invisible stainless steel roof pins, micro-drainage channels, and lime-wash restoration funded by the Preservation Trust.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Bottom HUD: Layer Switcher & Opacity Slider */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[rgba(242,240,235,0.06)] bg-[#030202]/80 backdrop-blur-sm p-3 rounded">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveLayer('ARCHIVAL_1933')}
                  className={`px-3 py-1 text-[10px] rounded font-bold uppercase transition-all ${
                    activeLayer === 'ARCHIVAL_1933' ? 'bg-[#C47D68] text-[#0A0706]' : 'bg-[#0A0706] text-[#888] hover:text-[#CCC]'
                  }`}
                >
                  1948 Archival
                </button>
                <button
                  onClick={() => setActiveLayer('LIDAR_2026')}
                  className={`px-3 py-1 text-[10px] rounded font-bold uppercase transition-all ${
                    activeLayer === 'LIDAR_2026' ? 'bg-[#5C7D91] text-[#0A0706]' : 'bg-[#0A0706] text-[#888] hover:text-[#CCC]'
                  }`}
                >
                  2026 LiDAR Twin
                </button>
                <button
                  onClick={() => setActiveLayer('STABILIZED_2050')}
                  className={`px-3 py-1 text-[10px] rounded font-bold uppercase transition-all ${
                    activeLayer === 'STABILIZED_2050' ? 'bg-[#8FA382] text-[#0A0706]' : 'bg-[#0A0706] text-[#888] hover:text-[#CCC]'
                  }`}
                >
                  2050 Conservation
                </button>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-[#888]">
                <span>OVERLAY DENSITY:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={opacitySlider}
                  onChange={(e) => setOpacitySlider(Number(e.target.value))}
                  className="w-24 accent-[#C47D68] cursor-pointer"
                />
                <span className="font-mono text-[#F5F3ED]">{opacitySlider}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Explanation Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-[#0D0907] border border-[rgba(196,125,104,0.3)] rounded-lg space-y-4">
            <div className="text-[10px] text-[#C47D68] uppercase tracking-widest font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE PURPOSE OF RECONSTRUCTION</span>
            </div>

            <p className="text-xs text-[#D4CDC5] font-sans leading-relaxed">
              Digital reconstruction is not an entertainment novelty. It is a vital conservation tool that allows engineers and descendants to monitor microscopic ground shifts, test structural reinforcements in simulation, and share intimate spaces without physical damage.
            </p>

            <div className="space-y-2 pt-2 border-t border-[rgba(242,240,235,0.06)] text-[11px]">
              <div className="flex justify-between text-[#A89F91]">
                <span>SCAN METHOD:</span>
                <span className="text-[#F5F3ED]">Dual LiDAR & Photogrammetry</span>
              </div>
              <div className="flex justify-between text-[#A89F91]">
                <span>SAMPLE DENSITY:</span>
                <span className="text-[#5C7D91]">0.8 mm grid</span>
              </div>
              <div className="flex justify-between text-[#A89F91]">
                <span>XR EXPORT:</span>
                <span className="text-[#8FA382]">OpenUSD / glTF Living Twin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
