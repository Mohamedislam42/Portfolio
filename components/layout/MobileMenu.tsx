'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail, X } from 'lucide-react';
import { navLinks, socialLinks } from '@/data/navigation';
import { scrollToSection } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const prefersReducedMotion = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus first element on open (close button)
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      
      // Basic focus trap
      if (e.key === 'Tab' && isOpen && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleLinkClick = (href: string) => {
    const id = href.startsWith('#') ? href.slice(1) : href;
    scrollToSection(id);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const menuVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 20,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.05, staggerDirection: -1 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 flex items-center justify-center lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-base/95 backdrop-blur-xl"
            onClick={handleBackdropClick}
          />

          <motion.div
            ref={menuRef}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-50 w-full h-full flex flex-col items-center justify-center p-6"
            onClick={handleBackdropClick}
          >
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-fg hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <ul className="flex flex-col items-center space-y-8 w-full max-w-sm">
              {navLinks.map((link) => (
                <motion.li key={link.href} variants={itemVariants} className="w-full text-center">
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="font-heading text-3xl font-medium text-fg hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-4 py-2 w-full"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}

              <motion.li variants={itemVariants} className="flex flex-col items-center space-y-4 w-full mt-8 pt-8 border-t border-white/10">
                <Button
                  variant="ghost"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-lg py-6"
                  onClick={onClose}
                >
                  Resume
                </Button>
                <Button
                  onClick={() => handleLinkClick('#contact')}
                  variant="primary"
                  className="w-full text-lg py-6"
                >
                  Contact
                </Button>
              </motion.li>

              <motion.li variants={itemVariants} className="flex space-x-6 mt-8">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-3 bg-surface rounded-full text-fg-secondary hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Github size={24} />
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-3 bg-surface rounded-full text-fg-secondary hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href={socialLinks.email}
                  aria-label="Email"
                  className="p-3 bg-surface rounded-full text-fg-secondary hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Mail size={24} />
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
