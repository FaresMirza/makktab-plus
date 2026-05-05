/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface: '#111111',
        elevated: '#171717',
        border: '#262626',
        muted: '#a3a3a3',
        accent: '#fafafa',
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
      boxShadow: {
        soft: '0 1px 2px 0 rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
      },
    },
  },
  plugins: [],
}
