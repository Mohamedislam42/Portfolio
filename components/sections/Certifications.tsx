'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { certifications } from '@/data/certifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export function Certifications() {
  return (
    <section id="certifications" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <SectionHeading index={6} kicker="Certifications" title="Courses & credentials" />

        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {certifications.map((cert, index) => (
            <ScrollReveal key={cert.id} delay={0.1 * (index + 1)}>
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify certificate: ${cert.title}`}
                className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
              >
                <Card 
                  hoverable 
                  glowOnHover 
                  className="p-4 sm:p-6 bg-elevated/70 border-line h-full flex items-start gap-3.5 sm:gap-4 transition-all duration-300 group-hover:border-accent/60"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 group-hover:scale-105 transition-transform">
                    <FontAwesomeIcon icon={faAward} className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-sm sm:text-base font-bold text-fg group-hover:text-accent transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1.5 font-mono text-xs text-fg-secondary">
                      <span className="text-accent/90">{cert.issuer}</span>
                      <span className="text-fg-muted">•</span>
                      <span>{cert.platform}</span>
                    </div>
                  </div>

                  <div className="text-fg-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5 p-1">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3.5 h-3.5" />
                  </div>
                </Card>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
