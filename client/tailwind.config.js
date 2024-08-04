/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "text-color": "#F2F3F5",
        "navbar-color": "#1E1F22", // color for the nav bar and project cards
        "menu-colors": "#2B2D31",
        "website-purple": "#4144C8",
        "icon-purple": "#8A2BE2",
        "input-colors": "#202028",
        "projects-bar": "#191E24",
        "projects-bar-button": "#21262D",
        red: "#E73E41", // delete/reject buttons/hovers and error messages
        grey: "#3C3F45", // page body background color
        create: "#6a1b9a",
        wand: "#fbc02d",
        green: "#41A558", // accept buttons/hovers and success messages
        "racing-blue": "#5B8EE0",
        "royal-blue": "#4169E1",
        "royal-yellow": "#FFD700",
        "yellow-name": "#FFF9DB",
        "dark-green": "#007028", // alt darker hover for accept buttons
        "dark-red": "#A41000", // alt darker hover for delete/reject buttons
        "landing-gradient-two": "#8F9BD7",
        "landing-signin-button": "#322AA5",
        "landing-navbar-color": "#19191F",
        "black": "#000000",
        "white": "#ffffff",
        'landing-gradient-one': '#281E9F',
        'project-left-menu': '#171819', // side menu background color and search bar
        'project-background': '#3C3F45', // page body background color
      },
      dropShadow: {
        "white-glow": "0 0 1rem #ffffff",
        "yellow-glow": "0 0 1rem #FFF9DB",
      },
      keyframes: {
        swing: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(15deg)" },
          "50%": { transform: "rotate(0deg)" },
          "75%": { transform: "rotate(-15deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        bounceFast: {
          "0%": { transform: "translateY(-75%)" },
          "20%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-50%)" },
          "60%": { transform: "translateY(0)" },
          "80%": { transform: "translateY(-25%)" },
          "100%": { transform: "translateY(0)" },
        },
        bounceSlow: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-30%)" },
          "100%": { transform: "translateY(0)" },
        },
        sideToSide: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-30%)" },
          "100%": { transform: "translateX(0)" },
        },
        unstableBeaker: {
          "0%": { transform: "rotate(0deg) translateX(0)" },
          "25%": { transform: "rotate(25deg) translateX(-7px)" },
          "50%": { transform: "rotate(0deg) translateX(0)" },
          "75%": { transform: "rotate(-25deg) translateX(7px)" },
          "100%": { transform: "rotate(0deg) translateX(0)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        slideDown: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(0, 100%, 0)" },
        },
      },
      animation: {
        swing: "swing 0.2s",
        bounceFast: "bounceFast 0.65s ease-out",
        bounceSlow: "bounceSlow 1s ease-out infinite",
        sideToSide: "sideToSide 0.2s ease-out",
        unstableBeaker: "unstableBeaker 0.15s ease-in-out",
        spin: "spin 0.25s linear",
        slideDown: "slideDown 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("daisyui")],
};
