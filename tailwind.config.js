/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      pattaya: ["Pattaya", "sans-serif"],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#E5E5E5",
          "base-100": "#ffffff",
        },
      },
      {
        dark: {
          primary: "#141414",
          "base-100": "#232323",
        },
      },
    ],
  },
};
