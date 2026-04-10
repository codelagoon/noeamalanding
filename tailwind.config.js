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
        // ─── Foundation ────────────────────────────────────────────────
        page:    '#06070A',
        section: '#0A0D12',
        card:    '#0F131A',
        raised:  '#131926',
        border:  '#1E2635',
        // ─── Text ──────────────────────────────────────────────────────
        primary:   '#F5F7FA',
        secondary: '#A7B0C0',
        muted:     '#6E788A',
        // ─── Accents ───────────────────────────────────────────────────
        accent:  '#6EA8FE',   // blue — brand / UI
        teal:    '#5FD1C4',   // teal — data / analytics
        gold:    '#F2C14E',   // gold — selective emphasis
        danger:  '#FF5C6C',   // red  — failures / breaches
        // ─── Semantic aliases ──────────────────────────────────────────
        pass:    '#5FD1C4',   // teal = pass / neutral good
        deny:    '#FF5C6C',   // red  = deny / critical
        refer:   '#F2C14E',   // gold = refer / uncertain
        // ─── Legacy aliases (keep for dashboard files) ─────────────────
        bg:             '#06070A',
        surface:        '#0F131A',
        'text-primary': '#F5F7FA',
        'text-secondary':'#A7B0C0',
        // Navy (referenced by dashboard components still)
        navy: {
          950: '#03040A',
          900: '#06070A',
          850: '#0A0D12',
          800: '#0F131A',
          750: '#131926',
          700: '#1E2635',
          600: '#263040',
          500: '#2E3A50',
          400: '#3A4A60',
        },
        // Indigo remapped to blue accent
        indigo: {
          950: '#05091E',
          900: '#0A1232',
          800: '#1428A0',
          700: '#1D3FC0',
          600: '#2B58D8',
          500: '#6EA8FE',
          400: '#8BBEFF',
          300: '#A8CEFF',
          200: '#C5DDFF',
          100: '#E2EEFF',
        },
        // Emerald (used by dashboard)
        emerald: {
          950: '#01130C',
          900: '#022C1A',
          800: '#055A36',
          700: '#078A52',
          600: '#0AB068',
          500: '#5FD1C4',
          400: '#7FDBD5',
          300: '#9FE4E0',
          200: '#BFEDEA',
          100: '#DFF6F5',
        },
        // Crimson (used by dashboard for breaches)
        crimson: {
          950: '#1A0205',
          900: '#380410',
          800: '#6B0820',
          700: '#9E0C30',
          600: '#CC1040',
          500: '#FF5C6C',
          400: '#FF7D8A',
          300: '#FF9EA7',
          200: '#FFBFC4',
          100: '#FFE0E2',
        },
        // Amber (used by dashboard)
        amber: {
          950: '#1A1000',
          900: '#3D2500',
          800: '#7A4A00',
          700: '#A86700',
          600: '#CC8500',
          500: '#F2C14E',
          400: '#F5CE74',
          300: '#F8DB9A',
          200: '#FAE7BF',
          100: '#FDF3DF',
        },
        // Slate (kept for charts)
        slate: {
          950: '#020617',
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F1F5F9',
          50:  '#F8FAFC',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono:  ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans:  ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        stat:          ['40px', { lineHeight: '1' }],
        hero:          ['64px', { lineHeight: '1.08' }],
        'hero-mobile': ['36px', { lineHeight: '1.15' }],
        h2:            ['44px', { lineHeight: '1.18' }],
        'h2-mobile':   ['30px', { lineHeight: '1.22' }],
        eyebrow:       ['11px', { lineHeight: '1.4', letterSpacing: '0.12em' }],
      },
      maxWidth:     { prose: '640px' },
      borderRadius: { button: '6px' },
      keyframes: {
        'fade-up':  { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in':  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        marquee:    { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
        'marquee-vertical': { '0%': { transform: 'translateY(0%)' }, '100%': { transform: 'translateY(-50%)' } },
      },
      animation: {
        'fade-up':          'fade-up 0.5s ease-out forwards',
        'fade-in':          'fade-in 0.4s ease-out forwards',
        marquee:            'marquee var(--duration,35s) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration,35s) linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
