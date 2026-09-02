import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { FIVE_PILLARS_DATA } from '../../data/fivePillarsData';
import { ProvenanceBadge } from '../design-system/ProvenanceBadge';
import { ActionTrigger } from '../design-system/ActionTrigger';
import { StatusPip } from '../design-system/StatusPip';
import { PillarConnectionBridge } from './PillarConnectionBridge';
import { Globe, ArrowRight, Sparkles } from 'lucide-react';

interface PillarTourismProps {
  onSelectPillar: (pillarId: 'community' | 'opal' | 'town' | 'tourism' | 'heritage') => void;
}

export const PillarTourism: React.FC<PillarTourismProps> = ({ onSelectPillar }) => {
  const data = FIVE_PILLARS_DATA.tourism;
  const [journeyStep, setJourneyStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      title: '01 // REMOTE XR SPATIAL DISCOVERY',
      location: 'Frankfurt, Germany',
      action: 'Collector virtually navigates Andamooka’s German Gully in millimeter 3D XR.',
      output: 'Spatial Immersion Active',
    },
    {
      step: 2,
      title: '02 // 3D TWIN SCIENTIFIC INSPECTION',
      location: 'Digital Provenance Lab',
      action: 'Inspects specimen AOSA-AND-LUN-001 with verified pXRF chemical fingerprint and miner story.',
      output: 'Spectral Match 99.98%',
    },
    {
      step: 3,
      title: '03 // REAL-WORLD ASSET (RWA) ACQUISITION',
      location: 'Andamooka to Europe',
      action: 'Collector acquires the physical matrix opal with unbroken chain-of-custody documentation.',
      output: 'Physical Specimen Dispatched',
    },
    {
      step: 4,
      title: '04 // LOCAL CIVIC REINVESTMENT LOOP',
      location: 'Andamooka Community Trust',
      action: 'A 7.5% provenance royalty flows directly into town water, power, and dugout preservation funds.',
      output: 'Civic Trust Credited +$420 AUD',
    },
  ];

  const currentStep = steps.find((s) => s.step === journeyStep) || steps[0];

  return (
    <div className="flex flex-col gap-12 font-mono-tech">
      {/* 1. Header Banner */}
      <div className="p-8 sm:p-12 border border-[#8FA382] bg-[#0C120B] crosshair-corner relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[rgba(143,163,130,0.12)] to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono-tech tracking-[0.3em] text-[#8FA382] uppercase">
              PILLAR {data.index} // {data.personality.toUpperCase()}
            </span>
            <span className="opacity-40">|</span>
            <ProvenanceBadge level={data.badgeLevel} label="REGENERATIVE XR TOURISM" />
          </div>
          <StatusPip status="verified" label="GLOBAL CONNECTIONS ACTIVE" />
        </div>

        <h2 className="font-display font-light text-3xl sm:text-5xl lg:text-6xl text-[#F5F3ED] tracking-[0.14em] uppercase mb-4 leading-tight">
          {data.name}
        </h2>
        <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#D0E2C8] max-w-3xl leading-relaxed mb-6">
          "{data.tagline}"
        </p>
        <span className="text-[11px] font-mono-tech text-[#8FA382] tracking-[0.2em] uppercase block mb-6">
          {data.subtitle}
        </span>

        {/* Callout to Full 10-Step Interactive German Collector Experience */}
        <Link
          to="/tourism"
          className="inline-flex items-center gap-3 px-5 py-3 rounded bg-[rgba(197,160,89,0.15)] hover:bg-[rgba(197,160,89,0.25)] border border-[#C5A059] text-[#F5F3ED] transition-all group"
        >
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
          <span className="text-xs font-mono tracking-wider font-bold">
            LAUNCH IMMERSIVE GERMAN COLLECTOR XR JOURNEY (10 CHAPTERS)
          </span>
          <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 2. Structured Answers: What is it? & Why does it matter? */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 p-8 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] flex flex-col justify-between crosshair-corner">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#8FA382] tracking-[0.25em] uppercase mb-4">
              <span className="w-3 h-[1px] bg-[#8FA382]"></span>
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
            <span className="text-[#8FA382] block uppercase mb-1">CORE ECONOMIC MECHANISM:</span>
            {data.whatIsIt.coreMechanism}
          </div>
        </div>

        <div className="lg:col-span-6 p-8 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] flex flex-col justify-between crosshair-corner">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#8FA382] tracking-[0.25em] uppercase mb-4">
              <span className="w-3 h-[1px] bg-[#8FA382]"></span>
              <span>02 // WHY DOES IT MATTER?</span>
            </div>
            <h3 className="font-display font-light text-xl sm:text-2xl text-[#F5F3ED] tracking-[0.14em] uppercase mb-4">
              {data.whyDoesItMatter.statement}
            </h3>
            <p className="font-serif-editorial italic text-sm sm:text-base text-[#B0AAA0] leading-relaxed mb-6">
              {data.whyDoesItMatter.elaboration}
            </p>
          </div>
          <div className="p-4 bg-[#0E150D] border border-[rgba(143,163,130,0.3)] text-[10px] font-serif-editorial italic text-[#D0E2C8]">
            {data.whyDoesItMatter.impactQuote}
          </div>
        </div>
      </div>

      {/* 3. Interactive Immersive Artifact: Global Collector Journey Simulator */}
      <div className="p-8 sm:p-10 border border-[#8FA382] bg-[#0E130D] crosshair-corner">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(143,163,130,0.25)] pb-6 mb-8">
          <div>
            <span className="text-[9px] font-mono-tech text-[#8FA382] tracking-[0.25em] uppercase block mb-1">
              GLOBAL-TO-LOCAL ECONOMIC REINVESTMENT SIMULATOR
            </span>
            <h3 className="font-display font-light text-2xl text-[#F5F3ED] tracking-[0.16em] uppercase">
              Collector Journey // Frankfurt ➔ Andamooka
            </h3>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#A09B90]">
            <span>FLOW: BIDIRECTIONAL</span>
            <span className="opacity-40">|</span>
            <span className="text-[#8FA382]">REINVESTMENT: 7.5%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Step Selector */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="text-[10px] font-mono-tech tracking-[0.2em] text-[#8FA382] uppercase">
              SELECT JOURNEY STAGE:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {steps.map((s) => (
                <button
                  key={s.step}
                  onClick={() => setJourneyStep(s.step)}
                  className={`p-3 text-left font-mono-tech text-xs tracking-[0.15em] border transition-all ${
                    journeyStep === s.step
                      ? 'border-[#8FA382] bg-[#8FA382] text-[#0A0A08] font-bold'
                      : 'border-[rgba(242,240,235,0.08)] bg-[#080806] text-[#888] hover:text-[#F5F3ED]'
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* Step Details */}
          <div className="lg:col-span-6 p-6 border border-[rgba(242,240,235,0.08)] bg-[#080B07] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[9px] font-mono-tech text-[#8FA382] mb-2">
                <span>LOCUS: {currentStep.location}</span>
                <span>STATUS: VERIFIED</span>
              </div>
              <h4 className="font-display font-light text-lg text-[#F5F3ED] tracking-[0.14em] uppercase mb-3">
                {currentStep.title}
              </h4>
              <p className="font-serif-editorial italic text-xs text-[#BBB] leading-relaxed mb-6">
                {currentStep.action}
              </p>
              <div className="p-3 bg-[#0D140C] border border-[rgba(143,163,130,0.2)] text-[9px] font-mono-tech text-[#8FA382]">
                ATTESTED OUTPUT: {currentStep.output}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[rgba(242,240,235,0.06)] flex items-center justify-between text-[9px] font-mono-tech">
              <span className="text-[#666]">COMMUNITY IMPACT:</span>
              <span className="text-[#C5A059]">FUNDS PERPETUAL CIVIC TRUST</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. What we are doing in Andamooka */}
      <div className="p-8 sm:p-10 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] crosshair-corner">
        <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#8FA382] tracking-[0.25em] uppercase mb-4">
          <span className="w-3 h-[1px] bg-[#8FA382]"></span>
          <span>03 // WHAT ARE WE DOING IN ANDAMOOKA?</span>
        </div>
        <h3 className="font-display font-light text-2xl text-[#F5F3ED] tracking-[0.16em] uppercase mb-3">
          Remote Tourism Infrastructure & Local Marketplace
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
                  <span className="text-[#8FA382] tracking-[0.2em]">INITIATIVE</span>
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
        currentPillarName="TOURISM"
        connections={data.howItConnects.primaryBridges}
        onSelectPillar={onSelectPillar}
      />

      {/* 6. What Becomes Possible Beyond Andamooka */}
      <div className="p-8 sm:p-10 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] crosshair-corner">
        <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#8FA382] tracking-[0.25em] uppercase mb-4">
          <span className="w-3 h-[1px] bg-[#8FA382]"></span>
          <span>05 // WHAT BECOMES POSSIBLE BEYOND ANDAMOOKA?</span>
        </div>
        <h3 className="font-display font-light text-2xl text-[#F5F3ED] tracking-[0.16em] uppercase mb-3">
          Regenerative Global Cultural Tourism
        </h3>
        <p className="font-serif-editorial italic text-base text-[#AAA] mb-8 max-w-3xl">
          {data.whatBecomesPossibleBeyond.vision}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.whatBecomesPossibleBeyond.applications.map((app) => (
            <div key={app.domain} className="p-5 border border-[rgba(242,240,235,0.06)] bg-[#070706]">
              <span className="text-[9px] font-mono-tech text-[#8FA382] tracking-[0.2em] uppercase block mb-2">
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
