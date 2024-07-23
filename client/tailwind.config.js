/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "navbar-color": "#19191F",
        
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}