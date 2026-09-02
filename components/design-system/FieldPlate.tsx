import React from 'react';

interface FieldPlateProps {
  children: React.ReactNode;
  id?: string;
  coordinateStamp?: string;
  classification?: string;
  title?: string;
  subtitle?: string;
  accent?: 'default' | 'gold' | 'spectral' | 'earth';
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const FieldPlate: React.FC<FieldPlateProps> = ({
  children,
  id,
  coordinateStamp,
  classification,
  title,
  subtitle,
  accent = 'default',
  interactive = false,
  onClick,
  className = '',
}) => {
  const accentClasses = {
    default: 'border-hairline bg-[#0D0D0B] hover:border-[rgba(242,240,235,0.2)]',
    gold: 'border-hairline-gold bg-[#11100C] hover:border-[#C5A059]',
    spectral: 'border-[rgba(108,142,164,0.3)] bg-[#0C1014]',
    earth: 'border-[rgba(163,149,128,0.25)] bg-[#12100D]',
  };

  return (
    <div
      id={id}
      onClick={onClick}
      className={`relative p-6 md:p-8 transition-all duration-500 crosshair-corner ${
        accentClasses[accent]
      } ${interactive ? 'cursor-pointer hover:translate-y-[-2px]' : ''} ${className}`}
      style={{
        boxShadow: accent === 'gold' ? '0 8px 32px rgba(197, 160, 89, 0.05)' : 'none',
      }}
    >
      {/* Top Ledger Header Bar */}
      {(coordinateStamp || classification) && (
        <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-[rgba(242,240,235,0.06)] text-[9px] font-mono-tech tracking-[0.25em] text-[#8E8A82] uppercase">
          <span>{coordinateStamp || 'ANDAMOOKA // LOCUS'}</span>
          {classification && (
            <span className="text-[#C5A059] opacity-90">{classification}</span>
          )}
        </div>
      )}

      {/* Plate Title Lockup */}
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h3 className="font-display font-light text-lg md:text-xl text-[#F5F3ED] tracking-[0.18em] uppercase leading-tight mb-1.5">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="font-serif-editorial italic text-sm text-[#A09B90] leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative z-10">{children}</div>

      {/* Subtle bottom edge anchor line */}
      <div className="mt-6 pt-3 flex justify-between items-center text-[8px] font-mono-tech tracking-[0.3em] text-[#555] uppercase">
        <span>APP FIELD RECORD</span>
        <span className="w-8 h-[1px] bg-[rgba(242,240,235,0.1)]"></span>
      </div>
    </div>
  );
};
