//TODO: Implement a backend
var AppVersionStore = require('./stores/AppVersionStore');
var BugStore = require('./stores/BugStore');
var CommentStore = require('./stores/CommentStore');

CommentStore.addChangeListener(function() {
    var data = CommentStore.getAll();
});

BugStore.addChangeListener(function() {
    var data = BugStore.getAll();
});

AppVersionStore.addChangeListener(function() {
    var data = AppVersionStore.getAll();
});