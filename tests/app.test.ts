import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, vi } from "vitest";
import { describe } from "vitest";
import { expect, test } from "vitest";
import App from "~/app.vue";
import * as dotenv from "dotenv";

// Load the .env.test file
dotenv.config({ path: ".env.test" });

mockNuxtImport("useRuntimeConfig", () => {
  return () => {
    return { public: { backend: process.env.NUXT_PUBLIC_BACKEND } };
  };
});

describe("Main App", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("should be visible", async () => {
    const page = await mountSuspended(App);
    expect(page.exists()).toBe(true);
    expect(page.isVisible()).toBe(true);
  });
});
