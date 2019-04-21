import HistoryItem from 'ember-cli-router-history/objects/history-item';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { isEqual } from '@ember/utils';

module('Unit | Objects | history item', hooks => {
  setupTest(hooks);

  test('it exists', function(assert) {
    assert.ok(HistoryItem);
  });

  module('when params are equal', () => {
    test('both not present', function(assert) {
      const item1 = HistoryItem.create();
      const item2 = HistoryItem.create();

      assert.ok(isEqual(item1, item2), 'items are equal');
    });

    test('with undefined value', function(assert) {
      const item1 = HistoryItem.create({ params: undefined });
      const item2 = HistoryItem.create({ params: undefined });

      assert.ok(isEqual(item1, item2), 'items are equal');
    });

    test('with null value', function(assert) {
      const item1 = HistoryItem.create({ params: null });
      const item2 = HistoryItem.create({ params: null });

      assert.ok(isEqual(item1, item2), 'items are equal');
    });

    test('with empty object value', function(assert) {
      const item1 = HistoryItem.create({ params: {} });
      const item2 = HistoryItem.create({ params: {} });

      assert.ok(isEqual(item1, item2), 'items are equal');
    });

    test('with object with key', function(assert) {
      const item1 = HistoryItem.create({ params: { key: 'lorem' } });
      const item2 = HistoryItem.create({ params: { key: 'lorem' } });

      assert.ok(isEqual(item1, item2), 'items are equal');
    });

    test('with object with keys', function(assert) {
      const item1 = HistoryItem.create({ params: { key1: 'lorem', key2: 'ipsum' } });
      const item2 = HistoryItem.create({ params: { key1: 'lorem', key2: 'ipsum' } });

      assert.ok(isEqual(item1, item2), 'items are equal');
    });
  });

  module('when params are not equal', () => {
    test('with empty object value', function(assert) {
      const item1 = HistoryItem.create({ params: {} });
      const item2 = HistoryItem.create();

      assert.notOk(isEqual(item1, item2), 'items are not equal');
    });

    test('with object with key', function(assert) {
      const item1 = HistoryItem.create({ params: { key: 'lorem1' } });
      const item2 = HistoryItem.create({ params: { key: 'lorem2' } });

      assert.notOk(isEqual(item1, item2), 'items are not equal');
    });

    test('with object with keys', function(assert) {
      const item1 = HistoryItem.create({ params: { key1: 'lorem1', key2: 'ipsum2' } });
      const item2 = HistoryItem.create({ params: { key1: 'lorem2', key2: 'ipsum2' } });

      assert.notOk(isEqual(item1, item2), 'items are not equal');
    });
  });

  test('when param key differs', function(assert) {
    const item1 = HistoryItem.create({ name: 'lorem', params: { key: 'value1' } });
    const item2 = HistoryItem.create({ name: 'lorem', params: { key: 'value2' } });

    assert.notOk(isEqual(item1, item2), 'history item are equal when names are equal');
  });

  test('when name is equal', function(assert) {
    const item1 = HistoryItem.create({ name: 'lorem' });
    const item2 = HistoryItem.create({ name: 'lorem' });

    assert.ok(isEqual(item1, item2), 'history item are equal when names are equal');
  });

  test('when names and params are equal', function(assert) {
    const item1 = HistoryItem.create({ name: 'lorem', params: { key: 'value' } });
    const item2 = HistoryItem.create({ name: 'lorem', params: { key: 'value' } });

    assert.ok(isEqual(item1, item2), 'history item are equal when names are equal');
  });
});
