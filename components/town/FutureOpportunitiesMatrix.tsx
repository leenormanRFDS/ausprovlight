import React from 'react';
import { Sparkles, Server, SunMedium, Globe, Home, ArrowUpRight } from 'lucide-react';

export function FutureOpportunitiesMatrix() {
  const opportunities = [
    {
      icon: Server,
      title: 'Subterranean Geothermal Data Vaults',
      tag: 'INFRASTRUCTURE // PUE 1.04',
      description: 'Repurposing exhausted subterranean mining chambers (-18m depth) as ultra-low-energy data centres. Natural 19.5°C thermal stability eliminates 90% of cooling energy, creating zero-carbon planetary archives shielded from solar storms and EMPs.',
      metrics: ['19.5°C Passive Stability', 'PUE 1.04 Rating', '420t CO₂ Saved / yr'],
      accent: '#E5A93C',
    },
    {
      icon: SunMedium,
      title: 'Decentralized Solar & Battery Micro-Grids',
      tag: 'COMMUNITY RESILIENCE',
      description: 'Expanding community-owned 1.2MW solar tracking arrays with distributed battery storage to guarantee 100% clean power independence for town dugouts, water desalination, and electric mining equipment.',
      metrics: ['1.2 MW Tracking Array', '3.4 MWh Storage', '94% Grid Independence'],
      accent: '#5C95D4',
    },
    {
      icon: Globe,
      title: 'XR Remote Tourism & RWA Provenance Portals',
      tag: 'GLOBAL CIVIC ECONOMY',
      description: 'Enabling remote visitors worldwide (e.g. from Berlin, Tokyo, New York) to walk through 3D photogrammetric twins of Andamooka, inspect physical matrix opal specimens, meet miners, and acquire verified real-world assets with civic reinvestment.',
      metrics: ['Centimetric 3D Twins', 'Direct Miner Custody', 'Civic Dividend Engine'],
      accent: '#58B983',
    },
    {
      icon: Home,
      title: 'Dugout Extreme Climate Living Lab',
      tag: 'BIOCLIMATIC RESEARCH',
      description: 'A global research laboratory studying Andamooka’s 90-year vernacular dugout architecture to create scalable passive cooling and underground housing solutions for arid regions facing accelerating global heat waves.',
      metrics: ['Zero Aircon Load', 'University Partnerships', 'Arid Architecture Monograph'],
      accent: '#E06D53',
    },
  ];

  return (
    <div className="w-full bg-[#080808] border border-[rgba(245,243,237,0.1)] rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(245,243,237,0.08)] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-[#E5A93C]" />
            <span className="font-mono text-xs tracking-[0.25em] text-[#E5A93C] uppercase">
              FUTURE HORIZONS // CIVIC & SPATIAL SYSTEMS
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl text-[#F5F3ED] font-light">
            Beyond Andamooka: Unlocking Latent Value
          </h3>
        </div>

        <div className="font-mono text-xs text-[#888] bg-[#121212] px-3 py-1.5 rounded-lg border border-[rgba(245,243,237,0.08)]">
          APPLIED SPATIAL INFRASTRUCTURE
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {opportunities.map((opp) => {
          const Icon = opp.icon;

          return (
            <div
              key={opp.title}
              className="bg-[#0e0e0e] border border-[rgba(245,243,237,0.06)] hover:border-[#C5A059]/40 p-6 rounded-xl flex flex-col justify-between gap-4 transition-all group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${opp.accent}15`, color: opp.accent }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] text-[#777] uppercase tracking-wider">
                    {opp.tag}
                  </span>
                </div>

                <h4 className="font-display text-lg text-[#F5F3ED] font-normal group-hover:text-[#C5A059] transition-colors">
                  {opp.title}
                </h4>

                <p className="font-sans text-xs text-[#999] leading-relaxed">
                  {opp.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-3 border-t border-[rgba(245,243,237,0.04)]">
                {opp.metrics.map((m) => (
                  <span
                    key={m}
                    className="font-mono text-[9px] bg-[#050505] text-[#BBB] px-2 py-1 rounded border border-[rgba(245,243,237,0.04)]"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
