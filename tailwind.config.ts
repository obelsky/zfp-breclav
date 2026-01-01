import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'zfp-orange': '#CF5400',
        'zfp-orange-hover': '#E07E3C',
        'zfp-dark': '#1a1a1a',
        'zfp-darker': '#0a0a0a',
        'zfp-text': '#333333',
        'zfp-light': '#F7F7F7',
        'zfp-gold': '#C9A961',
        'zfp-bronze': '#A67C52',
      },
      fontFamily: {
        'bree': ['Bree', 'sans-serif'],
        'verdena': ['Verdena Pro', 'sans-serif'],
        'verdena-light': ['Verdena Pro Light', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
