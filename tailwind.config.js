/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Noema Design System ─────────────────────────────────────────
      colors: {
        // Foundation — Deep Navy
        navy: {
          950: '#050810',
          900: '#080D1A',
          850: '#0C1220',
          800: '#101828',
          750: '#141E30',
          700: '#192438',
          600: '#1F2E48',
          500: '#253858',
          400: '#2E4A70',
        },
        // Semantic: Pass / Repaid / Better
        emerald: {
          950: '#022c1a',
          900: '#044028',
          800: '#065f38',
          700: '#057a48',
          600: '#059669',
          500: '#10b981',
          400: '#34d399',
          300: '#6ee7b7',
          200: '#a7f3d0',
          100: '#d1fae5',
        },
        // Semantic: Deny / Did-not-repay / Breach
        crimson: {
          950: '#1a0308',
          900: '#3b0610',
          800: '#641220',
          700: '#9b1c31',
          600: '#c41e3a',
          500: '#dc2626',
          400: '#ef4444',
          300: '#f87171',
          200: '#fca5a5',
          100: '#fee2e2',
        },
        // Semantic: Refer / Uncertain range (AI score 34–66)
        amber: {
          950: '#1a0f00',
          900: '#451a03',
          800: '#78350f',
          700: '#92400e',
          600: '#d97706',
          500: '#f59e0b',
          400: '#fbbf24',
          300: '#fcd34d',
          200: '#fde68a',
          100: '#fef3c7',
        },
        // Accent: Action / LLM / SMPC / Intelligence
        indigo: {
          950: '#0d0a2e',
          900: '#1e1b4b',
          800: '#312e81',
          700: '#3730a3',
          600: '#4338ca',
          500: '#6366f1',
          400: '#818cf8',
          300: '#a5b4fc',
          200: '#c7d2fe',
          100: '#e0e7ff',
        },
        // Surface / interface
        slate: {
          950: '#020617',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
          50:  '#f8fafc',
        },
        // Legacy aliases (keep for existing JSX that references these names)
        bg:              '#080D1A',
        surface:         '#0C1220',
        border:          '#1F2E48',
        'text-primary':  '#E8EDF5',
        'text-secondary':'#7A90A8',
        'accent-gold':   '#F59E0B',     // now → amber-500
        'accent-teal':   '#6366F1',     // remapped → indigo-500
        'accent-teal-light': '#818CF8', // remapped → indigo-400
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'serif'],
        mono:  ['var(--font-mono)', 'DM Mono', 'monospace'],
        sans:  ['var(--font-sans)', 'DM Sans', 'sans-serif'],
      },
      fontSize: {
        stat:          ['40px', { lineHeight: '1' }],
        hero:          ['68px', { lineHeight: '1.1' }],
        'hero-mobile': ['36px', { lineHeight: '1.15' }],
        h2:            ['48px', { lineHeight: '1.15' }],
        'h2-mobile':   ['32px', { lineHeight: '1.2' }],
        eyebrow:       ['11px', { lineHeight: '1.4', letterSpacing: '0.15em' }],
      },
      maxWidth:     { prose: '640px' },
      borderRadius: { button: '4px' },
      // ─── Animation keyframes ──────────────────────────────────────────
      keyframes: {
        marquee:          { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
        'marquee-vertical':{ '0%': { transform: 'translateY(0%)' }, '100%': { transform: 'translateY(-50%)' } },
        shimmer: {
          '0%, 90%, 100%': { 'background-position': 'calc(-100% - var(--shimmer-width)) 0' },
          '30%, 60%':      { 'background-position': 'calc(100% + var(--shimmer-width)) 0' },
        },
        'fade-up':   { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        pulse2:      { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
        'border-beam':{ '100%': { 'offset-distance': '100%' } },
        grid:        { '0%': { transform: 'translateY(-50%)' }, '100%': { transform: 'translateY(0)' } },
        meteor:      { '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' }, '70%': { opacity: '1' }, '100%': { transform: 'rotate(215deg) translateX(-500px)', opacity: '0' } },
      },
      animation: {
        marquee:           'marquee var(--duration,30s) linear infinite',
        'marquee-vertical':'marquee-vertical var(--duration,30s) linear infinite',
        shimmer:           'shimmer 8s infinite',
        'fade-up':         'fade-up 0.5s ease-out forwards',
        pulse2:            'pulse2 2s ease-in-out infinite',
        'border-beam':     'border-beam calc(var(--duration)*1s) infinite linear',
        grid:              'grid 15s linear infinite',
        meteor:            'meteor var(--duration,5s) ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
