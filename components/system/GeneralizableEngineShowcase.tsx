import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, MapPin, Database, ShieldCheck, ArrowRight, Layers, Cpu, Sparkles } from 'lucide-react';

interface RegionSpec {
  id: string;
  name: string;
  state: string;
  coordinates: string;
  assetClass: string;
  geologicalHorizon: string;
  status: 'ACTIVE DEMONSTRATOR' | 'SPECIFICATION READY' | 'HORIZON EXPANSION';
  custodianProtocol: string;
  pilotScope: {
    communityStandard: string;
    physicalScanning: string;
    spatialTwin: string;
    economicModel: string;
  };
  metrics: {
    tenements: string;
    strataAge: string;
    primaryElements: string;
  };
}

const REGIONAL_PILOTS: RegionSpec[] = [
  {
    id: 'ANDAMOOKA_PILOT_01',
    name: 'Andamooka',
    state: 'South Australia',
    coordinates: '30.45° S, 137.16° E',
    assetClass: 'Matrix Opal & Quartzite Fossils',
    geologicalHorizon: 'Cretaceous Marree Subgroup (Bulldog Shale, 110–120 Ma)',
    status: 'ACTIVE DEMONSTRATOR',
    custodianProtocol: 'Kokatha Cultural Consent Protocol (KP-2024-C)',
    pilotScope: {
      communityStandard: 'Community consensus 5-tier matrix opal grading standard (AOSA-2024)',
      physicalScanning: 'Miner-side structured light 20µm micro-photogrammetry & handheld micro-XRF',
      spatialTwin: 'Town-scale aerial LiDAR point cloud (12.4M points) + subterranean dugout envelopes',
      economicModel: 'Direct German & international remote collector RWA acquisition with 8.5% civic trust royalty',
    },
    metrics: {
      tenements: '14 Active Fields',
      strataAge: '115 Million Years',
      primaryElements: 'SiO₂·nH₂O, Fe, Ti, Zr',
    },
  },
  {
    id: 'COOBER_PEDY_PILOT_02',
    name: 'Coober Pedy',
    state: 'South Australia',
    coordinates: '29.01° S, 134.75° E',
    assetClass: 'White & Crystal Opal, Subterranean Dugouts',
    geologicalHorizon: 'Stuart Range Formation, Deep Weathering Profile (100–110 Ma)',
    status: 'SPECIFICATION READY',
    custodianProtocol: 'Antakirinja Matu-Yankunytjatjara Protocol (AMY-2025-P)',
    pilotScope: {
      communityStandard: 'Crystal clarity and optical body-tone color classification schema',
      physicalScanning: 'Laser optical refractometry + hyperspectral absorption mapping',
      spatialTwin: 'Underground labyrinth mapping, church/hotel subterranean thermal twins',
      economicModel: 'Subterranean heritage preservation tokenization with civic tourism distribution',
    },
    metrics: {
      tenements: '42 Active Mining Fields',
      strataAge: '105 Million Years',
      primaryElements: 'SiO₂·nH₂O (Low Iron Matrix)',
    },
  },
  {
    id: 'LIGHTNING_RIDGE_PILOT_03',
    name: 'Lightning Ridge',
    state: 'New South Wales',
    coordinates: '29.42° S, 147.98° E',
    assetClass: 'Black Opal & Opalized Dinosaur Fossils',
    geologicalHorizon: 'Surat Basin, Wallangulla Sandstone Member (100 Ma)',
    status: 'SPECIFICATION READY',
    custodianProtocol: 'Yuwaalaraay Heritage Engagement Charter',
    pilotScope: {
      communityStandard: 'Black N1–N4 darkness index community consensus verification',
      physicalScanning: 'Micro-CT internal gemstone void analysis & palaeontological twin registration',
      spatialTwin: 'Three-Mile and Lunatic Flat historic shaft spatial network register',
      economicModel: 'Dinosaur fossil preservation trust and rare gemstone provenance certificates',
    },
    metrics: {
      tenements: '18 Major Mineral Ridges',
      strataAge: '100 Million Years',
      primaryElements: 'Carbonaceous Silica Matrix',
    },
  },
  {
    id: 'BROKEN_HILL_PILOT_04',
    name: 'Broken Hill',
    state: 'New South Wales',
    coordinates: '31.95° S, 141.46° E',
    assetClass: 'Industrial Heritage & Rare Mineral Paragenesis',
    geologicalHorizon: 'Willyama Supergroup (Paleoproterozoic, 1,600 Ma)',
    status: 'HORIZON EXPANSION',
    custodianProtocol: 'Wilyakali Traditional Custodians Protocol',
    pilotScope: {
      communityStandard: 'Line-of-Lode industrial artifact and mineralogical specimen certification',
      physicalScanning: 'X-ray diffraction and heavy metal isotope fractionation signatures',
      spatialTwin: 'Historic underground stope models & surface heritage precinct point clouds',
      economicModel: 'Industrial heritage tourism preservation endowments',
    },
    metrics: {
      tenements: 'Line-of-Lode Orebody',
      strataAge: '1.6 Billion Years',
      primaryElements: 'Pb, Zn, Ag, Rhodonite',
    },
  },
];

export const GeneralizableEngineShowcase: React.FC = () => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('ANDAMOOKA_PILOT_01');

  const activeRegion = REGIONAL_PILOTS.find((r) => r.id === selectedRegionId) || REGIONAL_PILOTS[0];

  return (
    <div className="p-6 sm:p-10 border border-hairline-gold bg-[#090806] crosshair-corner my-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(197,160,89,0.2)] pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#C5A059] tracking-[0.25em] uppercase mb-1">
            <Globe className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
            <span>NATIONAL ARCHITECTURAL EXTENSIBILITY ENGINE</span>
          </div>
          <h3 className="font-display font-light text-2xl sm:text-3xl text-[#F5F3ED] tracking-[0.14em] uppercase">
            From Andamooka to Continental Scale
          </h3>
        </div>

        <div className="p-3 bg-[#11100C] border border-[rgba(242,240,235,0.08)] text-[9px] font-mono-tech text-[#8E8A82] self-start md:self-auto">
          <span className="text-[#C5A059] font-bold">CORE ARCHITECTURE:</span>
          <span className="ml-2">Universal Schema (Person ↔ Place ↔ Asset ↔ Story ↔ Consensus)</span>
        </div>
      </div>

      {/* Regional Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {REGIONAL_PILOTS.map((pilot, idx) => {
          const isSelected = pilot.id === selectedRegionId;
          return (
            <button
              key={pilot.id}
              onClick={() => setSelectedRegionId(pilot.id)}
              className={`p-4 text-left border transition-all flex flex-col justify-between group relative overflow-hidden ${
                isSelected
                  ? 'border-[#C5A059] bg-[#17140E] text-[#F5F3ED] shadow-[0_0_20px_rgba(197,160,89,0.12)]'
                  : 'border-[rgba(242,240,235,0.06)] bg-[#070706] text-[#777] hover:border-[rgba(197,160,89,0.4)] hover:text-[#CCC]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C5A059]" />
              )}

              <div>
                <div className="flex items-center justify-between text-[8px] font-mono-tech mb-2">
                  <span className={isSelected ? 'text-[#C5A059]' : 'text-[#555]'}>
                    PILOT 0{idx + 1}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 text-[7px] font-bold uppercase rounded ${
                      pilot.status === 'ACTIVE DEMONSTRATOR'
                        ? 'bg-[#1C180F] text-[#8FA382] border border-[#8FA382]/40'
                        : 'bg-[#111] text-[#999]'
                    }`}
                  >
                    {pilot.status === 'ACTIVE DEMONSTRATOR' ? 'LIVE PROOF' : 'SPEC READY'}
                  </span>
                </div>

                <h4 className="font-display font-light text-lg uppercase tracking-[0.12em] mb-1">
                  {pilot.name}
                </h4>
                <p className="font-serif-editorial italic text-xs text-[#999] leading-tight">
                  {pilot.state} • {pilot.assetClass}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-[rgba(242,240,235,0.05)] flex items-center justify-between text-[8px] font-mono-tech">
                <span className="text-[#666]">{pilot.coordinates}</span>
                <span className="text-[#C5A059] group-hover:translate-x-0.5 transition-transform">
                  INSPECT →
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Region Detailed Dossier Matrix */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRegion.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="p-6 sm:p-8 bg-[#0D0C09] border border-[rgba(197,160,89,0.2)] rounded space-y-6"
        >
          {/* Header Summary */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[rgba(242,240,235,0.06)] pb-4">
            <div>
              <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#C5A059] uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeRegion.coordinates} • {activeRegion.state}</span>
              </div>
              <h4 className="font-display font-light text-2xl text-[#F5F3ED] tracking-[0.12em] uppercase">
                {activeRegion.name} // {activeRegion.assetClass}
              </h4>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[9px] font-mono-tech">
              <div className="px-3 py-1 bg-[#12110E] border border-[#333] text-[#AAA]">
                <span className="text-[#666]">HORIZON:</span> {activeRegion.metrics.strataAge}
              </div>
              <div className="px-3 py-1 bg-[#12110E] border border-[#333] text-[#AAA]">
                <span className="text-[#666]">CHEMISTRY:</span> {activeRegion.metrics.primaryElements}
              </div>
              <div className="px-3 py-1 bg-[#12110E] border border-[#333] text-[#8FA382]">
                <span className="text-[#666]">SCALE:</span> {activeRegion.metrics.tenements}
              </div>
            </div>
          </div>

          {/* Geological & Custodian Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-serif-editorial">
            <div className="p-4 bg-[#080705] border border-[rgba(242,240,235,0.04)]">
              <span className="text-[8px] font-mono-tech text-[#C5A059] uppercase tracking-[0.2em] block mb-1">
                // GEOLOGICAL STRATIGRAPHIC HORIZON
              </span>
              <p className="text-[#CCC] leading-relaxed italic">
                {activeRegion.geologicalHorizon}
              </p>
            </div>
            <div className="p-4 bg-[#080705] border border-[rgba(242,240,235,0.04)]">
              <span className="text-[8px] font-mono-tech text-[#8FA382] uppercase tracking-[0.2em] block mb-1">
                // TRADITIONAL CUSTODIAN PROTOCOL
              </span>
              <p className="text-[#CCC] leading-relaxed italic">
                {activeRegion.custodianProtocol}
              </p>
            </div>
          </div>

          {/* 4 Pillars Execution Deployment for this Region */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-[#070605] border border-[rgba(242,240,235,0.04)]">
              <span className="text-[8px] font-mono-tech text-[#C5A059] uppercase tracking-wider block mb-2 font-bold">
                01 // CIVIC STANDARD
              </span>
              <p className="text-[11px] font-mono-tech text-[#999] leading-relaxed">
                {activeRegion.pilotScope.communityStandard}
              </p>
            </div>

            <div className="p-4 bg-[#070605] border border-[rgba(242,240,235,0.04)]">
              <span className="text-[8px] font-mono-tech text-[#5C7D91] uppercase tracking-wider block mb-2 font-bold">
                02 // PHYSICAL DIGITIZATION
              </span>
              <p className="text-[11px] font-mono-tech text-[#999] leading-relaxed">
                {activeRegion.pilotScope.physicalScanning}
              </p>
            </div>

            <div className="p-4 bg-[#070605] border border-[rgba(242,240,235,0.04)]">
              <span className="text-[8px] font-mono-tech text-[#A39580] uppercase tracking-wider block mb-2 font-bold">
                03 // SPATIAL & LiDAR TWIN
              </span>
              <p className="text-[11px] font-mono-tech text-[#999] leading-relaxed">
                {activeRegion.pilotScope.spatialTwin}
              </p>
            </div>

            <div className="p-4 bg-[#070605] border border-[rgba(242,240,235,0.04)]">
              <span className="text-[8px] font-mono-tech text-[#8FA382] uppercase tracking-wider block mb-2 font-bold">
                04 // CIVIC VALUE CASCADING
              </span>
              <p className="text-[11px] font-mono-tech text-[#999] leading-relaxed">
                {activeRegion.pilotScope.economicModel}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
