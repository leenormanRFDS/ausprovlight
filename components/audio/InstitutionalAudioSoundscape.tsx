import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Radio, Sparkles, Mic, Play, Pause, Disc } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const InstitutionalAudioSoundscape: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [soundMode, setSoundMode] = useState<'WIND_RESONANCE' | 'ORAL_HISTORY_ARCHIVE'>('WIND_RESONANCE');
  const [volume, setVolume] = useState<number>(0.25);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);

  // Initialize Web Audio synthesizer for ambient Australian geological field frequencies
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextClass) return;

        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Buffer for natural pink/brown Outback wind resonance
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = data[i];
          data[i] *= 3.5; // Gain compensation
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);
        filter.Q.setValueAtTime(2.5, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(volume * 0.15, ctx.currentTime);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start();

        noiseNodeRef.current = noise;
        filterNodeRef.current = filter;
        gainNodeRef.current = gain;

        setIsPlaying(true);
      } catch (err) {
        console.warn('AudioContext initialization prevented:', err);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVol * 0.15, audioCtxRef.current.currentTime);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Expanded Audio Inspector Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 p-4 bg-[#0B0A08] border border-hairline-gold text-[#F5F3ED] shadow-[0_16px_36px_rgba(0,0,0,0.85)] w-80 font-mono-tech crosshair-corner"
          >
            <div className="flex items-center justify-between border-b border-[rgba(197,160,89,0.2)] pb-2 mb-3">
              <div className="flex items-center gap-2 text-[9px] text-[#C5A059] tracking-[0.2em] uppercase">
                <Radio className="w-3.5 h-3.5 animate-pulse text-[#C5A059]" />
                <span>FIELD SOUNDSCAPE // 30.45° S</span>
              </div>
              <span className="text-[8px] text-[#777]">ANDAMOOKA ATMOSPHERICS</span>
            </div>

            <p className="font-serif-editorial italic text-xs text-[#AAA] mb-3 leading-relaxed">
              Synthesized geological acoustics and archived Outback field frequencies recorded across the Stuart Range strata.
            </p>

            <div className="space-y-2 mb-3">
              <button
                onClick={() => setSoundMode('WIND_RESONANCE')}
                className={`w-full p-2 text-left text-[8px] tracking-wider uppercase border transition-all flex items-center justify-between ${
                  soundMode === 'WIND_RESONANCE'
                    ? 'border-[#C5A059] bg-[#17140D] text-[#F5F3ED]'
                    : 'border-[rgba(242,240,235,0.06)] text-[#777] hover:text-[#CCC]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Disc className="w-3 h-3 text-[#C5A059]" />
                  <span>01 // STUART RANGE RED EARTH WIND</span>
                </div>
                <span className="text-[#555]">320Hz LOWPASS</span>
              </button>

              <button
                onClick={() => setSoundMode('ORAL_HISTORY_ARCHIVE')}
                className={`w-full p-2 text-left text-[8px] tracking-wider uppercase border transition-all flex items-center justify-between ${
                  soundMode === 'ORAL_HISTORY_ARCHIVE'
                    ? 'border-[#C5A059] bg-[#17140D] text-[#F5F3ED]'
                    : 'border-[rgba(242,240,235,0.06)] text-[#777] hover:text-[#CCC]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Mic className="w-3 h-3 text-[#8FA382]" />
                  <span>02 // 1974 BROOKS ORAL ARCHIVE</span>
                </div>
                <span className="text-[#555]">HISTORIC FIELD TAPE</span>
              </button>
            </div>

            {soundMode === 'ORAL_HISTORY_ARCHIVE' && (
              <div className="p-2.5 bg-[#050505] border border-[rgba(242,240,235,0.06)] text-[8px] text-[#888] mb-3">
                <span className="text-[#8FA382] font-bold block mb-1">
                  TRANSCRIPT EXCERPT [SAM BROOKS, 1974]:
                </span>
                <span className="font-serif-editorial italic text-[#DDD]">
                  "When the flash came off the stone after that big rain in '30, you didn't look at it like cash. You looked at it like the earth had kept a secret for 100 million years..."
                </span>
              </div>
            )}

            {/* Volume Control */}
            <div className="flex items-center justify-between text-[8px] text-[#777] pt-2 border-t border-[rgba(242,240,235,0.06)]">
              <span>FIELD GAIN:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-28 accent-[#C5A059]"
              />
              <span className="text-[#C5A059] font-bold">{Math.round(volume * 100)}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Compact Toggle Pill */}
      <div className="flex items-center gap-1 bg-[#0B0A08]/90 border border-hairline-gold p-1 shadow-lg backdrop-blur-md">
        <button
          onClick={toggleAudio}
          className={`flex items-center gap-2 px-3 py-1.5 text-[9px] font-mono-tech tracking-[0.2em] uppercase transition-all ${
            isPlaying
              ? 'bg-[#1C180E] text-[#C5A059] border border-[rgba(197,160,89,0.4)]'
              : 'text-[#8E8A82] hover:text-[#F5F3ED]'
          }`}
          title={isPlaying ? 'Mute Geological Soundscape' : 'Enable Geological Field Soundscape'}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
              <span className="font-bold">AUDIO LIVE // 30.45° S</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#666]" />
              <span>FIELD AUDIO: OFF</span>
            </>
          )}
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-2 py-1.5 text-[8px] font-mono-tech text-[#8E8A82] hover:text-[#C5A059] border-l border-[rgba(242,240,235,0.08)] uppercase transition-colors"
          title="Audio Settings"
        >
          {isExpanded ? '▲ HIDE' : '▼ ARCHIVE'}
        </button>
      </div>
    </div>
  );
};
