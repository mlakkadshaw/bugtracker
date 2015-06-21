var React = require('react');
var Bugs = require('./components/Bugs.react.js');
React.render(
  React.createElement(Bugs, null),
  document.getElementById('buglist')
);