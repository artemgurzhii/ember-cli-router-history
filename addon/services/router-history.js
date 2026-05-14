import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { isEqual } from '@ember/utils';
import HistoryItem from 'ember-cli-router-history/objects/history-item';
import {
  localStorageSet,
  localStorageGet,
  isEmptyObject,
  LOCAL_STORAGE_KEY,
} from 'ember-cli-router-history/utils/helpers';

export default class RouterHistoryService extends Service {
  maxLength = 10;

  @tracked history = [];

  constructor() {
    super(...arguments);

    const stored = localStorageGet(LOCAL_STORAGE_KEY);

    if (stored && stored.length > 0) {
      this.history = stored;
    } else {
      localStorageSet(LOCAL_STORAGE_KEY, []);
    }
  }

  get previous() {
    const { history } = this;

    if (history.length > 1) return history[history.length - 2];

    return null;
  }

  addItem(transition) {
    const item = this.buildItemFor(transition);
    const last = this.history[this.history.length - 1];

    if (!isEqual(item, last)) {
      const next = [...this.history, item];

      while (next.length > this.maxLength) next.shift();

      this.history = next;
      this.persistData(this.history);
    }

    return this.history;
  }

  clear() {
    this.history = [];
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  persistData(history) {
    localStorageSet(LOCAL_STORAGE_KEY, history);
  }

  buildItemFor(transition) {
    const { name, params } = transition.to ?? transition;
    const item = new HistoryItem({ name });

    if (!isEmptyObject(params)) {
      item.params = params;
    }

    return item;
  }
}
