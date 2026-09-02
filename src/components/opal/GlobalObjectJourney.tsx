import React from 'react';
import { ProvenanceObjectData } from '../../types/provenanceObject';
import { 
  Globe2, 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Send, 
  HeartHandshake, 
  Building, 
  Compass,
  Layers,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface GlobalObjectJourneyProps {
  specimen: ProvenanceObjectData;
}

export function GlobalObjectJourney({ specimen }: GlobalObjectJourneyProps) {
  const steps = [
    {
      label: 'DISCOVER',
      title: 'Global Discovery in XR',
      desc: 'A collector in Frankfurt explores the Andamooka digital twin, descends virtually into Lunatic Field, and inspects Specimen 001 in 3D.',
      location: 'Frankfurt, Germany',
    },
    {
      label: 'EXAMINE',
      title: 'Inspect 3D Twin & Provenance',
      desc: 'Review the miner-side XRF spectroscopy, the 20µm photogrammetry mesh, and the Kokatha cultural protocol on the immutable ledger.',
      location: 'Digital Provenance Vault',
    },
    {
      label: 'ACQUIRE',
      title: 'Physical RWA Settlement',
      desc: 'Acquire legal title to the real physical specimen. The physical stone in Andamooka is transferred to insured international logistics.',
      location: 'Primary Escrow Vault',
    },
    {
      label: 'DELIVER',
      title: 'Physical Delivery with NFC',
      desc: 'The stone arrives in Germany enclosed in tamper-evident packaging with cryptographic NFC chips mirroring the digital twin.',
      location: 'Frankfurt Private Collection',
    },
    {
      label: 'REINVEST',
      title: '7.5% Community Dividend',
      desc: '7.5% of the transaction is automatically routed to the Andamooka Community Heritage Trust to restore pioneer dugouts and support Kokatha youth projects.',
      location: 'Andamooka Civic Trust',
    },
  ];

  return (
    <div id="global-journey" className="w-full flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-[rgba(245,243,237,0.1)] pb-8">
        <div className="flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-[#C5A059]" />
          <span className="font-mono text-xs tracking-[0.25em] text-[#C5A059] uppercase">
            SECTION 06 // FROM STONE TO GLOBAL OBJECT
          </span>
        </div>

        <div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F5F3ED] font-light tracking-tight">
            FROM ANDAMOOKA TO THE WORLD
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[#C5A059] mt-2">
            The object can travel across oceans. Its story does not have to be lost.
          </p>
        </div>

        <p className="font-sans text-sm text-[#AAA] max-w-3xl leading-relaxed mt-2">
          When physical things possess persistent digital twins and verified provenance, geographical isolation ceases to be a barrier. A specimen mined in the South Australian outback can establish a profound, transparent relationship with a custodian on the other side of the planet.
        </p>
      </div>

      {/* The 5-Step Continuum Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map((step, idx) => (
          <div
            key={step.label}
            className="bg-[#090909] border border-[rgba(245,243,237,0.08)] rounded-xl p-5 flex flex-col justify-between relative group hover:border-[#C5A059]/50 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[9px] font-bold text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded">
                  0{idx + 1} // {step.label}
                </span>
                {idx < steps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-[#555] hidden md:block" />
                )}
              </div>
              <h3 className="font-display text-base text-[#F5F3ED] font-normal mb-2">
                {step.title}
              </h3>
              <p className="font-sans text-xs text-[#888] leading-relaxed mb-4">
                {step.desc}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#666] border-t border-[rgba(245,243,237,0.06)] pt-3">
              <MapPin className="w-3 h-3 text-[#C5A059]" />
              <span>{step.location}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Final Synthesizing Monograph: "Could this work for anything?" */}
      <div className="bg-gradient-to-r from-[#12100d] via-[#0d0c0a] to-[#0a0a0a] border border-[#C5A059]/30 rounded-2xl p-8 sm:p-12 flex flex-col items-center text-center gap-6 relative overflow-hidden">
        <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
          <Sparkles className="w-6 h-6" />
        </div>

        <div className="max-w-2xl flex flex-col gap-3">
          <span className="font-mono text-xs text-[#C5A059] tracking-[0.25em] uppercase">
            THE GENERALISABLE PROPOSITION
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-[#F5F3ED] font-light leading-snug">
            “Could this work for anything?”
          </h3>
          <p className="font-sans text-sm sm:text-base text-[#D4D0C5] leading-relaxed">
            Andamooka is not the limitation of the system—it is the first proof. The same architecture connecting this matrix opal to its miner and geology can uncover and preserve the provenance of handcrafted instruments, agricultural terroir, heritage architecture, and indigenous cultural creations across Australia.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <Link
            to="/project"
            className="font-mono text-xs tracking-wider bg-[#C5A059] text-[#050505] font-semibold px-6 py-3 rounded-lg hover:bg-[#d6b268] transition-colors"
          >
            EXPLORE THE MASTER PROJECT ARCHITECTURE
          </Link>
          <Link
            to="/pillars"
            className="font-mono text-xs tracking-wider bg-[#141414] text-[#F5F3ED] border border-[rgba(245,243,237,0.15)] px-6 py-3 rounded-lg hover:bg-[#222] transition-colors"
          >
            DISCOVER THE FIVE LIVING PILLARS
          </Link>
        </div>
      </div>
    </div>
  );
}
