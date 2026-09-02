import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TheFutureHorizon: React.FC = () => {
  const futureDomains = [
    {
      domainNum: '01',
      title: 'Indigenous Art & Cultural Heritage',
      desc: 'Sovereign provenance recording for sacred ochres, bark paintings, and cultural songlines with strict Traditional Custodian consent.',
    },
    {
      domainNum: '02',
      title: 'Old-Growth Australian Timber',
      desc: 'Chain of custody verification from sustainable permits through master architectural fabrication.',
    },
    {
      domainNum: '03',
      title: 'Single-Vineyard Terroir',
      desc: 'Isotopic soil analysis and climate micro-terroir verified from vineyard row to private cellar.',
    },
    {
      domainNum: '04',
      title: 'Frontier Town Regeneration',
      desc: 'Digital twins, spatial archives, and direct civic economic renewal for remote mining and pastoral settlements.',
    },
  ];

  return (
    <section className="py-24 border-b border-[rgba(242,240,235,0.06)]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 text-[9px] font-mono-tech tracking-[0.25em] text-[#C5A059] uppercase mb-3">
            <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>06 // THE NATIONAL HORIZON</span>
          </div>
          <h2 className="font-display font-light text-3xl sm:text-5xl text-[#F5F3ED] tracking-[0.12em] uppercase leading-tight">
            Beyond Andamooka.
          </h2>
        </div>
        <p className="font-serif-editorial italic text-base sm:text-lg text-[#A39E93] max-w-md leading-relaxed">
          Andamooka is the premier proof. The Australian Provenance Project is an extensible system capable of uncovering and protecting value across people, places, and assets worldwide.
        </p>
      </div>

      {/* 4 Clean Editorial Domain Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {futureDomains.map((domain) => (
          <div
            key={domain.domainNum}
            className="p-6 border border-[rgba(242,240,235,0.06)] bg-[#0A0907] hover:border-[rgba(197,160,89,0.3)] transition-all flex flex-col justify-between rounded group"
          >
            <div>
              <span className="font-mono-tech text-[8px] text-[#C5A059] tracking-[0.25em] uppercase block mb-3">
                DOMAIN {domain.domainNum} //
              </span>
              <h3 className="font-display font-light text-lg text-[#F5F3ED] tracking-[0.08em] uppercase mb-2">
                {domain.title}
              </h3>
              <p className="font-serif-editorial italic text-xs text-[#888] leading-relaxed">
                {domain.desc}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[rgba(242,240,235,0.04)] font-mono-tech text-[7px] text-[#555] tracking-[0.2em] uppercase">
              UNIVERSAL SCHEMA CONTINUITY
            </div>
          </div>
        ))}
      </div>

      {/* Clean Institutional Foundation Box */}
      <div className="p-8 sm:p-12 bg-gradient-to-b from-[#110F0A] to-[#070605] border border-[rgba(197,160,89,0.25)] rounded flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="max-w-2xl space-y-4">
          <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#8FA382] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FA382]" />
            <span>AUSTRALIAN PROVENANCE PROJECT FOUNDATION</span>
          </div>
          <h3 className="font-display font-light text-2xl sm:text-3xl text-[#F5F3ED] tracking-[0.1em] uppercase leading-tight">
            An Open Architecture For Human Value.
          </h3>
          <p className="font-serif-editorial text-sm sm:text-base text-[#B3AEA3] leading-relaxed">
            Co-founded by Lee Norman, Matt Kathagen, and an interdisciplinary studio across geology, creative technology, and regional community governance. We invite collectors, researchers, and cultural custodians to participate.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/opal"
            className="px-6 py-3.5 bg-[#C5A059] text-[#070605] font-mono-tech text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#D4B26F] transition-all rounded"
          >
            INSPECT 3D TWIN LAB
          </Link>
          <Link
            to="/heritage"
            className="px-6 py-3.5 bg-[#12110D] border border-[rgba(197,160,89,0.3)] hover:border-[#C5A059] text-[#C5A059] hover:text-[#FFF] font-mono-tech text-[10px] tracking-[0.2em] uppercase transition-all rounded"
          >
            HERITAGE ARCHIVE
          </Link>
        </div>
      </div>
    </section>
  );
};
