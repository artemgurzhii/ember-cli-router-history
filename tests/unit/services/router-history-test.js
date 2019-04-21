import HistoryItem from 'ember-cli-router-history/objects/history-item';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { set } from '@ember/object';

let service;

const mockTransition = ({ name, params }) => ({
  lastObject: {
    name,
    params,
  },
});

const transition1 = mockTransition({
  name: 'name1',
  params: {},
});

const transition2 = mockTransition({
  name: 'name2',
  params: {
    some_id: 'some_value',
  },
});

module('Unit | Service | router-history', hooks => {
  setupTest(hooks);

  hooks.beforeEach(function() {
    service = this.owner.lookup('service:router-history');
  });

  hooks.afterEach(function() {
    service.clear();
  });

  test('it exists', function(assert) {
    assert.ok(service);
  });

  test('#buildItemFor', function(assert) {
    const item1 = service.buildItemFor(transition1);
    const item2 = service.buildItemFor(transition2);

    assert.ok(item1 instanceof HistoryItem, 'is instance of `HistoryItem`');
    assert.ok(item2 instanceof HistoryItem, 'is instance of `HistoryItem`');

    assert.equal(item1.name, 'name1', 'name is correct');
    assert.equal(item1.params, null, 'params are correct');

    assert.equal(item2.name, 'name2', 'name is correct');
    assert.deepEqual(item2.params, { some_id: 'some_value' }, 'params are correct');
  });

  test('item is being pushed in the history', function(assert) {
    const item1 = service.buildItemFor(transition1);

    service.addItem(transition1);
    assert.equal(service.previous, null, 'has no previous routes except current');

    service.addItem(transition2);
    assert.deepEqual(service.previous, item1, 'has previous route');

    assert.equal(service.history.length, 2, '2 items are in the history array');

    service.clear();

    assert.equal(service.history.length, 0, 'history is empty after clear');
  });

  test('history has size limit', function(assert) {
    assert.equal(service.history.length, 0, 'history is empty');

    Array(10).fill(0).map((value, index) => {
      const transition = mockTransition({ name: `first-round-transition-${index}` });

      service.addItem(transition);
    });

    assert.equal(service.history.length, 10, 'history has 10 items');

    Array(10).fill(0).map((value, index) => {
      const transition = mockTransition({ name: `second-round-transition-${index}` });

      service.addItem(transition);
    });

    assert.equal(service.history.length, 10, 'history has 10 items');

    const names = service.history.mapBy('name');

    assert.ok(
      names.every(name => name.startsWith('second-round-transition')),
      'transition which exceeds history limit are removed',
    );
  });

  test('history size limit is configurable', function(assert) {
    set(service, 'maxLength', 1);

    assert.equal(service.history.length, 0, 'history is empty');

    service.addItem(mockTransition({ name: 'first name' }));
    assert.equal(service.history.length, 1, 'history has 1 item');

    service.addItem(mockTransition({ name: 'second name' }));
    assert.equal(service.history.length, 1, 'history has 1 item');
    assert.equal(
      service.history.firstObject.name,
      'second name',
      'first item is removed'
    );
  });
});
