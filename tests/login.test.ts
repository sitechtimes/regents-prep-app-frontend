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

    for (let testCase of testCases) {
      test(testCase.name, async () => {
        email.value = testCase.input;
        await page.vm.$nextTick();
        expect(emailErr.value).toBe(testCase.expect);
      });
    }
  });

  describe("Password Regex Check", async () => {
    const page = await mountSuspended(Login);
    const password = ref(page.vm.password);
    const passwordErr = ref(page.vm.passwordErr);

    const testCases = [
      { name: "should not allow passwords shorter than 8 characters", input: "bogdan", expect: "Password must be at least 8 characters." },
      { name: "should not allow empty passwords", input: "", expect: "Password must be at least 8 characters." },
      { name: "should not allow emails longer than 50 characters", input: "bogdanpneumonoultramicroscopicsilicovolcanoconiosis", expect: "Password must be less than 50 characters." },
      { name: "should not throw error for passwords within 8-50 characters", input: "bogdansussyomin", expect: "" },
      { name: "should not throw error for passwords with non-alphanumeric characters", input: "😂😲🤯😱😭😡🔥❌💥👿", expect: "" }
    ];

    for (let testCase of testCases) {
      test(testCase.name, async () => {
        password.value = testCase.input;
        await page.vm.$nextTick();
        expect(passwordErr.value).toBe(testCase.expect);
      });
    }
  });
});
