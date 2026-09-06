import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#0A0A0F',
        surface: '#12121A',
        elevated: '#1A1A24',
        accent: {
          DEFAULT: '#5EEAD4',
          dim: 'rgba(94, 234, 212, 0.2)',
          glow: 'rgba(94, 234, 212, 0.15)',
          muted: 'rgba(94, 234, 212, 0.5)',
        },
        fg: {
          DEFAULT: '#F4F4F6',
          secondary: '#9CA3AF',
          muted: '#6B7280',
        },
        success: '#34D399',
        error: '#F87171',
        warning: '#FBBF24',
        line: {
          DEFAULT: '#1E1E2A',
          accent: 'rgba(94, 234, 212, 0.3)',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h2': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.7', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'mono-label': ['0.8125rem', { lineHeight: '1.5', fontWeight: '500' }],
      },
      spacing: {
        'section': '6rem',
        'section-sm': '4rem',
      },
      maxWidth: {
        'container': '80rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(94, 234, 212, 0.15)',
        'glow-lg': '0 0 40px rgba(94, 234, 212, 0.2)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
