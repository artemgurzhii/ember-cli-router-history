import { isPresent } from '@ember/utils';

export const LOCAL_STORAGE_KEY = 'ember-cli-router-history';

export function localStorageSet(key, item) {
  window.localStorage.setItem(key, JSON.stringify(item));
}

export function localStorageGet(key) {
  const item = window.localStorage.getItem(key);

  if (!item) return null;

  return JSON.parse(item);
}

export function arraysEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function getKeys(obj) {
  return obj && Object.keys(obj);
}

export function getValues(obj) {
  return obj && Object.values(obj);
}

export function isEmptyObject(obj) {
  const exists = isPresent(obj);

  if (exists) return Object.keys(obj).length === 0;

  return true;
}
