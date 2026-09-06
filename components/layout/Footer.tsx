'use client';

import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { socialLinks } from '@/data/navigation';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-surface border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          <div className="text-center md:text-left">
            <h2 className="font-heading text-lg font-bold text-fg">Mohamed Elshourbagy</h2>
            <p className="text-fg-secondary text-sm mt-1">CS & AI Student • ML Engineer</p>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="p-2 text-fg-secondary hover:text-accent hover:bg-elevated rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Github size={20} />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="p-2 text-fg-secondary hover:text-accent hover:bg-elevated rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={socialLinks.email}
              aria-label="Email me"
              className="p-2 text-fg-secondary hover:text-accent hover:bg-elevated rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
          <p className="text-fg-secondary/70 text-sm">
            © {new Date().getFullYear()} Mohamed Islam Elshourbagy. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-sm text-fg-secondary hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-2 py-1"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
