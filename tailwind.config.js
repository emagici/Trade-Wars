/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        SuisseIntl: ["Suisse Intl", "sans-serif"],
        Sanomat: ["Sanomat", "sans-serif"],
        Zen: ["Zen Dots", "sans-serif"],
      },
      colors: {
        yellow: "rgba(163, 137, 83, 1)",
        footerYellow: "rgba(185, 161, 138, 1)",
        secondary: "#1E1E1E",
        gray: "#C7C7C7",
        light: "#FAFAF9",
        red: "#FF255A",
        green: "#34D399",
        header: "rgba(34, 44, 46, 1)",
        btn: "rgba(186, 166, 126, 1)",
        grad1: "rgba(220, 208, 197, 0)",
        grad2: "#C78A53",
        grad3: "rgba(220, 208, 197, 0) ",
      },
      fontSize: {
        "1.5xl": "22px",
        "2.5xl": "32px",
        "3.5xl": "40px",
      },
      spacing: {
        3.5: "14px",
        4.5: "18px",
        5.5: "22px",
        7.5: "30px",
        12.5: "50px",
        15: "60px",
        25: "100px",
      },
      gap: {
        15: "60px",
      },
      opacity: {
        45: ".45",
        20: ".20",
      },
      boxShadow: {
        sm: "inset 0px 4px 70px 30px rgba(0, 0, 0, 0.7)",
      },
      dropShadow: {
        sm: "0px 0px 5px rgba(255, 255, 255, 0.6)",
      },
      borderWidth: {
        1: "1px",
      },
      letterSpacing: {
        wide: ".07em",
      },
      backgroundImage: {
        trader: 'url("/assets/images/trade.png")',
      },
      dropShadow: {
        title: "44 0px 0px #329BFF",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
  },
};