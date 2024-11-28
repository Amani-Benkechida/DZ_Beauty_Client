/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        babypink:'#EDDADA',
        darkpink:'#CB8587',
        darkgray:'#323232',
        
      },
    },
  },
  plugins: [],
}

