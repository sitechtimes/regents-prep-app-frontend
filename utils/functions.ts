/**
 * @warning Be sure to await this function in order to actually use the delay.
 * @param {number} ms - Number of milliseconds to delay.
 * @example await delay(1000); // Wait for 1 second
 */
export function delay(ms: number): Promise<void> {
  return new Promise((executor: any) => setTimeout(executor, ms));
}

/** Returns a random integer between `min` and `max`, inclusive. */
export function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

/** Returns a random item from an array. */
export function getRandomItem<T>(arr: T[]) {
  return arr[getRandomInt(0, arr.length - 1)];
}

export function formatDate(date: Date, currentTime: Date) {
  const dateHour = date.toLocaleString("default", { hour12: true, hour: "numeric", minute: "2-digit" });
  const week = date.toLocaleDateString("default", { weekday: "long" });

  const endOfToday = new Date(currentTime).setHours(23, 59, 59, 999);

  const endOfTomorrow = new Date(currentTime);
  endOfTomorrow.setDate(currentTime.getDate() + 1);
  endOfTomorrow.setHours(23, 59, 59, 999);

  const endOfThisWeek = new Date(currentTime);
  endOfThisWeek.setDate(currentTime.getDate() + (7 - endOfThisWeek.getDay()));
  endOfThisWeek.setHours(23, 59, 59, 999);

  const endOfNextWeek = new Date(endOfThisWeek);
  endOfNextWeek.setDate(endOfThisWeek.getDate() + 7);
  endOfNextWeek.setHours(23, 59, 59, 999);

  if (date.getTime() <= endOfToday) return `today at ${dateHour}`;
  else if (date.getTime() <= endOfTomorrow.getTime()) return `tomorrow at ${dateHour}`;
  else if (date.getTime() <= endOfThisWeek.getTime()) return week;
  else if (date.getTime() <= endOfNextWeek.getTime()) return `Next ${week}`;
  else
    return (
      date.toLocaleString("default", { year: date.getFullYear() === currentTime.getFullYear() ? undefined : "numeric", month: "short", day: "numeric" }) +
      " at " +
      date.toLocaleString("default", { hour12: true, hour: "numeric", minute: "2-digit" })
    );
}
