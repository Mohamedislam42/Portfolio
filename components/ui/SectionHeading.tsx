'use client';

import React from 'react';

interface SectionHeadingProps {
  index: number;
  kicker: string;
  title: string;
  subtitle?: string;
  className?: string;
  id?: string;
}

export function SectionHeading({
  index,
  kicker,
  title,
  subtitle,
  className = '',
  id,
}: SectionHeadingProps) {
  const paddedIndex = index.toString().padStart(2, '0');

  return (
    <div className={`mb-12 md:mb-16 ${className}`} id={id}>
      <div className="text-accent font-mono text-mono-label tracking-wider uppercase">
        // {paddedIndex} — {kicker}
      </div>
      <h2 className="font-heading text-h2 md:text-h1 text-fg font-bold mt-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-body-lg text-fg-secondary mt-4 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
