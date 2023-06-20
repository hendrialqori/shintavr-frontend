/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#18191a',
        dark2: '#252329'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
  darkMode: ["class", '[data-mode="dark"]']
}

