export const subjectColors = {
  Math: "var(--math)", //blue
  English: "var(--english)", //pink
  Science: "var(--science)", //green
  History: "var(--history)", //yellow
  Russian: "var(--russian)" //purple
} as const;

export type Subjects = keyof typeof subjectColors;
