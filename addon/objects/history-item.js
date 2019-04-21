import EmberObject from '@ember/object';
import {
  arraysEqual,
  getKeys,
  getValues,
} from 'ember-cli-router-history/utils/helpers';

export default EmberObject.extend({
  /**
   * @description name of the history item
   *
   * @property name
   * @type {String}
   */
  name: null,

  /**
   * @description query params passed to the item
   *
   * @property params
   * @type {Object}
   */
  params: null,

  /**
   * @description Compares 2 history items on the equality
   * basically - this is deep object equality comparison
   *
   * @method isEqual
   *
   * @param {<HistoryItem>} other - history item, with thich to compare
   *
   * @return {Boolean} comparison result
   */
  isEqual(other) {
    if (!other) return false;

    const keys = getKeys(this.params);
    const values = getValues(this.params);

    const otherKeys = getKeys(other.params);
    const otherValues = getValues(other.params);

    const paramsAreEqual = arraysEqual(keys, otherKeys);
    const valuesAreEqual = arraysEqual(values, otherValues);

    return this.name === other.name && paramsAreEqual && valuesAreEqual;
  },
});
