import HistoryItem from 'ember-cli-router-history/objects/history-item';
import {
  localStorageSet,
  localStorageGet,
  isEmptyObject,
  LOCAL_STORAGE_KEY,
} from 'ember-cli-router-history/utils/helpers';
import Service from '@ember/service';
import { set } from '@ember/object';
import { A } from '@ember/array';
import { isEqual, isEmpty, isPresent } from '@ember/utils';
import { computed } from '@ember/object';

export default Service.extend({
  /**
   * @description maximum number of entries to keep in the history
   *
   * @property maxLength
   * @type {Number}
   */
  maxLength: 10,

  /**
   * @description array containing the history of routes that have been visited
   *
   * @property history
   * @type {Array<HistoryItem>}
   */
  history: A(),

  init() {
    this._super(...arguments);

    const history = localStorageGet(LOCAL_STORAGE_KEY);

    if (isPresent(history)) {
      set(this, 'history', history);
    } else {
      localStorageSet(LOCAL_STORAGE_KEY, []);
    }
  },

  /**
   * Previous route. If there is no previous route, returns null
   *
   * @property previous
   * @type {String|Object}
   */
  previous: computed('history.[]', function() {
    const { history } = this;
    const { length } = history;

    if (!isEmpty(history) && length > 1) return history.objectAt(length - 2);

    return null;
  }),

  /**
   * @description Pushes a route name onto the history stack.
   *
   * @method addItem
   *
   * @param {Object} transition - current transition item
   *
   * @return {Array} current history stack
   */
  addItem(transition) {
    const item = this.buildItemFor(transition);

    const { history } = this;

    if (!isEqual(item, history.lastObject)) {
      history.pushObject(item);

      if (history.length > this.maxLength) history.shiftObject();

      this.persistData(history);
    }


    return history;
  },

  /**
   * @description Clears all data from the history
   *
   * @method clear
   */
  clear() {
    this.history.clear();

    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  },

  // PRIVATE METHODS
  /**
   * @description Syncs local storage history data with local history array
   *
   * @method persistData
   *
   * @param {Array} history - history data
   */
  persistData(history) {
    localStorageSet(LOCAL_STORAGE_KEY, history);
  },

  /**
   * @description Generate history item
   *
   * @method buildItemFor
   *
   * @param {Object} transition - current transition item
   *
   * @return {Object} history item
   */
  buildItemFor(transition) {
    const { lastObject: { name, params } } = transition;
    const item = HistoryItem.create({ name });

    if (!isEmptyObject(params)) {
      set(item, 'params', params);
    }

    return item;
  },
});
