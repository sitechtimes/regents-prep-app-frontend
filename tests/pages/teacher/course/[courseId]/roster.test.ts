import { mountSuspended } from "@nuxt/test-utils/runtime";
import { flushPromises } from "@vue/test-utils";
import { vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, test, expect } from "vitest";
import { ref } from "vue";
import Page from "~/pages/teacher/course/[courseCode]/roster.vue";

describe("Teacher Roster Page", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("should be visible", async () => {
    const page = await mountSuspended(Page);
    expect(page.exists()).toBe(true);
  });
});
