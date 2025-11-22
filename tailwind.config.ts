import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',  // Explicit class-based dark mode
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f0fdfa',
          500: '#0d9488',
          600: '#0f766e',
          700: '#065f46',
        },
        slate: {
          50: '#f8fafc',
          900: '#0f172a',
        },
      },
      animation: {
        'holo': 'holo 2s infinite',
      },
      keyframes: {
        holo: {
          '0%, 100%': { backgroundPosition: '200% 0' },
          '50%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config