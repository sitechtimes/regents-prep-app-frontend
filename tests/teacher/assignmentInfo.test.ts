import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe } from "vitest";
import { expect, test } from "vitest";
import Assignment from "~/pages/teacher/course/[courseCode]/[assignmentId].vue";

describe("Teacher Assignment Info Page", () => {
  test("should be visible", async () => {
    const page = await mountSuspended(Assignment);
    expect(page.exists()).toBe(true);
  });
});
