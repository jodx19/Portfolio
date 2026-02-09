/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Map Tailwind classes to CSS variables
        bg: {
          0: 'var(--color-bg-0)',
          1: 'var(--color-bg-1)',
        },
        txt: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
        },
        accent: 'var(--color-accent-primary)',
        'accent-secondary': 'var(--color-accent-secondary)',
        surface: {
          0: 'var(--color-surface-0)',
          1: 'var(--color-surface-1)',
        },
        brd: {
          light: 'var(--color-border-light)',
          medium: 'var(--color-border-medium)',
        },
        // Cyberpunk specific colors
        cyber: {
          cyan: '#22d3ee',
          blue: '#2563eb',
          dark: '#0a0f1a',
          darker: '#050810',
        }
      },
      boxShadow: {
        'soft': 'var(--shadow-soft)',
        'card-hover': 'var(--shadow-card-hover)',
        'lightning': '0 0 10px #22d3ee, 0 0 40px #22d3ee77, 0 0 80px rgba(6, 182, 212, 0.2)',
        'lightning-intense': '0 0 20px #22d3ee, 0 0 60px #22d3ee99, 0 0 100px rgba(6, 182, 212, 0.4)',
        'glow': '0 4px 20px rgba(34, 211, 238, 0.3)',
        'glow-lg': '0 8px 40px rgba(34, 211, 238, 0.4)',
      },
      backgroundSize: {
        '300%': '300% 100%',
        '200%': '200% 100%',
      },
      animation: {
        'gradient': 'gradient-shift 3s ease-in-out infinite',
        'gradient-slow': 'gradient-shift 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', boxShadow: '0 0 10px #22d3ee' },
          '50%': { opacity: '0.8', boxShadow: '0 0 30px #22d3ee, 0 0 60px rgba(34, 211, 238, 0.4)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tighter': '-0.04em',
      },
    },
  },
  plugins: [],
}