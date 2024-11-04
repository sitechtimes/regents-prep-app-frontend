import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe } from "vitest";
import { expect, test } from "vitest";
import Assignment from "~/pages/teacher/course/[courseCode]/[assignmentId].vue";

const page = await mountSuspended(Assignment);

describe("Teacher Assignment Info Page", () => {
  test("should be visible", () => {
    expect(page.exists()).toBe(true);
    expect(page.isVisible()).toBe(true);
  });
});
