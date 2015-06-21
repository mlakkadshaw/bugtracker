var BugDispatcher = require('./bugdispatcher');
var AppVersionActions = {
	create: function(appVersion) {
		BugDispatcher.dispatch({
			actionType: 'VERSION_ADD',
			versionName: appVersion.versionName,
			data: appVersion
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
