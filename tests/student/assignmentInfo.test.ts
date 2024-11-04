import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe } from "vitest";
import { expect, test } from "vitest";
import Assignments from "~/pages/student/course/[courseCode]/[assignmentId]/index.vue";

const page = await mountSuspended(Assignments);

describe("Student Assignment Info Page", () => {
  test("should be visible", () => {
    expect(page.exists()).toBe(true);
    expect(page.isVisible()).toBe(true);
  });
});
