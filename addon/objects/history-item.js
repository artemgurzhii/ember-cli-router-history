import {
  arraysEqual,
  getKeys,
  getValues,
} from 'ember-cli-router-history/utils/helpers';

export default class HistoryItem {
  name = null;
  params = null;

  constructor({ name = null, params = null } = {}) {
    this.name = name;
    this.params = params;
  }

  static create(props) {
    return new HistoryItem(props);
  }

  isEqual(other) {
    if (!other) return false;

    const paramsAreEqual = arraysEqual(getKeys(this.params), getKeys(other.params));
    const valuesAreEqual = arraysEqual(getValues(this.params), getValues(other.params));

    return this.name === other.name && paramsAreEqual && valuesAreEqual;
  }
}
