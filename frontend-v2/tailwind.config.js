/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        elevated: 'var(--elevated)',
        border: 'var(--border)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        brand: 'var(--brand)',
        'brand-strong': 'var(--brand-strong)',
        'brand-soft': 'var(--brand-soft)',
        'brand-contrast': 'var(--brand-contrast)',
      },
      fontFamily: {
        sans: [
          '"Inter"',
          '"IBM Plex Sans Arabic"',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
