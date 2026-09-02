import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { FIVE_PILLARS_DATA } from '../../data/fivePillarsData';
import { ProvenanceBadge } from '../design-system/ProvenanceBadge';
import { ActionTrigger } from '../design-system/ActionTrigger';
import { StatusPip } from '../design-system/StatusPip';
import { PillarConnectionBridge } from './PillarConnectionBridge';
import { Compass, Sparkles } from 'lucide-react';

interface PillarTownProps {
  onSelectPillar: (pillarId: 'community' | 'opal' | 'town' | 'tourism' | 'heritage') => void;
}

export const PillarTown: React.FC<PillarTownProps> = ({ onSelectPillar }) => {
  const data = FIVE_PILLARS_DATA.town;
  const [activeZLayer, setActiveZLayer] = useState<number>(1);

  const zLayers = [
    {
      level: 0,
      code: 'Z0 SURFACE',
      name: 'AERIAL TERRAIN & SETTLEMENT MESH',
      elevation: '+76.4m AHD',
      points: '140 km² Coverage // 2.1cm LiDAR Mesh',
      description: 'The outback desert topography, access roads, unsealed tracks, and surface dwellings.',
    },
    {
      level: 1,
      code: 'Z1 DUGOUTS',
      name: 'SUBTERRANEAN INTERIOR SPACES',
      elevation: '+71.2m AHD',
      points: '42 Preserved Dugout Scans // 8,400 m³ Interior Vol.',
      description: 'Hand-hewn sandstone living chambers carved since 1930 with natural thermal insulation.',
    },
    {
      level: 2,
      code: 'Z2 TAILINGS',
      name: 'MINING DUMP & WASTE ACCUMULATION',
      elevation: '+68.0m AHD',
      points: '1,200 Registered Noodling Piles',
      description: 'Historical drill spoils and surface tailings cataloged for secondary noodling and safety zoning.',
    },
    {
      level: 3,
      code: 'Z3 SHAFTS',
      name: 'HISTORICAL VERTICAL SHAFTS',
      elevation: '+62.5m AHD',
      points: '310 Vertical Mine Access Portals',
      description: 'Pioneer vertical winze shafts linking surface claims to the Cretaceous opal level.',
    },
    {
      level: 5,
      code: 'Z5 DRIVES',
      name: 'SUBTERRANEAN MINING GALLERIES',
      elevation: '+58.1m AHD',
      points: '18 Active Underground Drives',
      description: 'Deep horizontal extraction drives in the Bulldog Shale where matrix opal is active.',
    },
  ];

  const currentZ = zLayers.find((z) => z.level === activeZLayer) || zLayers[1];

  return (
    <div className="flex flex-col gap-12 font-mono-tech">
      {/* 1. Header Banner */}
      <div className="p-8 sm:p-12 border border-[#A39580] bg-[#110F0D] crosshair-corner relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[rgba(163,149,128,0.12)] to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono-tech tracking-[0.3em] text-[#A39580] uppercase">
              PILLAR {data.index} // {data.personality.toUpperCase()}
            </span>
            <span className="opacity-40">|</span>
            <ProvenanceBadge level={data.badgeLevel} label="6-LAYER LIDAR SPATIAL TWIN" />
          </div>
          <StatusPip status="verified" label="Z0–Z5 TELEMETRY LIVE" />
        </div>

        <h2 className="font-display font-light text-3xl sm:text-5xl lg:text-6xl text-[#F5F3ED] tracking-[0.14em] uppercase mb-4 leading-tight">
          {data.name}
        </h2>
        <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#D8D2C7] max-w-3xl leading-relaxed mb-6">
          "{data.tagline}"
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-[11px] font-mono-tech text-[#A39580] tracking-[0.2em] uppercase block">
            {data.subtitle}
          </span>
          <Link
            to="/town"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#050505] bg-[#C5A059] hover:bg-[#D4B06A] px-4 py-2.5 rounded-lg font-bold transition-all self-start sm:self-auto"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>LAUNCH 3D SPATIAL DIGITAL TWIN (9 SCALES)</span>
          </Link>
        </div>
      </div>

      {/* 2. Structured Answers: What is it? & Why does it matter? */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 p-8 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] flex flex-col justify-between crosshair-corner">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#A39580] tracking-[0.25em] uppercase mb-4">
              <span className="w-3 h-[1px] bg-[#A39580]"></span>
              <span>01 // WHAT IS IT?</span>
            </div>
            <h3 className="font-display font-light text-xl sm:text-2xl text-[#F5F3ED] tracking-[0.14em] uppercase mb-4">
              {data.whatIsIt.statement}
            </h3>
            <p className="font-serif-editorial italic text-sm sm:text-base text-[#B0AAA0] leading-relaxed mb-6">
              {data.whatIsIt.elaboration}
            </p>
          </div>
          <div className="p-4 bg-[#050505] border border-[rgba(242,240,235,0.06)] text-[9px] font-mono-tech text-[#888]">
            <span className="text-[#A39580] block uppercase mb-1">CORE SPATIAL MECHANISM:</span>
            {data.whatIsIt.coreMechanism}
          </div>
        </div>

        <div className="lg:col-span-6 p-8 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] flex flex-col justify-between crosshair-corner">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#A39580] tracking-[0.25em] uppercase mb-4">
              <span className="w-3 h-[1px] bg-[#A39580]"></span>
              <span>02 // WHY DOES IT MATTER?</span>
            </div>
            <h3 className="font-display font-light text-xl sm:text-2xl text-[#F5F3ED] tracking-[0.14em] uppercase mb-4">
              {data.whyDoesItMatter.statement}
            </h3>
            <p className="font-serif-editorial italic text-sm sm:text-base text-[#B0AAA0] leading-relaxed mb-6">
              {data.whyDoesItMatter.elaboration}
            </p>
          </div>
          <div className="p-4 bg-[#14120F] border border-[rgba(163,149,128,0.3)] text-[10px] font-serif-editorial italic text-[#D8D2C7]">
            {data.whyDoesItMatter.impactQuote}
          </div>
        </div>
      </div>

      {/* 3. Interactive Spatial Artifact: 6-Layer LiDAR Depth Mesh */}
      <div className="p-8 sm:p-10 border border-[#A39580] bg-[#12100E] crosshair-corner">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(163,149,128,0.25)] pb-6 mb-8">
          <div>
            <span className="text-[9px] font-mono-tech text-[#A39580] tracking-[0.25em] uppercase block mb-1">
              ANDAMOOKA 6-LAYER LIDAR SPATIAL OPERATING SYSTEM
            </span>
            <h3 className="font-display font-light text-2xl text-[#F5F3ED] tracking-[0.16em] uppercase">
              Subterranean & Terrain Depth Strata Inspector
            </h3>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#A09B90]">
            <span>LOCUS: GERMAN GULLY</span>
            <span className="opacity-40">|</span>
            <span className="text-[#A39580]">RESOLUTION: 2.1cm</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Layer Selector */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="text-[10px] font-mono-tech tracking-[0.2em] text-[#A39580] uppercase">
              SELECT SPATIAL Z-STRATA TO INSPECT:
            </span>
            <div className="flex flex-col gap-2">
              {zLayers.map((z) => (
                <button
                  key={z.level}
                  onClick={() => setActiveZLayer(z.level)}
                  className={`p-3 text-left font-mono-tech text-xs tracking-[0.15em] border transition-all flex items-center justify-between ${
                    activeZLayer === z.level
                      ? 'border-[#A39580] bg-[#A39580] text-[#0A0A08] font-bold'
                      : 'border-[rgba(242,240,235,0.08)] bg-[#080806] text-[#888] hover:text-[#F5F3ED]'
                  }`}
                >
                  <span>{z.code} // {z.name}</span>
                  <span className="text-[10px] opacity-80">{z.elevation}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Layer Detail Viewport */}
          <div className="lg:col-span-6 p-6 border border-[rgba(242,240,235,0.08)] bg-[#080806] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[9px] font-mono-tech text-[#A39580] mb-2">
                <span>LAYER {currentZ.code} ACTIVE</span>
                <span>ELEVATION: {currentZ.elevation}</span>
              </div>
              <h4 className="font-display font-light text-lg text-[#F5F3ED] tracking-[0.14em] uppercase mb-3">
                {currentZ.name}
              </h4>
              <p className="font-serif-editorial italic text-xs text-[#AAA] leading-relaxed mb-4">
                {currentZ.description}
              </p>
              <div className="p-3 bg-[#0D0D0A] border border-[rgba(242,240,235,0.06)] text-[9px] font-mono-tech text-[#888] space-y-1">
                <div className="flex justify-between">
                  <span>POINT CLOUD METRIC:</span>
                  <span className="text-[#F5F3ED]">{currentZ.points}</span>
                </div>
                <div className="flex justify-between">
                  <span>GEOSPATIAL ANCHOR:</span>
                  <span className="text-[#A39580]">30.45° S, 137.16° E (GDA2020)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[rgba(242,240,235,0.06)] flex items-center justify-between text-[9px] font-mono-tech">
              <span className="text-[#666]">CROSS-PILLAR SYNERGY:</span>
              <span className="text-[#C5A059]">FEEDS TOURISM XR TRAILS</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. What we are doing in Andamooka */}
      <div className="p-8 sm:p-10 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] crosshair-corner">
        <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#A39580] tracking-[0.25em] uppercase mb-4">
          <span className="w-3 h-[1px] bg-[#A39580]"></span>
          <span>03 // WHAT ARE WE DOING IN ANDAMOOKA?</span>
        </div>
        <h3 className="font-display font-light text-2xl text-[#F5F3ED] tracking-[0.16em] uppercase mb-3">
          High-Density LiDAR & Dugout Digitization
        </h3>
        <p className="font-serif-editorial italic text-base text-[#AAA] mb-8 max-w-3xl">
          {data.whatWeAreDoingInAndamooka.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.whatWeAreDoingInAndamooka.initiatives.map((init) => (
            <div
              key={init.title}
              className="p-6 border border-[rgba(242,240,235,0.06)] bg-[#070706] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[8px] font-mono-tech mb-3">
                  <span className="text-[#A39580] tracking-[0.2em]">INITIATIVE</span>
                  <span className="px-1.5 py-0.5 border border-[rgba(242,240,235,0.1)] text-[#8FA382]">
                    {init.status}
                  </span>
                </div>
                <h4 className="font-display font-light text-base text-[#F5F3ED] tracking-[0.12em] uppercase mb-2">
                  {init.title}
                </h4>
                <p className="font-serif-editorial italic text-xs text-[#888] leading-relaxed">
                  {init.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Interactive Relationship Bridges */}
      <PillarConnectionBridge
        currentPillarName="TOWN"
        connections={data.howItConnects.primaryBridges}
        onSelectPillar={onSelectPillar}
      />

      {/* 6. What Becomes Possible Beyond Andamooka */}
      <div className="p-8 sm:p-10 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] crosshair-corner">
        <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#A39580] tracking-[0.25em] uppercase mb-4">
          <span className="w-3 h-[1px] bg-[#A39580]"></span>
          <span>05 // WHAT BECOMES POSSIBLE BEYOND ANDAMOOKA?</span>
        </div>
        <h3 className="font-display font-light text-2xl text-[#F5F3ED] tracking-[0.16em] uppercase mb-3">
          Universal Vernacular Spatial Mapping
        </h3>
        <p className="font-serif-editorial italic text-base text-[#AAA] mb-8 max-w-3xl">
          {data.whatBecomesPossibleBeyond.vision}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.whatBecomesPossibleBeyond.applications.map((app) => (
            <div key={app.domain} className="p-5 border border-[rgba(242,240,235,0.06)] bg-[#070706]">
              <span className="text-[9px] font-mono-tech text-[#A39580] tracking-[0.2em] uppercase block mb-2">
                {app.domain}
              </span>
              <p className="font-serif-editorial italic text-xs text-[#888] leading-relaxed">
                {app.potential}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
