/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        surface: '#141414',
        border: '#2A2A2A',
        'text-primary': '#F5F5F5',
        'text-secondary': '#A0A0A0',
        'accent-gold': '#E8D5A3',
        'accent-teal': '#4A7C6F',
        'accent-teal-light': '#5A9C8A',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'serif'],
        mono: ['var(--font-mono)', 'DM Mono', 'monospace'],
        sans: ['var(--font-sans)', 'DM Sans', 'sans-serif'],
      },
      fontSize: {
        stat:         ['40px', { lineHeight: '1' }],
        hero:         ['68px', { lineHeight: '1.1' }],
        'hero-mobile':['36px', { lineHeight: '1.15' }],
        h2:           ['48px', { lineHeight: '1.15' }],
        'h2-mobile':  ['32px', { lineHeight: '1.2' }],
        eyebrow:      ['11px', { lineHeight: '1.4', letterSpacing: '0.15em' }],
      },
      maxWidth: { prose: '640px' },
      borderRadius: { button: '4px' },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-vertical': {
          '0%':   { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        shimmer: {
          '0%, 90%, 100%': { 'background-position': 'calc(-100% - var(--shimmer-width)) 0' },
          '30%, 60%':      { 'background-position': 'calc(100% + var(--shimmer-width)) 0' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
        'border-beam': {
          '100%': { 'offset-distance': '100%' },
        },
        grid: {
          '0%':   { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' },
        },
        meteor: {
          '0%':   { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%':  { opacity: '1' },
          '100%': { transform: 'rotate(215deg) translateX(-500px)', opacity: '0' },
        },
      },
      animation: {
        marquee:          'marquee var(--duration,30s) linear infinite',
        'marquee-vertical':'marquee-vertical var(--duration,30s) linear infinite',
        shimmer:          'shimmer 8s infinite',
        'fade-up':        'fade-up 0.5s ease-out forwards',
        pulse2:           'pulse2 2s ease-in-out infinite',
        'border-beam':    'border-beam calc(var(--duration)*1s) infinite linear',
        grid:             'grid 15s linear infinite',
        meteor:           'meteor var(--duration,5s) ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
