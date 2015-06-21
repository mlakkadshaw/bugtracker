var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var BugDispatcher = require('../bugdispatcher.js');

var _appversions = {};
var CHANGE_EVENT = 'change';

var AppVersionStore = assign({}, EventEmitter.prototype, {
    getAll: function() {
        return _appversions;
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

function createAppVersion(versionName, data) {
    _appversions[versionName] = {
        id: versionName,
		    timestamp: Date.now(),
        changeLog: data.changeLog
    };
}

function destroy(versionName) {
    delete _appversions[versionName];
}

BugDispatcher.register(function(payload) {
    if (payload.actionType === "VERSION_ADD") {
        createAppVersion(payload.versionName, payload.data);
        AppVersionStore.emitChange();
    }

    if (payload.actionType === "VERSION_DESTROY") {
        destroy(payload.versionName);
        AppVersionStore.emitChange();
    }
});

module.exports = AppVersionStore;
