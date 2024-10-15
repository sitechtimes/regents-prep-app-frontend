/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app.vue", "./pages/**/*.{vue,js,ts,jsx,tsx}", "./components/**/*.{vue,js,ts,jsx,tsx}", "./layouts/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          light: "#FAF9E5",
          reg: "#f1f0d6",
          dark: "#F2F0CC",
          navbar: "#EAE9CA"
        },
        "green-accent": "var(--primary)",
        secondary: "#426B1F",
        tertiary: "#4E684A",
        "gray-accent": "var(--gray)"
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    prefix: "du-"
  },
  darkMode: "selector",
  future: {
    // mobile support for hover until tailwind v4 is out and this is default behavior
    hoverOnlyWhenSupported: true
  }
};
