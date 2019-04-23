'use strict';

module.exports = {
  local: false,
  remote: 'origin',
  annotation: "Release %@",
  message: "Bumped version to %@",
  manifest: ['package.json'],
  publish: false,
  strategy: 'semver',
  format: 'YYYY-MM-DD',
  timezone: 'UTC',
};
