[![Build Status](https://travis-ci.org/artemgurzhii/ember-cli-router-history.svg?branch=master)](https://travis-ci.org/artemgurzhii/ember-cli-router-history)

ember-cli-router-history
==============================================================================

Ember router history with local storage and query params support.

Installation
------------------------------------------------------------------------------

```
ember install ember-cli-router-history
```


Usage
------------------------------------------------------------------------------
After installation `ember-cli-router-history` open `app/router.js` and add following

```js
import config from 'your-app-name/config/environment';
import EmberRouter from '@ember/routing/router';
import { inject as service } from '@ember/service';

const Router = EmberRouter.extend({
  routerHistory: service(),

  location: config.locationType,
  rootURL: config.rootURL,

  // Use `willTransition` if you want to track all transitions
  willTransition(previousTransition, currentTransition) {
    this._super(...arguments);

    this.routerHistory.addItem(currentTransition);
  },

  // Or use `didTransition` if you want to track only successful(completed/finished) transitions
  didTransition(transition) {
    this._super(...arguments);

    this.routerHistory.addItem(transition);
  },
});
```

`this.routerHistory.previous` returns previous transition if present, or null if not.

`this.routerHistory.history` returns all history items.

`this.routerHistory.clear()` clear transition history, can be used when user logges out


Configuration
------------------------------------------------------------------------------
```js
import RouterHistoryService from 'ember-cli-router-history/services/router-history';

export default RouterHistoryService.extend({
  maxLength: 20, // Number of item to store in the history, default is 10
})
```

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-cli-router-history`
* `npm install`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [GPL-3.0 License](LICENSE).


Big thanks to
------------------------------------------------------------------------------

[dexturr/ember-contextual-back](https://github.com/dexturr/ember-contextual-back)

[alexmngn/ember-route-history](https://github.com/alexmngn/ember-route-history)
