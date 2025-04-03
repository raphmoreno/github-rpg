/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        rpg: {
          primary: '#4A2C8F', // Deep purple
          secondary: '#8F6FC5', // Lighter purple
          accent: '#FFCC00', // Gold
          dark: '#1E1E3F', // Dark blue
          light: '#C4B7E0', // Light lavender
        },
      },
      boxShadow: {
        'pixel': '4px 4px 0px 0px rgba(0,0,0,0.75)',
      }
    },
  },
  plugins: [],
}; 