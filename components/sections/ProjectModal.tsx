'use client';

import { useEffect, useRef, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, Trophy, Github, ExternalLink, BarChart3 } from 'lucide-react';
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
      // Focus the close button when opened
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50); // slight delay for animation
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

  const handleTab = (e: ReactKeyboardEvent) => {
    if (e.key !== 'Tab' || !overlayRef.current) return;

    const focusableElements = overlayRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  const animationConfig = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.01 }
      }
    : {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        transition: { duration: 0.2 }
      };

  const backdropConfig = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 }
      };

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onKeyDown={handleTab}
          ref={overlayRef}
        >
          {/* Backdrop */}
          <motion.div
            {...backdropConfig}
            className="absolute inset-0 bg-base/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            {...animationConfig}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative bg-surface rounded-2xl border border-line max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-card z-10 flex flex-col"
          >
            <div className="sticky top-0 bg-surface/90 backdrop-blur-md z-20 border-b border-line/50 p-6 flex justify-between items-start">
              <h2 id="modal-title" className="text-h2 font-heading text-fg pr-8">
                {project.title}
              </h2>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close project details"
                className="shrink-0 p-2 rounded-lg text-fg-secondary hover:text-accent hover:bg-elevated transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              <div>
                <span className="font-mono text-mono-label text-accent">
                  {project.tagline}
                </span>
              </div>

              {project.problem && (
                <section>
                  <h3 className="text-h3 font-heading text-fg mb-3">Overview</h3>
                  <p className="text-body text-fg-secondary whitespace-pre-wrap">{project.problem}</p>
                </section>
              )}

              {project.details && (
                <section>
                  <h3 className="text-h3 font-heading text-fg mb-3">Technical Details</h3>
                  <p className="text-body text-fg-secondary whitespace-pre-wrap">{project.details}</p>
                </section>
              )}

              {project.results && (
                <section className="bg-elevated p-5 rounded-lg border border-accent/20 shadow-glow-sm">
                  <h3 className="text-h3 font-heading text-accent flex items-center gap-2 mb-3">
                    <BarChart3 className="w-5 h-5" />
                    Results
                  </h3>
                  <p className="text-body-lg text-fg font-medium">
                    {project.results}
                  </p>
                </section>
              )}

              {project.techniques && project.techniques.length > 0 && (
                <section>
                  <h3 className="text-h3 font-heading text-fg mb-3">Key Techniques</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techniques.map((tech, i) => (
                      <Tag key={i}>{tech}</Tag>
                    ))}
                  </div>
                </section>
              )}

              {project.techStack && project.techStack.length > 0 && (
                <section>
                  <h3 className="text-h3 font-heading text-fg mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <Tag key={i} variant="accent">{tech}</Tag>
                    ))}
                  </div>
                </section>
              )}

              {project.links && project.links.length > 0 && (
                <section className="pt-4 flex flex-wrap gap-3 border-t border-line">
                  {project.links
                    .filter((link: any) => link.url !== '#')
                    .map((link: any, i: number) => (
                      <Button
                        key={i}
                        variant="secondary"
                        onClick={() => window.open(link.url, '_blank', 'noopener noreferrer')}
                      >
                        {link.type.toLowerCase() === 'github' ? (
                          <Github className="w-4 h-4 mr-2 inline" />
                        ) : (
                          <ExternalLink className="w-4 h-4 mr-2 inline" />
                        )}
                        {link.label || link.type}
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
