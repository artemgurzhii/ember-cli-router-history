import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

class FastBootStub extends Service {
  isFastBoot = true;
}

module('Unit | Service | router-history (FastBoot)', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:fastboot', FastBootStub);
    window.localStorage.removeItem('ember-cli-router-history');
  });

  hooks.afterEach(function () {
    window.localStorage.removeItem('ember-cli-router-history');
  });

  test('reports isFastBoot when the FastBoot service flag is on', function (assert) {
    const service = this.owner.lookup('service:router-history');

    assert.true(service.isFastBoot, 'isFastBoot reflects the injected stub service');
  });

  test('constructor skips reading localStorage in FastBoot mode', function (assert) {
    window.localStorage.setItem(
      'ember-cli-router-history',
      JSON.stringify([{ name: 'seeded', params: null }])
    );

    const service = this.owner.lookup('service:router-history');

    assert.deepEqual(
      service.history,
      [],
      'history is empty even though localStorage has a seeded value'
    );
  });

  test('addItem updates history but does not persist to localStorage', function (assert) {
    const service = this.owner.lookup('service:router-history');

    service.addItem({ to: { name: 'home', params: {} } });
    service.addItem({ to: { name: 'about', params: {} } });

    assert.strictEqual(service.history.length, 2, 'history is updated in-memory');
    assert.strictEqual(
      window.localStorage.getItem('ember-cli-router-history'),
      null,
      'nothing was written to localStorage during SSR'
    );
  });
});
