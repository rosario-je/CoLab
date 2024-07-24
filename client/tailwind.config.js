/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "navbar-color": "#19191F",
      },
      keyframes: {
        swing: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(15deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '75%': { transform: 'rotate(-15deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        bounceIn: {
          '0%': { transform: 'translateY(-75%)' },
          '20%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-50%)' },
          '60%': { transform: 'translateY(0)' },
          '80%': { transform: 'translateY(-25%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        swing: 'swing 0.2s',
        bounceIn: 'bounceIn 0.65s ease-out',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
