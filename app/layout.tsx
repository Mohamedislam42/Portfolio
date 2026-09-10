import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import './globals.css';
import { SchemaOrg } from '@/components/SchemaOrg';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mohamedelshourbagy.com'),
  title: {
    default: 'Mohamed Elshourbagy — ML Engineer & CS/AI Student',
    template: '%s | Mohamed Elshourbagy',
  },
  description: 'Computer Science & AI student with hands-on experience building intelligent systems, NLP pipelines, and full-stack AI applications. Proficient in Python, machine learning, deep learning, and REST API development.',
  keywords: [
    'Mohamed Elshourbagy',
    'Mohamed Islam',
    'ML Engineer',
    'Machine Learning',
    'Artificial Intelligence',
    'Deep Learning',
    'NLP',
    'PyTorch',
    'Python Developer',
    'Computer Science Portfolio',
    'AI Developer'
  ],
  authors: [{ name: 'Mohamed Islam Elshourbagy', url: 'https://mohamedelshourbagy.com' }],
  creator: 'Mohamed Islam Elshourbagy',
  publisher: 'Mohamed Islam Elshourbagy',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Mohamed Elshourbagy — ML Engineer & CS/AI Student',
    description: 'Computer Science & AI student building intelligent systems, NLP pipelines, and full-stack AI applications.',
    siteName: 'Mohamed Elshourbagy Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mohamed Elshourbagy — ML Engineer & CS/AI Student',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohamed Elshourbagy — ML Engineer & CS/AI Student',
    description: 'CS & AI student building intelligent systems and full-stack AI applications.',
    images: ['/og-image.png'],
    creator: '@MohamedIslam',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <SchemaOrg />
      </head>
      <body className="bg-base text-fg font-body antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
