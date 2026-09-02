import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, MapPin, Gem, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TriadItem {
  id: 'PEOPLE' | 'PLACE' | 'ASSET';
  title: string;
  tagline: string;
  locus: string;
  depthSummary: string;
  icon: React.ComponentType<{ className?: string }>;
  evidence: string;
  stat: string;
  statLabel: string;
  actionLink: string;
  actionText: string;
}

const TRIAD_DATA: TriadItem[] = [
  {
    id: 'PEOPLE',
    title: 'The People & Sovereign Consensus',
    tagline: 'Miners, lapidaries, and Traditional Custodians define value co-operatively.',
    locus: 'Kokatha Country & Frontier Miners',
    depthSummary:
      'Rather than an external monopoly imposing arbitrary pricing, Andamooka miners and Kokatha custodians co-created the AOSA-2024 grading standard. Living oral histories, mining shaft permits, and cutting techniques are recorded immutably at origin.',
    icon: Users,
    evidence: '460 active community participants across 14 mining claims and lapidary guilds.',
    stat: '100%',
    statLabel: 'COMMUNITY CONSENSUS',
    actionLink: '/pillars?pillar=community',
    actionText: 'EXPLORE COMMUNITY STANDARD',
  },
  {
    id: 'PLACE',
    title: 'The Place & Subterranean Landscape',
    tagline: 'A town carved into ancient sandstone hillsides to withstand 50°C summer heat.',
    locus: 'Stuart Range (30°27\' S, 137°09\' E)',
    depthSummary:
      'Andamooka is one of the world\'s most remarkable vernacular settlements. Centimeter-accurate aerial LiDAR and underground dugout point clouds map every shaft, pioneer cottage, and geological horizon from surface calcrete to deep opal level.',
    icon: MapPin,
    evidence: '12.4M LiDAR spatial points + subterranean heritage coordinates.',
    stat: '12.4M',
    statLabel: 'LiDAR POINT CLOUD',
    actionLink: '/town',
    actionText: 'EXPLORE SPATIAL TWIN',
  },
  {
    id: 'ASSET',
    title: 'The Asset & 115M Year Origin',
    tagline: 'Matrix opal: Ancient Cretaceous marine fossils transformed into precious silica.',
    locus: 'Bulldog Shale // Cretaceous Seabed',
    depthSummary:
      'Formed 115 million years ago in ancient seabed mudstone. Handheld micro-XRF spectrometry and 20µm structured-light photogrammetry capture the unique elemental and optical fingerprint of each stone directly at the shaft mouth.',
    icon: Gem,
    evidence: 'Trace element ratios (Fe, Zr, Ti, SiO₂) establish permanent chemical DNA.',
    stat: '115 Ma',
    statLabel: 'GEOLOGICAL AGE',
    actionLink: '/opal',
    actionText: 'INSPECT MATRIX SPECIMEN',
  },
];

export const ProvenanceThread: React.FC = () => {
  const [selectedId, setSelectedId] = useState<'PEOPLE' | 'PLACE' | 'ASSET'>('ASSET');
  const activeItem = TRIAD_DATA.find((item) => item.id === selectedId) || TRIAD_DATA[0];

  return (
    <section id="provenance-triad" className="py-24 border-b border-[rgba(242,240,235,0.06)]">
      {/* Unboxed Monumental Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-[9px] font-mono-tech tracking-[0.25em] text-[#C5A059] uppercase mb-3">
            <Sparkles className="w-3 h-3 text-[#C5A059]" />
            <span>01 // THE RELATIONAL NEXUS</span>
          </div>
          <h2 className="font-display font-light text-3xl sm:text-5xl text-[#F5F3ED] tracking-[0.12em] uppercase leading-tight">
            Provenance Is The Living Thread.
          </h2>
        </div>
        <p className="font-serif-editorial italic text-base sm:text-lg text-[#A39E93] max-w-md leading-relaxed">
          Relationships create provenance. Provenance reveals hidden value. APP builds the infrastructure that makes this connection immutable and discoverable.
        </p>
      </div>

      {/* Sleek Triad Selector Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {TRIAD_DATA.map((item, idx) => {
          const isSelected = item.id === selectedId;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`p-6 text-left border transition-all duration-300 relative group overflow-hidden ${
                isSelected
                  ? 'border-[#C5A059] bg-[#14120D] text-[#F5F3ED] shadow-[0_0_30px_rgba(197,160,89,0.12)]'
                  : 'border-[rgba(242,240,235,0.06)] bg-[#0A0907] text-[#777] hover:border-[rgba(197,160,89,0.4)] hover:text-[#D4D0C8]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C5A059]" />
              )}

              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded ${isSelected ? 'bg-[#C5A059]/20 text-[#C5A059]' : 'bg-[#151410] text-[#666]'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-mono-tech text-[8px] tracking-[0.2em] uppercase text-[#666]">
                  0{idx + 1} // NODE
                </span>
              </div>

              <h3 className="font-display font-light text-xl tracking-[0.14em] uppercase mb-1">
                {item.id}
              </h3>
              <p className="font-serif-editorial italic text-xs text-[#999] line-clamp-2 leading-relaxed">
                {item.tagline}
              </p>
            </button>
          );
        })}
      </div>

      {/* Dynamic Master Showcase for Selected Triad Element */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="p-8 sm:p-12 bg-gradient-to-b from-[#0E0D09] to-[#070605] border border-[rgba(197,160,89,0.2)] rounded"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3 text-[9px] font-mono-tech tracking-[0.2em] text-[#C5A059] uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>VERIFIED RELATIONAL NODE // {activeItem.locus}</span>
              </div>

              <h3 className="font-display font-light text-2xl sm:text-4xl text-[#F5F3ED] tracking-[0.12em] uppercase leading-snug">
                {activeItem.title}
              </h3>

              <p className="font-serif-editorial text-base sm:text-lg text-[#C7C2B5] leading-relaxed">
                {activeItem.depthSummary}
              </p>

              {/* Concrete Physical Evidence Line */}
              <div className="p-4 bg-[#070605] border-l-2 border-[#C5A059] font-mono-tech text-[10px] text-[#A0A0A0] leading-relaxed">
                <span className="text-[#C5A059] font-bold block uppercase tracking-wider mb-1">
                  EVIDENCE ATTESTATION:
                </span>
                {activeItem.evidence}
              </div>
            </div>

            {/* Right Large Typographic Stat & Direct Action */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between space-y-6 lg:border-l lg:border-[rgba(242,240,235,0.08)] lg:pl-8">
              <div className="text-left lg:text-right">
                <span className="font-display font-extralight text-5xl sm:text-6xl text-[#C5A059] block tracking-tight">
                  {activeItem.stat}
                </span>
                <span className="font-mono-tech text-[9px] text-[#888] tracking-[0.25em] uppercase">
                  {activeItem.statLabel}
                </span>
              </div>

              <Link
                to={activeItem.actionLink}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#17150E] border border-[#C5A059] hover:bg-[#C5A059] text-[#C5A059] hover:text-[#070605] font-mono-tech text-[10px] font-bold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 rounded"
              >
                <span>{activeItem.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
