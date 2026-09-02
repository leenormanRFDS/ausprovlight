import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PARTICIPATION_INITIATIVES } from '../../data/tourismJourneyData';
import { ParticipationInitiative } from '../../types/tourism';
import { 
  Palette, 
  Landmark, 
  Droplets, 
  Store, 
  GraduationCap, 
  Headphones, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  Coins, 
  User, 
  ArrowRight,
  Filter
} from 'lucide-react';

export const ParticipationInitiativesHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeInitiative, setActiveInitiative] = useState<ParticipationInitiative | null>(
    PARTICIPATION_INITIATIVES[0]
  );
  const [backedInitiatives, setBackedInitiatives] = useState<Record<string, number>>({});
  const [pledgeSuccess, setPledgeSuccess] = useState<string | null>(null);

  const categories = [
    { id: 'ALL', label: 'All 7 Initiatives', icon: Sparkles },
    { id: 'LOCAL_ARTISTS', label: 'Local Artists', icon: Palette },
    { id: 'HERITAGE_RESTORATION', label: 'Heritage Restoration', icon: Landmark },
    { id: 'CROWDFUNDING', label: 'Clean Water Bore', icon: Droplets },
    { id: 'LOCAL_BUSINESSES', label: 'Outback Cafe', icon: Store },
    { id: 'COMMUNITY_INITIATIVES', label: 'Youth STEM', icon: GraduationCap },
    { id: 'XR_TOURISM', label: 'XR Tourism', icon: Headphones },
    { id: 'EDUCATIONAL_EXPERIENCES', label: 'Lapidary Archive', icon: BookOpen },
  ];

  const filtered = selectedCategory === 'ALL'
    ? PARTICIPATION_INITIATIVES
    : PARTICIPATION_INITIATIVES.filter((i) => i.category === selectedCategory);

  const handlePledge = (initiativeId: string, amountAUD: number) => {
    setBackedInitiatives((prev) => ({
      ...prev,
      [initiativeId]: (prev[initiativeId] || 0) + amountAUD,
    }));
    setPledgeSuccess(initiativeId);
    setTimeout(() => setPledgeSuccess(null), 3000);
  };

  return (
    <div className="border border-[rgba(242,240,235,0.12)] bg-[#070908] p-6 sm:p-10 crosshair-corner font-mono-tech relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[rgba(242,240,235,0.08)]">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-[#8FA382] tracking-[0.25em] uppercase font-bold">
            <Palette className="w-3.5 h-3.5" />
            <span>ECOSYSTEM DIVERSITY // 7 CHANNELS OF ENGAGEMENT</span>
          </div>
          <h2 className="font-display font-light text-2xl sm:text-3xl text-[#F5F3ED] tracking-wide uppercase mt-1">
            Participation & Regenerative Value Hub
          </h2>
        </div>
        <p className="text-xs text-[#A39580] max-w-md text-right hidden sm:block">
          Explore seven active community initiatives connecting remote international visitors directly to outback creators and projects.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[rgba(242,240,235,0.06)] no-scrollbar">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-2 text-xs rounded border transition-all flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-[rgba(197,160,89,0.15)] border-[#C5A059] text-[#F5F3ED] font-bold'
                  : 'bg-[#0A0D0B] border-[rgba(242,240,235,0.08)] text-[#888] hover:border-[#A39580]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A059]' : 'text-[#666]'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Initiatives */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filtered.map((item) => {
          const extraPledged = backedInitiatives[item.id] || 0;
          const totalFunded = item.currentFundedAUD + extraPledged;
          const pct = Math.min(100, Math.round((totalFunded / item.targetGoalAUD) * 100));

          return (
            <div
              key={item.id}
              onClick={() => setActiveInitiative(item)}
              className={`p-5 rounded-lg border text-left cursor-pointer transition-all flex flex-col justify-between ${
                activeInitiative?.id === item.id
                  ? 'border-[#C5A059] bg-[rgba(197,160,89,0.08)] shadow-[0_0_15px_rgba(197,160,89,0.15)]'
                  : 'border-[rgba(242,240,235,0.08)] bg-[#050605] hover:border-[rgba(242,240,235,0.2)]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[9px] text-[#A39580] mb-2 font-mono">
                  <span className="text-[#C5A059] font-bold uppercase">{item.category.replace(/_/g, ' ')}</span>
                  <span>{item.location}</span>
                </div>

                <h3 className="font-display font-light text-base text-[#F5F3ED] uppercase leading-tight mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-[#A39580] leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>
              </div>

              <div>
                {/* Funding progress bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-[#C8C2B7] font-bold">${totalFunded.toLocaleString()} AUD</span>
                    <span className="text-[#777]">GOAL: ${item.targetGoalAUD.toLocaleString()} ({pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#111] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#C5A059] to-[#8FA382] rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#888] pt-2 border-t border-[rgba(242,240,235,0.06)]">
                  <span>Lead: {item.leadPerson.name}</span>
                  <span className="text-[#C5A059] flex items-center gap-1 font-bold">
                    View Perks & Pledge →
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Initiative Inspector & Pledge Action */}
      {activeInitiative && (
        <div className="p-6 bg-[#0A0D0B] border border-[rgba(197,160,89,0.3)] rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-[10px] text-[#C5A059] uppercase tracking-widest font-bold mb-1">
                <span>ACTIVE PATRONAGE DOSSIER</span>
                <span>•</span>
                <span>{activeInitiative.category.replace(/_/g, ' ')}</span>
              </div>
              <h3 className="font-display font-light text-xl text-[#F5F3ED] uppercase mb-2">
                {activeInitiative.title}
              </h3>
              <p className="text-xs text-[#C8C2B7] leading-relaxed mb-4">
                {activeInitiative.description}
              </p>
              <div className="p-3 bg-[#050505] rounded border border-[rgba(242,240,235,0.06)] text-xs text-[#8FA382] mb-4">
                <span className="text-[#C5A059] font-bold block mb-1">TANGIBLE PLACE OUTCOME:</span>
                {activeInitiative.placeOutcome}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="space-y-3 mb-4">
                <span className="text-[10px] text-[#888] uppercase tracking-widest block">
                  AVAILABLE PATRONAGE PERKS & REWARDS:
                </span>
                {activeInitiative.perks.map((perk, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#050605] border border-[rgba(242,240,235,0.08)] rounded flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#F5F3ED]">{perk.title}</div>
                      <div className="text-[10px] text-[#A39580] mt-0.5">{perk.deliverable}</div>
                    </div>
                    <button
                      onClick={() => handlePledge(activeInitiative.id, perk.minContributionAUD)}
                      className="py-1.5 px-3 rounded bg-[#C5A059] hover:bg-[#D4B06A] text-[#050505] font-mono text-xs font-bold whitespace-nowrap transition-all"
                    >
                      Pledge ${perk.minContributionAUD} AUD
                    </button>
                  </div>
                ))}
              </div>

              {pledgeSuccess === activeInitiative.id && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-[rgba(143,163,130,0.2)] border border-[#8FA382] text-[#8FA382] rounded text-xs text-center font-bold"
                >
                  ✓ THANK YOU! CONTRIBUTION RECORDED IN CIVIC REGISTRY
                </motion.div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
