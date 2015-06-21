var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var BugDispatcher = require('../bugdispatcher.js');

var _bugs = {};
var CHANGE_EVENT = 'change';

var BugStore = assign({}, EventEmitter.prototype, {
    getAll: function() {
        return _bugs;
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

function createBug(bugText) {
    var id = Date.now();
    _bugs[id] = {
        id: id,
        fixed: false,
        text: bugText
    };
}

function destroy(id) {
    delete _bugs[id];
}

function fixed(id) {
    _bugs[id].fixed = true;
}

function uncomplete(id) {
    _bugs[id].fixed = false;
}

BugDispatcher.register(function(payload) {
    if (payload.actionType === "BUG_ADD") {
        createBug(payload.text);
        BugStore.emitChange();
    }

    if (payload.actionType === "BUG_DESTROY") {
        destroy(payload.id);
        BugStore.emitChange();
    }

    if(payload.actionType === "BUG_FIXED") {
      fixed(payload.id);
      BugStore.emitChange();
    }

    if(payload.actionType === "BUG_UNMARK") {
      uncomplete(payload.id);
      BugStore.emitChange();
    }
});

module.exports = BugStore;
