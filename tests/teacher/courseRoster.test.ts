import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe } from "vitest";
import { expect, test } from "vitest";
import Roster from "~/pages/teacher/course/[courseCode]/roster.vue";

describe("Teacher Course Roster Page", () => {
  test("should be visible", async () => {
    const page = await mountSuspended(Roster);
    expect(page.exists()).toBe(true);
  });
});
