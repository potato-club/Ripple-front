export function getUniqueBy<T, K extends keyof T>(array: T[], key: K): T[] {
  return [...new Map(array.map((item) => [item[key], item])).values()];
}