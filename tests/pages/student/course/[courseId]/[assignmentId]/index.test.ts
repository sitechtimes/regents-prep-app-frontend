import { mountSuspended } from "@nuxt/test-utils/runtime";
import { flushPromises } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe } from "vitest";
import { expect, test } from "vitest";
import Page from "~/pages/student/course/[courseCode]/[assignmentId]/index.vue";

describe("Student Assignment Page", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("should be visible", async () => {
    const page = await mountSuspended(Page);
    expect(page.exists()).toBe(true);
  });

  test("should show questions if there the currentQuestion exists", async () => {
    const page = await mountSuspended(Page, { route: { params: { courseCode: "1", assignmentId: "1" } }, attachTo: document.body });
    const currentCourse = ref(page.vm.studentCurrentCourse);
    const currentQuestion = ref(page.vm.currentQuestion);
    const currentAssignment = ref(page.vm.currentAssignment);

    currentAssignment.value = {
      dateSubmitted: new Date(),
      questionCompleted: 3,
      questionsCorrect: 2,
      assignment: {
        attemptsAllowed: 0,
        name: "Test assignment",
        numQuestions: 3,
        lateSubmissions: true,
        dueDate: new Date(),
        dateAssigned: new Date(),
        isStatic: false,
        course: {
            id: 2,
            name: "Physics B",
            subject: "Math"
        }
        questionInterfaces: 2, StaticQuestionInterface
      }
    };
  });
});
