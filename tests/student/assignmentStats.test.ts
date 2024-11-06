import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe } from "vitest";
import { expect, test } from "vitest";
import Stats from "~/pages/student/course/[courseCode]/[assignmentId]/stats.vue";

const page = await mountSuspended(Stats);

describe("Student Assignment Stats Page", () => {
  test("should be visible", () => {
    expect(page.exists()).toBe(true);
    expect(page.isVisible()).toBe(true);
  });
});
