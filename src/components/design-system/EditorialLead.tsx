import React from 'react';

interface EditorialLeadProps {
  kicker?: string;
  headline: string;
  thesis?: string;
  annotation?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const EditorialLead: React.FC<EditorialLeadProps> = ({
  kicker,
  headline,
  thesis,
  annotation,
  align = 'left',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`flex flex-col ${
        isCenter ? 'items-center text-center' : 'items-start text-left'
      } ${className}`}
    >
      {/* Kicker / Breadcrumb */}
      {kicker && (
        <div className="flex items-center gap-3 mb-4 text-[9px] md:text-[10px] font-mono-tech tracking-[0.25em] text-[#C5A059] uppercase">
          <span className="w-4 h-[1px] bg-[#C5A059] opacity-60"></span>
          <span>{kicker}</span>
          {isCenter && <span className="w-4 h-[1px] bg-[#C5A059] opacity-60"></span>}
        </div>
      )}

      {/* Main Display Headline */}
      <h1 className="font-display font-light text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-[#F5F3ED] tracking-[0.14em] uppercase leading-[1.1] mb-6 max-w-4xl">
        {headline}
      </h1>

      {/* Editorial Serif Thesis */}
      {thesis && (
        <p className="font-serif-editorial italic text-base sm:text-lg md:text-2xl text-[#B3ADA1] leading-[1.65] max-w-3xl mb-6 font-normal">
          {thesis}
        </p>
      )}

      {/* Technical Annotation / Subtext */}
      {annotation && (
        <div className="flex items-center gap-3 pt-2 text-[9px] md:text-[10px] font-mono-tech tracking-[0.2em] text-[#787267] uppercase">
          <span>// {annotation}</span>
        </div>
      )}
    </div>
  );
};
