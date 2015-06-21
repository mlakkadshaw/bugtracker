var BugDispatcher = require('./bugdispatcher');

var BugActions = {
    create: function(appVersion, text) {
        BugDispatcher.dispatch({
            actionType: 'BUG_ADD',
            text: text,
            appVersion: appVersion
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
