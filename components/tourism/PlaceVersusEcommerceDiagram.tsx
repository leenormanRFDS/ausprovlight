import React from 'react';
import { motion } from 'motion/react';
import { PLACE_VS_ECOMMERCE_COMPARISON } from '../../data/tourismJourneyData';
import { ArrowRight, Globe, ShieldCheck, HeartHandshake, Sparkles, Layers, XCircle, CheckCircle2 } from 'lucide-react';

export const PlaceVersusEcommerceDiagram: React.FC = () => {
  const narrativeFlowStages = [
    {
      code: 'DIGITAL DISCOVERY',
      title: '01 // DIGITAL DISCOVERY',
      summary: 'Exploring sovereign 3D terrain and unsealed tracks from across the globe.',
      color: '#5C7D91',
    },
    {
      code: 'STORY',
      title: '02 // STORY & HUMAN',
      summary: 'Meeting the 3rd-gen gouger and listening to 110-million-year oral dreaming.',
      color: '#E06D53',
    },
    {
      code: 'PARTICIPATION',
      title: '03 // PARTICIPATION',
      summary: 'Descending into the shaft and witnessing unmediated extraction.',
      color: '#C5A059',
    },
    {
      code: 'OWNERSHIP',
      title: '04 // SCIENTIFIC TWIN',
      summary: 'Auditing sub-millimeter 3D mesh, pXRF chemical DNA, and custody ledger.',
      color: '#8FA382',
    },
    {
      code: 'PLACE',
      title: '05 // PLACE CUSTODIANSHIP',
      summary: 'Receiving physical specimen in Germany while funding town water & heritage.',
      color: '#C5A059',
    },
  ];

  return (
    <div className="border border-[rgba(242,240,235,0.12)] bg-[#070908] p-6 sm:p-10 crosshair-corner font-mono-tech relative overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[rgba(242,240,235,0.08)]">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-[#C5A059] tracking-[0.25em] uppercase font-bold">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>PHILOSOPHICAL ARCHITECTURE // NOT E-COMMERCE</span>
          </div>
          <h2 className="font-display font-light text-2xl sm:text-3xl text-[#F5F3ED] tracking-wide uppercase mt-1">
            Buying a Relationship to Place, Not Just an Asset
          </h2>
        </div>
        <span className="text-xs text-[#A39580] max-w-sm text-right hidden md:block">
          APP replaces extractive commodity shopping with regenerative community custodianship.
        </span>
      </div>

      {/* 5-Step Macro Flow Rail: DIGITAL DISCOVERY -> STORY -> PARTICIPATION -> OWNERSHIP -> PLACE */}
      <div className="mb-12">
        <div className="text-[10px] text-[#888] uppercase tracking-widest mb-3">
          THE CONTINUOUS PLACE-BOND TRANSMISSION CYCLE:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {narrativeFlowStages.map((stage, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#0A0D0B] border rounded relative overflow-hidden flex flex-col justify-between"
              style={{ borderColor: `rgba(242, 240, 235, 0.08)` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-widest" style={{ color: stage.color }}>
                  {stage.title}
                </span>
                {idx < 4 && <ArrowRight className="w-3.5 h-3.5 text-[#555] hidden md:block" />}
              </div>
              <p className="text-xs text-[#C8C2B7] leading-relaxed">
                {stage.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contrast Grid: Conventional E-Commerce vs. APP Regenerative Tourism */}
      <div className="space-y-4">
        <div className="text-[10px] text-[#888] uppercase tracking-widest">
          SYSTEMIC COMPARISON: COMMODITY RETAIL VS. AUSTRALIAN PROVENANCE PROJECT
        </div>

        <div className="grid grid-cols-1 gap-4">
          {PLACE_VS_ECOMMERCE_COMPARISON.map((comp, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-5 bg-[#050605] border border-[rgba(242,240,235,0.06)] rounded-lg hover:border-[rgba(197,160,89,0.3)] transition-all"
            >
              <div className="lg:col-span-3 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[rgba(242,240,235,0.06)] pb-3 lg:pb-0 lg:pr-4">
                <h4 className="font-display font-light text-sm text-[#F5F3ED] uppercase tracking-wide">
                  {comp.dimension}
                </h4>
                <span className="text-[10px] text-[#C5A059] mt-2 font-mono">
                  {comp.whyItMatters}
                </span>
              </div>

              {/* Conventional E-Commerce (Red/Muted) */}
              <div className="lg:col-span-4 p-3 bg-[rgba(255,100,100,0.02)] border border-[rgba(255,100,100,0.1)] rounded">
                <div className="flex items-center gap-1.5 text-[10px] text-[#E06D53] font-bold uppercase mb-1.5">
                  <XCircle className="w-3.5 h-3.5 text-[#E06D53]" />
                  <span>CONVENTIONAL EXTRACTIVE E-COMMERCE</span>
                </div>
                <p className="text-xs text-[#999] leading-relaxed font-sans">
                  {comp.conventionalEcommerce}
                </p>
              </div>

              {/* APP Place Relationship (Gold/Green) */}
              <div className="lg:col-span-5 p-3 bg-[rgba(197,160,89,0.04)] border border-[rgba(197,160,89,0.2)] rounded">
                <div className="flex items-center gap-1.5 text-[10px] text-[#C5A059] font-bold uppercase mb-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8FA382]" />
                  <span>APP PLACE RELATIONSHIP PROTOCOL</span>
                </div>
                <p className="text-xs text-[#E5E0D5] leading-relaxed font-sans font-medium">
                  {comp.appPlaceRelationship}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
