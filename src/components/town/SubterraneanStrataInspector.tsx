import React, { useState } from 'react';
import { SubterraneanHorizon } from '../../types/townTwin';
import { Layers, Thermometer, Droplets, Pickaxe, Shield, ChevronRight } from 'lucide-react';

interface SubterraneanStrataInspectorProps {
  horizons: SubterraneanHorizon[];
  activeDepthCut: number;
  onSelectDepth: (depth: number) => void;
}

export function SubterraneanStrataInspector({
  horizons,
  activeDepthCut,
  onSelectDepth,
}: SubterraneanStrataInspectorProps) {
  const [selectedHorizonCode, setSelectedHorizonCode] = useState<string>(horizons[3]?.code || horizons[0].code);

  const activeHorizon = horizons.find((h) => h.code === selectedHorizonCode) || horizons[0];

  return (
    <div className="w-full bg-[#080808] border border-[rgba(245,243,237,0.1)] rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(245,243,237,0.08)] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-[#C5A059]" />
            <span className="font-mono text-xs tracking-[0.25em] text-[#C5A059] uppercase">
              GEOLOGICAL STRATIGRAPHY & SUB-SURFACE PROFILE
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl text-[#F5F3ED] font-light">
            Subterranean Horizons (Z0 to Z-25m)
          </h3>
        </div>

        <div className="font-mono text-xs text-[#888] bg-[#121212] px-3 py-1.5 rounded-lg border border-[rgba(245,243,237,0.08)]">
          CRETACEOUS EROMANGA BASIN HORIZONS
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Interactive Vertical Strata Column */}
        <div className="lg:col-span-5 flex flex-col gap-2 bg-[#050505] p-3 rounded-xl border border-[rgba(245,243,237,0.06)]">
          <span className="font-mono text-[9px] text-[#666] uppercase tracking-widest px-2 py-1">
            VERTICAL GEOLOGICAL DRILL COLUMN (CLICK TO ISOLATE)
          </span>

          {horizons.map((h) => {
            const isSelected = h.code === selectedHorizonCode;
            const heightPx = Math.max(50, (h.depthEndM - h.depthStartM) * 12);

            return (
              <button
                key={h.code}
                onClick={() => {
                  setSelectedHorizonCode(h.code);
                  onSelectDepth((h.depthStartM + h.depthEndM) / 2);
                }}
                style={{
                  minHeight: `${heightPx}px`,
                  borderLeftColor: h.color,
                }}
                className={`w-full text-left p-3.5 rounded-lg border-l-4 border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#181818] border-r border-t border-b border-[rgba(245,243,237,0.3)] shadow-lg'
                    : 'bg-[#0c0c0c] border-transparent opacity-70 hover:opacity-100 hover:bg-[#121212]'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-[#F5F3ED]">{h.code}</span>
                  <span className="text-[#C5A059]">
                    -{h.depthStartM.toFixed(1)}m to -{h.depthEndM.toFixed(1)}m
                  </span>
                </div>
                <span className="font-sans text-xs text-[#CCC] line-clamp-1 font-medium mt-1">
                  {h.name}
                </span>
                <div className="flex items-center justify-between text-[9px] font-mono text-[#666] mt-1">
                  <span>{h.opalProductivity.replace(/_/g, ' ')}</span>
                  {isSelected && <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Active Horizon Dossier */}
        <div className="lg:col-span-7 bg-[#0e0e0e] border border-[rgba(245,243,237,0.08)] p-6 rounded-xl flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(245,243,237,0.06)] pb-3">
            <span className="font-mono text-xs text-[#C5A059] font-bold">
              HORIZON: {activeHorizon.code}
            </span>
            <span className="font-mono text-xs bg-[#1a1a1a] text-[#BBB] px-2.5 py-0.5 rounded">
              DEPTH: -{activeHorizon.depthStartM}m to -{activeHorizon.depthEndM}m
            </span>
          </div>

          <h4 className="font-display text-xl text-[#F5F3ED] font-normal">
            {activeHorizon.name}
          </h4>

          <p className="font-sans text-sm text-[#D4D0C5] leading-relaxed">
            {activeHorizon.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 font-mono text-xs">
            <div className="bg-[#080808] p-3.5 rounded-lg border border-[rgba(245,243,237,0.04)] flex flex-col gap-1">
              <span className="text-[9px] text-[#777] uppercase flex items-center gap-1.5">
                <Thermometer className="w-3 h-3 text-[#C5A059]" />
                THERMAL STABILITY
              </span>
              <span className="text-[#EAE6DF] font-medium">{activeHorizon.thermalConstantC}</span>
            </div>

            <div className="bg-[#080808] p-3.5 rounded-lg border border-[rgba(245,243,237,0.04)] flex flex-col gap-1">
              <span className="text-[9px] text-[#777] uppercase flex items-center gap-1.5">
                <Droplets className="w-3 h-3 text-[#58B983]" />
                HYDROLOGY
              </span>
              <span className="text-[#EAE6DF] font-medium">{activeHorizon.hydraulicConductivity}</span>
            </div>

            <div className="bg-[#080808] p-3.5 rounded-lg border border-[rgba(245,243,237,0.04)] flex flex-col gap-1 sm:col-span-2">
              <span className="text-[9px] text-[#777] uppercase flex items-center gap-1.5">
                <Pickaxe className="w-3 h-3 text-[#E06D53]" />
                OPAL OCCURRENCE & LITHOLOGY
              </span>
              <span className="text-[#EAE6DF] font-medium">{activeHorizon.lithology}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
