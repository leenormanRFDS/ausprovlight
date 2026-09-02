import React, { useState, useRef } from 'react';
import { ProvenanceObjectData } from '../../types/provenanceObject';
import { ThreeOpalViewer} from './ThreeOpalViewer';
import { ExcavateProvenance } from './ExcavateProvenance';
import { DigitalTwinDeepDive } from './DigitalTwinDeepDive';
import { ProvenanceThreadVisualizer } from './ProvenanceThreadVisualizer';
import { ScientificFingerprintLab } from './ScientificFingerprintLab';
import { AndamookaStandardBridge } from './AndamookaStandardBridge';
import { OpalProvenanceNetworkSection } from './OpalProvenanceNetworkSection';
import { GlobalObjectJourney } from './GlobalObjectJourney';
import { 
  Compass, 
  MapPin, 
  Layers, 
  Activity, 
  Calendar, 
  ShieldCheck, 
  ChevronDown, 
  Rotate3D,
  Sparkles,
  ArrowUpRight,
  Maximize2
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProvenanceObjectViewerProps {
  objectData: ProvenanceObjectData;
}

export function ProvenanceObjectViewer({ objectData }: ProvenanceObjectViewerProps) {
  
  const viewerRef = useRef<HTMLDivElement>(null);

  const scrollToViewer = () => {
    viewerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col gap-24">
      {/* 1. HERO EXPERIENCE: Real 3D Specimen as the Visual Hero */}
      <section ref={viewerRef} className="w-full pt-6 flex flex-col gap-8">
        {/* Editorial Eyebrow & Questions */}
        <div className="flex flex-col gap-4 max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#C5A059] tracking-[0.3em] uppercase">
              APP SPECIMEN DOSSIER // {objectData.catalogId}
            </span>
            <span className="h-3 w-[1px] bg-[#444]" />
            <span className="font-mono text-xs text-emerald-400">
              STATUS: {objectData.status}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F5F3ED] font-light tracking-tight leading-[1.08]">
            EVERY OBJECT HAS A HISTORY.
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-[#C5A059] font-normal leading-relaxed">
            This is where the Australian Provenance Project begins to make that history discoverable.
          </p>

          {/* Sofia's Layered Investigation Prompt */}
          <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 text-xs font-mono text-[#AAA]">
            <span className="bg-[#111] px-3 py-1.5 rounded border border-[rgba(245,243,237,0.08)]">WHERE DID IT COME FROM?</span>
            <span className="bg-[#111] px-3 py-1.5 rounded border border-[rgba(245,243,237,0.08)]">WHO FOUND IT?</span>
            <span className="bg-[#111] px-3 py-1.5 rounded border border-[rgba(245,243,237,0.08)]">WHAT IS IT?</span>
            <span className="bg-[#111] px-3 py-1.5 rounded border border-[rgba(245,243,237,0.08)]">HOW CAN WE PROVE IT?</span>
            <span className="bg-[#111] px-3 py-1.5 rounded border border-[rgba(245,243,237,0.08)]">WHERE IS IT NOW?</span>
          </div>
        </div>

        {/* 3D Specimen Stage + Rapid Meta Dossier Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 3D Canvas Viewport Container (Hero 8 Columns) */}
          <div className="lg:col-span-8 h-[520px] lg:h-[620px] rounded-2xl overflow-hidden shadow-2xl">
            <ThreeOpalViewer
              modelUrl={objectData.digitalTwin.modelUrl}
              
              
              className="h-full"
            />
          </div>

          {/* Specimen Field Card (4 Columns) */}
          <div className="lg:col-span-4 bg-[#0a0a0a] border border-[rgba(245,243,237,0.1)] rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="border-b border-[rgba(245,243,237,0.08)] pb-4">
                <span className="font-mono text-[9px] text-[#C5A059] uppercase tracking-widest block mb-1">
                  OFFICIAL NOMENCLATURE
                </span>
                <h3 className="font-display text-xl text-[#F5F3ED] font-normal">
                  {objectData.vernacularName}
                </h3>
                <span className="font-mono text-xs text-[#888]">
                  {objectData.title}
                </span>
              </div>

              {/* Core Physical & Spatial Attributes */}
              <div className="flex flex-col gap-3 font-mono text-xs">
                <div className="flex items-start justify-between border-b border-[rgba(245,243,237,0.04)] pb-2">
                  <span className="text-[#666] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    LOCUS
                  </span>
                  <span className="text-[#F5F3ED] text-right font-medium">
                    {objectData.origin.field}, {objectData.origin.town}
                  </span>
                </div>

                <div className="flex items-start justify-between border-b border-[rgba(245,243,237,0.04)] pb-2">
                  <span className="text-[#666] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
                    STRATUM
                  </span>
                  <span className="text-[#F5F3ED] text-right">
                    {objectData.geology.formationName.split('&')[0]} ({objectData.geology.ageMa} Ma)
                  </span>
                </div>

                <div className="flex items-start justify-between border-b border-[rgba(245,243,237,0.04)] pb-2">
                  <span className="text-[#666] flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#C5A059]" />
                    MINER
                  </span>
                  <span className="text-[#F5F3ED] text-right">
                    {objectData.extractor.minerName}
                  </span>
                </div>

                <div className="flex items-start justify-between border-b border-[rgba(245,243,237,0.04)] pb-2">
                  <span className="text-[#666] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                    EXTRACTED
                  </span>
                  <span className="text-[#F5F3ED] text-right">
                    {objectData.extractor.extractionDate}
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-[#666] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    RATIFICATION
                  </span>
                  <span className="text-emerald-400 text-right font-semibold">
                    {objectData.communityStandard.gradeCode}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Trigger */}
            <div className="flex flex-col gap-2 pt-4 border-t border-[rgba(245,243,237,0.08)]">
              <a
                href="#excavation-section"
                className="flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#d6b268] text-[#050505] font-mono text-xs font-semibold px-4 py-3 rounded-lg transition-colors text-center"
              >
                <span>EXCAVATE PROVENANCE LAYERS</span>
                <ChevronDown className="w-4 h-4" />
              </a>
              <span className="font-mono text-[9px] text-[#666] text-center">
                Scroll to uncover physical, scientific & historical evidence
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROGRESSIVE EXCAVATION PROTOCOL (7 Layers) */}
      <section id="excavation-section" className="w-full">
        <ExcavateProvenance
          specimen={objectData}
          
        />
      </section>

      {/* 3. DEDICATED DIGITAL TWIN SECTION */}
      <section className="w-full">
        <DigitalTwinDeepDive
          specimen={objectData}
          onScrollToViewer={scrollToViewer}
        />
      </section>

      {/* 4. THE PROVENANCE THREAD VISUALIZATION (10 Nodes) */}
      <section className="w-full">
        <ProvenanceThreadVisualizer
          nodes={objectData.provenanceChain}
        />
      </section>

      {/* 5. SCIENTIFIC FINGERPRINT LAB */}
      <section className="w-full">
        <ScientificFingerprintLab
          science={objectData.science}
        />
      </section>

      {/* 6. ANDAMOOKA COMMUNITY CONSENSUS STANDARD */}
      <section className="w-full">
        <AndamookaStandardBridge
          specimen={objectData}
        />
      </section>

      {/* 7. OPAL PROVENANCE NETWORK (OPN) INFRASTRUCTURE */}
      <section className="w-full">
        <OpalProvenanceNetworkSection />
      </section>

      {/* 8. FROM STONE TO GLOBAL OBJECT CONTINUUM */}
      <section className="w-full">
        <GlobalObjectJourney
          specimen={objectData}
        />
      </section>
    </div>
  );
}
