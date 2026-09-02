import React from 'react';
import { SpatialEntity } from '../../types/townTwin';
import { 
  X, 
  MapPin, 
  Layers, 
  Compass, 
  Activity, 
  Calendar, 
  FileText, 
  ExternalLink,
  ShieldCheck,
  Thermometer,
  Radio,
  Sparkles,
  Volume2
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SpatialInformationInspectorProps {
  entity: SpatialEntity | null;
  onClose: () => void;
}

export function SpatialInformationInspector({
  entity,
  onClose,
}: SpatialInformationInspectorProps) {
  if (!entity) return null;

  return (
    <div className="w-full bg-[#0a0a0a] border border-[#C5A059]/40 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-lg bg-[#141414] hover:bg-[#222] text-[#888] hover:text-[#FFF] border border-[rgba(245,243,237,0.1)] transition-colors"
        title="Close Dossier"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Header */}
      <div className="flex flex-col gap-2 pr-12">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 px-2.5 py-0.5 rounded uppercase tracking-wider">
            {entity.layer} // {entity.scale}
          </span>
          <span className="font-mono text-[10px] text-[#777]">
            SIS ID: {entity.id}
          </span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl text-[#F5F3ED] font-normal tracking-wide">
          {entity.vernacularName || entity.name}
        </h2>
        {entity.vernacularName && (
          <span className="font-sans text-xs text-[#999] italic">
            Official Spatial Register: {entity.name}
          </span>
        )}
      </div>

      {/* Grid: Coordinates & Cadastre */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#050505] p-4 rounded-xl border border-[rgba(245,243,237,0.06)] font-mono text-xs">
        <div>
          <span className="text-[9px] text-[#666] uppercase block">LATITUDE</span>
          <span className="text-[#DDD] font-bold">{entity.coordinates.latitude.toFixed(5)}° S</span>
        </div>
        <div>
          <span className="text-[9px] text-[#666] uppercase block">LONGITUDE</span>
          <span className="text-[#DDD] font-bold">{entity.coordinates.longitude.toFixed(5)}° E</span>
        </div>
        <div>
          <span className="text-[9px] text-[#666] uppercase block">ELEVATION (AHD)</span>
          <span className="text-[#C5A059] font-bold">{entity.coordinates.elevationAHD.toFixed(1)} m</span>
        </div>
        <div>
          <span className="text-[9px] text-[#666] uppercase block">SUBTERRANEAN DEPTH</span>
          <span className="text-[#E06D53] font-bold">
            {entity.coordinates.depthMeters ? `${entity.coordinates.depthMeters.toFixed(1)} m` : 'SURFACE'}
          </span>
        </div>
      </div>

      {/* Main Description */}
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] text-[#C5A059] uppercase tracking-wider">
          SPATIAL & HISTORICAL CONTEXT
        </span>
        <p className="font-sans text-sm text-[#D4D0C5] leading-relaxed">
          {entity.description}
        </p>
      </div>

      {/* Architectural & Survey Attributes */}
      {entity.attributes && Object.keys(entity.attributes).length > 0 && (
        <div className="flex flex-col gap-3 bg-[#080808] p-5 rounded-xl border border-[rgba(245,243,237,0.06)]">
          <span className="font-mono text-[10px] text-[#888] uppercase tracking-widest">
            ENGINEERING & CADASTRAL ATTRIBUTES
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(entity.attributes).map(([key, val]) => (
              <div key={key} className="flex flex-col border-b border-[rgba(245,243,237,0.04)] pb-1.5">
                <span className="font-mono text-[9px] text-[#666] uppercase">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <span className="font-mono text-xs text-[#EAE6DF] font-medium">
                  {typeof val === 'boolean' ? (val ? 'YES' : 'NO') : String(val)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Oral History / Archival Record */}
      {entity.history?.transcriptExcerpt && (
        <div className="bg-[#120f0a] border border-[#C5A059]/30 p-5 rounded-xl flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#C5A059] font-mono text-[10px] uppercase tracking-wider">
            <Volume2 className="w-3.5 h-3.5" />
            <span>ORAL TESTIMONY & HISTORICAL ARCHIVE</span>
          </div>
          <blockquote className="font-serif italic text-sm text-[#F5F3ED] leading-relaxed border-l-2 border-[#C5A059] pl-3 py-0.5">
            {entity.history.transcriptExcerpt}
          </blockquote>
          {entity.history.pioneerCustodians && (
            <span className="font-mono text-[9px] text-[#888] mt-1">
              Custodians / Witnesses: {entity.history.pioneerCustodians.join(', ')}
            </span>
          )}
        </div>
      )}

      {/* Live Telemetry (if available) */}
      {entity.telemetry && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#060606] p-4 rounded-xl border border-[rgba(245,243,237,0.06)] font-mono text-xs">
          {entity.telemetry.temperatureC !== undefined && (
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-[#C5A059]" />
              <div>
                <span className="text-[9px] text-[#666] uppercase block">TEMPERATURE</span>
                <span className="text-[#DDD] font-bold">{entity.telemetry.temperatureC.toFixed(1)}°C Constant</span>
              </div>
            </div>
          )}
          {entity.telemetry.humidityPct !== undefined && (
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#58B983]" />
              <div>
                <span className="text-[9px] text-[#666] uppercase block">AIR HUMIDITY</span>
                <span className="text-[#DDD] font-bold">{entity.telemetry.humidityPct}% Relative</span>
              </div>
            </div>
          )}
          {entity.telemetry.structuralIntegrityPct !== undefined && (
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
              <div>
                <span className="text-[9px] text-[#666] uppercase block">STRUCTURAL INTEGRITY</span>
                <span className="text-[#DDD] font-bold">{entity.telemetry.structuralIntegrityPct}% Rated</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Linked Specimen or Future Potential Footers */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[rgba(245,243,237,0.08)]">
        {entity.associatedSpecimenCatalogId && (
          <Link
            to="/opal"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#050505] bg-[#C5A059] hover:bg-[#D4B06A] px-4 py-2 rounded-lg font-bold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXPLORE EXTRACTED 3D SPECIMEN ({entity.associatedSpecimenCatalogId})</span>
          </Link>
        )}

        {entity.futureOpportunityPotential && (
          <div className="font-mono text-xs text-[#E5A93C] flex items-center gap-2">
            <span>POTENTIAL:</span>
            <span className="text-[#BBB]">{entity.futureOpportunityPotential}</span>
          </div>
        )}
      </div>
    </div>
  );
}
