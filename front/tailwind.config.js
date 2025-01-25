/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        babypink: '#EDDADA',
        darkpink: '#CB8587',
        darkgray: '#323232',
        buttonColor: '#CB8587', // Single definition for buttonColor
        headerBg: '#8E8B63',
        bord_login: '#66666659',
        button_hover: '#CB8587', // Single definition for button_hover
        SecondaryColor: '#EDDADA',
        buttongreen:"#14B8A6",
        white: '#FFFFFF',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
