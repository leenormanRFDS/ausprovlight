import React, { useState } from 'react';
import { ProvenanceObjectData } from '../../types/provenanceObject';
import { 
  Scan, 
  Layers, 
  Lock, 
  Compass, 
  Cpu, 
  ExternalLink, 
  CheckCircle2, 
  Sliders,
  Scale,
  Maximize2
} from 'lucide-react';

interface DigitalTwinDeepDiveProps {
  specimen: ProvenanceObjectData;
  onScrollToViewer?: () => void;
}

export function DigitalTwinDeepDive({ specimen, onScrollToViewer }: DigitalTwinDeepDiveProps) {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SPECIFICATIONS' | 'BINDINGS'>('OVERVIEW');

  return (
    <div id="digital-twin-deep-dive" className="w-full flex flex-col gap-10">
      {/* Title & Core Monograph Definition */}
      <div className="flex flex-col gap-4 border-b border-[rgba(245,243,237,0.1)] pb-8">
        <div className="flex items-center gap-2">
          <Scan className="w-4 h-4 text-[#C5A059]" />
          <span className="font-mono text-xs tracking-[0.25em] text-[#C5A059] uppercase">
            SECTION 02 // VOLUMETRIC REPRESENTATION
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F5F3ED] font-light tracking-tight">
              DIGITAL TWIN
            </h2>
            <p className="font-serif italic text-lg sm:text-xl text-[#C5A059] mt-2">
              A digital representation of a physical object.
            </p>
          </div>

          {onScrollToViewer && (
            <button
              onClick={onScrollToViewer}
              className="flex items-center gap-2 self-start lg:self-auto bg-[#141414] hover:bg-[#202020] text-[#F5F3ED] border border-[rgba(245,243,237,0.15)] px-4 py-2.5 rounded-lg text-xs font-mono tracking-wider transition-colors"
            >
              <Maximize2 className="w-4 h-4 text-[#C5A059]" />
              <span>RETURN TO 3D SPECIMEN VIEWER</span>
            </button>
          )}
        </div>

        {/* Narrative Explanation in Simple, Refined Language */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-[#080808] p-6 rounded-xl border border-[rgba(245,243,237,0.06)]">
            <h3 className="font-mono text-xs text-[#C5A059] tracking-widest uppercase mb-2">
              THE PHYSICAL-DIGITAL BRIDGE
            </h3>
            <p className="font-sans text-sm text-[#D4D0C5] leading-relaxed">
              A digital twin is not a piece of abstract computer graphics. It is an exact optical, volumetric, and material copy of a real specimen sitting in a physical tray in Andamooka. For APP, a digital twin becomes truly powerful only when that representation remains permanently bound to the stone's verified origin, miner, and geological stratigraphy.
            </p>
          </div>

          <div className="bg-[#080808] p-6 rounded-xl border border-[rgba(245,243,237,0.06)]">
            <h3 className="font-mono text-xs text-[#C5A059] tracking-widest uppercase mb-2">
              WHY CONTINUITY MATTERS
            </h3>
            <p className="font-sans text-sm text-[#D4D0C5] leading-relaxed">
              Without provenance, a 3D model is just an isolated asset file that can be copied, falsified, or detached from reality. By cryptographically binding the 3D geometry hash to the physical XRF elemental fingerprint, the digital twin travels alongside the physical stone across global borders without losing its voice.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Tabs: Overview, Technical Specs, Cryptographic Binding */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 border-b border-[rgba(245,243,237,0.08)] pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`font-mono text-xs tracking-wider px-4 py-2 rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === 'OVERVIEW'
                ? 'bg-[#181818] text-[#C5A059] border-b-2 border-[#C5A059] font-bold'
                : 'text-[#777] hover:text-[#DDD]'
            }`}
          >
            01 // CAPABILITIES & SCALE
          </button>
          <button
            onClick={() => setActiveTab('SPECIFICATIONS')}
            className={`font-mono text-xs tracking-wider px-4 py-2 rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === 'SPECIFICATIONS'
                ? 'bg-[#181818] text-[#C5A059] border-b-2 border-[#C5A059] font-bold'
                : 'text-[#777] hover:text-[#DDD]'
            }`}
          >
            02 // PHOTOGRAMMETRY & GEOMETRY
          </button>
          <button
            onClick={() => setActiveTab('BINDINGS')}
            className={`font-mono text-xs tracking-wider px-4 py-2 rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === 'BINDINGS'
                ? 'bg-[#181818] text-[#C5A059] border-b-2 border-[#C5A059] font-bold'
                : 'text-[#777] hover:text-[#DDD]'
            }`}
          >
            03 // IMMUTABLE GEOMETRY BINDING
          </button>
        </div>

        {/* Tab 1: Overview & Scale */}
        {activeTab === 'OVERVIEW' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0c0c0c] border border-[rgba(245,243,237,0.08)] rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059] mb-4">
                  <Scale className="w-4 h-4" />
                </div>
                <h4 className="font-display text-base text-[#F5F3ED] mb-1">Multi-Scale Inspection</h4>
                <p className="font-sans text-xs text-[#999] leading-relaxed">
                  Inspect the physical boundary lines, sandstone host nodules, and thin silica seams across Macro 1×, Facet 3×, and Micro 10× magnification presets directly in the browser.
                </p>
              </div>
              <span className="font-mono text-[10px] text-[#C5A059] mt-4 block">RESOLUTION: 20µm SURFACE TOLERANCE</span>
            </div>

            <div className="bg-[#0c0c0c] border border-[rgba(245,243,237,0.08)] rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059] mb-4">
                  <Sliders className="w-4 h-4" />
                </div>
                <h4 className="font-display text-base text-[#F5F3ED] mb-1">PBR Material Shaders</h4>
                <p className="font-sans text-xs text-[#999] leading-relaxed">
                  Real-time physically based rendering accurately replicates the index of refraction ($n=1.450$), thin-film clearcoat, and internal Bragg diffraction of the hydrated silica spheres.
                </p>
              </div>
              <span className="font-mono text-[10px] text-[#C5A059] mt-4 block">OPTICS: ACES FILMIC SPECTRAL MAPPING</span>
            </div>

            <div className="bg-[#0c0c0c] border border-[rgba(245,243,237,0.08)] rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059] mb-4">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="font-display text-base text-[#F5F3ED] mb-1">Contextual Spatial Locus</h4>
                <p className="font-sans text-xs text-[#999] leading-relaxed">
                  The model is calibrated to the town’s aerial LiDAR coordinate space, allowing virtual placement into the exact underground drive where Matt Kathagen mined it.
                </p>
              </div>
              <span className="font-mono text-[10px] text-[#C5A059] mt-4 block">LIDAR: Z5 SUBTERRANEAN SHAFT ALIGNED</span>
            </div>
          </div>
        )}

        {/* Tab 2: Specifications */}
        {activeTab === 'SPECIFICATIONS' && (
          <div className="bg-[#0a0a0a] border border-[rgba(245,243,237,0.08)] rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col gap-1 border-b md:border-b-0 md:border-r border-[rgba(245,243,237,0.06)] pb-4 md:pb-0 md:pr-4">
              <span className="font-mono text-[9px] text-[#666] uppercase tracking-wider">TRIANGLE COUNT</span>
              <span className="font-mono text-lg font-bold text-[#F5F3ED]">{specimen.digitalTwin.meshPolygonCount.toLocaleString()}</span>
              <span className="font-mono text-[10px] text-[#888]">Optimized GLB transmission format</span>
            </div>

            <div className="flex flex-col gap-1 border-b md:border-b-0 md:border-r border-[rgba(245,243,237,0.06)] pb-4 md:pb-0 md:pr-4">
              <span className="font-mono text-[9px] text-[#666] uppercase tracking-wider">TEXTURE RESOLUTION</span>
              <span className="font-mono text-lg font-bold text-[#F5F3ED]">4096 × 4096</span>
              <span className="font-mono text-[10px] text-[#888]">Albedo, Roughness, Normal, Clearcoat</span>
            </div>

            <div className="flex flex-col gap-1 border-b md:border-b-0 md:border-r border-[rgba(245,243,237,0.06)] pb-4 md:pb-0 md:pr-4">
              <span className="font-mono text-[9px] text-[#666] uppercase tracking-wider">VOLUMETRIC DISPLACEMENT</span>
              <span className="font-mono text-lg font-bold text-[#F5F3ED]">{specimen.digitalTwin.volumetricMm3} mm³</span>
              <span className="font-mono text-[10px] text-[#888]">3D Archimedes laser displacement</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] text-[#666] uppercase tracking-wider">SCAN PROTOCOL</span>
              <span className="font-mono text-base font-bold text-[#C5A059]">Micro-Photogrammetry</span>
              <span className="font-mono text-[10px] text-[#888]">Structured light 20µm precision</span>
            </div>
          </div>
        )}

        {/* Tab 3: Cryptographic Binding */}
        {activeTab === 'BINDINGS' && (
          <div className="bg-[#0a0a0a] border border-[rgba(245,243,237,0.08)] rounded-xl p-6 flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-[#C5A059]/10 text-[#C5A059] shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-display text-base text-[#F5F3ED]">Immutable Geometry Hash Fingerprint</h4>
                <p className="font-sans text-xs text-[#999]">
                  The vertex positions, surface normal vectors, and elemental ratios are compiled into a root SHA-256 fingerprint that is permanently committed to the Opal Provenance Network.
                </p>
              </div>
            </div>

            <div className="bg-[#050505] p-4 rounded-lg border border-[rgba(245,243,237,0.08)] flex flex-col gap-2">
              <span className="font-mono text-[9px] text-[#666] uppercase tracking-widest">
                VERIFIED TWIN BASELINE HASH:
              </span>
              <code className="font-mono text-xs text-[#C5A059] break-all select-all">
                {specimen.digitalTwin.baselineHash}
              </code>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#888]">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>GEOMETRY SEALS COMPATIBLE WITH PHYSICAL WEIGH-IN</span>
              </div>
              <span className="text-[#666]">ATTESTED BY APP SCIENTIFIC COUNCIL</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
