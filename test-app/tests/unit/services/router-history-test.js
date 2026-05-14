import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { HistoryItem } from 'ember-cli-router-history';

const mockTransition = ({ name, params }) => ({
  to: { name, params },
});

const transition1 = mockTransition({ name: 'name1', params: {} });
const transition2 = mockTransition({
  name: 'name2',
  params: { some_id: 'some_value' },
});

module('Unit | Service | router-history', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.service = this.owner.lookup('service:router-history');
  });

  hooks.afterEach(function () {
    this.service.clear();
  });

  test('it exists', function (assert) {
    assert.ok(this.service);
  });

  test('#buildItemFor', function (assert) {
    const item1 = this.service.buildItemFor(transition1);
    const item2 = this.service.buildItemFor(transition2);

    assert.ok(item1 instanceof HistoryItem, 'is instance of `HistoryItem`');
    assert.ok(item2 instanceof HistoryItem, 'is instance of `HistoryItem`');

    assert.strictEqual(item1.name, 'name1', 'name is correct');
    assert.strictEqual(item1.params, null, 'params are correct');

    assert.strictEqual(item2.name, 'name2', 'name is correct');
    assert.deepEqual(
      item2.params,
      { some_id: 'some_value' },
      'params are correct',
    );
  });

  test('item is being pushed in the history', function (assert) {
    const item1 = this.service.buildItemFor(transition1);

    this.service.addItem(transition1);
    assert.strictEqual(
      this.service.previous,
      null,
      'has no previous routes except current',
    );

    this.service.addItem(transition2);
    assert.ok(
      this.service.previous.isEqual(item1),
      'has previous route',
    );

    assert.strictEqual(
      this.service.history.length,
      2,
      '2 items are in the history array',
    );

    this.service.clear();

    assert.strictEqual(
      this.service.history.length,
      0,
      'history is empty after clear',
    );
  });

  test('history has size limit', function (assert) {
    assert.strictEqual(this.service.history.length, 0, 'history is empty');

    Array(10)
      .fill(0)
      .forEach((_, index) => {
        this.service.addItem(
          mockTransition({ name: `first-round-transition-${index}` }),
        );
      });

    assert.strictEqual(this.service.history.length, 10, 'history has 10 items');

    Array(10)
      .fill(0)
      .forEach((_, index) => {
        this.service.addItem(
          mockTransition({ name: `second-round-transition-${index}` }),
        );
      });

    assert.strictEqual(this.service.history.length, 10, 'history has 10 items');

    const names = this.service.history.map((item) => item.name);

    assert.ok(
      names.every((name) => name.startsWith('second-round-transition')),
      'transitions which exceed history limit are removed',
    );
  });

  test('history size limit is configurable', function (assert) {
    this.service.maxLength = 1;

    assert.strictEqual(this.service.history.length, 0, 'history is empty');

    this.service.addItem(mockTransition({ name: 'first name' }));
    assert.strictEqual(this.service.history.length, 1, 'history has 1 item');

    this.service.addItem(mockTransition({ name: 'second name' }));
    assert.strictEqual(this.service.history.length, 1, 'history has 1 item');
    assert.strictEqual(
      this.service.history[0].name,
      'second name',
      'first item is removed',
    );
  });
});
