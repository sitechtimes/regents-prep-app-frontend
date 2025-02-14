import { mountSuspended } from "@nuxt/test-utils/runtime";
import { flushPromises } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe } from "vitest";
import { expect, test } from "vitest";
import Page from "~/pages/student/course/[courseCode]/index.vue";

describe("Student Course Info Page", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("should be visible", async () => {
    const page = await mountSuspended(Page);
    expect(page.exists()).toBe(true);
  });

  test("should show assignment cards if assignments exist", async () => {
    const page = await mountSuspended(Page, { route: { params: { courseCode: "1" } }, attachTo: document.body });
    const currentCourse = ref(page.vm.studentCurrentCourse);

    currentCourse.value = {
      id: 1,
      name: "AP Calculus CD",
      teacher: "Wichael Mhalen",
      period: 2,
      subject: "Math",
      assignments: [
        {
          id: 420,
          dateSubmitted: new Date(),
          questionsCompleted: 3,
          questionsCorrect: 2,
          assignment: {
            name: "Power Rule practice",
            numOfQuestions: 5,
            lateSubmissions: false,
            dueDate: new Date(),
            dateAssigned: new Date(),
            questionInterfaces: []
          }
        }
      ]
    };
    await flushPromises();

    const assignments = ref(page.vm.assignments);
    expect(assignments.value).toHaveLength(1);
    expect(page.findComponent({ name: "AssignmentCard" }).exists()).toBe(true);
    expect(page.find("#no-assignments").exists()).toBe(false);
  });

  test("should not show assignment cards if assignments dont exist", async () => {
    const page = await mountSuspended(Page, { route: { params: { courseCode: "99" } }, attachTo: document.body });
    const currentCourse = ref(page.vm.studentCurrentCourse);

    currentCourse.value = {
      id: 1,
      name: "AP Calculus CD",
      teacher: "Wichael Mhalen",
      period: 2,
      subject: "Math",
      assignments: []
    };
    await flushPromises();

    const assignments = ref(page.vm.assignments);
    expect(assignments.value).toHaveLength(0);
    expect(page.findComponent({ name: "AssignmentCard" }).exists()).toBe(false);
    expect(page.find("#no-assignments").exists()).toBe(true);
  });
});
