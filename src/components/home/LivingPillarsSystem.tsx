import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { PILLARS_SYSTEM, PillarData } from '../../data/provenanceData';
import { ProvenanceBadge } from '../design-system/ProvenanceBadge';
import { ActionTrigger } from '../design-system/ActionTrigger';
import { MetadataLedger } from '../design-system/MetadataLedger';
import { StatusPip } from '../design-system/StatusPip';
import { LivingSystemNetwork } from '../network/LivingSystemNetwork';
import { WholeSystemNavigator } from '../network/WholeSystemNavigator';
import { Network, Sparkles, Activity, Layers, ArrowRight } from 'lucide-react';

export const LivingPillarsSystem: React.FC = () => {
  const [displayMode, setDisplayMode] = useState<'NETWORK' | 'LEDGER'>('NETWORK');
  const [selectedPillarId, setSelectedPillarId] = useState<'community' | 'opal' | 'town' | 'tourism' | 'heritage'>('opal');

  const activePillar: PillarData = PILLARS_SYSTEM[selectedPillarId] || PILLARS_SYSTEM.opal;
  const pillarOrder = ['community', 'opal', 'town', 'tourism', 'heritage'] as const;

  return (
    <section id="five-pillars" className="py-24 border-b border-[rgba(242,240,235,0.08)]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 text-[10px] font-mono-tech tracking-[0.25em] text-[#C5A059] uppercase mb-3">
            <span className="w-4 h-[1px] bg-[#C5A059] opacity-60"></span>
            <span>03 // THE FIVE CONNECTED PILLARS</span>
          </div>
          <h2 className="font-display font-light text-2xl sm:text-4xl text-[#F5F3ED] tracking-[0.16em] uppercase">
            A Living, Self-Reinforcing System
          </h2>
        </div>
        <p className="font-serif-editorial italic text-base text-[#9C978D] max-w-md">
          These are not five isolated verticals. They form a continuous, closed-loop network where each pillar strengthens, verifies, and funds the others with Provenance at the centre.
        </p>
      </div>

      {/* Conceptual Formula Ribbon */}
      <div className="mb-8 p-4 border border-[rgba(242,240,235,0.06)] bg-[#0A0A08] flex items-center justify-between overflow-x-auto text-[9px] sm:text-[10px] font-mono-tech tracking-[0.2em] text-[#7A756D] uppercase whitespace-nowrap gap-4">
        <span className="text-[#C5A059]">SYSTEM CIRCUIT //</span>
        <span>COMMUNITY</span>
        <span className="text-[#C5A059]">↔</span>
        <span>OPAL</span>
        <span className="text-[#C5A059]">↔</span>
        <span>TOWN</span>
        <span className="text-[#C5A059]">↔</span>
        <span>TOURISM</span>
        <span className="text-[#C5A059]">↔</span>
        <span>HERITAGE</span>
        <span className="text-[#C5A059]">↔</span>
        <span>COMMUNITY</span>
      </div>

      {/* View Mode Switcher */}
      <div className="flex items-center justify-between gap-4 mb-6 border-b border-[rgba(242,240,235,0.06)] pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDisplayMode('NETWORK')}
            className={`px-4 py-2 text-[9px] font-mono-tech tracking-[0.2em] uppercase border transition-all flex items-center gap-2 ${
              displayMode === 'NETWORK'
                ? 'border-[#C5A059] bg-[#17140E] text-[#F5F3ED] font-bold shadow-[0_0_15px_rgba(197,160,89,0.15)]'
                : 'border-[rgba(242,240,235,0.08)] bg-[#070706] text-[#777] hover:text-[#CCC]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>01 // LIVING NETWORK CONSTELLATION</span>
          </button>

          <button
            onClick={() => setDisplayMode('LEDGER')}
            className={`px-4 py-2 text-[9px] font-mono-tech tracking-[0.2em] uppercase border transition-all flex items-center gap-2 ${
              displayMode === 'LEDGER'
                ? 'border-[#C5A059] bg-[#17140E] text-[#F5F3ED] font-bold shadow-[0_0_15px_rgba(197,160,89,0.15)]'
                : 'border-[rgba(242,240,235,0.08)] bg-[#070706] text-[#777] hover:text-[#CCC]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#A39580]" />
            <span>02 // MONOGRAPH COMPARISON MATRIX</span>
          </button>
        </div>

        <Link
          to="/pillars"
          className="hidden sm:flex items-center gap-1.5 text-[9px] font-mono-tech text-[#C5A059] hover:text-[#E0DDD5] uppercase tracking-[0.15em]"
        >
          <span>EXPLORE FULL PILLARS HUB</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Main Mode Viewport */}
      {displayMode === 'NETWORK' ? (
        <LivingSystemNetwork
          initialSelectedNode="provenance"
          showFullControls={true}
        />
      ) : (
        /* Monograph Matrix Mode */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Radial Pillar Mesh Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 border border-[rgba(242,240,235,0.08)] bg-[#0D0D0B] crosshair-corner">
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[rgba(242,240,235,0.06)]">
                <span className="text-[9px] font-mono-tech tracking-[0.25em] text-[#8E8A82] uppercase">
                  [PILLAR INTERACTION MATRIX]
                </span>
                <StatusPip status="active" label="PROVENANCE AT CENTRE" />
              </div>

              {/* Pillar Selector Buttons with Active State Vectors */}
              <div className="flex flex-col gap-3">
                {pillarOrder.map((id, index) => {
                  const pillar = PILLARS_SYSTEM[id];
                  const isSelected = selectedPillarId === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setSelectedPillarId(id)}
                      className={`group p-4 text-left border transition-all duration-300 relative ${
                        isSelected
                          ? 'border-[#C5A059] bg-[#17140E] text-[#F5F3ED] shadow-[0_0_24px_rgba(197,160,89,0.08)]'
                          : 'border-[rgba(242,240,235,0.08)] bg-[#090908] text-[#777] hover:border-[rgba(242,240,235,0.25)] hover:text-[#D4D0C8]'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#C5A059]" />
                      )}

                      <div className="flex items-center justify-between font-mono-tech text-[8px] tracking-[0.2em] mb-1">
                        <span className={isSelected ? 'text-[#C5A059]' : 'text-[#555]'}>
                          0{index + 1} // {pillar.code}
                        </span>
                        {id === 'opal' && (
                          <span className="text-[8px] text-[#8FA382] border border-[rgba(143,163,130,0.3)] px-1">
                            ACTIVE 3D TWIN
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-display font-light text-lg sm:text-xl tracking-[0.16em] uppercase">
                          {pillar.name}
                        </span>
                        <span className={`text-[10px] transition-transform ${isSelected ? 'text-[#C5A059] translate-x-1' : 'opacity-0 group-hover:opacity-100'}`}>
                          →
                        </span>
                      </div>

                      <span className="text-[9px] font-mono-tech text-[#888] tracking-[0.1em] block mt-1 line-clamp-1">
                        {pillar.shortDefinition}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Core Provenance Hub Note */}
            <div className="mt-8 pt-6 border-t border-[rgba(242,240,235,0.06)]">
              <div className="p-4 bg-[#050505] border border-[rgba(197,160,89,0.2)] font-mono-tech text-[9px] text-[#A09B90] leading-relaxed">
                <span className="text-[#C5A059] block uppercase tracking-[0.2em] mb-1 font-bold">
                  CENTRAL HUB: PROVENANCE
                </span>
                Every interaction across Community, Opal, Town, Tourism, and Heritage generates immutable records that increase the collective value of all five pillars.
              </div>
            </div>
          </div>

          {/* Right Column: In-Depth Living Pillar Viewport */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 border border-hairline-gold bg-[#11100C] crosshair-corner">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-6"
              >
                {/* Header Badge & Code */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(197,160,89,0.2)] pb-4">
                  <ProvenanceBadge level={activePillar.badgeLevel} />
                  <span className="text-[9px] font-mono-tech tracking-[0.2em] text-[#C5A059]">
                    {activePillar.code} // ACTIVE LIVING PILLAR
                  </span>
                </div>

                {/* Title & Principle */}
                <div>
                  <h3 className="font-display font-light text-2xl sm:text-4xl text-[#F5F3ED] tracking-[0.14em] uppercase leading-tight mb-3">
                    {activePillar.name}
                  </h3>
                  <p className="font-serif-editorial italic text-base sm:text-lg text-[#E0DDD5] leading-[1.65]">
                    "{activePillar.keyPrinciple}"
                  </p>
                </div>

                {/* Detailed Narrative */}
                <p className="font-serif-editorial text-sm sm:text-base text-[#A09B90] leading-[1.75]">
                  {activePillar.fullNarrative}
                </p>

                {/* Live Metrics Ledger */}
                <MetadataLedger
                  entries={activePillar.liveMetrics.map((m) => ({
                    label: m.label,
                    value: m.value,
                    highlight: true,
                  }))}
                  title="FIELD SPECIFICATION & STATUS"
                />

                {/* Interconnected Feeds: Inputs and Outputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {/* Inputs */}
                  <div className="p-4 bg-[#080806] border border-[rgba(242,240,235,0.06)]">
                    <span className="text-[8px] font-mono-tech text-[#8FA382] tracking-[0.2em] uppercase block mb-2 font-bold">
                      // INPUTS RECEIVED FROM:
                    </span>
                    <div className="space-y-2">
                      {activePillar.inputsFrom.map((inp, idx) => (
                        <div key={idx} className="text-[9px] font-mono-tech text-[#888] leading-tight">
                          <span className="text-[#F5F3ED] uppercase font-bold">[{inp.pillar}]</span> {inp.relationship}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outputs */}
                  <div className="p-4 bg-[#080806] border border-[rgba(242,240,235,0.06)]">
                    <span className="text-[8px] font-mono-tech text-[#C5A059] tracking-[0.2em] uppercase block mb-2 font-bold">
                      // OUTPUTS TRANSMITTED TO:
                    </span>
                    <div className="space-y-2">
                      {activePillar.outputsTo.map((out, idx) => (
                        <div key={idx} className="text-[9px] font-mono-tech text-[#888] leading-tight">
                          <span className="text-[#F5F3ED] uppercase font-bold">[{out.pillar}]</span> {out.relationship}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Action Triggers */}
            <div className="mt-8 pt-6 border-t border-[rgba(242,240,235,0.06)] flex flex-wrap items-center justify-between gap-4">
              <span className="text-[9px] font-mono-tech text-[#777] tracking-[0.2em] uppercase">
                ANDAMOOKA STANDARD // SPECIFICATION READY
              </span>

              <div className="flex items-center gap-3">
                <ActionTrigger 
                  label={`EXPLORE ${activePillar.name} DEEP-DIVE`} 
                  variant="gold" 
                  to={`/pillars?pillar=${activePillar.id}`} 
                />
                {activePillar.actionRoute && (
                  <ActionTrigger label="VIEW 3D SPECIMEN" variant="outline" to={activePillar.actionRoute} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
