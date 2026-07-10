/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#111b21',
          secondary: '#202c33',
          tertiary: '#2a3942',
          highlight: '#00a884',
          text: '#e9edef',
          muted: '#8696a0'
        }
      }
    },
  },
  plugins: [],
}