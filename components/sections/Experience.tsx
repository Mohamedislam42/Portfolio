'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Tag } from '@/components/ui/Tag';
import { experiences } from '@/data/experience';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 bg-base">
      <div className="max-w-7xl mx-auto">
        <SectionHeading index={2} kicker="Experience" title="Where I've worked" />
        
        <div className="relative mt-8 sm:mt-12 lg:pl-0">
          {/* Desktop timeline line */}
          <div className="hidden lg:block absolute left-[24px] top-0 bottom-0 w-px bg-line" />
          
          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp: any, index: number) => (
              <ScrollReveal key={index} delay={0.1 * index}>
                <div className="relative lg:pl-16">
                  {/* Desktop timeline dot */}
                  <div className="hidden lg:block absolute left-[17px] top-1.5 w-[15px] h-[15px] rounded-full border-2 border-accent bg-base z-10" />

                  {/* Mobile border line & stacking layout */}
                  <div className="lg:border-0 border-l-2 border-accent pl-4 sm:pl-6 lg:pl-0">
                    <h3 className="text-xl sm:text-2xl font-heading text-fg font-bold">{exp.role}</h3>
                    <p className="text-sm sm:text-base text-accent mt-0.5">{exp.company}</p>

                    <div className="flex flex-wrap gap-2.5 sm:gap-4 mt-2.5 text-fg-muted text-xs font-mono">
                      {exp.location && (
                        <div className="flex items-center gap-1.5">
                          <FontAwesomeIcon icon={faLocationDot} className="w-3.5 h-3.5" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                      {(exp.dateRange || exp.duration || exp.startDate) && (
                        <div className="flex items-center gap-1.5">
                          <FontAwesomeIcon icon={faCalendarDays} className="w-3.5 h-3.5" />
                          <span>{exp.dateRange || exp.duration || `${exp.startDate} - ${exp.endDate}`}</span>
                        </div>
                      )}
                      {exp.mode && (
                        <div className="flex items-center gap-1.5">
                          <span className="bg-surface px-2 py-0.5 rounded border border-line text-[11px]">
                            {exp.mode}
                          </span>
                        </div>
                      )}
                    </div>

                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-4 sm:mt-6 space-y-2.5 sm:space-y-3">
                        {exp.bullets.map((bullet: string, i: number) => (
                          <li 
                            key={i} 
                            className="text-xs sm:text-sm text-fg-secondary relative pl-4 sm:pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full leading-relaxed"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.techStack && exp.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4 sm:mt-6">
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
