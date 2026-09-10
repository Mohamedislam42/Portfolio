'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { socialLinks } from '@/data/navigation';

export function Footer() {
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
              className="p-2 text-fg-secondary hover:text-accent hover:bg-elevated rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent w-9 h-9 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faGithub} className="w-5 h-5 text-[18px]" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="p-2 text-fg-secondary hover:text-accent hover:bg-elevated rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent w-9 h-9 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5 text-[18px]" />
            </a>
            <a
              href={socialLinks.email}
              aria-label="Email me"
              className="p-2 text-fg-secondary hover:text-accent hover:bg-elevated rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent w-9 h-9 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-[16px]" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-fg-secondary text-sm">
            © {new Date().getFullYear()} Mohamed Islam Elshourbagy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
