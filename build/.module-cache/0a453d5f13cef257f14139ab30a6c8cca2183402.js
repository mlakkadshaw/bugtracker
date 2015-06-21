var TodoDispatcher = require('./tododispatcher');

var TodoActions = {
    create: function(text) {
        TodoDispatcher.dispatch({
            actionType: 'TODO_CREATE',
            text: text
        });
    },
    destroy: function(id) {
        TodoDispatcher.dispatch({
            actionType: 'TODO_DESTROY',
            id: id
        });
    },
    markAsComplete: function(id) {
      TodoDispatcher.dispatch({
        actionType: 'TODO_COMPLETE',
        id: id
      });
    },
    unmarkAsComplete: function(id) {
      TodoDispatcher.dispatch({
        actionType: 'TODO_UNMARK',
        id: id
      });
    }
};

module.exports = TodoActions;
