import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HeritageDimension } from '../../types/heritage';
import { HERITAGE_FIVE_DIMENSIONS } from '../../data/heritageLivingArchiveData';
import { Compass, Layers, Headphones, Users, Coins, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { StatusPip } from '../design-system/StatusPip';

export const FiveDimensionsMatrix: React.FC = () => {
  const [selectedDimensionId, setSelectedDimensionId] = useState<string>('DISCOVERABLE');

  const activeDim = HERITAGE_FIVE_DIMENSIONS.find(d => d.id === selectedDimensionId) || HERITAGE_FIVE_DIMENSIONS[0];

  const getIcon = (name: string, color: string) => {
    switch (name) {
      case 'Compass': return <Compass className="w-5 h-5" style={{ color }} />;
      case 'Layers': return <Layers className="w-5 h-5" style={{ color }} />;
      case 'Headphones': return <Headphones className="w-5 h-5" style={{ color }} />;
      case 'Users': return <Users className="w-5 h-5" style={{ color }} />;
      case 'Coins': return <Coins className="w-5 h-5" style={{ color }} />;
      default: return <Compass className="w-5 h-5" style={{ color }} />;
    }
  };

  return (
    <div className="p-6 sm:p-10 bg-[#080605] border border-[rgba(242,240,235,0.08)] rounded-xl space-y-8 font-mono-tech">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(242,240,235,0.08)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-[#C47D68] tracking-[0.25em] uppercase font-bold mb-2">
            <span>TRANSFORMATIVE PARADIGM // 5 DIMENSIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-light text-[#F5F3ED] uppercase tracking-wide">
            How Heritage is Made <span className="text-[#C47D68] italic font-serif">Living.</span>
          </h2>
        </div>
        <StatusPip status="verified" label="APP SYSTEM PRINCIPLES" />
      </div>

      {/* 5 Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {HERITAGE_FIVE_DIMENSIONS.map((dim) => {
          const isSelected = dim.id === selectedDimensionId;
          return (
            <button
              key={dim.id}
              onClick={() => setSelectedDimensionId(dim.id)}
              className={`p-4 rounded-lg border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-[#C47D68] bg-[rgba(196,125,104,0.15)] text-[#F5F3ED] shadow-[0_0_15px_rgba(196,125,104,0.1)]'
                  : 'border-[rgba(242,240,235,0.06)] bg-[#040303] text-[#777] hover:border-[#888] hover:text-[#CCC]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                {getIcon(dim.iconName, isSelected ? dim.color : '#666')}
                <span className="text-[9px] font-bold" style={{ color: isSelected ? dim.color : '#555' }}>
                  {dim.id.slice(0, 4)}
                </span>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider block truncate">
                {dim.title.split('//')[1].trim()}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Dimension Detail Card */}
      <div className="p-6 sm:p-8 bg-[#0D0907] border border-[rgba(196,125,104,0.3)] rounded-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded bg-[rgba(196,125,104,0.15)] text-[#C47D68]">
              {activeDim.title}
            </span>
            <span className="text-xs text-[#A89F91] font-mono">
              {activeDim.subtitle}
            </span>
          </div>

          <blockquote className="font-serif-editorial italic text-lg sm:text-xl text-[#E8D1CB] leading-relaxed border-l-2 border-[#C47D68] pl-4">
            “{activeDim.corePrinciple}”
          </blockquote>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-[#050404] border border-[rgba(242,240,235,0.06)] rounded space-y-1">
              <span className="text-[9px] text-[#C47D68] uppercase font-bold block">
                DIGITAL RECONSTRUCTION MECHANISM
              </span>
              <p className="text-[#D4CDC5] font-sans leading-relaxed">
                {activeDim.digitalMechanism}
              </p>
            </div>

            <div className="p-4 bg-[#050404] border border-[rgba(242,240,235,0.06)] rounded space-y-1">
              <span className="text-[9px] text-[#8FA382] uppercase font-bold block">
                PHYSICAL HERITAGE IMPACT
              </span>
              <p className="text-[#D4CDC5] font-sans leading-relaxed">
                {activeDim.physicalHeritageImpact}
              </p>
            </div>
          </div>
        </div>

        {/* Right Stats Column */}
        <div className="lg:col-span-4 p-5 bg-[#050404] border border-[rgba(196,125,104,0.2)] rounded-lg space-y-4">
          <div className="text-[10px] text-[#C47D68] uppercase tracking-widest font-bold flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>OPERATIONAL METRICS</span>
          </div>

          <div className="space-y-3">
            {activeDim.stats.map((st, i) => (
              <div key={i} className="p-3 bg-[#090706] border border-[rgba(242,240,235,0.04)] rounded flex items-center justify-between">
                <span className="text-[9px] text-[#888] uppercase">{st.label}</span>
                <span className="text-sm font-bold text-[#F5F3ED] font-mono">{st.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
