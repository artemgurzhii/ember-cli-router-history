import { module, test } from 'qunit';

import {
  LOCAL_STORAGE_KEY,
  localStorageGet,
  localStorageRemove,
  localStorageSet,
} from 'ember-cli-router-history/utils/helpers';

module('Unit | Utils | helpers — localStorage guards', function (hooks) {
  let originalDescriptor;

  hooks.beforeEach(function () {
    originalDescriptor = Object.getOwnPropertyDescriptor(window, 'localStorage');
  });

  hooks.afterEach(function () {
    if (originalDescriptor) {
      Object.defineProperty(window, 'localStorage', originalDescriptor);
    }
  });

  test('localStorageGet returns null when window.localStorage is unavailable', function (assert) {
    Object.defineProperty(window, 'localStorage', {
      value: undefined,
      configurable: true,
    });

    assert.strictEqual(localStorageGet(LOCAL_STORAGE_KEY), null);
  });

  test('localStorageSet is a no-op when window.localStorage is unavailable', function (assert) {
    Object.defineProperty(window, 'localStorage', {
      value: undefined,
      configurable: true,
    });

    // Should not throw.
    localStorageSet(LOCAL_STORAGE_KEY, [{ name: 'x' }]);
    assert.ok(true, 'no exception');
  });

  test('localStorageRemove is a no-op when window.localStorage is unavailable', function (assert) {
    Object.defineProperty(window, 'localStorage', {
      value: undefined,
      configurable: true,
    });

    localStorageRemove(LOCAL_STORAGE_KEY);
    assert.ok(true, 'no exception');
  });

  test('localStorageGet swallows getter exceptions (sandboxed window)', function (assert) {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('SecurityError');
      },
      configurable: true,
    });

    assert.strictEqual(localStorageGet(LOCAL_STORAGE_KEY), null);
  });
});
