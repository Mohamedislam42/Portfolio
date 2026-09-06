import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glowOnHover?: boolean;
}

export function Card({
  children,
  className = '',
  hoverable = false,
  glowOnHover = false,
}: CardProps) {
  const baseStyles = 'bg-surface rounded-xl border border-line overflow-hidden';
  const hoverableStyles = hoverable ? 'transition-all duration-300 hover:border-accent hover:-translate-y-1' : '';
  const glowStyles = glowOnHover ? 'hover:shadow-glow' : '';
  
  const classes = `${baseStyles} ${hoverableStyles} ${glowStyles} ${className}`.trim();

  return (
    <div className={classes}>
      {children}
    </div>
  );
}
