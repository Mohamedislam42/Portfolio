'use client';

import { GraduationCap } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Tag } from '@/components/ui/Tag';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { education } from '@/data/experience';

export function About() {
  return (
    <section id="about" className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          <div className="lg:col-span-2">
            <ScrollReveal>
              {/* [ADD PHOTO] — replace this div with <Image src="/photo.jpg" ... /> */}
              <div className="aspect-square w-full max-w-[320px] rounded-2xl bg-gradient-to-br from-accent/20 to-surface flex items-center justify-center">
                <span className="font-heading text-6xl text-accent/50">ME</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-6 max-w-[320px]">
                <Tag>📍 Alexandria, Egypt</Tag>
                <Tag>🌐 Arabic • English</Tag>
                <Tag>🎓 CS & AI @ AIU</Tag>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-3">
            <ScrollReveal>
              <SectionHeading index={1} kicker="About" title="A bit about me" />
              
              <div className="text-body-lg text-fg-secondary space-y-4 mt-6">
                <p>
                  I'm a Computer Science & AI student at Al Alamein International University, set to graduate in 2026. I build intelligent systems — not just models in notebooks, but complete applications from data pipeline to deployment.
                </p>
                <p>
                  My path has been intentionally wide: from a game development internship building 3D character rigs and Unity NavMesh-based AI agent pathfinding, to a software development traineeship building multithreaded real-time chat applications in Java, to independent ML projects spanning parameter-efficient fine-tuning and full-stack optimization systems.
                </p>
                <p>
                  The through-line is shipping. I consistently deliver complete, working systems — data preprocessing, model training, backend API, frontend integration, and containerized deployment. I'm most energized when I can take an idea from a research paper to a running application.
                </p>
              </div>

              {education && (
                <div className="mt-8 p-6 rounded-xl bg-elevated border border-surface shadow-sm">
                  <GraduationCap className="w-8 h-8 text-accent mb-4" />
                  <h4 className="font-heading text-h3 text-fg mb-1">
                    {education.degree}
                  </h4>
                  <div className="text-fg-secondary mb-2">
                    {education.institution}
                  </div>
                  <div className="font-mono text-mono-label text-fg-secondary/70 mb-4">
                    {education.startDate} — {education.endDate}
                  </div>
                  <p className="text-small text-fg-secondary">
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
