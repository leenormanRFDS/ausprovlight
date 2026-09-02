import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GERMAN_COLLECTOR_PROFILE } from '../../data/tourismJourneyData';
import { Globe, Radio, Compass, Clock, MapPin, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export const GermanCollectorTelemetryHeader: React.FC = () => {
  const [germanTime, setGermanTime] = useState<string>('');
  const [outbackTime, setOutbackTime] = useState<string>('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      // German time (CET/CEST)
      setGermanTime(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Berlin',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }).format(now)
      );
      // Outback South Australia time (ACDT)
      setOutbackTime(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Australia/Adelaide',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }).format(now)
      );
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-[rgba(242,240,235,0.12)] bg-[#070908] p-4 sm:p-6 crosshair-corner font-mono-tech relative overflow-hidden">
      {/* Background subtle telemetry grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #C5A059 1px, transparent 1px), linear-gradient(to bottom, #C5A059 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Origin Node (Heidelberg, Germany) */}
        <div className="flex items-start gap-3 min-w-[260px]">
          <div className="p-2.5 rounded-lg bg-[rgba(92,125,145,0.15)] border border-[rgba(92,125,145,0.3)] text-[#5C7D91] mt-0.5">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] tracking-[0.25em] text-[#5C7D91] uppercase">ORIGIN // REMOTE EXPLORER</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#5C7D91] animate-ping" />
            </div>
            <h3 className="font-display font-light text-base text-[#F5F3ED] tracking-wide mt-0.5">
              {GERMAN_COLLECTOR_PROFILE.name}
            </h3>
            <p className="text-xs text-[#A39580] mt-0.5">
              {GERMAN_COLLECTOR_PROFILE.city}, {GERMAN_COLLECTOR_PROFILE.country}
            </p>
            <div className="flex items-center gap-3 text-[10px] text-[#777] mt-1.5 font-mono">
              <span className="flex items-center gap-1">
                <Compass className="w-3 h-3 text-[#5C7D91]" />
                {GERMAN_COLLECTOR_PROFILE.coordinates}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#5C7D91]" />
                {germanTime} CET
              </span>
            </div>
          </div>
        </div>

        {/* Center: Real-time XR Quantum Relay Telemetry */}
        <div className="flex-1 flex flex-col items-center justify-center border-y lg:border-y-0 lg:border-x border-[rgba(242,240,235,0.08)] py-3 lg:py-0 px-4">
          <div className="flex items-center gap-2 text-[9px] text-[#C5A059] tracking-[0.2em] uppercase mb-1">
            <Radio className="w-3 h-3 text-[#C5A059] animate-pulse" />
            <span>GLOBAL PLACE-BOND RELAY // 14,820 KM DISPERSAL</span>
          </div>

          <div className="w-full max-w-md flex items-center justify-between gap-2 text-[10px] text-[#888] my-1">
            <span className="text-[#5C7D91]">HEIDELBERG (49°N)</span>
            <div className="flex-1 flex items-center gap-1 px-2">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[#5C7D91] via-[#C5A059] to-[#E06D53]" />
              <ArrowRight className="w-3 h-3 text-[#C5A059]" />
            </div>
            <span className="text-[#E06D53]">ANDAMOOKA (30°S)</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[9px] text-[#A39580] mt-1">
            <span className="px-2 py-0.5 bg-[#0D1210] border border-[rgba(143,163,130,0.3)] text-[#8FA382]">
              OPTICAL LATENCY: 28ms
            </span>
            <span className="px-2 py-0.5 bg-[#0D1210] border border-[rgba(197,160,89,0.3)] text-[#C5A059]">
              TWIN ASSET: Matrixtwin_opal.glb
            </span>
            <span className="px-2 py-0.5 bg-[#0D1210] border border-[rgba(224,109,83,0.3)] text-[#E06D53]">
              COMMUNITY ESCROW: RATIFIED
            </span>
          </div>
        </div>

        {/* Right: Destination Node (Andamooka, Outback SA) */}
        <div className="flex items-start gap-3 min-w-[260px]">
          <div className="p-2.5 rounded-lg bg-[rgba(224,109,83,0.15)] border border-[rgba(224,109,83,0.3)] text-[#E06D53] mt-0.5">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] tracking-[0.25em] text-[#E06D53] uppercase">DESTINATION // SOVEREIGN LOCUS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E06D53] animate-pulse" />
            </div>
            <h3 className="font-display font-light text-base text-[#F5F3ED] tracking-wide mt-0.5">
              Andamooka Opal Field
            </h3>
            <p className="text-xs text-[#A39580] mt-0.5">
              Stuart Shelf, South Australia (Kokatha Country)
            </p>
            <div className="flex items-center gap-3 text-[10px] text-[#777] mt-1.5 font-mono">
              <span className="flex items-center gap-1">
                <Compass className="w-3 h-3 text-[#E06D53]" />
                30°27' S, 137°09' E
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#E06D53]" />
                {outbackTime} ACDT
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
