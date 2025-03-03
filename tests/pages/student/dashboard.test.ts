import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, vi } from "vitest";
import { expect, test } from "vitest";
import Page from "~/pages/student/dashboard.vue";

describe("Student Dashboard Page", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("should be visible", async () => {
    const page = await mountSuspended(Page);
    expect(page.exists()).toBe(true);
  });

  test("should be loaded", async () => {
    const page = await mountSuspended(Page);
    const loaded = ref(page.vm.loaded);
    expect(loaded.value).toBe(true);
  });

  test("should show no classes text if no courses", async () => {
    const page = await mountSuspended(Page);
    const courses = ref(page.vm.studentCourses);
    courses.value = [];

    const noClasses = page.find("#no-classes");
    expect(noClasses.exists()).toBe(true);
    expect(noClasses.text()).toBe("No classes found!");

    const classCard = page.findComponent({ name: "StudentDashboardCard" });
    expect(classCard.exists()).toBe(false);
  });

  test("should show class dashboard cards if courses exist", async () => {
    const page = await mountSuspended(Page);
    const courses = ref(page.vm.studentCourses);
    courses.value = [
      {
        id: 1,
        name: "AP Calculus CD",
        teacher: "Wichael Mhalen",
        period: 2,
        subject: "Math",
        assignments: []
      }
    ];

    const classCard = await vi.waitUntil(() => page.findComponent({ name: "DashboardCard" }).exists(), { timeout: 500, interval: 10 });
    expect(classCard).toBe(true);

    const noClasses = page.find("#no-classes");
    expect(noClasses.exists()).toBe(false);
  });

  describe("Not Found Modals", () => {
    // test("should display course not found modal if course in route query", async () => {
    //   const page = await mountSuspended(Page, { route: { query: { course: "69" } } });
    //   const showNotFound = ref(page.vm.showNotFound);
    //   expect(showNotFound.value).toBe(true);

    //   const notFoundText = page.findComponent({ name: "NotFound" }).find("#not-found");
    //   expect(notFoundText.exists()).toBe(true);
    //   expect(notFoundText.text()).toBe("Sorry, we couldn't find the class you were asking for!");
    // });

    // test("should display assignment not found modal if assignment in route query", async () => {
    //   const page = await mountSuspended(Page, { route: { query: { assignment: "69" } } });
    //   const showNotFound = ref(page.vm.showNotFound);
    //   expect(showNotFound.value).toBe(true);

    //   const notFoundText = page.findComponent({ name: "NotFound" }).find("#not-found");
    //   expect(notFoundText.exists()).toBe(true);
    //   expect(notFoundText.text()).toBe("Sorry, we couldn't find the assignment you were asking for!");
    // });

    test("should not display a course not found modal if course route query is empty", async () => {
      const page = await mountSuspended(Page, { route: { query: { course: "" } } });
      const showNotFound = ref(page.vm.showNotFound);
      expect(showNotFound.value).toBe(false);
    });

    test("should not display an assignment not found modal if assignment route query is empty", async () => {
      const page = await mountSuspended(Page, { route: { query: { assignment: "" } } });
      const showNotFound = ref(page.vm.showNotFound);
      expect(showNotFound.value).toBe(false);
    });

    test("should not display a not found modal if other route query", async () => {
      const page = await mountSuspended(Page, {
        route: {
          query: {
            bogdansussyomin:
              "If 9/10 doctors in the New York area say he is 125% sus, and 2/10 doctors in the New Jersey area say he is 150% sus, how many doctors in the Pennsylvania area know where he was on January 6th? Answer in terms of x. Show your work."
          }
        }
      });
      const showNotFound = ref(page.vm.showNotFound);
      expect(showNotFound.value).toBe(false);
    });

    test("should not display a not found modal if no route query", async () => {
      const page = await mountSuspended(Page);
      const showNotFound = ref(page.vm.showNotFound);
      expect(showNotFound.value).toBe(false);
    });
  });
});
