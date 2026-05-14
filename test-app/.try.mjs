// Ember 6.0 is the first v2 Ember Addon release of ember-source. The Vite +
// Embroider test harness requires v2, so 4.x / 5.x cannot be exercised here
// even though the addon's runtime still supports ember-source >= 4.12.

export default scenarios();

function scenarios() {
  return {
    scenarios: [
      emberSource("~6.4.0"),
      emberSource("~6.8.0"),
      emberSource("latest"),
      emberSource("beta"),
      emberSource("alpha"),
    ],
  };
}

function emberSource(version) {
  return {
    name: `ember-${version}`,
    npm: {
      devDependencies: {
        "ember-source": `npm:ember-source@${version}`,
      },
    },
  };
}
