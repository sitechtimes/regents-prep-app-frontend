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
  const current = currentTime.getTime();
  const diffSeconds = Math.round((date.getTime() - current) / 1000);

  const dateHour = date.toLocaleString("default", { hour12: true, hour: "numeric", minute: "2-digit" });

  if (diffSeconds < 0) return `yesterday at ${dateHour}`;
  else if (diffSeconds < 86400) return `today at ${dateHour}`;
  else if (diffSeconds < 86400 * 2) return `tomorrow at ${dateHour}`;
  else if (diffSeconds < 86400 * 7) return date.toLocaleDateString("default", { weekday: "long" });
  else if (diffSeconds < 86400 * 14) return `next ${date.toLocaleDateString("default", { weekday: "long" })}`;
  else return date.toLocaleString();
}
