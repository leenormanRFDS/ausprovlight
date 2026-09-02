import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProvenanceObjectData } from '../../types/provenanceObject';
import { 
  Box, 
  Atom, 
  Fingerprint, 
  MapPin, 
  Layers, 
  FileCheck2, 
  Compass, 
  ChevronRight, 
  ChevronLeft,
  ShieldCheck,
  Activity,
  Maximize2
} from 'lucide-react';

interface ExcavateProvenanceProps {
  specimen: ProvenanceObjectData;
  onSelectInspectionMode?: (mode: 'NATURAL' | 'MATRIX' | 'XRF_HEATMAP' | 'WIREFRAME') => void;
}

interface ExcavationLayer {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  leadQuestion: string;
  icon: React.ComponentType<{ className?: string }>;
  associatedMode: 'NATURAL' | 'MATRIX' | 'XRF_HEATMAP' | 'WIREFRAME';
  summaryText: string;
  detailedAnalysis: string;
  primaryMetrics: Array<{ label: string; value: string; hint?: string }>;
  systemQuote: string;
}

export function ExcavateProvenance({ specimen, onSelectInspectionMode }: ExcavateProvenanceProps) {
  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);

  const layers: ExcavationLayer[] = [
    {
      id: 'object',
      stepNumber: '01',
      title: 'THE OBJECT',
      subtitle: 'Physical specimen morphology & baseline geometry',
      leadQuestion: 'WHAT IS THE PHYSICAL SPECIMEN?',
      icon: Box,
      associatedMode: 'NATURAL',
      summaryText:
        'A single hand-excavated piece of Andamooka matrix opal rough. The physical specimen is characterized by natural dark quartzite host sandstone infused with electric green and cobalt silica fire.',
      detailedAnalysis:
        'Before any digital record exists, there is a physical rock with specific dimensions, mass, density, and crystalline structure. APP treats the physical object as the primary anchor of all subsequent digital representations.',
      primaryMetrics: [
        { label: 'CATALOG ID', value: specimen.catalogId },
        { label: 'PHYSICAL MASS', value: `${specimen.digitalTwin.massGrams} grams` },
        { label: 'DIMENSIONS', value: `${specimen.digitalTwin.dimensionsMm.x} × ${specimen.digitalTwin.dimensionsMm.y} × ${specimen.digitalTwin.dimensionsMm.z} mm` },
        { label: 'POLYGON COUNT', value: `${specimen.digitalTwin.meshPolygonCount.toLocaleString()} triangles` },
      ],
      systemQuote: 'Every digital twin must start with an uncompromising measurement of physical reality.',
    },
    {
      id: 'material',
      stepNumber: '02',
      title: 'THE MATERIAL',
      subtitle: 'Chemical composition & optical physics',
      leadQuestion: 'WHAT IS IT SCIENTIFICALLY COMPOSED OF?',
      icon: Atom,
      associatedMode: 'XRF_HEATMAP',
      summaryText:
        'Sub-microscopic spheres of amorphous hydrated silica (SiO₂·nH₂O) arranged in regular cubic and hexagonal arrays, diffracting visible light into pure spectral wavelengths.',
      detailedAnalysis:
        'Andamooka matrix opal differs fundamentally from solid crystal opal: the precious silica infills the microscopic pore spaces between ancient marine sand grains. Limonite and iron cements (Fe 6.71%) provide the dark background matrix that creates explosive contrast.',
      primaryMetrics: [
        { label: 'SILICA MATRIX', value: specimen.science.elements[0].percentageWeight, hint: 'Hydrated SiO₂' },
        { label: 'IRON CONTENT', value: specimen.science.elements[1].percentageWeight, hint: 'Limonite cement' },
        { label: 'REFRACTIVE INDEX', value: `${specimen.science.refractiveIndex.value} ± ${specimen.science.refractiveIndex.tolerance}` },
        { label: 'SPECIFIC GRAVITY', value: `${specimen.science.specificGravity.value} g/cm³` },
      ],
      systemQuote: 'The play of color is not a dye or pigment; it is physical interference in a natural photonic crystal.',
    },
    {
      id: 'fingerprint',
      stepNumber: '03',
      title: 'THE FINGERPRINT',
      subtitle: 'Miner-side chemical & volumetric identity',
      leadQuestion: 'HOW DO WE UNMISTAKABLY IDENTIFY THIS STONE?',
      icon: Fingerprint,
      associatedMode: 'XRF_HEATMAP',
      summaryText:
        'Proprietary miner-side technology captures trace element ratios (Fe, Zr, S, Ba, Ti) and micro-laser volume contours at the shaft mouth to generate a mathematically unique digital fingerprint.',
      detailedAnalysis:
        'Just as human DNA carries ancestral markers, the trace heavy mineral signature of the Stuart Range basin (such as Zr at 323.4 ppm and Ba at 412.0 ppm) acts as an unforgeable geological passport that cannot be replicated in synthetic or foreign stones.',
      primaryMetrics: [
        { label: 'SPECTRAL HARVEST', value: specimen.science.spectrometerModel.split(' ')[0] + ' Field XRF' },
        { label: 'TRACE ZIRCONIUM', value: '323.40 ppm', hint: 'Basin biomarker' },
        { label: 'TRACE SULFUR', value: '981.28 ppm', hint: 'Pyrite residue' },
        { label: 'CRYPTO HASH', value: `${specimen.science.cryptographicSignature.slice(0, 14)}...` },
      ],
      systemQuote: 'You cannot forge 110 million years of trace geochemical deposition.',
    },
    {
      id: 'place',
      stepNumber: '04',
      title: 'THE PLACE',
      subtitle: 'Geospatial locus & traditional sovereign ground',
      leadQuestion: 'WHERE EXACTLY ON EARTH DID THIS COME FROM?',
      icon: MapPin,
      associatedMode: 'NATURAL',
      summaryText:
        'Lunatic Field, Andamooka, South Australia. Mined at the North Shrew Shaft at a depth of -14.2 meters in Bulldog Shale stratum, on the sovereign lands of the Kokatha People.',
      detailedAnalysis:
        'Place is the ultimate non-negotiable anchor. APP binds the stone to exact 3D LiDAR terrain coordinates, claim tenure boundaries, and local cultural protocol, ensuring respect for Country and complete geographic certainty.',
      primaryMetrics: [
        { label: 'FIELD', value: specimen.origin.field },
        { label: 'SHAFT ID', value: specimen.origin.shaftNumber },
        { label: 'COORDINATES', value: specimen.origin.coordinates.gridRef },
        { label: 'TRADITIONAL COUNTRY', value: specimen.origin.traditionalCustodians },
      ],
      systemQuote: 'An asset without a verified place is simply an anonymous commodity.',
    },
    {
      id: 'geology',
      stepNumber: '05',
      title: 'THE GEOLOGY',
      subtitle: '110 Million years of deep Cretaceous time',
      leadQuestion: 'HOW DID TIME AND THE EARTH CREATE IT?',
      icon: Layers,
      associatedMode: 'MATRIX',
      summaryText:
        'Formed in the ancient Cretaceous Eromanga inland sea (110 Ma BP). Decaying organic matter released biogenic silica into cold marine sediments, later concentrated during severe Tertiary weathering epochs.',
      detailedAnalysis:
        'Andamooka’s geology is unique on planet Earth. When the great inland sea retreated, deep weathering dissolved silica from overlying sands and redeposited it into porous sandstone layers below, where it slowly settled over millions of years into uniform colloidal spheres.',
      primaryMetrics: [
        { label: 'GEOLOGICAL ERA', value: `${specimen.geology.era} // ${specimen.geology.period}` },
        { label: 'DEPOSITION AGE', value: `${specimen.geology.ageMa} Million Years BP` },
        { label: 'STRATIGRAPHY', value: specimen.geology.formationName },
        { label: 'DEPOSIT BASIN', value: specimen.geology.basin.split(' ')[0] + ' Basin' },
      ],
      systemQuote: 'Every ounce of opal represents an undisturbed epoch of ancient water and slow mineral precipitation.',
    },
    {
      id: 'record',
      stepNumber: '06',
      title: 'THE RECORD',
      subtitle: 'Immutable provenance & community consensus',
      leadQuestion: 'HOW DO WE PERMANENTLY PROVE AND PRESERVE IT?',
      icon: FileCheck2,
      associatedMode: 'WIREFRAME',
      summaryText:
        'The physical signature, extraction locus, miner identity, and community consensus grading are recorded on the Opal Provenance Network (OPN) ledger for permanent public discovery.',
      detailedAnalysis:
        'The record is not controlled by a single middleman or broker. It is ratified by local miner consensus panels and cryptographically preserved so that future custodians anywhere on Earth can independently audit every link in the chain.',
      primaryMetrics: [
        { label: 'COMMUNITY GRADE', value: specimen.communityStandard.gradeCode },
        { label: 'CONSENSUS PANEL', value: specimen.communityStandard.consensusPanel.split('Panel')[0] },
        { label: 'RATIFICATION', value: specimen.communityStandard.ratificationDate },
        { label: 'AUDIT STATUS', value: 'IMMUTABLE & VERIFIED' },
      ],
      systemQuote: 'Trust is not claimed. It is evidenced through public, immutable consensus.',
    },
    {
      id: 'journey',
      stepNumber: '07',
      title: 'THE JOURNEY',
      subtitle: 'From sub-surface discovery to global stewardship',
      leadQuestion: 'WHAT HAPPENS AS THIS OBJECT TRAVELS THE WORLD?',
      icon: Compass,
      associatedMode: 'NATURAL',
      summaryText:
        'The complete 10-phase continuum: Formation → Deposition → Mining → Fingerprinting → 3D Digitization → Escrow → Physical Delivery → Community Civic Reinvestment.',
      detailedAnalysis:
        'When an authenticated stone travels to an institution or collector in Frankfurt, Tokyo, or New York, its story travels with it. The digital twin remains connected to the physical stone, and a 7.5% royalty continuously cycles back to Andamooka civic and heritage projects.',
      primaryMetrics: [
        { label: 'CURRENT VAULT', value: 'Andamooka Reserve' },
        { label: 'TARGET CONTINUITY', value: specimen.globalJourney.targetDestinationDemonstrator.destination.split('/')[0] + ' Collector' },
        { label: 'CIVIC DIVIDEND', value: `${specimen.globalJourney.civicReinvestmentPercentage}% to Town Trust` },
        { label: 'CHAIN STATUS', value: '10 / 10 NODES SEALED' },
      ],
      systemQuote: 'The object can travel across oceans without ever losing its home.',
    },
  ];

  const currentLayer = layers[activeLayerIndex];

  const handleSelectLayer = (index: number) => {
    setActiveLayerIndex(index);
    if (onSelectInspectionMode) {
      onSelectInspectionMode(layers[index].associatedMode);
    }
  };

  const handleNext = () => {
    const nextIndex = Math.min(layers.length - 1, activeLayerIndex + 1);
    handleSelectLayer(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = Math.max(0, activeLayerIndex - 1);
    handleSelectLayer(prevIndex);
  };

  return (
    <div className="w-full bg-[#080808] border border-[rgba(245,243,237,0.1)] rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col gap-8">
      {/* Section Header & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[rgba(245,243,237,0.08)] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-[#C5A059]" />
            <span className="font-mono text-[11px] tracking-[0.25em] text-[#C5A059] uppercase">
              INTERACTIVE EXCAVATION PROTOCOL
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl text-[#F5F3ED] font-light tracking-wide">
            Excavate the Provenance of Specimen 001
          </h2>
          <p className="font-mono text-xs text-[#888] mt-1 max-w-2xl">
            Peel back the layers of reality embedded within this single physical stone. Each stage reveals deeper material, geospatial, and human evidence.
          </p>
        </div>

        {/* Step Indicator Counter */}
        <div className="flex items-center gap-3 bg-[#111] px-4 py-2 rounded-lg border border-[rgba(245,243,237,0.1)] self-start sm:self-auto">
          <span className="font-mono text-xs text-[#666]">LAYER:</span>
          <span className="font-mono text-sm font-bold text-[#C5A059]">
            {activeLayerIndex + 1} / {layers.length}
          </span>
        </div>
      </div>

      {/* 7-Step Interactive Layer Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {layers.map((layer, idx) => {
          const IconComponent = layer.icon;
          const isActive = idx === activeLayerIndex;
          const isPassed = idx < activeLayerIndex;

          return (
            <button
              key={layer.id}
              onClick={() => handleSelectLayer(idx)}
              className={`flex flex-col p-3 rounded-lg text-left transition-all relative ${
                isActive
                  ? 'bg-[#C5A059]/15 border border-[#C5A059] text-[#F5F3ED] shadow-lg shadow-[#C5A059]/5'
                  : isPassed
                  ? 'bg-[#121212] border border-[rgba(245,243,237,0.1)] text-[#AAA] hover:bg-[#1a1a1a]'
                  : 'bg-[#0a0a0a] border border-[rgba(245,243,237,0.05)] text-[#666] hover:bg-[#111]'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="font-mono text-[9px] text-[#C5A059] font-bold">{layer.stepNumber}</span>
                <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A059]' : 'text-[#666]'}`} />
              </div>
              <span className="font-display text-xs font-medium tracking-wide truncate">{layer.title}</span>
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-[#C5A059] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Layer Content Card with Smooth Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLayer.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0e0e0e] border border-[rgba(245,243,237,0.08)] rounded-xl p-6 sm:p-8"
        >
          {/* Left Column: Core Narrative & Lead Question */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[#C5A059] font-mono text-[10px] tracking-[0.2em] uppercase mb-2">
                <span>{currentLayer.stepNumber} // {currentLayer.subtitle}</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-[#F5F3ED] font-normal mb-3">
                {currentLayer.leadQuestion}
              </h3>
              <p className="font-sans text-sm sm:text-base text-[#D4D0C5] leading-relaxed mb-4">
                {currentLayer.summaryText}
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#999] leading-relaxed bg-[#050505] p-4 rounded-lg border border-[rgba(245,243,237,0.05)]">
                {currentLayer.detailedAnalysis}
              </p>
            </div>

            {/* System Philosophy Monograph Quote */}
            <div className="border-l-2 border-[#C5A059] pl-4 py-1">
              <p className="font-serif italic text-xs text-[#C5A059]/90">
                "{currentLayer.systemQuote}"
              </p>
            </div>
          </div>

          {/* Right Column: Key Evidence Metrics & Inspection Trigger */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-[#070707] p-5 rounded-xl border border-[rgba(245,243,237,0.06)]">
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#777] uppercase block mb-3">
                VERIFIED FIELD METRICS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentLayer.primaryMetrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col bg-[#121212] p-3 rounded border border-[rgba(245,243,237,0.06)]"
                  >
                    <span className="font-mono text-[9px] text-[#777] uppercase tracking-wider">{m.label}</span>
                    <span className="font-mono text-xs font-semibold text-[#F5F3ED] mt-0.5 truncate">{m.value}</span>
                    {m.hint && <span className="font-mono text-[9px] text-[#C5A059] mt-0.5">{m.hint}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Mode Switcher Action */}
            <div className="flex flex-col gap-2 pt-4 border-t border-[rgba(245,243,237,0.08)]">
              <span className="font-mono text-[9px] text-[#666] uppercase tracking-wider">
                RECOMMENDED 3D SHADER:
              </span>
              <button
                onClick={() => onSelectInspectionMode && onSelectInspectionMode(currentLayer.associatedMode)}
                className="flex items-center justify-between bg-[#C5A059]/10 hover:bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40 hover:border-[#C5A059] px-4 py-2.5 rounded-lg text-xs font-mono tracking-wider transition-all"
              >
                <span>SWITCH VIEWER TO {currentLayer.associatedMode}</span>
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination Footer Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          disabled={activeLayerIndex === 0}
          className="flex items-center gap-2 font-mono text-xs px-4 py-2.5 rounded-lg border border-[rgba(245,243,237,0.15)] text-[#AAA] hover:text-[#FFF] hover:bg-[#141414] disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>PREVIOUS LAYER</span>
        </button>

        <span className="font-mono text-xs text-[#555] hidden sm:inline">
          USE TABS OR ARROWS TO UNCOVER EVIDENCE
        </span>

        <button
          onClick={handleNext}
          disabled={activeLayerIndex === layers.length - 1}
          className="flex items-center gap-2 font-mono text-xs px-5 py-2.5 rounded-lg bg-[#C5A059] text-[#050505] font-semibold hover:bg-[#d6b268] disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <span>NEXT: {activeLayerIndex < layers.length - 1 ? layers[activeLayerIndex + 1].title : 'COMPLETE'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
