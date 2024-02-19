/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "orange-100": "#ffc278",
      "orange-200": "#ff8807",
      "orange-300": "#ff981a",
      "orange-500": "#ed5107",
      "purple-500": "#311D35",
    },
    extend: {
      backgroundImage: {
        "bg-gradient": "radial-gradient(ellipse at 50% 75%, #7B315E, #311D35)",
        "orange-gradient": "linear-gradient(to right, #ff8807, #ff981a, #ed5107)",
      }
    },
  },
  plugins: [],
};
