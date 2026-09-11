'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faDownload, faWandMagicSparkles, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Button } from '@/components/ui/Button';
import { socialLinks } from '@/data/navigation';
import { scrollToSection } from '@/lib/utils';

const HeroBackground = dynamic(() => import('./HeroBackground'), { ssr: false });

export function Hero({ onOpenResume }: { onOpenResume?: () => void }) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 1, y: shouldReduceMotion ? 0 : 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
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
                Open to ML & AI Roles
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
              <FontAwesomeIcon icon={faWandMagicSparkles} className="w-3.5 h-3.5 mr-2 text-base" />
              Try Live AI Lab
              <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button variant="secondary" onClick={() => scrollToSection('projects')} className="font-mono text-xs sm:text-sm">
              View Projects
            </Button>

            <Button
              variant="ghost"
              onClick={onOpenResume ? onOpenResume : () => window.open('/resume.pdf', '_blank')}
              className="font-mono text-xs sm:text-sm"
            >
              <FontAwesomeIcon icon={faDownload} className="w-3.5 h-3.5 mr-2" />
              Resume
            </Button>
          </motion.div>

          {/* Social icons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mt-8 sm:mt-10"
          >
            <Button variant="icon" href={socialLinks?.github || '#'} ariaLabel="GitHub">
              <FontAwesomeIcon icon={faGithub} className="w-4 h-4 text-base" />
            </Button>
            <Button variant="icon" href={socialLinks?.linkedin || '#'} ariaLabel="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4 text-base" />
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
          <FontAwesomeIcon icon={faChevronDown} className={`w-4 h-4 ${shouldReduceMotion ? '' : 'animate-bounce-slow'}`} />
        </button>
      </div>
    </section>
  );
}
