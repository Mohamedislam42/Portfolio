'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  once?: boolean;
}

// Shared Singleton IntersectionObserver for high performance
type ObserverCallback = (isIntersecting: boolean) => void;
const callbacks = new Map<Element, ObserverCallback>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cb = callbacks.get(entry.target);
          if (cb) {
            cb(entry.isIntersecting);
          }
        });
      },
      {
        rootMargin: '0px 0px -30px 0px',
        threshold: 0.02,
      }
    );
  }
  return sharedObserver;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.35,
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = getSharedObserver();
    if (!observer) {
      setIsVisible(true);
      return;
    }

    callbacks.set(node, (isIntersecting) => {
      if (isIntersecting) {
        setIsVisible(true);
        if (once) {
          observer.unobserve(node);
          callbacks.delete(node);
        }
      } else if (!once) {
        setIsVisible(false);
      }
    });

    observer.observe(node);

    return () => {
      observer.unobserve(node);
      callbacks.delete(node);
    };
  }, [once]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'up':
        return 'translate3d(0, 14px, 0)';
      case 'down':
        return 'translate3d(0, -14px, 0)';
      case 'left':
        return 'translate3d(14px, 0, 0)';
      case 'right':
        return 'translate3d(-14px, 0, 0)';
      default:
        return 'translate3d(0, 14px, 0)';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </div>
  );
}

