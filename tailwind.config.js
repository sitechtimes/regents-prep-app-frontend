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
    extend: {
      boxShadow: {
        lg: "0px 10px 21px 0px rgba(0,0,0,0.49)",
        md: "0px 1px 20px 3px rgba(0,0,0,0.49) inset",
      },
      colors: {
        'navbar': '#ffff',
      }
    },

  },
  plugins: [],
};

module.exports = {
  mode: "jit",
  content: ["./constants/*.ts"],
  theme: {
    boxShadow: {
      innertop: "inset 2px 1px 10px -4px  rgba(0, 0, 0, 0.06)",
      innerleft: "inset 4px 0px 8px -5px  rgba(0, 0, 0, 0.06)",
      innerbottom: "inset 0px -5px 8px -5px  rgba(0, 0, 0, 0.06)",
      innerhover: "inset -3px -2.5px 2.5px -4px  rgba(0, 0, 0, 0.06)",
    },
  },
};
