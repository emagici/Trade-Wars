/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        SuisseIntl: ["Suisse Intl", "sans-serif"],
        Sanomat: ["Sanomat", "sans-serif"],
        Zen: ["Zen Dots", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        win: "rgba(84, 64, 24, 1)",
        joined: "rgba(209, 196, 169, 1)",
        lose: "rgba(153, 167, 171, 1)",
        gap: "rgba(17, 22, 23, 1)",
        yellow: "rgba(163, 137, 83, 1)",
        titleYellow: "#BAA67E",
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
        step: "rgba(186, 166, 126, 1)",
        stepText: "rgba(119, 130, 140, 1)",
        stepTitle: " rgba(119, 138, 143, 1)",
        stepInActive: "rgba(68, 87, 92, 1)",
        tableHeader: "rgba(67, 55, 44, 1)",
        tableColor: "rgba(232, 225, 212, 1)",
        rogue: "rgba(28, 21, 8, 1)",
        balance: "rgba(207, 207, 207, 1)",
        id: "rgba(221, 226, 227, 1)",
        loseBal: "rgba(85, 109, 115, 1)",
        loseId: "rgba(51, 65, 69, 1)",
        btnText: "rgba(210, 213, 217, 1)",
        completed: "rgba(134, 110, 87, 1)",
        disable: "rgba(59,63,63,1)",
        alert: "rgba(202, 185, 167, 1)",
        alertIcon: "rgba(140, 107, 40, 1)",
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
        join: "0px 20px 28px rgba(0, 0, 0, 0.4)",
        title: [
          "0px 0px 44 rgba(50, 155, 255, 1)",
          "0px 2px 0 rgba(0, 0, 0, 0.2)",
        ],
        btn: "drop-shadow(0px 20px 28px rgba(0, 0, 0, 0.4))",
      },
      boxShadow: {
        title: [
          "0px 0px 44px 0px rgba(50, 155, 255, 1)",
          "0px 2px 0px 0px rgba(0, 0, 0, 0.2)",
        ],
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
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
  variants: {
    scrollbar: ["rounded"],
  },
};
