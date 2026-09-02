import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { FIVE_PILLARS_DATA } from '../../data/fivePillarsData';
import { PillarCommunity } from './PillarCommunity';
import { PillarOpal } from './PillarOpal';
import { PillarTown } from './PillarTown';
import { PillarTourism } from './PillarTourism';
import { PillarHeritage } from './PillarHeritage';
import { ProvenanceBadge } from '../design-system/ProvenanceBadge';
import { LivingSystemNetwork } from '../network/LivingSystemNetwork';
import { Sparkles, Layers, Activity } from 'lucide-react';
import { SystemNodeId } from '../../data/livingNetworkData';

type PillarKey = 'community' | 'opal' | 'town' | 'tourism' | 'heritage';

interface PillarsOrganismHubProps {
  initialPillar?: PillarKey;
}

export const PillarsOrganismHub: React.FC<PillarsOrganismHubProps> = ({
  initialPillar = 'community',
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pillarParam = searchParams.get('pillar') as PillarKey | null;
  const viewParam = searchParams.get('view') as 'network' | 'monograph' | null;

  const [viewMode, setViewMode] = useState<'network' | 'monograph'>(
    viewParam === 'monograph' ? 'monograph' : 'network'
  );
  const [selectedPillar, setSelectedPillar] = useState<PillarKey>(
    pillarParam || initialPillar
  );

  useEffect(() => {
    if (pillarParam && ['community', 'opal', 'town', 'tourism', 'heritage'].includes(pillarParam)) {
      setSelectedPillar(pillarParam);
    }
  }, [pillarParam]);

  const handlePillarSelect = (id: PillarKey) => {
    setSelectedPillar(id);
    setViewMode('monograph');
    setSearchParams({ pillar: id, view: 'monograph' });
  };

  const handleNetworkSelect = (nodeId: SystemNodeId) => {
    if (nodeId === 'provenance') return;
    setSelectedPillar(nodeId as PillarKey);
  };

  const pillarsList: Array<{ id: PillarKey; num: string; name: string; color: string; personality: string; causalNote: string }> = [
    { id: 'community', num: '01', name: 'COMMUNITY', color: '#C5A059', personality: 'Human & Participatory', causalNote: 'Consensus creates standards' },
    { id: 'opal', num: '02', name: 'OPAL', color: '#5C7D91', personality: 'Scientific & Geological', causalNote: 'Standards create asset identity' },
    { id: 'town', num: '03', name: 'TOWN', color: '#A39580', personality: 'Spatial & Geographic', causalNote: 'Asset identity anchors place intelligence' },
    { id: 'tourism', num: '04', name: 'TOURISM', color: '#8FA382', personality: 'Immersive & Expansive', causalNote: 'Place intelligence enables XR tourism' },
    { id: 'heritage', num: '05', name: 'HERITAGE', color: '#C47D68', personality: 'Archival & Historical', causalNote: 'Stories feed identity & tourism' },
  ];

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Central Living Organism Relational Selector Header */}
      <div className="p-6 sm:p-8 border border-hairline-gold bg-[#0A0907] crosshair-corner">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[rgba(197,160,89,0.2)] pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#C5A059] tracking-[0.25em] uppercase mb-2">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>LIVING FIVE-PILLAR SYSTEM ARCHITECTURE</span>
            </div>
            <h2 className="font-display font-light text-2xl sm:text-3xl text-[#F5F3ED] tracking-[0.14em] uppercase">
              The Provenance Organism
            </h2>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setViewMode('network');
                setSearchParams({ view: 'network' });
              }}
              className={`px-4 py-2 text-[9px] font-mono-tech tracking-[0.2em] uppercase border transition-all flex items-center gap-2 ${
                viewMode === 'network'
                  ? 'border-[#C5A059] bg-[#17140E] text-[#F5F3ED] font-bold shadow-[0_0_15px_rgba(197,160,89,0.15)]'
                  : 'border-[rgba(242,240,235,0.08)] bg-[#070706] text-[#777] hover:text-[#CCC]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>LIVING NETWORK</span>
            </button>

            <button
              onClick={() => {
                setViewMode('monograph');
                setSearchParams({ pillar: selectedPillar, view: 'monograph' });
              }}
              className={`px-4 py-2 text-[9px] font-mono-tech tracking-[0.2em] uppercase border transition-all flex items-center gap-2 ${
                viewMode === 'monograph'
                  ? 'border-[#C5A059] bg-[#17140E] text-[#F5F3ED] font-bold shadow-[0_0_15px_rgba(197,160,89,0.15)]'
                : 'border-[rgba(242,240,235,0.08)] bg-[#070706] text-[#777] hover:text-[#CCC]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#A39580]" />
              <span>PILLAR MONOGRAPHS</span>
            </button>
          </div>
        </div>

        {/* 5 Distinct Pillar Quick Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {pillarsList.map((p) => {
            const isSelected = viewMode === 'monograph' && selectedPillar === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handlePillarSelect(p.id)}
                className={`p-4 text-left border transition-all flex flex-col justify-between group relative overflow-hidden ${
                  isSelected
                    ? 'border-[#C5A059] bg-[#14120C] shadow-sm'
                    : 'border-[rgba(242,240,235,0.08)] bg-[#070706] hover:border-[rgba(242,240,235,0.2)]'
                }`}
              >
                {isSelected && (
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: p.color }}
                  />
                )}
                <div className="flex items-center justify-between text-[9px] font-mono-tech mb-3">
                  <span style={{ color: isSelected ? p.color : '#666' }} className="font-bold">
                    {p.num}
                  </span>
                  <span className="text-[8px] tracking-[0.15em] text-[#666] uppercase">
                    {isSelected ? 'ACTIVE' : 'INSPECT'}
                  </span>
                </div>
                <div>
                  <h3
                    className={`font-display font-light text-base tracking-[0.14em] uppercase mb-1 transition-colors ${
                      isSelected ? 'text-[#F5F3ED]' : 'text-[#888] group-hover:text-[#CCC]'
                    }`}
                  >
                    {p.name}
                  </h3>
                  <span className="text-[8px] font-mono-tech text-[#666] tracking-[0.1em] block">
                    {p.personality}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area: Network Graph vs Monograph */}
      {viewMode === 'network' ? (
        <div className="flex flex-col gap-6">
          <LivingSystemNetwork
            initialSelectedNode={selectedPillar}
            onSelectNode={handleNetworkSelect}
            showFullControls={true}
          />
        </div>
      ) : (
        /* Render the Selected Pillar with distinct personality */
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPillar}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {selectedPillar === 'community' && (
              <PillarCommunity onSelectPillar={(id) => handlePillarSelect(id)} />
            )}
            {selectedPillar === 'opal' && (
              <PillarOpal onSelectPillar={(id) => handlePillarSelect(id)} />
            )}
            {selectedPillar === 'town' && (
              <PillarTown onSelectPillar={(id) => handlePillarSelect(id)} />
            )}
            {selectedPillar === 'tourism' && (
              <PillarTourism onSelectPillar={(id) => handlePillarSelect(id)} />
            )}
            {selectedPillar === 'heritage' && (
              <PillarHeritage onSelectPillar={(id) => handlePillarSelect(id)} />
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
