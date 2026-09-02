import React from 'react';

export interface LedgerEntry {
  label: string;
  value: string | React.ReactNode;
  unit?: string;
  verified?: boolean;
  highlight?: boolean;
}

interface MetadataLedgerProps {
  entries: LedgerEntry[];
  title?: string;
  className?: string;
  columns?: 1 | 2;
}

export const MetadataLedger: React.FC<MetadataLedgerProps> = ({
  entries,
  title,
  className = '',
  columns = 1,
}) => {
  return (
    <div className={`w-full font-mono-tech ${className}`}>
      {title && (
        <div className="text-[9px] tracking-[0.25em] text-[#7A756D] uppercase mb-3 pb-1 border-b border-[rgba(242,240,235,0.06)] flex items-center justify-between">
          <span>{title}</span>
          <span className="text-[8px] text-[#555]">[SPEC_METRICS]</span>
        </div>
      )}
      <div
        className={`grid gap-2.5 ${
          columns === 2 ? 'grid-cols-1 md:grid-cols-2 gap-x-6' : 'grid-cols-1'
        }`}
      >
        {entries.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-1.5 border-b border-[rgba(242,240,235,0.04)] text-[10px] md:text-[11px] tracking-[0.15em] leading-none"
          >
            <span className="text-[#88837A] uppercase flex items-center gap-1.5">
              <span className="opacity-40">/</span>
              {item.label}
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`text-right ${
                  item.highlight
                    ? 'text-[#C5A059] font-medium'
                    : item.verified
                    ? 'text-[#8FA382]'
                    : 'text-[#E5E2DA]'
                }`}
              >
                {item.value}
                {item.unit && <span className="opacity-60 ml-1 text-[9px]">{item.unit}</span>}
              </span>
              {item.verified && (
                <span className="text-[8px] text-[#8FA382] border border-[rgba(143,163,130,0.3)] px-1 py-0.2">
                  VER
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
