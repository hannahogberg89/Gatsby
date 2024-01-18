/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      backgroundColor: {
        '97807d': '#97807d', // Lägg till din anpassade färg här
      },
    },
  },
  plugins: [],
}
