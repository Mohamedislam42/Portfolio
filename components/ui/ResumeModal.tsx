'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faDownload, faPrint, faGraduationCap, faBriefcase, faCode, faAward, faArrowUpRightFromSquare, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/Button';
import { education, experiences } from '@/data/experience';
import { projects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
import { certifications } from '@/data/certifications';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-base/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative bg-surface border border-line rounded-2xl shadow-card max-w-4xl w-full max-h-[88vh] flex flex-col z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-surface/95 backdrop-blur-md px-6 py-4 border-b border-line flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                <h2 className="text-h3 font-heading font-bold text-fg">Curriculum Vitae</h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/15 text-accent border border-accent/30">
                  Interactive Preview
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handlePrint}
                  className="font-mono text-xs hidden sm:flex items-center gap-1.5"
                >
                  <FontAwesomeIcon icon={faPrint} className="w-3.5 h-3.5" />
                  Print
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs flex items-center gap-1.5"
                >
                  <FontAwesomeIcon icon={faDownload} className="w-3.5 h-3.5" />
                  Download PDF
                </Button>
                <button
                  onClick={onClose}
                  className="p-1.5 text-fg-secondary hover:text-accent rounded-lg transition-colors ml-2"
                  aria-label="Close resume preview"
                >
                  <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Document Content */}
            <div className="p-6 md:p-10 overflow-y-auto space-y-8 bg-elevated/40 text-fg">
              {/* Header Title in document */}
              <div className="border-b border-line pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold text-fg">Mohamed Islam Elshourbagy</h1>
                  <p className="text-accent font-mono text-sm mt-1">Computer Science & Artificial Intelligence Student • ML Engineer</p>
                </div>
                <div className="text-xs font-mono text-fg-secondary space-y-1 md:text-right shrink-0">
                  <p>Alexandria, Egypt</p>
                  <p className="whitespace-nowrap">+20 128 080 6343</p>
                  <p className="whitespace-nowrap">
                    <a href="https://linkedin.com/in/mohamed-islam42" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">LinkedIn</a>
                    {' | '}
                    <a href="https://github.com/Mohamedislam42" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">GitHub</a>
                  </p>
                </div>
              </div>

              {/* Professional Summary */}
              <section className="space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                  Professional Summary
                </h3>
                <p className="text-xs sm:text-sm text-fg-secondary leading-relaxed bg-surface p-4 rounded-xl border border-line">
                  Computer Science & AI student at Alamein International University with hands-on experience building intelligent systems, NLP pipelines, and full-stack AI applications. Proficient in Python, machine learning, deep learning, and REST API development, with practical exposure to containerized deployment, graph algorithms, and real-time systems. Demonstrated ability to deliver complete projects end-to-end from data preprocessing and model training to frontend integration and deployment. Seeking ML engineering roles to apply AI expertise in production environments.
                </p>
              </section>

              {/* Education */}
              <section className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                  <FontAwesomeIcon icon={faGraduationCap} className="w-4 h-4" />
                  Education
                </h3>
                <div className="p-4 rounded-xl bg-surface border border-line">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-heading font-semibold text-fg text-base">{education.degree}</h4>
                    <span className="text-xs font-mono text-fg-muted">{education.startDate} — {education.endDate}</span>
                  </div>
                  <p className="text-sm text-fg-secondary mt-0.5">{education.institution} • {education.location}</p>
                  <p className="text-xs text-fg-secondary mt-2">{education.description}</p>
                </div>
              </section>

              {/* Experience */}
              <section className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                  <FontAwesomeIcon icon={faBriefcase} className="w-4 h-4" />
                  Experience & Internships
                </h3>
                <div className="space-y-3">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="p-4 rounded-xl bg-surface border border-line space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <h4 className="font-heading font-semibold text-fg text-base">{exp.role}</h4>
                          <p className="text-accent text-xs font-mono">{exp.company} • {exp.mode}</p>
                        </div>
                        <span className="text-xs font-mono text-fg-muted">{exp.startDate} — {exp.endDate}</span>
                      </div>
                      <ul className="space-y-1.5 mt-2">
                        {exp.bullets.map((b, idx) => (
                          <li key={idx} className="text-xs text-fg-secondary relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-accent">
                            {b}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.techStack.map((tech) => (
                          <span key={tech} className="text-[11px] font-mono px-2 py-0.5 rounded bg-elevated border border-line text-fg-secondary">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Highlighted Projects */}
              <section className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                  <FontAwesomeIcon icon={faCode} className="w-4 h-4" />
                  Highlighted Engineering Projects
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {projects.map((p) => (
                    <div key={p.id} className="p-4 rounded-xl bg-surface border border-line flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-heading font-semibold text-fg text-sm">{p.title}</h4>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent/10 text-accent shrink-0">
                            {p.categoryLabel.split(' ')[0]}
                          </span>
                        </div>
                        <p className="text-xs text-fg-secondary mt-1.5 line-clamp-3">{p.description}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-line/60 flex flex-wrap gap-1">
                        {p.techStack.slice(0, 3).map((t) => (
                          <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-elevated text-fg-muted">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills Matrix */}
              <section className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                  <FontAwesomeIcon icon={faAward} className="w-4 h-4" />
                  Skills & Technical Domains
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skillCategories.map((cat) => (
                    <div key={cat.id} className="p-3 rounded-lg bg-surface border border-line">
                      <h4 className="font-mono text-xs font-bold text-accent mb-1">{cat.name}</h4>
                      <p className="text-xs text-fg-secondary leading-relaxed">
                        {cat.items.map((i) => i.name).join(' • ')}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications */}
              <section className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                  <FontAwesomeIcon icon={faAward} className="w-4 h-4" />
                  Credentials & Certifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {certifications.map((cert) => (
                    <a
                      key={cert.id}
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-surface border border-line hover:border-accent/50 transition-colors flex items-center justify-between text-xs group"
                    >
                      <div>
                        <span className="font-semibold text-fg group-hover:text-accent transition-colors block">{cert.title}</span>
                        <span className="text-fg-muted font-mono text-[11px]">{cert.issuer} • {cert.platform}</span>
                      </div>
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3.5 h-3.5 text-fg-muted group-hover:text-accent shrink-0 ml-2" />
                    </a>
                  ))}
                </div>
              </section>

              {/* Languages */}
              <section className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                  <FontAwesomeIcon icon={faGlobe} className="w-4 h-4" />
                  Languages
                </h3>
                <div className="p-3 rounded-lg bg-surface border border-line flex flex-wrap items-center gap-6 text-xs">
                  <div>
                    <span className="font-bold text-fg">Arabic:</span> <span className="text-fg-secondary">Native</span>
                  </div>
                  <div className="text-line">|</div>
                  <div>
                    <span className="font-bold text-fg">English:</span> <span className="text-fg-secondary">Fluent (Professional Working Proficiency)</span>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
