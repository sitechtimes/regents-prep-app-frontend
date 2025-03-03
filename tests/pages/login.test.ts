import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe } from "vitest";
import { expect, test } from "vitest";
import Login from "~/pages/login.vue";

describe("Login Page", () => {
  test("should be visible", async () => {
    const page = await mountSuspended(Login);
    expect(page.exists()).toBe(true);
  });

  describe("Email Regex Check", async () => {
    const page = await mountSuspended(Login);
    const email = ref(page.vm.email);
    const emailErr = ref(page.vm.emailErr);

    const testCases = [
      { name: "should not allow emails without a username", input: "ventdefeater.app", expect: "Invalid email." },
      { name: "should not allow emails without a domain", input: "bogdansussyomin", expect: "Invalid email." },
      { name: "should not allow emails without a username or domain", input: "@", expect: "Invalid email." },
      { name: "should not allow emails without a TLD", input: "bogdansussyomin@ventdefeater", expect: "Invalid email." },
      { name: "should not allow emails with non-alphanumeric characters in the username", input: "😂😲🤯😱😭@ventdefeater.app", expect: "Invalid email." },
      { name: "should not allow emails with non-alphanumeric characters in the domain", input: "bogdansussyomin@😡🔥❌.💥👿", expect: "Invalid email." },
      { name: "should not throw error for empty emails", input: "", expect: "" },
      { name: "should not throw error for valid emails", input: "bogdansussyomin@ventdefeater.app", expect: "" }
    ];

    for (const testCase of testCases) {
      test(testCase.name, async () => {
        email.value = testCase.input;
        await page.vm.$nextTick();
        expect(emailErr.value).toBe(testCase.expect);
      });
    }
  });
});
