import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { HistoryItem } from 'ember-cli-router-history';

module('Unit | Objects | history item', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    assert.ok(HistoryItem);
  });

  module('when params are equal', function () {
    test('both not present', function (assert) {
      const item1 = new HistoryItem();
      const item2 = new HistoryItem();

      assert.ok(item1.isEqual(item2), 'items are equal');
    });

    test('with undefined value', function (assert) {
      const item1 = new HistoryItem({ params: undefined });
      const item2 = new HistoryItem({ params: undefined });

      assert.ok(item1.isEqual(item2), 'items are equal');
    });

    test('with null value', function (assert) {
      const item1 = new HistoryItem({ params: null });
      const item2 = new HistoryItem({ params: null });

      assert.ok(item1.isEqual(item2), 'items are equal');
    });

    test('with empty object value', function (assert) {
      const item1 = new HistoryItem({ params: {} });
      const item2 = new HistoryItem({ params: {} });

      assert.ok(item1.isEqual(item2), 'items are equal');
    });

    test('with object with key', function (assert) {
      const item1 = new HistoryItem({ params: { key: 'lorem' } });
      const item2 = new HistoryItem({ params: { key: 'lorem' } });

      assert.ok(item1.isEqual(item2), 'items are equal');
    });

    test('with object with keys', function (assert) {
      const item1 = new HistoryItem({
        params: { key1: 'lorem', key2: 'ipsum' },
      });
      const item2 = new HistoryItem({
        params: { key1: 'lorem', key2: 'ipsum' },
      });

      assert.ok(item1.isEqual(item2), 'items are equal');
    });
  });

  module('when params are not equal', function () {
    test('with empty object value', function (assert) {
      const item1 = new HistoryItem({ params: {} });
      const item2 = new HistoryItem();

      assert.notOk(item1.isEqual(item2), 'items are not equal');
    });

    test('with object with key', function (assert) {
      const item1 = new HistoryItem({ params: { key: 'lorem1' } });
      const item2 = new HistoryItem({ params: { key: 'lorem2' } });

      assert.notOk(item1.isEqual(item2), 'items are not equal');
    });

    test('with object with keys', function (assert) {
      const item1 = new HistoryItem({
        params: { key1: 'lorem1', key2: 'ipsum2' },
      });
      const item2 = new HistoryItem({
        params: { key1: 'lorem2', key2: 'ipsum2' },
      });

      assert.notOk(item1.isEqual(item2), 'items are not equal');
    });
  });

  test('when param key differs', function (assert) {
    const item1 = new HistoryItem({ name: 'lorem', params: { key: 'value1' } });
    const item2 = new HistoryItem({ name: 'lorem', params: { key: 'value2' } });

    assert.notOk(
      item1.isEqual(item2),
      'items are not equal when params differ',
    );
  });

  test('when name is equal', function (assert) {
    const item1 = new HistoryItem({ name: 'lorem' });
    const item2 = new HistoryItem({ name: 'lorem' });

    assert.ok(item1.isEqual(item2), 'items are equal when names are equal');
  });

  test('when names and params are equal', function (assert) {
    const item1 = new HistoryItem({ name: 'lorem', params: { key: 'value' } });
    const item2 = new HistoryItem({ name: 'lorem', params: { key: 'value' } });

    assert.ok(item1.isEqual(item2), 'items are equal');
  });
});
