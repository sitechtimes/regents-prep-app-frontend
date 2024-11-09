import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, vi } from "vitest";
import { describe } from "vitest";
import { expect, test } from "vitest";
import App from "~/app.vue";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

mockNuxtImport("useRuntimeConfig", () => {
  return () => {
    return { public: { backend: process.env.NUXT_TEST_BACKEND } };
  };
});

describe("Main App", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("should be visible", async () => {
    const page = await mountSuspended(App);
    expect(page.exists()).toBe(true);
  });

  test("should be light mode if light mode in localstorage", async () => {
    localStorage.setItem("theme", "light");
    const page = await mountSuspended(App);

    const isDarkMode = ref(page.vm.isDarkMode);
    expect(isDarkMode.value).toBe(false);
    expect(document.body.classList.contains("dark")).toBe(false);
  });

  test("should put light mode in localstorage if theme switched to light mode", async () => {
    const page = await mountSuspended(App);
    const isDarkMode = ref(page.vm.isDarkMode);
    isDarkMode.value = false;

    expect(localStorage.getItem("theme")).toBe("light");
    expect(document.body.classList.contains("dark")).toBe(false);
  });

  test("should be dark mode if dark theme in localstorage", async () => {
    localStorage.setItem("theme", "dark");
    const page = await mountSuspended(App);

    const isDarkMode = ref(page.vm.isDarkMode);
    expect(isDarkMode.value).toBe(true);
    expect(document.body.classList.contains("dark")).toBe(true);
  });

  test("should put dark mode in localstorage if theme switched to dark mode", async () => {
    const page = await mountSuspended(App);
    const isDarkMode = ref(page.vm.isDarkMode);
    isDarkMode.value = true;

    expect(localStorage.getItem("theme")).toBe("dark");
    expect(document.body.classList.contains("dark")).toBe(true);
  });
});
