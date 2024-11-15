import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe } from "vitest";
import { expect, test } from "vitest";
import Todo from "~/pages/student/todo.vue";

describe("Student Todo Page", () => {
  test("should be visible", async () => {
    const page = await mountSuspended(Todo);
    expect(page.exists()).toBe(true);
  });
});
