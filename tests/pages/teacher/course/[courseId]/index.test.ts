import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, test, vi } from "vitest";
import Index from "~/pages/teacher/course/[courseCode]/index.vue";

describe("teacherCourse", async () => {
  test("currentAssignmentsTest", async () => {
    const page = await mountSuspended(Index);
    const assignments = ref(page.vm.assignments);
    const currentAssignments = ref(page.vm.currentAssignments);

    assignments.value = [
      {
        // assignment 1
        id: 1
      }
    ];
    await nextTick();
    await vi.waitUntil(() => expect);
    expect(currentAssignments.value).toBe(assignments.value[0]);
  });
});
