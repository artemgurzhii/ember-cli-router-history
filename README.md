ember-cli-router-history
==============================================================================

Ember router history with local storage and query params support.


Compatibility
------------------------------------------------------------------------------

- Ember.js v4.12 or above
- Embroider or ember-auto-import v2
- Node.js v18 or above
- FastBoot — fully supported (see [FastBoot](#fastboot) below)


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-router-history
```


Usage
------------------------------------------------------------------------------

Subscribe the service to the router's `routeDidChange` event:

```js
// app/app.js
import Application from '@ember/application';
import { service } from '@ember/service';

export default class App extends Application {
  @service router;
  @service routerHistory;

  ready() {
    this.router.on('routeDidChange', (transition) => {
      this.routerHistory.addItem(transition);
    });
  }
}
```

Or wire it from any route or component:

```js
import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service router;
  @service routerHistory;

  constructor() {
    super(...arguments);

    this.router.on('routeDidChange', (transition) => {
      this.routerHistory.addItem(transition);
    });
  }
}
```

API:

- `routerHistory.previous` — the previous `HistoryItem`, or `null`.
- `routerHistory.history` — the full history stack (most recent last).
- `routerHistory.clear()` — wipe the stack and local storage.


Configuration
------------------------------------------------------------------------------

To override defaults, extend the service in your app:

```js
// app/services/router-history.js
import RouterHistoryService from 'ember-cli-router-history/services/router-history';

export default class extends RouterHistoryService {
  maxLength = 20; // default is 10
}
```


FastBoot
------------------------------------------------------------------------------

The service is safe to use under FastBoot. During server-side rendering it:

- detects the FastBoot context via the `fastboot` service (`isFastBoot`);
- skips the `localStorage` read in the constructor (so SSR doesn't crash on
  the missing `window.localStorage`);
- holds history in-memory only — `addItem` updates the tracked stack but
  does not call `localStorage.setItem`;
- continues to expose `previous` and `history` so SSR-rendered components
  that read them get sensible empty values.

On the client, the service re-initializes from `localStorage` (no shoebox
hand-off is needed — the per-tab history was already persisted from prior
sessions). All `localStorage` helpers also guard against environments
where `window.localStorage` is missing or throws (e.g. private-mode
SecurityError), so the service is safe in non-FastBoot SSR setups too.


Repository layout
------------------------------------------------------------------------------

This repo is a pnpm workspace with two packages:

- `ember-cli-router-history/` — the V2 addon (the package published to npm).
- `test-app/` — a host app that consumes the addon and runs the test suite.


Contributing
------------------------------------------------------------------------------

### Installation

```
git clone https://github.com/artemgurzhii/ember-cli-router-history
cd ember-cli-router-history
pnpm install
```

### Building the addon

```
pnpm --filter ember-cli-router-history build
```

### Linting

```
pnpm lint
pnpm lint:fix
```

### Running tests

```
pnpm test                         # runs lint + tests in the test-app
pnpm test:ember-compatibility     # runs ember-try against multiple LTS versions
```

### Running the test-app

```
pnpm --filter test-app start
```


License
------------------------------------------------------------------------------

This project is licensed under the [GPL-3.0 License](LICENSE).


Big thanks to
------------------------------------------------------------------------------

[dexturr/ember-contextual-back](https://github.com/dexturr/ember-contextual-back)

[alexmngn/ember-route-history](https://github.com/alexmngn/ember-route-history)
