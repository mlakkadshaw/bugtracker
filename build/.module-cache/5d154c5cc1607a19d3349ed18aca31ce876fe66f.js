var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var TodoDispatcher = require('./tododispatcher.js');

var _todos = {};
var CHANGE_EVENT = 'change';

var TodoStore = assign({}, EventEmitter.prototype, {
    getAll: function() {
        return _todos;
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

function createTodo(todoText) {
    var id = Date.now();
    _todos[id] = {
        id: id,
        complete: false,
        text: todoText
    };
};

function destroy(id) {
    delete _todos[id];
}

TodoDispatcher.register(function(payload) {
    if (payload.actionType === "TODO_CREATE") {
        createTodo(payload.text);
    }
    if (payload.actionType === "TODO_DESTROY") {
        destroy(payload.id);
    }
});

module.exports = TodoStore;
