var BugDispatcher = require('./bugdispatcher');

var BugActions = {
    create: function(text) {
        BugDispatcher.dispatch({
            actionType: 'BUG_ADD',
            text: text
        });
    },
    destroy: function(id) {
        BugDispatcher.dispatch({
            actionType: 'BUG_DESTROY',
            id: id
        });
    },
    markAsComplete: function(id) {
      BugDispatcher.dispatch({
        actionType: 'BUG_FIXED',
        id: id
      });
    },
    unmarkAsComplete: function(id) {
      BugDispatcher.dispatch({
        actionType: 'BUG_UNMARK',
        id: id
      });
    }
};

module.exports = BugActions;
