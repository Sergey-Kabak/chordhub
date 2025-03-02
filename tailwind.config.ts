// tailwind.config.js
const {heroui} = require("@heroui/react");
import defaultTheme from "tailwindcss/defaultTheme";
const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {}
  },
  plugins: [heroui({
    layout: {
      // disabledOpacity: "0.3", // opacity-[0.3]
      // radius: {
      //   small: "2px", // rounded-small
      //   medium: "4px", // rounded-medium
      //   large: "6px", // rounded-large
      // },
      borderWidth: {
        small: "1px", // border-small
        medium: "1px", // border-medium
        large: "2px", // border-large
      },
    },
  })],
};