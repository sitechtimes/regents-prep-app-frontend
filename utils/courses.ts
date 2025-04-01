export const subjectColors = {
  Math: "var(--math)", //blue
  Science: "var(--science)", //green
  English: "var(--english)", //pink
  History: "var(--history)", //yellow
  "Foreign Language": "var(--russian)" //purple
} as const;

export type Subject = keyof typeof subjectColors;
