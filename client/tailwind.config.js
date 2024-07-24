/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'landing-gradient-one': '#281E9F',
        'landing-gradient-two': '#8F9BD7',
        'landing-signin-button': '#322AA5',
        'landing-navbar-color': '#19191F',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}