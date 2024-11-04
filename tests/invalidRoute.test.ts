import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe } from "vitest";
import { expect, test } from "vitest";
import ErrorPage from "~/pages/[...error].vue";

const page = await mountSuspended(ErrorPage);

describe("404 Page", () => {
  test("should be visible", () => {
    expect(page.exists()).toBe(true);
    expect(page.isVisible()).toBe(true);
  });

  test("should have counter set to 5 by default", () => {
    const counter = ref(page.vm.counter);
    expect(counter.value).toBe(5);
  });

  test("should have empty yoda array by default", () => {
    const yodas = ref(page.vm.yodas);
    expect(yodas.value.length).toBe(0);
  });

  test("should be able to spawn yodas", () => {
    const yodas = ref(page.vm.yodas);

    page.vm.spawnYoda(new MouseEvent("mousemove"));
    expect(yodas.value.length).toBeGreaterThanOrEqual(1);
  });
});
