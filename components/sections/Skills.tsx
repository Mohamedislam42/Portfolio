'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Tag } from '@/components/ui/Tag';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { skillCategories } from '@/data/skills';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faMicrochip, faCodeBranch, faCode, faLayerGroup, faMagnifyingGlass, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { scrollToSection } from '@/lib/utils';

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getIcon = (id: string) => {
    switch (id) {
      case 'ai-nlp':
        return <FontAwesomeIcon icon={faBrain} className="w-4 h-4" />;
      case 'ml-frameworks':
        return <FontAwesomeIcon icon={faMicrochip} className="w-4 h-4" />;
      case 'algorithms-systems':
        return <FontAwesomeIcon icon={faCodeBranch} className="w-4 h-4" />;
      case 'languages':
        return <FontAwesomeIcon icon={faCode} className="w-4 h-4" />;
      default:
        return <FontAwesomeIcon icon={faLayerGroup} className="w-4 h-4" />;
    }
  };

  const filteredCategories = skillCategories.filter((cat) => {
    if (activeCategory !== 'all' && cat.id !== activeCategory) return false;
    if (!searchQuery.trim()) return true;

    return (
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <SectionHeading index={5} kicker="Technical Skills" title="Tools, Frameworks & Concepts" />

          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-44">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="w-3.5 h-3.5 text-fg-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter skill or tool..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-base border border-line rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-fg placeholder:text-fg-muted focus:border-accent focus:outline-none"
              />
            </div>

            <div className="inline-flex p-1 rounded-lg bg-base border border-line overflow-x-auto max-w-full no-scrollbar shrink-0">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-accent text-base font-semibold'
                    : 'text-fg-secondary hover:text-fg'
                }`}
              >
                All Domains
              </button>
              {skillCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-accent text-base font-semibold'
                      : 'text-fg-secondary hover:text-fg'
                  }`}
                >
                  {cat.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCategories.map((category, index) => (
            <ScrollReveal key={category.id} delay={0.08 * (index + 1)}>
              <Card hoverable glowOnHover className="p-4 sm:p-6 bg-elevated/70 border-line h-full flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/50 to-transparent" />

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                      {getIcon(category.id)}
                    </div>
                    <div>
                      <h3 className="font-heading text-sm sm:text-base font-bold text-fg group-hover:text-accent transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-fg-secondary font-body mb-4 sm:mb-5 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {category.items
                      .filter((item) =>
                        searchQuery ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
                      )
                      .map((item) => (
                        <span
                          key={item.name}
                          onClick={() => {
                            if (item.projectRef) {
                              scrollToSection('projects');
                            }
                          }}
                          className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-mono border transition-all ${
                            item.level === 'Core'
                              ? 'bg-accent/10 border-accent/30 text-accent font-medium'
                              : 'bg-surface border-line text-fg-secondary hover:text-fg hover:border-accent/40'
                          } ${item.projectRef ? 'cursor-pointer hover:scale-105' : ''}`}
                          title={item.projectRef ? `Used in project: ${item.projectRef} (Click to view)` : undefined}
                        >
                          <span>{item.name}</span>
                          {item.projectRef && <FontAwesomeIcon icon={faWandMagicSparkles} className="w-2.5 h-2.5 text-accent shrink-0" />}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 pt-3 border-t border-line/60 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-fg-muted">
                  <span>{category.items.length} technologies</span>
                  <span className="text-accent/80 font-medium">
                    {category.items.filter((i) => i.level === 'Core').length} Core Proficiencies
                  </span>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
