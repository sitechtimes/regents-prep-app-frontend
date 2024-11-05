import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, vi } from "vitest";
import { describe } from "vitest";
import { expect, test } from "vitest";
import App from "~/app.vue";

// Mock useRuntimeConfig
vi.mock("#app", () => ({
  useRuntimeConfig: () => ({
    public: {
      backendUrl: "https://example.com" // provide a mock URL for testing
    }
  })
}));

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
