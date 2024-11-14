import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe } from "vitest";
import { expect, test } from "vitest";
import Layout from "~/layouts/student.vue";

describe("Student Layout", () => {
  test("should be visible", async () => {
    const page = await mountSuspended(Layout);

    expect(page.exists()).toBe(true);
  });

  test("should be loaded", async () => {
    const page = await mountSuspended(Layout);
    const loaded = ref(page.vm.loaded);
    expect(loaded.value).toBe(true);
  });

  test("should show join button if on dashboard", async () => {
    const page = await mountSuspended(Layout, {
      route: { path: "/student/dashboard/" },
      attachTo: document.body
    });
    expect(page.find("#join-button").isVisible()).toBe(true);
  });

  test("should not show join button if not on dashboard", async () => {
    const page = await mountSuspended(Layout, {
      route: { path: "/student/todo" },
      attachTo: document.body
    });
    expect(page.find("#join-button").isVisible()).toBe(false);
  });

  test("should show side menu if on showSideMenu is true", async () => {
    const page = await mountSuspended(Layout, { attachTo: document.body });

    const showSideMenu = ref(page.vm.showSideMenu);
    expect(showSideMenu.value).toBe(true);
    expect(page.find("#side-menu").isVisible()).toBe(true);
  });

  test("should not show side menu if showSideMenu is false", async () => {
    const page = await mountSuspended(Layout, { attachTo: document.body });

    const showSideMenu = ref(page.vm.showSideMenu);
    showSideMenu.value = false;
    await page.vm.$nextTick();
    expect(page.find("#side-menu").isVisible()).toBe(false);
  });
});
