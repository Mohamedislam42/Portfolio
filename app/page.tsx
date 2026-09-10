'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { AILab } from '@/components/sections/AILab';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Certifications } from '@/components/sections/Certifications';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';
import { ResumeModal } from '@/components/ui/ResumeModal';
import { BackToTop } from '@/components/ui/BackToTop';
import { ToastProvider } from '@/components/ui/Toast';

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <ToastProvider>
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
      />

      <main>
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
        />
        <About />
        <Experience />
        <Projects />
        <AILab />
        <Skills />
        <Certifications />
        <Contact />
      </main>

      <Footer />

      {/* Floating Circular Back To Top Button */}
      <BackToTop />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </ToastProvider>
  );
}

