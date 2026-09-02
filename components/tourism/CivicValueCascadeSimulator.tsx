import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CIVIC_VALUE_BREAKDOWN } from '../../data/tourismJourneyData';
import { Coins, Droplets, Landmark, Sparkles, GraduationCap, Palette, Layers, ArrowDown } from 'lucide-react';

export const CivicValueCascadeSimulator: React.FC = () => {
  const [acquisitionVolumeAUD, setAcquisitionVolumeAUD] = useState<number>(4200);

  // Dynamic calculations based on simulated amount
  const waterLitresPumped = Math.round((acquisitionVolumeAUD * 0.10) * 1.25);
  const heritageSqMetersReinforced = ((acquisitionVolumeAUD * 0.08) / 220).toFixed(1);
  const elderAudioHoursFunded = ((acquisitionVolumeAUD * 0.05) / 105).toFixed(1);
  const artistLapWheels = ((acquisitionVolumeAUD * 0.04) / 168).toFixed(1);

  return (
    <div className="border border-[rgba(242,240,235,0.12)] bg-[#070908] p-6 sm:p-10 crosshair-corner font-mono-tech relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[rgba(242,240,235,0.08)]">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-[#8FA382] tracking-[0.25em] uppercase font-bold">
            <Coins className="w-3.5 h-3.5" />
            <span>CIVIC DIVIDEND SIMULATOR // REGENERATIVE RECIRCULATION</span>
          </div>
          <h2 className="font-display font-light text-2xl sm:text-3xl text-[#F5F3ED] tracking-wide uppercase mt-1">
            Tourism Creating Value for the Whole Town
          </h2>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-[#888] block uppercase">SIMULATED ACQUISITION</span>
          <span className="text-xl font-bold text-[#C5A059] font-mono">
            ${acquisitionVolumeAUD.toLocaleString()} AUD
          </span>
        </div>
      </div>

      {/* Interactive Volume Slider */}
      <div className="p-4 bg-[#0A0D0B] border border-[rgba(242,240,235,0.08)] rounded mb-8">
        <div className="flex justify-between items-center text-xs text-[#A39580] mb-2">
          <span>TEST ACQUISITION / PATRONAGE VALUE</span>
          <span className="text-[#C5A059] font-bold">${acquisitionVolumeAUD} AUD</span>
        </div>
        <input
          type="range"
          min="500"
          max="25000"
          step="250"
          value={acquisitionVolumeAUD}
          onChange={(e) => setAcquisitionVolumeAUD(Number(e.target.value))}
          className="w-full accent-[#C5A059] bg-[#1a1a1a] h-2 rounded cursor-pointer"
        />
        <div className="flex justify-between text-[9px] text-[#666] mt-1">
          <span>$500 AUD (Field Specimen)</span>
          <span>$4,200 AUD (Select Matrix Opal)</span>
          <span>$25,000 AUD (Museum Grade Boulder)</span>
        </div>
      </div>

      {/* Real-World Tangible Civic Impacts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-[#050605] border border-[rgba(197,160,89,0.3)] rounded flex items-start gap-3">
          <div className="p-2 rounded bg-[rgba(197,160,89,0.15)] text-[#C5A059]">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[9px] text-[#888] uppercase block">CLEAN WATER PUMPED</span>
            <span className="text-xl font-bold text-[#F5F3ED] font-mono mt-0.5 block">
              {waterLitresPumped} Litres
            </span>
            <span className="text-[10px] text-[#A39580] block mt-0.5">
              Solar bore drinking water
            </span>
          </div>
        </div>

        <div className="p-4 bg-[#050605] border border-[rgba(163,149,128,0.3)] rounded flex items-start gap-3">
          <div className="p-2 rounded bg-[rgba(163,149,128,0.15)] text-[#A39580]">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[9px] text-[#888] uppercase block">HERITAGE PRESERVED</span>
            <span className="text-xl font-bold text-[#F5F3ED] font-mono mt-0.5 block">
              {heritageSqMetersReinforced} m²
            </span>
            <span className="text-[10px] text-[#A39580] block mt-0.5">
              1930s dugout stabilization
            </span>
          </div>
        </div>

        <div className="p-4 bg-[#050605] border border-[rgba(224,109,83,0.3)] rounded flex items-start gap-3">
          <div className="p-2 rounded bg-[rgba(224,109,83,0.15)] text-[#E06D53]">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[9px] text-[#888] uppercase block">KOKATHA ARCHIVE</span>
            <span className="text-xl font-bold text-[#F5F3ED] font-mono mt-0.5 block">
              {elderAudioHoursFunded} Hours
            </span>
            <span className="text-[10px] text-[#A39580] block mt-0.5">
              Digitized elder language recordings
            </span>
          </div>
        </div>

        <div className="p-4 bg-[#050605] border border-[rgba(143,163,130,0.3)] rounded flex items-start gap-3">
          <div className="p-2 rounded bg-[rgba(143,163,130,0.15)] text-[#8FA382]">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[9px] text-[#888] uppercase block">ARTIST EQUIPMENT</span>
            <span className="text-xl font-bold text-[#F5F3ED] font-mono mt-0.5 block">
              {artistLapWheels} Units
            </span>
            <span className="text-[10px] text-[#A39580] block mt-0.5">
              Diamond wheels for local guild
            </span>
          </div>
        </div>
      </div>

      {/* Stakeholder Tree */}
      <div className="space-y-3">
        <div className="text-[10px] text-[#888] uppercase tracking-widest">
          COMPLETE STAKEHOLDER REVENUE DISTRIBUTION:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {CIVIC_VALUE_BREAKDOWN.map((split, i) => (
            <div key={i} className="p-4 bg-[#050605] border border-[rgba(242,240,235,0.06)] rounded">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-[#F5F3ED]">{split.category}</span>
                <span className="text-xs font-mono font-bold" style={{ color: split.color }}>
                  ${((acquisitionVolumeAUD * split.percentage) / 100).toFixed(0)} ({split.percentage}%)
                </span>
              </div>
              <p className="text-[11px] text-[#A39580] leading-relaxed mb-2 font-sans">
                {split.description}
              </p>
              <div className="text-[9px] text-[#8FA382] font-mono">
                {split.stakeholder}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
