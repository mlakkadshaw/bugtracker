var React = require('react');
var BugList = require('./components/BugList.react.js');
React.render(
  React.createElement(BugList, null),
  document.getElementById('buglist')
);