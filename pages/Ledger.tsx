import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ThreeOpalViewer, 
  ProjectedFeature, 
  ThreeOpalViewerRef, 
  OpticalMetrics,
  OpticalBench3DPoints,
  MatrixBench3DPoints,
} from '../components/opal/ThreeOpalViewer';

const matrixTwinUrl = '/images/Matrixtwin_opal.glb';

type InspectionNodeId = 'diffraction' | 'material' | 'custody';
type InstrumentState = 'OBSERVE' | 'INVESTIGATE' | 'EVIDENCE';
type MatrixContextLayer = 'INTERFACE' | 'STRATIGRAPHY' | 'PROVENANCE';

export default function Ledger() {
  const viewerRef = useRef<ThreeOpalViewerRef>(null);

  // Core spatial observational parameters
  const [distance, setDistance] = useState(4.8);
  const [azimuth, setAzimuth] = useState(42);
  const [inclination, setInclination] = useState(-12);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleUserInteraction = () => {
    setAutoRotate(false);
    setHasInteracted(true);
  };

  // Real-time View Geometry Telemetry
  const [opticalMetrics, setOpticalMetrics] = useState<OpticalMetrics>({
    angleOfIncidence: 35,
    viewAngle: 25,
    lightAzimuthDeg: 45,
    relativeIllumination: 'DIRECT KEY ILLUMINATION',
    specularAlignment: 0.72,
  });

  // Explicit Application State: OBSERVE -> INVESTIGATE -> MODEL / VERIFY -> OBSERVE
  const [instrumentState, setInstrumentState] = useState<InstrumentState>('OBSERVE');
  const [activeNodeId, setActiveNodeId] = useState<InspectionNodeId | null>(null);

  // Matrix Boundary Specific Controls
  const [matrixLayer, setMatrixLayer] = useState<MatrixContextLayer>('INTERFACE');
  const [sectionEnabled, setSectionEnabled] = useState(false);
  const [sectionOffset, setSectionOffset] = useState(0.0);

  // Real-time Projected 3D Coordinates
  const [projectedFeatures, setProjectedFeatures] = useState<ProjectedFeature[]>([]);
  const [benchPoints, setBenchPoints] = useState<OpticalBench3DPoints | null>(null);
  const [matrixPoints, setMatrixPoints] = useState<MatrixBench3DPoints | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  // Specimen Interaction Handler: enters INVESTIGATE state on selection
  const handleFeatureSelect = (nodeId: string | null) => {
    handleUserInteraction();
    if (!nodeId) {
      setActiveNodeId(null);
      setInstrumentState('OBSERVE');
      setSectionEnabled(false);
    } else {
      const id = nodeId as InspectionNodeId;
      setActiveNodeId(id);
      setInstrumentState('INVESTIGATE');
      if (id !== 'material') {
        setSectionEnabled(false);
      }
    }
  };

  const handleCloseInvestigation = () => {
    setActiveNodeId(null);
    setInstrumentState('OBSERVE');
    setSectionEnabled(false);
  };

  const handleEnterEvidence = () => {
    setInstrumentState('EVIDENCE');
  };

  const handleReturnToInvestigate = () => {
    setInstrumentState('INVESTIGATE');
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-[#0C0B0A] text-[#F5F2ED] relative select-none font-mono-tech">
      
      {/* 1. BACKGROUND REGISTRATION GRID & OPTICAL CROSSHAIRS */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-15">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(200,169,126,0.06) 0%, transparent 60%),
              linear-gradient(to right, rgba(245,242,237,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(245,242,237,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 64px 64px, 64px 64px',
          }}
        />
      </div>

      {/* 2. THREE.JS 3D CANVAS (PHYSICAL GLB SPECIMEN & SPATIAL INSTRUMENTS) */}
      <div className="absolute inset-0 z-10">
        <ThreeOpalViewer
          ref={viewerRef}
          modelUrl={matrixTwinUrl}
          className="w-full h-full"
          autoRotate={autoRotate}
          onInteractionStart={handleUserInteraction}
          activeFeatureId={activeNodeId}
          instrumentMode={instrumentState === 'EVIDENCE' ? 'investigate' : instrumentState.toLowerCase() as any}
          features={['diffraction', 'material', 'custody']}
          sectionEnabled={sectionEnabled}
          sectionOffset={sectionOffset}
          onCameraChange={(d) => setDistance(d)}
          onOrientationChange={(az, inc) => {
            setAzimuth(az);
            setInclination(inc);
          }}
          onOpticalMetricsChange={(metrics) => setOpticalMetrics(metrics)}
          onFeaturesProjected={(feats) => setProjectedFeatures(feats)}
          onOpticalBenchProjected={(bench) => setBenchPoints(bench)}
          onMatrixBenchProjected={(mb) => setMatrixPoints(mb)}
          onFeatureSelect={handleFeatureSelect}
        />
      </div>

      

      {/* 4. SPATIAL 3D VECTOR LABELS & RETICLES (LIVING IN THE 3D SCENE) */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        
        
        {/* Interaction Affordance: Fades out upon first rotation / user interaction */}
        <AnimatePresence>
          {!hasInteracted && instrumentState === 'OBSERVE' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute left-1/2 bottom-20 -translate-x-1/2 pointer-events-none z-30"
            >
              <div className="px-3 py-1.5 bg-[#0C0B0A]/85 border border-[#F5F2ED]/20 backdrop-blur-sm text-[8px] uppercase tracking-[0.3em] text-[#F5F2ED] font-mono-tech flex items-center gap-2 shadow-lg">
                <span className="w-1.5 h-1.5 bg-[#C8A97E] animate-pulse" />
                <span>DRAG TO EXAMINE</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4A. In OBSERVE State: Restrained Specimen Anchor Pins */}
        {instrumentState === 'OBSERVE' && (
          projectedFeatures.map((feat) => {
            if (!feat.visible) return null;
            const nodeId = feat.id as InspectionNodeId;
            const title = 
              nodeId === 'diffraction' ? 'PRECIOUS SILICA SEAM' :
              nodeId === 'material' ? 'HOST MATRIX BOUNDARY' : 'REGISTRATION BASE';

            return (
              <div 
                key={feat.id} 
                className="absolute pointer-events-auto group cursor-pointer"
                style={{ left: `${feat.x}px`, top: `${feat.y}px` }}
              >
                {/* Precision Anchor Reticle */}
                <button
                  onClick={() => handleFeatureSelect(nodeId)}
                  className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center focus:outline-none cursor-pointer"
                  aria-label={`Inspect ${title}`}
                >
                  <span className="w-2 h-2 rounded-full border border-[#C8A97E] bg-[#C8A97E]/30 group-hover:bg-[#C8A97E] group-hover:scale-125 transition-all duration-200" />
                  <span className="absolute w-5 h-5 rounded-full border border-[#C8A97E]/40 border-dashed group-hover:border-[#C8A97E] group-hover:scale-110 transition-all duration-300" />
                </button>

                {/* Restrained Hover Label */}
                <div className="absolute left-4 -top-3 hidden sm:flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-[#0C0B0A]/90 px-1.5 py-0.5 border border-[#F5F2ED]/15 text-[8px] uppercase tracking-wider text-[#F5F2ED]">
                  <span className="w-1 h-1 bg-[#C8A97E]" />
                  <span>{title}</span>
                  <span className="text-[#C8A97E] text-[7px]">[CLICK TO INSPECT]</span>
                </div>
              </div>
            );
          })
        )}

        {/* 4B. In OPTICAL BENCH State (Diffraction Node) */}
        {(instrumentState === 'INVESTIGATE' || instrumentState === 'EVIDENCE') && activeNodeId === 'diffraction' && benchPoints && (
          <>
            {/* Vector Label: Incident Key Ray [L] */}
            {benchPoints.lightSource.visible && (
              <div 
                className="absolute -translate-x-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-[#0C0B0A]/85 border border-[#C8A97E]/40 text-[#C8A97E] text-[7px] uppercase tracking-wider whitespace-nowrap backdrop-blur-xs"
                style={{ left: `${benchPoints.lightSource.x}px`, top: `${benchPoints.lightSource.y}px` }}
              >
                INCIDENT RAY [L]
              </div>
            )}

            {/* Vector Label: Surface Normal [N] */}
            {benchPoints.normalTip.visible && (
              <div 
                className="absolute -translate-x-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-[#0C0B0A]/85 border border-[#F5F2ED]/30 text-[#F5F2ED] text-[7px] uppercase tracking-wider whitespace-nowrap backdrop-blur-xs"
                style={{ left: `${benchPoints.normalTip.x}px`, top: `${benchPoints.normalTip.y}px` }}
              >
                SURFACE NORMAL [N]
              </div>
            )}

            {/* Vector Label: Observer Vector [V] */}
            {benchPoints.observerTip.visible && (
              <div 
                className="absolute -translate-x-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-[#0C0B0A]/85 border border-[#7CA8C4]/40 text-[#7CA8C4] text-[7px] uppercase tracking-wider whitespace-nowrap backdrop-blur-xs"
                style={{ left: `${benchPoints.observerTip.x}px`, top: `${benchPoints.observerTip.y}px` }}
              >
                OBSERVER [V]
              </div>
            )}

            {/* Angular Arc Degree Readout */}
            {benchPoints.arcMid.visible && (
              <div 
                className="absolute -translate-x-1/2 -translate-y-1/2 px-1 py-0.5 bg-[#0C0B0A]/90 border border-[#C8A97E]/50 text-[#C8A97E] text-[8px] font-bold tracking-widest whitespace-nowrap backdrop-blur-xs"
                style={{ left: `${benchPoints.arcMid.x}px`, top: `${benchPoints.arcMid.y}px` }}
              >
                θi = {opticalMetrics.angleOfIncidence}°
              </div>
            )}

                        {/* Peak Optical Alignment Spatial Annotation */}
            {benchPoints.anchor.visible && opticalMetrics.specularAlignment > 0.96 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -translate-x-1/2 mt-12 flex flex-col items-center pointer-events-none"
                style={{ left: `${benchPoints.anchor.x}px`, top: `${benchPoints.anchor.y}px` }}
              >
                <div className="w-px h-6 bg-gradient-to-b from-[#7CA8C4] to-transparent mb-1" />
                <div className="bg-[#0C0B0A]/95 border border-[#7CA8C4]/40 p-2 text-center backdrop-blur-md shadow-2xl">
                  <div className="text-[8px] text-[#7CA8C4] font-bold tracking-widest uppercase mb-1">
                    OPTICAL RESPONSE MAXIMUM
                  </div>
                  <div className="text-[7px] uppercase tracking-wider text-[#8E8A82]">
                    <span className="text-[#7CA8C4] font-bold">[02 · COMPUTED]</span><br/>
                    Maximum model response under current<br/>illumination / observation geometry.
                  </div>
                </div>
              </motion.div>
            )}

            {/* SPATIAL EXAMINATION CALLOUT FOR OPTICAL BENCH */}
            {benchPoints.anchor.visible && (
              <div 
                className="absolute pointer-events-auto"
                style={{ 
                  left: `${benchPoints.anchor.x}px`, 
                  top: `${benchPoints.anchor.y}px` 
                }}
              >
                <svg className="absolute overflow-visible pointer-events-none" style={{ left: 0, top: 0 }}>
                  <circle cx="0" cy="0" r="3" fill="#C8A97E" />
                  <circle cx="0" cy="0" r="7" stroke="#C8A97E" strokeWidth="1" strokeDasharray="2,2" fill="none" />
                  <polyline 
                    points="0,0 35,-35 75,-35" 
                    fill="none" 
                    stroke="#C8A97E" 
                    strokeWidth="1" 
                    strokeOpacity="0.8"
                  />
                </svg>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-[75px] -top-[65px] w-[260px] sm:w-[290px] bg-[#0C0B0A]/92 border border-[#C8A97E]/40 backdrop-blur-md p-3.5 shadow-2xl space-y-2.5 text-[#F5F2ED]"
                >
                  {instrumentState === 'INVESTIGATE' && (
                    <>
                      <div className="flex items-center justify-between border-b border-[#F5F2ED]/10 pb-1.5">
                        <div className="flex items-center gap-1.5 text-[8px] uppercase tracking-widest text-[#C8A97E]">
                          <span className="w-1.5 h-1.5 bg-[#C8A97E]" />
                          <span className="font-bold">PLAY-OF-COLOUR · PRECIOUS SILICA SEAM</span>
                        </div>
                        <button 
                          onClick={handleCloseInvestigation}
                          className="text-[8px] text-[#8E8A82] hover:text-[#F5F2ED] uppercase tracking-widest px-1 border border-[#F5F2ED]/15 cursor-pointer"
                        >
                          CLOSE ×
                        </button>
                      </div>

                      {/* Optical Epistemic Identification */}
                      <div className="p-2 bg-[#1A1815] border-l-2 border-[#C8A97E] space-y-0.5 text-[7px]">
                        <p className="font-bold text-[#C8A97E] uppercase tracking-wider">
                          COMPUTATIONAL OPTICAL MODEL · ANGLE-DEPENDENT DIFFRACTION
                        </p>
                        <p className="text-[#8E8A82] uppercase tracking-wider">
                          ILLUSTRATIVE MODEL — NOT SPECIMEN SPECTROMETRY
                        </p>
                      </div>

                      {/* Telemetry Grid with Clear Epistemic Classification */}
                      <div className="space-y-1.5 py-0.5 text-[8px] font-mono-tech">
                        <div className="flex items-center justify-between text-[7px] text-[#8E8A82] px-0.5">
                          <span>VIEW GEOMETRY</span>
                          <span className="text-[#7CA8C4]">[02 · COMPUTED]</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 bg-[#141210]/60 p-2 border border-[#F5F2ED]/5">
                          <div>
                            <p className="text-[7px] text-[#8E8A82]">INCIDENCE (θi)</p>
                            <p className="text-[#C8A97E] font-bold text-xs">{opticalMetrics.angleOfIncidence}°</p>
                          </div>
                          <div>
                            <p className="text-[7px] text-[#8E8A82]">OBSERVER (αv)</p>
                            <p className="text-[#7CA8C4] font-bold text-xs">{opticalMetrics.viewAngle}°</p>
                          </div>
                          <div className="col-span-2 pt-1 border-t border-[#F5F2ED]/5 flex items-center justify-between text-[7px]">
                            <span className="text-[#8E8A82]">ILLUMINATION REGIME:</span>
                            <span className="text-[#F5F2ED] font-semibold">{opticalMetrics.relativeIllumination}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-1 flex flex-col gap-1 text-[8px]">
                        <button
                          onClick={handleEnterEvidence}
                          className="w-full py-2 px-2 bg-[#141210] hover:bg-[#1C1A17] border border-[#F5F2ED]/10 hover:border-[#F5F2ED]/30 text-left flex items-center justify-between text-[#8E8A82] hover:text-[#F5F2ED] cursor-pointer transition-colors"
                        >
                          <span className="uppercase tracking-widest font-bold">WHAT WOULD PROVE THIS?</span>
                          <span className="text-[#8E8A82]">EVIDENCE PATHWAY →</span>
                        </button>
                      </div>
                    </>
                  )}

                  {instrumentState === 'EVIDENCE' && (
                    <>
                      <div className="flex items-center justify-between border-b border-[#F5F2ED]/10 pb-1.5">
                        <div className="flex items-center gap-1.5 text-[8px] uppercase tracking-widest text-[#F5F2ED]">
                          <span className="w-1.5 h-1.5 bg-[#F5F2ED]" />
                          <span className="font-bold">EVIDENCE PATHWAY</span>
                        </div>
                        <button 
                          onClick={handleReturnToInvestigate}
                          className="text-[8px] text-[#8E8A82] hover:text-[#F5F2ED] uppercase tracking-widest px-1 border border-[#F5F2ED]/15 cursor-pointer"
                        >
                          BACK ←
                        </button>
                      </div>

                      <div className="space-y-3 pt-2">
                        {/* A — OBSERVED */}
                        <div className="pl-3 border-l border-[#C8A97E] space-y-1 relative">
                          <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[#0C0B0A] border border-[#C8A97E] rounded-full" />
                          <div className="text-[#C8A97E] text-[7px] font-bold tracking-widest">[01 · OBSERVED]</div>
                          <p className="text-[#F5F2ED] text-[8px] uppercase tracking-wider leading-relaxed">
                            Green play-of-colour recorded on the physical specimen.
                          </p>
                        </div>

                        {/* B — MODELLED */}
                        <div className="pl-3 border-l border-[#7CA8C4] space-y-1 relative">
                          <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[#0C0B0A] border border-[#7CA8C4] rounded-full" />
                          <div className="text-[#7CA8C4] text-[7px] font-bold tracking-widest">[02 · COMPUTED]</div>
                          <p className="text-[#F5F2ED] text-[8px] uppercase tracking-wider leading-relaxed">
                            Angle-dependent structural colour can be modelled from ordered silica domains.
                          </p>
                        </div>

                        {/* C — UNKNOWN */}
                        <div className="pl-3 border-l border-[#8E8A82] space-y-1 relative">
                          <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[#0C0B0A] border border-[#8E8A82] rounded-full" />
                          <div className="text-[#8E8A82] text-[7px] font-bold tracking-widest">[04 · PENDING]</div>
                          <p className="text-[#F5F2ED] text-[8px] uppercase tracking-wider leading-relaxed">
                            The actual domain structure of this specimen has not been measured.
                          </p>
                        </div>

                        {/* REQUIRED EVIDENCE */}
                        <div className="pl-3 border-l border-[#F5F2ED]/30 space-y-1 relative pb-1">
                          <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[#0C0B0A] border border-[#F5F2ED]/30 rounded-full" />
                          <div className="text-[#F5F2ED]/50 text-[7px] font-bold tracking-widest">REQUIRED EVIDENCE</div>
                          <p className="text-[#F5F2ED] text-[8px] uppercase tracking-wider leading-relaxed">
                            SEM / SPECTROSCOPY / APPROPRIATE LABORATORY ANALYSIS
                          </p>
                        </div>

                        <div className="mt-2 p-1.5 bg-[#141210] border border-[#F5F2ED]/10 flex justify-between items-center text-[7px]">
                          <span className="text-[#8E8A82] tracking-widest uppercase">EVIDENCE STATUS</span>
                          <span className="text-[#C8A97E] font-bold tracking-widest uppercase">OPEN</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[8px]">
                        <button
                          onClick={handleReturnToInvestigate}
                          className="text-[#8E8A82] hover:text-[#F5F2ED] underline cursor-pointer"
                        >
                          ← Return to Vectors
                        </button>
                        <button
                          onClick={handleCloseInvestigation}
                          className="text-[#8E8A82] hover:text-[#F5F2ED] cursor-pointer"
                        >
                          Close ×
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
            )}
          </>
        )}
{/* 4C. In MATRIX BOUNDARY State (Material Node) */}
        {(instrumentState === 'INVESTIGATE' || instrumentState === 'EVIDENCE') && activeNodeId === 'material' && matrixPoints && (
          <>
            {/* Vector Label: Stratigraphic Axis [Z] */}
            {matrixPoints.axisTip.visible && (
              <div 
                className="absolute -translate-x-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-[#0C0B0A]/85 border border-[#C8A97E]/40 text-[#C8A97E] text-[7px] uppercase tracking-wider whitespace-nowrap backdrop-blur-xs"
                style={{ left: `${matrixPoints.axisTip.x}px`, top: `${matrixPoints.axisTip.y}px` }}
              >
                STRATIGRAPHIC VECTOR [Z]
              </div>
            )}

            {/* Geological Reference Plane Tag */}
            {matrixPoints.planeOrigin.visible && (
              <div 
                className="absolute -translate-x-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-[#0C0B0A]/85 border border-[#8E8A82]/40 text-[#8E8A82] text-[7px] uppercase tracking-wider whitespace-nowrap backdrop-blur-xs"
                style={{ left: `${matrixPoints.planeOrigin.x}px`, top: `${matrixPoints.planeOrigin.y}px` }}
              >
                GEOLOGICAL REF PLANE [S]
              </div>
            )}

            {/* SPATIAL EXAMINATION CALLOUT FOR MATRIX BOUNDARY */}
            {matrixPoints.anchor.visible && (
              <div 
                className="absolute pointer-events-auto"
                style={{ 
                  left: `${matrixPoints.anchor.x}px`, 
                  top: `${matrixPoints.anchor.y}px` 
                }}
              >
                <svg className="absolute overflow-visible pointer-events-none" style={{ left: 0, top: 0 }}>
                  <circle cx="0" cy="0" r="3" fill="#8E8A82" />
                  <circle cx="0" cy="0" r="7" stroke="#8E8A82" strokeWidth="1" strokeDasharray="2,2" fill="none" />
                  <polyline 
                    points="0,0 35,-35 75,-35" 
                    fill="none" 
                    stroke="#8E8A82" 
                    strokeWidth="1" 
                    strokeOpacity="0.8"
                  />
                </svg>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-[75px] -top-[70px] w-[275px] sm:w-[310px] bg-[#0C0B0A]/94 border border-[#8E8A82]/40 backdrop-blur-md p-3.5 shadow-2xl space-y-2.5 text-[#F5F2ED]"
                >
                  {/* Header & Close */}
                  <div className="flex items-center justify-between border-b border-[#F5F2ED]/10 pb-1.5">
                    <div className="flex items-center gap-1.5 text-[8px] uppercase tracking-widest text-[#8E8A82]">
                      <span className="w-1.5 h-1.5 bg-[#8E8A82]" />
                      <span className="font-bold text-[#F5F2ED]">THE MATRIX BOUNDARY</span>
                    </div>
                    <button 
                      onClick={handleCloseInvestigation}
                      className="text-[8px] text-[#8E8A82] hover:text-[#F5F2ED] uppercase tracking-widest px-1 border border-[#F5F2ED]/15 cursor-pointer"
                    >
                      CLOSE ×
                    </button>
                  </div>

                  {/* Context Layers Progression: SPECIMEN SCALE -> MATRIX -> EXTRACTION CONTEXT */}
                  <div className="grid grid-cols-3 gap-1 text-[7px] uppercase tracking-wider font-mono-tech">
                    <button
                      onClick={() => setMatrixLayer('INTERFACE')}
                      className={`py-1 px-1 border text-center transition-colors cursor-pointer ${
                        matrixLayer === 'INTERFACE'
                          ? 'border-[#C8A97E] text-[#C8A97E] bg-[#C8A97E]/10 font-bold'
                          : 'border-[#F5F2ED]/10 text-[#8E8A82] hover:text-[#F5F2ED]'
                      }`}
                    >
                      01 INTERFACE
                    </button>
                    <button
                      onClick={() => setMatrixLayer('STRATIGRAPHY')}
                      className={`py-1 px-1 border text-center transition-colors cursor-pointer ${
                        matrixLayer === 'STRATIGRAPHY'
                          ? 'border-[#C8A97E] text-[#C8A97E] bg-[#C8A97E]/10 font-bold'
                          : 'border-[#F5F2ED]/10 text-[#8E8A82] hover:text-[#F5F2ED]'
                      }`}
                    >
                      02 STRATA
                    </button>
                    <button
                      onClick={() => setMatrixLayer('PROVENANCE')}
                      className={`py-1 px-1 border text-center transition-colors cursor-pointer ${
                        matrixLayer === 'PROVENANCE'
                          ? 'border-[#C8A97E] text-[#C8A97E] bg-[#C8A97E]/10 font-bold'
                          : 'border-[#F5F2ED]/10 text-[#8E8A82] hover:text-[#F5F2ED]'
                      }`}
                    >
                      03 EXTRACTION
                    </button>
                  </div>

                  {/* LAYER CONTENT */}
                  {matrixLayer === 'INTERFACE' && (
                    <div className="space-y-2 text-[8px] font-mono-tech">
                      <div className="p-2 bg-[#141210]/70 border border-[#F5F2ED]/5 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-[#8E8A82]">HOST MATRIX:</span>
                          <span className="text-[#F5F2ED] font-bold">FERRUGINOUS SANDSTONE [01]</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#8E8A82]">CONTACT NATURE:</span>
                          <span className="text-[#C8A97E] font-bold">OBSERVED MATERIAL CONTACT [01]</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#8E8A82]">EVIDENCE STATUS:</span>
                          <span className="text-[#8E8A82]">PHOTOGRAMMETRIC SURFACE CAPTURE</span>
                        </div>
                      </div>

                      {/* Non-Destructive Digital Section Apparatus */}
                      <div className="p-2 bg-[#171513] border border-[#8E8A82]/30 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[7px] text-[#C8A97E] uppercase font-bold tracking-wider">
                            NON-DESTRUCTIVE DIGITAL SECTION
                          </span>
                          <button
                            onClick={() => setSectionEnabled(!sectionEnabled)}
                            className={`px-1.5 py-0.5 text-[7px] uppercase font-bold border transition-colors cursor-pointer ${
                              sectionEnabled 
                                ? 'bg-[#C8A97E] text-[#0C0B0A] border-[#C8A97E]' 
                                : 'bg-transparent text-[#8E8A82] border-[#F5F2ED]/20 hover:text-[#F5F2ED]'
                            }`}
                          >
                            {sectionEnabled ? 'ACTIVE [ON]' : 'DISABLED [OFF]'}
                          </button>
                        </div>

                        {sectionEnabled && (
                          <div className="pt-1 space-y-1">
                            <div className="flex justify-between text-[7px]">
                              <span className="text-[#8E8A82]">SECTION PLANE OFFSET:</span>
                              <span className="text-[#C8A97E]">{sectionOffset.toFixed(2)}</span>
                            </div>
                            <input
                              type="range"
                              min="-1.0"
                              max="1.0"
                              step="0.05"
                              value={sectionOffset}
                              onChange={(e) => setSectionOffset(parseFloat(e.target.value))}
                              className="w-full h-1 bg-[#24211D] accent-[#C8A97E] cursor-pointer"
                            />
                            <p className="text-[7px] text-[#8E8A82] pt-0.5 leading-tight">
                              DIGITAL SURFACE MESH ONLY · INTERNAL MINERALOGICAL VOLUMES NOT CAPTURED
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {matrixLayer === 'STRATIGRAPHY' && (
                    <div className="space-y-1.5 text-[8px] font-mono-tech">
                      <div className="p-2 bg-[#141210]/80 border border-[#F5F2ED]/10 space-y-1">
                        <div className="flex items-center justify-between text-[7px]">
                          <p className="text-[#C8A97E] font-bold text-[8px]">REGIONAL GEOLOGICAL CONTEXT:</p>
                          <span className="text-[#7CA8C4]">[03 · GENERAL KNOWLEDGE]</span>
                        </div>
                        <p className="text-[7px] text-[#8E8A82] leading-relaxed">
                          Great Artesian Basin Cretaceous sedimentary sequence. Secondary opal deposition precipitated within paleochannel and weathered sandstone pores.
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between p-1.5 bg-[#141210] border border-[#F5F2ED]/5 text-[7px]">
                          <span className="text-[#8E8A82]">FORMATION SEQUENCE:</span>
                          <span className="text-[#F5F2ED]">MARREE SUBGROUP / BULLDOG SHALE</span>
                        </div>
                        <div className="flex justify-between p-1.5 bg-[#141210] border border-[#F5F2ED]/5 text-[7px]">
                          <span className="text-[#8E8A82]">EXTRACTION HORIZON:</span>
                          <span className="text-[#8E8A82] font-bold">UNVERIFIED SPECIMEN HORIZON [04]</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {matrixLayer === 'PROVENANCE' && (
                    <div className="space-y-1.5 text-[8px] font-mono-tech">
                      <div className="space-y-1 text-[7px]">
                        <div className="flex justify-between p-1.5 bg-[#141210] border border-[#F5F2ED]/5">
                          <span className="text-[#8E8A82]">FIELD PROVENANCE:</span>
                          <span className="text-[#F5F2ED] font-bold">ANDAMOOKA FIELD, SA [01]</span>
                        </div>
                        <div className="flex justify-between p-1.5 bg-[#141210] border border-[#F5F2ED]/5">
                          <span className="text-[#8E8A82]">SHAFT / CLAIM NUMBER:</span>
                          <span className="text-[#8E8A82] font-semibold">NOT YET REGISTERED [04]</span>
                        </div>
                        <div className="flex justify-between p-1.5 bg-[#141210] border border-[#F5F2ED]/5">
                          <span className="text-[#8E8A82]">EXTRACTION DEPTH:</span>
                          <span className="text-[#8E8A82] font-semibold">UNVERIFIED FIELD RECORD [04]</span>
                        </div>
                        <div className="flex justify-between p-1.5 bg-[#141210] border border-[#F5F2ED]/5">
                          <span className="text-[#8E8A82]">PHYSICAL SPECIMEN:</span>
                          <span className="text-[#F5F2ED]">REGISTERED DIGITAL TWIN [01]</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Footing note */}
                  <div className="pt-1 flex items-center justify-between border-t border-[#F5F2ED]/10 text-[7px] text-[#8E8A82]">
                    <span>EPISTEMIC STATUS: RESTRAINED</span>
                    <button
                      onClick={handleCloseInvestigation}
                      className="text-[#C8A97E] hover:underline cursor-pointer"
                    >
                      RETURN TO SPECIMEN →
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </>
        )}

        
      </div>

      {/* 5. INSTRUMENT SAFE AREA (AVOIDS GLOBAL NAVIGATION) */}
      <div className="absolute top-[120px] md:top-[96px] left-0 right-0 bottom-0 pointer-events-none z-30 overflow-hidden">
        <div className="relative w-full h-full">
          {/* Optical Corner Registration Crosshairs (+) */}
          <div className="absolute top-0 left-6 text-[10px] text-[#6E6250] font-mono-tech select-none">+</div>
          <div className="absolute top-0 right-6 text-[10px] text-[#6E6250] font-mono-tech select-none">+</div>
          <div className="absolute bottom-6 left-6 text-[10px] text-[#6E6250] font-mono-tech select-none">+</div>
          <div className="absolute bottom-6 right-6 text-[10px] text-[#6E6250] font-mono-tech select-none">+</div>

          {/* 3. MINIMAL INSTITUTIONAL HEADER */}
          <header className="absolute top-0 left-0 w-full flex justify-between items-start px-5 md:px-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C8A97E]" />
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#F5F2ED] font-semibold">
                  AUSTRALIAN PROVENANCE PROJECT
                </p>
              </div>
              <div className="flex items-center gap-2.5 text-[8px] uppercase tracking-[0.2em] text-[#8E8A82] mt-1">
                <span>ANDAMOOKA MATRIX OPAL</span>
                <span>·</span>
                <span className="text-[#C8A97E]">APP-AMK-001</span>
              </div>
            </div>

            {/* Current Epistemic State Badge */}
            <div className="flex items-center gap-2 text-[8px] uppercase tracking-widest px-2.5 py-1 bg-[#141210]/80 border border-[#F5F2ED]/10 backdrop-blur-sm pointer-events-auto">
              <span className="text-[#8E8A82]">STATE:</span>
              <span className={`font-bold ${instrumentState === 'OBSERVE' ? 'text-[#8E8A82]' : 'text-[#C8A97E]'}`}>
                [{instrumentState}{activeNodeId ? ` : ${activeNodeId.toUpperCase()}` : ''}]
              </span>
            </div>
          </header>

          {/* 4D. In CUSTODY / REGISTRATION BASE State */}
          {(instrumentState === 'INVESTIGATE' || instrumentState === 'EVIDENCE') && activeNodeId === 'custody' && (
            <div className="absolute top-20 right-6 z-30 pointer-events-auto w-[260px] bg-[#0C0B0A]/92 border border-[#C8A97E]/40 backdrop-blur-md p-3.5 shadow-2xl space-y-2.5 text-[#F5F2ED] text-[8px] font-mono-tech">
              <div className="flex items-center justify-between border-b border-[#F5F2ED]/10 pb-1.5">
                <div className="flex items-center gap-1.5 text-[8px] uppercase tracking-widest text-[#C8A97E]">
                  <span className="w-1.5 h-1.5 bg-[#C8A97E]" />
                  <span className="font-bold">SPECIMEN REGISTRATION</span>
                </div>
                <button 
                  onClick={handleCloseInvestigation}
                  className="text-[8px] text-[#8E8A82] hover:text-[#F5F2ED] uppercase tracking-widest px-1 border border-[#F5F2ED]/15 cursor-pointer"
                >
                  CLOSE ×
                </button>
              </div>
              <div className="space-y-1 text-[7px]">
                <div className="flex justify-between p-1.5 bg-[#141210] border border-[#F5F2ED]/5">
                  <span className="text-[#8E8A82]">SPECIMEN ID:</span>
                  <span className="text-[#C8A97E] font-bold">APP-AMK-001</span>
                </div>
                <div className="flex justify-between p-1.5 bg-[#141210] border border-[#F5F2ED]/5">
                  <span className="text-[#8E8A82]">CAPTURE MODALITY:</span>
                  <span className="text-[#F5F2ED]">PHOTOGRAMMETRIC 3D SCAN</span>
                </div>
                <div className="flex justify-between p-1.5 bg-[#141210] border border-[#F5F2ED]/5">
                  <span className="text-[#8E8A82]">CUSTODIAL RECORD:</span>
                  <span className="text-[#F5F2ED]">PERMANENT DIGITAL REGISTER</span>
                </div>
              </div>
            </div>
          )}

          {/* 5. MINIMAL BOTTOM OBSERVATIONAL TELEMETRY BAR */}
          <footer className="absolute bottom-0 left-0 w-full pointer-events-none p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 text-[8px] text-[#8E8A82] uppercase tracking-wider">
            <div className="flex items-center gap-4 bg-[#0C0B0A]/80 border border-[#F5F2ED]/10 backdrop-blur-sm px-3 py-1.5 pointer-events-auto">
              <div>
                <span className="text-[#6E6250]">AZIMUTH: </span>
                <span className="text-[#F5F2ED] font-bold">{azimuth}°</span>
              </div>
              <div>
                <span className="text-[#6E6250]">ELEVATION: </span>
                <span className="text-[#F5F2ED] font-bold">{inclination}°</span>
              </div>
              <div className="hidden md:block">
                <span className="text-[#6E6250]">REGIME: </span>
                <span className="text-[#C8A97E] font-bold">{opticalMetrics.relativeIllumination}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`px-2.5 py-1.5 border text-[8px] uppercase tracking-wider transition-colors cursor-pointer ${
                  autoRotate 
                    ? 'border-[#C8A97E] text-[#C8A97E] bg-[#C8A97E]/10' 
                    : 'border-[#F5F2ED]/15 text-[#8E8A82] hover:text-[#F5F2ED]'
                }`}
              >
                {autoRotate ? 'TURNTABLE: ON' : 'TURNTABLE: OFF'}
              </button>
              <button
                onClick={() => {
                  handleCloseInvestigation();
                  if (viewerRef.current) viewerRef.current.resetView();
                }}
                className="px-2.5 py-1.5 border border-[#F5F2ED]/15 text-[#8E8A82] hover:text-[#F5F2ED] text-[8px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                RESET VIEW
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
