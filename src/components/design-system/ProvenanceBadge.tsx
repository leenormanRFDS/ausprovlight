import React from 'react';

export type ProvenanceLevel = 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'CONSENSUS' | 'LIDAR_TWIN' | 'KOKATHA_PROTOCOL' | 'IMMUTABLE';

interface ProvenanceBadgeProps {
  level: ProvenanceLevel;
  label?: string;
  className?: string;
  showIcon?: boolean;
}

const BADGE_CONFIG: Record<ProvenanceLevel, { code: string; defaultLabel: string; bg: string; border: string; text: string }> = {
  LEVEL_1: {
    code: 'PL-01',
    defaultLabel: 'ORIGIN ASSERTION',
    bg: 'bg-[#141412]',
    border: 'border-[rgba(242,240,235,0.15)]',
    text: 'text-[#A0A0A0]',
  },
  LEVEL_2: {
    code: 'PL-02',
    defaultLabel: 'DOCUMENTED CONTEXT',
    bg: 'bg-[#181612]',
    border: 'border-[rgba(197,160,89,0.3)]',
    text: 'text-[#C5A059]',
  },
  LEVEL_3: {
    code: 'PL-03',
    defaultLabel: 'SCIENTIFIC & SPATIAL VERIFIED',
    bg: 'bg-[#1E1910]',
    border: 'border-[rgba(197,160,89,0.6)]',
    text: 'text-[#E0BE7B]',
  },
  CONSENSUS: {
    code: 'STD-M',
    defaultLabel: 'COMMUNITY CONSENSUS',
    bg: 'bg-[#161914]',
    border: 'border-[rgba(143,163,130,0.4)]',
    text: 'text-[#8FA382]',
  },
  LIDAR_TWIN: {
    code: 'GEO-L',
    defaultLabel: 'SPATIAL DIGITAL TWIN',
    bg: 'bg-[#12161A]',
    border: 'border-[rgba(108,142,164,0.4)]',
    text: 'text-[#6C8EA4]',
  },
  KOKATHA_PROTOCOL: {
    code: 'ON-CTY',
    defaultLabel: 'KOKATHA CULTURAL CONSENT',
    bg: 'bg-[#201512]',
    border: 'border-[rgba(216,107,82,0.4)]',
    text: 'text-[#D86B52]',
  },
  IMMUTABLE: {
    code: 'IMM-REC',
    defaultLabel: 'IMMUTABLE PROVENANCE LEDGER',
    bg: 'bg-[#1A1813]',
    border: 'border-[#C5A059]',
    text: 'text-[#F5F3ED]',
  },
};

export const ProvenanceBadge: React.FC<ProvenanceBadgeProps> = ({
  level,
  label,
  className = '',
}) => {
  const config = BADGE_CONFIG[level] || BADGE_CONFIG.LEVEL_1;

  return (
    <span
      className={`inline-flex items-center gap-2 px-2.5 py-1 text-[9px] font-mono-tech tracking-[0.2em] uppercase border ${config.bg} ${config.border} ${config.text} ${className}`}
      style={{ letterSpacing: '0.22em' }}
    >
      <span className="opacity-60 text-[8px]">[{config.code}]</span>
      <span>{label || config.defaultLabel}</span>
    </span>
  );
};
