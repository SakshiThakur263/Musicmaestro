/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wom: {
          gold: "#f4a51c",
          goldHover: "#de9413",
          goldLight: "rgba(244, 165, 28, 0.12)",
          goldGlow: "rgba(244, 165, 28, 0.28)",
          dark: "#0b0e14",
          darkCard: "#131822",
          darkBorder: "#1f2633",
          surface: "#181f2c",
          subtle: "#94a3b8",
        },
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        sans: ["Open Sans", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'gold': '0 4px 20px -2px rgba(244, 165, 28, 0.35)',
        'gold-sm': '0 2px 10px rgba(244, 165, 28, 0.2)',
        'gold-lg': '0 10px 30px -4px rgba(244, 165, 28, 0.45)',
        'card': '0 10px 30px rgba(0, 0, 0, 0.08)',
        'card-dark': '0 10px 30px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}
