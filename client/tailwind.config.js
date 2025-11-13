/**** Tailwind CSS config for the client app ****/
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0D1117',
          light: '#F5F5F5',
        },
        text: {
          DEFAULT: '#C9D1D9',
          light: '#1A1A1A',
        },
        accent: {
          DEFAULT: '#2F81F7',
          light: '#0078D4',
        }
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        manrope: ['Manrope', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.12)'
      },
      transitionTimingFunction: {
        'ease-soft': 'cubic-bezier(0.19, 1, 0.22, 1)'
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
