'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base text-fg flex items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none -top-20 -left-20" />
      <div className="absolute w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none -bottom-20 -right-20" />

      <div className="max-w-lg w-full text-center relative z-10 p-8 rounded-2xl bg-surface/60 border border-line/80 backdrop-blur-xl shadow-card">
        <div className="font-mono text-mono-label text-accent tracking-widest uppercase mb-3">
          // 404 Error
        </div>
        
        <h1 className="font-heading text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal-200 to-accent mb-4">
          404
        </h1>

        <h2 className="font-heading text-h3 text-fg mb-3">
          Page not found
        </h2>

        <p className="text-body text-fg-secondary mb-8">
          The page or resource you are looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="primary" size="md" className="w-full sm:w-auto font-mono text-sm">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
