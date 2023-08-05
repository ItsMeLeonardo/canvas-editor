/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#2e2e38",
      },
      backgroundColor: {
        primary: "#7e3ffc",
        secondary: "#171721",
      },
      textColor: {
        secondary: "#adabba",
        primary: "#ffffff",
      },
      height: {
        navbar: "3.5rem",
        content: "calc(100vh - 3.5rem)",
      },
    },
  },
  plugins: [],
};
