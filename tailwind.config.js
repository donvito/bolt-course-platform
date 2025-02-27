/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0f172a',
          card: 'rgba(17, 25, 40, 0.75)',
          border: 'rgba(255, 255, 255, 0.125)'
        },
        accent: {
          primary: '#8b5cf6',
          secondary: '#ec4899'
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};