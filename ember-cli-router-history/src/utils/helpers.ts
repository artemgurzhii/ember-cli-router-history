export const LOCAL_STORAGE_KEY = 'ember-cli-router-history';

export function localStorageSet(key: string, item: unknown): void {
  window.localStorage.setItem(key, JSON.stringify(item));
}

export function localStorageGet<T = unknown>(key: string): T | null {
  const item = window.localStorage.getItem(key);

  if (!item) return null;

  return JSON.parse(item) as T;
}

export function arraysEqual<T>(
  a: T[] | null | undefined,
  b: T[] | null | undefined,
): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function getKeys(
  obj: Record<string, unknown> | null | undefined,
): string[] | undefined {
  return obj ? Object.keys(obj) : undefined;
}

export function getValues(
  obj: Record<string, unknown> | null | undefined,
): unknown[] | undefined {
  return obj ? Object.values(obj) : undefined;
}

export function isEmptyObject(
  obj: Record<string, unknown> | null | undefined,
): boolean {
  if (obj == null) return true;
  return Object.keys(obj).length === 0;
}
