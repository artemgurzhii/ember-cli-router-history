import '@glint/environment-ember-loose';

import type * as testHelpers from '@ember/test-helpers';
import type * as testWaiters from '@ember/test-waiters';

declare global {
  declare const pauseTest: typeof testHelpers.pauseTest;
  declare const getSettledState: typeof testHelpers.getSettledState;
  declare const getPendingWaiterState: typeof testWaiters.getPendingWaiterState;
  declare const currentURL: typeof testHelpers.currentURL;
  declare const currentRouteName: typeof testHelpers.currentRouteName;
}
