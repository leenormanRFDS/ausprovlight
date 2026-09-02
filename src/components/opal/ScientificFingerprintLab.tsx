import React, { useState } from 'react';
import { ScientificFingerprintData } from '../../types/provenanceObject';
import { 
  Sparkles, 
  Activity, 
  FlaskConical, 
  ShieldCheck, 
  Sliders, 
  Info,
  CheckCircle2,
  FileCode,
  Gauge
} from 'lucide-react';

interface ScientificFingerprintLabProps {
  science: ScientificFingerprintData;
}

export function ScientificFingerprintLab({ science }: ScientificFingerprintLabProps) {
  const [selectedElement, setSelectedElement] = useState<string>(science.elements[0].symbol);

  const activeElement = science.elements.find((e) => e.symbol === selectedElement) || science.elements[0];

  return (
    <div id="scientific-fingerprint" className="w-full flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-[rgba(245,243,237,0.1)] pb-8">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-[#C5A059]" />
          <span className="font-mono text-xs tracking-[0.25em] text-[#C5A059] uppercase">
            SECTION 03 // SCIENTIFIC FINGERPRINTING & EVIDENCE
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F5F3ED] font-light tracking-tight">
              SCIENTIFIC FINGERPRINT LAB
            </h2>
            <p className="font-serif italic text-lg sm:text-xl text-[#C5A059] mt-2">
              Every stone carries measurable physical and elemental evidence.
            </p>
          </div>

          {/* Diagnostic Certification Tag */}
          <div className="flex items-center gap-2 bg-[#0c0c0c] border border-emerald-500/30 text-emerald-400 px-3.5 py-2 rounded-lg text-xs font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>FIELD CALIBRATION: VERIFIED NATURAL UNTREATED</span>
          </div>
        </div>

        <p className="font-sans text-sm text-[#AAA] max-w-3xl leading-relaxed mt-2">
          Rather than relying solely on human opinion or subjective appraisal, APP captures miner-side scientific baselines directly at the shaft mouth. Portable X-ray Fluorescence (pXRF), refractive spectroscopy, and precision mass measurements form an unforgeable material record.
        </p>
      </div>

      {/* Main Interactive Grid: Spectrum Chart + Elemental Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive pXRF Spectral Composition Visualizer */}
        <div className="lg:col-span-7 bg-[#0a0a0a] border border-[rgba(245,243,237,0.1)] rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center justify-between border-b border-[rgba(245,243,237,0.08)] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#C5A059]" />
                <span className="font-mono text-xs text-[#F5F3ED] tracking-wider uppercase">
                  pXRF ELEMENTAL ENERGY SPECTRUM
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#777]">
                DEVICE: {science.spectrometerModel.split(' ')[0]} FIELD XRF
              </span>
            </div>

            {/* Custom SVG Elemental Spectrum Graph */}
            <div className="relative w-full h-48 bg-[#050505] rounded-xl p-4 border border-[rgba(245,243,237,0.06)] flex flex-col justify-end overflow-hidden">
              {/* Spectrum Grid Lines */}
              <div className="absolute inset-0 grid grid-rows-4 grid-cols-6 pointer-events-none opacity-10">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="border-b border-r border-[#FFF]" />
                ))}
              </div>

              {/* Energy Spectrum Visual Waveform */}
              <svg className="w-full h-36 overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                {/* Continuous Basal Noise Wave */}
                <path
                  d="M0,115 Q40,112 80,114 T160,110 T240,113 T320,111 T400,114 T500,115"
                  fill="none"
                  stroke="#333"
                  strokeWidth="1.5"
                />

                {/* Elemental Emission Peak Lines */}
                {science.elements.map((elem, i) => {
                  const xPos = Math.min(480, Math.max(30, (elem.spectralPeakKev / 18) * 460 + 20));
                  const isSelected = elem.symbol === selectedElement;
                  const peakHeight = isSelected ? 95 : 65 + (i % 3) * 10;

                  return (
                    <g key={elem.symbol} className="cursor-pointer" onClick={() => setSelectedElement(elem.symbol)}>
                      {/* Peak Vertical Line */}
                      <line
                        x1={xPos}
                        y1={115}
                        x2={xPos}
                        y2={115 - peakHeight}
                        stroke={isSelected ? '#C5A059' : '#444'}
                        strokeWidth={isSelected ? '3' : '1.5'}
                        strokeDasharray={isSelected ? 'none' : '2,2'}
                      />
                      {/* Peak Glowing Pip */}
                      <circle
                        cx={xPos}
                        cy={115 - peakHeight}
                        r={isSelected ? 5 : 3.5}
                        fill={isSelected ? '#C5A059' : '#059669'}
                        className="transition-all"
                      />
                      {/* Element Label on Peak */}
                      <text
                        x={xPos}
                        y={115 - peakHeight - 8}
                        textAnchor="middle"
                        fill={isSelected ? '#C5A059' : '#888'}
                        fontSize="9"
                        fontFamily="monospace"
                      >
                        {elem.symbol} ({elem.spectralPeakKev} keV)
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="flex justify-between items-center text-[9px] font-mono text-[#555] mt-2 pt-2 border-t border-[rgba(245,243,237,0.06)]">
                <span>0 keV [EMISSION BASELINE]</span>
                <span>ENERGY HARVEST RANGE [1.0 keV - 18.0 keV]</span>
                <span>20 keV</span>
              </div>
            </div>

            {/* Element Selector Pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {science.elements.map((elem) => {
                const isSelected = elem.symbol === selectedElement;
                return (
                  <button
                    key={elem.symbol}
                    onClick={() => setSelectedElement(elem.symbol)}
                    className={`font-mono text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-[#C5A059] text-[#050505] font-bold border-[#C5A059]'
                        : 'bg-[#121212] text-[#888] hover:text-[#DDD] border-[rgba(245,243,237,0.08)]'
                    }`}
                  >
                    {elem.symbol} ({elem.percentageWeight})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Element Geochemical Dossier */}
          <div className="bg-[#050505] p-5 rounded-xl border border-[rgba(245,243,237,0.08)] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#C5A059] font-bold uppercase">
                {activeElement.element} [{activeElement.symbol}]
              </span>
              <span className="font-mono text-xs text-[#F5F3ED]">
                CONCENTRATION: {activeElement.percentageWeight} ({activeElement.valuePpm} ppm)
              </span>
            </div>
            <p className="font-sans text-xs text-[#AAA] leading-relaxed mt-1">
              {activeElement.geologicalSignificance}
            </p>
          </div>
        </div>

        {/* Right: Optical & Structural Lab Measurements */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div className="bg-[#0a0a0a] border border-[rgba(245,243,237,0.1)] rounded-2xl p-6 flex flex-col gap-5">
            <div className="flex items-center gap-2 border-b border-[rgba(245,243,237,0.08)] pb-3">
              <Gauge className="w-4 h-4 text-[#C5A059]" />
              <span className="font-mono text-xs text-[#F5F3ED] tracking-wider uppercase">
                OPTICAL & MATERIAL BASELINES
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-3 bg-[#111] rounded-lg border border-[rgba(245,243,237,0.06)]">
                <div>
                  <span className="font-mono text-[9px] text-[#777] uppercase block">REFRACTIVE INDEX</span>
                  <span className="font-mono text-sm font-bold text-[#F5F3ED]">
                    n = {science.refractiveIndex.value} ± {science.refractiveIndex.tolerance}
                  </span>
                </div>
                <span className="font-mono text-[9px] text-[#888] bg-[#050505] px-2 py-1 rounded">Sodium D-Line</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#111] rounded-lg border border-[rgba(245,243,237,0.06)]">
                <div>
                  <span className="font-mono text-[9px] text-[#777] uppercase block">SPECIFIC GRAVITY</span>
                  <span className="font-mono text-sm font-bold text-[#F5F3ED]">
                    {science.specificGravity.value} g/cm³
                  </span>
                </div>
                <span className="font-mono text-[9px] text-[#888] bg-[#050505] px-2 py-1 rounded">Archimedes Hydro</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#111] rounded-lg border border-[rgba(245,243,237,0.06)]">
                <div>
                  <span className="font-mono text-[9px] text-[#777] uppercase block">SILICA LATTICE SPACING</span>
                  <span className="font-mono text-sm font-bold text-[#C5A059]">
                    d ≈ {science.silicaLatticeSpacingNm} nm
                  </span>
                </div>
                <span className="font-mono text-[9px] text-[#888] bg-[#050505] px-2 py-1 rounded">Photonic Array</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#111] rounded-lg border border-[rgba(245,243,237,0.06)]">
                <div>
                  <span className="font-mono text-[9px] text-[#777] uppercase block">TREATMENT CLASSIFICATION</span>
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    {science.treatmentClassification.replace(/_/g, ' ')}
                  </span>
                </div>
                <span className="font-mono text-[9px] text-emerald-500/80 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-500/30">
                  GENUINE ROUGH
                </span>
              </div>
            </div>
          </div>

          {/* Cryptographic Attestation Block */}
          <div className="bg-[#0c0c0c] border border-[rgba(245,243,237,0.08)] rounded-xl p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#888]">
              <FileCode className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>MINER-SIDE ATTESTATION RECEIPT:</span>
            </div>
            <code className="font-mono text-[10px] text-[#C5A059] bg-[#050505] p-2.5 rounded border border-[rgba(245,243,237,0.06)] break-all select-all">
              {science.cryptographicSignature}
            </code>
            <span className="font-mono text-[9px] text-[#555] mt-1">
              Field evidence calibrated against standard silica protocols. Demonstrator telemetry.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
