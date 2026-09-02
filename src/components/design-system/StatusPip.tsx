import React from 'react';

interface StatusPipProps {
  status?: 'verified' | 'active' | 'warning' | 'standby';
  label?: string;
  className?: string;
}

export const StatusPip: React.FC<StatusPipProps> = ({
  status = 'verified',
  label,
  className = '',
}) => {
  const statusColors = {
    verified: 'bg-[#8FA382] shadow-[0_0_8px_rgba(143,163,130,0.6)]',
    active: 'bg-[#C5A059] shadow-[0_0_8px_rgba(197,160,89,0.6)]',
    warning: 'bg-[#D86B52] shadow-[0_0_8px_rgba(216,107,82,0.6)]',
    standby: 'bg-[#7A756D]',
  };

  return (
    <span className={`inline-flex items-center gap-2 font-mono-tech text-[9px] tracking-[0.2em] uppercase text-[#A09B90] ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${statusColors[status]} animate-pulse`} />
      {label && <span>{label}</span>}
    </span>
  );
};
