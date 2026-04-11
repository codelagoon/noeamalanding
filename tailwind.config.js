/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base neutrals
        'page-bg': '#050505',
        'section-bg': '#0A0A0A',
        'card-bg': '#101010',
        'card-elevated': '#151515',
        'divider': '#242424',
        'border-subtle': '#1a1a1a',
        
        // Text hierarchy
        'text-primary': '#F5F5F2',
        'text-secondary': '#B7B7B0',
        'text-muted': '#7A7A73',
        
        // Minimal accents
        'accent-blue': '#8BA7FF',
        'accent-gold': '#D6B25E',
        'accent-red': '#D85C5C',
        
        // Semantic
        background: '#050505',
        foreground: '#F5F5F2',
        primary: {
          DEFAULT: '#F5F5F2',
          foreground: '#050505',
        },
        secondary: {
          DEFAULT: '#151515',
          foreground: '#F5F5F2',
        },
        muted: {
          DEFAULT: '#101010',
          foreground: '#7A7A73',
        },
        accent: {
          DEFAULT: '#8BA7FF',
          foreground: '#050505',
        },
        destructive: {
          DEFAULT: '#D85C5C',
          foreground: '#F5F5F2',
        },
        border: '#242424',
        input: '#242424',
        ring: '#8BA7FF',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Instrument Serif', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'DM Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Hero typography
        'display': ['clamp(3rem, 8vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'headline': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'title': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        // Body
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        // Utility
        'eyebrow': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.12em' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }],
        'stat': ['2.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        'section': 'clamp(5rem, 12vw, 10rem)',
        'section-sm': 'clamp(3rem, 8vw, 6rem)',
      },
      maxWidth: {
        'content': '1200px',
        'prose': '640px',
        'narrow': '480px',
      },
      borderRadius: {
        'sm': '3px',
        'DEFAULT': '6px',
        'lg': '8px',
      },
      boxShadow: {
        'card': '0 1px 2px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.5)',
        'glow-gold': '0 0 20px rgba(214, 178, 94, 0.15)',
        'glow-blue': '0 0 20px rgba(139, 167, 255, 0.15)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'draw': 'draw 1.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}
