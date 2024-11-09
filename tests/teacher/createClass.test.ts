import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe } from "vitest";
import { expect, test } from "vitest";
import Create from "~/pages/teacher/create-class.vue";

describe("Teacher Create Class Page", () => {
  test("should be visible", async () => {
    const page = await mountSuspended(Create);
    expect(page.exists()).toBe(true);
  });
});
