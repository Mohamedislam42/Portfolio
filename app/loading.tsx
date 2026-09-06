import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-base text-fg font-body antialiased">
      {/* Top Navbar Skeleton */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 px-6 border-b border-line/30 bg-base/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="w-10 h-8 rounded bg-elevated animate-pulse" />
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-16 h-4 rounded bg-elevated animate-pulse" />
              ))}
            </div>
            <div className="flex space-x-3">
              <div className="w-20 h-9 rounded-lg bg-elevated animate-pulse" />
              <div className="w-20 h-9 rounded-lg bg-accent/20 animate-pulse" />
            </div>
          </div>
          <div className="lg:hidden w-8 h-8 rounded bg-elevated animate-pulse" />
        </div>
      </header>

      {/* Hero Section Skeleton */}
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-24">
        <div className="py-20 max-w-4xl space-y-6">
          <div className="w-36 h-4 rounded bg-accent/20 animate-pulse" />
          <div className="w-full max-w-2xl h-14 rounded-lg bg-elevated animate-pulse" />
          <div className="w-3/4 max-w-xl h-10 rounded-lg bg-elevated animate-pulse" />
          <div className="space-y-2 pt-2">
            <div className="w-full max-w-lg h-4 rounded bg-elevated/80 animate-pulse" />
            <div className="w-4/5 max-w-md h-4 rounded bg-elevated/80 animate-pulse" />
          </div>
          <div className="flex gap-4 pt-4">
            <div className="w-32 h-11 rounded-lg bg-accent/20 animate-pulse" />
            <div className="w-32 h-11 rounded-lg bg-elevated animate-pulse" />
            <div className="w-36 h-11 rounded-lg bg-elevated animate-pulse" />
          </div>
        </div>

        {/* Section Cards Skeleton */}
        <div className="space-y-8">
          <div className="w-32 h-4 rounded bg-accent/20 animate-pulse" />
          <div className="w-64 h-8 rounded bg-elevated animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {[1, 2].map((i) => (
              <div key={i} className="p-8 rounded-xl bg-surface border border-line space-y-4">
                <div className="w-3/4 h-6 rounded bg-elevated animate-pulse" />
                <div className="w-1/2 h-4 rounded bg-accent/15 animate-pulse" />
                <div className="space-y-2 pt-2">
                  <div className="w-full h-3.5 rounded bg-elevated/80 animate-pulse" />
                  <div className="w-5/6 h-3.5 rounded bg-elevated/80 animate-pulse" />
                </div>
                <div className="flex gap-2 pt-4">
                  <div className="w-16 h-6 rounded bg-elevated animate-pulse" />
                  <div className="w-16 h-6 rounded bg-elevated animate-pulse" />
                  <div className="w-16 h-6 rounded bg-elevated animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
