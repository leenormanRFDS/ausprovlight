import React, { useState } from 'react';
import { ProvenanceNode } from '../../types/provenanceObject';
import { 
  CheckCircle, 
  MapPin, 
  Pickaxe, 
  Fingerprint, 
  FileText, 
  Box, 
  Shield, 
  Globe, 
  Layers, 
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';

interface ProvenanceThreadVisualizerProps {
  nodes: ProvenanceNode[];
  onSelectNode?: (node: ProvenanceNode) => void;
}

export function ProvenanceThreadVisualizer({ nodes, onSelectNode }: ProvenanceThreadVisualizerProps) {
  const [activeNodeId, setActiveNodeId] = useState<string>(nodes[0]?.id || 'node-01-formation');

  const getNodeIcon = (category: string) => {
    switch (category) {
      case 'GEOLOGY':
        return Layers;
      case 'ORIGIN':
        return MapPin;
      case 'SCIENCE':
        return Fingerprint;
      case 'RECORD':
        return FileText;
      case 'PHYSICAL':
        return Box;
      case 'CUSTODY':
        return Shield;
      case 'JOURNEY':
        return Globe;
      default:
        return Sparkles;
    }
  };

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  const handleNodeClick = (node: ProvenanceNode) => {
    setActiveNodeId(node.id);
    if (onSelectNode) onSelectNode(node);
  };

  return (
    <div className="w-full bg-[#080808] border border-[rgba(245,243,237,0.1)] rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[rgba(245,243,237,0.08)] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.25em] text-[#C5A059] uppercase">
              THE 10-STAGE PROVENANCE THREAD
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl text-[#F5F3ED] font-light tracking-wide">
            Following a Thread Through Geological & Human Time
          </h2>
          <p className="font-mono text-xs text-[#888] mt-1 max-w-2xl">
            Each link in this unbroken chain connects physical geography, scientific truth, local consensus, and immutable custody.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#111] px-3.5 py-1.5 rounded-lg border border-[rgba(245,243,237,0.08)] self-start sm:self-auto">
          <span className="font-mono text-[10px] text-[#666]">CHAIN STATUS:</span>
          <span className="font-mono text-xs text-emerald-400 font-bold">100% UNBROKEN AUDIT</span>
        </div>
      </div>

      {/* Horizontal / Wrapped Spatial Node Chain */}
      <div className="relative">
        {/* Background Connecting Thread */}
        <div className="hidden lg:block absolute top-7 left-8 right-8 h-[2px] bg-gradient-to-r from-[#C5A059]/40 via-[#F5F3ED]/20 to-[#C5A059]/40 pointer-events-none z-0" />

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3 relative z-10">
          {nodes.map((node, index) => {
            const Icon = getNodeIcon(node.category);
            const isActive = node.id === activeNodeId;

            return (
              <button
                key={node.id}
                onClick={() => handleNodeClick(node)}
                className={`flex flex-col items-center text-center p-3 rounded-xl transition-all relative ${
                  isActive
                    ? 'bg-[#C5A059]/20 border-2 border-[#C5A059] text-[#F5F3ED] scale-105 shadow-xl shadow-[#C5A059]/10'
                    : 'bg-[#101010] border border-[rgba(245,243,237,0.08)] text-[#888] hover:text-[#DDD] hover:bg-[#181818]'
                }`}
              >
                {/* Node Pill / Icon Circle */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center mb-2 transition-transform ${
                    isActive
                      ? 'bg-[#C5A059] text-[#050505] font-bold shadow-md'
                      : 'bg-[#181818] border border-[rgba(245,243,237,0.1)] text-[#AAA]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <span className="font-mono text-[8px] tracking-widest text-[#C5A059] font-bold">
                  {node.stepNumber}
                </span>
                <span className="font-display text-[11px] font-medium tracking-wider text-[#F5F3ED] uppercase truncate w-full mt-0.5">
                  {node.title}
                </span>

                {/* Subtitle tag */}
                <span className="font-mono text-[8px] text-[#666] truncate w-full mt-1 hidden sm:block">
                  {node.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Node Detailed Dispatch Drawer */}
      {activeNode && (
        <div className="bg-[#0e0e0e] border border-[#C5A059]/40 rounded-xl p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[rgba(245,243,237,0.08)] pb-5">
            <div>
              <div className="flex items-center gap-2 text-[#C5A059] font-mono text-[10px] tracking-[0.2em] uppercase mb-1">
                <span>NODE {activeNode.stepNumber} // {activeNode.category}</span>
                <span>•</span>
                <span className="text-[#888]">{activeNode.verificationLevel}</span>
              </div>
              <h3 className="font-display text-2xl text-[#F5F3ED] font-normal">
                {activeNode.title}: {activeNode.subtitle}
              </h3>
            </div>

            <div className="flex items-center gap-2 bg-[#050505] px-3.5 py-1.5 rounded border border-[rgba(245,243,237,0.1)] text-xs font-mono text-[#AAA]">
              <Info className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>EVIDENCE: {activeNode.evidenceType}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <p className="font-sans text-sm sm:text-base text-[#D4D0C5] leading-relaxed mb-4">
                {activeNode.description}
              </p>
              {activeNode.operator && (
                <div className="font-mono text-xs text-[#888] flex items-center gap-2 bg-[#080808] p-3 rounded border border-[rgba(245,243,237,0.05)]">
                  <span className="text-[#666]">ATTESTING OPERATOR:</span>
                  <span className="text-[#F5F3ED]">{activeNode.operator}</span>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 bg-[#050505] p-4 rounded-lg border border-[rgba(245,243,237,0.06)]">
              <span className="font-mono text-[9px] text-[#666] tracking-widest uppercase">NODE AUDIT TELEMETRY</span>
              {activeNode.timestamp && (
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-[#777]">TIMESTAMP:</span>
                  <span className="text-[#DDD]">{activeNode.timestamp}</span>
                </div>
              )}
              {activeNode.coordinates && (
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-[#777]">LOCUS:</span>
                  <span className="text-[#DDD]">{activeNode.coordinates}</span>
                </div>
              )}
              <div className="flex justify-between font-mono text-xs pt-2 border-t border-[rgba(245,243,237,0.06)]">
                <span className="text-[#777]">PROTOCOL SEAL:</span>
                <span className="text-emerald-400 font-bold">VERIFIED GENESIS</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
