/**
 * Returns a formatted string representing the difference between two dates.
 *
 * @param target - The date to format.
 * @param current - The current date to compare to.
 * @example formatDate(new Date(), new Date())
 */
export function formatDate(target: Date, current: Date) {
  const dateHour = target.toLocaleString("default", { hour12: true, hour: "numeric", minute: "2-digit" });
  const week = target.toLocaleDateString("default", { weekday: "long" });
  const long = `${target.toLocaleString("default", { year: target.getFullYear() === current.getFullYear() ? undefined : "numeric", month: "short", day: "numeric" })} at ${target.toLocaleString("default", { hour12: true, hour: "numeric", minute: "2-digit" })}`;

  const inputDate = new Date(target).setHours(0, 0, 0, 0);
  const now = new Date(current).setHours(0, 0, 0, 0);
  const diffDays = Math.round((inputDate - now) / (24 * 60 * 60 * 1000));

  const labels: Readonly<Record<string, string>> = {
    "0": `today at ${dateHour}`,
    "1": `tomorrow at ${dateHour}`,
    "-1": `yesterday at ${dateHour}`
  };

  return labels[String(diffDays)] || (diffDays > 1 && diffDays <= 7 ? week : diffDays < -1 && diffDays >= -7 ? `last ${week}` : long);
}

/** Formats a given time in seconds into hours, minutes, and seconds.
 * @param time - The time, in seconds, to be formatted.
 */
export function formatTime(time: number) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.ceil(time % 60);
  if (hours > 23) return `${hours} hours`;
  if (hours) return `${hours}h${minutes ? `${minutes}m` : ""}${seconds ? `${seconds}s` : ""}`;
  // i am a template literal abuser
  return `${minutes ? `${minutes} minute${minutes === 1 ? "" : "s"}` : ""}${minutes && seconds ? " " : ""}${!minutes ? `${seconds} second${seconds === 1 ? "" : "s"}` : ""}`;
}
