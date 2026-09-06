'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Tag } from '@/components/ui/Tag';
import { experiences } from '@/data/experience';
import { MapPin, Calendar } from 'lucide-react';

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-base">
      <div className="max-w-7xl mx-auto">
        <SectionHeading index={2} kicker="Experience" title="Where I've worked" />
        
        <div className="relative mt-12 lg:pl-0">
          {/* Desktop timeline line */}
          <div className="hidden lg:block absolute left-[24px] top-0 bottom-0 w-px bg-line" />
          
          <div className="space-y-12">
            {experiences.map((exp: any, index: number) => (
              <ScrollReveal key={index} delay={0.1 * index}>
                <div className="relative lg:pl-16">
                  {/* Desktop timeline dot */}
                  <div className="hidden lg:block absolute left-[17px] top-1.5 w-[15px] h-[15px] rounded-full border-2 border-accent bg-base z-10" />

                  {/* Mobile border line & stacking layout */}
                  <div className="lg:border-0 border-l-2 border-accent pl-6 lg:pl-0">
                    <h3 className="text-h3 font-heading text-fg">{exp.role}</h3>
                    <p className="text-body text-accent mt-1">{exp.company}</p>

                    <div className="flex flex-wrap gap-4 mt-3 text-fg-muted text-small font-mono">
                      {exp.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                      {(exp.dateRange || exp.duration || exp.startDate) && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.dateRange || exp.duration || `${exp.startDate} - ${exp.endDate}`}</span>
                        </div>
                      )}
                      {exp.mode && (
                        <div className="flex items-center gap-1.5">
                          <span className="bg-surface px-2 py-0.5 rounded border border-line">
                            {exp.mode}
                          </span>
                        </div>
                      )}
                    </div>

                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-6 space-y-3">
                        {exp.bullets.map((bullet: string, i: number) => (
                          <li 
                            key={i} 
                            className="text-body text-fg-secondary relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.techStack && exp.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-6">
                        {exp.techStack.map((tech: string, i: number) => (
                          <Tag key={i} variant="small">{tech}</Tag>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
