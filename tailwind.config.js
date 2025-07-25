/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7f7',
          100: '#fdeaea',
          200: '#fcd9da',
          300: '#f9bdc0',
          400: '#f4949a',
          500: '#ec6b75',
          600: '#d9495a',
          700: '#b7394a',
          800: '#983344',
          900: '#7f2f41',
          950: '#45161f',
        },
        romantic: {
          pink: '#ff69b4',
          rose: '#ff1493',
          lavender: '#e6e6fa',
          blush: '#ffc0cb'
        }
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 3s ease-in-out infinite',
        'heart-beat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' }
        }
      }
    },
  },
  plugins: [],
}
