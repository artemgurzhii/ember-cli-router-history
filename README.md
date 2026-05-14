ember-cli-router-history
==============================================================================

Ember router history with local storage and query params support.


Compatibility
------------------------------------------------------------------------------

- Ember.js v4.12 or above
- Embroider or ember-auto-import v2


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-router-history
```


Usage
------------------------------------------------------------------------------

Wire the service to the router service's `routeDidChange` event (or
`routeWillChange` if you want to capture *every* attempted transition):

```js
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

Or from any route / component:

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

- `routerHistory.previous` — the previous `HistoryItem`, or `null` if there isn't one.
- `routerHistory.history` — the full history stack (most recent last).
- `routerHistory.clear()` — wipe the stack and local storage (useful on logout).


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


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [GPL-3.0 License](LICENSE).


Big thanks to
------------------------------------------------------------------------------

[dexturr/ember-contextual-back](https://github.com/dexturr/ember-contextual-back)

[alexmngn/ember-route-history](https://github.com/alexmngn/ember-route-history)
