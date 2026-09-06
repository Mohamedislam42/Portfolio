'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Tag } from '@/components/ui/Tag';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { skillCategories } from '@/data/skills';
import { Cpu } from 'lucide-react';

export function Skills() {
  const featuredCategory = skillCategories.find(cat => cat.featured);
  const otherCategories = skillCategories.filter(cat => !cat.featured);

  return (
    <section id="skills" className="py-24 px-6 bg-base">
      <div className="max-w-7xl mx-auto">
        <SectionHeading index={4} kicker="Skills" title="Tools & technologies" />

        <div className="mt-12 space-y-8">
          {featuredCategory && (
            <ScrollReveal delay={0.1}>
              <Card hoverable glowOnHover className="p-6 md:p-8 bg-surface relative overflow-hidden group">
                {/* Gradient accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/80 via-accent/40 to-transparent" />
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-h4 text-fg group-hover:text-accent transition-colors">
                      {featuredCategory.name}
                    </h3>
                    <p className="font-mono text-mono-label text-fg-secondary/70 text-xs">
                      Core focus & foundational knowledge
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {featuredCategory.items.map(item => (
                    <Tag 
                      key={item} 
                      variant="accent" 
                      className="hover:bg-accent/20 transition-colors text-sm px-3.5 py-1.5"
                    >
                      {item}
                    </Tag>
                  ))}
                </div>
              </Card>
            </ScrollReveal>
          )}

          {otherCategories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherCategories.map((category, index) => (
                <ScrollReveal key={category.id} delay={0.08 * ((index % 3) + 1)}>
                  <Card hoverable glowOnHover className="p-6 bg-surface h-full flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-line">
                        <h3 className="font-heading text-h4 text-fg group-hover:text-accent transition-colors text-base font-semibold">
                          {category.name}
                        </h3>
                        <span className="font-mono text-xs text-fg-muted">
                          {category.items.length}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {category.items.map(item => (
                          <Tag key={item} variant="default" className="text-xs">
                            {item}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
