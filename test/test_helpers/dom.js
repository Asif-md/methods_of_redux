const jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

// setup the simplest document possible
const doc = jsdom('<!doctype html><html><body></body></html>');

// set globals for mocha that make access to document and window feel
// natural in the test environment
global.document = doc;
global.window = doc.defaultView;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
