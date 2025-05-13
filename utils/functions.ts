/**
 * @warning Be sure to await this function in order to actually use the delay.
 * @param ms - Number of milliseconds to delay.
 * @example await delay(1000); // Wait for 1 second
 */
export function delay(ms: number): Promise<void> {
  return new Promise((executor: () => void) => setTimeout(executor, ms));
}

/**
 * Returns a random integer between `min` and `max`.
 *
 * @param min - The minimum value of the random integer.
 * @param max - The maximum value of the random integer.
 * @example getRandomInt(1, 10) -> 5
 */
export function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

/**
 * Returns a random item from an array.
 *
 * @param arr - The array to get a random item from.
 * @example getRandomItem([1, 2, 3, 4, 5]) -> 3
 */
export function getRandomItem<T>(arr: T[]) {
  return arr[getRandomInt(0, arr.length - 1)];
}

/**
 * Modifies the current route's query parameters while keeping other existing query parameters.
 *
 * @param query - An object representing the query parameters to add or update.
 * @param replace - Whether to use `router.push` or `router.replace` to change the route. Defaults to `replace`.
 * @example changeRouteQuery({ u: 0 }) -> router.replace({ query: { ...route.query, u: 0 } })
 */
export async function changeRouteQuery<T extends string | number>(query: Record<string, T | T[] | undefined>, method: "replace" | "push" = "replace"): Promise<void> {
  const route = useRoute();
  const router = useRouter();

  if (method === "replace") return void (await router.replace({ query: { ...route.query, ...query } }));
  await router.push({ query: { ...route.query, ...query } });
}

// https://nuxt.com/docs/guide/directory-structure/composables#how-files-are-scanned
export * from "./functions/studentAssignment";
export * from "./functions/formatting";
export * from "./functions/parsing";
