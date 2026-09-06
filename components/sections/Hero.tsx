'use client';

import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Download, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { socialLinks } from '@/data/navigation';
import { scrollToSection } from '@/lib/utils';

const HeroBackground = dynamic(() => import('./HeroBackground'), { ssr: false });

const HEADLINES = [
  'Building intelligent systems, end to end.',
  'I turn data into deployed intelligence.',
  'From model training to production deployment.',
];
// Currently using index 0 — change to pick a different headline
const ACTIVE_HEADLINE = 0;

const renderHeadline = (headline: string) => {
  if (headline.includes('intelligent')) {
    const parts = headline.split('intelligent');
    return (
      <>
        {parts[0]}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-teal-200">
          intelligent
        </span>
        {parts[1]}
      </>
    );
  }
  return headline;
};

export function Hero() {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base">
      <HeroBackground />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col items-start justify-center">
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          animate="visible"
          className="max-w-4xl"
        >
          <motion.p 
            variants={itemVariants}
            className="font-mono text-accent text-mono-label tracking-wider mb-4"
          >
            Hi, I'm Mohamed —
          </motion.p>
          
          <motion.h1 
            variants={itemVariants}
            className="font-heading text-display-sm md:text-display text-fg leading-tight max-w-4xl"
          >
            {renderHeadline(HEADLINES[ACTIVE_HEADLINE])}
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-body-lg text-fg-secondary max-w-2xl mt-6"
          >
            Computer Science & AI student building NLP pipelines and full-stack AI applications — from model training to production deployment.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <Button variant="primary" onClick={() => scrollToSection('projects')}>
              View my work
            </Button>
            <Button variant="secondary" onClick={() => scrollToSection('contact')}>
              Get in touch
            </Button>
            <Button variant="ghost" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="flex gap-3 mt-8"
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button 
          onClick={() => scrollToSection('about')}
          aria-label="Scroll to about section"
          className="p-2 text-fg-secondary hover:text-accent transition-colors"
        >
          <ChevronDown className={`w-6 h-6 ${shouldReduceMotion ? '' : 'animate-bounce-slow'}`} />
        </button>
      </div>
    </section>
  );
}
