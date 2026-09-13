'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let isVisible = true;
    let lastDrawTime = 0;
    const targetFpsInterval = 1000 / 35; // Cap at smooth 35 FPS to eliminate CPU/GPU overhead
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      initParticles(width, height);
      draw(performance.now());
    };

    const initParticles = (width: number, height: number) => {
      particles = [];
      let count = 12; // mobile
      if (width >= 1024) count = 22; // desktop
      else if (width >= 768) count = 16; // tablet

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() > 0.8 ? 2 : 1.2,
        });
      }
    };

    const threshold = 130;
    const thresholdSq = threshold * threshold;

    const draw = (now: number) => {
      if (!isVisible) return;

      const elapsed = now - lastDrawTime;
      if (elapsed >= targetFpsInterval) {
        lastDrawTime = now - (elapsed % targetFpsInterval);

        const width = window.innerWidth;
        const height = window.innerHeight;

        ctx.clearRect(0, 0, width, height);

        // Update positions
        if (!prefersReducedMotion) {
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
          }
        }

        // Batch all edge line drawing into ONE single path stroke
        ctx.beginPath();
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = 'rgba(94, 234, 212, 0.08)';

        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < thresholdSq) {
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
            }
          }
        }
        ctx.stroke();

        // Batch all particle node drawing into ONE single path fill
        ctx.beginPath();
        ctx.fillStyle = 'rgba(94, 234, 212, 0.35)';
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.moveTo(p.x + p.radius, p.y);
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      if (!prefersReducedMotion && isVisible) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    // Pause canvas when scrolled out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !prefersReducedMotion) {
            cancelAnimationFrame(animationFrameId);
            lastDrawTime = performance.now();
            animationFrameId = requestAnimationFrame(draw);
          }
        });
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    resize();

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(resize, 200);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40 pointer-events-none transform-gpu"
      aria-hidden="true"
    />
  );
}
