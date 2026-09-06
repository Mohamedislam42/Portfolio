'use client';

import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Github, ExternalLink, Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';
import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';

const ProjectModal = dynamic(() => import('./ProjectModal'), { ssr: false });

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <SectionHeading index={3} kicker="Projects" title="Featured work" />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project: Project, index: number) => (
            <ScrollReveal key={project.id || index} delay={0.1 * index}>
              <Card hoverable glowOnHover className="h-full flex flex-col relative overflow-hidden group">
                {/* Gradient accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/80 to-accent/20 z-10" />

                <div className="p-6 lg:p-8 flex flex-col flex-grow pt-8">
                  <h3 className="text-h3 font-heading text-fg group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-body text-fg-secondary mt-1 font-mono text-mono-label !text-accent/80">
                    {project.tagline}
                  </p>

                  <p className="text-body text-fg-secondary mt-3 line-clamp-3 flex-grow">
                    {project.description}
                  </p>

                  {project.impact && (
                    <div className="mt-4 p-3 rounded-lg bg-elevated/70 border border-accent/20">
                      <p className="text-xs font-mono text-fg-secondary leading-relaxed flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-accent font-medium">Impact: </strong>
                          {project.impact.replace(' // TODO: Confirm accuracy with user metrics', '')}
                        </span>
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mt-5">
                    {project.techStack?.slice(0, 4).map((tech, i) => (
                      <Tag key={i} variant="small">{tech}</Tag>
                    ))}
                    {project.techStack && project.techStack.length > 4 && (
                      <Tag variant="small">+{project.techStack.length - 4}</Tag>
                    )}
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-2.5 pt-4 border-t border-line/50">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setSelectedProject(project)}
                      className="group/btn text-xs font-mono"
                    >
                      View details
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>

                    {project.links?.map((link) => (
                      <Button
                        key={link.label}
                        variant="secondary"
                        size="sm"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono"
                      >
                        {link.type === 'github' ? (
                          <Github className="w-3.5 h-3.5 mr-1.5" />
                        ) : (
                          <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                        )}
                        {link.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
