import { mountSuspended } from "@nuxt/test-utils/runtime";
import { expect, test } from "vitest";
import App from "~/app.vue";

test("app runs fine", async () => {
  const app = await mountSuspended(App);

  expect(app.isVisible()).toBe(true);
});
