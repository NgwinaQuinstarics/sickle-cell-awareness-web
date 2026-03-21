/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Sora"', 'system-ui', 'sans-serif'],
      },
      colors: {
        red: {
          50: '#fff1f0', 100: '#ffe0dc', 200: '#ffc4bc',
          300: '#ff9b8d', 400: '#ff6554', 500: '#f53d28',
          600: '#e22410', 700: '#be1a0b', 800: '#9d1a0f',
          900: '#821c12', 950: '#470a06',
        },
        green: {
          50: '#f0fdf4', 500: '#22c55e', 600: '#16a34a',
          700: '#15803d', 800: '#166534',
        },
      },
      animation: {
        'in-up': 'inUp 0.5s ease both',
        'in':    'fadeIn 0.4s ease both',
      },
      keyframes: {
        inUp:   { from: { opacity: 0, transform: 'translateY(18px)' }, to: { opacity: 1, transform: 'none' } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
      },
    },
  },
  plugins: [],
}
