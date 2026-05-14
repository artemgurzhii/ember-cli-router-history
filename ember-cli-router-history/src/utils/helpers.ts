export const LOCAL_STORAGE_KEY = 'ember-cli-router-history';

function getLocalStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage ?? null;
  } catch {
    return null;
  }
}

export function localStorageSet(key: string, item: unknown): void {
  const storage = getLocalStorage();
  if (!storage) return;
  storage.setItem(key, JSON.stringify(item));
}

export function localStorageGet<T = unknown>(key: string): T | null {
  const storage = getLocalStorage();
  if (!storage) return null;

  const item = storage.getItem(key);
  if (!item) return null;

  return JSON.parse(item) as T;
}

export function localStorageRemove(key: string): void {
  const storage = getLocalStorage();
  if (!storage) return;
  storage.removeItem(key);
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
