Package.describe({
  name: 'centiq:hooke',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  "body-parser": "1.12.3"
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.5');

  /**
   * Require dependanices
   */
  api.use([
    "webapp",
    "routepolicy",
    "underscore"
  ], "server");

  /**
   * Add the http componant
   */
  api.addFiles("hooke.js", "server")
  api.addFiles("hooke-http.js", "server");

  api.export("Hooke");
});

Package.onTest(function(api) {
  api.use("centiq:hooke");
});
