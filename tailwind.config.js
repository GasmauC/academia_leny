/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'leny-dark': '#1a1c29',
        'leny-light': '#f5f6fa',
        'leny-accent': '#cdae68', // Elegant gold
        'leny-secondary': '#8b7355',
        'leny-card': '#252837',
        'leny-hover': '#2f3346'
      },
      fontFamily: {
        title: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
