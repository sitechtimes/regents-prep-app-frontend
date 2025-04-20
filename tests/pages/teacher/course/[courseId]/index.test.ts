import { mountSuspended } from "@nuxt/test-utils/runtime";
import { flushPromises } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, test, expect } from "vitest";
import { ref } from "vue";
import Page from "~/pages/teacher/course/[courseCode]/index.vue";

describe("Teacher Course Info Page", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("should be visible", async () => {
    const page = await mountSuspended(Page);
    expect(page.exists()).toBe(true);
  });

  test("should show assignment cards if current assignments exist", async () => {
    const page = await mountSuspended(Page, { route: { params: { courseCode: "1" } }, attachTo: document.body });
    const currentCourse = ref(page.vm.teacherCurrentCourse);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    currentCourse.value = {
      id: 1,
      name: "Physics",
      period: 3,
      subject: "Science",
      joinCode: "22222d",
      numStudents: 30,
      assignmentsLength: 1,
      teacher: "Wichael Mhalen",
      assignments: [
        {
          id: 101,
          dueDate: tomorrow,
          name: "Forces HW",
          dateAssigned: today,
          numQuestions: 10,
          lateSubmissions: false,
          numSubmitted: 25
        }
      ]
    };

    page.vm.currentTab = "current";
    await page.vm.$nextTick();
    await flushPromises();

    const assignments = ref(page.vm.filteredAssignments);
    expect(assignments.value).toHaveLength(1);
    expect(page.findComponent({ name: "TeacherAssignmentCard" }).exists()).toBe(true);
    expect(page.find("#no-assignments").exists()).toBe(false);
  });

  test("should not show assignment cards if no current assignments exist", async () => {
    const page = await mountSuspended(Page, { route: { params: { courseCode: "2" } }, attachTo: document.body });
    const currentCourse = ref(page.vm.teacherCurrentCourse);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    currentCourse.value = {
      id: 3,
      name: "Chemistry",
      period: 1,
      subject: "Science",
      joinCode: "22222d",
      numStudents: 22,
      assignmentsLength: 1,
      teacher: "Wichael Mhalen",
      assignments: [
        {
          id: 303,
          dueDate: yesterday,
          name: "Balancing Equations",
          dateAssigned: yesterday,
          numQuestions: 20,
          lateSubmissions: false,
          numSubmitted: 18
        }
      ]
    };

    page.vm.currentTab = "current";
    await page.vm.$nextTick();
    await flushPromises();

    const assignments = ref(page.vm.filteredAssignments);
    expect(assignments.value?.length).toBe(0);
    expect(page.findComponent({ name: "TeacherAssignmentCard" }).exists()).toBe(false);
  });

  test("should switch to past tab and show past assignments", async () => {
    const page = await mountSuspended(Page, { route: { params: { courseCode: "2" } }, attachTo: document.body });
    const currentCourse = ref(page.vm.teacherCurrentCourse);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    currentCourse.value = {
      id: 3,
      name: "Chemistry",
      period: 1,
      subject: "Science",
      joinCode: "22222d",
      numStudents: 22,
      assignmentsLength: 1,
      teacher: "Wichael Mhalen",
      assignments: [
        {
          id: 303,
          dueDate: yesterday,
          name: "Balancing Equations",
          dateAssigned: yesterday,
          numQuestions: 20,
          lateSubmissions: false,
          numSubmitted: 18
        }
      ]
    };

    page.vm.currentTab = "past";
    await flushPromises();

    const assignments = ref(page.vm.filteredAssignments);
    expect(assignments.value).toHaveLength(1);
    expect(page.findComponent({ name: "TeacherAssignmentCard" }).exists()).toBe(true);
  });
});
