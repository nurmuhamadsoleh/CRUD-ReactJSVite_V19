/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          900: "#172033",
          700: "#374151",
          500: "#687083",
        },
        lagoon: {
          500: "#0f8b8d",
          600: "#0a7375",
        },
        coral: {
          500: "#f26a4b",
        },
      },
      boxShadow: {
        soft: "0 20px 60px rgba(23, 32, 51, 0.08)",
      },
    },
  },
  plugins: [],
};
