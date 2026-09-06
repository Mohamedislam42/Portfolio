'use client';

import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  isLoading = false,
  disabled = false,
  children,
  className = '',
  onClick,
  type = 'button',
  ariaLabel,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-accent text-base font-semibold rounded-lg hover:shadow-glow hover:brightness-110 active:scale-[0.98]',
    secondary: 'border border-accent text-accent bg-transparent rounded-lg hover:bg-accent/10',
    ghost: 'text-fg-secondary hover:text-accent bg-transparent',
    icon: 'p-2 rounded-lg text-fg-secondary hover:text-accent hover:bg-elevated',
  };

  const sizes = {
    sm: 'px-4 py-2 text-small',
    md: 'px-6 py-3 text-body',
    lg: 'px-8 py-4 text-body-lg',
  };

  const iconSizes = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3',
  };

  const sizeClass = variant === 'icon' ? iconSizes[size] : sizes[size];
  const classes = `${baseStyles} ${variants[variant]} ${sizeClass} ${className}`;

  const Spinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  const innerContent = (
    <>
      {isLoading && <Spinner />}
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>{children}</span>
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http');
    if (isExternal) {
      return (
        <a
          href={href}
          target={target || '_blank'}
          rel={rel || 'noopener noreferrer'}
          className={classes}
          aria-label={ariaLabel}
          onClick={disabled || isLoading ? (e) => e.preventDefault() : onClick}
        >
          {innerContent}
        </a>
      );
    }
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={classes}
        aria-label={ariaLabel}
        onClick={disabled || isLoading ? (e) => e.preventDefault() : onClick}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {innerContent}
    </button>
  );
}
