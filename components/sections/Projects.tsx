'use client';

import React, { useState, useMemo } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Github, ExternalLink, Sparkles, Search } from 'lucide-react';
import dynamic from 'next/dynamic';
import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';

const ProjectModal = dynamic(() => import('./ProjectModal'), { ssr: false });

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'nlp', label: 'NLP & LLMs' },
  { id: 'systems', label: 'Full-Stack & Systems' },
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.tagline.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 bg-base">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <SectionHeading index={3} kicker="Featured Work" title="Engineered Systems & Pipelines" />

          {/* Search bar & filter controls */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-48">
              <Search className="w-4 h-4 text-fg-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tech, models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-line rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-fg placeholder:text-fg-muted focus:border-accent focus:outline-none"
              />
            </div>

            {/* Category pills */}
            <div className="inline-flex p-1 rounded-lg bg-surface border border-line overflow-x-auto max-w-full no-scrollbar shrink-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-accent text-base font-semibold'
                      : 'text-fg-secondary hover:text-fg'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project: Project, index: number) => (
            <ScrollReveal key={project.id} delay={0.1 * (index + 1)}>
              <Card hoverable glowOnHover className="h-full flex flex-col relative overflow-hidden group bg-surface border-line">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/80 via-teal-300/40 to-transparent z-10" />

                <div className="p-5 sm:p-6 lg:p-8 flex flex-col flex-grow pt-6 sm:pt-8">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] sm:text-[11px] font-mono text-accent uppercase tracking-wider">
                      {project.categoryLabel}
                    </span>
                    {project.featured && (
                      <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading text-fg font-bold group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-xs font-mono text-fg-secondary mt-1">
                    {project.tagline}
                  </p>

                  <p className="text-body text-fg-secondary mt-3 line-clamp-3 flex-grow text-xs sm:text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Metrics Pills */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                      {project.metrics.map((metric, i) => (
                        <div key={i} className="p-2 rounded bg-elevated/70 border border-line text-center">
                          <span className="text-[9px] sm:text-[10px] font-mono text-fg-muted block truncate">{metric.label}</span>
                          <span className="text-xs font-mono font-bold text-accent block mt-0.5">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mt-4 sm:mt-5">
                    {project.techStack.map((tech, i) => (
                      <Tag key={i} variant="small">{tech}</Tag>
                    ))}
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-line/60">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setSelectedProject(project)}
                      className="group/btn text-xs font-mono w-full sm:w-auto justify-center"
                    >
                      <span>Deep Dive & Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>

                    <div className="flex items-center gap-2">
                      {project.links?.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-elevated border border-line text-fg-secondary hover:text-accent hover:border-accent/40 transition-colors"
                          aria-label={link.label}
                          title={link.label}
                        >
                          {link.type === 'github' ? (
                            <Github className="w-4 h-4" />
                          ) : (
                            <ExternalLink className="w-4 h-4" />
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 sm:py-16 p-6 rounded-2xl bg-surface border border-line font-mono text-fg-muted">
            <p>No projects match '{searchQuery}' in the selected category.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-3 text-xs text-accent underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
