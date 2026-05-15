/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class',
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
      },
      fontFamily: {
        arabic: ["'Scheherazade New'", "'Amiri'", 'serif'],
        body:   ["'Jost'", "'Open Sans'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
