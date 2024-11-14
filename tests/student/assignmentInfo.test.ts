import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe } from "vitest";
import { expect, test } from "vitest";
import Assignments from "~/pages/student/course/[courseCode]/[assignmentId]/index.vue";

describe("Student Assignment Info Page", () => {
  test("should be visible", async () => {
    const page = await mountSuspended(Assignments);
    expect(page.exists()).toBe(true);
  });
});
