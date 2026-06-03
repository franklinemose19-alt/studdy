import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          blue: '#4F8EF7',
          amber: '#F59E0B',
          green: '#10B981',
          danger: '#EF4444',
        },
        surface: {
          base: '#080C18',
          card: '#0E1425',
          elevated: '#141C30',
        },
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(2deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(79,142,247,0.3), 0 0 40px rgba(79,142,247,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(79,142,247,0.6), 0 0 80px rgba(79,142,247,0.2)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
