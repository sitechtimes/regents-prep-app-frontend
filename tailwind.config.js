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
    boxShadow: {
      innervariant: 'inset 0 10px 15px 0 rgba(0, 0, 0, 0.75)',
    },

  },
  plugins: [],
}

