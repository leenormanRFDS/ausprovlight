import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Landmark, ArrowRight, Sparkles, BookOpen, Layers } from 'lucide-react';
import { FIVE_PILLARS_DATA } from '../../data/fivePillarsData';
import { ProvenanceBadge } from '../design-system/ProvenanceBadge';
import { ActionTrigger } from '../design-system/ActionTrigger';
import { StatusPip } from '../design-system/StatusPip';
import { PillarConnectionBridge } from './PillarConnectionBridge';

interface PillarHeritageProps {
  onSelectPillar: (pillarId: 'community' | 'opal' | 'town' | 'tourism' | 'heritage') => void;
}

export const PillarHeritage: React.FC<PillarHeritageProps> = ({ onSelectPillar }) => {
  const data = FIVE_PILLARS_DATA.heritage;
  const [activeArchiveRecord, setActiveArchiveRecord] = useState<'log_1933' | 'oral_1952' | 'kokatha_lore'>('log_1933');

  const archives = {
    log_1933: {
      code: 'DOC-1933-08',
      title: 'Roy Shepherd Post-Storm Field Journal',
      date: 'AUGUST 14, 1933',
      excerpt: '“After three days of howling red dust, we walked the ridge at German Gully. Sunlight hit the washaway and there it was—flashing green and peacock blue right on the gravel surface. We staked the claim before sunset.”',
      provenanceStamp: 'State Heritage Registered Document #14802',
    },
    oral_1952: {
      code: 'AUDIO-1952-V04',
      title: 'Oral History: Dugout Carving by Hand',
      date: 'SEPTEMBER 1952',
      excerpt: '“You’d swing the pick into the soft white sandstone. Once you reached eight feet down, the summer heat dropped twenty degrees. It wasn’t luxury, but it was home when the thermometer hit 115 in the shade.”',
      provenanceStamp: 'Andamooka Historical Society Archive',
    },
    kokatha_lore: {
      code: 'CULT-KOKATHA-01',
      title: 'Kokatha Custodianship & Deep-Time Lore',
      date: 'TIME IMMEMORIAL',
      excerpt: '“The ancient inland sea left its bones and fire in the earth. The desert is not empty; every sandstone ridge and water soak carries a memory of ancient journeys and ancestral respect.”',
      provenanceStamp: 'Kokatha Cultural Consent Protocol',
    },
  };

  const currentArchive = archives[activeArchiveRecord];

  return (
    <div className="flex flex-col gap-12 font-mono-tech">
      {/* 1. Header Banner */}
      <div className="p-8 sm:p-12 border border-[#C47D68] bg-[#140D0A] crosshair-corner relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[rgba(196,125,104,0.12)] to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono-tech tracking-[0.3em] text-[#C47D68] uppercase">
              PILLAR {data.index} // {data.personality.toUpperCase()}
            </span>
            <span className="opacity-40">|</span>
            <ProvenanceBadge level={data.badgeLevel} label="ORAL HISTORY & PIONEER ARCHIVE" />
          </div>
          <StatusPip status="verified" label="KOKATHA PROTOCOL ACTIVE" />
        </div>

        <h2 className="font-display font-light text-3xl sm:text-5xl lg:text-6xl text-[#F5F3ED] tracking-[0.14em] uppercase mb-4 leading-tight">
          {data.name}
        </h2>
        <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#E8D1CB] max-w-3xl leading-relaxed mb-6">
          "{data.tagline}"
        </p>
        <span className="text-[11px] font-mono-tech text-[#C47D68] tracking-[0.2em] uppercase block">
          {data.subtitle}
        </span>
      </div>

      {/* Living Archive Featured Demonstrator Callout */}
      <div className="p-6 sm:p-8 bg-[#0D0907] border border-[#C47D68] rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_0_20px_rgba(196,125,104,0.15)]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] text-[#C47D68] tracking-[0.25em] uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE LIVING ARCHIVE ENGINE</span>
          </div>
          <h3 className="font-display font-light text-xl sm:text-2xl text-[#F5F3ED] uppercase">
            Experience the <span className="text-[#C47D68] italic font-serif">Living Archive of Evidence</span>
          </h3>
          <p className="text-xs text-[#A89F91] font-sans max-w-2xl leading-relaxed">
            Move through the six connective strata: <strong>PERSON → HOME → STORY → BUILDING → TOWN → TIME</strong>. Explore sub-millimeter 3D photogrammetry, binaural oral histories, and community consensus provenance.
          </p>
        </div>

        <Link
          to="/heritage"
          className="px-6 py-3 bg-[#C47D68] text-[#0A0706] font-bold text-xs hover:bg-[#D9917D] rounded flex items-center justify-center gap-2 transition-all uppercase whitespace-nowrap flex-shrink-0"
        >
          <Landmark className="w-4 h-4" />
          <span>ENTER LIVING ARCHIVE</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 2. Structured Answers: What is it? & Why does it matter? */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 p-8 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] flex flex-col justify-between crosshair-corner">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#C47D68] tracking-[0.25em] uppercase mb-4">
              <span className="w-3 h-[1px] bg-[#C47D68]"></span>
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
            <span className="text-[#C47D68] block uppercase mb-1">CORE ARCHIVAL MECHANISM:</span>
            {data.whatIsIt.coreMechanism}
          </div>
        </div>

        <div className="lg:col-span-6 p-8 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] flex flex-col justify-between crosshair-corner">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#C47D68] tracking-[0.25em] uppercase mb-4">
              <span className="w-3 h-[1px] bg-[#C47D68]"></span>
              <span>02 // WHY DOES IT MATTER?</span>
            </div>
            <h3 className="font-display font-light text-xl sm:text-2xl text-[#F5F3ED] tracking-[0.14em] uppercase mb-4">
              {data.whyDoesItMatter.statement}
            </h3>
            <p className="font-serif-editorial italic text-sm sm:text-base text-[#B0AAA0] leading-relaxed mb-6">
              {data.whyDoesItMatter.elaboration}
            </p>
          </div>
          <div className="p-4 bg-[#180E0A] border border-[rgba(196,125,104,0.3)] text-[10px] font-serif-editorial italic text-[#E8D1CB]">
            {data.whyDoesItMatter.impactQuote}
          </div>
        </div>
      </div>

      {/* 3. Interactive Archival Artifact: Field Journal & Oral Testimony Archive */}
      <div className="p-8 sm:p-10 border border-[#C47D68] bg-[#140D0A] crosshair-corner">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(196,125,104,0.25)] pb-6 mb-8">
          <div>
            <span className="text-[9px] font-mono-tech text-[#C47D68] tracking-[0.25em] uppercase block mb-1">
              HISTORICAL DISPATCH & ORAL TESTIMONY VAULT
            </span>
            <h3 className="font-display font-light text-2xl text-[#F5F3ED] tracking-[0.16em] uppercase">
              1930s Pioneer Dugout & Cultural Memory Archive
            </h3>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#A09B90]">
            <span>VAULT RECORD #14802</span>
            <span className="opacity-40">|</span>
            <span className="text-[#C47D68]">STATE HERITAGE REGISTERED</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Archive Switcher */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-[10px] font-mono-tech tracking-[0.2em] text-[#C47D68] uppercase">
              SELECT ARCHIVAL ARTIFACT:
            </span>
            <div className="flex flex-col gap-2">
              {[
                { id: 'log_1933', label: '1933 // ROY SHEPHERD FIELD LOG' },
                { id: 'oral_1952', label: '1952 // DUGOUT CARVING TESTIMONY' },
                { id: 'kokatha_lore', label: 'ANCIENT // KOKATHA CUSTODIANSHIP' },
              ].map((rec) => (
                <button
                  key={rec.id}
                  onClick={() => setActiveArchiveRecord(rec.id as any)}
                  className={`p-3 text-left font-mono-tech text-xs tracking-[0.15em] border transition-all ${
                    activeArchiveRecord === rec.id
                      ? 'border-[#C47D68] bg-[#C47D68] text-[#0A0A08] font-bold'
                      : 'border-[rgba(242,240,235,0.08)] bg-[#080806] text-[#888] hover:text-[#F5F3ED]'
                  }`}
                >
                  {rec.label}
                </button>
              ))}
            </div>
          </div>

          {/* Archive Content */}
          <div className="lg:col-span-7 p-6 border border-[rgba(242,240,235,0.08)] bg-[#0A0807] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[9px] font-mono-tech text-[#C47D68] mb-2">
                <span>{currentArchive.code}</span>
                <span>{currentArchive.date}</span>
              </div>
              <h4 className="font-display font-light text-lg text-[#F5F3ED] tracking-[0.14em] uppercase mb-4">
                {currentArchive.title}
              </h4>
              <blockquote className="font-serif-editorial italic text-sm text-[#D8CDC8] leading-relaxed mb-6 border-l-2 border-[#C47D68] pl-4">
                {currentArchive.excerpt}
              </blockquote>
              <div className="p-3 bg-[#0D0A08] border border-[rgba(196,125,104,0.2)] text-[9px] font-mono-tech text-[#AAA]">
                PROVENANCE ATTESTATION: {currentArchive.provenanceStamp}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[rgba(242,240,235,0.06)] flex items-center justify-between text-[9px] font-mono-tech">
              <span className="text-[#666]">CROSS-PILLAR SYNERGY:</span>
              <span className="text-[#C5A059]">INFORMS COMMUNITY CONSENSUS STANDARD</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. What we are doing in Andamooka */}
      <div className="p-8 sm:p-10 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] crosshair-corner">
        <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#C47D68] tracking-[0.25em] uppercase mb-4">
          <span className="w-3 h-[1px] bg-[#C47D68]"></span>
          <span>03 // WHAT ARE WE DOING IN ANDAMOOKA?</span>
        </div>
        <h3 className="font-display font-light text-2xl text-[#F5F3ED] tracking-[0.16em] uppercase mb-3">
          Preserving Pioneer Dugouts & Oral Memories
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
                  <span className="text-[#C47D68] tracking-[0.2em]">INITIATIVE</span>
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
        currentPillarName="HERITAGE"
        connections={data.howItConnects.primaryBridges}
        onSelectPillar={onSelectPillar}
      />

      {/* 6. What Becomes Possible Beyond Andamooka */}
      <div className="p-8 sm:p-10 border border-[rgba(242,240,235,0.08)] bg-[#0A0A08] crosshair-corner">
        <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#C47D68] tracking-[0.25em] uppercase mb-4">
          <span className="w-3 h-[1px] bg-[#C47D68]"></span>
          <span>05 // WHAT BECOMES POSSIBLE BEYOND ANDAMOOKA?</span>
        </div>
        <h3 className="font-display font-light text-2xl text-[#F5F3ED] tracking-[0.16em] uppercase mb-3">
          Endangered Cultural Memory Archiving
        </h3>
        <p className="font-serif-editorial italic text-base text-[#AAA] mb-8 max-w-3xl">
          {data.whatBecomesPossibleBeyond.vision}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.whatBecomesPossibleBeyond.applications.map((app) => (
            <div key={app.domain} className="p-5 border border-[rgba(242,240,235,0.06)] bg-[#070706]">
              <span className="text-[9px] font-mono-tech text-[#C47D68] tracking-[0.2em] uppercase block mb-2">
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
