var React = require('react');
var BugInput = require('./BugInput.react');
var AppVersionActions = require('../appversionactions');
var AppVersionStore = require('../stores/AppVersionStore');
var BugList = require('./BugList.react');

function getAppVersionState() {
	return {
		appVersions: AppVersionStore.getAll()
	};	
};

var Bugs = React.createClass({displayName: "Bugs",
	getInitialState: function() {
		return getAppVersionState();	
	},
	componentDidMount: function() {
		AppVersionStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		AppVersionStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState(getAppVersionState());
	},
	_onSave: function(text) {
		AppVersionActions.create(text);
	},
	render: function() {
		var appVersions = this.state.appVersions;
		var bugLists = [];
		for(var key in appVersions) {
			bugLists.push(
				React.createElement("div", null, 
				"Version: ", key, 
				React.createElement("br", null), 
				React.createElement(BugList, {key: key, appVersion: appVersions[key]}), 
				React.createElement("hr", null)
				)
			)
		}
		bugLists.reverse();
		return (
			React.createElement("div", null, 
			"Add Version: ", React.createElement(BugInput, {onSave: this._onSave}), 
			React.createElement("div", null, 
				bugLists
			)
			)
		)
	}
});
module.exports = Bugs;