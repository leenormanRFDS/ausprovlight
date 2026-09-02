import React from 'react';
import { SpatialLayerCategory, SpatialLayerConfig } from '../../types/townTwin';
import { 
  Layers, 
  Mountain, 
  Navigation, 
  Home, 
  Pickaxe, 
  Landmark, 
  BookOpen, 
  Zap, 
  Compass, 
  Sparkles,
  Eye,
  EyeOff,
  Sliders,
  Check
} from 'lucide-react';

interface SpatialLayerControlProps {
  layers: SpatialLayerConfig[];
  visibleLayers: Record<SpatialLayerCategory, boolean>;
  onToggleLayer: (layerId: SpatialLayerCategory) => void;
  onSetAllLayers: (visible: boolean) => void;
  subterraneanDepthCut: number;
  onDepthCutChange: (depth: number) => void;
}

export function SpatialLayerControl({
  layers,
  visibleLayers,
  onToggleLayer,
  onSetAllLayers,
  subterraneanDepthCut,
  onDepthCutChange,
}: SpatialLayerControlProps) {
  const getLayerIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mountain':
        return Mountain;
      case 'Navigation':
        return Navigation;
      case 'Home':
        return Home;
      case 'Pickaxe':
        return Pickaxe;
      case 'Landmark':
        return Landmark;
      case 'BookOpen':
        return BookOpen;
      case 'Zap':
        return Zap;
      case 'Compass':
        return Compass;
      case 'Sparkles':
        return Sparkles;
      default:
        return Layers;
    }
  };

  const visibleCount = Object.values(visibleLayers).filter(Boolean).length;

  return (
    <div className="w-full bg-[#080808] border border-[rgba(245,243,237,0.1)] rounded-2xl p-6 flex flex-col gap-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(245,243,237,0.08)] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-[#C5A059]" />
            <span className="font-mono text-xs tracking-[0.25em] text-[#C5A059] uppercase">
              SPATIAL INFORMATION SYSTEM // 9-LAYER STACK
            </span>
          </div>
          <h3 className="font-display text-lg sm:text-xl text-[#F5F3ED] font-light">
            Filter Multidimensional Spatial Layers
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSetAllLayers(true)}
            className="font-mono text-[10px] text-[#C5A059] bg-[#121212] hover:bg-[#202020] px-3 py-1.5 rounded-lg border border-[rgba(245,243,237,0.1)] transition-colors"
          >
            SHOW ALL (9)
          </button>
          <button
            onClick={() => onSetAllLayers(false)}
            className="font-mono text-[10px] text-[#888] bg-[#121212] hover:bg-[#202020] px-3 py-1.5 rounded-lg border border-[rgba(245,243,237,0.1)] transition-colors"
          >
            MUTE ALL
          </button>
        </div>
      </div>

      {/* 9 Layer Grid Toggle Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {layers.map((lyr) => {
          const Icon = getLayerIcon(lyr.iconName);
          const isVisible = !!visibleLayers[lyr.id];

          return (
            <button
              key={lyr.id}
              onClick={() => onToggleLayer(lyr.id)}
              className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                isVisible
                  ? 'bg-[#121212] border-[rgba(245,243,237,0.2)] text-[#F5F3ED] shadow-sm'
                  : 'bg-[#080808] border-[rgba(245,243,237,0.04)] text-[#555] opacity-60 hover:opacity-100'
              }`}
            >
              {/* Checkbox / Pip */}
              <div
                className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors"
                style={{
                  backgroundColor: isVisible ? lyr.color : '#1a1a1a',
                  color: '#050505',
                }}
              >
                {isVisible ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <EyeOff className="w-3 h-3 text-[#444]" />}
              </div>

              {/* Layer Title & Telemetry */}
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-display text-xs tracking-wider uppercase truncate font-medium">
                    {lyr.name}
                  </span>
                  <span className="font-mono text-[8px] text-[#777]">
                    {lyr.entityCount} ENT
                  </span>
                </div>
                <p className="font-sans text-[10px] text-[#888] line-clamp-1 mt-0.5">
                  {lyr.description}
                </p>
                <div className="flex items-center justify-between text-[8px] font-mono text-[#555] mt-1 pt-1 border-t border-[rgba(245,243,237,0.04)]">
                  <span>{lyr.dataSourceFormat.split('_')[0]}</span>
                  <span>{lyr.resolutionTolerance}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Subterranean Geological Slicing Slider */}
      <div className="bg-[#050505] p-5 rounded-xl border border-[rgba(245,243,237,0.06)] flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-[#C5A059]">
            <Sliders className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">SUBTERRANEAN STRATA DEPTH CUT</span>
          </div>
          <span className="text-[#F5F3ED] font-bold">
            DEPTH: -{subterraneanDepthCut.toFixed(1)}m [AHD: {(76.4 - subterraneanDepthCut).toFixed(1)}m]
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="25"
          step="0.5"
          value={subterraneanDepthCut}
          onChange={(e) => onDepthCutChange(parseFloat(e.target.value))}
          className="w-full accent-[#C5A059] bg-[#1a1a1a] h-1.5 rounded cursor-pointer"
        />

        <div className="flex justify-between text-[9px] font-mono text-[#666]">
          <span>Z0 SURFACE (+0.0m)</span>
          <span>Z1 CALCRETE (-3.5m)</span>
          <span>Z2 SANDSTONE (-8.0m)</span>
          <span>Z3 BULLDOG OPAL (-14.2m)</span>
          <span>Z4 BASEMENT (-25.0m)</span>
        </div>
      </div>
    </div>
  );
}
