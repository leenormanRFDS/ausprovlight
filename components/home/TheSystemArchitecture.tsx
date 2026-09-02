import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, RefreshCw, Layers, ShieldCheck, Database, Cpu, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ArchitectureStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  technicalMetric: string;
  tag: string;
}

const FLYWHEEL_PIPELINE: ArchitectureStep[] = [
  {
    step: '01',
    title: 'Miner-Side Capture',
    subtitle: 'Micro-XRF & 20µm Photogrammetry',
    description: 'Portable spectrometry and 3D surface scanning conducted directly at the shaft mouth before a stone leaves miner custody.',
    technicalMetric: 'Trace Elemental DNA (SiO₂, Fe, Zr, Ti)',
    tag: 'ORIGIN ATTESTATION',
  },
  {
    step: '02',
    title: 'Community Consensus',
    subtitle: 'AOSA-2024 Valuation Standard',
    description: 'Miners and custodians validate grading tiers collaboratively without intermediary markups or artificial monopoly price fixing.',
    technicalMetric: '5-Tier Co-Grading Registry',
    tag: 'SOVEREIGN STANDARD',
  },
  {
    step: '03',
    title: 'Spatial Twin Integration',
    subtitle: 'Town & Subterranean LiDAR',
    description: 'Specimen is permanently georeferenced to its exact extraction stope within the 12.4M point spatial model of Andamooka.',
    technicalMetric: 'Centimeter Precision Locus',
    tag: 'SPATIAL CONTINUITY',
  },
  {
    step: '04',
    title: 'Global RWA & Civic Return',
    subtitle: '8.5% Town Trust Remittance',
    description: 'Remote collectors acquire verified real-world physical specimens with automated royalty distributions to town infrastructure.',
    technicalMetric: 'Civic Multiplier Dividend',
    tag: 'ECONOMIC REGENERATION',
  },
];

export const TheSystemArchitecture: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = FLYWHEEL_PIPELINE[activeStepIndex];

  return (
    <section id="system-architecture" className="py-24 border-b border-[rgba(242,240,235,0.06)]">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 text-[9px] font-mono-tech tracking-[0.25em] text-[#C5A059] uppercase mb-3">
            <Cpu className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>04 // THE UNDERLYING ENGINE</span>
          </div>
          <h2 className="font-display font-light text-3xl sm:text-5xl text-[#F5F3ED] tracking-[0.12em] uppercase leading-tight">
            The Provenance Architecture.
          </h2>
        </div>
        <p className="font-serif-editorial italic text-base sm:text-lg text-[#A39E93] max-w-md leading-relaxed">
          Technology is not the product. Trust, identity, and verified human stories are the user-facing realities.
        </p>
      </div>

      {/* 4-Step Interactive Pipeline Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {FLYWHEEL_PIPELINE.map((item, idx) => {
          const isSelected = idx === activeStepIndex;
          return (
            <button
              key={item.step}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-6 text-left border transition-all duration-300 relative group overflow-hidden ${
                isSelected
                  ? 'border-[#C5A059] bg-[#15130D] text-[#F5F3ED] shadow-[0_0_24px_rgba(197,160,89,0.12)]'
                  : 'border-[rgba(242,240,235,0.06)] bg-[#0A0907] text-[#777] hover:border-[rgba(197,160,89,0.3)] hover:text-[#CCC]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C5A059]" />
              )}
              <div className="flex items-center justify-between text-[8px] font-mono-tech mb-3">
                <span className={isSelected ? 'text-[#C5A059]' : 'text-[#666]'}>
                  STAGE {item.step}
                </span>
                <span className="text-[#888]">{item.tag}</span>
              </div>
              <h3 className="font-display font-light text-lg tracking-[0.1em] uppercase mb-1">
                {item.title}
              </h3>
              <p className="font-serif-editorial italic text-xs text-[#999] leading-snug">
                {item.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail Canvas */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep.step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="p-8 sm:p-12 bg-gradient-to-b from-[#0F0E0A] to-[#070605] border border-[rgba(197,160,89,0.2)] rounded"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#C5A059] tracking-[0.2em] uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>PHASE {activeStep.step} // {activeStep.tag}</span>
              </div>
              <h3 className="font-display font-light text-2xl sm:text-4xl text-[#F5F3ED] tracking-[0.1em] uppercase">
                {activeStep.title}
              </h3>
              <p className="font-serif-editorial text-base sm:text-lg text-[#C7C2B5] leading-relaxed">
                {activeStep.description}
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end justify-between gap-4 p-6 bg-[#060604] border border-[rgba(242,240,235,0.06)] rounded min-w-[280px]">
              <span className="text-[8px] font-mono-tech text-[#888] uppercase tracking-wider">
                CORE TECHNICAL OUTPUT
              </span>
              <span className="font-mono-tech text-xs sm:text-sm text-[#C5A059] font-bold">
                {activeStep.technicalMetric}
              </span>
              <Link
                to="/pillars"
                className="mt-2 text-[9px] font-mono-tech text-[#F5F3ED] hover:text-[#C5A059] uppercase tracking-widest flex items-center gap-1.5 transition-colors"
              >
                <span>VIEW SYSTEM MESH</span>
                <ArrowRight className="w-3 h-3 text-[#C5A059]" />
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
