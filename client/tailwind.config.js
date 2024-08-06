/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "spot-dark": "#121212",
        "spot-green": "#1DB954",
        "spot-light": "#B3B3B3",
        "spot-dark2": "#212121",
        "spot-dark3": "#535353",
      },
    },
  },
  darkMode: "class", // Ensure dark mode is enabled and uses the class strategy
  plugins: [],
};
