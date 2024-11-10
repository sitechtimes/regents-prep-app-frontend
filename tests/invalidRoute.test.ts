import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe } from "vitest";
import { expect, test } from "vitest";
import ErrorPage from "~/pages/[...error].vue";

describe("404 Page", () => {
  test("should be visible", async () => {
    const page = await mountSuspended(ErrorPage);
    expect(page.exists()).toBe(true);
  });

  test("should have counter set to 5 by default", async () => {
    const page = await mountSuspended(ErrorPage);
    const counter = ref(page.vm.counter);
    expect(counter.value).toBe(5);
  });

  test("should have empty yoda array by default", async () => {
    const page = await mountSuspended(ErrorPage);
    const yodas = ref(page.vm.yodas);
    expect(yodas.value.length).toBe(0);
  });

  test("should be able to spawn yodas", async () => {
    const page = await mountSuspended(ErrorPage);
    const yodas = ref(page.vm.yodas);

    page.vm.spawnYoda(new MouseEvent("mousemove"));
    expect(yodas.value.length).toBeGreaterThanOrEqual(1);
  });
});
