/* Tailwind v4 configuration with semantic color definitions and font extensions */
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{tsx,ts,jsx,js}'],
  theme: {
    extend: {
      colors: {
        background: colors.slate-50,
        foreground: '#111827', // slate-900
        surface: colors.white,
        text: colors.slate-900,
        secondary: colors.slate-600,
        border: colors.slate-200,
        primary: colors.indigo-600,
        primaryForeground: '#ffffff', // use white for foreground
        muted: colors.slate-100,
        mutedForeground: colors.slate-900,
        accent: colors.indigo-50,
        accentForeground: colors.indigo-900,
        destructive: colors.rose-600,
        destructiveForeground: 'white',
        ring: colors.indigo-600,
        card: colors.white,
        cardForeground: colors.slate-900,
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['Fira Code', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}