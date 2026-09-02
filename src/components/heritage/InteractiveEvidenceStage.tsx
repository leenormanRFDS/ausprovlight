import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EvidenceType, HeritageLivingArchiveNode } from '../../types/heritage';
import { 
  User, Home, BookOpen, Landmark, MapPin, Clock, 
  Play, Pause, Volume2, ShieldCheck, Thermometer, 
  Layers, Hammer, Compass, Eye, Sparkles, AlertTriangle, 
  ArrowRight, FileText, CheckCircle2, Award
} from 'lucide-react';
import { ProvenanceBadge } from '../design-system/ProvenanceBadge';
import { ActionTrigger } from '../design-system/ActionTrigger';
import { StatusPip } from '../design-system/StatusPip';

interface InteractiveEvidenceStageProps {
  node: HeritageLivingArchiveNode;
  activeEvidenceType: EvidenceType;
  onNextType: () => void;
  onPrevType: () => void;
  onSelectEvidenceType: (type: EvidenceType) => void;
}

export const InteractiveEvidenceStage: React.FC<InteractiveEvidenceStageProps> = ({
  node,
  activeEvidenceType,
  onNextType,
  onPrevType,
  onSelectEvidenceType,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeDugoutStratum, setActiveDugoutStratum] = useState<'CALCRETE' | 'SANDSTONE' | 'MUDSTONE'>('SANDSTONE');
  const [viewMode3D, setViewMode3D] = useState<'PHOTO' | 'POINT_CLOUD' | 'STABILIZATION_PLAN'>('POINT_CLOUD');
  const [timeEpochIndex, setTimeEpochIndex] = useState(0);

  const { person, home, story, building, town, time } = node;

  return (
    <div className="bg-[#080605] border border-[rgba(242,240,235,0.1)] rounded-xl overflow-hidden shadow-2xl font-mono-tech">
      {/* Top Evidence Stage Bar */}
      <div className="p-4 sm:p-6 bg-[#0E0A08] border-b border-[rgba(242,240,235,0.08)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-[rgba(196,125,104,0.15)] border border-[#C47D68] text-[#C47D68]">
            {activeEvidenceType === 'PERSON' && <User className="w-5 h-5" />}
            {activeEvidenceType === 'HOME' && <Home className="w-5 h-5" />}
            {activeEvidenceType === 'STORY' && <BookOpen className="w-5 h-5" />}
            {activeEvidenceType === 'BUILDING' && <Landmark className="w-5 h-5" />}
            {activeEvidenceType === 'TOWN' && <MapPin className="w-5 h-5" />}
            {activeEvidenceType === 'TIME' && <Clock className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2 text-[9px] text-[#C47D68] tracking-[0.25em] uppercase font-bold">
              <span>EVIDENCE CATEGORY // {activeEvidenceType}</span>
              <span>•</span>
              <span className="text-[#888]">{node.person.name}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-display font-light text-[#F5F3ED] uppercase tracking-wide">
              {activeEvidenceType === 'PERSON' && person.name}
              {activeEvidenceType === 'HOME' && home.name}
              {activeEvidenceType === 'STORY' && story.title}
              {activeEvidenceType === 'BUILDING' && building.name}
              {activeEvidenceType === 'TOWN' && town.name}
              {activeEvidenceType === 'TIME' && time.epochName}
            </h2>
          </div>
        </div>

        {/* Quick step forward/backward buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevType}
            className="px-3 py-1.5 bg-[#050404] border border-[rgba(242,240,235,0.1)] text-[#A89F91] text-xs hover:border-[#C47D68] hover:text-[#F5F3ED] rounded transition-all"
          >
            ← PREVIOUS STRATUM
          </button>
          <button
            onClick={onNextType}
            className="px-3 py-1.5 bg-[#C47D68] text-[#0A0706] font-bold text-xs hover:bg-[#D9917D] rounded transition-all flex items-center gap-1.5"
          >
            <span>NEXT STRATUM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Evidence Content Body */}
      <div className="p-6 sm:p-8 lg:p-10">
        <AnimatePresence mode="wait">
          {/* ======================= 1. PERSON EVIDENCE ======================= */}
          {activeEvidenceType === 'PERSON' && (
            <motion.div
              key="PERSON"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Profile Details */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[rgba(196,125,104,0.1)] border border-[rgba(196,125,104,0.3)] text-[#C47D68] text-[10px] uppercase font-bold rounded mb-3">
                      <User className="w-3 h-3" />
                      <span>{person.role}</span>
                    </div>
                    <h3 className="font-display font-light text-2xl sm:text-4xl text-[#F5F3ED] uppercase leading-tight mb-2">
                      {person.name}
                    </h3>
                    <div className="text-xs text-[#888] font-mono mb-6 flex items-center gap-3">
                      <span>LIFESPAN: {person.lifeSpan}</span>
                      <span>•</span>
                      <span>ERA: {person.era}</span>
                    </div>
                  </div>

                  {/* Verified Quote in serif typography */}
                  <blockquote className="p-6 bg-[#0E0A08] border-l-2 border-[#C47D68] rounded-r-lg">
                    <p className="font-serif-editorial italic text-lg sm:text-xl text-[#E8D1CB] leading-relaxed mb-3">
                      {person.quote}
                    </p>
                    <span className="text-[10px] text-[#A89F91] uppercase tracking-wider block">
                      — VERIFIED DIRECT RECORD
                    </span>
                  </blockquote>

                  {/* Biography */}
                  <div className="space-y-3">
                    <div className="text-[10px] text-[#C47D68] uppercase tracking-widest font-bold">
                      HISTORICAL CONTEXT & BIOGRAPHY
                    </div>
                    <p className="text-sm text-[#D4CDC5] font-sans leading-relaxed">
                      {person.biography}
                    </p>
                  </div>

                  {/* Connection to Place */}
                  <div className="p-4 bg-[#050404] border border-[rgba(242,240,235,0.06)] rounded space-y-1">
                    <div className="text-[9px] text-[#888] uppercase">PHYSICAL ANCHOR TO ANDAMOOKA:</div>
                    <p className="text-xs text-[#E8D1CB] font-sans">
                      {person.connectionToPlace}
                    </p>
                  </div>
                </div>

                {/* Right Evidence Dossier & Custodianship Badge */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="p-6 bg-[#0D0907] border border-[rgba(196,125,104,0.3)] rounded-lg space-y-5">
                    <div className="flex items-center justify-between border-b border-[rgba(242,240,235,0.08)] pb-3">
                      <span className="text-[10px] text-[#C47D68] uppercase tracking-widest font-bold">
                        EVIDENCE DOSSIER
                      </span>
                      <StatusPip status="verified" label="REGISTERED" />
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between py-1 border-b border-[rgba(242,240,235,0.04)]">
                        <span className="text-[#888]">ASSOCIATED HOME</span>
                        <button 
                          onClick={() => onSelectEvidenceType('HOME')}
                          className="text-[#C47D68] hover:underline flex items-center gap-1 text-right truncate max-w-[180px]"
                        >
                          <span>{home.name}</span>
                          <ArrowRight className="w-3 h-3 flex-shrink-0" />
                        </button>
                      </div>

                      <div className="flex justify-between py-1 border-b border-[rgba(242,240,235,0.04)]">
                        <span className="text-[#888]">ASSOCIATED STORY</span>
                        <button 
                          onClick={() => onSelectEvidenceType('STORY')}
                          className="text-[#E06D53] hover:underline flex items-center gap-1 text-right truncate max-w-[180px]"
                        >
                          <span>{story.title}</span>
                          <ArrowRight className="w-3 h-3 flex-shrink-0" />
                        </button>
                      </div>

                      <div className="flex justify-between py-1 border-b border-[rgba(242,240,235,0.04)]">
                        <span className="text-[#888]">PHYSICAL BUILDING</span>
                        <button 
                          onClick={() => onSelectEvidenceType('BUILDING')}
                          className="text-[#8FA382] hover:underline flex items-center gap-1 text-right truncate max-w-[180px]"
                        >
                          <span>{building.name}</span>
                          <ArrowRight className="w-3 h-3 flex-shrink-0" />
                        </button>
                      </div>

                      <div className="flex justify-between py-1 border-b border-[rgba(242,240,235,0.04)]">
                        <span className="text-[#888]">TOWN DISTRICT</span>
                        <button 
                          onClick={() => onSelectEvidenceType('TOWN')}
                          className="text-[#5C7D91] hover:underline flex items-center gap-1 text-right truncate max-w-[180px]"
                        >
                          <span>{town.name}</span>
                          <ArrowRight className="w-3 h-3 flex-shrink-0" />
                        </button>
                      </div>
                    </div>

                    {/* Custodian Consent Protocol */}
                    <div className="p-3 bg-[#050404] border border-[rgba(196,125,104,0.2)] rounded space-y-1">
                      <div className="flex items-center gap-1.5 text-[9px] text-[#C47D68] uppercase font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>CUSTODIANSHIP & CONSENT</span>
                      </div>
                      <p className="text-[10px] text-[#888] font-sans">
                        {person.custodianshipConsent}
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectEvidenceType('HOME')}
                      className="w-full py-3 bg-[#C47D68] text-[#0A0706] font-bold text-xs hover:bg-[#D9917D] rounded flex items-center justify-center gap-2 transition-all uppercase"
                    >
                      <span>ENTER {person.name.split('&')[0]}’S HOME</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================= 2. HOME EVIDENCE ======================= */}
          {activeEvidenceType === 'HOME' && (
            <motion.div
              key="HOME"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Dugout Architecture Breakdown */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[rgba(196,125,104,0.1)] border border-[rgba(196,125,104,0.3)] text-[#C47D68] text-[10px] uppercase font-bold rounded mb-3">
                      <Home className="w-3 h-3" />
                      <span>DUGOUT SPECIFICATION // {home.dugoutNumber}</span>
                    </div>
                    <h3 className="font-display font-light text-2xl sm:text-4xl text-[#F5F3ED] uppercase leading-tight mb-2">
                      {home.name}
                    </h3>
                    <div className="text-xs text-[#888] font-mono mb-4 flex items-center gap-3">
                      <span>BUILT: {home.yearBuilt > 0 ? home.yearBuilt : `${Math.abs(home.yearBuilt)} BP`}</span>
                      <span>•</span>
                      <span>BUILDER: {home.builder}</span>
                      <span>•</span>
                      <span>DEPTH: {home.depthMeters}M</span>
                    </div>
                  </div>

                  {/* Thermal Physics & Geothermal Stability Chart */}
                  <div className="p-6 bg-[#0E0A08] border border-[rgba(242,240,235,0.08)] rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#C47D68] uppercase tracking-widest font-bold flex items-center gap-2">
                        <Thermometer className="w-3.5 h-3.5" />
                        <span>GEOTHERMAL THERMAL GRADIENT (SUMMER NOON)</span>
                      </span>
                      <span className="text-[10px] text-[#888]">DELTA: -{(home.thermalSurfaceTempC - home.thermalSubterraneanTempC).toFixed(1)}°C</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-4 bg-[#140806] border border-[rgba(224,109,83,0.3)] rounded">
                        <div className="text-[9px] text-[#E06D53] uppercase mb-1">SURFACE AIR TEMP</div>
                        <div className="text-2xl sm:text-3xl font-display text-[#E06D53]">
                          {home.thermalSurfaceTempC}°C
                        </div>
                        <div className="text-[9px] text-[#888] mt-1 font-sans">Extreme desert UV & wind</div>
                      </div>

                      <div className="p-4 bg-[#07110C] border border-[rgba(143,163,130,0.3)] rounded">
                        <div className="text-[9px] text-[#8FA382] uppercase mb-1">SUBTERRANEAN LIVING ROOM</div>
                        <div className="text-2xl sm:text-3xl font-display text-[#8FA382]">
                          {home.thermalSubterraneanTempC}°C
                        </div>
                        <div className="text-[9px] text-[#888] mt-1 font-sans">Natural cave homeostasis</div>
                      </div>
                    </div>
                  </div>

                  {/* Architectural notes */}
                  <div className="space-y-2">
                    <div className="text-[10px] text-[#C47D68] uppercase tracking-widest font-bold">
                      VERNACULAR ENGINEERING & MATERIAL
                    </div>
                    <p className="text-sm text-[#D4CDC5] font-sans leading-relaxed">
                      {home.architecturalNotes}
                    </p>
                    <div className="p-3 bg-[#050404] border border-[rgba(242,240,235,0.06)] rounded text-xs text-[#A89F91]">
                      <span className="text-[#C47D68] block text-[9px] uppercase font-bold mb-1">STRATIGRAPHY:</span>
                      {home.geologicalStratum}
                    </div>
                  </div>
                </div>

                {/* Right Dugout Structural Health & 3D Point Cloud */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="p-6 bg-[#0D0907] border border-[rgba(196,125,104,0.3)] rounded-lg space-y-5">
                    <div className="flex items-center justify-between border-b border-[rgba(242,240,235,0.08)] pb-3">
                      <span className="text-[10px] text-[#C47D68] uppercase tracking-widest font-bold">
                        PHYSICAL CONSERVATION STATUS
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        home.currentPhysicalCondition === 'ACTIVELY_STABILIZED'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : home.currentPhysicalCondition === 'VULNERABLE'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-red-950 text-red-300 border border-red-800'
                      }`}>
                        {home.currentPhysicalCondition.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Stabilization Funding Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#888]">STABILIZATION BUDGET FUNDED</span>
                        <span className="text-[#F5F3ED] font-bold">{home.stabilizationFundedPercent}%</span>
                      </div>
                      <div className="h-2 bg-[#050404] rounded-full overflow-hidden border border-[rgba(242,240,235,0.1)]">
                        <div
                          className="h-full bg-gradient-to-r from-[#C47D68] to-[#8FA382]"
                          style={{ width: `${home.stabilizationFundedPercent}%` }}
                        />
                      </div>
                      <div className="text-[9px] text-[#888] font-sans">
                        Funded via APP Tourism & Opal Provenance Preservation Trust allocations.
                      </div>
                    </div>

                    {/* Point Cloud Telemetry */}
                    <div className="p-4 bg-[#050404] border border-[rgba(242,240,235,0.06)] rounded space-y-2">
                      <div className="text-[9px] text-[#C47D68] uppercase font-bold flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        <span>DIGITAL TWIN PHOTOGRAMMETRY SCAN</span>
                      </div>
                      <div className="text-xl font-display text-[#F5F3ED]">
                        {home.pointCloudVerticesCount.toLocaleString()} <span className="text-xs text-[#888] font-mono">VERTICES</span>
                      </div>
                      <p className="text-[10px] text-[#888] font-sans">
                        Sub-millimeter LiDAR point cloud captured to preserve exact pick marks and ceiling geometry.
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectEvidenceType('STORY')}
                      className="w-full py-3 bg-[#C47D68] text-[#0A0706] font-bold text-xs hover:bg-[#D9917D] rounded flex items-center justify-center gap-2 transition-all uppercase"
                    >
                      <span>HEAR ORAL STORY OF THIS HOME</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================= 3. STORY EVIDENCE ======================= */}
          {activeEvidenceType === 'STORY' && (
            <motion.div
              key="STORY"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Story Transcript & Voice Player */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[rgba(224,109,83,0.15)] border border-[rgba(224,109,83,0.4)] text-[#E06D53] text-[10px] uppercase font-bold rounded mb-3">
                      <BookOpen className="w-3 h-3" />
                      <span>ORAL ARCHIVE TRANSCRIPT // {story.thematicCategory.replace('_', ' ')}</span>
                    </div>
                    <h3 className="font-display font-light text-2xl sm:text-4xl text-[#F5F3ED] uppercase leading-tight mb-2">
                      "{story.title}"
                    </h3>
                    <div className="text-xs text-[#888] font-mono mb-4 flex items-center gap-3">
                      <span>NARRATOR: {story.narratorName}</span>
                      <span>•</span>
                      <span>RECORDED: {story.recordedDate}</span>
                    </div>
                  </div>

                  {/* Binaural Soundscape Player UI */}
                  <div className="p-6 bg-[#0E0A08] border border-[rgba(224,109,83,0.3)] rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] text-[#E06D53] uppercase font-bold">
                        <Volume2 className="w-4 h-4 animate-pulse" />
                        <span>BINAURAL ORAL ARCHIVE REPRODUCTION</span>
                      </div>
                      <span className="text-[10px] text-[#888]">{story.audioDuration}</span>
                    </div>

                    {/* Interactive Play/Pause button and simulated waveform */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="w-12 h-12 rounded-full bg-[#E06D53] text-[#0A0706] flex items-center justify-center hover:bg-[#F28269] transition-all flex-shrink-0"
                      >
                        {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                      </button>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-end gap-1 h-8 px-2 bg-[#050404] rounded border border-[rgba(242,240,235,0.06)] overflow-hidden">
                          {[30, 60, 45, 80, 20, 90, 65, 40, 75, 95, 30, 50, 70, 85, 40, 60, 30, 90, 55, 75, 40, 80, 60, 90, 50, 70, 40, 85, 30, 65, 45, 70].map((h, i) => (
                            <div
                              key={i}
                              className={`flex-1 rounded-t transition-all ${
                                isPlayingAudio ? 'bg-[#E06D53]' : 'bg-[#444]'
                              }`}
                              style={{ 
                                height: isPlayingAudio ? `${Math.sin((i + Date.now()/300)) * 30 + 50}%` : `${h}%`,
                                opacity: isPlayingAudio ? 0.9 : 0.4 
                              }}
                            />
                          ))}
                        </div>
                        <div className="text-[9px] text-[#888] font-sans truncate">
                          SOUNDSCAPE: {story.binauralSoundscape}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spoken Word Excerpt & Full Transcript */}
                  <div className="space-y-4">
                    <blockquote className="p-4 bg-[#050404] border-l-2 border-[#E06D53] rounded-r text-sm text-[#F5F3ED] font-serif-editorial italic leading-relaxed">
                      {story.shortExcerpt}
                    </blockquote>

                    <div className="space-y-2">
                      <div className="text-[10px] text-[#C47D68] uppercase font-bold tracking-widest">
                        AUTHENTICATED SPOKEN TRANSCRIPT
                      </div>
                      <p className="text-sm text-[#D4CDC5] font-sans leading-relaxed p-4 bg-[#0A0706] rounded border border-[rgba(242,240,235,0.06)]">
                        {story.fullTranscript}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Story Archival Metadata & Provenance Stamp */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="p-6 bg-[#0D0907] border border-[rgba(224,109,83,0.3)] rounded-lg space-y-5">
                    <div className="flex items-center justify-between border-b border-[rgba(242,240,235,0.08)] pb-3">
                      <span className="text-[10px] text-[#E06D53] uppercase tracking-widest font-bold">
                        ARCHIVAL SEAL
                      </span>
                      <StatusPip status="verified" label="AUTHENTICATED" />
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="text-[9px] text-[#888] uppercase block">ARCHIVAL REPOSITORY REFERENCE</span>
                        <span className="text-[#F5F3ED] font-mono">{story.archivalReference}</span>
                      </div>

                      <div>
                        <span className="text-[9px] text-[#888] uppercase block">CULTURAL CONSENT SEAL</span>
                        <span className="text-[#E06D53] font-mono text-[11px]">{story.culturalConsentStamp}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-[#050404] border border-[rgba(242,240,235,0.06)] rounded text-[10px] text-[#888] space-y-1">
                      <span className="text-[#E06D53] font-bold block uppercase">VERIFICATION PRINCIPLE:</span>
                      Oral accounts are preserved unedited with explicit family and elder consent. APP provides the digital repository without altering the narrator’s voice.
                    </div>

                    <button
                      onClick={() => onSelectEvidenceType('BUILDING')}
                      className="w-full py-3 bg-[#E06D53] text-[#0A0706] font-bold text-xs hover:bg-[#F28269] rounded flex items-center justify-center gap-2 transition-all uppercase"
                    >
                      <span>EXAMINE PHYSICAL BUILDING</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================= 4. BUILDING EVIDENCE ======================= */}
          {activeEvidenceType === 'BUILDING' && (
            <motion.div
              key="BUILDING"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Building Architecture & Significance */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[rgba(143,163,130,0.15)] border border-[rgba(143,163,130,0.4)] text-[#8FA382] text-[10px] uppercase font-bold rounded mb-3">
                      <Landmark className="w-3 h-3" />
                      <span>HISTORIC STRUCTURE // BUILT {building.yearConstructed > 0 ? building.yearConstructed : `${Math.abs(building.yearConstructed)} BP`}</span>
                    </div>
                    <h3 className="font-display font-light text-2xl sm:text-4xl text-[#F5F3ED] uppercase leading-tight mb-2">
                      {building.name}
                    </h3>
                    <div className="text-xs text-[#888] font-mono mb-4 flex items-center gap-3">
                      <span>PURPOSE: {building.originalPurpose}</span>
                      <span>•</span>
                      <span>TECHNIQUE: {building.constructionTechnique.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Historical Significance */}
                  <div className="p-6 bg-[#0E0A08] border border-[rgba(143,163,130,0.25)] rounded-lg space-y-3">
                    <div className="text-[10px] text-[#8FA382] uppercase tracking-widest font-bold">
                      HISTORICAL & ARCHITECTURAL SIGNIFICANCE
                    </div>
                    <p className="text-sm text-[#D4CDC5] font-sans leading-relaxed">
                      {building.historicalSignificance}
                    </p>
                  </div>

                  {/* Structural Risk Factors */}
                  <div className="space-y-3">
                    <div className="text-[10px] text-[#C47D68] uppercase tracking-widest font-bold flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      <span>ACTIVE STRUCTURAL RISK FACTORS</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {building.structuralRiskFactors.map((risk, i) => (
                        <div key={i} className="p-3 bg-[#050404] border border-[rgba(242,240,235,0.06)] rounded text-[11px] text-[#A89F91]">
                          <span className="text-amber-500 block font-bold mb-1">RISK 0{i + 1}</span>
                          {risk}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* GPS Coordinates and Physical Address */}
                  <div className="p-4 bg-[#050404] border border-[rgba(242,240,235,0.06)] rounded flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div>
                      <span className="text-[9px] text-[#888] uppercase block">PHYSICAL ADDRESS</span>
                      <span className="text-[#F5F3ED]">{building.physicalAddress}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#888] uppercase block">SURVEY GPS COORDINATES</span>
                      <span className="text-[#8FA382] font-mono">{building.gpsCoordinates}</span>
                    </div>
                  </div>
                </div>

                {/* Right Building Restoration Budget & Digital Twin Accuracy */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="p-6 bg-[#0D0907] border border-[rgba(143,163,130,0.3)] rounded-lg space-y-5">
                    <div className="flex items-center justify-between border-b border-[rgba(242,240,235,0.08)] pb-3">
                      <span className="text-[10px] text-[#8FA382] uppercase tracking-widest font-bold">
                        RESTORATION TRUST ALLOCATION
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold">
                        {Math.round((building.restorationBudgetRaisedAUD / building.restorationBudgetRequiredAUD) * 100)}% FUNDED
                      </span>
                    </div>

                    {/* Financial Raised Meter */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#888]">RAISED: ${building.restorationBudgetRaisedAUD.toLocaleString()} AUD</span>
                        <span className="text-[#F5F3ED]">GOAL: ${building.restorationBudgetRequiredAUD.toLocaleString()} AUD</span>
                      </div>
                      <div className="h-2 bg-[#050404] rounded-full overflow-hidden border border-[rgba(242,240,235,0.1)]">
                        <div
                          className="h-full bg-[#8FA382]"
                          style={{ width: `${(building.restorationBudgetRaisedAUD / building.restorationBudgetRequiredAUD) * 100}%` }}
                        />
                      </div>
                      <div className="text-[9px] text-[#888]">
                        Remaining ${(building.restorationBudgetRequiredAUD - building.restorationBudgetRaisedAUD).toLocaleString()} AUD will complete ceiling structural pinning.
                      </div>
                    </div>

                    {/* LiDAR accuracy */}
                    <div className="p-4 bg-[#050404] border border-[rgba(242,240,235,0.06)] rounded space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#888]">LiDAR SCAN RESOLUTION</span>
                        <span className="text-[#8FA382] font-bold">±{building.digitalTwinAccuracyMm} mm</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-[#888]">ARCHIVAL PHOTO RECORD</span>
                        <span className="text-[#F5F3ED] font-bold">{building.archivalPhotosCount} SCANS</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectEvidenceType('TOWN')}
                      className="w-full py-3 bg-[#8FA382] text-[#0A0706] font-bold text-xs hover:bg-[#A3B896] rounded flex items-center justify-center gap-2 transition-all uppercase"
                    >
                      <span>VIEW IN TOWN SPATIAL TWIN</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================= 5. TOWN EVIDENCE ======================= */}
          {activeEvidenceType === 'TOWN' && (
            <motion.div
              key="TOWN"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Town Spatial Grid Breakdown */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[rgba(92,125,145,0.15)] border border-[rgba(92,125,145,0.4)] text-[#5C7D91] text-[10px] uppercase font-bold rounded mb-3">
                      <MapPin className="w-3 h-3" />
                      <span>SPATIAL DISTRICT // {town.coordinates}</span>
                    </div>
                    <h3 className="font-display font-light text-2xl sm:text-4xl text-[#F5F3ED] uppercase leading-tight mb-2">
                      {town.name}
                    </h3>
                    <p className="text-sm text-[#D4CDC5] font-sans leading-relaxed mb-4">
                      {town.historicalRole}
                    </p>
                  </div>

                  {/* Geological Setting & Settlement Pattern */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#0E0A08] border border-[rgba(92,125,145,0.25)] rounded space-y-2">
                      <div className="text-[10px] text-[#5C7D91] uppercase font-bold">GEOLOGICAL SETTING</div>
                      <p className="text-xs text-[#A89F91] font-sans leading-relaxed">
                        {town.geologicalSetting}
                      </p>
                    </div>

                    <div className="p-4 bg-[#0E0A08] border border-[rgba(92,125,145,0.25)] rounded space-y-2">
                      <div className="text-[10px] text-[#5C7D91] uppercase font-bold">SETTLEMENT DISPERSION</div>
                      <p className="text-xs text-[#A89F91] font-sans leading-relaxed">
                        {town.settlementPattern}
                      </p>
                    </div>
                  </div>

                  {/* Connected Strata Statistics */}
                  <div className="p-6 bg-[#050404] border border-[rgba(242,240,235,0.06)] rounded-lg">
                    <div className="text-[10px] text-[#C47D68] uppercase font-bold tracking-widest mb-4">
                      DISTRICT LIVING ARCHIVE NETWORK
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-[#0A0706] rounded border border-[rgba(242,240,235,0.04)]">
                        <div className="text-2xl font-display text-[#F5F3ED]">{town.activeHeritageSitesCount}</div>
                        <div className="text-[9px] text-[#888] uppercase mt-1">HERITAGE SITES</div>
                      </div>
                      <div className="p-3 bg-[#0A0706] rounded border border-[rgba(242,240,235,0.04)]">
                        <div className="text-2xl font-display text-[#C5A059]">{town.connectedPeopleCount}</div>
                        <div className="text-[9px] text-[#888] uppercase mt-1">PEOPLE MAPPED</div>
                      </div>
                      <div className="p-3 bg-[#0A0706] rounded border border-[rgba(242,240,235,0.04)]">
                        <div className="text-2xl font-display text-[#E06D53]">{town.connectedStoriesCount}</div>
                        <div className="text-[9px] text-[#888] uppercase mt-1">RECORDED STORIES</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Spatial District Telemetry */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="p-6 bg-[#0D0907] border border-[rgba(92,125,145,0.3)] rounded-lg space-y-5">
                    <div className="flex items-center justify-between border-b border-[rgba(242,240,235,0.08)] pb-3">
                      <span className="text-[10px] text-[#5C7D91] uppercase tracking-widest font-bold">
                        DISTRICT COORDINATION
                      </span>
                      <StatusPip status="verified" label="MAPPED" />
                    </div>

                    <div className="p-4 bg-[#050404] border border-[rgba(92,125,145,0.2)] rounded space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#888]">GPS LOCUS</span>
                        <span className="text-[#5C7D91] font-mono">{town.coordinates}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#888]">CURRENT EPOCH</span>
                        <span className="text-[#F5F3ED] font-mono">{time.epochName.split('//')[0]}</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-[#888] font-sans">
                      The town is not an abstract map; it is a matrix of interconnected dugouts, shafts, and stories held together by the sandstone ridges.
                    </p>

                    <button
                      onClick={() => onSelectEvidenceType('TIME')}
                      className="w-full py-3 bg-[#5C7D91] text-[#0A0706] font-bold text-xs hover:bg-[#7292A6] rounded flex items-center justify-center gap-2 transition-all uppercase"
                    >
                      <span>ANCHOR IN DEEP TIME</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================= 6. TIME EVIDENCE ======================= */}
          {activeEvidenceType === 'TIME' && (
            <motion.div
              key="TIME"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Deep Time to Future Horizon */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[rgba(163,149,128,0.15)] border border-[rgba(163,149,128,0.4)] text-[#A39580] text-[10px] uppercase font-bold rounded mb-3">
                      <Clock className="w-3 h-3" />
                      <span>TEMPORAL HORIZON // {time.timeframe}</span>
                    </div>
                    <h3 className="font-display font-light text-2xl sm:text-4xl text-[#F5F3ED] uppercase leading-tight mb-2">
                      {time.epochName}
                    </h3>
                    <div className="text-xs text-[#C47D68] font-mono mb-4">
                      GEOLOGICAL ERA: {time.geologicalEra}
                    </div>
                  </div>

                  {/* Summary & Human Reality */}
                  <div className="p-6 bg-[#0E0A08] border border-[rgba(163,149,128,0.25)] rounded-lg space-y-4">
                    <div className="text-[10px] text-[#A39580] uppercase tracking-widest font-bold">
                      HISTORICAL SUMMARY
                    </div>
                    <p className="text-sm text-[#D4CDC5] font-sans leading-relaxed">
                      {time.historicalSummary}
                    </p>

                    <div className="pt-3 border-t border-[rgba(242,240,235,0.06)] space-y-1">
                      <div className="text-[9px] text-[#C47D68] uppercase font-bold">HUMAN REALITY:</div>
                      <p className="text-xs text-[#E8D1CB] font-sans">
                        {time.humanReality}
                      </p>
                    </div>
                  </div>

                  {/* Defining Artefact */}
                  <div className="p-4 bg-[#050404] border border-[rgba(242,240,235,0.06)] rounded space-y-1">
                    <div className="text-[9px] text-[#888] uppercase">DEFINING MATERIAL ARTEFACT:</div>
                    <div className="text-sm text-[#F5F3ED] font-serif-editorial italic">
                      "{time.definingArtefact}"
                    </div>
                  </div>
                </div>

                {/* Right Preservation Objective & Cycle Complete */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="p-6 bg-[#0D0907] border border-[rgba(163,149,128,0.3)] rounded-lg space-y-5">
                    <div className="flex items-center justify-between border-b border-[rgba(242,240,235,0.08)] pb-3">
                      <span className="text-[10px] text-[#A39580] uppercase tracking-widest font-bold">
                        2050 PRESERVATION OBJECTIVE
                      </span>
                      <StatusPip status="verified" label="LONG-TERM" />
                    </div>

                    <p className="text-xs text-[#D4CDC5] font-sans leading-relaxed">
                      {time.preservationObjective}
                    </p>

                    <div className="p-4 bg-[#050404] border border-[rgba(196,125,104,0.2)] rounded space-y-2">
                      <div className="flex items-center gap-1.5 text-[9px] text-[#C47D68] uppercase font-bold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>COMPLETE STRATA CYCLE</span>
                      </div>
                      <p className="text-[10px] text-[#888] font-sans">
                        You have traversed from the human voice of {person.name} through their hand-carved home, oral tape, physical building, spatial district, and deep time.
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectEvidenceType('PERSON')}
                      className="w-full py-3 bg-[#C47D68] text-[#0A0706] font-bold text-xs hover:bg-[#D9917D] rounded flex items-center justify-center gap-2 transition-all uppercase"
                    >
                      <span>RETURN TO PERSON EVIDENCE</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
