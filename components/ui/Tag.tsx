import React from 'react';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'small';
  className?: string;
}

export function Tag({ children, variant = 'default', className = '' }: TagProps) {
  const baseStyles = 'inline-flex items-center whitespace-nowrap font-mono';
  
  const variants = {
    default: 'bg-elevated text-fg-secondary text-mono-label px-3 py-1 rounded-md border border-line',
    accent: 'bg-accent/10 text-accent text-mono-label px-3 py-1 rounded-md border border-accent/20',
    small: 'bg-elevated text-fg-secondary text-xs px-2 py-0.5 rounded-md border border-line',
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  return <span className={classes}>{children}</span>;
}
