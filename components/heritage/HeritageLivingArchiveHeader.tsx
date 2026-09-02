import React from 'react';
import { motion } from 'motion/react';
import { Landmark, Compass, ShieldCheck, Sparkles, BookOpen, Clock, Layers } from 'lucide-react';
import { ProvenanceBadge } from '../design-system/ProvenanceBadge';
import { StatusPip } from '../design-system/StatusPip';

export const HeritageLivingArchiveHeader: React.FC = () => {
  return (
    <div className="relative overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-12 border-b border-[rgba(242,240,235,0.08)] bg-gradient-to-b from-[#0F0B09] via-[#080605] to-[#050505]">
      {/* Subtle geological strata background texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, #C47D68 0%, transparent 60%), linear-gradient(to right, #C47D68 1px, transparent 1px), linear-gradient(to bottom, #C47D68 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top telemetry bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono-tech tracking-[0.3em] text-[#C47D68] uppercase font-bold">
              APP LIVING ARCHIVE // ANDAMOOKA SOVEREIGN HERITAGE SYSTEM
            </span>
            <span className="opacity-40 text-[#888]">|</span>
            <ProvenanceBadge level="LEVEL_1" label="ORAL HISTORY & ARCHITECTURAL DNA" />
          </div>
          <StatusPip status="verified" label="KOKATHA & PIONEER PROTOCOLS ACTIVE" />
        </div>

        {/* Master statement */}
        <div className="max-w-5xl mb-10">
          <h1 className="font-display font-light text-3xl sm:text-5xl lg:text-6xl text-[#F5F3ED] tracking-[0.06em] uppercase leading-[1.1] mb-6">
            The Living <br className="hidden sm:block" />
            <span className="text-[#C47D68] italic font-serif">Archive of Evidence.</span>
          </h1>

          <p className="font-serif-editorial italic text-lg sm:text-2xl text-[#E8D1CB] leading-relaxed mb-6">
            “A building is evidence. A photograph is evidence. A person is evidence. A story is evidence. A place is evidence. We do not manufacture history; we build the infrastructure that uncovers, connects, and preserves it.”
          </p>

          <p className="text-xs sm:text-sm text-[#A89F91] leading-relaxed max-w-3xl font-sans">
            Andamooka’s heritage is not a static museum behind glass. It is a living, continuous relationship spanning 110 million years of geological sedimentation, 45,000 years of Kokatha custodianship, and nearly a century of pioneering subterranean dugout architecture. 
          </p>
        </div>

        {/* Six-node evidence flow pill banner */}
        <div className="p-4 sm:p-5 bg-[#0A0706] border border-[rgba(196,125,104,0.3)] rounded-lg">
          <div className="text-[9px] font-mono-tech text-[#C47D68] tracking-[0.25em] uppercase font-bold mb-3 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" />
            <span>THE SIX CONNECTIVE STRATA OF LIVING HERITAGE:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center font-mono-tech">
            {[
              { num: '01', name: 'PERSON', desc: 'Oral Witness & Lineage', color: '#C5A059' },
              { num: '02', name: 'HOME', desc: 'Subterranean Dugout', color: '#C47D68' },
              { num: '03', name: 'STORY', desc: 'Binaural Voice & Memory', color: '#E06D53' },
              { num: '04', name: 'BUILDING', desc: 'Vernacular Architecture', color: '#8FA382' },
              { num: '05', name: 'TOWN', desc: 'Spatial Ridge Locus', color: '#5C7D91' },
              { num: '06', name: 'TIME', desc: 'Deep Time to 2050', color: '#A39580' },
            ].map((node, i) => (
              <div
                key={i}
                className="p-3 bg-[#050404] border border-[rgba(242,240,235,0.06)] rounded flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-[8px] text-[#666] mb-1">
                  <span>{node.num}</span>
                  <span style={{ color: node.color }}>●</span>
                </div>
                <span className="text-xs font-bold text-[#F5F3ED] tracking-wider block">
                  {node.name}
                </span>
                <span className="text-[9px] text-[#888] font-sans block mt-0.5">
                  {node.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
