/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary": "#fffffe",
      "secondary": "#d1d1e9",
      "danger": "#e45858",
      "info": "#6246ea",
      "header": "#2b2c34"
      },
      fontFamily:{
        'poppins': 'Poppins'
      }
    },
  },
  plugins: [],
}

