import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import { SYSTEM_NODES, SystemNodeId } from '../../data/livingNetworkData';

interface WholeSystemNavigatorProps {
  currentPillarId?: SystemNodeId;
  variant?: 'compact' | 'full' | 'floating';
}

export const WholeSystemNavigator: React.FC<WholeSystemNavigatorProps> = ({
  currentPillarId,
  variant = 'full',
}) => {
  const location = useLocation();

  // Detect current pillar based on prop or route
  const getActivePillar = (): SystemNodeId => {
    if (currentPillarId) return currentPillarId;
    const path = location.pathname;
    if (path.includes('/opal')) return 'opal';
    if (path.includes('/town')) return 'town';
    if (path.includes('/tourism') || path.includes('/journey')) return 'tourism';
    if (path.includes('/heritage') || path.includes('/archive')) return 'heritage';
    if (path.includes('pillar=community') || path === '/pillars') return 'community';
    return 'provenance';
  };

  const activePillar = getActivePillar();

  const orderedPillars: Array<{ id: SystemNodeId; num: string; name: string; route: string; causalNote: string }> = [
    { id: 'community', num: '01', name: 'COMMUNITY', route: '/pillars?pillar=community', causalNote: 'Consensus creates standards' },
    { id: 'opal', num: '02', name: 'OPAL', route: '/opal', causalNote: 'Standards create asset identity' },
    { id: 'town', num: '03', name: 'TOWN', route: '/town', causalNote: 'Asset identity anchors place intelligence' },
    { id: 'tourism', num: '04', name: 'TOURISM', route: '/tourism', causalNote: 'Place intelligence enables XR tourism' },
    { id: 'heritage', num: '05', name: 'HERITAGE', route: '/heritage', causalNote: 'Stories feed identity & tourism' },
  ];

  if (variant === 'compact') {
    return (
      <div className="p-3 bg-[#0A0907] border border-[rgba(197,160,89,0.25)] rounded flex flex-wrap items-center justify-between gap-3 text-[9px] font-mono-tech">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
          <span className="text-[#C5A059] font-bold uppercase tracking-[0.2em]">
            SYSTEM CIRCUIT:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {orderedPillars.map((p, idx) => {
            const isCurrent = activePillar === p.id;
            return (
              <React.Fragment key={p.id}>
                <Link
                  to={p.route}
                  className={`px-2 py-0.5 rounded transition-all uppercase ${
                    isCurrent
                      ? 'bg-[#C5A059] text-[#0A0706] font-bold'
                      : 'text-[#888] hover:text-[#FFF] hover:bg-[#1A1812]'
                  }`}
                >
                  {p.name}
                </Link>
                {idx < orderedPillars.length - 1 && (
                  <span className="text-[#C5A059] opacity-60">↔</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 border border-hairline-gold bg-[#0A0907] crosshair-corner my-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(197,160,89,0.2)] pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#C5A059] tracking-[0.25em] uppercase mb-1">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>WHOLE-SYSTEM TRANSIT MATRIX</span>
          </div>
          <h3 className="font-display font-light text-xl sm:text-2xl text-[#F5F3ED] tracking-[0.14em] uppercase">
            Move Through the Living Provenance Loop
          </h3>
        </div>

        <Link
          to="/pillars"
          className="px-3.5 py-1.5 border border-[#C5A059] text-[#C5A059] text-[9px] font-mono-tech uppercase hover:bg-[#C5A059] hover:text-[#0A0706] transition-all rounded self-start sm:self-auto flex items-center gap-1.5"
        >
          <Sparkles className="w-3 h-3" />
          <span>OPEN LIVING NETWORK GRAPH</span>
        </Link>
      </div>

      {/* 5-Step Connected Relay Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {orderedPillars.map((p, idx) => {
          const isCurrent = activePillar === p.id;
          const nodeData = SYSTEM_NODES[p.id];

          return (
            <Link
              key={p.id}
              to={p.route}
              className={`p-4 border transition-all flex flex-col justify-between group relative overflow-hidden ${
                isCurrent
                  ? 'border-[#C5A059] bg-[#17140E] shadow-[0_0_15px_rgba(197,160,89,0.15)]'
                  : 'border-[rgba(242,240,235,0.08)] bg-[#070706] hover:border-[rgba(197,160,89,0.5)] hover:bg-[#11100C]'
              }`}
            >
              {isCurrent && (
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: nodeData.color }}
                />
              )}

              <div>
                <div className="flex items-center justify-between text-[8px] font-mono-tech mb-2">
                  <span style={{ color: isCurrent ? nodeData.color : '#666' }} className="font-bold">
                    0{idx + 1}
                  </span>
                  <span className="text-[#555] group-hover:text-[#AAA]">
                    {isCurrent ? '● CURRENT' : 'TRANSIT →'}
                  </span>
                </div>

                <h4
                  className={`font-display font-light text-base uppercase tracking-[0.12em] mb-1 transition-colors ${
                    isCurrent ? 'text-[#F5F3ED]' : 'text-[#888] group-hover:text-[#EEE]'
                  }`}
                >
                  {p.name}
                </h4>

                <p className="font-serif-editorial italic text-xs text-[#999] leading-tight">
                  {p.causalNote}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-[rgba(242,240,235,0.05)] flex items-center justify-between text-[8px] font-mono-tech">
                <span className="text-[#555] truncate max-w-[100px]">{nodeData.code}</span>
                <span className="text-[#C5A059] group-hover:translate-x-0.5 transition-transform">
                  EXPLORE →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Provenance Central Nexus Bar */}
      <div className="mt-4 p-3 bg-[#060605] border border-[rgba(212,175,55,0.2)] rounded flex flex-col sm:flex-row items-center justify-between gap-3 text-[9px] font-mono-tech text-[#8E8A82]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[#D4AF37] font-bold uppercase">
            CENTRAL CONTINUITY:
          </span>
          <span>
            Every stage records into the unalterable Provenance Ledger at the centre.
          </span>
        </div>
        <span className="text-[#666] tracking-[0.15em] uppercase">
          REGENERATIVE LIVING NETWORK
        </span>
      </div>
    </div>
  );
};
