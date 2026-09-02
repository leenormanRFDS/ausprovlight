import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Compass, Layers, Eye, Mountain, Home as HomeIcon, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import matrixImg from '../../public/images/2d matrix.png';
import twinImg from '../../public/images/3d Twin.png';
import sideImg from '../../public/images/L Side.png';

interface StoryChapter {
  id: string;
  chapterNumber: string;
  title: string;
  timeframe: string;
  headline: string;
  narrative: string;
  visualImage: string;
  visualTag: string;
  keyFacts: { label: string; value: string }[];
  route: string;
  routeLabel: string;
}

const CHAPTERS: StoryChapter[] = [
  {
    id: 'CHAPTER_01',
    chapterNumber: 'CHAPTER 01',
    title: 'Deep Time & The Cretaceous Sea',
    timeframe: '115,000,000 YEARS AGO',
    headline: 'Marine reptiles and prehistoric seabed mudstone transformed into the world\'s rarest matrix opal.',
    narrative:
      'Central Australia was submerged beneath the icy Eromanga Inland Sea. Over millions of years, silica-rich solutions percolated through decomposing marine fossils and quartzite boulders (known locally as "painted ladies"), depositing rainbow diffraction spheres inside the dark host stone.',
    visualImage: matrixImg,
    visualTag: 'AUTHENTIC ANDAMOOKA MATRIX OPAL // 2D REFRACTOMETRY',
    keyFacts: [
      { label: 'STRATIGRAPHY', value: 'Bulldog Shale // Marree Subgroup' },
      { label: 'ELEMENTAL MATRIX', value: 'SiO₂·nH₂O + Fe/Zr signatures' },
      { label: 'FORMATION MECHANISM', value: 'Silica colloid precipitation' },
    ],
    route: '/opal',
    routeLabel: 'INSPECT SCIENTIFIC LAB',
  },
  {
    id: 'CHAPTER_02',
    chapterNumber: 'CHAPTER 02',
    title: '1930 — Hand-Hewn Subterranean Living',
    timeframe: 'DISCOVERED 1930 // GERMAN GULLY',
    headline: 'Two boundary riders discovered opal during a dust storm. A subterranean town was born.',
    narrative:
      'To survive summer surface temperatures exceeding 50°C, frontier miners carved entire homes, churches, and meeting halls directly into the sandstone hillside. These dugout dwellings represent Australia\'s most unique vernacular architecture—a living community built within the rock itself.',
    visualImage: sideImg,
    visualTag: 'HISTORIC GERMAN GULLY SHAFT & DUGOUT HORIZON',
    keyFacts: [
      { label: 'VERNACULAR ARCHITECTURE', value: 'Subterranean Dugout Living' },
      { label: 'CLIMATE RESILIENCE', value: 'Constant 22°C year-round thermal mass' },
      { label: 'CULTURAL CONTINUITY', value: 'Kokatha country & 90-year mining heritage' },
    ],
    route: '/town',
    routeLabel: 'EXPLORE SPATIAL LiDAR TWIN',
  },
  {
    id: 'CHAPTER_03',
    chapterNumber: 'CHAPTER 03',
    title: 'Miner-Side Provenance & Global Continuity',
    timeframe: 'PRESENT DAY // AOSA-2024 STANDARD',
    headline: 'Connecting the miner\'s pick directly to a collector in Munich with an 8.5% civic dividend.',
    narrative:
      'Each stone is scanned at the shaft mouth with 20µm photogrammetry and micro-XRF spectrometry. When an international collector acquires an authentic physical specimen, the digital twin verifies its origin while automatically remitting civic royalties back into town infrastructure and water projects.',
    visualImage: twinImg,
    visualTag: '3D TWIN PHOTOGRAMMETRY RECONSTRUCTION',
    keyFacts: [
      { label: 'RESOLUTION', value: '20-Micron Surface Geometry' },
      { label: 'ECONOMIC RETURN', value: '8.5% Civic Preservation Royalty' },
      { label: 'VALUATION PROTOCOL', value: 'Community consensus grading (AOSA-2024)' },
    ],
    route: '/tourism',
    routeLabel: 'DISCOVER REMOTE TOURISM',
  },
];

export const AndamookaDemonstrator: React.FC = () => {
  const [activeChapterId, setActiveChapterId] = useState<string>('CHAPTER_01');
  const activeChapter = CHAPTERS.find((c) => c.id === activeChapterId) || CHAPTERS[0];

  return (
    <section id="andamooka-proof" className="py-24 border-b border-[rgba(242,240,235,0.06)]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 text-[9px] font-mono-tech tracking-[0.25em] text-[#C5A059] uppercase mb-3">
            <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>02 // THE FIRST REAL-WORLD PROOF</span>
          </div>
          <h2 className="font-display font-light text-3xl sm:text-5xl text-[#F5F3ED] tracking-[0.12em] uppercase leading-tight">
            Andamooka, South Australia
          </h2>
        </div>
        <p className="font-serif-editorial italic text-base sm:text-lg text-[#A39E93] max-w-md leading-relaxed">
          Andamooka is not the limitation of the system. It is the premier real-world proof. Opal is the first asset.
        </p>
      </div>

      {/* Chapter Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
        {CHAPTERS.map((chap) => {
          const isSelected = chap.id === activeChapterId;
          return (
            <button
              key={chap.id}
              onClick={() => setActiveChapterId(chap.id)}
              className={`p-4 sm:p-5 text-left border transition-all duration-300 relative ${
                isSelected
                  ? 'border-[#C5A059] bg-[#15130D] text-[#F5F3ED] shadow-[0_0_20px_rgba(197,160,89,0.1)]'
                  : 'border-[rgba(242,240,235,0.06)] bg-[#0A0907] text-[#777] hover:border-[rgba(197,160,89,0.3)] hover:text-[#CCC]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C5A059]" />
              )}
              <div className="flex items-center justify-between text-[8px] font-mono-tech mb-2">
                <span className={isSelected ? 'text-[#C5A059]' : 'text-[#666]'}>
                  {chap.chapterNumber}
                </span>
                <span className="text-[#888]">{chap.timeframe.split('//')[0]}</span>
              </div>
              <h3 className="font-display font-light text-base sm:text-lg tracking-[0.1em] uppercase">
                {chap.title}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Cinematic Chapter Canvas */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeChapter.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 bg-gradient-to-b from-[#0F0D09] to-[#070605] border border-[rgba(197,160,89,0.2)] rounded"
        >
          {/* Left: Narrative & Key Facts */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3 text-[9px] font-mono-tech tracking-[0.2em] text-[#C5A059] uppercase">
              <span>{activeChapter.timeframe}</span>
            </div>

            <h3 className="font-display font-light text-2xl sm:text-4xl text-[#F5F3ED] tracking-[0.1em] uppercase leading-snug">
              {activeChapter.headline}
            </h3>

            <p className="font-serif-editorial text-base sm:text-lg text-[#C7C2B5] leading-relaxed">
              {activeChapter.narrative}
            </p>

            {/* Clean Key Facts Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {activeChapter.keyFacts.map((fact, idx) => (
                <div key={idx} className="p-3 bg-[#060604] border border-[rgba(242,240,235,0.06)] rounded">
                  <span className="text-[7px] font-mono-tech text-[#888] uppercase tracking-wider block mb-1">
                    {fact.label}
                  </span>
                  <span className="font-mono-tech text-[10px] text-[#F5F3ED] font-semibold block leading-tight">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to={activeChapter.route}
                className="px-5 py-3 bg-[#C5A059] text-[#070605] font-mono-tech text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#D4B26F] transition-all flex items-center gap-2 rounded-sm"
              >
                <span>{activeChapter.routeLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/heritage"
                className="px-5 py-3 bg-[#11100C] border border-[rgba(242,240,235,0.15)] hover:border-[#C5A059] text-[#AAA] hover:text-[#FFF] font-mono-tech text-[10px] tracking-[0.2em] uppercase transition-all rounded-sm"
              >
                LIVING HERITAGE ARCHIVE
              </Link>
            </div>
          </div>

          {/* Right: Visual Specimen / Photographic View */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            <div className="relative w-full aspect-square max-h-[380px] bg-[#070605] border border-[rgba(197,160,89,0.3)] rounded overflow-hidden flex items-center justify-center p-4 group">
              <img
                src={activeChapter.visualImage}
                alt={activeChapter.title}
                className="w-full h-full object-contain filter drop-shadow-[0_10px_30px_rgba(197,160,89,0.2)] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1.5 bg-[#070605]/90 backdrop-blur-sm border border-[rgba(242,240,235,0.08)] text-[7px] font-mono-tech text-[#888] tracking-wider uppercase text-center truncate">
                {activeChapter.visualTag}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
