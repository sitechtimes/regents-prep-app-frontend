import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, vi } from "vitest";
import { expect, test } from "vitest";
import Page from "~/pages/student/todo.vue";

global.fetch = vi.fn(() =>
  Promise.resolve(
    new Response(
      JSON.stringify([
        [
          [
            {
              id: 420,
              dateSubmitted: new Date(),
              questionsCompleted: 3,
              questionsCorrect: 2,
              assignment: {
                name: "Power Rule practice",
                numQuestions: 5,
                lateSubmissions: false,
                dueDate: new Date(),
                dateAssigned: new Date()
              }
            }
          ]
        ]
      ]),
      { status: 200 }
    )
  )
);

describe("Student Todo Page", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("should be visible", async () => {
    const page = await mountSuspended(Page);
    expect(page.exists()).toBe(true);
  });

  test("should be loaded", async () => {
    const page = await mountSuspended(Page);
    const courses = ref(page.vm.studentCourses);
    courses.value = [];

    const loaded = ref(page.vm.loaded);

    await vi.waitUntil(() => loaded.value, { timeout: 500, interval: 10 });
    expect(loaded.value).toBe(true);
  });
});
