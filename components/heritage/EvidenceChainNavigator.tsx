import React from 'react';
import { motion } from 'motion/react';
import { EvidenceType, HeritageLivingArchiveNode } from '../../types/heritage';
import { User, Home, BookOpen, Landmark, MapPin, Clock, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';

interface EvidenceChainNavigatorProps {
  nodes: HeritageLivingArchiveNode[];
  currentNodeIndex: number;
  onSelectNode: (index: number) => void;
  activeEvidenceType: EvidenceType;
  onSelectEvidenceType: (type: EvidenceType) => void;
}

export const EvidenceChainNavigator: React.FC<EvidenceChainNavigatorProps> = ({
  nodes,
  currentNodeIndex,
  onSelectNode,
  activeEvidenceType,
  onSelectEvidenceType,
}) => {
  const currentNode = nodes[currentNodeIndex];

  const steps: { type: EvidenceType; label: string; icon: any; short: string; color: string }[] = [
    { type: 'PERSON', label: '1. Person', icon: User, short: currentNode.person.name.split('&')[0], color: '#C5A059' },
    { type: 'HOME', label: '2. Home', icon: Home, short: currentNode.home.name.split('#')[0], color: '#C47D68' },
    { type: 'STORY', label: '3. Story', icon: BookOpen, short: currentNode.story.title, color: '#E06D53' },
    { type: 'BUILDING', label: '4. Building', icon: Landmark, short: currentNode.building.name, color: '#8FA382' },
    { type: 'TOWN', label: '5. Town', icon: MapPin, short: currentNode.town.name, color: '#5C7D91' },
    { type: 'TIME', label: '6. Time', icon: Clock, short: currentNode.time.epochName.split('//')[0], color: '#A39580' },
  ];

  return (
    <div className="space-y-6 font-mono-tech">
      {/* 1. Heritage Node Profile Switcher (The 4 living lineages) */}
      <div className="p-4 sm:p-6 bg-[#080605] border border-[rgba(242,240,235,0.1)] rounded-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 text-[10px] text-[#C47D68] tracking-[0.25em] uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SELECT LIVING ARCHIVE PATHWAY // 4 CORNERSTONES</span>
          </div>
          <span className="text-[10px] text-[#888] font-mono">
            PATHWAY {currentNodeIndex + 1} OF {nodes.length}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {nodes.map((node, idx) => {
            const isSelected = idx === currentNodeIndex;
            return (
              <button
                key={node.person.id}
                onClick={() => onSelectNode(idx)}
                className={`p-3.5 rounded-lg border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? 'border-[#C47D68] bg-[rgba(196,125,104,0.15)] text-[#F5F3ED] shadow-[0_0_15px_rgba(196,125,104,0.15)]'
                    : 'border-[rgba(242,240,235,0.06)] bg-[#040303] text-[#888] hover:border-[#C47D68] hover:text-[#CCC]'
                }`}
              >
                <div className="flex items-center justify-between text-[9px] mb-1">
                  <span className="font-bold text-[#C47D68]">PATHWAY 0{idx + 1}</span>
                  <span className="text-[#666]">{node.person.era.split(' ')[0]}</span>
                </div>
                <div className="text-xs font-display font-light text-[#F5F3ED] uppercase truncate">
                  {node.person.name}
                </div>
                <div className="text-[10px] text-[#A89F91] truncate mt-0.5 font-sans">
                  {node.person.role}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Step Navigator: PERSON -> HOME -> STORY -> BUILDING -> TOWN -> TIME */}
      <div className="p-3 sm:p-4 bg-[#050404] border border-[rgba(196,125,104,0.25)] rounded-lg">
        <div className="text-[9px] text-[#888] uppercase tracking-widest mb-3 px-1">
          EVIDENCE TRAJECTORY: MOVE THROUGH CONNECTED STRATA
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeEvidenceType === step.type;

            return (
              <button
                key={step.type}
                onClick={() => onSelectEvidenceType(step.type)}
                className={`p-3 rounded border text-left transition-all flex flex-col justify-between ${
                  isActive
                    ? 'border-[#C47D68] bg-[rgba(196,125,104,0.2)] text-[#F5F3ED]'
                    : 'border-[rgba(242,240,235,0.06)] bg-[#090706] text-[#777] hover:border-[#888] hover:text-[#BBB]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C47D68]' : 'text-[#555]'}`} />
                  <span className="text-[9px] font-bold" style={{ color: isActive ? step.color : '#555' }}>
                    0{idx + 1}
                  </span>
                </div>

                <div className="text-xs font-bold uppercase tracking-wider block">
                  {step.type}
                </div>

                <div className="text-[10px] text-[#A89F91] truncate mt-1 font-sans">
                  {step.short}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
