import React, { useState } from 'react';
import { Database, Code2, ShieldCheck, Terminal, FileCode2, Cpu, ChevronDown, ChevronUp } from 'lucide-react';

export function SpatialDataArchitectureDocs() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full bg-[#080808] border border-[rgba(245,243,237,0.1)] rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(245,243,237,0.08)] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="w-4 h-4 text-[#C5A059]" />
            <span className="font-mono text-xs tracking-[0.25em] text-[#C5A059] uppercase">
              NOAH BENNETT // SYSTEMS ARCHITECTURE MONOGRAPH
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl text-[#F5F3ED] font-light">
            Decoupled Spatial Information System (SIS) Ingestion Pipeline
          </h3>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="font-mono text-xs text-[#C5A059] bg-[#141414] hover:bg-[#202020] px-4 py-2 rounded-lg border border-[rgba(245,243,237,0.1)] flex items-center gap-2 transition-colors self-start sm:self-auto"
        >
          <span>{isExpanded ? 'COLLAPSE TECHNICAL PIPELINE' : 'VIEW DATA ARCHITECTURE SPEC'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      <p className="font-sans text-sm text-[#D4D0C5] leading-relaxed">
        The Andamooka Spatial Digital Twin is deliberately engineered with a strict abstraction layer separating the spatial renderer from raw geospatial feeds. When higher-resolution aerial LiDAR surveys, drone photogrammetry, or municipal cadastral updates are ingested, the system automatically binds coordinates without requiring any UI modifications.
      </p>

      {isExpanded && (
        <div className="flex flex-col gap-6 pt-2 transition-all">
          {/* Architecture 3-Tier Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#050505] p-5 rounded-xl border border-[rgba(245,243,237,0.06)] flex flex-col gap-2">
              <span className="font-mono text-[9px] text-[#C5A059] uppercase">TIER 1 // RAW SPATIAL FEEDS</span>
              <h5 className="font-display text-sm text-[#F5F3ED]">Multi-Sensor Aerial Ingest</h5>
              <ul className="font-mono text-xs text-[#888] space-y-1.5 list-disc pl-4 mt-1">
                <li>LAS/LAZ Airborne LiDAR (2.1cm AHD)</li>
                <li>Drone Oblique Photogrammetry GLTF</li>
                <li>MGA Zone 53 GeoJSON Cadastre</li>
                <li>DEM 0.5m Elevation GeoTIFF</li>
              </ul>
            </div>

            <div className="bg-[#050505] p-5 rounded-xl border border-[rgba(245,243,237,0.06)] flex flex-col gap-2">
              <span className="font-mono text-[9px] text-[#58B983] uppercase">TIER 2 // PROVENANCE NORMALIZATION</span>
              <h5 className="font-display text-sm text-[#F5F3ED]">APP Spatial Schema Engine</h5>
              <ul className="font-mono text-xs text-[#888] space-y-1.5 list-disc pl-4 mt-1">
                <li>GDA2020 datum reprojection</li>
                <li>Subterranean Z-layer indexing</li>
                <li>Spatial entity cryptographic hashing</li>
                <li>Oral history & specimen anchoring</li>
              </ul>
            </div>

            <div className="bg-[#050505] p-5 rounded-xl border border-[rgba(245,243,237,0.06)] flex flex-col gap-2">
              <span className="font-mono text-[9px] text-[#38BDF8] uppercase">TIER 3 // CLIENT CONSUMPTION</span>
              <h5 className="font-display text-sm text-[#F5F3ED]">Reactive 3D Spatial Canvas</h5>
              <ul className="font-mono text-xs text-[#888] space-y-1.5 list-disc pl-4 mt-1">
                <li>Three.js WebGL / WebGPU terrain engine</li>
                <li>9-Scale camera choreographic zoom</li>
                <li>9-Layer real-time shader filter</li>
                <li>Interactive HUD dossier raycaster</li>
              </ul>
            </div>
          </div>

          {/* JSON Schema Code Snippet */}
          <div className="bg-[#030303] p-5 rounded-xl border border-[rgba(245,243,237,0.08)] flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#888] border-b border-[rgba(245,243,237,0.06)] pb-2">
              <div className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>SPATIAL_ENTITY_SCHEMA.json (EXTENSIBLE STANDARD)</span>
              </div>
              <span className="text-[#58B983]">VALIDATED // GDA2020 COMPLIANT</span>
            </div>

            <pre className="font-mono text-xs text-[#A8A29E] overflow-x-auto p-2 leading-relaxed">
{`{
  "id": "ent-mine-lunatic-shaft-12",
  "layer": "MINE_AREAS",
  "scale": "MINE_FIELD",
  "coordinates": {
    "latitude": -30.4491,
    "longitude": 137.1612,
    "elevationAHD": 62.5,
    "depthMeters": -14.2,
    "gridReference": "53J 707530 6629310"
  },
  "geometryType": "3D_VERTICAL_SHAFT",
  "provenanceAnchor": "AOSA-AND-LUN-001",
  "cryptographicSeal": "sha256:8f4c2e11993b45a0bce87d091e326c483a99264fa2e51928dfb8417c91ad04be"
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
