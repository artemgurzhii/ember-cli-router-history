import EmberRouter from '@ember/routing/router';
import { inject as service } from '@ember/service';

export function initialize() {
  EmberRouter.extend({
    routerHistory: service(),

    willTransition(previousTransition, currentTransition) {
      this._super(...arguments);

      this.routerHistory.addItem(currentTransition);
    },
  });
}

export default {
  initialize
};
