import React from 'react';
import { motion } from 'motion/react';
import { TourismJourneyStep } from '../../types/tourism';
import { ChevronLeft, ChevronRight, CheckCircle2, Play, Sparkles } from 'lucide-react';

interface JourneyStepNavigatorProps {
  steps: TourismJourneyStep[];
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  isPlayingAuto: boolean;
  onToggleAutoPlay: () => void;
}

export const JourneyStepNavigator: React.FC<JourneyStepNavigatorProps> = ({
  steps,
  currentStepIndex,
  onSelectStep,
  onPrev,
  onNext,
  isPlayingAuto,
  onToggleAutoPlay,
}) => {
  const currentStep = steps[currentStepIndex];

  // Group steps by stage for clean subheadings
  const stages = [
    { code: 'DIGITAL_DISCOVERY', label: '01 DISCOVERY', steps: steps.filter(s => s.stageCode === 'DIGITAL_DISCOVERY') },
    { code: 'STORY', label: '02 STORY & PEOPLE', steps: steps.filter(s => s.stageCode === 'STORY') },
    { code: 'PARTICIPATION', label: '03 GEOLOGY & MINE', steps: steps.filter(s => s.stepNumber === 5 || s.stepNumber === 6) },
    { code: 'OWNERSHIP', label: '04 3D TWIN & PROVENANCE', steps: steps.filter(s => s.stageCode === 'OWNERSHIP') },
    { code: 'PARTICIPATION_BUY', label: '05 REGENERATIVE ACQUISITION', steps: steps.filter(s => s.stepNumber === 9) },
    { code: 'PLACE', label: '06 PHYSICAL EMBODIMENT', steps: steps.filter(s => s.stageCode === 'PLACE') },
  ];

  return (
    <div className="border border-[rgba(242,240,235,0.1)] bg-[#0A0C0B] p-4 sm:p-6 crosshair-corner font-mono-tech">
      {/* Top bar: Stage title, progress percentage & playback controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[rgba(242,240,235,0.08)] mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-bold">
              {currentStep.stageTitle}
            </span>
            <span className="text-[10px] text-[#666]">|</span>
            <span className="text-[10px] text-[#A39580] tracking-wider uppercase">
              CHAPTER {currentStep.stepNumber} OF {steps.length}
            </span>
          </div>
          <h2 className="font-display font-light text-xl sm:text-2xl text-[#F5F3ED] tracking-wide mt-1">
            {currentStep.title}
          </h2>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleAutoPlay}
            className={`px-3 py-2 text-xs rounded border transition-all flex items-center gap-2 ${
              isPlayingAuto
                ? 'bg-[#C5A059] text-[#050505] border-[#C5A059] font-bold'
                : 'bg-[#111] text-[#A39580] border-[rgba(242,240,235,0.15)] hover:border-[#C5A059]'
            }`}
            title="Auto-advance journey chapters every 8 seconds"
          >
            <Play className={`w-3.5 h-3.5 ${isPlayingAuto ? 'fill-current' : ''}`} />
            <span>{isPlayingAuto ? 'AUTO-ADVANCING' : 'AUTO-TOUR'}</span>
          </button>

          <button
            onClick={onPrev}
            disabled={currentStepIndex === 0}
            className="p-2 rounded border border-[rgba(242,240,235,0.15)] bg-[#111] text-[#A39580] hover:text-[#F5F3ED] hover:border-[#C5A059] disabled:opacity-30 disabled:pointer-events-none transition-all"
            aria-label="Previous Chapter"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={onNext}
            disabled={currentStepIndex === steps.length - 1}
            className="p-2 rounded border border-[rgba(242,240,235,0.15)] bg-[#111] text-[#A39580] hover:text-[#F5F3ED] hover:border-[#C5A059] disabled:opacity-30 disabled:pointer-events-none transition-all"
            aria-label="Next Chapter"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 10 Step Matrix Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
        {steps.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;

          return (
            <button
              key={step.id}
              onClick={() => onSelectStep(idx)}
              className={`p-2.5 rounded text-left transition-all relative overflow-hidden border flex flex-col justify-between h-24 ${
                isActive
                  ? 'border-[#C5A059] bg-[rgba(197,160,89,0.12)] shadow-[0_0_15px_rgba(197,160,89,0.15)]'
                  : isPassed
                  ? 'border-[rgba(143,163,130,0.3)] bg-[rgba(143,163,130,0.04)] hover:border-[#8FA382]'
                  : 'border-[rgba(242,240,235,0.06)] bg-[#050605] hover:border-[rgba(242,240,235,0.2)]'
              }`}
            >
              {/* Active top glow bar */}
              {isActive && (
                <motion.div
                  layoutId="activeStepTopBar"
                  className="absolute top-0 left-0 right-0 h-1 bg-[#C5A059]"
                />
              )}

              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[9px] font-mono font-bold tracking-widest ${
                    isActive
                      ? 'text-[#C5A059]'
                      : isPassed
                      ? 'text-[#8FA382]'
                      : 'text-[#666]'
                  }`}
                >
                  {String(step.stepNumber).padStart(2, '0')}
                </span>

                {isPassed && <CheckCircle2 className="w-3 h-3 text-[#8FA382]" />}
                {isActive && <Sparkles className="w-3 h-3 text-[#C5A059] animate-spin" />}
              </div>

              <div className="mt-1">
                <p
                  className={`text-[11px] leading-tight font-medium line-clamp-2 ${
                    isActive
                      ? 'text-[#F5F3ED]'
                      : isPassed
                      ? 'text-[#C8C2B7]'
                      : 'text-[#888]'
                  }`}
                >
                  {step.title}
                </p>
              </div>

              <span
                className={`text-[8px] tracking-tighter uppercase font-mono mt-1 truncate ${
                  isActive ? 'text-[#C5A059]' : 'text-[#555]'
                }`}
              >
                {step.interactionType.replace(/_/g, ' ')}
              </span>
            </button>
          );
        })}
      </div>

      {/* Progress timeline bar */}
      <div className="mt-4 pt-3 border-t border-[rgba(242,240,235,0.06)] flex items-center justify-between text-[10px] text-[#777]">
        <span>CENTRAL NARRATIVE // GERMAN DISCOVERY $\to$ PHYSICAL EMBODIMENT</span>
        <span>{Math.round(((currentStepIndex + 1) / steps.length) * 100)}% JOURNEY COMPLETE</span>
      </div>
    </div>
  );
};
