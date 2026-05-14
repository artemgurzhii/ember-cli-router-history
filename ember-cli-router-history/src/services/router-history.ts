import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { isEqual } from '@ember/utils';
import { getOwner } from '@ember/owner';

import HistoryItem from '../objects/history-item.js';
import {
  localStorageSet,
  localStorageGet,
  localStorageRemove,
  isEmptyObject,
  LOCAL_STORAGE_KEY,
} from '../utils/helpers.js';

interface TransitionLike {
  to?: { name?: string | null; params?: Record<string, unknown> | null } | null;
}

interface FastBootLike {
  isFastBoot?: boolean;
}

export default class RouterHistoryService extends Service {
  maxLength = 10;

  @tracked history: HistoryItem[] = [];

  constructor(...args: ConstructorParameters<typeof Service>) {
    super(...args);

    if (this.isFastBoot) return;

    const stored = localStorageGet<HistoryItem[]>(LOCAL_STORAGE_KEY);

    if (stored && stored.length > 0) {
      this.history = stored;
    } else {
      localStorageSet(LOCAL_STORAGE_KEY, []);
    }
  }

  get isFastBoot(): boolean {
    const owner = getOwner(this);
    const fastboot = owner?.lookup('service:fastboot') as
      | FastBootLike
      | undefined;
    return Boolean(fastboot?.isFastBoot);
  }

  get previous(): HistoryItem | null {
    const { history } = this;

    if (history.length > 1) return history[history.length - 2] ?? null;

    return null;
  }

  addItem(transition: TransitionLike): HistoryItem[] {
    const item = this.buildItemFor(transition);
    const last = this.history[this.history.length - 1];

    if (!isEqual(item, last)) {
      const next = [...this.history, item];

      while (next.length > this.maxLength) next.shift();

      this.history = next;
      if (!this.isFastBoot) this.persistData(this.history);
    }

    return this.history;
  }

  clear(): void {
    this.history = [];
    localStorageRemove(LOCAL_STORAGE_KEY);
  }

  persistData(history: HistoryItem[]): void {
    localStorageSet(LOCAL_STORAGE_KEY, history);
  }

  buildItemFor(transition: TransitionLike): HistoryItem {
    const target = transition.to ?? {};
    const item = new HistoryItem({ name: target.name ?? null });

    if (!isEmptyObject(target.params ?? null)) {
      item.params = target.params ?? null;
    }

    return item;
  }
}

declare module '@ember/service' {
  interface Registry {
    'router-history': RouterHistoryService;
  }
}
