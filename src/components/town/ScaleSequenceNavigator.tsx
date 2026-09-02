import React from 'react';
import { SpatialScaleDefinition, SpatialScaleId } from '../../types/townTwin';
import { 
  ChevronRight, 
  ChevronLeft, 
  Globe2, 
  Compass, 
  MapPin, 
  Building2, 
  Footprints, 
  Home, 
  Pickaxe, 
  Sparkles, 
  BookOpen,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ScaleSequenceNavigatorProps {
  scales: SpatialScaleDefinition[];
  activeScaleId: SpatialScaleId;
  onSelectScale: (scaleId: SpatialScaleId) => void;
}

export function ScaleSequenceNavigator({
  scales,
  activeScaleId,
  onSelectScale,
}: ScaleSequenceNavigatorProps) {
  const currentIndex = scales.findIndex((s) => s.id === activeScaleId);
  const activeScale = scales[currentIndex] || scales[0];

  const getScaleIcon = (scaleId: SpatialScaleId) => {
    switch (scaleId) {
      case 'AUSTRALIA':
        return Globe2;
      case 'SOUTH_AUSTRALIA':
        return Compass;
      case 'ANDAMOOKA_REGION':
        return MapPin;
      case 'TOWN_SETTLEMENT':
        return Building2;
      case 'STREET_ARTERY':
        return Footprints;
      case 'BUILDING_DUGOUT':
        return Home;
      case 'MINE_FIELD':
        return Pickaxe;
      case 'ASSET_SPECIMEN':
        return Sparkles;
      case 'STORY_PROVENANCE':
        return BookOpen;
      default:
        return Layers;
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectScale(scales[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < scales.length - 1) {
      onSelectScale(scales[currentIndex + 1].id);
    }
  };

  return (
    <div className="w-full bg-[#080808] border border-[rgba(245,243,237,0.1)] rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
      {/* Top Header & Telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(245,243,237,0.08)] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs tracking-[0.25em] text-[#C5A059] uppercase">
              THE 9-SCALE SPATIAL DESCENT PROTOCOL
            </span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl text-[#F5F3ED] font-light tracking-wide">
            From Continental Geology to Living Human Memory
          </h2>
        </div>

        {/* Step Counter & Nav Controls */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`p-2 rounded-lg border flex items-center justify-center transition-colors ${
              currentIndex === 0
                ? 'opacity-30 border-transparent text-[#666] cursor-not-allowed'
                : 'bg-[#141414] hover:bg-[#202020] text-[#F5F3ED] border-[rgba(245,243,237,0.1)]'
            }`}
            title="Ascend to larger scale"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="font-mono text-xs text-[#C5A059] font-bold px-2">
            SCALE {activeScale.stepNumber} // 09
          </span>

          <button
            onClick={handleNext}
            disabled={currentIndex === scales.length - 1}
            className={`p-2 rounded-lg border flex items-center justify-center transition-colors ${
              currentIndex === scales.length - 1
                ? 'opacity-30 border-transparent text-[#666] cursor-not-allowed'
                : 'bg-[#141414] hover:bg-[#202020] text-[#F5F3ED] border-[rgba(245,243,237,0.1)]'
            }`}
            title="Descend into finer scale"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 9-Step Horizontal Scale Tracker */}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
        {scales.map((s, idx) => {
          const Icon = getScaleIcon(s.id);
          const isActive = s.id === activeScaleId;

          return (
            <button
              key={s.id}
              onClick={() => onSelectScale(s.id)}
              className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                isActive
                  ? 'bg-[#C5A059] text-[#050505] border-[#C5A059] shadow-lg shadow-[#C5A059]/10 font-medium scale-[1.03]'
                  : 'bg-[#0f0f0f] border-[rgba(245,243,237,0.06)] text-[#888] hover:text-[#DDD] hover:bg-[#161616]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-mono text-[9px] font-bold ${isActive ? 'text-[#050505]' : 'text-[#C5A059]'}`}>
                  {s.stepNumber}
                </span>
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#050505]' : 'text-[#666]'}`} />
              </div>
              <span className="font-display text-xs uppercase tracking-wider truncate block font-normal">
                {s.name}
              </span>
              <span className={`font-mono text-[8px] truncate mt-0.5 ${isActive ? 'text-[#333]' : 'text-[#555]'}`}>
                {s.scaleRatio}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Scale Monograph & Deep Attributes */}
      {activeScale && (
        <div className="bg-[#0e0e0e] border border-[#C5A059]/30 rounded-xl p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-[#C5A059] uppercase tracking-wider">
              <span>SCALE: {activeScale.scaleRatio}</span>
              <span>•</span>
              <span>ALTITUDE: {activeScale.altitudeDisplay}</span>
              <span>•</span>
              <span className="text-[#888]">CRS: {activeScale.coordinates.crs}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl text-[#F5F3ED] font-normal tracking-wide">
              {activeScale.name}: {activeScale.subtitle}
            </h3>

            <p className="font-sans text-sm text-[#D4D0C5] leading-relaxed mt-1">
              {activeScale.summary}
            </p>

            <div className="p-3 bg-[#080808] rounded-lg border border-[rgba(245,243,237,0.06)] font-mono text-xs text-[#999] mt-2">
              <span className="text-[#C5A059] uppercase tracking-wider block text-[9px] mb-1">
                SPATIAL SIGNIFICANCE:
              </span>
              {activeScale.spatialSignificance}
            </div>
          </div>

          {/* Key Spatial Metrics */}
          <div className="lg:col-span-4 flex flex-col gap-3 bg-[#060606] p-4 rounded-xl border border-[rgba(245,243,237,0.08)]">
            <span className="font-mono text-[9px] text-[#666] tracking-widest uppercase">
              SCALE TELEMETRY & RATIOS
            </span>

            {activeScale.keyMetrics.map((m) => (
              <div key={m.label} className="flex justify-between items-baseline border-b border-[rgba(245,243,237,0.04)] pb-2 font-mono text-xs">
                <span className="text-[#777] text-[10px] uppercase">{m.label}</span>
                <span className="text-[#F5F3ED] font-bold">{m.value}</span>
              </div>
            ))}

            <div className="flex justify-between items-baseline pt-1 font-mono text-xs">
              <span className="text-[#777] text-[10px] uppercase">GPS ANCHOR</span>
              <span className="text-[#C5A059]">
                {activeScale.coordinates.lat.toFixed(4)}°, {activeScale.coordinates.lon.toFixed(4)}°
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
