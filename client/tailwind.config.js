/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "orange-100": "#ffc278",
      "orange-200": "#ff8807",
      "orange-300": "#ff981a",
      "orange-500": "#ed5107",
      "purple-100": "#FFF0FF",
      "purple-200": "#C67CA9",
      "purple-300": "#9E5481",
      "purple-500": "#7B315E",
      "purple-600": "#4A2D48",
      "purple-700": "#311D35",
      overlay: "#00000026",
    },
    extend: {
      backgroundImage: {
        "bg-gradient":
          "radial-gradient(ellipse at 50% 90%, #7B315E, #4A2D48, #311D35)",
        "orange-gradient":
          "linear-gradient(to right, #ff8807, #ff981a, #ed5107)",
      },
    },
  },
  plugins: [],
};
