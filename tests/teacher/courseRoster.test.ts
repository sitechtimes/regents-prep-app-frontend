import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe } from "vitest";
import { expect, test } from "vitest";
import Roster from "~/pages/teacher/course/[courseCode]/roster.vue";

const page = await mountSuspended(Roster);

describe("Teacher Course Roster Page", () => {
  test("should be visible", () => {
    expect(page.exists()).toBe(true);
    expect(page.isVisible()).toBe(true);
  });
});
