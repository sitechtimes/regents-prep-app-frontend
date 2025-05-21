// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["assets/main.css"],
  modules: ["@pinia/nuxt", "@nuxt/test-utils/module"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  runtimeConfig: {
    public: {
      backend: ""
    }
  },
  app: {
    head: {
      title: "SITHS Regents Prep",
      meta: [
        { charset: "UTF-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { name: "mobile-web-app-capable", content: "yes" },
        { property: "og:title", content: "SITHS Regents Prep" },
        { property: "og:site_name", content: "Staten Island Technical HS" },
        { property: "og:type", content: "website" },
        { name: "description", content: "Don't fail your regents! If you do... don't blame us. Built by SITHS, for SITHS." },
        { property: "og:description", content: "Don't fail your regents! If you do... don't blame us. Built by SITHS, for SITHS." }
      ],
      link: [{ rel: "icon", type: "image/png", href: "/seagull.png" }],
      htmlAttrs: {
        lang: "en"
      }
    }
  }
});
