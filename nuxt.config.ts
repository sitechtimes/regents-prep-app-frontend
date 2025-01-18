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
  devServer: {
    host: "localhost",
    port: 3000
  },
  app: {
    head: {
      title: "Unregents Prep",
      meta: [
        { charset: "UTF-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        {
          hid: "description",
          name: "description",
          content: "We will unregents your prep"
        }
      ],
      link: [{ rel: "icon", type: "image/vnd.microsoft.icon", href: "/favicon.ico" }],
      htmlAttrs: {
        lang: "en"
      }
    }
  }
});
