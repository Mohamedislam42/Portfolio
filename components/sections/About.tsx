'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faLocationDot, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Tag } from '@/components/ui/Tag';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { education } from '@/data/experience';

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 items-start">
          
          {/* Photo & Quick Info Column */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <div className="relative group max-w-[280px] sm:max-w-[340px] mx-auto lg:mx-0">
                {/* Ambient glow behind image */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-accent via-teal-400 to-emerald-400 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500" />

                {/* Image container */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-elevated border border-line shadow-card">
                  <Image
                    src="/photo.png"
                    alt="Mohamed Islam Elshourbagy"
                    fill
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 400px"
                    loading="lazy"
                    className="object-cover object-top filter brightness-[1.02] contrast-[1.02] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base/60 via-transparent to-transparent opacity-60" />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4 sm:mt-6 max-w-[340px] mx-auto lg:mx-0 justify-center lg:justify-start">
                <Tag variant="accent">
                  <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3 mr-1.5 text-accent" />
                  Alexandria, Egypt
                </Tag>
                <Tag>
                  <FontAwesomeIcon icon={faGlobe} className="w-3 h-3 mr-1.5 text-fg-muted" />
                  Arabic • English
                </Tag>
                <Tag>
                  <FontAwesomeIcon icon={faGraduationCap} className="w-3 h-3 mr-1.5 text-fg-muted" />
                  CS & AI @ AIU (2027)
                </Tag>
              </div>
            </ScrollReveal>
          </div>

          {/* Bio & Education Column */}
          <div className="lg:col-span-3">
            <ScrollReveal>
              <SectionHeading index={1} kicker="About Me" title="Turning Research into Deployed Intelligence" />
              
              <div className="text-sm sm:text-base md:text-lg text-fg-secondary space-y-3.5 sm:space-y-4 mt-4 sm:mt-6 leading-relaxed">
                <p>
                  I'm a Computer Science & AI student at Al Alamein International University, graduating in 2027, focused on building AI systems that actually run — not just models in a notebook, but the full path from data to something deployed and usable.
                </p>
                <p>
                  My work spans three areas: parameter-efficient NLP (fine-tuning and distillation), full-stack ML applications (traffic prediction, routing, containerized deployment), and multi-agent LLM systems (agents that research, summarize, and verify each other's work). I'm currently building on this through DEPI, Egypt's national program for agentic and generative AI development.
                </p>
                <p>
                  What I care about most is the last step most student projects skip — turning a working model into something someone else can open, use, and trust. The details and results for each project are below.
                </p>
              </div>

              {education && (
                <div className="mt-6 sm:mt-8 p-5 sm:p-6 rounded-2xl bg-elevated border border-line shadow-sm relative overflow-hidden group hover:border-accent/40 transition-colors">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-teal-300/40 to-transparent" />
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                      <FontAwesomeIcon icon={faGraduationCap} className="w-5 h-5 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading text-base sm:text-lg font-bold text-fg group-hover:text-accent transition-colors">
                        {education.degree}
                      </h4>
                      <p className="text-xs sm:text-sm font-mono text-fg-secondary">
                        {education.institution} • {education.location}
                      </p>
                    </div>
                  </div>

                  <div className="font-mono text-xs text-accent/90 mb-2.5 pl-1">
                    {education.startDate} — {education.endDate}
                  </div>

                  <p className="text-xs sm:text-small text-fg-secondary leading-relaxed pl-1">
                    {education.description}
                  </p>
                </div>
              )}
            </ScrollReveal>
          </div>
          
        </div>
      </div>
    </section>
  );
}
