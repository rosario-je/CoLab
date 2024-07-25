/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "text-color": "#DDF3F8",
        "navbar-color": "#19191F",
        "menu-colors": "#282B2D",
        "website-purple": "#422569",
        "icon-purple": "#8A2BE2",
        "input-colors": "#202028",
        black: "#000000",
        white: "#ffffff",
        create: "#6a1b9a",
        wand: "#fbc02d",
        "landing-gradient-one": "#281E9F",
        "landing-gradient-two": "#8F9BD7",
        "landing-signin-button": "#322AA5",
        "landing-navbar-color": "#19191F",
      },
      dropShadow: {
        "white-glow": "0 0 1rem #ffffff",
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
      },
      animation: {
        swing: "swing 0.2s",
        bounceFast: "bounceFast 0.65s ease-out",
        bounceSlow: "bounceSlow 1s ease-out infinite",
        sideToSide: "sideToSide 0.2s ease-out",
        unstableBeaker: "unstableBeaker 0.15s ease-in-out",
        spin: "spin 0.25s linear",
      },
    },
  },
  plugins: [require("daisyui")],
};
