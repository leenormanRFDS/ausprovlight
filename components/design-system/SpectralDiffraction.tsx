import React from 'react';

interface SpectralDiffractionProps {
  className?: string;
  variant?: 'subtle' | 'matrix' | 'pinfire';
}

export const SpectralDiffraction: React.FC<SpectralDiffractionProps> = ({
  className = '',
  variant = 'subtle',
}) => {
  if (variant === 'matrix') {
    return (
      <div className={`w-full h-[2px] relative overflow-hidden bg-[#1E1B16] ${className}`}>
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, #3B5A6F 25%, #476E5B 50%, #8C5542 75%, transparent 100%)',
          }}
        />
      </div>
    );
  }

  if (variant === 'pinfire') {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        <span className="w-1 h-3 bg-[#3B5A6F] opacity-80" />
        <span className="w-1 h-4 bg-[#476E5B] opacity-90" />
        <span className="w-1 h-3 bg-[#C5A059] opacity-90" />
        <span className="w-1 h-2 bg-[#8C5542] opacity-70" />
      </div>
    );
  }

  return (
    <div className={`w-full h-[1px] relative overflow-hidden bg-[rgba(242,240,235,0.06)] ${className}`}>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(108,142,164,0.6) 30%, rgba(197,160,89,0.8) 50%, rgba(216,107,82,0.5) 70%, transparent 100%)',
        }}
      />
    </div>
  );
};
