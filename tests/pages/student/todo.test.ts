import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, vi } from "vitest";
import { expect, test } from "vitest";
import Page from "~/pages/student/todo.vue";

describe("Student Todo Page", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("should be visible", async () => {
    const page = await mountSuspended(Page);
    expect(page.exists()).toBe(true);
  });

  test("should be loaded", async () => {
    const page = await mountSuspended(Page);
    const courses = ref(page.vm.courses);
    courses.value = [];

    const loaded = ref(page.vm.loaded);
    await vi.waitUntil(() => loaded.value, { timeout: 500, interval: 10 });
    expect(loaded.value).toBe(true);
  });
});
