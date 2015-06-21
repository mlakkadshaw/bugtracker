var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var BugDispatcher = require('../bugdispatcher.js');

var _comments = {};
var CHANGE_EVENT = 'change';

function createComment(text, bugId) {
	var id = Date.now();
	_comments[id] = {
		bugId: bugId,
		text: text
	};
};

function destroy(id) {
	delete _comments[id];
}

var CommentStore = assign({}, EventEmitter.prototype, {
    getAll: function() {
        return _comments;
    },
    getForBug: function(bugId) {
        var comments = [];
        for(var key in _comments) {
            if(_comments[key].bugId === bugId) {
                comments.push(_comments[key]);
            }
        }
        return comments;
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

BugDispatcher.register(function(payload) {
    if (payload.actionType === "COMMENT_ADD") {
        createComment(payload.text, payload.bugId);
        CommentStore.emitChange();
    }

    if (payload.actionType === "COMMENT_REMOVE") {
        destroy(payload.id);
        CommentStore.emitChange();
    }
});
module.exports = CommentStore;