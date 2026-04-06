/** @type {import('tailwindcss').Config} */
export default {
  // This tells Tailwind which files to scan for class names
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode: 'class' means dark mode is toggled by adding a 'dark' class to <html>
  darkMode: 'class',
  theme: {
    extend: {
      // Custom colors for our brand
      colors: {
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#1e293b',
        }
      },
      // Custom font
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Subtle shadow for cards
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
      // Smooth animation
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}