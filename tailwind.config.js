const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      "btn-primary": "#5C0FB7",
      "inp-pink": "#FFEFF8",
    },
  },
  plugins: [],
};
