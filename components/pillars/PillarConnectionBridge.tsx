import React from 'react';
import { motion } from 'motion/react';
import { PillarConnection } from '../../data/fivePillarsData';
import { ActionTrigger } from '../design-system/ActionTrigger';

interface PillarConnectionBridgeProps {
  currentPillarName: string;
  connections: PillarConnection[];
  onSelectPillar: (pillarId: 'community' | 'opal' | 'town' | 'tourism' | 'heritage') => void;
}

export const PillarConnectionBridge: React.FC<PillarConnectionBridgeProps> = ({
  currentPillarName,
  connections,
  onSelectPillar,
}) => {
  return (
    <div className="p-6 sm:p-8 border border-hairline-gold bg-[#0C0B08] crosshair-corner my-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(197,160,89,0.2)] pb-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
          <span className="text-[10px] font-mono-tech tracking-[0.25em] text-[#C5A059] uppercase">
            ACTIVE RELATIONAL BRIDGES // {currentPillarName} CONNECTIONS
          </span>
        </div>
        <span className="text-[9px] font-mono-tech text-[#8E8A82] tracking-[0.15em] uppercase">
          CLICK ANY BRIDGE TO JUMP DIRECTLY
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {connections.map((conn) => {
          return (
            <motion.div
              key={conn.targetPillarId}
              whileHover={{ y: -2 }}
              className="p-5 border border-[rgba(242,240,235,0.08)] bg-[#070706] hover:border-[#C5A059] transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => onSelectPillar(conn.targetPillarId)}
            >
              <div>
                <div className="flex items-center justify-between font-mono-tech text-[8px] tracking-[0.2em] mb-2">
                  <span className="text-[#C5A059]">
                    {currentPillarName} ➔ {conn.targetPillarName}
                  </span>
                  <span className="px-1.5 py-0.5 border border-[rgba(197,160,89,0.3)] text-[#C5A059]">
                    {conn.relationshipType}
                  </span>
                </div>

                <h4 className="font-display font-light text-base text-[#F5F3ED] tracking-[0.12em] uppercase mb-2 group-hover:text-[#C5A059] transition-colors">
                  {conn.title}
                </h4>

                <p className="font-serif-editorial italic text-xs text-[#999] leading-relaxed mb-4">
                  {conn.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[rgba(242,240,235,0.06)] flex items-center justify-between">
                <span className="text-[8px] font-mono-tech text-[#666] tracking-[0.1em] truncate max-w-[170px]">
                  {conn.evidenceProof}
                </span>
                <span className="text-[10px] font-mono-tech text-[#C5A059] group-hover:translate-x-1 transition-transform">
                  EXPLORE {conn.targetPillarName} →
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
