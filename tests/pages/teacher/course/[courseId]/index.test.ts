import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, test, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import Index from "~/pages/teacher/course/[courseCode]/index.vue";

describe("teacherCourse", async () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("page should be visible", async () => {
    const page = await mountSuspended(Index);
    expect(page.exists()).toBe(true);
  });

  test("currentAssignmentExist", async () => {
    const page = await mountSuspended(Index);
    const currentAssignments = ref(page.vm.currentAssignments);

    function()


    expect(currentAssignments.value).toHaveLength(1);
  });

  test("currentAssignmentsTest", async () => {
    const page = await mountSuspended(Index);
    const assignments = ref(page.vm.assignments);

    const currentAssignments = ref(page.vm.currentAssignments);

    assignments.value = [
      {
        name: "test",
        dateAssigned: new Date(),
        dueDate: new Date(),
        numOfQuestions: 4,
        lateSubmissions: false,
        numSubmitted: 2,
        id: 9
      }
    ];
    await nextTick();
    await vi.waitUntil(() => expect);
    expect(currentAssignments.value).toBe(assignments.value[0]);
  });
});
