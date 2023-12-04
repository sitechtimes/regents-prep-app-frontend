/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        innervar: "inset 3px 2.5px 8px -4px rgba(0, 0, 0, 0.06)",
        innerhover: "inset -3px -2.5px 8px -4px rgba(0, 0, 0, 0.06)",
      },
    },
  },
};
