import React from 'react';
import { ProvenanceObjectData } from '../../types/provenanceObject';
import { 
  Users, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  CheckCircle2,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface AndamookaStandardBridgeProps {
  specimen: ProvenanceObjectData;
}

export function AndamookaStandardBridge({ specimen }: AndamookaStandardBridgeProps) {
  const steps = [
    { title: 'COMMUNITY', desc: 'Local miners, assayers, and elders convene in town halls to define consensus parameters.' },
    { title: 'STANDARD', desc: 'Objective M-01 to M-09 grading matrix calibrated against body tone, matrix density, and fire.' },
    { title: 'IDENTITY', desc: 'Every stone receives an unambiguous identity linked to its miner and extraction shaft.' },
    { title: 'PROVENANCE', desc: 'The physical-to-digital record becomes immutable, auditable, and globally accessible.' },
    { title: 'MARKET CONFIDENCE', desc: 'Global buyers acquire with certainty, eliminating counterfeit risks and middleman exploitation.' },
  ];

  return (
    <div id="andamooka-standard" className="w-full bg-[#080808] border border-[rgba(245,243,237,0.1)] rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-[rgba(245,243,237,0.08)] pb-8">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#C5A059]" />
          <span className="font-mono text-xs tracking-[0.25em] text-[#C5A059] uppercase">
            SECTION 04 // COMMUNITY CONSENSUS STANDARD
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F3ED] font-light tracking-wide">
              The Andamooka Matrix Standard
            </h2>
            <p className="font-serif italic text-lg text-[#C5A059] mt-2">
              Value is not dictated from the outside. It is evidenced and defined by the community.
            </p>
          </div>

          <div className="bg-[#121212] px-4 py-2 rounded-lg border border-[#C5A059]/30 text-xs font-mono text-[#C5A059] self-start lg:self-auto">
            RATIFIED GRADE: {specimen.communityStandard.gradeCode}
          </div>
        </div>

        <p className="font-sans text-sm text-[#AAA] max-w-3xl leading-relaxed mt-2">
          For decades, Andamooka matrix opal suffered from inconsistent grading and predatory pricing by external cartels. APP is co-developing a democratic, miner-led classification standard so the town captures the true value of its heritage.
        </p>
      </div>

      {/* 5-Step Value Logic Chain */}
      <div className="flex flex-col gap-4">
        <span className="font-mono text-[10px] tracking-widest text-[#777] uppercase">
          THE VALUE GENERATION FLYWHEEL:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {steps.map((s, idx) => (
            <div
              key={s.title}
              className="bg-[#0e0e0e] border border-[rgba(245,243,237,0.06)] rounded-xl p-4 flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] text-[#C5A059] font-bold">0{idx + 1}</span>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-[#444] hidden md:block" />
                  )}
                </div>
                <h4 className="font-display text-sm text-[#F5F3ED] font-medium tracking-wide mb-1">
                  {s.title}
                </h4>
                <p className="font-sans text-[11px] text-[#888] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specimen 001 Community Grading Dossier */}
      <div className="bg-[#0c0c0c] border border-[rgba(245,243,237,0.08)] rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-1 border-b md:border-b-0 md:border-r border-[rgba(245,243,237,0.06)] pb-4 md:pb-0 md:pr-4">
          <span className="font-mono text-[9px] text-[#666] uppercase">BODY TONE & MATRIX</span>
          <span className="font-mono text-sm font-bold text-[#F5F3ED]">{specimen.communityStandard.bodyTone}</span>
          <span className="font-sans text-xs text-[#888]">{specimen.communityStandard.gradeDescription}</span>
        </div>

        <div className="flex flex-col gap-1 border-b md:border-b-0 md:border-r border-[rgba(245,243,237,0.06)] pb-4 md:pb-0 md:pr-4">
          <span className="font-mono text-[9px] text-[#666] uppercase">FIRE DOMINANCE & PATTERN</span>
          <span className="font-mono text-sm font-bold text-[#C5A059]">{specimen.communityStandard.brightnessLevel}</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {specimen.communityStandard.fireDominance.map((fire) => (
              <span key={fire} className="font-mono text-[9px] bg-[#050505] text-[#AAA] px-2 py-0.5 rounded">
                {fire}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 justify-between">
          <div>
            <span className="font-mono text-[9px] text-[#666] uppercase">PEER RATIFICATION</span>
            <span className="font-mono text-xs font-semibold text-[#F5F3ED] block mt-0.5">
              {specimen.communityStandard.consensusPanel}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>CONFIRMED ON {specimen.communityStandard.ratificationDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
