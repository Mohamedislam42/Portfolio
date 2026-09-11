'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { navLinks } from '@/data/navigation';
import { cn, scrollToSection } from '@/lib/utils';
import { useScrollSpy } from '@/lib/hooks/useScrollSpy';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';

interface NavbarProps {
  onOpenResume?: () => void;
}

export function Navbar({ onOpenResume }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const sectionIds = navLinks.map(link => link.href.startsWith('#') ? link.href.slice(1) : link.href);
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (href: string) => {
    const id = href.startsWith('#') ? href.slice(1) : href;
    scrollToSection(id);
  };

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-elevated/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-lg'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#"
            onClick={handleScrollToTop}
            aria-label="Scroll to top"
            className="font-heading font-bold text-lg text-fg border border-accent/40 px-2.5 py-1 rounded bg-surface/60 hover:border-accent transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="text-accent font-mono text-sm">&lt;/&gt;</span>
            <span>ME</span>
          </a>

          <div className="hidden lg:flex items-center space-x-7">
            <ul className="flex items-center space-x-5">
              {navLinks.map((link) => {
                const id = link.href.startsWith('#') ? link.href.slice(1) : link.href;
                const isActive = activeSection === id;
                const isAILab = id === 'ai-lab';

                return (
                  <li key={link.href}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className={cn(
                        'text-xs font-mono font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1.5 py-0.5 flex items-center gap-1',
                        isActive
                          ? 'text-accent font-semibold'
                          : 'text-fg-secondary hover:text-fg',
                        isAILab && 'text-teal-300/90 hover:text-accent font-semibold'
                      )}
                    >
                      {isAILab && <FontAwesomeIcon icon={faWandMagicSparkles} className="w-3 h-3 text-accent animate-pulse" />}
                      <span>{link.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center space-x-3 pl-3 border-l border-line/80">
              <Button
                variant="ghost"
                onClick={onOpenResume ? onOpenResume : () => window.open('/resume.pdf', '_blank')}
                size="sm"
                className="font-mono text-xs"
              >
                Resume
              </Button>

              <Button
                onClick={() => handleLinkClick('#contact')}
                variant="primary"
                size="sm"
                className="font-mono text-xs"
              >
                Contact
              </Button>
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <FontAwesomeIcon icon={faXmark} className="w-5 h-5 text-xl" />
              ) : (
                <FontAwesomeIcon icon={faBars} className="w-5 h-5 text-xl" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
