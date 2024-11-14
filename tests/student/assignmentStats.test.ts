import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe } from "vitest";
import { expect, test } from "vitest";
import Stats from "~/pages/student/course/[courseCode]/[assignmentId]/stats.vue";

describe("Student Assignment Stats Page", () => {
  test("should be visible", async () => {
    const page = await mountSuspended(Stats);
    expect(page.exists()).toBe(true);
  });
});
