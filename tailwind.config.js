import daisyUi from "daisyui";
import flyonUi from "flyonui";

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
        "gray-accent": "#E5E5E5",
        "dark-hover": "#292929",
        "dark-border": "#3D444D",
        body: "var(--bg-color)"
      },
      width: {
        100: "25rem",
        115: "28.75rem",
        125: "31.25rem",
        150: "37.5rem",
        175: "43.75rem",
        200: "50rem"
      },
      height: {
        100: "25rem",
        115: "28.75rem",
        125: "31.25rem",
        150: "37.5rem",
        175: "43.75rem",
        200: "50rem"
      }
    }
  },
  plugins: [daisyUi, flyonUi],
  daisyui: { prefix: "du-", logs: false },
  flyonui: { prefix: "fo-", logs: false },
  darkMode: "selector",
  future: { hoverOnlyWhenSupported: true } // mobile support for hover until tailwind v4 is out and this is default behavior
};
