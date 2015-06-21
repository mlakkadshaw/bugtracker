var BugDispatcher = require('./bugdispatcher');
var AppVersionActions = {
	create: function(versionName) {
		BugDispatcher.dispatch({
			actionType: 'VERSION_ADD',
			versionName: versionName
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