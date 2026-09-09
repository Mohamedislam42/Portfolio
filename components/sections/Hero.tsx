'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Download, Github, Linkedin, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { socialLinks } from '@/data/navigation';
import { scrollToSection } from '@/lib/utils';

const HeroBackground = dynamic(() => import('./HeroBackground'), { ssr: false });

const METRICS_PILLS = [
  { label: 'LoRA Param Reduction', value: '97.85%' },
  { label: 'Distilled Macro F1', value: '0.8962' },
  { label: 'Cairo Route Latency', value: '< 120ms' },
  { label: 'Attention Mechanism', value: '80% Attn / 20% Mean' },
];

export function Hero({ onOpenResume }: { onOpenResume?: () => void }) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-base pt-20 sm:pt-24 pb-12 sm:pb-16">
      <HeroBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-start justify-center">
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          animate="visible"
          className="max-w-4xl"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-accent/30 shadow-glow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="font-mono text-[11px] sm:text-xs text-fg-secondary">
                Open to ML & AI Roles (Graduating 2026)
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-fg leading-[1.15] max-w-4xl font-bold tracking-tight"
          >
            Building{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal-200 to-emerald-300">
              intelligent systems
            </span>
            , from research to production.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-fg-secondary max-w-2xl mt-4 sm:mt-6 leading-relaxed"
          >
            Computer Science & AI student at Al Alamein International University specializing in NLP pipelines, parameter-efficient fine-tuning (LoRA), knowledge distillation, and graph routing optimization.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 sm:mt-8"
          >
            <Button variant="primary" onClick={() => scrollToSection('ai-lab')} className="group font-mono text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 mr-1.5 text-base" />
              Try Live AI Lab
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button variant="secondary" onClick={() => scrollToSection('projects')} className="font-mono text-xs sm:text-sm">
              View Projects
            </Button>

            <Button
              variant="ghost"
              onClick={onOpenResume ? onOpenResume : () => window.open('/resume.pdf', '_blank')}
              className="font-mono text-xs sm:text-sm"
            >
              <Download className="w-4 h-4 mr-1.5" />
              Resume
            </Button>
          </motion.div>

          {/* Metrics Pills Banner */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3.5 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-line/60 w-full"
          >
            {METRICS_PILLS.map((pill, i) => (
              <div key={i} className="p-2.5 sm:p-3.5 rounded-xl bg-surface/70 border border-line/80 backdrop-blur-sm">
                <span className="block text-[10px] sm:text-[11px] font-mono text-fg-muted truncate">{pill.label}</span>
                <span className="block text-sm sm:text-lg font-mono font-bold text-accent mt-0.5">{pill.value}</span>
              </div>
            ))}
          </motion.div>

          {/* Social icons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mt-6 sm:mt-8"
          >
            <Button variant="icon" href={socialLinks?.github || '#'} ariaLabel="GitHub">
              <Github className="w-5 h-5" />
            </Button>
            <Button variant="icon" href={socialLinks?.linkedin || '#'} ariaLabel="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => scrollToSection('about')}
          aria-label="Scroll to about section"
          className="p-2 text-fg-secondary hover:text-accent transition-colors"
        >
          <ChevronDown className={`w-5 h-5 sm:w-6 sm:h-6 ${shouldReduceMotion ? '' : 'animate-bounce-slow'}`} />
        </button>
      </div>
    </section>
  );
}
