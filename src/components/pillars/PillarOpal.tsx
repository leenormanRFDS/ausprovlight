import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { FIVE_PILLARS_DATA } from '../../data/fivePillarsData';
import { ProvenanceBadge } from '../design-system/ProvenanceBadge';
import { ActionTrigger } from '../design-system/ActionTrigger';
import { StatusPip } from '../design-system/StatusPip';
import { PillarConnectionBridge } from './PillarConnectionBridge';

interface PillarOpalProps {
  onSelectPillar: (pillarId: 'community' | 'opal' | 'town' | 'tourism' | 'heritage') => void;
}

export const PillarOpal: React.FC<PillarOpalProps> = ({ onSelectPillar }) => {
  const data = FIVE_PILLARS_DATA.opal;
  const [activeElement, setActiveElement] = useState<'Fe' | 'Zr' | 'S' | 'Ba'>('Zr');

  const elementDetails = {
    Zr: {
      name: 'ZIRCONIUM (Zr)',
      ppm: '142 PPM',
      significance: 'Distinct geochemical marker of the Bulldog Shale horizon. Separates Andamooka matrix from Queensland ironstone.',
      curve: 'High peak at 15.77 keV',
    },
    Fe: {
      name: 'IRON (Fe)',
      ppm: '21,400 PPM (2.14%)',
      significance: 'Indicates authentic sandstone matrix host rock porosity and structural density.',
      curve: 'Prominent peak at 6.40 keV',
    },
    S: {
      name: 'SULFUR (S)',
      ppm: '4,100 PPM (0.41%)',
      significance: 'Marine sedimentary reduction signature from the ancient Cretaceous inland seabed.',
      curve: 'Broad baseline at 2.31 keV',
    },
    Ba: {
      name: 'BARIUM (Ba)',
      ppm: '88 PPM',
      significance: 'Hydrothermal silica deposition phase indicator, confirming natural non-synthetic origin.',
      curve: 'Secondary peak at 4.46 keV',
    },
  };

  const currentElement = elementDetails[activeElement];

  return (
    <div className="flex flex-col gap-12 font-mono-tech">
      {/* 1. Header Banner */}
      <div className="p-8 sm:p-12 border border-[#5C7D91] bg-[#0A0E12] crosshair-corner relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[rgba(92,125,145,0.12)] to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono-tech tracking-[0.3em] text-[#5C7D91] uppercase">
              PILLAR {data.index} // {data.personality.toUpperCase()}
            </span>
            <span className="opacity-40">|</span>
            <ProvenanceBadge level={data.badgeLevel} label="MINER-SIDE XRF VERIFIED" />
          </div>
          <StatusPip status="verified" label="SPECTRAL CONFIDENCE 99.98%" />
        </div>

        <h2 className="font-display font-light text-3xl sm:text-5xl lg:text-6xl text-[#F5F3ED] tracking-[0.14em] uppercase mb-4 leading-tight">
          {data.name}
        </h2>
        <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#C5D8E2] max-w-3xl leading-relaxed mb-6">
          "{data.tagline}"
        </p>
        <span className="text-[11px] font-mono-tech text-[#8FA7B5] tracking-[0.2em] uppercase block">
          {data.subtitle}
        </span>
      </div>

      {/* 2. Structured Answers: What is it? & Why does it matter? */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 p-8 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] flex flex-col justify-between crosshair-corner">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#5C7D91] tracking-[0.25em] uppercase mb-4">
              <span className="w-3 h-[1px] bg-[#5C7D91]"></span>
              <span>01 // WHAT IS IT?</span>
            </div>
            <h3 className="font-display font-light text-xl sm:text-2xl text-[#F5F3ED] tracking-[0.14em] uppercase mb-4">
              {data.whatIsIt.statement}
            </h3>
            <p className="font-serif-editorial italic text-sm sm:text-base text-[#B0AAA0] leading-relaxed mb-6">
              {data.whatIsIt.elaboration}
            </p>
          </div>
          <div className="p-4 bg-[#050505] border border-[rgba(242,240,235,0.06)] text-[9px] font-mono-tech text-[#888]">
            <span className="text-[#5C7D91] block uppercase mb-1">CORE SCIENTIFIC MECHANISM:</span>
            {data.whatIsIt.coreMechanism}
          </div>
        </div>

        <div className="lg:col-span-6 p-8 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] flex flex-col justify-between crosshair-corner">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#5C7D91] tracking-[0.25em] uppercase mb-4">
              <span className="w-3 h-[1px] bg-[#5C7D91]"></span>
              <span>02 // WHY DOES IT MATTER?</span>
            </div>
            <h3 className="font-display font-light text-xl sm:text-2xl text-[#F5F3ED] tracking-[0.14em] uppercase mb-4">
              {data.whyDoesItMatter.statement}
            </h3>
            <p className="font-serif-editorial italic text-sm sm:text-base text-[#B0AAA0] leading-relaxed mb-6">
              {data.whyDoesItMatter.elaboration}
            </p>
          </div>
          <div className="p-4 bg-[#0B1216] border border-[rgba(92,125,145,0.3)] text-[10px] font-serif-editorial italic text-[#C5D8E2]">
            {data.whyDoesItMatter.impactQuote}
          </div>
        </div>
      </div>

      {/* 3. Interactive Scientific Artifact: The pXRF Spectrogram Analyzer */}
      <div className="p-8 sm:p-10 border border-[#5C7D91] bg-[#0B0F13] crosshair-corner">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(92,125,145,0.25)] pb-6 mb-8">
          <div>
            <span className="text-[9px] font-mono-tech text-[#5C7D91] tracking-[0.25em] uppercase block mb-1">
              PORTABLE X-RAY FLUORESCENCE (pXRF) ANALYZER
            </span>
            <h3 className="font-display font-light text-2xl text-[#F5F3ED] tracking-[0.16em] uppercase">
              Geochemical Elemental Signature // Specimen AOSA-AND-LUN-001
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <ActionTrigger label="Inspect 3D Twin" variant="gold" to="/opal" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Element Selector & Spectrogram curve representation */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-mono-tech tracking-[0.2em] text-[#5C7D91] uppercase flex justify-between">
                <span>SELECT TRACE ELEMENT PEAK:</span>
                <span className="text-[#F5F3ED]">{currentElement.name}</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['Zr', 'Fe', 'S', 'Ba'] as const).map((el) => (
                  <button
                    key={el}
                    onClick={() => setActiveElement(el)}
                    className={`py-3 px-3 text-center font-mono-tech text-xs tracking-[0.15em] border transition-all ${
                      activeElement === el
                        ? 'border-[#5C7D91] bg-[#5C7D91] text-[#0A0E12] font-bold'
                        : 'border-[rgba(242,240,235,0.1)] bg-[#07090B] text-[#888] hover:text-[#F5F3ED]'
                    }`}
                  >
                    {el} PEAK
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Energy Dispersive Graph */}
            <div className="p-6 border border-[rgba(242,240,235,0.08)] bg-[#06080A]">
              <div className="flex items-center justify-between text-[8px] font-mono-tech text-[#666] mb-3">
                <span>ENERGY (keV) 0.0 → 25.0</span>
                <span>COUNTS / SEC: 4,820</span>
              </div>
              <div className="h-28 w-full border-b border-l border-[rgba(242,240,235,0.15)] relative flex items-end p-2 gap-2">
                {/* SVG Curve representation */}
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
                  <path
                    d="M0,90 Q50,85 80,70 T150,90 T220,20 T260,85 T320,50 T400,90"
                    fill="none"
                    stroke="#5C7D91"
                    strokeWidth="2"
                  />
                  {activeElement === 'Zr' && (
                    <circle cx="220" cy="20" r="5" fill="#C5A059" className="animate-pulse" />
                  )}
                  {activeElement === 'Fe' && (
                    <circle cx="80" cy="70" r="5" fill="#C5A059" className="animate-pulse" />
                  )}
                  {activeElement === 'S' && (
                    <circle cx="150" cy="90" r="5" fill="#C5A059" className="animate-pulse" />
                  )}
                  {activeElement === 'Ba' && (
                    <circle cx="320" cy="50" r="5" fill="#C5A059" className="animate-pulse" />
                  )}
                </svg>
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono-tech text-[#5C7D91] mt-3">
                <span>SPECTRAL CURVE: {currentElement.curve}</span>
                <span className="text-[#F5F3ED]">CONCENTRATION: {currentElement.ppm}</span>
              </div>
            </div>

            <div className="p-4 bg-[#0E151A] border border-[rgba(92,125,145,0.3)] font-serif-editorial italic text-sm text-[#C5D8E2]">
              {currentElement.significance}
            </div>
          </div>

          {/* Right: Stratigraphic Horizon */}
          <div className="lg:col-span-5 p-6 border border-[rgba(242,240,235,0.08)] bg-[#080B0E] flex flex-col justify-between">
            <span className="text-[9px] font-mono-tech text-[#8E8A82] tracking-[0.2em] uppercase block mb-4">
              [STRATIGRAPHIC PROVENANCE STAMP]
            </span>
            <h4 className="font-display font-light text-lg text-[#F5F3ED] tracking-[0.12em] uppercase mb-2">
              Bulldog Shale // 110 Ma
            </h4>
            <p className="font-serif-editorial italic text-xs text-[#999] leading-relaxed mb-6">
              Extracted from Lunatic Field, 12.4m below surface. Silicified mudstone host matrix with high interstitial stability.
            </p>

            <div className="space-y-2 mb-6 text-[9px] font-mono-tech">
              <div className="flex justify-between border-b border-[rgba(242,240,235,0.04)] py-1">
                <span className="text-[#666]">SHAFT CLAIM:</span>
                <span className="text-[#F5F3ED]">#4192 LUNATIC FIELD</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(242,240,235,0.04)] py-1">
                <span className="text-[#666]">MINER ATTESTATION:</span>
                <span className="text-[#C5A059]">MATT KATHAGEN</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(242,240,235,0.04)] py-1">
                <span className="text-[#666]">CRYPTOGRAPHIC HASH:</span>
                <span className="text-[#5C7D91]">0x7F9B...44D1</span>
              </div>
            </div>

            <Link
              to="/opal"
              className="w-full py-4 text-center font-mono-tech text-xs tracking-[0.25em] uppercase border border-[#5C7D91] bg-[#5C7D91] text-[#0A0E12] font-bold hover:bg-[#8FA7B5] transition-all block"
            >
              [ LAUNCH 3D SPECIMEN VIEWER ]
            </Link>
          </div>
        </div>
      </div>

      {/* 4. What we are doing in Andamooka */}
      <div className="p-8 sm:p-10 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] crosshair-corner">
        <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#5C7D91] tracking-[0.25em] uppercase mb-4">
          <span className="w-3 h-[1px] bg-[#5C7D91]"></span>
          <span>03 // WHAT ARE WE DOING IN ANDAMOOKA?</span>
        </div>
        <h3 className="font-display font-light text-2xl text-[#F5F3ED] tracking-[0.16em] uppercase mb-3">
          Miner-Side Registration & Mobile Labs
        </h3>
        <p className="font-serif-editorial italic text-base text-[#AAA] mb-8 max-w-3xl">
          {data.whatWeAreDoingInAndamooka.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.whatWeAreDoingInAndamooka.initiatives.map((init) => (
            <div
              key={init.title}
              className="p-6 border border-[rgba(242,240,235,0.06)] bg-[#070706] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[8px] font-mono-tech mb-3">
                  <span className="text-[#5C7D91] tracking-[0.2em]">INITIATIVE</span>
                  <span className="px-1.5 py-0.5 border border-[rgba(242,240,235,0.1)] text-[#8FA382]">
                    {init.status}
                  </span>
                </div>
                <h4 className="font-display font-light text-base text-[#F5F3ED] tracking-[0.12em] uppercase mb-2">
                  {init.title}
                </h4>
                <p className="font-serif-editorial italic text-xs text-[#888] leading-relaxed">
                  {init.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Interactive Relationship Bridges */}
      <PillarConnectionBridge
        currentPillarName="OPAL"
        connections={data.howItConnects.primaryBridges}
        onSelectPillar={onSelectPillar}
      />

      {/* 6. What Becomes Possible Beyond Andamooka */}
      <div className="p-8 sm:p-10 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] crosshair-corner">
        <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#5C7D91] tracking-[0.25em] uppercase mb-4">
          <span className="w-3 h-[1px] bg-[#5C7D91]"></span>
          <span>05 // WHAT BECOMES POSSIBLE BEYOND ANDAMOOKA?</span>
        </div>
        <h3 className="font-display font-light text-2xl text-[#F5F3ED] tracking-[0.16em] uppercase mb-3">
          Global Specimen Provenance
        </h3>
        <p className="font-serif-editorial italic text-base text-[#AAA] mb-8 max-w-3xl">
          {data.whatBecomesPossibleBeyond.vision}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.whatBecomesPossibleBeyond.applications.map((app) => (
            <div key={app.domain} className="p-5 border border-[rgba(242,240,235,0.06)] bg-[#070706]">
              <span className="text-[9px] font-mono-tech text-[#5C7D91] tracking-[0.2em] uppercase block mb-2">
                {app.domain}
              </span>
              <p className="font-serif-editorial italic text-xs text-[#888] leading-relaxed">
                {app.potential}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
