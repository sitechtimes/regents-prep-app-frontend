import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe } from "vitest";
import { expect, test } from "vitest";
import Dashboard from "~/pages/teacher/dashboard.vue";

const page = await mountSuspended(Dashboard);

describe("Teacher Dashboard Page", () => {
  test("should be visible", () => {
    expect(page.exists()).toBe(true);
    expect(page.isVisible()).toBe(true);
  });
});
