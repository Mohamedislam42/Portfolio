'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/data/navigation';
import { cn, scrollToSection } from '@/lib/utils';
import { useScrollSpy } from '@/lib/hooks/useScrollSpy';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Extract ids from navLinks for the scroll spy (removing the '#' prefix)
  const sectionIds = navLinks.map(link => link.href.startsWith('#') ? link.href.slice(1) : link.href);
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
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
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-elevated/80 backdrop-blur-xl border-b border-white/10 py-4'
            : 'bg-transparent py-6'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#"
            onClick={handleScrollToTop}
            aria-label="Scroll to top"
            className="font-heading font-bold text-xl text-fg border border-accent/50 px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            ME
          </a>

          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex items-center space-x-6">
              {navLinks.map((link) => {
                const id = link.href.startsWith('#') ? link.href.slice(1) : link.href;
                const isActive = activeSection === id;
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className={cn(
                        'text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm',
                        isActive
                          ? 'text-accent'
                          : 'text-fg-secondary hover:text-fg'
                      )}
                    >
                      {link.label}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center space-x-4">
              {/* [ADD RESUME PDF] — place resume.pdf in /public */}
              <Button
                variant="ghost"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
              >
                Resume
              </Button>
              <Button
                onClick={() => handleLinkClick('#contact')}
                variant="primary"
                size="sm"
              >
                Contact
              </Button>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
