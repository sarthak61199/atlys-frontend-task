/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        lines: "#0066FF4D",
        "line-end-circles": "#66A3FF",
      },
    },
  },
  plugins: [],
};
