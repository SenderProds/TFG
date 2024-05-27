/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color1': '#21373f',
        'color2': '#33687B',
      },
      backgroundImage: {
        'imagen-incio': "url('/img/R.jpg')"
      },
      fontFamily: {
        'roboto': ["Roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
}

