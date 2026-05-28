/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'isl-green':       '#0d4a2e',
        'isl-green-light': '#2d6a4f',
        'isl-gold':        '#c9a227',
        'isl-gold-light':  '#e0b733',
        'isl-cream':       '#fdf8f0',
        'isl-dark':        '#162233',
        'isl-dark-2':      '#1e2d1f',
        'isl-sand':        '#f5f0e8',
        'isl-beige':       '#faf5eb',
        'isl-stone':       '#e8e0d0',
        'isl-gold-dark':   '#a07810',
        'isl-green-dark':  '#0a3a22',
        'isl-green-50':    '#f0f7f3',
      },
      fontFamily: {
        arabic: ["'Scheherazade New'", "'Amiri'", 'serif'],
        body:   ["'Jost'", "'Open Sans'", 'sans-serif'],
      },
      animation: {
        'fade-in':  'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
