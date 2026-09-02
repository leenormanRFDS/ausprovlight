import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Activity,
  Layers,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Users,
  Gem,
  MapPin,
  Compass,
  Landmark,
  Database,
  Radio,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import {
  SYSTEM_NODES,
  SYSTEM_EDGES,
  MASTER_SYSTEM_LOOP,
  SYSTEM_SIMULATION_EVENTS,
  SystemNodeId,
  SystemNode,
  SystemEdge,
  SystemSimulationEvent,
} from '../../data/livingNetworkData';

interface LivingSystemNetworkProps {
  initialSelectedNode?: SystemNodeId;
  onNodeSelect?: (nodeId: SystemNodeId) => void;
  onSelectNode?: (nodeId: SystemNodeId) => void;
  showFullControls?: boolean;
}

export const LivingSystemNetwork: React.FC<LivingSystemNetworkProps> = ({
  initialSelectedNode = 'provenance',
  onNodeSelect,
  onSelectNode,
  showFullControls = true,
}) => {
  // Navigation & Selection States
  const [selectedNodeId, setSelectedNodeId] = useState<SystemNodeId>(initialSelectedNode);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<SystemNodeId | null>(null);

  // Mode: 'FREE_EXPLORE' | 'GUIDED_LOOP' | 'SIMULATION'
  const [interactionMode, setInteractionMode] = useState<'FREE_EXPLORE' | 'GUIDED_LOOP' | 'SIMULATION'>('FREE_EXPLORE');

  // Guided Loop State
  const [currentLoopStep, setCurrentLoopStep] = useState<number>(0);
  const [isPlayingLoop, setIsPlayingLoop] = useState<boolean>(false);

  // Vector Channel Filter
  const [activeChannelFilter, setActiveChannelFilter] = useState<'ALL' | 'VALUE_CHAIN' | 'GEOLOGICAL_PHYSICAL' | 'CULTURAL_MEMORY' | 'GOVERNANCE'>('ALL');

  // Live Simulation State
  const [activeSimulation, setActiveSimulation] = useState<SystemSimulationEvent | null>(null);
  const [simulationLogIndex, setSimulationLogIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Timer Ref for Loop & Simulation
  const loopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const simTimerRef = useRef<NodeJS.Timeout | null>(null);

  const selectedNode = SYSTEM_NODES[selectedNodeId];
  const activeEdge = selectedEdgeId ? SYSTEM_EDGES.find((e) => e.id === selectedEdgeId) : null;

  // Sync with initial
  useEffect(() => {
    if (initialSelectedNode && initialSelectedNode !== selectedNodeId) {
      setSelectedNodeId(initialSelectedNode);
    }
  }, [initialSelectedNode]);

  // Handle Node Click
  const handleSelectNode = (id: SystemNodeId) => {
    setSelectedNodeId(id);
    setSelectedEdgeId(null);
    if (onNodeSelect) onNodeSelect(id);
    if (onSelectNode) onSelectNode(id);
  };

  // Handle Edge Click
  const handleSelectEdge = (edge: SystemEdge) => {
    setSelectedEdgeId(edge.id);
  };

  // Guided Loop Auto-Play
  useEffect(() => {
    if (interactionMode === 'GUIDED_LOOP' && isPlayingLoop) {
      loopTimerRef.current = setInterval(() => {
        setCurrentLoopStep((prev) => {
          const next = (prev + 1) % MASTER_SYSTEM_LOOP.length;
          const stepData = MASTER_SYSTEM_LOOP[next];
          setSelectedNodeId(stepData.fromNode);
          return next;
        });
      }, 4200);
    } else {
      if (loopTimerRef.current) clearInterval(loopTimerRef.current);
    }
    return () => {
      if (loopTimerRef.current) clearInterval(loopTimerRef.current);
    };
  }, [interactionMode, isPlayingLoop]);

  // Guided Loop Step selection sync
  useEffect(() => {
    if (interactionMode === 'GUIDED_LOOP') {
      const stepData = MASTER_SYSTEM_LOOP[currentLoopStep];
      if (stepData) {
        setSelectedNodeId(stepData.fromNode);
        // Find matching edge
        const matchEdge = SYSTEM_EDGES.find(
          (e) => e.from === stepData.fromNode && e.to === stepData.toNode
        );
        if (matchEdge) setSelectedEdgeId(matchEdge.id);
      }
    }
  }, [currentLoopStep, interactionMode]);

  // Simulation execution
  const runSimulation = (sim: SystemSimulationEvent) => {
    setActiveSimulation(sim);
    setIsSimulating(true);
    setSimulationLogIndex(0);
    setInteractionMode('SIMULATION');

    let currentLog = 0;
    if (simTimerRef.current) clearInterval(simTimerRef.current);

    simTimerRef.current = setInterval(() => {
      currentLog += 1;
      if (currentLog < sim.telemetryLogs.length) {
        setSimulationLogIndex(currentLog);
        setSelectedNodeId(sim.telemetryLogs[currentLog].node);
      } else {
        setIsSimulating(false);
        if (simTimerRef.current) clearInterval(simTimerRef.current);
      }
    }, 1400);
  };

  // Filtered Edges
  const filteredEdges = SYSTEM_EDGES.filter((edge) => {
    if (activeChannelFilter === 'ALL') return true;
    return edge.vectorChannel === activeChannelFilter;
  });

  // Calculate Node Coordinates in SVG (ViewBox: 0 0 1000 650)
  const getNodeSvgCoords = (node: SystemNode) => {
    // scale 0-100 to 0-1000 and 0-650 with safe padding
    const paddingX = 90;
    const paddingY = 60;
    const width = 1000 - paddingX * 2;
    const height = 650 - paddingY * 2;

    const x = paddingX + (node.position.x / 100) * width;
    const y = paddingY + (node.position.y / 100) * height;
    return { x, y };
  };

  const getNodeIcon = (id: SystemNodeId) => {
    switch (id) {
      case 'provenance':
        return <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />;
      case 'community':
        return <Users className="w-4 h-4 text-[#C5A059]" />;
      case 'opal':
        return <Gem className="w-4 h-4 text-[#5C7D91]" />;
      case 'town':
        return <MapPin className="w-4 h-4 text-[#A39580]" />;
      case 'tourism':
        return <Compass className="w-4 h-4 text-[#8FA382]" />;
      case 'heritage':
        return <Landmark className="w-4 h-4 text-[#C47D68]" />;
    }
  };

  const getPillarColor = (id: SystemNodeId) => {
    return SYSTEM_NODES[id]?.color || '#C5A059';
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top HUD: Mode Selector & Vector Channel Filter */}
      {showFullControls && (
        <div className="p-4 sm:p-5 border border-hairline-gold bg-[#0A0907] flex flex-col lg:flex-row lg:items-center justify-between gap-4 crosshair-corner">
          {/* Interaction Modes */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[9px] font-mono-tech text-[#8E8A82] tracking-[0.2em] uppercase mr-2 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
              <span>SYSTEM INTERACTION:</span>
            </span>

            <button
              onClick={() => {
                setInteractionMode('FREE_EXPLORE');
                setIsPlayingLoop(false);
                setActiveSimulation(null);
              }}
              className={`px-3 py-1.5 text-[9px] font-mono-tech tracking-[0.15em] uppercase border transition-all ${
                interactionMode === 'FREE_EXPLORE'
                  ? 'border-[#C5A059] bg-[#17140E] text-[#F5F3ED] font-bold shadow-sm'
                  : 'border-[rgba(242,240,235,0.08)] bg-[#070706] text-[#777] hover:text-[#CCC]'
              }`}
            >
              01 // LIVING NETWORK TOPOLOGY
            </button>

            <button
              onClick={() => {
                setInteractionMode('GUIDED_LOOP');
                setIsPlayingLoop(true);
                setActiveSimulation(null);
              }}
              className={`px-3 py-1.5 text-[9px] font-mono-tech tracking-[0.15em] uppercase border transition-all flex items-center gap-1.5 ${
                interactionMode === 'GUIDED_LOOP'
                  ? 'border-[#C5A059] bg-[#17140E] text-[#F5F3ED] font-bold shadow-sm'
                  : 'border-[rgba(242,240,235,0.08)] bg-[#070706] text-[#777] hover:text-[#CCC]'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span>02 // TRACE 7-STEP MASTER LOOP</span>
            </button>

            <button
              onClick={() => {
                setInteractionMode('SIMULATION');
                setIsPlayingLoop(false);
                if (!activeSimulation) runSimulation(SYSTEM_SIMULATION_EVENTS[0]);
              }}
              className={`px-3 py-1.5 text-[9px] font-mono-tech tracking-[0.15em] uppercase border transition-all flex items-center gap-1.5 ${
                interactionMode === 'SIMULATION'
                  ? 'border-[#C5A059] bg-[#17140E] text-[#F5F3ED] font-bold shadow-sm'
                  : 'border-[rgba(242,240,235,0.08)] bg-[#070706] text-[#777] hover:text-[#CCC]'
              }`}
            >
              <Zap className="w-3 h-3 text-[#8FA382]" />
              <span>03 // LIVE CIRCUIT SIMULATOR</span>
            </button>
          </div>

          {/* Vector Channel Filter */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-[rgba(242,240,235,0.06)]">
            <span className="text-[8px] font-mono-tech text-[#666] tracking-[0.15em] uppercase mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-[#777]" />
              <span>CHANNEL:</span>
            </span>
            {(
              [
                { id: 'ALL', label: 'ALL VECTORS' },
                { id: 'VALUE_CHAIN', label: 'VALUE FLOW' },
                { id: 'GEOLOGICAL_PHYSICAL', label: 'PHYSICAL / SPATIAL' },
                { id: 'CULTURAL_MEMORY', label: 'CULTURAL MEMORY' },
                { id: 'GOVERNANCE', label: 'CONSENSUS' },
              ] as const
            ).map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChannelFilter(ch.id)}
                className={`px-2 py-1 text-[8px] font-mono-tech tracking-[0.1em] uppercase transition-all rounded-sm ${
                  activeChannelFilter === ch.id
                    ? 'bg-[rgba(197,160,89,0.2)] text-[#C5A059] border border-[#C5A059]'
                    : 'text-[#666] hover:text-[#AAA] bg-transparent border border-transparent'
                }`}
              >
                {ch.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Guided Loop Control Bar (Visible when in Guided Loop Mode) */}
      {interactionMode === 'GUIDED_LOOP' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-4 bg-[#0F0D08] border border-[#C5A059] rounded flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_0_20px_rgba(197,160,89,0.12)]"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlayingLoop(!isPlayingLoop)}
              className="p-2.5 bg-[#C5A059] text-[#0A0706] rounded font-bold hover:bg-[#D9B46E] transition-all flex items-center justify-center"
              title={isPlayingLoop ? 'Pause Loop' : 'Play Loop'}
            >
              {isPlayingLoop ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() =>
                  setCurrentLoopStep((prev) =>
                    prev === 0 ? MASTER_SYSTEM_LOOP.length - 1 : prev - 1
                  )
                }
                className="p-2 border border-[rgba(242,240,235,0.15)] text-[#CCC] hover:text-[#FFF] hover:border-[#C5A059] rounded"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() =>
                  setCurrentLoopStep((prev) => (prev + 1) % MASTER_SYSTEM_LOOP.length)
                }
                className="p-2 border border-[rgba(242,240,235,0.15)] text-[#CCC] hover:text-[#FFF] hover:border-[#C5A059] rounded"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#C5A059] tracking-[0.2em] uppercase font-bold">
                <span>STEP 0{currentLoopStep + 1} OF 0{MASTER_SYSTEM_LOOP.length}</span>
                <span className="opacity-40">|</span>
                <span className="text-[#F5F3ED]">{MASTER_SYSTEM_LOOP[currentLoopStep].title}</span>
              </div>
              <p className="text-xs font-serif-editorial italic text-[#C5BEB3] max-w-xl line-clamp-1">
                {MASTER_SYSTEM_LOOP[currentLoopStep].causalAxiom}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {MASTER_SYSTEM_LOOP.map((step, idx) => (
              <button
                key={step.step}
                onClick={() => {
                  setCurrentLoopStep(idx);
                  setIsPlayingLoop(false);
                }}
                className={`w-7 h-7 rounded text-[9px] font-mono-tech font-bold transition-all flex items-center justify-center ${
                  currentLoopStep === idx
                    ? 'bg-[#C5A059] text-[#0A0706] shadow-[0_0_10px_rgba(197,160,89,0.5)]'
                    : 'bg-[#181611] text-[#777] border border-[rgba(242,240,235,0.08)] hover:text-[#DDD]'
                }`}
              >
                {step.step}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Simulation Event Selector Bar (Visible when in Simulation Mode) */}
      {interactionMode === 'SIMULATION' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-4 bg-[#080B0D] border border-[#5C7D91] rounded flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono-tech text-[#5C7D91] tracking-[0.2em] uppercase font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 animate-pulse text-[#4ECDC4]" />
              <span>CIRCUIT SCENARIO:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {SYSTEM_SIMULATION_EVENTS.map((sim) => {
                const isActive = activeSimulation?.id === sim.id;
                return (
                  <button
                    key={sim.id}
                    onClick={() => runSimulation(sim)}
                    className={`px-3 py-1 text-[9px] font-mono-tech tracking-[0.1em] uppercase border transition-all rounded ${
                      isActive
                        ? 'border-[#4ECDC4] bg-[rgba(78,205,196,0.15)] text-[#F5F3ED] font-bold'
                        : 'border-[rgba(242,240,235,0.1)] text-[#888] hover:text-[#CCC]'
                    }`}
                  >
                    {sim.title.replace('SIMULATE: ', '')}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-[9px] font-mono-tech text-[#4ECDC4] tracking-[0.15em] uppercase">
            {isSimulating ? 'TRANSMITTING SIGNAL...' : 'SIGNAL CONVERGED // READY'}
          </div>
        </motion.div>
      )}

      {/* Main Interactive Topology Visual Canvas & Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left / Center Visual Graph Area (7 cols on desktop) */}
        <div className="lg:col-span-7 p-6 sm:p-8 border border-hairline-gold bg-[#080807] crosshair-corner flex flex-col justify-between relative overflow-hidden min-h-[480px]">
          {/* Subtle Archival Grid lines */}
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Top Canvas Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-[rgba(242,240,235,0.06)] pb-3 mb-4">
            <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#C5A059] tracking-[0.2em] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
              <span>THE FIVE-PILLAR RELATIONAL TOPOLOGY</span>
            </div>
            <span className="text-[8px] font-mono-tech text-[#777] tracking-[0.15em] uppercase">
              CLICK ANY NODE OR PATHWAY TO INSPECT
            </span>
          </div>

          {/* Interactive SVG Network Graph */}
          <div className="relative z-10 w-full flex-1 flex items-center justify-center my-2">
            <svg
              viewBox="0 0 1000 650"
              className="w-full h-auto max-h-[500px] select-none"
              style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.8))' }}
            >
              <defs>
                {/* Glow Filter */}
                <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="core-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="12" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Animated Flow Pulse Gradients */}
                <linearGradient id="flow-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C5A059" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#FFF" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#C5A059" stopOpacity="0.2" />
                </linearGradient>

                <linearGradient id="flow-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5C7D91" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#4ECDC4" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#5C7D91" stopOpacity="0.2" />
                </linearGradient>

                {/* Central Radial Coordinate Rings */}
                <radialGradient id="central-radial" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
                  <stop offset="70%" stopColor="#C5A059" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background Coordinate Axis & Concentric Rings */}
              <circle
                cx="500"
                cy="325"
                r="220"
                fill="none"
                stroke="rgba(197, 160, 89, 0.08)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              <circle
                cx="500"
                cy="325"
                r="130"
                fill="none"
                stroke="rgba(197, 160, 89, 0.12)"
                strokeWidth="1"
              />
              <line
                x1="220"
                y1="325"
                x2="780"
                y2="325"
                stroke="rgba(242, 240, 235, 0.04)"
                strokeWidth="1"
              />
              <line
                x1="500"
                y1="80"
                x2="500"
                y2="570"
                stroke="rgba(242, 240, 235, 0.04)"
                strokeWidth="1"
              />

              {/* 1. RENDER EDGES (Relational Vectors) */}
              {filteredEdges.map((edge) => {
                const fromNode = SYSTEM_NODES[edge.from];
                const toNode = SYSTEM_NODES[edge.to];
                if (!fromNode || !toNode) return null;

                const fromCoords = getNodeSvgCoords(fromNode);
                const toCoords = getNodeSvgCoords(toNode);

                const isEdgeSelected = selectedEdgeId === edge.id;
                const isConnectedToSelectedNode =
                  selectedNodeId === edge.from || selectedNodeId === edge.to;
                const isCurrentGuidedStep =
                  interactionMode === 'GUIDED_LOOP' &&
                  MASTER_SYSTEM_LOOP[currentLoopStep].fromNode === edge.from &&
                  MASTER_SYSTEM_LOOP[currentLoopStep].toNode === edge.to;

                // Edge Curvature Control Point
                const midX = (fromCoords.x + toCoords.x) / 2;
                const midY = (fromCoords.y + toCoords.y) / 2;
                // Offset toward center or outward slightly
                const dx = toCoords.x - fromCoords.x;
                const dy = toCoords.y - fromCoords.y;
                const normalX = -dy * 0.12;
                const normalY = dx * 0.12;
                const controlX = midX + normalX;
                const controlY = midY + normalY;

                const pathData = `M ${fromCoords.x} ${fromCoords.y} Q ${controlX} ${controlY} ${toCoords.x} ${toCoords.y}`;

                let strokeColor = 'rgba(242, 240, 235, 0.12)';
                let strokeWidth = 1.2;

                if (isCurrentGuidedStep || isEdgeSelected) {
                  strokeColor = '#C5A059';
                  strokeWidth = 3;
                } else if (isConnectedToSelectedNode) {
                  strokeColor = 'rgba(197, 160, 89, 0.55)';
                  strokeWidth = 2;
                }

                return (
                  <g
                    key={edge.id}
                    className="cursor-pointer group"
                    onClick={() => handleSelectEdge(edge)}
                  >
                    {/* Broad invisible hit area for easy clicking */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="24"
                    />

                    {/* Visible Vector Line */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeDasharray={
                        isCurrentGuidedStep || isEdgeSelected ? 'none' : '3 3'
                      }
                      className="transition-all duration-300 group-hover:stroke-[#C5A059] group-hover:stroke-[2.5]"
                    />

                    {/* Animated Flowing Pulse Particle */}
                    {(isCurrentGuidedStep || isConnectedToSelectedNode || isEdgeSelected) && (
                      <circle r="3.5" fill="#FFF" filter="url(#gold-glow)">
                        <animateMotion
                          path={pathData}
                          dur={isCurrentGuidedStep ? '1.8s' : '3s'}
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}

                    {/* Midpoint Direction Arrow / Pill */}
                    {(isCurrentGuidedStep || isEdgeSelected || isConnectedToSelectedNode) && (
                      <g transform={`translate(${controlX}, ${controlY})`}>
                        <circle
                          r="9"
                          fill="#0D0C0A"
                          stroke={isCurrentGuidedStep || isEdgeSelected ? '#C5A059' : 'rgba(197,160,89,0.5)'}
                          strokeWidth="1"
                        />
                        <text
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="#C5A059"
                          fontSize="7"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          →
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* 2. RENDER CENTRAL PROVENANCE NEXUS CONNECTIONS */}
              {Object.keys(SYSTEM_NODES)
                .filter((id) => id !== 'provenance')
                .map((nodeId) => {
                  const pCoords = getNodeSvgCoords(SYSTEM_NODES.provenance);
                  const nCoords = getNodeSvgCoords(SYSTEM_NODES[nodeId as SystemNodeId]);
                  const isNodeActive = selectedNodeId === nodeId || selectedNodeId === 'provenance';

                  return (
                    <line
                      key={`core-${nodeId}`}
                      x1={pCoords.x}
                      y1={pCoords.y}
                      x2={nCoords.x}
                      y2={nCoords.y}
                      stroke={isNodeActive ? 'rgba(212, 175, 55, 0.4)' : 'rgba(212, 175, 55, 0.08)'}
                      strokeWidth={isNodeActive ? '1.5' : '1'}
                      strokeDasharray="2 4"
                    />
                  );
                })}

              {/* 3. RENDER CENTRAL PROVENANCE NEXUS NODE */}
              {(() => {
                const pNode = SYSTEM_NODES.provenance;
                const pCoords = getNodeSvgCoords(pNode);
                const isSelected = selectedNodeId === 'provenance';

                return (
                  <g
                    transform={`translate(${pCoords.x}, ${pCoords.y})`}
                    className="cursor-pointer"
                    onClick={() => handleSelectNode('provenance')}
                    onMouseEnter={() => setHoveredNodeId('provenance')}
                    onMouseLeave={() => setHoveredNodeId(null)}
                  >
                    {/* Glowing Core Background */}
                    <circle
                      r="65"
                      fill="url(#central-radial)"
                      filter="url(#core-glow)"
                      className="animate-pulse"
                    />

                    {/* Rotating Technical Coordinate Gear Rings */}
                    <circle
                      r="48"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="1.2"
                      strokeDasharray="8 6"
                      opacity={isSelected ? 0.9 : 0.4}
                    />
                    <circle
                      r="36"
                      fill="#0C0B08"
                      stroke={isSelected ? '#D4AF37' : 'rgba(212,175,55,0.5)'}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                    />

                    {/* Inner Diamond Marker */}
                    <polygon
                      points="0,-18 18,0 0,18 -18,0"
                      fill={isSelected ? '#D4AF37' : 'rgba(212,175,55,0.3)'}
                      stroke="#D4AF37"
                      strokeWidth="1"
                    />

                    {/* Central Core Label */}
                    <text
                      y="4"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#0A0706"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      P
                    </text>

                    {/* Title Text Below Core */}
                    <text
                      y="30"
                      textAnchor="middle"
                      fill="#F5F3ED"
                      fontSize="10"
                      fontFamily="'Cinzel', serif"
                      letterSpacing="0.2em"
                      fontWeight="bold"
                    >
                      PROVENANCE
                    </text>
                    <text
                      y="42"
                      textAnchor="middle"
                      fill="#D4AF37"
                      fontSize="7"
                      fontFamily="monospace"
                      letterSpacing="0.15em"
                    >
                      CENTRAL RELATIONAL NEXUS
                    </text>
                  </g>
                );
              })()}

              {/* 4. RENDER THE 5 PILLAR NODES */}
              {Object.keys(SYSTEM_NODES)
                .filter((id) => id !== 'provenance')
                .map((nodeId) => {
                  const node = SYSTEM_NODES[nodeId as SystemNodeId];
                  const coords = getNodeSvgCoords(node);
                  const isSelected = selectedNodeId === node.id;
                  const isHovered = hoveredNodeId === node.id;

                  // Check if node is active in simulation cascade
                  const isSimCascadeActive =
                    interactionMode === 'SIMULATION' &&
                    activeSimulation &&
                    activeSimulation.targetCascade
                      .slice(0, simulationLogIndex + 1)
                      .includes(node.id);

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${coords.x}, ${coords.y})`}
                      className="cursor-pointer group"
                      onClick={() => handleSelectNode(node.id)}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                    >
                      {/* Pulse Ring on Selection or Simulation Cascade */}
                      {(isSelected || isSimCascadeActive) && (
                        <circle
                          r="44"
                          fill="none"
                          stroke={node.color}
                          strokeWidth="1.5"
                          opacity="0.4"
                          className="animate-ping"
                        />
                      )}

                      {/* Outer Ring */}
                      <circle
                        r="34"
                        fill="#0A0907"
                        stroke={
                          isSelected || isSimCascadeActive
                            ? node.color
                            : isHovered
                            ? '#FFF'
                            : 'rgba(242,240,235,0.18)'
                        }
                        strokeWidth={isSelected || isSimCascadeActive ? 2.5 : 1.2}
                        className="transition-all duration-300"
                        style={{
                          filter:
                            isSelected || isSimCascadeActive
                              ? `drop-shadow(0 0 14px ${node.color})`
                              : 'none',
                        }}
                      />

                      {/* Inner Disk */}
                      <circle
                        r="26"
                        fill={isSelected ? `rgba(${node.accentRgb}, 0.2)` : '#0E0D0B'}
                        stroke={node.color}
                        strokeWidth="1"
                        strokeDasharray={isSelected ? 'none' : '4 3'}
                      />

                      {/* Node Code */}
                      <text
                        y="-4"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={isSelected ? '#FFF' : node.color}
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {node.code.replace('PIL-', '0')}
                      </text>

                      {/* Node Name */}
                      <text
                        y="8"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#F5F3ED"
                        fontSize="8"
                        fontFamily="monospace"
                        letterSpacing="0.1em"
                        fontWeight="600"
                      >
                        {node.name}
                      </text>

                      {/* External Label Pill */}
                      <g transform="translate(0, 48)">
                        <text
                          textAnchor="middle"
                          fill={isSelected ? node.color : '#888'}
                          fontSize="8"
                          fontFamily="monospace"
                          letterSpacing="0.15em"
                          className="uppercase font-bold"
                        >
                          {node.subtitle.split('&')[0]}
                        </text>
                      </g>
                    </g>
                  );
                })}
            </svg>
          </div>

          {/* Bottom Canvas Telemetry Strip */}
          <div className="relative z-10 pt-3 border-t border-[rgba(242,240,235,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[9px] font-mono-tech text-[#8E8A82]">
            <div className="flex items-center gap-3">
              <span className="text-[#C5A059] font-bold">CIRCUIT AXIOM:</span>
              <span className="text-[#CCC] uppercase">
                COMMUNITY ↔ OPAL ↔ TOWN ↔ TOURISM ↔ HERITAGE ↔ COMMUNITY
              </span>
            </div>
            <div className="text-[#666] tracking-[0.15em]">
              PROVENANCE AT THE CENTRE
            </div>
          </div>
        </div>

        {/* Right Detail Inspection Viewport (5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 border border-hairline-gold bg-[#0E0D0A] crosshair-corner">
          <AnimatePresence mode="wait">
            {/* If an Edge is specifically selected */}
            {activeEdge ? (
              <motion.div
                key={activeEdge.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-5"
              >
                {/* Edge Header */}
                <div className="flex items-center justify-between border-b border-[rgba(197,160,89,0.2)] pb-4">
                  <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#C5A059] tracking-[0.2em] font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    <span>RELATIONAL VECTOR // {activeEdge.vectorChannel}</span>
                  </div>
                  <button
                    onClick={() => setSelectedEdgeId(null)}
                    className="text-[8px] font-mono-tech text-[#777] hover:text-[#CCC] uppercase border border-[rgba(242,240,235,0.1)] px-2 py-0.5"
                  >
                    RESET TO NODE
                  </button>
                </div>

                {/* Connection Vector Title */}
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono-tech text-[#888] uppercase mb-2">
                    <span style={{ color: getPillarColor(activeEdge.from) }} className="font-bold">
                      {activeEdge.fromLabel}
                    </span>
                    <span className="text-[#C5A059]">➔</span>
                    <span style={{ color: getPillarColor(activeEdge.to) }} className="font-bold">
                      {activeEdge.toLabel}
                    </span>
                  </div>

                  <h3 className="font-display font-light text-xl sm:text-2xl text-[#F5F3ED] tracking-[0.12em] uppercase leading-tight">
                    {activeEdge.causalStatement}
                  </h3>
                </div>

                {/* Causal Mechanism Narrative */}
                <div className="p-4 bg-[#080806] border border-[rgba(242,240,235,0.08)]">
                  <span className="text-[8px] font-mono-tech text-[#C5A059] tracking-[0.2em] uppercase block mb-1 font-bold">
                    // HOW THIS TRANSMISSION OPERATES:
                  </span>
                  <p className="font-serif-editorial italic text-xs sm:text-sm text-[#C5BEB3] leading-relaxed">
                    {activeEdge.mechanism}
                  </p>
                </div>

                {/* Data Payload & Evidence */}
                <div className="space-y-2 text-[9px] font-mono-tech">
                  <div className="p-3 bg-[#060605] border border-[rgba(242,240,235,0.05)] flex flex-col gap-1">
                    <span className="text-[#777] uppercase tracking-[0.15em]">
                      TRANSMITTED DATA PAYLOAD:
                    </span>
                    <span className="text-[#A39580]">{activeEdge.dataPayload}</span>
                  </div>

                  <div className="p-3 bg-[#060605] border border-[rgba(197,160,89,0.15)] flex flex-col gap-1">
                    <span className="text-[#C5A059] uppercase tracking-[0.15em] font-bold">
                      REAL-WORLD EVIDENCE PROOF:
                    </span>
                    <span className="text-[#F5F3ED]">{activeEdge.realWorldEvidence}</span>
                  </div>
                </div>

                {/* Quick Actions to jump to either node */}
                <div className="pt-4 border-t border-[rgba(242,240,235,0.06)] flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleSelectNode(activeEdge.from)}
                    className="px-3 py-2 text-[9px] font-mono-tech uppercase border border-[rgba(242,240,235,0.12)] text-[#AAA] hover:text-[#FFF] rounded"
                  >
                    ← INSPECT {activeEdge.fromLabel}
                  </button>

                  <button
                    onClick={() => handleSelectNode(activeEdge.to)}
                    className="px-3 py-2 text-[9px] font-mono-tech uppercase bg-[#C5A059] text-[#0A0706] font-bold rounded hover:bg-[#D9B46E]"
                  >
                    EXPLORE {activeEdge.toLabel} →
                  </button>
                </div>
              </motion.div>
            ) : interactionMode === 'SIMULATION' && activeSimulation ? (
              /* If in Simulation Mode, show Telemetry Feed */
              <motion.div
                key="simulation-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-5"
              >
                {/* Simulation Header */}
                <div className="flex items-center justify-between border-b border-[rgba(78,205,196,0.3)] pb-4">
                  <div className="flex items-center gap-2 text-[9px] font-mono-tech text-[#4ECDC4] tracking-[0.2em] font-bold">
                    <Activity className="w-3.5 h-3.5 animate-spin text-[#4ECDC4]" />
                    <span>LIVE EVENT PROPAGATION TELEMETRY</span>
                  </div>
                  <span className="text-[8px] font-mono-tech text-[#8FA382] border border-[rgba(143,163,130,0.3)] px-2 py-0.5">
                    SIGNAL REALTIME
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-light text-lg sm:text-xl text-[#F5F3ED] tracking-[0.12em] uppercase leading-tight mb-2">
                    {activeSimulation.title}
                  </h3>
                  <p className="font-serif-editorial italic text-xs text-[#A8A399] leading-relaxed">
                    {activeSimulation.description}
                  </p>
                </div>

                {/* Animated Cascading Logs */}
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {activeSimulation.telemetryLogs.map((log, idx) => {
                    const isVisible = idx <= simulationLogIndex;
                    const isCurrent = idx === simulationLogIndex;
                    const logNode = SYSTEM_NODES[log.node];

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: isVisible ? 1 : 0.2, x: 0 }}
                        className={`p-2.5 border text-[9px] font-mono-tech flex flex-col gap-1 rounded ${
                          isCurrent
                            ? 'border-[#4ECDC4] bg-[rgba(78,205,196,0.1)] shadow-sm'
                            : 'border-[rgba(242,240,235,0.06)] bg-[#070706]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span style={{ color: logNode.color }} className="font-bold uppercase">
                            [{logNode.name}] // {log.timestamp}
                          </span>
                          {isCurrent && (
                            <span className="text-[8px] text-[#4ECDC4] animate-pulse font-bold">
                              ● ACTIVE SIGNAL
                            </span>
                          )}
                        </div>
                        <p className="text-[#D4D0C8] leading-tight">{log.message}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Simulation Impact Banner */}
                <div className="p-3 bg-[#050B0D] border border-[rgba(78,205,196,0.4)] text-[9px] font-mono-tech text-[#4ECDC4]">
                  <span className="font-bold block uppercase tracking-[0.15em] mb-1">
                    SYSTEM VALUE CONVERGENCE:
                  </span>
                  <span>{activeSimulation.impactMetric}</span>
                </div>

                <div className="pt-2 border-t border-[rgba(242,240,235,0.06)] flex items-center justify-between">
                  <button
                    onClick={() => runSimulation(activeSimulation)}
                    className="px-3 py-2 text-[9px] font-mono-tech uppercase border border-[rgba(242,240,235,0.15)] text-[#CCC] hover:text-[#FFF] rounded flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>RE-TRIGGER SIMULATION</span>
                  </button>

                  <Link
                    to={selectedNode.deepDiveRoute}
                    className="px-3 py-2 text-[9px] font-mono-tech uppercase bg-[#C5A059] text-[#0A0706] font-bold rounded hover:bg-[#D9B46E]"
                  >
                    ENTER {selectedNode.name} →
                  </Link>
                </div>
              </motion.div>
            ) : (
              /* Default: Node Inspection View */
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-5"
              >
                {/* Node Top Meta */}
                <div className="flex items-center justify-between border-b border-[rgba(197,160,89,0.2)] pb-4">
                  <div className="flex items-center gap-2 text-[9px] font-mono-tech tracking-[0.2em] font-bold">
                    {getNodeIcon(selectedNode.id)}
                    <span style={{ color: selectedNode.color }}>
                      {selectedNode.code} // {selectedNode.category}
                    </span>
                  </div>
                  <span className="text-[8px] font-mono-tech text-[#777] border border-[rgba(242,240,235,0.1)] px-2 py-0.5 uppercase">
                    ACTIVE INSPECTION
                  </span>
                </div>

                {/* Title & Headline Axiom */}
                <div>
                  <h3 className="font-display font-light text-2xl sm:text-3xl text-[#F5F3ED] tracking-[0.14em] uppercase leading-tight mb-2">
                    {selectedNode.name}
                  </h3>
                  <p className="font-serif-editorial italic text-sm sm:text-base text-[#D4CFC4] leading-relaxed">
                    "{selectedNode.headlineAxiom}"
                  </p>
                </div>

                {/* Causal Role in the Whole System */}
                <div className="p-4 bg-[#080806] border border-[rgba(242,240,235,0.06)]">
                  <span className="text-[8px] font-mono-tech text-[#C5A059] tracking-[0.2em] uppercase block mb-1 font-bold">
                    // SYSTEM FUNCTION:
                  </span>
                  <p className="font-serif-editorial text-xs sm:text-sm text-[#A8A399] leading-relaxed">
                    {selectedNode.causalRole}
                  </p>
                </div>

                {/* Live Stats Ledger */}
                <div className="space-y-1.5">
                  <span className="text-[8px] font-mono-tech text-[#777] tracking-[0.2em] uppercase block mb-1">
                    FIELD TELEMETRY & METRICS:
                  </span>
                  <div className="grid grid-cols-1 gap-1.5 font-mono-tech text-[9px]">
                    {selectedNode.liveStats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-[#060605] border border-[rgba(242,240,235,0.05)] flex items-center justify-between"
                      >
                        <span className="text-[#777] uppercase">{stat.label}</span>
                        <span className="text-[#C5A059] font-bold">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Outgoing Vectors */}
                {selectedNode.id !== 'provenance' && (
                  <div className="space-y-2 pt-2 border-t border-[rgba(242,240,235,0.06)]">
                    <span className="text-[8px] font-mono-tech text-[#8FA382] tracking-[0.2em] uppercase block">
                      // DIRECT RELATIONAL PATHWAYS FROM {selectedNode.name}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {SYSTEM_EDGES.filter((e) => e.from === selectedNode.id).map((edge) => (
                        <button
                          key={edge.id}
                          onClick={() => handleSelectEdge(edge)}
                          className="px-2.5 py-1 text-[8px] font-mono-tech uppercase border border-[rgba(197,160,89,0.3)] bg-[#0C0B08] text-[#D4AF37] hover:border-[#C5A059] hover:bg-[#1A1710] rounded flex items-center gap-1"
                        >
                          <span>➔ {edge.toLabel}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Trigger Portal */}
                <div className="mt-2 pt-4 border-t border-[rgba(242,240,235,0.06)] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[8px] font-mono-tech text-[#666] tracking-[0.1em] truncate max-w-[200px]">
                    {selectedNode.evidenceAnchor}
                  </span>

                  <Link
                    to={selectedNode.deepDiveRoute}
                    className="px-4 py-2 text-[9px] font-mono-tech uppercase bg-[#C5A059] text-[#0A0706] font-bold rounded hover:bg-[#D9B46E] transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                  >
                    <span>DEEP-DIVE {selectedNode.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
