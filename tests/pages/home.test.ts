import { mountSuspended } from "@nuxt/test-utils/runtime";
import { afterEach, beforeEach, describe } from "vitest";
import { expect, test } from "vitest";
import Index from "~/pages/index.vue";

describe("Home Page", { retry: 1 }, () => {
  let originalInnerHeight: number;

  beforeEach(() => {
    originalInnerHeight = window.innerHeight;

    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1920
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: originalInnerHeight
    });
  });

  test("should be visible", async () => {
    const page = await mountSuspended(Index);
    expect(page.exists()).toBe(true);
  });
});
