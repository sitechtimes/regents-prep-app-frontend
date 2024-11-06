import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe } from "vitest";
import { expect, test } from "vitest";
import Course from "~/pages/teacher/course/[courseCode]/index.vue";

const page = await mountSuspended(Course);

describe("Teacher Course Info Page", () => {
  test("should be visible", () => {
    expect(page.exists()).toBe(true);
    expect(page.isVisible()).toBe(true);
  });
});
