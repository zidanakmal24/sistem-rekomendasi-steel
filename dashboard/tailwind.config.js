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
        industrial: {
          50: '#f6f7f9',
          100: '#ebedf3',
          200: '#d3d7e5',
          300: '#adb6d1',
          400: '#8190b8',
          500: '#5f70a1',
          600: '#4a5785',
          700: '#3d476b',
          800: '#343c59',
          900: '#2e344b',
          950: '#1e2132',
        },
        accent: {
          primary: '#0ea5e9',
          secondary: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
