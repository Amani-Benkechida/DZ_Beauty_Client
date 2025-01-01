/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        buttonColor: '#323232', // Replace with your desired hex color
        headerBg: '#8E8B63',
        bord_login: '#66666659',
        button_hover: '#CB8587',
        button_hover: "#CB8587"
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
}
}
