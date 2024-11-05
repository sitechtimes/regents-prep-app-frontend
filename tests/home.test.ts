import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe } from "vitest";
import { expect, test } from "vitest";
import Index from "~/pages/index.vue";

describe("Home Page", () => {
  test("should be visible", async () => {
    const page = await mountSuspended(Index);
    expect(page.exists()).toBe(true);
    expect(page.isVisible()).toBe(true);
  });

  test("should have yoda set to false by default", async () => {
    const page = await mountSuspended(Index);
    const isYoda = ref(page.vm.isYoda);
    expect(isYoda.value).toBe(false);
  });

  test("should set yoda to true after more than the minimum number of clicks", async () => {
    const page = await mountSuspended(Index);
    const isYoda = ref(page.vm.isYoda);
    const clicks = ref(page.vm.clicks);

    while (!isYoda.value) {
      page.vm.toggle();
    }

    expect(isYoda.value).toBe(true);
    expect(clicks.value).toBeGreaterThanOrEqual(page.vm.startingCount);
  });
});
