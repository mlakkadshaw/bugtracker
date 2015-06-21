var BugDispatcher = require('./bugdispatcher');
var AppVersionActions = {
    create: function(versionName) {
        BugDispatcher.dispatch({
            actionType: 'VERSION_ADD',
            versionName: versionName,
            versionChangeLog: changeLog
        });
    },
    destroy: function(versionName) {
        BugDispatcher.dispatch({
            actionType: 'VERSION_DESTROY',
            versionName: versionName
        });
    }
};
module.exports = AppVersionActions;