import { describe, expect, test } from "vitest";

describe("formatDate", () => {
  test("should return today if date is today", () => {
    const testDate = new Date();
    testDate.setFullYear(2069, 0, 1);
    testDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setFullYear(2069, 0, 1);
    currentDate.setHours(0, 0, 0, 0);
    expect(formatDate(testDate, currentDate)).toBe("today at 12:00 AM");
  });

  test("should return tomorrow if date is tomorrow", () => {
    const testDate = new Date();
    testDate.setFullYear(2069, 0, 2);
    testDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setFullYear(2069, 0, 1);
    currentDate.setHours(0, 0, 0, 0);
    expect(formatDate(testDate, currentDate)).toBe("tomorrow at 12:00 AM");
  });

  test("should return yesterday if date is yesterday", () => {
    const testDate = new Date();
    testDate.setFullYear(2069, 0, 1);
    testDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setFullYear(2069, 0, 2);
    currentDate.setHours(0, 0, 0, 0);
    expect(formatDate(testDate, currentDate)).toBe("yesterday at 12:00 AM");
  });

  test("should return day of week if date is less than 7 days ago", () => {
    const testDate = new Date();
    testDate.setFullYear(2069, 0, 1);
    testDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setFullYear(2069, 0, 4);
    currentDate.setHours(0, 0, 0, 0);
    expect(formatDate(testDate, currentDate)).toBe("last Tuesday");
  });

  test("should return day of week if date is further than 7 days", () => {
    const testDate = new Date();
    testDate.setFullYear(2069, 0, 4);
    testDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setFullYear(2069, 0, 1);
    currentDate.setHours(0, 0, 0, 0);
    expect(formatDate(testDate, currentDate)).toBe("Friday");
  });

  test("should return date if date is further than tomorrow", () => {
    const testDate = new Date();
    testDate.setFullYear(2069, 0, 10);
    testDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setFullYear(2069, 0, 1);
    currentDate.setHours(0, 0, 0, 0);
    expect(formatDate(testDate, currentDate)).toBe("Jan 10 at 12:00 AM");
  });

  test("should return date if date is more than a year ago", () => {
    const testDate = new Date();
    testDate.setFullYear(2069, 5, 9);
    testDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setFullYear(2070, 5, 9);
    currentDate.setHours(0, 0, 0, 0);
    expect(formatDate(testDate, currentDate)).toBe("Jun 9, 2069 at 12:00 AM");
  });

  test("should return date if date is further than a year", () => {
    const testDate = new Date();
    testDate.setFullYear(2070, 5, 9);
    testDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setFullYear(2069, 5, 9);
    currentDate.setHours(0, 0, 0, 0);
    expect(formatDate(testDate, currentDate)).toBe("Jun 9, 2070 at 12:00 AM");
  });
});
