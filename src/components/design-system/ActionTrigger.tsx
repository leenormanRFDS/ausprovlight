import React from 'react';
import { Link } from 'react-router-dom';

interface ActionTriggerProps {
  label: string;
  index?: string;
  variant?: 'primary' | 'gold' | 'subtle' | 'outline' | 'bracket';
  to?: string;
  href?: string;
  onClick?: () => void;
  iconRight?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ActionTrigger: React.FC<ActionTriggerProps> = ({
  label,
  index,
  variant = 'primary',
  to,
  href,
  onClick,
  iconRight,
  className = '',
  disabled = false,
  size = 'md',
}) => {
  const sizeStyles = {
    sm: 'px-3 py-2 text-[9px] tracking-[0.2em]',
    md: 'px-5 py-3 text-[10px] md:text-[11px] tracking-[0.22em]',
    lg: 'px-7 py-4 text-[11px] md:text-[12px] tracking-[0.25em]',
  };

  const variantStyles = {
    primary:
      'bg-[#161614] border border-[rgba(242,240,235,0.15)] text-[#F5F3ED] hover:border-[#F5F3ED] hover:bg-[#1E1E1A]',
    gold:
      'bg-[#1C1810] border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0A0A0A] transition-all duration-300 font-medium',
    subtle:
      'bg-transparent border border-transparent text-[#A09B90] hover:text-[#F5F3ED] hover:border-[rgba(242,240,235,0.1)]',
    outline:
      'bg-transparent border border-[rgba(242,240,235,0.2)] text-[#E0DDD5] hover:border-[#C5A059] hover:text-[#C5A059]',
    bracket:
      'bg-transparent border-0 text-[#C5A059] hover:text-[#F5F3ED] p-0 hover:translate-x-1',
  };

  const content = (
    <span className="flex items-center gap-3 uppercase font-mono-tech whitespace-nowrap">
      {index && <span className="opacity-50 text-[85%]">{index} //</span>}
      <span>{label}</span>
      {iconRight && <span className="opacity-70 group-hover:translate-x-0.5 transition-transform">{iconRight}</span>}
      {!iconRight && variant === 'bracket' && <span className="opacity-60 text-xs">→</span>}
    </span>
  );

  const baseClasses = `inline-flex items-center justify-center transition-all duration-300 group focus:outline-none focus:ring-1 focus:ring-[#C5A059] select-none ${
    variant === 'bracket' ? '' : sizeStyles[size]
  } ${variantStyles[variant]} ${disabled ? 'opacity-40 pointer-events-none' : ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={baseClasses}>
      {content}
    </button>
  );
};
