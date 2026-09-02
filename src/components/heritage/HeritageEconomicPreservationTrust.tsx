import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Coins, ShieldCheck, Hammer, CheckCircle2, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { StatusPip } from '../design-system/StatusPip';

export const HeritageEconomicPreservationTrust: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number>(0);
  const [simulatedDonation, setSimulatedDonation] = useState<number>(50);
  const [hasContributed, setHasContributed] = useState(false);

  const projects = [
    {
      id: 'PROJ_01',
      title: 'Historic Dugout #14 Roof & Calcrete Anchor',
      location: 'Opal Creek Central',
      budgetGoal: 35000,
      raised: 32200,
      impact: 'Installing micro-stainless steel anchor pins into fractured calcrete overhang to prevent collapse while retaining 1948 pick marks.',
      status: '92% FUNDED',
      urgent: false,
    },
    {
      id: 'PROJ_02',
      title: '1961 Underground Classroom Desiccation Repair',
      location: 'School Road Heritage Precinct',
      budgetGoal: 52000,
      raised: 33280,
      impact: 'Restoring lime-washed sandstone walls, repairing the original blackboard, and establishing air filtration for educational visits.',
      status: '64% FUNDED',
      urgent: true,
    },
    {
      id: 'PROJ_03',
      title: 'German Gully 1930 First Discovery Shelter Diversion',
      location: 'German Gully Basin',
      budgetGoal: 45000,
      raised: 35100,
      impact: 'Constructing hand-laid dry stone storm-water diversion channels to protect the fragile clay shelter from flash flood erosion.',
      status: '78% FUNDED',
      urgent: false,
    },
    {
      id: 'PROJ_04',
      title: 'Youth Subterranean Stonemasonry Apprenticeship Fund',
      location: 'Community-wide Fellowship',
      budgetGoal: 30000,
      raised: 24500,
      impact: 'Funding 4 local youth apprenticeships under master stonemasons to keep the traditional art of hand-excavating and stabilizing dugouts alive.',
      status: '81% FUNDED',
      urgent: false,
    }
  ];

  const current = projects[selectedProject];

  const handleContribute = () => {
    setHasContributed(true);
    setTimeout(() => setHasContributed(false), 3000);
  };

  return (
    <div className="p-6 sm:p-10 bg-[#080605] border border-[rgba(242,240,235,0.08)] rounded-xl space-y-8 font-mono-tech">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(242,240,235,0.08)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-[#C47D68] tracking-[0.25em] uppercase font-bold mb-2">
            <span>ECONOMIC REGENERATION // PRESERVATION TRUST</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-light text-[#F5F3ED] uppercase tracking-wide">
            Economically <span className="text-[#C47D68] italic font-serif">Useful Heritage.</span>
          </h2>
        </div>
        <StatusPip status="verified" label="TRUST FUND ACTIVE" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Projects List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-[10px] text-[#888] uppercase tracking-widest px-1">
            ACTIVE PHYSICAL RESTORATION CAMPAIGNS
          </div>

          <div className="space-y-3">
            {projects.map((proj, idx) => {
              const isSelected = idx === selectedProject;
              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProject(idx)}
                  className={`w-full p-5 rounded-lg border text-left transition-all space-y-3 ${
                    isSelected
                      ? 'border-[#C47D68] bg-[rgba(196,125,104,0.12)] text-[#F5F3ED]'
                      : 'border-[rgba(242,240,235,0.06)] bg-[#0A0706] text-[#888] hover:border-[#888] hover:text-[#CCC]'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#F5F3ED]">{proj.title}</span>
                      {proj.urgent && (
                        <span className="text-[8px] px-1.5 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 rounded font-bold uppercase">
                          PRIORITY
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#C47D68] font-bold font-mono">{proj.status}</span>
                  </div>

                  <p className="text-xs text-[#A89F91] font-sans leading-relaxed">
                    {proj.impact}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-[#888] pt-2 border-t border-[rgba(242,240,235,0.04)]">
                    <span>LOCATION: {proj.location}</span>
                    <span className="text-[#F5F3ED] font-mono">
                      ${proj.raised.toLocaleString()} / ${proj.budgetGoal.toLocaleString()} AUD
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Interactive Contribution Simulator */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-[#0D0907] border border-[rgba(196,125,104,0.3)] rounded-lg space-y-5">
            <div className="flex items-center justify-between border-b border-[rgba(242,240,235,0.08)] pb-3">
              <span className="text-[10px] text-[#C47D68] uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5" />
                <span>SUPPORT PHYSICAL PRESERVATION</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">100% TO TRUST</span>
            </div>

            <div>
              <div className="text-xs text-[#888] mb-1">TARGET CAMPAIGN:</div>
              <div className="text-sm font-bold text-[#F5F3ED] font-display uppercase">{current.title}</div>
            </div>

            {hasContributed ? (
              <div className="p-6 bg-[#08110A] border border-emerald-800 rounded text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-xs font-bold text-[#F5F3ED] uppercase">
                  ${simulatedDonation} AUD Allocated to {current.title}
                </div>
                <p className="text-[10px] text-[#8FA382] font-sans">
                  Your contribution is recorded on the public provenance ledger and directly purchases restoration materials.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#888]">SELECT CONTRIBUTION:</span>
                    <span className="text-[#C47D68] font-bold">${simulatedDonation} AUD</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    {[25, 50, 100, 250].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setSimulatedDonation(amt)}
                        className={`py-2 rounded border font-mono font-bold transition-all ${
                          simulatedDonation === amt
                            ? 'border-[#C47D68] bg-[#C47D68] text-[#0A0706]'
                            : 'border-[rgba(242,240,235,0.1)] bg-[#050404] text-[#888] hover:text-[#FFF]'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-[#050404] border border-[rgba(242,240,235,0.06)] rounded text-[10px] text-[#888] space-y-1">
                  <span className="text-[#8FA382] block font-bold uppercase">PHYSICAL IMPACT:</span>
                  ${simulatedDonation} AUD directly purchases {Math.round(simulatedDonation / 12)} stainless steel calcrete anchoring pins or 4 hours of apprentice mason mentoring.
                </div>

                <button
                  onClick={handleContribute}
                  className="w-full py-3 bg-[#C47D68] text-[#0A0706] font-bold text-xs hover:bg-[#D9917D] rounded flex items-center justify-center gap-2 transition-all uppercase"
                >
                  <Heart className="w-4 h-4" />
                  <span>ALLOCATE TO PRESERVATION TRUST</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
