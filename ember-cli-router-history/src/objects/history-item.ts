import { arraysEqual, getKeys, getValues } from '../utils/helpers.js';

export interface HistoryItemProps {
  name?: string | null;
  params?: Record<string, unknown> | null;
}

export default class HistoryItem {
  name: string | null = null;
  params: Record<string, unknown> | null = null;

  constructor({ name = null, params = null }: HistoryItemProps = {}) {
    this.name = name;
    this.params = params;
  }

  static create(props?: HistoryItemProps): HistoryItem {
    return new HistoryItem(props);
  }

  isEqual(other: HistoryItem | null | undefined): boolean {
    if (!other) return false;

    const paramsAreEqual = arraysEqual(
      getKeys(this.params),
      getKeys(other.params),
    );
    const valuesAreEqual = arraysEqual(
      getValues(this.params),
      getValues(other.params),
    );

    return this.name === other.name && paramsAreEqual && valuesAreEqual;
  }
}
