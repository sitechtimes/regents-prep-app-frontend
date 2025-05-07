/**
 * Gets time spent on current question.
 * @param timestamp The timestamp of the last update
 * @returns `[new timestamp, seconds since last update]`
 */
export function getDeltaTime(timestamp: number): [newTimestamp: number, diff: number] {
  return [Date.now(), Math.floor((Date.now() - timestamp) / 1000)];
}
