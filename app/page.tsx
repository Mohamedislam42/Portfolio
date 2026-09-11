'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Certifications } from '@/components/sections/Certifications';
import { Footer } from '@/components/layout/Footer';
import { ToastProvider } from '@/components/ui/Toast';

// Code-split heavy interactive and below-the-fold components
const Projects = dynamic(() => import('@/components/sections/Projects').then((mod) => mod.Projects), {
  loading: () => <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 min-h-[400px]" />,
});

const AILab = dynamic(() => import('@/components/sections/AILab').then((mod) => mod.AILab), {
  loading: () => <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 min-h-[500px]" />,
});

const Contact = dynamic(() => import('@/components/sections/Contact').then((mod) => mod.Contact), {
  loading: () => <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 min-h-[300px]" />,
});

const ResumeModal = dynamic(() => import('@/components/ui/ResumeModal').then((mod) => mod.ResumeModal), {
  ssr: false,
});

const BackToTop = dynamic(() => import('@/components/ui/BackToTop').then((mod) => mod.BackToTop), {
  ssr: false,
});

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

