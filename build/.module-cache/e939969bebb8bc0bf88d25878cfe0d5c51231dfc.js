var React = require('react');
var BugList = require('./components/BugList.react');
React.render(
  React.createElement(BugList, null),
  document.getElementById('buglist')
)
