import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TourismJourneyStep, CivicValueSplit } from '../../types/tourism';
import { CIVIC_VALUE_BREAKDOWN } from '../../data/tourismJourneyData';
import { ThreeOpalViewer } from '../opal/ThreeOpalViewer';

const matrixTwinUrl = '/images/Matrixtwin_opal.glb';
import { 
  Compass, 
  MapPin, 
  Volume2, 
  VolumeX, 
  ArrowDown, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Globe, 
  Radio, 
  FileText, 
  Truck, 
  Box, 
  Cpu, 
  Coins, 
  Award,
  Maximize2,
  Lock,
  Eye,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface InteractiveChapterStageProps {
  step: TourismJourneyStep;
  onNextStep: () => void;
  onJumpToStep: (stepNumber: number) => void;
}

export const InteractiveChapterStage: React.FC<InteractiveChapterStageProps> = ({
  step,
  onNextStep,
  onJumpToStep,
}) => {
  // Step 1: Altitude descent state
  const [currentAltitude, setCurrentAltitude] = useState<number>(45);

  // Step 2: Street hotspot state
  const [selectedHotspot, setSelectedHotspot] = useState<'DUGOUT_14' | 'CALCRETE_RIDGE' | 'WATER_TANK'>('DUGOUT_14');

  // Step 3: Miner dialogue topic
  const [dialogueTopic, setDialogueTopic] = useState<'LINEAGE' | 'CLAIM_4192' | 'GRADING_STANDARD'>('LINEAGE');

  // Step 4: Audio player state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(true);
  const [activeStoryTrack, setActiveStoryTrack] = useState<'MATT_1930' | 'UNCLE_VINCE_EROMANGA'>('MATT_1930');

  // Step 5: Winch shaft depth
  const [shaftDepth, setShaftDepth] = useState<number>(14.2);

  // Step 6: Opal reveal progress
  const [excavationProgress, setExcavationProgress] = useState<number>(100);
  const [isUvLightOn, setIsUvLightOn] = useState<boolean>(true);

  // Step 8: Provenance verification tab
  const [provenanceTab, setProvenanceTab] = useState<'PXRF' | 'GPS_CLAIM' | 'CONSENT' | 'CUSTODY'>('PXRF');

  // Step 9: Custom acquisition amount simulation
  const [simulatedPriceAUD, setSimulatedPriceAUD] = useState<number>(4200);
  const [isPurchaseExecuted, setIsPurchaseExecuted] = useState<boolean>(false);

  // Step 10: Unboxing state & NFC sync
  const [isCasketOpened, setIsCasketOpened] = useState<boolean>(true);
  const [isNfcSynced, setIsNfcSynced] = useState<boolean>(true);

  return (
    <div className="border border-[rgba(242,240,235,0.12)] bg-[#070908] p-6 sm:p-10 crosshair-corner font-mono-tech relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(197,160,89,0.06),transparent_70%)] pointer-events-none" />

      {/* Chapter header */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 pb-8 border-b border-[rgba(242,240,235,0.08)]">
        <div className="lg:col-span-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-1 text-[10px] bg-[rgba(197,160,89,0.15)] border border-[rgba(197,160,89,0.3)] text-[#C5A059] font-bold tracking-widest uppercase">
              {step.stageTitle}
            </span>
            <span className="text-xs text-[#888]">CHAPTER {step.stepNumber} // 10</span>
          </div>

          <h1 className="font-display font-light text-2xl sm:text-4xl text-[#F5F3ED] tracking-wide uppercase leading-tight mb-3">
            {step.title}
          </h1>

          <p className="font-serif-editorial italic text-base sm:text-lg text-[#C8C2B7] leading-relaxed mb-4">
            "{step.subtitle}"
          </p>

          <p className="text-sm text-[#A39580] leading-relaxed max-w-3xl">
            {step.narrativeOverview}
          </p>
        </div>

        {/* Right column: Origin to Destination coordinates */}
        <div className="lg:col-span-4 flex flex-col justify-between p-4 bg-[#0A0D0B] border border-[rgba(242,240,235,0.08)] rounded">
          <div>
            <div className="text-[9px] tracking-[0.2em] text-[#8FA382] uppercase mb-2 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>SPATIAL LOCUS REFERENCE</span>
            </div>
            <div className="text-xs text-[#DDD] font-mono">
              <span className="text-[#888] block text-[10px]">ORIGIN:</span>
              {step.locationOrigin.name} ({step.locationOrigin.coordinates})
            </div>
            <div className="text-xs text-[#C5A059] font-mono mt-2 pt-2 border-t border-[rgba(242,240,235,0.06)]">
              <span className="text-[#888] block text-[10px]">DESTINATION:</span>
              {step.locationDestination.name}
              <span className="block text-[10px] text-[#A39580] mt-0.5 font-sans">
                {step.locationDestination.geologicalLocus}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[rgba(242,240,235,0.06)]">
            <div className="text-[10px] text-[#8FA382] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>RELATIONSHIP BOND PRINCIPLE</span>
            </div>
            <p className="text-[11px] text-[#B0AAA0] mt-1 italic font-serif">
              "{step.relationshipBondNote}"
            </p>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <div className="relative z-10 mb-8">
        {/* STEP 1: ENTER THE DIGITAL TOWN */}
        {step.stepNumber === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 bg-[#050605] border border-[rgba(197,160,89,0.3)] rounded-lg p-6 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
              {/* Wireframe radar circle */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-80 h-80 rounded-full border border-[#C5A059] animate-pulse" />
                <div className="w-56 h-56 rounded-full border border-[#C5A059]" />
                <div className="w-32 h-32 rounded-full border border-dashed border-[#C5A059]" />
              </div>

              <div className="flex items-center justify-between text-xs text-[#A39580]">
                <span className="flex items-center gap-2 text-[#C5A059]">
                  <Globe className="w-4 h-4 animate-spin" />
                  SPATIAL INGRESS // GDA2020 ZONE 53
                </span>
                <span>DESCENT ALTITUDE: {currentAltitude}M AHD</span>
              </div>

              <div className="my-auto text-center py-8">
                <p className="text-xs text-[#888] font-mono tracking-widest uppercase mb-2">
                  TARGET LOCK: ANDAMOOKA RED SANDSTONE RIDGE
                </p>
                <div className="font-display text-2xl sm:text-3xl text-[#F5F3ED] uppercase tracking-wider">
                  30°27'04" S // 137°09'48" E
                </div>
                <p className="text-xs text-[#C5A059] mt-2 font-mono">
                  140 KM² HIGH-DENSITY AERIAL LIDAR POINT CLOUD LOADED
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-[#A39580]">
                  <span>ALTITUDE DESCENT SIMULATOR</span>
                  <span className="text-[#C5A059] font-bold">{currentAltitude} meters</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={currentAltitude}
                  onChange={(e) => setCurrentAltitude(Number(e.target.value))}
                  className="w-full accent-[#C5A059] bg-[#1a1a1a] h-1.5 rounded cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-[#666]">
                  <span>5M (STREET SCAN)</span>
                  <span>45M (ROOFTOP DUGOUT)</span>
                  <span>120M (ORBITAL CRATON)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-[#0A0D0B] border border-[rgba(242,240,235,0.08)] rounded">
                <h4 className="text-xs text-[#C5A059] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  SENSORY & IMMERSIVE TELEMETRY
                </h4>
                <p className="text-xs text-[#C8C2B7] leading-relaxed mb-3">
                  {step.immersiveDetails.sensoryCue}
                </p>
                <div className="p-3 bg-[#050505] rounded border border-[rgba(242,240,235,0.05)] text-[11px] text-[#8FA382]">
                  "{step.immersiveDetails.keyQuote}"
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {step.telemetryMetrics.map((metric, i) => (
                  <div key={i} className="p-3 bg-[#080B09] border border-[rgba(242,240,235,0.06)] rounded">
                    <span className="text-[9px] text-[#777] uppercase block">{metric.label}</span>
                    <span className="text-xs text-[#F5F3ED] font-bold mt-0.5 block">{metric.value}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/town"
                className="w-full py-2.5 px-4 bg-[#111] hover:bg-[#1a1a1a] border border-[rgba(197,160,89,0.3)] text-[#C5A059] rounded text-xs flex items-center justify-center gap-2 transition-all font-mono"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>OPEN FULL 9-SCALE SPATIAL TOWN TWIN</span>
              </Link>
            </div>
          </div>
        )}

        {/* STEP 2: EXPLORE A STREET */}
        {step.stepNumber === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[#060807] border border-[rgba(242,240,235,0.12)] rounded-lg p-6">
              <div className="flex items-center justify-between text-xs text-[#A39580] mb-4">
                <span className="text-[#C5A059] uppercase tracking-wider font-bold">
                  OPAL CREEK ROAD ARTERY // VIRTUAL WALKWAY
                </span>
                <span className="px-2 py-0.5 bg-[#111] border border-[rgba(143,163,130,0.3)] text-[#8FA382] text-[10px]">
                  THERMAL: SURFACE 41°C / DUGOUT 22°C
                </span>
              </div>

              {/* Interactive Street Hotspots */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button
                  onClick={() => setSelectedHotspot('DUGOUT_14')}
                  className={`p-3 rounded border text-left transition-all ${
                    selectedHotspot === 'DUGOUT_14'
                      ? 'border-[#C5A059] bg-[rgba(197,160,89,0.15)] text-[#F5F3ED]'
                      : 'border-[rgba(242,240,235,0.08)] bg-[#0A0D0B] text-[#888] hover:border-[#A39580]'
                  }`}
                >
                  <span className="text-[9px] block text-[#C5A059] font-bold">HOTSPOT 01</span>
                  <span className="text-xs font-bold block mt-0.5">Kathagen Dugout #14</span>
                  <span className="text-[10px] text-[#A39580] block mt-1">Carved 1960 // Lapidary</span>
                </button>

                <button
                  onClick={() => setSelectedHotspot('CALCRETE_RIDGE')}
                  className={`p-3 rounded border text-left transition-all ${
                    selectedHotspot === 'CALCRETE_RIDGE'
                      ? 'border-[#C5A059] bg-[rgba(197,160,89,0.15)] text-[#F5F3ED]'
                      : 'border-[rgba(242,240,235,0.08)] bg-[#0A0D0B] text-[#888] hover:border-[#A39580]'
                  }`}
                >
                  <span className="text-[9px] block text-[#C5A059] font-bold">HOTSPOT 02</span>
                  <span className="text-xs font-bold block mt-0.5">Calcrete Capstone</span>
                  <span className="text-[10px] text-[#A39580] block mt-1">Natural Geothermal Roof</span>
                </button>

                <button
                  onClick={() => setSelectedHotspot('WATER_TANK')}
                  className={`p-3 rounded border text-left transition-all ${
                    selectedHotspot === 'WATER_TANK'
                      ? 'border-[#C5A059] bg-[rgba(197,160,89,0.15)] text-[#F5F3ED]'
                      : 'border-[rgba(242,240,235,0.08)] bg-[#0A0D0B] text-[#888] hover:border-[#A39580]'
                  }`}
                >
                  <span className="text-[9px] block text-[#C5A059] font-bold">HOTSPOT 03</span>
                  <span className="text-xs font-bold block mt-0.5">Community Bore Tank</span>
                  <span className="text-[10px] text-[#A39580] block mt-1">Water Security Hub</span>
                </button>
              </div>

              {/* Dynamic hotspot description */}
              <div className="p-4 bg-[#0A0D0B] border border-[rgba(242,240,235,0.08)] rounded">
                {selectedHotspot === 'DUGOUT_14' && (
                  <div>
                    <h5 className="text-xs text-[#C5A059] uppercase font-bold mb-1">
                      KATHAGEN FAMILY WORKSHOP DUGOUT
                    </h5>
                    <p className="text-xs text-[#C8C2B7] leading-relaxed">
                      Hand-hewn out of solid Cretaceous sandstone by three generations of miners. The interior maintains a steady 22°C year-round. Outside, the dust storm swirls; inside, the lapidary wheels spin in complete silence.
                    </p>
                  </div>
                )}
                {selectedHotspot === 'CALCRETE_RIDGE' && (
                  <div>
                    <h5 className="text-xs text-[#C5A059] uppercase font-bold mb-1">
                      CALCRETE CAPSTONE & PASSIVE GEOTHERMAL CHIMNEY
                    </h5>
                    <p className="text-xs text-[#C8C2B7] leading-relaxed">
                      The impermeable calcrete geological cap acts as a structural ceiling preventing dugout collapse. Natural vertical ventilation shafts create continuous passive convective airflow.
                    </p>
                  </div>
                )}
                {selectedHotspot === 'WATER_TANK' && (
                  <div>
                    <h5 className="text-xs text-[#C5A059] uppercase font-bold mb-1">
                      COMMUNITY BORE TANK & SOLAR PUMP LOCUS
                    </h5>
                    <p className="text-xs text-[#C8C2B7] leading-relaxed">
                      Every drop of water in Andamooka is precious. This community bore line is directly subsidized by the APP Civic Trust whenever visitors acquire provenance-authenticated opals.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-[#0A0D0B] border border-[rgba(242,240,235,0.08)] rounded">
                <h4 className="text-xs text-[#8FA382] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5" />
                  SPATIAL STREET PERSPECTIVE
                </h4>
                <p className="text-xs text-[#C8C2B7] leading-relaxed italic font-serif">
                  "{step.immersiveDetails.keyQuote}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {step.telemetryMetrics.map((m, i) => (
                  <div key={i} className="p-3 bg-[#080B09] border border-[rgba(242,240,235,0.06)] rounded">
                    <span className="text-[9px] text-[#777] uppercase block">{m.label}</span>
                    <span className="text-xs text-[#F5F3ED] font-bold mt-0.5 block">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: DISCOVER A PERSON */}
        {step.stepNumber === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[#070908] border border-[rgba(197,160,89,0.3)] rounded-lg p-6">
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-[rgba(242,240,235,0.08)]">
                <div className="w-16 h-16 rounded-full bg-[rgba(197,160,89,0.15)] border-2 border-[#C5A059] flex items-center justify-center text-[#C5A059] font-display text-xl font-bold">
                  MK
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] tracking-[0.2em] text-[#C5A059] uppercase font-bold">
                      MINER IDENTITY // CLAIM #4192
                    </span>
                    <span className="px-1.5 py-0.5 bg-[#0D1210] border border-[#8FA382] text-[#8FA382] text-[8px]">
                      VERIFIED 76 YRS
                    </span>
                  </div>
                  <h3 className="font-display font-light text-xl text-[#F5F3ED] mt-0.5">
                    Matt Kathagen
                  </h3>
                  <p className="text-xs text-[#A39580]">
                    3rd Generation Opal Gouger, Lapidary & Community Council Member
                  </p>
                </div>
              </div>

              {/* Dialogue Selector */}
              <div className="space-y-3 mb-4">
                <span className="text-[10px] text-[#888] uppercase tracking-wider">
                  CONVERSE WITH MATT // TELEPRESENCE AUDIO LINK
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setDialogueTopic('LINEAGE')}
                    className={`py-2 px-3 text-xs rounded border text-left transition-all ${
                      dialogueTopic === 'LINEAGE'
                        ? 'border-[#C5A059] bg-[rgba(197,160,89,0.15)] text-[#F5F3ED]'
                        : 'border-[rgba(242,240,235,0.08)] bg-[#050605] text-[#888]'
                    }`}
                  >
                    1. Family Heritage
                  </button>
                  <button
                    onClick={() => setDialogueTopic('CLAIM_4192')}
                    className={`py-2 px-3 text-xs rounded border text-left transition-all ${
                      dialogueTopic === 'CLAIM_4192'
                        ? 'border-[#C5A059] bg-[rgba(197,160,89,0.15)] text-[#F5F3ED]'
                        : 'border-[rgba(242,240,235,0.08)] bg-[#050605] text-[#888]'
                    }`}
                  >
                    2. Lunatic Field Shaft
                  </button>
                  <button
                    onClick={() => setDialogueTopic('GRADING_STANDARD')}
                    className={`py-2 px-3 text-xs rounded border text-left transition-all ${
                      dialogueTopic === 'GRADING_STANDARD'
                        ? 'border-[#C5A059] bg-[rgba(197,160,89,0.15)] text-[#F5F3ED]'
                        : 'border-[rgba(242,240,235,0.08)] bg-[#050605] text-[#888]'
                    }`}
                  >
                    3. M-04 Grading
                  </button>
                </div>
              </div>

              {/* Topic Dialogue Response */}
              <div className="p-4 bg-[#0A0D0B] border border-[rgba(242,240,235,0.08)] rounded font-serif italic text-sm text-[#DDD] leading-relaxed">
                {dialogueTopic === 'LINEAGE' && (
                  <p>
                    “My granddad arrived in 1948 after the war. He pushed a wheelbarrow 80 miles across the gibber. He carved the first chamber of this dugout with a pick. For us, opal isn’t an investment asset—it’s the way we put food on the table and keep the school open.”
                  </p>
                )}
                {dialogueTopic === 'CLAIM_4192' && (
                  <p>
                    “Claim 4192 is down on Lunatic Field. It’s fourteen meters straight down through the silcrete cap. You get down there with a headlamp, and when your pick hits that white kaolin clay, the smell of ancient seabed comes right out at you.”
                  </p>
                )}
                {dialogueTopic === 'GRADING_STANDARD' && (
                  <p>
                    “Before APP, overseas buyers would treat matrix opal like dirt, paying ten dollars a bucket and reselling it in Europe for thousands. Standard M-04 means the community grades the stone together, proving the treatment and rarity so we get fair value.”
                  </p>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-[#0A0D0B] border border-[rgba(242,240,235,0.08)] rounded">
                <h4 className="text-xs text-[#C5A059] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  MINER-SIDE PARTICIPATION BOND
                </h4>
                <p className="text-xs text-[#C8C2B7] leading-relaxed">
                  Hans is speaking directly with the person whose hands will dig, cut, and polish the stone. No anonymous brokers, no synthetic imitations.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {step.telemetryMetrics.map((m, i) => (
                  <div key={i} className="p-3 bg-[#080B09] border border-[rgba(242,240,235,0.06)] rounded">
                    <span className="text-[9px] text-[#777] uppercase block">{m.label}</span>
                    <span className="text-xs text-[#F5F3ED] font-bold mt-0.5 block">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: HEAR A STORY */}
        {step.stepNumber === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[#070908] border border-[rgba(224,109,83,0.3)] rounded-lg p-6">
              <div className="flex items-center justify-between text-xs text-[#A39580] mb-4">
                <span className="text-[#E06D53] uppercase font-bold tracking-wider flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  ANDAMOOKA ORAL ARCHIVE // BINAURAL RECONSTRUCTION
                </span>
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="flex items-center gap-1.5 text-xs text-[#F5F3ED] hover:text-[#E06D53]"
                >
                  {isPlayingAudio ? <Volume2 className="w-4 h-4 text-[#E06D53]" /> : <VolumeX className="w-4 h-4 text-[#888]" />}
                  <span>{isPlayingAudio ? 'AUDIO ACTIVE' : 'MUTED'}</span>
                </button>
              </div>

              {/* Story selector */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => setActiveStoryTrack('MATT_1930')}
                  className={`p-3 rounded border text-left transition-all ${
                    activeStoryTrack === 'MATT_1930'
                      ? 'border-[#E06D53] bg-[rgba(224,109,83,0.15)] text-[#F5F3ED]'
                      : 'border-[rgba(242,240,235,0.08)] bg-[#050605] text-[#888]'
                  }`}
                >
                  <span className="text-[9px] text-[#E06D53] font-bold block">TRACK 01</span>
                  <span className="text-xs font-bold block mt-0.5">The 1930 Pioneer Strike</span>
                  <span className="text-[10px] text-[#A39580] block mt-0.5">Narrated by Matt Kathagen</span>
                </button>

                <button
                  onClick={() => setActiveStoryTrack('UNCLE_VINCE_EROMANGA')}
                  className={`p-3 rounded border text-left transition-all ${
                    activeStoryTrack === 'UNCLE_VINCE_EROMANGA'
                      ? 'border-[#E06D53] bg-[rgba(224,109,83,0.15)] text-[#F5F3ED]'
                      : 'border-[rgba(242,240,235,0.08)] bg-[#050605] text-[#888]'
                  }`}
                >
                  <span className="text-[9px] text-[#E06D53] font-bold block">TRACK 02</span>
                  <span className="text-xs font-bold block mt-0.5">Inland Sea Dreaming</span>
                  <span className="text-[10px] text-[#A39580] block mt-0.5">Kokatha Elder Uncle Vince</span>
                </button>
              </div>

              {/* Simulated Audio Waveform */}
              <div className="h-14 bg-[#050505] rounded border border-[rgba(242,240,235,0.06)] p-2 flex items-center justify-between gap-1 mb-4">
                {[40, 65, 25, 80, 45, 90, 30, 70, 85, 50, 95, 35, 60, 75, 40, 85, 60, 30, 90, 45, 70, 80, 35, 65, 50, 90, 40, 75].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={isPlayingAudio ? { height: [`${h}%`, `${(h * 1.5) % 100}%`, `${h}%`] } : { height: '10%' }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: (i % 5) * 0.1 }}
                    className="w-full bg-[#E06D53] rounded-full opacity-80"
                  />
                ))}
              </div>

              {/* Narrative transcript */}
              <div className="p-4 bg-[#0A0D0B] border border-[rgba(242,240,235,0.08)] rounded font-serif italic text-xs sm:text-sm text-[#C8C2B7] leading-relaxed">
                {activeStoryTrack === 'MATT_1930' ? (
                  <p>
                    “In the drought of 1930, two boundary riders dug in German Gully when everyone said they’d die of thirst. On day 28, their pick split a boulder and out spilled a seam of blue-green fire that changed the Australian desert forever.”
                  </p>
                ) : (
                  <p>
                    “The old people always knew the rainbow serpent slept under the dry mud. When the great Eromanga sea dried up 100 million years ago, its water turned into silica and locked the rainbow inside the stone.”
                  </p>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-[#0A0D0B] border border-[rgba(242,240,235,0.08)] rounded">
                <h4 className="text-xs text-[#E06D53] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Award className="w-3.5 h-3.5" />
                  CONSENT & HERITAGE RATIFICATION
                </h4>
                <p className="text-xs text-[#C8C2B7] leading-relaxed">
                  Both oral tracks are recorded with free, prior, and informed consent. 5% of all downstream asset acquisitions fund ongoing Kokatha cultural archives and language recording.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {step.telemetryMetrics.map((m, i) => (
                  <div key={i} className="p-3 bg-[#080B09] border border-[rgba(242,240,235,0.06)] rounded">
                    <span className="text-[9px] text-[#777] uppercase block">{m.label}</span>
                    <span className="text-xs text-[#F5F3ED] font-bold mt-0.5 block">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: DISCOVER A MINE */}
        {step.stepNumber === 5 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[#050706] border border-[rgba(92,125,145,0.3)] rounded-lg p-6">
              <div className="flex items-center justify-between text-xs text-[#A39580] mb-4">
                <span className="text-[#5C7D91] uppercase font-bold tracking-wider">
                  SHAFT #12 // LUNATIC FIELD // WINCH DESCENT
                </span>
                <span className="text-[#F5F3ED] font-mono">
                  Z-DEPTH: -{shaftDepth.toFixed(1)}M
                </span>
              </div>

              {/* Vertical Shaft Cross-Section Diagram */}
              <div className="bg-[#030403] border border-[rgba(242,240,235,0.1)] rounded p-4 mb-4 relative">
                <div className="space-y-3 text-[11px] font-mono">
                  <div className={`p-2 rounded border transition-all ${shaftDepth < 3 ? 'border-[#C5A059] bg-[rgba(197,160,89,0.15)] text-[#F5F3ED]' : 'border-[rgba(255,255,255,0.05)] text-[#666]'}`}>
                    <span className="text-[9px] text-[#C5A059] block">LAYER Z0 (0 to 3m)</span>
                    Red Outback Alluvium & Silcrete Gibber Stones
                  </div>
                  <div className={`p-2 rounded border transition-all ${shaftDepth >= 3 && shaftDepth < 8 ? 'border-[#C5A059] bg-[rgba(197,160,89,0.15)] text-[#F5F3ED]' : 'border-[rgba(255,255,255,0.05)] text-[#666]'}`}>
                    <span className="text-[9px] text-[#C5A059] block">LAYER Z1 (3 to 8m)</span>
                    Hard Calcrete Capstone & Weathered Mudstone
                  </div>
                  <div className={`p-2 rounded border transition-all ${shaftDepth >= 8 && shaftDepth < 13 ? 'border-[#C5A059] bg-[rgba(197,160,89,0.15)] text-[#F5F3ED]' : 'border-[rgba(255,255,255,0.05)] text-[#666]'}`}>
                    <span className="text-[9px] text-[#C5A059] block">LAYER Z2 (8 to 13m)</span>
                    White Kaolinitic Clay & Sandstone Drive Chamber
                  </div>
                  <div className={`p-2 rounded border transition-all ${shaftDepth >= 13 ? 'border-[#5C7D91] bg-[rgba(92,125,145,0.25)] text-[#F5F3ED] font-bold shadow-[0_0_12px_rgba(92,125,145,0.3)]' : 'border-[rgba(255,255,255,0.05)] text-[#666]'}`}>
                    <span className="text-[9px] text-[#5C7D91] block">LAYER Z3 (-14.2m) // TARGET OPAL HORIZON</span>
                    Cretaceous Bulldog Shale Seam // Marine Fossil Nodules
                  </div>
                </div>

                {/* Depth Slider */}
                <div className="mt-4 pt-4 border-t border-[rgba(242,240,235,0.08)]">
                  <div className="flex justify-between text-xs text-[#A39580] mb-1">
                    <span>WINCH CAGE POSITION</span>
                    <span className="text-[#5C7D91] font-bold">-{shaftDepth} meters</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="18"
                    step="0.5"
                    value={shaftDepth}
                    onChange={(e) => setShaftDepth(Number(e.target.value))}
                    className="w-full accent-[#5C7D91] bg-[#1a1a1a] h-1.5 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-[#0A0D0B] border border-[rgba(242,240,235,0.08)] rounded">
                <h4 className="text-xs text-[#5C7D91] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ArrowDown className="w-3.5 h-3.5" />
                  SUBTERRANEAN REALITY
                </h4>
                <p className="text-xs text-[#C8C2B7] leading-relaxed italic font-serif">
                  "{step.immersiveDetails.keyQuote}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {step.telemetryMetrics.map((m, i) => (
                  <div key={i} className="p-3 bg-[#080B09] border border-[rgba(242,240,235,0.06)] rounded">
                    <span className="text-[9px] text-[#777] uppercase block">{m.label}</span>
                    <span className="text-xs text-[#F5F3ED] font-bold mt-0.5 block">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: FIND AN OPAL */}
        {step.stepNumber === 6 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[#050605] border border-[rgba(197,160,89,0.3)] rounded-lg p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-[#A39580] mb-4">
                <span className="text-[#C5A059] uppercase font-bold tracking-wider">
                  WORKING FACE // SPECIMEN AOSA-AND-LUN-001
                </span>
                <button
                  onClick={() => setIsUvLightOn(!isUvLightOn)}
                  className={`px-2.5 py-1 rounded text-xs border flex items-center gap-1.5 transition-all ${
                    isUvLightOn
                      ? 'bg-[rgba(197,160,89,0.2)] border-[#C5A059] text-[#F5F3ED]'
                      : 'bg-[#111] border-[rgba(255,255,255,0.1)] text-[#777]'
                  }`}
                >
                  <Eye className="w-3 h-3 text-[#C5A059]" />
                  <span>{isUvLightOn ? 'UV SPECTRAL BEAM ON' : 'NATURAL LIGHT'}</span>
                </button>
              </div>

              {/* Interactive Chisel Extraction Area */}
              <div className="my-auto py-8 text-center bg-[#090C0A] border border-[rgba(197,160,89,0.2)] rounded-lg p-6 relative overflow-hidden">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-[#1a1408] via-[#2c2210] to-[#5a431c] border-2 border-[#C5A059] flex items-center justify-center relative shadow-[0_0_30px_rgba(197,160,89,0.2)]">
                  {/* Play of colour flare */}
                  <motion.div
                    animate={isUvLightOn ? { rotate: 360, scale: [1, 1.15, 1] } : {}}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-[#00ffcc] via-[#ff007f] to-[#ffcc00] opacity-70 blur-sm"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-[#F5F3ED] font-bold">
                    48.20 CT
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-display text-[#F5F3ED] uppercase">
                    UNTREATED ANDAMOOKA MATRIX BOULDER
                  </h4>
                  <p className="text-xs text-[#A39580] mt-1 font-mono">
                    Extracted at 14.2m depth in Bulldog Shale seam
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[rgba(242,240,235,0.06)] flex items-center justify-between text-xs text-[#8FA382]">
                <span>✓ PHOTOGRAMMETRIC RIG READY</span>
                <span className="font-bold text-[#C5A059]">SPECIMEN REGISTERED</span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-[#0A0D0B] border border-[rgba(242,240,235,0.08)] rounded">
                <h4 className="text-xs text-[#C5A059] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  MOMENT OF DISCOVERY
                </h4>
                <p className="text-xs text-[#C8C2B7] leading-relaxed italic font-serif">
                  "{step.immersiveDetails.keyQuote}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {step.telemetryMetrics.map((m, i) => (
                  <div key={i} className="p-3 bg-[#080B09] border border-[rgba(242,240,235,0.06)] rounded">
                    <span className="text-[9px] text-[#777] uppercase block">{m.label}</span>
                    <span className="text-xs text-[#F5F3ED] font-bold mt-0.5 block">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: EXPLORE ITS DIGITAL TWIN */}
        {step.stepNumber === 7 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-[#050605] border border-[rgba(197,160,89,0.4)] rounded-lg p-2 sm:p-4 min-h-[440px] flex flex-col">
              <div className="flex items-center justify-between text-xs text-[#A39580] px-2 mb-2">
                <span className="text-[#C5A059] font-bold uppercase tracking-wider flex items-center gap-2">
                  <Box className="w-3.5 h-3.5" />
                  INTERACTIVE 3D WEBGL TWIN // Matrixtwin_opal.glb
                </span>
                <span className="text-[10px] text-[#8FA382] font-mono">
                  48,200 QUAD POLYGONS // 4K PBR
                </span>
              </div>

              {/* Real Three.js WebGL Viewer */}
              <div className="flex-1 rounded border border-[rgba(242,240,235,0.08)] bg-[#000] overflow-hidden min-h-[380px] relative">
                <ThreeOpalViewer
                  modelUrl={matrixTwinUrl}
                  className="w-full h-full min-h-[380px]"
                  
                />
              </div>

              <div className="mt-2 px-2 flex items-center justify-between text-[10px] text-[#888]">
                <span>Click & drag to rotate 360° | Scroll to zoom sub-millimeter pores</span>
                <Link to="/opal" className="text-[#C5A059] hover:underline flex items-center gap-1">
                  Full Opal Twin Laboratory →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 bg-[#0A0D0B] border border-[rgba(242,240,235,0.08)] rounded">
                <h4 className="text-xs text-[#C5A059] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5" />
                  SCIENTIFIC CERTAINTY
                </h4>
                <p className="text-xs text-[#C8C2B7] leading-relaxed">
                  The digital twin allows Hans in Germany to inspect the matrix porosity and play-of-colour with identical fidelity as if holding the raw stone under a 10x gemological loupe in Andamooka.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {step.telemetryMetrics.map((m, i) => (
                  <div key={i} className="p-3 bg-[#080B09] border border-[rgba(242,240,235,0.06)] rounded">
                    <span className="text-[9px] text-[#777] uppercase block">{m.label}</span>
                    <span className="text-xs text-[#F5F3ED] font-bold mt-0.5 block">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: EXAMINE ITS PROVENANCE */}
        {step.stepNumber === 8 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[#070908] border border-[rgba(143,163,130,0.3)] rounded-lg p-6">
              <div className="flex items-center justify-between text-xs text-[#A39580] mb-4">
                <span className="text-[#8FA382] uppercase font-bold tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  IMMUTABLE PROVENANCE LEDGER AUDIT
                </span>
                <span className="px-2 py-0.5 bg-[#0D1210] border border-[#8FA382] text-[#8FA382] text-[10px]">
                  ALL NODES VERIFIED
                </span>
              </div>

              {/* Tabs for Provenance Pillars */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                <button
                  onClick={() => setProvenanceTab('PXRF')}
                  className={`py-2 px-1 text-center text-[10px] rounded border transition-all ${
                    provenanceTab === 'PXRF'
                      ? 'border-[#8FA382] bg-[rgba(143,163,130,0.2)] text-[#F5F3ED] font-bold'
                      : 'border-[rgba(242,240,235,0.08)] bg-[#050605] text-[#888]'
                  }`}
                >
                  pXRF Chemical
                </button>
                <button
                  onClick={() => setProvenanceTab('GPS_CLAIM')}
                  className={`py-2 px-1 text-center text-[10px] rounded border transition-all ${
                    provenanceTab === 'GPS_CLAIM'
                      ? 'border-[#8FA382] bg-[rgba(143,163,130,0.2)] text-[#F5F3ED] font-bold'
                      : 'border-[rgba(242,240,235,0.08)] bg-[#050605] text-[#888]'
                  }`}
                >
                  GPS Claim 4192
                </button>
                <button
                  onClick={() => setProvenanceTab('CONSENT')}
                  className={`py-2 px-1 text-center text-[10px] rounded border transition-all ${
                    provenanceTab === 'CONSENT'
                      ? 'border-[#8FA382] bg-[rgba(143,163,130,0.2)] text-[#F5F3ED] font-bold'
                      : 'border-[rgba(242,240,235,0.08)] bg-[#050605] text-[#888]'
                  }`}
                >
                  Kokatha Consent
                </button>
                <button
                  onClick={() => setProvenanceTab('CUSTODY')}
                  className={`py-2 px-1 text-center text-[10px] rounded border transition-all ${
                    provenanceTab === 'CUSTODY'
                      ? 'border-[#8FA382] bg-[rgba(143,163,130,0.2)] text-[#F5F3ED] font-bold'
                      : 'border-[rgba(242,240,235,0.08)] bg-[#050605] text-[#888]'
                  }`}
                >
                  Custody Chain
                </button>
              </div>

              {/* Dynamic Dossier Content */}
              <div className="p-4 bg-[#050605] border border-[rgba(242,240,235,0.08)] rounded font-mono text-xs space-y-2">
                {provenanceTab === 'PXRF' && (
                  <div>
                    <div className="text-[#8FA382] font-bold uppercase mb-2">
                      PORTABLE X-RAY FLUORESCENCE (pXRF) SPECTRAL DNA
                    </div>
                    <p className="text-[#CCC] font-sans text-xs mb-3">
                      Fe content 2.14% and Zr trace 142 ppm match 99.98% against the baseline Andamooka matrix reference library.
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-[#888] bg-[#0A0D0B] p-2 rounded">
                      <span>SiO₂ MATRIX: 91.4%</span>
                      <span>HYDRATION RATIO: 6.8% H₂O</span>
                      <span>TRACE IRON: Fe 2.14%</span>
                      <span>CONFIDENCE: 99.98%</span>
                    </div>
                  </div>
                )}
                {provenanceTab === 'GPS_CLAIM' && (
                  <div>
                    <div className="text-[#8FA382] font-bold uppercase mb-2">
                      CLAIM 4192 CENTROID & STRATIGRAPHIC LOCK
                    </div>
                    <p className="text-[#CCC] font-sans text-xs mb-3">
                      Locus: Lunatic Field (30°27'12.4" S, 137°09'54.1" E), Level -14.2m AHD. Registered under South Australia Mining Act Claim 4192.
                    </p>
                  </div>
                )}
                {provenanceTab === 'CONSENT' && (
                  <div>
                    <div className="text-[#8FA382] font-bold uppercase mb-2">
                      KOKATHA CULTURAL PROTOCOL CONSENT #KOK-2026
                    </div>
                    <p className="text-[#CCC] font-sans text-xs mb-3">
                      Signed off by Kokatha Heritage Committee with 5% cultural dividend allocation to community language digitization.
                    </p>
                  </div>
                )}
                {provenanceTab === 'CUSTODY' && (
                  <div>
                    <div className="text-[#8FA382] font-bold uppercase mb-2">
                      UNBROKEN CRYPTOGRAPHIC CUSTODY HASH
                    </div>
                    <p className="text-[#CCC] font-sans text-xs mb-2">
                      0x84f9a12c8e3... miner Matt Kathagen $\to$ 0x3b119... APP Field Lab $\to$ 0x9812a... Dr. Hans Lindner
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-[#0A0D0B] border border-[rgba(242,240,235,0.08)] rounded">
                <h4 className="text-xs text-[#8FA382] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" />
                  AUTHENTICITY MATRIX
                </h4>
                <p className="text-xs text-[#C8C2B7] leading-relaxed italic font-serif">
                  "{step.immersiveDetails.keyQuote}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {step.telemetryMetrics.map((m, i) => (
                  <div key={i} className="p-3 bg-[#080B09] border border-[rgba(242,240,235,0.06)] rounded">
                    <span className="text-[9px] text-[#777] uppercase block">{m.label}</span>
                    <span className="text-xs text-[#F5F3ED] font-bold mt-0.5 block">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 9: ACQUIRE THE REAL ASSET (REGENERATIVE VALUE) */}
        {step.stepNumber === 9 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[#070A08] border border-[#C5A059] rounded-lg p-6">
              <div className="flex items-center justify-between text-xs text-[#A39580] mb-4">
                <span className="text-[#C5A059] uppercase font-bold tracking-wider flex items-center gap-2">
                  <Coins className="w-4 h-4" />
                  REGENERATIVE CIVIC PURCHASE // NOT E-COMMERCE
                </span>
                <span className="text-[#F5F3ED] font-bold font-mono text-sm">
                  TOTAL: ${simulatedPriceAUD} AUD (2,540 €)
                </span>
              </div>

              {/* Value Cascade Breakdown Bars */}
              <div className="space-y-3 mb-6">
                <div className="text-[10px] text-[#888] uppercase tracking-widest">
                  AUTOMATED STAKEHOLDER REVENUE DISTRIBUTION:
                </div>

                {CIVIC_VALUE_BREAKDOWN.map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-[#040504] rounded border border-[rgba(242,240,235,0.06)]">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-[#F5F3ED] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.category} ({item.percentage}%)
                      </span>
                      <span className="font-mono font-bold" style={{ color: item.color }}>
                        ${((simulatedPriceAUD * item.percentage) / 100).toFixed(0)} AUD
                      </span>
                    </div>
                    <div className="text-[10px] text-[#A39580]">
                      {item.description}
                    </div>
                    <div className="text-[9px] text-[#8FA382] font-mono mt-1">
                      IMPACT: {item.impactMetric}
                    </div>
                  </div>
                ))}
              </div>

              {/* Purchase Trigger Button */}
              <button
                onClick={() => setIsPurchaseExecuted(true)}
                disabled={isPurchaseExecuted}
                className={`w-full py-3 px-6 rounded font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  isPurchaseExecuted
                    ? 'bg-[#0D1810] border border-[#8FA382] text-[#8FA382]'
                    : 'bg-[#C5A059] hover:bg-[#D4B06A] text-[#050505] shadow-[0_0_20px_rgba(197,160,89,0.3)]'
                }`}
              >
                {isPurchaseExecuted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#8FA382]" />
                    <span>PURCHASE RATIFIED // CIVIC FUNDS DISTRIBUTED</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>EXECUTE CUSTODIANSHIP PURCHASE ($4,200 AUD)</span>
                  </>
                )}
              </button>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-[#0A0D0B] border border-[rgba(242,240,235,0.08)] rounded">
                <h4 className="text-xs text-[#C5A059] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Award className="w-3.5 h-3.5" />
                  BUYING A RELATIONSHIP TO PLACE
                </h4>
                <p className="text-xs text-[#C8C2B7] leading-relaxed italic font-serif">
                  "{step.immersiveDetails.keyQuote}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {step.telemetryMetrics.map((m, i) => (
                  <div key={i} className="p-3 bg-[#080B09] border border-[rgba(242,240,235,0.06)] rounded">
                    <span className="text-[9px] text-[#777] uppercase block">{m.label}</span>
                    <span className="text-xs text-[#F5F3ED] font-bold mt-0.5 block">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 10: RECEIVE THE PHYSICAL ASSET IN GERMANY */}
        {step.stepNumber === 10 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[#070908] border border-[rgba(197,160,89,0.4)] rounded-lg p-6">
              <div className="flex items-center justify-between text-xs text-[#A39580] mb-4">
                <span className="text-[#C5A059] uppercase font-bold tracking-wider flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  PHYSICAL DISPATCH & NFC HANDOFF // HEIDELBERG STUDY
                </span>
                <span className="px-2 py-0.5 bg-[#0D1210] border border-[#8FA382] text-[#8FA382] text-[10px]">
                  DELIVERED IN 4 DAYS
                </span>
              </div>

              {/* Presentation Casket Unboxing Box */}
              <div className="p-6 bg-[#040504] border border-[rgba(242,240,235,0.12)] rounded-lg text-center relative overflow-hidden mb-6">
                <div className="w-20 h-20 mx-auto rounded-lg bg-[#14100a] border border-[#C5A059] flex items-center justify-center text-[#C5A059] mb-3 shadow-[0_0_25px_rgba(197,160,89,0.2)]">
                  <Box className="w-10 h-10" />
                </div>

                <h4 className="text-sm font-display text-[#F5F3ED] uppercase tracking-wide">
                  HAND-CARVED OUTBACK SANDSTONE PRESENTATION CASKET
                </h4>
                <p className="text-xs text-[#A39580] mt-1 max-w-md mx-auto">
                  Contains: Physical Matrix Opal Specimen #001, Matt’s hand-signed field journal, etched titanium provenance deed, and active NFC hardware chip.
                </p>

                {/* NFC Pairing Simulator */}
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D1810] border border-[#8FA382] text-[#8FA382] text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-[#8FA382]" />
                  <span>NFC DIGITAL TWIN LINKED TO HEIDELBERG WORKSTATION</span>
                </div>
              </div>

              {/* Perpetual Custodianship Deed */}
              <div className="p-4 bg-[#0A0D0B] border border-[rgba(197,160,89,0.3)] rounded text-xs space-y-1 font-mono">
                <div className="text-[#C5A059] font-bold">PERPETUAL ANDAMOOKA CITIZEN BOND #0482</div>
                <div className="text-[#CCC]">Custodian: Dr. Hans Lindner (Heidelberg, Germany)</div>
                <div className="text-[#888]">Rights: Annual Town AGM Remote Voting, Bore Telemetry Stream, Open Dugout Invitation</div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-[#0A0D0B] border border-[rgba(242,240,235,0.08)] rounded">
                <h4 className="text-xs text-[#C5A059] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Award className="w-3.5 h-3.5" />
                  PERPETUAL EMBODIMENT OF PLACE
                </h4>
                <p className="text-xs text-[#C8C2B7] leading-relaxed italic font-serif">
                  "{step.immersiveDetails.keyQuote}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {step.telemetryMetrics.map((m, i) => (
                  <div key={i} className="p-3 bg-[#080B09] border border-[rgba(242,240,235,0.06)] rounded">
                    <span className="text-[9px] text-[#777] uppercase block">{m.label}</span>
                    <span className="text-xs text-[#F5F3ED] font-bold mt-0.5 block">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chapter Action Footer */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[rgba(242,240,235,0.08)]">
        <div className="text-xs text-[#888] font-mono">
          <span>NEXT ACTION: </span>
          <span className="text-[#C5A059]">{step.actionPrompt}</span>
        </div>

        <div className="flex items-center gap-3">
          {step.stepNumber < 10 ? (
            <button
              onClick={onNextStep}
              className="py-2.5 px-6 rounded bg-[#C5A059] hover:bg-[#D4B06A] text-[#050505] font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(197,160,89,0.25)] flex items-center gap-2"
            >
              <span>ADVANCE TO CHAPTER {step.stepNumber + 1}</span>
              <ArrowDown className="w-3.5 h-3.5 -rotate-90" />
            </button>
          ) : (
            <button
              onClick={() => onJumpToStep(0)}
              className="py-2.5 px-6 rounded bg-[#8FA382] hover:bg-[#A3B896] text-[#050505] font-mono text-xs font-bold transition-all flex items-center gap-2"
            >
              <span>REPLAY COMPLETE JOURNEY</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
