'use client';

import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, Github, ExternalLink, BarChart3, Layers, Cpu, CheckCircle2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import type { Project } from '@/data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  const animationConfig = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.01 },
      }
    : {
        initial: { opacity: 0, scale: 0.95, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: 20 },
        transition: { duration: 0.2 },
      };

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          ref={overlayRef}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-base/85 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            {...animationConfig}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative bg-surface rounded-2xl border border-line max-w-4xl w-full max-h-[88vh] overflow-y-auto shadow-card z-10 flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 bg-surface/95 backdrop-blur-md z-20 border-b border-line p-6 flex justify-between items-start">
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
                  {project.categoryLabel}
                </span>
                <h2 id="modal-title" className="text-h3 md:text-h2 font-heading text-fg font-bold">
                  {project.title}
                </h2>
                <p className="font-mono text-xs text-fg-secondary mt-1">
                  {project.tagline}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close project details"
                className="shrink-0 p-2 rounded-lg text-fg-secondary hover:text-accent hover:bg-elevated transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Overview / Problem */}
              {project.problem && (
                <section className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Problem & Engineering Objective
                  </h3>
                  <p className="text-body text-fg-secondary leading-relaxed">{project.problem}</p>
                </section>
              )}

              {/* Technical Architecture & Deep Dive */}
              {project.details && (
                <section className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    System Architecture & Implementation
                  </h3>
                  <p className="text-body text-fg-secondary leading-relaxed">{project.details}</p>
                </section>
              )}

              {/* Architecture Highlights */}
              {project.architectureHighlights && project.architectureHighlights.length > 0 && (
                <section className="space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    Key Architectural Highlights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {project.architectureHighlights.map((highlight, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-elevated border border-line flex items-start gap-2.5 text-xs text-fg-secondary font-mono"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Benchmark Results Table if present */}
              {project.benchmarks && project.benchmarks.length > 0 && (
                <section className="space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Empirical Benchmarks & Comparisons
                  </h3>
                  <div className="overflow-x-auto rounded-xl border border-line bg-elevated/70">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-surface border-b border-line text-fg-muted uppercase text-[11px]">
                        <tr>
                          <th className="py-3 px-4">Evaluation Metric</th>
                          {project.benchmarks[0].baseline && <th className="py-3 px-4">Baseline Model</th>}
                          {project.benchmarks[0].teacher && <th className="py-3 px-4">Full Teacher (GPT-2)</th>}
                          <th className="py-3 px-4 text-accent">Student (LoRA / Distilled)</th>
                          {project.benchmarks[0].delta && <th className="py-3 px-4">Performance Delta</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line/60">
                        {project.benchmarks.map((row, idx) => (
                          <tr key={idx} className="hover:bg-surface/50 transition-colors">
                            <td className="py-2.5 px-4 font-semibold text-fg">{row.metric}</td>
                            {row.baseline && <td className="py-2.5 px-4 text-fg-secondary">{row.baseline}</td>}
                            {row.teacher && <td className="py-2.5 px-4 text-fg-secondary">{row.teacher}</td>}
                            <td className="py-2.5 px-4 text-accent font-bold">{row.student}</td>
                            {row.delta && (
                              <td className="py-2.5 px-4">
                                <span className="px-2 py-0.5 rounded bg-accent/15 text-accent text-[11px]">
                                  {row.delta}
                                </span>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Results & Impact Summary Card */}
              {project.impact && (
                <section className="p-5 rounded-xl bg-gradient-to-r from-accent/10 via-elevated to-surface border border-accent/30 shadow-glow-sm space-y-1">
                  <span className="text-xs font-mono font-bold uppercase text-accent tracking-wider block">
                    Core Outcome & Impact
                  </span>
                  <p className="text-sm md:text-base font-body text-fg font-medium leading-relaxed">
                    {project.impact}
                  </p>
                </section>
              )}

              {/* Tech Stack */}
              {project.techStack && project.techStack.length > 0 && (
                <section className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-fg-muted">
                    Technologies & Libraries
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <Tag key={i} variant="accent">
                        {tech}
                      </Tag>
                    ))}
                  </div>
                </section>
              )}

              {/* Links */}
              {project.links && project.links.length > 0 && (
                <section className="pt-4 flex flex-wrap gap-3 border-t border-line">
                  {project.links.map((link, i) => (
                    <Button
                      key={i}
                      variant="primary"
                      size="sm"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs"
                    >
                      {link.type.toLowerCase() === 'github' ? (
                        <Github className="w-4 h-4 mr-2" />
                      ) : (
                        <ExternalLink className="w-4 h-4 mr-2" />
                      )}
                      {link.label}
                    </Button>
                  ))}
                </section>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
