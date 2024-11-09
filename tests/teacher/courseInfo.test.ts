import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import { createPinia, setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, vi } from "vitest";
import { expect, test } from "vitest";
import Course from "~/pages/teacher/course/[courseCode]/index.vue";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

mockNuxtImport("useRuntimeConfig", () => {
  return () => {
    return { public: { backend: process.env.NUXT_TEST_BACKEND } };
  };
});

describe("Teacher Course Info Page", { retry: 1 }, () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(async () => {
    await delay(50);
  });

  test("should be visible", async () => {
    const page = await mountSuspended(Course);
    expect(page.exists()).toBe(true);
    expect(page.isVisible()).toBe(true);
  });

  test("should not be loaded if course is not found", async () => {
    const page = await mountSuspended(Course, { route: { params: { courseCode: "" } } });
    const currentCourse = ref(page.vm.currentCourse);
    const loaded = ref(page.vm.loaded);

    expect(currentCourse.value).toBeFalsy();
    expect(loaded.value).toBe(false);
  });

  test("should be loaded if course is found", async () => {
    const page = await mountSuspended(Course, { route: { params: { courseCode: "2" } } });
    const initComplete = ref(page.vm.initComplete);
    const courses = ref(page.vm.courses);

    initComplete.value = true;
    const testCourse: TeacherCourse = {
      id: 2,
      name: "AP Calculus CD",
      teacher: "Wichael Mhalen",
      period: 2,
      subject: "Math",
      assignments: [],
      joinCode: "696969",
      students: 0,
      assignmentsLength: 0
    };
    courses.value = [testCourse];
    await page.vm.$nextTick();

    const currentCourse = ref(page.vm.currentCourse);
    expect(currentCourse.value).toMatchObject(testCourse);
    await page.vm.$nextTick();

    const loaded = ref(page.vm.loaded);
    await vi.waitUntil(() => loaded.value, { timeout: 500, interval: 10 });
    expect(loaded.value).toBe(true);
  });

  test("should show current assignment cards if current assignments exist", async () => {
    const page = await mountSuspended(Course, { route: { params: { courseCode: "2" } } });
    const initComplete = ref(page.vm.initComplete);
    const courses = ref(page.vm.courses);

    initComplete.value = true;
    const testCourse: TeacherCourse = {
      id: 2,
      name: "AP Calculus CD",
      teacher: "Wichael Mhalen",
      period: 2,
      subject: "Math",
      assignments: [], // actual test data is in server/api/courses/[courseId]/assignments
      joinCode: "696969",
      students: 0,
      assignmentsLength: 0
    };
    courses.value = [testCourse];
    await page.vm.$nextTick();

    const currentCourse = ref(page.vm.currentCourse);
    expect(currentCourse.value).toBeTruthy();
    await page.vm.$nextTick();

    const loaded = ref(page.vm.loaded);
    await vi.waitUntil(() => loaded.value, { timeout: 500, interval: 10 });
    expect(loaded.value).toBe(true);

    const assignments = ref(page.vm.currentAssignments);
    expect(assignments.value).toHaveLength(1);
    expect(page.findComponent({ name: "AssignmentCard" }).exists()).toBe(true);
    expect(page.find("#no-current-assignments").exists()).toBe(false);
  });

  test("should not show current assignment cards if current assignments dont exist", async () => {
    const page = await mountSuspended(Course, { route: { params: { courseCode: "99" } } });
    const initComplete = ref(page.vm.initComplete);
    const courses = ref(page.vm.courses);

    initComplete.value = true;
    const testCourse: TeacherCourse = {
      id: 99,
      name: "AP Literally Torture",
      teacher: "Lichan",
      period: 9,
      subject: "English",
      assignments: [], // actual test data is in server/api/courses/[courseId]/assignments
      joinCode: "696969",
      students: 0,
      assignmentsLength: 0
    };
    courses.value = [testCourse];
    await page.vm.$nextTick();

    const currentCourse = ref(page.vm.currentCourse);
    expect(currentCourse.value).toBeTruthy();
    await page.vm.$nextTick();

    const loaded = ref(page.vm.loaded);
    await vi.waitUntil(() => loaded.value, { timeout: 500, interval: 10 });
    expect(loaded.value).toBe(true);

    const assignments = ref(page.vm.currentAssignments);
    expect(assignments.value).toHaveLength(0);
    expect(page.findComponent({ name: "AssignmentCard" }).exists()).toBe(false);
    expect(page.find("#no-current-assignments").exists()).toBe(true);
  });

  test("should show past assignment cards if past assignments exist", async () => {
    const page = await mountSuspended(Course, { route: { params: { courseCode: "3" } } });
    const initComplete = ref(page.vm.initComplete);
    const courses = ref(page.vm.courses);

    initComplete.value = true;
    const testCourse: TeacherCourse = {
      id: 3,
      name: "AP Calculus CD",
      teacher: "Wichael Mhalen",
      period: 2,
      subject: "Math",
      assignments: [], // actual test data is in server/api/courses/[courseId]/assignments
      joinCode: "696969",
      students: 0,
      assignmentsLength: 0
    };
    courses.value = [testCourse];
    await page.vm.$nextTick();

    const currentCourse = ref(page.vm.currentCourse);
    expect(currentCourse.value).toBeTruthy();
    await page.vm.$nextTick();

    const loaded = ref(page.vm.loaded);
    await vi.waitUntil(() => loaded.value, { timeout: 500, interval: 10 });
    expect(loaded.value).toBe(true);

    const assignments = ref(page.vm.pastAssignments);
    expect(assignments.value).toHaveLength(1);
    expect(page.findComponent({ name: "AssignmentCard" }).exists()).toBe(true);
    expect(page.find("#no-past-assignments").exists()).toBe(false);
  });

  test("should not show past assignment cards if past assignments dont exist", async () => {
    const page = await mountSuspended(Course, { route: { params: { courseCode: "99" } } });
    const initComplete = ref(page.vm.initComplete);
    const courses = ref(page.vm.courses);

    initComplete.value = true;
    const testCourse: TeacherCourse = {
      id: 99,
      name: "AP Literally Torture",
      teacher: "Lichan",
      period: 9,
      subject: "English",
      assignments: [], // actual test data is in server/api/courses/[courseId]/assignments
      joinCode: "696969",
      students: 0,
      assignmentsLength: 0
    };
    courses.value = [testCourse];
    await page.vm.$nextTick();

    const currentCourse = ref(page.vm.currentCourse);
    expect(currentCourse.value).toBeTruthy();
    await page.vm.$nextTick();

    const loaded = ref(page.vm.loaded);
    await vi.waitUntil(() => loaded.value, { timeout: 500, interval: 10 });
    expect(loaded.value).toBe(true);

    const assignments = ref(page.vm.pastAssignments);
    expect(assignments.value).toHaveLength(0);
    expect(page.findComponent({ name: "AssignmentCard" }).exists()).toBe(false);
    expect(page.find("#no-past-assignments").exists()).toBe(true);
  });
});
