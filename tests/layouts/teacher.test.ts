import { mountSuspended } from "@nuxt/test-utils/runtime";
import { flushPromises } from "@vue/test-utils";
import { describe } from "vitest";
import { expect, test } from "vitest";
import Page from "~/layouts/teacher.vue";

describe("Teacher Layout", () => {
  test("should be visible", async () => {
    const page = await mountSuspended(Page);

    expect(page.exists()).toBe(true);
  });

  test("should be loaded", async () => {
    const page = await mountSuspended(Page);
    const loaded = ref(page.vm.loaded);
    expect(loaded.value).toBe(true);
  });

  test("should show create button if on dashboard", async () => {
    const page = await mountSuspended(Page, {
      route: { path: "/teacher/dashboard" },
      attachTo: document.body
    });
    expect(page.find("#create-button").isVisible()).toBe(true);
  });

  // test("should not show teacher button if not on dashboard", async () => {
  //   const page = await mountSuspended(Page, {
  //     route: { path: "/teacher/course/1" },
  //     attachTo: document.body
  //   });
  //   expect(page.find("#create-button").isVisible()).toBe(false);
  // });

  test("should open join modal if join button is clicked", async () => {
    const page = await mountSuspended(Page, {
      route: { path: "/teacher/dashboard" },
      attachTo: document.body
    });
    await page.find("#create-button").trigger("click");

    await flushPromises();
    expect(page.findComponent({ name: "CreateClass" }).exists()).toBe(true);
  });

  test("should show side menu if on showSideMenu is true", async () => {
    const page = await mountSuspended(Page, { attachTo: document.body });

    const showSideMenu = ref(page.vm.showSideMenu);
    expect(showSideMenu.value).toBe(true);
    expect(page.find("#side-menu").isVisible()).toBe(true);
  });

  test("should not show side menu if showSideMenu is false", async () => {
    const page = await mountSuspended(Page, { attachTo: document.body });

    const showSideMenu = ref(page.vm.showSideMenu);
    showSideMenu.value = false;
    await page.vm.$nextTick();
    expect(page.find("#side-menu").isVisible()).toBe(false);
  });
});
