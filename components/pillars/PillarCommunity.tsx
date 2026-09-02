import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FIVE_PILLARS_DATA } from '../../data/fivePillarsData';
import { ProvenanceBadge } from '../design-system/ProvenanceBadge';
import { ActionTrigger } from '../design-system/ActionTrigger';
import { MetadataLedger } from '../design-system/MetadataLedger';
import { StatusPip } from '../design-system/StatusPip';
import { PillarConnectionBridge } from './PillarConnectionBridge';

interface PillarCommunityProps {
  onSelectPillar: (pillarId: 'community' | 'opal' | 'town' | 'tourism' | 'heritage') => void;
}

export const PillarCommunity: React.FC<PillarCommunityProps> = ({ onSelectPillar }) => {
  const data = FIVE_PILLARS_DATA.community;
  const [selectedGrade, setSelectedGrade] = useState<number>(4);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const gradeDescriptions: Record<number, { name: string; criteria: string; quorum: string; minerVoice: string }> = {
    1: {
      name: 'M-01 ULTRA-DENSE RAW MATRIX',
      criteria: 'Ultra-low porosity (<3%), deep uniform ironstone matrix, unrefined natural pinfire flashes.',
      quorum: '98% Miner Consensus (12/12 Votes)',
      minerVoice: '“Rare find from the bottom of German Gully. Needs no cooking or treatment.”',
    },
    4: {
      name: 'M-04 INDUSTRIAL STANDARD TREATED MATRIX',
      criteria: 'Medium porosity (8–12%), verified sugar-acid carbon stabilization, multi-spectral green/orange fire.',
      quorum: '92% Miner Consensus (11/12 Votes)',
      minerVoice: '“The backbone of Andamooka trade since the 1960s. Stable, durable, beautiful.”',
    },
    7: {
      name: 'M-07 POROUS SANDSTONE MATRIX',
      criteria: 'High porosity (>15%), pale silica impregnation, delicate violet/cyan flash under direct light.',
      quorum: '85% Miner Consensus (10/12 Votes)',
      minerVoice: '“Best suited for artisan carvings or museum display pieces.”',
    },
  };

  const currentGradeInfo = gradeDescriptions[selectedGrade] || gradeDescriptions[4];

  return (
    <div className="flex flex-col gap-12 font-mono-tech">
      {/* 1. Header Banner & Aesthetic Identity */}
      <div className="p-8 sm:p-12 border border-[#C5A059] bg-[#120F0A] crosshair-corner relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[rgba(197,160,89,0.08)] to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono-tech tracking-[0.3em] text-[#C5A059] uppercase">
              PILLAR {data.index} // {data.personality.toUpperCase()}
            </span>
            <span className="opacity-40">|</span>
            <ProvenanceBadge level={data.badgeLevel} label="COMMUNITY SOVEREIGNTY" />
          </div>
          <StatusPip status="verified" label="CONSENSUS ACTIVE" />
        </div>

        <h2 className="font-display font-light text-3xl sm:text-5xl lg:text-6xl text-[#F5F3ED] tracking-[0.14em] uppercase mb-4 leading-tight">
          {data.name}
        </h2>
        <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#E5DFC5] max-w-3xl leading-relaxed mb-6">
          "{data.tagline}"
        </p>
        <span className="text-[11px] font-mono-tech text-[#A39580] tracking-[0.2em] uppercase block">
          {data.subtitle}
        </span>
      </div>

      {/* 2. Structured Answers: What is it? & Why does it matter? */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* What Is It */}
        <div className="lg:col-span-6 p-8 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] flex flex-col justify-between crosshair-corner">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#C5A059] tracking-[0.25em] uppercase mb-4">
              <span className="w-3 h-[1px] bg-[#C5A059]"></span>
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
            <span className="text-[#C5A059] block uppercase mb-1">CORE MECHANISM:</span>
            {data.whatIsIt.coreMechanism}
          </div>
        </div>

        {/* Why Does It Matter */}
        <div className="lg:col-span-6 p-8 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] flex flex-col justify-between crosshair-corner">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#C5A059] tracking-[0.25em] uppercase mb-4">
              <span className="w-3 h-[1px] bg-[#C5A059]"></span>
              <span>02 // WHY DOES IT MATTER?</span>
            </div>
            <h3 className="font-display font-light text-xl sm:text-2xl text-[#F5F3ED] tracking-[0.14em] uppercase mb-4">
              {data.whyDoesItMatter.statement}
            </h3>
            <p className="font-serif-editorial italic text-sm sm:text-base text-[#B0AAA0] leading-relaxed mb-6">
              {data.whyDoesItMatter.elaboration}
            </p>
          </div>
          <div className="p-4 bg-[#14120C] border border-[rgba(197,160,89,0.3)] text-[10px] font-serif-editorial italic text-[#E0DDD5]">
            {data.whyDoesItMatter.impactQuote}
          </div>
        </div>
      </div>

      {/* 3. Interactive Participatory Artifact: The Consensus Board Simulator */}
      <div className="p-8 sm:p-10 border border-[#C5A059] bg-[#14110A] crosshair-corner">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(197,160,89,0.25)] pb-6 mb-8">
          <div>
            <span className="text-[9px] font-mono-tech text-[#C5A059] tracking-[0.25em] uppercase block mb-1">
              INTERACTIVE DEMOCRATIC ARTIFACT
            </span>
            <h3 className="font-display font-light text-2xl text-[#F5F3ED] tracking-[0.16em] uppercase">
              Andamooka Matrix Standard Consensus Simulator
            </h3>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#A09B90]">
            <span>BOARD #04</span>
            <span className="opacity-40">|</span>
            <span className="text-[#C5A059]">QUORUM: ACTIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Grade Selector & Criteria */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-mono-tech tracking-[0.2em] text-[#C5A059] uppercase flex justify-between">
                <span>SELECT MATRIX GRADE TO DELIBERATE:</span>
                <span className="text-[#F5F3ED]">TIER M-0{selectedGrade}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 4, 7].map((gradeNum) => (
                  <button
                    key={gradeNum}
                    onClick={() => setSelectedGrade(gradeNum)}
                    className={`py-3 px-4 text-center font-mono-tech text-xs tracking-[0.2em] border transition-all ${
                      selectedGrade === gradeNum
                        ? 'border-[#C5A059] bg-[#C5A059] text-[#0A0A0A] font-bold'
                        : 'border-[rgba(242,240,235,0.1)] bg-[#080806] text-[#888] hover:text-[#F5F3ED]'
                    }`}
                  >
                    GRADE M-0{gradeNum}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 border border-[rgba(242,240,235,0.08)] bg-[#070706]">
              <h4 className="font-display font-light text-base text-[#F5F3ED] tracking-[0.14em] uppercase mb-2">
                {currentGradeInfo.name}
              </h4>
              <p className="font-serif-editorial italic text-xs text-[#AAA] leading-relaxed mb-4">
                {currentGradeInfo.criteria}
              </p>
              <div className="flex items-center justify-between text-[9px] font-mono-tech pt-3 border-t border-[rgba(242,240,235,0.06)]">
                <span className="text-[#C5A059]">CONSENSUS THRESHOLD:</span>
                <span className="text-[#F5F3ED]">{currentGradeInfo.quorum}</span>
              </div>
            </div>

            <div className="p-4 bg-[#1B170F] border border-[rgba(197,160,89,0.3)] font-serif-editorial italic text-sm text-[#D6D0C2]">
              {currentGradeInfo.minerVoice}
            </div>
          </div>

          {/* Right: Cast Vote Action */}
          <div className="lg:col-span-5 p-6 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] flex flex-col justify-between">
            <span className="text-[9px] font-mono-tech text-[#8E8A82] tracking-[0.2em] uppercase block mb-4">
              [COMMUNITY PARTICIPATION GATE]
            </span>
            <h4 className="font-display font-light text-lg text-[#F5F3ED] tracking-[0.12em] uppercase mb-3">
              Ratify Standard
            </h4>
            <p className="font-serif-editorial italic text-xs text-[#999] leading-relaxed mb-6">
              In Andamooka, standards are signed on paper in the hall before digital stamping. Cast a community vote to experience peer verification.
            </p>

            <button
              onClick={() => setHasVoted(true)}
              className={`w-full py-4 font-mono-tech text-xs tracking-[0.25em] uppercase border transition-all ${
                hasVoted
                  ? 'border-[#8FA382] bg-[#142012] text-[#8FA382]'
                  : 'border-[#C5A059] bg-[#C5A059] text-[#0A0A0A] font-bold hover:bg-[#E0BE7B]'
              }`}
            >
              {hasVoted ? '✓ CONSENSUS BALLOT RECORDED' : '[ CAST RATIFICATION BALLOT ]'}
            </button>
          </div>
        </div>
      </div>

      {/* 4. What we are doing in Andamooka */}
      <div className="p-8 sm:p-10 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] crosshair-corner">
        <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#C5A059] tracking-[0.25em] uppercase mb-4">
          <span className="w-3 h-[1px] bg-[#C5A059]"></span>
          <span>03 // WHAT ARE WE DOING IN ANDAMOOKA?</span>
        </div>
        <h3 className="font-display font-light text-2xl text-[#F5F3ED] tracking-[0.16em] uppercase mb-3">
          On-the-Ground Civic Initiatives
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
                  <span className="text-[#C5A059] tracking-[0.2em]">INITIATIVE</span>
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

      {/* 5. Interactive Relationship Bridges (The Organism Nexus) */}
      <PillarConnectionBridge
        currentPillarName="COMMUNITY"
        connections={data.howItConnects.primaryBridges}
        onSelectPillar={onSelectPillar}
      />

      {/* 6. What Becomes Possible Beyond Andamooka */}
      <div className="p-8 sm:p-10 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] crosshair-corner">
        <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#C5A059] tracking-[0.25em] uppercase mb-4">
          <span className="w-3 h-[1px] bg-[#C5A059]"></span>
          <span>05 // WHAT BECOMES POSSIBLE BEYOND ANDAMOOKA?</span>
        </div>
        <h3 className="font-display font-light text-2xl text-[#F5F3ED] tracking-[0.16em] uppercase mb-3">
          Global Sovereign Governance
        </h3>
        <p className="font-serif-editorial italic text-base text-[#AAA] mb-8 max-w-3xl">
          {data.whatBecomesPossibleBeyond.vision}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.whatBecomesPossibleBeyond.applications.map((app) => (
            <div key={app.domain} className="p-5 border border-[rgba(242,240,235,0.06)] bg-[#070706]">
              <span className="text-[9px] font-mono-tech text-[#C5A059] tracking-[0.2em] uppercase block mb-2">
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
